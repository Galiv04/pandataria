/* ============ TEST AUTOMATICI — validazione dati e logica ============
   Uso: node tests/validate.mjs
   Verifica: integrità del grafo delle scene, dati personaggi/nemici/oggetti,
   sprite ben formati, raggiungibilità dei finali, sanità dei dadi, bilanciamento. */

import { readFileSync } from 'fs';
import { spawnSync } from 'child_process';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { cercaBuchi } from './buchi-nei-fondali.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

let failures = 0, warnings = 0, passed = 0;
function ok(msg) { passed++; }
function fail(msg) { failures++; console.error('  ❌ FAIL:', msg); }
function warn(msg) { warnings++; console.warn('  ⚠ WARN:', msg); }
function section(name) { console.log('\n▶', name); }

/* ---------- carica i moduli di gioco in un contesto Node ---------- */
const src = ['js/sprites.js', 'js/characters.js', 'js/campaign.js']
  .map(f => readFileSync(join(root, f), 'utf8'))
  .join('\n;\n');

const context = {};
const loader = new Function(`${src}; return {
  Sprites, HEROES, BESTIARY, ITEMS, CAMPAIGN, CAMPAIGN_START, WORLD_MAP,
  CHAPTERS: typeof CHAPTERS !== 'undefined' ? CHAPTERS : [],
  RECIPES: typeof RECIPES !== 'undefined' ? RECIPES : [],
  MISTERI: typeof MISTERI !== 'undefined' ? MISTERI : [],
  CHECKPOINT_FLAGS: typeof CHECKPOINT_FLAGS !== 'undefined' ? CHECKPOINT_FLAGS : [],
  MAP_ZONE_BY_LOCATION: typeof MAP_ZONE_BY_LOCATION !== 'undefined' ? MAP_ZONE_BY_LOCATION : null,
};`);
let g;
try {
  g = loader();
  ok('moduli caricati');
} catch (e) {
  console.error('❌ ERRORE FATALE nel caricamento dei moduli:', e.message);
  process.exit(1);
}
const { Sprites, HEROES, BESTIARY, ITEMS, CAMPAIGN, CAMPAIGN_START, WORLD_MAP, CHAPTERS, RECIPES, MISTERI, CHECKPOINT_FLAGS, MAP_ZONE_BY_LOCATION } = g;

/* ---------- 1. grafo delle scene ---------- */
section('Grafo delle scene');

const sceneIds = new Set(Object.keys(CAMPAIGN));
const SPECIAL = new Set(['RETRY_COMBAT', 'RIPRENDI_CHECKPOINT']);

function refsOf(scene) {
  const refs = [];
  for (const c of scene.choices || []) {
    if (c.next) refs.push(c.next);
    if (c.check) { refs.push(c.check.success, c.check.fail); }
  }
  if (scene.combat) { refs.push(scene.combat.victory, scene.combat.defeat); }
  if (scene.minigame) { refs.push(scene.minigame.success, scene.minigame.fail); }
  return refs.filter(Boolean);
}

let badRefs = 0;
for (const [id, scene] of Object.entries(CAMPAIGN)) {
  for (const ref of refsOf(scene)) {
    if (!sceneIds.has(ref) && !SPECIAL.has(ref)) { fail(`scena "${id}" punta a scena inesistente "${ref}"`); badRefs++; }
  }
}
if (!badRefs) { ok(); console.log(`  ✔ tutti i riferimenti tra ${sceneIds.size} scene sono validi`); }

// raggiungibilità da p1 (RETRY_COMBAT torna a una scena combat: consideriamo raggiungibili le scene combat già visitate)
const reachable = new Set();
const queue = [CAMPAIGN_START];
while (queue.length) {
  const id = queue.pop();
  if (reachable.has(id) || SPECIAL.has(id)) continue;
  reachable.add(id);
  const scene = CAMPAIGN[id];
  if (scene) queue.push(...refsOf(scene));
}
/* Alcune scene non sono raggiungibili dal GRAFO ma dal MOTORE: `e_abbandono` la apre
   Engine.riprendiDaCheckpoint dopo tre ritorni. Ognuna va elencata qui E citata
   davvero nel codice: il controllo sotto verifica entrambe le cose, così la lista
   non diventa un posto dove nascondere le scene morte. */
const RAGGIUNTE_DAL_MOTORE = ['e_abbandono'];
const engineForReach = readFileSync(join(root, 'js/engine.js'), 'utf8') + readFileSync(join(root, 'js/combat.js'), 'utf8');
for (const id of RAGGIUNTE_DAL_MOTORE) {
  if (!CAMPAIGN[id]) { fail(`RAGGIUNTE_DAL_MOTORE cita "${id}" che non esiste in CAMPAIGN`); continue; }
  if (!engineForReach.includes(`'${id}'`)) fail(`la scena "${id}" è dichiarata raggiungibile dal motore, ma il motore non la cita mai: è una scena morta`);
  reachable.add(id);
  // e da lì il grafo riprende
  const q2 = [id];
  while (q2.length) {
    const cur = q2.pop();
    if (!CAMPAIGN[cur]) continue;
    for (const r of refsOf(CAMPAIGN[cur])) if (!reachable.has(r) && !SPECIAL.has(r)) { reachable.add(r); q2.push(r); }
  }
}
const unreachable = [...sceneIds].filter(id => !reachable.has(id));
if (unreachable.length) unreachable.forEach(id => fail(`scena orfana (mai raggiungibile): "${id}"`));
else { ok(); console.log(`  ✔ tutte le ${sceneIds.size} scene sono raggiungibili da "${CAMPAIGN_START}"`); }

// scene senza uscite (devono essere solo i finali)
for (const [id, scene] of Object.entries(CAMPAIGN)) {
  const exits = refsOf(scene).length;
  if (!exits && !scene.ending) fail(`scena "${id}" è un vicolo cieco (nessuna uscita e non è un finale)`);
  if (scene.ending && refsOf(scene).length) warn(`finale "${id}" ha delle uscite: strano`);
}
ok(); console.log('  ✔ nessun vicolo cieco fuori dai finali');

// i finali sono raggiungibili
const endings = Object.entries(CAMPAIGN).filter(([, s]) => s.ending).map(([id]) => id);
if (endings.length < 3) fail(`solo ${endings.length} finali trovati (attesi ≥3)`);
for (const e of endings) {
  if (!reachable.has(e)) fail(`finale "${e}" non raggiungibile`);
}
console.log(`  ✔ ${endings.length} finali, tutti raggiungibili: ${endings.join(', ')}`);

// i cinque atti sono tutti raggiungibili (un atto scollegato = mezzo gioco invisibile)
const ATTI = { A: '27 agosto', B: '28 agosto — le cisterne', C: '29 agosto — Santo Stefano', D: '30 agosto — il giorno che non finisce', E: 'epiloghi' };
for (const [lettera, nome] of Object.entries(ATTI)) {
  const pref = lettera.toLowerCase();
  const scene = [...sceneIds].filter(id => id.startsWith(pref === 'e' ? 'e_' : pref));
  if (!scene.length) { fail(`atto ${lettera} (${nome}): nessuna scena trovata`); continue; }
  const raggiunte = scene.filter(id => reachable.has(id));
  if (!raggiunte.length) fail(`atto ${lettera} (${nome}): ${scene.length} scene, NESSUNA raggiungibile`);
  else console.log(`  ✔ atto ${lettera} — ${nome}: ${raggiunte.length}/${scene.length} scene raggiungibili`);
}

/* ---------- 2. scelte e requisiti ---------- */
section('Scelte, oggetti e flag');

/* flag che NON vengono da una scena: li imposta il motore, il crafting o i misteri.
   Tenere questo elenco allineato è parte del contratto: un flag non elencato e non
   impostato da nessuna scena è una porta che non si apre mai. */
const FLAG_DEL_MOTORE = new Set([
  'sorpresa', 'ciro_in_squadra', 'attenzione',
  'tornati_dal_checkpoint',                             // Engine.riprendiDaCheckpoint
  ...RECIPES.map(r => r.flag).filter(Boolean),          // impostati da Crafting.combine
  ...MISTERI.map(m => m.premio && m.premio.flag).filter(Boolean),  // impostati da Misteri.check
  // pickHeroForSacrifice: `resta: true` → rimasto_<id> (🌊 È RIMASTO), altrimenti sacrificio_<id>
  ...HEROES.map(h => 'rimasto_' + h.id),
  ...HEROES.map(h => 'sacrificio_' + h.id),
  ...HEROES.map(h => h.id + '_in_squadra'),             // unlockHero / startChapter
]);

