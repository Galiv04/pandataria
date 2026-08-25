/* ============ PLAYTHROUGH — simulazioni complete headless (no browser) ============
   Uso: node tests/playthrough.mjs

   Basato sull'harness collaudato del Relais (a sua volta figlio della Corona):
   carica engine.js, combat.js, dice.js (+ dati) in un vm.Context Node con uno stub
   minimale di document/localStorage/timer, e gioca partite complete cliccando
   programmaticamente i bottoni generati dal gioco (choices, azioni di combattimento,
   overlay dei dadi, selezione eroe per le prove), esattamente come farebbe un utente.

   Novità della Casa gestite dall'harness:
   - unlockHero (Daniele): la modale arriva con setTimeout(600) → la coda timer dello
     stub la DRENA dentro act(), e la modale (solo informativa) viene chiusa.
   - choice.sacrifice: la modale di scelta dell'eroe viene cliccata (scenario.sacrificeHero).
   - killRoller: nessuna UI — muore chi ha tirato l'ultimo dado (G.lastRoller).
   - checkOutcomes: esiti dei tiri FORZATI per scena (Math.random pilotato solo durante
     il click dell'eroe nella modale della prova: 0.999 → 20 naturale, 0 → 1 naturale),
     per rendere deterministici i percorsi che dipendono dal dado.
   - forceLossAt: sconfitta VOLUTA in un combattimento specifico (solo Difesa totale).

   Obiettivo: scovare bug di RUNTIME (eccezioni, scene mancanti, loop infiniti,
   stato incoerente) che i controlli statici di validate.mjs non possono vedere. */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import vm from 'vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Ordine di caricamento IDENTICO a index.html (main.js escluso: qui non serve la UI del titolo).
const FILES = [
  'js/sound.js', 'js/sprites.js', 'js/scenes.js', 'js/characters.js', 'js/campaign.js',
  'js/epilogues.js', 'js/rules.js', 'js/dice.js', 'js/combat.js', 'js/minigames.js',
  'js/crafting.js', 'js/misteri.js', 'js/luoghi.js', 'js/dialoghi.js', 'js/engine.js',
];
const SOURCES = FILES.map(f => ({ name: f, code: readFileSync(join(root, f), 'utf8') }));

let failures = 0;
function fail(msg) { failures++; console.error('  ❌ FAIL:', msg); }
function section(name) { console.log('\n▶', name); }

/* ==================== RNG SEEDABILE ==================== */

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ==================== DOM FINTO MINIMALE ==================== */

function makeFakeCtx(canvasEl) {
  const store = { canvas: canvasEl };
  const noop = () => {};
  return new Proxy(store, {
    get(target, prop) {
      if (prop in target) return target[prop];
      if (prop === 'measureText') return () => ({ width: 8 });
      if (prop === 'createLinearGradient' || prop === 'createRadialGradient') {
        return () => ({ addColorStop: noop });
      }
      return noop;
    },
    set(target, prop, value) { target[prop] = value; return true; },
  });
}

class FakeElement {
  constructor(tag = 'div') {
    this.tagName = String(tag).toUpperCase();
    this._id = '';
    this._className = '';
    this.children = [];
    this.parentNode = null;
    this.style = {};
    this.dataset = {};
    this._innerHTML = '';
    this._textContent = '';
    this.disabled = false;
    this.value = '';
    this.onclick = null;
    this.oninput = null;
    this.width = 300;
    this.height = 150;
    this.clientWidth = 300;
    this.clientHeight = 150;
    this._ctx = null;
    this.scrollTop = 0;
    this.scrollHeight = 0;
    this._listeners = {};
  }
  get id() { return this._id; }
  set id(v) { this._id = v; }
  get className() { return this._className; }
  set className(v) { this._className = String(v); }
  get classList() {
    const self = this;
    const toks = () => self._className.split(/\s+/).filter(Boolean);
    return {
      add: (...cls) => { const s = new Set(toks()); cls.forEach(c => s.add(c)); self._className = [...s].join(' '); },
      remove: (...cls) => { const s = new Set(toks()); cls.forEach(c => s.delete(c)); self._className = [...s].join(' '); },
      contains: (c) => toks().includes(c),
      toggle: (c, force) => {
        const c_e = toks().includes(c);
        const vuole = force === undefined ? !c_e : !!force;
        if (vuole && !c_e) self.classList.add(c);
        else if (!vuole && c_e) self.classList.remove(c);
      },
    };
  }
  get innerHTML() { return this._innerHTML; }
  set innerHTML(v) { this._innerHTML = v; this.children = []; }
  get textContent() { return this._textContent; }
  set textContent(v) { this._textContent = String(v); }
  // Alias tollerante: alcuni punti del gioco leggono .parentElement (standard DOM) invece
  // di .parentNode. Se non è mai stato collegato a nulla (es. i canvas), si auto-crea
  // un contenitore fittizio.
  get parentElement() {
    if (!this.parentNode) this.parentNode = new FakeElement('div');
    return this.parentNode;
  }
  set parentElement(v) { this.parentNode = v; }
  appendChild(child) { this.children.push(child); child.parentNode = this; return child; }
  removeChild(child) { const i = this.children.indexOf(child); if (i >= 0) this.children.splice(i, 1); return child; }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
  addEventListener(type, fn) { (this._listeners[type] = this._listeners[type] || []).push(fn); }
  removeEventListener() {}
  querySelector() { return null; }
  querySelectorAll() { return []; }
  getContext(type) { if (!this._ctx) this._ctx = makeFakeCtx(this); return this._ctx; }
}

const CANVAS_SIZES = {
  'title-canvas': [480, 270], 'scene-canvas': [960, 360], 'combat-canvas': [960, 380],
  'dice-canvas': [140, 140], 'map-canvas': [720, 480],
};

const KNOWN_IDS_WITH_CLASS = {
  'screen-title': 'screen active', 'screen-howto': 'screen', 'screen-setup': 'screen',
  'screen-game': 'screen', 'screen-combat': 'screen',
  'modal-char': 'modal hidden', 'modal-generic': 'modal hidden', 'dice-overlay': 'modal hidden',
  'combat-banner': 'combat-banner hidden',
  'btn-dice-continue': 'btn btn-big hidden',
};

function makeDocument() {
  const elementsById = new Map();
  function getElementById(id) {
    if (!elementsById.has(id)) {
      const tag = /canvas/.test(id) ? 'canvas' : 'div';
      const el = new FakeElement(tag);
      el._id = id;
      if (KNOWN_IDS_WITH_CLASS[id] !== undefined) el.className = KNOWN_IDS_WITH_CLASS[id];
      if (CANVAS_SIZES[id]) { el.width = CANVAS_SIZES[id][0]; el.height = CANVAS_SIZES[id][1]; }
      elementsById.set(id, el);
    }
    return elementsById.get(id);
  }
  for (const id of Object.keys(KNOWN_IDS_WITH_CLASS)) getElementById(id);
  /* `document.documentElement.style.setProperty('--prof', …)`: il motore pilota la
     profondità percepita con una variabile CSS. Nel finto DOM serve un elemento
     radice con uno `style` che accetti setProperty, altrimenti renderScene esplode. */
  const documentElement = new FakeElement('html');
  documentElement.style = documentElement.style || {};
  documentElement.style.setProperty = (k, v) => { documentElement.style['_' + k] = v; };
  const body = new FakeElement('body');
  body.style = body.style || {};
  body.style.setProperty = () => {};

  return {
    documentElement,
    body,
    getElementById,
    createElement: (tag) => new FakeElement(tag),
    querySelectorAll(sel) {
      if (sel === '.screen') return [...elementsById.values()].filter(e => e.classList.contains('screen'));
      return [];
    },
    addEventListener() {},
  };
}

/* ==================== SANDBOX / CARICAMENTO SCRIPT ==================== */

const scriptCache = SOURCES.map(s => ({ name: s.name, script: new vm.Script(s.code, { filename: s.name }) }));
const scriptGetG = new vm.Script('(typeof G !== "undefined" ? G : null)');
let itemsRef = null;   // popolato da buildGame: serve a checkInvariants
const itemiIgnotiVisti = new Set();   // un oggetto sconosciuto si segnala UNA volta, non a ogni passo
const scriptGetApi = new vm.Script('({Engine, Combat, Dice, HEROES, BESTIARY, ITEMS, CAMPAIGN, CAMPAIGN_START, CHAPTERS, WORLD_MAP, Crafting, Misteri, RECIPES, MISTERI, CHECKPOINT_FLAGS, Luoghi, Dialoghi})');

function makeTimers() {
  let seq = 0;
  const timers = new Map();
  const pending = [];
  return {
    setTimeout(fn, _ms, ...args) {
      const id = ++seq;
      timers.set(id, { fn: () => fn(...args), repeat: false });
      pending.push(id);
      return id;
    },
    clearTimeout(id) { timers.delete(id); },
    setInterval(fn, _ms, ...args) {
      const id = ++seq;
      timers.set(id, { fn: () => fn(...args), repeat: true });
      pending.push(id);
      return id;
    },
    clearInterval(id) { timers.delete(id); },
    drain(maxSteps = 200000) {
      let steps = 0;
      while (pending.length) {
        steps++;
        if (steps > maxSteps) throw new Error('I timer non si esauriscono (probabile loop infinito in un setTimeout/setInterval del gioco)');
        const id = pending.shift();
        const t = timers.get(id);
        if (!t) continue;
        t.fn();
        if (t.repeat && timers.has(id)) pending.push(id);
      }
    },
  };
}

function buildGame(seed) {
  const doc = makeDocument();
  const storage = new Map();
  const localStorage = {
    getItem: k => (storage.has(k) ? storage.get(k) : null),
    setItem: (k, v) => storage.set(k, String(v)),
    removeItem: k => storage.delete(k),
  };
  const consoleErrors = [];
  const timers = makeTimers();
  const sandbox = {
    document: doc,
    window: {},
    localStorage,
    console: { log() {}, warn() {}, error: (...a) => consoleErrors.push(a.map(String).join(' ')), info() {} },
    setTimeout: timers.setTimeout,
    clearTimeout: timers.clearTimeout,
    setInterval: timers.setInterval,
    clearInterval: timers.clearInterval,
    btoa: (x) => Buffer.from(x, 'binary').toString('base64'),
    atob: (x) => Buffer.from(x, 'base64').toString('binary'),
  };
  const context = vm.createContext(sandbox);
  for (const { name, script } of scriptCache) {
    try { script.runInContext(context); } catch (e) { throw new Error(`Errore caricando ${name}: ${e.message}`); }
  }
  const ctxMath = vm.runInContext('Math', context);
  const gameRandom = mulberry32(seed);
  ctxMath.random = gameRandom;

  const api = scriptGetApi.runInContext(context);
  itemsRef = api.ITEMS;
  const getG = () => scriptGetG.runInContext(context);
  function act(fn) {
    const r = fn();
    timers.drain();
    return r;
  }
  // Math.random pilotato SOLO per la durata di fn (dado forzato: 0.999 → 20, 0 → 1)
  function withForcedRandom(value, fn) {
    ctxMath.random = () => value;
    try { return fn(); } finally { ctxMath.random = gameRandom; }
  }
  return { context, doc, api, getG, consoleErrors, act, withForcedRandom };
}

/* ==================== UTILITA' DI INTERAZIONE ==================== */

function buttons(el) { return el.children.filter(c => c.tagName === 'BUTTON'); }
function enabledButtons(el) { return buttons(el).filter(b => !b.disabled); }

function matchButton(list, matcher) {
  if (matcher == null) return null;
  if (typeof matcher === 'string') return list.find(b => b.innerHTML.includes(matcher)) || null;
  if (matcher instanceof RegExp) return list.find(b => matcher.test(b.innerHTML)) || null;
  if (typeof matcher === 'function') return list.find(matcher) || null;
  return null;
}

