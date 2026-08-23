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
function contaScene(testo) {
  return (testo.match(/^  [a-z0-9_]+: \{$/gm) || []).length;
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
writeFileSync(dest, nuovo);
console.log(`✔ js/campaign.js assemblato: ${nuovo.length} caratteri, ${nNuovo} scene` +
  (vecchio && nNuovo > nVecchio ? ` (+${nNuovo - nVecchio} rispetto a prima)` : ''));