const knownFlags = new Set();
for (const scene of Object.values(CAMPAIGN)) {
  if (scene.sets) Object.keys(scene.sets).forEach(f => knownFlags.add(f));
  for (const c of scene.choices || []) if (c.sets) Object.keys(c.sets).forEach(f => knownFlags.add(f));
}
let flagProblems = 0;
for (const [id, scene] of Object.entries(CAMPAIGN)) {
  for (const c of scene.choices || []) {
    for (const hRef of [c.requires?.hero, c.requires?.heroDead]) {
      if (hRef && !HEROES.some(h => h.id === hRef)) { fail(`scena "${id}": requires.hero inesistente "${hRef}"`); flagProblems++; }
    }
    if (c.sacrifice && !c.next) { fail(`scena "${id}": scelta sacrifice senza next`); flagProblems++; }
    for (const itemRef of [c.item, c.removeItem, c.removeItem2, c.requires?.item, c.requires?.item2, c.requires?.notItem]) {
      if (itemRef && !ITEMS[itemRef]) { fail(`scena "${id}": oggetto inesistente "${itemRef}"`); flagProblems++; }
    }
    if (c.check && !['FOR','DES','COS','INT','SAG','CAR'].includes(c.check.stat)) { fail(`scena "${id}": statistica invalida "${c.check.stat}"`); flagProblems++; }
    if (c.check && (c.check.dc < 5 || c.check.dc > 20)) warn(`scena "${id}": CD insolita ${c.check.dc}`);
  }
  for (const itemRef of [scene.item, scene.item2, scene.onEnterOnce?.itemEach]) {
    if (itemRef && !ITEMS[itemRef]) { fail(`scena "${id}": oggetto inesistente "${itemRef}"`); flagProblems++; }
  }
  if (scene.unlockHero && !HEROES.some(h => h.id === scene.unlockHero)) { fail(`scena "${id}": unlockHero inesistente "${scene.unlockHero}"`); flagProblems++; }
}
// Ciro deve sbloccarsi da qualche parte
if (!Object.values(CAMPAIGN).some(s => s.unlockHero === 'ciro')) fail('nessuna scena sblocca Ciro (unlockHero)');
if (!flagProblems) { ok(); console.log(`  ✔ tutti i flag (${knownFlags.size}) e gli oggetti referenziati esistono`); }

// oggetti chiave ottenibili prima di dove servono (controllo statico di percorso)
/* Gli ingredienti delle ricette DEVONO essere trovabili nel gioco, altrimenti la ricetta
   è una bugia scritta nel Quaderno. Gli oggetti PRODOTTI dalle ricette, viceversa, non
   devono essere dati da nessuna scena: si ottengono solo combinando. */
const prodotti = new Set(RECIPES.map(r => r.out));
function datoDaUnaScena(it) {
  return Object.values(CAMPAIGN).some(s => s.item === it || s.item2 === it
    || (s.choices || []).some(c => c.item === it || c.item2 === it)
    || (s.combat?.loot?.items || []).includes(it)
    || (s.minigame?.config?.oggetto === it));
}
let ricetteRotte = 0;
for (const r of RECIPES) {
  for (const ing of r.in) {
    if (!ITEMS[ing]) { fail(`ricetta → ${r.out}: ingrediente inesistente "${ing}"`); ricetteRotte++; continue; }
    if (!datoDaUnaScena(ing) && !prodotti.has(ing)) { fail(`ricetta → ${r.out}: l'ingrediente "${ing}" non è ottenibile da nessuna scena né da un'altra ricetta`); ricetteRotte++; }
  }
  if (!ITEMS[r.out]) { fail(`ricetta: il risultato "${r.out}" non esiste in ITEMS`); ricetteRotte++; }
  if (!r.text || r.text.length < 60) { fail(`ricetta → ${r.out}: manca il testo in voce (o è troppo corto)`); ricetteRotte++; }
  if (!r.flag) { fail(`ricetta → ${r.out}: manca il flag`); ricetteRotte++; }
}
for (const p of prodotti) {
  if (datoDaUnaScena(p)) fail(`l'oggetto craftato "${p}" viene ANCHE regalato da una scena: il crafting perde senso`);
}
if (!ricetteRotte) { ok(); console.log(`  ✔ ${RECIPES.length} ricette: ingredienti tutti ottenibili, risultati mai regalati`); }

/* I MISTERI: ogni indizio deve essere impostabile da una scena, e il premio deve essere
   consumato da qualche parte (requires, motore o combattimento), sennò risolverlo non serve. */
const engineAll = readFileSync(join(root, 'js/engine.js'), 'utf8') + readFileSync(join(root, 'js/combat.js'), 'utf8');
const campAll = readFileSync(join(root, 'js/campaign.js'), 'utf8');
let misteriRotti = 0;
for (const m of MISTERI) {
  if (!m.indizi || m.indizi.length < 3) { fail(`mistero "${m.id}": meno di 3 indizi`); misteriRotti++; }
  for (const i of m.indizi || []) {
    if (!knownFlags.has(i.flag)) { fail(`mistero "${m.id}": l'indizio "${i.flag}" non è impostato da NESSUNA scena — il Quaderno resterebbe con un punto di domanda per sempre`); misteriRotti++; }
    if (!i.testo) { fail(`mistero "${m.id}": indizio "${i.flag}" senza testo`); misteriRotti++; }
  }
  if (!m.premio || !m.premio.flag || !m.premio.testo) { fail(`mistero "${m.id}": premio incompleto`); misteriRotti++; }
  else {
    const usi = ((campAll + engineAll).match(new RegExp('\\b' + m.premio.flag + '\\b', 'g')) || []).length;
    if (usi < 2) { fail(`mistero "${m.id}": il premio "${m.premio.flag}" non è usato da nessuna parte — risolverlo non cambierebbe niente`); misteriRotti++; }
  }
}
if (!misteriRotti) { ok(); console.log(`  ✔ ${MISTERI.length} misteri: ${MISTERI.reduce((t, m) => t + m.indizi.length, 0)} indizi tutti raggiungibili, premi tutti usati`); }

/* I CHECKPOINT devono esistere come flag di scena: sono i punti a cui si torna morendo. */
let cpRotti = 0;
for (const f of CHECKPOINT_FLAGS) {
  if (!knownFlags.has(f)) { fail(`checkpoint "${f}": nessuna scena lo imposta — non ci si potrebbe tornare`); cpRotti++; }
}
if (!CHECKPOINT_FLAGS.length) fail('nessun CHECKPOINT_FLAGS: morire tutti sarebbe un game over secco');
if (!cpRotti) { ok(); console.log(`  ✔ ${CHECKPOINT_FLAGS.length} checkpoint, tutti impostati da una scena`); }

/* ---------- 3. combattimenti ---------- */
section('Combattimenti');

let combatProblems = 0;
const combats = Object.entries(CAMPAIGN).filter(([, s]) => s.combat);
for (const [id, scene] of combats) {
  for (const e of scene.combat.enemies) {
    if (!BESTIARY[e]) { fail(`combattimento "${id}": nemico inesistente "${e}"`); combatProblems++; }
  }
  if (!scene.combat.victory || !scene.combat.defeat) { fail(`combattimento "${id}": manca victory/defeat`); combatProblems++; }
  for (const it of scene.combat.loot?.items || []) {
    if (!ITEMS[it]) { fail(`combattimento "${id}": loot inesistente "${it}"`); combatProblems++; }
  }
}
if (!combatProblems) { ok(); console.log(`  ✔ ${combats.length} combattimenti validi (nemici, esiti, loot)`); }

// le sconfitte non-boss portano a sconfitta_generica che deve poter tornare al combattimento
const defeats = new Set(combats.map(([, s]) => s.combat.defeat));
for (const d of defeats) {
  if (!CAMPAIGN[d]) fail(`scena di sconfitta "${d}" inesistente`);
}
console.log(`  ✔ scene di sconfitta esistenti: ${[...defeats].join(', ')}`);

/* ---------- 4. personaggi e bestiario ---------- */
section('Personaggi e bestiario');

let charProblems = 0;
if (HEROES.length !== 3) fail(`attesi 3 protagonisti (Gaetano, Claudia + Ciro), trovati ${HEROES.length}`);
if (HEROES.filter(h => h.locked).length !== 1 || !HEROES.find(h => h.id === 'ciro')?.locked) fail('Ciro deve essere l\'unico eroe locked');
for (const h of HEROES) {
  for (const k of ['id','name','class','tagline','role','stats','maxHp','ac','attack','abilities','passive','backstory','voice','sprite']) {
    if (h[k] === undefined) { fail(`eroe "${h.id}": campo mancante "${k}"`); charProblems++; }
  }
  if (!Sprites.registry[h.sprite]) { fail(`eroe "${h.id}": sprite mancante "${h.sprite}"`); charProblems++; }
  for (const s of ['FOR','DES','COS','INT','SAG','CAR']) {
    if (typeof h.stats[s] !== 'number') { fail(`eroe "${h.id}": stat mancante ${s}`); charProblems++; }
  }
  if (h.abilities.length < 2) { fail(`eroe "${h.id}": meno di 2 abilità`); charProblems++; }
  for (const ab of h.abilities) {
    if (!ab.id || !ab.name || !ab.uses || !ab.type || !ab.desc) { fail(`eroe "${h.id}": abilità incompleta "${ab.id}"`); charProblems++; }
  }
  if (h.backstory.length < 200) warn(`eroe "${h.id}": backstory corta (${h.backstory.length} caratteri)`);
}
for (const [key, b] of Object.entries(BESTIARY)) {
  if (!Sprites.registry[b.sprite]) { fail(`nemico "${key}": sprite mancante "${b.sprite}"`); charProblems++; }
  if (!b.attack || !b.attack.dice || b.attack.bonus === undefined) { fail(`nemico "${key}": attacco malformato`); charProblems++; }
}
if (!charProblems) { ok(); console.log(`  ✔ ${HEROES.length} protagonisti completi (stats, abilità, backstory, sprite) e ${Object.keys(BESTIARY).length} nemici validi`); }

/* ---------- 5. sprite ---------- */
section('Sprite pixel-art');

