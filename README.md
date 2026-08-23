# 🌊 PANDATARIA

**Un horror interattivo in italiano per 1-3 giocatori.** Quattro giorni di vacanza a Ventotene, dal
27 al 30 agosto. Il traghetto da Formia, un B&B con i limoni in vaso, il pesce alla griglia, il mare
che a venti metri da riva è già blu da cartolina.

Quest'isola è di tufo, e nel tufo i romani hanno scavato **sei cisterne**. Oggi se ne visitano due.
Delle altre quattro, in paese, non parla nessuno volentieri.

Claudia ha paura dell'acqua profonda da quando ha sei anni, e nessuno le ha mai creduto che ci fosse
un motivo. Il ventisette agosto arriva alla boa a nuoto per la prima volta nella sua vita. La notte
dello stesso giorno, dentro mezzo secondo di registrazione fatta per caso, suo marito sente una voce
che **dice il suo nome**.

Il traghetto per tornare parte il trenta alle 17:30. Da qui a lì ci sono quattro giorni, sei cisterne
e quarantacinque metri d'acqua.

> **Nel browser, subito, senza installare niente.** Funziona da telefono e da computer, si gioca da
> soli o passandosi lo schermo. Il Narratore è automatico: tira i dadi, tiene il conto, e non bara.

---

## Cosa c'è dentro

- 🗺 **Quattro giorni e un giorno che non finisce.** Il 27 si arriva, il 28 si scende nelle cisterne,
  il 29 si va a Santo Stefano — il carcere borbonico a panopticon, novantanove celle intorno a una
  cappella, chiuso il 2 settembre 1965. Il 30 si prende il traghetto delle 17:30. E il 30 ricomincia.
- 🔧 **Il crafting.** Lo zaino ha un tasto per **combinare due cose**. Un microfono a clip più un
  preservativo più il nastro isolante fanno un idrofono, e con un idrofono si sente cosa c'è sotto.
  Sedici ricette, e ogni oggetto che ne esce ha un effetto che il gioco **nomina** quando scatta.
- 🕯 **Tre misteri, quattro indizi ciascuno.** Perché sei cisterne. Chi c'era nella cella 47. Chi è
  la bambina che canta. Risolverne uno non è una pacca sulla spalla: è un vantaggio meccanico che si
  sente in combattimento, e il Quaderno tiene il conto senza spoilerare quello che non hai trovato.
- 🫁 **L'apnea.** Si scende tenendo premuto e si risale lasciando. Il fiato scende sempre, e più giù
  sei più in fretta se ne va. A quarantacinque metri, tra Ventotene e Santo Stefano, c'è un porto
  romano sommerso e una fossa che nessuno ha mai misurato.
- 🎵 **L'attenzione del Coro (0-6).** Sale ogni volta che ti fermi ad ascoltare o scendi sotto i
  quindici metri. Nell'ultima immersione decide **quanti vengono a prenderti**: a zero partono con
  svantaggio, a cinque prendono +2 ai colpi e sei punti vita in più. Ascoltare troppo si paga davanti
  a tutti.
- 🎲 **Sei finali**, e non sono "buono / medio / cattivo": uno di loro è che l'isola ti piace.

## Le regole, in breve

Un d20 e sei statistiche, come si è sempre fatto. I punti vita si chiamano **TENUTA**. Chi respira
acqua si prende **ACQUA NEI POLMONI** (−2 a tutto, scritto nella scheda con il rimedio accanto).

Il **FIATO** 🫁 non è denaro e non c'è nessun negozio: è l'aria delle immersioni. Prima di ogni
discesa il gioco ti dice in chiaro «con il fiato che avete adesso arrivate a circa ventidue metri, e
quella cosa sta a trentaquattro: non ce la fate». Si guadagna **solo** con le cose umane — mangiare
come si deve, dormire alle Paracine, il caffè di Ada, ridere, stare un momento fermi con l'altro.
Mai combattendo per combattere.

E se cadete tutti **non è game over**: si riparte dall'ultimo checkpoint, con lo stato di allora.
Quello che avevate capito dopo l'avete perso, e il gioco vi dice per nome cosa vi manca. Vi svegliate
asciutti alle Paracine, e l'essere asciutti è la parte peggiore. A meno che non abbiate costruito
l'**Àncora di Voce**: quella si spacca in mano e vi tira su.

## I posti sono veri

Il Porto Romano, Cala Rossano, Cala Nave, Piazza Castello, le cisterne dietro la chiesa di Santa
Candida, Villa Giulia a Punta Eolo — dove nel 2 avanti Cristo Augusto relegò **sua figlia**, con
l'accusa di adulterio: cinque anni su questo scoglio, la madre che la segue per non lasciarla sola,
e poi l'ordine scritto che le sue ossa non entrassero nel Mausoleo di famiglia. Dopo di lei
Agrippina, che qui è morta di fame, e Ottavia, che qui l'hanno uccisa a ventidue anni — il museo
archeologico, Santo Stefano e il cimitero dei detenuti. Si cena alla
**Terrazza di Mimì** in Piazza Castello e alla **Marisqueria**, e le lenticchie di Ventotene sono
minuscole e non si spappolano.

Per duemila anni, su quest'isola, è stata portata gente che non è più uscita: relegati imperiali,
detenuti politici, novanta uomini in un panopticon, e una nave di bambini il 24 ottobre 1943. Il
gioco parte da lì, e non ha bisogno di inventare niente.

## Avviso sui contenuti

Linguaggio per adulti, orrore psicologico, acqua profonda e claustrofobia, la voce di una persona
amata che dice la cosa sbagliata. Nessuna violenza sessuale, nessun sesso esplicito. I due
protagonisti sono persone reali e il gioco li tratta con affetto anche mentre li distrugge. Le
persone vive di Ventotene, nel gioco, sono dalla vostra parte.

## I numeri, misurati (non ricordati)

179 scene · ~49.900 parole · **2,95 scelte a ogni snodo di decisione** e zero corridoi sterili ·
6 rami di finale con 12 code · 16 ricette · 3 misteri da 4 indizi · 9 minigiochi di **6 tipi** ·
8 combattimenti con 4 boss · 65 imprese e 23 cronache · 20 sfondi dipinti · 14 sprite · 14 tracce
sintetizzate. Li stampa `node tests/validate.mjs`, che **fallisce** se una soglia viene violata.

## Per chi sviluppa

HTML, CSS e JavaScript puro. **Zero dipendenze, zero build, nessun asset**: la grafica è pixel art
procedurale disegnata sul canvas, la musica è sintetizzata con WebAudio, i font sono due di Google.

```bash
node tests/assemble.mjs      # drafts/*.js → js/campaign.js
node tests/validate.mjs      # grafo, dati, sprite, ricette, misteri, minigiochi, economia
node tests/playthrough.mjs   # partite simulate headless
```

Le scene si scrivono **nei draft**, non in `js/campaign.js` (che viene rigenerato). Le regole di
lavoro stanno in [CLAUDE.md](CLAUDE.md), il progetto in [docs/DESIGN.md](docs/DESIGN.md), e le lezioni
comuni a tutta la serie nel repo del motore, in `dnd-motore/docs/LESSONS-LEARNED.md`.

---

*Quinto gioco della serie, dopo [La Corona di Mezzanotte](https://galiv04.github.io/dnd-corona-di-mezzanotte/),
[Il Relais di Lord Gregorio](https://galiv04.github.io/relais-lord-gregorio/),
[La Casa che non Finisce](https://galiv04.github.io/casa-che-non-finisce/) e
[L'Effetto Zoom](https://galiv04.github.io/effetto-zoom/).*
