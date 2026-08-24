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

Poi si mette al motore e non parte subito. Resta con la mano sullo starter e dice l'ultima cosa, quella che voleva dire da giovedì.

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

> Gaetano: *(e lo dice ad alta voce perché è il suo modo di tenersi in piedi, e perché ai numeri detti forte quella cosa là sotto fa male)* "Ottantadue metri. Nessuno l'ha misurata. Adesso è misurata: **ottantadue metri**."

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

**Il ferro di cavallo.** Novantanove celle su tre piani, disposte a semicerchio intorno a un pozzo vuoto, e in mezzo al pozzo una cappella tonda col tetto crollato. Le porte delle celle non guardano il corridoio: guardano **il centro**. Tutte. Tutte alla stessa distanza dal centro, tutte inclinate dello stesso angolo, tutte con lo spioncino alla stessa altezza da terra.

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

Gaetano non risponde. Perché sopra la scala che sale al secondo ordine c'è una parola, dipinta a stampino, nera, alta una spanna, mangiata dal salino per un terzo.

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
      { text: '🚪 Su, al purgatorio: la 47 sta al secondo ordine', next: 'c5_cella' },
      { text: '🕯 Scendere all\'inferno: è il nome del piano terra, non una metafora, e la cappella sta là', requires: { flag: 'sa_i_tre_piani' }, next: 'c4_conta' },
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
      { text: '🚪 Su, al purgatorio: la 47 sta al secondo ordine', next: 'c5_cella' },
      { text: '🕯 Giù all\'inferno, dove stava la guardia in mezzo al pozzo', next: 'c4_conta' },
      { text: '📚 Dietro la portineria: la stanza degli scaffali', next: 'c7_archivio' },
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
      { text: '🧮 Gaetano conta un campione: dieci righe esatte, poi si moltiplica', next: 'c5_tacche' },
      { text: '🧱 Staccare un pezzo di muro dove il muro è già staccato', once: true, item: 'pietra_carcere' },
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

> Gaetano: *(e parte, in buona fede, con la voce gentile di uno che vuole toglierle un peso)* "Amore, no. È il posto. Questa curva è una galleria a sussurro: il suono rimbalza sulla parete concava e ti torna dall'altro lato con un ritardo di — aspetta." *(guarda il cronometro del telefono, batte due volte le mani, conta)* "Zero virgola quarantasei. Ottantacinque metri di percorso, la velocità del suono è trecentoquaranta metri al secondo, torna. Si chiama eco a flutter e ti fa sentire i tuoi passi come se fossero i passi di un altro." *(e poi dice la cosa peggiore che potesse dire, e la dice perché è vera)* "E non l'ho scoperto io, Claudia. **Sta nel progetto.** Una guardia sola, in mezzo, doveva sentire novantanove celle: l'hanno costruito così, e c'è scritto sul pannello all'ingresso. Io ho solo verificato che funziona ancora."

E funziona ancora. Ha ragione su tutto, ha fatto il conto in nove secondi, la sua voce è dolce — e ha appena spiegato a sua moglie, coi decimali, il motivo per cui questo posto è stato tirato su. Per rassicurarla."

E lo ha appena misurato. Ha ragione su tutto, ha fatto il conto in nove secondi, e la sua voce è dolce.

> Claudia: *(senza toglierle la mano dal petto, e senza alzare la voce di un decibel)* "Io non ti ho parlato del suono."

> Gaetano: "..."

> Claudia: *(indica il pavimento davanti alla 44)* "Sessant'anni di polvere in tutto il corridoio. Uno strato uniforme, grigio, come una moquette. Davanti a tutte le porte. Guarda davanti a questa."

Davanti alla 44 la polvere è **spostata**. Due mezzelune, a settanta centimetri l'una dall'altra, con il bordo pulito rivolto verso l'interno della cella.

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

Gaetano cerca la 47 in tutti e due.

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

