/* ============ PANDATARIA — BLOCCO C: SABATO 29 AGOSTO ============
   SANTO STEFANO. Il panopticon, la cella 47, il cimitero dei detenuti.
   Ciro entra in squadra sul molo di Cala Rossano (CHECKPOINT).
   La cosa peggiore del gioco sta qui, ed è ordinata.
   Entrata: c0 (dal blocco B). Uscita unica fuori dal blocco: d0 (domenica 30).
   Regole di tono: docs/DESIGN.md §1, §2, §10. I nemici sono PIETOSI, non cattivi. */

const SCENE_C = {

  /* ==================== IL MOLO — CIRO DOMANDA ==================== */

  c0: {
    location: 'porto',
    caption: 'Molo di Cala Rossano — sabato 29 agosto, ore 08:52',
    text: `**Sabato 29 agosto, otto e cinquantadue. Molo di Cala Rossano.**

Ciro è a bordo da un'ora. La barca si chiama **Santa Candida**: sei metri di legno ridipinto tante volte che il bianco ha uno spessore, il fuoribordo tirato su, e sul fondo — sistemate come si sistema la roba quando sai che ti servirà — due giubbotti, una cassetta di attrezzi, una tanica, un secchio e una rete piegata come si piega una camicia buona.

Stessa canottiera di giovedì. Stessi occhiali tenuti insieme col nastro adesivo.

Non dice buongiorno. Guarda prima lei, poi lui, poi ancora lei. E poi fa la cosa che nessuno dei due si aspettava da un uomo che aveva chiuso il discorso in tre parole.

> Ciro: "Giovedì v'aggio ditto: non domandate." *(molla la cima dalla bitta e la tiene in mano senza posarla)* "Mo' domando io."

> Gaetano: "Cosa?"

> Ciro: "Che avete sentito." *(pausa)* "Giovedì notte i cani. Vi ho visti in terrazza, dalla barca: alle Parracine la luce si vede da qua. E stamattina state al molo alle nove meno dieci con la faccia di chi non ha dormito." *(e adesso li guarda in faccia per davvero, e non c'è niente di strano nei suoi occhi: c'è uno che ha deciso di smettere di non sapere)* "Signò. Che avete sentito."

Dietro di loro il traghetto delle nove carica quattordici persone e due cani. Un carrello di ghiaccio passa cigolando. È una mattina normalissima di fine agosto, e un vecchio di settantadue anni sta aspettando una risposta con una cima in mano.

**(🫁 Fiato: niente, per adesso. Ma per la prima volta in tre giorni qualcuno di quest'isola vi ha fatto una domanda invece di darvi un avvertimento — e le domande, qui, costano più degli avvertimenti.)**`,
    stinger: 'penna',
    choices: [
      { text: '💬 "Tutto. Dall\'inizio."', next: 'c0_racconto' },
      { text: '☕ "Prima un caffè. Al bar del molo, offriamo noi." E poi tutto', once: true, gold: 1, heal: 3, next: 'c0_racconto' },
      { text: '🚤 "Niente. Andiamo." (tenersi le cose per sé, e vedere se lui parla comunque)', sets: { ciro_muto: true }, next: 'c1' },
    ],
  },

  c0_racconto: {
    location: 'porto',
    caption: 'Il molo, ore 09:05 — quello che hanno sentito',
    text: `Glielo raccontano in piedi sul molo, tutti e due, interrompendosi come si interrompono le coppie: la nota a Cala Nave sotto la boa, i dieci cani che si sono fermati sulla stessa battuta, la nota che giovedì notte è arrivata da sotto la terrazza — **da sotto**, non dal mare — e la registrazione sul telefono di Gaetano.

Ciro ascolta senza interrompere una volta. Tiene la cima in mano tutto il tempo. Quando finiscono, si siede sulla panca di poppa e si toglie gli occhiali, e senza gli occhiali ha una faccia più vecchia di dieci anni.

> Ciro: "'A corda."

> Claudia: "L'ha detto anche Ada."

> Ciro: "Lo dicono tutti quelli nati prima del settanta. Poi hanno fatto il porto nuovo, è arrivata la televisione, e chi è nato dopo dice che sono fesserie." *(rimette gli occhiali)* "Io ho settantadue anni e non credo ai fantasmi, signò. Manco mo'. Io credo alle cose che aggio sentito coll'orecchie mie."

> Gaetano: "E lei cosa ha sentito?"

> Ciro: *(e qui non fa il misterioso, che è la cosa che gli fa onore: dice esattamente di cosa ha paura, con la precisione di uno che ci ha pensato per sessant'anni)* "Io ho paura di una cosa sola, e ve la dico chiara così non ce torniamo più sopra. Non ho paura d'a corda. 'A corda la sento da quando ho undici anni e non m'ha fatto niente." *(guarda Claudia, e non abbassa lo sguardo)* "Ho paura che stavolta **risponde**. Perché in sessant'anni non ha mai risposto a nessuno, e giovedì notte a lei ha risposto."

Silenzio. Il ghiaccio che si scarica, tre pontili più là.

> Ciro: "E io vengo. Ve lo dico prima che me lo chiedete, ca sennò pare che m'avete convinto voi."

**(🫁 Fiato +1: essere creduti da un vecchio che non doveva crederci vale più di un caffè. Il Quaderno registra: Ciro sa cos'è "la corda", e ha paura della cosa giusta.)**`,
    gold: 1,
    sets: { ciro_sa_tutto: true },
    choices: [
      { text: '🤝 "Allora venga. Non come barcaiolo: come uno di noi."', next: 'c1' },
      { text: '🎙 Fargli sentire la nota registrata, dal telefono, col volume al massimo', requires: { flag: 'registrata_nota' }, once: true, sets: { ciro_ha_sentito: true } },
      { text: '🚤 Salire in barca: sono le nove e dieci e la giornata è corta', next: 'c1' },
    ],
  },

  c1: {
    location: 'porto',
    caption: 'La Santa Candida, ore 09:15 — Ciro sale in squadra',
    stinger: 'heal',
    text: `Ciro sale a casa e torna dopo dieci minuti con una busta della spesa e una faccia da uno che ha fatto un giro per la cucina prendendo cose che non aveva intenzione di prendere.

Le mette in barca una per una e le nomina, come si nomina l'attrezzatura prima di uscire, perché nominare le cose è il modo dei pescatori di dire *questo lo abbiamo previsto*.

> Ciro: "Bottiglia. Rum, sessanta gradi, di quello che si fa qua. Serve per il freddo e per le altre cose." *(la posa in mezzo ai giubbotti)* "Poi: tanica di riserva del fuoribordo, cinque litri. Sacchetto di calce, che l'ho pigliato al cantiere della strada di Punta Eolo perché mi serviva per un muretto e non mi serve più."

> Gaetano: *(che ha già preso in mano il sacchetto e lo sta soppesando)* "Calce viva."

> Ciro: *(prima cosa che assomiglia a un sorriso da quando lo conoscete)* "Su un'isola nun se butta niente, dottò. Voi a Formia buttate. Qua no."

L'ultima cosa che tira fuori dalla busta non la nomina: due mele e mezzo pacchetto di gallette, e le posa sotto il banco di prua, perché quelle non sono attrezzatura.

Poi si asciuga le mani sui pantaloni e guarda la bitta invece di guardare voi — che è quello che fa uno che deve dire una cosa che si è preparato.`,

    choices: [
      { text: '👂 "Dica."', next: 'c1_regole' },
      { text: '🤝 Dargli una mano a caricare: la tanica pesa cinque chili e lui ha settantadue anni e non lo chiede', once: true, tag: 'Prova di DESTREZZA — CD 10 (caricare su un gozzo che si muove è un mestiere, e non è il vostro)', check: { stat: 'DES', dc: 10, success: 'c1_regole', fail: 'c1_tanica' }, heal: 3 },
      { text: '🎒 Nominare ad alta voce anche la roba vostra, pezzo per pezzo, accanto alla sua', once: true, next: 'c1_regole' },
    ],
  },

  /* LE TRE REGOLE. In c1 stavano insieme l'inventario della barca e il patto di Ciro, e in
     mezzo scattava il CHECKPOINT: `unlockHero`, `fullHeal`, `recharge`, `ciro_in_squadra`.
     La regola tre — «se una cosa vi chiama per nome, nun rispunnite» — e' l'aggancio che
     c10_claudia riscuote quattro ore dopo, e il giocatore deve uscire dalla schermata con
     quella in mano, non con un sacchetto di calce. Il patto ha la sua scena, e il gruppo
     diventa di tre dove Ciro dice le sue condizioni. */
  c1_regole: {
    location: 'porto',
    caption: 'Le tre regole — ore 09:20',
    stinger: 'pressione',
    text: `Poi si mette al motore e non parte subito. Resta con la mano sullo starter e dice l'ultima cosa, quella che voleva dire da giovedì.

> Ciro: "Regola una: quando dico *si torna*, si torna. Non si discute, non si finisce la frase, non se piglia l'ultima foto." *(li guarda)* "Regola due: alle sei io sto in barca. Alle sei meno un quarto stiamo tutti e tre in barca."

> Claudia: "E la regola tre?"

> Ciro: "'A regola tre è che se una cosa vi chiama per nome, nun rispunnite. Mai." *(tira lo starter)* "Non perché è pericoloso. Perché quella sta aspettando di sapere come suona la vostra voce quando dice 'sì'."

**(Oggetto: il RUM DI CIRO. 🫁 Fiato +1. ⛑ CHECKPOINT: adesso siete in tre — Ciro è nel gruppo, con la gaffa, la rete e la sua passiva che vale più di un'arma. TENUTA piena, mosse ricaricate, e se stasera va tutto a puttane si riparte da questo molo, con questa barca e questo vecchio.)**`,
    gold: 1,
    heal: 4,
    item: 'rum_di_ciro',
    unlockHero: 'ciro',
    fullHeal: true,
    recharge: true,
    sets: { ciro_in_squadra: true },
    choices: [
      { text: '🧱 Prendere il sacchetto di calce del cantiere di Punta Eolo', once: true, item: 'calce' },
      { text: '⛽ Caricare anche la tanica di riserva: cinque litri di benzina', once: true, item: 'benzina' },
      { text: '📻 "Ada ha detto che suo padre teneva delle cose. Che cose?"', next: 'c1_registratore' },
      { text: '🚤 Mollare gli ormeggi: Santo Stefano è a due chilometri', next: 'c2' },
    ],
  },

  c1_registratore: {
    location: 'porto',
    caption: 'Casa di Ciro — dieci minuti, e non uno di più',
    stinger: 'nastro',
    text: `Due stanze sopra la pescheria chiusa, il fresco di dentro che ti prende in faccia, una moglie che dorme dietro una porta con la ventola accesa. Ciro cammina in punta di piedi con la naturalezza di uno che lo fa da quarant'anni.

Tira fuori dal comò un **registratore a cassette**: un Geloso a batterie, grigio e crema, la maniglia di finta pelle, il tasto PLAY grosso come un'unghia del pollice. Lo appoggia sul tavolo e non lo apre.

> Ciro: "Era di mio padre. Funziona: le pile le cambio a settembre, ogni anno, da quando è morto. Non lo chiedete perché." *(pausa)* "Funziona."

Poi apre il secondo cassetto e ci mette dentro la mano senza guardarci, come si fa con un cassetto di cui sai il contenuto a memoria e non lo vuoi vedere.

Tira fuori una cassetta senza custodia. Nastro marrone, etichetta scritta a penna:

**"2 SETT. '65 — ULTIMA NOTTE — NON"**

> Claudia: "Non cosa?"

> Ciro: "Non lo so. Sta scritto accussì da quando ce l'ho, e ce l'ho da sessant'anni." *(la posa sul tavolo accanto al registratore, e le due cose insieme fanno un rumore che non hanno fatto)* "Me l'ha data una guardia sul molo, il due settembre del sessantacinque, a un guaglione di undici anni che stava a guardare. Non m'ha detto niente. M'ha messo la cassetta in mano e ha detto solo: *tienila tu che io me ne vado*."

Si asciuga le mani sui pantaloni, che sono asciutte.

> Ciro: "Adesso è vostra. Non ve la sto affidando: **io non la voglio più in casa mia.** Fate quello che dovete fare, ma non qua. Qua c'è mia moglie che dorme."

**(Oggetti: il REGISTRATORE A CASSETTE e IL NASTRO DEL 1965. ⚠️ Ciro non vi ha detto di non suonarlo: vi ha detto di non suonarlo *qui*. È peggio, e lo sapete tutti e tre.)**`,
    item: 'registratore',
    item2: 'nastro_1965',
    sets: { ha_il_nastro: true },
    choices: [
      { text: '☕ La moglie di Ciro si sveglia, non chiede niente e mette su la moka', once: true, gold: 1, heal: 4 },
      { text: '↩ Tornare in barca a prendere il resto prima di partire', next: 'c1' },
      { text: '🚤 Chiudere la porta piano e andare: Santo Stefano aspetta', next: 'c2' },
    ],
  },

  /* ==================== LA TRAVERSATA ==================== */

  c2: {
    location: 'barca',
    caption: 'Due chilometri di mare — ore 09:40',
    stinger: 'pressione',
    text: `Venti minuti. Due chilometri. Il fuoribordo che fa il suo rumore da fuoribordo e Ventotene che si stacca da dietro come una cosa che ti lascia andare.

Santo Stefano cresce nel modo sbagliato: non si avvicina, si **alza**. Da lontano era una gobba con una cosa sopra. Da vicino è un cono di roccia con addosso un edificio che non ha niente a che fare con un'isola: un muro curvo, giallo di calce vecchia, alto come una diga, con dentro tre file di finestre tutte uguali e tutte alla stessa distanza.

A metà del braccio di mare Ciro tira il gas al minimo e poi lo spegne del tutto.

> Ciro: "Guardate lo strumento."

L'ecoscandaglio è un affare degli anni Novanta con lo schermo verde. Il numero scende mentre la barca deriva — quarantacinque, cinquanta, sessanta — e poi si ferma, e non trema: **82,0**.

Quarantacinque era il porto romano sommerso, quello di cui aveva parlato Simone del diving: banchine e bitte a quarantacinque metri, tra le due isole, di quando l'isola era più alta. E dopo il porto, aveva detto, c'è una fossa che nessuno ha misurato.

Il numero resta lì e non oscilla di un decimo, e un ecoscandaglio che non oscilla vuol dire fondo duro e piatto: **82,0**.

Ciro non ha rimesso la mano sullo starter. La barca deriva. Da quando lo schermo si è fermato, nessuno dei tre ha detto una parola.

**(🕯 Il Quaderno registra un numero che ieri non esisteva: ottantadue metri, misurati alle nove e cinquanta del ventinove agosto.)**`,
    sets: { fossa_misurata: true },
    choices: [
      { text: '🗣 Dirlo ad alta voce. Il numero intero, sopra l\'acqua che lo tiene', next: 'c2_gola' },
      { text: '📷 Fotografare lo schermo verde con l\'ora e la data: una misura senza ora non è una misura', once: true, tag: 'Prova di DESTREZZA — CD 11 (uno schermo verde su una barca che si muove)', check: { stat: 'DES', dc: 11, success: 'c2_gola', fail: 'c2_ora_sbagliata' } },
      { text: '🤲 Claudia mette la mano sul ginocchio di Ciro, che ha spento il motore e non l\'ha più riacceso', once: true, gold: 1, heal: 3, next: 'c2_gola' },
    ],
  },

  /* LA GOLA. La prima meta' di c2 era la traversata; la seconda era la barca ferma che
     deriva sopra ottantadue metri mentre l'acqua ronza — e in mezzo il gioco faceva la sola
     cosa che in questa storia si paga davanti a tutti: diceva il numero ad alta voce e si
     prendeva l'attenzione +1 al posto del giocatore. La misura sta di qua, il pronunciarla
     sta di la'. Il numero e' il primo che quella cosa si sia mai trovata addosso. */
  c2_gola: {
    location: 'barca',
    caption: 'Fermi sopra la gola — ore 09:52',
    stinger: 'coro',
    text: `> Gaetano: *(e lo dice ad alta voce perché è il suo modo di tenersi in piedi, e perché ai numeri detti forte quella cosa là sotto fa male)* "Ottantadue metri. Nessuno l'ha misurata. Adesso è misurata: **ottantadue metri**."

> Ciro: "E ottantasette in un punto solo, che sta a mano destra tua. Là ci si perdono le reti. Mio padre ci ha lasciato due palamiti nuovi e non ci ha mai più calato niente."

Claudia ha tirato fuori il telefono e sta confrontando lo schermo con l'acqua. La banda verticale delle foto di giovedì — quella striscia di sfocatura larga tre dita che sembrava micromosso e non lo era — sta esattamente qui.

> Claudia: "Gaetà. Ci siamo *dentro*."

Il mare, sopra ottantadue metri, è liscio come una lastra. La barca non si muove. E per otto secondi, nel silenzio del motore spento, tutti e tre sentono una cosa che nessuno commenta: sotto lo scafo, l'acqua **ronza**. Non sciaborda. Ronza, come una stanza grande con una macchina dentro.

> Ciro: *(rimettendo la mano sullo starter)* "'A corda sta qua sotto, signò. Non nella cisterna. Quella era la bocca. Questa è 'a gola."

**(🎵 Attenzione del Coro +1: siete fermi sopra la sua gola e vi ha contati. 🫁 Fiato: intatto. Il numero, invece, ve lo porterete addosso — ed è il primo numero che quella cosa abbia mai avuto addosso: ottantadue metri.)**`,
    attenzione: 1,
    sets: { fossa_misurata: true },
    choices: [
      { text: '🚤 "Riaccendi, Ciro."', next: 'c3' },
      { text: '🥃 Un dito di rum a testa, alle dieci meno venti del mattino, senza brindare', requires: { item: 'rum_di_ciro' }, once: true, gold: 1, heal: 4, next: 'c3' },
      { text: '🎧 Tenere la testa fuori bordo e ascoltare quel ronzio per altri trenta secondi', once: true, damage: 3, sets: { ascoltato_troppo: true }, next: 'c3' },
    ],
  },

  /* ==================== IL PANOPTICON ==================== */

  c3: {
    location: 'santo_stefano',
    caption: 'Santo Stefano — lo sbarco, ore 10:05',
    stinger: 'coro',
    text: `Non c'è un porto: c'è uno scivolo di cemento colato sulla roccia negli anni Cinquanta, e Ciro ci appoggia la prua tenendo il motore in tiro con una mano mentre scendono.

Poi la mulattiera. Duecento metri di salita a serpentina in mezzo ai fichi d'India, con il sole delle dieci che picchia sul tufo e rimbalza, e in cima un portone ad arco senza porta.

E dentro il portone c'è la cosa.

Il vano dell'arco è alto quattro metri e dentro non c'è niente: né porta, né cancello, né catena. Non serve. Una porta serve a chi vuole uscire.

Da sotto l'arco esce aria fredda. Fuori sono trentuno gradi e il tufo scotta a toccarlo.

Ciro appoggia la mano allo stipite e non passa.

> Ciro: "Trasite voi. Io mo' vengo."`,

    choices: [
      { text: '🚪 Passare sotto l\'arco. È per questo che siete venuti', next: 'c3_dentro' },
      { text: '🌵 Tre minuti all\'ombra dei fichi d\'India e mezza bottiglia d\'acqua: duecento metri di salita al sole delle dieci si sono fatti sentire', once: true, gold: 1, heal: 3, next: 'c3_dentro' },
      { text: '📷 Claudia inquadra il portone dal basso, dalla mulattiera, prima di entrarci. La foto del prima', once: true, next: 'c3_dentro' },
    ],
  },

  /* DENTRO IL PORTONE. La prima meta' di c3 stava fuori — lo scivolo di cemento, la
     mulattiera nei fichi d'India, il sole delle dieci sul tufo — e la seconda dentro il
     ferro di cavallo, con `location: 'santo_stefano'` per tutte e due: per meta' della sua
     durata il fondale era la costa mentre il testo contava novantanove celle. Il painter di
     dentro c'era gia'. E «E dentro il portone c'e' la cosa» adesso e' una chiusa, non una
     riga a meta' schermata. */
  c3_dentro: {
    location: 'panopticon',
    caption: 'Il ferro di cavallo — ore 10:12',
    stinger: 'pressione',
    text: `**Il ferro di cavallo.** Novantanove celle su tre piani, disposte a semicerchio intorno a un pozzo vuoto, e in mezzo al pozzo una cappella tonda col tetto crollato. Le porte delle celle non guardano il corridoio: guardano **il centro**. Tutte. Tutte alla stessa distanza dal centro, tutte inclinate dello stesso angolo, tutte con lo spioncino alla stessa altezza da terra.

Cominciato nel 1795 per volere di Ferdinando IV, finito nel 1797, tirato su da cento deportati in due anni. Chiuso il **2 settembre 1965**, "perché inutilmente duro".

Le celle erano di quattro metri e mezzo per quattro e venti. Poi, a un certo punto, le hanno **divise in due** per farci stare il doppio delle persone.

> Gaetano: *(che ha letto anche questa e la dice piano)* "E c'è un'altra cosa. La pianta di questo posto è sovrapponibile a quella del **Teatro San Carlo** di Napoli."

> Claudia: "In che senso sovrapponibile."

> Gaetano: "Nel senso che se prendi la pianta del teatro e la metti sopra questa, combaciano. Stessa curva, stessi ordini di palchi." *(pausa)* "L'hanno fatto apposta. Il posto da cui si guarda è il palco reale."

Claudia si gira verso la cappella tonda in mezzo al pozzo. Poi verso le celle. Poi di nuovo verso la cappella, e fa il conto che chiunque farebbe.

> Claudia: "Quindi novantanove palchi."

> Gaetano: "Novantanove palchi."

> Claudia: "E uno spettatore solo."

> Gaetano: "Uno."

> Claudia: *(e lo dice con la calma di una che di mestiere decide come si guardano le cose)* "E lo spettacolo chi lo faceva, Gaetà?"

**(🫁 Fiato −1: qui l'aria è ferma e si respira a metà.)**`,
    goldLoss: 1,
    choices: [
      { text: '🔎 Contare le celle. Tre file, e Gaetano vuole tre conti indipendenti', once: true, gold: 1, tag: 'Prova di INTELLIGENZA — CD 11 (tre conti indipendenti, e devono coincidere)', check: { stat: 'INT', dc: 11, success: 'c3_purgatorio', fail: 'c3_tre_conti' } },
      { text: '🚪 Salire verso il secondo ordine, dove la scala fa la curva', next: 'c3_purgatorio' },
    ],
  },

  /* PVRGATORIO. La scritta a stampino sopra la scala del secondo ordine è la cosa più
     spaventosa dell'atto e stava a metà di cinquecentosettanta parole, subito dopo una
     spiegazione di architettura teatrale. Merita di essere il primo pixel di una scena. */
  c3_purgatorio: {
    location: 'santo_stefano',
    caption: 'PVRGATORIO — la scritta sopra la scala',
    stinger: 'sigillo',
    text: `Gaetano non risponde. Perché sopra la scala che sale al secondo ordine c'è una parola, dipinta a stampino, nera, alta una spanna, mangiata dal salino per un terzo.

**PVRGATORIO**

Claudia la legge ad alta voce. Una volta. E non aggiunge niente.

Nemmeno lui. Alzano gli occhi insieme e contano le file di finestre, e le file sono tre.

> Ciro: *(da sotto l'arco, la mano aperta sul muro, e dice cinque parole)* "Chella cappella 'n miezo sente. È fatta accussì."

> Claudia: *(che si è girata su se stessa una volta, piano, guardando la curva)* "Non è una prigione."

> Gaetano: "In che senso?"

> Claudia: "Una prigione serve a tenerti dentro. Questa serve a tenerti **visto**." *(indica lo spioncino della cella più vicina, e la sua voce fa quella cosa da lavoro)* "Guarda l'altezza. È a un metro e dieci. Un uomo in piedi non ci arriva con gli occhi. È l'altezza per uno **seduto sul pavimento**. Gaetano, l'hanno progettato per essere guardati mentre stanno per terra."

Ada aveva detto la cosa giusta, in terrazza, con la tazzina in mano: *quello è il brutto, che è ordinato.*

Ciro non entra. Resta sotto l'arco, con una mano sul muro.

> Ciro: "Io vengo dove venite voi. Ma al centro no." *(indica la cappella)* "Al centro, no."

**(🫁 Fiato −2: qui l'aria è ferma e si respira a metà. Quattro strade, e nessuna delle quattro è quella giusta.)**`,
    goldLoss: 2,
    sets: { panopticon_visto: true },
    choices: [
      { text: '📋 Alla portineria c\'è il pannello del Comune, plastificato, con la pianta e i nomi dei piani', once: true, next: 'c3_depliant' },
      { text: '🚪 Su, al purgatorio: la 47 sta al secondo ordine', tag: 'Prova di DESTREZZA — CD 11 (la rampa del secondo ordine ha perso la ringhiera nel 1965 e nessuno l\'ha rimessa)', check: { stat: 'DES', dc: 11, success: 'c5_cella', fail: 'c3_rampa', failDamage: 3 } },
      { text: '🕯 Scendere all\'inferno: è il nome del piano terra, non una metafora, e la cappella sta là', requires: { flag: 'sa_i_tre_piani' }, tag: 'Prova di DESTREZZA — CD 12 (la scala del ferro di cavallo è pietra levigata e senza corrimano)', check: { stat: 'DES', dc: 12, success: 'c4_conta', fail: 'c3_scalino', failDamage: 2 } },
      { text: '🕯 Scendere nella cappella al centro, dove stava la guardia', requires: { notFlag: 'sa_i_tre_piani' }, next: 'c4_conta' },
      { text: '📚 Dietro la portineria c\'è una stanza con gli scaffali: i registri', next: 'c7_archivio' },
      { text: '⛏ Il cimitero dei detenuti sta a mezza costa, fuori dal muro', next: 'c9_cimitero' },
    ],
  },

  /* IL PANNELLO DEL COMUNE. Qui c'era una lezione: dieci righe in cui Gaetano spiegava
     Bentham e il Teatro San Carlo, cioè il nerd in cattedra che il canone di questo
     progetto vieta. Lo scambio sul teatro l'ho tenuto — è dialogo, ed è Claudia che
     conta i palchi e fa la domanda che uccide — mentre la spiegazione di Bentham è
     sparita. I fatti dell'istituzione stanno qui, e li dice l'ISTITUZIONE: un pannello
     plastificato avvitato al muro, letto ad alta voce. Nessun personaggio spiega
     niente, e i nomi dei tre piani non li ha inventati un fantasma stanotte: li ha
     battuti a macchina un ufficio, a tavolino, con l'inchiostro e la riga.
     E leggere ad alta voce dentro una macchina costruita per sentire si paga. */
  c3_depliant: {
    location: 'panopticon',
    caption: 'La portineria — il pannello del Comune, ore 10:20',
    text: `Alla portineria, avvitato al muro accanto alla guardiola vuota, c'è un pannello plastificato: la pianta del carcere, quattro paragrafi in corpo otto, e in basso il logo del Commissario di Governo con la scritta *visita guidata su prenotazione*. La plastica è calda di sole, e sotto la plastica c'è una bolla d'aria grande come una moneta.

Il corpo otto è piccolo e Gaetano sta dietro di lei, quindi legge lei. Ad alta voce, come si legge un cartello: piano, senza intonazione.

> Claudia: "«Novantanove celle di circa sedici metri quadri, distribuite su tre piani, o sezioni, identificate come **inferno**, **purgatorio** e **paradiso**.»"

Si ferma un secondo. Non commenta. Va avanti.

> Claudia: "«Al piano terra i detenuti più pericolosi, e due celle senza finestre destinate alle punizioni. Al terzo piano una piccola apertura consentiva di vedere un tratto di cielo.»" *(pausa)* "«La torre di guardia al centro del cortile possedeva un'acustica tale che una sola guardia poteva ascoltare i discorsi dei detenuti.»"

Non è una metafora e non l'ha inventata nessuno stanotte: è la nomenclatura di servizio. Sta sul depliant, e prima stava sul registro. Qualcuno, a tavolino, con l'inchiostro e la riga, ha deciso che un uomo può salire di un piano ed essere meno dannato, e l'ha messo per iscritto.

> Gaetano: *(che di tutto il pannello ha preso solo il numero, perché il numero è l'unica maniglia che ha)* "Sedici metri quadri. Poi le hanno divise in due."

> Claudia: "Otto."

> Gaetano: "Otto."

Ciro non si è avvicinato al pannello. Sta sotto l'arco, gira la faccia verso il mare e aspetta.

**(🎵 Attenzione del Coro +1: ha letto ad alta voce, in mezzo al cortile, dentro un edificio costruito per sentire — e la cosa al centro non ha dovuto fare nessuno sforzo. Il Quaderno registra i nomi dei tre piani: la 47 è una cella di purgatorio, e sotto il purgatorio c'è l'inferno.)**`,
    attenzione: 1,
    sets: { sa_i_tre_piani: true },
    choices: [
      { text: '🖊 Nella guardiola, sul ripiano, c\'è un registro aperto con la penna sopra', once: true, next: 'c3_registro_visite' },
      /* IL RITORNO AL POZZO, e serve per una ragione precisa. La scelta di c3_purgatorio che
         porta all'inferno e la scena di sconfitta della scala — c3_scalino, il quinto
         scalino dall'ultimo e i tre ritorni di cui il terzo viene da un piano vuoto — stanno
         dietro `requires: { flag: 'sa_i_tre_piani' }`, e quel flag lo mette SOLO questa
         scena. Ma da qui non si tornava piu' al pozzo: tre uscite, e nessuna verso
         c3_purgatorio. Quindi il contenuto esisteva e non era leggibile da nessuno, mai —
         e nemmeno il ritorno da checkpoint aiutava, perche' rimette i flag di allora.
         Trovato il 24 agosto 2026 collaudando i rami di fallimento. */
      { text: '🔙 Tornare sotto l\'arco col pannello in testa, e guardare il pozzo sapendo i nomi dei piani', once: true, gold: 1, next: 'c3_purgatorio' },
      { text: '🚪 Su, al purgatorio: la 47 sta al secondo ordine', next: 'c5_cella' },
      { text: '🕯 Giù all\'inferno, dove stava la guardia in mezzo al pozzo', next: 'c4_conta' },
      { text: '📚 Dietro la portineria: la stanza degli scaffali', next: 'c7_archivio' },
    ],
  },

  c3_scalino: {
    location: 'panopticon',
    caption: 'Il quinto scalino dall\'ultimo',
    stinger: 'fail',
    text: `Il quinto scalino dall'ultimo non c'è più da un pezzo: c'è la sua forma, in negativo, e sotto la forma il vuoto di quattro dita.

Gaetano ci mette il piede dentro con tutto il peso e va giù di ginocchio sul travertino, con la torcia che scappa e fa un giro completo sul pavimento del pozzo illuminando novantanove porte una dopo l'altra, in sequenza, come un faro.

Le porte, tutte insieme, non fanno niente.

Il rumore del ginocchio, invece, torna indietro tre volte: una dal piano terra, una dal secondo ordine, e una da sopra — dal terzo, quello che dovrebbe essere vuoto, quello che quando è stato chiuso avevano già portato via tutti.

> Ciro: *(da sotto l'arco, senza entrare)* "Signò. Quella terza non è eco."

> Gaetano: *(che si rialza e non si tocca il ginocchio, che è il suo modo di dire che gli fa male)* "No."

**(💪 TENUTA −2. 🎵 Attenzione del Coro +1. E il Quaderno registra una cosa che non si può misurare due volte: tre ritorni, e il terzo viene da un piano dove non c'è nessuno.)**`,
    damage: 2,
    attenzione: 1,
    sets: { i_terzo_ritorno: true },
    choices: [
      { text: '🕯 Giù comunque. Al piano terra, che si chiama inferno', next: 'c4_conta' },
    ],
  },

  c4_conta: {
    location: 'panopticon',
    caption: 'Dal centro — quale porta ha fatto clac',
    text: `Ciro resta sull'ultimo gradino e non scende. Loro due scendono.

Dal fondo del pozzo, in piedi dove stava la guardia, il posto smette di essere un'architettura e diventa un **imbuto**. Novantanove porte, tutte rivolte a te, tutte alla stessa distanza. Se parli, la tua voce torna da novantanove punti insieme e arriva un pelo dopo, e la parola che torna non è mai la tua: è un impasto.

Al secondo anello, quattro porte sono accostate. Non chiuse: accostate, di quel tanto che basta a fare buio dietro.

E cominciano a fare clac.

Una per volta, con la calma di un metronomo scarico: la prima, pausa, la terza, pausa, la prima di nuovo. Non è vento — il vento non fa pause della stessa lunghezza. Qualcuno sta accostando e riaccostando quattro porte in un ordine.

> Gaetano: "È una sequenza."

> Claudia: *(che ha già tirato fuori il telefono e sta filmando, perché è quello che fa quando ha paura)* "Zitto. Zitto zitto zitto. La sto imparando."

**(👁 Claudia sta imparando l'ordine in cui si aprono quattro porte in un carcere vuoto, e questa è esattamente la sua parte del lavoro. Il Quaderno registra: la sequenza esiste.)**`,
    sets: { sequenza_porte: true },
    minigame: {
      type: 'memoria', hero: 'claudia', success: 'c5_cella', fail: 'c6_detenuto',
      tag: 'Claudia deve ripetere l\'ordine delle porte — e voi con lei',
      config: { titolo: '🚪 Quale porta ha fatto clac', lunghezza: 5, simboli: ['I', 'II', 'III', 'IV'] },
    },
    choices: [],
  },

  /* ==================== LA CELLA 47 ==================== */

  c5_cella: {
    location: 'cella',
    caption: 'Secondo anello — la cella 47',
    silenzio: true,
    stinger: 'pressione',
    text: `I numeri sono dipinti a mano sopra le porte, in nero, con lo stampino: **45. 46. 47.**

Tutte le porte del secondo anello sono aperte o strappate dai cardini. La 47 è chiusa. È l'unica chiusa di novantanove.

Non è nemmeno bloccata: si apre spingendo, con il cigolio che ti aspetti e che comunque ti fa male.

Due metri per tre. Un tavolato di pietra colato nel muro, che era il letto. Un buco nel pavimento, nell'angolo, con intorno sessant'anni di niente. Una finestrella alta, quaranta per venti, che dà su un pezzo di cielo grande come un francobollo.

I muri sono un referto. Sotto lo strato di calce ce n'è un altro, e sotto quello un altro, e dove si sono staccati tutti si vede il tufo vivo con dentro il grasso di duecento anni di corpi: una patina scura, unta al tatto, che non è muffa e non viene via. All'altezza della spalla, lungo tutta la parete destra, c'è una banda lucida e consumata, larga trenta centimetri, dove qualcuno ha camminato avanti e indietro appoggiandosi al muro per un numero di anni che non è ragionevole.

E sulla parete di fondo, dal pavimento fino a un metro e sessanta, ci sono le **tacche**.

Non decine. Non centinaia. Una foresta di segni verticali incisi con qualcosa di duro, in gruppi di cinque, in file ordinate che vanno da sinistra a destra e da sotto in su, per tutta la parete, senza un vuoto.

Nessuno dei due parla. Da qualche parte, fuori, Ciro tossisce e non entra.

**(🫁 Fiato −3. 🔇 Il gioco ha spento la musica e non è un guasto: succede tre volte in tutta la storia, e questa è la seconda. Il Quaderno apre una pagina e per ora la lascia bianca.)**`,
    goldLoss: 3,
    attenzione: 1,
    sets: { cella_47_aperta: true },
    choices: [
      { text: '🧮 Gaetano conta un campione: dieci righe esatte, poi si moltiplica', tag: 'Prova di INTELLIGENZA — CD 12 (contare ottomila tacche per campione è un metodo: sbagliare il campione è sbagliare tutto)', check: { stat: 'INT', dc: 12, success: 'c5_tacche', fail: 'c5_campione' } },
      { text: '🧱 Staccare un pezzo di muro dove il muro è già staccato', once: true, tag: 'Prova di FORZA — CD 10 (l\'intonaco è già staccato: è il tufo sotto che non lo sa)', check: { stat: 'FOR', dc: 10, success: 'c5_pietra', fail: 'c5_unghia', failDamage: 1 } },
      { text: '🚪 Uscire. Adesso. Andare a leggere delle carte, come le persone normali', next: 'c7_archivio' },
    ],
  },

  c5_tacche: {
    location: 'cella',
    caption: 'Il conto',
    text: `Gaetano si mette in ginocchio, accende la torcia e la tiene di taglio, radente al muro, perché la luce di lato fa venire fuori l'incisione.

> Gaetano: "Non le conto tutte. Conto dieci righe, faccio la media dei segni per riga, misuro l'altezza della fascia incisa e divido. È un campionamento. L'errore sta sotto il due per cento."

> Claudia: "E perché ti serve il numero?"

> Gaetano: *(senza voltarsi, con la matita in mano)* "Perché se ha un numero è una cosa. Se non ha un numero è un incubo." *(pausa)* "Reggimi la torcia."

Lei gli regge la torcia. Lui conta, a voce bassa, in gruppi di cinque, e il conto dura sette minuti in una stanza in cui non c'è musica.

**(🧮 Si gioca insieme, ad alta voce. Tre conti veri, venti secondi l'uno: servono due risposte giuste. Se lo sbagliate non muore nessuno — succede una cosa peggiore, e cioè che gli tocca contarle tutte.)**`,
    minigame: {
      type: 'calcolo', hero: 'gaetano', success: 'c5_graffito', fail: 'c5_graffito_ko',
      tag: 'Il conto di Gaetano: tre domande, e i numeri sono veri',
      config: {
        titolo: '🧮 Ottomilaquarantuno', secondi: 20,
        domande: [
          { q: 'Ottomilaquarantuno tacche, una al giorno, mai saltata. Quanti anni sono?',
            r: [{ t: 'Ventidue anni', ok: true }, { t: 'Quindici anni' }, { t: 'Trentaquattro anni' }, { t: 'Otto anni' }] },
          { q: 'Se la prima tacca è del 1943 e sono ventidue anni pieni, l\'ultima di che anno è?',
            r: [{ t: '1965', ok: true }, { t: '1957' }, { t: '1971' }, { t: '1949' }] },
          { q: 'Il carcere ha chiuso a settembre 1965. Da allora a oggi, 29 agosto 2026: quante tacche servirebbero?',
            r: [{ t: 'Circa ventiduemila', ok: true }, { t: 'Circa ottomila' }, { t: 'Circa tremila' }, { t: 'Circa centomila' }] },
        ],
      },
    },
    choices: [],
  },

  c5_graffito: {
    location: 'cella',
    caption: 'Ottomilaquarantuno',
    stinger: 'penna',
    text: `> Gaetano: "Ottomilaquarantuno."

Lo dice piano, e poi lo dice un'altra volta più forte, perché dirlo forte gli serve.

> Gaetano: "Ottomilaquarantuno tacche. Diviso trecentosessantacinque fa ventidue. Ventidue anni, Claudia. Uno lì dentro ha segnato ventidue anni un giorno per volta e non ha saltato mai. Nemmeno quando stava male. Nemmeno una volta."

> Claudia: "Il carcere ha chiuso nel sessantacinque."

> Gaetano: "Sì."

> Claudia: "Sessantun anni fa."

> Gaetano: *(e adesso la matita gli si ferma)* "...sì."

Claudia gli prende la torcia dalle mani, si avvicina alla parete e la punta sull'ultima tacca in alto a destra. L'ultima della fila. Quella dopo cui non c'è niente.

Il tufo, dentro le altre ottomilaquaranta incisioni, è dello stesso colore grigio del muro: sessant'anni di polvere che si è depositata e si è compattata.

Dentro l'ultima, il tufo è **giallo**. Giallo chiaro, pulito, come la carne di una pietra appena aperta.

E sul pavimento, sotto quella tacca, c'è un pizzico di polvere di tufo che non ha ancora finito di posarsi.

> Claudia: "Gaetano."

> Gaetano: "La vedo."

> Claudia: "Quanto ci mette la polvere di tufo a posarsi?"

> Gaetano: *(con la voce di uno che sta dando un dato e vorrebbe non averlo)* "In una stanza senza vento? Venti minuti. Trenta."

**(🕯 Il Quaderno registra: 8.041 tacche, ventidue anni, e l'ultima è fresca. Primo indizio su chi c'era nella cella 47 — e non era il sessantacinque, era mezz'ora fa.)**`,
    sets: { i_graffito: true },
    choices: [
      { text: '🖐 Appoggiare il pollice dentro l\'ultima tacca', tag: 'Prova di Costituzione — CD 13', check: { stat: 'COS', dc: 13, success: 'c6', fail: 'c6_detenuto', failDamage: 3 } },
      { text: '📚 L\'archivio: se qualcuno ha contato ventidue anni, da qualche parte è scritto', next: 'c7_archivio' },
      { text: '⛏ Il cimitero: se ha smesso di contare, è finito da qualche parte', next: 'c9_cimitero' },
    ],
  },

  c5_graffito_ko: {
    location: 'cella',
    caption: 'Contarle tutte',
    stinger: 'risata',
    text: `Il campione non torna. La media della quarta riga è troppo alta, quella dell'ottava è troppo bassa, e Gaetano rifà il conto e non torna nemmeno la seconda volta.

> Gaetano: "Non mi fido del campione."

> Claudia: "Amore, va bene così—"

> Gaetano: "**Non mi fido del campione.**"

E allora le conta tutte.

Quaranta minuti in ginocchio sul pavimento della cella 47, la torcia di taglio, il dito che segue la fila, la voce che dice i numeri a bassa voce senza fermarsi mai perché se ti fermi ricominci. Claudia gli regge la luce e non dice niente, e a un certo punto si siede per terra accanto a lui con la schiena al muro unto e gli tiene una mano sulla scarpa, che è l'unica cosa che riesce a raggiungere.

Al seimilaquattrocento circa, qualcuno **conta con lui**.

Non forte. Sotto, di un tono e mezzo più basso, con mezza sillaba di ritardo, e sbagliando: dice i numeri giusti nell'ordine giusto ma li dice come li direbbe uno che li ha imparati a memoria senza sapere cosa sono.

Gaetano non si ferma. Claudia gli stringe la scarpa più forte.

E al settemilanovecento la voce sotto la sua **ride**. Una risata corta, contenta, di gola — il tipo di risata che fa un bambino quando becca il grande a sbagliare — e poi torna a contare, puntuale, come se non fosse successo niente.

Arrivano a **ottomilaquarantuno** insieme, tutti e tre.

**(TENUTA −4 a tutti: quaranta minuti in ginocchio nella 47 si pagano in ossa. Il Quaderno registra comunque: 8.041 tacche, e l'ultima è fresca. Ma stavolta il numero l'avete detto in tre.)**`,
    damage: 4,
    sets: { i_graffito: true, contato_in_tre: true },
    choices: [
      { text: '🚪 Fuori. Nel corridoio. Adesso', next: 'c6' },
      { text: '📚 L\'archivio, e mai più questa stanza', next: 'c7_archivio' },
    ],
  },

  /* ==================== CLAUDIA HA RAGIONE ==================== */

  c6: {
    location: 'panopticon',
    caption: 'Corridoio del secondo anello — mezzogiorno meno venti',
    text: `Il corridoio del secondo anello non è un corridoio: è una **curva** che non si raddrizza mai. Cammini e la parete delle celle ti resta sempre a sinistra con la stessa inclinazione, e a destra c'è il parapetto e il vuoto sopra la cappella, e non arrivi mai a un angolo. Dopo quaranta metri il cervello comincia a chiedere dove sia la fine e il corridoio non risponde.

Claudia si ferma davanti alla **44** e mette una mano indietro, sul petto di Gaetano, per fermare anche lui.

> Claudia: "C'è qualcuno dentro."

Lo dice piano, senza staccare la mano dal suo petto. Non indica la porta, non alza il dito: sta ferma e aspetta.

La 44 è una porta come le altre novantotto: legno gonfio, il numero a stampino, lo spioncino a un metro e dieci da terra.

E Gaetano sente il bisogno di dirle una cosa gentile.`,

    choices: [
      { text: '🗣 Lasciarlo parlare: ha una spiegazione, ce l\'ha sempre, e stavolta è anche vera', next: 'c6_del_suono' },
      { text: '🔦 Puntare la torcia nella fessura sotto la 44, dieci centimetri di luce, mentre lui fa il conto', once: true, damage: 2, tag: 'Prova di DESTREZZA — CD 12 (la luce va nelle due direzioni)', check: { stat: 'DES', dc: 12, success: 'c6_del_suono', fail: 'c6_vista' } },
      { text: '🤚 Non togliere la mano dal suo petto e contare i respiri fino a dieci prima di aprire bocca', once: true, heal: 3, next: 'c6_del_suono' },
    ],
  },

  /* LA RISPOSTA SUL SUONO. In c6 stavano nello stesso clic la frase piu' importante che
     Claudia dice nell'atto — «C'e' qualcuno dentro» — e centottanta parole in cui Gaetano
     le spiega l'eco a flutter coi decimali per rassicurarla. La spiegazione resta, perche'
     c6_polvere e c6_dopo si appoggiano tutte e due su di lei: e' l'errore da cui nasce la
     cosa piu' bella dell'atto. Ma la sua frase non sta piu' dentro il muro di misure, e
     mentre lui conta si decide cosa fa lei. */
  c6_del_suono: {
    location: 'panopticon',
    caption: 'Davanti alla 44 — la risposta sul suono',
    stinger: 'coro',
    text: `> Gaetano: *(e parte, in buona fede, con la voce gentile di uno che vuole toglierle un peso)* "Amore, no. È il posto. Questa curva è una galleria a sussurro: il suono rimbalza sulla parete concava e ti torna dall'altro lato con un ritardo di — aspetta." *(guarda il cronometro del telefono, batte due volte le mani, conta)* "Zero virgola quarantasei. Ottantacinque metri di percorso, la velocità del suono è trecentoquaranta metri al secondo, torna. Si chiama eco a flutter e ti fa sentire i tuoi passi come se fossero i passi di un altro." *(e poi dice la cosa peggiore che potesse dire, e la dice perché è vera)* "E non l'ho scoperto io, Claudia. **Sta nel progetto.** Una guardia sola, in mezzo, doveva sentire novantanove celle: l'hanno costruito così, e c'è scritto sul pannello all'ingresso. Io ho solo verificato che funziona ancora."

E funziona ancora. Ha ragione su tutto, ha fatto il conto in nove secondi, la sua voce è dolce — e ha appena spiegato a sua moglie, coi decimali, il motivo per cui questo posto è stato tirato su. Per rassicurarla.

> Claudia: *(senza toglierle la mano dal petto, e senza alzare la voce di un decibel)* "Io non ti ho parlato del suono."

> Gaetano: "..."

> Claudia: *(indica il pavimento davanti alla 44)* "Sessant'anni di polvere in tutto il corridoio. Uno strato uniforme, grigio, come una moquette. Davanti a tutte le porte. Guarda davanti a questa."

**(💪 TENUTA −2: aveva ragione su tutto, e avere ragione qui dentro non serve a niente.)**`,
    damage: 2,
    choices: [
      { text: '👁 "Guarda il pavimento." Detto da Claudia, che di mestiere guarda i pavimenti', next: 'c6_polvere' },
      { text: '🚶 Non guardare niente e andare avanti lungo la curva', once: true, damage: 2, next: 'c6_polvere' },
    ],
  },

  /* LA POLVERE. Due mezzelune a settanta centimetri dalla porta, i segni che fa una porta
     aperta e richiusa molte volte. È il momento in cui il mestiere di Claudia batte i
     decimali di Gaetano, e merita di stare da solo in un'inquadratura. */
  c6_polvere: {
    location: 'panopticon',
    caption: 'Davanti alla 44, la polvere',
    stinger: 'pressione',
    text: `Davanti alla 44 la polvere è **spostata**. Due mezzelune, a settanta centimetri l'una dall'altra, con il bordo pulito rivolto verso l'interno della cella.

Sono i segni che fa una porta quando viene aperta e richiusa. Molte volte.

> Claudia: "Io faccio questo di lavoro, Gaetano. Non sento le cose: **le vedo**. Da dieci anni mi pagano per accorgermi di un fotogramma che stona in un video di quaranta secondi." *(e adesso lo guarda)* "E tu mi hai risposto sul suono."

**(Il Quaderno registra: davanti alla 44 la polvere è spostata, e i segni sono di una porta aperta e richiusa molte volte. Gaetano ha misurato benissimo la cosa sbagliata, e Claudia sta ferma con la mano ancora sul suo petto.)**`,
    sets: { porta_44_vista: true },
    choices: [
      { text: '🔦 "Hai ragione tu. Apriamo la 44." Con la luce, e insieme', next: 'c6_detenuto' },
      { text: '↩ Tirarsi indietro senza dargli le spalle, un passo per volta', tag: 'Prova di Destrezza — CD 13', check: { stat: 'DES', dc: 13, success: 'c7_archivio', fail: 'c6_detenuto', failDamage: 3 } },
    ],
  },

  c6_detenuto: {
    location: 'panopticon',
    caption: 'La 44',
    stinger: 'combat',
    text: `La porta si apre spingendo, come la 47, con lo stesso cigolio.

Dentro c'è la stessa stanza di due metri per tre. Lo stesso tavolato di pietra, lo stesso buco nell'angolo, la stessa finestrella da francobollo. E in piedi in mezzo, girato verso la porta come se aspettasse da un po', c'è un uomo.

Le proporzioni non tornano. È una cosa che si vede subito e che non si riesce a dire: le spalle stanno alla giusta distanza dal collo, le mani stanno al posto delle mani, e comunque **non torna**, come una faccia in una fotografia stampata male. Ha addosso quello che resta di una divisa da detenuto, righe che il buio ha mangiato. La pelle delle braccia è grigia e sottile e sotto si vede tutto.

Non guarda loro. Guarda **lo spioncino**, alla sua sinistra, ad altezza di uno seduto per terra.

> Claudia: *(pianissimo)* "Non ci sta guardando."

> Gaetano: "No."

> Claudia: "Sta aspettando che LO guardino."

Ventitré anni in questa stanza. Gli ultimi undici senza vedere in faccia nemmeno una volta chi lo controllava dal buco. Adesso ci sono due persone sulla soglia con una torcia da ventotto euro, e per la prima volta da sessantun anni qualcuno l'ha visto per intero.

Non è cattivo. Non ha odio, non ha fame, non ha un piano. È **esploso**, e nessuno in vita gli ha mai spiegato dove si mette quello che ti cresce dentro quando ti guardano per ventitré anni e non ti rispondono.

Si gira verso di loro. E la cosa peggiore è che apre la bocca come per chiedere scusa.

**(⚔ Fa male perché non sa di essere morto. Ricordatevelo mentre lo colpite: al gioco serve che ve lo ricordiate.)**`,
    combat: { enemies: ['detenuto'], victory: 'c6_dopo', defeat: 'c6_ko', loot: { gold: 1 } },
    choices: [],
  },

  c6_dopo: {
    location: 'panopticon',
    caption: 'Dopo la 44',
    stinger: 'victory',
    text: `Non cade. Si **appiattisce**: perde di volume come una cosa che aveva l'aria dentro, e per un secondo e mezzo resta in piedi alto due dimensioni, e poi non c'è più niente in mezzo alla cella tranne un po' di polvere che si muove.

Sul pavimento, dove stava, restano due mezzelune di polvere pulita. Le stesse di fuori.

Ciro arriva al secondo anello col respiro corto e la gaffa in mano, guarda dentro la 44, non chiede niente. Tira fuori la bottiglia e versa tre dita di rum nel tappo di plastica e lo passa a Claudia per prima.

Claudia beve, tossisce, ride di quella risata sbagliata che viene dopo. Poi passa il tappo a Gaetano, e Gaetano non lo prende subito: resta con la mano a mezz'aria.

> Gaetano: "Claudia."

> Claudia: "Eh."

> Gaetano: "Ti ho risposto sul suono."

> Claudia: "Sì."

> Gaetano: *(e questa è la parte che gli costa, e si sente, perché non è un uomo che rinuncia facilmente al modo in cui tiene insieme il mondo)* "Ti ho risposto sul suono perché il suono lo sapevo misurare. La polvere no. Quindi ho misurato quello che sapevo e ti ho detto che eri tranquilla." *(prende il tappo)* "Non è gentilezza, quella. È che avevo paura io."

> Claudia: "Lo so."

> Gaetano: "Da adesso, quando dici una cosa, la facciamo. Anche se non la so misurare. Anche se penso che ti sbagli."

> Claudia: *(gli sistema il colletto della maglietta, che non aveva niente)* "Da adesso, quando dico una cosa, tu me la MISURI. Che è meglio." *(beve l'ultimo dito)* "Ma la facciamo."

> Ciro: *(che sta guardando l'orologio da polso)* "Bello. Sono le dodici e venti."

**(🫁 Fiato +1: tre dita di rum nel tappo di una bottiglia, dentro un carcere, e una cosa detta ad alta voce che costava. Il Quaderno registra: Claudia è stata ascoltata.)**`,
    gold: 1,
    heal: 4,
    sets: { claudia_ascoltata: true },
    choices: [
      { text: '🚪 Sulla porta della 44 c\'è ancora il portacartellino di ottone. Guardarci dentro', requires: { flag: 'porta_44_vista' }, once: true, next: 'c6_cartellino' },
      { text: '📚 L\'archivio, dietro la portineria', next: 'c7_archivio' },
      { text: '🕯 Sedersi fuori con Ciro: è ora che racconti', next: 'c8_ciro' },
      { text: '⛏ Il cimitero, prima che il sole si sposti', next: 'c9_cimitero' },
    ],
  },

  c6_ko: {
    location: 'panopticon',
    caption: 'Ciro vi tira fuori',
    stinger: 'defeat',
    text: `Vi tira fuori Ciro.

Vi prende per la cintura — prima uno, poi l'altra, con una forza che a settantadue anni non dovrebbe avere e che invece hanno tutti quelli che per cinquant'anni hanno tirato a bordo pesci grossi — e vi trascina sui gradini fino al pozzo della cappella, in mezzo, dove lui aveva detto che non ci va.

Ci va.

E in mezzo al pozzo, con novantanove porte puntate addosso, comincia a **urlare nomi**.

> Ciro: "GAETANO! GAETANO, T'AGGIO CHIAMMATO! CLAUDIA! CLAUDIA, GUARDAMI IN FACCIA!"

Non è una preghiera e non è un incantesimo: è un vecchio che dice i nomi delle persone che ha portato lui, ad alta voce, in un posto costruito per ascoltare. E funziona, e Ciro non sa perché funziona, e ve lo dirà stasera.

Vi tornano gli occhi addosso lentamente. Il sapore in bocca è di sale e di ruggine. Il sole è la stessa cosa di prima e sono passati nove minuti.

> Ciro: *(seduto sul gradino, con la faccia grigia)* "Nun rispondevate. Ve chiammavo e nun rispondevate." *(si passa la mano sugli occhi)* "Mannaggia. Nun rispondevate."

**(TENUTA recuperata: siete in piedi, malissimo, e vivi. 🫁 Fiato −2, e 🎵 Attenzione del Coro +1 — perché per tirarvi fuori, Ciro ha dovuto urlare i vostri nomi in mezzo alla macchina che serve a sentirli.)**`,
    heal: 10,
    goldLoss: 2,
    attenzione: 1,
    sets: { ciro_ha_urlato: true },
    choices: [
      { text: '🕯 Sedersi al sole con lui. Basta muri per un\'ora', next: 'c8_ciro' },
      { text: '📻 Il registratore. Se serve un\'arma, l\'arma è quella', next: 'c10_nastro' },
    ],
  },

  /* ==================== L'ARCHIVIO ==================== */

  c7_archivio: {
    location: 'panopticon',
    caption: 'La stanza dei registri — ore 13:00',
    stinger: 'penna',
    text: `Dietro la portineria, una stanza di quattro metri per quattro con tre scaffali di ferro e l'umidità che ha fatto il suo lavoro dal basso: i primi trenta centimetri di ogni volume sono una massa unica di carta e muffa che non si apre più.

Sopra, però, si apre.

Registri di magazzino. Fatture di calce e di farina. Un quaderno di infermeria con una grafia bellissima. E, sullo scaffale in mezzo, due libroni con la costa scritta a pennello: **MATRICOLA** e **PRESENZE — CAMERATE E CELLE**.

Sono due libroni da quattro chili, la costa scritta a pennello, le pagine gonfie d'umido che si voltano a due a due.

Gaetano se li mette davanti tutti e due, aperti, uno a destra e uno a sinistra, e appoggia l'indice sul bordo della pagina senza scegliere.

Sullo scaffale basso, intanto, restano un quaderno d'infermeria con una grafia bellissima e una mazzetta di fatture legate con lo spago.`,

    choices: [
      { text: '📋 Se qualcuno bussava, qualcuno l\'ha messo a verbale: cercare fra le carte di servizio', requires: { flag: 'sequenza_porte' }, once: true, next: 'c7_circolare' },
      { text: '🕯 Sullo scaffale basso c\'è un registro sottile con la costa di tela: DEFUNTI', requires: { flag: 'fossa_rispettata', notFlag: 'i_osso' }, next: 'c9_registro_defunti' },
      { text: '📕 La 47. Su tutti e due i registri, alla stessa riga e alla stessa data', tag: 'Prova di INTELLIGENZA — CD 11 (due grafie diverse, due date scritte in due modi, e la luce che c\'è in un archivio senza corrente)', check: { stat: 'INT', dc: 11, success: 'c7_quarantasette', fail: 'c7_righe' } },
      { text: '🕯 Prima il quaderno d\'infermeria: chi scrive così, in un posto così, va letto', once: true, heal: 3, next: 'c7_quarantasette' },
      { text: '🧱 Le fatture della calce: sacchi e sacchi, e l\'ordine più grosso è del novembre del quarantatré', once: true, next: 'c7_quarantasette' },
      { text: '📖 Il PRESENZE non finisce dove finisce la rilegatura: girare fino all\'ultima pagina', once: true, next: 'c7_ultima_pagina' },
    ],
  },

  /* LA RIGA DELLA 47. La stanza dei registri e' l'unico posto dell'atto in cui si cerca
     invece di subire, e c'era una riga in cui il gioco cercava al posto del giocatore:
     «Gaetano cerca la 47 in tutti e due». Su quello scaffale ci sono quattro cose da
     aprire. Adesso la stanza si guarda, si decide da dove partire, e questa scena si apre
     con la risposta: le due grafie, i due inchiostri, ventidue anni di colonna di 1. */
  c7_quarantasette: {
    location: 'panopticon',
    caption: 'La riga della 47, su due registri diversi',
    stinger: 'penna',
    text: `Gaetano cerca la 47 in tutti e due.

Sul **MATRICOLA**, alla riga della cella 47, c'è una parola scritta con inchiostro nero, in una grafia da impiegato che ha fatto la stessa parola diecimila volte: **"vuota"**. E accanto: *dal 3.XI.1943*.

Sul **PRESENZE**, alla stessa cella, alla stessa data, c'è un numero: **1**. E poi un altro 1 alla riga sotto, e sotto, e sotto — una colonna di 1 che continua per pagine, mese per mese, tutti gli anni, fino al **31 agosto 1965**.

Grafia diversa. Inchiostro diverso: quello del MATRICOLA è nero, quello del PRESENZE è di un blu che l'umidità ha fatto sbiadire in viola.

> Claudia: "Aspetta. Ho capito bene? Un registro dice che la 47 era vuota dal quarantatré—"

> Gaetano: "—e l'altro dice che dal quarantatré c'era una persona dentro. Ogni giorno. Per ventidue anni." *(gira la pagina, e poi torna indietro)* "Claudia, guarda le firme in fondo al mese. Sono la stessa firma. Lo stesso uomo ha scritto 'vuota' su un registro e '1' sull'altro, lo stesso giorno, per ventidue anni."

> Claudia: "Perché uno fa una cosa così?"

> Gaetano: "Perché il registro che si consegna è uno e il registro che si tiene è l'altro." *(pausa)* "E questo tipo teneva il secondo. Da solo. Per ventidue anni. Sapendo che nessuno l'avrebbe mai letto."

Fuori, il sole delle una si è spostato di un dito e la stanza è diventata più buia di quanto è ragionevole.

**(🕯 Il Quaderno registra: la 47 è vuota dal 1943 e occupata dal 1943, e la mano che ha scritto le due bugie è la stessa. Secondo indizio.)**`,
    sets: { i_registro_detenuti: true },
    choices: [
      { text: '📄 Sullo stesso scaffale ci sono le carte del \'43: c\'era anche un piroscafo', next: 'c7_lista' },
      { text: '🕯 Uscire e chiedere a Ciro cos\'ha visto il due settembre del sessantacinque', next: 'c8_ciro' },
      { text: '⛏ Il cimitero: i registri dicono chi entra, le fosse dicono chi resta', next: 'c9_cimitero' },
    ],
  },

  c7_lista: {
    location: 'panopticon',
    caption: 'La cartella che non c\'entra niente',
    stinger: 'penna',
    text: `Sullo scaffale basso, dentro una cartella di cartone legata con lo spago, ci sono carte che non sono di un carcere.

Sono della Capitaneria. Ci sono finite qui nel '44, insieme a una requisizione di brande e a due casse di coperte, perché nel quarantaquattro le carte andavano dove andavano le cose.

E dentro la cartella c'è la fotocopia di un elenco intestato **REGIA NAVE PASSEGGERI "SANTA LUCIA" — IMBARCO 24.10.1943 — NAPOLI**.

Centoquarantasei nomi battuti a macchina. Cognome, nome, età, destinazione. Righe pulite, ordinate, con l'incolonnamento perfetto delle macchine da scrivere di allora.

E in fondo, sotto l'ultima riga battuta, ce n'è uno aggiunto **a penna**.

Non dall'impiegato: la grafia dell'impiegato sta in tutta la pagina, nelle correzioni a margine, ed è minuscola e obliqua. Questa è enorme. Lettere alte un centimetro, tenute su a fatica dentro lo spazio di una riga, la **S** girata al rovescio, l'ultima lettera schiacciata contro il bordo del foglio perché lo spazio era finito e chi scriveva non l'aveva calcolato.

Claudia si porta la fotocopia alla finestra per avere luce, e ci sta ferma sopra molto più del necessario.

> Claudia: "Gaetà."

> Gaetano: "Che c'è."

> Claudia: "L'ultimo nome della lista l'ha scritto una **bambina**." *(indica con l'unghia, senza toccare)* "Guarda la pressione della penna. Guarda come tiene la riga. Ha sei, sette anni. E l'ha scritto **da sola**." *(alza gli occhi)* "Le hanno dato la penna e le hanno detto: scrivi tu, che così ci sei anche tu."

Fuori, sul cortile, il vento non c'è. Dentro la stanza dei registri, per tre secondi, c'è un odore che non ci stava prima: sapone.

**(Oggetto: la LISTA D'IMBARCO DELLA SANTA LUCIA. Il Quaderno registra: l'ultimo nome è stato aggiunto a penna, e l'ha scritto lei.)**`,
    item: 'lista_imbarco',
    sets: { i_nome_lista: true },
    choices: [
      { text: '🕯 Fuori, al sole, con Ciro. Adesso è lui che deve parlare', next: 'c8_ciro' },
      { text: '⛏ Il cimitero dei detenuti', next: 'c9_cimitero' },
      { text: '📻 Basta carte. Il nastro del sessantacinque', next: 'c10_nastro' },
    ],
  },

  /* ==================== CIRO RACCONTA ==================== */

  c8_ciro: {
    location: 'santo_stefano',
    caption: 'Sul muretto, fuori dal muro — ore 13:40',
    text: `Si siedono fuori, sul muretto a secco che corre lungo il lato di levante, dove c'è ombra e si vede Ventotene intera con il paese giallo e rosa appoggiato sul tufo. Da qui è bellissimo. Da qui sembra una cosa a due chilometri.

Ciro sta con i gomiti sulle ginocchia e guarda l'isola sua.

> Ciro: "Il due settembre del sessantacinque tenevo undici anni e stavo sul molo, che allora il molo era quello vecchio, dove ora tengono le boe. Papà m'aveva detto di non ci andare e io ci sono andato, come tutti i guagliuni dell'isola: eravamo una decina, appoggiati alla catena."

> Ciro: "Portarono via novanta uomini con tre motobarche. Ce mettettero quattro ore." *(si gratta il ginocchio)* "Aggio raccontato tre cose per sessant'anni e sono sempre queste tre. Uno: quelli uomini non parlavano. Novanta uomini che scendono da una barca e non uno che dice una parola, manco 'permesso'. Due: mio padre quella notte legò le barche e disse a tutti di non uscire fino all'alba, e mio padre era uno che uscìva con la burrasca."

Si ferma. Non per effetto: si ferma perché è arrivato al punto dove si ferma da sessant'anni.

Guarda il muro alle sue spalle, poi Ventotene, poi le sue mani.

> Ciro: "Le prime due le racconto pure al bar. La terza l'ho detta a mio padre e basta, e mio padre è morto nel settantasette."

**(💪 TENUTA +5: mezz'ora all'ombra sul muretto di levante, fuori dal muro, con l'isola davanti che da qui sembra una cosa a due chilometri.)**`,
    heal: 5,
    choices: [
      { text: '💬 "E tre, Ciro?"', tag: 'Prova di CARISMA — CD 12 (a Ciro la terza cosa non gliel\'ha chiesta nessuno in trent\'anni, e c\'è un motivo)', check: { stat: 'CAR', dc: 12, success: 'c8_terza', fail: 'c8_due_e_mezzo' } },
      { text: '🤲 Non incalzarlo. Sedersi sul muretto accanto a lui e aspettare che ci arrivi da solo', once: true, gold: 1, heal: 3, next: 'c8_terza' },
      { text: '💧 Passargli la bottiglia d\'acqua dello zaino, ancora fredda, prima che dica la terza', once: true, heal: 2, next: 'c8_terza' },
    ],
  },

  /* LA TERZA COSA. Quattrocentocinquantadue parole in cui un vecchio si svuotava da solo:
     le tre cose che racconta da sessant'anni E il nome che non ha mai detto, tutto nello
     stesso clic. Il nome della guardia e' l'indizio piu' difficile del gioco e apre il
     finale del NOME: non puo' arrivare in coda a un monologo che nessuno ha chiesto.
     Adesso la terza cosa si chiede — o si sta zitti e si aspetta che ci arrivi lui. */
  c8_terza: {
    location: 'santo_stefano',
    caption: 'E tre — sul muretto di levante, ore 13:55',
    stinger: 'campana',
    text: `> Claudia: "E tre?"

> Ciro: "E tre, che una guardia piangeva." *(pausa lunga)* "Non era vecchio. Quarantatré, quarantaquattro anni. Stava in piedi sulla banchina con la divisa addosso e il berretto in mano, e piangeva come piange un uomo grande, senza fare rumore, con la bocca chiusa. E mentre piangeva teneva in mano una cassetta di plastica marrone."

Si passa le mani sulla faccia.

> Ciro: "Dalla motobarca lo chiamavano. Lo chiamavano per nome, forte, che io me lo ricordo perché me l'hanno gridato addosso tre volte, che io stavo là." *(e adesso lo dice, e lo dice tutto)* "**Sperduto! Nicò! Sperduto Nicola, scinni!**"

> Gaetano: "E lui?"

> Ciro: "E lui m'ha messo la cassetta in mano, a me, a un guaglione che stava a guardare. E ha detto: *tienila tu che io me ne vado*. E po' se n'è tornato a piedi verso il carcere." *(indica con la testa il muro alle loro spalle)* "Là. Da solo. Il due settembre del sessantacinque alle cinque e mezza del pomeriggio. E le motobarche sono partite senza di lui e nessuno è tornato a prenderlo."

Silenzio. Una lucertola sul muretto, il mare che sotto fa il suo.

> Ciro: "E io alle sei non ci resto perché a undici anni ho visto un uomo che non è scinnuto. Ecco tutto. Non è una storia di fantasmi, signò: è una storia di uno che è rimasto a fare il turno."

**(🫁 Fiato +1: un vecchio ha detto a voce alta una cosa che teneva da sessantun anni, e adesso non la tiene più da solo. Il Quaderno registra un NOME: NICOLA SPERDUTO. Terzo indizio.)**`,
    gold: 1,
    heal: 5,
    sets: { i_ciro_racconta: true },
    choices: [
      { text: '🥃 Il rum, un dito a testa, in silenzio, guardando Ventotene da qui', requires: { notFlag: 'ciro_muto', item: 'rum_di_ciro' }, once: true, gold: 1, heal: 4 },
      { text: '📚 I registri: se stava dentro, l\'ha scritto lui stesso', next: 'c7_archivio' },
      { text: '⛏ Il cimitero: se non è scinnuto, allora dove sta?', next: 'c9_cimitero' },
      { text: '📻 La cassetta. Quella cassetta. Adesso', next: 'c10_nastro' },
    ],
  },

  /* ==================== IL CIMITERO ==================== */

  c9_cimitero: {
    location: 'cimitero',
    caption: 'Il cimitero dei detenuti — ore 14:20',
    stinger: 'pressione',
    text: `Sta fuori dal muro, a mezza costa, su un terrazzamento che guarda il mare aperto — ed è fuori, questa è la prima cosa: chi ci è finito ha visto il mare per la prima volta da morto.

Si entra da un varco nel muretto a secco. E nel muretto, murata a filo, all'altezza degli occhi, c'è una lapide di marmo bianco con le lettere incise e riempite di lichene nero. Si leggono benissimo.

**SCVOLA DI ALTI PENSIERI**

E sotto, in corpo più piccolo, tre pezzi di frase separati da due virgole:

*Una vita di dolore, un pugno di polvere, un'anima immortale.*

Claudia la legge ad alta voce, tutta, comprese le virgole. Poi non dice niente. Appoggia la mano aperta sulla pietra a secco del muretto e ce la lascia il tempo di due respiri.

Non l'ha scritta un parente e non l'ha pagata una famiglia: l'ha fatta incidere lo stesso ufficio che teneva il registro, per il posto dove finiva chi non veniva reclamato da nessuno. Si entra qua dentro passando sotto una frase che promette un'anima immortale.

Poi si contano le croci.

**(🫁 Fiato −1. Si entra qua dentro passando sotto una frase che promette un'anima immortale.)**`,
    goldLoss: 1,
    sets: { sa_lapide: true },
    choices: [
      { text: '🔢 Contarle. Tutti e tre separatamente, che Gaetano vuole tre conti indipendenti', next: 'c9_croci' },
      { text: '🤲 Prima appoggiare la mano aperta sulla pietra del muretto, il tempo di due respiri', once: true, heal: 2, gold: 1, next: 'c9_croci' },
    ],
  },

  /* LE CROCI. La lapide dello Stato e il conto sono due momenti diversi: uno si legge in
     piedi all'ingresso, l'altro si fa in ginocchio in mezzo alla terra secca. */
  c9_croci: {
    location: 'cimitero',
    caption: 'Trentanove croci — ore 14:50',
    stinger: 'penna',
    text: `Sono di ferro tondo, saldate a mano, alte un metro. Non hanno nomi: hanno **numeri**, dipinti in bianco su una piastra ovale. Chi finiva qui aveva già perso il nome all'ingresso e non lo riprendeva all'uscita.

Le contano tutti e tre, separatamente, perché Gaetano vuole tre conti indipendenti.

Trentanove croci.

Poi Claudia si mette in ginocchio e conta un'altra cosa: le **depressioni**. Perché la terra sopra una fossa si assesta e fa un avvallamento lungo, larghezza di spalle, che dopo cent'anni si vede ancora se ti abbassi e guardi in radente contro la luce.

> Claudia: "Quaranta."

> Gaetano: "Ricontale."

> Claudia: "Le ho ricontate due volte. **Quaranta avvallamenti, trentanove croci.**"

Il quarantesimo sta nell'angolo di nord-est, attaccato al muretto, ed è l'unico su cui l'erba cresce diversa: non secca come il resto, non gialla. Verde. Grassa. Il verde che fa l'erba dove sotto c'è **calce**.

Il quarantesimo avvallamento sta lì e nessuno dei tre parla per un po'. Ciro ha già la gaffa in mano, girata dalla parte del legno, e non la alza: aspetta. In sessantun anni su quest'isola ha imparato che certe cose si fanno in tre o non si fanno.

> Ciro: "Signò. Decidete voi. Io la mano ce la metto o la tengo in tasca, ma la decisione non e' mia."

**(🫁 Fiato −1. Il Quaderno registra il conto: **trentanove croci, quaranta avvallamenti**. Questo dato ce l'avete comunque, e da solo vale un pezzo di verità. Quello che sta sotto il quarantesimo, invece, si vede solo scavando — e scavare in una fossa è una cosa che si fa una volta e non si disfa.)**`,
    goldLoss: 1,
    attenzione: 1,
    sets: { i_conto_fosse: true, sa_lapide: true },
    choices: [
      { text: '⛏ Scavare. Il quarantesimo, quello con l\'erba grassa. Adesso, che c\'è luce', once: true, next: 'c9_scavo' },
      { text: '🤚 Non scavare. Rimettere la gaffa in barca e portarsi via il numero', heal: 3, next: 'c9_rispetto' },
    ],
  },

  /* LO SCAVO. Era la seconda metà di c9_cimitero, e la seconda metà cominciava con «Ciro
     non discute e non chiede il permesso»: cioe' il gioco scavava in una fossa AL POSTO
     del giocatore, in una storia il cui unico tema e' cosa si fa con i morti degli altri.
     Seicentonovantuno parole senza una decisione, e la decisione era lì dentro. */
  c9_scavo: {
    location: 'cimitero',
    caption: 'Il quarantesimo avvallamento — ore 15:05',
    stinger: 'sigillo',
    text: `Ciro non discute e non chiede il permesso. Prende la gaffa, la gira dalla parte del legno, e comincia a scavare come si scava con quello che si ha.

Venti centimetri di terra secca. Poi trenta di uno strato bianco, compatto, che si spacca a lastre e sotto le lastre è ancora bianco. Calce. Tanta. Chi ha chiuso questa fossa ha voluto essere sicuro.

E sotto la calce, alla profondità di un braccio, la punta della gaffa incontra una cosa che non è pietra e non è legno, e fa un rumore che nessuno dei tre dimenticherà: un rumore **asciutto**.

Il rumore lo fanno tutti e tre insieme, con la bocca chiusa.

Ciro appoggia la gaffa per terra, si asciuga le mani sui pantaloni e non le muove.

> Ciro: "Signò. Da mo' in poi non si torna indietro. Se lo scopriamo, l'abbiamo scoperto."

La calce spaccata a lastre fa un chiaro che si vede da cinquanta metri, e il sole delle tre sta ancora alto sul terrazzamento.

**(🫁 Fiato −1: mezz'ora di gaffa, terra secca e polvere di calce, e qui l'aria si prende a piccoli sorsi.)**`,
    goldLoss: 1,
    choices: [
      { text: '🤲 Le mani. Piano: sotto c\'è una cosa che non è pietra e non è legno', next: 'c9_bottoni' },
      { text: '🧤 Prima asciugarsi le mani e fasciarle nella maglietta di ricambio, che la calce viva sul sudore brucia — e Ciro lo dice una volta sola', once: true, heal: 3, next: 'c9_bottoni' },
      { text: '📷 Fotografare la lastra di calce spaccata così com\'è, con la gaffa accanto per la scala', once: true, next: 'c9_bottoni' },
    ],
  },

  /* QUELLO CHE LA CALCE LASCIA. Era la coda di c9_scavo, e c9_scavo faceva tre cose in una
     schermata sola: scavava, scopriva un uomo con la divisa nel cimitero dei detenuti, e
     faceva partire un combattimento — tutto con `choices: []`, cioe' senza che il giocatore
     potesse decidere niente, nemmeno se le mani dentro quella calce ce le mette lui o Ciro.
     Adesso il rumore asciutto chiude una scena e la decisione e' dove va: le mani, o le
     precauzioni, o l'obiettivo. La guardia arriva comunque: il turno di notte non lo decide
     chi scava. */
  c9_bottoni: {
    location: 'cimitero',
    caption: 'Quello che la calce lascia — ore 15:20',
    stinger: 'pressione',
    text: `Ciro tira via la calce con le mani.

Non è un corpo. È **quello che la calce lascia**: la calce viva prende l'acqua e la carne e le porta via in un anno, e quello che resta è pulito, leggero, poroso, di un bianco gessoso, e sta nella posizione esatta in cui è stato messo. Un braccio piegato sul petto. La mano sotto il mento. Come uno che si è sistemato da solo per dormire, o come uno che l'hanno sistemato con cura.

E sopra lo sterno, appoggiati, ci sono i **bottoni**. Cinque bottoni di metallo, in fila, allineati come stavano cuciti, e uno di essi ha ancora sopra la stelletta.

> Claudia: *(con la voce che non le viene)* "Gaetano, quello è un bottone da divisa."

> Gaetano: "Sì."

> Claudia: "Nel cimitero dei DETENUTI."

> Gaetano: "Sì."

Dietro di loro, sul sentiero che sale dal carcere — quel sentiero che hanno fatto un'ora fa e che era vuoto — si sente un passo. Poi un altro. Il ritmo regolare, calmo, di uno che percorre un tragitto che percorre da tanto tempo e che finisce sempre nello stesso punto.

Non corre. **Fa il giro.**

**(🫁 Fiato −2, TENUTA −2. Il Quaderno registra: trentanove croci e quaranta fosse, e nella quarantesima c'è uno con la divisa. Quarto indizio — e adesso il turno di notte è arrivato dove state voi.)**`,
    goldLoss: 1,
    damage: 2,
    sets: { i_osso: true },
    combat: { enemies: ['guardia'], victory: 'c10_nastro', defeat: 'c6_ko' },
    choices: [],
  },

  /* E LA STRADA DI CHI NON SCAVA. Non e' la scelta prudente e non e' la scelta debole: e'
     l'altra. Il numero — quaranta fosse, trentanove croci — se lo portano via uguale, e
     quello che perdono e' l'osso, cioe' il quarto indizio di un mistero su quattro. La
     guardia arriva comunque, perche' il turno di notte non lo decide chi scava. */
  c9_rispetto: {
    location: 'cimitero',
    caption: 'La gaffa torna in barca — ore 15:05',
    stinger: 'campana',
    text: `Ciro rimette la gaffa sulla spalla senza commentare, e nel modo in cui non commenta c'è tutto.

Claudia si alza dalle ginocchia, si pulisce le mani sui pantaloni e resta un momento in piedi davanti al quarantesimo avvallamento, quello con l'erba grassa e verde. Non dice niente di solenne. Dice la cosa pratica, che è l'unica che non suona finta.

> Claudia: "Se lo scaviamo, domani lo sa un archeologo e dopodomani sta in una scatola con un numero nuovo." *(pausa)* "Ne ha già avuto uno, di numero."

> Gaetano: *(e non tira fuori il telefono, che per lui è una cosa enorme)* "Il conto ce l'abbiamo. Quaranta e trentanove. Il conto è la prova."

> Claudia: "Il conto è la prova."

Ciro si toglie il cappello — quel gesto che i vecchi delle isole fanno senza pensarci e che non si insegna — e lo rimette dopo tre secondi.

> Ciro: "Mio padre, quando tiravamo su una cosa che non era pesce, la ributtava e diceva una parola sola: *statte.*" *(guarda l'erba grassa)* "Statte, guagliò."

E il sentiero che sale dal carcere — quello che hanno fatto un'ora fa, che era vuoto — fa un passo. Poi un altro. Il ritmo regolare, calmo, di uno che percorre un tragitto che percorre da tanto tempo e che finisce sempre nello stesso punto.

Non corre. **Fa il giro.** E arriva uguale, perché il turno di notte non lo decide chi scava.

**(🫁 Fiato +2, 💪 TENUTA +3: avete lasciato in pace una cosa che potevate prendere, e in questo posto è l'unica azione che vi restituisce qualcosa. Il Quaderno tiene il conto delle fosse ma NON l'osso: al mistero della cella 47 vi manca un indizio, e ve lo dovete trovare da un'altra parte. 🎵 L'attenzione del Coro non sale.)**`,
    gold: 2,
    heal: 3,
    sets: { fossa_rispettata: true },
    combat: { enemies: ['guardia'], victory: 'c10_nastro', defeat: 'c6_ko' },
    choices: [],
  },

  /* ==================== IL NASTRO ==================== */

  /* LA STRADA DI CARTA PER L'OSSO. c9_rispetto dice al giocatore che l'indizio se lo deve
     trovare «da un'altra parte», e da un'altra parte non c'era: `i_osso` aveva una sorgente
     sola, la pala. Cioe' chi lasciava in pace una fossa comune — chi ha capito il gioco —
     pagava il finale migliore, e il gioco gli aveva promesso per iscritto un'altra strada.
     Adesso ce ne sono due, e non sono la stessa cosa: chi scava vede cinque bottoni, chi non
     scava legge un timbro dell'ufficio del personale. La carta e' piu' cattiva del corpo. */
  /* L'ULTIMA PAGINA. La tacca fresca della 47 (c5_graffito) era un sospetto e restava un
     sospetto: qui diventa una riga compilata su un modulo, con la data di oggi, e il numero
     non e' 1. Nessuna attenzione del Coro, e la ragione e' la cosa piu' fredda della scena:
     non l'hanno svegliato loro. Era gia' scritto prima che arrivassero. */
  /* IL CARTELLINO. `porta_44_vista` era il flag del momento in cui il mestiere di Claudia
     batte i decimali di Gaetano, e non tornava da nessuna parte. Torna cosi': non si mostra
     quell'uomo — la sofferenza dei morti si guarda con pieta', mai come spettacolo — si
     legge il MODULO che lo riguardava. La formula sta su un cartoncino a quattro colonne, e
     non l'ha inventata nessun fantasma. */
  c6_cartellino: {
    location: 'panopticon',
    caption: 'Il portacartellino della 44',
    stinger: 'penna',
    text: `Ogni porta ha, a un metro e sessanta, una cornice di ottone larga come una mano: il portacartellino, dove sta il cartoncino con chi c'è dentro. Novantotto sono vuote, e in novantotto l'ottone è verde di ossido.

Nella 44 il cartoncino c'è ancora. E l'ottone, lungo il bordo inferiore, è **lucido**: la striscia che fa il pollice di uno che ha tirato fuori e rimesso dentro lo stesso cartoncino qualche migliaio di volte.

Quattro colonne a stampa, riempite a penna, con la grafia dell'impiegato che hanno già visto sui due registri.

*Matricola:* un numero di cinque cifre.

*Posizione giuridica:* una parola, scritta senza abbreviarla.

*Provenienza:* Napoli, casa penale.

*Fine pena:* e qui non c'è una data, perché per queste tre lettere il modulo prevedeva il timbro, e il timbro c'è, battuto bene, ben inchiostrato, dritto.

**MAI**

Claudia legge le quattro colonne una alla volta, ad alta voce, piano, come ha letto il pannello del Comune. Poi rimette il cartoncino dentro la cornice, e lo rimette dal verso giusto.

> Claudia: "Gaetano, ce l'avevano un timbro. Un timbro fatto fare a posta, con dentro quella parola, perché serviva spesso."

> Gaetano: "Novantanove celle."

> Claudia: "Novantanove celle." *(e non tocca più niente)* "Quello che abbiamo appena colpito ha passato ventitré anni a quattro metri da un pezzo di ottone che diceva mai. Ad altezza occhi. Sul lato di fuori, dove lui non lo poteva leggere."

**(🕯 Il Quaderno registra le quattro colonne del cartellino della 44, e registra che per l'ultima c'era un timbro. Nessun dado, nessun oggetto: 🫁 Fiato −1, e non lo recupererete leggendo un'altra carta.)**`,
    goldLoss: 1,
    sets: { fine_pena_mai: true },
    choices: [
      { text: '🚪 Chiudere la porta della 44. Accostarla, come si accosta la porta di uno che dorme', once: true, gold: 1, heal: 3, next: 'c7_archivio' },
      { text: '📚 L\'archivio: quel numero di matricola sta su un registro', next: 'c7_archivio' },
      { text: '🕯 Fuori con Ciro. Adesso', next: 'c8_ciro' },
    ],
  },

  /* IL REGISTRO DELLE VISITE. Le 18:40 dell'atto D — il minuto in cui il trenta agosto si
     riavvolge — arrivavano senza nessun preavviso. Adesso stanno in una colonna
     prestampata, due giorni prima, scritte da qualcuno che sapeva anche i numeri di
     documento. Non e' una minaccia: e' un modulo compilato. */
  c3_registro_visite: {
    location: 'panopticon',
    caption: 'La guardiola — il registro delle visite, ore 10:26',
    stinger: 'penna',
    text: `Dentro la guardiola c'è un ripiano di formica verde, una sedia girevole senza una rotella, e un registro aperto con una biro appoggiata sopra la piega.

È un registro moderno, di cartoleria, di quelli che si comprano al supermercato per dieci euro. Colonne prestampate: *Cognome e nome · Provenienza · N. documento · Ora d'ingresso · Ora d'uscita · Firma.*

Le ultime visite guidate sono di giugno. Poi due pagine bianche.

Poi l'ultima riga scritta, e la biro è quella.

**Sabato 29 agosto.** Due nomi: il suo e il suo, scritti per esteso, con la provenienza giusta — *Scauri (LT)* — e i due numeri di documento **giusti**, cifra per cifra, compresa la lettera finale della carta d'identità di Claudia che nemmeno lei si ricorda mai.

Ora d'ingresso: **10:05**. Che è l'ora in cui sono sbarcati, e sono le dieci e ventisei.

La colonna della firma è vuota.

La colonna dell'ora d'uscita, invece, è compilata. Stessa biro, stessa mano.

**18:40**

> Gaetano: *(che ha già il telefono in mano e sta fotografando prima di parlare, perché è il suo modo di non urlare)* "Alle diciotto e quaranta noi siamo a Ventotene. Ciro chiude alle sei. Non c'è nessuna barca dopo le sei."

> Claudia: "Allora è sbagliata."

> Gaetano: "Sono sbagliate le altre due colonne, Claudia. Quella è l'unica che non può essere sbagliata, perché **non è ancora successa**."

**(🎵 Attenzione del Coro +1: qualcuno sapeva i vostri numeri di documento. 🫁 Fiato −1. Il Quaderno registra l'ora d'uscita scritta in anticipo: **18:40** — e tenetevela in testa, perché è un numero, e in questo gioco i numeri tornano.)**`,
    attenzione: 1,
    goldLoss: 1,
    sets: { registro_visite: true },
    choices: [
      { text: '🖊 Prendere la biro e firmare tutti e due la colonna della firma', once: true, damage: 3, gold: 1, sets: { firmato_il_registro: true }, next: 'c5_cella' },
      { text: '🖊 Cancellare l\'ora d\'uscita. Con la punta, girando la biro, finché il foglio non si buca', once: true, gold: 2, next: 'c5_cella' },
      { text: '🚪 Non toccare niente e salire al purgatorio', next: 'c5_cella' },
    ],
  },

  c7_ultima_pagina: {
    location: 'panopticon',
    caption: 'PRESENZE — l\'ultima pagina, ore 13:20',
    stinger: 'pressione',
    text: `Il **PRESENZE** ha due fascicoli, e questo si vede solo tenendolo aperto contro la finestra.

Il primo è cucito con lo spago, ed è quello che hanno letto: la colonna dei 1 che arriva al 31 agosto 1965.

Il secondo è **incollato**. Fogli aggiunti dopo, carta diversa, più bianca, con la colla che ha fatto le bolle e ha tirato la pagina. Nessuna intestazione a stampa: la griglia è tirata a mano, con la riga, colonna per colonna, uguale a quella stampata.

E i 1 continuano. Senza date, riga dopo riga, per undici pagine, sempre la stessa mano e sempre la stessa pressione: quella di uno che appoggia la penna, fa il segno, e non guarda quello che ha scritto perché lo scrive da ventidue anni.

L'ultima riga compilata ha una data. È l'unica di tutto il secondo fascicolo che ce l'ha: **29 agosto 2026**.

E il numero, in quella riga, non è 1.

> Claudia: "Due."

> Gaetano: "Due."

E nella colonna delle annotazioni — che in ottomila righe è vuota, sempre, in tutte le pagine di tutti gli anni — stavolta ci sono due parole, scritte piccole per starci dentro.

**non reclamati**

> Gaetano: *(e chiude il libro con due mani, piano, come si chiude una cosa che potrebbe avere ancora pagine)* "È la formula del cimitero. Sta sul muretto all'ingresso: il posto dove finiva chi non veniva reclamato da nessuno."

> Claudia: "Noi non siamo morti."

> Gaetano: "No. Siamo **presenti**. È una colonna diversa, ed è quella che tiene lui."

**(💪 TENUTA −2, 🫁 Fiato −2. 🎵 L'attenzione del Coro NON sale, e la cosa da guardare è questa: stavolta non avete fatto rumore, non avete letto ad alta voce, non avete acceso niente. Era già scritto prima che arrivaste. Il Quaderno registra la riga del 29 agosto 2026, il numero 2, e le due parole nella colonna delle annotazioni.)**`,
    damage: 2,
    goldLoss: 2,
    sets: { non_reclamati: true },
    choices: [
      { text: '✏️ Strappare la pagina. Adesso, con le due mani, e portarsela via', once: true, damage: 2, gold: 1, sets: { pagina_strappata: true }, next: 'c8_ciro' },
      { text: '📖 Rimetterlo dove stava, con la costa allineata alle altre due', gold: 1, next: 'c8_ciro' },
      { text: '⛏ Il cimitero. Se la formula è quella, il posto è quello', next: 'c9_cimitero' },
    ],
  },

  c9_registro_defunti: {
    location: 'panopticon',
    caption: 'La stanza dei registri — ore 15:40, il libro più sottile',
    stinger: 'penna',
    text: `Sullo scaffale basso, dietro i due libroni, c'è un registro sottile con la costa di tela grigia e una parola sola scritta a pennello: **DEFUNTI**.

Non è un libro di parole: è un modulo prestampato. Colonne verticali, intestazioni in corpo sei ripetute in cima a ogni pagina. *N. d'ordine · Matricola · Data del decesso · Causa · Fossa · Annotazioni.*

Righe compilate: **trentanove**. E la colonna del nome non c'è. Non l'hanno lasciata in bianco: non l'hanno prevista. Chi ha disegnato il modulo, a tavolino, con la riga, ha deciso quante colonne servivano per seppellire un uomo, e il nome non era fra quelle.

Poi c'è la quarantesima riga.

Ha il numero d'ordine. Ha la fossa: *angolo di nord-est*. Non ha la matricola, perché la matricola la danno ai detenuti. E nella colonna della causa non c'è una grafia: c'è un **timbro** a tampone, battuto storto e ribattuto sopra perché la prima volta era venuto chiaro.

**CESSAZIONE DEL SERVIZIO**

> Claudia: *(che si è messa il dito sotto la riga e non lo alza)* "Gaetano. Questo timbro non è di un cimitero."

> Gaetano: "No. È di un ufficio del personale." *(gira la pagina, e dietro non c'è niente)* "Uno è morto in una cella, e l'hanno archiviato come uno che ha smesso di lavorare. Con il timbro giusto. Perché il timbro giusto ce l'avevano."

**(🕯 Il Quaderno registra il quarto indizio sulla cella 47, e lo registra senza aprire niente: trentanove righe con la matricola, una quarantesima senza, e un timbro del personale al posto della causa di morte. 🫁 Fiato −1: la stanza dei registri, alle quattro meno venti, è più buia di quanto sia ragionevole.)**`,
    goldLoss: 1,
    sets: { i_osso: true },
    choices: [
      { text: '📄 Fotografare la pagina intera, con l\'intestazione e il timbro dentro l\'inquadratura', once: true, gold: 1, next: 'c10_nastro' },
      { text: '🕯 Uscire e dirlo a Ciro: il quarantesimo lui l\'ha visto quando aveva undici anni', next: 'c8_ciro' },
      { text: '📻 Basta carte. Il nastro del sessantacinque', next: 'c10_nastro' },
    ],
  },

  /* LA CIRCOLARE. `sequenza_porte` era un minigioco intero — Claudia impara a memoria
     l'ordine in cui quattro porte si aprono in un carcere vuoto — e non tornava da nessuna
     parte: zero letture in tutta la campagna. Torna qui, e la regola che questo gioco
     ripete piu' di ogni altra (Ada due volte, Ciro come regola tre) smette di essere una
     superstizione di paese e diventa una disposizione di servizio, numerata, con la
     ricevuta. E' la cosa piu' cattiva che questa storia possa dire: nel 1949 lo sapevano
     tutti, e la soluzione che hanno trovato e' stata una CIRCOLARE. */
  c7_circolare: {
    location: 'panopticon',
    caption: 'Le carte di servizio — un foglio ciclostilato, ore 13:35',
    stinger: 'penna',
    text: `Le carte di servizio stanno in una scatola di cartone senza coperchio, e sopra tutte c'è un foglio ciclostilato viola, di quelli in cui l'inchiostro sbava sulle curve.

Intestazione a stampa. Numero di protocollo. Data: **14 marzo 1949**.

**OGGETTO: battiture sulle imposte e sui tubi. Disposizioni al personale di vigilanza.**

Tre punti, numerati, nella lingua in cui gli uffici dicono le cose che non vogliono spiegare.

> *1) Il personale annoterà sul brogliaccio l'ora d'inizio e la durata, con l'approssimazione del minuto.*

> *2) Il personale **non risponderà in nessun caso**, né battendo né a voce, né in forma di scherzo.*

> *3) Il personale non conterà i colpi ad alta voce.*

In fondo, la firma del direttore, la sigla di chi ha ciclostilato, e sul margine — a matita, con la grafia larga di uno che scriveva appoggiato al muro — quattro parole aggiunte da un altro:

**il due è quello importante**

> Claudia: *(che ha il foglio in mano e non lo sta più leggendo)* "Gaetà. Il punto due è la frase di Ada."

> Gaetano: "È la frase di Ada."

> Claudia: "Ada dice che gliel'ha insegnata sua madre." *(guarda la data)* "E questa è del quarantanove, ed è battuta a macchina, e ha un numero di protocollo. Qualcuno l'ha scritta, qualcuno l'ha ciclostilata, e novanta uomini hanno firmato per ricevuta."

> Gaetano: "Il che vuol dire che nel quarantanove lo sapevano tutti, e la soluzione che hanno trovato è stata **una circolare**."

**(🕯 Il Quaderno registra la circolare del 14 marzo 1949, i tre punti e la nota a matita sul margine. La regola che vi hanno ripetuto in tre giorni — non si risponde — non è una superstizione di quest'isola: è una disposizione di servizio, e fu emanata perché serviva. 🫁 Fiato −1, 💪 TENUTA −2.)**`,
    goldLoss: 1,
    damage: 2,
    sets: { circolare_1949: true },
    choices: [
      { text: '📄 Piegare il foglio in quattro e metterlo in tasca: è la prova più pulita che abbiate', once: true, gold: 1, next: 'c8_ciro' },
      { text: '⛏ Il cimitero: se qualcuno bussava, qualcuno bussava da qualche parte', next: 'c9_cimitero' },
      { text: '📻 Il nastro. Adesso ha un altro peso', next: 'c10_nastro' },
    ],
  },

  c10_nastro: {
    location: 'panopticon',
    caption: 'La cappella, ore 15:10 — il nastro',
    stinger: 'nastro',
    text: `Si siedono sui gradini della cappella crollata, in mezzo al pozzo, perché è l'unico posto dove il sole entra ancora e dove le porte stanno tutte davanti e nessuna dietro. Ciro si siede con loro. Al centro non voleva venire. È venuto.

Il **Geloso** sta sulla pietra, aperto. La cassetta è dentro il vano. Il tasto PLAY è alzato.

Il gioco adesso vi dice una cosa in chiaro, senza trucchi, perché è così che si fa.

**Su quel nastro c'è la voce di Nicola Sperduto, la notte del due settembre 1965.** È l'ultima cosa registrata in questo posto e contiene informazione che non troverete in nessun registro, in nessun archivio e in nessuna testimonianza.

**E svegliare quel nastro in questo posto vi farà notare.** Non "potrebbe": vi farà notare, adesso, di sicuro, e questo carcere è una macchina costruita per sentire. E non è un modo di dire preso in prestito da voi: sta scritto sul pannello all'ingresso, l'ha messo per iscritto un ufficio, e l'acustica della torretta era una delle cose che facevano funzionare il posto.

Il Geloso sta sulla pietra col vano aperto e la cassetta dentro. Il tasto PLAY è alzato di due millimetri, e si vede.

Nessuno dei tre lo tocca. Per un minuto intero l'unico rumore nel pozzo è un fringuello sul tetto crollato della cappella.

Poi Ciro tira su la testa, perché una cosa la vuole dire prima.`,

    choices: [
      { text: '📚 Prima di toccare quel tasto: in archivio c\'era un terzo registro, sottile, che non avete aperto', requires: { flag: 'fossa_rispettata', notFlag: 'i_osso' }, next: 'c9_registro_defunti' },
      { text: '📋 "Ciro. La regola tre, quella sua. Nel quarantanove l\'avevano già scritta a macchina."', requires: { flag: 'circolare_1949' }, once: true, gold: 2, heal: 4 },
      { text: '👂 "Ciro. Dica quello che deve dire."', next: 'c10_ciro_dice' },
      { text: '🕯 Chiudere il vano del Geloso mentre si parla, così nessuno lo preme per sbaglio', once: true, next: 'c10_ciro_dice' },
      { text: '🤲 Sedersi accanto a lui sul gradino, spalla a spalla, e stare zitti un minuto prima di parlare del nastro', once: true, gold: 1, heal: 3, next: 'c10_ciro_dice' },
    ],
  },

  /* QUELLO CHE DICE CIRO. c10_nastro faceva due cose in una schermata: il gioco parlava in
     chiaro al giocatore — cosa c'e' sul nastro, e che suonarlo LO FARA' notare, non
     «potrebbe» — e poi Ciro argomentava dentro la finzione. Quell'avvertimento e' l'unica
     cosa che rende onesta la scelta piu' grossa dell'atto, e stava a meta' di
     trecentocinquanta parole, dove chi legge di fretta lo salta: se lo salta, la crudelta'
     diventa un tranello. Adesso ha la sua schermata, e qui si decide. */
  c10_ciro_dice: {
    location: 'panopticon',
    caption: 'Quello che dice Ciro — ore 15:15',
    stinger: 'pressione',
    text: `Ciro guarda il registratore come si guarda un cane che è stato buono per sessant'anni.

> Ciro: "Io v'ho portato la cassetta e v'ho portato la macchina. Sono state per sessant'anni in due cassetti diversi apposta." *(si mette le mani sulle ginocchia)* "Adesso decidete voi, ca è giusto accussì. Ma sappiate una cosa: quella non è una registrazione. Quella è **un uomo che ha lasciato la voce sua a un guaglione** perché qualcuno la sentisse. Sessantun anni che aspetta."

> Claudia: "Quindi lei dice di suonarla."

> Ciro: "Io dico che se non la suonate, quello continua a fare il turno e nessuno gli ha risposto mai." *(pausa)* "E dico pure che se la suonate, stasera qualcuno vi chiama per nome. Tenete tutte due le cose in mano, signò. Nun ce sta 'a scelta giusta."

Gaetano appoggia il pollice sul tasto PLAY e non lo premme.

**(⚠️ Non c'è la risposta buona. C'è l'informazione, e c'è la calma. Il gioco non vi giudicherà in nessuno dei due casi, e in entrambi i casi ve lo ricorderà.)**`,
    choices: [
      { text: '▶️ Premere PLAY. Qui, adesso, in mezzo al pozzo', next: 'c10_suonato' },
      { text: '⏹ Togliere il pollice. Rimettere tutto in tasca. Non oggi', next: 'c10_pulito' },
      { text: '👂 "Ciro, la nota che le ho fatto sentire sul molo. Somiglia a quello che c\'è là dentro?"', requires: { flag: 'ciro_ha_sentito' }, next: 'c10_pulito' },
      { text: '🏃 "Fuori. Sono le tre e dieci e alle cinque e un quarto stiamo in barca."', next: 'c12_corsa' },
    ],
  },

  c10_suonato: {
    location: 'panopticon',
    caption: 'PLAY',
    stinger: 'nastro',
    text: `Il tasto scende con il clac della plastica del 1965, che è un clac che la plastica non sa più fare.

Fruscio. Sette secondi di fruscio e di bobina, il respiro di una stanza vera registrato con un microfono da quattro soldi. Poi una voce, vicinissima al microfono, di uno che parla piano perché è notte e perché è solo.

> *«Due settembre millenovecentosessantacinque. Ore ventitré e dieci. Sperduto Nicola, guardia scelta. Sono rimasto io.»*

Fruscio. Un rumore di sedia.

> *«Ronda delle ventitré. Primo anello, tutte vuote. Secondo anello, tutte vuote. Cella quarantasette... »*

Pausa. Nel nastro si sente che l'uomo si è girato.

> *«...cella quarantasette, controllata, VUOTA. Come tutte le altre notti. Come da ventidue anni. Sta scritto sul registro e adesso sta pure sulla voce mia.»*

Il contagiri del Geloso continua a scattare e nessuno dei tre allunga la mano.

Sul nastro, dopo la parola VUOTA, c'è una pausa di quattro secondi in cui non si sente niente: né la sedia, né il respiro, né il vento nel cortile.

Poi il respiro torna. E non è più quello di uno che detta un verbale.`,

    choices: [
      { text: '🎧 Lasciarlo girare. Uno ha lasciato la voce sua a un ragazzo di undici anni: la si sente fino a dove arriva', next: 'c10_pianto' },
      { text: '🤲 Claudia mette la mano sul ginocchio di Ciro, che quella cassetta se la tiene da sessant\'anni, e non la toglie', once: true, gold: 1, heal: 3, next: 'c10_pianto' },
      { text: '📓 Trascrivere le parole esatte mentre girano: ora, minuto, grado — "guardia scelta", "controllata", "VUOTA"', once: true, next: 'c10_pianto' },
    ],
  },

  /* IL PIANTO. c10_suonato era gia' stata spezzata una volta e restava di trecentocinquanta
     parole, perche' teneva insieme un documento e una decisione. Il verbale della ronda
     finisce dove deve finire — «sta scritto sul registro e adesso sta pure sulla voce mia» —
     e il pianto di un uomo di quarantatre' anni, solo dentro un carcere vuoto su un'isola di
     trentasei ettari, apre la sua schermata invece di arrivare a meta' della precedente.
     Si guarda con pieta', non e' uno spettacolo. */
  c10_pianto: {
    location: 'panopticon',
    caption: 'Un uomo che piange in un carcere vuoto — ore 15:25',
    stinger: 'coro',
    text: `E poi l'uomo di quarantatré anni con la divisa addosso, solo dentro un carcere vuoto su un'isola di trentasei ettari, smette di essere una voce d'ufficio e si mette a piangere davanti a un microfono. Non urla. Non dice niente di comprensibile per undici secondi. Fa il rumore che fa un uomo grande quando non c'è nessuno. E sotto, come una traccia in un altro strato, c'è una bambina che canta la strofa che Claudia sa a memoria da ieri.

Ciro guarda il pavimento. Claudia ha la mano sulla bocca. Gaetano ha il pollice a due centimetri dal tasto STOP e non lo appoggia.

Il contagiri del Geloso continua a scattare. La bobina di destra è ancora mezza piena: sotto il pianto di quest'uomo c'è **altro nastro**, e il nastro non finisce qui.

> Ciro: *(pianissimo)* "Signò. Quella è una voce di un morto che chiede di restare. Basta. Ce l'avete."

> Claudia: "Gaetà."

> Gaetano: "C'è dell'altro sotto."

> Claudia: "Lo so che c'è dell'altro sotto. Ti sto chiedendo se lo vogliamo."

**(🫁 Fiato −1, 🎵 Attenzione del Coro +1: una voce l'avete già ascoltata fino in fondo, e questo posto sente. Il Quaderno ha il nome: **NICOLA SPERDUTO, guardia scelta, 2 settembre 1965, ore 23:10** — e la cella 47 controllata VUOTA come da ventidue anni, scritto sul registro e adesso pure sulla voce sua.)**`,
    goldLoss: 1,
    attenzione: 1,
    sets: { i_voce_guardia: true },
    choices: [
      { text: '▶️ Lasciarlo andare. Se c\'è dell\'altro sotto, si sente adesso o mai più', once: true, next: 'c10_marisa' },
      { text: '⏹ Il pollice sul tasto. Adesso. Ce l\'abbiamo, e basta', heal: 4, next: 'c10_mezzo' },
    ],
  },

  /* LA SECONDA VOCE. Era la seconda metà di c10_suonato — quattrocentonovantasei parole
     senza una decisione — e la decisione stava scritta dentro la scena: il pollice a due
     centimetri dal tasto. Un nastro che si ascolta fino in fondo e un nastro che si ferma a
     metà sono due partite diverse, e prima non lo erano. */
  c10_marisa: {
    location: 'panopticon',
    caption: 'clunk',
    stinger: 'nastro',
    text: `Poi il nastro fa **clunk**. Uno stacco netto, di quelli che fa la registrazione quando qualcuno ha premuto REC sopra a una cosa già registrata.

E parte un'altra voce. Non è del 1965. Il fruscio è diverso, il fondo è diverso, e la voce è di donna, adulta, vicinissima al microfono, con l'accento di qui:

> *«...Marisa Coraggio, ventitré settembre. Se questo lo sente qualcuno: non è vero che chiamano. Non chiamano. RISPONDONO.»*

Un respiro. Poi:

> *«Io gli ho risposto il ventisette agosto e da sei giorni sto cantando e non me ne accorgo. Ada, se lo senti tu: non venire a cercarmi al porto—»*

E poi si mette a cantare anche lei, sopra la bambina, e le due voci vanno d'accordo perfettamente, e il nastro continua per otto minuti così.

Ciro si è alzato in piedi. Ha la faccia di un uomo che ha appena visto una cosa a cui non era preparato dopo sessant'anni di preparazione.

> Ciro: "Marisa. 'A sora d'Ada." *(gli manca il fiato)* "Novantasette. Novantasette, signò. E io stavo al molo pure quella volta." *(guarda il registratore)* "L'ha registrata **dentro 'a cassetta mia**. Ha aperto il mio cassetto, ha messo il nastro nella macchina di mio padre e ha registrato sopra. E poi l'ha rimesso a posto e non m'ha detto niente."

Il nastro va avanti da solo. Fuori dal pozzo, in tutto il ferro di cavallo, novantanove porte cominciano a fare **clac** insieme.

**(🎵 Attenzione del Coro +2: l'avete svegliato, adesso sa che siete voi, e il gioco vi aveva avvertiti due volte. 🫁 Fiato −2. Il Quaderno registra MARISA CORAGGIO, 23 settembre 1997 — *non chiamano, rispondono* — e registra, sotto due voci adulte, la strofa della bambina.)**`,
    goldLoss: 1,
    attenzione: 1,
    sets: { sa_di_marisa: true, nastro_suonato: true, i_ninna_sentita: true },
    combat: { enemies: ['sciame_voci', 'eco'], victory: 'c10_claudia', defeat: 'c6_ko', loot: { gold: 1 } },
    choices: [],
  },

  /* E CHI SI FERMA A META'. Non e' gratis e non e' vigliacco: si portano via il nome della
     guardia, che e' l'indizio piu' difficile del gioco, e lasciano sotto la cassetta la
     donna del 1997 — cioe' la sorella di Ada, cioe' la cosa che serve a capire perche' Ada
     dice «finche' e' aperta non si risponde». Il Coro li ha sentiti una volta e non due. */
  c10_mezzo: {
    location: 'panopticon',
    caption: 'Il pollice sul tasto — ore 15:40',
    stinger: 'sigillo',
    text: `Il tasto sale. La bobina si ferma con la banda tesa a metà, e nel pozzo delle novantanove porte torna il rumore che c'era prima, che è nessun rumore.

Ciro butta fuori l'aria dal naso e si siede sul gradino. Non dice grazie e non dice bravo: si toglie il cappello, se lo rigira in mano due volte, e lo rimette.

> Ciro: "Aveva quarantatré anni."

> Gaetano: "Quarantatré. E ha finito il turno alle sei."

> Claudia: *(che ha già il Quaderno aperto e scrive senza guardare la pagina)* "Nicola Sperduto. Guardia scelta. Due settembre sessantacinque, ventitré e dieci." *(alza gli occhi)* "Adesso ce l'ha qualcuno, il nome. Prima ce l'aveva solo un nastro dentro un cassetto."

Gaetano chiude il vano del Geloso e si mette la macchina sotto il braccio. E poi dice la cosa vera, che gli costa, perché è uno che di solito vuole sapere tutto:

> Gaetano: "Sotto c'era dell'altro."

> Claudia: "Sì."

> Gaetano: "E non lo sapremo."

> Claudia: "No." *(gli prende il braccio libero)* "E va bene uguale. Non è che tutto quello che si può sapere si deve sapere: certe cose te le devono dire loro, non te le devi prendere."

Una porta, in alto, al terzo anello, si chiude piano. Non sbatte. Si accosta, come si accosta la porta della stanza di uno che dorme.

**(💪 TENUTA +4, 🫁 Fiato +2: vi siete fermati, e in questo posto fermarsi è una risorsa. Il Quaderno ha **il nome della guardia** — l'indizio più difficile del gioco, e ce l'avete per intero. Quello che c'era sotto, sulla cassetta, resta sulla cassetta: 🎵 il Coro vi ha sentiti una volta e non due.)**`,
    gold: 2,
    heal: 4,
    sets: { nastro_a_meta: true, i_voce_guardia: true },
    choices: [
      { text: '🚪 Fuori da questo pozzo. Adesso', tag: 'Prova di COSTITUZIONE — CD 11 (uscire in fretta da un vano dove si è respirato per venti minuti l\'aria di un vano)', check: { stat: 'COS', dc: 11, success: 'c10_pulito', fail: 'c10_soglia', failDamage: 2 } },
      { text: '🕯 Prima rimettere la cassetta nella custodia e la custodia in mano a Ciro', once: true, gold: 1, sets: { cassetta_a_ciro: true }, next: 'c10_pulito' },
    ],
  },

  c10_claudia: {
    location: 'panopticon',
    caption: 'Ha detto Claudia',
    stinger: 'voce_amata',
    text: `Le porte si fermano. Tutte insieme, sulla stessa battuta, come i cani di giovedì notte.

Il nastro, però, gira ancora. Il contagiri del Geloso continua a scattare e la bobina continua a mangiare, e nel fruscio non c'è più né il pianto né la bambina: c'è una stanza vuota e un microfono acceso.

E poi la voce dice una parola.

È la stessa voce di prima — Sperduto, la stessa gola, la stessa stanchezza — e insieme non è la sua, perché la usa un'altra cosa e l'accento è sbagliato: vocali larghe, la erre appoggiata, l'italiano di un'altra epoca, quello dei cinegiornali.

> *«Claudia.»*

Detta con calma. Come si chiama qualcuno in casa, da un'altra stanza, sapendo che ti sente.

Claudia non si gira verso il registratore.

Si gira verso **Gaetano**. Non verso la macchina che ha parlato: verso di lui. Perché quando una cosa morta dice il tuo nome tu guardi la persona con cui dormi, ed è un riflesso, e non c'entra niente la ragione.

E lo guarda per un secondo e mezzo, che è esattamente il tempo che serve a una che di mestiere legge le facce nel fotogramma in cui cambiano.

Quello che ci vede dipende da cosa lui le ha detto e da cosa no.

Ciro fa tre passi indietro sul suo ginocchio malandato, verso l'arco, perché ci sono cose in cui un estraneo non deve stare in mezzo e lui lo sa da settantadue anni. Ma prima dice l'unica cosa che ha il diritto di dire, e la dice a lei, piano:

> Ciro: "Signò. Nun rispunnite. Qualunque cosa vi viene in mente di dire, a QUELLA non si risponde."

**(Nessun oggetto, nessun fiato, nessun dado. Il Quaderno registra soltanto questo: il 29 agosto alle tre e venti una voce del 1965 ha detto "Claudia". È il punto in cui questa vacanza finisce davvero — e non l'ha rovinata il Coro.)**`,
    sets: { voce_ha_detto_claudia: true },
    choices: [
      { text: '🗣 "Sì. Lo sapevo, e non te l\'ho detto. Te lo dico adesso, e ti dico tutto."', requires: { flag: 'gaetano_ha_taciuto', notFlag: 'verita_detta' }, next: 'c11_verita' },
      { text: '🤐 Non dire niente. Spegnere il registratore e camminare verso l\'uscita', requires: { flag: 'gaetano_ha_taciuto', notFlag: 'verita_detta' }, next: 'c11_silenzio' },
      { text: '🎵 Claudia apre la bocca per rispondere — e Ciro le mette la mano sulla bocca', requires: { flag: 'claudia_ha_promesso' }, once: true, damage: 4, sets: { quasi_risposto: true }, next: 'c12_corsa' },
      { text: '🥃 Tre bicchierini di plastica sul gradino della cappella, e nessuno parla per un minuto', requires: { item: 'rum_di_ciro' }, once: true, gold: 1, heal: 4 },
      { text: '🏃 Ciro dall\'arco: "Fuori. Mo\'."', next: 'c12_corsa' },
    ],
  },

  c10_pulito: {
    location: 'panopticon',
    caption: 'Il pollice si alza',
    stinger: 'sigillo',
    text: `Gaetano alza il pollice dal tasto.

Lo fa piano, come si stacca la mano da una cosa calda, e poi chiude il vano del Geloso, mette la macchina nello zaino e il nastro nella tasca dei pantaloni, che è il posto sbagliato e comunque è il posto dove si mettono le cose che non si vogliono perdere.

Ciro butta fuori l'aria dal naso. Non dice grazie. Si alza e va a sedersi su un gradino più in alto, dove c'è più sole.

> Gaetano: "Abbiamo perso qualcosa."

> Claudia: "Sì."

> Gaetano: *(e lo dice per esattezza, perché è il suo modo)* "Non 'forse'. Là dentro ci sta l'unica testimonianza diretta di uno che era qui la notte in cui hanno chiuso. Quello che sapeva lui, adesso, non lo sappiamo. E magari ci serviva."

> Claudia: "Lo so." *(si mette il palmo aperto sulla tasca dei pantaloni di Gaetano, sopra la cassetta, senza premere)* "E lo teniamo. Ce lo portiamo a Ventotene, ce lo portiamo alle Parracine, e se stanotte ci serve lo suoniamo lì, dove c'è la luce accesa e la gente in strada e Ada in cucina." *(pausa)* "Non qua dentro. Non in mezzo a novantanove porte che stanno tutte girate verso di noi."

Ciro, dal gradino sopra, senza voltarsi:

> Ciro: "Mio padre diceva una cosa quando calavamo il palamito: *la cosa la tiri su TU, o scende lei a pigliarsi a te.*" *(pausa)* "Oggi l'avete tenuta in mano voi. Non è poco, signò."

Il sole delle tre e mezza entra nel pozzo di sbieco e ci mette dentro una barra di luce piena di polvere, e per un momento questo è solo un posto molto vecchio dove non c'è nessuno.

**(🫁 Fiato +1: avete scelto la calma, e la calma qui è una risorsa. 🎵 L'attenzione del Coro non si muove di un centimetro: oggi non vi ha sentiti. Il Quaderno resta con una pagina bianca, e la pagina bianca ve la portate addosso.)**`,
    gold: 1,
    sets: { nastro_risparmiato: true },
    choices: [
      { text: '🎒 Mettere comunque la cassetta dentro il registratore. Senza premere niente, e portarselo su stasera', once: true, gold: 1, sets: { nastro_dentro: true } },
      { text: '🏃 Fuori dal muro prima delle cinque e un quarto', next: 'c12_corsa' },
      { text: '🚤 Alla barca. Basta. Oggi è stato abbastanza', next: 'c14_cena' },
    ],
  },

  /* ==================== IL LITIGIO ==================== */

  c11_verita: {
    location: 'santo_stefano',
    caption: 'Fuori dal muro, sul terrazzamento — ore 16:00',
    stinger: 'heal',
    text: `Glielo dice fuori, al sole, perché una cosa così dentro quel posto non si dice.

Le dice tutto, in ordine, come fa lui: che giovedì notte, in terrazza, sulla registrazione c'era mezzo secondo dopo la nota. Che l'ha rallentato al venticinque per cento. Che era una parola di tre sillabe. Che era il suo nome. Che l'ha risentito quattordici volte. Che poi si è tolto le cuffie e le ha guardato dormire sulla sedia di plastica per undici minuti — **undici**, li ha contati, perché conta sempre — e poi l'ha svegliata e le ha detto "amore, andiamo a letto".

Claudia lo ascolta in piedi, con le braccia conserte, e quando finisce non piange.

> Claudia: "Undici minuti."

> Gaetano: "Sì."

> Claudia: "**Undici minuti a guardarmi dormire con una cosa in mano.**" *(e adesso alza la voce, e ha ragione di alzarla)* "Ma tu sei fuori? Tu sei completamente fuori di testa, Gaetano. Porca puttana. Due giorni. Due giorni che quella cosa sa come mi chiamo, e ieri sono scesa in una cisterna murata nel cinquantasette, ci ho messo la faccia dentro all'acqua—"

> Gaetano: "Lo so."

> Claudia: "—e tu mi tenevi la mano sul confine della posidonia dicendomi *lo so, amore*, e SAPEVI—"

> Gaetano: "Lo so, Claudia."

> Claudia: "PERCHÉ?"

E adesso tocca a lui, e ci sono due modi.

**(💪 TENUTA −4: questa parte fa male e deve fare male. 🫁 Fiato −1.)**`,
    damage: 4,
    goldLoss: 1,
    choices: [
      { text: '🫂 Dirle il motivo. Tutto, compresa la parte che lo rende peggiore', once: true, next: 'c11_perche' },
      { text: '📐 Darle i numeri: undici minuti, quattordici ascolti, mezzo secondo esatto', tag: 'Prova di SAGGEZZA — CD 12 (i numeri sono veri: è il momento a essere sbagliato, e Gaetano questo lo sbaglia spesso)', check: { stat: 'SAG', dc: 12, success: 'c11_numeri', fail: 'c11_dati' } },
    ],
  },

  /* IL MOTIVO. Era la seconda metà di c11_verita, e stava dopo la domanda «PERCHÉ?» —
     cioe' il gioco rispondeva al posto di Gaetano nel momento in cui rispondere E' il
     personaggio. Adesso ci sono due modi, e sono i suoi due modi: quello che dice la cosa
     tenera e sbagliata, e quello che si mette dietro i numeri. */
  c11_perche: {
    location: 'santo_stefano',
    caption: 'Perché avevi appena toccato la boa',
    stinger: 'heal',
    text: `E qui Gaetano non fa il conto, non fa il numero, non fa la spiegazione. Sta fermo con le mani lungo i fianchi come un ragazzo di ventidue anni.

> Gaetano: "Perché avevi appena toccato la boa."

Silenzio.

> Gaetano: "Ci hai messo dieci anni. Ci sei arrivata giovedì alle sette e dieci di sera, hai bestemmiato due volte, mi hai abbracciato attaccata a una boa di plastica, e mi hai detto *un secondo così*." *(la voce gli va)* "E io alle due di notte avevo in mano una cosa che te lo portava via. E ho pensato: gliela dico domani. E ieri ho pensato: gliela dico dopo le cisterne, che oggi ha già avuto la sua parte. E oggi me l'ha detto quel coso al posto mio, con la voce di un morto, davanti a un vecchio." *(si passa la mano sulla faccia)* "Ho fatto una cosa di merda per un motivo tenero, che è il modo peggiore di fare le cose di merda, perché mentre la fai ti sembra di volere bene."

Poi non dice più niente. Resta lì con le mani lungo i fianchi, nella posizione in cui uno si mette quando ha finito le spiegazioni e non ne ha un'altra.

Cinquanta metri più sotto Ciro guarda il mare, e non loro.

E adesso sono due secondi, e in due secondi ci sta tutto.`,

    choices: [
      { text: '🫂 Un passo avanti, senza parlare', next: 'c11_maipiu' },
      { text: '🗣 "Prima me lo dici tutto. Poi ti tocco." E fargli finire la frase, in piedi, al sole', once: true, next: 'c11_maipiu' },
      { text: '🤲 Prendergli la faccia con le due mani e tenerla ferma finché non alza gli occhi', once: true, heal: 4, next: 'c11_maipiu' },
    ],
  },

  /* MAI PIU'. c11_perche teneva insieme la confessione e la riparazione: prima le mani
     lungo i fianchi e la boa toccata dopo dieci anni, poi quattro battute in cui e' LEI a
     dettare le condizioni. In mezzo c'era una riga in cui il gioco decideva al posto del
     tavolo dentro la scena che e' di Claudia. Il gesto resta suo: quello che si scegle e'
     da dove comincia. */
  c11_maipiu: {
    location: 'santo_stefano',
    caption: 'Mai più — sul terrazzamento, ore 16:10',
    stinger: 'heal',
    text: `Claudia sta ferma ancora due secondi. Poi gli mette una mano dietro il collo e gli tira la testa sulla propria spalla, in piedi, sul terrazzamento di un carcere borbonico, alle quattro del pomeriggio.

> Claudia: "Mai più. Dillo."

> Gaetano: "Mai più."

> Claudia: "Dillo tutto, non mezzo."

> Gaetano: "Mai più ti tengo fuori da una cosa che ti riguarda. Nemmeno per un giorno. Nemmeno se ti fa male. Nemmeno se sei felice."

> Claudia: "Bravo." *(gli asciuga la faccia col dorso della mano, ruvida, come si fa con i bambini)* "Adesso ricominciamo da capo tutti e due, e stavolta siamo in due a sapere le cose. Che è l'unico vantaggio che abbiamo su quella roba là sotto: loro sono tanti e sono soli. Noi siamo due e siamo insieme."

Dall'arco, cinquanta metri sotto, Ciro fischia una volta e indica l'orologio.

**(🫁 Fiato +2, TENUTA piena. La verità è stata DETTA, ad alta voce, il 29 agosto alle quattro del pomeriggio, fuori dal muro di un carcere. Da adesso non c'è più niente che uno dei due sappia e l'altro no — e questa, meccanicamente, è la cosa più potente che abbiate fatto oggi.)**`,
    gold: 2,
    heal: 12,
    sets: { verita_detta: true },
    choices: [
      { text: '🏃 Giù di corsa: Ciro ha già il motore in mano', next: 'c12_corsa' },
      { text: '🚤 Scendere piano, tenendosi, fino alla barca', next: 'c14_cena' },
    ],
  },

  /* E L'ALTRO MODO. Il committente, sui giochi precedenti: «il mio personaggio e' un po'
     troppo da ingegnere nerd, analitico, sociopatico, che non e' esattamente come sono io».
     E' vero, ed e' meta' del personaggio: l'altra meta' e' quello che trascina fuori. Qui il
     gioco la fa scegliere, e sceglierlo analitico COSTA — perche' i numeri, in mezzo a un
     litigio vero, non sono una spiegazione: sono un posto dove nascondersi. */
  c11_numeri: {
    location: 'santo_stefano',
    caption: 'Undici. Quattordici. Mezzo secondo.',
    stinger: 'penna',
    text: `Gaetano fa la cosa che gli riesce meglio, e per la prima volta in tre giorni gli riesce male.

> Gaetano: "Allora. Il file dura quattro minuti e dodici. La nota sta a due minuti e sette. Il ritardo è di cinquecentodieci millisecondi, misurato tre volte sulla stessa traccia. L'ho rallentato al venticinque per cento, che è la soglia sotto la quale il cervello smette di riempire i buchi—"

> Claudia: "Gaetano."

> Gaetano: "—e l'ho risentito quattordici volte perché quattordici è dove la curva si appiattisce, dopo non aggiungi informazione, aggiungi solo—"

> Claudia: "**Gaetano.**"

Si ferma.

> Claudia: *(e non urla, e questo è peggio)* "Undici minuti a guardarmi dormire. Non ti ho chiesto la latenza. Ti ho chiesto perché."

Silenzio. Un gabbiano, sotto, sul terrazzamento.

> Claudia: "Lo so perché mi dai i numeri. Perché i numeri li controlli tu." *(pausa)* "Io i numeri me li sono sposati e me li tengo. Ma non stavolta. Stavolta mi dici la cosa."

Silenzio. Gaetano ha ancora il telefono in mano, con la traccia aperta e la forma d'onda sullo schermo, e il pollice fermo sopra la barra.

Lo schermo si spegne da solo dopo trenta secondi, e lui non lo riaccende.

> Claudia: "Sto aspettando."`,

    choices: [
      { text: '📵 Mettere il telefono in tasca e parlare senza niente in mano', next: 'c11_mezza' },
      { text: '📐 Provarci un\'ultima volta con un numero, e sentirselo togliere di bocca a metà', once: true, damage: 2, next: 'c11_mezza' },
      { text: '🤲 Prenderle la mano prima di parlare, che è l\'unica cosa che gli viene senza contarla', once: true, heal: 3, next: 'c11_mezza' },
    ],
  },

  /* E GLI ESCE MEZZA. La seconda meta' di c11_numeri: la cosa detta a meta' e i tre secondi
     in piu' che ci saranno per sempre. Il taglio sta sulla riga «E allora la dice», dove il
     gioco lo faceva cedere da se'. La verita' esce comunque — quello e' il patto della
     scena — ma a mollare i numeri e' il giocatore, e chi ci riprova con un'altra misura se
     la sente togliere di bocca. */
  c11_mezza: {
    location: 'santo_stefano',
    caption: 'E gli esce mezza — ore 16:10',
    stinger: 'heal',
    text: `E allora la dice, e gli esce mezza, e mezza è quello che c'è.

> Gaetano: "Perché avevi appena toccato la boa." *(la voce gli si rompe sulla seconda parola)* "Ci hai messo dieci anni e ci sei arrivata giovedì alle sette e dieci di sera, e io alle due di notte avevo in mano una cosa che te lo portava via."

Claudia sta ferma. Poi gli mette la mano dietro il collo — la stessa mano, lo stesso gesto — ma ci mette tre secondi in più, e quei tre secondi ci saranno per sempre.

> Claudia: "Mai più."

> Gaetano: "Mai più."

> Claudia: "E la prossima volta me lo dici prima dei numeri. I numeri dopo. Sempre dopo."

**(🫁 Fiato +1, 💪 TENUTA +7. La verità è stata detta, e questo conta: da adesso non c'è più niente che uno sappia e l'altro no. Ma è uscita in seconda battuta, dietro tre misure e un grafico — e la differenza fra le due strade non è nei punti: è che uno dei due ha dovuto chiederlo tre volte. Il Quaderno registra anche questo, che è l'unica pagina in cui Gaetano scrive di sé.)**`,
    gold: 1,
    heal: 7,
    sets: { verita_detta: true, verita_coi_numeri: true },
    choices: [
      { text: '🏃 Giù di corsa: Ciro ha già il motore in mano', next: 'c12_corsa' },
      { text: '🚤 Scendere piano, tenendosi, fino alla barca', next: 'c14_cena' },
    ],
  },

  c11_silenzio: {
    location: 'santo_stefano',
    caption: 'Quello che non è stato detto',
    stinger: 'coro',
    text: `Gaetano allunga la mano e ferma il nastro.

Poi chiude il vano, mette il registratore nello zaino, si alza e dice: "Andiamo, che è tardi." E si avvia verso l'arco.

Claudia resta un secondo sul gradino. Poi si alza e lo segue, e non chiede più niente.

È questa la parte peggiore: che non chiede più niente. Non fa una scenata, non lo prende per un braccio, non dice *guardami*. Fa la cosa che fanno gli adulti quando decidono che una conversazione costa troppo in questo momento: la mette da parte, con cura, in un posto dove si conserva bene.

Scendono la mulattiera in fila indiana. Gaetano davanti, Ciro in mezzo, Claudia dietro. Nessuno dice niente per duecento metri di serpentina, e non è il silenzio buono della terrazza: è quello che si fa in tre quando due hanno una cosa aperta.

A metà discesa Ciro si gira verso Gaetano e lo guarda, e non dice niente nemmeno lui, e nella sua faccia c'è scritto tutto: *guagliò, io ho settantadue anni, sposato da quarantasei. Non funziona.*

E dietro di loro, dentro il muro, il ferro di cavallo fa una cosa che non aveva fatto in tutto il giorno: **niente**. Non un clac. Non un passo. Non una nota. Sta zitto come sta zitto uno che ha capito una cosa utile e la sta mettendo via.

Perché una cosa detta a metà, per il Coro, non è un silenzio: è un **buco**. Ed è esattamente della misura giusta per infilarci una voce.

**(🎵 Attenzione del Coro +1, e stavolta non per un rumore che avete fatto: per una cosa che non vi siete detti. Il Quaderno registra una pagina che manca — e le pagine che mancano, in questa storia, hanno gli interessi.)**`,
    attenzione: 1,
    sets: { silenzio_scelto: true },
    choices: [
      { text: '🏃 Correre giù: la luce sta cambiando', tag: 'Prova di DESTREZZA — CD 11 (duecento metri di mulattiera a serpentina, e la luce va)', check: { stat: 'DES', dc: 11, success: 'c12_corsa', fail: 'c11_caduta', failDamage: 2 } },
      { text: '🚤 Alla barca, in fila indiana, senza dire niente', next: 'c14_cena' },
    ],
  },

  /* ==================== LA FUGA ==================== */

  c11_caduta: {
    location: 'santo_stefano',
    caption: 'A metà mulattiera, con le mani per terra',
    stinger: 'fail',
    text: `La mulattiera di Santo Stefano è pietra levigata da duecento anni di scarpe, e in discesa, di corsa, con la luce che cala, non perdona.

Claudia va giù sulle mani a metà del secondo tornante. Non si rompe niente: due palmi sbucciati, il ginocchio che sanguina poco e brucia molto, e trenta secondi persi a rialzarsi.

I trenta secondi sono la cosa che conta, e lo sanno tutti e due senza dirlo.

> Ciro: *(da sotto, che ha visto tutto e non urla, che urlare non serve)* "Piano, signò. La barca sta qua."

> Claudia: *(rialzandosi, con la voce di una incazzata con la pietra)* "Lo so che sta qua."

**(💪 TENUTA −2. 🫁 Fiato −1. Si arriva alla barca comunque, e Ciro non commenta i trenta secondi. Ma la luce, quando si molla, è già quella di dopo.)**`,
    damage: 2,
    goldLoss: 1,
    choices: [
      { text: '🚤 Alla barca. Ciro ha il motore in mano', next: 'c12_corsa' },
    ],
  },

  c12_corsa: {
    location: 'panopticon',
    caption: 'Novantanove porte — ore 17:12',
    stinger: 'pressione',
    text: `La luce cambia tutta insieme, come cambia sulle isole: il sole scende sotto il bordo del muro di ponente e in tre minuti il ferro di cavallo passa dal giallo al grigio, e le celle — che con la luce alta erano buchi neri — diventano tutte dello stesso colore del corridoio.

Ciro guarda l'orologio, e poi guarda il cielo, e poi dice la frase con una calma che fa più paura di un urlo.

> Ciro: "Sono le cinque e dodici. Alle cinque e un quarto stiamo in barca. Corrite."

L'unica via per l'arco è il corridoio del secondo anello: la curva che non si raddrizza mai, novantanove porte a sinistra e il vuoto sopra la cappella a destra, e in mezzo sessant'anni di roba per terra — travi cadute, calcinacci, un pezzo di ringhiera piegato, una branda di ferro messa di traverso da qualcuno che non c'è più.

E dietro, nel corridoio, comincia il clac.

Non insieme. **A rincorsa**: la prima porta, poi la seconda, poi la terza, con lo stacco che si accorcia — il rumore di una cosa che percorre la curva più veloce di voi e che conosce la strada meglio di voi perché la fa da sessantun anni.

Ciro parte primo. Settantadue anni, il ginocchio malandato, la gaffa in mano come un bastone, e va **avanti** a fare strada, perché è quello che fa uno che conosce il mare.

> Ciro: "Dove metto i piedi io! DOVE METTO I PIEDI IO!"

**(🏃 Si corre nella curva. Un tasto solo: si salta. Il fallimento non è una morte — è una cosa peggiore, e cioè che qualcuno vi tira su per la cintura in un posto dove non volevate essere tirati su.)**`,
    minigame: {
      type: 'corsa', hero: 'ciro', success: 'c14_cena', fail: 'c6_ko',
      tag: 'La curva del ferro di cavallo — dietro Ciro, e non si guarda indietro',
      config: { titolo: '🏃 Novantanove porte', ostacoli: 10, tema: 'tornanti', velocita: 285 },
    },
    choices: [],
  },

  /* ==================== IL RITORNO E LA CENA ==================== */

  c14_cena: {
    location: 'paese',
    notturno: true,
    caption: 'Ventotene, la Marisqueria — ore 21:10',
    stinger: 'heal',
    text: `Sono in barca alle cinque e diciotto. Ciro non commenta i tre minuti.

La traversata di ritorno è la cosa più bella della giornata: il sole basso da sinistra, il mare colore ottone, Santo Stefano che si rimpicciolisce dietro e ridiventa una gobba con una cosa sopra. A metà del braccio di mare — sopra gli ottantadue metri — Ciro non spegne il motore e nessuno gli chiede di spegnerlo.

Alle sei meno cinque la Santa Candida è ormeggiata al terzo pontile. Ciro guarda l'orologio, poi il cielo, e slega la cima con una faccia da uno che ha rispettato un patto con se stesso per la sessantunesima estate di fila.

Alle sei e dieci sono sul molo con le bombole vuote, la muta addosso e la faccia di tre persone che hanno passato un pomeriggio dentro un carcere e non l'hanno ancora detto a nessuno.

**(🫁 Fiato +1: la traversata di ritorno, col sole basso da sinistra, è l'unica mezz'ora della giornata in cui non è successo niente.)**`,
    gold: 1,
    choices: [
      { text: '🍽 Alla Marisqueria. Fame vera, e Ciro non si fa pregare', next: 'c14_marisqueria' },
      { text: '🚿 Prima su alle Parracine a levarsi il sale, e poi giù di nuovo a piedi', once: true, heal: 4, gold: 1, next: 'c14_marisqueria' },
    ],
  },

  /* LA MARISQUERIA. La prima metà di c14_cena stava in BARCA e la seconda a tavola in
     paese, con `location: 'paese'` per tutte e due: cioè mezza scena raccontava la
     traversata di ritorno mentre sullo schermo c'erano le case del paese. Un luogo per
     scena, sempre — e cinquecentonovantaquattro parole erano due scene travestite da una. */
  c14_marisqueria: {
    location: 'paese',
    notturno: true,
    caption: 'La Marisqueria — ore 21:10',
    stinger: 'heal',
    text: `---

**Alla Marisqueria, alle nove e dieci di sera, sono tre persone che hanno fame.**

Tavolino fuori, tovaglietta di carta, il vino bianco nel secchiello che sudano tutti e tre allo stesso modo. Le **lenticchie di Ventotene** — quelle piccole, che si coltivano sui terrazzamenti e costano come un peccato — con i totani. Poi il pesce, quello che c'era. Poi altro pane, perché il sugo delle lenticchie non si lascia.

E succede la cosa che non si programma: **ridono**.

Ciro racconta di quando nel millenovecentonovantuno portò a Santo Stefano un troupe della televisione svizzera e il fonico gli chiese di stare zitto, e lui, che a quel tempo teneva trentasette anni e il carattere di uno di trentasette anni, gli rispose una cosa che non si può ripetere e che Claudia si fa ripetere tre volte, e alla terza volta ride così tanto che deve appoggiare la fronte sul tavolo.

> Claudia: *(risalendo dal tavolo, con gli occhi lucidi di quell'altra cosa)* "Ciro, lei domani ha da fare?"

> Ciro: "Io ho da fare tutti i giorni, signò, e non faccio niente."

> Claudia: "Domani è il nostro ultimo giorno. Il traghetto parte alle cinque e mezza del pomeriggio."

> Ciro: *(riempie i tre bicchieri, compreso il suo, e lo fa con l'attenzione di uno che sta dicendo una cosa importante con le mani)* "Allora domani alle otto sto al molo. Non me lo dovete chiedere. E vi porto due cose che stasera vado a prendere in cantina."

**(🫁 Fiato +2 e 💪 TENUTA piena: questo è il modo in cui si recupera in questo gioco, e non ce n'è un altro. Si mangia, si ride, e qualcuno riempie il bicchiere anche a se stesso.)**`,
    gold: 2,
    heal: 8,
    choices: [
      { text: '🖊 Girare la tovaglietta e mettere in fila tutto quello che sapete. Adesso, prima di dormirci sopra', next: 'c14_tovaglietta' },
      { text: '🍋 Ancora un quarto d\'ora così, senza parlare di niente', once: true, heal: 4, gold: 1, next: 'c14_tovaglietta' },
    ],
  },

  /* LA TOVAGLIETTA. È la scena in cui il gioco mette in fila le prove, e stava in coda a
     una cena: quattrocentottantatré parole in cui si passa dal ridere alla ricetta con cui
     hanno chiuso cinque cisterne. Sono due cose diverse e vanno guardate separate. */
  c14_tovaglietta: {
    location: 'paese',
    notturno: true,
    caption: 'La tovaglietta di carta, girata',
    stinger: 'penna',
    text: `Poi Gaetano fa la cosa da Gaetano. Prende la tovaglietta di carta, la gira, e con la biro del conto ci scrive quello che hanno addosso, in colonna, come una lista della spesa.

E accanto ad alcune coppie di righe mette una freccia.

> Gaetano: "Calce più quel pezzo di muro della 47. È la stessa ricetta con cui hanno chiuso cinque cisterne: materiale del posto e calce viva, sta scritto dentro la malta. Con quella una bocca si **richiude**." *(la biro passa a un'altra coppia di righe)* "Il coltellino più la resina che sta nel cassetto degli attrezzi di Ada: in acqua il coltello si lega, l'ha detto lei." *(e poi la punta si ferma sopra due righe e non le collega)* "E poi ci sta il rum con la benzina. E ci sta il registratore col nastro."

> Ciro: *(che ha guardato la tovaglietta e ha capito tutto senza leggere niente)* "Quelle due lasciatele per ultime."

> Claudia: "Perché?"

> Ciro: "Perché una brucia e l'altra parla. E in un posto chiuso, signò, quella che parla fa più danno." *(alza il bicchiere)* "Salute."

**(🫁 Fiato +2 e TENUTA piena: questo è il modo in cui si recupera in questo gioco, e non ce n'è un altro. Oggetto: un sacchetto di TARALLI dal forno, per dopo. 🔧 E sulla tovaglietta di carta ci sono quattro conti che tornano: apritevi lo zaino e provateli.)**`,
    gold: 2,
    heal: 14,
    item: 'taralli',
    sets: { cena_marisqueria: true, squadra_di_tre: true },
    choices: [
      { text: '🍽 Le lenticchie di Ventotene, e chiederne il bis senza vergogna', once: true, gold: 1, heal: 4 },
      { text: '🥃 L\'ultimo rum con Ciro, e stare zitti insieme per l\'ultimo minuto', requires: { item: 'rum_di_ciro' }, once: true, gold: 1, heal: 3 },
      { text: '🏠 Su, alle Parracine. Duecento metri di muretti a secco', next: 'c15' },
    ],
  },

  c15: {
    location: 'bnb',
    notturno: true,
    caption: 'Le Parracine, ore 00:20 — fine del terzo giorno',
    stinger: 'heal',
    text: `La salita coi muretti a secco, di notte, coi capperi che sanno di limone se li strofini. A metà scala la porta della signora dei fagiolini è chiusa e la luce è spenta.

In cima, Le Parracine. Ada ha lasciato accesa la lampadina sotto la pergola e un piatto coperto da un altro piatto sul tavolo di fuori, con un foglietto sopra: *"Se avete fame."* Non hanno fame. Il gesto conta uguale.

Nessuno dei due le dice, stasera, che sul nastro di una guardia morta nel sessantacinque c'è la voce di sua sorella. Ci sono cose che si dicono di giorno.

Nel cassetto degli attrezzi, sotto il lavandino di fuori, Gaetano trova una **resina epossidica** bicomponente ancora buona e la mette nello zaino senza dire niente, perché è il tipo di uomo che alle mezzanotte e venti pensa a legarsi il coltello alla cintura.

Sulla terrazza, alle nove e mezza di sera, ci sono state cinquantatré cose. Adesso ce ne sono due: il rumore delle cicale e Santo Stefano, che di notte non è più un ferro di cavallo — è una gobba nera con dentro un posto in cui oggi sono stati.

Sullo specchio della stanza c'è ancora il foglietto attaccato col nastro, quello con il programma scritto da Claudia il primo giorno. Il rigo di oggi è cancellato con due righe.

Sotto, il rigo dell'ultimo giorno:

**"sab 30 — valigie, ultimo bagno, traghetto 17:30"**

E accanto, aggiunto stasera con la biro del conto della Marisqueria, con la grafia di Gaetano che non è mai stata così poco ordinata:

**"Ciro alle 8. Portare tutto."**

**(Oggetto: RESINA EPOSSIDICA. 🫁 Fiato +2: Ada ha lasciato un piatto coperto da un altro piatto, e quel gesto vale aria.)**`,
    gold: 2,
    item: 'resina',
    choices: [
      { text: '📻 Il Geloso è nello zaino con la cassetta dentro. E qui la luce è accesa e c\'è gente in strada, come aveva detto lei', requires: { flag: 'nastro_dentro' }, once: true, next: 'c15_nastro' },
      { text: '🖊 Aggiungere il rigo di domani sul foglietto dello specchio, con la biro del conto', once: true, gold: 1, next: 'c15_notte' },
      { text: '🛏 Basta. A letto, e domani è l\'ultimo giorno', next: 'c15_notte' },
    ],
  },

  /* LA NOTTE. Era la coda di c15, e la coda di c15 è la cosa più spaventosa dell'atto:
     l'isola, per la prima volta in tre notti, non fa NIENTE. Una scena che dura una notte
     intera non può stare in fondo a una salita di muretti a secco. */
  c15_notte: {
    location: 'bnb',
    notturno: true,
    caption: 'La notte in cui l\'isola non fa niente',
    stinger: 'voce_amata',
    text: `Claudia si addormenta in quattro minuti, come sempre, con una gamba fuori dal lenzuolo e la fede al collo.

E dopo venti minuti, come ieri notte, comincia a **cantare nel sonno**. Piano, con la bocca quasi chiusa, intonatissima. Cinque strofe, nell'ordine giusto, e poi da capo.

Gaetano ci mette più tempo, come sempre. Sta a fissare il ventilatore a pale e fa il conto della giornata come fa il conto di tutto: un vecchio in squadra, quattro indizi sulla 47, ottomilaquarantuno tacche, quaranta fosse e trentanove croci, ottantadue metri di fossa misurata, un nome — **Nicola Sperduto** — e domani alle cinque e mezza un traghetto.

Poi si gira verso di lei, le mette una mano sulla schiena, e conta il tempo tra una strofa e l'altra. È regolare. Diciannove secondi. È **regolare**, e questo è il problema.

Poi si addormenta anche lui.

E l'isola, per la prima volta in tre notti, non fa niente.

Non una nota. Non un cane. Non una porta. Niente di niente, per tutta la notte, dalle due alle sei e mezza del mattino: il silenzio più pulito e più completo che quest'isola abbia fatto da quando ci sono arrivati.

Ed è, di gran lunga, la cosa più preoccupante che abbia fatto finora.

**(Oggetto: RESINA EPOSSIDICA. 🫁🫁 IL TERZO GIORNO È CHIUSO. ⛑ CHECKPOINT: dentro le parracine si dorme — TENUTA piena, mosse ricaricate, e da qui si riparte se domani va male. Domani è domenica 30 agosto: valigie, ultimo bagno, e il traghetto per Formia alle 17:30.)**`,
    gold: 1,
    fullHeal: true,
    recharge: true,
    sets: { giorno_29_chiuso: true },
    choices: [
      { text: '🫂 Restare un minuto sulla terrazza prima di dormire, senza dire niente', once: true, gold: 1, heal: 4, next: 'd0' },
      { text: '☀️ Domenica 30 agosto: l\'ultimo giorno', next: 'd0' },
    ],
  },

  /* IL NASTRO, ALLE PARRACINE — dove Claudia aveva detto che si potesse.
     Nasce da due difetti veri, trovati il 24 agosto 2026 dallo strumento dei flag orfani.
     Il primo: `nastro_dentro` era l'unico effetto di una scelta senza `next`, cioe' il
     giocatore metteva la cassetta nel registratore e non succedeva niente, mai.
     Il secondo e' peggio, ed e' nel motore: js/combat.js ha da sempre un effetto scritto
     per `nastro_bruciato` — il boss parte con sei punti vita in meno, «quella voce non ha
     piu' un posto dove tornare» — e NESSUNA SCENA DEL GIOCO impostava quel flag. Un premio
     scritto, collaudato, e irraggiungibile: il motore prometteva una cosa che la storia
     non concedeva. Adesso si arriva, e si arriva solo passando da qui.
     La paura sta nel dato, non nell'aggettivo: un nastro del 1965 che contiene il rumore
     della stanza in cui lo si sta ascoltando adesso. Le cicale di stanotte, il ventilatore
     di Ada, il piatto coperto dall'altro piatto. Gaetano non lo commenta: lo cronometra. */
  c15_nastro: {
    location: 'bnb',
    notturno: true,
    caption: 'Le Parracine, sotto la pergola — ore 00:41',
    stinger: 'voce_amata',
    text: `Lo fanno sul tavolo di fuori, sotto la lampadina, col piatto coperto dall'altro piatto spostato di venti centimetri per fare posto.

Claudia dice di sì col mento. Aveva ragione lei stamattina e ha ragione adesso: qui c'è la luce accesa, giù in strada c'è gente che ride davanti al bar, e dietro il muro Ada guarda la televisione col volume basso. Se c'è un posto sulla terra dove si può premere quel tasto, è questo.

> Gaetano: "Trentasette secondi. Poi lo stacco."

> Claudia: "Trentasette."

Il Geloso fa il rumore che fa una macchina del 1962 quando il nastro parte: un tonfo, un fruscio, e dopo un secondo e mezzo la banda magnetica trova la testina.

**00:04** — Una sedia su un pavimento di cemento. Un uomo che si schiarisce la gola.

**00:09** — La voce. Napoletano di terraferma, cinquant'anni, la cadenza di uno abituato a dettare: *"...adesso è aperto e resta aperto. Io il turno l'ho finito alle sei."*

**00:14** — Un rumore lungo, di ferro su ferro, e sotto — piano, come un motore in un'altra stanza — un ronzio.

E qui Gaetano mette il dito sul cronometro e non lo toglie più.

Perché quel ronzio è **un ventilatore a pale**. Ed è il ventilatore di Ada, quello dietro il muro, che gira a due metri e mezzo da questo tavolo, adesso.

**00:19** — Le cicale. Non delle cicale: **queste** cicale, quelle che stanno cantando addosso alle loro spalle in questo momento, con lo stesso strappo ogni sette secondi che a Gaetano è entrato in testa da tre giorni e che ha smesso di sentire.

**00:26** — Un piatto di ceramica appoggiato sopra un altro piatto di ceramica.

**00:31** — Una voce di donna, vicinissima al microfono, che dice due parole con la cadenza esatta di Claudia:

> *«Trentasette secondi.»*

**(🎵 Attenzione del Coro +1: gli avete dato ascolto in un posto dove si sente.)**`,
    attenzione: 1,
    sets: { nastro_ascoltato_su: true },
    choices: [
      { text: '⏹ Staccare adesso. Ventitré secondi, non trentasette: quattro secondi rubati', once: true, tag: 'Prova di DESTREZZA — CD 10 (il tasto STOP di un registratore del 1965 è duro, e la mano che lo preme trema)', check: { stat: 'DES', dc: 10, success: 'c15_dopo', fail: 'c15_tasto' } },
      { text: '⏱ I trentasette fino in fondo, come detto. Perché è stato detto', damage: 2, gold: 1, next: 'c15_dopo' },
    ],
  },

  /* DOPO. La seconda metà di c15_nastro: il piatto che sta dove lo hanno spostato, il
     ventilatore che gira, e due persone che si dicono la cosa. Va guardata da sola, dopo
     che il nastro ha smesso, perché è tutta nel silenzio che viene dopo. */
  c15_dopo: {
    location: 'bnb',
    notturno: true,
    caption: 'Il piatto sta dove lo hanno spostato',
    stinger: 'voce_amata',
    text: `Gaetano stacca a **00:33**. Quattro secondi prima del previsto, e questa è l'unica bugia che dice in tutta la vacanza.

Restano fermi. Il piatto sta dove lo hanno spostato. Il ventilatore di Ada gira. Le cicale fanno lo strappo ogni sette secondi. La lampadina sotto la pergola ha una falena.

> Claudia: *(e non ha la voce che dovrebbe avere: ha una voce ferma, e fa più paura così)* "Gaetà. Quella roba non ha registrato il sessantacinque."

> Gaetano: "No."

> Claudia: "Ha registrato **stasera**."

> Gaetano: *(e per una volta il numero non lo tranquillizza)* "Il nastro è del sessantadue, la cassetta è chiusa dal sessantacinque e la scatola stava in un cassetto a Ventotene. Non c'è nessun modo." *(mette il registratore giù, piano, e si pulisce la mano sui pantaloni come se l'avesse toccata)* "E l'ho sentito."

**(⚠️ 🎵 Attenzione del Coro +1: gli avete dato ascolto in un posto dove si sente. 💪 TENUTA −2. Ma adesso sapete una cosa che nessun archivio poteva dirvi — quel nastro non è una registrazione del passato, è **un posto dove una voce sta**. E una voce che sta in un posto si può sfrattare.)**`,
    damage: 2,
    sets: { nastro_ascoltato_su: true },
    choices: [
      /* IL PREMIO CHE IL MOTORE ASPETTAVA DA SEMPRE: js/combat.js legge nastro_bruciato e
         toglie sei punti vita al boss. Non era raggiungibile da nessuna parte. */
      { text: '🔥 La cucina di Ada. La fiamma del fornello, il nastro tirato fuori dalla cassetta a mano, e restare a guardare finché non è tutto', once: true, damage: 1, sets: { nastro_bruciato: true }, next: 'c15_bruciato' },
      { text: '🎧 Le cuffie, e riascoltare gli ultimi trenta secondi tre volte scrivendo i tempi esatti', once: true, gold: 2, sets: { i_nastro_stanza: true }, next: 'c15_tempi' },
      { text: '📦 Rimetterlo nella scatola, la scatola nello zaino, e non parlarne fino a domani', heal: 2, next: 'd0' },
    ],
  },

  c15_bruciato: {
    location: 'bnb',
    notturno: true,
    caption: 'La cucina di Ada — ore 00:58',
    stinger: 'sigillo',
    text: `Ada non fa domande. Questa è la cosa che di lei non si dimenticherà.

Si alza dalla poltrona, va in cucina, accende il fornello grande e mette da parte la caffettiera per fare posto. Poi si appoggia allo stipite con le braccia incrociate e resta lì a guardare, perché è la sua cucina.

Il nastro esce dalla cassetta a mano, girando il perno col mignolo, e viene fuori lungo — dieci, quindici metri di banda marrone che si arriccia sul pavimento come una cosa che non vuole. Gaetano lo dà alla fiamma a pezzi di un palmo per volta, e ogni pezzo fa una fiammata verde di due secondi e un odore che resterà nella cucina per tre giorni.

A metà, quando dentro non ci sta più niente di registrabile, il ronzio del ventilatore di Ada — quello dietro il muro, quello che c'era anche sul nastro — **si ferma a metà giro**. L'interruttore è su ON. Le pale sono ferme.

Nessuno dei tre dice niente. Ada guarda il ventilatore, guarda il fornello, e poi fa l'unica cosa da fare: apre la finestra della cucina, che è agosto.

La finestra aperta non cambia niente: l'aria di agosto entra e sta ferma anche lei.

In mano a Gaetano ci sono ancora sei o sette metri di nastro arricciato, e il fornello grande è acceso.

Ada non guarda il fornello. Guarda Claudia, e non è la prima volta stasera.

**(💪 TENUTA −1: due dita bruciate, quelle con cui si tiene il nastro sopra la fiamma.)**`,
    damage: 1,
    choices: [
      { text: '🔥 Andare avanti. Il resto del nastro, un palmo per volta, finché non finisce', next: 'c15_ada' },
      { text: '🌬 Spegnere il fornello e guardare le pale ferme, tutti e tre, senza dire niente', once: true, next: 'c15_ada' },
      { text: '🤲 Mettere una mano sul braccio di Ada, che sta allo stipite con le braccia incrociate e non ha fatto una domanda', once: true, heal: 3, next: 'c15_ada' },
    ],
  },

  /* ADA. La seconda meta' di c15_bruciato. Il fatto fisico — quindici metri di banda
     marrone, le fiammate verdi, il ventilatore che si ferma a meta' giro con l'interruttore
     su ON — sta di la'; qui c'e' la persona: una donna che dice la cosa che si tiene da
     ventinove anni e poi dice l'ora della colazione, che e' il suo modo di tenere in piedi
     due persone. Ada e' un'alleata senza doppi fondi e non parla in coda a un falo'. */
  c15_ada: {
    location: 'bnb',
    notturno: true,
    caption: 'Ada, in cucina, col ventilatore fermo — ore 01:05',
    stinger: 'campana',
    text: `> Ada: "Mia sorella cantava a bocca chiusa. Come lei." *(indica Claudia col mento, senza guardarla)* "L'ho sentita, la prima notte, dal corridoio. E non v'ho detto niente perché non si dice."

> Claudia: "Ada—"

> Ada: "Il fornello lo spengo io." *(pausa)* "Voi domani mattina fate colazione alle otto e venti come sempre, e vi mangiate tutto."

Quando il nastro è finito, il ventilatore riparte da solo, dalla metà di giro dove si era fermato.

**(🔥 IL NASTRO NON ESISTE PIÙ. Quella voce non ha più un posto dove tornare: allo scontro finale la cosa che vi aspetta parte con **sei punti vita in meno**. 💪 TENUTA −1 per la mano, che si è bruciata due dita. 🫁 Fiato +3: Ada vi ha fatto sedere e vi ha dato l'acqua col limone. Il Quaderno registra l'unica prova distrutta di proposito in tutta la storia, e la ragione: non serviva sapere. Serviva togliergli la stanza.)**`,
    damage: 1,
    heal: 3,
    gold: 2,
    sets: { nastro_bruciato: true, ada_ha_visto: true },
    choices: [
      { text: '🫂 Restare in cucina con Ada finché non spegne lei', once: true, heal: 3, gold: 1, next: 'c15_notte' },
      { text: '☀️ Su, a dormire. Domenica 30 agosto è l\'ultimo giorno', next: 'c15_notte' },
    ],
  },

  c15_tempi: {
    location: 'bnb',
    notturno: true,
    caption: 'Sotto la pergola, con le cuffie — ore 01:20',
    stinger: 'penna',
    text: `Tre passaggi, cuffie chiuse, il cronometro del telefono in mano e il Quaderno aperto sul tavolo.

Alla terza volta il numero c'è, e non è quello che si aspettava.

Le cicale sul nastro fanno lo strappo ogni **sette secondi e due decimi**. Le cicale addosso alle loro spalle, contate a mano su due minuti, lo fanno ogni **sette secondi e due decimi**.

Ma non sono in fase. Il nastro è **avanti di un secondo e quattro decimi**.

> Gaetano: "Non è una copia di stasera."

> Claudia: "E cos'è?"

> Gaetano: *(e lo dice con la calma sbagliata, quella di uno che ha trovato la risposta e preferiva non trovarla)* "È stasera registrata un secondo e quattro decimi prima che succeda."

Si toglie le cuffie e le appoggia sul tavolo, e per la prima volta in tre giorni non ha un'altra misura da fare.

> Claudia: "Quindi lì dentro c'è una cosa che sente prima."

> Gaetano: "Sì."

> Claudia: *(e non è una battuta, e lui non ride)* "Benvenuta al club."

**(📓 Il Quaderno ha il numero: un secondo e quattro decimi di anticipo, misurato tre volte. È la stessa misura dell'eco nella seconda cisterna, ed è la stessa cosa. 🫁 Fiato +1: avere un numero, per lui, è riposare.)**`,
    gold: 1,
    sets: { i_nastro_stanza: true, sa_anticipo: true },
    choices: [
      { text: '📻 Adesso bruciarlo. La cucina di Ada, il fornello grande', once: true, damage: 1, sets: { nastro_bruciato: true }, next: 'c15_bruciato' },
      { text: '📦 Nella scatola, nello zaino, e domani si parte comunque', heal: 2, next: 'c15_notte' },
    ],
  },

  /* LE SCONFITTE DELL'ATTO C. Ogni azione fisica e ogni domanda riuscivano sempre, e una cosa
     che riesce sempre non e' un'azione: e' una frase. Nessuna di queste chiude un contenuto —
     si arriva dove si doveva arrivare — e a costare e' il MODO. */
  c6_vista: {
    location: 'panopticon',
    caption: 'Dieci secondi di torcia nella fessura',
    stinger: 'fail',
    text: `La fessura sotto la 44 è alta due dita e il fascio ci entra di sbieco. Dieci secondi, come detto.

Al settimo la luce trova qualcosa e torna indietro cambiata: non riflessa da una parete, riflessa da una superficie **bagnata**, a un metro e mezzo dalla porta, all'altezza di un torace.

All'ottavo la fessura si chiude. Non con un colpo: qualcosa si appoggia da dentro, dalla parte del pavimento, e il fascio muore contro una cosa morbida.

> Claudia: *(che ha la mano di Gaetano nel gomito e lo tira indietro di quaranta centimetri)* "Spegnila."

> Gaetano: "L'ho vista."

> Claudia: "**Spegnila.**"

La spegne. Dall'altra parte, dopo tre secondi, la cosa appoggiata si sposta — e la fessura torna a essere una fessura, con dentro il buio di prima.

**(💪 TENUTA −3. 🎵 Attenzione del Coro +1: la luce va nelle due direzioni, e per dieci secondi qualcuno vi ha visti meglio di come l'avete visto voi. Il Quaderno registra la distanza: un metro e mezzo dalla porta, e ad altezza di torace.)**`,
    damage: 3,
    attenzione: 1,
    sets: { visto_dalla_44: true },
    choices: [
      { text: '🚪 Via dalla 44. Adesso, e camminando all\'indietro', next: 'c6_del_suono' },
    ],
  },

  c3_tre_conti: {
    location: 'panopticon',
    caption: 'Tre conti, tre numeri',
    stinger: 'fail',
    text: `Il metodo è il suo e non si discute: tre persone contano separatamente, senza parlarsi, e poi si confrontano i numeri. Se coincidono, il numero è quello.

> Gaetano: "Novantanove."

> Claudia: "Novantanove."

> Ciro: "Cento."

Rifanno. Gaetano novantanove, Claudia cento, Ciro novantanove.

Rifanno una terza volta, piano, indicando col dito, e stavolta escono tre numeri diversi: novantanove, cento, novantotto.

> Gaetano: *(e mette giù la mano, e non riprova)* "Non è che contiamo male."

> Claudia: "No."

> Gaetano: "È che le celle sono novantanove e ne stiamo vedendo una in più. A turno. Uno per volta."

Nessuno chiede quale.

**(🫁 Fiato −1, 💪 TENUTA −2. Il Quaderno registra i tre conti e la loro differenza, che è l'unico dato che serve: non il numero, la DIFFERENZA. E il metodo dei tre conti indipendenti, da qui in avanti, in questo posto non funziona più.)**`,
    goldLoss: 1,
    damage: 2,
    sets: { i_conto_rotto: true },
    choices: [
      { text: '🚪 Salire al secondo ordine. Senza contare più niente', next: 'c3_purgatorio' },
    ],
  },

  c2_ora_sbagliata: {
    location: 'barca',
    caption: 'L\'ora sullo schermo, e l\'ora sulla foto',
    stinger: 'fail',
    text: `La foto dello schermo dell'ecoscandaglio esce mossa la prima volta e buona la seconda. Il verde è leggibile, il numero della profondità è leggibile, e in basso a destra c'è l'ora dello strumento.

Gaetano guarda la foto sul telefono e poi guarda l'orologio del telefono, e i due numeri non sono lo stesso numero.

Lo strumento dice **09:14**. Il telefono dice 09:14. La foto — la foto scattata dal telefono, allo schermo dello strumento, adesso — dice **09:26**.

> Gaetano: "Rifacciamola."

La rifà. La seconda foto dice 09:26. La terza dice 09:26. Lo schermo, davanti agli occhi, dice 09:14, e continua a scorrere normale.

> Claudia: "Dodici minuti."

> Gaetano: *(che sta già facendo il conto e vorrebbe non averlo fatto)* "Dodici minuti avanti. Non indietro."

**(💪 TENUTA −2. Il Quaderno registra i dodici minuti di scarto fra l'ora dello schermo e l'ora della fotografia dello schermo, e registra la direzione — AVANTI — che è l'unica cosa che nessuna spiegazione tecnica copre.)**`,
    damage: 2,
    sets: { i_dodici_minuti: true },
    choices: [
      { text: '🚤 Basta foto. A Santo Stefano', next: 'c2_gola' },
    ],
  },

/* ============================================================================
   LE NOVE SCENE DI FALLIMENTO dell'atto C. Stessa ragione dell'atto B: la
   soglia dei momenti d'incertezza (uno ogni quattro scene) è l'unica rossa di
   Pandataria, e gli altri quattro giochi la rispettano. Ma una prova senza il
   suo ramo scritto è un check che non può dire no — quindi ognuna di queste ha
   il suo esito, e l'esito NON è «lo stesso posto con due punti in meno».
   ========================================================================== */

  c3_rampa: {
    location: 'panopticon',
    caption: 'La rampa del secondo ordine — dove la ringhiera non c\'è',
    stinger: 'fail',
    text: `La rampa del secondo ordine ha perso la ringhiera nel 1965, quando il carcere ha chiuso e la ghisa è diventata ghisa da vendere.

Quello che resta sono i ventidue attacchi nel muro, uno ogni ottanta centimetri, e cinque metri di scala aperta sul vuoto del ferro di cavallo.

Gaetano sale contando gli attacchi, che è il suo modo di non guardare giù. Al quattordicesimo il gradino non c'è: c'è la sagoma del gradino, in polvere e calcinacci, e sotto la polvere l'aria.

Il piede va dentro fino al ginocchio. Il resto di lui resta sopra perché Claudia lo aveva preso per la cinghia dello zaino trenta secondi prima, e non lo aveva detto.

> Claudia: *(tirando, coi denti stretti)* "Ti tenevo dal quarto."

> Gaetano: "...dal quarto?"

> Claudia: "Dal quarto. Guardavo dove mettevi i piedi mentre tu guardavi i buchi nel muro."

Si siedono sul pianerottolo. Il ginocchio sanguina dalla parte in cui il ferro vecchio è rimasto attaccato al calcestruzzo, e il sangue su quella scala fa un rumore che non fa da nessun'altra parte: nessuno.

**(💪 TENUTA −3. E il Quaderno registra la cosa che conta: *lei ti teneva dal quarto gradino e non te l'ha detto.*)**`,
    sets: { teneva_dal_quarto: true },
    choices: [
      { text: '🚪 Su. Piano. Con la mano di lei nella cinghia, adesso dichiarata', next: 'c5_cella' },
      { text: '📚 Giù, all\'archivio. Il secondo ordine può aspettare le gambe buone', next: 'c7_archivio' },
    ],
  },

  c5_pietra: {
    location: 'cella',
    caption: 'La cella 47 — un pezzo di muro in tasca',
    text: `Il pezzo viene via tutto insieme, grande come un palmo, e sul retro ha lo stampo di quello che gli stava dietro: una tacca intera, in negativo.

Non l'ha incisa nessuno sul pezzo. Il pezzo è il calco della parete, e la parete gli ha lasciato la sua impronta come una moneta lascia l'impronta nella cera.

> Claudia: *(che lo gira nella luce)* "Portiamo via un'impronta. Non una pietra: un'impronta."

Va nello zaino, avvolta nella maglietta di ricambio, e per il resto della giornata Gaetano si ricorda ogni venti minuti che ce l'ha lì dentro.

**(Oggetto: la PIETRA DEL CARCERE, col calco di una tacca sul retro.)**`,
    item: 'pietra_carcere',
    choices: [
      { text: '🧮 Contare le tacche: dieci righe esatte, poi si moltiplica', next: 'c5_tacche' },
      { text: '🚪 Uscire. Andare a leggere delle carte, come le persone normali', next: 'c7_archivio' },
    ],
  },

  c5_unghia: {
    location: 'cella',
    caption: 'La cella 47 — l\'intonaco è staccato, il tufo no',
    stinger: 'fail',
    text: `L'intonaco è staccato: si vede, si sente sotto le dita, suona vuoto.

È il tufo sotto che non lo sa. Il pezzo non viene via a mano, viene via a scaglie — e le scaglie di tufo carcerario sono taglienti come vetro perché sono fatte di conchiglie schiacciate.

Gaetano si porta via l'unghia dell'indice destro, mezza, in un modo che fa fare un rumore anche a Claudia.

> Claudia: "Fammi vedere."

> Gaetano: *(nascondendo la mano, che è la cosa più stupida che potesse fare)* "È niente."

> Claudia: *(prendendogliela comunque)* "È niente, ed è per un pezzo di muro che non ti serve. Gaetano. Guardami. Questa stanza non si porta via a pezzi. Si porta via nella testa, ed è per quello che siamo scesi."

Ha ragione, e Gaetano lo sa da prima che lei finisca la frase. Il muro resta al muro.

**(💪 TENUTA −1, e nessuna pietra. Il Quaderno segna la frase di Claudia, che è più utile della pietra: *questa stanza non si porta via a pezzi.*)**`,
    sets: { non_si_porta_a_pezzi: true },
    choices: [
      { text: '🧮 Contare le tacche, allora. Con la mano buona', next: 'c5_tacche' },
      { text: '🚪 Uscire. Adesso', next: 'c7_archivio' },
    ],
  },

  c5_campione: {
    location: 'cella',
    caption: 'Il conto — il campione sbagliato',
    stinger: 'fail',
    text: `Il metodo del campione è questo: si contano dieci righe esatte, si misura l'altezza delle dieci, si divide la parete per quell'altezza, si moltiplica.

Il metodo è giusto se le righe sono uguali. Su questa parete non lo sono: le prime, in alto, sono fitte e regolari — mano ferma, conto nuovo. Le ultime, in basso, sono larghe il doppio e storte, perché una mano che conta da sei anni non conta più come una mano che ha cominciato ieri.

Gaetano prende il campione in alto e moltiplica. Viene undicimilaquattrocento.

Poi prende il campione in basso, per controllo, e viene seimilanovecento.

> Gaetano: *(seduto sul tavolato, la penna in mano, con l'espressione di uno che ha appena capito una cosa che non voleva capire)* "Non è che il conto non torna. È che il conto racconta un'altra cosa: la mano è cambiata. Rallentava. Verso la fine, ogni tacca gli costava il doppio."

> Claudia: "Quindi quante sono?"

> Gaetano: "Non lo so. E adesso mi interessa molto meno di quanto mi interessava dieci minuti fa."

**(Nessun numero per il Quaderno, e una cosa peggiore al suo posto: la mano rallentava. Il gioco se lo ricorda.)**`,
    sets: { mano_rallentava: true },
    choices: [
      /* E LA STRADA LUNGA DEVE RESTARE APERTA. Il graffito della cella 47 è uno
         dei quattro indizi del mistero: un tiro di dado non può cancellare un
         indizio, o il Quaderno diventa una lotteria. Fallire il campione non
         toglie il conto — toglie la scorciatoia, e il conto lo si fa riga per
         riga, che costa tempo e fiato. */
      { text: '🧮 Ricontarle. Tutte. Riga per riga, senza campione, con la torcia in mano', gold: -2, next: 'c5_tacche' },
      { text: '🧱 Staccare un pezzo di muro dove il muro è già staccato', once: true, next: 'c5_unghia' },
      { text: '🚪 Uscire. Le carte, adesso', next: 'c7_archivio' },
    ],
  },

  c7_righe: {
    location: 'panopticon',
    caption: 'L\'archivio — due registri, due grafie, nessuna corrente',
    stinger: 'fail',
    text: `I due registri sono aperti sullo stesso tavolo e la 47 sta su tutti e due, e il problema non è trovarla: è che le due date non sono scritte nello stesso modo.

Sul PRESENZE: *"47 — 4.XI.43"*. Sul MOVIMENTI: *"47 — 11.4.43"*.

Quattro novembre, o undici aprile. Numerazione romana del mese contro numerazione all'inglese, in un archivio dove la luce arriva da una finestrella a quaranta centimetri dal soffitto e le torce vanno tenute in mano.

Gaetano ci mette otto minuti e sbaglia comunque: appunta l'undici aprile, e sull'undici aprile costruisce mezz'ora di ragionamento che alle quattro del pomeriggio, alla luce di fuori, si scioglie da solo.

> Claudia: *(rileggendo il Quaderno sulla barca)* "Amore. Il quattro novembre. È scritto in numeri romani perché quello che teneva il PRESENZE era un maresciallo dell'Ottocento nato nel millenovecentotré."

> Gaetano: *(a occhi chiusi)* "...il quattro novembre."

> Claudia: "Che è il giorno dopo la fattura della calce."

**(Nessun indizio per il Quaderno, e mezz'ora persa. Ma la data giusta, alla fine, la trova lei — e questo il gioco lo registra.)**`,
    sets: { data_trovata_da_lei: true },
    choices: [
      { text: '🕯 Prima il quaderno d\'infermeria, allora. Con calma', once: true, next: 'c7_quarantasette' },
      { text: '⛏ Il cimitero dei detenuti, a mezza costa, fuori dal muro', next: 'c9_cimitero' },
    ],
  },

  c8_due_e_mezzo: {
    location: 'santo_stefano',
    caption: 'Sul muretto, fuori dal muro — la terza non arriva',
    stinger: 'fail',
    text: `> Gaetano: "E tre, Ciro?"

Ciro guarda il mare. Ha settantadue anni, un gozzo, tre cose da dire, e ne ha dette due.

> Ciro: *(dopo undici secondi)* "E tre niente. Le cose so' due."

Non è vero e lo sanno tutti e tre. Ma è stato chiesto un secondo prima di quando andava chiesto, e in questa faccenda un secondo è la differenza fra un uomo che parla e un uomo che si mette la sigaretta in bocca per avere qualcosa da fare con la mano.

Se la mette in bocca. Non l'accende. Se la toglie.

> Ciro: "Quando torniamo in barca vi faccio vedere una cosa. Non ve la dico. Ve la faccio vedere. È diverso."

E per il resto del pomeriggio, sul muretto, si parla di correnti.

**(La terza cosa non arriva oggi. Il Quaderno segna che Ciro ha promesso di FARLA VEDERE invece di dirla — e chi promette di far vedere, prima o poi porta.)**`,
    sets: { ciro_fara_vedere: true },
    choices: [
      /* Stessa regola: il racconto di Ciro è il terzo dei quattro indizi della
         cella 47. Chiedere male non lo cancella — lo sposta in barca, dove Ciro
         aveva detto che ve lo faceva vedere. Un indizio di un mistero non si
         perde mai su un tiro: si paga in tempo. */
      { text: '🚤 In barca, allora. Aspettare che ve la faccia vedere, come ha detto lui', next: 'c8_terza' },
      { text: '🤲 Sedersi accanto a lui e stare zitti. Ci arriverà da solo, o non ci arriverà', once: true, gold: 1, heal: 2, next: 'c8_terza' },
      { text: '⛏ Il cimitero dei detenuti, a mezza costa. La terza cosa aspetta', next: 'c9_cimitero' },
    ],
  },

  c10_soglia: {
    location: 'cisterna',
    caption: 'Sulla soglia — venti minuti d\'aria di vano',
    stinger: 'fail',
    text: `Venti minuti in un vano di pietra chiuso da sessant'anni non fanno male mentre ci stai. Fanno male quando ti alzi.

Gaetano si alza in fretta perché vuole uscire in fretta, e il mondo fa la cosa che fa: si inclina di venti gradi verso sinistra e ci resta per quattro secondi buoni.

Va a sbattere con la spalla contro lo stipite, si tiene, e resta lì appoggiato con la fronte contro la pietra fredda — che è la cosa più sensata che potesse fare, e anche la più brutta da guardare per chi è due passi dietro.

> Claudia: *(senza toccarlo, che è quello che serve)* "Fermo. Respira dal naso. Dentro quattro, fuori sei. Io sono qui."

Dentro quattro, fuori sei, undici volte. Poi la soglia, e poi il sole delle quattro del pomeriggio, che sembra bianco.

> Gaetano: "Non è il Coro. È aria vecchia e un'alzata veloce."

> Claudia: "Lo so cos'è. E lo sapevi anche tu, e ti sei alzato lo stesso in fretta perché avevi paura. Va bene avere paura. Non va bene alzarsi in fretta."

**(💪 TENUTA −2. 🫁 Fiato −2: quattro secondi di mondo inclinato costano. E il Quaderno registra le due frasi, che sono un pezzo di manuale: *dentro quattro, fuori sei.*)**`,
    gold: -2,
    sets: { dentro_quattro_fuori_sei: true },
    choices: [
      { text: '☀️ Fuori. Al sole. Seduti sul muretto finché il bianco non torna giallo', next: 'c10_pulito' },
    ],
  },

  c11_dati: {
    location: 'rovine',
    caption: 'Sul terrazzamento — i numeri, al momento sbagliato',
    stinger: 'fail',
    text: `I numeri sono veri: undici minuti di registrazione, quattordici ascolti, mezzo secondo esatto di scarto fra la voce e l'eco.

Sono veri, sono suoi, li ha misurati lui, e sono la cosa di cui va più fiero da quando è sbarcato su quest'isola.

Li dice a una donna che dieci minuti fa ha sentito il proprio nome uscire da un muro.

> Claudia: *(molto piano)* "Gaetano."

> Gaetano: "...mezzo secondo esatto, capisci? Non è un'eco, un'eco non—"

> Claudia: "Gaetano. Fermati."

Si ferma. E la faccia che fa è quella di uno che ha capito con due frasi di ritardo, che è la sua faccia, quella che lei conosce da undici anni e per cui, in tutta onestà, gli ha voluto bene fin dall'inizio.

> Claudia: "I numeri me li dici dopo. Adesso siediti qua e stai zitto due minuti."

Si siede. Sta zitto. Due minuti su un terrazzamento di Santo Stefano, con sotto il mare e dietro un muro, sono lunghissimi e servono.

> Claudia: *(dopo)* "Ecco. Adesso dimmeli."

E glieli dice, e stavolta lei li ascolta tutti.

**(🫁 Fiato +2: due minuti di silenzio seduti vicini valgono più di quattordici ascolti. Il Quaderno segna la regola: *i numeri, dopo.*)**`,
    gold: 2,
    sets: { i_numeri_dopo: true },
    choices: [
      { text: '📐 I numeri, adesso che li vuole sentire', next: 'c11_numeri' },
      { text: '🫂 Dirle il motivo. Tutto, compresa la parte che lo rende peggiore', once: true, next: 'c11_perche' },
    ],
  },

  c15_tasto: {
    location: 'terrazza',
    caption: 'Sotto la pergola — il tasto che non si alza',
    stinger: 'fail',
    text: `Il tasto STOP di un Geloso del 1965 è una leva meccanica che alza il capstan, e per alzarlo servono due chili di pressione con un dito solo.

Al ventitreesimo secondo Gaetano lo preme. Il tasto scende, fa clac, e non si ferma niente: la bobina gira, il nastro corre, e il numero sul contagiri continua a salire mentre il dito preme sempre più forte una leva che è arrugginita dal 1978.

Ventiquattro. Ventisei. Ventinove.

> Claudia: *(la voce di uno che non alza la voce apposta)* "Staccalo dalla corrente."

Trentuno. Trentatré.

> Gaetano: "Se lo stacco dalla corrente il nastro resta sotto la testina e domani non lo leggiamo—"

> Claudia: "STACCALO."

Lo stacca al trentaseiesimo. Un secondo prima della fine, che è peggio di zero secondi prima della fine, perché il trentasettesimo lo avete sentito lo stesso: è l'ultimo mezzo respiro di una cosa che ha smesso di respirare nel 1943, e adesso sta nella pergola delle Parracine, all'una meno venti di notte, con due bicchieri e un piatto di taralli.

**(💪 TENUTA −2. 🎵 Attenzione del Coro +1: sono passati trentasei secondi invece di ventitré, e li hanno contati in due. Il Quaderno segna che il registratore ha il tasto rotto — e chi lo sa, la prossima volta, stacca prima.)**`,
    attenzione: 1,
    sets: { tasto_rotto: true },
    choices: [
      { text: '🌙 Andare a dormire. Domani è il trenta, ed è l\'ultimo giorno', next: 'c15_dopo' },
    ],
  },

  c1_tanica: {
    location: 'porto',
    caption: 'Il molo — cinque chili su un gozzo che si muove',
    stinger: 'fail',
    text: `La tanica pesa cinque chili e il gozzo si muove di venti centimetri ogni volta che passa il traghetto, che è adesso.

Gaetano fa la cosa che fa uno di terra: aspetta che il gozzo sia in alto e molla. Il gozzo, nel frattempo, è già in basso. La tanica arriva sul paiolo da quaranta centimetri con un rumore che sull'acqua ferma di Porto Romano si sente fino al Pozzillo.

Non si rompe niente. Ciro non dice niente. Ma si china, sposta la tanica di trenta centimetri verso poppa, la mette dietro il bidone dell'acqua, e nel farlo dice la cosa che dirà solo una volta in tutti e quattro i giorni:

> Ciro: "Dottò. In barca, quando non sapete, chiedete. Non è vergogna. È che qua l'errore lo paga sempre un altro, e oggi l'altro sono io."

Gaetano ci mette tre secondi a rispondere, e la risposta è quella giusta:

> Gaetano: "Ha ragione. Come si fa?"

E Ciro glielo insegna: si aspetta il ventre dell'onda, si appoggia, non si molla. Due minuti di lezione da un uomo di settantadue anni, all'ombra della cabina, che valgono tutto il resto della mattina.

**(🫁 Fiato +2: farsi insegnare una cosa da chi la sa è riposante. Il Quaderno segna la regola di Ciro: *in barca, quando non sapete, chiedete.*)**`,
    gold: 2,
    sets: { regola_di_ciro: true },
    choices: [
      { text: '👂 "Dica." E poi le altre regole', next: 'c1_regole' },
    ],
  },

};