let spriteProblems = 0;
for (const [name, def] of Object.entries(Sprites.registry)) {
  const n = def.map.length;
  if (n !== 16 && n !== 32) { fail(`sprite "${name}": ${n} righe (attese 16 o 32)`); spriteProblems++; }
  def.map.forEach((row, i) => {
    if (row.length !== n) { fail(`sprite "${name}" riga ${i}: ${row.length} colonne (attese ${n}, mappa quadrata)`); spriteProblems++; }
    for (const ch of row) {
      if (ch !== '.' && !def.palette[ch]) { fail(`sprite "${name}" riga ${i}: carattere "${ch}" non in palette`); spriteProblems++; }
    }
  });
  const solid = def.map.join('').split('').filter(c => c !== '.').length;
  if (solid < (n === 32 ? 160 : 40)) warn(`sprite "${name}": molto vuoto (${solid} pixel)`);
}
if (!spriteProblems) { ok(); console.log(`  ✔ ${Object.keys(Sprites.registry).length} sprite ben formati (16x16 o 32x32, palette coerenti)`); }

/* ---------- 6. mappa del mondo ---------- */
section('Mappa del mondo');

const mapped = new Set(WORLD_MAP.flatMap(l => l.scenes));
let unmapped = [...sceneIds].filter(id => !mapped.has(id) && id !== 'sconfitta_generica');
if (unmapped.length) unmapped.forEach(id => warn(`scena "${id}" senza luogo sulla mappa (userà fallback)`));
const mapGhost = [...mapped].filter(id => !sceneIds.has(id));
if (mapGhost.length) mapGhost.forEach(id => fail(`la mappa cita una scena inesistente "${id}"`));
else { ok(); console.log(`  ✔ mappa coerente: ${WORLD_MAP.length} luoghi, nessun riferimento fantasma`); }

/* ---------- 7. logica dei dadi ---------- */
section('Logica dei dadi (statistica)');

function roll(sides) { return 1 + Math.floor(Math.random() * sides); }
const N = 100000;
let sum = 0, min = 99, max = 0;
for (let i = 0; i < N; i++) { const r = roll(20); sum += r; min = Math.min(min, r); max = Math.max(max, r); }
const avg = sum / N;
if (min !== 1 || max !== 20) fail(`d20 fuori range: min=${min} max=${max}`);
else if (Math.abs(avg - 10.5) > 0.15) fail(`d20 media anomala: ${avg.toFixed(3)}`);
else { ok(); console.log(`  ✔ d20 uniforme su ${N} tiri (media ${avg.toFixed(2)}, range ${min}-${max})`); }

/* ---------- 8. bilanciamento (simulazione grezza) ---------- */
section('Bilanciamento (stime statistiche)');

function heroDPR(h) { // danno medio per round con attacco base
  const [n, s] = h.attack.dice;
  const statMod = h.stats[h.attack.stat] + (h.id === 'gaetano' && h.attack.stat === 'INT' ? 2 : 0) + (h.id === 'claudia' && h.attack.stat === 'SAG' ? 2 : 0);
  const hitChance = Math.min(0.95, Math.max(0.05, (21 - (13 - (statMod + 2))) / 20)); // vs CA 13 media
  const avgDmg = n * (s + 1) / 2 + statMod + (h.attack.bonus || 0);
  return hitChance * avgDmg;
}
function enemyDPR(e) {
  const [n, s] = e.attack.dice;
  const hitChance = Math.min(0.95, Math.max(0.05, (21 - (14 - e.attack.bonus)) / 20)); // vs CA 14 media
  return hitChance * (n * (s + 1) / 2 + e.attack.plus);
}

// party minimo (2 eroi più deboli in danno) contro ogni combattimento
const dprs = HEROES.map(h => ({ id: h.id, dpr: heroDPR(h), hp: h.maxHp })).sort((a, b) => a.dpr - b.dpr);
const weakDuo = dprs.slice(0, Math.min(2, dprs.length));
const duoDPR = weakDuo.reduce((t, x) => t + x.dpr, 0) * 1.5; // ~x1.5 per abilità speciali
const duoHP = weakDuo.reduce((t, x) => t + x.hp, 0) + 20;    // + pozioni/cure

for (const [id, scene] of combats) {
  const vivi = scene.combat.enemies.filter(e => BESTIARY[e]);
  if (vivi.length !== scene.combat.enemies.length) continue;   // già segnalato sopra come FAIL
  const totalEhp = vivi.reduce((t, e) => t + BESTIARY[e].maxHp, 0);
  const totalEdpr = vivi.reduce((t, e) => t + enemyDPR(BESTIARY[e]), 0);
  const roundsToWin = totalEhp / duoDPR;
  const roundsToLose = duoHP / totalEdpr;
  const margin = roundsToLose / roundsToWin;
  if (margin < 0.9) warn(`combattimento "${id}" molto duro per 2 giocatori (margine ${margin.toFixed(2)}): ok se boss`);
  else ok();
}
console.log('  ✔ stima di bilanciamento per party di 2 completata (vedi eventuali warn)');

/* I boss si tarano sul party che il giocatore ha DAVVERO davanti: due persone.
   Ciro si unisce solo il terzo giorno e può non essere nello scontro. Tarare sul
   party pieno è come tarare un boss sul caso migliore: la lezione 11 della serie. */
const duoBoss = weakDuo.reduce((t, x) => t + x.dpr, 0) * 1.4;
const fullParty = dprs.reduce((t, x) => t + x.dpr, 0) * 1.4;
for (const k of ['giulia', 'bambina', 'coro_vero', 'se_stessa']) {
  const b = BESTIARY[k];
  if (!b) { fail(`boss "${k}" assente dal bestiario`); continue; }
  const round2 = Math.ceil(b.maxHp / duoBoss), round3 = Math.ceil(b.maxHp / fullParty);
  console.log(`  ℹ boss "${b.short}": ${b.maxHp} PV → ~${round2} round in DUE, ~${round3} col terzo`);
  if (round2 > 11) fail(`boss "${k}": ~${round2} round per due giocatori — troppo lungo, diventa noioso`);
  if (round2 < 4) warn(`boss "${k}": ~${round2} round in due, cade troppo presto per essere un boss`);
  /* IL CONTROLLO CHE CONTA: un boss che uccide un eroe in due colpi mentre ne serve
     sette per abbatterlo è invincibile per costruzione, e nessuna quantità di PV in
     più o in meno lo sistema. L'eroe più fragile deve reggere almeno 3 colpi. */
  const [n, f] = b.attack.dice;
  const dannoMedio = n * (f + 1) / 2 + (b.attack.plus || 0);
  const pvMin = Math.min(...HEROES.map(h => h.maxHp));
  const colpiRetti = Math.ceil(pvMin / dannoMedio);
  if (colpiRetti < 3) {
    fail(`boss "${k}": ${dannoMedio.toFixed(1)} danni medi uccidono l'eroe più fragile (${pvMin} PV) in ${colpiRetti} colpi, ma servono ~${round2} round per abbatterlo: matematicamente invincibile`);
  } else if (colpiRetti < 4) {
    warn(`boss "${k}": l'eroe più fragile regge solo ${colpiRetti} colpi — al limite`);
  }
}
/* Stesso controllo per i nemici normali, che però arrivano in GRUPPO: due nemici che
   fanno 6 danni a testa sono 12 al round, e un eroe da 22 PV cade in due turni. */
for (const [id, scene] of combats) {
  const nemici = scene.combat.enemies.filter(e => BESTIARY[e]);
  if (nemici.length < 2) continue;
  const dprTot = nemici.reduce((t, e) => {
    const b = BESTIARY[e], [n, f] = b.attack.dice;
    return t + n * (f + 1) / 2 + (b.attack.plus || 0);
  }, 0);
  const pvMin = Math.min(...HEROES.map(h => h.maxHp));
  if (dprTot > pvMin / 2) warn(`combattimento "${id}": ${nemici.length} nemici per ${dprTot.toFixed(1)} danni potenziali al round contro ${pvMin} PV — un eroe cade in ${Math.ceil(pvMin / dprTot)} round`);
}

/* ---------- 9. testi ---------- */
section('Qualità dei testi');

let shortScenes = 0;
for (const [id, scene] of Object.entries(CAMPAIGN)) {
  if (!scene.text || scene.text.length < 80) { warn(`scena "${id}": testo molto corto`); shortScenes++; }
  if (!scene.caption) warn(`scena "${id}": manca la caption`);
  if (!scene.location) fail(`scena "${id}": manca la location`);
}
const totalChars = Object.values(CAMPAIGN).reduce((t, s) => t + (s.text || '').length, 0);
const words = Math.round(totalChars / 6);
console.log(`  ✔ ${Object.keys(CAMPAIGN).length} scene, ~${words} parole di narrazione (~${Math.round(words / 180)} min di sola lettura ad alta voce)`);
if (words < 6000) warn('campagna forse corta per 2-4 ore');




/* ---------- capitoli di "Rivivi la Notte": scene e oggetti devono esistere ---------- */
section('Capitoli di Rivivi la Notte');

