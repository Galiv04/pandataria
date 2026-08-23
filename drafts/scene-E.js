/* ============ PANDATARIA — BLOCCO E: GLI EPILOGHI ============
   Sei ingressi, e l'atto D punta SOLO a questi sei:
     e_vittoria · e_vittoria_muta · e_scambio · e_resta · e_coro · e_loop

   COME FINISCE IL GIOCO (verificato in js/engine.js): una scena con
   `ending: true` viene intercettata da renderChoices() → renderEnding(scene),
   che fa return prima di guardare `choices` e stampa da sé cronaca, epiloghi,
   imprese e i bottoni finali. `ending` è letto SOLO come booleano
   (engine.js:150 `!!scene.ending`, :426, :517): non ci sono campi dentro.
   Quindi: terminali con `ending: true` + `choices: []`. Nessun `next: 'finale'`.
   (E nessuna di queste scene usa `minigame`/`combat`, che ignorerebbero choices.)

   ECONOMIA (DESIGN §6, riscritto il 22 agosto): il FIATO non è una valuta e non
   compra niente — è l'aria delle immersioni. Nei finali nessuno scende più: le
   righe meccaniche lo dicono in chiaro. I potenziamenti sono solo oggetti
   craftati. Se cadono tutti non è game over: `Engine.riprendiDaCheckpoint()`
   consuma l'ÀNCORA DI VOCE se c'è, altrimenti riporta all'ultimo checkpoint.

   CANONE PAGATO QUI: la corda e la regola di Ada (non si risponde) · Marisa,
   sorella di Ada, 1997 · Assuntina che tiene il tempo e la prima strofa ·
   Nicola Sperduto · Giulia maggiore, il padre e le ossa · il perimetro
   (`sa_confine`) · la promessa di Claudia (insegnarle a nuotare) · l'incisione
   nel tufo (`promessa_incisa`) · la verità detta o tenuta.

   NOTA PER L'ATTO D: `e_resta` è scritto sul canone in cui è CLAUDIA a restare
   (la promessa è sua). Se D lascia restare Gaetano, serve una variante di
   e_resta / e_resta_partenza: non forzare il testo attuale.

   Regole di tono: docs/DESIGN.md §1, §7, §10.                                   */

