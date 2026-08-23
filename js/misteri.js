/* ============ MISTERI — il Quaderno degli indizi (modulo riusabile della serie) ============
   I misteri vivono in campaign.js (const MISTERI). Formato:
     { id, titolo, domanda, indizi: [{ flag, testo }], premio: { testo, flag } }
   Ogni indizio è un FLAG impostato da una scena: il Quaderno mostra quelli trovati e
   lascia "?" sugli slot vuoti (nessuno spoiler). Al 4/4 il mistero è RISOLTO: imposta
   `premio.flag`, che apre scelte nel finale.
   Vedi docs/DESIGN.md § 5.2                                                              */

const Misteri = (() => {

  const $ = id => document.getElementById(id);

  function statoDi(m) {
    const trovati = m.indizi.filter(i => G.flags[i.flag]);
    return { trovati, tot: m.indizi.length, risolto: trovati.length === m.indizi.length };
  }

  /* Da chiamare a ogni cambio scena: se un mistero è appena stato completato,
     imposta il flag del premio e lo annuncia. */
  function check() {
    if (typeof MISTERI === 'undefined' || !G) return;
    for (const m of MISTERI) {
      const s = statoDi(m);
      if (s.risolto && !G.flags[m.premio.flag]) {
        G.flags[m.premio.flag] = true;
        if (typeof Sound !== 'undefined') Sound.play('sigillo');
        setTimeout(() => {
          const box = $('modal-generic-content');
          box.innerHTML = `<h2>🕯 MISTERO RISOLTO</h2>
            <p style="color:var(--gold);font-size:21px;margin-bottom:8px">${m.titolo}</p>
            <div class="backstory" style="white-space:pre-wrap">${m.premio.testo}</div>
            <p style="color:var(--text-dim);margin-top:10px">Il Quaderno si aggiorna. Quello che sapete, adesso, si può USARE.</p>
            <button class="btn btn-gold" style="margin-top:12px" onclick="document.getElementById('modal-generic').classList.add('hidden')">▶ Avanti</button>`;
          $('modal-generic').classList.remove('hidden');
        }, 700);
        Engine.saveGame();
      }
    }
  }

  /* barra dell'ATTENZIONE del Coro: 0-6, sale scendendo e ascoltando */
  function barraAttenzione() {
    const a = Math.max(0, Math.min(6, (G.flags && G.flags.attenzione) || 0));
    /* ▓ e ░ si impastano in un blocco grigio: da lontano il livello non si legge.
       Cerchio pieno contro cerchio vuoto si distingue, e il numero toglie ogni dubbio. */
    return '●'.repeat(a) + '○'.repeat(6 - a) + ' ' + a + '/6';
  }

  function show() {
    const box = $('modal-generic-content');
    let html = `<h2>🕯 Il Quaderno</h2>`;

    // attenzione del Coro
    const a = (G.flags && G.flags.attenzione) || 0;
    const avviso = a >= 5 ? 'Vi hanno notato. TUTTI.' : a >= 3 ? 'Qualcosa vi segue con l\'orecchio.' : a >= 1 ? 'Qualcosa si è girato, laggiù.' : 'Per ora, niente vi ascolta.';
    html += `<div class="ability-box" style="border-left:5px solid var(--red)">
      <span class="ability-name">🎵 Quanto vi hanno notato: ${barraAttenzione()}</span>
      <div class="ability-desc">${avviso} Sale ogni volta che scendete sotto i quindici metri o che vi fermate ad ascoltare. Nell'ultima immersione decide <b>quanti vengono a prendervi</b>.</div></div>`;

    // ricette
    if (typeof Crafting !== 'undefined') {
      const p = Crafting.progress();
      html += `<div class="ability-box"><span class="ability-name">🔧 Cose messe insieme: ${p.fatte}/${p.tot}</span>
        <div class="ability-desc">${G.recipesDone && G.recipesDone.length ? G.recipesDone.map(o => ITEMS[o] ? ITEMS[o].name : o).join(' · ') : 'Ancora niente. Lo zaino è pieno di roba che non si parla.'}</div></div>`;
    }

    // misteri
    if (typeof MISTERI !== 'undefined') {
      for (const m of MISTERI) {
        const s = statoDi(m);
        const righe = m.indizi.map(i => G.flags[i.flag]
          ? `<div style="margin:4px 0">✅ ${i.testo}</div>`
          : `<div style="margin:4px 0;color:var(--text-dim)">❓ <i>— ancora niente —</i></div>`).join('');
        html += `<div class="ability-box" style="border-left:5px solid ${s.risolto ? 'var(--green)' : 'var(--border)'}">
          <span class="ability-name">${s.risolto ? '🗝' : '🕯'} ${m.titolo} <span style="color:var(--text-dim)">(${s.trovati.length}/${s.tot})</span></span>
          <div class="ability-desc"><i>${m.domanda}</i>${righe}
          ${s.risolto ? `<div style="margin-top:8px;color:var(--green)"><b>RISOLTO.</b> ${m.premio.testo.split('\n')[0]}</div>` : ''}</div></div>`;
      }
    }

    html += `<button class="btn" style="margin-top:12px" onclick="document.getElementById('modal-generic').classList.add('hidden')">✔ Chiudi</button>`;
    box.innerHTML = html;
    $('modal-generic').classList.remove('hidden');
  }

  function risolti() {
    if (typeof MISTERI === 'undefined') return 0;
    return MISTERI.filter(m => statoDi(m).risolto).length;
  }

  return { check, show, risolti, barraAttenzione };
})();