> Claudia: "E tre?"

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
    text: `Sta fuori dal muro, a mezza costa, su un terrazzamento che guarda il mare aperto: un quadrato di terra secca dentro un muretto che arriva alla vita, con dentro le croci.

Sta fuori dal muro, a mezza costa, su un terrazzamento che guarda il mare aperto — ed è fuori, questa è la prima cosa: chi ci è finito ha visto il mare per la prima volta da morto.

Si entra da un varco nel muretto a secco. E nel muretto, murata a filo, all'altezza degli occhi, c'è una lapide di marmo bianco con le lettere incise e riempite di lichene nero. Si leggono benissimo.

**SCVOLA DI ALTI PENSIERI**

E sotto, in corpo più piccolo, tre pezzi di frase separati da due virgole:

*Una vita di dolore, un pugno di polvere, un'anima immortale.*

Claudia la legge ad alta voce, tutta, comprese le virgole. Poi non dice niente. Appoggia la mano aperta sulla pietra a secco del muretto e ce la lascia il tempo di due respiri.

Non l'ha scritta un parente e non l'ha pagata una famiglia: l'ha fatta incidere lo stesso ufficio che teneva il registro, per il posto dove finiva chi non veniva reclamato da nessuno. Si entra qua dentro passando sotto una frase che promette un'anima immortale.

Poi si contano le croci.

Sono di ferro tondo, saldate a mano, alte un metro. Non hanno nomi: hanno **numeri**, dipinti in bianco su una piastra ovale. Chi finiva qui aveva già perso il nome all'ingresso e non lo riprendeva all'uscita.

Le contano tutti e tre, separatamente, perché Gaetano vuole tre conti indipendenti.

Trentanove croci.

Poi Claudia si mette in ginocchio e conta un'altra cosa: le **depressioni**. Perché la terra sopra una fossa si assesta e fa un avvallamento lungo, larghezza di spalle, che dopo cent'anni si vede ancora se ti abbassi e guardi in radente contro la luce.

> Claudia: "Quaranta."

> Gaetano: "Ricontale."

> Claudia: "Le ho ricontate due volte. **Quaranta avvallamenti, trentanove croci.**"

Il quarantesimo sta nell'angolo di nord-est, attaccato al muretto, ed è l'unico su cui l'erba cresce diversa: non secca come il resto, non gialla. Verde. Grassa. Il verde che fa l'erba dove sotto c'è **calce**.

Ciro non discute e non chiede il permesso. Prende la gaffa, la gira dalla parte del legno, e comincia a scavare come si scava con quello che si ha.

Venti centimetri di terra secca. Poi trenta di uno strato bianco, compatto, che si spacca a lastre e sotto le lastre è ancora bianco. Calce. Tanta. Chi ha chiuso questa fossa ha voluto essere sicuro.

E sotto la calce, alla profondità di un braccio, la punta della gaffa incontra una cosa che non è pietra e non è legno, e fa un rumore che nessuno dei tre dimenticherà: un rumore **asciutto**.

Ciro tira via la calce con le mani.

Non è un corpo. È **quello che la calce lascia**: la calce viva prende l'acqua e la carne e le porta via in un anno, e quello che resta è pulito, leggero, poroso, di un bianco gessoso, e sta nella posizione esatta in cui è stato messo. Un braccio piegato sul petto. La mano sotto il mento. Come uno che si è sistemato da solo per dormire, o come uno che l'hanno sistemato con cura.

E sopra lo sterno, appoggiati, ci sono i **bottoni**. Cinque bottoni di metallo, in fila, allineati come stavano cuciti, e uno di essi ha ancora sopra la stelletta.

> Claudia: *(con la voce che non le viene)* "Gaetano, quello è un bottone da divisa."

> Gaetano: "Sì."

> Claudia: "Nel cimitero dei DETENUTI."

> Gaetano: "Sì."

Dietro di loro, sul sentiero che sale dal carcere — quel sentiero che hanno fatto un'ora fa e che era vuoto — si sente un passo. Poi un altro. Il ritmo regolare, calmo, di uno che percorre un tragitto che percorre da tanto tempo e che finisce sempre nello stesso punto.

Non corre. **Fa il giro.**

**(🫁 Fiato −2, TENUTA −2. Il Quaderno registra: trentanove croci e quaranta fosse, e nella quarantesima c'è uno con la divisa. Quarto indizio — e adesso il turno di notte è arrivato dove state voi.)**`,
    goldLoss: 2,
    damage: 2,
    attenzione: 1,
    sets: { i_osso: true, sa_lapide: true },
    combat: { enemies: ['guardia'], victory: 'c10_nastro', defeat: 'c6_ko' },
    choices: [],
  },

  /* ==================== IL NASTRO ==================== */

  c10_nastro: {
    location: 'panopticon',
    caption: 'La cappella, ore 15:10 — il nastro',
    stinger: 'nastro',
    text: `Si siedono sui gradini della cappella crollata, in mezzo al pozzo, perché è l'unico posto dove il sole entra ancora e dove le porte stanno tutte davanti e nessuna dietro. Ciro si siede con loro. Al centro non voleva venire. È venuto.

Il **Geloso** sta sulla pietra, aperto. La cassetta è dentro il vano. Il tasto PLAY è alzato.

Il gioco adesso vi dice una cosa in chiaro, senza trucchi, perché è così che si fa.

**Su quel nastro c'è la voce di Nicola Sperduto, la notte del due settembre 1965.** È l'ultima cosa registrata in questo posto e contiene informazione che non troverete in nessun registro, in nessun archivio e in nessuna testimonianza.

**E svegliare quel nastro in questo posto vi farà notare.** Non "potrebbe": vi farà notare, adesso, di sicuro, e questo carcere è una macchina costruita per sentire. E non è un modo di dire preso in prestito da voi: sta scritto sul pannello all'ingresso, l'ha messo per iscritto un ufficio, e l'acustica della torretta era una delle cose che facevano funzionare il posto.

Ciro guarda il registratore come si guarda un cane che è stato buono per sessant'anni.

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

E poi l'uomo di quarantatré anni con la divisa addosso, solo dentro un carcere vuoto su un'isola di trentasei ettari, smette di essere una voce d'ufficio e si mette a piangere davanti a un microfono. Non urla. Non dice niente di comprensibile per undici secondi. Fa il rumore che fa un uomo grande quando non c'è nessuno. E sotto, come una traccia in un altro strato, c'è una bambina che canta la strofa che Claudia sa a memoria da ieri.

Poi il nastro fa **clunk**. Uno stacco netto, di quelli che fa la registrazione quando qualcuno ha premuto REC sopra a una cosa già registrata.

E parte un'altra voce. Non è del 1965. Il fruscio è diverso, il fondo è diverso, e la voce è di donna, adulta, vicinissima al microfono, con l'accento di qui:

> *«...Marisa Coraggio, ventitré settembre. Se questo lo sente qualcuno: non è vero che chiamano. Non chiamano. RISPONDONO.»*

Un respiro. Poi:

> *«Io gli ho risposto il ventisette agosto e da sei giorni sto cantando e non me ne accorgo. Ada, se lo senti tu: non venire a cercarmi al porto—»*

E poi si mette a cantare anche lei, sopra la bambina, e le due voci vanno d'accordo perfettamente, e il nastro continua per otto minuti così.

Ciro si è alzato in piedi. Ha la faccia di un uomo che ha appena visto una cosa a cui non era preparato dopo sessant'anni di preparazione.

> Ciro: "Marisa. 'A sora d'Ada." *(gli manca il fiato)* "Novantasette. Novantasette, signò. E io stavo al molo pure quella volta." *(guarda il registratore)* "L'ha registrata **dentro 'a cassetta mia**. Ha aperto il mio cassetto, ha messo il nastro nella macchina di mio padre e ha registrato sopra. E poi l'ha rimesso a posto e non m'ha detto niente."

Il nastro va avanti da solo. Fuori dal pozzo, in tutto il ferro di cavallo, novantanove porte cominciano a fare **clac** insieme.

**(🎵 Attenzione del Coro +2: l'avete svegliato, adesso sa che siete voi, e il gioco vi aveva avvertiti due volte. 🫁 Fiato −2. Il Quaderno registra MARISA CORAGGIO, 23 settembre 1997 — *non chiamano, rispondono* — e registra, sotto due voci adulte, la strofa della bambina.)**`,
    goldLoss: 2,
    attenzione: 2,
    sets: { sa_di_marisa: true, nastro_suonato: true, i_ninna_sentita: true },
    combat: { enemies: ['sciame_voci', 'eco'], victory: 'c10_claudia', defeat: 'c6_ko', loot: { gold: 1 } },
    choices: [],
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
      { text: '🎵 Claudia apre la bocca per rispondere — e Ciro le mette la mano sulla bocca', requires: { flag: 'claudia_ha_promesso' }, once: true, damage: 4, sets: { quasi_risposto: true } },
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
      { text: '🎒 Mettere comunque la cassetta dentro il registratore. Senza premere niente', once: true, sets: { nastro_dentro: true } },
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

E qui Gaetano non fa il conto, non fa il numero, non fa la spiegazione. Sta fermo con le mani lungo i fianchi come un ragazzo di ventidue anni.

> Gaetano: "Perché avevi appena toccato la boa."

Silenzio.

> Gaetano: "Ci hai messo dieci anni. Ci sei arrivata giovedì alle sette e dieci di sera, hai bestemmiato due volte, mi hai abbracciato attaccata a una boa di plastica, e mi hai detto *un secondo così*." *(la voce gli va)* "E io alle due di notte avevo in mano una cosa che te lo portava via. E ho pensato: gliela dico domani. E ieri ho pensato: gliela dico dopo le cisterne, che oggi ha già avuto la sua parte. E oggi me l'ha detto quel coso al posto mio, con la voce di un morto, davanti a un vecchio." *(si passa la mano sulla faccia)* "Ho fatto una cosa di merda per un motivo tenero, che è il modo peggiore di fare le cose di merda, perché mentre la fai ti sembra di volere bene."

Claudia sta ferma ancora due secondi. Poi gli mette una mano dietro il collo e gli tira la testa sulla propria spalla, in piedi, sul terrazzamento di un carcere borbonico, alle quattro del pomeriggio.

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
      { text: '🏃 Correre giù: la luce sta cambiando', next: 'c12_corsa' },
      { text: '🚤 Alla barca, in fila indiana, senza dire niente', next: 'c14_cena' },
    ],
  },

  /* ==================== LA FUGA ==================== */

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
    caption: 'Ventotene, la Marisqueria — ore 21:10',
    stinger: 'heal',
    text: `Sono in barca alle cinque e diciotto. Ciro non commenta i tre minuti.

La traversata di ritorno è la cosa più bella della giornata: il sole basso da sinistra, il mare colore ottone, Santo Stefano che si rimpicciolisce dietro e ridiventa una gobba con una cosa sopra. A metà del braccio di mare — sopra gli ottantadue metri — Ciro non spegne il motore e nessuno gli chiede di spegnerlo.

Alle sei meno cinque la Santa Candida è ormeggiata al terzo pontile. Ciro guarda l'orologio, poi il cielo, e slega la cima con una faccia da uno che ha rispettato un patto con se stesso per la sessantunesima estate di fila.

---

**Alla Marisqueria, alle nove e dieci di sera, sono tre persone che hanno fame.**

Tavolino fuori, tovaglietta di carta, il vino bianco nel secchiello che sudano tutti e tre allo stesso modo. Le **lenticchie di Ventotene** — quelle piccole, che si coltivano sui terrazzamenti e costano come un peccato — con i totani. Poi il pesce, quello che c'era. Poi altro pane, perché il sugo delle lenticchie non si lascia.

E succede la cosa che non si programma: **ridono**.

Ciro racconta di quando nel millenovecentonovantuno portò a Santo Stefano un troupe della televisione svizzera e il fonico gli chiese di stare zitto, e lui, che a quel tempo teneva trentasette anni e il carattere di uno di trentasette anni, gli rispose una cosa che non si può ripetere e che Claudia si fa ripetere tre volte, e alla terza volta ride così tanto che deve appoggiare la fronte sul tavolo.

> Claudia: *(risalendo dal tavolo, con gli occhi lucidi di quell'altra cosa)* "Ciro, lei domani ha da fare?"

> Ciro: "Io ho da fare tutti i giorni, signò, e non faccio niente."

> Claudia: "Domani è il nostro ultimo giorno. Il traghetto parte alle cinque e mezza del pomeriggio."

> Ciro: *(riempie i tre bicchieri, compreso il suo, e lo fa con l'attenzione di uno che sta dicendo una cosa importante con le mani)* "Allora domani alle otto sto al molo. Non me lo dovete chiedere. E vi porto due cose che stasera vado a prendere in cantina."

Poi Gaetano fa la cosa da Gaetano. Prende la tovaglietta di carta, la gira, e con la biro del conto ci scrive quello che hanno addosso, in colonna, come una lista della spesa.

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

Claudia si addormenta in quattro minuti, come sempre, con una gamba fuori dal lenzuolo e la fede al collo.

E dopo venti minuti, come ieri notte, comincia a **cantare nel sonno**. Piano, con la bocca quasi chiusa, intonatissima. Cinque strofe, nell'ordine giusto, e poi da capo.

Gaetano ci mette più tempo, come sempre. Sta a fissare il ventilatore a pale e fa il conto della giornata come fa il conto di tutto: un vecchio in squadra, quattro indizi sulla 47, ottomilaquarantuno tacche, quaranta fosse e trentanove croci, ottantadue metri di fossa misurata, un nome — **Nicola Sperduto** — e domani alle cinque e mezza un traghetto.

Poi si gira verso di lei, le mette una mano sulla schiena, e conta il tempo tra una strofa e l'altra. È regolare. Diciannove secondi. È **regolare**, e questo è il problema.

Poi si addormenta anche lui.

E l'isola, per la prima volta in tre notti, non fa niente.

Non una nota. Non un cane. Non una porta. Niente di niente, per tutta la notte, dalle due alle sei e mezza del mattino: il silenzio più pulito e più completo che quest'isola abbia fatto da quando ci sono arrivati.

Ed è, di gran lunga, la cosa più preoccupante che abbia fatto finora.

**(Oggetto: RESINA EPOSSIDICA. 🫁🫁 IL TERZO GIORNO È CHIUSO. ⛑ CHECKPOINT: dentro le parracine si dorme — TENUTA piena, mosse ricaricate, e da qui si riparte se domani va male. Domani è domenica 30 agosto: valigie, ultimo bagno, e il traghetto per Formia alle 17:30.)**`,
    gold: 1,
    item: 'resina',
    fullHeal: true,
    recharge: true,
    sets: { giorno_29_chiuso: true },
    choices: [
      { text: '🫂 Restare un minuto sulla terrazza prima di dormire, senza dire niente', once: true, gold: 1, heal: 4, next: 'd0' },
      { text: '☀️ Domenica 30 agosto: l\'ultimo giorno', next: 'd0' },
    ],
  },
};