let capitoliRotti = 0;
for (const c of CHAPTERS) {
  const dest = c.scene || c.id;
  if (!CAMPAIGN[dest]) { fail(`capitolo "${c.label}": la scena di destinazione "${dest}" non esiste`); capitoliRotti++; }
  for (const it of (c.items || [])) {
    if (!ITEMS[it]) { fail(`capitolo "${c.label}": l'oggetto preparato "${it}" non esiste in ITEMS`); capitoliRotti++; }
  }
  if (!c.label || !c.desc) { fail(`capitolo "${dest}": manca label o desc`); capitoliRotti++; }
}
if (!capitoliRotti) { ok(); console.log(`  ✔ ${CHAPTERS.length} capitoli, tutte le destinazioni e gli zaini preparati esistono`); }

/* ---------- stinger dichiarati dalle scene: devono esistere in sound.js ---------- */
section('Stinger delle scene (nessun suono fantasma)');

const soundSrc = readFileSync(join(root, 'js/sound.js'), 'utf8');
const effectsBlock = soundSrc.slice(soundSrc.indexOf('const effects = {'), soundSrc.indexOf('function play('));
const effectNames = new Set([...effectsBlock.matchAll(/^\s{4}([a-z_0-9]+)\(\)/gm)].map(m => m[1]));
let stingerMorti = 0;
for (const [id, scene] of Object.entries(CAMPAIGN)) {
  if (scene.stinger && !effectNames.has(scene.stinger)) {
    fail(`scena "${id}": stinger "${scene.stinger}" non esiste in sound.js (suono fantasma silenzioso)`);
    stingerMorti++;
  }
}
const conStinger = Object.values(CAMPAIGN).filter(sc => sc.stinger).length;
if (!stingerMorti) { ok(); console.log(`  ✔ ${conStinger} scene con stinger, tutti esistenti in sound.js (${effectNames.size} effetti nel catalogo)`); }

/* ---------- flag morti: imprese/cronache/diario devono poter scattare ---------- */
section('Flag di imprese, cronache e diario (nessun flag morto)');

