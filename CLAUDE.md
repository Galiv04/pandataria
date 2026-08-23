# PANDATARIA — istruzioni di lavoro

Avventura horror giocabile in italiano, su GitHub Pages. **HTML/CSS/JS puro, zero dipendenze, zero
build.** Quinto gioco della serie (dopo Corona di Mezzanotte, Relais di Lord Gregorio, La Casa che
non Finisce, L'Effetto Zoom). I documenti di serie stanno in `../dnd-motore/docs/`.

**Prima di toccare qualsiasi cosa, leggi:**
1. `docs/DESIGN.md` — l'unica fonte di verità su tono, minaccia, personaggi, meccaniche, finali.
2. `../dnd-motore/docs/LESSONS-LEARNED.md` — venti lezioni pagate a caro prezzo. Le più costose:
   nessuna scelta vuota, mai mascherare gli exit code con le pipe, una chiave di dati non
   implementata è una bugia, una risorsa senza effetti visibili non esiste.
3. `../dnd-motore/docs/MINIGIOCHI.md` — l'API dei minigiochi riusabili.

## Il gioco in tre righe

Gaetano e Claudia in vacanza a **Ventotene dal 27 al 30 agosto 2026**, B&B **Le Parracine**. Sotto
l'isola, nelle cisterne romane murate e in una fossa a quarantacinque metri, c'è **IL CORO**: le voci
di tutti quelli che duemila anni di storia hanno portato su quest'isola senza farli più uscire —
relegati imperiali, detenuti del panopticon di Santo Stefano, i bambini di una nave del 1943. Il Coro
non li vuole morti: li vuole **presenti**, perché sono i primi arrivati per scelta propria.

## Pipeline: le scene si scrivono NEI DRAFT

```bash
node tests/assemble.mjs      # drafts/*.js → js/campaign.js
node tests/validate.mjs      # grafo, dati, sprite, ricette, misteri, minigiochi, economia
node tests/playthrough.mjs   # partite simulate headless
```

**Non si edita `js/campaign.js` a mano**: viene rigenerato e le modifiche si perdono. I file sorgente
sono `drafts/campaign-header.js`, `drafts/scene-A..E.js`, `drafts/campaign-footer.js`.

**Test verdi prima di ogni push.** Eseguili **senza pipe**: `node tests/validate.mjs | tail` ritorna
l'exit code di `tail` e un push è già partito rosso per questo.

## Le meccaniche che rendono questo gioco diverso dai precedenti

- **CRAFTING** (`js/crafting.js`, `RECIPES` nell'header): sedici ricette. Gli oggetti prodotti non
  vengono **mai** regalati da una scena — il validatore lo verifica.
- **MISTERI** (`js/misteri.js`, `MISTERI` nell'header): tre misteri da quattro indizi. Al 4/4 il
  premio è un **effetto meccanico reale** in combattimento, non una pacca sulla spalla.
- **APNEA** (`js/minigames.js`): si scende tenendo premuto. È qui che vive la risorsa del gioco.
- **ATTENZIONE del Coro** (0-6): sale ascoltando e scendendo. A 5+ i nemici finali prendono +2 ai
  colpi e +6 PV; a 0 partono con svantaggio. Ascoltare troppo si paga davanti a tutti.

## 🫁 FIATO — leggi `docs/DESIGN.md` §6 prima di toccarlo

Non è una valuta e **non compra niente: non c'è negozio**. È l'aria delle immersioni:
`Engine.apneaFiato()` la calcola, `Engine.metriPossibili()` dice a quanti metri arrivi. Con poco
fiato certi oggetti sono **fisicamente fuori portata**, e il briefing dell'apnea lo dice al giocatore
prima di farlo scendere. Si guadagna **solo** con le cose umane: mangiare vero, dormire alle
Parracine, il caffè di Ada, ridere, stare fermi un momento con l'altro.

Rapporto da rispettare: **dare/spendere sotto 6:1**, altrimenti il tetto si satura entro il primo
atto e il numero smette di significare qualcosa (è l'errore dei quattro giochi precedenti).

## Se cadono tutti: si riparte dal checkpoint

`Engine.riprendiDaCheckpoint()`. Prima consuma l'**Àncora di Voce** se c'è (e lo scontro riprende a
metà PV); altrimenti torna all'ultimo checkpoint con lo **snapshot di allora**, dicendo al giocatore
**per nome** cosa ha perso. Game over vero solo se non esiste nessun checkpoint.
`CHECKPOINT_FLAGS = ['giorno_27_chiuso','giorno_28_chiuso','giorno_29_chiuso','ciro_in_squadra']`.

## Regole di scrittura (non negoziabili)

- **Nessuna scelta vuota.** Se una scelta promette qualcosa, la scena di destinazione mantiene la
  promessa con testo nuovo e specifico. Vale anche per i gesti affettivi ("abbraccia X" non può
  limitarsi a proseguire). Ogni scelta ha almeno un effetto: `next` a contenuto nuovo, `item`,
  `sets`, `check`, `combat`, `minigame`, `heal/damage`, `gold/goldLoss`.
- **Densità**: scelte/scena ≥ 1.95, corridoi ≤ 15%. Testo di scena 6-14 righe: se serve più spazio,
  si spezza in due scene con una scelta in mezzo.
- **Concretezza fisica**: gli oggetti hanno una marca, i luoghi un'ora, le persone un gesto. Mai le
  parole "inquietante", "sinistro", "misterioso": l'orrore sta nel dettaglio sbagliato dentro una
  scena normale.
- **Ogni scena che cambia qualcosa** (fiato, PV, oggetti, flag, attenzione) chiude con **la riga
  meccanica in grassetto tra parentesi** che lo dice al giocatore. Le scene di puro respiro
  narrativo, che non cambiano niente, possono chiudersi sulla battuta: è meglio una chiusa pulita
  di una riga meccanica vuota. Il controllo è: *se qualcosa è cambiato e il giocatore non lo sa,
  è un bug.*
- `sets` su una **scelta** scatta anche se il `check` **fallisce**: i flag di esito vanno sulla scena
  di successo.
- Mai `once: true` sull'unica uscita di una scena: soft-lock.

## Limiti etici (persone reali)

Gaetano e Claudia sono persone vere. L'orrore li distrugge ma **il ritratto resta affettuoso ed
eroico**: mai umiliazione, degradazione o sessualizzazione, mai sesso esplicito. La **paura di
Claudia** per l'acqua e la profondità è la sua **forza narrativa** — è lei che sente le cose prima —
mai una debolezza da compatire e mai materiale da battuta. I ventotenesi vivi **non sono i cattivi**:
Ada delle Parracine e Ciro il pescatore sono alleati, sempre, senza doppi fondi. Il linguaggio crudo
è voluto (sono adulti), l'oscenità è chirurgica: una parola sola, al punto giusto, mai gratuita.

## 🔎 Guardare le grafiche: strumenti, non pazienza

Prima di toccare un painter e prima di dire che una scena è a posto:

```bash
node ../dnd-motore/tools/fondali-in-png.mjs                 # tutti in /tmp/fondali
node ../dnd-motore/tools/fondali-in-png.mjs --solo nome     # uno, subito
node ../dnd-motore/tools/fondali-in-png.mjs --provino       # tutti su una lastra
node ../dnd-motore/tools/fondali-in-png.mjs --sfondo '#ff00ff'   # i buchi si vedono
node ../dnd-motore/tools/fondali-in-png.mjs --pulisci       # e si buttano
```

`tools/provino.html` fa la stessa cosa nel browser (anche da telefono, via Pages) con
fondo magenta, scala e velo di profondità.

**Le tre regole che valgono più di ogni ritocco** (lezioni 58-62):
1. **Un fondale ha UN soggetto**, grande almeno un terzo dell'inquadratura, più due o
   tre elementi di contesto sopra i cento pixel. Sotto i sessanta pixel un oggetto non
   dice cosa è, dice solo che c'è.
2. **Le proporzioni delle cose vere si cercano, non si stimano** — e un oggetto che dopo
   due tentativi non si riconosce si TOGLIE, non si ritocca una terza volta.
3. **Il quadro deve mostrare quello che il testo dice.** Si rilegge la scena, si segnano
   le cose che nomina, e si verifica che ci siano tutte.

## Ambiente

- **Su questa macchina localhost va in timeout**: si testa headless (Node) o su Pages. La verifica
  visiva si fa renderizzando su file e guardando le immagini, non aprendo un server.
- Push con `git config http.curloptResolve` (DNS di github.com bloccato).
- Pages ha ~10 minuti di cache + serve un hard refresh.
- **La validazione visiva è obbligatoria**: screenshot o render di **ogni** schermata e sfondo. I
  test verdi non garantiscono la grafica.