const SCENE_E = {

  /* ==================================================================
     1. e_vittoria — vivi, e hanno CAPITO. Il finale pieno.
     ================================================================== */

  e_vittoria: {
    location: 'porto',
    caption: 'Domenica 30 agosto, ore 06:12 — la scaletta di Cala Rossano',
    stinger: 'sigillo',
    text: `Escono dall'acqua alle sei e dodici, dalla scaletta di ferro del molo di Cala Rossano, e la prima cosa che fanno non è parlare: è sedersi. Sul cemento, con le gambe ancora dentro, come due che hanno finito un turno.

Il mare non fa niente. Non è calmo nel senso bello: è **fermo**, e ci vuole un minuto a capire cos'è la cosa nuova. È che non c'è la corda. Il rumore dell'acqua contro il tufo è soltanto il rumore dell'acqua contro il tufo.

Alle nove, davanti al porto, tre bambini e un cane fanno il casino di sempre a due metri dall'acqua. Lì non c'è niente. Non c'è mai stato niente: la cosa ha un **perimetro**, e il perimetro finisce dove comincia la gente. Una signora che puliva fagiolini l'aveva detto in due secondi, il primo giorno, senza sapere di dire una cosa esatta.

Alle Paracine il caffè è nel thermos di acciaio, quello col tappo che si svita male. Sul tavolo della cucina, accanto al thermos, c'è il registratore.

> Claudia: "Ada. Si sieda."

Ada si siede, che non fa mai. Gaetano preme il tasto, e dentro la cucina entra la voce di una donna di quarant'anni, registrata sopra un nastro del 1965, che dice il proprio nome e una data e poi: *«Se questo lo sente qualcuno: non è vero che chiamano. Non chiamano. RISPONDONO.»*

Ventinove anni. Ada tiene il tappo del thermos in mano e continua a girarlo, avanti e indietro, per tutta la durata del nastro. Non piange. Quando finisce dice una cosa sola.

> Ada: "Rimettilo."

Lo rimettono. Tre volte.

> Ada: *(alla terza, e guarda il muro)* "L'aveva capito lei per prima. Nel novantasette. E non l'ha detto a nessuno perché a chi lo dici, una cosa così." *(posa il tappo)* "Adesso lo sanno tre persone invece di una."

> Claudia: "E non canta più."

Ada annuisce piano, due volte, come si annuisce a un medico. Poi si alza, prende le tazzine e sulla porta dice: "Il traghetto parte alle cinque e mezza. Non fate tardi."

**(💪 TENUTA piena. 🫁 Il fiato da qui non conta più: era l'aria per scendere, e nessuno scende più. Ad Ada avete dato la sola cosa che si potesse dare — quaranta secondi della voce di sua sorella, e la ragione per cui è scesa. Il Quaderno la registra.)**`,
    heal: 16,
    sets: { usciti_vivi: true, coro_zitto: true, marisa_restituita: true },
    choices: [
      { text: '🧱 Passare dal parcheggio dei motorini e stare due minuti sopra la sesta, a sentire il niente',
        requires: { flag: 'sa_sesta_cisterna' }, sets: { sesta_salutata: true }, next: 'e_vittoria_barca' },
      { text: '🎧 Farle sentire ADESSO il file del primo giorno: la voce che diceva il suo nome',
        requires: { flag: 'gaetano_ha_taciuto' }, heal: 4, sets: { verita_detta: true }, next: 'e_vittoria_barca' },
      { text: '⚓ Al terzo pontile: quaranta euro in mano a Ciro, e non dirsi niente per due minuti',
        requires: { flag: 'ciro_in_squadra' }, sets: { salutato_ciro: true }, next: 'e_vittoria_barca' },
      { text: '💍 Slegare il filo di nylon e rimettersi le fedi alle dita, sedute sul molo',
        requires: { item: 'le_due_fedi' }, heal: 4, sets: { fedi_rimesse: true }, next: 'e_vittoria_barca' },
      { text: '🧳 Andare a fare i borsoni. Il phon, stavolta, resta dov\'è',
        sets: { valigie_chiuse: true }, next: 'e_vittoria_barca' },
    ],
  },

  e_vittoria_barca: {
    location: 'traghetto',
    caption: 'Ore 17:30 — si molla. E due ore e quaranta di mare',
    stinger: 'victory',
    text: `Il traghetto per Formia molla gli ormeggi alle **17:30** esatte, e non c'è niente di solenne: un marinaio che urla a un ragazzo di spostare il trolley, una signora che conta tre bambini due volte, l'odore di gasolio che ti entra in gola dieci secondi prima che il vento se lo prenda.

Ponte di poppa, lo stesso dell'andata. Le mani sul parapetto: la vernice bianca è calda, ha preso sole tutto il giorno. Sotto le mani non c'è il rumore del motore, c'è la **vibrazione** — quella che arriva ai denti e non smette per due ore e quaranta.

L'isola si stacca. È questo che fa: non sei tu che vai via, è lei che si stacca. Il paese giallo e rosa diventa una fila di sassi ordinati, la scaletta delle paracine una riga, Cala Nave una virgola bianca. La boa gialla si vede per quattro minuti e poi non si vede più.

Santo Stefano resta a destra. Alle 17:52 è un dente. Alle 18:20 è una macchia. Poi è la faccia del mare e basta.

Gaetano apre il quaderno di carta. Tre domande in cima a tre pagine, scritte a matita il primo giorno, e sotto ognuna quello che hanno trovato. Legge ad alta voce solo le righe che finiscono con un punto: quelle senza punto le rileggerà per anni.

Poi c'è la cosa che ha capito laggiù e ha detto male, perché aveva il boccaglio in bocca.

> Gaetano: "Te l'ho detto a quaranta metri e l'ho detto a metà. Nessuno di quelli là sotto è venuto qui volendo. Giulia l'ha scaricata qui il nonno a ventidue anni e le ha pure vietato le ossa. Novecento uomini in catene. Centoquarantasei passeggeri che stavano andando da un'altra parte. Marisa è scesa perché una voce l'ha chiamata."

> Claudia: *(e finisce la frase lei, perché ci ha pensato tutto il giorno)* "E noi siamo i primi arrivati per scelta." *(le mani sul parapetto)* "Con le valigie. E la crema solare." *(pausa)* "Non ci voleva morti, Gaetà. Ci voleva **presenti**."

Nella cisterna murata, sul tufo, resta una cosa incisa con un chiodo: **CI SIAMO STATI. C. E G. — 28.8.26** e sotto **E SIAMO TORNATI SU**.

> Claudia: "L'avevo scritta al futuro."

> Gaetano: "Adesso è al passato."

Alle 19:40 la luce si mette orizzontale e diventa una cosa che non si può fotografare: il mare va di stagno, poi di rame, e le facce di tutti quelli sul ponte diventano d'oro nello stesso momento, anche quelle brutte. Claudia non tira fuori il telefono. Sta con le due mani sul parapetto caldo, e il vento le asciuga il sudore prima che le arrivi in fondo alla schiena.

> Claudia: "Amore. Ci torniamo l'anno prossimo?"

Alle **19:47** il sole tocca l'acqua e ci mette novanta secondi a entrarci tutto.

**(💪 TENUTA +10: due ore e quaranta di vento fanno più di qualunque cura. 🫁 Il fiato non conta più — era aria, e l'aria serviva laggiù. Il 30 agosto è finito: alle 18:40 non è ricominciato niente. Resta una cosa da decidere, e riguarda quello che farete di ciò che sapete.)**`,
    heal: 10,
    sets: { traghetto_partito: true, tramonto_visto: true },
    choices: [
      { text: '🕯 Dirlo al vento, dal ponte: "Si chiamava NICOLA SPERDUTO. Quarantatré anni. Ha finito il turno."',
        requires: { flag: 'sa_nome_guardia' }, once: true, sets: { detto_sperduto: true } },
      { text: '🎵 Cantarla piano, la prima strofa: «chi sta sott\' nun torna sola / si porta appriess\' a chi la chiamma». Era un avvertimento, e ASSUNTINA lo cantava da ottantadue anni',
        requires: { flag: 'sa_ninnananna' }, once: true, sets: { detta_ninnananna: true } },
      { text: '🧱 Guardare l\'isola che si allontana e sapere che la sesta sta sotto le altre cinque, ed è chiusa',
        requires: { flag: 'sa_sesta_cisterna' }, once: true, sets: { detta_sesta: true } },
      { text: '📓 A Formia non andare alla macchina: cercare qualcuno a cui dirlo. Un archivio, un giornale, il comune',
        sets: { verita_pubblica: true }, next: 'e_vittoria_casa' },
      { text: '🤝 Scrivere una pagina sola e mandarla ad Ada. Su Marisa, e su chi c\'era in acqua nel novantasette',
        requires: { flag: 'patto_trenta_secondi' }, sets: { pagina_per_ada: true }, next: 'e_vittoria_casa' },
      { text: '🐴 Il cavallino di celluloide: lasciarlo andare in mare a metà canale, sopra la fossa',
        requires: { item: 'giocattolo' }, removeItem: 'giocattolo', sets: { cavallino_restituito: true }, next: 'e_vittoria_tacere' },
      { text: '🤐 Scendere, prendere la macchina, tornare a Scauri. E non dirlo mai a nessuno: è nostro',
        sets: { patto_del_silenzio: true }, next: 'e_vittoria_tacere' },
    ],
  },

  e_vittoria_casa: {
    location: 'alba',
    caption: 'Scauri, 21 settembre — la prima pioggia da giugno',
    ending: true,
    text: `Il 21 settembre, a Scauri, piove per la prima volta da giugno e l'asfalto fa quell'odore.

Delle tre domande scritte a matita sul quaderno, quelle che hanno una risposta le hanno consegnate a qualcuno. Le altre restano lì, e ci penseranno per anni.

Delle undici mail che hanno mandato ne hanno risposte tre. Una era un fuori sede automatico. Una era un tizio di un forum di relitti che voleva sapere se avevano foto del secondo tronco della Santa Lucia. La terza è arrivata dopo undici giorni, da una ricercatrice dell'archivio di Latina, e diceva quattro righe:

> *"Il nome che mi indicate compare in un registro di servizio del 1965 che non risulta mai trasferito. Sperduto Nicola, guardia di prima classe. Ho controllato: non risulta congedato, non risulta deceduto, non risulta niente. La ringrazio. Nessuno l'aveva mai cercato."*

Claudia l'ha stampata. Sta sul frigo, sotto una calamita di Ponza.

Della lista d'imbarco non è cambiato niente in nessun archivio dello Stato. Ma in un file su tre dispositivi diversi, adesso, l'ultimo nome è battuto a macchina come tutti gli altri: **Assuntina, sei anni, passeggera.** Non è molto. È quello che si poteva fare.

Della sesta cisterna non hanno detto niente a nessuno, e su questo si sono trovati d'accordo senza parlarne: certe cose è meglio che restino chiuse anche negli archivi.

Ad Ada arriva una pagina sola, a mano. Non risponde per due settimane, e poi manda un messaggio di undici parole: *"Ho letto. L'ho letta a mio marito. Grazie. La stanza c'è."*

Il resto è la vita. Gaetano ha ripreso a misurare cose lontanissime. Claudia ha ripreso a decidere come si guardano le cose. Il 4 ottobre, a Serapo, con l'acqua a diciannove gradi e la spiaggia vuota, è entrata e ha nuotato fino alla terza boa senza chiedere a nessuno quanto fosse profondo.

Quando escono a cena e qualcuno chiede com'è andata a Ventotene, dicono: bellissima.

E non è una bugia: è la prima riga di una cosa lunga che raccontano solo a se stessi, la sera, quando il palazzo è zitto. La raccontano bene — con le date, con i nomi, con le misure. Perché una cosa detta bene non torna più a chiederti niente.

**(🌅 FINALE: LA COSA DETTA. Vivi, e avete capito. Nicola Sperduto ha smesso il turno, Assuntina dorme, la bocca è chiusa, Marisa non canta più. E in un archivio di Latina qualcuno ha scritto un nome su una riga che era vuota da sessant'anni.)**`,
    choices: [],
  },

  e_vittoria_tacere: {
    location: 'alba',
    caption: 'La Domiziana, ore 21:30 — e tutti gli anni dopo',
    ending: true,
    text: `Non l'hanno detto a nessuno.

Non c'è stato un momento in cui l'hanno deciso. C'è stata la macchina sulla Domiziana alle nove e mezza di sera, il finestrino aperto, l'aria che sapeva di pino e di mare, e Claudia che ha detto "non lo dico a mia sorella", e Gaetano che ha detto "no".

Le cinque foto mosse stanno in una cartella che si chiama VENTOTENE 2026, tra la foto del piatto di lenticchie della Terrazza di Mimì e quella della boa gialla. Chi le guarda dice: è venuta mossa. E loro dicono: sì, è venuta mossa.

Nella cisterna murata, sul tufo, c'è ancora scritto **E SIAMO TORNATI SU**, e non lo leggerà nessuno, e va bene: era un impegno preso in due, e in due è stato mantenuto.

Ada ha scritto a Natale, uno di quei messaggi con troppi puntini: *"Auguri a voi due, siete stati bravi ragazzi, quando volete la stanza c'è."* Non ha scritto altro e non c'era altro da scrivere. Il nome di sua sorella, dentro quel messaggio, non c'è — ma c'è nella testa di tre persone invece che di una, e questa è la differenza.

Il primo agosto dell'anno dopo Claudia prenota quattro giorni, la stanza con la terrazza, e non ne parlano prima di partire. Alla Terrazza di Mimì il cameriere si ricorda di lei e della boa, e le porta un limoncello che non ha ordinato.

Ogni tanto, di notte, uno dei due si sveglia e l'altro è già sveglio.

> Claudia: "Niente."

> Gaetano: "Niente."

E si riaddormentano, perché è vero: non c'è niente. È esattamente la cosa che hanno vinto, e nessuno gliela può controllare.

**(🌅 FINALE: LA COSA NOSTRA. Vivi, e avete capito. Nessuno vi crederà mai perché non lo chiederete a nessuno: quello che sapete lo sapete in due — che con questa storia è il numero giusto.)**`,
    choices: [],
  },

  /* ==================================================================
     2. e_vittoria_muta — vivi, e non hanno capito. Salvi e rovinati.
     ================================================================== */

  e_vittoria_muta: {
    location: 'porto',
    caption: 'Domenica 30 agosto, ore 16:50 — la biglietteria di Cala Rossano',
    stinger: 'pressione',
    text: `Alle 16:50 sono in fila alla biglietteria di Cala Rossano con due borsoni, la pelle che sa di sale e il resto del biglietto in mano.

Questo va detto subito e per intero: **sono vivi.** Tutti e due. In piedi. Nessuno li ha presi.

Solo che non hanno capito.

Hanno un buco con i bordi. Una nota bassa registrata su un telefono, cinque foto mosse sempre nello stesso punto, undici secondi di riverbero in una stanza di trenta metri, una parola di tre sillabe rallentata al venticinque per cento, e una parola sola detta da una signora davanti a un lavello: la corda. Hanno dei pezzi. I pezzi non si toccano tra loro.

> Claudia: *(guardando il tabellone, che dice 17:30 FORMIA e nient'altro)* "Gaetà. Dimmi una cosa vera."

> Gaetano: "Dimmi tu la domanda."

> Claudia: "Era qualcosa?"

E Gaetano — che misura cose per vivere, che sui numeri non ha mai barato nemmeno per gentilezza — sta zitto quattro secondi, che è il tempo che serve a scegliere di non mentire.

> Gaetano: "Sì. Era qualcosa."

> Claudia: "Cosa?"

> Gaetano: "Non lo so."

Al terzo pontile, duecento metri più in là, un vecchio sistema una rete e non alza la testa. Non è cattiveria: sono sessant'anni di pratica nel non alzare la testa.

**(💪 TENUTA +8. 🫁 Il fiato che vi resta non serve a niente: non si scende più. Siete salvi, ed è tutto vero — è anche tutto quello che avete. Prima di salire, decidete cosa fare della roba che avete raccolto.)**`,
    heal: 8,
    sets: { usciti_vivi: true, non_hanno_capito: true },
    choices: [
      { text: '📵 Cancellare le cinque foto e il file audio. Adesso, sul molo, prima di salire',
        sets: { foto_cancellate: true }, next: 'e_muta_tramonto' },
      { text: '💾 Salvare tutto. Tre copie: telefono, cloud, hard disk. Un giorno serviranno a qualcuno',
        sets: { foto_salvate: true }, next: 'e_muta_foto' },
      { text: '🎧 Chiedergli, adesso, se c\'è una cosa che non le ha detto',
        requires: { flag: 'gaetano_ha_taciuto' }, heal: 6, sets: { verita_detta: true }, next: 'e_muta_foto' },
      { text: '🎧 La cosa rinviata da due giorni. Dirla adesso, sul molo, mentre il traghetto manovra',
        requires: { flag: 'verita_rinviata' }, heal: 6, sets: { verita_detta: true }, next: 'e_muta_foto' },
      { text: '🤐 Cancellare tutto anche perché così, di quella bugia, non restano le prove',
        requires: { flag: 'bugia_detta' }, sets: { bugia_sepolta: true }, next: 'e_muta_tramonto' },
      { text: '🏖 Un ultimo bagno davanti al porto, dove c\'è la gente: lì dentro non c\'è mai niente',
        requires: { flag: 'sa_confine' }, heal: 6, sets: { bagno_nel_perimetro: true }, next: 'e_muta_tramonto' },
      { text: '🕯 Ripetersi a mente il nome della guardia: l\'unica cosa che sono riusciti a sapere per intero',
        requires: { flag: 'sa_nome_guardia' }, sets: { nome_ripetuto: true }, next: 'e_muta_foto' },
    ],
  },

  e_muta_tramonto: {
    location: 'traghetto',
    caption: 'Ore 19:47 — a metà canale. E poi il 14 febbraio',
    ending: true,
    text: `Il traghetto molla alle **17:30**, e l'isola si stacca: è lei che si stacca, non tu che vai via.

Il paese giallo diventa una fila di sassi ordinati. Cala Nave una virgola bianca. La boa gialla si vede per quattro minuti. Santo Stefano resta a destra, grigio, appoggiato sull'acqua: alle 18:20 è una macchia, poi non è niente.

Le mani sul parapetto: la vernice bianca è calda di sole, e sotto le mani il motore vibra e arriva ai denti.

Alle **19:47** il sole tocca l'acqua. La luce va orizzontale, il mare diventa di stagno e poi di rame, e le facce di tutti quelli sul ponte diventano d'oro nello stesso momento. Claudia guarda. Non fotografa niente: sul telefono, adesso, non c'è più nulla da confrontare.

> Claudia: "È bellissimo."

> Gaetano: "Sì."

> Claudia: "Sono contenta di aver cancellato."

> Gaetano: "Anch'io."

E sono contenti per davvero, tutti e due, per due ore e quaranta di mare aperto.

---

Il **14 febbraio** Claudia si sveglia alle quattro e dieci e si mette a sedere nel letto. Non c'è niente nella stanza: il termosifone che tocca, e Gaetano che respira col naso.

> Claudia: "Amore. Amore. Cos'era?"

> Gaetano: *(che si è svegliato di colpo e sa già di cosa parla, perché lo sa sempre)* "Cosa, amore?"

> Claudia: "A Ventotene. Cos'era."

E Gaetano allunga la mano verso il telefono per aprire una cartella che non esiste più, e si ferma a mezz'aria. In quel mezzo metro di buio tra la mano e il comodino c'è tutto il resto della loro vita.

Su un muro di tufo, dentro una cisterna murata che nessuno riaprirà, c'è scritto **CI SIAMO STATI** — e la riga sotto dice **E SIAMO TORNATI SU**, che è vero, ed è l'unica cosa che sono riusciti a portare a termine.

**(🌅 FINALE: SALVI, A MANI VUOTE. Non vi è successo niente e non saprete mai cos'era. Ve lo chiederete per quarant'anni senza una sola cosa da riguardare — e la cancellazione l'avete fatta voi, sul molo, a mente lucida.)**`,
    choices: [],
  },

  e_muta_foto: {
    location: 'traghetto',
    caption: 'Ore 19:47 — e tutti gli agosti dopo questo',
    ending: true,
    text: `Alle **17:30** il traghetto molla, e l'isola si stacca: è lei che si stacca, non tu che vai via.

Il paese diventa una fila di sassi ordinati, la boa gialla si vede per quattro minuti, Santo Stefano resta a destra e alle 18:20 è una macchia grigia, poi niente. Le mani sul parapetto: la vernice è calda, il motore vibra e arriva ai denti, il vento asciuga il sudore prima che arrivi in fondo alla schiena.

Alle **19:47** il sole tocca l'acqua. La luce si mette orizzontale, il mare va di stagno e poi di rame, e tutte le facce sul ponte diventano d'oro insieme.

Claudia lo guarda dallo schermo. Alza il telefono, inquadra il sole e l'isola, scatta cinque volte. Poi zooma. Cerca la banda.

> Gaetano: *(piano)* "Amore. Il tramonto sta di là."

> Claudia: *(senza staccare gli occhi dallo schermo)* "Lo so. Un secondo."

Un secondo così.

---

A novembre comprano un idrofono vero, quattrocentoventi euro, e Gaetano impara a leggere gli spettrogrammi come si impara una lingua.

Un professore di acustica risponde a giugno, gentilissimo: *"Molto probabilmente un diesel a bassi giri, riflesso dal fondale. Cordialmente."*

Tornano il 27 agosto dell'anno dopo, e quello dopo, e quello dopo. Ada tiene la stanza con la terrazza, ogni anno dice "eccoli" e ogni anno non chiede niente — e una volta, in cucina, comincia una frase con "mia sorella" e poi si gira verso il lavello e la frase finisce lì. Loro non la riprendono. Non sanno che era quella, la porta.

Alla Marisqueria prendono sempre lo stesso piatto. Alla Terrazza di Mimì il tavolo contro la ringhiera lo tengono per loro. La boa gialla è sempre lì, e Claudia ci arriva ogni volta, e ogni volta ci resta appesa un minuto in più.

Non risentono niente. Mai. Undici anni di 30 agosto, e il mare che fa il mare.

La cartella si chiama VENTOTENE e dentro ci sono quattromiladuecento file, e non uno di quei file risponde alla domanda.

> Claudia: *(sul ponte di poppa, ogni anno, con lo stesso vento)* "Era qualcosa."

> Gaetano: "Era qualcosa."

**(🌅 FINALE: SALVI, CON LE PROVE IN MANO. Avete tutto tranne la cosa: la banda dentro le foto, la nota dentro il file, i nomi mai messi in fila. E ci tornerete ogni agosto della vostra vita a non capire — insieme, che è la parte buona.)**`,
    choices: [],
  },

  /* ==================================================================
     3. e_scambio — uno è rimasto giù perché l'altro salisse sul traghetto.
     ================================================================== */

  e_scambio: {
    location: 'barca',
    caption: 'Domenica 30 agosto, ore 06:20 — sopra la fossa',
    stinger: 'voce_amata',
    text: `Alle 06:20, sulla barca sopra la fossa, ci sono un motore che gira al minimo, due bombole vuote, tre pinne spaiate e **una persona in meno**.

Chi è risalito sta seduto sul fondo della barca, la schiena contro il paramezzale, e non si è ancora levato la muta. Ha la maschera sulla fronte, il boccaglio in mano, e la mano libera aperta: la tiene aperta da diciotto minuti, da quando ha lasciato andare quell'altra, come un cretino, come se qualcuno dovesse riprenderla.

Perché è andata così: uno dei due ha spinto l'altro verso l'alto, e a spingere verso l'alto si va giù. Non c'è stata una battaglia. C'è stata una decisione, presa in due secondi a quaranta metri, da una persona che ha scelto quale dei due doveva vedere il tramonto.

Il mare adesso è fermo. Non c'è la corda, non c'è niente: la cosa ha avuto quello che voleva, e i sazi non cantano.

Il motore gira al minimo perché nessuno ha ancora avuto il coraggio di mettere la marcia.

Alle 07:20, sul molo, c'è Ada in piedi col thermos di acciaio. Nessuno l'ha chiamata. Conta le persone che scendono dalla barca, le conta due volte come si contano i bambini, e poi mette il thermos in mano a chi è tornato e dice l'unica frase possibile: "Bevi. Poi ti porto su."

**(🫁 Il fiato che avete non vale niente: l'aria serviva laggiù, dieci minuti fa. Uno di voi è PRESO DAL CORO e resta come voce. L'unico oggetto che paga una morte è l'ÀNCORA DI VOCE, e si consuma: se ce l'avete, è adesso o mai più.)**`,
    sets: { scambio_fatto: true },
    choices: [
      { text: '⚓ L\'ÀNCORA DI VOCE. Rimettersi la maschera e andare a riprenderlo. Adesso.',
        requires: { item: 'ancora_di_voce' }, removeItem: 'ancora_di_voce', sets: { ancora_usata: true }, next: 'e_scambio_ancora' },
      { text: '🎙 Calare l\'idrofono profondo un\'ultima volta, e sentire se la sua voce c\'è',
        requires: { item: 'idrofono_profondo' }, damage: 4, sets: { sentita_la_voce: true }, next: 'e_scambio_barca' },
      { text: '🏊 Dire ad Ada la promessa: che laggiù c\'è una che sta insegnando a nuotare a una bambina',
        requires: { flag: 'claudia_ha_promesso' }, heal: 6, sets: { promessa_riferita: true }, next: 'e_scambio_barca' },
      { text: '🫂 Dire "Claudia" ad alta voce sopra la fossa. Tre volte, come si fa quando si cerca qualcuno',
        requires: { heroDead: 'claudia' }, sets: { nome_chiamato: true }, next: 'e_scambio_barca' },
      { text: '🫂 Dire "Gaetano" ad alta voce sopra la fossa. Tre volte, come si fa quando si cerca qualcuno',
        requires: { heroDead: 'gaetano' }, sets: { nome_chiamato: true }, next: 'e_scambio_barca' },
      { text: '🫂 Dire "Ciro" ad alta voce sopra la fossa. Tre volte. Lui l\'avrebbe trovata una scemenza',
        requires: { heroDead: 'ciro' }, sets: { nome_chiamato: true }, next: 'e_scambio_barca' },
      { text: '🤲 Chiudere quella mano aperta, mettere la marcia e andare a terra',
        sets: { accettato: true }, next: 'e_scambio_barca' },
    ],
  },

  e_scambio_ancora: {
    location: 'traghetto',
    caption: 'Ore 07:10 — in tre. E alle 17:30 nessun posto vuoto',
    stinger: 'victory',
    reviveAll: true,
    ending: true,
    text: `Non si pensa. Si rimette la maschera.

Quaranta metri con la torcia legata al cinturino, il registratore in una busta di plastica e l'idrofono che scende come una lenza. In cuffia c'è la voce di una guardia che piangeva nel 1965 e, nei silenzi fra le sue parole, una donna del 2026 che canta la seconda strofa. Non è un'arma: è un **indirizzo**. È una cosa del mondo di sopra, mandata giù, che dice *qui, di qua, torna*.

E il Coro — che in duemila anni ha preso ottocento voci e non ha mai dovuto ridarne una, perché nessuno era mai sceso a chiamarle — non sa come si tiene una cosa che qualcuno sta chiamando per nome.

La molla. Non gentilmente: come si molla una busta della spesa quando cede il manico.

La risalita è tutta sbagliata — troppo veloce, l'acqua che entra dove non deve, le orecchie che fischiano, le tabelle di decompressione che vanno a farsi fottere. Escono in tre dentro un metro quadro di mare alle sette e dieci del mattino, vomitano acqua salata sul fondo della barca e poi ridono: in un modo brutto, con le corde del collo tirate. Ma ridono.

Ada, sul molo, li conta. Poi li conta un'altra volta. Poi si mette a sedere sulla bitta e resta lì cinque minuti senza dire niente, perché ventinove anni prima ne erano scesi tre ed erano tornati in due.

---

Alle **17:30** il traghetto per Formia molla gli ormeggi, e al parapetto di poppa non c'è nessun posto vuoto.

L'isola si stacca: il paese diventa una fila di sassi, la boa gialla si vede quattro minuti, Santo Stefano resta a destra e alle 18:20 è una macchia. Le mani sul parapetto — tutte le mani — e la vernice bianca è calda di sole.

Alle **19:47** il sole tocca l'acqua. Il mare va di stagno e poi di rame, le facce diventano d'oro tutte insieme, e chi era rimasto laggiù sta in mezzo agli altri con una coperta di pile addosso in agosto, non parla, e ogni tanto qualcuno gli tocca il braccio senza motivo. Solo per controllare.

Nessuno dice niente per due ore e quaranta. Non c'è niente da dire: c'è da stare vicini e guardare il colore, che è quello che si fa quando è finita.

**(🌅 FINALE: L'ÀNCORA. Si è consumata — era un uso solo, e l'avete speso per una persona. Per la prima volta in duemila anni il Coro ha ridato indietro una voce. Adesso sa che si può fare: è l'unica cosa che vi terrà svegli.)**`,
    choices: [],
  },

  e_scambio_barca: {
    location: 'traghetto',
    caption: 'Ore 17:30 — ponte di poppa, lato destro',
    text: `Il traghetto per Formia molla gli ormeggi alle **17:30** esatte.

Sul parapetto di poppa, lato destro, c'è un posto vuoto. Non è una metafora: è un posto vuoto, larghezza di una persona, tra un signore con la maglia della Roma e chi è tornato. Nessuno ci si mette. Per due ore e quaranta nessuno ci si mette, e non è per rispetto: è che sul ponte c'è spazio, la gente sta dove capita, e stasera capita che lì no.

Nel taschino ci sono **due biglietti**, stampati alle 16:52 dalla biglietteria di Cala Rossano: numero della corsa, data — 30/08/2026 — e su ognuno un nome, perché per la nave i nomi servono. Uno di quei due nomi non è salito. La macchinetta della biglietteria non lo sa, non lo saprà mai, e continuerà a stamparlo ogni volta che qualcuno lo digita.

L'isola si stacca. È questo che fa. Il paese diventa una fila di sassi, Cala Nave una virgola bianca, la boa gialla si vede quattro minuti e poi no. Santo Stefano resta a destra: alle 17:52 è un dente, alle 18:20 una macchia, poi è la faccia del mare.

Le mani sul parapetto: la vernice bianca è calda di sole. Sotto, il motore vibra, arriva ai denti e non smette.

Alle **19:47** il sole tocca l'acqua. La luce va orizzontale, il mare diventa di stagno e poi di rame, e le facce di tutti quelli sul ponte diventano d'oro nello stesso momento.

Anche il posto vuoto diventa d'oro.

Perché la luce non sa.

**(💪 TENUTA +4, che è tutto quello che il vento può fare. 🫁 Il fiato non serve più: non si scende più. Restano due ore e quaranta di mare aperto e una cosa sola da decidere — cosa si fa, adesso, di un nome.)**`,
    heal: 4,
    sets: { tramonto_visto: true, posto_vuoto: true },
    choices: [
      { text: '📓 A Formia chiedere il registro dei passeggeri e scrivere quel nome sulla riga vuota',
        sets: { nome_sul_registro: true }, next: 'e_scambio_torna' },
      { text: '💍 Slegare le due fedi e lasciarle andare in mare a metà canale, sopra la fossa',
        requires: { item: 'le_due_fedi' }, removeItem: 'le_due_fedi', sets: { fedi_in_mare: true }, next: 'e_scambio_torna' },
      { text: '🤐 Niente. Scendere a Formia e non raccontare a nessuno, mai, com\'è andata',
        sets: { silenzio_su_come: true }, next: 'e_scambio_torna' },
    ],
  },

  e_scambio_torna: {
    location: 'alba',
    caption: 'Il 30 agosto, per i trentanove anni successivi',
    ending: true,
    text: `Torna il 30 agosto dell'anno dopo. Da solo, con l'aliscafo delle 8:45, e riparte col traghetto delle **17:30**, perché il punto è esattamente quello: stare in mezzo al canale alle 19:47.

Ada tiene la stanza con la terrazza. Non la affitta a nessun altro per quella notte, sul conto scrive sempre una cifra sbagliata in difetto, e se glielo fai notare fa finta di non sentire. Il primo anno gli dice una cosa sola, in cucina, girata verso il lavello: "Io ci sono passata nel novantasette. Non passa. Si impara a portarlo."

Il secondo anno porta un idrofono. Il quarto lo lascia a casa.

L'ottavo anno smette di entrare in acqua: sta sul molo di Cala Rossano con le gambe a penzoloni e i piedi dentro fino alla caviglia, e gli basta.

Il quindicesimo anno il cameriere della Terrazza di Mimì — che intanto ha i capelli bianchi anche lui — porta due limoncelli e ne posa uno davanti alla sedia vuota, senza dire niente. Da quell'anno lo fa sempre.

Ciro muore in gennaio, a ottantasei anni, nel suo letto, e il figlio manda un messaggio di tre righe. Ada nel 2051, a novembre. La stanza con la terrazza passa alla nipote, che sa la storia a metà, e la metà che sa la tratta bene.

Il trentanovesimo 30 agosto è un martedì. Il mare è piatto, il traghetto parte alle 17:30, il sole tocca l'acqua alle 19:47. Sul ponte di poppa, lato destro, un vecchio con le mani sul parapetto caldo guarda il colore e dice una cosa a voce alta, come ogni anno, e non c'è nessuno abbastanza vicino per sentirla.

La dice comunque. È quello, il patto.

**(🌅 FINALE: LO SCAMBIO. Uno è salito su quel traghetto perché l'altro ha spinto. Non è stato inutile: quarant'anni di 30 agosto sono quarant'anni, e ognuno di quei tramonti è stato guardato da due persone — una col parapetto caldo sotto le mani, una dal fondo. E nessuna delle due era sola.)**`,
    choices: [],
  },

  /* ==================================================================
     4. e_resta — Claudia SCEGLIE di restare. Non è una morte: è una
        scelta d'amore sbagliata, e va scritta come tale.
     ================================================================== */

  e_resta: {
    location: 'porto',
    caption: 'Domenica 30 agosto, ore 16:40 — l\'ultima ora, sul molo',
    stinger: 'campana',
    text: `L'ultima ora è la cosa più normale del mondo, ed è per questo che è insopportabile.

Alle 16:40 sono sul molo di Cala Rossano con due borsoni, un biglietto in mano e uno no. La biglietteria ne ha stampato uno solo. Non c'è stata una scenata: si è parlato per quaranta minuti in una stanza col ventilatore a pale, e alla fine chi resta ha detto la cosa vera, che è anche la più piccola.

> Chi resta: "Ha sei anni e sta in un posto dove non si tocca. Le ho detto che le insegno a nuotare. L'ho detto io, con la mia voce, e quella ci ha creduto."

Non c'è retorica in questa scena e non ce ne sarà: nessuno lo obbliga, nessuno l'ha preso, nessuno è morto. Una persona ha deciso di restare su un'isola da ottocento abitanti per fare una cosa che non si può fare, e per mettersi in mezzo fra quella cosa e i prossimi che arrivano — esattamente come Nicola Sperduto nel 1965. La parte terribile non è che sia sbagliato. È che sia **generoso**.

Ada ha capito prima di tutti, prima che lo dicessero, mentre facevano i borsoni. Ha dato la stanza a mese, che d'inverno costa un terzo, e ha detto due frasi.

> Ada: "Il pane arriva il martedì e il venerdì. D'inverno il traghetto salta due volte a settimana." *(pausa, e non guarda nessuno)* "Mia sorella è rimasta perché ha risposto. Tu resti perché hai promesso. Non è la stessa cosa: tienila diversa."

Il traghetto per Formia è alla banchina col portellone aperto. Parte alle **17:30** e non aspetta nessuno.

**(💪 TENUTA +6: il caffè di Ada funziona anche adesso. 🫁 Il fiato non conta più — era l'aria per scendere, e qui nessuno scende. Restano cinquanta minuti, e sono tutto quello che avete.)**`,
    heal: 6,
    sets: { uno_resta: true },
    choices: [
      { text: '🏊 "Claudia. Dieci minuti al giorno, e non le fa più paura niente." — dirle che è la cosa giusta anche se non lo è',
        requires: { heroDead: 'claudia' }, once: true, heal: 4, sets: { benedetta_la_scelta: true } },
      { text: '📐 "Gaetano. Misura tutto, ogni giorno, e mandami i numeri." — dargli un lavoro, perché sennò non regge',
        requires: { heroDead: 'gaetano' }, once: true, heal: 4, sets: { benedetta_la_scelta: true } },
      { text: '⚓ "Ciro. Lei ci è nato qua." — e Ciro che risponde: "Appunto, signò. Qualcuno deve restare a casa."',
        requires: { heroDead: 'ciro' }, once: true, heal: 4, sets: { benedetta_la_scelta: true } },
      { text: '💍 Slegare il filo e dare entrambe le fedi a chi resta: al collo, come si porta un indirizzo',
        requires: { item: 'le_due_fedi' }, removeItem: 'le_due_fedi', sets: { fedi_a_chi_resta: true }, next: 'e_resta_partenza' },
      { text: '🎵 Insegnare la seconda strofa ad Ada, in cucina, prima di andare: così la sanno in tre',
        requires: { flag: 'sa_ninnananna' }, sets: { ninnananna_lasciata: true }, next: 'e_resta_partenza' },
      { text: '⚓ Lasciare a Ciro il numero e una frase: "se sente la corda, chiami. Non risponda: chiami me."',
        requires: { flag: 'ciro_in_squadra' }, sets: { ciro_di_guardia: true }, next: 'e_resta_partenza' },
      { text: '🪨 Salire un\'ultima volta nella cisterna murata e incidere una terza riga sotto le altre due',
        requires: { flag: 'promessa_incisa' }, sets: { terza_riga_incisa: true }, next: 'e_resta_partenza' },
      { text: '🎫 Salire. Perché uno dei due deve salire, e la decisione era sua',
        sets: { salito_da_solo: true }, next: 'e_resta_partenza' },
      { text: '🧳 Non salire. Scendere all\'ultimo secondo e chiedere ad Ada la stanza per due',
        heal: 8, sets: { restati_in_due: true }, next: 'e_resta_inverno' },
    ],
  },

  e_resta_partenza: {
    location: 'rovine',
    caption: 'Ore 17:30 dal molo — e le sette di ogni mattina, dopo',
    ending: true,
    text: `Il traghetto molla alle **17:30** esatte.

Chi resta sta in piedi sul molo con le mani lungo i fianchi e non fa il saluto con la mano, perché il saluto con la mano si fa per finta. Guarda. La poppa si allontana, la scia si allarga, la nave gira e si vede di fianco, e sul ponte di poppa c'è una figura piccola che non si muove.

Dura sette minuti. Poi la nave è un rettangolo bianco. Poi un punto. Poi il punto è il posto dove ti ricordi che era.

Quando è finita non torna al paese: sale a **Punta Eolo**, venti minuti di strada coi capperi nei muretti e le cicale che a quest'ora vanno giù di colpi. Si siede sui mattoni romani di Villa Giulia, dove una ragazza di ventidue anni ha guardato questo stesso pezzo di mare per venti anni, dopo che le avevano ammazzato il figlio appena nato.

Alle **19:47** il sole tocca l'acqua. Da terra è un'altra cosa: il tramonto non ti scappa, ti sta davanti fermo, e il colore arriva addosso all'isola invece che alle facce sul ponte. Il tufo diventa arancione, Santo Stefano diventa **rosa** per due minuti — rosa, quella cosa lì — e poi grigia, e poi buia.

---

E poi comincia la parte vera, che è questa.

Alle sette di ogni mattina chi resta entra in acqua a Cala Rossano fino alla vita, dove si tocca, e parla. Non canta: **parla**, con la voce normale che si usa coi bambini quando devono imparare una cosa e hanno paura.

> Chi resta: "Prima la faccia. Solo la faccia, non tutta la testa. Se ti entra l'acqua nel naso, soffi: non si respira e non si piange, si soffia." *(e allarga le braccia sul pelo dell'acqua)* "Le gambe dietro, non sotto. Lo so che le vuoi tenere sotto. Dietro." *(pausa)* "Dieci minuti al giorno. Poi non ti fa più paura niente."

È la frase di Marisa, detta a due francesi nel 1997. La sanno tutti su quest'isola e nessuno la ripete mai.

Non risponde nessuno, e va bene così: la regola di Ada vale ancora, non si risponde. È per questo che parla uno solo dei due — così l'altra non deve.

L'altro viene tre volte l'anno, e ad agosto sta un mese. Non hanno mai litigato su questo. Ogni sera alle otto si telefonano e si dicono cosa hanno mangiato.

Il mare, sotto, è zitto da anni. Ma il 30 agosto, ogni anno, alle 19:47 il colore sul tufo è esattamente quello — e c'è qualcuno che lo guarda dall'acqua, a mezzo busto, con le braccia larghe.

**(🌅 FINALE: CHI RESTA. Non è morto nessuno, ed è peggio: uno dei due ha scelto per amore e per esattezza la vita più piccola, e la fa bene. Insegna a nuotare a una bambina del 1943, e non gli risponde nessuno — che è precisamente il risultato che voleva.)**`,
    choices: [],
  },

  e_resta_inverno: {
    location: 'bnb',
    caption: 'Ventotene, novembre — ottocento abitanti e due in più',
    ending: true,
    /* Nessuno è stato PRESO in questo ramo: restano tutti, e restano vivi.
       L'atto D registra chi resta con il selettore `sacrifice`, che però marca
       l'eroe come `morto`: qui lo si annulla, perché in e_resta non muore
       nessuno. (Da rivedere nel motore: manca uno stato "resta" ≠ "morto".) */
    reviveAll: true,
    text: `Scendono dal traghetto insieme, all'ultimo secondo, coi borsoni in mano e il marinaio che li guarda come si guarda la gente strana.

Ada non fa domande, perché aveva già capito a mezzogiorno. Dà la stanza a mese, e a settembre tira su dal ripostiglio una stufetta e la porta in camera senza dire niente.

Ottobre è bellissimo: il mare a ventitré gradi, l'isola vuota, le more nei muretti a secco, la spesa che basta per tre giorni. Novembre è un'altra cosa. A novembre il traghetto salta, il libeccio dura quattro giorni di fila, la luce va via alle cinque, e sull'isola restano ottocento persone che sanno tutte come si chiama quella nota e non ne parlano mai.

Gaetano misura. Ha comprato un sismografo usato, l'ha messo in cantina, e ogni mattina scarica dodici ore di niente: è il niente che lo tiene in piedi.

Claudia insegna. Alle sette entra in acqua fino alla vita e parla — la faccia prima, le gambe dietro e non sotto, se ti entra l'acqua nel naso si soffia — e non le risponde nessuno, e la regola di Ada resta in piedi: non si risponde. Duemila fotografie del mare di Punta Eolo, stessa inquadratura, stessa ora, e in nessuna c'è la banda. In nessuna.

A dicembre litigano per la prima volta, brutto, per una cosa che non c'entra niente: il phon. Poi si mettono a ridere in cucina a mezzanotte e mezza, con la stufetta accesa e i piedi sul tavolo, e la risata dura più della lite.

Il 30 agosto dopo sono ancora lì. E quello dopo.

Non hanno vinto e non hanno perso: hanno fatto la cosa che non fa nessuno, che è **stare**. Duemila anni di gente portata qui contro la propria volontà, e adesso ci sono due che ci restano perché hanno deciso — insieme, e potendo andarsene domani.

**(🌅 FINALE: RESTANO IN DUE. La scelta d'amore sbagliata, fatta in due, diventa una vita: piccola, salata, ventosa, vera. Nessuno vi porta via da qui — e siete gli unici, su tutta l'isola, che potrebbero partire quando vogliono.)**`,
    choices: [],
  },

  /* ==================================================================
     5. e_coro — li ha presi tutti e due. Il finale nero.
     ================================================================== */

  e_coro: {
    location: 'fossa',
    caption: 'Domenica 30 agosto, ore 03:50 — quarantuno metri',
    stinger: 'coro',
    metri: 41,
    text: `Quarantuno metri. La torcia fa un cono di sei metri: dentro il cono non c'è niente, fuori dal cono c'è tutto.

Non è un combattimento. Non c'è morso, non c'è artiglio, non c'è sangue. C'è che il canto arriva da quarantuno metri **e** da zero metri contemporaneamente — da fuori e da dentro l'orecchio — e poi, sotto il canto, una voce fa la cosa che fa la corda: chiama **per nome**.

> Claudia: *(nel boccaglio, e la voce esce pulita come non può uscire una voce a quaranta metri)* "Amore, mi tieni la mano?"

> Claudia: "Amore."

> Claudia: "AMORE. Mi tieni la mano che non la sento più."

Gaetano gliela tiene. Gliela sta tenendo. Ce l'ha in mano da tre minuti e la stringe così forte che domani ci sarebbero i segni, se ci fosse un domani con delle dita dentro.

E allora uno dei due — quello chiamato — apre la bocca e **risponde**. Una sillaba. È tutto quello che serve: *chi sta sott' nun torna sola, si porta appriess' a chi la chiamma.* La bambina lo cantava da ottantadue anni e nessuno l'ha mai ascoltata fino in fondo. Ada l'aveva detto in cucina con un bicchiere d'acqua in mano: **non si risponde.**

Sotto di loro, nel buio, qualcosa **ride**. Non forte: come ride uno in fondo a un corridoio quando sente una cosa che non doveva sentire e non riesce a trattenersi.

Il fiato finisce. Prima a uno, poi all'altro, con dodici secondi di differenza. E i dodici secondi sono la cosa peggiore di tutto il gioco, perché dodici secondi bastano per capire di essere rimasti soli e per sentire l'altro cominciare.

**(🎵 PRESI DAL CORO, tutti e due. Non è una morte: è una collezione. Il fiato è finito e non c'è nessun checkpoint dove tornare: da qui si va avanti. Restano dodici secondi, e sono l'ultima cosa vostra.)**`,
    goldLoss: 20,
    sets: { presi_dal_coro: true, hanno_risposto: true },
    choices: [
      { text: '🎵 Cercarla nel buio e cantare la sua nota. Se è così che va, che vada in due',
        sets: { cantato_insieme: true }, next: 'e_coro_insieme' },
      { text: '🎵 Cantarle la seconda strofa. Adesso. A una bambina di sei anni, mentre affondate',
        requires: { flag: 'sa_ninnananna' }, sets: { seconda_strofa_cantata: true }, next: 'e_coro_insieme' },
      { text: '🤐 Chiudere la bocca e non chiamarla. Che si prenda un silenzio, e che l\'altra non risponda',
        sets: { negata_la_voce: true }, next: 'e_coro_soli' },
    ],
  },

  e_coro_insieme: {
    location: 'fossa',
    caption: 'Dentro la nota — e alle Paracine, il 31 agosto',
    ending: true,
    text: `Non c'è buio. Il buio era prima, quando c'erano gli occhi.

C'è la nota, larga come una stanza, e dentro ci sono ottocento persone che tengono il tempo da così tanto che il tempo ha preso la loro forma. C'è **Giulia**, che chiede ancora del figlio e ha il naso importante anche nella voce. C'è una **guardia** che dice "sono le due, tutto regolare" ogni due ore da sessant'anni. C'è una **bambina** che canta e non si ferma, perché se lei si ferma le altre si spaventano.

E c'è una donna di quarant'anni, istruttrice di sub, che nel 1997 ha risposto. Quando li sente arrivare dice le due cose che diceva da viva, in quest'ordine:

> Marisa: "Stai respirando male. Ci metto dieci minuti e non ti fa più paura niente." *(pausa)* "Ada è mia sorella. Ditele che sto bene."

Non possono. È questa la cosa: non possono più dire niente a nessuno di sopra. Ma ci sono due voci nuove, arrivate insieme, che si tengono — e questa è la crudeltà vera, detta in chiaro: **non siete soli.** Vi sentite. Sapete chi è l'altro, per sempre, e *per sempre* laggiù è una parola che significa qualcosa. Cantate la stessa nota a millesimi di secondo di distanza, quello scarto sotto i trenta millisecondi che fa sembrare un coro più grande di quanto sia, e ogni tanto uno dei due dice il nome dell'altro dentro il canto, e l'altro risponde, e non vi perdete.

Il Coro adesso ha una cosa che in duemila anni non aveva mai avuto: due voci che erano già insieme prima.

---

Alle Paracine, il 31 agosto alle undici, Ada entra nella stanza con la terrazza. Trova due borsoni fatti a metà, un phon, due maschere identiche appoggiate una sull'altra e un foglietto attaccato allo specchio col nastro, con due righe di penna diversa.

Chiama la Capitaneria. Poi il figlio. Poi non chiama più nessuno.

Tre o quattro volte l'anno, sempre d'estate, sempre di notte: prima i cani, poi la corda. Ada la sente dal lavello, in piedi, con un bicchiere d'acqua in mano che non beve. Da quest'anno dentro quella nota ci sono due cose nuove, e Ada le riconosce entrambe.

Non risponde. Non ha mai risposto in vita sua, e non comincia adesso.

**(🎵 FINALE: IL CORO. Vi ha presi tutti e due e non vi ha separati: è l'unica gentilezza di cui è capace. Cantate insieme, per sempre. E una signora con un bicchiere d'acqua in mano, di sopra, vi riconosce e tiene la bocca chiusa — perché è così che si sopravvive, qui.)**`,
    choices: [],
  },

  e_coro_soli: {
    location: 'fossa',
    caption: 'Undici secondi. E Cala Nave, l\'agosto dopo',
    ending: true,
    text: `Tenere la bocca chiusa, laggiù, funziona per undici secondi.

Poi il corpo fa quello che fa: cerca aria e trova acqua, la trachea si apre da sola, e il suono che esce da una persona che sta annegando non lo decide la persona. Al Coro non serve che tu canti. Gli serve che tu **suoni**, e tutti suonano.

Ma il silenzio è **costato**. Perché per non chiamarla hanno dovuto anche non dirsi niente, e nei dodici secondi in cui uno dei due era ancora vivo non si sono chiamati. Quindi laggiù non si sono trovati.

Sono nella stessa nota — ottocento persone dentro una nota sola — e non si sanno. Una cerca. L'altra canta. Poi si scambiano di posto senza accorgersene. È così da adesso, e *adesso*, sotto i quindici metri, ha una durata infinita.

Nella cisterna murata, sul tufo, resta un'incisione fatta col chiodo due giorni prima: **CI SIAMO STATI. C. E G. — 28.8.26**, e sotto **E SIAMO TORNATI SU**. Era al futuro. Era un impegno. Nessuno lo cancellerà, e nessuno lo leggerà.

---

Il 21 agosto dell'anno dopo, a Cala Nave, alle sette e mezza di sera, due ragazzi di Latina in vacanza per quattro giorni nuotano fino alla boa gialla e si abbracciano attaccati alla plastica, ridicoli, con l'acqua in bocca.

Lei tocca la boa con due mani e dice una parolaccia bellissima.

E da sotto — da sotto i loro piedi che pedalano nel blu — arrivano **due note**. Una bassa e lunga. E una sopra, più chiara, di donna, che l'anno prima non c'era.

Lui non le sente.

Lei sì.

E qualcuno, da quarantuno metri, la chiama per nome.

**(🎵 FINALE: IL CORO, E NESSUNO. Non gli avete dato la voce: l'ha presa comunque, e in più vi ha tolto l'ultima cosa che avevate — sapere dov'era l'altro. Il 30 agosto continua senza di voi. E a Cala Nave, adesso, ci sono due note.)**`,
    choices: [],
  },

  /* ==================================================================
     6. e_loop — il 30 agosto ricomincia per sempre. Il finale peggiore,
        e il più breve: la brevità è la crudeltà.
     ================================================================== */

  e_loop: {
    location: 'bnb',
    caption: 'Domenica 30 agosto, ore 18:40 — di nuovo',
    stinger: 'nastro',
    text: `Alle 18:40 il traghetto non è partito. E non partirà. E non è mai partito.

La luce fa una cosa breve — non un lampo: un **salto**, come una traccia che riprende da un punto un po' prima — e poi è mattina.

Sono le 08:00 del 30 agosto. La moka è sul fuoco.

> Ada: "Buongiorno! Il caffè lo faccio con la moka, non ho la macchinetta e non la voglio."

L'ha già detto. L'ha detto nove volte. Lo dirà.

Sul tavolo due tazzine, il pane caldo, i fichi tagliati a metà. Il fico è nello stesso punto del piatto, con lo stesso taglio, e la mosca che gli gira intorno gira nello stesso senso.

> Claudia: *(che non ha ancora toccato la tazzina)* "Quante."

> Gaetano: "Nove."

> Claudia: "Nove."

> Gaetano: "Nove."

Il traghetto per Formia parte alle 17:30. Non parte.

**(🫁 Il fiato è quello di stamattina. Sempre quello. Nove volte quello. Non c'è checkpoint a cui tornare: il checkpoint è questo, ed è la colazione.)**`,
    sets: { loop_infinito: true },
    choices: [
      { text: '☕ Bere il caffè, ridire le stesse cose con le stesse parole, e cercare la differenza',
        sets: { cerca_differenza: true }, next: 'e_loop_differenza' },
      { text: '🛏 Non alzarsi. Restare a letto tutto il giorno e vedere se il giorno finisce comunque',
        heal: 6, sets: { non_alzati: true }, next: 'e_loop_letto' },
    ],
  },

  e_loop_differenza: {
    location: 'bnb',
    caption: 'Il ventiseiesimo giro — lo specchio',
    ending: true,
    text: `La differenza c'è, e sta dove stava da sempre: sul foglietto attaccato allo specchio col nastro.

Prima riga, la lista di Claudia: *"le cisterne romane (dietro la chiesa, dire che ci manda Ada)"*.

Seconda riga, con un'altra penna, aggiunta la prima sera: *"il microfono"*.

Al ventiseiesimo giro, sotto, c'è una terza riga. Non l'hanno scritta loro: grafia larga, vocali tonde, di quelle dei filmati dell'Istituto Luce.

**"anche voi"**

Nella cisterna, sul tufo, l'incisione dice ancora **E SIAMO TORNATI SU**. È al passato. È anche vero. Non è servito a niente.

Al ventisettesimo giro le righe nuove sono due.

**(🎵 FINALE: IL LOOP. Il 30 agosto non finisce. Lo state ancora vivendo adesso, mentre leggete questa riga. E qualcuno, sul vostro specchio, sta imparando a scrivere.)**`,
    choices: [],
  },

  e_loop_letto: {
    location: 'bnb',
    caption: 'La stanza con la terrazza, per sempre',
    ending: true,
    text: `Non si alzano.

Restano a letto col ventilatore a pale che gira piano, il lenzuolo fresco, la finestra aperta e le cicale. Non fanno niente, e va bene: il letto è comodo, la stanza è bella, si tengono la mano e non parlano.

Alle 18:40 la luce fa quel salto.

Sono le 08:00. La moka è sul fuoco. Il fico è nello stesso punto del piatto.

> Claudia: "Non ci alziamo neanche oggi?"

> Gaetano: "No."

E non è brutto. È questa la cosa: **non è brutto.** È comodissimo.

**(🎵 FINALE: IL LOOP, ARRESO. Il giorno più bello dell'anno, per sempre — ed è la cosa peggiore che vi potesse capitare. Fuori il mare è calmissimo. Ci vuole così poco.)**`,
    choices: [],
  },

  /* ---------------- LA TERZA VOLTA CHE L'ACQUA VI RIDÀ INDIETRO ----------------
     Non è un finale: è il bivio che il gioco offre quando un gruppo è rimbalzato
     tre volte sullo stesso scontro. Ci si arriva solo da Engine.riprendiDaCheckpoint,
     e da qui si può tornare al checkpoint (`RIPRENDI_CHECKPOINT`, l'id speciale che
     il motore risolve nell'ultimo checkpoint salvato) o andarsene per davvero.
     Il punto: andarsene deve essere una FINE, non una resa. */
  e_abbandono: {
    location: 'bnb',
    caption: 'Le Paracine, camera due — la terza volta',
    text: `La terza volta che vi svegliate asciutti, non vi guardate.

Gaetano si mette a sedere sul bordo del letto e resta lì con i piedi sul cotto freddo. Claudia sta girata verso il muro e non dorme, e lui lo sa perché il respiro è sbagliato.

Sul comodino c'è il Quaderno, aperto alla pagina di ieri, con la sua scrittura che a un certo punto si fa più piccola.

"Amore."

"Dimmi."

"Quante volte ci hanno rimesso a posto?"

"Tre."

Claudia si gira. Ha gli occhi asciutti e la faccia di una che ha fatto un conto e non le piace il risultato.

"E se ci scendiamo un'altra volta, secondo te, quante ce ne restano?"

Gaetano non risponde, perché è uno che i conti li fa per bene e questo non torna in nessun modo.

Fuori, sotto la persiana, l'isola fa i suoi rumori di sempre: un Ape che sale, i gabbiani, una radio. Sul tavolino della terrazza Ada ha già messo il thermos, come tutte le mattine, come se niente.

E sul frigo, attaccati con la calamita del Parco Nazionale, ci sono due biglietti stampati al porto: **traghetto per Formia, oggi, ore 17:30.**

**(⚠️ Non è una resa e il gioco non vi giudica. Sotto c'è ancora tutto quello che c'era, e adesso il Coro è più stanco di voi. Ma i biglietti sono sul frigo da tre giorni, e nessuno vi obbliga a scendere un'altra volta.)**`,
    stinger: 'penna',
    silenzio: true,
    sets: { tre_volte_rimessi_a_posto: true },
    choices: [
      { text: '🌊 Ci scendiamo. Un\'altra volta, e questa è l\'ultima', next: 'RIPRENDI_CHECKPOINT' },
      { text: '☕ Prima il caffè di Ada, in terrazza, senza dire niente. Poi si decide', once: true, heal: 6, gold: 2, next: 'e_abbandono' },
      { text: '🚢 Prendiamo il traghetto delle 17:30. E non ci voltiamo', sets: { hanno_scelto_di_andarsene: true }, next: 'e_vittoria_muta' },
    ],
  },

};