const epiSrc = readFileSync(join(root, 'js/epilogues.js'), 'utf8');
const campSrc = readFileSync(join(root, 'js/campaign.js'), 'utf8');
const setsBlocks = [...campSrc.matchAll(/sets:\s*{([^}]*)}/g)].map(m => m[1]).join(' ');
const settableFlags = new Set([...setsBlocks.matchAll(/([a-z_0-9]+)\s*:/g)].map(m => m[1]));
// flag impostati fuori dalle scene (motore/combattimento) — da tenere aggiornata a mano
const FLAG_ESTERNI = FLAG_DEL_MOTORE; // motore, crafting, misteri (vedi sopra)
const flagRichiesti = new Set([
  ...[...epiSrc.matchAll(/flag:\s*'([a-z_0-9]+)'/g)].map(m => m[1]),
  ...[...campSrc.matchAll(/^\s*\['([a-z_0-9]+)',/gm)].map(m => m[1]), // DIARY_FLAGS
]);
let flagMorti = 0;
for (const f of flagRichiesti) {
  if (!settableFlags.has(f) && !FLAG_ESTERNI.has(f)) { fail(`flag "${f}" richiesto da imprese/cronache/diario ma MAI impostato da nessuna scena`); flagMorti++; }
}
if (!flagMorti) { ok(); console.log(`  ✔ ${flagRichiesti.size} flag di imprese/cronache/diario, tutti impostabili da almeno una scena`); }

// direzione inversa: flag impostati dalle scene ma senza NESSUN consumatore di gioco
// (né requires, né combat, né diario/imprese/cronache) — debito narrativo, non errore
const engineSrc2 = readFileSync(join(root, 'js/engine.js'), 'utf8') + readFileSync(join(root, 'js/combat.js'), 'utf8');
const consumatori = campSrc + engineSrc2 + epiSrc;
const senzaConsumatore = [...settableFlags].filter(f => {
  const inSets = (setsBlocks.match(new RegExp('\\b' + f + '\\b', 'g')) || []).length;
  const totale = (consumatori.match(new RegExp('\\b' + f + '\\b', 'g')) || []).length;
  return totale <= inSets;
});
if (senzaConsumatore.length) warn(`${senzaConsumatore.length} flag impostati ma senza consumatore di gioco (debito narrativo): ${senzaConsumatore.slice(0, 8).join(', ')}${senzaConsumatore.length > 8 ? ', …' : ''}`);


/* ---------- prove ripetibili: check senza once nelle scene rivisitabili ---------- */
section('Prove nei luoghi rivisitabili (nessuna prova ripetibile)');

const bersagliRitorno = new Set([...campSrc.matchAll(/text: ["']↩[^"']*["'][^\n]*?next: '([a-z_0-9]+)'/g)].map(m => m[1]));
let proveRipetibili = 0;
for (const sid of bersagliRitorno) {
  const m = campSrc.match(new RegExp('^  ' + sid + ': \\{', 'm'));
  if (!m) continue;
  const blocco = campSrc.slice(m.index, campSrc.indexOf('\n  },', m.index));
  for (const c of blocco.matchAll(/\{ text: '([^']{0,60})'[^\n]*?check: \{[^}]*\}[^\n]*\}/g)) {
    if (!c[0].includes('once')) { fail(`scena rivisitabile "${sid}": la prova "${c[1]}" è ripetibile (manca once)`); proveRipetibili++; }
  }
}
if (!proveRipetibili) { ok(); console.log(`  ✔ ${bersagliRitorno.size} scene rivisitabili, nessuna prova ripetibile`); }

/* ---------- 9b. nessuna chiave di dati inventata ---------- */
section('Chiavi dei dati (niente campi che il motore non legge)');

/* La lezione più costosa della serie: se inventi un campo e non lo implementi, il gioco
   non dà errore — semplicemente quella riga di dati non fa niente, e te ne accorgi giocando.
   Questa whitelist è il contratto: aggiungere una chiave qui richiede di implementarla. */
const CHIAVI_SCENA = new Set(['location','caption','text','choices','gold','goldLoss','heal','damage',
  'item','item2','sets','attenzione','stinger','silenzio','metri','combat','minigame','fullHeal',
  'recharge','freeAll','reviveAll','killRoller','poisonRoller','captureRoller','ending','unlockHero',
  'onEnterOnce', 'npc']);
const CHIAVI_SCELTA = new Set(['text','next','once','requires','requiresGold','removeItem','removeItem2',
  'item','item2','sets','check','heal','damage','gold','goldLoss','tag','sacrifice','sacrificeSets','resta',
  'sacrificeTitle','sacrificeText','hero']);
const CHIAVI_REQUIRES = new Set(['flag','flag2','notFlag','flagAny','item','item2','notItem','hero','spirit','heroDead']);
let chiaviInventate = 0;
for (const [id, scene] of Object.entries(CAMPAIGN)) {
  for (const k of Object.keys(scene)) {
    if (!CHIAVI_SCENA.has(k)) { fail(`scena "${id}": chiave "${k}" che il motore NON legge (dato morto)`); chiaviInventate++; }
  }
  for (const c of scene.choices || []) {
    for (const k of Object.keys(c)) {
      if (!CHIAVI_SCELTA.has(k)) { fail(`scena "${id}", scelta "${(c.text || '').slice(0, 30)}": chiave "${k}" che il motore NON legge`); chiaviInventate++; }
    }
    for (const k of Object.keys(c.requires || {})) {
      if (!CHIAVI_REQUIRES.has(k)) { fail(`scena "${id}": requires.${k} non esiste nel motore`); chiaviInventate++; }
    }
  }
}
// controprova: ogni chiave della whitelist deve comparire davvero nel motore
const motoreSrc = readFileSync(join(root, 'js/engine.js'), 'utf8');
for (const k of CHIAVI_SCENA) {
  if (!new RegExp('scene\\.' + k + '\\b|s\\.' + k + '\\b').test(motoreSrc)) warn(`la whitelist ammette "scene.${k}" ma il motore non sembra leggerla`);
}
if (!chiaviInventate) { ok(); console.log(`  ✔ nessuna chiave inventata: ${CHIAVI_SCENA.size} chiavi di scena e ${CHIAVI_SCELTA.size} di scelta, tutte implementate`); }

/* ---------- 10. minigiochi: le config devono combaciare con le firme vere ---------- */
section('Minigiochi (config conformi a js/minigames.js)');

/* Un campo che il motore non legge è una bugia: il minigioco parte vuoto e nessuno
   se ne accorge finché non ci gioca un essere umano. Queste sono le firme reali. */
const MG_SPEC = {
  apnea:       { chiavi: ['titolo','profondita','oggetto','cosa','extra','extraFlag','cosaExtra','fiato'], obbligatorie: ['profondita'] },
  corsa:       { chiavi: ['titolo','ostacoli','tema','velocita','cielo','suolo'], obbligatorie: [] },
  indovinello: { chiavi: ['titolo','testo','risposte'], obbligatorie: ['testo','risposte'] },
  memoria:     { chiavi: ['titolo','lunghezza','simboli'], obbligatorie: [] },
  calcolo:     { chiavi: ['titolo','secondi','domande'], obbligatorie: ['domande'] },
  filastrocca: { chiavi: ['titolo','versi','risposte'], obbligatorie: ['versi','risposte'] },
};
const mgSrc = readFileSync(join(root, 'js/minigames.js'), 'utf8');
let mgProblemi = 0;
const mgUsati = {};
for (const [id, scene] of Object.entries(CAMPAIGN)) {
  const mg = scene.minigame;
  if (!mg) continue;
  mgUsati[mg.type] = (mgUsati[mg.type] || 0) + 1;
  const spec = MG_SPEC[mg.type];
  if (!spec) { fail(`scena "${id}": minigioco di tipo "${mg.type}" che non esiste in minigames.js`); mgProblemi++; continue; }
  if (!mg.success || !mg.fail) { fail(`scena "${id}": minigioco senza success/fail`); mgProblemi++; }
  if (mg.hero && !HEROES.some(h => h.id === mg.hero)) { fail(`scena "${id}": minigioco assegnato a un eroe inesistente "${mg.hero}"`); mgProblemi++; }
  if ((scene.choices || []).length) { fail(`scena "${id}": ha un minigioco E delle scelte — l'engine ignora le scelte, sono testo morto`); mgProblemi++; }
  const cfg = mg.config || {};
  for (const k of Object.keys(cfg)) {
    if (!spec.chiavi.includes(k)) { fail(`scena "${id}": il minigioco "${mg.type}" non legge la chiave "${k}" (config inventata: il gioco partirebbe vuoto)`); mgProblemi++; }
  }
  for (const k of spec.obbligatorie) {
    if (cfg[k] === undefined) { fail(`scena "${id}": al minigioco "${mg.type}" manca la config obbligatoria "${k}"`); mgProblemi++; }
  }
  // le risposte a scelta multipla devono avere ESATTAMENTE una giusta
  const liste = [cfg.risposte, ...((cfg.domande || []).map(d => d.r))].filter(Boolean);
  for (const lista of liste) {
    const giuste = lista.filter(r => r.ok).length;
    if (giuste !== 1) { fail(`scena "${id}": una domanda del minigioco ha ${giuste} risposte giuste (ne serve esattamente 1)`); mgProblemi++; }
    if (lista.length < 2) { fail(`scena "${id}": una domanda del minigioco ha meno di 2 risposte`); mgProblemi++; }
  }
  if (cfg.oggetto && !ITEMS[cfg.oggetto]) { fail(`scena "${id}": il minigioco premia un oggetto inesistente "${cfg.oggetto}"`); mgProblemi++; }
  if (cfg.versi && !cfg.versi.includes('___')) { fail(`scena "${id}": filastrocca senza la lacuna "___"`); mgProblemi++; }
  if (cfg.tema && !['siepi','libri','lavatrici','tornanti'].includes(cfg.tema)) warn(`scena "${id}": tema corsa "${cfg.tema}" non riconosciuto (userà il default)`);
}
const tipiUsati = Object.keys(mgUsati);
if (tipiUsati.length < 3) fail(`solo ${tipiUsati.length} tipi di minigioco usati (ne servono almeno 3 per varietà)`);
if (!mgProblemi) { ok(); console.log(`  ✔ ${Object.values(mgUsati).reduce((a, b) => a + b, 0)} minigiochi, ${tipiUsati.length} tipi (${tipiUsati.map(t => `${t}×${mgUsati[t]}`).join(', ')}), tutte le config conformi`); }

/* ---------- 11. l'economia del FIATO deve essere giocabile ---------- */
section('Economia del Fiato (la risorsa deve mordere, non strozzare)');

/* Il Fiato non è una valuta: è l'aria delle immersioni. Va verificato che
   (a) se ne guadagni abbastanza da arrivare in fondo, (b) non tanto da saturare
   il tetto entro il primo giorno, che è l'errore che ha reso decorative le valute
   dei giochi precedenti. */
const FIATO_MAX = Number((readFileSync(join(root, 'js/engine.js'), 'utf8').match(/const FIATO_MAX = (\d+)/) || [])[1] || 20);
const FIATO_START = Number((readFileSync(join(root, 'js/engine.js'), 'utf8').match(/gold: solo \? \d+ : (\d+)/) || [])[1] || 6);

// modello dell'apnea, copiato da Engine.apneaFiato/metriPossibili
function ariaCon(fiato, bombola) { return Math.round(50 + fiato * 6.0 + (bombola ? 80 : 0)); }
function metriCon(fiato, bombola) {
  let m = 0, aria = ariaCon(fiato, bombola);
  while (aria > 0 && m < 70) { aria -= (4.8 + m * 0.28) / 3.4 * 1.35; m += 1; }
  return Math.max(3, Math.floor(m * 0.5));
}
const guadagnoTot = Object.values(CAMPAIGN).reduce((t, s) => t + (s.gold || 0)
  + (s.choices || []).reduce((u, c) => u + Math.max(0, c.gold || 0), 0), 0);
const spesaTot = Object.values(CAMPAIGN).reduce((t, s) => t + (s.goldLoss || 0)
  + (s.choices || []).reduce((u, c) => u + (c.goldLoss || 0) + Math.max(0, -(c.gold || 0)), 0), 0);
const conRequires = Object.values(CAMPAIGN).reduce((t, s) => t + (s.choices || []).filter(c => c.requiresGold).length, 0);
console.log(`  ℹ Fiato: parte da ${FIATO_START}, tetto ${FIATO_MAX}. Guadagni totali sul grafo: +${guadagnoTot}. Spese: −${spesaTot}. Scelte che ne richiedono un minimo: ${conRequires}.`);
console.log(`  ℹ Portata: con ${FIATO_START} di fiato si arriva a ~${metriCon(FIATO_START, false)} m; col tetto ~${metriCon(FIATO_MAX, false)} m; col tetto e la bombola riparata ~${metriCon(FIATO_MAX, true)} m.`);
if (conRequires < 4) fail(`solo ${conRequires} scelte richiedono un minimo di Fiato: la risorsa resterebbe decorativa (è l'errore dei giochi precedenti)`);
if (spesaTot < guadagnoTot / 6) warn(`si guadagna ${(guadagnoTot / Math.max(1, spesaTot)).toFixed(1)}× quello che si spende: inflazione, il tetto si satura e la risorsa smette di contare`);
else ok();

// nessuna apnea deve essere fuori portata anche col fiato massimo e la bombola
const maxRaggiungibile = metriCon(FIATO_MAX, true);
let apneeImpossibili = 0;
for (const [id, scene] of Object.entries(CAMPAIGN)) {
  const cfg = scene.minigame && scene.minigame.type === 'apnea' ? scene.minigame.config || {} : null;
  if (!cfg) continue;
  const target = cfg.profondita || 18;
  if (target > maxRaggiungibile) { fail(`scena "${id}": apnea a ${target} m, ma col Fiato al massimo (${FIATO_MAX}) e la bombola riparata si arriva a ${maxRaggiungibile} m — è impossibile per costruzione`); apneeImpossibili++; }
  if (cfg.extra && target + cfg.extra > maxRaggiungibile + 6) warn(`scena "${id}": il bonus a ${target + cfg.extra} m è quasi certamente irraggiungibile`);
}
if (!apneeImpossibili) { ok(); console.log(`  ✔ tutte le apnee sono raggiungibili entro ${maxRaggiungibile} m`); }

// requiresGold non deve superare il tetto
for (const [id, scene] of Object.entries(CAMPAIGN)) {
  for (const c of scene.choices || []) {
    if (c.requiresGold && c.requiresGold > FIATO_MAX) fail(`scena "${id}": una scelta richiede ${c.requiresGold} di Fiato, oltre il tetto di ${FIATO_MAX}: non si aprirà mai`);
    if (c.requiresGold && !c.tag) warn(`scena "${id}": scelta con requiresGold senza tag che spieghi quanto serve`);
  }
}

/* ---------- 12. l'attenzione del Coro ---------- */
section('Attenzione del Coro (0-6)');

const attScene = Object.entries(CAMPAIGN).filter(([, s]) => s.attenzione);
const attTot = attScene.reduce((t, [, s]) => t + s.attenzione, 0);
if (!attScene.length) fail('nessuna scena alza l\'attenzione del Coro: la barra del Quaderno resterebbe sempre a zero');
else console.log(`  ℹ ${attScene.length} scene alzano l'attenzione, per un totale teorico di +${attTot} (la barra si ferma a 6)`);
for (const [id, s] of attScene) {
  if (s.attenzione < 1 || s.attenzione > 3) fail(`scena "${id}": attenzione ${s.attenzione} fuori dalla scala sensata (1-3 per scena)`);
}
if (!engineAll.includes('attenzione')) fail('il motore non legge scene.attenzione: il campo sarebbe una bugia');
else ok();

/* ---------- 12a. ogni luogo ha uno sfondo e una musica ---------- */
section('Luoghi: sfondo dipinto e traccia musicale');

/* Un `location` senza painter cade sul fallback e disegna il posto sbagliato per
   tutta la scena; senza voce in MUSIC_BY_LOCATION suona la traccia sbagliata per
   mezz'ora di gioco. Nessuno dei due dà errore. */
const scenesSrc = readFileSync(join(root, 'js/scenes.js'), 'utf8');
const painterKeys = new Set([...scenesSrc.matchAll(/^    ([a-z_0-9]+)\s*[:(]/gm)].map(m => m[1]));
const engSrc = readFileSync(join(root, 'js/engine.js'), 'utf8');
const musBlock = engSrc.slice(engSrc.indexOf('MUSIC_BY_LOCATION = {'), engSrc.indexOf('};', engSrc.indexOf('MUSIC_BY_LOCATION = {')));
const musMap = Object.fromEntries([...musBlock.matchAll(/\b([a-z_0-9]+):\s*'([a-z_0-9]+)'/g)].map(m => [m[1], m[2]]));
const soundSrc2 = readFileSync(join(root, 'js/sound.js'), 'utf8');
const trkBlock = soundSrc2.slice(soundSrc2.indexOf('const TRACKS = {'));
const trackNames = new Set([...trkBlock.matchAll(/^    ([a-z_0-9]+):\s*\{/gm)].map(m => m[1]));
const locationsUsate = [...new Set(Object.values(CAMPAIGN).map(s => s.location).filter(Boolean))];
let luoghiRotti = 0;
for (const loc of locationsUsate) {
  if (!painterKeys.has(loc)) { fail(`location "${loc}": nessun painter in js/scenes.js — disegnerebbe lo sfondo di fallback`); luoghiRotti++; }
  const trk = musMap[loc];
  if (!trk) { fail(`location "${loc}": nessuna voce in MUSIC_BY_LOCATION — suonerebbe la traccia di default`); luoghiRotti++; }
  else if (!trackNames.has(trk)) { fail(`location "${loc}" → traccia "${trk}" che non esiste in js/sound.js`); luoghiRotti++; }
}
if (!luoghiRotti) { ok(); console.log(`  ✔ ${locationsUsate.length} luoghi, ognuno con il suo sfondo dipinto e la sua traccia (su ${trackNames.size} tracce)`); }

/* ---------- 12a-bis: lo sfondo deve stare dove sta la scena ---------- */
section('Coerenza fra sfondo e didascalia');

/* Otto scene dell'orto dei Coraggio — pomodori, un fico, un cane, in pieno sole —
   disegnavano il fondale sottomarino, e nessun test se ne accorgeva. Un painter
   sbagliato non dà errore: dà una scena che racconta una cosa e ne mostra un'altra. */
/* `cisterna_sigillata` sta fuori dall'elenco: quel muro si guarda DA un orto, e la
   didascalia nomina l'orto a ragione. Il confronto si fa solo sulla DIDASCALIA, che
   dice dove sei: il corpo del testo può ricordare un altro posto senza sbagliare. */
const LUOGHI_CHIUSI = ['sotto', 'cisterna', 'cella', 'panopticon', 'fossa', 'relitto'];
const PAROLE_APERTO = /\borto\b|muretto|piazza|lungomare|spiaggia|\bmolo\b|banchina|sentiero|in pieno sole|sotto il fico|giardino|cortile|terrazza/i;
let sfondiSbagliati = 0;
for (const [id, s] of Object.entries(CAMPAIGN)) {
  if (!LUOGHI_CHIUSI.includes(s.location)) continue;
  const dove = s.caption || '';
  const m = dove.match(PAROLE_APERTO);
  if (m) { fail(`scena "${id}": sfondo "${s.location}" (un interno o un fondale) ma la didascalia dice che sei all'aperto: "${m[0]}"`); sfondiSbagliati++; }
}
// e il contrario: `metri` (la profondità) su una scena che non è sott'acqua
for (const [id, s] of Object.entries(CAMPAIGN)) {
  const PROFONDITA_LECITA = [...LUOGHI_CHIUSI, 'cisterna_sigillata', 'mare', 'barca'];
  if (typeof s.metri === 'number' && s.metri > 0 && !PROFONDITA_LECITA.includes(s.location)) {
    fail(`scena "${id}": ha metri: ${s.metri} (il canvas si tinge di blu e stringe) ma il luogo è "${s.location}"`);
    sfondiSbagliati++;
  }
}
if (!sfondiSbagliati) { ok(); console.log('  ✔ ogni sfondo chiuso sta su una scena chiusa, e la profondità solo dove si è sott\'acqua'); }

/* ---------- 12b. gli id del DOM che il motore usa devono esistere in index.html ---------- */
section('Id del DOM (nessun elemento fantasma)');

/* Un id sbagliato non dà errore: `getElementById` restituisce null e la riga non fa
   niente. `showScreen('screen-scene')` — con index.html che dichiara `screen-game` —
   lasciava attiva la schermata di combattimento e faceva rimbalzare il gioco sullo
   stesso scontro all'infinito. Silenzioso, e costoso da trovare. */
const htmlSrc = readFileSync(join(root, 'index.html'), 'utf8');
const idsHtml = new Set([...htmlSrc.matchAll(/id="([a-zA-Z0-9_-]+)"/g)].map(m => m[1]));
const jsTutti = ['js/engine.js', 'js/combat.js', 'js/minigames.js', 'js/crafting.js', 'js/misteri.js', 'js/main.js', 'js/dice.js']
  .map(f => readFileSync(join(root, f), 'utf8')).join('\n');
let idFantasma = 0;
// showScreen('...') e getElementById('...') / $('...')
const idsUsati = new Set([
  ...[...jsTutti.matchAll(/showScreen\('([a-zA-Z0-9_-]+)'\)/g)].map(m => m[1]),
  ...[...jsTutti.matchAll(/getElementById\('([a-zA-Z0-9_-]+)'\)/g)].map(m => m[1]),
  ...[...jsTutti.matchAll(/\$\('([a-zA-Z0-9_-]+)'\)/g)].map(m => m[1]),
]);
/* Molti elementi nascono a runtime dentro l'innerHTML delle modali: sono legittimi,
   e vanno cercati anche nei template del JS (`id="..."` e `id=...` dentro le stringhe). */
const idsDinamici = new Set([...jsTutti.matchAll(/id=["'`]?([a-zA-Z0-9_-]+)["'`]?[\s>]/g)].map(m => m[1]));
const idsEsistenti = new Set([...idsHtml, ...idsDinamici]);
for (const id of idsUsati) {
  if (!idsEsistenti.has(id)) { fail(`il codice usa l'elemento "#${id}" che non esiste né in index.html né in nessun template JS (riga morta e silenziosa)`); idFantasma++; }
}
/* Le SCHERMATE, però, devono stare in index.html: una schermata non si crea a runtime,
   e `showScreen` con un id sbagliato lascia attiva quella di prima senza dare errore. */
for (const m of jsTutti.matchAll(/showScreen\('([a-zA-Z0-9_-]+)'\)/g)) {
  if (!idsHtml.has(m[1])) { fail(`showScreen('${m[1]}'): quella schermata NON esiste in index.html — resta attiva quella precedente, in silenzio`); idFantasma++; }
}
if (!idFantasma) { ok(); console.log(`  ✔ ${idsUsati.size} id usati dal codice, tutti esistenti (${idsHtml.size} in index.html + ${idsDinamici.size} creati a runtime)`); }

/* ---------- 13. accuratezza del calendario ---------- */
section('Calendario reale (agosto 2026)');

/* Il committente è stato davvero a Ventotene in queste date: se il gioco scrive
   "mercoledì 27 agosto" e il 27 agosto 2026 è un giovedì, la finzione si rompe
   nella riga più facile da controllare che esista. */
const GIORNI = ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
let dateSbagliate = 0, dateViste = 0;
const testoTutto = Object.entries(CAMPAIGN).map(([id, s]) => [id, (s.caption || '') + '\n' + (s.text || '')]);
for (const [id, t] of testoTutto) {
  for (const m of t.matchAll(/(lunedì|martedì|mercoledì|giovedì|venerdì|sabato|domenica)\s+(\d{1,2})\s+agosto/gi)) {
    dateViste++;
    const detto = m[1].toLowerCase();
    const giorno = Number(m[2]);
    const vero = GIORNI[new Date(Date.UTC(2026, 7, giorno)).getUTCDay()];
    if (detto !== vero) { fail(`scena "${id}": scrive "${m[1]} ${giorno} agosto", ma il ${giorno} agosto 2026 è ${vero}`); dateSbagliate++; }
  }
}
if (!dateViste) warn('nessuna data con giorno della settimana trovata nei testi');
else if (!dateSbagliate) { ok(); console.log(`  ✔ ${dateViste} date con giorno della settimana, tutte corrette sul calendario 2026`); }


/* ---------- densità: la metrica GIUSTA ---------- */
section('Densità (nodi di decisione, non scene)');

/* Storia di questa sezione: la soglia della serie era "corridoi ≤15%", dove corridoio
   = scena con una sola scelta. Misurandola sui cinque giochi è venuto fuori che
   Casa stava al 27% e Relais al 20% — ma leggendo le scene, quasi tutte erano BATTUTE:
   sotto-scene che chiudono un momento, cioè buona scrittura. Inseguire quel numero
   porta ad aggiungere seconde scelte finte, che è esattamente il difetto peggiore
   della serie. Quindi la metrica è cambiata, e misura due cose che contano davvero:

   1. SCELTE PER NODO DI DECISIONE: la media sulle sole scene con ≥2 scelte. È quanto
      è ricca una decisione quando il gioco te ne offre una. Soglia: ≥2.2.
   2. CORRIDOI STERILI: scene con una sola scelta E nessun effetto (niente item, sets,
      check, cure, danni, valuta, combat, minigioco, finale). Quelle sì sono
      riempitivo. Soglia: 0, o pochissime e giustificate.

   Il numero grezzo di corridoi resta stampato, ma come informazione, non come voto. */
{
  const idsTot = Object.keys(CAMPAIGN);
  const CAMBIA_SCENA = ['item', 'item2', 'sets', 'heal', 'damage', 'gold', 'goldLoss',
    'fullHeal', 'recharge', 'attenzione', 'unlockHero', 'freeAll', 'reviveAll',
    'killRoller', 'poisonRoller', 'captureRoller'];
  const CAMBIA_SCELTA = ['item', 'item2', 'sets', 'check', 'heal', 'damage', 'gold',
    'goldLoss', 'removeItem', 'removeItem2', 'sacrifice', 'requiresGold'];
  let scelteTot = 0, nodi = 0, scelteNodi = 0, corridoi = 0;
  const sterili = [];
  for (const [id, s] of Object.entries(CAMPAIGN)) {
    const ch = s.choices || [];
    scelteTot += ch.length;
    if (ch.length >= 2) { nodi++; scelteNodi += ch.length; continue; }
    if (ch.length !== 1) continue;
    corridoi++;
    const cambiaScena = CAMBIA_SCENA.some(k => s[k] !== undefined && s[k] !== false && s[k] !== 0);
    const c = ch[0] || {};
    const cambiaScelta = CAMBIA_SCELTA.some(k => c[k] !== undefined && c[k] !== false && c[k] !== 0);
    if (!cambiaScena && !cambiaScelta && !s.combat && !s.minigame && !s.ending) sterili.push(id);
  }
  const perNodo = nodi ? scelteNodi / nodi : 0;
  console.log(`  ℹ ${idsTot.length} scene · ${nodi} nodi di decisione (${Math.round(nodi / idsTot.length * 100)}%) · ${corridoi} scene-battuta con una sola uscita`);
  console.log(`  ℹ scelte per scena: ${(scelteTot / idsTot.length).toFixed(2)} (numero diluito dalle battute) · scelte per NODO: ${perNodo.toFixed(2)}`);
  if (perNodo < 2.2) fail(`solo ${perNodo.toFixed(2)} scelte per nodo di decisione: quando il gioco offre una scelta, deve offrirne almeno 2,2 in media`);
  else ok();
  if (sterili.length) {
    for (const id of sterili) warn(`corridoio STERILE "${id}": una sola uscita e nessun effetto — o gli si dà un effetto, o gli si dà una seconda azione vera, o si fonde con la scena accanto`);
    if (sterili.length > Math.max(3, Math.round(idsTot.length * 0.02))) {
      fail(`${sterili.length} corridoi sterili su ${idsTot.length} scene: è riempitivo, non ritmo`);
    }
  } else { ok(); console.log('  ✔ nessun corridoio sterile: ogni scena con una sola uscita cambia comunque qualcosa'); }
}

/* ---------- 44. testo dentro un canvas ----------
   Un canvas da 960 px mostrato a 355 rende ogni parola scritta dentro un impasto: il
   testo va in DOM, nel canvas restano numeri, icone e barre. Il controllo cerca ogni
   ctx.font sotto i 20px e guarda cosa ci si disegna: una stringa fissa (un'emoji, un
   simbolo) va bene, una stringa CALCOLATA — un nome, un'etichetta — è un errore. */
function testTestoNelCanvas() {
  console.log('\n▸ Testo dentro i canvas');
  /* Solo i canvas a misura FISSA: quelli di index.html (combattimento 960×380, pianta
     720×480) vengono mostrati a un terzo della loro larghezza e tutto dentro rimpicciolisce.
     js/minigames.js è escluso di proposito: là il canvas si dimensiona sulla finestra
     (`Math.min(720, document.body.clientWidth - 60)`), quindi è 1:1 e 12px resta 12px. */
  const files = ['js/combat.js', 'js/engine.js'];
  let sospetti = 0;
  for (const f of files) {
    let src;
    try { src = readFileSync(new URL('../' + f, import.meta.url), 'utf8'); } catch { continue; }
    const righe = src.split('\n');
    righe.forEach((r, i) => {
      const m = r.match(/ctx\.font\s*=\s*["'`](\d+)px/);
      if (!m || Number(m[1]) >= 20) return;
      const seguito = righe.slice(i, i + 3).join(' ');
      const dis = seguito.match(/ctx\.fillText\(\s*([^,]+),/);
      if (!dis) return;
      const arg = dis[1].trim();
      const parola = /\.(name|label|short|titolo|nome|testo|caption)\b/.test(arg);
      if (parola) {
        fail(`${f}:${i + 1} disegna un NOME a ${m[1]}px dentro un canvas a misura fissa (${arg.slice(0, 40)}): `
           + 'il canvas si rimpicciolisce sul telefono e la parola diventa illeggibile — va in DOM');
        sospetti++;
      }
    });
  }
  if (!sospetti) { ok(); console.log('  ✔ nel canvas solo numeri, icone e simboli: le parole stanno in DOM'); }
}
testTestoNelCanvas();

/* ---------- 45. il retro degli oggetti ----------
   Il bottone «Ispeziona» compare solo se l'oggetto ha un `lore`. Prima di agosto 2026 il
   bottone c'era in quattro giochi su cinque e quasi nessun oggetto aveva qualcosa da
   leggere: una funzione costruita e vuota, cioè la stessa bugia di una valuta che non
   compra niente. Il controllo tiene insieme le due metà — la funzione e il contenuto —
   e rifiuta i retro-stub da una riga. NON pretende un lore su ogni oggetto: un pezzo di
   nastro isolante che serve solo a costruire altro non ha un secondo strato, e inventarlo
   sarebbe riempitivo. */
function testRetroOggetti() {
  console.log('\n▸ Il retro degli oggetti');
  const chiavi = Object.keys(ITEMS);
  const conLore = chiavi.filter(k => ITEMS[k].lore);
  let motore = '';
  try { motore = readFileSync(new URL('../js/engine.js', import.meta.url), 'utf8'); } catch {}
  const haFunzione = /function inspectItem/.test(motore);
  const haBottone = /Engine\.inspectItem\(/.test(motore);

  if (conLore.length && !(haFunzione && haBottone)) {
    fail(`${conLore.length} oggetti hanno un retro ma l'interfaccia non lo mostra `
       + `(inspectItem: ${haFunzione ? 'sì' : 'NO'}, bottone nello zaino: ${haBottone ? 'sì' : 'NO'})`);
  } else if (haBottone) {
    const quota = conLore.length / chiavi.length;
    if (conLore.length < 8 || quota < 0.20) {
      fail(`il bottone Ispeziona esiste ma solo ${conLore.length} oggetti su ${chiavi.length} `
         + `(${Math.round(quota * 100)}%) hanno qualcosa da leggere: una funzione quasi vuota `
         + 'promette e non mantiene');
    } else {
      ok(); console.log(`  ✔ ${conLore.length}/${chiavi.length} oggetti (${Math.round(quota * 100)}%) hanno un retro leggibile`);
    }
  } else { ok(); console.log('  ✔ nessun retro e nessun bottone: coerente'); }

  const corti = conLore.filter(k => ITEMS[k].lore.trim().split(/\s+/).length < 35);
  if (corti.length) fail(`retro troppo corti (sotto le 35 parole), sono stub: ${corti.join(', ')}`);
  else if (conLore.length) { ok(); console.log('  ✔ nessun retro da una riga'); }

  const vietate = conLore.filter(k => /inquietant|misterios|agghiacciant|raccapricciant|indicibil/i.test(ITEMS[k].lore));
  if (vietate.length) fail(`parole vietate nel retro di: ${vietate.join(', ')} (l'orrore sta nel dettaglio, non nell'aggettivo)`);
  else if (conLore.length) { ok(); console.log('  ✔ nessun aggettivo che fa il lavoro al posto del dettaglio'); }
}
testRetroOggetti();

/* ---------- 46. scelte chiuse dietro un flag che nessuno imposta ----------
   Trovato così (agosto 2026) un'intera scena di Corona — k_torvald, «da cuoco a cuoco»
   con Monsieur Ragoût — chiusa dietro `torvald_presente`, un flag che nessuna scena e
   nessun modulo impostava mai: scritta, testata, e invisibile a chiunque abbia giocato.
   Il controllo guarda anche fuori da campaign.js, perché i premi dei misteri e delle
   ricette sono flag impostati dai loro moduli. */
function testFlagRichiestiMaiImpostati() {
  console.log('\n▸ Scelte chiuse dietro flag inesistenti');
  const impostati = new Set();
  for (const s of Object.values(CAMPAIGN)) {
    for (const f of Object.keys(s.sets || {})) impostati.add(f);
    for (const c of (s.choices || [])) {
      for (const f of Object.keys(c.sets || {})) impostati.add(f);
      for (const f of Object.keys(c.sacrificeSets || {})) impostati.add(f);
    }
  }
  if (typeof RECIPES !== 'undefined') for (const r of RECIPES) if (r.flag) impostati.add(r.flag);
  if (typeof MISTERI !== 'undefined') for (const m of MISTERI) if (m.premio && m.premio.flag) impostati.add(m.premio.flag);
  for (const f of ['js/misteri.js', 'js/crafting.js', 'js/engine.js', 'js/combat.js', 'js/minigames.js']) {
    let src = '';
    try { src = readFileSync(new URL('../' + f, import.meta.url), 'utf8'); } catch { continue; }
    for (const m of src.matchAll(/G\.flags\[['"]([a-z0-9_]+)['"]\]\s*=/gi)) impostati.add(m[1]);
  }
  const morti = new Map(), inutili = new Map();
  for (const [id, s] of Object.entries(CAMPAIGN)) for (const c of (s.choices || [])) {
    const r = c.requires; if (!r) continue;
    for (const f of [r.flag, r.flag2, ...(r.flagAny || [])]) {
      if (!f || impostati.has(f)) continue;
      if (!morti.has(f)) morti.set(f, []);
      morti.get(f).push(id);
    }
    if (r.notFlag && !impostati.has(r.notFlag)) {
      if (!inutili.has(r.notFlag)) inutili.set(r.notFlag, []);
      inutili.get(r.notFlag).push(id);
    }
  }
  if (morti.size) {
    for (const [f, scene] of morti) {
      fail(`flag "${f}" richiesto da una scelta ma MAI impostato da nessuna scena né da nessun modulo: `
         + `contenuto irraggiungibile in ${scene.join(', ')}`);
    }
  } else { ok(); console.log('  ✔ ogni scelta condizionata può davvero comparire'); }
  for (const [f, scene] of inutili) {
    warn(`notFlag "${f}" non è mai impostato da nessuno: la condizione è sempre vera `
       + `(intenzione morta in ${scene.join(', ')})`);
  }
}
testFlagRichiestiMaiImpostati();

/* ---------- il link a Pages nel README ----------
   Regola del committente, 23 agosto 2026: «nei README delle varie repo ci deve
   sempre essere il link a Pages, perché da mobile altrimenti non lo riesco a
   trovare facilmente». Da telefono la scheda di una repo mostra il README e non
   il pannello di destra: se il link non sta nelle prime righe, il gioco non si
   raggiunge. Pandataria era il caso peggiore — linkava gli altri quattro giochi
   e non sé stessa. Deve stare in alto, non solo esistere. */
function testLinkPagesNelReadme() {
  const REPO = 'pandataria';
  let righe;
  try { righe = readFileSync(join(root, 'README.md'), 'utf8').split('\n'); }
  catch { fail('manca il README'); return; }
  const atteso = `https://galiv04.github.io/${REPO}/`;
  const dove = righe.findIndex(r => r.includes(atteso));
  if (dove < 0) fail(`il README non contiene il link a Pages (${atteso})`);
  else if (dove > 5) fail(`il link a Pages sta alla riga ${dove + 1} del README: da mobile `
      + 'non si trova. Va nelle prime righe, subito sotto il titolo.');
  else { ok(); console.log(`  ✔ link a Pages nel README, riga ${dove + 1}`); }
}
testLinkPagesNelReadme();

/* ---------- il generato deve venire dai draft ----------
   Regola della pipeline: js/campaign.js si RIGENERA, non si edita. Il 23 agosto
   2026 questa regola era stata violata in silenzio — tre schede di oggetti
   scritte a mano nel generato — e il primo assemble successivo le ha cancellate.
   Un errore che non lascia traccia se nessuno guarda. Ora lo guarda questo. */
function testGeneratoDaiDraft() {
  const r = spawnSync(process.execPath, [join(root, 'tests/assemble.mjs'), '--check'],
    { encoding: 'utf8', cwd: root });
  if (r.status === 0) { ok(); console.log('  ✔ js/campaign.js corrisponde ai draft'); }
  else fail('js/campaign.js non corrisponde ai draft (modificato a mano, o assemble non lanciato): '
      + (r.stderr || r.stdout || '').trim().split('\n').slice(0, 2).join(' · '));
}
testGeneratoDaiDraft();

/* ---------- le schede dei luoghi (il pulsante 🔎) ----------
   Richiesta del committente: ogni scena grafica ha un pulsante che spiega cosa si
   sta guardando. Una scheda mancante spegne il pulsante in silenzio — cioè la
   feature esiste per alcune scene e non per altre, e il giocatore non capisce
   perché. Quindi: ogni painter (tranne `titolo`, che è la copertina) ha la sua
   scheda, con tutte le sezioni piene e almeno tre elementi da guardare. */
function testSchedeDeiLuoghi() {
  let luoghiSrc;
  try { luoghiSrc = readFileSync(join(root, 'js/luoghi.js'), 'utf8'); }
  catch { fail('manca js/luoghi.js: il pulsante che spiega la scena non ha dati'); return; }
  const ctx = {};
  vm.createContext(ctx);
  try { vm.runInContext(luoghiSrc + ';globalThis.__L = Luoghi;', ctx); }
  catch (e) { fail('js/luoghi.js non si carica: ' + e.message); return; }
  const schede = ctx.__L.LUOGHI;
  /* Le chiavi VERE dei painter, prese dal modulo caricato — non con una regex sul
     sorgente. La regex che usavo pretendeva un nome tutto minuscolo, e nove painter
     della serie si chiamano in camelCase (salaDaPranzo, torreInterno, …): il controllo
     non pretendeva la loro scheda, e in quelle scene il pulsante 🔎 restava spento in
     silenzio. Cioè esattamente il difetto che questo controllo esiste per impedire. */
  const cS = {};
  vm.createContext(cS);
  let srcS = '';
  for (const f of ['js/sprites.js', 'js/scenes.js']) {
    try { srcS += readFileSync(join(root, f), 'utf8') + '\n;\n'; } catch { /* niente */ }
  }
  vm.runInContext(srcS + ';globalThis.__S = Scenes;', cS);
  const painters = Object.keys(cS.__S.painters);
  /* Un fondale che nessuna scena usa non ha bisogno di scheda: il pulsante non
     comparirà mai. Ma è contenuto morto — un painter scritto e mai messo in scena —
     e va detto, non nascosto. In un gioco della serie ce n'era uno. */
  const usati = new Set(Object.values(CAMPAIGN).map(s => s.location).filter(Boolean));
  const morti = painters.filter(p => p !== 'titolo' && !usati.has(p));
  if (morti.length) warn(`fondali dipinti che nessuna scena usa (contenuto morto): ${morti.join(', ')}`);
  const senza = painters.filter(p => p !== 'titolo' && usati.has(p) && !schede[p]);
  if (senza.length) fail(`fondali senza scheda del luogo (pulsante spento): ${senza.join(', ')}`);
  else { ok(); console.log(`  ✔ scheda del luogo per tutti i ${painters.length - 1 - morti.length} fondali usati`); }
  const orfane = Object.keys(schede).filter(k => !painters.includes(k));
  if (orfane.length) warn(`schede di luoghi che non hanno un fondale: ${orfane.join(', ')}`);
  const magre = [];
  for (const [k, L] of Object.entries(schede)) {
    if (!L.titolo || !L.ora || !L.storia || !L.gioco) magre.push(`${k} (sezione vuota)`);
    else if (!Array.isArray(L.guarda) || L.guarda.length < 3) magre.push(`${k} (meno di 3 cose da guardare)`);
    else if (L.storia.length < 120 || L.gioco.length < 80) magre.push(`${k} (storia o gioco troppo corti)`);
  }
  if (magre.length) fail(`schede che promettono e non mantengono: ${magre.join(', ')}`);
  else { ok(); console.log('  ✔ ogni scheda ha le tre sezioni piene'); }
}
testSchedeDeiLuoghi();

/* ---------- buchi nei fondali ----------
   Nessuno sfondo deve lasciare zone che il riquadro mostra NERE, né perché non le
   dipinge nessuno né perché ci passano solo colori semitrasparenti che non arrivano a
   coprire. Sono due difetti diversi e sullo schermo si vedono uguale.
   Trovati così: una fessura di 52×160 fra due case a Ventotene (rimasta mesi, perché
   una fessura nera fra due case sembra un vicolo), una striscia di 292×9 fra il mare e
   la fiancata di una barca, e una fascia di 495×105 in mezzo all'ULTIMA immagine di un
   altro gioco. L'occhio le aveva lasciate passare tutte e tre. */
function testBuchiNeiFondali() {
  const c = {};
  vm.createContext(c);
  let src = '';
  for (const f of ['js/sprites.js', 'js/scenes.js']) {
    try { src += readFileSync(join(root, f), 'utf8') + '\n;\n'; } catch { /* non tutti i giochi hanno sprites */ }
  }
  try { vm.runInContext(src + ';globalThis.__S = Scenes;', c); }
  catch (e) { fail('non riesco a caricare js/scenes.js per cercare i buchi: ' + e.message); return; }
  const S = c.__S;
  const esito = cercaBuchi(S.painters, { setDepth: S.setDepth || S.setEclipse });
  if (!esito.length) {
    ok(); console.log(`  ✔ nessuna macchia scoperta in ${Object.keys(S.painters).length - 1} fondali`);
    return;
  }
  for (const e of esito) {
    if (e.errore) { fail(`il fondale "${e.nome}" esplode: ${e.errore}`); continue; }
    const dove = e.buchi.map(b => `${b.w}×${b.h} a (${b.x},${b.y})`
      + (b.maiDipinto ? ' mai dipinto' : ` coperto solo al ${(b.copertura * 100) | 0}%`)).join(', ');
    fail(`il fondale "${e.nome}" mostra il nero del riquadro: ${dove}`);
  }
}
testBuchiNeiFondali();

/* ---------- esito ---------- */
console.log('\n' + '═'.repeat(50));
if (failures === 0) {
  console.log(`✅ TUTTI I TEST SUPERATI (${passed} controlli, ${warnings} avvisi non bloccanti)`);
  process.exit(0);
} else {
  console.log(`❌ ${failures} TEST FALLITI (${warnings} avvisi)`);
  process.exit(1);
}