// La Casa scrive il nome completo della statistica ("Saggezza: +2"): il pattern
// cerca solo ": +N"/": -N" (identico al Relais).
function statModFromButton(html) {
  const m = html.match(/:\s*([+-]?\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}
function hpRatioFromButton(html) {
  const m = html.match(/PV\s*(\d+)\s*\/\s*(\d+)/);
  return m ? parseInt(m[1], 10) / Math.max(1, parseInt(m[2], 10)) : 1;
}

// Testo della barra del gruppo (per verificare 👻 SPIRITO / 🕸 PRESO / PV)
function partyBarText(doc, id = 'party-bar') {
  const bar = doc.getElementById(id);
  const collect = el => [el._innerHTML || '', ...el.children.map(collect)].join(' ');
  return collect(bar);
}

/* ==================== CONTROLLI DI COERENZA DELLO STATO ==================== */

function checkInvariants(G, where) {
  /* Un id nello zaino che non esiste in ITEMS è la causa più insidiosa di crash:
     ogni `ITEMS[it].qualcosa` esplode. Meglio scoprirlo qui, col nome. */
  if (G && G.inventory && itemsRef) {
    const ignoti = G.inventory.filter(it => !itemsRef[it] && !itemiIgnotiVisti.has(it));
    if (ignoti.length) {
      ignoti.forEach(i => itemiIgnotiVisti.add(i));   // una segnalazione per oggetto, non una per passo
      fail(`${where}: nello zaino ci sono oggetti che NON esistono in ITEMS: ${[...new Set(ignoti)].join(', ')}`);
    }
  }

  if (!G) return;
  if (!Number.isFinite(G.gold) || G.gold < 0) {
    throw new Error(`STATO INCOERENTE: Fiato invalido (${G.gold}) @ ${where}`);
  }
  for (const h of G.party) {
    if (!Number.isFinite(h.hp) || h.hp < 0 || h.hp > h.maxHp) {
      throw new Error(`STATO INCOERENTE: HP invalidi per "${h.id}" (${h.hp}/${h.maxHp}) @ ${where}`);
    }
    if (h.morto && h.hp !== 0) {
      throw new Error(`STATO INCOERENTE: PRESO DAL CORO con PV > 0 per "${h.id}" (${h.hp}) @ ${where}`);
    }
    if (h.veleno !== undefined && typeof h.veleno !== 'boolean') {
      throw new Error(`STATO INCOERENTE: h.veleno non booleano per "${h.id}" (${JSON.stringify(h.veleno)}) @ ${where}`);
    }
    if (h.preso !== undefined && typeof h.preso !== 'boolean') {
      throw new Error(`STATO INCOERENTE: h.preso non booleano per "${h.id}" (${JSON.stringify(h.preso)}) @ ${where}`);
    }
  }
  const vivi = G.party.filter(h => !h.morto).length;
  if (G.party.length && vivi === 0 && !/e_scambio|sacrificio/.test(where)) {
    throw new Error(`STATO INCOERENTE: TUTTO il gruppo risulta morto (killRoller sull'ultimo vivo?) @ ${where}`);
  }
  for (const hid of Object.keys(G.uses || {})) {
    for (const abid of Object.keys(G.uses[hid])) {
      const v = G.uses[hid][abid];
      if (!Number.isFinite(v) || v < 0) {
        throw new Error(`STATO INCOERENTE: usi negativi/non-numerici ${hid}.${abid} = ${v} @ ${where}`);
      }
    }
  }
}

/* ==================== STRATEGIA DI COMBATTIMENTO ==================== */

function classifyCombatMenu(btns) {
  if (btns.some(b => /^🎯/.test(b.innerHTML))) return 'target';
  if (btns.some(b => /^❤|^💀/.test(b.innerHTML))) return 'ally';
  return 'main';
}

function pickWeakestTarget(btns) {
  const targets = btns.filter(b => !/Indietro/.test(b.innerHTML));
  targets.sort((a, b) => hpRatioFromButton(a.innerHTML) - hpRatioFromButton(b.innerHTML));
  return targets[0] || btns[0];
}

function pickAllyForHealing(btns) {
  const allies = btns.filter(b => !/Indietro/.test(b.innerHTML));
  const down = allies.find(b => /A TERRA/.test(b.innerHTML));
  if (down) return down;
  allies.sort((a, b) => hpRatioFromButton(a.innerHTML) - hpRatioFromButton(b.innerHTML));
  return allies[0] || btns[0];
}

// Nomi delle abilità di cura VERE (type: 'heal'), non un match testuale a caso: alcuni
// oggetti curativi hanno la parola "cura" nel testo di ambientazione (es. il tronello:
// "rollato... con cura liturgica") senza essere pensati come pozioni d'emergenza.
function healAbilityNames(HEROES) {
  const names = new Set();
  for (const h of HEROES || []) for (const ab of (h.abilities || [])) if (ab.type === 'heal') names.add(ab.name);
  return names;
}
// Pozioni curative VERE, ordinate dalla più efficace: identificate dal dato di gioco
// (ITEMS[...].heal), non da un lessico indovinato sull'HTML del bottone. Il tronello
// di Natalino resta escluso: è il pegno che il Mercante esige per il Cuore di Colore,
// non una pozione d'emergenza qualunque — un giocatore accorto lo tiene da parte.
const RESERVED_ITEMS = new Set(['tronello']);
function healItemsByEffectiveness(ITEMS) {
  return Object.entries(ITEMS || {})
    .filter(([id, it]) => it.usable && typeof it.heal === 'number' && it.heal > 0 && !RESERVED_ITEMS.has(id))
    .sort((a, b) => b[1].heal - a[1].heal)
    .map(([, it]) => it);
}

function pickMainCombatAction(btns, turnCounter, G, api) {
  const enabled = btns.filter(b => !b.disabled);
  if (!enabled.length) return btns[0];
  // gli SPIRITI non contano: la morte vera non si cura con le pozioni
  const needHeal = G && G.party.some(h => !h.morto && (h.down || h.hp / h.maxHp < 0.35));
  if (needHeal && api) {
    for (const name of healAbilityNames(api.HEROES)) {
      const b = enabled.find(x => x.innerHTML.startsWith(`✨ ${name} `));
      if (b) return b;
    }
    for (const item of healItemsByEffectiveness(api.ITEMS)) {
      const b = enabled.find(x => x.innerHTML.startsWith(`🧪 ${item.name} `));
      if (b) return b;
    }
  }
  const attack = enabled.find(b => /^⚔/.test(b.innerHTML));
  const abilities = enabled.filter(b => /^✨/.test(b.innerHTML));
  const pool = [];
  if (attack) pool.push(attack);
  pool.push(...abilities);
  if (!pool.length) return enabled[0];
  return pool[turnCounter % pool.length];
}

function runCombat(game, scenario, state) {
  const { doc } = game;
  const LIMIT = 800;
  let steps = 0;
  let turnCounter = 0;
  while (true) {
    steps++;
    if (steps > LIMIT) throw new Error(`LOOP INFINITO sospetto nel combattimento (> ${LIMIT} azioni)`);

    const diceOverlay = doc.getElementById('dice-overlay');
    if (!diceOverlay.classList.contains('hidden')) {
      const btn = doc.getElementById('btn-dice-continue');
      if (typeof btn.onclick !== 'function') throw new Error('overlay dado visibile ma bottone "Continua" senza onclick');
      game.act(() => btn.onclick());
      checkInvariants(game.getG(), 'dopo tiro di dado in combattimento');
      continue;
    }
    const screenCombat = doc.getElementById('screen-combat');
    if (!screenCombat.classList.contains('active')) return; // combattimento risolto, siamo tornati alla scena

    const box = doc.getElementById('combat-actions');
    const btns = buttons(box);
    if (!btns.length) throw new Error('Nessuna azione di combattimento disponibile mentre "screen-combat" e\' attivo');

    const kind = classifyCombatMenu(btns);
    let chosen;
    if (state.strategy === 'passive' && kind === 'main') {
      chosen = btns.find(b => /Difesa totale/.test(b.innerHTML)) || enabledButtons(box)[0];
    } else if (kind === 'target') {
      chosen = pickWeakestTarget(btns);
    } else if (kind === 'ally') {
      chosen = pickAllyForHealing(btns);
    } else {
      chosen = pickMainCombatAction(btns, turnCounter++, game.getG(), game.api);
    }
    if (!chosen) throw new Error(`Nessuna azione selezionabile in combattimento (kind=${kind})`);
    game.act(() => chosen.onclick());
    checkInvariants(game.getG(), 'dopo azione di combattimento');
  }
}

/* ==================== STRATEGIA DI NAVIGAZIONE SCENE ==================== */

// L'hub h1 e il corridoio u1 si rivisitano: le "sequences" per-scenario indicano,
// in ORDINE, quale bottone scegliere a ogni visita successiva della stessa scena.
function pickSceneChoice(sceneId, btns, scenario, state) {
  const seq = scenario.sequences && scenario.sequences[sceneId];
  if (seq && seq.length) {
    state.seqIdx = state.seqIdx || {};
    const idx = state.seqIdx[sceneId] || 0;
    if (idx < seq.length) {
      const m = matchButton(btns, seq[idx]);
      if (m) { state.seqIdx[sceneId] = idx + 1; return m; }
    }
  }
  const forced = scenario.choices && scenario.choices[sceneId];
  if (forced) {
    const m = matchButton(btns, forced);
    if (m) return m;
  }
  return btns[Math.floor(scenario.rand() * btns.length)];
}

function pickCheckHero(btns, scenario) {
  const bias = scenario.checkBias || 'random';
  if (bias === 'random') return btns[Math.floor(scenario.rand() * btns.length)];
  const withMod = btns.map(b => ({ b, mod: statModFromButton(b.innerHTML) }));
  withMod.sort((x, y) => (bias === 'best' ? y.mod - x.mod : x.mod - y.mod));
  return withMod[0].b;
}

// Esito forzato del prossimo tiro originato dalla scena sceneId ('success' | 'fail' | null).
// Un array viene consumato un elemento per tiro (es. u6: ['fail','success']).
function forcedOutcomeFor(scenario, state, sceneId) {
  const co = scenario.checkOutcomes || {};
  let v = co[sceneId];
  if (Array.isArray(v)) {
    state.coIdx = state.coIdx || {};
    const i = state.coIdx[sceneId] || 0;
    v = i < v.length ? v[i] : v[v.length - 1];
    state.coIdx[sceneId] = i + 1;
  }
  return v || scenario.defaultCheckOutcome || null;
}

/* ==================== ESECUZIONE DI UNA PARTITA ==================== */

function runGame(scenario) {
  const game = buildGame(scenario.seed);
  scenario.rand = mulberry32(scenario.seed * 7919 + 13); // rand separato per le scelte, dal dado di gioco
  const { doc, api, getG } = game;
  const log = { scenes: [], ending: null, combats: 0, everMorto: new Set(), itemsEverOwned: new Set() };
  const state = { strategy: 'aggressive', forcedLossDone: false, seqIdx: {}, coIdx: {} };

  try {
    game.act(() => api.Engine.newGame(
      scenario.heroes.map(id => ({ heroId: id, player: '' })),
      null,
      scenario.difficulty || 'normale',
    ));
  } catch (e) {
    return { ok: false, scenario, error: `Engine.newGame ha lanciato un'eccezione: ${(e.stack || String(e)).split('\n').slice(0,6).join(' | ')}`, log };
  }
  if (scenario.items) {
    const G0 = getG();
    for (const it of scenario.items) if (!G0.inventory.includes(it)) G0.inventory.push(it);
  }

  const STEP_LIMIT = 2500;
  let steps = 0;
  try {
    checkInvariants(getG(), 'dopo newGame');
    while (true) {
      steps++;
      if (steps > STEP_LIMIT) throw new Error(`LOOP INFINITO sospetto nella navigazione (> ${STEP_LIMIT} passi totali)`);

      /* ==== UNA modale aperta, UN posto che la gestisce ====
         Fino al 24 agosto 2026 di blocchi che gestivano `modal-generic` ce n'erano DUE:
         questo, che chiudeva qualunque modale col primo bottone che avesse un onclick, e
         un secondo (piu' in basso, dopo il log della scena) che sapeva riconoscere il
         rilancio dell'occhio lungo, il sacrificio e la PROVA con l'esito pilotato.
         Vinceva sempre il primo, perche' e' prima nel ciclo: il secondo non e' mai stato
         eseguito una volta. Conseguenza: `checkOutcomes`, `defaultCheckOutcome`,
         `pickCheckHero` e `sacrificeHero` erano opzioni MORTE — ogni prova la tirava il
         primo eroe della barra col dado naturale del seme, e gli scenari che credevano di
         pilotare il dado camminavano a caso. Il rosso, quando arrivava, arrivava tre
         sezioni piu' in basso su un flag mancante, e faceva sospettare il gioco.
         Un banco che ignora l'opzione che gli hai dato e' peggio di un banco che non ce
         l'ha: quello almeno non ti mente.

         Ordine di riconoscimento (dal piu' specifico al piu' generico):
         1) l'offerta di rifare la presa con l'occhio lungo — i suoi bottoni nascono
            dentro un innerHTML, quindi non sono figli veri: si raggiungono per id, ed e'
            per questo che va provata PRIMA di contare i bottoni;
         2) la modale di SACRIFICIO (bottoni-eroe veri + "Riparliamone");
         3) la modale della PROVA, riconosciuta dall'intestazione «🎲 Prova di …» che
            scrive `pickHeroForCheck` (l'unico posto nel motore che la scrive: i `tag`
            delle scelte dicono la stessa cosa ma finiscono nella colonna delle scelte,
            non qui): l'eroe lo sceglie `pickCheckHero` e l'esito lo forza
            `forcedOutcomeFor`, pilotando Math.random per la durata del click;
         4) qualunque altra modale (ritorno dal checkpoint, Ciro che si unisce, avvisi):
            avanti col primo bottone utile e col dado naturale. Forzare Math.random dove
            non si tira niente non serve, e sposta il flusso random di tutto il resto. */
      const modalGeneric = doc.getElementById('modal-generic');
      if (!modalGeneric.classList.contains('hidden')) {
        /* La scena che ha CHIESTO il tiro e' quella corrente: `resolveChoice` apre la
           modale senza passare da `gotoScene`, quindi `G.sceneId` e' ancora la scena di
           partenza — ed e' esattamente la chiave con cui gli scenari scrivono
           `checkOutcomes`. Va letta qui, prima di cliccare: dopo il click e' cambiata. */
        const sceneProva = (getG() || {}).sceneId;
        const content = doc.getElementById('modal-generic-content');

        if (/btn-reroll-yes/.test(content.innerHTML)) {
          const yes = doc.getElementById('btn-reroll-yes');
          const no = doc.getElementById('btn-reroll-no');
          const btn = scenario.acceptReroll ? yes : no;
          if (typeof btn.onclick !== 'function') throw new Error('modale del rilancio (occhio lungo) senza handler');
          const fn = btn.onclick;
          yes.onclick = null; no.onclick = null; // niente handler stantii al prossimo giro
          game.act(() => fn());
          checkInvariants(getG(), `dopo offerta di rifare la presa in "${sceneProva}"`);
          continue;
        }

        const clickable = buttons(content).filter(b => typeof b.onclick === 'function');
        if (!clickable.length) { modalGeneric.classList.add('hidden'); continue; }
        log.modali = (log.modali || 0) + 1;

        // NB: il bottone "Riparliamone" è creato con textContent, non innerHTML — vanno letti entrambi
        const btnText = b => (b.innerHTML || '') + (b.textContent || '');
        if (clickable.some(b => /Riparliamone/.test(btnText(b)))) {
          // modale di sacrificio: il tavolo sceglie CHI resta
          const heroBtns = clickable.filter(b => !/Riparliamone/.test(btnText(b)));
          const chosen = (scenario.sacrificeHero && matchButton(heroBtns, scenario.sacrificeHero)) || heroBtns[0];
          if (!chosen) throw new Error(`modale di sacrificio senza eroi selezionabili in "${sceneProva}"`);
          game.act(() => chosen.onclick());
          checkInvariants(getG(), `dopo sacrificio in "${sceneProva}"`);
          continue;
        }

        if (!/🎲 Prova di /.test(content.innerHTML)) {
          game.act(() => clickable[0].onclick());   // informativa o di sistema: si porta avanti
          checkInvariants(getG(), `dopo aver chiuso una modale in "${sceneProva}"`);
          continue;
        }

        const chiTira = pickCheckHero(clickable, scenario);
        const outcome = forcedOutcomeFor(scenario, state, sceneProva);
        if (outcome === 'success') game.withForcedRandom(0.999, () => game.act(() => chiTira.onclick()));
        else if (outcome === 'fail') game.withForcedRandom(0, () => game.act(() => chiTira.onclick()));
        else game.act(() => chiTira.onclick());
        checkInvariants(getG(), `dopo scelta eroe per prova in "${sceneProva}"`);
        continue;
      }

      /* L'overlay del dado si sbriga QUI, insieme alle modali, e non piu' dopo il log
         della scena. Un tiro costa tre giri di ciclo — scelta, eroe, "Continua" — e nel
         terzo la scena non e' ancora cambiata: finiva nel percorso una seconda volta, e il
         dump stampava «b4_breccia > b4_breccia > b8». Sembrava che il gioco tornasse
         indietro, ed e' la traccia falsa che ha fatto perdere tempo cercando il difetto
         delle prove forzate nel posto sbagliato. Un percorso deve avere una riga per ogni
         scena ATTRAVERSATA, altrimenti mente su cosa e' successo. */
      const diceOverlay = doc.getElementById('dice-overlay');
      if (!diceOverlay.classList.contains('hidden')) {
        const btn = doc.getElementById('btn-dice-continue');
        if (typeof btn.onclick !== 'function') throw new Error('overlay dado visibile ma bottone "Continua" senza onclick');
        const _dove = (getG() || {}).sceneId;
        game.act(() => btn.onclick());
        checkInvariants(getG(), `dopo tiro di dado fuori combattimento (scena "${_dove}")`);
        continue;
      }

      const G = getG();
      /* Se il gruppo rimbalza fra checkpoint e sconfitta, la partita non finisce mai:
         è un loop, non una partita difficile. Va scoperto qui, con un messaggio chiaro,
         invece di far girare la suite per minuti. */
      {
        const _perScontro = (G && G.stats && G.stats.ritorniPerScontro) || {};
        const _peggio = Object.entries(_perScontro).sort((a, b) => b[1] - a[1])[0];
        if (_peggio && _peggio[1] > 3) {
          throw new Error(`LOOP DI CHECKPOINT: ${_peggio[1]} ritorni sullo STESSO scontro ("${_peggio[0]}") — il gruppo non lo supera e il gioco non offre una via d'uscita`);
        }
      }
      const sceneId = G.sceneId;
      const scene = api.CAMPAIGN[sceneId];
      if (!scene) throw new Error(`Scena non trovata: "${sceneId}" (riferita da qualche parte ma assente in CAMPAIGN)`);
      log.scenes.push(sceneId);
      /* Gli oggetti dell'opzione `items` si ri-mettono a OGNI scena, non solo all'inizio:
         il rientro da un checkpoint rimpiazza l'inventario con la lista del capitolo, e un
         oggetto consegnato al primo passo poteva sparire a metà partita senza che nessuno
         lo sapesse. E un attrezzo da banco di prova: deve fare quello che dice. */
      if (scenario.items) {
        const Gi = getG();
        if (Gi && Gi.inventory) for (const it of scenario.items) if (!Gi.inventory.includes(it)) Gi.inventory.push(it);
      }
      for (const h of G.party) if (h.morto) log.everMorto.add(h.id);
      for (const it of G.inventory) log.itemsEverOwned.add(it);

      if (scene.ending) { log.ending = sceneId; break; }

      /* CRAFTING pilotato dallo scenario: `craft: { sceneId: [['a','b'], …] }`.
         Serve a portare in combattimento gli oggetti che pagano gli scontri, e a
         verificare che le ricette funzionino davvero con l'inventario di quel momento. */
      let daCombinare = null;
      if (scenario.craft === 'tutto') {
        /* prova ogni ricetta possibile con l'inventario di ADESSO, una volta ciascuna */
        const G4 = getG();
        state.ricetteFatte = state.ricetteFatte || new Set();
        daCombinare = api.RECIPES
          .filter(r => !state.ricetteFatte.has(r.out)
            && r.in.every(i => G4.inventory.includes(i)))
          .map(r => { state.ricetteFatte.add(r.out); return r.in; });
        if (!daCombinare.length) daCombinare = null;
      } else if (scenario.craft && scenario.craft[sceneId] && !state.crafted?.has(sceneId)) {
        (state.crafted = state.crafted || new Set()).add(sceneId);
        daCombinare = scenario.craft[sceneId];
      }
      if (daCombinare) {
        for (const [a, b] of daCombinare) {
          const G2 = getG();
          if (!G2.inventory.includes(a) || !G2.inventory.includes(b)) {
            log.craftMancati = log.craftMancati || [];
            log.craftMancati.push(`${sceneId}: ${a}+${b} — non entrambi nello zaino`);
            continue;
          }
          /* La sequenza vera del modulo: open() → pick(a) → pick(b) → combine().
             `combine()` non prende argomenti: legge lo stato interno di `picked`. */
          game.act(() => { api.Crafting.open(); api.Crafting.pick(a); api.Crafting.pick(b); api.Crafting.combine(); });
          const dopo = getG();
          const ric = api.RECIPES.find(r => r.in.includes(a) && r.in.includes(b));
          if (ric && !dopo.inventory.includes(ric.out)) {
            log.craftMancati = log.craftMancati || [];
            log.craftMancati.push(`${sceneId}: ${a}+${b} → "${ric.out}" NON è entrato nello zaino`);
          } else if (ric) {
            (log.crafted = log.crafted || new Set()).add(ric.out);
          }
          checkInvariants(getG(), `dopo crafting ${a}+${b} in "${sceneId}"`);
        }
      }

      if (scene.minigame) {
        const esito = (scenario.minigames && scenario.minigames[sceneId]) || 'success';
        const ok = esito !== 'fail';
        log.minigames = (log.minigames || 0) + 1;
        (log.minigameTypes = log.minigameTypes || new Set()).add(scene.minigame.type);
        /* Verifica dell'ONESTÀ del briefing: se il minigioco è un'apnea, il gioco
           promette al giocatore certi metri. Se il target è oltre quello che il fiato
           corrente consente, un "success" forzato dal test mascherebbe una bugia. */
        if (scene.minigame.type === 'apnea' && ok) {
          const G2 = getG();
          const target = (scene.minigame.config || {}).profondita || 18;
          const arrivo = api.Engine.metriPossibili ? api.Engine.metriPossibili() : 99;
          if (target > arrivo) {
            log.apneaBugie = log.apneaBugie || [];
            log.apneaBugie.push(`${sceneId}: apnea a ${target}m con fiato ${G2.gold} (arrivo ~${arrivo}m)`);
          }
        }
        game.act(() => api.Engine.gotoScene(ok ? scene.minigame.success : scene.minigame.fail));
        checkInvariants(getG(), `dopo minigioco in "${sceneId}"`);
        continue;
      }

      if (scene.combat) {
        log.combats++;
        const box = doc.getElementById('choices');
        const startBtn = buttons(box)[0];
        if (!startBtn) throw new Error(`Bottone "INIZIA IL COMBATTIMENTO" mancante in scena "${sceneId}"`);
        if (scenario.forceLossAt === sceneId && !state.forcedLossDone) {
          state.strategy = 'passive'; // solo Difesa totale: la sconfitta è garantita
          state.forcedLossDone = true;
        } else {
          state.strategy = 'aggressive';
        }
        game.act(() => startBtn.onclick());
        runCombat(game, scenario, state);
        checkInvariants(getG(), `dopo combattimento originato da "${sceneId}"`);
        continue;
      }

      const choicesBox = doc.getElementById('choices');
      const btns = enabledButtons(choicesBox);
      if (!btns.length) throw new Error(`Nessuna scelta disponibile in scena "${sceneId}" (vicolo cieco a runtime)`);
      const chosen = pickSceneChoice(sceneId, btns, scenario, state);
      if (!chosen) throw new Error(`pickSceneChoice non ha selezionato nulla in scena "${sceneId}"`);
      game.act(() => chosen.onclick());
      checkInvariants(getG(), `dopo scelta in "${sceneId}"`);
    }
  } catch (e) {
    const G3 = getG();
    const dove = `sceneId="${G3 && G3.sceneId}" · ultime scene: ${log.scenes.slice(-4).join(' > ')}`;
    return { ok: false, scenario, error: `${(e.stack || String(e)).split('\n').slice(0, 4).join('\n      ')}\n      ↳ ${dove}`, log };
  }

  if (game.consoleErrors.length) {
    return { ok: false, scenario, error: `console.error catturati durante la partita: ${game.consoleErrors.join(' | ')}`, log };
  }
  const G = getG();
  log.flags = { ...(G.flags || {}) };
  log.inventory = [...(G.inventory || [])];
  log.gold = G.gold;
  log.finalParty = G.party.map(h => ({ id: h.id, hp: h.hp, maxHp: h.maxHp, morto: !!h.morto, down: !!h.down }));
  log.partyBar = partyBarText(doc);
  log.everMorto = [...log.everMorto];
  log.itemsEverOwned = [...log.itemsEverOwned];
  log.checkpointRitorni = (G.stats && G.stats.checkpointRitorni) || 0;
  log.pieta = G.pieta || 0;
  if (log.minigameTypes) log.minigameTypes = [...log.minigameTypes];
  if (log.crafted) log.crafted = [...log.crafted];
  return { ok: true, scenario, log };
}

/* ==================== DEFINIZIONE DEGLI SCENARI ==================== */

let seedCounter = 1;
function nextSeed() { return seedCounter++ * 104729; }

/* Le scene che si rivisitano (b8 la cisterna murata, d0/d4/d10 i tre risvegli,
   d15 le uscite) vogliono una SEQUENZA: quale bottone al primo passaggio, quale
   al secondo. Una scelta forzata fissa su una scena rivisitabile fa loopare il bot. */
const DEFAULT_SEQUENCES = {};

/* Scelte "di percorso" di default: portano avanti la vacanza senza saltare nulla di
   importante. Ogni scenario ne eredita una copia e sovrascrive solo ciò che gli serve. */
const BASE_CHOICES = {
  /* --- LE SCENE DI FALLIMENTO CHE RECUPERANO UN INDIZIO ---
     Alcune prove nuove stanno davanti a un indizio dei misteri, e un indizio non
     si puo' perdere su un tiro (o il Quaderno diventa una lotteria): la scena di
     fallimento ha sempre una strada lunga che ci riporta. Ma la strada lunga va
     PRESA, e senza una chiave il banco di prova sceglie a caso — cosi' il
     Quaderno pieno restava senza il graffito una volta su tre. Qui la strada
     lunga e' la scelta di default. */
  c5_campione: 'Ricontarle',
  c8_due_e_mezzo: 'In barca, allora',
  c7_righe: 'quaderno d',
  b1_di_fretta: 'Ascoltare, allora',
  /* e la chiave di default deve rimettere la partita SULLA LINEA PRINCIPALE:
     'rispondere' portava a b3_rispondere → b3_prova → b3_quaderno → b6, cioe'
     saltava tutto l'orto dei Coraggio (b4) e quindi il flag `muro_aperto`, e
     quindi la cisterna murata (b8) e il suo minigioco. Una chiave di steering
     sbagliata non fa fallire la scena che nomina: fa fallire quella dopo. */
  b3_cronometro: 'Uscire. Al sole',
  b3_ventidue: 'Fuori. Sedersi sul muretto',
  b6_terra_dura: 'Al ninfeo',
  b6_ciglio: 'Sentire cosa dice',
  b6_nodo: 'Il ninfeo',
  b8_braccia: 'Su alle Parracine',
  b9_prezzo_isola: 'Un ultimo bagno', b9_prezzo_pieno: 'Un ultimo bagno',
  c3_rampa: 'Su. Piano', c5_pietra: 'Contare le tacche', c5_unghia: 'Contare le tacche',
  c10_soglia: 'Fuori. Al sole', c11_dati: 'I numeri, adesso', c15_tasto: 'Andare a dormire',
  c1_tanica: 'Dica',
  /* --- A: giovedì 27, l'arrivo --- */
  a0: 'Restare sul ponte', a0_lista: 'Restare sul ponte', a0_traghetto: 'Restare sul ponte', a0_ponte: 'Restare sul ponte', a0_pandataria: 'Restare sul ponte', a0_carcere: 'Restare sul ponte',
  a0b: 'Il traghetto attracca',
  a1: 'Su, alle Parracine',
  a2: 'Arrivare alle Parracine',
  a3: 'Al mare, subito', a3_vista: 'Al mare, subito', a3_terrazza: 'Al mare, subito',
  a4: 'Entrare insieme', a4_entrare: 'Entrare insieme',
  a5: 'Bastare così',
  a6: 'taralli',
  a7: 'Il microfono', a7_cani: 'Il microfono',
  a8: 'Portarla dentro',
  a9: 'le cisterne',
  /* --- B: venerdì 28, le cisterne --- */
  b0: 'Chiedere ad Ada',
  b0_ada: '"Ada, chi dei due parlava?"',
  b0_ada_chi: 'Prenderle la mano',
  b0_mano: 'Le cisterne',
  b1: 'Guardare la stanza',
  b2: 'misurare l\'eco',
  b2_misura_ok: 'stiamo zitti e ascoltiamo',
  b3: 'Rifarlo. Registrando',
  b3_prova: 'Se il Quaderno ha quattro indizi',
  b3_quaderno: 'Villa Giulia',
  b4: 'Appoggiare l\'orecchio',
  b4_orecchio: 'Aprire quel muro',
  b4_breccia: 'Non così. Prima attrezzarsi',
  b4_prepararsi: 'Prima Villa Giulia',
  b5: 'Villa Giulia',
  b6: 'Cercare la pietra', b6_quattro: 'Cercare la pietra', b6_donne: 'Cercare la pietra',
  b6_iscrizione: 'Grattare via la terra',
  b6_scavo: 'Infilarla nel filo di nylon',
  b6_collana: 'Il ninfeo',
  b6_ninfeo: 'In paese. Si mangia',
  b7: 'Al muro dei Coraggio',
  b8: 'Recuperare il secchiello',
  b8_roba: '"A". Il secchiello',
  b8_lettera: 'L\'idrofono nel buco',
  b8_idro: 'Cantare la ninnananna',
  b8_cantare: 'Scendere. Con lei che canta',
  b8_apnea_ok: 'Su. Basta',
  b8_apnea_ko: 'Il caffè delle Parracine',
  b8_caffe: 'Su. Aria vera',
  b9: 'Il ragazzo con la maschera',
  b9_ragazzo: 'Quanto costa noleggiare', b9_fossa: 'Quanto costa noleggiare',
  b9_noleggio: 'A cena',
  b10: 'Dirglielo',
  b10_verita: 'Lasciarla parlare',
  b10_litigio: 'Alle Parracine', b10_trenta_secondi: 'Alle Parracine',
  b11: 'Svegliarla e dirglielo',
  b11_trenta: 'Il molo, alle nove',
  b12: 'Il molo', b12_tre_dita: 'Il molo',
  /* --- C: sabato 29, Santo Stefano --- */
  c15: 'terrazza', c15_notte: 'terrazza',
  /* Le scene nate dai tagli del 24 agosto 2026 vogliono un default esplicito: senza, il
     banco prende la prima uscita disponibile, e in due posti la prima uscita e' la piu'
     drammatica del gioco. A d14_coro la prima disponibile portava a «rispondere di si'» —
     cioe' quattro scenari finivano dentro il Coro senza averlo chiesto, e dicevano che il
     finale atteso non era arrivato. Un banco che non ha un default e' un banco che tira a
     sorte, e un test che tira a sorte non prova niente. */
  c9_croci: 'quarantesimo',   // «Scavare» compare anche in «Non scavare»: chiave ambigua
  c10_suonato: 'Lasciarlo andare', c10_pianto: 'Lasciarlo andare',
  c11_verita: 'Dirle il motivo',
  c14_marisqueria: 'Girare la tovaglietta',
  b7_calette: 'Insegnami',
  b6_quattro: 'Il pannello del Parco',
  a3_lilia: 'Chiederle dov\'è che si scende',
  /* --- D: domenica 30, il giorno che non finisce --- */
  d0: 'Giù: la moka di Ada', d0_bottiglia: 'Giù: la moka di Ada',
  d13_fossa: 'Fammi il briefing',
  d14_coro: 'Non rispondere niente e risalire',
  d14_dieci: 'I sette minuti di sosta',
  d14_restate: 'Non scrivere niente',
  /* --- generici --- */
  d9_ko: 'Al porto',
};

/* Le prove che APRONO contenuti riescono; il resto va a dado naturale. */
const HAPPY_CHECKS = {};

function scenario(name, heroes, choices, opts = {}) {
  return {
    name,
    seed: opts.seed ?? nextSeed(),
    heroes,
    choices: { ...BASE_CHOICES, ...choices },
    sequences: { ...DEFAULT_SEQUENCES, ...(opts.sequences || {}) },
    checkBias: opts.checkBias || 'best',
    checkOutcomes: { ...HAPPY_CHECKS, ...(opts.checkOutcomes || {}) },
    defaultCheckOutcome: opts.defaultCheckOutcome || null,
    minigames: opts.minigames || {},
    craft: opts.craft || null,
    /* Oggetti consegnati all'inizio: e un attrezzo da banco di prova, e serve per i
       finali che dipendono da un oggetto raro senza dover rigiocare la campagna per
       arrivarci. Si usa con parsimonia: un finale provato con l'oggetto regalato
       verifica il FINALE, non la strada che ci porta. */
    items: opts.items || null,
    sacrificeHero: opts.sacrificeHero || null,
    forceLossAt: opts.forceLossAt || null,
    acceptReroll: !!opts.acceptReroll,
    difficulty: opts.difficulty || 'normale',
    verify: opts.verify || null,
  };
}

const scenarios = [];

/* ---- 1. LA VACANZA FATTA BENE — e_vittoria, coppia, tutto detto ----
   Il percorso "modello": si guarda tutto, si dice la verità a cena, si impara la
   ninnananna, si combina quello che si può, e si esce sapendo cosa è successo. */
scenarios.push(scenario(
  'La vacanza fatta bene (e_vittoria, coppia, verità detta)',
  ['gaetano', 'claudia'],
  {
    a1: 'C\'è un museo archeologico',
    a1_museo: 'Fotografare la carta delle sei cisterne',
    a3: 'Disfare le valigie', a3_vista: 'Disfare le valigie', a3_terrazza: 'Disfare le valigie',
    a3_valigie: 'Prendere anche il resto', a3_grazie: 'Prendere anche il resto',
    a3_valigie2: 'Prendere anche le fedi',
    b1: 'Guardare la stanza',
    b2: 'misurare l\'eco',
    b2_misura_ok: 'stiamo zitti e ascoltiamo',
    b3: 'Rifarlo. Registrando',
    b3_prova: 'Fuori. Al sole',
    b4: 'Cercare un punto debole',
    b6: 'Cercare la pietra con l\'iscrizione', b6_quattro: 'Cercare la pietra con l\'iscrizione', b6_donne: 'Cercare la pietra con l\'iscrizione',
    b6_iscrizione: 'Grattare via la terra',
    b10: 'Dirglielo',
    b11: 'Svegliarla e dirglielo',
    d15_uscite: 'sapendo dov\'è la sesta cisterna',
    /* I DUE FINALI CHE NESSUNA PARTITA RAGGIUNGEVA. Non erano irraggiungibili:
       erano le scelte «meno ovvie» di due scene d'epilogo, e nei semi usati
       finora il dado non ci e' mai caduto. Nessun requires da soddisfare. */
    e_vittoria_barca: 'Scendere, prendere la macchina, tornare a Scauri'
  },
  {
    craft: 'tutto',
    verify: (r, expect) => {
      expect(/^e_vittoria/.test(r.log.ending || ''), `finale atteso e_vittoria*, trovato ${r.log.ending}`);
      expect(r.log.flags.giorno_27_chiuso, 'il primo giorno non si è chiuso (checkpoint mancato)');
      expect(r.log.flags.verita_detta || r.log.flags.patto_trenta_secondi, 'la verità sul mezzo secondo non è mai stata detta');
      expect((r.log.crafted || []).includes('idrofono'), 'l\'idrofono non è mai stato costruito');
      expect(!r.log.apneaBugie || !r.log.apneaBugie.length, `il briefing dell'apnea ha mentito: ${(r.log.apneaBugie || []).join('; ')}`);
      expect(!r.log.craftMancati || !r.log.craftMancati.length, `ricette fallite: ${(r.log.craftMancati || []).join('; ')}`);
    },
  },
));

/* ---- 2. SALVI E MUTI — e_vittoria_muta: si esce vivi senza aver capito ----
   Nessun mistero risolto, la bugia detta a cena, e il conto lo si paga al tramonto. */
scenarios.push(scenario(
  'Salvi e muti (e_vittoria_muta, la bugia a cena)',
  ['gaetano', 'claudia'],
  {
    b0: 'Andare. La chiesa',
    b2: 'Basta. Si sale',
    b10: '"Niente. Un rumore',
    b10_bugia: 'Dormire. Provare a dormire',
    b11: 'Scrivere tutto sul Quaderno',
    d15_uscite: 'Salire e basta',
  },
  {
    minigames: { b2_misura: 'fail', d6_cisterna: 'fail' },
    verify: (r, expect) => {
      expect(/^e_(vittoria_muta|muta)/.test(r.log.ending || ''), `finale atteso e_vittoria_muta*, trovato ${r.log.ending}`);
      expect(!r.log.flags.sa_sesta_cisterna, 'il mistero delle cisterne è stato risolto: non è il finale muto');
      expect(r.log.flags.bugia_detta || r.log.flags.verita_rinviata, 'né bugia né rinvio: il ramo non è quello atteso');
    },
  },
));

/* ---- 3. LO SCAMBIO — e_scambio: uno resta perché l'altro salga ---- */
scenarios.push(scenario(
  'Lo scambio (e_scambio, sacrificio esplicito)',
  ['gaetano', 'claudia'],
  { d15_uscite: 'E non sale perché salga l\'altro' },
  {
    sacrificeHero: 'gaetano',
    verify: (r, expect) => {
      expect(/^e_scambio/.test(r.log.ending || ''), `finale atteso e_scambio*, trovato ${r.log.ending}`);
    },
  },
));

/* ---- 4. CHI RESTA — e_resta: non è una morte, è una scelta ----
   Verifica anche la meccanica nuova: chi resta è `rimasto`, NON `morto`. */
scenarios.push(scenario(
  'Chi resta (e_resta, lo stato "rimasto" e non "morto")',
  ['gaetano', 'claudia'],
  { d15_uscite: 'non è per l\'altro' },
  {
    sacrificeHero: 'claudia',
    verify: (r, expect) => {
      expect(/^e_resta/.test(r.log.ending || ''), `finale atteso e_resta*, trovato ${r.log.ending}`);
    },
  },
));

/* ---- 5. IL CORO VINCE — e_coro: si risponde, e rispondere è l'errore ---- */
scenarios.push(scenario(
  'Il Coro vince (e_coro, hanno risposto)',
  ['gaetano', 'claudia'],
  /* Le chiavi del PERCORSO, non solo quelle della prova. Questo scenario verifica un
     FINALE, e per arrivare a un finale bisogna arrivarci: con le sole due chiavi della
     prova il percorso cambiava a ogni scena nuova aggiunta a monte (due volte in un
     giorno, e le due volte ha detto un finale diverso). Un test che dipende dal caso
     non prova niente. */
  { d2_paese: 'Rispondere. Mettere la faccia sotto', d2_cala: 'Rispondere. Mettere la faccia sotto',
    d5_ada: 'Alla cisterna dei Detenuti', d5_lista: 'Alla cisterna dei Detenuti',
    d1_colazione_bis: 'Alla cisterna dei Detenuti', d1_colazione_eco: 'Alla cisterna dei Detenuti',
    d13_fossa: 'Fammi il briefing', d13_briefing: 'Scendere col bombolino riparato',
    d14_coro: 'Rispondere di sì', d14_dieci: 'Rispondere di sì', d14_restate: 'Rispondere di sì',
    e_coro: 'Chiudere la bocca e non chiamarla' },
  {
    /* E GLI ESITI DELLE PROVE NUOVE. Aggiungendo una prova a monte, il percorso di
       questo scenario e' cambiato: la prova di DESTREZZA sul nodo della collana e'
       caduta, il ramo di fallimento ha portato altrove, e undici scene dopo la
       partita non aveva piu' il fiato per l'ultima immersione e finiva nel loop.
       Non e' un difetto del ramo — e' che uno scenario che verifica UN FINALE non
       deve dipendere dai dadi lungo la strada. I rami di fallimento li provano gli
       scenari sfortunati, che li fanno cadere tutti di proposito. */
    checkOutcomes: { b6_scavo: 'success' },
    verify: (r, expect) => {
      expect(/^e_coro/.test(r.log.ending || ''), `finale atteso e_coro*, trovato ${r.log.ending}`);
    },
  },
));

/* ---- 6. IL LOOP — e_loop: il finale peggiore, e il più breve ---- */
scenarios.push(scenario(
  'Il loop per sempre (e_loop, non salgono)',
  ['gaetano', 'claudia'],
  { d15_uscite: 'Non salire. Tornare alle Parracine' },
  {
    verify: (r, expect) => {
      expect(/^e_loop/.test(r.log.ending || ''), `finale atteso e_loop*, trovato ${r.log.ending}`);
    },
  },
));

/* ---- 7. L'INGEGNERE — tutte le ricette che si possono fare in una partita ----
   Il crafting non è decorativo: se una ricetta non si può completare con
   l'inventario che il gioco dà davvero, questo scenario lo scopre. */
scenarios.push(scenario(
  'L\'ingegnere (crafting a fondo)',
  ['gaetano', 'claudia'],
  {
    /* Percorso che RACCOGLIE gli ingredienti: il negozio del porto, le valigie
       disfatte fino in fondo, lo scavo a Villa Giulia, il muro aperto, le due
       immersioni. Senza questi passaggi le ricette non sono nemmeno possibili. */
    a1: 'Prima una tappa: il negozio',
    a1_negozio: 'Chiedere anche una tanica e del sale grosso',
    a3: 'Disfare le valigie', a3_vista: 'Disfare le valigie', a3_terrazza: 'Disfare le valigie',
    a3_valigie: 'Prendere anche il resto', a3_grazie: 'Prendere anche il resto',
    a3_valigie2: 'Prendere anche le fedi',
    a6: 'taralli',
    a7: 'Il microfono', a7_cani: 'Il microfono',
    b1: 'Guardare la stanza',
    b2: 'Basta. Si sale',
    b4: 'Cercare un punto debole',
    b4_breccia: 'Non così. Prima attrezzarsi',
    b4_prepararsi: 'Prima Villa Giulia',
    b6: 'Cercare la pietra con l\'iscrizione', b6_quattro: 'Cercare la pietra con l\'iscrizione', b6_donne: 'Cercare la pietra con l\'iscrizione',
    b6_iscrizione: 'Grattare via la terra',
    b6_scavo: 'Il ninfeo',
    b6_ninfeo: 'In paese. Si mangia',
    b7: 'Al muro dei Coraggio',
    b8: 'Recuperare il secchiello',
    b8_roba: 'Giù',
    b8_apnea_ok: 'Ancora una',
    b8_seconda: 'Su. E domani',
  },
  {
    craft: 'tutto',
    verify: (r, expect) => {
      const fatte = new Set(r.log.crafted || []);
      const attese = ['idrofono', 'idrofono_profondo', 'torcia_da_casco', 'le_due_fedi', 'collana_di_giulia', 'bombola_riparata'];
      for (const a of attese) expect(fatte.has(a), `ricetta "${a}" mai completata in una partita reale`);
      expect(!r.log.craftMancati || !r.log.craftMancati.length, `ricette fallite: ${(r.log.craftMancati || []).join('; ')}`);
    },
  },
));

/* ---- 8. IL RITORNO DAL CHECKPOINT — se cadono tutti non è game over ----
   Forza una sconfitta totale e verifica che la partita CONTINUI dall'ultimo
   checkpoint invece di finire. È la richiesta esplicita del committente. */
scenarios.push(scenario(
  'Il ritorno dal checkpoint (sconfitta totale, si riparte)',
  ['gaetano', 'claudia'],
  {},
  {
    forceLossAt: 'c9_bottoni',
    /* Il combattimento con la guardia si e' spostato due volte in un giorno: da c9_cimitero a
       c9_scavo quando il cimitero e' stato spezzato, e da c9_scavo a c9_bottoni quando lo
       scavo e' stato spezzato. Ogni volta il forceLossAt puntava a una scena senza scontro, e
       forzare la sconfitta dove non c'e' uno scontro non forza niente (lezione 80). */
    /* il combattimento e' passato a c9_scavo quando il cimitero e' stato spezzato in due:
       forzare la sconfitta dove non c'e' piu' uno scontro non forza niente. */
    craft: 'tutto',
    verify: (r, expect) => {
      expect(r.log.ending, 'la partita non è arrivata a un finale dopo la sconfitta totale');
      expect(r.log.scenes.length > 30, `percorso troppo corto (${r.log.scenes.length} scene): la sconfitta ha probabilmente terminato la partita`);
      expect((r.log.checkpointRitorni || 0) >= 1, 'la sconfitta totale non ha prodotto nessun ritorno dal checkpoint');
    },
  },
));

/* ---- 9. DA SOLI — un eroe solo, difficoltà apnea ----
   Il caso peggiore: una persona, i nemici duri e il fiato che uccide. */
scenarios.push(scenario(
  'Da soli (1 eroe, difficoltà in superficie)',
  ['claudia'],
  {},
  {
    difficulty: 'facile',
    verify: (r, expect) => {
      expect(r.log.ending, 'la partita in solitaria non è arrivata a nessun finale');
      expect(r.log.gold >= 0, 'Fiato negativo');
    },
  },
));

/* ---- 9b. IN DUE, IN APNEA — la difficoltà massima con il party pieno ----
   La combinazione "un eroe solo + incubo" non è vincibile per costruzione e non va
   testata come se lo fosse: la difficoltà massima si prova in due. */
scenarios.push(scenario(
  'In due, in apnea (difficoltà massima)',
  ['gaetano', 'claudia'],
  { e_abbandono: 'Prendiamo il traghetto delle 17:30',
    /* «Al tavolino in fondo alla piazza» sta in d11_registro, NON in d11_vuoto:
       la chiave su d11_vuoto non ha mai potuto attaccare, e finche' il caso ci
       portava comunque al registro il test passava lo stesso. Le prove nuove a
       monte hanno cambiato il flusso dei dadi, il bot ha preso i moduli, e la
       signora non e' stata incontrata. Adesso la strada e' scritta tutta. */
    d11_vuoto: 'Il registro sul bancone', d11_moduli: 'Rimettere tutto nella cartella',
    d11_specchio: 'Al tavolino in fondo alla piazza',
    d11_registro: 'Al tavolino in fondo alla piazza',
    d11_signora_no: 'Era l\'acqua, vero?',
    d11_signora_tardi: 'Al porto. Adesso' },
  {
    difficulty: 'incubo',
    minigames: { d11_signora: 'fail' },
    // dal terzo ritorno il motore porta a `e_abbandono`, una scena vera con tre scelte:
    // qui il bot scieglie di andarsene, così il test verifica che quella via esista.
    craft: 'tutto',
    verify: (r, expect) => {
      expect(r.log.ending, 'nessun finale raggiunto alla difficoltà massima');
      expect((r.log.checkpointRitorni || 0) <= 4,
        `${r.log.checkpointRitorni} ritorni dal checkpoint: la via d'uscita dal terzo non ha funzionato`);
    },
  },
));

/* ---- 10. IL SENTIERO LUNGO — si guarda tutto, si ascolta tutto ----
   Alza l'attenzione del Coro al massimo: verifica che i boss diventino davvero
   più duri e che il gioco resti finibile comunque. */
scenarios.push(scenario(
  'Il sentiero lungo (attenzione del Coro al massimo)',
  ['gaetano', 'claudia'],
  {
    b3: 'Claudia: rispondere',
    b4: 'Appoggiare l\'orecchio',
    b6_idro_canale: 'Rispondere all\'appello',
    b11: 'Registrarla',
  },
  {
    verify: (r, expect) => {
      expect(r.log.ending, 'nessun finale raggiunto');
      expect((r.log.flags.attenzione || 0) >= 4, `attenzione del Coro solo a ${r.log.flags.attenzione}: il percorso "ascolta tutto" non l'ha alzata`);
    },
  },
));

/* ---- 11. IL FIATO CORTO — non si mangia, non si dorme bene ----
   Verifica che l'economia MORDA: senza le cose umane, il fondo non si raggiunge,
   e il briefing dell'apnea deve dirlo prima, non mentire. */
scenarios.push(scenario(
  'Il fiato corto (economia stretta)',
  ['gaetano', 'claudia'],
  { b8: 'Risalire', b8_respiro: 'No. Su' },
  {
    verify: (r, expect) => {
      expect(r.log.ending, 'nessun finale raggiunto');
      expect(!r.log.apneaBugie || !r.log.apneaBugie.length,
        `il briefing dell'apnea ha promesso metri che il fiato non consentiva: ${(r.log.apneaBugie || []).join('; ')}`);
    },
  },
));

/* ---- 12. CIRO IN SQUADRA — il terzo eroe si sblocca e combatte ---- */
scenarios.push(scenario(
  'Ciro in squadra (unlockHero)',
  ['gaetano', 'claudia'],
  {},
  {
    /* E LA ROBA COSTRUITA. Questo scenario deve arrivare in fondo con il Quaderno
       pieno, e per arrivare in fondo bisogna vincere l'ultimo scontro: senza le
       ricette il gruppo lo perdeva tre volte su tre e finiva in `e_abbandono`,
       dove i flag del giorno sono gia' riavvolti. Le ricette sono la strada che
       il gioco stesso indica per quello scontro. */
    craft: 'tutto',
    verify: (r, expect) => {
      expect(r.log.flags.ciro_in_squadra, 'Ciro non è mai entrato in squadra');
      expect(r.log.ending, 'nessun finale raggiunto');
    },
  },
));

/* ---- 13. IL QUADERNO PIENO — tutti e tre i misteri risolti ----
   I premi dei misteri sono effetti meccanici reali: se nessuna partita li ottiene,
   nessuno ha mai verificato che funzionino. Questo scenario cammina su tutti e
   dodici gli indizi. */
scenarios.push(scenario(
  'Il Quaderno pieno (tre misteri su tre)',
  ['gaetano', 'claudia'],
  {
    // mistero 1 — le sei cisterne
    a1: 'C\'è un museo archeologico',
    a1_museo: 'Fotografare la carta delle sei cisterne',
    b1: 'Guardare la stanza',
    b2: 'misurare l\'eco',
    b2_misura_ok: 'stiamo zitti e ascoltiamo',
    b3: 'Rifarlo. Registrando',
    b3_prova: 'Fuori. Al sole',
    b6: 'Cercare la pietra con l\'iscrizione', b6_quattro: 'Cercare la pietra con l\'iscrizione', b6_donne: 'Cercare la pietra con l\'iscrizione',
    b6_iscrizione: 'Grattare via la terra',
    b6_scavo: 'Infilarla nel filo di nylon',
    // mistero 3 — la bambina che canta
    b4: 'Chiedere ai Coraggio',
    b4_coraggio: 'la cosa che cantava',
    b4_canzone: 'Il muro. Aprirlo',
    b8: 'Recuperare il secchiello',
    b8_roba: 'Giù',
    b8_apnea_ok: 'Ancora una',
    b8_seconda: 'Su. E domani',
    // mistero 2 — la cella 47: tutti e quattro gli indizi, in ordine
    c3: 'la 47 sta al secondo ordine', c3_dentro: 'la 47 sta al secondo ordine', c3_purgatorio: 'la 47 sta al secondo ordine',   // il testo della scelta e cambiato col PVRGATORIO
    c5_cella: 'Gaetano conta un campione',
    c5_graffito: 'L\'archivio: se qualcuno ha contato',
    c5_graffito_ko: 'L\'archivio, e mai più questa stanza',
    c7_archivio: 'le carte del \'43', c7_quarantasette: 'le carte del \'43',
    c7_lista: 'Fuori, al sole, con Ciro',
    c8_ciro: 'Il cimitero: se non è scinnuto', c8_terza: 'Il cimitero: se non è scinnuto',
    c9_croci: 'quarantesimo',   // scavare: e' da la' che viene l'osso, quarto indizio della 47
    // l'indovinello della signora dei fagiolini, nella Ventotene vuota
    d11_vuoto: 'Al tavolino in fondo alla piazza', d11_registro: 'Al tavolino in fondo alla piazza',
    d11_signora_ok: 'Ringraziarla',
    d11_signora_nome: 'Al porto',
    // i due premi dei misteri: la promessa a Giulia e il nome della bambina
    d8_giulia: 'Dirle dov\'è la sesta cisterna',
    d12_bambina: 'Chiamarla per nome',
    // mistero 3 — il cavallino nella stiva a quarantacinque metri
    d13_fossa: 'Fammi il briefing', d13_briefing: 'Scendere col bombolino riparato',
    d13_stiva: 'Cinque secondi in più',
  },
  {
    craft: 'tutto',
    /* LE PROVE, FORZATE A RIUSCIRE. Questo scenario verifica IL QUADERNO, non i
       dadi: con le prove nuove il percorso perdeva l'attenzione del Coro per
       strada (undici porte aperte, una stanza saltata) e arrivava al boss finale
       con +2 ai colpi e +6 PV contro — e la partita finiva in `e_abbandono`,
       cioe' con i flag riavvolti dal checkpoint e i tre premi mai assegnati.
       Un test che verifica una cosa non deve poter fallire per un'altra. */
    checkOutcomes: {
      b1: 'success', b2_incidere: 'success',
      d0: 'success', d3_traghetto: 'success', d4_ciclo2: 'success', d5_ada: 'success',
      d10_ciclo3: 'success', d12_bambina: 'success', d13_cinque_secondi: 'success',
      d13_ancora: 'success', d14_sosta1: 'success',
    },
    verify: (r, expect) => {
      const f = r.log.flags;
      expect(f.i_iscrizione && f.i_seconda && f.i_registro_acqua && f.i_eco_misurata,
        'il mistero delle sei cisterne non ha tutti e quattro gli indizi');
      expect(f.sa_sesta_cisterna, 'il premio "sa_sesta_cisterna" non è stato assegnato pur avendo gli indizi');
      expect(f.i_ninna_sentita, 'la ninnananna non è mai stata sentita');
      expect(f.i_graffito && f.i_registro_detenuti && f.i_ciro_racconta && f.i_osso,
        'il mistero della cella 47 non ha tutti e quattro gli indizi');
      expect(f.sa_nome_guardia, 'il premio "sa_nome_guardia" (Nicola Sperduto) non è stato assegnato');
      expect(f.i_foto_museo && f.i_giocattolo && f.i_nome_lista,
        'il mistero della bambina non ha tutti gli indizi (foto, cavallino, lista d\'imbarco)');
      expect(f.sa_ninnananna, 'il premio "sa_ninnananna" (Assuntina) non è stato assegnato');
    },
  },
));
/* ---- LA CAPPELLA AL CENTRO DEL PANOPTICON (c4_conta, minigioco della memoria): dal
   centro si sceglie una sola direzione, e tutti gli scenari andavano al secondo anello
   verso la cella 47. Questo va nella cappella. In coda alla lista: i semi sono un
   contatore progressivo. ---- */
scenarios.push(scenario(
  'la cappella al centro: quale porta ha fatto clac (minigioco della memoria)',
  ['gaetano', 'claudia'],
  { c3: 'Scendere nella cappella', c3_dentro: 'Scendere nella cappella', c3_purgatorio: 'Scendere nella cappella' },
  { seed: 606003 },
));
/* ---- LILIA e il filo del nome dell'isola: il ritrovarsi alle Parracine, l'archivio
   delle ventimila foto, la lezione delle calette (che vale aria vera in immersione) e
   la foto di quattro anni fa. In coda alla lista, con seme esplicito. ---- */
scenarios.push(scenario(
  'Lilia: il ritrovarsi, le calette e la foto di quattro anni fa',
  ['gaetano', 'claudia'],
  {
    a3: 'Sulla scaletta del giardino sale qualcuno', a3_vista: 'Sulla scaletta del giardino sale qualcuno', a3_terrazza: 'Sulla scaletta del giardino sale qualcuno',
    a3_lilia: 'Chiederle di vedere le sue foto', a3_lilia_calette: 'Chiederle di vedere le sue foto',
    a4: 'Con le pinne, fino allo scoglio della nave', a4_entrare: 'Con le pinne, fino allo scoglio della nave',
    b7: 'Lilia aveva detto le calette',
    b7_calette: 'Prima chiederle di quella cartella', b7_lezione: 'Prima chiederle di quella cartella',
    b7_archivio: 'Prima scrivere sul Quaderno',
  },
  {
    seed: 707001,
    verify: (r, expect) => {
      const f = r.log.flags;
      expect(r.log.scenes.includes('a3_lilia'), 'il ritrovarsi con Lilia non è avvenuto');
      expect(f.lezione_lilia, 'la lezione delle calette non è stata fatta: senza quella, in immersione manca aria');
      expect(f.i_foto_lilia, 'la foto di quattro anni fa non è stata trovata');
      expect(r.log.scenes.includes('a4_scoglio'), 'lo scoglio della nave non è stato raggiunto con le pinne');
    },
  },
));

/* NOTA: questo scenario sta IN CODA, e ci sta per un motivo. I semi vengono da un
   contatore progressivo, quindi inserire uno scenario in mezzo alla lista RINUMERA i
   semi di tutti quelli dopo e ne fa fallire due o tre che erano sani. E la lezione 47 di
   questo progetto, e me la sono rifatta oggi: la prima stesura di questo blocco stava
   fra il quinto e il sesto scenario e ha spostato il finale di «Il loop per sempre» da
   e_loop a e_coro_insieme. Gli scenari nuovi vanno in coda. Sempre. */
/* ---- 5-bis. IL DEBITO DELLA VOCE — rispondere si paga, e il conto arriva in fondo ----
   `ha_risposto` era un flag impostato una volta e mai letto: la regola che il gioco
   ripete piu di tutte era l'unica infrangibile gratis. Adesso ha tre conseguenze, e
   questo scenario le attraversa tutte e tre senza pagare il debito: la traccia di ieri
   con le due «sono qui», la scelta che smaschera lo specchio, e il Coro che parte con
   sei punti in piu perche ha gia una voce che ha detto si. */
scenarios.push(scenario(
  'Il debito della voce (si risponde, non si paga)',
  ['gaetano', 'claudia'],
  { d2_paese: 'Rispondere. Mettere la faccia sotto', d2_cala: 'Rispondere. Mettere la faccia sotto',
    d5_ada: 'La traccia di ieri pomeriggio alla boa', d5_lista: 'La traccia di ieri pomeriggio alla boa',
    d5_voce_registrata: 'Riascoltare il secondo', d5_collana: 'Riascoltare il secondo',
    d11_specchio: 'Far partire il file di ieri', d11_specchio_parla: 'Far partire il file di ieri' },
  {
    verify: (r, expect) => {
      const f = r.log.flags || {};
      expect(f.ha_risposto, 'la scelta disobbediente non ha impostato ha_risposto');
      expect(f.debito_di_voce, 'la traccia di ieri non ha aperto il debito della voce');
      expect(f.sa_dove_sbaglia, 'riascoltare dieci volte non ha insegnato niente');
      expect(!f.debito_pagato, 'il debito risulta pagato: questo scenario non doveva pagarlo');
      /* Il campo si chiama `scenes`, non `visited`: scritto sbagliato, `(undefined || [])`
         rendeva il controllo sempre falso — un test che non puo passare e peggio di un
         test che manca, perche insegna a ignorare il rosso. */
      expect(r.log.scenes.includes('d5_voce_registrata'),
        'la scena della traccia registrata non e stata visitata');
    },
  },
));

/* ---- PRESO DAL CORO — la cosa che il DESIGN promette da tutta la partita ----
   `killRoller`, `requires.spirit` e l'Ancora di Voce dentro l'acqua: tre pezzi di motore
   che esistevano e che nessuna scena usava. Questo scenario fallisce la prova di
   Costituzione di proposito (checkOutcomes), si fa portare via qualcuno, e poi ascolta la
   voce alla sosta dei dieci metri — la scelta che vedono solo i gruppi con uno spirito.
   In coda alla lista, perche i semi sono progressivi. */
scenarios.push(scenario(
  'Preso dal Coro (la prova fallita, e la voce che sa i numeri)',
  ['gaetano', 'claudia'],
  { d13_fossa: 'Fammi il briefing', d13_briefing: 'Scendere col bombolino riparato',
    d13_stiva: 'Cinque secondi in più',
    d13_cinque_secondi: 'Risalire', d13_cima_vuota: 'Risalire',
    d14_coro: 'Ascoltare quella voce', d14_dieci: 'Ascoltare quella voce', d14_restate: 'Ascoltare quella voce',
    d14_voce: 'Non scendere' },
  {
    /* Come per «La sconfitta in fondo»: la discesa nella fossa vuole il bombolino riparato
       E dieci di fiato, e il fiato parte da sei. I venti minuti fermi al sole in barca ne
       danno quattro, quindi prima si risale e poi si scende. Senza l'ordine il banco
       trovava la discesa non disponibile, pigliava l'ultima uscita — «non oggi» — e sei
       asserzioni su sei dicevano che il Coro non aveva preso nessuno. Non era il gioco:
       era il banco che non arrivava sul posto. */
    items: ['bombola_riparata'],
    sequences: { d13_briefing: ['Risalire in barca', 'Scendere col bombolino riparato'] },
    checkOutcomes: { d13_stiva: 'fail' },
    verify: (r, expect) => {
      const f = r.log.flags || {};
      expect(r.log.scenes.includes('d13_cinque_secondi'),
        'la prova non e stata fallita: nessuno e stato preso');
      /* Si guarda la SCENA e non il flag finale: `uno_preso` lo imposta d13_cima_vuota, e se
         piu' tardi il gruppo — rimasto in due meno uno — perde lo scontro finale e riparte dal
         checkpoint, il motore rimette i flag di allora. E' il motore che funziona, non il test
         che fallisce: la cosa da verificare e' che quel ramo sia stato ATTRAVERSATO. */
      expect(r.log.scenes.includes('d13_cima_vuota'),
        'il ramo del preso dal Coro non e stato attraversato (d13_cima_vuota mai vista)');
      /* `everMorto` viene convertito in ARRAY prima di essere restituito (riga 725):
         `.size` su un array e undefined, quindi il controllo era sempre falso. Ed e la
         seconda volta oggi che sbaglio il tipo di un campo del log — la prima era
         `visited` invece di `scenes`. */
      expect(r.log.everMorto.length > 0, 'nessuno risulta preso dal Coro (killRoller non ha agito)');
      expect(r.log.scenes.includes('d14_voce'),
        'la scelta che vedono solo gli spiriti non e comparsa alla sosta');
      expect(r.log.scenes.includes('d14_voce'),
        'la voce dello spirito non ha parlato alla sosta (d14_voce mai vista)');
      expect(r.log.scenes.includes('d14_scesa') || r.log.scenes.includes('d14_dieci'),
        'dopo la voce non si e ne scesi ne risaliti: il ramo si e interrotto');
    },
  },
));

/* ---- I TRE FINALI CHE NESSUNO PROVAVA ----
   Il banco di prova stampava «dieci finali distinti» e nessuno si era mai chiesto QUALI
   mancassero. Aggiungendo scene ai draft il conto e scivolato a sette in silenzio, perche i
   semi sono cambiati: tre finali avevano smesso di essere visitati e nessuno lo sapeva. Un
   finale che nessuna partita raggiunge e un finale che nessuno sta piu provando — e in
   questo gioco i finali sono dodici, cioe un terzo del lavoro di scrittura dell'atto E.
   Questi tre scenari li tengono al caldo. In coda alla lista, come tutti i nuovi. */
scenarios.push(scenario(
  'Finale: la muta e le tre copie (e_muta_foto)',
  ['gaetano', 'claudia'],
  { d14_coro: 'Non rispondere', d14_dieci: 'Non rispondere', d14_restate: 'Non rispondere',
    d15_uscite: 'Salire e basta. Vivi, insieme',
    e_vittoria_muta: 'Salvare tutto. Tre copie' },
  { verify: (r, expect) => expect(/^e_muta_foto/.test(r.log.ending || ''),
      `finale atteso e_muta_foto, trovato ${r.log.ending}`) },
));

scenarios.push(scenario(
  "Finale: l'Ancora di Voce nell'epilogo (e_scambio_ancora)",
  ['gaetano', 'claudia'],
  /* d13_stiva va pinnata: senza chiave il banco prende la prima scelta, che e la prova dei
     cinque secondi, e se la prova va male la scena del preso offre come prima uscita
     l'ÀNCORA DI VOCE — che viene spesa li e non arriva piu all'epilogo. Comportamento
     giusto del gioco, test sbagliato. */
  { d13_stiva: 'Risalire. Adesso',
    d15_uscite: 'Uno dei due non sale. E non sale perché salga l\'altro',
    d15_scambio: 'Scegliere chi resta. E salire, senza girarsi', d15_addio: 'Scegliere chi resta. E salire, senza girarsi',
    e_scambio: 'Rimettersi la maschera e andare a riprenderlo' },
  { items: ['ancora_di_voce'],
    verify: (r, expect) => (
      expect([...(r.log.itemsEverOwned || [])].includes('ancora_di_voce'),
        `l'Ancora non e mai risultata in inventario: ${[...(r.log.itemsEverOwned || [])].slice(0,6).join(', ')}`),
      expect(r.log.scenes.includes('e_scambio'), `e_scambio non raggiunta: ultime ${r.log.scenes.slice(-3).join(' > ')}`),
      expect(/^e_scambio_ancora/.test(r.log.ending || ''),
      `finale atteso e_scambio_ancora, trovato ${r.log.ending}`)) },
));

scenarios.push(scenario(
  "Finale: l'inverno alle Parracine (e_resta_inverno)",
  ['gaetano', 'claudia'],
  { d15_uscite: 'restare', e_resta: "Non salire. Scendere all'ultimo secondo" },
  { verify: (r, expect) => expect(/^e_resta_inverno/.test(r.log.ending || ''),
      `finale atteso e_resta_inverno, trovato ${r.log.ending}`) },
));

/* ---- LE QUATTRO SCENE DI SCONFITTA, che nessuna partita raggiungeva ----
   La revisione ha trovato il buco piu grosso della copertura: NESSUNA delle ventuno
   partite simulate moriva mai. Le quattro scene di sconfitta — b8_apnea_ko,
   c5_graffito_ko, c6_ko, d9_ko — erano tutte fra le mai visitate, e il validatore
   controllava soltanto che ESISTESSERO. Cioe: il momento in cui il gioco dice al
   giocatore «sei caduto, e adesso questo e quello che ti costa» non lo aveva mai letto
   nessuno, e la catena morte → checkpoint non era verificata sui minigiochi.
   Queste due partite ci passano di proposito: `minigames` forza il fallimento
   dell'apnea e del conteggio delle tacche, e da li si arriva alle scene di sconfitta. */
scenarios.push(scenario(
  'Le sconfitte dei minigiochi (b8_apnea_ko e c5_graffito_ko)',
  ['gaetano', 'claudia'],
  { b8: 'Recuperare il secchiello', c5_cella: 'Gaetano conta un campione',
    b8_roba: 'Giù. Claudia in apnea', b8_lettera: 'Giù',
    /* e il FIATO per scendere: la soglia e' sette, e questo scenario ci arrivava
       con meno perche' le prove nuove hanno spostato il percorso. Le scelte
       affettive del gioco danno fiato — mangiare, ridere, stare fermi con
       l'altro — e sono la strada che il gioco stesso indica per averne. */
    a0_ponte: 'Rimettere il telefono in tasca', a4_scoglio: 'Prima tirarsi su sullo scoglio',
    b7_calette: 'Restare un momento', b0: 'Chiedere ad Ada' },
  {
    sequences: { b8: ['Recuperare il secchiello', 'Scendere nel buco'] },   // b8 offre 'Scendere nel buco', b8_roba/b8_lettera offrono 'Giù'
    minigames: { b8_apnea: 'fail', c5_tacche: 'fail' },
    verify: (r, expect) => {
      const viste = r.log.scenes;
      expect(viste.includes('b8_apnea_ko') || viste.includes('c5_graffito_ko'),
        'nessuna delle due scene di sconfitta dei minigiochi e stata raggiunta');
      expect(r.log.ending, 'la partita non e arrivata a un finale dopo le sconfitte');
    },
  },
));

scenarios.push(scenario(
  'La sconfitta in fondo (d9_ko, e la risalita dopo)',
  ['gaetano', 'claudia'],
  { d13_fossa: 'Fammi il briefing' },
  {
    /* La discesa vuole il bombolino riparato E dieci di fiato: il fiato parte da sei, e
       i venti minuti fermi al sole in barca ne danno quattro. Quindi prima si risale, poi
       si scende — in questo ordine, che e' esattamente quello che farebbe un giocatore che
       legge il tag. Senza l'ordine il banco trovava la discesa non disponibile e pigliava
       l'ultima uscita, «non oggi», che porta a un altro finale. */
    items: ['bombola_riparata'],
    sequences: { d13_briefing: ['Risalire in barca', 'Scendere col bombolino riparato'] },
    minigames: { d13_apnea: 'fail' },
    verify: (r, expect) => {
      expect(r.log.scenes.includes('d9_ko'),
        `la scena di sconfitta della fossa non e stata raggiunta: ultime ${r.log.scenes.slice(-4).join(' > ')}`);
      expect(r.log.ending, 'la partita non e arrivata a un finale dopo la sconfitta in fondo');
    },
  },
));


/* I DUE SCENARI DEL NASTRO. Vanno in coda e non in mezzo: i seed vengono da un contatore
   progressivo, quindi uno scenario infilato a metà rinumera tutti quelli dopo e sposta le
   partite altrui su altri percorsi. È già costato un finale, una volta. */
scenarios.push(scenario(
  'Il nastro bruciato: il premio che il motore aspettava da sempre',
  ['gaetano', 'claudia'],
  /* Con la mappa singola e non con `sequences`: le sequenze si consumano in ordine e
     dopo un ritorno da checkpoint non c'e' piu' niente in coda, quindi la seconda volta
     che si passa da c15 il nastro non si brucia. La mappa singola vale a ogni visita, che
     e' come si esprime «questo giocatore, ogni volta che gli capita, lo brucia». */
  {
    c10_nastro: 'Togliere il pollice', c10_ciro_dice: 'Togliere il pollice',
    c10_pulito: 'Mettere comunque la cassetta',
    c15: 'Il Geloso è nello zaino', c15_notte: 'Il Geloso è nello zaino',
    c15_nastro: 'La cucina di Ada', c15_dopo: 'La cucina di Ada',
  },
  {
    verify: (r, expect) => {
      const viste = r.log.scenes;
      expect(viste.includes('c15_nastro'),
        `la scena del nastro alle Parracine non e stata raggiunta: ultime ${viste.slice(-5).join(' > ')}`);
      expect(viste.includes('c15_bruciato'), 'il nastro non e stato bruciato in cucina');
      expect(r.log.flags.nastro_bruciato,
        'nastro_bruciato non risulta impostato: e il flag che js/combat.js legge per togliere 6 PV al boss');
      expect(r.log.ending, 'la partita non e arrivata a un finale');
    },
  },
));

scenarios.push(scenario(
  'I tempi sul Quaderno, e poi il fornello',
  ['gaetano', 'claudia'],
  {
    c10_nastro: 'Togliere il pollice', c10_ciro_dice: 'Togliere il pollice',
    c10_pulito: 'Mettere comunque la cassetta',
    c15: 'Il Geloso è nello zaino', c15_notte: 'Il Geloso è nello zaino',
    c15_nastro: 'Le cuffie', c15_dopo: 'Le cuffie',
    c15_tempi: 'Adesso bruciarlo',
  },
  {
    verify: (r, expect) => {
      expect(r.log.scenes.includes('c15_tempi'), 'la misura dell\'anticipo non e stata fatta');
      expect(r.log.flags.i_nastro_stanza, 'la nota del Quaderno sull\'anticipo non risulta scritta');
      expect(r.log.flags.nastro_bruciato, 'il nastro non risulta bruciato passando dai tempi');
      expect(r.log.ending, 'la partita non e arrivata a un finale');
    },
  },
));



/* LE DUE PARTITE SFORTUNATE. Il banco fa riuscire tutte le prove (`checkBias: 'best'`), che
   e' giusto per gli scenari che devono ARRIVARE da qualche parte — ma vuol dire che il ramo
   del fallimento non lo legge nessuno. Il 24 agosto 2026 sono nate nove scene di sconfitta
   e tutte e nove sono finite nell'elenco delle mai visitate: contenuto scritto, collaudato
   zero. Qui `defaultCheckOutcome: 'fail'` fa cadere OGNI prova, di proposito.

   Perche' DUE partite e non una: le nove scene non stanno tutte sulla stessa strada.
   - `b4_domani` si apre solo da b4_coraggio, e la scelta e' `once`: per prendere ANCHE il
     muro duro serve tornare al muro una seconda volta, da b7, e tornarci si puo' solo se
     il muro non e' ancora aperto. Quindi il muro va aperto DOPO Villa Giulia, non prima.
   - `c11_caduta` sta dietro a `gaetano_ha_taciuto` e a NIENTE `verita_detta`, cioe' dietro
     il mezzo secondo riascoltato di notte e la bugia detta a cena: l'esatto contrario del
     percorso che serve alla prima partita, dove la verita' a cena apre il patto dei trenta
     secondi. Sono due vacanze diverse, e vanno giocate due volte.
   In CODA alla lista, come tutti gli scenari nuovi: i semi vengono da un contatore
   progressivo e uno scenario infilato a metà rinumera tutti quelli dopo.

   NOTA SU `c3_scalino`, che qui NON c'e' e non per pigrizia: la sua prova sta in
   c3_purgatorio dietro `requires: { flag: 'sa_i_tre_piani' }`, e quel flag lo mette solo
   c3_depliant — le cui tre uscite vanno a c5_cella, c4_conta e c7_archivio, nessuna torna
   a c3_purgatorio. c3_purgatorio si entra una volta sola (solo da c3, che si entra solo da
   c2, su una catena senza cicli) e il ritorno dal checkpoint rimette i flag di ALLORA,
   quindi non aiuta. La scena e' scritta e irraggiungibile: e' un buco nei dati, non nel
   banco, e va chiuso nei draft (una uscita da c3_depliant verso c3_purgatorio). */
scenarios.push(scenario(
  'La partita sfortunata I: il muro, il ninfeo e la signora Rosa',
  ['gaetano', 'claudia'],
  { /* le valigie disfatte fino in fondo: la GoPro apre l'angolo delle scritte, e
       microfono + preservativo sono l'idrofono che serve al canale del ninfeo */
    a3: 'Disfare le valigie', a3_vista: 'Disfare le valigie', a3_terrazza: 'Disfare le valigie',
    a3_valigie: 'Prendere anche il resto', a3_grazie: 'Prendere anche il resto',
    a3_valigie2: 'Prendere anche le fedi',
    b0_zaino: 'Basta ingegneria',
    /* Peppe che non parla, e l'angolo dove la GoPro ha visto l'italiano */
    b1_gopro: 'se scendiamo, scendiamo attrezzati',
    b1_peppe: 'Insistere',
    b1_zitto: 'Lasciarlo alla sua squadra',
    b1_insistere: 'Non uscire',
    b2: 'angolo con la torcia',
    b2_angolo: 'Salire di due metri',
    b2_niente: 'Rifarlo con la macchina',
    b3_prova: 'Fuori. Al sole',
    /* la signora Rosa prima, il muro dopo: in quest'ordine e non nell'altro */
    b4_coraggio: 'Se la ricorda, la cosa che cantava',
    b4_domani: 'Bere il caffè fino in fondo',
    b4_canzone: 'Villa Giulia, la pietra',
    b6: 'leggere il pannello fino in fondo',
    b6_quattro: 'Il pannello del Parco',
    b6_donne: 'Scendere al ninfeo',
    b6_ginocchio: 'Dentro il ninfeo',
    b6_ninfeo: 'Calare l\'idrofono nel canale',
    b6_idro_canale: 'Tirare su l\'idrofono',
    b6_cavo: 'Arrotolare il cavo e tenerlo',
    b7: 'C\'è un muro da aprire',
    b4_orecchio: 'Aprire quel muro',
    b4_muro_duro: 'Dentro',
    b4_breccia: 'Scendere',
    b4_scivolata: 'Gli ultimi tre metri',
    b12: 'Sua sorella era un sub', b12_tre_dita: 'Sua sorella era un sub',
    b12_thermos: 'A dormire' },
  {
    defaultCheckOutcome: 'fail',
    /* b4 si attraversa DUE volte e le due volte vuole cose diverse: la prima i Coraggio
       (scelta `once`), la seconda l'orecchio al muro. Una chiave fissa su una scena
       rivisitabile prende sempre la stessa uscita e la seconda meta' non si vede. */
    sequences: { b4: ['ai Coraggio', 'Appoggiare l\'orecchio'],
                 b1: ['con la GoPro', 'a Peppe delle altre'] },
    /* Crafting MIRATO e non 'tutto': `gopro + asta_selfie` fa l'occhio lungo consumando
       la GoPro, e senza la GoPro la scelta che porta all'angolo delle scritte non compare
       nemmeno. Qui si combina solo l'idrofono, nella scena in cui il gioco stesso insegna
       a combinare. */
    craft: { b0_zaino: [['microfono', 'preservativo']] },
    verify: (r, expect) => {
      const viste = r.log.scenes;
      const attese = ['b1_zitto', 'b2_niente', 'b4_domani', 'b6_ginocchio', 'b6_cavo',
                      'b4_muro_duro', 'b4_scivolata', 'b12_thermos'];
      const mancano = attese.filter(x => !viste.includes(x));
      expect(!mancano.length,
        `scene di sconfitta non attraversate: ${mancano.join(', ')} (su ${attese.length}) — ultime ${viste.slice(-5).join(' > ')}`);
      expect(r.log.ending, 'la prima partita sfortunata non e arrivata a un finale');
    },
  },
));

scenarios.push(scenario(
  'La partita sfortunata II: il mezzo secondo taciuto e la corsa giù',
  ['gaetano', 'claudia'],
  { /* Il mezzo secondo riascoltato di notte mette `gaetano_ha_taciuto`, la bugia a cena
       lascia `verita_detta` giu': sono le due condizioni della scelta muta a Santo
       Stefano, l'unica che porta a c11_silenzio e alla corsa sulla mulattiera. */
    a8: 'Riascoltare quel mezzo secondo',
    b10: '"Niente. Un rumore',
    b10_bugia: 'Dormire. Provare a dormire',
    b11: 'Scrivere tutto sul Quaderno',
    b12: 'Sua sorella era un sub', b12_tre_dita: 'Sua sorella era un sub',
    b12_thermos: 'A dormire',
    c10_nastro: 'Premere PLAY', c10_ciro_dice: 'Premere PLAY',
    c10_suonato: 'Lasciarlo andare', c10_pianto: 'Lasciarlo andare',
    c10_claudia: 'Non dire niente',
    c11_silenzio: 'Correre giù',
    c11_caduta: 'Alla barca' },
  {
    defaultCheckOutcome: 'fail',
    verify: (r, expect) => {
      const viste = r.log.scenes;
      const attese = ['b12_thermos', 'c11_caduta'];
      const mancano = attese.filter(x => !viste.includes(x));
      expect(!mancano.length,
        `scene di sconfitta non attraversate: ${mancano.join(', ')} — ultime ${viste.slice(-5).join(' > ')}`);
      expect(!r.log.flags.verita_detta, 'la verita e stata detta: la scelta muta a Santo Stefano non poteva comparire');
      expect(r.log.ending, 'la seconda partita sfortunata non e arrivata a un finale');
    },
  },
));



/* ==================== ESECUZIONE ==================== */

section('Simulazione di partite complete (headless)');

const results = [];
function execute(sc) {
  // TEST_FILTER=<sottostringa> esegue solo gli scenari il cui nome combacia (debug mirato)
  if (process.env.TEST_FILTER && !sc.name.includes(process.env.TEST_FILTER)) return { ok: true, skipped: true, log: { scenes: [], combats: 0 } };
  const r = runGame(sc);
  results.push(r);
  const endingTxt = r.ok ? (r.log.ending || '(nessun finale?!)') : 'ERRORE';
  console.log(`  ${r.ok ? '✅' : '❌'} [seed ${sc.seed}] ${sc.name} — scene: ${r.log.scenes.length}, combattimenti: ${r.log.combats}, minigiochi: ${r.log.minigames || 0}, esito: ${endingTxt}`);
  if (process.env.TEST_DUMP) console.log(`      ↳ percorso: ${r.log.scenes.join(' > ')}`);
  if (!r.ok) { console.error(`      ↳ ${r.error}`); return r; }
  if (sc.verify) {
    const expect = (cond, msg) => { if (!cond) fail(`[${sc.name}] ${msg}`); };
    try { sc.verify(r, expect); } catch (e) { fail(`[${sc.name}] verifica esplosa: ${e.message}`); }
  }
  return r;
}

console.log(`  Esecuzione di ${scenarios.length} partite pilotate...\n`);
/* ---- L'ALTRO RAMO DEL CORO. `e_coro` ha due uscite e uno scenario ne prova una
   sola: senza questo, qualunque delle due si scegliesse, l'altra restava il
   finale che nessuna partita raggiunge. Va in CODA perche' i seed vengono da un
   contatore progressivo e inserire in mezzo sposterebbe tutti quelli dopo. ---- */
scenarios.push(scenario(
  'Il Coro vince, e si cercano nel buio (e_coro_insieme)',
  ['gaetano', 'claudia'],
  /* Le chiavi del PERCORSO, non solo quelle della prova. Questo scenario verifica un
     FINALE, e per arrivare a un finale bisogna arrivarci: con le sole due chiavi della
     prova il percorso cambiava a ogni scena nuova aggiunta a monte (due volte in un
     giorno, e le due volte ha detto un finale diverso). Un test che dipende dal caso
     non prova niente. */
  { d2_paese: 'Rispondere. Mettere la faccia sotto', d2_cala: 'Rispondere. Mettere la faccia sotto',
    d5_ada: 'Alla cisterna dei Detenuti', d5_lista: 'Alla cisterna dei Detenuti',
    d1_colazione_bis: 'Alla cisterna dei Detenuti', d1_colazione_eco: 'Alla cisterna dei Detenuti',
    d13_fossa: 'Fammi il briefing', d13_briefing: 'Scendere col bombolino riparato',
    d14_coro: 'Rispondere di sì', d14_dieci: 'Rispondere di sì', d14_restate: 'Rispondere di sì',
    e_coro: 'Cercarla nel buio' },
  {
    /* E GLI ESITI DELLE PROVE NUOVE. Aggiungendo una prova a monte, il percorso di
       questo scenario e' cambiato: la prova di DESTREZZA sul nodo della collana e'
       caduta, il ramo di fallimento ha portato altrove, e undici scene dopo la
       partita non aveva piu' il fiato per l'ultima immersione e finiva nel loop.
       Non e' un difetto del ramo — e' che uno scenario che verifica UN FINALE non
       deve dipendere dai dadi lungo la strada. I rami di fallimento li provano gli
       scenari sfortunati, che li fanno cadere tutti di proposito. */
    /* LO STESSO SEME DEL GEMELLO: con un seme diverso il percorso divergeva e la
       partita finiva in e_scambio_torna. Qui serve che la strada sia IDENTICA a
       quella dello scenario «Il Coro vince» e che cambi solo l'ultima scelta,
       dentro l'epilogo. */
    seed: 523645,
    checkOutcomes: { b6_scavo: 'success' },
    verify: (r, expect) => {
      expect(r.log.ending === 'e_coro_insieme', `finale atteso e_coro_insieme, trovato ${r.log.ending}`);
    },
  },
));

for (const sc of scenarios) execute(sc);

const fatalRuns = results.filter(r => !r.ok);
for (const r of fatalRuns) fail(`Partita "${r.scenario.name}" (seed ${r.scenario.seed}): ${r.error.split('\n')[0]}`);

/* ==================== VERIFICA DELLA COPERTURA ==================== */

section('Copertura dei percorsi richiesti');

const okRuns = results.filter(r => r.ok);
const allScenesSeen = new Set(okRuns.flatMap(r => r.log.scenes));
const allEndings = new Set(okRuns.filter(r => r.log.ending).map(r => r.log.ending));
const allFlagsSeen = new Set(okRuns.filter(r => r.log.flags).flatMap(r => Object.keys(r.log.flags).filter(k => r.log.flags[k])));
const allItemsSeen = new Set(okRuns.flatMap(r => r.log.itemsEverOwned || []));
const allCrafted = new Set(okRuns.flatMap(r => r.log.crafted || []));
const allMinigames = new Set(okRuns.flatMap(r => r.log.minigameTypes || []));

function coverage(label, sceneIds) {
  const seen = sceneIds.filter(id => allScenesSeen.has(id));
  const ok = seen.length === sceneIds.length;
  console.log(`  ${ok ? '✅' : '❌'} ${label}: ${seen.length}/${sceneIds.length}`);
  if (!ok) fail(`${label}: mancano ${sceneIds.filter(id => !allScenesSeen.has(id)).join(', ')}`);
}
function coverageFlag(label, flagNames) {
  const seen = flagNames.filter(f => allFlagsSeen.has(f));
  const ok = seen.length === flagNames.length;
  console.log(`  ${ok ? '✅' : '❌'} ${label}: ${seen.length}/${flagNames.length}`);
  if (!ok) fail(`${label}: mancano i flag ${flagNames.filter(f => !allFlagsSeen.has(f)).join(', ')}`);
}

coverage('Atto A — l\'arrivo del 27', ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9']);
coverage('Atto B — le cisterne visitabili', ['b0', 'b1', 'b2', 'b3']);
coverage('Atto B — il muro del 1957 e la discesa', ['b4', 'b4_breccia', 'b8']);
coverage('Atto B — Villa Giulia e la medaglietta', ['b6', 'b6_iscrizione']);
coverage('Atto B — la sera e la notte', ['b9', 'b10', 'b11', 'b12']);
coverage('Atto C — Santo Stefano', ['c0', 'c1', 'c15']);
coverage('Atto D — i tre cicli del 30 agosto', ['d0', 'd4_ciclo2', 'd10_ciclo3']);
coverage('Atto D — la fossa', ['d13_fossa']);
coverage('Atto D — l\'indovinello della signora', ['d11_signora', 'd11_signora_ok', 'd11_signora_no']);

coverageFlag('I tre checkpoint dei giorni', ['giorno_27_chiuso', 'giorno_28_chiuso', 'giorno_29_chiuso']);
coverageFlag('Ciro in squadra (unlockHero)', ['ciro_in_squadra']);
coverageFlag('I tre premi dei misteri', ['sa_sesta_cisterna', 'sa_nome_guardia', 'sa_ninnananna']);
coverageFlag('I due rami della verità', ['verita_detta', 'bugia_detta']);

{
  const attesi = ['idrofono', 'idrofono_profondo', 'torcia_da_casco', 'le_due_fedi', 'collana_di_giulia', 'bombola_riparata'];
  const mancanti = attesi.filter(a => !allCrafted.has(a));
  console.log(`  ${mancanti.length ? '❌' : '✅'} Ricette completate in partita reale: ${attesi.length - mancanti.length}/${attesi.length}`);
  if (mancanti.length) fail(`ricette mai completate: ${mancanti.join(', ')}`);
}
{
  const attesi = ['apnea', 'calcolo', 'filastrocca', 'memoria', 'corsa', 'indovinello'];
  const visti = attesi.filter(t => allMinigames.has(t));
  console.log(`  ${visti.length >= 3 ? '✅' : '❌'} Tipi di minigioco giocati: ${visti.join(', ') || '(nessuno)'}`);
  if (visti.length < 3) fail(`giocati solo ${visti.length} tipi di minigioco su ${attesi.length}`);
}

/* I sei rami e i prefissi delle loro scene TERMINALI. Attenzione: il ramo "muta" ha
   terminali che iniziano per `e_muta_`, non per `e_vittoria_muta`, e `e_vittoria_casa`
   inizia per `e_vittoria`: un match per prefisso ingenuo li confonde. */
const RAMI = {
  e_vittoria:      ['e_vittoria', 'e_vittoria_barca', 'e_vittoria_casa', 'e_vittoria_tacere'],
  e_vittoria_muta: ['e_vittoria_muta', 'e_muta_tramonto', 'e_muta_foto'],
  e_scambio:       ['e_scambio', 'e_scambio_ancora', 'e_scambio_barca', 'e_scambio_torna'],
  e_resta:         ['e_resta', 'e_resta_partenza', 'e_resta_inverno'],
  e_coro:          ['e_coro', 'e_coro_insieme', 'e_coro_soli'],
  e_loop:          ['e_loop', 'e_loop_differenza', 'e_loop_letto'],
};
const ramiMancanti = Object.entries(RAMI).filter(([, ids]) => !ids.some(i => allEndings.has(i))).map(([r]) => r);
console.log(`  ${ramiMancanti.length ? '❌' : '✅'} Rami di finale raggiunti (${Object.keys(RAMI).length - ramiMancanti.length}/${Object.keys(RAMI).length}): ${[...allEndings].join(', ') || '(nessuno)'}`);
if (ramiMancanti.length) fail(`rami di finale non raggiunti: ${ramiMancanti.join(', ')}`);

{
  const sizes = new Set(okRuns.map(r => r.scenario.heroes.length));
  const ok = sizes.has(1) && sizes.has(2);
  console.log(`  ${ok ? '✅' : '❌'} Dimensioni del party coperte: ${[...sizes].sort().join(', ')} (richieste 1 e 2)`);
  if (!ok) fail('Manca una run in 1 o 2 giocatori');
}
{
  const bugie = okRuns.flatMap(r => r.log.apneaBugie || []);
  console.log(`  ${bugie.length ? '❌' : '✅'} Onestà del briefing d'apnea: ${bugie.length ? bugie.join('; ') : 'nessuna promessa non mantenuta'}`);
  if (bugie.length) fail(`il briefing dell'apnea ha promesso metri fuori portata: ${bugie.join('; ')}`);
}
{
  const difficolta = new Set(okRuns.map(r => r.scenario.difficulty));
  console.log(`  ${difficolta.size >= 2 ? '✅' : '❌'} Difficoltà coperte: ${[...difficolta].join(', ')}`);
  if (difficolta.size < 2) fail('una sola difficoltà provata');
}

/* ==================== ESITO FINALE ==================== */

section('Copertura totale della campagna');
{
  const probe = buildGame(999999);
  const allCampaignIds = Object.keys(probe.api.CAMPAIGN);
  const unseen = allCampaignIds.filter(id => !allScenesSeen.has(id));
  const pct = Math.round((allScenesSeen.size / allCampaignIds.length) * 100);
  console.log(`  Scene distinte visitate: ${allScenesSeen.size} / ${allCampaignIds.length} (${pct}%)`);
  if (unseen.length) console.log(`  Scene MAI visitate (${unseen.length}): ${unseen.join(', ')}`);
  if (pct < 55) fail(`copertura troppo bassa (${pct}%): gli scenari non esplorano abbastanza campagna`);
}


/* ==================== SCHEDA DEL PERSONAGGIO ====================
   Nessuna partita simulata clicca su un eroe, quindi per mesi la scheda ha potuto
   crashare senza che nessun test lo notasse: `conditions` era dichiarata dentro il
   ciclo delle abilità e il template la cercava fuori — ReferenceError a ogni click,
   proprio sulla schermata che il committente aveva chiesto per vedere gli stati.
   Questa prova apre la scheda di OGNI eroe in OGNI combinazione di stati. */
/* ==================== TUTTE LE MODALI SI APRONO ====================
   Fino ad agosto 2026 l'unica finestra provata da un test era la scheda del personaggio
   — e ci era finita solo DOPO che era crashata per mesi in silenzio. Mappa, zaino,
   regole, riepilogo della compagnia, diario, menu, fucina e quaderno non venivano mai
   aperti da nessuna partita simulata: un ReferenceError in uno di quei template sarebbe
   passato inosservato esattamente come l'altro. Qui si apre tutto quello che il motore
   espone, a inizio partita e con lo zaino pieno. */
(function testTutteLeModali() {
  section('Ogni finestra si apre senza esplodere');
  const game = buildGame(313131);
  const E = game.api.Engine;
  const eroi = (Array.isArray(game.api.HEROES) ? game.api.HEROES : Object.values(game.api.HEROES));
  game.act(() => E.newGame(eroi.filter(h => !h.locked).slice(0, 2).map(h => ({ heroId: h.id, player: 'Gali' }))));
  /* zaino pieno: molte finestre disegnano gli oggetti, e un template rotto si vede solo
     quando c'è qualcosa da disegnare */
  const G = game.api.Engine.debugState ? game.api.Engine.debugState() : null;
  try { for (const k of Object.keys(game.api.ITEMS).slice(0, 12)) game.act(() => E.addItem && E.addItem(k)); } catch (e) { /* non tutti i motori hanno addItem */ }
  const FINESTRE = ['showParty', 'showInventory', 'showMap', 'showRules', 'showMenu', 'showDiary',
                    'showBestiary', 'showRevive', 'showChronicles', 'showImprese'];
  let aperte = 0, rotte = 0;
  for (const nome of FINESTRE) {
    if (typeof E[nome] !== 'function') continue;
    try { game.act(() => E[nome]()); aperte++; }
    catch (e) { fail(`${nome}() esplode: ${(e && e.message) || e}`); rotte++; }
  }
  /* LE SCHEDE DEI LUOGHI (il pulsante 🔎). Ventuno template che disegnano elenchi:
     una scheda malformata si vede solo aprendola. Si aprono tutte. */
  if (game.api.Luoghi) {
    for (const k of Object.keys(game.api.Luoghi.LUOGHI)) {
      try { game.act(() => game.api.Luoghi.apri(k, 'prova')); aperte++; }
      catch (e) { fail(`la scheda del luogo "${k}" esplode: ${(e && e.message) || e}`); rotte++; }
    }
  }
  /* il retro degli oggetti: template a sé, e con quarantadue testi dietro */
  if (typeof E.inspectItem === 'function') {
    const conLore = Object.keys(game.api.ITEMS).filter(k => game.api.ITEMS[k].lore).slice(0, 3);
    for (const k of conLore) {
      try { game.act(() => E.inspectItem(k)); aperte++; }
      catch (e) { fail(`inspectItem('${k}') esplode: ${(e && e.message) || e}`); rotte++; }
    }
  }

  /* e le finestre dei moduli, dove esistono */
  for (const [mod, metodo] of [['Crafting', 'open'], ['Misteri', 'show']]) {
    const M = game.api[mod];
    if (!M || typeof M[metodo] !== 'function') continue;
    try { game.act(() => M[metodo]()); aperte++; }
    catch (e) { fail(`${mod}.${metodo}() esplode: ${(e && e.message) || e}`); rotte++; }
  }
  if (!rotte) console.log(`  ✔ ${aperte} finestre aperte senza errori`);
})();

(function testSchedaPersonaggio() {
  section('Scheda del personaggio: si apre sempre, in ogni stato');
  const game = buildGame(424242);
  const E = game.api.Engine;
  const tuttiGliEroi = game.api.HEROES;
  game.act(() => E.newGame(tuttiGliEroi.filter(h => !h.locked).slice(0, 2).map(h => ({ heroId: h.id, player: '' }))));
  /* Solo gli stati che QUESTO motore conosce: cercare un blocco "Condizioni attive"
     per uno stato che il gioco non ha mai sarebbe un test che chiede l'impossibile.
     La lista si deduce dal codice del motore, non si scrive a memoria. */
  const engineSrc = readFileSync(join(root, 'js/engine.js'), 'utf8');
  const STATI_NOTI = ['veleno', 'down', 'preso', 'morto', 'rimasto']
    .filter(s => new RegExp(`h\\.${s}\\b`).test(engineSrc) && new RegExp(`if \\(h\\.${s}\\) conditions\\.push`).test(engineSrc));
  const STATI = [{}, ...STATI_NOTI.map(s => ({ [s]: true }))];
  if (STATI_NOTI.length >= 2) STATI.push({ [STATI_NOTI[0]]: true, [STATI_NOTI[1]]: true });
  let rotte = 0, aperte = 0;
  for (const base of tuttiGliEroi) {
    for (const stato of STATI) {
      // una copia dell'eroe con lo stato addosso, come lo vedrebbe il giocatore
      const h = Object.assign(JSON.parse(JSON.stringify(base)), { hp: 3, player: 'Gali' }, stato);
      try {
        const html = E.heroSheetHTML(h);
        aperte++;
        if (typeof html !== 'string' || html.length < 200) { fail(`scheda di "${base.id}" con stato ${JSON.stringify(stato)}: HTML vuoto o troppo corto`); rotte++; }
        const conStato = Object.keys(stato).length > 0;
        if (conStato && !/Condizioni attive/.test(html)) { fail(`scheda di "${base.id}" con stato ${JSON.stringify(stato)}: nessun blocco "Condizioni attive" — lo stato è invisibile al giocatore`); rotte++; }
        if (/undefined|\[object Object\]|NaN/.test(html)) { fail(`scheda di "${base.id}" con stato ${JSON.stringify(stato)}: contiene "undefined"/"NaN" nel testo mostrato`); rotte++; }
      } catch (e) {
        fail(`scheda di "${base.id}" con stato ${JSON.stringify(stato)} ESPLODE: ${e.message}`);
        rotte++;
      }
    }
  }
  // e la modale vera, quella che si apre cliccando nella barra del gruppo
  try {
    game.act(() => E.showHeroSheetIdx(0));
    const box = game.doc.getElementById('modal-generic-content');
    if (!box.innerHTML || box.innerHTML.length < 200) { fail('showHeroSheetIdx(0): la modale resta vuota'); rotte++; }
    if (game.doc.getElementById('modal-generic').classList.contains('hidden')) { fail('showHeroSheetIdx(0): la modale non si apre'); rotte++; }
  } catch (e) { fail(`showHeroSheetIdx(0) esplode: ${e.message}`); rotte++; }
  if (!rotte) console.log(`  ✅ ${aperte} schede aperte (${tuttiGliEroi.length} eroi × ${STATI.length} stati), tutte complete e con le condizioni visibili`);
})();

(function testFinestreDiConferma() {
  section('Le finestre di conferma si aprono e rispondono');
  const game = buildGame(515151);
  const D = game.api.Dialoghi;
  if (!D) { fail('Dialoghi non è caricato nel banco di prova'); return; }
  let aperte = 0;
  const prove = [
    ['chiedi', () => D.chiedi('Titolo', 'Testo di prova', 'Conferma', true)],
    ['avvisa', () => D.avvisa('Titolo', 'Testo di prova')],
    ['chiediTesto', () => D.chiediTesto('Titolo', 'Testo di prova', 'valore')],
  ];
  for (const [nome, fn] of prove) {
    try {
      let p;
      game.act(() => { p = fn(); });
      if (!p || typeof p.then !== 'function') { fail(`Dialoghi.${nome}() non ritorna una Promise`); continue; }
      const el = game.doc.getElementById('modal-dialogo');
      if (!el) { fail(`Dialoghi.${nome}() non crea la finestra`); continue; }
      if (el.classList && el.classList.contains && el.classList.contains('hidden')) {
        fail(`Dialoghi.${nome}() lascia la finestra nascosta: non si vedrebbe`);
        continue;
      }
      aperte++;
    } catch (e) { fail(`Dialoghi.${nome}() esplode: ${(e && e.message) || e}`); }
  }
  if (aperte === prove.length) { console.log(`  ✔ ${aperte} finestre di conferma aperte senza errori`); }
})();

console.log('\n' + '═'.repeat(60));
if (failures === 0) {
  /* I FINALI NON COPERTI. Prima qui c'era solo un numero — «10 finali distinti» — e un
     numero non dice QUALI mancano. Aggiungendo tre scene ai draft il conto e scivolato da
     dieci a sette senza che niente diventasse rosso: i semi delle partite sono cambiati e
     tre finali hanno smesso di essere visitati, in silenzio. Un finale che nessuna partita
     simulata raggiunge e un finale che nessuno ha piu provato. */
  const tuttiIFinali = Object.entries(buildGame(1).api.CAMPAIGN)
    .filter(([, sc]) => sc.ending).map(([id]) => id);
  const scoperti = tuttiIFinali.filter(id => !allEndings.has(id));
  console.log(`✅ TUTTE LE PARTITE SIMULATE COMPLETATE SENZA ERRORI (${results.length} run, ${allScenesSeen.size} scene distinte, ${allEndings.size}/${tuttiIFinali.length} finali distinti)`);
  if (scoperti.length) {
    console.log(`  ⚠ finali che nessuna partita simulata raggiunge: ${scoperti.join(', ')}`);
    console.log('     (non e un errore: e il conto di quello che nessuno sta piu provando)');
  }
  process.exit(0);
} else {
  console.log(`❌ ${failures} PROBLEMI RILEVATI su ${results.length} partite simulate`);
  process.exit(1);
}

/* ---------- le finestre di conferma in stile (js/dialoghi.js) ----------
   Hanno preso il posto di confirm(), alert() e prompt() del browser, e sono le uniche
   finestre che il giocatore vede prima di perdere qualcosa: la partita che si sovrascrive,
   l'utente che si cancella con tutti i suoi salvataggi. Un template rotto qui non si vede
   giocando — si vede solo il giorno in cui uno prova a cancellare un utente. */
