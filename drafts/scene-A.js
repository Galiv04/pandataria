/* ============ PANDATARIA — BLOCCO A: GIOVEDÌ 27 AGOSTO ============
   L'arrivo. La vacanza vera, quella bella, quella che si meritavano.
   L'orrore entra da una fessura sola, alla fine, e non urla: fa una NOTA.
   Uscita unica fuori dal blocco: b0 (venerdì mattina).
   Regole di tono: docs/DESIGN.md §1 e §10. Turpiloquio pieno, ritratti amorevoli. */

const SCENE_A = {

  /* ==================== IL TRAGHETTO ==================== */

  a0: {
    /* Scauri è il lungomare di casa, non un posto dell'isola. Prima usava `porto`
       (una parete di tufo scavata, mentre il testo parla di una macchina
       parcheggiata male sul marciapiede), poi l'ho spostata su `cala` perché almeno
       c'era il mare davanti. Ma `cala` disegna Cala Nave al tramonto, con dentro lo
       scoglio che dà il nome a quella baia: la prima immagine del gioco mostrava un
       monumento di Ventotene a centoventi chilometri da dove si svolge la scena, e a
       dodici ore di distanza. Adesso Scauri ha il suo quadro: alle 06:55, con la
       sabbia scura, i lidi verso Gianola, le sdraio ancora legate e l'acqua che è
       una lastra — e all'orizzonte, quasi niente, le due sagome dove stanno andando. */
    location: 'scauri',
    caption: 'Scauri, lungomare — giovedì 27 agosto, ore 06:55',
    stinger: 'gold',
    text: `**Giovedì 27 agosto, sette meno cinque. Scauri, lungomare, all'altezza del Litoriente.**

La macchina è parcheggiata male come si parcheggia quando si parte per quattro giorni: due ruote sul marciapiede, il portellone aperto, e in mezzo alla strada un borsone che nessuno dei due ha deciso di caricare per primo.

Il mare qui lo conoscono a memoria: è quello di casa, quello di sempre, con la sabbia scura e la fila di lidi che arriva fino a Gianola. A quest'ora non c'è nessuno: le sdraio sono ancora accatastate e legate, e l'acqua è una lastra. È bello. Ma è il mare che si guarda dal lungomare mentre si va a prendere il caffè.

E poi c'è la ragione per cui la macchina è aperta alle sette meno cinque di un giovedì di agosto. **Il primo settembre sono dieci anni.** Dieci anni esatti, e cade di martedì: il martedì della settimana in cui tornano a lavorare tutti e due. Quindi il regalo è anticipato — si parte oggi, si torna domenica trenta col traghetto delle 17:30, e martedì si festeggia lavorando. Quattro giorni su un'isola, prenotati a febbraio, pagati, e tenuti segreti per un mese e mezzo prima di dirglielo.

> Claudia: *(che lo sa da giugno e fa finta di no da giugno)* "Comunque non mi hai ancora detto quanto è costato."

> Gaetano: "No."

> Claudia: "Mai?"

> Gaetano: "Mai."

> Claudia: *(chiudendo il portellone con l'anca)* "Le chiavi di casa."

> Gaetano: "Prese."

> Claudia: "I documenti per il traghetto."

> Gaetano: "Presi."

> Claudia: "Il phon."

> Gaetano: *(pausa)* "...il phon perché?"

> Claudia: "Perché tu dici sempre 'ce l'hanno' e poi non ce l'hanno mai."

> Claudia: *(chiudendo il portellone con l'anca)* "Andiamo, che quello alle otto e mezza non aspetta."

**(🫁 Fiato 6 su 20: è l'aria che avete adesso, e sotto conta solo quella. Si guadagna con le cose umane — mangiare vero, dormire, il caffè, ridere, stare fermi un momento in due — e si spende scendendo.)**`,
    gold: 0,
    choices: [
      { text: '🧳 Caricare il borsone. Per primo, senza dire niente, e metterci le pinne sopra', once: true, gold: 1, sets: { borsone_caricato: true }, next: 'a0_traghetto' },
      { text: '☕ Due caffè al bar del lungomare, in piedi, prima di partire', once: true, heal: 2, gold: 2, next: 'a0_traghetto' },
      { text: '🚗 Ventidue chilometri di Domiziana. Adesso', next: 'a0_traghetto' },
    ],
  },

  /* IL TRAGHETTO. Era la seconda metà di a0, ed era un difetto doppio: ottocentonovantasette
     parole prima della prima decisione del gioco — cioe' la prima cosa che il giocatore
     legge e' un capitolo, non una partita — e mezza scena che parla di Formia, del molo
     Azzurra e di due ore di mare aperto mentre sullo schermo c'e' il fondale di SCAURI, che
     e' il lungomare di casa. Un fondale per luogo, e un luogo per scena. */
  a0_traghetto: {
    location: 'traghetto',
    caption: 'Il traghetto per Ventotene — giovedì 27 agosto, dalle 08:30',
    stinger: 'gold',
    metri: 0,
    text: `Ventidue chilometri di Domiziana fino a **Formia**, che a quest'ora vuol dire venti minuti: la strada di agosto alle sette è una strada di novembre, con i furgoni della frutta e nessun altro.

Il molo Azzurra alle otto è già una battaglia, ma una battaglia sveglia: valigie, gente che urla il numero del biglietto, un tizio che vende ghiaccio da un carrellino, e il traghetto per Ponza e Ventotene attaccato alla banchina che sembra troppo piccolo per tutta quella coda. **Partenza alle otto e mezza.**

> Claudia: *(sul ponte, quando finalmente si molla)* "Quattro giorni."

> Gaetano: "Quattro giorni."

> Claudia: "Senza chiamate. Senza satelliti. Senza NIENTE."

> Gaetano: "Ho promesso."

Il molo si stacca. Non è il traghetto che parte: è la banchina che va indietro, e quel secondo in cui il cervello si sbaglia è il secondo in cui una vacanza comincia per davvero.

**(🫁 Fiato +1: siete partiti, e partire da soli in due vale aria.)**`,
    gold: 1,
    choices: [
      { text: '☕ Il bar di bordo: due caffè e un cornetto industriale, in piedi, col bicchiere di plastica', once: true, heal: 3, gold: 1, next: 'a0_ponte' },
      { text: '🌊 Il ponte di poppa, subito. Il vento e la scia', next: 'a0_ponte' },
    ],
  },

  /* IL PONTE DI POPPA. Era la seconda metà di a0_traghetto, e prima ancora la terza parte
     della scena iniziale da ottocentonovantasette parole. Qui dentro sta il nome del gioco
     — Pandataria, dispensatrice di ogni bene — e sta il carcere che entra
     nell'inquadratura: due cose che meritano una scena loro e non la coda di un'altra. */
  a0_ponte: {
    location: 'traghetto',
    caption: 'Il ponte di poppa — due ore e un quarto di mare aperto',
    stinger: 'gold',
    metri: 0,
    text: `---

**Due ore e un quarto di mare aperto. Il ponte di poppa, il sole ancora basso, e quel vento che ti asciuga il sudore prima che ti arrivi in fondo alla schiena.**

Claudia sta appoggiata alla ringhiera con la faccia dentro il vento e gli occhi chiusi, e Gaetano la guarda fare questa cosa da dieci anni senza essersene ancora stancato. Quattro giorni. Ventotene. Un B&B con la terrazza che si chiama **Le Parracine** — che in dialetto, ha letto Gaetano su un forum, vuol dire i muretti a secco, quelli che sull'isola tengono su la terra e tengono fuori il vento.

> Gaetano: "Sai che le parracine le costruivano senza malta? Solo pietre incastrate. Reggono da secoli perché lasciano passare l'aria: se le fai piene, il vento le butta giù."

> Claudia: *(senza aprire gli occhi)* "Amore. Sono in vacanza da due ore e mi hai già spiegato un muro."

> Gaetano: "È un muro INTERESSANTE."

> Claudia: "Lo sono tutti, per te." *(allunga una mano e gli trova il ginocchio senza guardare)* "Continua."

Il mare, oggi, è di un blu che sembra photoshoppato. E davanti, all'orizzonte, cominciano a staccarsi due sagome: una lunga e bassa, che è Ventotene, e una tozza, scura, con sopra un affare enorme a forma di ferro di cavallo.

> Gaetano: *(col telefono in mano, che è il suo modo di guardare le cose)* "Sai come si chiamava, quella?"

> Claudia: "Ventotene."

> Gaetano: "Da cent'anni. Prima si chiamava **Pandataria**." *(scandisce)* "Pan-da-tà-ria. È greco."

> Claudia: "E vuol dire?"

> Gaetano: "**Dispensatrice di ogni bene.**" *(alza gli occhi dal telefono)* "*Pan*, tutto. *Dateomai*, distribuire. Quella che dà tutto. Gliel'hanno messo i greci perché ci si fermavano volentieri: buona posizione, terra grassa, si mangiava."

Claudia guarda l'isola bassa che cresce, e poi quella tozza col ferro di cavallo sopra.

> Claudia: "Quella che dà tutto."

> Gaetano: "Quella che dà tutto."

**(🫁 Fiato +1: due ore e un quarto di mare aperto, con un caffè del bar di bordo e nessuno che vi chiede niente. Il Quaderno registra il nome vero dell'isola.)**`,
    gold: 1,
    sets: { sa_pandataria: true },
    choices: [
      { text: '🪨 Guardare quella tozza, quella col ferro di cavallo sopra, e chiedere cos\'è', next: 'a0_carcere' },
      { text: '☀️ Non chiedere niente. Restare due minuti a guardare l\'isola bassa che cresce', once: true, heal: 3, gold: 1, next: 'a0_carcere' },
    ],
  },

  /* IL CARCERE CHE ENTRA NELL'INQUADRATURA. Merita di essere una scena: è la prima volta
     che il giocatore vede Santo Stefano, ed è l'immagine su cui gira tutto il resto. Prima
     stava in fondo a un blocco di cinquecento parole, dopo due minuti di etimologia. */
  a0_carcere: {
    location: 'traghetto',
    caption: 'E poi ci hanno messo un carcere',
    stinger: 'campana',
    metri: 0,
    text: `> Claudia: *(e non lo dice per fare la spiritosa, lo dice perché lo pensa)* "E poi ci hanno messo un carcere."

> Gaetano: "E poi ci hanno messo un carcere.

> Claudia: *(che ha aperto gli occhi, e adesso guarda quella)* "Quello cos'è?"

> Gaetano: "Santo Stefano. Il carcere borbonico. Del 1795, chiuso nel '65." *(controlla sul telefono, che è il suo modo di dire "ho paura di dire una cosa sbagliata")* "Panopticon: celle a ferro di cavallo intorno a un pozzo centrale. Una guardia sola, in mezzo, vede dentro tutte le celle contemporaneamente."

Claudia lo guarda per un secondo di troppo.

> Claudia: "E i detenuti? Vedevano lei?"

> Gaetano: "No. Quello era il punto."

Il traghetto vira, e per un momento il carcere resta esattamente al centro dell'inquadratura, e Claudia — che di mestiere decide come si guardano le cose — non fa la foto.

**(🫁 Fiato +1: due ore e un quarto di mare aperto, con un caffè del bar di bordo e nessuno che vi chiede niente. Il Quaderno registra la prima cosa: il carcere si vede da qui, e lei ha scelto di non fotografarlo.)**`,
    gold: 1,
    sets: { partiti: true },
    choices: [
      { text: '🌊 Restare sul ponte a guardare l\'isola che si avvicina', next: 'a0b' },
      { text: '📸 Claudia scatta la prima foto della vacanza: le due isole insieme', once: true, next: 'a0_foto' },
      { text: '🥪 Scendere al bar del traghetto: due panini e una birra piccola', once: true, heal: 3, gold: 1, next: 'a0b' },
    ],
  },

  a0_foto: {
    location: 'traghetto',
    caption: 'La prima foto',
    text: `Claudia inquadra le due isole insieme — Ventotene bassa e verde, Santo Stefano dietro come una cosa appoggiata male — e scatta col telefono, orizzontale, senza filtri.

Guarda lo schermo. E fa quella faccia.

> Gaetano: "Che c'è?"

> Claudia: "Niente. È mossa."

> Gaetano: "Rifalla."

Ne fa altre quattro. Sono tutte mosse, e sono mosse **nello stesso punto**: una banda di sfocatura verticale, larga tre dita, esattamente sopra il braccio di mare tra le due isole. Il resto dell'inquadratura è nitido come un manifesto.

> Claudia: *(zoomando, professionale, e la voce che scende di tono)* "Gaetà. Questa non è micromosso. Il micromosso sfoca TUTTO. Questa è una banda. È come se là in mezzo l'aria... vibrasse."

> Gaetano: *(guarda il mare vero, poi lo schermo, poi il mare vero)* "Sarà lo scarico del motore. Il calore che sale distorce l'aria, tipo miraggio d'asfalto. Si chiama scintillazione."

> Claudia: "Il motore sta dietro di noi."

> Gaetano: "...sì."

Salva le foto. Tutte e cinque. È una cosa che farà, tra due giorni, la differenza tra credere di essere pazzi e sapere di non esserlo.

**(🫁 Fiato +1: guardare le cose invece di scartarle. Il Quaderno registra: la banda tra le due isole.)**`,
    gold: 1,
    sets: { i_banda_foto: true },
    choices: [
      { text: '🌊 Rimettere il telefono in tasca e godersi l\'arrivo', next: 'a0b' },
    ],
  },

  a0b: {
    location: 'traghetto',
    caption: 'Sul ponte — la conversazione della boa',
    text: `L'isola cresce. Si distinguono le case del paese, gialle e rosa, appoggiate sul tufo come una cosa fatta a mano, e sotto — nella baia — il porto romano scavato nella roccia duemila anni fa, che è ancora il porto, perché certe cose se le fai bene non le rifai più.

> Gaetano: *(e lo dice con la leggerezza studiata di chi ci ha pensato tutta la settimana)* "Comunque ho portato la maschera buona."

> Claudia: "Bene."

> Gaetano: "Ne ho portate due."

Claudia si gira. Lo guarda. Sa esattamente cosa sta facendo, perché lo conosce da dieci anni, e Gaetano sa che lei lo sa, e questa è la parte in cui uno dei due deve decidere di essere gentile.

> Claudia: *(sceglie di esserlo)* "Due maschere."

> Gaetano: "Due maschere."

> Claudia: "Perché magari, quest'anno, arrivo fino alla boa."

> Gaetano: "Non ho detto niente."

> Claudia: "Hai portato DUE MASCHERE, amore mio. Hai detto tutto in silicone."

Ride. Ride davvero, e poi guarda l'acqua sotto lo scafo — quel blu che dopo i tre metri diventa un blu diverso, e dopo i dieci diventa una cosa che non ha nome — e la risata le finisce piano, come le finisce sempre.

> Claudia: "Ci provo. Ok? Ci provo. Ma se dico basta—"

> Gaetano: "Se dici basta si torna. Come sempre. Non ho mai fatto altro."

> Claudia: *(gli prende la faccia con due mani, quella cosa che fa quando vuole essere sicura di essere capita)* "Lo so. È per questo che ci provo."

**(🫁 Fiato +2. E su questa promessa, detta a voce alta sopra il mare, l'isola ha aperto un orecchio.)**`,
    gold: 1,
    attenzione: 1,
    sets: { promessa_boa: true },
    choices: [
      { text: '⚓ Il traghetto attracca. Si scende', next: 'a1' },
      { text: '🤍 Restare abbracciati alla ringhiera fino alla manovra', once: true, heal: 4, next: 'a1' },
    ],
  },

  /* ==================== IL PORTO E IL PAESE ==================== */

  a1: {
    location: 'porto',
    caption: 'Porto Romano — ore 10:50',
    text: `Si scende in mezzo al casino bellissimo di un'isola d'agosto: carrelli, cani, bambini urlanti, tre motorini che portano quattro persone ciascuno, una signora che grida un nome verso una finestra e la finestra che risponde.

Il porto è scavato nel tufo. Non "costruito": **scavato**. I romani sono arrivati qui, hanno guardato una parete di roccia gialla e hanno deciso di levare tutto quello che non era porto. Le pareti hanno ancora i segni degli scalpelli, righe parallele a mezzo metro l'una dall'altra, e in mezzo — a un metro dall'acqua — dei buchi quadrati, regolari, ordinatissimi.

> Claudia: "E quelli?"

> Gaetano: *(che ha letto tutto, ovviamente)* "Alloggiamenti per le travi. Ci poggiavano le passerelle." *(pausa, e poi la cosa che ha letto e non voleva dire)* "Alcuni dicono che i più grandi erano per le catene."

> Claudia: "Catene per le barche?"

> Gaetano: "Catene."

Sopra le loro teste, appoggiato sul bordo della cava, il paese comincia con una fila di case gialle. Una scaletta di pietra sale a zig-zag, e in cima si vede un cartello di legno dipinto a mano: **LE PARRACINE — B&B — 200 m**, con una freccia storta e un disegno di un muretto a secco.

> Claudia: *(caricandosi il borsone)* "Duecento metri in salita con trentasei chili di roba. Chi ha fatto le valigie?"

> Gaetano: "Tu."

> Claudia: "Chi ha detto 'porta pure il phon che magari non ce l'hanno'?"

> Gaetano: "Sempre tu."

> Claudia: "Bene. Volevo solo che fosse verbalizzato."`,
    choices: [
      { text: '🪜 Su, alle Parracine', next: 'a2' },
      { text: '🏪 Prima una tappa: il negozio di articoli da mare, sul molo', once: true, next: 'a1_negozio' },
      { text: '🏛 C\'è un museo archeologico piccolo, sulla piazza: due minuti', once: true, next: 'a1_museo' },
    ],
  },

  a1_negozio: {
    location: 'porto',
    caption: 'Il negozio del molo',
    text: `Un buco di tre metri per quattro con dentro tutto: pinne, retini, canotti gonfiabili, creme, un espositore di cartoline sbiadite e un frigo che ronza come un frigo del 1994.

Il ragazzo dietro il banco ha vent'anni e la faccia di uno che ha già visto passare quattromila turisti quest'anno.

> Gaetano: "Una torcia subacquea. La più forte che ha."

> Il ragazzo: *(tira giù una scatola dallo scaffale alto)* "Mille lumen, tenuta quaranta metri. Ventotto euro."

> Gaetano: "La prendo."

> Il ragazzo: *(mentre batte lo scontrino, senza alzare la testa)* "Per i polpi negli scogli?"

> Gaetano: "Per guardare sotto, in generale."

E qui il ragazzo alza la testa. Solo un attimo, e cambia niente in faccia, e infatti è quello che colpisce Claudia — perché lei nota il fotogramma in cui una faccia cambia, è tutto il suo mestiere.

> Il ragazzo: "Sotto dove?"

> Claudia: "In che senso 'sotto dove'?"

> Il ragazzo: *(mette la torcia nel sacchetto)* "Niente. Se andate a Cala Rossano, oltre la boa gialla, dopo c'è una franata: da dodici metri va a trentacinque di botto. Un sacco di gente non se ne accorge." *(porge il sacchetto, e adesso guarda Gaetano negli occhi)* "Non è pericoloso. È che non te ne accorgi. Ecco."

Fuori, in mezzo al sole delle sei di sera, la frase resta lì tra loro due per una decina di passi.

> Claudia: "Ha detto 'non te ne accorgi' due volte."

> Gaetano: "Ha detto una cosa vera due volte. Le franate sono cattive perché non hai riferimenti."

> Claudia: "Certo."

**(Oggetti: TORCIA SUBACQUEA e NASTRO ISOLANTE. 🫁 Fiato +1.)**`,
    item: 'torcia_sub',
    item2: 'nastro_isolante',
    gold: 1,
    choices: [
      { text: '🪜 Su, alle Parracine', next: 'a2' },
      { text: '🧂 Chiedere anche una tanica e del sale grosso "per il pesce"', once: true, item: 'sale_grosso', next: 'a2' },
      { text: '⛱ E l\'ombrellone grande, quello a spicchi bianchi e blu. "Ci vuole"', once: true, item: 'ombrellone_gaeta', goldLoss: 2, tag: '(pesa: −2 di 🫁 fiato per portarlo su per i muretti a secco — ma nei primi due round di ogni scontro i nemici hanno −1 ai colpi)', next: 'a2' },
    ],
  },

  a1_museo: {
    location: 'paese',
    caption: 'Museo Archeologico — due stanze e un secolo',
    text: `Due stanze, aria condizionata a manetta, e una signora al banchetto che è contentissima di vedere due persone entrare.

Anfore. Un mosaico da Villa Giulia. Un plastico dell'isola col porto romano ricostruito, e sopra — appesa al muro in una cornice di alluminio — una **carta dell'acquedotto romano**: sei rettangoli numerati collegati da linee, scavati nel tufo sotto il paese.

> Gaetano: *(che si è avvicinato alla carta come si avvicina alle cose che lo chiamano)* "Sei cisterne."

> La signora: *(dal banchetto, contenta di essere utile)* "Sei, sì! Ma se ne visitano due: quella di Villa Stefania e la Cisterna dei Detenuti. Le altre sono chiuse."

> Claudia: "Chiuse tipo... pericolose?"

> La signora: "Chiuse tipo che non si sa più dove stanno, signora! Il tufo si muove, le strade sono state rifatte tre volte..." *(fa un gesto vago)* "Le hanno murate nell'Ottocento, dicono. O prima."

Nell'altra stanza, in una teca dedicata al **relitto della Santa Lucia**, c'è la riproduzione di una fotografia. Molo di Napoli, 24 ottobre 1943, in bianco e nero mangiato: una bambina di sei anni col cappottino buono, la mano dentro la mano di qualcuno che l'inquadratura taglia via all'altezza del polso.

Claudia si ferma davanti a quella foto più tempo di quanto avrebbe voluto.

> Claudia: "Che è successo alla Santa Lucia?"

> La signora: *(e la voce le si aggiusta in quel modo che hanno le persone dei posti piccoli quando raccontano una cosa che è di tutti)* "Silurata. Il 24 ottobre del '43, di notte. Si è spezzata in due davanti all'isola." *(pausa)* "Sono ancora là sotto, in due pezzi. A quarantacinque metri."

**(Oggetto: la FOTO DAL MUSEO. 🫁 Fiato +1. Il Quaderno registra la bambina del molo.)**`,
    item: 'foto_bambina',
    gold: 1,
    sets: { i_foto_museo: true },
    choices: [
      { text: '🗺 Fotografare la carta delle sei cisterne, prima di uscire', once: true, gold: 1, sets: { i_registro_acqua: true }, next: 'a2' },
      { text: '🪜 Su, alle Parracine: si è fatto tardi', next: 'a2' },
    ],
  },

  a2: {
    location: 'paese',
    caption: 'La salita — duecento metri di parracine',
    text: `La scaletta sale tra due muretti a secco alti un metro e mezzo. Pietre di tufo incastrate senza malta, generazioni di mani, e dentro le fessure crescono capperi, fichi d'India e un'erba grassa che sa di limone quando la strofini.

Fa caldo. Sono le sei e venti e fa ancora un caldo da spaccare le pietre, e i borsoni pesano il doppio di quanto pesavano a Formia.

A metà salita, seduta su uno sgabello davanti a una porta aperta, una signora di ottant'anni sta pulendo fagiolini in un catino. Li guarda passare. Non dice buonasera: aspetta.

> Claudia: "Buonasera!"

> La signora: "Buonasera. Turisti?"

> Gaetano: "Quattro giorni. Stiamo alle Parracine."

> La signora: *(annuisce, continua a pulire fagiolini)* "Buoni, quelli. Brava gente." *(un fagiolino nel catino)* "Fate i bagni dove c'è la gente."

Claudia si ferma. Gaetano non se ne accorge subito e fa altri due gradini.

> Claudia: "Come, scusi?"

> La signora: *(sempre coi fagiolini, tranquillissima, come se avesse detto di portare il cappello)* "Dove c'è la gente. Le calette belle sono belle, ma sono belle e sole. Ad agosto poi..." *(alza gli occhi per la prima volta, e sono occhi normali, gentili, di una signora che pulisce fagiolini)* "Ad agosto il mare è pieno.

Fate i bagni dove c'è la gente, signora."

Riprende i fagiolini. La conversazione, per lei, è finita.

Riprendono la salita in silenzio per una decina di gradini.

> Gaetano: "Voleva dire le correnti."

> Claudia: "Ha detto 'il mare è pieno'."

> Gaetano: "Pieno di gente. Ad agosto. Voleva dire pieno di gente, Claudia."

> Claudia: *(che si è girata a guardare indietro, e la signora sta ancora pulendo fagiolini, e non li sta guardando)* "Sì. Probabilmente sì."

**(🫁 Fiato +1: le cose dette in salita si dimenticano. Questa no.)**`,
    gold: 1,
    attenzione: 1,
    sets: { avviso_fagiolini: true },
    choices: [
      { text: '🏠 Arrivare alle Parracine', next: 'a3' },
      { text: '❓ Tornare indietro e chiedere alla signora COSA vuol dire', once: true, next: 'a2_domanda' },
    ],
  },

  a2_domanda: {
    location: 'paese',
    caption: 'La domanda alla signora',
    text: `Claudia scende i gradini che ha già fatto. Gaetano la segue perché la segue sempre.

> Claudia: "Scusi. Signora. 'Il mare è pieno' che vuol dire?"

La signora mette il catino in terra. Si asciuga le mani sul grembiule, piano, e adesso li guarda entrambi, e non c'è niente di minaccioso nella sua faccia: c'è FASTIDIO. Il fastidio preciso di chi ha già fatto questa conversazione altre volte e sa come finisce.

> La signora: "Che vuol dire che vuol dire. Il mare è pieno."

> Claudia: "Pieno di cosa?"

> La signora: *(e adesso ha la voce con cui si spiega una cosa ovvia a una nipote)* "Di quelli che ci sono rimasti, signora mia. Il piroscafo del quarantatré. Quelli del carcere che gli davano sepoltura in acqua quando il cimitero era pieno. I pescatori. Mio zio Vincenzo, nel cinquantasette." *(riprende il catino)* "Il mare qua è un camposanto grande. Non è brutto: è pieno. Se fate i bagni dove c'è la gente, quelli non vi vengono a cercare, perché a loro dà fastidio la confusione. Ecco tutto."

Un fagiolino nel catino. Un altro.

> La signora: "Poi voi fate come volete. Siete grandi."

**(🫁 Fiato +2: adesso lo sapete detto in chiaro, da una signora coi fagiolini, alle sei e venti di un giovedì d'agosto. Ed è così che le cose vere si dicono, sulle isole.)**`,
    gold: 1,
    sets: { avviso_esplicito: true },
    choices: [
      { text: '🏠 Ringraziare e salire, con una cosa in più addosso', next: 'a3' },
    ],
  },

  /* ==================== IL B&B — IL RIFUGIO ==================== */

  a3: {
    location: 'bnb',
    caption: 'B&B Le Parracine — il rifugio',
    stinger: 'heal',
    text: `E poi, in cima alla salita, la cosa bella.

**Le Parracine** sta in via Fontanelle, appena fuori dal paese: dieci minuti a piedi dalla piazza, e sotto — proprio sotto, a una rampa di gradini dal giardino — **Cala Nave**. È una casa bassa di tufo giallo con le finestre verdi, dentro un fazzoletto di terra tenuto su da tre livelli di muretti a secco. Sui muretti crescono pomodori, basilico in un bidone tagliato, e un limone in vaso che ha più limoni di quanti ne possa mangiare una famiglia.

La navetta li ha portati su dal porto in quattro minuti, con i borsoni infilati dietro come sacchi di cemento, e il ragazzo che guidava ha detto una frase sola per tutta la salita: «Oggi il mare è una tavola.»

I proprietari sono due: **la signora Ada** — sessant'anni, capelli raccolti con un elastico, l'aria di una che alle sette del mattino ha già fatto tre cose — e il marito, che dice "buonasera" dalla cucina e non si vede mai per intero.

> Ada: "Voi siete quelli dei quattro giorni. La stanza sopra, quella con la terrazza. Venite."

La stanza è semplice e perfetta: letto grande, un ventilatore a pale, il pavimento di graniglia freddo sotto i piedi, il frigo piccolo che ronza. E sopra, sul tetto, la **terrazza solarium**: un gazebo di canne, un tavolo apparecchiato per la colazione di domani, due sedie di plastica e una vista che ti spacca in due.

Guardando a nord, di là dal braccio di mare, c'è tutta la costa napoletana messa in fila come una cosa fatta per essere guardata da qui: **Ischia** a sinistra, poi Procida, e in fondo — quando l'aria è pulita come stamattina — la gobba del **Vesuvio**. Sessanta chilometri di golfo, e li vedi da una sedia di plastica.

Poi si gira a destra, verso est, e a tre chilometri c'è il ferro di cavallo di **Santo Stefano**, appoggiato sull'acqua come un dente cariato.

> Ada: "La colazione dalle otto, qua sopra sotto il gazebo. Ciambellone e marmellata, che le faccio io: quella di limone è di quelli lì." *(indica il vaso col mento.)* "Il caffè lo faccio con la moka, non ho la macchinetta e non la voglio." *(posa le chiavi sul tavolino)* "E se sentite i cani abbaiare di notte, non è niente: qua abbaiano tutti insieme, si mettono d'accordo."

> Claudia: "Si mettono d'accordo?"

> Ada: *(dalla porta, e lo dice senza pensarci, come si dice il tempo che fa)* "Eh. Comincia uno e poi rispondono tutti. Come al coro." *(esce)* "A dopo!"

**(🫁 Fiato +2: Le Parracine è un RIFUGIO, e si sente appena si posano i borsoni.)**`,
    gold: 2,
    sets: { arrivati_parracine: true },
    choices: [
      { text: '🧳 Posare i borsoni e uscire subito sulla terrazza. I vestiti dopo', next: 'a3_terrazza' },
      { text: '🚿 Prima la doccia e i capelli bagnati, che dopo il traghetto ci vuole', once: true, heal: 4, gold: 1, next: 'a3_terrazza' },
    ],
  },

  /* LA TERRAZZA. La stanza e la terrazza erano cinquecentotrentuno parole insieme, e la
     terrazza è il posto che questo gioco usa come casa: ci si torna sei volte e una di
     quelle sei è il 30 agosto che si ripete. Casa merita una porta. */
  a3_terrazza: {
    location: 'terrazza',
    caption: 'La terrazza, soli, quattro giorni davanti',
    stinger: 'heal',
    text: `Restano soli, sulla terrazza, con i borsoni in mezzo alla stanza e quattro giorni davanti.

> Gaetano: "Come al coro."

> Claudia: *(che si è già seduta su una sedia di plastica coi piedi sul muretto)* "Amore, se cominci a fare l'inquietante con le frasi delle signore non ti porto più in vacanza."

> Gaetano: "Hai ragione. Scusa."

Il sole scende. Il muretto a secco, sotto i piedi di Claudia, tiene su la terra e lascia passare il vento.

**(🫁 Fiato +3. Le Parracine è un RIFUGIO: qui, dentro i muretti, non arriva niente. Quando dormite qui, il giorno si chiude.)**`,
    gold: 2,
    heal: 6,
    sets: { arrivati_parracine: true },
    choices: [
      { text: '🧳 Disfare le valigie (e vedere cosa c\'è, davvero, in questi borsoni)', once: true, next: 'a3_valigie' },
      { text: '🏖 Al mare, subito: c\'è ancora un\'ora di sole a Cala Nave', next: 'a4' },
      { text: '☕ Chiedere ad Ada un caffè, tanto per parlare un po\'', once: true, next: 'a3_ada' },
      { text: '📷 Sulla scaletta del giardino sale qualcuno con le pinne in mano', once: true, next: 'a3_lilia' },
    ],
  },

  /* LILIA. Persona vera: la figlia di Ada, che gestisce Le Parracine con lei. Gaetano e
     Claudia la conoscono da anni e non si sentono da un pezzo, quindi questa non è una
     presentazione: è un ritrovarsi. Vale per lei la regola dei ventotenesi vivi — è
     un'alleata, sempre, senza doppi fondi — e il ritratto è affettuoso: quello che
     conta di lei è cosa SA FARE, non come è fatta. Porta il secondo strato del nome
     dell'isola, quello che non sta nei libri ma nella bocca di chi va in barca. */
  a3_lilia: {
    location: 'bnb',
    npc: ['lilia'],
    caption: 'Il giardino delle Parracine — ore 12:20',
    stinger: 'voce_amata',
    gold: 3, heal: 2,
    sets: { conosciuta_lilia: true },
    text: `Dalla scaletta che scende in spiaggia sale una ragazza a piedi nudi, con un paio di pinne in una mano, la maschera sulla fronte e i capelli — castano dorato, di quel biondo che fa il sole e non il parrucchiere — legati in un nodo che si sta già disfacendo. Ha ancora il sale addosso, e non le pesa: cammina sul tufo caldo come se avesse la pianta dei piedi di cuoio.

Si ferma a metà gradino. Guarda Gaetano tre secondi di troppo.

> Lilia: "No."

> Gaetano: "..."

> Lilia: "**No.** Gaetano?"

E qui succede quella cosa imbarazzante e bella di quando due persone che si conoscono da anni, e che non si sentono da altrettanti, si ritrovano in un posto dove nessuno dei due si aspettava l'altro — con le mani che partono per stringersi, ci ripensano, e finiscono in un abbraccio storto con le pinne in mezzo.

> Lilia: "Ma tu sei quello dei satelliti! Quanti anni sono?"

> Gaetano: "Tanti. Tre? Quattro?"

> Lilia: "Cinque, secondo il mio telefono." *(a Claudia, e le porge la mano bagnata senza scusarsi, che è il modo migliore)* "Lilia. La stanza sopra ve l'ho data io: mia madre prende le prenotazioni e poi mi dice cos'ha fatto."

Claudia le stringe la mano e vede due cose nello stesso momento: gli occhi, che sono di un azzurro che sull'isola sembra un dispetto, e la macchina fotografica appesa di traverso alla spalla, una reflex vera con la ghiera consumata sul bordo.

> Claudia: "Che obiettivo tieni su?"

> Lilia: *(la faccia di una che ha appena capito con chi sta parlando)* "Trentacinque fisso."

> Claudia: "Perché il trentacinque."

> Lilia: "Perché ti costringe ad avvicinarti."

E in tre battute si sono riconosciute: due persone che di mestiere decidono come si guardano le cose.

**(🫁 Fiato +1.)**`,
    choices: [
      { text: '📷 Chiederle di vedere gli ultimi scatti sul display, adesso, in piedi sul gradino', once: true, heal: 2, gold: 1, next: 'a3_lilia_calette' },
      { text: '🤿 Chiederle dov\'è che si scende, su quest\'isola', next: 'a3_lilia_calette' },
    ],
  },

  /* LE CALETTE. Era la seconda metà di a3_lilia. La prima metà è l'incontro — due che si
     riconoscono in tre battute — e la seconda è l'invito e la frase che tiene su mezzo
     gioco: «fondali di TENUTA». Cinquecentonovanta parole di fila su un gradino. */
  a3_lilia_calette: {
    location: 'bnb',
    caption: 'Sul gradino, con le pinne sul muretto',
    stinger: 'heal',
    text: `E in tre battute si sono riconosciute: due persone che di mestiere decidono come si guardano le cose.

Lilia posa le pinne sul muretto, si siede sul gradino e fa la domanda che fanno tutti quelli che vivono qui.

> Lilia: "Quanto restate?"

> Gaetano: "Fino a domenica. Traghetto delle 17:30."

> Lilia: "Bene. Allora domani vi porto alle calette, che con questo mare è un peccato stare a Cala Nave." *(guarda l'attrezzatura appena tirata fuori dai borsoni, e nota le due maschere identiche prima di chiunque altro, e non dice niente, e questo Claudia se lo ricorderà)* "Sapete che l'isola prima si chiamava un'altra cosa?"

> Gaetano: "Pandataria. Dispensatrice di ogni bene."

> Lilia: *(ride)* "Lo sapevi. Vabbè, con te era prevedibile." *(poi diventa un po' più seria, e dice la cosa che a Gaetano non stava nel telefono)* "Però quella è la versione dei libri. Mio nonno la chiamava a un altro modo, e i pescatori vecchi ancora la dicono così: **l'isola dei buoni fondali**."

> Claudia: "Fondali belli da vedere?"

> Lilia: "No no. Fondali di **tenuta**." *(fa il gesto con la mano, il gesto di una cima che si tende)* "È un termine da barca. Un fondale di tenuta è un fondo dove l'ancora **fa presa** e non striscia. Ci sono posti dove butti l'ancora e la barca cammina tutta la notte. Qui no: qui quello che butti sotto, sotto **rimane**."

Il limone in vaso fa il suo odore. Il mare, quaranta metri più giù, è una tavola.

> Lilia: *(alzandosi, e già con un piede sul gradino)* "Comunque è una cosa buona, eh! Per le barche è il complimento più grosso che si può fare a un posto."

**(🫁 Fiato +2, 💪 TENUTA +2. Avete ritrovato Lilia, e sapete la seconda metà del nome: quella che dà tutto, e sotto tiene.)**`,
    choices: [
      { text: '📷 Chiederle di vedere le sue foto dell\'isola', once: true, next: 'a3_lilia_foto' },
      { text: '🧳 Finire di disfare i borsoni', next: 'a3_valigie' },
      { text: '🏖 Al mare, che è quello che si è venuti a fare', next: 'a4' },
    ],
  },

  /* Le foto di Lilia: dieci anni di isola guardata col trentacinque. È un ARCHIVIO, e in
     un archivio le cose ci sono anche quando nessuno le ha cercate. Qui non si trova
     ancora niente — è troppo presto, ed è giusto che il giocatore se ne accorga dopo —
     ma si stabilisce che l'archivio esiste, e dove sta. */
  a3_lilia_foto: {
    location: 'bnb',
    npc: ['lilia'],
    caption: 'Le foto di Lilia — ore 12:35',
    gold: 1,
    sets: { archivio_lilia: true },
    text: `Il telefono di Lilia è un disastro organizzato: cartelle per anno, e dentro ogni anno cartelle per mese, e dentro agosto una cartella che si chiama solo «buone».

Dieci anni di isola guardata col trentacinque fisso. La stessa cala in ottanta luci diverse. Il porto vuoto a marzo, che nessuno vede mai. Una mareggiata di gennaio che ha portato la ghiaia fino alla piazza. Ada che ride con la mano davanti alla bocca. Un polpo su un piatto e un polpo in un buco, a due foto di distanza, e lei che dice «quello nel piatto non era lo stesso, per la cronaca».

> Claudia: "Quante ne hai?"

> Lilia: "Su questo? Ventimila e qualcosa. Sul disco a casa non lo so."

> Claudia: *(e lo dice con l'invidia sana di una che lavora con le immagini)* "Ventimila foto dello stesso scoglio."

> Lilia: "Dello stesso scoglio **in momenti diversi**. Che è il contrario."

Poi arriva a una cartella di quattro anni fa, la supera, e Claudia le ferma la mano.

> Claudia: "Torna indietro."

> Lilia: "Quale?"

> Claudia: "Quella di prima. Non so perché."

Lilia torna indietro. È una foto normalissima: il mare fra Ventotene e Santo Stefano, verso le sette di sera, con la luce che fa quella cosa. Claudia la guarda per otto secondi e poi dice «niente, scusa», e Lilia chiude e passa avanti, senza insistere, perché è educata.

Ma la cartella ha un nome, e il nome adesso lo sanno tutti e tre.

**(📷 Sapete che esiste l'archivio di Lilia: ventimila foto dell'isola in dieci anni, ordinate per mese. Se un giorno vi servirà una prova, la prova potrebbe essere già stata scattata da qualcun altro.)**`,
    choices: [
      { text: '🧳 Finire di disfare i borsoni', next: 'a3_valigie' },
      { text: '🏖 Al mare', next: 'a4' },
    ],
  },

  a3_valigie: {
    location: 'bnb',
    caption: 'L\'inventario dei borsoni',
    text: `Svuotare i borsoni su un letto è un rituale di coppia che dice tutto di una coppia.

Claudia: tre costumi, il beauty, la macchina fotografica vera, la GoPro con la custodia da sessanta metri, un'asta telescopica comprata per ridere, il microfono a clip dei video, il ring light "che magari faccio due storie dalla terrazza", e il phon che non serviva.

Gaetano: due maschere identiche (**due**), due paia di **pinne**, due **boccagli** ancora nella busta del negozio, un coltellino nel portachiavi, il caricatore, un quaderno, e — nel fondo, avvolti in una calza — la sua fede e quella di Claudia, che in mare si tolgono e si tengono al collo, dal 2019, da quando lui l'ha perduta per venti minuti nella sabbia di Serapo ed è diventato insopportabile.

Tre pezzi, e ognuno fa una cosa diversa. La **maschera** trasforma il fondo in una cosa che si vede: e il problema di Claudia non è mai stata l'acqua, è il non vedere. Il **boccaglio** toglie il gesto che rovina tutto — quello di alzare la testa per respirare, che è il gesto della paura travestito da gesto tecnico: col boccaglio puoi tenere la faccia dentro e continuare a guardare, e respiri come se fossi a letto. Le **pinne** non servono ad andare veloce: servono a poter tornare. Con le pinne la distanza smette di essere un muro e diventa un numero, e i numeri Claudia li sa gestire.

> Claudia: *(tenendo su l'asta telescopica con due dita)* "Perché ho portato questa?"

> Gaetano: "Per i contenuti."

> Claudia: "Non faccio contenuti in vacanza."

> Gaetano: "Lo dici ogni anno."

> Claudia: "E ogni anno è vero fino al secondo giorno." *(butta l'asta sul letto, sopra la GoPro)* "Vabbè. Metti tutto in un angolo che poi si vede."

Poi guarda le due maschere. Le prende, una in ogni mano, e le tiene su come si tengono due cose che pesano lo stesso. Poi guarda i due boccagli ancora nella busta, con lo scontrino dentro.

> Claudia: "Due maschere, due pinne, due boccagli."

> Gaetano: "Ho capito, basta—"

> Claudia: "No, no. Ti sto dicendo grazie." *(legge lo scontrino, e la data la becca in pieno: è di marzo)* "Marzo, Gaetà. Li hai comprati a marzo."

> Gaetano: "Erano in saldo."

> Claudia: "Erano in saldo." *(si mette la maschera sulla fronte, ridicola, e non se la toglie)* "Andiamo a fare questo bagno del cazzo."

**(Oggetti: tutta la roba della vacanza. 🔧 Nel Zaino, adesso, c'è un bottone "Combinare": nessuno vi ha dato istruzioni. Arrangiatevi, come tutti.)**`,
    item: 'microfono',
    item2: 'gopro',
    gold: 1,
    sets: { valigie_fatte: true },
    choices: [
      { text: '🎒 Prendere anche il resto: asta, coltellino, le due fedi', once: true, item: 'asta_selfie', item2: 'coltello', next: 'a3_valigie2' },
      { text: '🏖 Al mare, che il sole scende', next: 'a4' },
    ],
  },

  a3_valigie2: {
    location: 'bnb',
    caption: 'Le fedi e il resto',
    text: `Le fedi vengono fuori dalla calza, e Claudia fa quella cosa che fa: se le infila entrambe al pollice per non perderle mentre cerca il filo.

> Claudia: "Il nylon dov'è? Quello da pesca."

> Gaetano: "Non l'ho portato."

> Claudia: "E come le teniamo al collo?"

> Gaetano: *(già in piedi verso la porta)* "Lo chiedo ad Ada. Su un'isola il filo da pesca ce l'hanno anche in bagno."

Torna con trenta metri di nylon 0,60, un sorriso e una notizia.

> Gaetano: "Ada dice che se ci serve un pescatore per andare a Santo Stefano dobbiamo cercare Ciro, al terzo pontile. E ha detto una cosa strana."

> Claudia: "Quanto strana?"

> Gaetano: "Ha detto: 'Ciro ci va, ma non ci resta dopo le sei.'"

**(Oggetti: FILO DI NYLON, il beauty di Claudia con dentro un PRESERVATIVO di Barcellona, e le DUE FEDI. 🫁 Fiato +1.)**`,
    item: 'filo_nylon',
    item2: 'preservativo',
    gold: 1,
    sets: { sa_di_ciro: true },
    choices: [
      { text: '💍 Prendere anche le fedi, e portarle al mare come sempre', once: true, item: 'anello_gaetano', item2: 'anello_claudia', next: 'a4' },
      { text: '🏖 Al mare', next: 'a4' },
    ],
  },

  a3_ada: {
    location: 'bnb',
    caption: 'Il caffè con Ada',
    text: `Ada fa il caffè con la moka da sei, e ne versa tre tazzine: due per loro, una per sé, e si siede sulla terza sedia di plastica che tira su dal muretto.

Parla dell'isola come parlano quelli che ci sono nati: con affetto, senza incanto. L'acqua che d'estate va razionata. Il traghetto che se c'è libeccio non parte e ti tocca restare. La scuola con undici bambini. Il carcere là davanti, che "ora ci fanno le visite guidate, e mio marito dice che è come far pagare il biglietto a casa del morto".

> Claudia: "Lei ci è mai stata? A Santo Stefano."

> Ada: "Una volta. A scuola, nel '77." *(gira lo zucchero)* "Mai più."

> Gaetano: "Brutto?"

> Ada: *(e ci pensa, e la risposta che dà è meglio di qualunque storia di fantasmi)* "No. È il posto più ordinato che ho visto in vita mia. Tutte le celle uguali, tutte alla stessa distanza dal centro, tutte con la porta girata verso lo stesso punto. Ordinatissimo." *(beve)* "Quello è il brutto. Che è ordinato. Come una cosa progettata da uno che ci ha pensato bene."

Il caffè è forte, denso, di quelli che ti raddrizzano la schiena.

> Ada: *(alzandosi, tazzine in mano)* "Andate al mare che c'è ancora luce. E se domani volete vedere le cisterne, l'ingresso è dietro la chiesa: dite che vi manda Ada."

**(Oggetto: il CAFFÈ DELLE PARRACINE — se una nota vi resta in testa, questo la porta via. 🫁 Fiato +2.)**`,
    item: 'caffe_parracine',
    gold: 1,
    heal: 4,
    sets: { ada_amica: true },
    choices: [
      { text: '🏖 Al mare, con la schiena raddrizzata', next: 'a4' },
      { text: '🗝 Chiedere ad Ada delle quattro cisterne murate', once: true, next: 'a3_ada2' },
    ],
  },

  a3_ada2: {
    location: 'bnb',
    caption: 'Le quattro murate',
    text: `Ada si ferma sulla porta con le tazzine in mano.

> Ada: "Le altre quattro."

> Gaetano: "Al museo ci hanno detto che sono state murate nell'Ottocento. O prima."

> Ada: *(e per la prima volta da quando l'avete conosciuta non risponde subito)* "Mio padre ci giocava dentro a una, da ragazzo. Negli anni Cinquanta. Diceva che c'era un'apertura dietro l'orto dei Coraggio, e loro ci scendevano coi cerini." *(posa le tazzine sul tavolino, che vuol dire che la conversazione continua)* "Poi un anno l'hanno chiusa e mio padre non ha mai detto perché."

> Claudia: "Non l'ha mai detto o non lo sapeva?"

> Ada: "Non l'ha mai detto." *(e guarda Claudia con un rispetto nuovo, perché la domanda era giusta)* "Mio padre era uno che raccontava tutto, signora. Tutto. Duemila storie. Quella no."

Riprende le tazzine.

> Ada: "Comunque adesso lì sopra c'è il parcheggio dei motorini. Se cercate un buco, cercate sotto il cemento." *(sulla porta)* "E cercatelo di giorno."

**(🫁 Fiato +2. Il Quaderno registra: c'era un'apertura dietro l'orto dei Coraggio, e negli anni Cinquanta l'hanno chiusa.)**`,
    gold: 1,
    sets: { sa_apertura_coraggio: true },
    choices: [
      { text: '🏖 Al mare, finché c\'è luce', next: 'a4' },
    ],
  },

  /* ==================== CALA NAVE — IL PRIMO BAGNO ==================== */

  a4: {
    location: 'cala',
    caption: 'Cala Nave — ore 19:05',
    text: `Cala Nave a quest'ora è la cosa più bella che l'estate sa fare.

Il sole è basso e arancione, la sabbia è ancora calda sotto e fresca sopra, e in acqua ci sono trenta persone che fanno le cose che fa la gente al mare alle sette di sera: due ragazzi che giocano a racchettoni male, una famiglia che chiama un bambino che non risponde, un signore che nuota lentissimo e perfetto parallelo alla riva, avanti e indietro, come fa da quarant'anni.

La sabbia è **scura**, di quelle vulcaniche, e mescolata a un'infinità di sassolini che sotto i piedi nudi sono una piccola vendetta. A destra, staccato dalla riva, c'è lo scoglio che dà il nome alla baia: da lontano, con quella prua bassa e quel fianco lungo, sembra davvero **una nave** che si è messa lì e ha spento i motori.

Il mare è calmo. Trasparente sui primi metri, coi sassi sul fondo che si vedono uno per uno, e poi — a una ventina di metri dalla riva — quella riga dove l'azzurro cambia colore e diventa **blu**. Non un blu più scuro: un altro blu. E dietro, all'orizzonte, la gobba di Santo Stefano che da qui sembra piccola.

Claudia si spoglia, piega il vestito, mette il telo. Fa tutte queste cose con la calma di una che sta prendendo tempo, e Gaetano lo sa e non dice niente, perché non dire niente è l'unica cosa utile che sa fare in questi momenti.

> Claudia: "Dove tocca fino a dove?"

> Gaetano: *(e qui c'è il momento in cui potrebbe dirle una bugia gentile, e non lo fa)* "Fino alla riga scura tocchi. Dopo la riga no." *(pausa)* "Qui scende presto, amore. Non a strapiombo, ma presto: è per questo che a Cala Nave ci vengono quelli che nuotano." "

> Claudia: "E la boa?"

La boa gialla è a ottanta metri. Sta lì che fa la boa, gialla, tranquilla, senza sapere di essere il centro di questa vacanza.

> Claudia: "Ok."

> Gaetano: "Ok cosa?"

> Claudia: "Ok niente. Ho detto ok." *(entra in acqua fino alle caviglie)* "Vieni?"

**(💪 TENUTA +4. Primo bagno fatto: il gioco lo segna, perché tutto quello che verrà dopo si misura da qui — dal fatto che il 27 agosto, a Cala Nave, alle sette meno un quarto, Claudia è entrata in acqua di sua volontà.)**`,
    heal: 4,
    sets: { primo_bagno: true },
    choices: [
      { text: '🏊 Entrare insieme, e restare dove si tocca. Basta e avanza', next: 'a5' },
      { text: '🤿 Provare subito le maschere sugli scogli a destra: pesci, polpi, cose belle', once: true, next: 'a4_maschere' },
      /* Le pinne servono a poter TORNARE: quindi rendono raggiungibile una cosa lontana
         di traverso, che per chi ha paura del profondo è un'altra faccenda dal profondo. */
      { text: '🐟 Con le pinne, fino allo scoglio della nave: ottanta metri di traverso, non di profondità',
        requires: { item: 'pinne' }, once: true, next: 'a4_scoglio' },
      { text: '🍺 Prima una birra al chiosco: il mare non scappa', once: true, heal: 3, gold: 1, next: 'a5' },
    ],
  },

  /* LO SCOGLIO DELLA NAVE — quello che dà il nome alla baia. Le pinne cambiano una cosa
     sola e la cambiano del tutto: la distanza smette di essere un muro e diventa un
     numero. Ottanta metri di traverso non sono ottanta metri di profondità, e per
     Claudia la differenza è tutto. */
  a4_scoglio: {
    location: 'cala',
    caption: 'Lo scoglio della nave — ore 19:20',
    stinger: 'apnea',
    gold: 2, heal: 3,
    sets: { scoglio_nave: true },
    text: `Le pinne si infilano con quella manovra scema che si fa da seduti sul bagnasciuga, bagnando prima il tallone, e la prima pinneggiata dice subito perché costano quello che costano: con due gambe che non fanno quasi niente, ti sposti.

Ottanta metri. Con le pinne sono venti secondi di andata e venti di ritorno, e Claudia lo calcola prima di partire, ad alta voce, perché è così che funziona la sua testa.

> Claudia: "Venti e venti. Quaranta secondi in tutto, se torniamo subito."

> Gaetano: "Quaranta secondi."

> Claudia: "E sotto quanto c'è?"

> Gaetano: *(e di nuovo la verità, che è l'unica cosa che gli riesce bene)* "In mezzo otto, nove metri. Sotto lo scoglio meno: quattro."

> Claudia: "Quindi si passa sopra nove metri di niente."

> Gaetano: "Sopra nove metri di ACQUA. Che poi è una cosa che regge: ti tiene su meglio un metro di mare che un metro di aria."

Lo scoglio della nave, da vicino, non somiglia più a una nave: è tufo mangiato dal sale, con la cintura nera delle patelle e sopra due gabbiani che si spostano di mezzo metro per farvi capire che vi hanno visti e non gliene importa.

Ma la cosa vera è sotto. Il fianco scende a gradoni, e ogni gradone è un condominio: nuvole di castagnole nere, un branco di occhiate che gira tutto insieme come una cosa sola, i ricci nelle fessure, e nell'ombra sotto un tetto di roccia due saraghi grossi, fermi, con l'aria di chi paga l'affitto da anni.

Claudia tiene la faccia dentro. Non alza la testa — col boccaglio non serve, e non alzare la testa vuol dire non ricominciare da zero a immaginare. Guarda per due minuti interi, che per lei è un record che nessuno registrerà mai.

Poi tira su la maschera e dice la frase che Gaetano si scriverà sul quaderno stasera:

> Claudia: "Non è profondo. È **alto**. Siamo noi che stiamo sopra."

**(🫁 Fiato +2, 💪 TENUTA +3. Ottanta metri di traverso, andati e tornati: per Claudia la distanza è diventata un numero.)**`,
    choices: [
      { text: '🌊 Verso la riga scura, adesso che le gambe sanno di funzionare', next: 'a5' },
      { text: '🏖 A riva, e basta per oggi: era già tanto', next: 'a5' },
    ],
  },

  a4_maschere: {
    location: 'cala',
    npc: ['polpo'],
    caption: 'Le maschere, la prima volta',
    text: `Gli scogli a destra della cala, dove l'acqua è alta un metro e mezzo e piena di roba.

E qui succede la cosa bella: Claudia, con la maschera, **guarda**. Perché il suo problema non è mai stata l'acqua: è il non vedere. E con dieci centimetri di vetro temperato davanti agli occhi, il fondo diventa una cosa nitida, misurabile, finita — e sopportabile.

Poi si mette il boccaglio, e succede la seconda cosa, che è più piccola e più grossa. Senza boccaglio, per respirare devi alzare la testa: e ogni volta che la alzi perdi il fondo di vista per un secondo, e in quel secondo la testa ricomincia da zero a immaginare cosa c'è. È il gesto della paura travestito da gesto tecnico, e lo fa da quando aveva sei anni.

Col boccaglio la faccia resta dentro. Il respiro va avanti da solo, come a letto. E Claudia scopre — in un metro e mezzo d'acqua, a Cala Nave, il primo pomeriggio di una vacanza di quattro giorni — che si può guardare una cosa **finché non si è finito di guardarla**.

Sotto di loro c'è un mondo che fa il suo lavoro senza spettatori: una nuvola di castagnole nere che si apre e si richiude come una mano, due saraghi che stanno immobili sotto un tetto di roccia con l'aria di due che aspettano il proprio turno, un polpo — un polpo VERO — che li guarda da un buco con quell'occhio orizzontale, incredibilmente intelligente, e decide che non vale la pena spostarsi.

Claudia esce a galla, si tira su la maschera, e ha una faccia che Gaetano non le vede da anni.

> Claudia: "C'È UN POLPO."

> Gaetano: "Lo so, l'ho visto—"

> Claudia: "C'È UN POLPO E MI HA GUARDATA."

Ridono come idioti, con l'acqua che entra in bocca. Il sole è arancione. Sono le sette e venti di un giovedì di agosto e per un quarto d'ora, in questa vacanza, non c'è nient'altro.

**(💪 TENUTA piena. 🫁 Fiato +3. Segnatevelo: dopo, quando sarà brutto, sarà questo il quarto d'ora a cui tornerete.)**`,
    gold: 2,
    heal: 8,
    sets: { visto_polpo: true },
    choices: [
      { text: '🌊 Verso la riga scura, piano, insieme', next: 'a5' },
    ],
  },

  a5: {
    location: 'cala',
    caption: 'La riga dove cambia colore',
    text: `Nuotano fianco a fianco fino a dove si tocca appena, con l'acqua alla clavicola e i piedi che ogni tanto trovano un sasso e ogni tanto no.

E poi c'è la riga.

Non è una cosa immaginaria: è un vero cambio di colore, netto, dove il fondo di sassi bianchi finisce e comincia la posidonia — quella prateria verde scuro, mossa, che copre tutto e non lascia vedere niente di quello che c'è sotto le foglie.

Claudia si ferma. Il suo respiro cambia. Non di molto: Gaetano lo sente perché è a mezzo metro e perché lo conosce, quel cambio.

> Claudia: "Non è la profondità."

> Gaetano: "Lo so."

> Claudia: "È che non SI VEDE. Sotto quella roba può esserci qualunque cosa e io—"

> Gaetano: "Lo so, amore."

Restano lì, sul confine, con trenta persone che ridono alle loro spalle e la boa gialla a sessanta metri davanti.

> Claudia: *(e la sua voce fa quella cosa dolce e feroce che fa quando decide)* "Ok. Dammi la mano. Non per aiuto. Per riferimento."

Le prende la mano.

*(Il fondo scompare sotto un tappeto verde. La boa è là. Il mare, sopra i quindici metri, è ancora solo un mare.)*`,
    choices: [
      { text: '🟡 Provare ad arrivare alla boa. Adesso.', tag: 'Prova di Costituzione — CD 12', check: { stat: 'COS', dc: 12, success: 'a5_boa', fail: 'a5_indietro', successHeal: 4, failDamage: 1 } },
      { text: '🫂 Bastare così: restare sul confine cinque minuti, mano nella mano', once: true, heal: 6, gold: 1, next: 'a6' },
      { text: '🔦 Tornare a riva a prendere la torcia: vedere COSA c\'è sotto la posidonia', requires: { item: 'torcia_sub' }, once: true, next: 'a5_torcia' },
    ],
  },

  a5_boa: {
    location: 'cala',
    caption: 'La boa',
    stinger: 'victory',
    text: `Ce la fa.

Sessanta metri, con il fondo che sotto è solo verde e poi solo blu, e la mano di Gaetano che ogni tanto perde e ritrova. Respira male, ride male, bestemmia due volte contro la boa che non si avvicina mai — e poi la tocca.

La tocca con tutte e due le mani, ci si appende, e la plastica gialla è calda di sole e scivolosa di alghe, ed è la cosa più solida dell'universo.

> Claudia: "PORCA PUTTANA."

> Gaetano: *(arrivato mezzo secondo dopo)* "Sei alla boa."

> Claudia: "PORCA PUTTANA, GAETANO, SONO ALLA BOA."

Sotto di loro ci sono ventidue metri d'acqua. Claudia lo sa e per la prima volta in vita sua non le sta rovinando il momento, perché il momento è troppo grosso.

Si abbracciano attaccati a una boa, ridicoli, con l'acqua in bocca, a sessanta metri dalla riva di Cala Nave.

E qui il gioco deve dire una cosa, e la dice adesso perché dopo non ci sarà tempo: **questo è vero, questo è avvenuto, e niente di quello che accade nei prossimi tre giorni lo cancella.**

> Gaetano: "Torniamo?"

> Claudia: "Un secondo. Solo un secondo così."

Un secondo così.

E dentro quel secondo, dal basso — da sotto i loro piedi che pedalano nel blu — arriva **una nota**.

Una sola. Bassa, lunga, pulita, come una corda di contrabbasso pizzicata a venti metri di profondità. Dura due secondi e mezzo e finisce.

Gaetano non la sente.

Claudia sì.

**(🫁 Fiato +4 e TENUTA piena: ce l'ha fatta, e questo non si cancella. Ma il Coro ha appena sentito la sua voce dire "porca puttana" a ventidue metri dal fondo — e non l'ha mai avuta, una voce così.)**`,
    gold: 2,
    heal: 10,
    attenzione: 1,
    sets: { boa_raggiunta: true, prima_nota: true },
    choices: [
      { text: '🏖 Tornare a riva insieme, senza fretta', next: 'a6' },
      { text: '👂 Claudia si ferma: "Aspetta. Hai sentito?"', once: true, next: 'a5_nota' },
    ],
  },

  a5_nota: {
    location: 'cala',
    caption: 'La prima nota',
    text: `> Claudia: "Aspetta. Aspetta aspetta. Hai sentito?"

> Gaetano: "Cosa?"

> Claudia: *(una mano sulla boa, l'altra che gli fa segno di stare fermo)* "Una nota. Bassa. Tipo... tipo un contrabbasso. Da sotto."

Gaetano mette la testa sotto. Ascolta. Il mare fa il rumore che fa il mare da dentro: un frizzare continuo di bollicine, il ronzio lontano di un fuoribordo, il proprio battito.

Riemerge.

> Gaetano: "Un motore. C'è un gommone a tre-quattrocento metri, il suono sott'acqua viaggia a millecinquecento metri al secondo e rimbomba, sembra vicinissimo—"

> Claudia: "Non era un motore."

> Gaetano: "Amore, i motori sott'acqua sembrano—"

> Claudia: *(e lo interrompe con una calma che è peggio di un urlo, perché è la sua calma da lavoro, quella che usa quando ha visto una cosa che gli altri non hanno visto ancora)* "Gaetano. Era una NOTA. Aveva un attacco, una durata e una fine. Aveva un'ALTEZZA. I motori non hanno l'altezza, hanno il rumore." *(pausa)* "E l'ho sentita con le orecchie fuori dall'acqua."

Il sole tocca l'orizzonte. Alle loro spalle, a Cala Nave, una madre chiama un bambino per la terza volta, con quel tono che al terzo tentativo diventa serio.

> Gaetano: *(e non lo dice per gentilezza, lo dice perché ha appena deciso una cosa)* "Ok."

> Claudia: "Ok?"

> Gaetano: "Ok, era una nota. Non ti dico che ti sei sbagliata: non ti sei mai sbagliata su una cosa che hai sentito." *(guarda l'acqua nera sotto i loro piedi)* "Domani porto il microfono."

**(🫁 Fiato +1. Il Quaderno registra la prima nota. E Gaetano ha appena scelto di CREDERLE — che è, alla fine, l'unica cosa che tiene in piedi questa storia.)**`,
    gold: 1,
    attenzione: 1,
    sets: { i_prima_nota: true, gaetano_crede: true },
    choices: [
      { text: '🏖 A riva. E domani si porta il microfono', next: 'a6' },
    ],
  },

  a5_indietro: {
    location: 'cala',
    caption: 'Non stasera',
    damage: 1,
    text: `A metà strada il corpo dice no.

Non è la paura in senso nobile: è il diaframma che si chiude, il respiro che diventa corto e sbagliato, e la sensazione precisa e stupida che sotto la posidonia ci sia una cosa che sta guardando in su.

> Claudia: "No. No no no, torniamo."

Tornano. Otto bracciate e i piedi trovano il sasso, e i piedi sul sasso sono la cosa più bella del mondo.

Claudia resta con l'acqua alla vita, le mani sulle ginocchia, il respiro che si aggiusta piano. Gaetano le sta accanto e non dice niente di utile, che è la cosa giusta.

> Claudia: *(quando torna a respirare)* "Che rottura di cazzo."

> Gaetano: "Sei arrivata più avanti dell'anno scorso."

> Claudia: "Non è vero."

> Gaetano: "È vero. L'anno scorso a Ponza sei arrivata al secondo scoglio. Oggi hai fatto trentacinque metri oltre la riga." *(e lo dice come dice i numeri: senza consolazione, per esattezza)* "Trentacinque metri, Claudia. Li ho contati."

Claudia lo guarda. Poi gli mette la fronte sulla spalla, in mezzo al mare, con trenta persone attorno che non guardano.

> Claudia: "Domani ci riprovo."

> Gaetano: "Lo so."

**(TENUTA −1: il corpo presenta il conto. Ma trentacinque metri sono trentacinque metri, e domani è un altro giorno.)**`,
    sets: { boa_tentata: true },
    choices: [
      { text: '🏖 A riva, e stasera pizza', next: 'a6' },
      { text: '🟡 Riprovare adesso, subito, prima di pensarci', tag: 'Prova di Costituzione — CD 13', check: { stat: 'COS', dc: 13, success: 'a5_boa', fail: 'a6', failDamage: 2 } },
    ],
  },

  a5_torcia: {
    location: 'cala',
    caption: 'Cosa c\'è sotto la posidonia',
    text: `Gaetano torna con la torcia da ventotto euro, e la accende sotto il pelo dell'acqua, e la punta giù.

Il fascio bianco entra nel verde. E la posidonia — che da sopra è un tappeto uniforme e minaccioso — diventa una FORESTA: steli alti mezzo metro che si muovono tutti nello stesso senso, e in mezzo, sul fondo di sabbia chiara tra le radici, un mondo di roba normalissima.

Un cetriolo di mare. Un riccio. Una stella marina che sta andando in qualche posto con una lentezza offensiva. Due nasello piccoli che scappano dalla luce e poi tornano perché la luce, per un pesce, è dove sta il mangiare.

Claudia guarda per due minuti interi senza dire una parola.

> Claudia: *(riemergendo)* "Non c'è niente."

> Gaetano: "C'è tutto. È solo che è tutto piccolo e legittimo."

> Claudia: *(si rimette la maschera, poi se la rialza, e la frase le esce diversa da come se l'aspettava)* "Gaetà, mi rendo conto adesso di una cosa scema. Io non ho paura di quello che c'è sotto." *(guarda il blu, oltre)* "Ho paura di quello che NON SO se c'è. È diverso. E si cura guardando."

> Gaetano: *(e la guarda con la faccia che fa quando lei dice una cosa che lui non avrebbe saputo dire)* "Questa scrivila."

> Claudia: "Vaffanculo."

> Gaetano: "Scrivila davvero."

**(🫁 Fiato +3, TENUTA +4. E il gioco vi dice una cosa che vale per tutte le prossime settanta scene: guardare COSTA, e paga sempre.)**`,
    gold: 2,
    heal: 4,
    sets: { guardato_sotto: true },
    choices: [
      { text: '🟡 E adesso la boa, con la torcia in mano', tag: 'Prova di Costituzione — CD 10', check: { stat: 'COS', dc: 10, success: 'a5_boa', fail: 'a5_indietro', successHeal: 2, failDamage: 1 } },
      { text: '🏖 A riva: per oggi basta, ed è già tanto', next: 'a6' },
    ],
  },

  /* ==================== LA SERA ==================== */

  a6: {
    location: 'paese',
    caption: 'Il paese, di sera — ore 21:30',
    text: `Il paese di sera è una cosa che ti fa pensare di volerci vivere.

Piazza Castello, i tavolini fuori, i bambini che alle nove e mezza corrono ancora come se fosse mezzogiorno, i vecchi sulle panchine schierati come una giuria. Odore di fritto, di gelsomino e di gasolio da barca, che è l'odore delle isole.

Mangiano alla **Terrazza di Mimì**, in Piazza Castello: il tavolo fuori, la ringhiera, e sotto la ringhiera l'isola che scende verso il porto. Spaghetti con le lenticchie di Ventotene — che sono minuscole, scure, e buone in un modo che non ha senso per una lenticchia — pesce alla brace, vino bianco freddo in caraffa che si appanna.

Claudia racconta la storia della boa a tre tavoli diversi. Il cameriere, quando sente, le porta un limoncello che non aveva ordinato.

> Il cameriere: "Alla boa gialla di Cala Nave, signora?"

> Claudia: "Alla boa gialla di Cala Nave."

> Il cameriere: "Brava. Mia moglie ci ha messo dieci anni." *(posa il limoncello)* "Offre la casa."

Alla fine sono le undici, sono pieni, sono felici, ed è quel tipo di stanchezza buona che ti prende dopo un giorno di sole e di acqua salata.

Sulla via del ritorno passano davanti al forno che sta già impastando per domani: la luce accesa, la radio bassa, un ragazzo con le mani in un mastello. Il forno vende un sacchetto di taralli caldi anche a mezzanotte, se ci sei.

**(💪 TENUTA piena, 🫁 Fiato +3. Questa è la sera di cui parlerete per anni. Il gioco ve la lascia intera.)**`,
    gold: 2,
    heal: 12,
    sets: { cena_paese: true },
    choices: [
      { text: '🥨 Un sacchetto di taralli caldi per la terrazza', once: true, item: 'taralli', gold: 1, next: 'a7' },
      { text: '🏠 Su alle Parracine: la terrazza aspetta', next: 'a7' },
      { text: '⚓ Fare due passi al porto: c\'è ancora gente sui pontili', once: true, next: 'a6_porto' },
    ],
  },

  a6_porto: {
    location: 'porto',
    caption: 'Il terzo pontile — ore 23:15',
    text: `Il porto di notte è più bello che di giorno. L'acqua nera e liscia dentro la cava di tufo, le luci che si rompono in mille pezzi giallo, e una quiete piena di rumori piccoli: cime che scricchiolano, un motore che gira al minimo, qualcuno che ride su una barca.

Al terzo pontile, seduto su una cassetta di polistirolo, un vecchio sta sistemando una rete. Settanta e passa, mani enormi, canottiera, occhiali da vista tenuti insieme col nastro adesivo. Lavora con la testa bassa e le dita che vanno da sole, come chi fa una cosa da sessant'anni.

> Gaetano: "Buonasera. Cerchiamo Ciro. Ci ha detto Ada, delle Parracine."

Il vecchio non alza la testa.

> Ciro: "Ciro sono io. Per Santo Stefano?"

> Gaetano: "Come lo sa?"

> Ciro: "Perché a quest'ora chi mi cerca vuole due cose: il pesce o Santo Stefano. E voi il pesce non lo comprate." *(un nodo, un altro)* "Quaranta euro andata e ritorno. Partiamo alle nove, torniamo per l'una."

> Claudia: "Perché per l'una?"

E qui Ciro alza la testa. Lo fa piano, e li guarda a lungo — prima lei, poi lui, poi ancora lei — e la sua faccia non ha niente di misterioso: ha la faccia di un vecchio che sta valutando quanto valga la pena parlare.

> Ciro: "Perché io là non ci resto dopo le sei di sera. È una cosa mia. Non domandate."

> Claudia: "E se domandiamo?"

> Ciro: *(torna alla rete)* "Se domandate vi dico di no e vi trovate un altro. Ce ne stanno tre, di barche." *(pausa lunga, un nodo)* "Ma gli altri due vi portano e non vi raccontano niente. Io non vi racconto niente e in più vi riporto indietro. Fate voi."

Il mare, dentro il porto romano, non fa una piega. Da qualche parte oltre l'imboccatura, dove l'acqua diventa nera per davvero, qualcosa si muove e non fa rumore.

**(🫁 Fiato +2. Appuntamento con Ciro: sabato, nove del mattino. E "non domandate" è la cosa più interessante che vi abbiano detto oggi.)**`,
    gold: 1,
    sets: { ciro_conosciuto: true, appuntamento_ciro: true },
    choices: [
      { text: '🤝 Accettare: quaranta euro, sabato alle nove', next: 'a7' },
      { text: '🎣 Chiedergli se ha una lenza e un amo grosso da vendere', once: true, item: 'lenza', item2: 'amo_grande', gold: -1, next: 'a7' },
    ],
  },

  /* ==================== LA NOTTE ==================== */

  a7: {
    location: 'terrazza',
    caption: 'La terrazza — ore 00:40',
    text: `La terrazza delle Parracine a mezzanotte e quaranta è il posto migliore in cui siano stati quest'anno.

Il paese sotto è quasi spento. Il mare è una lastra nera che si muove appena, e in mezzo — a tre chilometri — la sagoma di Santo Stefano non è più un ferro di cavallo: è solo una gobba scura contro un cielo che ha più stelle di quante ne servano.

Sono sulle due sedie di plastica coi piedi sul muretto. Claudia ha addosso la felpa di Gaetano. C'è il sacchetto dei taralli, se lo hanno preso, e comunque c'è la parte migliore di tutte, che è il non dire niente.

Poi, in paese, comincia un cane.

Uno solo, giù verso il porto: quattro abbai secchi. Pausa. E poi risponde un altro, più vicino. Poi tre insieme. Poi tutti — otto, dieci cani sparsi su tutta l'isola che abbaiano nello stesso momento, e non è il casino disordinato dei cani: **entrano uno alla volta, ognuno al suo turno, e si sovrappongono.**

Dura quaranta secondi. Poi si fermano tutti insieme, sulla stessa battuta, e torna un silenzio che sembra più silenzioso di prima.

> Gaetano: "Ada l'aveva detto. Si mettono d'accordo."

> Claudia: *(che è rimasta con il tarallo a mezz'aria)* "Amore. Si sono fermati insieme."

> Gaetano: "Sì."

> Claudia: "I cani non si FERMANO insieme. I cani si stancano uno per uno."

Restano fermi ad ascoltare il niente. Passa un motorino sulla strada di sopra. Il mare fa il suo.

E poi, dal basso — non dal mare: dal BASSO, da sotto la terrazza, da sotto il muretto a secco, da sotto il tufo dell'isola — arriva **la nota**.

La stessa di Cala Nave. Bassa, lunga, pulita. Due secondi e mezzo.

Stavolta la sentono in due.

**(⚠️ 🎵 L'attenzione del Coro sale per la prima volta: non perché abbiate fatto qualcosa, ma perché adesso la sentite in due, e una cosa sentita in due è una cosa che ha attaccato.)**`,
    silenzio: true,
    stinger: 'coro',
    attenzione: 1,
    sets: { nota_da_terra: true },
    choices: [
      { text: '🎙 "Il microfono. Vado a prendere il microfono."', next: 'a8' },
      { text: '🫂 Non muoversi. Restare fermi, vicini, e aspettare che passi', once: true, heal: 4, next: 'a8' },
      { text: '☕ Scendere da Ada: la luce in cucina è ancora accesa', requires: { flag: 'ada_amica' }, once: true, next: 'a7_ada_notte' },
    ],
  },

  a7_ada_notte: {
    location: 'bnb',
    caption: 'Ada, all\'una di notte',
    text: `La luce della cucina è accesa. Ada è in piedi davanti al lavello con un bicchiere d'acqua in mano, e non sta bevendo: sta ferma.

Quando li sente entrare non si spaventa. Si gira piano, e ha la faccia di chi è stato interrotto in una cosa che fa spesso da sola.

> Ada: "L'avete sentito."

Non è una domanda.

> Claudia: "Cos'era?"

> Ada: *(beve un sorso, appoggia il bicchiere)* "Non lo so. Lo sento da quando sono nata. Mia madre lo chiamava 'la corda'." *(si asciuga le mani a un canovaccio che non è bagnato)* "Tre-quattro volte l'anno, sempre d'estate, sempre di notte. Prima i cani, poi la corda. E il giorno dopo il mare è calmissimo."

> Gaetano: "E la gente dell'isola cosa dice?"

> Ada: "La gente dell'isola non ne parla, dottore. Non perché ha paura: perché non c'è niente da dire. È come il vento di tramontana: c'è. Che ne devo parlare?" *(e qui appoggia le mani sul tavolo, e cambia tono, e diventa la cosa più seria che abbiate sentito oggi)* "Quello di cui si parla è un'altra cosa. Si parla di quelli che dopo la corda vanno a vedere."

> Claudia: "E cosa gli succede?"

> Ada: "Niente. Tornano." *(pausa)* "Ma tornano che ci pensano sempre. Mio padre ci pensava sempre. Ci ha pensato per cinquant'anni, ogni giorno, fino all'ultimo, e l'ultima cosa che mi ha detto in ospedale non è stata su di me né su mio figlio." *(prende il bicchiere e lo lava, e adesso non li guarda più)* "Andate a dormire. Domani c'è il sole."

**(🫁 Fiato +3. Sapete tre cose: si chiama "la corda", viene tre-quattro volte l'anno, e chi va a vedere non smette più di pensarci. Il che vi dice esattamente cosa state per fare.)**`,
    gold: 2,
    sets: { sa_la_corda: true },
    choices: [
      { text: '🛏 A dormire. Domani c\'è il sole', next: 'a9' },
      { text: '🎙 No: il microfono. ADESSO', next: 'a8' },
    ],
  },

  a8: {
    location: 'terrazza',
    caption: 'Il microfono, all\'una e mezza',
    text: `Il microfono a clip di Claudia, il cavetto, il telefono in modalità registrazione, e Gaetano che cala il tutto oltre il muretto a secco fino a toccare la terra dell'orto sotto.

> Gaetano: "Non è un idrofono, non è impermeabile e sto registrando la terra. Ma se la nota viene da sotto, la terra la trasmette meglio dell'aria: il suolo è un conduttore migliore, per le basse frequenze."

> Claudia: "Quindi funziona?"

> Gaetano: "Quindi vale la pena provare, che è un'altra cosa."

Registrano ventidue minuti di niente. Cicale, un cane, il frigo di Ada che parte e si ferma. Claudia si addormenta sulla sedia di plastica con la felpa tirata sul mento.

Al minuto diciannove, sulla forma d'onda che Gaetano guarda sullo schermo, c'è un picco.

Lo isola. Lo riascolta in cuffia. E poi lo riascolta di nuovo, e poi una terza volta, e alla terza si accorge che sta trattenendo il respiro come si trattiene guardando in giù da un balcone alto.

Non è un rumore. È una nota — **sol basso, sostenuta, calante di un quarto di tono** — e non è sola: sotto, attaccata, ce n'è un'altra a distanza di un intervallo che non esiste sul pianoforte. Due note che non possono stare insieme e stanno insieme.

E poi, alla fine, dopo la nota, c'è mezzo secondo di una cosa che non è musica.

Gaetano si toglie le cuffie. Le rimette. Le toglie.

Poi guarda Claudia che dorme sulla sedia di plastica, con la bocca aperta e i capelli in faccia, e prende una decisione: gliela farà sentire domani. Non stanotte.

**(🎙 Registrazione salvata. E adesso Gaetano ha un DATO — e i dati, per lui, sono l'unica cosa che rende una paura affrontabile.)**`,
    gold: 1,
    attenzione: 1,
    sets: { registrata_nota: true, i_eco_misurata: true },
    choices: [
      { text: '🛏 Portarla dentro e mettersi a dormire', next: 'a9' },
      { text: '🎧 Riascoltare quel mezzo secondo finale. Ancora una volta.', once: true, next: 'a8_mezzosecondo' },
    ],
  },

  a8_mezzosecondo: {
    location: 'terrazza',
    caption: 'Mezzo secondo',
    silenzio: true,
    stinger: 'voce_amata',
    text: `Volume al massimo. Cuffie. Il cursore che torna indietro di mezzo secondo, ancora e ancora, su una fetta di forma d'onda larga come un'unghia.

Dopo la nota c'è un suono complesso, breve, articolato. Non è un pesce, non è una cima, non è il frigo. Ha una struttura.

Gaetano lo rallenta al venticinque per cento e lo riascolta.

E a un quarto di velocità, quel mezzo secondo diventa una parola.

È una parola di tre sillabe, detta da una voce di donna, con un accento che non è italiano ma non è nemmeno straniero: è italiano di un'altra epoca, con le vocali larghe e la erre appoggiata, il modo in cui parlano nei filmati dell'Istituto Luce.

La parola è **"Claudia"**.

Gaetano si toglie le cuffie con due mani. Le posa sul tavolino con la cura di uno che maneggia una cosa che scoppia. Il mare, sotto, non fa una piega. Claudia dorme sulla sedia di plastica a un metro da lui, e respira col naso, e non sa niente.

Lui resta seduto lì per undici minuti, a guardarla dormire, con il telefono in mano e una registrazione dentro.

Poi la sveglia piano — "amore, andiamo a letto" — e la porta dentro tenendola per le spalle, e non le dice niente.

**(⚠️ Non gliel'ha detto. Il gioco lo registra e ci tornerà: le cose non dette, in questa storia, hanno gli interessi.)**`,
    gold: 1,
    attenzione: 1,
    sets: { sa_il_nome: true, gaetano_ha_taciuto: true },
    choices: [
      { text: '🛏 A letto. E domani si vedrà', next: 'a9' },
    ],
  },

  a9: {
    location: 'bnb',
    caption: 'La stanza, ore 02:10 — fine del primo giorno',
    stinger: 'heal',
    text: `Il ventilatore a pale gira piano. Il lenzuolo è fresco, la finestra è aperta, entrano le cicale e l'odore del limone in vaso.

Claudia si addormenta in quattro minuti, come sempre, con una gamba fuori dal lenzuolo. Gaetano ci mette più tempo, come sempre.

Il primo giorno finisce così: con una boa raggiunta, un polpo che ha guardato Claudia negli occhi, una signora che pulisce fagiolini, un vecchio che non vuole domande, dieci cani che si sono fermati insieme e una nota bassa dentro il telefono.

Domani è venerdì 28 agosto. Il programma, quello scritto sul foglietto che Claudia ha attaccato allo specchio con il nastro, dice: **"le cisterne romane (dietro la chiesa, dire che ci manda Ada)"**.

E sotto, con un'altra penna, aggiunto stasera:

**"il microfono."**

**(🫁🫁 IL PRIMO GIORNO È CHIUSO. Dentro le parracine si dorme: TENUTA piena, mosse ricaricate. Fuori, sotto tre metri di tufo e ottanta metri d'acqua, una cosa che ha imparato un nome nuovo lo prova, piano, tutta la notte.)**`,
    gold: 1,
    sets: { giorno_27_chiuso: true },
    choices: [
      { text: '☀️ Venerdì 28 agosto: le cisterne', next: 'b0' },
    ],
  },
};
