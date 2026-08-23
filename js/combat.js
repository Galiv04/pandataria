/* ============ COMBAT — combattimento a turni ============ */

const Combat = (() => {

  let battle = null; // stato del combattimento corrente

  const $ = id => document.getElementById(id);

  function log(html, cls = '') {
    const el = $('combat-log');
    const p = document.createElement('p');
    if (cls) p.className = cls;
    p.innerHTML = html;
    el.appendChild(p);
    el.scrollTop = el.scrollHeight;
  }

  function heroMod(hero, stat) {
    let m = hero.stats[stat] || 0;
    if (hero.veleno) m -= 2;                                  // ACQUA NEI POLMONI
    if (hero.id === 'gaetano' && stat === 'INT') m += 2;      // Dato di Fatto
    if (hero.id === 'claudia' && stat === 'SAG') m += 2;      // Inquadratura
    if (hero.id === 'ciro' && stat === 'FOR') m += 2;         // trent'anni di rete a mano
    return m;
  }

  /* ---------- avvio ---------- */

  function start(combatDef, sceneId) {
    const isBoss = (combatDef.enemies || []).some(e => /giulia|bambina|coro_vero|se_stessa/.test(e));
    // il Coro non spreca voci: se siete in pochi, manda meno gente
    const attivi = G.party.filter(h => !h.down && !h.preso && !h.morto && !h.rimasto).length;
    const porzione = G.difficulty === 'incubo' ? 1 : (attivi === 1 ? 0.7 : attivi === 2 ? 0.85 : 1);
    battle = {
      def: combatDef,
      sceneId,
      isBoss,
      round: 1,
      enemies: combatDef.enemies.map((key, i) => {
        const b = BESTIARY[key];
        const e = { ...b, key, hp: b.maxHp, idx: i, stunned: false, distracted: false, dead: false,
          attack: { ...b.attack } };
        if (G.difficulty === 'facile') {
          e.maxHp = Math.max(1, Math.round(e.maxHp * 0.75));
          e.hp = e.maxHp;
          e.attack.bonus = Math.max(0, e.attack.bonus - 2);
          e.attack.plus = Math.max(0, (e.attack.plus || 0) - 1);
        }
        if (G.difficulty === 'incubo') {
          e.maxHp = Math.round(e.maxHp * 1.5);
          e.hp = e.maxHp;
          e.attack.bonus += 2;
          e.attack.plus = (e.attack.plus || 0) + 2;
        }
        /* PIETÀ: impostata da Engine.riprendiDaCheckpoint. Ogni volta che il gruppo
           è tornato da un checkpoint, quello che lo ha ucciso è un po' più stanco. */
        if (G.pieta) {
          e.maxHp = Math.max(1, Math.round(e.maxHp * (1 - G.pieta)));
          e.hp = e.maxHp;
          e.attack.bonus = Math.max(0, e.attack.bonus - (G.pieta >= 0.24 ? 2 : 1));
          e.attack.plus = Math.max(0, (e.attack.plus || 0) - (G.pieta >= 0.24 ? 2 : 1));
        }
        if (porzione < 1) {
          e.maxHp = Math.max(1, Math.round(e.maxHp * porzione));
          e.hp = e.maxHp;
          if (attivi === 1) e.attack.bonus = Math.max(0, e.attack.bonus - 1);
        }
        return e;
      }),
      turnQueue: [],
      turnPtr: -1,
      tauntHeroIdx: null, tauntRounds: 0,
      guardHeroIdx: null, guardedAllyIdx: null,
      smokeRounds: 0,
      over: false,
    };

    // reset per-combattimento
    for (const h of G.party) {
      h.defending = false;
      h.rageRounds = 0;
      h.luckUsed = false;
      h.zonkGritUsed = false;
      h.latched = false;
      h._stabilized = false;
    }

    let openLines = [];
    if (G.pieta) {
      openLines.push(`🌊 <b>Anche loro sono stanchi</b>: siete già tornati da un checkpoint ${G.stats.checkpointRitorni} volt${G.stats.checkpointRitorni > 1 ? 'e' : 'a'}, e rifarvi da capo costa fatica anche al Coro (−${Math.round(G.pieta * 100)}% PV e ai loro colpi).`);
    }
    if (porzione < 1) {
      openLines.push(`🌊 <b>Il Coro conta le teste</b>: siete ${attivi === 1 ? 'UNO' : 'in due'}. Non serve tutto quel fiato per ${attivi === 1 ? 'una persona sola' : 'due persone'} — mandano meno gente${attivi === 1 ? ', e più stanca' : ''}.`);
    }
    // LE DUE FEDI (craftata): finché le tenete legate insieme, nessuno dei due combatte da solo
    if (G.inventory && G.inventory.includes('le_due_fedi')) {
      for (const h of G.party) if (!h.down && !h.preso && !h.morto && !h.rimasto) h.hp = Math.min(h.maxHp, h.hp + 2);
      openLines.push(`💍 <b>Le due fedi</b>, legate con la lenza, battono l'una contro l'altra nella tasca: due colpetti, sempre due. +2 PV a tutti.`);
    }
    // TENERSI PER MANO: se siete esattamente in due e tutti in piedi, +1 CA a entrambi
    const inPiedi = G.party.filter(h => !h.down && !h.preso && !h.morto && !h.rimasto);
    if (inPiedi.length === 2) {
      inPiedi.forEach(h => { h.ac += 1; h._manoAc = true; });
      openLines.push(`🤝 <b>Vi tenete per mano</b> senza decidere di farlo. +1 CA a entrambi finché restate in piedi tutti e due.`);
    }

    // iniziativa (gli spiriti guardano: niente turno, ma restano in scena)
    const combatants = [];
    G.party.forEach((h, i) => { if (!h.preso && !h.morto && !h.rimasto) combatants.push({ type: 'hero', idx: i, init: Dice.roll(20) + heroMod(h, 'DES') }); });
    battle.enemies.forEach((e, i) => combatants.push({ type: 'enemy', idx: i, init: Dice.roll(20) + 2 }));
    combatants.sort((a, b) => b.init - a.init);
    battle.turnQueue = combatants;

    // UI
    Engine.showScreen('screen-combat');
    $('combat-log').innerHTML = '';
    $('combat-actions').innerHTML = '';
    const banner = $('combat-banner');
    banner.textContent = '⚔ COMBATTIMENTO! ⚔';
    banner.classList.remove('hidden', 'victory');
    render();

    const COMBAT_MUSIC = {}; // una sola traccia di scontro (+ 'boss'): la Casa non ha bisogno di variare per farvi male
    const loc = (Engine.currentScene() || {}).location;
    if (typeof Sound !== 'undefined') { Sound.play('combat'); Sound.music(battle.isBoss ? 'boss' : (COMBAT_MUSIC[loc] || 'combat')); }
    log(`<b>Nemici:</b> ${battle.enemies.map(e => e.name).join(', ')}`, 'log-info');
    for (const e of [...new Set(battle.enemies.map(e => e.key))]) {
      log(`<i>${BESTIARY[e].name}: ${BESTIARY[e].flavor}</i>`, 'log-info');
      if (!G.seenEnemies) G.seenEnemies = [];
      if (!G.seenEnemies.includes(e)) G.seenEnemies.push(e);
    }

    // reazioni situazionali degli eroi
    if (battle.enemies.some(e => /murena|polpo/.test(e.key)) && G.party.some(h => h.id === 'ciro' && !h.down && !h.morto && !h.rimasto)) {
      log(`🐙 Ciro non si scompone: «Chest' è pesce. 'O pesce lo saccio fa'.» E gira il coltello nella mano come si gira una penna.`, 'log-turn');
    }
    if (battle.enemies.some(e => /annegata|eco|coro/.test(e.key)) && G.party.some(h => h.id === 'claudia' && !h.down && !h.morto && !h.rimasto)) {
      log(`🎧 Claudia alza il telefono come si alza uno scudo. «Se ti riprendo esisti. E se esisti hai delle regole.»`, 'log-turn');
    }
    if (battle.enemies.some(e => /detenuto|guardia/.test(e.key)) && G.party.some(h => h.id === 'gaetano' && !h.down && !h.morto && !h.rimasto)) {
      log(`📋 Gaetano, a voce bassissima, come si legge una lista della spesa: «Sei morto nel 1939. Ho il numero della tua cella. Sei un dato.»`, 'log-turn');
    }
    if (battle.isBoss && G.party.some(h => h.id === 'gaetano' && !h.down && !h.morto && !h.rimasto)) {
      log(`🌊 Gaetano guarda il buio davanti e fa la sua unica preghiera: «Facciamo i conti. I conti tornano sempre.»`, 'log-turn');
    }
    const spiriti = G.party.filter(h => h.morto);
    if (spiriti.length) {
      log(`👻 ${spiriti.map(h => h.name.split(' ')[0]).join(' e ')} guarda${spiriti.length > 1 ? 'no' : ''} lo scontro da un passo fuori dal mondo. Fa il tifo. Si sente.`, 'log-info');
    }
    openLines.forEach(l => log(l, 'log-heal'));
    log(`Ordine di iniziativa: ${battle.turnQueue.map(c => c.type === 'hero' ? G.party[c.idx].name.split(' ')[0] : battle.enemies[c.idx].name.split(',')[0]).join(' → ')}`, 'log-info');

    /* Gli echi di quello che avete capito e messo insieme. Qui, e solo qui, pesano. */
    if (battle.isBoss && G.flags.sorpresa) log(`⚡ <b>Sorpresa!</b> Primo giro con VANTAGGIO agli attacchi!`, 'log-heal');

    // ATTENZIONE del Coro: ascoltare troppo si paga adesso, davanti a tutti
    const att = Math.max(0, Math.min(6, G.flags.attenzione || 0));
    if (att >= 5) {
      battle.enemies.forEach(e => { if (!e.dead) { e.attack.bonus += 2; e.hp += 6; e.maxHp += 6; } });
      log(`🎵 <b>Vi hanno ascoltato per tre giorni</b> (attenzione ${Misteri && Misteri.barraAttenzione ? Misteri.barraAttenzione() : att + '/6'}). Sanno come respirate, come vi chiamate, di cosa avete paura. Colpiscono più forte e sono più tanti di quello che dovrebbero (<b>+2 ai loro colpi, +6 PV</b>).`, 'log-hit');
    } else if (att >= 3) {
      battle.enemies.forEach(e => { if (!e.dead) e.attack.bonus += 1; });
      log(`🎵 Qualcosa vi ha seguiti con l'orecchio abbastanza a lungo (<b>+1 ai loro colpi</b>).`, 'log-hit');
    } else if (att === 0) {
      log(`🤫 Non vi siete mai fermati ad ascoltare. Non sanno bene <i>quanti</i> siete: primo attacco con svantaggio.`, 'log-heal');
      battle.enemies.forEach(e => { if (!e.dead) e.distracted = true; });
    }

    // COLLANA DI GIULIA: le sue cose, riportate a lei
    if (battle.isBoss && G.inventory.includes('collana_di_giulia')) {
      const boss = battle.enemies.find(e => e.boss && !e.dead);
      if (boss) {
        boss.hp = Math.max(1, boss.hp - 10); boss.lifesteal = false;
        log(`📿 Tirate fuori la collana e la tenete alta. Duemila anni e la riconosce ancora: <b>-10 PV</b>, e smette di succhiare vita agli altri per guardarla.`, 'log-crit');
      }
    }
    // LA VOCE DEL '65: il nastro giusto, al momento giusto
    if (battle.isBoss && G.inventory.includes('la_voce_del_65')) {
      battle.enemies.forEach(e => { if (!e.dead) { e.attack.bonus = Math.max(0, e.attack.bonus - 2); e.distracted = true; } });
      log(`📼 Premete PLAY. Dagli altoparlantini del telefono esce una voce del 1965 che dice un nome che non è nessuno dei vostri. Il Coro si volta verso il nastro: <b>-2 ai loro colpi</b>, primo attacco con svantaggio.`, 'log-crit');
    }
    // NINNANANNA: contro la bambina, e solo contro di lei
    if (G.inventory.includes('ninnananna') && battle.enemies.some(e => e.key === 'bambina')) {
      const b = battle.enemies.find(e => e.key === 'bambina');
      b.hp = Math.max(1, Math.round(b.hp * 0.6)); b.attack.plus = Math.max(0, (b.attack.plus || 0) - 2);
      log(`🎶 Cantate <i>voi</i> per primi. Sbagliate due parole, come le sbagliava sua madre. Assuntina si ferma a metà del verso per correggervi: <b>-40% PV, -2 ai suoi colpi</b>. Non è più un mostro, è una bambina che vuole finire la canzone.`, 'log-crit');
    }
    // IL NOME DELLA GUARDIA: chiamare per nome un morto lo ferma
    if (G.flags.sa_nome_guardia && battle.enemies.some(e => /guardia|detenuto/.test(e.key))) {
      battle.enemies.forEach(e => { if (!e.dead && /guardia|detenuto/.test(e.key)) { e.attack.bonus = Math.max(0, e.attack.bonus - 3); e.stunned = true; } });
      log(`🗝 «<b>Nicola Sperduto.</b>» Il cognome gli casca addosso come una condanna. Chi ha un nome deve stare fermo quando lo chiamano: <b>-3 ai colpi</b>, e perde il primo turno.`, 'log-crit');
    }
    // LA SESTA CISTERNA: sapete la geometria del posto
    if (G.flags.sa_sesta_cisterna) log(`🗺 Sapete dove finisce l'acqua e dove comincia la roccia: <b>+1 a tutti i vostri tiri</b>.`, 'log-heal');
    // IDROFONO PROFONDO: li sentite arrivare
    if (G.inventory.includes('idrofono_profondo')) log(`🎚 L'idrofono, nell'orecchio, anticipa i movimenti di mezzo secondo. Mezzo secondo è tutto: <b>+1 CA a tutti</b>.`, 'log-heal');
    if (G.inventory.includes('idrofono_profondo')) G.party.forEach(h => { if (!h.morto) { h.ac += 1; h._idroAc = true; } });
    // IL NASTRO BRUCIATO: gli avete tolto la registrazione
    if (battle.isBoss && G.flags.nastro_bruciato) {
      const boss = battle.enemies.find(e => e.boss && !e.dead);
      if (boss) { boss.hp = Math.max(1, boss.hp - 6); log(`🔥 Il nastro non esiste più. Quella voce non ha più un posto dove tornare: <b>-6 PV</b>.`, 'log-crit'); }
    }
    // CIRO IN SQUADRA
    if (G.flags.ciro_in_squadra && !G.party.some(h => h.id === 'ciro' && !h.morto)) {
      log(`🛥 Da sopra, il motore della barca di Ciro gira al minimo. Non è qui, ma non se ne va: <b>+1 ai vostri tiri</b>, perché sapete che qualcuno vi aspetta.`, 'log-heal');
    }

    setTimeout(() => { banner.classList.add('hidden'); nextTurn(); }, 1600);
    if (raf) battle._raf = raf(animLoop);
  }

  /* ---------- rendering ---------- */

  function renderCanvas(ts = 0) {
    const canvas = $('combat-canvas');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const W = canvas.width, H = canvas.height;
    const scene = Engine.currentScene();
    (Scenes.painters[scene && scene.location] || Scenes.painters.porto)(ctx, W, H);

    // eroi a sinistra (con leggera oscillazione "idle")
    const heroes = G.party;
    const hScale = 4, hSize = 16 * hScale;
    heroes.forEach((h, i) => {
      const cols = Math.min(3, heroes.length);
      const col = i % cols, row = Math.floor(i / cols);
      const bob = (h.down || reducedMotion) ? 0 : Math.round(Math.sin(ts / 320 + i * 1.4) * 3);
      const x = 30 + col * (hSize + 16), y = H - 20 - hSize - row * (hSize + 14) + bob;
      h._x = x; h._y = y; h._size = hSize;
      const def = Sprites.registry[h.sprite];
      ctx.globalAlpha = h.morto ? 0.22 : h.down ? 0.35 : 1;
      Sprites.drawSprite(ctx, def.map, def.palette, x, y, hScale);
      ctx.globalAlpha = 1;
      if (h.morto) { ctx.font = "18px 'Press Start 2P'"; ctx.fillText('👻', x + hSize / 2 - 10, y - 6); }
      else if (h.down) { ctx.fillStyle = '#e05252'; ctx.font = "16px 'Press Start 2P'"; ctx.fillText('✖', x + hSize / 2 - 8, y + hSize / 2); }
    });

    // nemici a destra
    const alive = battle.enemies;
    const eScale = battle.enemies.length > 2 ? 4 : 5;
    const eSize = 16 * eScale;
    alive.forEach((e, i) => {
      const bob = (e.dead || reducedMotion) ? 0 : Math.round(Math.sin(ts / 280 + i * 2.1) * 3);
      const x = W - 60 - eSize - (i % 3) * (eSize + 26);
      const y = 60 + Math.floor(i / 3) * (eSize + 30) + (i % 2) * 18 + bob;
      e._x = x; e._y = y; e._size = eSize;
      if (e.dead) { ctx.globalAlpha = 0.18; }
      const def = Sprites.registry[e.sprite];
      Sprites.drawSprite(ctx, def.map, def.palette, x, y, eScale, true);
      ctx.globalAlpha = 1;
      if (!e.dead) {
        // barra HP nemico — targhette SFALSATE per indice, così i gruppi ravvicinati non si coprono
        const lift = (i % 2) * 26;
        const bw = eSize, bh = 8;
        ctx.fillStyle = '#000'; ctx.fillRect(x - 2, y - 16 - lift, bw + 4, bh + 4);
        ctx.fillStyle = '#3a3045'; ctx.fillRect(x, y - 14 - lift, bw, bh);
        const frac = Math.max(0, e.hp / e.maxHp);
        ctx.fillStyle = frac > 0.5 ? '#5fca6a' : frac > 0.25 ? '#f5c542' : '#e05252';
        ctx.fillRect(x, y - 14 - lift, Math.floor(bw * frac), bh);
        // nome
        ctx.fillStyle = '#fff'; ctx.font = "9px 'Press Start 2P'"; ctx.textAlign = 'center';
        ctx.fillText((e.short || e.name.split(',')[0]).slice(0, 16), x + eSize / 2, y - 22 - lift);
        ctx.textAlign = 'left';
        if (e.stunned) { ctx.font = "14px 'Press Start 2P'"; ctx.fillText('💫', x + eSize - 10, y + 4); }
      }
    });
  }

  const now = () => (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const reducedMotion = (typeof matchMedia !== 'undefined') && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const raf = (typeof requestAnimationFrame !== 'undefined') ? requestAnimationFrame : null;
  const caf = (typeof cancelAnimationFrame !== 'undefined') ? cancelAnimationFrame : () => {};

  function render() {
    renderCanvas(now());
    Engine.renderPartyBar('combat-party-bar');
  }

  // ciclo di animazione: attivo solo durante il combattimento
  function animLoop(ts) {
    if (!battle || battle.over || !raf) return;
    if ($('screen-combat').classList.contains('active')) renderCanvas(ts);
    battle._raf = raf(animLoop);
  }

  // numeri di danno/cura fluttuanti sopra il canvas
  function floatText(cx, cy, text, cls = '') {
    const canvas = $('combat-canvas');
    const wrap = canvas.parentElement;
    const scale = canvas.clientWidth / canvas.width;
    const span = document.createElement('span');
    span.className = 'dmg-float ' + cls;
    span.textContent = text;
    span.style.left = Math.round(cx * scale) + 'px';
    span.style.top = Math.round(cy * scale) + 'px';
    wrap.appendChild(span);
    setTimeout(() => span.remove(), 1100);
  }

  /* ---------- gestione turni ---------- */

  function heroesAlive() { return G.party.some(h => !h.down && !h.preso && !h.morto && !h.rimasto); }
  function enemiesAlive() { return battle.enemies.some(e => !e.dead); }

  function nextTurn() {
    if (battle.over) return;
    if (!enemiesAlive()) return victory();
    if (!heroesAlive()) return defeat();

    battle.turnPtr++;
    if (battle.turnPtr >= battle.turnQueue.length) {
      battle.turnPtr = 0;
      battle.round++;
      if (battle.tauntRounds > 0) { battle.tauntRounds--; if (battle.tauntRounds === 0) battle.tauntHeroIdx = null; }
      if (battle.smokeRounds > 0) battle.smokeRounds--;
      for (const em of battle.enemies) { if (em.marked > 0) em.marked--; }
      log(`— Round ${battle.round} —`, 'log-turn');
    }

    const c = battle.turnQueue[battle.turnPtr];
    if (c.type === 'hero') {
      const h = G.party[c.idx];
      if (h.down || h.preso || h.morto || h.rimasto) return nextTurn();
      h.defending = false;
      if (h.rageRounds > 0) { h.rageRounds--; if (h.rageRounds === 0) log(`${h.name} si calma. La FURIA sfuma.`, 'log-info'); }
      heroTurn(c.idx);
    } else {
      const e = battle.enemies[c.idx];
      if (e.dead) return nextTurn();
      if (e.stunned) {
        e.stunned = false;
        log(`💫 ${e.name} è stordito e salta il turno!`, 'log-info');
        render();
        return setTimeout(nextTurn, 900);
      }
      setTimeout(() => enemyTurn(c.idx), 700);
    }
  }

  /* ---------- turno dell'eroe ---------- */

  function heroTurn(hIdx) {
    const h = G.party[hIdx];
    render();
    Engine.renderPartyBar('combat-party-bar', hIdx);
    const box = $('combat-actions');
    box.innerHTML = `<div class="action-title">▶ Turno di ${h.name}${h.player ? ' (' + h.player + ')' : ''}</div>`;

    const mkBtn = (html, fn, disabled = false) => {
      const b = document.createElement('button');
      b.className = 'action-btn';
      b.innerHTML = html;
      b.disabled = disabled;
      b.onclick = fn;
      box.appendChild(b);
      return b;
    };

    // attacco
    mkBtn(`⚔ ${h.attack.name} <span class="action-sub">${h.attack.desc} — tiro per colpire</span>`,
      () => pickTarget(t => heroAttack(hIdx, t)));

    // abilità
    for (const ab of h.abilities) {
      const left = G.uses[h.id][ab.id];
      mkBtn(`✨ ${ab.name} (${left}) <span class="action-sub">${ab.desc}</span>`,
        () => useAbility(hIdx, ab), left <= 0);
    }

    // pozioni (un bottone per ogni tipo di pozione posseduta)
    // difensivo: un id sconosciuto nello zaino non deve far crashare il combattimento
    const potions = G.inventory.filter(it => ITEMS[it] && ITEMS[it].usable);
    const ignoti = G.inventory.filter(it => !ITEMS[it]);
    if (ignoti.length) console.warn('Zaino con oggetti sconosciuti (ignorati):', ignoti.join(', '));
    for (const type of [...new Set(potions)]) {
      const count = potions.filter(p => p === type).length;
      mkBtn(`🧪 ${ITEMS[type].name} (x${count}) <span class="action-sub">${ITEMS[type].desc} Scegli chi la beve.</span>`,
        () => pickAlly(a => usePotion(hIdx, a, type), true));
    }

    // oggetti da lancio
    const throwables = G.inventory.filter(it => ITEMS[it] && ITEMS[it].combat);
    for (const type of [...new Set(throwables)]) {
      const count = throwables.filter(p => p === type).length;
      mkBtn(`${ITEMS[type].icon || '🎯'} ${ITEMS[type].name} (x${count}) <span class="action-sub">${ITEMS[type].desc}</span>`,
        () => ITEMS[type].combat.calm ? useThrowable(hIdx, 0, type) : pickTarget(t => useThrowable(hIdx, t, type)));
    }

    // difesa
    mkBtn(`🛡 Difesa totale <span class="action-sub">+3 alla tua CA fino al prossimo turno</span>`, () => {
      h.defending = true;
      log(`🛡 ${h.name} si mette in guardia (+3 CA).`, 'log-info');
      endHeroAction();
    });
  }

  function pickTarget(fn, noBack = false) {
    const box = $('combat-actions');
    box.innerHTML = `<div class="action-title">Scegli il bersaglio:</div>`;
    battle.enemies.forEach((e, i) => {
      if (e.dead) return;
      const b = document.createElement('button');
      b.className = 'action-btn target-btn';
      b.innerHTML = `🎯 ${e.name} <span class="action-sub">PV ${e.hp}/${e.maxHp} · CA ${e.ac}${e.undead ? ' · non-morto' : ''}</span>`;
      b.onclick = () => fn(i);
      box.appendChild(b);
    });
    if (noBack) return;
    const back = document.createElement('button');
    back.className = 'action-btn';
    back.innerHTML = '↩ Indietro';
    back.onclick = () => heroTurn(currentHeroIdx());
    box.appendChild(back);
  }

  function pickAlly(fn, includeDown = false) {
    const box = $('combat-actions');
    box.innerHTML = `<div class="action-title">Scegli il compagno:</div>`;
    G.party.forEach((h, i) => {
      if (h.morto) return; // chi si è PRESO il Coro non beve e non si medica: serve l'Àncora di Voce
      if (h.down && !includeDown) return;
      const b = document.createElement('button');
      b.className = 'action-btn target-btn';
      b.innerHTML = `${h.down ? '💀' : '❤'} ${h.name} <span class="action-sub">PV ${h.hp}/${h.maxHp}${h.down ? ' — A TERRA: rialzalo!' : ''}</span>`;
      b.onclick = () => fn(i);
      box.appendChild(b);
    });
    const back = document.createElement('button');
    back.className = 'action-btn';
    back.innerHTML = '↩ Indietro';
    back.onclick = () => heroTurn(currentHeroIdx());
    box.appendChild(back);
  }

  function currentHeroIdx() {
    const c = battle.turnQueue[battle.turnPtr];
    return c.idx;
  }

  function firstRoundAdvantage() {
    return battle.round === 1 && battle.isBoss && G.flags.sorpresa;
  }

  function heroAttack(hIdx, tIdx, opts = {}) {
    const h = G.party[hIdx];
    const e = battle.enemies[tIdx];
    // le abilità usano la LORO statistica (es. Sacra Folgore -> SAG), altrimenti quella dell'arma
    const stat = opts.stat || h.attack.stat;
    let mod = heroMod(h, stat);
    if (G.flags.sa_sesta_cisterna) mod += 1;
    if (G.flags.ciro_in_squadra && !G.party.some(x => x.id === 'ciro' && !x.morto)) mod += 1;
    if (opts.modOverride != null) mod = opts.modOverride;
    Dice.showRoll({
      title: `${h.name}: ${opts.label || h.attack.name}<br>contro ${e.name} (CA ${e.ac})`,
      mod, dc: e.ac,
      advantage: opts.advantage || firstRoundAdvantage() || !!e.marked,
      onDone: res => {
        /* Un ritiro a testa, una volta per scontro, e ognuno se lo guadagna col mestiere
           suo. Ciro sempre (cinquant'anni di gaffa); Claudia solo se ha ancora la GoPro
           addosso — e se l'ha già montata sull'asta per farne l'occhio lungo, questo
           ritiro non c'è più. È un baratto, e si vede. */
        if (res.fumble && h.id === 'ciro' && !h.luckUsed) {
          h.luckUsed = true;
          log(`🪝 <b>Cinquant'anni di gaffa.</b> La mano di Ciro non sbaglia due volte: ritira il dado! "Signò, con questa ho tirato su cernie che pesavano come lei."`, 'log-crit');
          return heroAttack(hIdx, tIdx, opts);
        }
        if (res.fumble && h.id === 'claudia' && G.inventory.includes('gopro') && !h.luckUsed) {
          h.luckUsed = true;
          log(`📹 La GoPro stava registrando. Claudia rivede il fotogramma, capisce dov'era il braccio, e <b>rifà la presa</b>: ritira il dado! "È tutto il mio mestiere."`, 'log-crit');
          return heroAttack(hIdx, tIdx, opts);
        }
        if (res.success) {
          if (G.difficulty !== 'facile' && e.special === 'evasive' && !res.crit && Math.random() < 0.4) {
            log(`💨 ${e.name} si scompone in pagine — il colpo lo attraversa!`, 'log-info');
            floatText(e._x + e._size / 2, e._y, 'SCHIVATO', 'float-miss');
            render(); endHeroAction(); return;
          }
          const dice = opts.dice || h.attack.dice;
          let dmgRoll = Dice.rollDice(dice[0], dice[1]);
          // abilità: solo il modificatore della loro statistica; arma base: stat + bonus arma
          const baseBonus = opts.stat ? heroMod(h, opts.stat) : heroMod(h, h.attack.stat) + (h.attack.bonus || 0);
          let dmg = dmgRoll.total + (opts.dmgBonus != null ? opts.dmgBonus : baseBonus);
          if (res.crit) { const extra = Dice.rollDice(dice[0], dice[1]); dmg += extra.total; }
          if (h.rageRounds > 0) dmg += 3;
          if (opts.holy && e.undead) dmg *= 2;
          e.hp -= dmg;
          const verbi = ['colpisce', 'centra in pieno', 'travolge', 'raggiunge', 'sorprende', 'castiga'];
          const verbo = res.crit ? 'DEVASTA' : verbi[Math.floor(Math.random() * verbi.length)];
          log(`${res.crit ? '💥 <b>CRITICO!</b> ' : ''}⚔ ${h.name} ${verbo} ${e.name}: <b>${dmg} danni</b>${opts.holy && e.undead ? ' (DOPPI sul non-morto!)' : ''}.`, res.crit ? 'log-crit' : 'log-hit');
          if (typeof Sound !== 'undefined') Sound.play('hit');
          floatText(e._x + e._size / 2, e._y, `-${dmg}`, res.crit ? 'float-crit' : 'float-dmg');
          checkEnemyDeath(e);
        } else {
          log(`${h.name} manca ${e.name}. ${res.fumble ? 'Malissimo. Con stile, ma malissimo.' : ''}`, 'log-info');
          floatText(e._x + e._size / 2, e._y, 'MANCATO', 'float-miss');
        }
        render();
        if (opts.after) opts.after(res); else endHeroAction();
      },
    });
  }

  function useAbility(hIdx, ab) {
    const h = G.party[hIdx];
    const spend = () => { G.uses[h.id][ab.id]--; };

    switch (ab.type) {
      case 'taunt':
        spend();
        battle.tauntHeroIdx = hIdx; battle.tauntRounds = 2;
        log(`📣 <b>${ab.name}!</b> Tutti gli occhi (quelli che ci sono) su ${h.name}, che subisce metà danni!`, 'log-crit');
        endHeroAction();
        break;

      case 'bighit':
        pickTarget(t => { spend(); heroAttack(hIdx, t, { dice: ab.dice, label: ab.name, stat: ab.stat }); });
        break;

      case 'autohit': {
        pickTarget(t => {
          spend();
          const e = battle.enemies[t];
          const dmg = Dice.rollDice(ab.dice[0], ab.dice[1]).total + (ab.bonus || 0);
          log(`✨ <b>${ab.name}</b>: i dardi inseguono ${e.name} e colpiscono SEMPRE: <b>${dmg} danni</b>.`, 'log-hit');
          e.hp -= dmg; checkEnemyDeath(e); render(); endHeroAction();
        });
        break;
      }

      case 'aoe': {
        spend();
        log(`🔥 <b>${ab.name}!</b>`, 'log-crit');
        let killed = 0;
        for (const e of battle.enemies) {
          if (e.dead) continue;
          const dmg = Dice.rollDice(ab.dice[0], ab.dice[1]).total;
          e.hp -= dmg;
          log(`🔥 ${e.name} investito dalle fiamme: <b>${dmg} danni</b>.`, 'log-hit');
          if (checkEnemyDeath(e, true)) killed++;
        }
        render(); endHeroAction();
        break;
      }

      case 'sneak':
        pickTarget(t => { spend(); heroAttack(hIdx, t, { dice: ab.dice, label: ab.name, stat: ab.stat, advantage: true }); });
        break;

      case 'smoke':
        spend();
        battle.smokeRounds = 2;
        log(`💨 <b>${ab.name}!</b> PUFF! Il campo si riempie di fumo: i nemici attaccano con SVANTAGGIO!`, 'log-crit');
        endHeroAction();
        break;

      case 'heal':
        pickAlly(a => {
          spend();
          const ally = G.party[a];
          const amount = Dice.rollDice(ab.dice[0], ab.dice[1]).total + (ab.bonus || 0);
          const wasDown = ally.down;
          ally.down = false;
          ally.hp = Math.min(ally.maxHp, Math.max(0, ally.hp) + amount);
          log(`✨ <b>${ab.name}</b>: ${ally.name} ${wasDown ? 'SI RIALZA e ' : ''}recupera <b>${amount} PV</b>!`, 'log-heal');
          if (ally._x != null) floatText(ally._x + ally._size / 2, ally._y, `+${amount}`, 'float-heal');
          if (typeof Sound !== 'undefined') Sound.play('heal');
          render(); endHeroAction();
        }, true);
        break;

      case 'holy':
        pickTarget(t => { spend(); heroAttack(hIdx, t, { dice: ab.dice, label: ab.name, stat: ab.stat, holy: true }); });
        break;

      case 'double':
        pickTarget(t1 => {
          spend();
          heroAttack(hIdx, t1, { dice: ab.dice, label: ab.name + ' (1º colpo)', stat: ab.stat, after: () => {
            if (!enemiesAlive()) return victory();
            pickTarget(t2 => heroAttack(hIdx, t2, { dice: ab.dice, label: ab.name + ' (2º colpo)', stat: ab.stat }), true);
          }});
        });
        break;

      case 'pet':
        pickTarget(t => {
          spend();
          const e = battle.enemies[t];
          const dmg = Dice.rollDice(ab.dice[0], ab.dice[1]).total + (ab.bonus || 0);
          e.hp -= dmg; e.distracted = true;
          log(`💡 <b>${ab.name}!</b> ${e.name} subisce <b>${dmg} danni</b> ed è accecato (svantaggio al prossimo attacco). Nella casa grigia, la luce vera FA MALE.`, 'log-crit');
          checkEnemyDeath(e); render(); endHeroAction();
        });
        break;

      case 'rage':
        spend();
        G.party[hIdx].rageRounds = 4; // conta anche il turno corrente
        log(`💢 <b>${ab.name}!</b> (+3 danni, -2 danni subiti per 3 turni.) Le cose fanno un passo indietro. Sagge.`, 'log-crit');
        endHeroAction();
        break;

      case 'guard':
        pickAlly(a => {
          if (a === hIdx) { heroTurn(hIdx); return; }
          spend();
          battle.guardHeroIdx = hIdx; battle.guardedAllyIdx = a;
          log(`🛡 <b>${ab.name}!</b> ${h.name} si piazza davanti a ${G.party[a].name}: il prossimo attacco viene intercettato!`, 'log-crit');
          endHeroAction();
        });
        break;

      case 'mark':
        pickTarget(t => {
          spend();
          const e = battle.enemies[t];
          e.marked = 2;
          log(`🎯 <b>${ab.name}!</b> ${h.name} indica il punto debole di ${e.name}: tutti gli attacchi avranno <b>VANTAGGIO</b>!`, 'log-crit');
          render(); endHeroAction();
        });
        break;

      case 'stun':
        pickTarget(t => {
          spend();
          heroAttack(hIdx, t, { dice: ab.dice, label: ab.name, stat: ab.stat, after: res => {
            if (res.success) {
              const e = battle.enemies[t];
              if (!e.dead) { e.stunned = true; log(`💫 ${e.name} è STORDITO: salterà il prossimo turno!`, 'log-crit'); }
            }
            render(); endHeroAction();
          }});
        });
        break;

      default:
        endHeroAction();
    }
  }

  function useThrowable(hIdx, tIdx, itemId) {
    const item = ITEMS[itemId];
    const i = G.inventory.indexOf(itemId);
    if (i >= 0) G.inventory.splice(i, 1);
    if (item.combat.calm) {
      // la playlist dell'estate: la musica VIVA ferma le cose grigie
      let stunned = 0;
      for (const e of battle.enemies) {
        if (e.dead) continue;
        if (e.boss) { e.distracted = true; }
        else { e.stunned = true; stunned++; }
      }
      battle.smokeRounds = Math.max(battle.smokeRounds, 1);
      log(`🔊 ${G.party[hIdx].name} preme PLAY a tutto volume: la playlist dell'estate riempie la stanza di roba VIVA. ${stunned ? `<b>${stunned} cose si FERMANO ad ascoltare</b>` : 'Le cose esitano'}${battle.enemies.some(e => e.boss && !e.dead) ? ' — e perfino la cosa grande, per un attimo, ricorda com\'era avere un\'estate' : ''}. Poi la batteria muore.`, 'log-crit');
      if (typeof Sound !== 'undefined') Sound.play('heal');
      render(); endHeroAction();
      return;
    }
    if (item.combat.all) {
      // colpisce TUTTI i nemici vivi
      log(`${item.icon || '🎯'} ${G.party[hIdx].name} lancia ${item.name}: la stanza DIVAMPA!`, 'log-crit');
      for (const en of battle.enemies) {
        if (en.dead) continue;
        let d = Dice.rollDice(item.combat.dice[0], item.combat.dice[1]).total;
        if (item.combat.holy && en.undead) d *= 2;
        en.hp -= d;
        if (item.combat.distract && en.hp > 0) en.distracted = true;
        log(`🔥 ${en.name}: <b>${d} danni</b>${item.combat.distract && en.hp > 0 ? ' (accecato)' : ''}.`, 'log-hit');
        if (en._x != null) floatText(en._x + en._size / 2, en._y, `-${d}`, 'float-dmg');
        checkEnemyDeath(en);
      }
      if (typeof Sound !== 'undefined') Sound.play('hit');
      render(); endHeroAction();
      return;
    }
    const e = battle.enemies[tIdx];
    let dmg = Dice.rollDice(item.combat.dice[0], item.combat.dice[1]).total;
    const doubled = item.combat.holy && e.undead;
    if (doubled) dmg *= 2;
    e.hp -= dmg;
    let extra = '';
    if (item.combat.distract && !e.dead) { e.distracted = true; extra = item.combat.distractText || ' Il tanfo lo stordisce: svantaggio al prossimo attacco!'; }
    log(`${item.icon || '🎯'} ${G.party[hIdx].name} lancia ${item.name} su ${e.name}: <b>${dmg} danni</b>${doubled ? ' (DOPPI sul non-morto!)' : ''}.${extra}`, 'log-hit');
    if (e._x != null) floatText(e._x + e._size / 2, e._y, `-${dmg}`, 'float-dmg');
    if (typeof Sound !== 'undefined') Sound.play('hit');
    checkEnemyDeath(e); render(); endHeroAction();
  }

  function usePotion(hIdx, allyIdx, itemId) {
    const ally = G.party[allyIdx];
    const item = ITEMS[itemId];
    const i = G.inventory.indexOf(itemId);
    if (i >= 0) G.inventory.splice(i, 1);
    if (item.recharge) {
      // il caffè della moka di Ada: abilità di nuovo cariche, anche in piena battaglia
      for (const ab of ally.abilities) G.uses[ally.id][ab.id] = ab.uses;
      log(`☕ ${G.party[hIdx].name} passa il caffè a ${ally.name}: TUTTE le abilità ricaricate. Nero, bollente, VIVO.`, 'log-heal');
      if (typeof Sound !== 'undefined') Sound.play('heal');
      render(); endHeroAction();
      return;
    }
    const wasDown = ally.down;
    ally.down = false;
    ally.hp = Math.min(ally.maxHp, Math.max(0, ally.hp) + item.heal);
    log(`🧪 ${G.party[hIdx].name} usa ${item.name} su ${ally.name}: ${wasDown ? 'SI RIALZA e ' : ''}recupera <b>${item.heal} PV</b>!`, 'log-heal');
    if (ally._x != null) floatText(ally._x + ally._size / 2, ally._y, `+${item.heal}`, 'float-heal');
    if (typeof Sound !== 'undefined') Sound.play('heal');
    render(); endHeroAction();
  }

  function checkEnemyDeath(e, silentRender = false) {
    if (!e.dead && e.hp <= 0) {
      e.hp = 0; e.dead = true;
      log(`☠ <b>${e.name} è sconfitto!</b>`, 'log-crit');
      return true;
    }
    return false;
  }

  function endHeroAction() {
    $('combat-actions').innerHTML = '<div class="action-title">…</div>';
    render();
    Engine.saveGame();
    setTimeout(nextTurn, 500);
  }

  /* ---------- turno del nemico ---------- */

  function pickHeroTarget(e) {
    if (battle.tauntHeroIdx != null && !G.party[battle.tauntHeroIdx].down && !G.party[battle.tauntHeroIdx].morto) return battle.tauntHeroIdx;
    const alive = G.party.map((h, i) => ({ h, i })).filter(x => !x.h.down && !x.h.preso && !x.h.morto && !x.h.rimasto);
    if (!alive.length) return -1;
    if (e.ai === 'weakest') { alive.sort((a, b) => a.h.hp - b.h.hp); return alive[0].i; }
    if (e.ai === 'strongest') { alive.sort((a, b) => b.h.hp - a.h.hp); return alive[0].i; }
    if (e.ai === 'smart') {
      // il boss punta il guaritore, poi il più debole
      const healer = alive.find(x => x.h.id === 'ciro');
      if (healer && Math.random() < 0.5) return healer.i;
      alive.sort((a, b) => a.h.hp - b.h.hp);
      return alive[0].i;
    }
    return alive[Math.floor(Math.random() * alive.length)].i;
  }

  function enemyTurn(eIdx) {
    const e = battle.enemies[eIdx];
    let tIdx = pickHeroTarget(e);
    if (tIdx < 0) return defeat();
    if (battle.guardedAllyIdx === tIdx && battle.guardHeroIdx != null && !G.party[battle.guardHeroIdx].down) {
      const guardian = G.party[battle.guardHeroIdx];
      log(`🛡 ${guardian.name} si lancia davanti a ${G.party[tIdx].name} e intercetta il colpo!`, 'log-crit');
      tIdx = battle.guardHeroIdx;
      battle.guardHeroIdx = null; battle.guardedAllyIdx = null;
    }
    const h = G.party[tIdx];

    let atkBonus = e.attack.bonus;
    if (G.inventory.includes('ombrellone_gaeta')) atkBonus -= 1;
    if (battle.isBoss && G.flags.eleinad_vacilla && battle.round <= 2) atkBonus -= 1;
    if (G.difficulty !== 'facile' && e.special === 'mirror') atkBonus = Math.max(atkBonus, (h.attack.bonus || 0) + 2);
    const desperate = G.difficulty === 'incubo' && e.hp <= Math.floor(e.maxHp * 0.25);
    if (desperate) atkBonus += 3;

    let die = Dice.roll(20);
    const disadv = battle.smokeRounds > 0 || e.distracted;
    if (disadv) { const d2 = Dice.roll(20); die = Math.min(die, d2); }
    e.distracted = false;

    let ca = h.ac + (h.defending ? 3 : 0);
    if (h.latched) { ca -= 2; h.latched = false; }
    const total = die + atkBonus;
    const crit = die === 20, fumble = die === 1 || (G.difficulty === 'facile' && die === 2);

    if (!fumble && (crit || total >= ca)) {
      let dmg = Dice.rollDice(e.attack.dice[0], e.attack.dice[1]).total + e.attack.plus;
      if (crit) dmg += Dice.rollDice(e.attack.dice[0], e.attack.dice[1]).total;
      if (desperate) dmg += 2;
      // riduzioni
      if (h.rageRounds > 0) dmg = Math.max(1, dmg - 2);
      if (battle.tauntHeroIdx === tIdx) dmg = Math.max(1, Math.floor(dmg / 2));
      h.hp -= dmg;
      log(`${crit ? '💥 <b>CRITICO!</b> ' : ''}${desperate ? '🔥 ' : ''}🗡 ${e.name} colpisce ${h.name} con ${e.attack.name}: <b>${dmg} danni</b>${desperate ? ' (FURIA DISPERATA!)' : ''}.`, crit ? 'log-crit' : 'log-hit');
      if (typeof Sound !== 'undefined') Sound.play('hit');
      if (h._x != null) floatText(h._x + h._size / 2, h._y, `-${dmg}`, 'float-dmg');
      // il vampiro si nutre dei colpi che mette a segno
      if (e.lifesteal && e.hp > 0 && e.hp < e.maxHp) {
        const drain = Math.min(Math.ceil(dmg / 2), e.maxHp - e.hp);
        if (drain > 0) {
          e.hp += drain;
          log(`🩶 ${e.name.split(',')[0]} BEVE il colore del colpo e recupera <b>${drain} PV</b>. È così che si nutre. Di voi.`, 'log-hit');
          if (e._x != null) floatText(e._x + e._size / 2, e._y, `+${drain}`, 'float-heal');
        }
      }
      if (G.difficulty !== 'facile' && e.special === 'latch' && !h.down) {
        h.latched = true;
        log(`🧟 Il ${e.short || e.name} si aggrappa a ${h.name} con dita molli — <b>-2 CA</b> al prossimo attacco!`, 'log-hit');
      }
      if (G.difficulty !== 'facile' && e.special === 'poisonOnHit' && !h.veleno && !h.down && Math.random() < 0.3) {
        h.veleno = true;
        log(`🥶 La dimostrazione di sicurezza della ${e.short || e.name} si insinua — ${h.name} è <b>INGRIGITO</b>! (-2 a tutto)`, 'log-crit');
      }
      if (G.difficulty !== 'facile' && e.special === 'cleave') {
        const others = G.party.filter((o, i) => i !== tIdx && !o.down && !o.preso && !o.rimasto);
        if (others.length > 0) {
          const splash = others[Math.floor(Math.random() * others.length)];
          const splashDmg = Math.max(1, Math.floor(dmg / 2));
          splash.hp -= splashDmg;
          log(`📬 Lo sciame prosegue — ${splash.name} viene tagliato dalle buste: <b>${splashDmg} danni</b>!`, 'log-hit');
          if (splash._x != null) floatText(splash._x + splash._size / 2, splash._y, `-${splashDmg}`, 'float-dmg');
          if (splash.hp <= 0) { splash.hp = 0; splash.down = true; log(`💀 <b>${splash.name} cade a terra!</b>`, 'log-hit'); }
        }
      }
      if (h.hp <= 0) {
        if (G.difficulty === 'facile' && !h._stabilized) {
          h._stabilized = true;
          h.hp = 1;
          log(`🛡 ${h.name} barcolla ma RESISTE! L'adrenalina lo tiene in piedi con <b>1 PV</b>.`, 'log-heal');
          if (h._x != null) floatText(h._x + h._size / 2, h._y, 'RESISTE!', 'float-heal');
        } else {
          h.hp = 0; h.down = true;
          log(`💀 <b>${h.name} cade a terra!</b> Serve una cura o una pozione per rialzarlo!`, 'log-hit');
        }
      }
    } else {
      log(`🗡 ${e.name} attacca ${h.name}${h.defending ? ' (in difesa)' : ''}... e MANCA${fumble ? ' clamorosamente' : ''}!${disadv ? ' (svantaggio)' : ''}`, 'log-info');
    }

    render();
    setTimeout(nextTurn, 850);
  }

  /* ---------- esiti ---------- */

  function victory() {
    if (battle.over) return;
    battle.over = true;
    if (battle._raf) caf(battle._raf);
    const banner = $('combat-banner');
    banner.textContent = '🏆 VITTORIA! 🏆';
    banner.classList.add('victory');
    banner.classList.remove('hidden');
    if (typeof Sound !== 'undefined') Sound.play('victory');
    $('combat-actions').innerHTML = '';

    G.stats.combats++;
    G.party.forEach(h => { if (h._manoAc) { h.ac -= 1; delete h._manoAc; } if (h._idroAc) { h.ac -= 1; delete h._idroAc; } });
    if (battle.isBoss && G.flags.sorpresa) G.flags.sorpresa = false; // l'effetto sorpresa si consuma
    // gli eroi a terra si rialzano con 1 PV (i PRESI no: serve l'Àncora di Voce)
    for (const h of G.party) if (h.down && !h.morto) { h.down = false; h.hp = 1; }

    const loot = battle.def.loot || {};
    if (loot.gold) {
      G.gold = Math.min(typeof FIATO_MAX !== 'undefined' ? FIATO_MAX : 20, G.gold + loot.gold);
      log(`🫁 Finito. Vi appoggiate a qualcosa e respirate a fondo per la prima volta da dieci minuti: <b>+${loot.gold} Fiato</b> (ora ${G.gold}). Con questo fiato scendete a circa ${typeof metriPossibili === 'function' ? metriPossibili() : '?'} metri.`, 'log-heal'); }
    if (loot.items) for (const it of loot.items) { G.inventory.push(it); log(`🎁 Trovato: <b>${ITEMS[it].name}</b>!`, 'log-heal'); }

    const next = battle.def.victory;
    setTimeout(() => {
      banner.classList.add('hidden');
      Engine.gotoScene(next);
    }, 1800);
  }

  function defeat() {
    if (battle.over) return;
    battle.over = true;
    if (battle._raf) caf(battle._raf);
    G.party.forEach(h => { if (h._manoAc) { h.ac -= 1; delete h._manoAc; } if (h._idroAc) { h.ac -= 1; delete h._idroAc; } });
    const banner = $('combat-banner');
    banner.textContent = '💀 VI HANNO PRESI TUTTI 💀';
    banner.classList.remove('hidden', 'victory');
    if (typeof Sound !== 'undefined') Sound.play('defeat');
    $('combat-actions').innerHTML = '';

    /* ÀNCORA DI VOCE: l'oggetto craftato che paga la morte.
       Se ce l'avete addosso, si consuma e vi tira su tutti. Una volta sola per copia. */
    if (G.inventory.includes('ancora_di_voce')) {
      G.inventory.splice(G.inventory.indexOf('ancora_di_voce'), 1);
      G.party.forEach(h => { if (!h.morto) { h.down = false; h.preso = false; h.hp = Math.max(1, Math.round(h.maxHp * 0.5)); } });
      battle.over = false;
      banner.textContent = '⚓ L\'ÀNCORA TIENE';
      log(`⚓ <b>L'Àncora di Voce si spacca in mano.</b> Dentro c'era la vostra voce, registrata quando eravate ancora voi, che dice il vostro nome giusto. Ve lo sentite addosso come una mano sulla spalla e vi tirate su tutti e due a metà PV. L'oggetto è finito: adesso quella voce non c'è più da nessuna parte.`, 'log-crit');
      setTimeout(() => { banner.classList.add('hidden'); nextTurn(); }, 2200);
      return;
    }

    /* Nessuna àncora: si riparte dall'ULTIMO CHECKPOINT, non dal menu.
       Il gioco continua, ma quello che avevate capito da lì in poi lo avete perso. */
    const cp = G.lastCheckpoint;
    setTimeout(() => {
      banner.classList.add('hidden');
      if (cp && cp.snapshot) { Engine.riprendiDaCheckpoint(); return; }
      Engine.gotoScene(battle.def.defeat);
    }, 2200);
  }

  return { start };
})();
