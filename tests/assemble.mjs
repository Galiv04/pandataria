/* Assembla js/campaign.js dai draft di PANDATARIA:
   header (ITEMS + RECIPES + MISTERI + CHECKPOINT_FLAGS) + 5 blocchi di scene + CAMPAIGN + footer.
   I fix alle scene si fanno NEI DRAFT, mai in js/campaign.js.
   Uso: node tests/assemble.mjs */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = f => readFileSync(join(root, f), 'utf8');

const parts = [
  read('drafts/campaign-header.js'),   // ITEMS, RECIPES, MISTERI, CHECKPOINT_FLAGS
  read('drafts/scene-A.js'),           // 27 agosto — l'arrivo
  read('drafts/scene-B.js'),           // 28 agosto — le cisterne
  read('drafts/scene-C.js'),           // 29 agosto — Santo Stefano
  read('drafts/scene-D.js'),           // 30 agosto — il giorno che non finisce
  read('drafts/scene-E.js'),           // epiloghi
  `\n/* ============ LA CAMPAGNA COMPLETA ============ */\nconst CAMPAIGN = Object.assign({}, SCENE_A, SCENE_B, SCENE_C, SCENE_D, SCENE_E);\nconst CAMPAIGN_START = 'a0';\n`,
  read('drafts/campaign-footer.js'),   // CHAPTERS, DIARY_FLAGS, WORLD_MAP
];

/* GUARDIA ANTI-DISASTRO (ago 2026). In questo repo i draft si erano scollati dal
   gioco: js/campaign.js aveva 248 scene, i draft 184. Lanciare l'assemble avrebbe
   cancellato 64 scene in silenzio. Da ora si rifiuta di scrivere se il risultato
   perde scene rispetto al file che sta per sovrascrivere. */
/* Conta le SCENE, e solo quelle. La prima stesura contava ogni chiave di primo livello
   `  nome: {`, che pesca anche gli oggetti di ITEMS e le ricette: in un gioco stampava
   «145 scene» dove CAMPAIGN ne ha 133, cioe 133 scene piu 12 oggetti. Come guardia
   funzionava comunque (confronta un numero con lo stesso numero di prima), ma il numero
   che stampava era falso — e un numero falso in un messaggio di collaudo e peggio di
   nessun numero, perche lo si cita. Qui si conta solo da dove cominciano i blocchi delle
   scene, cioe dopo la testa del file. */
function contaScene(testo) {
  const inizio = testo.search(/^const SCENE_[A-Z]/m);
  const corpo = inizio >= 0 ? testo.slice(inizio) : testo;
  return (corpo.match(/^  [a-z0-9_]+: \{$/gm) || []).length;
}
const nuovo = parts.join('\n');
const dest = join(root, 'js/campaign.js');
let vecchio = '';
try { vecchio = readFileSync(dest, 'utf8'); } catch (e) {}
const nNuovo = contaScene(nuovo), nVecchio = contaScene(vecchio);
if (vecchio && nNuovo < nVecchio) {
  console.error(`\n❌ RIFIUTO DI SCRIVERE: i draft producono ${nNuovo} scene, il file attuale ne ha ${nVecchio}.`);
  console.error(`   Perderesti ${nVecchio - nNuovo} scene. I draft sono scollati dal gioco: vanno`);
  console.error(`   rigenerati dal file vero prima di poter riusare la pipeline.\n`);
  process.exit(1);
}
/* SECONDA GUARDIA (23 agosto 2026). La prima contava le SCENE, e non bastava.
   In questo repo i draft avevano tutte le scene al posto giusto, ma tre oggetti
   avevano perso il campo `lore`: le loro schede erano state scritte a mano nel
   file GENERATO invece che nei draft, contro la regola. Il conteggio delle scene
   tornava, l'assemble ha scritto senza fiatare, e da un momento all'altro sei
   schede su dodici sono diventate vuote — il validatore l'ha scoperto per caso.
   Quindi ora si guarda anche la ciccia: quanti campi di ogni tipo c'erano prima
   e quanti ce ne sono dopo, e quanti caratteri si perdono. */
const CAMPI = ['lore:', 'retro:', 'combat:', 'minigame:', 'requires:', 'sets:',
               'item:', 'check:', 'heal:', 'damage:', 'npc:', 'location:', 'caption:'];
function conta(testo, campo) {
  return (testo.split(campo).length - 1);
}
const perdite = [];
if (vecchio) {
  for (const c of CAMPI) {
    const p = conta(vecchio, c), n = conta(nuovo, c);
    if (n < p) perdite.push(`${c} ${p} → ${n} (-${p - n})`);
  }
  const caloPct = (vecchio.length - nuovo.length) / vecchio.length;
  if (caloPct > 0.005) perdite.push(`caratteri ${vecchio.length} → ${nuovo.length} (-${(caloPct * 100).toFixed(1)}%)`);
}
const soloControllo = process.argv.includes('--check');
if (perdite.length && !process.argv.includes('--force')) {
  console.error('\n❌ RIFIUTO DI SCRIVERE: assemblare dai draft perderebbe contenuto già pubblicato:');
  perdite.forEach(p => console.error('   · ' + p));
  console.error('   Vuol dire che js/campaign.js è stato modificato A MANO (non si fa: si perde)');
  console.error('   oppure che i draft sono vecchi. Riporta le modifiche nei draft, poi riassembla.');
  console.error('   Se sai quello che fai: --force.\n');
  process.exit(1);
}
if (soloControllo) {
  if (nuovo === vecchio) { console.log('✔ js/campaign.js è identico a quello che producono i draft'); process.exit(0); }
  console.error('\n❌ js/campaign.js NON corrisponde ai draft: qualcuno ha modificato il file generato,');
  console.error(`   oppure i draft sono cambiati e nessuno ha riassemblato (${vecchio.length} caratteri sul disco, ${nuovo.length} dai draft).`);
  console.error('   Rimedio: node tests/assemble.mjs\n');
  process.exit(1);
}
writeFileSync(dest, nuovo);
console.log(`✔ js/campaign.js assemblato: ${nuovo.length} caratteri, ${nNuovo} scene` +
  (vecchio && nNuovo > nVecchio ? ` (+${nNuovo - nVecchio} rispetto a prima)` : ''));
