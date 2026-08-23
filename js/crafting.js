/* ============ CRAFTING — combinare due oggetti (modulo riusabile della serie) ============
   Le ricette vivono in campaign.js (const RECIPES). Formato:
     { in: ['a','b'], out: 'c', consuma: true | ['a'], titolo: '...', text: `...`, flag: 'x' }
   - `consuma: true` → consuma entrambi gli ingredienti; array → consuma solo quelli elencati
   - `flag` → impostato alla prima riuscita (per il Quaderno / le imprese)
   Le combinazioni sbagliate NON puniscono: rispondono con una battuta in voce.
   Vedi ../dnd-motore/docs/MINIGIOCHI.md e docs/DESIGN.md § 5.1                            */

const Crafting = (() => {

  const $ = id => document.getElementById(id);
  let picked = [];

  function key(a, b) { return [a, b].sort().join('+'); }

  function findRecipe(a, b) {
    if (typeof RECIPES === 'undefined') return null;
    return RECIPES.find(r => key(r.in[0], r.in[1]) === key(a, b)) || null;
  }

  /* Le ricette a tre ingredienti si esprimono come catena: (a+b)=x, poi x+c.
     Questo helper dice se un oggetto è ingrediente di QUALCHE ricetta — serve solo
     per ordinare la lista, non per suggerire le soluzioni. */
  function isIngredient(it) {
    if (typeof RECIPES === 'undefined') return false;
    return RECIPES.some(r => r.in.includes(it));
  }

  function open() {
    picked = [];
    render();
  }

  function render(msg = '') {
    const box = $('modal-generic-content');
    const counts = {};
    for (const it of G.inventory) counts[it] = (counts[it] || 0) + 1;
    const keys = Object.keys(counts).sort((a, b) => (isIngredient(b) ? 1 : 0) - (isIngredient(a) ? 1 : 0));

    if (!keys.length) {
      box.innerHTML = `<h2>🔧 Combinare</h2>
        <p style="margin-bottom:12px">Lo zaino è vuoto. Non si combina il niente col niente — l'ha già provato l'universo, e ne è uscito questo.</p>
        <button class="btn" onclick="Engine.showInventory()">↩ Allo zaino</button>`;
      $('modal-generic').classList.remove('hidden');
      return;
    }

    const rows = keys.map(it => {
      const sel = picked.includes(it);
      const n = counts[it];
      const disabled = !sel && picked.length >= 2;
      return `<button class="choice-btn${sel ? ' selected' : ''}" ${disabled ? 'disabled' : ''}
        onclick="Crafting.pick('${it}')">${sel ? '✅ ' : ''}${ITEMS[it].name}${n > 1 ? ' ×' + n : ''}</button>`;
    }).join('');

    const canGo = picked.length === 2;
    box.innerHTML = `<h2>🔧 Combinare</h2>
      <p style="color:var(--text-dim);margin-bottom:10px">Scegliete <b>due cose</b> e provate a metterle insieme. Nessuno vi ha dato istruzioni: è tutta gente che si arrangia, qui.</p>
      ${msg ? `<div class="ability-box" style="border-left:5px solid var(--gold)"><div class="ability-desc">${msg}</div></div>` : ''}
      <div style="margin:10px 0">${rows}</div>
      <button class="btn ${canGo ? 'btn-gold' : ''}" ${canGo ? '' : 'disabled'} onclick="Crafting.combine()">🔧 Prova a combinare</button>
      <button class="btn" style="margin-top:8px" onclick="Engine.showInventory()">↩ Allo zaino</button>`;
    $('modal-generic').classList.remove('hidden');
  }

  function pick(it) {
    const i = picked.indexOf(it);
    if (i >= 0) picked.splice(i, 1);
    else if (picked.length < 2) picked.push(it);
    render();
  }

  /* battute per i tentativi a vuoto: il gioco non punisce la curiosità, la premia con voce */
  const NO = [
    `> Gaetano: *(rigirando le due cose in mano)* "No. Cioè: fisicamente no. Non c'è un modo in cui queste due si tengono insieme senza colla, preghiere o un ingegnere migliore di me."`,
    `> Claudia: "Tesoro. Guardami. Stai cercando di attaccare due oggetti che non c'entrano niente perché ti fa sentire in controllo." *(pausa)* "Lo capisco. Ma no."`,
    `> Gaetano: "Ok, tentativo fallito, nota mentale." *(rimette a posto)* "Per la cronaca: se funzionasse tutto quello che provo, avremmo già un sottomarino."`,
    `> Claudia: *(ridendo di quella risata brutta che le viene quando ha paura)* "Amore, siamo su un'isola con una cosa che canta sotto il mare e tu stai giocando a MacGyver. Ti amo, ma no."`,
    `Niente. Le due cose restano due cose. Fuori, il mare fa il rumore che fa sempre — e per una volta è solo il rumore che fa sempre.`,
  ];

  function combine() {
    if (picked.length !== 2) return;
    const [a, b] = picked;
    const r = findRecipe(a, b);
    if (!r) {
      const line = NO[Math.floor(Math.random() * NO.length)];
      if (typeof Sound !== 'undefined') Sound.play('click');
      picked = [];
      render(line);
      return;
    }
    // consumo ingredienti
    const toEat = r.consuma === true ? r.in : (Array.isArray(r.consuma) ? r.consuma : []);
    for (const it of toEat) {
      const i = G.inventory.indexOf(it);
      if (i >= 0) G.inventory.splice(i, 1);
    }
    G.inventory.push(r.out);
    if (r.flag) G.flags[r.flag] = true;
    if (!G.flags.ha_combinato) G.flags.ha_combinato = true;
    if (!G.recipesDone) G.recipesDone = [];
    if (!G.recipesDone.includes(r.out)) G.recipesDone.push(r.out);
    if (typeof Sound !== 'undefined') Sound.play('item');
    Engine.saveGame();

    const box = $('modal-generic-content');
    box.innerHTML = `<h2>🔧 ${r.titolo || ITEMS[r.out].name}</h2>
      <div class="backstory" style="white-space:pre-wrap">${r.text}</div>
      <div class="ability-box" style="border-left:5px solid var(--green)">
        <span class="ability-name">✅ Ottenuto: ${ITEMS[r.out].name}</span>
        <div class="ability-desc">${ITEMS[r.out].desc}</div></div>
      <button class="btn btn-gold" style="margin-top:12px" onclick="Crafting.open()">🔧 Combinare altro</button>
      <button class="btn" style="margin-top:8px" onclick="Engine.showInventory()">↩ Allo zaino</button>`;
    picked = [];
    $('modal-generic').classList.remove('hidden');
  }

  /* quante ricette scoperte su quante esistono — per il Quaderno e i finali */
  function progress() {
    const tot = (typeof RECIPES !== 'undefined') ? RECIPES.length : 0;
    const fatte = (G && G.recipesDone) ? G.recipesDone.length : 0;
    return { fatte, tot };
  }

  function has(out) { return !!(G && G.recipesDone && G.recipesDone.includes(out)); }

  return { open, pick, combine, progress, has };
})();
