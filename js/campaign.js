/* ============ PANDATARIA — dati della campagna ============
   ITEMS · RECIPES (crafting) · MISTERI (il Quaderno) · CHECKPOINT_FLAGS
   Valuta: G.gold = FIATO 🫁 (0-20, cap in engine.js) — quanto sei disposto a scendere.
   PV = TENUTA. h.veleno = ACQUA NEI POLMONI 🎵. h.morto = PRESO DAL CORO.
   Armi della realtà (`holy`, danni DOPPI alle voci): il sale della loro acqua, la luce
   vera, il nome che avevano da vivi, il fuoco.
   Vedi docs/DESIGN.md — è la fonte unica.                                             */

const ITEMS = {

  /* --- roba da vacanza, che diventa attrezzatura --- */
  torcia_sub: { name: 'Torcia subacquea', desc: 'Comprata al negozio del porto "per guardare sotto gli scogli". 1000 lumen, tenuta stagna fino a 40 metri, e stanotte vale più della macchina.', usable: false,
    lore: `Sulla confezione: "PER IMMERSIONI RICREATIVE".\n\nRicreative. È la parola che Gaetano rileggerà tre volte, la seconda notte, mentre la carica alla presa sopra il lavandino del B&B.\n\nLa luce che fa è bianca, dura, senza pietà: sotto i venti metri è l'unica cosa che dice la verità. Le voci la odiano perché la luce vera non si può cantare sopra.` },
  nastro_isolante: { name: 'Nastro isolante', desc: 'Mezzo rotolo, nero, appiccicoso e già usato per qualcosa. Il pezzo che tiene insieme il mondo.', usable: false },
  microfono: { name: 'Microfono a clip', desc: 'Quello che Claudia usa per i video. Dieci euro, cattura tutto, e non ha idea di cosa sia sul punto di catturare.', usable: false },
  preservativo: { name: 'Un preservativo', desc: 'Nel beauty di Claudia da un viaggio a Barcellona. Lattice, impermeabile, elastico: la cosa più utile del bagaglio, e non per il motivo previsto.', usable: false },
  cavo_lungo: { name: 'Prolunga da 25 metri', desc: 'Presa in prestito dal ripostiglio del B&B (con permesso). Venticinque metri di rame che portano il suono da laggiù a qui.', usable: false },
  gopro: { name: 'La GoPro di Claudia', desc: 'Custodia fino a 60 metri, batteria all\'82%. Registra anche quello che nessuno vuole rivedere.', usable: false },
  asta_selfie: { name: 'Asta telescopica', desc: 'Un metro e venti di alluminio, comprata per ridere. Serve a guardare dentro i posti senza entrarci.', usable: false },
  coltello: { name: 'Coltellino', desc: 'Nel portachiavi di Gaetano da otto anni. Lama da sei centimetri, un cavatappi e una lima. Non ha mai tagliato niente di più duro del nastro adesivo. Fino a stanotte.', combat: { dice: [1, 6] }, icon: '🔪' },
  resina: { name: 'Resina epossidica', desc: 'Bicomponente, dal cassetto degli attrezzi del B&B. Indurisce in dieci minuti e tiene sott\'acqua: se qualcosa deve NON staccarsi, si usa questa.', usable: false },
  sale_grosso: { name: 'Sale grosso', desc: 'Un chilo, dalla cucina delle Parracine. Sale marino, di QUESTO mare: raccolto, essiccato, macinato dall\'acqua in cui vivono loro.', usable: false },
  bombola_piccola: { name: 'Bombolino da 3 litri', desc: 'Una mini-bombola da diving comprata usata da Ciro. Rubinetto che perde, quindici minuti d\'aria se non perdesse.', usable: false },
  rubinetto_rotto: { name: 'Rubinetto di ricambio', desc: 'Ottone, filettato, ammaccato. Ciro ne ha una cassa: "Su un\'isola non si butta niente, signò."', usable: false },
  filo_nylon: { name: 'Filo di nylon 0,60', desc: 'Da pesca, resistente a venti chili. Tiene un pesce serio o una cosa piccola che non vuoi perdere.', usable: false },
  lenza: { name: 'Lenza a mano', desc: 'Cinquanta metri su un rocchetto di sughero, come si pescava prima dei mulinelli.', usable: false },
  amo_grande: { name: 'Amo da cernia', desc: 'Acciaio, curvo, grosso come un dito. Fa una brutta impressione anche fuori dall\'acqua.', usable: false },
  tappo_sughero: { name: 'Sughero da rete', desc: 'Galleggiante da rete da posta, consumato dal sale.', usable: false },
  calce: { name: 'Sacchetto di calce', desc: 'Dal cantiere della strada per Punta Eolo. Calce viva: quella con cui si chiudevano le cose, una volta.', usable: false,
    lore: `Un sacchetto da cantiere. Ossido di calcio: sull'etichetta il simbolo del corrosivo e la scritta EVITARE IL CONTATTO CON GLI OCCHI.\n\nCon l'acqua fa una reazione che scalda, e il sacchetto diventa tiepido in mano. Con qualcosa di organico fa una reazione che non è il caso di descrivere e che, prima dei frigoriferi e dei sacchi di plastica, era il modo normale di chiudere una faccenda.\n\nSull'isola ce n'è dappertutto: nei muri, nelle cisterne, nel muro del panopticon che ha preso la forma delle dita. Non è un caso. È un posto dove le cose si chiudevano.` },
  pietra_carcere: { name: 'Pietra di Santo Stefano', desc: 'Un pezzo di muro del panopticon, staccato dove era già staccato. Tufo e calce, e dentro qualcosa di scuro che non è muffa.', usable: false,
    lore: `Tufo e calce, pesa come un mattone, e si è staccato da solo: l'avete solo raccolto.\n\nSulla faccia interna, quella che stava dentro il muro, ci sono dei segni. Non incisi: impressi. La calce fresca ha preso la forma di quello che le stava contro mentre asciugava, e quello che le stava contro erano dita.\n\nIl panopticon ha chiuso nel 1965. La calce di quel muro è del 1795.` },
  registratore: { name: 'Registratore a cassette', desc: 'Un Geloso a batterie, dalla casa di Ciro. Funziona. Ciro dice che è meglio se resta senza nastro.', usable: false,
    lore: `Un Geloso a quattro pile grandi, cinghia di finta pelle spellata sull'angolo. Ciro lo teneva nell'armadio con le lenzuola, avvolto in una federa.\n\nFunziona. Il motore fa un ronzio basso e il contagiri di plastica gira davvero. Il tasto REC è più duro degli altri: qualcuno l'ha premuto molte volte.\n\n«Meglio se resta senza nastro», dice Ciro. Non lo dice come una superstizione. Lo dice come si dice di non lasciare le forbici aperte in casa: una cosa pratica, imparata.` },
  nastro_1965: { name: 'Il nastro del 1965', desc: '⚠️ Una cassetta senza custodia, etichetta a penna: "2 SETT. \'65 — ULTIMA NOTTE — NON". La frase finisce lì. Ciro dice di non suonarlo. Ciro dice anche molte altre cose.', usable: false,
    lore: `L'etichetta dice: "2 SETT. '65 — ULTIMA NOTTE — NON".\n\nNon cosa? Non suonare. Non ascoltare. Non buttare. Non dimenticare. Chiunque l'abbia scritta si è fermato lì, e la cosa peggiore è che si è fermata di mano ferma: non è un tratto interrotto di fretta. È uno che ha deciso, a metà parola, che il resto era meglio non scriverlo.\n\nCiro l'ha tenuto in un cassetto per sessant'anni senza aprirlo. Quando ve lo dà non dice "custoditelo". Dice: "Adesso è vostro. Io non lo voglio più in casa."` },
  rum_di_ciro: { name: 'Rum di Ciro', desc: 'Bottiglia senza etichetta, 60 gradi buoni, dal fondo della barca. "Serve per il freddo, signò. E per le altre cose."', usable: true, heal: 6 },
  benzina: { name: 'Taniga di benzina', desc: 'Cinque litri per il fuoribordo. Nell\'acqua non serve a niente. Dentro una cella, invece.', usable: false },
  medaglietta_giulia: { name: 'Medaglietta romana', desc: 'Un disco di bronzo ossidato trovato nel tufo: un profilo di donna e tre lettere, IVL. Iulia. Pesa più di quanto dovrebbe.', usable: false,
    lore: `Un disco di bronzo, grande come una moneta da due euro, verde di ossido tranne dove qualcuno l'ha strofinato — di recente, e non siete stati voi.\n\nDa una parte un profilo di donna col naso importante e i capelli raccolti come si usava sotto Augusto. Dall'altra tre lettere incise a punta: IVL.\n\nIulia. Giulia.\n\nSe la tieni nel palmo chiuso per più di dieci secondi si SCALDA, e non è il calore della mano: è il verso opposto, come una cosa che si accorge di essere tenuta.` },
  foto_bambina: { name: 'Foto dal museo', desc: 'La riproduzione di una foto del 1943: una bambina di sei anni sul molo di Napoli, cappottino buono, la mano nella mano di qualcuno tagliato via dall\'inquadratura. Sotto: "imbarco del 24.10".', usable: false,
    lore: `La riproduzione costa due euro al museo e ha una cornice di cartone che non regge.\n\nLa bambina guarda l'obiettivo come guardavano i bambini nel 1943: seria, perché una macchina fotografica era una cosa importante. Il cappottino è buono, col collo di velluto. Qualcuno l'ha vestita bene per il viaggio.\n\nLa mano che tiene la sua entra da destra e finisce lì, tagliata dal bordo. È una mano d'uomo, con la fede. Nella lista d'imbarco della Santa Lucia c'è un solo cognome che compare due volte.` },
  lista_imbarco: { name: 'Lista d\'imbarco della Santa Lucia', desc: 'Fotocopia da un archivio: centoquarantasei nomi a macchina, e uno aggiunto a penna in fondo, in fretta. Quello a penna è di una bambina.', usable: false,
    lore: `Centoquarantasei nomi battuti a macchina, in colonna, con l'età accanto. La macchina aveva la «e» che batteva alta: si vede in tutta la pagina.\n\nPoi, in fondo, uno aggiunto a penna. Grafia diversa, inchiostro diverso, e la riga non è dritta perché chi scriveva teneva il foglio in mano e non sul tavolo. Sei anni.\n\nQualcuno l'ha imbarcata all'ultimo momento, e per farlo ha dovuto scrivere il suo nome su una lista già chiusa. È un gesto gentile. È il gesto più gentile di tutta questa storia, e ha ucciso una bambina.` },
  giocattolo: { name: 'Un cavallino di celluloide', desc: 'Recuperato dalla stiva del relitto a quarantacinque metri. Giallo, era. Una zampa manca. Ha fatto ottantadue anni sotto sale e ha ancora la faccia allegra.', usable: false,
    lore: `Celluloide gialla, otto centimetri, di quelli stampati in due metà e incollati sulla schiena: la giunta si vede ancora.\n\nLa zampa posteriore destra manca, e non si è rotta sotto: il moncone è liscio, consumato da una mano che lo teneva sempre nello stesso punto. Era già rotto quando è salito a bordo. Era il suo cavallino rotto, quello che ti porti perché è tuo.\n\nOttantadue anni a quarantacinque metri, e la faccia dipinta è ancora allegra. La celluloide non lo sa.` },
  anello_gaetano: { name: 'La fede di Gaetano', desc: 'Se la tolse in acqua nel 2019 e per miracolo la ritrovò. Da allora, in mare, la tiene al collo.', usable: false,
    lore: `Oro giallo, sottile, di quelli che non si notano. Dentro, una data.\n\nNel 2019 se l'è tolta in acqua per non perderla — che è la cosa più stupida che si possa fare — e l'ha ritrovata sul fondo, in un metro e mezzo di sabbia mossa, dopo quaranta minuti di apnee. Ne parla ancora come di una cosa capitata a un altro.\n\nDa allora, in mare, la tiene al collo insieme a quella di Claudia. Le due fedi sullo stesso filo fanno un rumore piccolo quando nuoti. Sotto i quindici metri quel rumore si sente ancora, e non dovrebbe: l'acqua non porta i suoni piccoli. Li porta il Coro, che ha imparato a fare anche quello.` },
  anello_claudia: { name: 'La fede di Claudia', desc: 'Identica all\'altra, mezza misura più piccola. Dentro, incisa, una data e due iniziali.', usable: false,
    lore: `Mezza misura più piccola, e più lucida: lei non la toglie mai, quindi si consuma uniforme.\n\nDentro, la stessa data e due iniziali. Le ha volute lei, contro il parere del negoziante, che diceva che su un anello così sottile l'incisione dopo qualche anno non si legge più. Si legge ancora.\n\nQuando Gaetano se la mette al collo con la sua, lei glielo lascia fare e non dice niente. Sa perché lo fa: perché se una delle due torna a riva, tornano tutte e due.` },
  caffe_parracine: { name: 'Il caffè delle Parracine', desc: 'Fatto con la moka della signora, bevuto in terrazza guardando Santo Stefano. Toglie la nota dalla testa: la cosa più concreta dell\'isola.', usable: true, heal: 8, cureVeleno: true },
  taralli: { name: 'Taralli', desc: 'Comprati al forno del paese, sacchetto di carta unto. Il cibo vero è un\'arma della realtà, e questi sono molto veri.', usable: true, heal: 5 },
  telo_mare: { name: 'Telo da mare', desc: 'A righe, gigante, di quelli che si portano in due. Asciuga, scalda, e serve per una cosa a cui nessuno ha pensato.', usable: false },
  maschera_buona: { name: 'La maschera buona (per due)', desc: 'Gaetano ne ha comprate DUE, identiche, e non l\'ha detto. Vetro temperato, silicone morbido. Vedere bene, sotto, cambia tutto — in tutti e due i sensi.', usable: false,
    lore: `Vetro temperato singolo, silicone trasparente, volume interno piccolo per compensare in fretta. Le ha comprate a Formia mentre lei era al bar. Due identiche. Non l'ha detto.\n\nNon l'ha detto perché dirlo era ammettere che pensava che sarebbe scesa. E pensarlo, a febbraio, mentre prenoti quattro giorni di vacanza, è una cosa che non si dice ad alta voce a una persona che ha paura dell'acqua profonda da quando ha sei anni.\n\nLe ha prese uguali per un'altra ragione. Sotto, con la maschera buona, si vede la faccia dell'altro. E se scendi con qualcuno, sapere che faccia sta facendo è la sola informazione che conta.` },
  /* Le PINNE e il BOCCAGLIO sono attrezzatura vera, comprata a marzo in saldo, e non
     sono decorazione: ognuno dei tre pezzi apre scelte diverse. La maschera fa VEDERE
     (e il problema di Claudia non è l'acqua, è il non vedere). Il boccaglio fa RESTARE
     a guardare senza alzare la testa — e alzare la testa è il gesto della paura
     travestito da gesto tecnico. Le pinne fanno TORNARE: con quelle la distanza smette
     di essere un muro e diventa un numero. */
  pinne: { name: 'Due paia di pinne', desc: 'Comprate a marzo in saldo, taglia sua e taglia tua. Non servono ad andare veloce: servono a poter tornare, e questo cambia tutto quello che sei disposto a raggiungere.', usable: false,
    lore: `Pinne da snorkeling, gomma nera, il tallone aperto col cinturino. Sulla suola c'è ancora l'adesivo del prezzo, e sotto il prezzo un altro prezzo, più basso.\n\nGaetano le ha comprate a marzo, con i boccagli, cinque mesi prima di dire a Claudia dove andavano. Le ha tenute in garage in una busta, e ogni tanto la busta la spostava per fare spazio a qualcos'altro e ci pensava.\n\nNon servono ad andare veloce. Servono a poter tornare: con le pinne ottanta metri sono venti secondi, e venti secondi sono una cosa che si può decidere. È la differenza fra una distanza e un muro, ed è tutta lì.` },
  boccaglio: { name: 'Due boccagli', desc: 'Ancora nella busta del negozio, con lo scontrino dentro. Col boccaglio non devi alzare la testa per respirare: puoi tenere la faccia dentro e continuare a guardare.', usable: false,
    lore: `Due boccagli di plastica trasparente col boccheruolo di silicone, ancora attaccati al cartoncino, e nella busta lo scontrino: marzo.\n\nIl boccaglio è il pezzo che nessuno pensa sia importante e che invece decide tutto. Senza, per respirare devi alzare la testa: e alzare la testa vuol dire perdere di vista il fondo per un secondo, e in quel secondo la testa ricomincia da zero a immaginare. È il gesto della paura travestito da gesto tecnico.\n\nCol boccaglio la faccia resta dentro e il respiro va avanti da solo, come a letto. Puoi guardare una cosa finché non hai finito di guardarla — e una cosa guardata per intero, come dice Claudia di mestiere, perde il diritto di cambiare forma.` },
  /* La maschera trovata nella cisterna murata NON è «la maschera buona» di Gaetano:
     era di Marisa, la maestra di nuoto del 1997, e il gioco la dava come se fosse una
     delle due comprate a marzo. Due oggetti diversissimi con lo stesso significato
     meccanico era una bugia: adesso ha la sua scheda. */
  maschera_1997: { name: 'La maschera del 1997', desc: 'Silicone azzurro sbiadito, vetro singolo, cinghiolo marcito e rifatto con un elastico. Anni Novanta. Non era di un bambino: era di un adulto che scendeva.', usable: false,
    lore: `Silicone azzurro di quelli che negli anni Novanta si vendevano in tutte le bancarelle, diventato quasi bianco dove ha preso la luce. Il vetro è singolo, senza bordo, e ha una riga di calcare che non viene via.\n\nIl cinghiolo originale si è marcito e qualcuno l'ha rifatto con un elastico da mercerie, annodato due volte. Chi lo ha rifatto voleva usarla ancora: non si aggiusta una maschera che non si ha intenzione di rimettere.\n\nMarisa insegnava nuoto a Formia e veniva qui d'estate. Nel novantasette è scesa nella cisterna murata perché aveva sentito una bambina chiamare e le ha risposto — e questo è tutto quello che di lei si sa con certezza. La maschera era rimasta a galla.` },

  /* --- risultati del crafting --- */
  torcia_da_casco: { name: 'Torcia da casco', desc: 'La torcia fasciata al cinturino della maschera con tre giri di nastro. Mani libere. Serve per la fossa: laggiù, con una mano occupata, non si torna su.', usable: false },
  idrofono: { name: 'Idrofono artigianale', desc: 'Microfono a clip sigillato in un preservativo, calato su una prolunga. Si fa DAVVERO così. Sente le voci e dà loro una coordinata: al Coro, essere localizzato fa male.', combat: { dice: [2, 6], distract: true, distractText: ' — la voce si sente MISURATA, e per un attimo non sa più dove stare!' }, icon: '🎙' },
  idrofono_profondo: { name: 'Idrofono profondo', desc: 'L\'idrofono su venticinque metri di cavo, con la resina sui contatti. Arriva a sentire il relitto. Sentirlo è brutto, ma è l\'unico modo di sapere.', usable: false,
    lore: `Venticinque metri di prolunga, un microfono a clip dentro un preservativo, resina epossidica sui contatti. Costo totale: undici euro e cinquanta. Funziona meglio di quanto sia decente.\n\nA dieci metri si sente il mare. A venti si sente il mare e qualcosa sotto il mare. A venticinque, che è tutto il cavo, si sente il relitto: il ferro che si muove di un millimetro all'anno e fa un suono da millimetro.\n\nE dentro quel suono, le altre cose. L'idrofono non le aggiunge: le porta su. È una differenza importante, e conviene ricordarla quando viene voglia di dare la colpa all'attrezzo.` },
  occhio_lungo: { name: 'L\'occhio lungo', desc: 'GoPro all\'asta telescopica, nastro e resina. Guardi dentro senza entrare — dentro le cisterne sigillate, dentro le celle, dentro le cose.', usable: false,
    lore: `Un'asta da selfie da quattro euro, allungata a due metri e dieci, con la GoPro legata in punta da tre giri di nastro isolante e una colata di resina che ha preso male e resterà appiccicosa per sempre.\n\nServe a guardare dentro senza entrare: dentro una cisterna murata, dentro una cella, dentro un buco nel tufo. Registra e non ha paura, che sono le sue due qualità.\n\nC'è una regola, imparata la prima volta: il video si guarda DOPO, alla luce, in due. Chi lo guarda da solo sullo schermino, sul posto, vede meno di quello che c'è. E a volte vede più.` },
  coltello_da_cintura: { name: 'Coltello da cintura', desc: 'Coltellino annegato nella resina dentro un pezzo di tubo, legato alla cintura. In acqua non lo perdi. In acqua, perdere il coltello è come perdere la mano.', combat: { dice: [1, 8] }, icon: '🔪' },
  salamoia: { name: 'Salamoia di Pandataria', desc: 'Sale di questo mare disciolto nell\'acqua della cisterna. Alle voci fa un male atroce: è la loro stessa acqua, ma CONCENTRATA — la cosa che sono state senza il resto.', combat: { dice: [2, 8], holy: true }, icon: '🧂' },
  bombola_riparata: { name: 'Bombolino riparato', desc: 'Rubinetto nuovo, guarnizione di fortuna, tre litri a duecento bar. Non è un\'immersione: sono quattro minuti. Ma quattro minuti, laggiù, sono un\'era.', usable: false,
    lore: `Tre litri, duecento bar, un rubinetto nuovo da quindici euro e una guarnizione ricavata da un tappo di sughero e dalla resina. Tiene. Non dovrebbe, e tiene.\n\nQuattro minuti. È tutto quello che c'è dentro: quattro minuti a venticinque metri se respiri come si deve, due se hai paura, e la paura consuma aria a una velocità che non si crede finché non si guarda il manometro.\n\nL'affare vero non è l'aria. È che con l'erogatore in bocca non puoi urlare, e a un certo punto ti verrà voglia di urlare. A quel momento ci si prepara adesso, o non ci si prepara.` },
  collana_di_giulia: { name: 'La collana di Giulia', desc: 'La medaglietta IVL appesa al filo di nylon, al collo. Chi la porta viene RICONOSCIUTO: Giulia non tocca chi porta il suo nome. Una volta.', usable: false,
    lore: `Filo di nylon da pesca, 0,40, due nodi doppi. Il bronzo ci sta appeso al centro e batte sullo sterno a ogni bracciata.\n\nAl collo la medaglietta si comporta diversamente che in tasca: non si scalda. Sta fredda, esattamente della temperatura dell'acqua, anche quando l'acqua è a ventidue gradi e tu no.\n\nGiulia Maggiore ha passato cinque anni su questo scoglio, poi l'hanno spostata a Reggio, e nel 14 dopo Cristo l'hanno lasciata morire di fame. Sua madre Scribonia l'aveva seguita in esilio per scelta propria. Giulia non tocca chi porta il suo nome. Una volta. Che cosa fa la seconda, non lo sa nessuno: nessuno è stato tanto scemo da chiederglielo due volte.` },
  la_voce_del_65: { name: 'La voce del \'65', desc: '⚠️ Il registratore col nastro dentro, pronto a partire. Fa sentire al Coro la voce di una guardia che piangeva. È l\'arma migliore che avete. È anche la cosa che vi ha fregato.', combat: { all: true, distract: true, dice: [2, 6], distractText: ' — sente la voce del \'65 e si FERMA: quella voce la conosce!' }, icon: '📻',
    lore: `Il nastro è dentro, riavvolto, e il contagiri segna 000. Non è così che l'avete trovato.\n\nDura quattro minuti e diciotto. Per i primi tre non c'è niente: la stanza, una sedia che si muove, il mare fuori. Poi un uomo comincia a parlare, e non sta parlando a nessuno. Sta dicendo i numeri delle celle, uno dopo l'altro, e piange senza smettere di dire i numeri.\n\nAl Coro questa voce fa male perché è una delle sue. È l'unica volta che uno di loro ha detto la verità con la propria bocca, di sua volontà, sapendo che qualcuno l'avrebbe sentito. Non l'hanno perdonato. Non l'hanno perdonato ancora.` },
  palamito: { name: 'Palamito', desc: 'Lenza, amo da cernia, sughero. Si cala e si aspetta. Serve a tirare su qualcosa dal fondo senza scendere — che a volte è saggio e a volte è peggio.', usable: false },
  stucco: { name: 'Stucco di calce e tufo', desc: 'Calce viva impastata con la pietra macinata del carcere. Con questo si CHIUDE una bocca: è così che i romani hanno sigillato quattro cisterne.', usable: false },
  molotov_di_ciro: { name: 'La bottiglia di Ciro', desc: 'Rum a 60 gradi, benzina, e uno straccio del telo. Sott\'acqua non serve a niente. In una cella di due metri per tre, invece, è la fine di una conversazione.', combat: { dice: [3, 6], holy: true }, icon: '🔥' },
  ninnananna: { name: 'La ninnananna', desc: 'La foto della bambina e la collana di Giulia, tenute insieme. Non è un oggetto: è una FRASE che ora sapete dire. La bambina smette di chiamare, se glielo cantate voi.', usable: false },
  ancora_di_voce: { name: 'L\'ÀNCORA DI VOCE', desc: 'Idrofono profondo, il nastro del \'65 e la ninnananna: un oggetto che non dovrebbe esistere. Riporta indietro chi il Coro ha PRESO. Un uso. Uno solo.', usable: false, revive: true },
  le_due_fedi: { name: 'Le due fedi', desc: 'Due anelli identici, uno mezza misura più piccolo, legati insieme col filo di nylon. Non è un\'arma e non fa danni. È la cosa più potente del gioco e lo capirete alla fine.', usable: false },
};

/* ============ CRAFTING — le 15 combinazioni ============
   Nessun elenco visibile al giocatore: si intuiscono dai testi. I tentativi
   sbagliati rispondono con una battuta (js/crafting.js). Tre sono OBBLIGATORIE
   per il finale migliore: torcia_da_casco, ninnananna, ancora_di_voce.        */

const RECIPES = [
  { in: ['torcia_sub', 'nastro_isolante'], out: 'torcia_da_casco', consuma: ['nastro_isolante'], flag: 'r_torcia',
    titolo: 'Mani libere',
    text: `Tre giri di nastro attorno al cinturino della maschera, la torcia incastrata di fianco alla tempia, il fascio che punta dove punti la faccia.

> Gaetano: *(provandola davanti allo specchio del bagno)* "Ecco. Adesso guardo dove guardo. Sembra una scemenza, Claudia, ma laggiù con una mano occupata dalla torcia hai UNA mano. Con una mano non ti tiri su."

> Claudia: "Sembri un minatore triste."

> Gaetano: "Sono un minatore triste. Ma con le mani libere."`,
  },
  { in: ['microfono', 'preservativo'], out: 'idrofono', consuma: true, flag: 'r_idrofono',
    titolo: 'Si fa davvero così',
    text: `Il microfono a clip dentro il preservativo, l'aria spremuta fuori, il nodo stretto sopra il cavetto e sigillato col nastro.

> Claudia: "Amore. Mi stai dicendo che gli idrofoni si fanno... così."

> Gaetano: "Ti sto dicendo che li fanno così i biologi marini con quattro soldi, sì. Il lattice trasmette il suono e non passa l'acqua. È solo una membrana." *(alza gli occhi)* "Che è anche quello che siamo noi, se ci pensi."

> Claudia: "Non ci penso. Non ci penso per niente."`,
  },
  { in: ['idrofono', 'cavo_lungo'], out: 'idrofono_profondo', consuma: ['cavo_lungo'], flag: 'r_idro_prof',
    titolo: 'Venticinque metri di orecchio',
    text: `Il cavo della prolunga giuntato al cavetto del microfono, la giunta annegata nella resina, tutto arrotolato su una bottiglia di plastica come si arrotola una lenza.

> Gaetano: "Venticinque metri. Se lo calo dalla barca sopra la fossa, sento quello che c'è a venticinque metri sotto la barca."

> Claudia: *(dopo un silenzio)* "E se non voglio sapere quello che c'è a venticinque metri sotto la barca?"

> Gaetano: "Allora non lo caliamo." *(finisce di arrotolare comunque)* "Ma lo teniamo pronto."`,
  },
  { in: ['gopro', 'asta_selfie'], out: 'occhio_lungo', consuma: true, flag: 'r_occhio',
    titolo: 'Guardare senza entrare',
    text: `GoPro fissata in cima all'asta con nastro e una goccia di resina, schermo girato verso di voi, registrazione sempre attiva.

> Claudia: *(e la voce le si indurisce nel modo che le viene quando smette di avere paura e comincia a lavorare)* "Un metro e venti. Vuol dire che posso guardare dentro un posto stando un metro e venti FUORI da quel posto."

> Gaetano: "E se dentro c'è qualcosa?"

> Claudia: "Allora l'ho visto io e non ha visto me. È tutto il mio mestiere, Gaetà. È l'unica cosa che so fare davvero."`,
  },
  { in: ['coltello', 'resina'], out: 'coltello_da_cintura', consuma: true, flag: 'r_coltello',
    titolo: 'Quello che non si perde',
    text: `Il coltellino annegato nella resina dentro un mozzicone di tubo di plastica, il tubo legato alla cintura con due giri di filo.

> Ciro: *(che vi guarda fare, e per la prima volta annuisce)* "Bravo. In acqua il coltello si lega. Sempre. Perché quando ti serve, ti serve che sta LÌ, non sul fondo a sei metri sotto di te." *(pausa)* "Me l'ha insegnato mio padre dopo che io il coltello l'ho perso una volta. Una volta sola, signò."`,
  },
  { in: ['sale_grosso', 'medaglietta_giulia'], out: 'salamoia', consuma: ['sale_grosso'], flag: 'r_salamoia',
    titolo: 'La loro stessa acqua',
    text: `Il sale grosso versato nell'acqua raccolta dalla cisterna, girato col dito finché non si scioglie più niente. Il liquido diventa denso, pesante, e sul fondo del barattolo si deposita una sabbia grigia che non era sale.

> Gaetano: "Sale di questo mare in acqua di questa cisterna. È... è la loro stessa sostanza, concentrata. Se una voce è quello che resta di una persona in acqua, questa roba è quello che resta di TANTE, senza l'acqua in mezzo."

> Claudia: *(guardando il barattolo con l'espressione di chi ha capito troppo bene)* "Quindi gli fa male perché gli ricorda cosa sono."

> Gaetano: "Gli fa male perché gli ricorda cosa NON sono più."`,
  },
  { in: ['bombola_piccola', 'rubinetto_rotto'], out: 'bombola_riparata', consuma: true, flag: 'r_bombola',
    titolo: 'Quattro minuti',
    text: `Rubinetto nuovo, guarnizione ricavata da un pezzo di camera d'aria, chiave inglese, e la pressione che regge: duecento bar, tre litri.

> Gaetano: "Quattro minuti. Quattro minuti e mezzo se respiri piano e non ti agiti."

> Claudia: "Quanto ci vuole ad arrivare al relitto?"

> Gaetano: *(e non risponde subito, che è la risposta)* "Due. Due minuti in discesa, se vai giù come un sasso."

> Claudia: "Quindi quattro minuti sono due minuti."

> Gaetano: "Quattro minuti sono due minuti, sì."`,
  },
  { in: ['medaglietta_giulia', 'filo_nylon'], out: 'collana_di_giulia', consuma: ['filo_nylon'], flag: 'r_collana',
    titolo: 'Portare il suo nome',
    text: `Il filo passato nel foro del bronzo, il nodo dietro il collo, il disco freddo che si appoggia sullo sterno e poi si scalda troppo in fretta.

> Claudia: *(la mano sul disco, e la voce che le viene fuori piano)* "Si è scaldata subito. Gaetà. Si è scaldata SUBITO."

> Gaetano: "Lo so."

> Claudia: "Come se avesse capito che me la sono messa."

> Gaetano: *(e sceglie la verità, perché con lei ha smesso di fare altrimenti)* "Ha capito che te la sei messa. Portala. Se una cosa vecchia di duemila anni ti riconosce, è meglio che ti riconosca come una che le porta il nome, non come una che glielo ha rubato."`,
  },
  { in: ['registratore', 'nastro_1965'], out: 'la_voce_del_65', consuma: true, flag: 'r_voce65',
    titolo: '⚠️ Il nastro nel registratore',
    text: `La cassetta entra nel vano con quel clac di plastica anni Sessanta che sa fare solo la plastica anni Sessanta. Il tasto PLAY resta alzato: non l'avete premuto.

Non ancora.

> Ciro: *(dalla porta, e non entra)* "L'avete messo dentro."

> Gaetano: "Non l'abbiamo suonato."

> Ciro: "L'avete messo DENTRO." *(si passa una mano sulla faccia)* "Sessant'anni che sta in un cassetto senza macchina. Sessant'anni che è solo un pezzo di plastica marrone. Adesso è una VOCE che aspetta un dito." *(indica il registratore)* "Quando lo premete — perché lo premerete — fatelo dove serve. Non qui. Qui c'è mia moglie che dorme."

**(⚠️ Arma potentissima, e il gioco vi ha appena avvertiti due volte.)**`,
  },
  { in: ['lenza', 'amo_grande'], out: 'palamito', consuma: true, flag: 'r_palamito',
    titolo: 'Tirare su senza scendere',
    text: `Lenza, amo da cernia, sughero come segnale. Si cala, si lega alla bitta, si aspetta.

> Ciro: "Il palamito è la pesca dei pazienti. Cali, e il mare decide. A volte tiri su una cernia da otto chili. A volte tiri su una scarpa." *(annoda il sughero con tre dita, senza guardare)* "E a volte tiri su una cosa che era meglio lasciare dov'era. Ma almeno l'hai tirata su TU. Non è scesa lei a prendersi te."`,
  },
  { in: ['calce', 'pietra_carcere'], out: 'stucco', consuma: true, flag: 'r_stucco',
    titolo: 'Come fecero i romani',
    text: `La pietra del carcere spaccata col martello e ridotta in polvere, la calce viva impastata con l'acqua di mare, e i due mescolati fino a una malta grigia che scalda le mani mentre prende.

> Gaetano: "È la stessa ricetta. Calce e materiale del posto, ed è così che si è chiuso tutto in questo Paese per duemila anni." *(gira l'impasto)* "Quattro cisterne, Claudia. Qualcuno ha impastato questa roba quattro volte, ha chiuso quattro bocche, e non l'ha scritto in nessun registro."

> Claudia: "Perché nei registri si scrivono le cose fatte bene."

> Gaetano: "Perché nei registri si scrivono le cose FINITE. E quella non era finita."`,
  },
  { in: ['rum_di_ciro', 'benzina'], out: 'molotov_di_ciro', consuma: true, flag: 'r_molotov',
    titolo: 'La bottiglia di Ciro',
    text: `Metà rum versato via — sacrilegio, dice Ciro, e lo dice sul serio — benzina fino al collo, uno straccio strappato dal telo da mare ficcato dentro fino a pescare.

> Ciro: "Sott'acqua non serve a niente. Ma non tutto quello che dovete fare, stanotte, sta sott'acqua." *(mette la bottiglia in mano a Gaetano con una delicatezza da farmacista)* "In una cella di due metri per tre, questa chiude una conversazione. Non ne sono fiero. Ma a undici anni ho visto quel posto da fuori e ho passato sessant'anni a pensare a cosa ci avrei fatto se ci entravo."`,
  },
  { in: ['foto_bambina', 'collana_di_giulia'], out: 'ninnananna', consuma: false, flag: 'r_ninnananna',
    titolo: 'La ninnananna',
    text: `La foto appoggiata sul tavolo, la medaglietta di Giulia posata sopra, e Claudia che tiene le due cose vicine e capisce.

> Claudia: *(pianissimo, come se dirlo forte lo rompesse)* "Aspetta. Aspetta aspetta aspetta. La bambina canta per non avere paura. Sua madre le aveva detto che se canti forte la paura non ti sente. E Giulia — Giulia ha passato cinque anni in una cisterna che è una camera di risonanza, e sa CANTARE, deve avere imparato a cantare."

> Gaetano: "Claudia—"

> Claudia: "La bambina non chiama nessuno, Gaetano. La bambina ha SEI ANNI e ha paura e canta. E nessuno, in ottantadue anni, le ha mai cantato la seconda strofa."

Prende la foto in una mano e la medaglietta nell'altra, e le tiene così, e adesso c'è una frase che sa dire.

**(La ninnananna è vostra. Non è un'arma. È l'unica cosa gentile che avete.)**`,
  },
  { in: ['idrofono_profondo', 'la_voce_del_65'], out: 'ancora_di_voce', consuma: ['idrofono_profondo'], flag: 'r_ancora',
    titolo: 'L\'ÀNCORA DI VOCE',
    text: `L'idrofono profondo collegato all'uscita del registratore invece che all'ingresso. Il cavo che di solito PORTA SU il suono, girato al contrario: adesso porta GIÙ.

> Gaetano: *(le mani che gli tremano per la prima volta da quando fa questo mestiere)* "Lo capisci cosa vuol dire? L'idrofono sente. Il registratore parla. Se li giro... posso mandare una voce GIÙ. Una voce vera, registrata, del mondo di sopra, a venticinque metri di profondità."

> Claudia: "E a cosa serve mandare una voce giù?"

> Gaetano: *(e la guarda, e lei capisce prima che lui finisca)* "A dare a uno che è rimasto laggiù qualcosa a cui tornare. Il Coro tiene le voci perché nessuno le ha mai chiamate indietro, Claudia. NESSUNO. Duemila anni e nessuno che sia sceso con un'àncora."

Serve ancora una cosa. Serve qualcosa di GENTILE da mandare giù, perché una voce di guardia non riporta indietro nessuno.

**(Manca l'ultimo pezzo. Se avete la ninnananna, combinatela con questo.)**`,
  },
  { in: ['ancora_di_voce', 'ninnananna'], out: 'ancora_di_voce', consuma: ['ninnananna'], flag: 'r_ancora_completa',
    titolo: 'L\'Àncora, completa',
    text: `La ninnananna incisa sul nastro, sopra la voce del '65, nei silenzi tra una parola e l'altra. Claudia canta nel microfono a clip con la voce che le trema e non si ferma, e Gaetano tiene il tasto premuto e non dice niente, e alla fine sul nastro c'è questo: una guardia che piange nel 1965 e una donna che canta nel 2026, insieme, sopra la stessa bobina.

> Gaetano: "È pronta."

> Claudia: "Ho cantato da schifo."

> Gaetano: "Hai cantato la seconda strofa. Nessuno l'aveva mai cantata."

**(L'ÀNCORA DI VOCE è completa. Riporta indietro chi è stato PRESO. Un uso.)**`,
  },
  { in: ['anello_gaetano', 'anello_claudia'], out: 'le_due_fedi', consuma: true, flag: 'r_fedi',
    titolo: 'Le due fedi',
    text: `Le due fedi infilate sullo stesso filo di nylon, il nodo doppio, e il filo appeso al collo di chi scende.

Non fa niente. Non è un'arma, non cura, non illumina, non taglia. Due anelli di oro giallo su un filo da pesca da venti chili.

> Claudia: "Non serve a niente, vero?"

> Gaetano: "No."

> Claudia: "Va bene." *(gli sistema il nodo dietro il collo, e ci mette più tempo del necessario)* "Portale tu."

> Gaetano: "Perché io?"

> Claudia: "Perché se il Coro prende me, tu hai una cosa che è di tutti e due. E una cosa che è di tutti e due, in fondo al mare, è un indirizzo." *(gli appoggia la mano aperta sul petto, sopra il filo)* "Così sai dove tornare a prendermi. E io so che vieni."

**(Non ha statistiche. È l'oggetto più importante del gioco.)**`,
  },
];

/* ============ MISTERI — il Quaderno (js/misteri.js) ============
   Tre misteri, quattro indizi ciascuno. Ogni indizio è un flag impostato da UNA scena.
   Risolverne uno apre scelte nel finale. Nessuno spoiler negli slot vuoti.       */

const MISTERI = [
  {
    id: 'cisterne',
    titolo: 'Perché sei cisterne',
    domanda: 'I romani ne scavarono sei nel tufo. Oggi se ne visitano due. Chi ha chiuso le altre quattro, e cosa ci teneva dentro?',
    indizi: [
      { flag: 'i_iscrizione', testo: 'L\'iscrizione a Villa Giulia: "SEX — QUINQUE CLAUSAE"' },
      { flag: 'i_seconda', testo: 'La seconda cisterna: l\'eco che risponde PRIMA' },
      { flag: 'i_registro_acqua', testo: 'Il registro dell\'acquedotto: portata per seimila, isola da ottocento' },
      { flag: 'i_eco_misurata', testo: 'La misura di Gaetano: riverbero di 11 secondi in una stanza di 30 metri' },
    ],
    premio: {
      flag: 'sa_sesta_cisterna',
      testo: `La sesta cisterna non è perduta: è SOTTO. Sotto le altre cinque, sotto il livello del mare, e non è una cisterna — è la bocca.

I romani non le hanno costruite per l'acqua: le hanno costruite per SENTIRE, e quando hanno capito cosa sentivano ne hanno chiuse cinque con calce e tufo, una alla volta, e hanno lasciato aperta solo quella che non potevano raggiungere.

Adesso sapete dov'è. E con lo stucco giusto, una bocca si può richiudere.`,
    },
  },
  {
    id: 'cella47',
    titolo: 'Chi c\'era nella cella 47',
    domanda: 'Il carcere è stato chiuso il 2 settembre 1965 "perché inutilmente duro". Novanta uomini portati via in barca. Ma la cella 47 non compare in nessun registro di trasferimento.',
    indizi: [
      { flag: 'i_graffito', testo: 'Il graffito nella cella: 8.041 tacche, e l\'ultima è fresca' },
      { flag: 'i_registro_detenuti', testo: 'Il registro dei detenuti: la 47 è vuota dal 1943, e occupata dal 1943' },
      { flag: 'i_ciro_racconta', testo: 'Il racconto di Ciro: la guardia che piangeva sul molo, e il suo nome' },
      { flag: 'i_osso', testo: 'Il cimitero: una fossa in più di quelle contate, e cosa c\'è dentro' },
    ],
    premio: {
      flag: 'sa_nome_guardia',
      testo: `Nella cella 47 non c'era un detenuto. C'era la GUARDIA.

Si chiamava Nicola Sperduto, aveva quarantatré anni, e il 2 settembre 1965, quando portarono via tutti, lui restò. Non per punizione: per TURNO. Perché qualcuno doveva finire il turno, e lui aveva sentito quello che c'era nel pozzo, e sapeva che se il carcere restava vuoto quella cosa si sarebbe messa a cercare altrove.

Ha fatto la guardia a una prigione vuota fino a morirci. E il Coro ha la sua voce — ma la sua voce, dentro il Coro, continua a fare il TURNO.

Sapete il suo nome. E i nomi, col Coro, valgono più di qualunque arma.`,
    },
  },
  {
    id: 'bambina',
    titolo: 'La bambina che canta',
    domanda: 'Sotto tutte le voci ce n\'è una che tiene il tempo. È piccola, non ha paura di niente, e canta la stessa cosa da ottantadue anni.',
    indizi: [
      { flag: 'i_foto_museo', testo: 'La foto al museo: il molo di Napoli, 24 ottobre 1943' },
      { flag: 'i_giocattolo', testo: 'Il cavallino di celluloide dalla stiva, a quarantacinque metri' },
      { flag: 'i_nome_lista', testo: 'La lista d\'imbarco: l\'ultimo nome, aggiunto a penna' },
      { flag: 'i_ninna_sentita', testo: 'La ninnananna sentita in cisterna: e le parole della prima strofa' },
    ],
    premio: {
      flag: 'sa_ninnananna',
      testo: `Si chiamava Assuntina. Sei anni, imbarcata all'ultimo momento su una lista battuta a macchina, aggiunta a penna in fondo perché la mamma l'aveva convinta a partire.

Non chiama nessuno. Ha paura, e sua madre le aveva detto che se canti forte la paura non ti sente. Canta la prima strofa da ottantadue anni perché la seconda non l'ha mai imparata: non ha fatto in tempo.

È il suo canto che regge tutto il Coro. Non per malizia: perché è l'unica che non ha mai smesso.

Adesso sapete la seconda strofa. Cantatela.`,
    },
  },
];

/* I giorni che valgono un CHECKPOINT (cura+ricarica, vedi engine.js) */
const CHECKPOINT_FLAGS = ['giorno_27_chiuso', 'giorno_28_chiuso', 'giorno_29_chiuso', 'ciro_in_squadra'];

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

Ventidue chilometri di Domiziana fino a **Formia**, che a quest'ora vuol dire venti minuti: la strada di agosto alle sette è una strada di novembre, con i furgoni della frutta e nessun altro.

Il molo Azzurra alle otto è già una battaglia, ma una battaglia sveglia: valigie, gente che urla il numero del biglietto, un tizio che vende ghiaccio da un carrellino, e il traghetto per Ponza e Ventotene attaccato alla banchina che sembra troppo piccolo per tutta quella coda. **Partenza alle otto e mezza.**

> Claudia: *(sul ponte, quando finalmente si molla)* "Quattro giorni."

> Gaetano: "Quattro giorni."

> Claudia: "Senza chiamate. Senza satelliti. Senza NIENTE."

> Gaetano: "Ho promesso."

---

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

> Claudia: *(e non lo dice per fare la spiritosa, lo dice perché lo pensa)* "E poi ci hanno messo un carcere."

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

Restano soli, sulla terrazza, con i borsoni in mezzo alla stanza e quattro giorni davanti.

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
    gold: 2, heal: 2,
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

/* ============ ATTO B — venerdì 28 agosto: LE CISTERNE ============
   Il giorno in cui il gioco smette di essere una vacanza e diventa un lavoro.
   Qui entrano, per la prima volta e tutte insieme, le tre meccaniche nuove:
   l'APNEA (Claudia sotto il pelo dell'acqua), il CRAFTING (l'idrofono), i MISTERI
   (la prima domanda che ha una risposta e la risposta fa paura).
   Bibbia dello stile: drafts/scene-A.js. Regola di ferro: nessuna scelta vuota. */

const SCENE_B = {

  b0: {
    location: 'bnb',
    caption: 'Venerdì 28 agosto, ore 08:20 — la terrazza delle Parracine',
    text: `Il caffè di Ada arriva in una tazza spessa, di quelle che scaldano le mani anche ad agosto. Sul tavolino ci sono un cestino di fette biscottate, un vasetto di marmellata di albicocche con l'etichetta scritta a penna, e un piattino con quattro fichi aperti a croce.

Claudia ha dormito nove ore. Ha la faccia di una che ha dormito nove ore. Guarda il mare oltre i muretti e dice: "Amore. Ieri sono arrivata alla boa."

"Lo so."

"No, ma tu non capisci. **Sono arrivata alla boa.**"

Gaetano annuisce e beve. Nella tasca del costume, sul filo, c'è il telefono con dentro mezzo secondo di audio che a venticinque per cento di velocità dice il nome di sua moglie. Non lo tira fuori. Non lo dice.

Sul foglietto attaccato allo specchio, con il nastro, il programma di oggi: **le cisterne romane, dietro la chiesa**. E sotto, con un'altra penna, aggiunto ieri notte: *"il microfono."*

**(💪 TENUTA piena, mosse ricaricate: si è dormito bene. 🫁 Fiato +2 — il caffè di Ada, i fichi, e nove ore di sonno valgono più di qualunque coraggio.)**`,
    gold: 2,
    fullHeal: true,
    recharge: true,
    stinger: 'heal',
    choices: [
      { text: '☕ Chiedere ad Ada delle cisterne, prima di uscire', once: true, next: 'b0_ada' },
      { text: '📓 Aprire il Quaderno: mettere in fila quello che sapete', next: 'b0_quaderno' },
      { text: '🔧 Lo zaino: c\'è del materiale che a metterlo insieme, forse, serve', next: 'b0_zaino' },
      { text: '🚶 Andare. La chiesa è a cinque minuti', next: 'b1' },
    ],
  },

  b0_ada: {
    location: 'bnb',
    caption: 'Le Parracine, ore 08:40 — la cucina',
    text: `Ada sta sbucciando patate dentro un catino di plastica verde. Non alza la testa.

"Le cisterne. Quelle dietro la chiesa."

"Quelle si visitano," dice. "Ce n'è due aperte, il custode sta lì la mattina. Nu' bello posto, freddo. Ci portano le scuole."

"E le altre?"

Il coltellino si fermava a metà di una patata. Riparte.

"Chi t'ha detto che ce ne stanno altre?"

Gaetano tira fuori il telefono e le mostra la foto della carta dell'acquedotto, quella scattata al museo: sei cerchi nel tufo, quattro barrati con una croce a matita.

Ada guarda la foto tre secondi. Poi si asciuga le mani nel grembiule, cosa che non serviva, perché le patate le stava sbucciando asciutte.

"Mio nonno faceva il muratore," dice. "Nel cinquantasette l'hanno chiamato per murare una cosa dietro l'orto dei Coraggio. L'hanno pagato il doppio della giornata e gli hanno detto di andarci da solo. Lui ci è andato con due nipoti perché non era scemo." Prende un'altra patata. "Il muro l'hanno fatto in tre ore. Poi si sono seduti fuori e mio nonno ha detto una cosa che mia madre me l'ha ripetuta tutta la vita: **'quella non era acqua ferma. Quella era acqua che aspettava.'**"

Silenzio. La radio in cucina fa una canzone di Nino D'Angelo.

"Signora Ada. Perché ce lo racconta?"

"Perché siete gentili e state in camera due," dice. "E perché ieri notte alle quattro ho sentito uno di voi due parlare, e stavate dormendo tutti e due."

**(🫁 Fiato +1. Il Quaderno registra: il muro del 1957, dietro l'orto dei Coraggio. E una frase che vi tornerà in mente sotto tre metri d'acqua.)**`,
    gold: 1,
    sets: { sa_muro_1957: true, ada_racconta: true },
    choices: [
      { text: '😰 "Ada, chi dei due parlava?"', once: true, next: 'b0_ada_chi' },
      { text: '🚶 Ringraziare e uscire. Bastano le informazioni, il resto no', next: 'b1' },
    ],
  },

  b0_ada_chi: {
    location: 'bnb',
    caption: 'Le Parracine, ore 08:47',
    text: `Ada mette la patata nel catino. Si gira. Ha gli occhi di una che ha deciso di rispondere e già se ne pente.

"Nessuno dei due."

Claudia, dalla porta, dove è arrivata due secondi prima senza che nessuno la sentisse: "Come nessuno dei due?"

"Era una voce di donna," dice Ada. "Ma non la tua. E parlava napoletano vecchio, quello di prima, quello che non lo parla più nessuno neanche a Napoli. Diceva sempre la stessa cosa."

"Cosa diceva?"

Ada guarda Claudia. E qui fa la cosa peggiore che potesse fare: **non lo dice a lei. Lo dice a Gaetano.**

"Diceva: *'stateve accort' a chella ca nun sape natà.'*" Poi, a bassa voce, come una traduzione che si vergogna: "State attenti a quella che non sa nuotare."

Claudia impara a nuotare a ventinove anni, in una piscina di Latina, con un istruttore che si chiamava Fabio e che le teneva la mano sotto la pancia. Non lo sa nessuno. Non sta scritto da nessuna parte. Non l'ha mai detto a nessuno su quest'isola.

**(⚠️ 🎵 L'attenzione del Coro sale. Qualcosa laggiù sa una cosa di Claudia che non ha mai raccontato a nessuno — e adesso lo sapete anche voi, e non vi togliete più il pensiero.)**`,
    attenzione: 1,
    sets: { sa_frase_notte: true, claudia_nominata: true },
    choices: [
      { text: '🫂 Prenderle la mano davanti ad Ada. Adesso, senza dire niente', once: true, heal: 5, gold: 1, next: 'b0_mano' },
      { text: '📓 Scrivere la frase sul Quaderno, parola per parola', once: true, sets: { i_frase_scritta: true }, next: 'b0_scrivere' },
      { text: '🚶 Uscire. Camminare. Adesso', next: 'b1' },
    ],
  },

  b0_mano: {
    location: 'bnb',
    caption: 'Le Parracine, ore 08:49 — quattro secondi',
    text: `Gaetano allunga la mano e prende quella di Claudia. Non la stringe: la tiene. Ada guarda il catino delle patate come se fosse interessantissimo.

Claudia ha la mano fredda ad agosto, alle nove del mattino, in cucina.

"Io so nuotare," dice piano.

"Lo so."

"Ho imparato tardi. Ma so nuotare."

"Lo so, amore. Ieri sei arrivata alla boa."

E lei fa quella cosa che fa quando decide di non avere paura: tira su col naso una volta, forte, e alza il mento di due centimetri. Un movimento minuscolo. Gaetano lo conosce da undici anni e ogni volta che lo vede pensa la stessa cosa, cioè che con una così si andrebbe anche in guerra.

"Andiamo a vedere queste cisterne."

**(💪 TENUTA +5, 🫁 Fiato +1. Quattro secondi di mano tenuta in una cucina. Nel resto del gioco, quando starà per andare tutto a puttane, il gioco tornerà a questi quattro secondi.)**`,
    heal: 5,
    gold: 1,
    stinger: 'heal',
    sets: { mano_tenuta: true },
    choices: [
      { text: '🚶 Le cisterne', next: 'b1' },
      { text: '📓 Prima scrivere la frase sul Quaderno', once: true, sets: { i_frase_scritta: true }, next: 'b0_scrivere' },
    ],
  },

  b0_scrivere: {
    location: 'bnb',
    caption: 'Le Parracine, il tavolino della terrazza',
    text: `Gaetano scrive sul retro della ricevuta del traghetto, con la penna del comodino:

> *stateve accort' a chella ca nun sape natà*

Poi, sotto, perché è fatto così, aggiunge le cose che sa:
- la voce è di donna
- napoletano antico, non contemporaneo
- ripetuta più volte, ore 04:00 circa
- **conosce un fatto biografico non pubblico** su C.

Guarda l'ultima riga per un po'. Poi la cerchia. Poi ci mette un punto di domanda accanto, e il punto di domanda è la cosa più onesta che ha scritto da due giorni, perché la domanda vera — *da quanto tempo ci osservano* — non ha il coraggio di scriverla per intero.

**(🫁 Fiato +1. Il Quaderno ha la prima pagina scritta. Da qui in avanti il Quaderno si consulta col pulsante in alto, e da qui in avanti conviene farlo.)**`,
    gold: 1,
    choices: [
      { text: '🚶 Le cisterne, adesso', next: 'b1' },
      { text: '🔧 Lo zaino: mettere insieme il microfono e qualcosa', next: 'b0_zaino' },
    ],
  },

  b0_quaderno: {
    location: 'bnb',
    caption: 'La terrazza, ore 08:35 — la contabilità',
    text: `Gaetano fa quello che sa fare: mette in colonna.

**Fatti.** Una banda verticale, sfocata, in una foto fatta dal traghetto tra Ventotene e Santo Stefano. Dieci cani che si sono fermati insieme alle nove e quaranta di sera. Una signora che pulisce fagiolini e dice *fate i bagni dove c'è la gente*. Un polpo che ha guardato sua moglie negli occhi per undici secondi. Una carta dell'acquedotto romano con sei cisterne, quattro barrate. Un vecchio pescatore che dopo le sei non resta al porto.

**Numeri.** L'acquedotto di Ventotene portava acqua per **seimila persone**. L'isola, sotto Augusto, ne aveva **ottocento**. Gaetano fissa i due numeri e la mano gli si ferma sulla penna, perché è uno che di lavoro fa i conti e questo conto non torna di un fattore sette e mezzo.

**Ipotesi.** Ne scrive tre. Le prime due sono ragionevoli — riserva per la siccità, riserva per la flotta — e le scarta entrambe in due righe con dei calcoli a margine.

La terza non la scrive. La pensa così: *quell'acqua non serviva a bere.*

**(🫁 Fiato +1. Nessun oggetto, nessun flag: solo un uomo che alle otto e mezza del mattino ha capito qualcosa e ha deciso di non dirlo a voce. Il gioco però lo sa, e i conti di Gaetano da qui in poi valgono di più.)**`,
    gold: 1,
    sets: { gaetano_ha_capito: true },
    choices: [
      { text: '☕ Chiedere ad Ada delle cisterne', once: true, next: 'b0_ada' },
      { text: '🚶 Andare a vederle di persona', next: 'b1' },
    ],
  },

  b0_zaino: {
    location: 'bnb',
    caption: 'La terrazza, ore 08:30 — il tavolo diventa un banco da lavoro',
    text: `Gaetano rovescia lo zaino sul tavolino di ferro. Ne esce: la torcia subacquea comprata al porto, un rotolo di nastro isolante, il microfono a clip, un preservativo di Barcellona del 2019 che Claudia porta nel beauty da sei anni per motivi che nessuno dei due ricorda più, il filo di nylon, la lenza, l'amo, il coltellino, il sale grosso preso in cucina.

Claudia guarda la roba e poi guarda lui.

"Amore. Che stai facendo."

"Un idrofono."

"Un cosa."

"Un microfono che va sott'acqua. Il microfono ci sta dentro, il preservativo tiene fuori l'acqua, il nastro sigilla il cavo. Costa quattrocento euro in negozio e funziona esattamente così. Anche quelli veri, giuro. È che sono blu."

Claudia si siede. Prende un fico. Dice: "E quindi domani mattina alle otto e mezza mio marito, in vacanza, mi sta costruendo **un affare per sentire meglio quella cosa**."

"Sì."

"Ok." Mangia il fico. "Ok. Ma poi il preservativo lo butti."

**(🔧 Lo zaino si apre col pulsante 🎒 e c'è il tasto "Combinare due cose". Provate: microfono + preservativo. E poi provate le altre — alcune combinazioni le trovate solo se ci pensate, e ognuna cambia qualcosa di concreto in combattimento o sott'acqua.)**`,
    sets: { crafting_scoperto: true },
    choices: [
      { text: '🔧 Aprire lo zaino e provare a combinare (poi tornare qui)', next: 'b0_zaino' },
      { text: '🚶 Basta ingegneria. Le cisterne', next: 'b1' },
      { text: '📓 Prima il Quaderno: mettere in fila quello che sapete', next: 'b0_quaderno' },
    ],
  },

  /* ---------------- LE CISTERNE VISITABILI ---------------- */

  b1: {
    location: 'cisterna',
    caption: 'Venerdì 28, ore 09:25 — dietro la chiesa di Santa Candida',
    text: `Il paese alle nove e venticinque è un affare di gatti e di scope. Una signora bagna il basilico. Un ragazzo scarica casse d'acqua da un Ape verde e le conta a voce alta.

Dietro la chiesa c'è un cancelletto di ferro verniciato di fresco e un cartello del Comune, plastificato, con una carta e quattro paragrafi di storia. *Cisterne romane — I sec. a.C. — visita guidata su richiesta.*

Il custode si chiama Peppe, ha una camicia bianca stirata, tiene la chiave attaccata alla cintura con una catenella e sta leggendo il Corriere dello Sport su una sedia di plastica.

"Buongiorno. Si può vedere?"

"Certo che si può vedere." Piega il giornale con cura, in quattro. "Sei euro a testa, la visita dura venti minuti, ci sta il gradino all'ingresso che è basso, attenti alla testa quelli alti." Guarda Gaetano. "Lei attenti alla testa."

Scendono. Ventidue gradini di tufo, umidi al quarto, freddi al decimo. A metà scala l'aria cambia di colpo: dodici, tredici gradi, e un odore di pietra bagnata che non è cattivo, è **antico**.

Peppe accende la luce. La stanza si apre e Claudia dice "oh" senza volerlo.

**(🫁 Fiato −0: si scende con le scale, non col fiato. Ma da qui in giù la temperatura è tredici gradi e nessuna delle due maniche lunghe ce l'avete.)**`,
    silenzio: true,
    choices: [
      { text: '👁 Guardare la stanza. Guardarla bene, prima di ascoltare la guida', next: 'b2' },
      { text: '🗣 Chiedere a Peppe delle altre quattro cisterne', once: true, next: 'b1_peppe' },
      { text: '📷 Riprendere tutto con la GoPro sull\'asta: quello che l\'occhio perde', once: true, requires: { item: 'gopro' }, sets: { girato_cisterna: true }, next: 'b1_gopro' },
    ],
  },

  b1_peppe: {
    location: 'cisterna',
    caption: 'La prima cisterna, ore 09:34',
    text: `"Peppe, ma quante sono in tutto?"

"Due."

"No, in tutto in tutto. All'epoca."

Peppe si appoggia con la schiena alla pietra. Ha fatto questa visita, probabilmente, quattromila volte, e nessuno gli ha mai fatto questa domanda, e lo si vede da come cambia postura.

"Sei," dice. "Lo sanno tutti che erano sei. Sta scritto pure a Villa Giulia, su una pietra, se ci andate." Alza due dita. "Queste due si visitano. Una terza sta sotto il campo sportivo e ci hanno colato il cemento negli anni Settanta, e chi se ne frega, era già mezza crollata." Le altre due dita rimangono alzate, e per un attimo non le abbassa. "L'altre tre — quattro — nun se vann' a vede'."

"Non si vanno a vedere perché sono pericolose?"

E Peppe fa una cosa che Gaetano si ricorderà nel dettaglio anche a novembre, in ufficio, davanti a un foglio Excel: **guarda per terra**. Un custode, dentro la sua cisterna, che gli spiega la storia della sua isola, guarda per terra.

"Non sono pericolose," dice. "Sono chiuse."

Poi torna la voce da guida, tutta intera, come se qualcuno avesse premuto un tasto: "Allora. La cisterna in cui ci troviamo ha una capacità di circa settecento metri cubi ed è scavata interamente nel tufo…"

**(🫁 Fiato +1. Il Quaderno registra: SEI, tre non visitabili, e un uomo in camicia stirata che quando dice "sono chiuse" non ti guarda. A Villa Giulia c'è una pietra da leggere.)**`,
    gold: 1,
    sets: { sa_pietra_villa_giulia: true, peppe_guarda_terra: true },
    choices: [
      { text: '👁 Guardare la stanza. Bene', next: 'b2' },
      { text: '🗣 Insistere: "Peppe, chiuse da chi?"', once: true, next: 'b1_insistere' },
    ],
  },

  b1_insistere: {
    location: 'cisterna',
    caption: 'La prima cisterna, ore 09:37',
    text: `"Chiuse da chi, Peppe?"

Il custode smette di parlare a metà di *"metri cubi"*. Nella cisterna, quando uno smette di parlare, il silenzio arriva addosso da tutte le pareti insieme, in ritardo, come un'onda.

"Senti," dice, e passa al tu, che sulle isole è un cambio di marcia. "Io sto qui da diciannove anni. Faccio la visita, prendo i sei euro, spiego il tufo. Mio zio la faceva prima di me. **Nessuno ci ha mai chiesto niente e nessuno se n'è mai andato senza il resto.**"

"Non è una risposta."

"No." Si gratta la nuca. "La risposta è che l'ha chiuse il Comune, nel cinquantasette, con delibera, per motivi di sicurezza. Sta negli atti, li puoi chiedere, te li danno. È tutto in regola, è tutto normale, è tutto scritto." Fa una pausa che dura troppo. "E nel cinquantasette, in questa isola, di gente che sapeva scrivere ce ne stava quattro. E la delibera la firmò un maestro elementare che poi si trasferì a Frosinone e non tornò più. Manco per il funerale della madre."

Riprende il giornale piegato in quattro, se lo mette sotto il braccio come se fosse un fascicolo.

"La visita è finita. Non vi faccio pagare."

**(⚠️ Nessun oggetto, ma una data e un nome di città: 1957, Frosinone. Il Quaderno la registra come conferma del racconto di Ada. 🎵 E in questa stanza, per undici secondi, non ha respirato nessuno dei tre.)**`,
    attenzione: 1,
    sets: { sa_delibera_1957: true },
    choices: [
      { text: '👁 Non uscire. Guardare la stanza mentre Peppe sale', next: 'b2' },
      { text: '🚶 Uscire con lui. Non è il momento', next: 'b4' },
    ],
  },

  b1_gopro: {
    location: 'cisterna',
    caption: 'La prima cisterna — quattro minuti di girato',
    text: `Claudia monta la GoPro sull'asta e fa il giro della stanza tenendola alta, con quel movimento lento e continuo che ha imparato guardando i video degli altri e che le viene meglio che agli altri.

Il girato lo guardano fuori, sul telefono, seduti sul muretto, con il sole che picchia.

Al minuto due e undici, in un angolo che dal vivo era buio perché la lampada del Comune non ci arriva, la GoPro ha visto — perché le GoPro vedono meglio di noi, è il loro mestiere — **una scritta**.

Non un graffito antico. Un graffito con la punta di un chiodo, recente, alto un metro e dieci da terra, cioè all'altezza di un bambino o di uno inginocchiato:

> **NON SEI SOLA QUAGGIÙ**

Claudia mette pausa. Torna indietro. Rimette pausa. Ingrandisce con due dita.

"Gaetano. È in italiano."

"Sì."

"Se una cosa antica ti parla, ti parla in latino. In napoletano vecchio. Che ne so." La voce le sale di un tono. "**Questa sa l'italiano.** Questa ha imparato."

**(📷 L'occhio della GoPro vale più del vostro: il Quaderno registra il graffito recente. E Claudia ha detto la frase più intelligente e più brutta della giornata alle nove e cinquanta del mattino.)**`,
    sets: { sa_graffito_recente: true },
    attenzione: 1,
    choices: [
      { text: '↩️ Tornare giù. Adesso, con la torcia, a vedere quell\'angolo', next: 'b2' },
      { text: '🔧 Prima: se scendiamo, scendiamo attrezzati', next: 'b0_zaino' },
    ],
  },

  b2: {
    location: 'cisterna',
    caption: 'La prima cisterna, ore 09:45 — la stanza',
    text: `È una navata. Non c'è altra parola: una navata scavata nella roccia, trenta metri per otto, con la volta a botte, i segni degli scalpelli ancora tutti lì come i solchi di un campo arato, e i pilastri di tufo lasciati in piedi ogni sei metri perché il soffitto non venisse giù.

Le pareti hanno l'*opus signinum*: quel cocciopesto rosa, impermeabile, che i romani facevano con la calce e i cocci pestati e che dopo duemila anni **tiene ancora**. Con l'unghia non lo scalfisci.

Sul fondo, a due centimetri, c'è dell'acqua che nessuno ha messo lì. Filtra. È lo stillicidio: il tufo suda, e una goccia ogni tanto cade dalla volta e fa quel *plic* che nelle grotte è la cosa più normale del mondo.

Solo che Gaetano, che è qui da quattro minuti, ha già cominciato a contare.

E le gocce cadono a intervalli regolari. **Non regolari-di-natura**: regolari **precisi**. Ogni due secondi e mezzo, tutte, da punti diversi della volta, come se qualcuno tenesse il tempo.

**(👁 Il Quaderno registra la stanza: 30 × 8 metri, volta a botte, cocciopesto integro, stillicidio a intervalli di 2,5 secondi. Il terzo dato, tra sei ore, sarà quello che vi salva.)**`,
    sets: { visto_stanza: true },
    choices: [
      { text: '🧮 Gaetano: misurare l\'eco. Un battito di mani e un cronometro', next: 'b2_misura' },
      { text: '🔦 Andare in quell\'angolo con la torcia, dove la GoPro ha visto la scritta', requires: { flag: 'sa_graffito_recente' }, once: true, next: 'b2_angolo' },
      { text: '🎧 Claudia: stare zitta e ascoltare. Solo ascoltare', next: 'b3' },
      { text: '🚶 Basta. Si sale', next: 'b4' },
    ],
  },

  b2_misura: {
    location: 'cisterna',
    caption: 'La prima cisterna — un uomo, due mani e un cronometro',
    text: `"Peppe, posso battere le mani?"

"Fa' comm' vuo'."

Gaetano si mette in mezzo alla navata, lontano dai pilastri. Apre il cronometro del telefono. Batte le mani una volta, forte.

Il suono va, torna, va, torna, si impasta, si assottiglia, diventa un ronzio, diventa niente. Lui ferma il cronometro quando non sente più.

Guarda il numero. Lo guarda per tre secondi. Poi lo rifà, perché uno come lui non si fida della prima misura.

Il tempo di riverbero, in una stanza di trenta metri con le pareti di cocciopesto, dovrebbe stare intorno ai **tre secondi**. Quattro, va bene. Cinque, è tanto: sei in una cattedrale.

Il cronometro dice **undici secondi e sei decimi**. Due volte su due.

Undici secondi e sei decimi vogliono dire che questa stanza è enorme. Non trenta metri: molto, molto più grande. Il che è impossibile, perché la stanza è **qui**, la vede, la può camminare, sono trenta metri.

A meno che il suono non stia rimbalzando anche **da qualche altra parte**. Da qualche parte che comunica con questa, che è grande, e che non ha una porta.

**(🧮 Serve un conto vero, e Gaetano lo sa fare a mente. Se lo fa bene, il Quaderno registra la misura dell'eco: è il quarto indizio del mistero delle sei cisterne.)**`,
    minigame: {
      type: 'calcolo',
      hero: 'gaetano',
      success: 'b2_misura_ok',
      fail: 'b2_misura_no',
      config: {
        titolo: '🧮 Il volume che non c\'è',
        secondi: 22,
        domande: [
          { q: 'La cisterna misura 30 metri per 8, e l\'altezza sotto la volta è 5. Quanti metri cubi fa questa stanza?',
            r: [{ t: '1.200 m³', ok: true }, { t: '240 m³' }, { t: '43 m³' }, { t: '12.000 m³' }] },
          { q: 'Il riverbero cresce col volume. Tre secondi in questa stanza, undici e sei fuori: il volume che risuona è circa quattro volte. Quanti metri cubi, in tutto?',
            r: [{ t: '4.800 m³', ok: true }, { t: '3.600 m³' }, { t: '1.204 m³' }, { t: '48.000 m³' }] },
          { q: 'Togli questa stanza dal totale: quanto spazio c\'è dall\'altra parte di questi muri?',
            r: [{ t: '3.600 m³ — tre stanze come questa', ok: true }, { t: 'Niente: il conto torna così' }, { t: '600 m³ — un ripostiglio' }] },
          { q: 'L\'acquedotto portava acqua per seimila persone. L\'isola, sotto Augusto, ne aveva ottocento. Di quante volte è sovradimensionato?',
            r: [{ t: 'Sette volte e mezzo', ok: true }, { t: 'Del doppio' }, { t: 'Di poco: le scorte per la siccità' }] },
        ],
      },
      tag: 'Gaetano fa un conto vero: due moltiplicazioni e una stima.',
    },
    choices: [],
  },

  b2_misura_ok: {
    location: 'cisterna',
    caption: 'La prima cisterna, ore 09:58 — quattromilaottocento',
    text: `**Quattromilaottocento metri cubi.**

Gaetano scrive il numero sul retro della ricevuta, sotto la frase in napoletano. Poi ci mette accanto un altro numero, quello che si ricordava dal museo: la portata dell'acquedotto, acqua per seimila persone su un'isola da ottocento.

E i due numeri, finalmente, si guardano in faccia e si mettono d'accordo.

Non era troppa acqua per la gente. **Era la giusta acqua per lo spazio.** Qualcuno, duemila anni fa, ha scavato in questo scoglio un volume d'acqua sei volte più grande di quello che serviva a bere, l'ha diviso in sei stanze, e di quelle sei stanze **ne ha lasciate aperte due**.

Claudia gli guarda il foglio da sopra la spalla. Legge. Non è brava con i numeri e non le serve esserlo.

"Amore. In quattromilaottocento metri cubi d'acqua, quanta gente ci sta?"

Gaetano non risponde, e non risponde per la ragione più semplice del mondo, che è che la risposta la sanno tutti e due.

**(✅ Il Quaderno registra la misura dell'eco: riverbero di 11,6 secondi in una stanza di 30 metri. 🫁 Fiato +1: aver capito una cosa fa respirare meglio, per circa quattro minuti.)**`,
    gold: 1,
    sets: { i_eco_misurata: true, sa_volume: true },
    stinger: 'sigillo',
    choices: [
      { text: '🎧 Claudia: e adesso stiamo zitti e ascoltiamo', next: 'b3' },
      { text: '🔦 Quell\'angolo con la scritta', requires: { flag: 'sa_graffito_recente' }, once: true, next: 'b2_angolo' },
      { text: '🚶 Fuori. Serve il sole', next: 'b4' },
    ],
  },

  b2_misura_no: {
    location: 'cisterna',
    caption: 'La prima cisterna, ore 09:58 — il conto non torna',
    text: `Gaetano rifà il conto tre volte e tre volte gli viene un numero diverso, e la terza volta si accorge che gli trema la mano che tiene la penna.

Non è la matematica. La matematica la sa. È che qui sotto ci sono tredici gradi, l'aria sa di pietra bagnata, le gocce cadono a intervalli di due secondi e mezzo con la precisione di un metronomo, e sua moglie è in piedi a quattro metri da lui con le braccia incrociate sul petto perché ha freddo, e da qualche parte, dentro il muro, undici secondi e sei decimi di suono stanno ancora rimbalzando dentro una stanza che lui non ha visto.

Chiude il telefono. Si mette il foglio in tasca.

"Il conto lo faccio stasera con calma."

"Il conto lo fai stasera con calma," ripete Claudia. E lo prende sotto braccio, e non aggiunge niente, e questa è la cosa più gentile che gli capita oggi.

**(❌ La misura dell'eco non è entrata nel Quaderno: il mistero delle sei cisterne resta incompleto. Si può rifare, ma non qui e non ora — servirà un altro posto e un altro momento.)**`,
    choices: [
      { text: '🎧 Allora Claudia. Zitti e ascoltare', next: 'b3' },
      { text: '🚶 Fuori. Serve il sole', next: 'b4' },
    ],
  },

  b2_angolo: {
    location: 'cisterna',
    caption: 'La prima cisterna — l\'angolo di nord-est',
    text: `L'angolo dove la lampada del Comune non arriva è a tre metri dall'ultimo pilastro. Ci vanno con la torcia subacquea, che è sovradimensionata di brutto per il compito e ha esattamente il pregio di essere sovradimensionata.

La scritta c'è. È come nel girato: alta un metro e dieci, incisa con qualcosa di appuntito, il tufo scavato di un millimetro e mezzo.

> **NON SEI SOLA QUAGGIÙ**

Sotto, che nel girato non si vedeva perché il taglio dell'inquadratura passava lì, c'è **un'altra riga**, più piccola, incisa da una mano più stanca:

> **NEANCHE IO**

Claudia si inginocchia davanti alla parete e mette la torcia di lato, radente, come fanno gli archeologi, e allora si vedono le altre. Sotto la vernice del tempo, nella stessa mano o in mani diverse, incise una sopra l'altra per un metro quadro di parete:

*NON SEI SOLA · NON SEI SOLA QUAGGIÙ · NON SEI SOLO · NEANCHE IO · NEANCHE IO · SIAMO TANTI · NON SEI SOLA*

Non è una minaccia. Non è una maledizione. È **una cosa che si dice per farsi coraggio**, ripetuta da persone diverse in tempi diversi, tutte in fondo alla stessa stanza.

Ed è per questo che è la cosa più brutta che vedono oggi.

**(🔦 Il Quaderno registra il muro delle scritte. Nessun mostro: solo gente che, prima di voi, in fondo a questa stanza, ha avuto bisogno di scrivere sul muro che non era sola. 🎵 L'attenzione sale: le avete lette tutte, e leggere è una forma di rispondere.)**`,
    attenzione: 1,
    sets: { sa_muro_scritte: true },
    choices: [
      { text: '✍️ Incidere una riga anche voi. Con il coltellino', once: true, requires: { item: 'coltello' }, next: 'b2_incidere' },
      { text: '🎧 Salire di due metri e ascoltare in silenzio', next: 'b3' },
      { text: '🚶 Uscire da questa stanza. Adesso', next: 'b4' },
    ],
  },

  b2_incidere: {
    location: 'cisterna',
    caption: 'La prima cisterna — quattro parole nel tufo',
    text: `Claudia prende il coltellino dalle mani di Gaetano. Sceglie un pezzo di parete pulito, all'altezza sbagliata: **più basso**, a settanta centimetri, dove uno inginocchiato ci arriva bene.

Incide piano, con la punta, sputando via la polvere di tufo ogni tre lettere. Ci mette quattro minuti.

> **CI SIAMO STATI. C. E G. — 28.8.26**

Poi ci ripensa e aggiunge una cosa che non c'entra niente, che è ridicola, che Gaetano non capisce e non le chiede di spiegare:

> **E SIAMO TORNATI SU**

"È al futuro," dice lui.

"È un impegno," dice lei, e gli restituisce il coltellino chiuso, e si soffia la polvere di tufo dai polpastrelli. "Adesso è scritto sul muro, quindi si fa."

**(✍️ Sul muro di una cisterna romana c'è la vostra data. 💪 TENUTA +4: una promessa scritta nella pietra tiene su come un tirante. Il gioco se la ricorderà, e alla fine ve la rileggerà.)**`,
    heal: 4,
    sets: { promessa_incisa: true },
    stinger: 'heal',
    choices: [
      { text: '🎧 Ascoltare, adesso', next: 'b3' },
      { text: '🚶 Uscire', next: 'b4' },
    ],
  },

  /* ---------------- LA SECONDA CISTERNA: L'ECO CHE RISPONDE PRIMA ---------------- */

  b3: {
    location: 'cisterna',
    caption: 'Il passaggio verso la seconda cisterna, ore 10:12',
    text: `Tra la prima e la seconda cisterna c'è un cunicolo: dieci metri, un metro e sessanta di altezza, si passa piegati. Peppe li fa passare avanti perché lui questo pezzo lo conosce a memoria e la testa se l'è già battuta nel duemilaquattro.

Nella seconda stanza la lampada del Comune è una sola e sta in mezzo. Le pareti restano al buio. Il pavimento ha tre dita d'acqua e si cammina su una passerella di legno che qualcuno ha messo lì con dei mattoni sotto, e i mattoni si muovono.

Claudia si ferma in mezzo alla passerella. Alza una mano: *state zitti*.

Gaetano si ferma. Peppe si ferma.

E lei fa una cosa che non aveva progettato: dice una parola, a mezza voce, quasi per prova.

"Ciao."

L'eco parte, gira, torna. Normale. Tre secondi, come dovrebbe essere.

Poi Claudia riprende fiato per dire qualcos'altro — e **prima che apra la bocca**, dal fondo della stanza, con la sua voce, con la sua esatta voce, arriva:

*"Ciao."*

**(🎵 Il Coro non ha ripetuto. Ha ANTICIPATO. Il Quaderno vuole questo indizio, ed è il più difficile da mettere per iscritto senza sentirsi scemi.)**`,
    silenzio: true,
    stinger: 'coro',
    sets: { eco_anticipata: true },
    choices: [
      { text: '🎤 Rifarlo. Registrando col telefono, e stavolta con un cronometro', next: 'b3_prova' },
      { text: '🎧 Claudia: rispondere. Dire un\'altra parola e vedere cosa fa', next: 'b3_rispondere' },
      { text: '🏃 Uscire. Subito. Prendere Peppe e uscire', next: 'b3_fuga' },
    ],
  },

  b3_prova: {
    location: 'cisterna',
    caption: 'La seconda cisterna — la prova, tre volte',
    text: `Gaetano fa quello che sa fare anche quando ha paura, e cioè il **protocollo**.

Registratore del telefono acceso. Cronometro visibile nell'inquadratura. Tre prove.

**Prova 1.** Dice "uno". L'eco torna dopo 0,09 secondi. Corretto: la stanza è larga quindici metri, il suono viaggia a 343 metri al secondo, i conti sono i conti.

**Prova 2.** Dice "due". L'eco torna dopo 0,09 secondi. Corretto.

**Prova 3.** Non dice niente. Sta zitto, con la bocca chiusa, e guarda il cronometro.

Al secondo 4,2 di silenzio assoluto, dal fondo della stanza, con la voce di Gaetano, l'eco dice: **"tre"**.

Lui riguarda la registrazione fuori, al sole, sul muretto, quattro volte di fila, con le cuffie, alzando il volume ogni volta. La sua voce che dice "tre" c'è. Il suono ambientale della stanza c'è. La sua bocca, nel video, **è chiusa**, e la si vede benissimo perché ha inquadrato sé stesso per il cronometro.

"Non è un'eco," dice a Claudia. "Un'eco è una riflessione: ci vuole un suono prima. Questa qua non ha bisogno del suono prima."

"E allora cos'è?"

"È una che sa cosa sto per dire."

**(✅ Il Quaderno registra: la seconda cisterna, l'eco che risponde PRIMA. Terzo indizio delle sei cisterne. 🎵 E adesso il Coro sa che voi state MISURANDO, e questa è la cosa che gli interessa di più.)**`,
    attenzione: 1,
    sets: { i_seconda: true },
    choices: [
      { text: '📓 Se il Quaderno ha quattro indizi su quattro, guardarlo adesso', next: 'b3_quaderno' },
      { text: '🎧 Claudia vuole provare a rispondere. Lasciarla fare', next: 'b3_rispondere' },
      { text: '🚶 Fuori. Al sole. Subito', next: 'b4' },
    ],
  },

  b3_quaderno: {
    location: 'paese',
    caption: 'Sul muretto fuori dalla chiesa, ore 10:40',
    text: `Il Quaderno, se le cose sono andate come dovevano, ha adesso quattro righe sulle sei cisterne: l'iscrizione, l'eco che anticipa, il registro dell'acqua, e undici secondi e sei decimi di riverbero in una stanza di trenta metri.

Quattro righe che, messe una sotto l'altra, non sono più quattro curiosità. Sono **una frase**.

Le sei cisterne non erano un acquedotto sovradimensionato. Erano sei stanze piene d'acqua, di cui due sono rimaste vuote e aperte al pubblico a sei euro, e quattro sono state chiuse.

E in quest'isola, dal 2 avanti Cristo al 1965, la gente non ci veniva in vacanza: **ci veniva portata**. Relegati imperiali. Detenuti politici. Novanta uomini in un panopticon. E una nave, il 24 ottobre del 1943, con dei bambini dentro.

Gaetano chiude il Quaderno con il pollice dentro come segnalibro, cosa che non serve, perché la pagina la sa a memoria.

"Claudia. Quest'isola, per duemila anni, ha fatto un lavoro solo."

"Quale."

"**Tenere dentro la gente.**"

**(📓 Apri il Quaderno col pulsante in alto: se tutti e quattro gli indizi ci sono, il mistero delle SEI CISTERNE si chiude adesso e ti dà un vantaggio concreto in ogni combattimento da qui alla fine. Se ne manca uno, il Quaderno ti dice quale, con un punto di domanda.)**`,
    gold: 1,
    choices: [
      { text: '🗿 Villa Giulia. Se c\'è una pietra da leggere, andiamo a leggerla', next: 'b6' },
      { text: '🧱 Il muro del 1957, dietro l\'orto dei Coraggio', requires: { flag: 'sa_muro_1957' }, next: 'b4' },
      { text: '🥤 Prima un\'aranciata in piazza. Serve un\'aranciata in piazza', once: true, heal: 4, gold: 1, next: 'b5' },
    ],
  },

  b3_rispondere: {
    location: 'cisterna',
    caption: 'La seconda cisterna, ore 10:24 — Claudia parla al buio',
    text: `Claudia resta in mezzo alla passerella. Gaetano le mette una mano sulla schiena e lei gli fa segno di no col mignolo, appena, e lui la toglie.

Poi dice, verso il fondo buio della stanza, con la voce ferma di una che ha deciso:

"Chi sei."

L'eco parte, gira, si consuma.

Cinque secondi di niente. Sei. Le gocce cadono ogni due secondi e mezzo, e tra una goccia e l'altra c'è tutto lo spazio del mondo.

Poi, dal fondo, con la voce di Claudia — non una voce simile: **la sua**, con il suo modo di appoggiare le vocali, con il suo accento che è di Formia con dentro un po' di Roma — arriva una risposta che non è la ripetizione della domanda:

*"Una che nun sape natà."*

Claudia non urla. Claudia scende dalla passerella nell'acqua alta tre dita con le scarpe, e attraversa la stanza verso il buio, e Gaetano la deve prendere per un braccio e tirarla indietro di peso, e lei si divincola e dice una cosa sola, ripetuta tre volte, sempre più forte:

"**Ti insegno io. Ti insegno io. TI INSEGNO IO.**"

**(⚠️ 🎵 Il Coro ha parlato con la sua voce e le ha rubato la cosa più privata che ha. E Claudia, invece di scappare, si è offerta di insegnarle a nuotare. Il gioco lo registra: da qui in avanti, laggiù, c'è qualcosa che si aspetta una lezione.)**`,
    attenzione: 2,
    damage: 3,
    sets: { claudia_ha_promesso: true, i_ninna_sentita_possibile: true },
    stinger: 'coro',
    choices: [
      { text: '🏃 Portarla fuori di peso. Non c\'è niente da discutere', next: 'b3_fuga' },
      { text: '🎤 Registrare. Se ha parlato una volta parla due', next: 'b3_prova' },
    ],
  },

  b3_fuga: {
    location: 'cisterna',
    caption: 'I ventidue gradini, in salita, di corsa',
    text: `Escono male. Peppe per primo, con la catenella della chiave che gli batte sul fianco a ogni gradino; poi Claudia, che si volta due volte; poi Gaetano, che chiude e non si volta per niente, per una superstizione che si è appena inventato.

Fuori sono le dieci e mezza di un venerdì d'agosto e ci sono trentun gradi. Il salto di diciotto gradi in ventidue gradini è una violenza fisica: si mettono a sudare tutti e tre nello stesso momento, come se qualcuno avesse aperto un rubinetto.

Peppe chiude il cancelletto, gira la chiave, prova la maniglia. Poi la riprova. Poi si accende una sigaretta con due tentativi.

"Voi domani non ci tornate," dice. Non è un consiglio ed è la terza volta in due giorni che qualcuno su quest'isola gli dice una frase così, con l'indicativo.

Poi aggiunge, e questa è nuova: "**E non ci andate a Santo Stefano.**"

"Perché a Santo Stefano?"

"Perché è là che li hanno messi," dice Peppe. Poi si guarda la sigaretta come se non sapesse chi gliel'ha data. "Che ne saccio io. Non ci andate."

**(🫁 Fiato +1 — il sole, l'aria, i trentun gradi. Il Quaderno registra un secondo avvertimento esplicito, e Santo Stefano che entra nella storia con la frase «è là che li hanno messi».)**`,
    gold: 1,
    sets: { avviso_peppe: true, sa_santo_stefano: true },
    choices: [
      { text: '🥤 Un\'aranciata in piazza. E parlare di quello che è appena successo', next: 'b5' },
      { text: '🧱 Il muro del 1957, dietro l\'orto dei Coraggio', requires: { flag: 'sa_muro_1957' }, next: 'b4' },
      { text: '🗿 Villa Giulia, la pietra con l\'iscrizione', next: 'b6' },
    ],
  },

  /* ---------------- IL MURO DEL 1957 ---------------- */

  b4: {
    location: 'paese',
    caption: 'Venerdì 28, ore 11:15 — dietro l\'orto dei Coraggio',
    text: `L'orto dei Coraggio sta in fondo a una discesa di terra battuta, tra due muretti a secco e una rete arancione da cantiere che sventola da almeno dieci anni. Ci sono quattro file di pomodori, un fico, e un cane di nome Bomber che li guarda arrivare e decide che non è il caso di abbaiare.

Il muro è dietro il fico. Non è un muro romano: è un muro fatto male, da uno che sapeva farlo bene ma andava di fretta. Blocchi di tufo squadrati, malta grigia, e nella malta le impronte di una cazzuola tenuta da una mano destra.

Tre metri per due. Chiude un arco. L'arco si vede: la curva del tufo antico esce dai lati del muro nuovo di dieci centimetri per parte, come una cornice sotto un quadro appeso male.

E sulla malta, in alto a destra, dove i muratori firmano da sempre, c'è un'iscrizione fatta col dito prima che asciugasse:

> **A. C. — 1957 — CHIUSO A REGOLA**

Gaetano ci passa il pollice. Poi si mette a guardarlo con l'aria di uno che sta valutando un preventivo.

"Claudia. Questo muro è spesso venti centimetri."

"E?"

"E in cinque giorni un muro così lo faceva un uomo da solo. Il nonno di Ada l'ha fatto in **tre ore**, con due nipoti." Batte due volte con le nocche. "Non l'hanno murato per tenere fuori noi. L'hanno murato di fretta."

**(👁 Il Quaderno registra il muro del 1957 e la firma nella malta. Da qui si può scendere: ma da qui, se si scende, non c'è nessun Peppe che aspetta con la chiave.)**`,
    sets: { visto_muro: true },
    choices: [
      { text: '🔨 Cercare un punto debole. Un muro fatto in tre ore ce l\'ha', next: 'b4_breccia' },
      { text: '👂 Appoggiare l\'orecchio al muro. Solo ascoltare, prima di rompere niente', next: 'b4_orecchio' },
      { text: '🌾 Chiedere ai Coraggio. È il loro orto, magari sanno', once: true, next: 'b4_coraggio' },
      { text: '🚶 Lasciare stare il muro. Villa Giulia', next: 'b6' },
    ],
  },

  b4_orecchio: {
    location: 'paese',
    caption: 'Dietro il fico, la guancia contro la malta del 1957',
    text: `Gaetano appoggia l'orecchio al muro. La malta è fredda e ruvida e gli lascia il segno sulla guancia.

Per venti secondi non c'è niente. Poi c'è **il rumore dell'acqua che si muove**, il che è già di per sé una notizia, perché dietro un muro murato nel 1957 l'acqua non ha ragione di muoversi: dovrebbe essere ferma, e stagna, e morta.

E l'acqua che si muove fa un rumore molto specifico. Non gocciola. Non scroscio. Fa il rumore di una superficie che si apre e si richiude.

Fa il rumore di **qualcosa che nuota**. Con calma, avanti e indietro, come uno che fa vasche.

Gaetano non si stacca dal muro. Resta lì con la guancia appiccicata e il fiato corto e conta le vasche, perché è più forte di lui: ne conta undici, e la undicesima si interrompe a metà.

E dopo la undicesima, dall'altra parte del muro, a venti centimetri dal suo orecchio, una voce di donna dice, con una gentilezza che è la cosa peggiore di tutte:

*"Bravo. Cunt'. Cunta pure a me."*

**(⚠️ Contare è l'unica cosa che Gaetano sa fare per difendersi, e il Coro gliel'ha appena chiesto per favore. 🎵 L'attenzione sale. 💪 −4: si è staccato dal muro così di scatto che ha sbattuto la testa sul ramo del fico.)**`,
    attenzione: 2,
    damage: 4,
    stinger: 'coro',
    sets: { sa_nuota_dietro: true },
    choices: [
      { text: '🔨 Aprire quel muro. Adesso. Non domani', next: 'b4_breccia' },
      { text: '🎧 Mettere l\'idrofono nell\'acqua dell\'orto e sentire meglio', requires: { item: 'idrofono' }, once: true, next: 'b4_idrofono' },
      { text: '🚶 Andarsene. Villa Giulia, la pietra, il sole', next: 'b6' },
    ],
  },

  b4_coraggio: {
    location: 'paese',
    caption: 'L\'orto, ore 11:24 — la signora Rosa Coraggio',
    text: `La signora Coraggio ha ottantadue anni, un cappello di paglia da uomo e le mani nella terra fino ai polsi. Si chiama Rosa. Il cane si chiama Bomber ed è il quarto Bomber.

"Quel muro sta là da prima di me," dice. "Io mi sono maritata nel sessantuno e quello già c'era."

"Non le hanno mai detto perché?"

"Mio marito diceva che sotto ci sta una cisterna vecchia e che se la lasciavano aperta ci cadeva dentro qualche criaturo." Strappa un'erbaccia. "E secondo me è pure vero, sai? Perché nel cinquantasei ci cadette dentro un criaturo."

Gaetano si siede sui talloni. "Ci cadde dentro un bambino?"

"Il figlio della Nunzia, che teneva sei anni. Ci cadette il tredici di luglio e lo tirarono fuori il quindici." Rosa continua a strappare erbacce, con calma, come si racconta una cosa vecchia. "Stava bene. Non teneva niente, manco un graffio, e stava a galla, dopo due giorni, che nun sapeva natà."

Il fico fa ombra. Bomber si gratta.

"Signora Rosa. Un bambino di sei anni, due giorni in acqua, e stava bene?"

"Eh." Rosa si toglie il cappello e si asciuga la fronte con l'avambraccio. "Stava bene per un poco. Poi cominciò a cantare 'na cosa e non la smetteva più, e la madre se lo portò a Napoli dal professore, e non tornarono."

**(⚠️ Il Quaderno registra: luglio 1956, un bambino di sei anni due giorni in una cisterna murata, tirato fuori intero. E l'anno dopo hanno murato tutto. 🫁 Fiato +1: parlare con una signora di ottantadue anni tra i pomodori fa bene comunque.)**`,
    gold: 1,
    sets: { sa_bambino_1956: true, i_ninna_sentita_possibile: true },
    choices: [
      { text: '🎶 "Signora Rosa. Se la ricorda, la cosa che cantava?"', once: true, next: 'b4_canzone' },
      { text: '🔨 Aprire il muro', next: 'b4_breccia' },
      { text: '🚶 Villa Giulia', next: 'b6' },
    ],
  },

  b4_canzone: {
    location: 'paese',
    caption: 'L\'orto, sotto il fico — sette note',
    text: `Rosa Coraggio si rimette il cappello. Guarda i pomodori. Pensa.

"Era 'na ninnananna," dice. "Ma vecchia. Di quelle che le cantava mia nonna a me e io non le ho cantate a nessuno perché sono brutte."

"Brutte?"

"Le ninnananne vecchie sono brutte, figlio mio. Dicono cose. Adesso si canta *fai la nanna*, prima si cantava *dormi che se non dormi viene una cosa e ti prende*." Fa una smorfia. "Educavano così. Con la paura. Funzionava."

Poi, senza che nessuno glielo chieda, e questo è il momento in cui Claudia si mette la mano sulla bocca, **Rosa la canta.** Sette note, tre parole, la voce rotta di una donna di ottantadue anni tra i pomodori, alle undici e mezza di mattina, col sole:

> *"Nonna nonna, ninna nonna…*
> *chi sta sott' nun torna sola…"*

Poi si ferma. Fa quella faccia di chi si è appena sentito.

"Il resto non me lo ricordo."

E Claudia dice, piano, senza rendersene conto, come si finisce una frase che si sa:

"*…si porta appriess' a chi la chiamma.*"

Silenzio. Rosa la guarda. Bomber alza la testa.

"E tu come la sai?"

"Non lo so," dice Claudia. E non lo sa davvero, e questa è la parte in cui il gioco vi chiede di fidarvi di lei.

**(✅ Il Quaderno registra la ninnananna: prima strofa, due versi, e uno l'ha finito Claudia. Quarto indizio del mistero della bambina che canta. 🎵 Attenzione +1: una canzone cantata è una canzone sentita.)**`,
    sets: { i_ninna_sentita: true, claudia_sa_la_ninna: true },
    attenzione: 1,
    stinger: 'coro',
    choices: [
      { text: '📓 Il Quaderno. Adesso', next: 'b3_quaderno' },
      { text: '🔨 Il muro. Aprirlo', next: 'b4_breccia' },
      { text: '🗿 Villa Giulia, la pietra', next: 'b6' },
    ],
  },

  b4_idrofono: {
    location: 'paese',
    caption: 'L\'orto — l\'idrofono nella vasca dell\'irrigazione',
    text: `La vasca dell'irrigazione dei Coraggio è una tinozza di cemento da mezzo metro cubo che pesca da un pozzetto che pesca, secondo Rosa, "dalla vena". La vena è la falda. La falda comunica con la cisterna. La cisterna è dietro il muro.

Gaetano cala l'idrofono nella tinozza — microfono a clip, dentro un preservativo di Barcellona, sigillato col nastro isolante, cavo delle cuffie fuori — e mette le cuffie a Claudia perché il suo orecchio è migliore.

Sotto mezzo metro cubo d'acqua di irrigazione, in un orto, ci sono queste cose, in quest'ordine:

Il ronzio della pompa. Il gorgoglio del galleggiante. E, sotto tutto, molto più in basso di quanto abbia senso, **un rumore di gente**.

Non voci. Non ancora. Il rumore che fa una **stanza piena di persone** sentito da fuori: quel brusio compatto, senza parole, in cui a volte emerge una consonante.

Claudia ascolta con gli occhi chiusi. Ha le cuffie di Gaetano, quelle economiche col filo, ed è in piedi in un orto con una tinozza davanti.

"Quanti sono," chiede lui.

Lei tiene gli occhi chiusi ancora un po'. Poi li apre.

"Tanti, amore. Tanti come uno stadio."

**(🎧 L'IDROFONO FUNZIONA — e questo è il momento in cui una cosa costruita col nastro isolante diventa lo strumento più importante che avete. Il Quaderno registra il brusio. Combinatelo con un cavo più lungo e sentirete più giù.)**`,
    sets: { sa_brusio: true, idrofono_provato: true },
    attenzione: 1,
    gold: 1,
    choices: [
      { text: '🔨 Il muro, adesso', next: 'b4_breccia' },
      { text: '🗿 Villa Giulia. Prima capire, poi scendere', next: 'b6' },
    ],
  },

  b4_breccia: {
    location: 'cisterna_sigillata',
    metri: 2,
    caption: 'L\'orto, ore 11:50 — venti centimetri di malta del 1957',
    text: `Il punto debole di un muro fatto in tre ore sta in alto, all'attacco con l'arco antico, dove la malta è stata schiacciata di fretta contro una curva e ha lasciato un vuoto. Gaetano lo trova battendo con le nocche: là dentro suona vuoto.

Chiede a Rosa Coraggio un attrezzo. Rosa gli porta un piccone da mezzo chilo, di quelli da orto, con il manico di legno consumato a specchio.

"Non me lo rompere," dice. "E non ci cadere."

Il primo colpo fa uscire polvere. Il quarto fa saltare un blocco intero. Al sesto c'è **un buco nero di trenta centimetri** e da quel buco esce aria fredda, tanta, con dentro un odore di pietra bagnata e — Claudia lo dice per prima, e ha ragione — **di sale**.

Sale. A quaranta metri sopra il livello del mare, dietro un muro, in una cisterna d'acqua piovana.

Gaetano infila la torcia subacquea nel buco e guarda.

Sotto ci sono **quattro metri di vuoto** e poi dell'acqua nera, ferma, che riflette la torcia come uno specchio da bagno. La stanza è più grande delle due di Peppe messe insieme. Sui bordi si vedono i gradini di una scala che scende nell'acqua e continua sotto.

E in mezzo all'acqua, a galla, c'è una cosa gialla di plastica che a duemila anni non risale: **un secchiello da spiaggia.**

**(🔨 IL MURO È APERTO e non si richiude più. Da qui si scende, e da qui in giù comincia l'altra metà del gioco. Oggetto: la CORDA dell'orto dei Coraggio — venti metri di canapa, che diventa il cavo lungo che vi serviva.)**`,
    item: 'cavo_lungo',
    sets: { muro_aperto: true, sa_secchiello: true },
    attenzione: 1,
    stinger: 'sigillo',
    silenzio: true,
    choices: [
      { text: '🪜 Scendere. Adesso, con la torcia e la corda', next: 'b8' },
      { text: '🔧 Non così. Prima attrezzarsi come si deve', next: 'b4_prepararsi' },
      { text: '🗿 Prima Villa Giulia: capire cosa c\'è sotto, prima di metterci la faccia', next: 'b6' },
    ],
  },

  b4_prepararsi: {
    location: 'paese',
    caption: 'L\'orto, ore 12:05 — il piano',
    text: `Gaetano si siede sul muretto a secco con il piccone tra le ginocchia e fa la lista, ad alta voce, contando sulle dita, e questo è il momento in cui Claudia capisce che non ci pensa nemmeno a lasciarla scendere da sola.

"Uno: la torcia sul casco, non in mano, perché in mano non ci sta la corda. Due: l'idrofono col cavo lungo, così sentiamo prima di arrivare. Tre: le maschere buone, quelle vere, non quelle da due euro. Quattro: qualcosa che tagli, perché sotto c'è **roba** e la roba si impiglia."

"Cinque," dice Claudia.

"Cinque?"

"Cinque: ci teniamo per mano." Lo dice senza ironia. "Non è un punto simpatico, Gaetano, è un punto della lista. Scritto. Se scendo là sotto e a un certo punto non ti sento, io risalgo e non torno più giù, e allora è meglio che me lo dici adesso."

Gaetano prende il foglio della ricevuta del traghetto, quello con la frase in napoletano e i quattromilaottocento metri cubi, e ci scrive:

> **5. per mano.**

**(🔧 Il gioco vi sta dicendo una cosa esplicita: aprite lo zaino e COMBINATE. Torcia + nastro = torcia da casco. Idrofono + corda = idrofono profondo, che in combattimento vi dà mezzo secondo di anticipo. E le due fedi, legate insieme, valgono +2 PV a testa a ogni scontro.)**`,
    gold: 1,
    heal: 3,
    sets: { piano_fatto: true, per_mano: true },
    choices: [
      { text: '🔧 Aprire lo zaino e combinare le cose', next: 'b4_prepararsi' },
      { text: '🪜 Pronti. Si scende', next: 'b8' },
      { text: '🗿 Prima Villa Giulia', next: 'b6' },
    ],
  },

  /* ---------------- PIAZZA E VILLA GIULIA ---------------- */

  b5: {
    location: 'porto',
    caption: 'Venerdì 28, ore 11:00 — Piazza Castello, i tavolini all\'ombra',
    text: `In piazza Castello, a mezzogiorno meno un quarto, ci sono: quattro tavolini di ferro, due vecchi che giocano a carte con un mazzo napoletano tenuto insieme da un elastico, tre bambini con la maglietta bagnata, e un'aranciata amara ghiacciata che costa tre euro e mezzo e vale ogni centesimo.

Claudia beve mezza aranciata in un sorso e appoggia il bicchiere. Ha ancora la pelle d'oca sulle braccia dalla cisterna, con trentun gradi.

"Amore," dice. "Io devo dirti una cosa e tu non mi devi guardare mentre te la dico."

Gaetano guarda i due vecchi che giocano a carte.

"Quando quella cosa ha parlato con la mia voce," dice Claudia, "io ho avuto paura per **mezzo secondo**. Poi ho avuto una cosa che non è paura e non so come si chiama, e che era: *finalmente*." Gira il bicchiere sul tavolino. "Perché io ho paura dell'acqua da quando ho sei anni, e nessuno mi ha mai creduto che ci fosse un motivo, e me lo dicevano tutti che era una fissazione mia. E adesso c'è una cosa dentro l'acqua che parla con la mia voce e sa che ho imparato a nuotare a ventinove anni." Alza gli occhi. "Gaetano, io ho ragione **da ventotto anni**."

I vecchi calano una carta. Uno dice "e mo' vedi".

"Sì," dice Gaetano. "Hai ragione da ventotto anni."

**(💪 TENUTA +6, 🫁 Fiato +2. Non è un potenziamento simbolico: aver ragione, dopo ventotto anni, in una piazza, con un'aranciata, è la cosa che tiene in piedi Claudia da qui alla fine del gioco.)**`,
    heal: 6,
    gold: 2,
    stinger: 'heal',
    sets: { claudia_creduta: true },
    choices: [
      { text: '🫂 "E scusa se ci ho messo undici anni a crederci."', once: true, heal: 3, next: 'b5_scusa' },
      { text: '🗿 Villa Giulia. C\'è una pietra da leggere', next: 'b6' },
      { text: '🧱 Il muro dietro l\'orto dei Coraggio', requires: { flag: 'sa_muro_1957' }, next: 'b4' },
    ],
  },

  b5_scusa: {
    location: 'porto',
    caption: 'Piazza Castello — undici anni in una frase',
    text: `"E scusa," dice Gaetano, "se ci ho messo undici anni a crederci."

Claudia non fa la scena. Fa una cosa peggiore: **ci pensa**. Per tre secondi pensa a tutte le volte, nelle piscine, sulle barche, a Ponza, sul pedalò a Sperlonga, in cui lei aveva detto *non mi va* e lui aveva risposto *ma dai*.

Poi dice: "Ci hai messo undici anni ma ci sei arrivato prima di mia madre, quindi vinci tu."

E ride. Ride male, con l'aranciata in bocca, e le va per il naso, e tossisce, e i due vecchi si girano, e uno dei due dice "signora, piano!", e Claudia con gli occhi che lacrimano e la voce da tosse dice "scusate", e Gaetano le batte la mano sulla schiena e ride anche lui.

Trentun gradi. Piazza Castello. Un'aranciata andata per il naso.

Il gioco vi lascia guardare questa scena per tutto il tempo che volete, perché è l'ultima volta che ridete così, e a differenza vostra il gioco lo sa già.

**(💪 TENUTA piena, 🫁 Fiato +2. Segnatevi questo tavolino: quando il 30 agosto non finirà più, sarà questo il momento a cui vorrete tornare, e il gioco vi ci riporterà davvero.)**`,
    fullHeal: true,
    gold: 2,
    stinger: 'heal',
    sets: { risata_piazza: true },
    choices: [
      { text: '🗿 Villa Giulia', next: 'b6' },
      { text: '🧱 Il muro dei Coraggio', requires: { flag: 'sa_muro_1957' }, next: 'b4' },
    ],
  },

  b6: {
    location: 'rovine',
    caption: 'Venerdì 28, ore 12:30 — Punta Eolo, Villa Giulia',
    text: `Punta Eolo è la punta nord dell'isola e non c'è ombra. Zero. Il sentiero è bianco, la terra è bianca, il cielo è bianco di caldo, e dopo duecento metri hai la maglietta incollata.

Qui, nel **2 avanti Cristo**, Augusto ha relegato **sua figlia**. Giulia maggiore, l'unica figlia che aveva, con l'accusa di adulterio — che era il capo d'accusa quando il capo d'accusa vero era politico. Aveva trentasette anni e cinque figli, e non li ha più visti.

> Claudia: *(che sta guardando il mare da dove non c'è più un muro)* "Ripetimi come si chiamava l'isola."

> Gaetano: "Pandataria."

> Claudia: "E vuol dire quella che dà tutto."

> Gaetano: "Dispensatrice di ogni bene."

> Claudia: "Bene." *(pausa lunga)* "Quindi hanno preso il posto che si chiama *quella che dà tutto* e ci hanno mandato una donna a non avere più niente. E il nome se lo sono tenuto."

> Gaetano: "Per cinque anni. Poi l'hanno spostata a Reggio e l'hanno lasciata morire di fame nel quattordici dopo Cristo."

> Claudia: "E sua madre?"

> Gaetano: *(e questa è la cosa che gli piace di più di tutta la storia, e si sente)* "Sua madre è **venuta qui con lei**. Scribonia. Nessuno l'aveva condannata: ha chiesto di seguirla e le hanno detto sì." *(pausa)* "Cinque anni su questo scoglio, per scelta propria, per non lasciarla sola."

Claudia non dice niente per un po'. Poi si sposta di due metri e fa la prima foto della giornata: non le rovine, non il panorama. La terra.

Della villa restano: una piattaforma di opus reticolatum sul precipizio, i resti di un ninfeo, il taglio delle vasche nella roccia, e un panorama che ti spacca in due. Trecento metri per cento, tutta girata a est — perché il sole di qui, quello che conta, è quello del mattino.

E poi c'è la peschiera, che è la cosa che Gaetano ha letto tre volte prima di crederci. Non una vasca: un impianto. Scavata nella roccia, collegata al mare da canali, con un bacino grande diviso in due da un muretto che una volta aveva le **paratoie** — si apriva e si chiudeva — e dentro gli scomparti per tenere i pesci divisi per taglia. E ai lati due vasche **coperte**, dentro due stanze a volta, che guardano il bacino grande da dietro.

> Claudia: "Coperte perché?"

> Gaetano: "Perché al buio i pesci stanno più tranquilli e crescono meglio." *(pausa)* "E c'è un'altra cosa. Nella cisterna della villa avevano messo un dispositivo per **muovere** l'acqua."

> Claudia: "Muoverla."

> Gaetano: "Per ossigenarla. Acqua ferma va a male: si scalda, si chiude, muore. Loro l'hanno capito duemila anni prima di noi e hanno costruito un aggeggio perché in quella cisterna l'acqua non stesse mai ferma."

Claudia si guarda intorno: la piattaforma, le vasche tagliate nel tufo, la peschiera con i canali murati dal tempo.

> Claudia: "E adesso?"

> Gaetano: "Adesso è tutta ferma. Da qui si vede Santo Stefano intero, con il carcere in cima come un anello di pietra.

È rimasta su questo scoglio **cinque anni**, con la madre che l'aveva seguita per non lasciarla sola, senza vino, senza visite e senza uno specchio, sorvegliata da uomini che suo padre pagava. Poi l'hanno spostata in Calabria, dove è morta di fame in una stanza, e Augusto ha messo per iscritto una cosa sola: che le sue ossa **non entrassero nel Mausoleo di famiglia**.

E trent'anni dopo, su questo stesso scoglio, hanno portato **Agrippina maggiore**, che era sua figlia. E Agrippina qui è morta di fame per davvero, nel trentatré, dopo che le avevano rotto un occhio a bastonate. E dopo di lei Ottavia, la moglie di Nerone, ventidue anni, uccisa in una stanza calda.

Quattro donne della stessa famiglia. Lo stesso scoglio. Duecento metri di costa.

Claudia legge il pannello del Parco fino in fondo, il che nessuno fa mai. Poi dice:

"Gaetano. Suo padre. È stato **suo padre**."

E poi indica Santo Stefano, che sta là a due chilometri con l'aria di una cosa che aspetta, e aggiunge la frase che chiude il pomeriggio:

"E fra duemila anni, in quel posto là, ci hanno messo altra gente. Sempre gente che qualcuno voleva togliere di mezzo senza ammazzarla."


**(👁 Il posto dove è cominciato tutto: la prima persona portata su quest'isola contro la sua volontà. Il Quaderno tiene il conto: da lei, nel 2 a.C., a novanta uomini nel 1965, sono duemila anni esatti di gente portata qui e non più uscita.)**`,
    sets: { visto_villa_giulia: true },
    choices: [
      { text: '🗿 Cercare la pietra con l\'iscrizione delle cisterne', next: 'b6_iscrizione' },
      { text: '🏛 Scendere al ninfeo, dove c\'era l\'acqua', next: 'b6_ninfeo' },
      { text: '🚶 Basta sole. Tornare al muro dei Coraggio', requires: { flag: 'muro_aperto' }, next: 'b8' },
      { text: '🚶 Tornare in paese', next: 'b5' },
    ],
  },

  b6_iscrizione: {
    location: 'rovine',
    caption: 'Villa Giulia — la pietra, in mezzo alle sterpaglie',
    text: `La pietra non è esposta. Non c'è un cartello. Sta appoggiata a un muretto a secco a venti metri dal sentiero, mezza dentro le sterpaglie, con una lattina di Peroni schiacciata accanto: un blocco di calcare di ottanta centimetri, con la faccia lisciata e le lettere incise a scalpello, alte cinque centimetri, romane, tagliate a V.

Gaetano si inginocchia e ci passa la mano per togliere la terra. Legge a voce alta, lettera per lettera, perché il latino lo mastica appena:

> **CASTELLVM AQVAE**
> **CVBICVLA · SEX**
> **QVINQVE · CLAVSAE**
> **NE · APERIAT**

"Castello dell'acqua," traduce, lento. "Stanze: sei. **Cinque chiuse.** Non si apra."

Claudia si accovaccia accanto a lui. "Cinque? Peppe ha detto quattro."

"Peppe ha detto che due si visitano e le altre no." Gaetano tocca la V di *QVINQVE* con l'indice. "Ma questa pietra è di duemila anni fa, Claudia. Duemila anni fa, di sei stanze, **cinque erano già chiuse**. E c'è scritto sopra un ordine: *ne aperiat*. Non si apra."

Si guardano.

"Quindi," dice Claudia, "quelle chiuse nel cinquantasette…"

"…erano state **riaperte** da qualcuno, in qualche momento fra il 2 avanti Cristo e il millenovecentocinquantasette. E il nonno di Ada le ha solo richiuse."

Il vento di Punta Eolo fa il rumore che fa sempre. La lattina di Peroni rotola di dieci centimetri.

**(✅ Il Quaderno registra l'iscrizione: SEX — QUINQUE CLAUSAE — NE APERIAT. Ed è il primo indizio delle sei cisterne, quello che dà senso agli altri tre. 🫁 Fiato +1: leggere una cosa scritta duemila anni fa e capirla al volo è una piccola gioia anche quando è terribile.)**`,
    gold: 1,
    sets: { i_iscrizione: true },
    stinger: 'sigillo',
    choices: [
      { text: '📓 Il Quaderno. Vedere se il mistero si chiude', next: 'b3_quaderno' },
      { text: '⛏ Grattare via la terra sotto la pietra: le iscrizioni non stanno mai sole', once: true, next: 'b6_scavo' },
      { text: '🏛 Il ninfeo, dove c\'era l\'acqua della villa', next: 'b6_ninfeo' },
    ],
  },

  b6_scavo: {
    location: 'rovine',
    caption: 'Villa Giulia — venti centimetri di terra e duemila anni',
    text: `Gaetano scava con le mani e col coltellino, piano, come gli hanno insegnato in nessun posto e come si fa per istinto quando si ha paura di rompere qualcosa.

Sotto la pietra dell'iscrizione, a venti centimetri, la terra cambia colore: diventa più scura, più grassa, con dentro dei frammenti di cocciopesto rosa. È un piano di calpestio antico.

E dentro il piano di calpestio ci sono, nell'ordine: due chiodi di ferro ridotti a scaglie, un pezzo di ceramica con un bordo, e **una cosa piatta di metallo, verde di ossido, grande come un'unghia del pollice**.

La strofina sulla maglietta. Non serve. La strofina con la saliva e il pollice, che è quello che si fa davvero, e allora sotto il verde compare l'argento.

È una **medaglietta**. Un disco d'argento con un foro, e sul disco, inciso con una punta sottile, un nome:

> **IVLIA**

Claudia non la tocca. Sta un passo indietro, con le braccia conserte, e dice una cosa molto semplice e molto vera:

"Gaetano. Quella è di una signora che è morta qui e a cui hanno ammazzato il figlio."

"Sì."

"E noi la portiamo via."

"Sì."

**(🎁 Oggetto: la MEDAGLIETTA DI GIULIA. È argento, ha un foro, e voi avete un filo di nylon nello zaino. È anche la chiave di due combinazioni, e una delle due, alla fine di questo gioco, vale dieci punti vita a un boss.)**`,
    item: 'medaglietta_giulia',
    sets: { sa_medaglietta: true },
    attenzione: 1,
    choices: [
      { text: '🔧 Infilarla nel filo di nylon. Adesso, qui, con lei che guarda', once: true, next: 'b6_collana' },
      { text: '🏛 Il ninfeo', next: 'b6_ninfeo' },
      { text: '📓 Il Quaderno', next: 'b3_quaderno' },
    ],
  },

  b6_collana: {
    location: 'rovine',
    caption: 'Villa Giulia — un nodo di nylon a Punta Eolo',
    text: `Claudia prende il filo di nylon, lo taglia coi denti alla lunghezza giusta, ci infila la medaglietta e fa il nodo. Le viene bene: fa le collane da quando aveva undici anni.

Poi, invece di metterla al collo, la tiene in mano, aperta sul palmo, e la guarda.

"Non me la metto," dice.

"Perché no?"

"Perché non è mia." Chiude la mano. "Me la porto in tasca. Se serve, la tiro fuori io e le dico *questa è tua*."

Poi guarda verso Santo Stefano, che da qui si vede tutto, con l'anello di pietra in cima, e dice una cosa che Gaetano non si aspetta e a cui non sa cosa rispondere:

"Sai qual è la cosa che mi fa più paura di tutte? Che laggiù sotto non ci sia un mostro. Che ci sia solo un sacco di gente incazzata."

**(🔧 Combinato: LA COLLANA DI GIULIA. Effetto reale, non simbolico: tiratela fuori davanti a un boss e sono −10 PV e non ruba più vita. E messa insieme alla foto del museo diventa un'altra cosa ancora.)**`,
    sets: { r_collana: true, collana_fatta: true },
    stinger: 'sigillo',
    choices: [
      { text: '🏛 Il ninfeo, dove la villa teneva l\'acqua', next: 'b6_ninfeo' },
      { text: '🧱 Il muro dei Coraggio. Si scende', requires: { flag: 'muro_aperto' }, next: 'b8' },
      { text: '🚶 Tornare in paese: si mangia, e mangiare serve', next: 'b7' },
    ],
  },

  b6_ninfeo: {
    location: 'rovine',
    caption: 'Villa Giulia — il ninfeo, sul filo del precipizio',
    text: `Il ninfeo della villa è una stanza scavata nella roccia sul bordo del salto, aperta sul mare da tre archi che non ci sono più. Duemila anni fa qui c'era acqua che cadeva da una parete, in ombra, con il fresco, e Giulia Minore ci passava le sere che le restavano.

Adesso è un cubo di roccia con l'*opus reticolatum* mangiato dal salino e con quaranta metri di niente sotto. Ci arrivi su un sentiero che negli ultimi tre metri richiede di mettere una mano.

Claudia guarda i tre metri. Guarda i quaranta metri di sotto. Poi mette la mano dove va messa e passa, e non si volta a controllare se Gaetano l'ha vista, che è il modo migliore di farsi vedere.

Dentro il ninfeo ci sono venti gradi invece di trentaquattro, e c'è **un rumore**.

Il canale di adduzione — il taglio nella roccia che portava l'acqua qui dentro — non è asciutto. In fondo, dove sparisce nel tufo, c'è **acqua che scorre**. Adesso. Nel 2026. In un canale romano.

Gaetano infila il braccio nel canale fino alla spalla e tira fuori la mano bagnata. Si lecca il dito, cosa che non si dovrebbe mai fare.

"Salata," dice.

"Salata? Gaetano, siamo a quaranta metri sul mare."

"Lo so."

**(👁 L'acqua di quest'isola non sta dove dovrebbe e non è quella che dovrebbe essere. Oggetto: un TAPPO DI SUGHERO incastrato nel canale da qualcuno che, in qualche momento tra il 2 d.C. e oggi, ha provato a chiudere qualcosa.)**`,
    item: 'tappo_sughero',
    sets: { sa_acqua_salata: true },
    choices: [
      { text: '🎧 Calare l\'idrofono nel canale', requires: { item: 'idrofono' }, once: true, next: 'b6_idro_canale' },
      { text: '🚶 In paese. Si mangia', next: 'b7' },
      { text: '🧱 Al muro. Si scende', requires: { flag: 'muro_aperto' }, next: 'b8' },
    ],
  },

  b6_idro_canale: {
    location: 'rovine',
    caption: 'Il ninfeo — l\'idrofono nel canale di Giulia',
    text: `Gaetano cala l'idrofono nel canale, srotolando il cavo, e ne va giù più di quanto il canale sembri profondo: due metri, tre, quattro. La corda continua ad andare.

Claudia ha le cuffie. È seduta per terra dentro un ninfeo romano, con la schiena all'*opus reticolatum*, e ascolta.

Prima: acqua. Poi: il brusio, quello dell'orto, lo stadio.

E poi, dentro il brusio, **una voce sola che si stacca** — e non è la voce di prima, non è il napoletano vecchio, non è la donna che sa nuotare.

È una voce di donna che parla **una lingua che Claudia non conosce**, con delle vocali strane, chiudendo le parole in modo netto. Non sta chiedendo niente. Sta **elencando**. La stessa cadenza di quando si conta o si fa una lista.

Claudia si toglie una cuffia e la porge a Gaetano. Lui ascolta dieci secondi e diventa bianco, perché lui il latino lo mastica appena, ma appena basta.

"Sta dicendo dei nomi," dice. "**Sono nomi.**"

E in mezzo ai nomi, a un certo punto, dice: *Iulia*. E dopo *Iulia* fa una pausa, e la pausa è quella che si fa quando si arriva al proprio nome in una lista e non c'è nessuno che risponde.

**(⚠️ 🎵 Attenzione +2: avete ascoltato la lista fino al nome. Il Quaderno registra: laggiù qualcuno FA L'APPELLO, in latino, e lo fa da duemila anni. Adesso sapete anche chi è la prima della lista.)**`,
    attenzione: 2,
    sets: { sa_appello: true, sa_giulia_prima: true },
    stinger: 'coro',
    silenzio: true,
    choices: [
      { text: '📢 Rispondere all\'appello. Dire "presente" al posto di Giulia', once: true, next: 'b6_presente' },
      { text: '🔌 Tirare su l\'idrofono. Basta. Basta adesso', next: 'b7' },
    ],
  },

  b6_presente: {
    location: 'rovine',
    caption: 'Il ninfeo — una parola detta dentro un canale romano',
    text: `Non lo decidono. Lo fa Claudia, che si mette in ginocchio davanti al canale, con la bocca a dieci centimetri dall'acqua, e dice:

"**Presente.**"

Il brusio si ferma.

Non si abbassa: si **ferma**, tutto insieme, come uno stadio quando succede una cosa in campo. Nelle cuffie, per quattro secondi, c'è solo il fruscio dell'acqua e il battito del cuore di Claudia che il microfono raccoglie attraverso il pavimento.

Poi, molto più vicino di prima — non a quattro metri di corda: **a venti centimetri dal microfono** —

una voce di donna, in latino, dice una cosa breve.

E poi ride. Una risata corta, di gola, sorpresa. La risata di una che non se lo aspettava e a cui la cosa è **piaciuta**.

Gaetano tira su la corda a due mani, veloce, sbagliando le prese, e l'idrofono esce dal canale gocciolando e con dentro, visibile attraverso il preservativo trasparente, il microfono a clip perfettamente asciutto e perfettamente funzionante.

Nessuno dei due parla per tutta la salita del sentiero. In cima, Claudia dice:

"Cosa ha detto?"

"Non lo so."

Lo sa. Ha capito due parole su cinque, e le due che ha capito sono *tu* e *venire*.

**(⚠️⚠️ 🎵 Attenzione +2 e adesso siete NELLA LISTA. Avete risposto all'appello: da questo momento, quando scenderete, non troverete qualcosa che vi ignora. Troverete qualcosa che vi aspettava, e che è contenta.)**`,
    attenzione: 2,
    sets: { risposto_appello: true },
    stinger: 'risata',
    choices: [
      { text: '🗿 La pietra. Adesso serve sapere chi è la prima della lista', requires: { notFlag: 'i_iscrizione' }, next: 'b6_iscrizione' },
      { text: '🚶 In paese. Mangiare. Adesso è necessario mangiare', next: 'b7' },
    ],
  },

  /* ---------------- IL PRANZO: LA SCENA UMANA ---------------- */

  b7: {
    location: 'porto',
    caption: 'Venerdì 28, ore 14:10 — la Marisqueria, un tavolo all\'ombra',
    text: `La Marisqueria sta con i tavoli fuori e le tovagliette di carta, e a quest'ora di un venerdì d'agosto è piena di gente che parla forte. Ed è esattamente per questo che ci vanno: **perché è piena di gente che parla forte**.

Ordinano male, tanto e senza logica, come si ordina quando si ha bisogno di ordinare: un antipasto di mare, una frittura, un piatto di spaghetti con le vongole in due, mezzo litro di bianco freddo, un'acqua grande.

Claudia mangia le alici marinate con le mani. Gaetano le dice che è una cosa da barbari, poi ne prende una con le mani.

Al tavolo accanto ci sono quattro romani sui cinquant'anni che discutono ad altissima voce di dove si prende il traghetto per Formia e a che ora, e uno dei quattro dice tre volte, sbagliando tre volte, "alle diciotto", e la moglie tre volte gli risponde "**alle diciassette e trenta**, Maurizio, sta sul biglietto".

Claudia ride. Gaetano ride. Il vino è freddo. Le vongole hanno la sabbia, due su venti, come devono.

Per un'ora e dieci minuti, dentro il rumore di quaranta persone che mangiano al sole, non esiste nessuna cisterna, nessuna lista, nessuna voce dentro un canale romano.

Poi il conto: sessantadue euro. Gaetano lascia settanta. Il cameriere dice "grazie, e mi raccomando, stasera vento da sud, se andate a fare il bagno andate a Cala Rossano che sta al riparo".

**(💪 TENUTA piena, 🫁 Fiato +2, mosse ricaricate. Questa è l'unica economia di questo gioco: si recupera mangiando, dormendo, ridendo e stando insieme. Non si recupera combattendo. Segnatevelo, perché più tardi sarà l'unica cosa che vi salva.)**`,
    fullHeal: true,
    recharge: true,
    gold: 2,
    stinger: 'heal',
    sets: { pranzo_marisqueria: true },
    choices: [
      { text: '🧱 Al muro dei Coraggio. Si scende', requires: { flag: 'muro_aperto' }, next: 'b8' },
      { text: '🧱 Al muro dietro l\'orto. C\'è un muro da aprire', requires: { notFlag: 'muro_aperto' }, next: 'b4' },
      { text: '🏖 Cala Rossano, come ha detto il cameriere. Un bagno prima del buio', next: 'b9' },
      /* Lilia aveva detto «domani vi porto alle calette»: qui la promessa si mantiene, e
         quello che insegna a Claudia le serve DAVVERO più tardi, sotto l'isola. */
      { text: '🤿 Lilia aveva detto le calette. Chiamarla e andare, con maschere pinne e boccagli',
        requires: { flag: 'conosciuta_lilia' }, once: true, next: 'b7_calette' },
      { text: '🗿 Villa Giulia, se non ci siete ancora andati', requires: { notFlag: 'visto_villa_giulia' }, next: 'b6' },
    ],
  },

  /* ---------------- LA DISCESA: IL PRIMO SOTTO ---------------- */

  /* LA LEZIONE DI LILIA. È la scena in cui l'arco di Claudia avanza per mano di una
     persona che nell'acqua sta come in salotto — e non per mano di Gaetano, che è
     importante: lui la accompagna da dieci anni, ma non può insegnarle una cosa che a
     lui non è mai costata niente. Quello che Lilia insegna ha un effetto MECCANICO
     reale (flag lezione_lilia, letta da Engine.apneaFiato): non è un incoraggiamento,
     è una tecnica. E arriva due ore prima della cisterna murata, di proposito. */
  b7_calette: {
    location: 'mare',
    npc: ['lilia'],
    caption: 'Le calette con Lilia — ore 14:50',
    stinger: 'apnea',
    gold: 3, heal: 4,
    sets: { lezione_lilia: true },
    text: `Lilia arriva con un gommone di quattro metri che è più vecchio di lei, un motore che parte al secondo strappo e zero borse: ha un telo, una bottiglia d'acqua e la reflex in un sacco stagno.

Le calette sotto Punta Eolo non hanno un nome sulle mappe e ne hanno tre in paese. Ci si arriva in dieci minuti stando larghi dagli scogli, e quando spegne il motore l'acqua sotto il gommone è così ferma che si vedono le ancore di sabbia disegnate sul fondo a sette metri.

Claudia guarda i sette metri. Il fondo si vede, e questo — lo sa adesso, da ieri — è la differenza fra una cosa sopportabile e una no.

> Lilia: *(che si è già messa le pinne sedendosi sul bordo, senza cerimonie)* "Allora. Tu hai paura del profondo, giusto?"

> Claudia: *(a cui nessuno l'ha mai chiesto così, in faccia, senza pietà)* "...sì."

> Lilia: "Bene, è la cosa giusta. Il profondo è profondo." *(si sputa nel vetro della maschera e lo strofina, il gesto più antiestetico e più utile del mondo)* "Adesso ti dico l'unica cosa che serve, che non è coraggio. Il coraggio dura trenta secondi e poi finisce."

> Claudia: "E cosa serve?"

> Lilia: "**Annoiarti.**"

Claudia la guarda.

> Lilia: "La paura è una cosa che tiene la testa occupata. Se stai sotto trenta secondi, la paura vince, perché in trenta secondi la testa ha il tempo di raccontarti tutto. Se stai sotto **cinque minuti**, a un certo punto la testa si stanca di raccontare, e comincia a **guardare**." *(si mette la maschera sulla fronte)* "L'unica cosa che devi fare è restare abbastanza per annoiarti. Il resto viene da solo."

Poi le insegna le tre cose che nessuno le ha mai spiegate perché tutti danno per scontato che si sappiano:

**Uno.** Butta fuori l'aria piano, non tutta insieme: se svuoti i polmoni di colpo il corpo si spaventa da solo e ti fa risalire lui, senza chiedertelo.

**Due.** Non guardare **giù**: guarda **avanti**. Sott'acqua giù e avanti sono la stessa direzione, ma la testa non lo sa, e se le dici che stai guardando avanti si comporta meglio.

**Tre.** Col boccaglio non alzare mai la testa. Mai. Se la alzi hai rimesso la paura al suo posto e devi ricominciare.

Poi si buttano, e per cinquanta minuti nessuno dice niente perché non si può parlare con un boccaglio in bocca.

Alla fine Claudia si tira su la maschera e ha il segno del silicone sulla faccia e la faccia di una che ha capito una cosa.

> Claudia: "Mi sono annoiata."

> Lilia: *(che si sta legando i capelli con l'elastico che tiene al polso)* "Eh."

> Claudia: "Mi sono ANNOIATA, Lilia. A quattro metri. Stavo guardando una bavosa che difendeva un buco da un'altra bavosa e mi sono ROTTA."

> Lilia: "Benvenuta."

Sul gommone, tornando, Lilia scatta una foto sola: Claudia di spalle, con la maschera sulla fronte e i capelli incollati, che guarda l'isola da fuori. Non gliela fa vedere. Dice che gliela manda.

**(🫁 Fiato +3, 💪 TENUTA +4. 🤿 LA LEZIONE DI LILIA: da adesso in immersione hai più aria — non perché sei coraggiosa, ma perché sai buttarla fuori piano, guardare avanti e non alzare la testa. Il gioco lo conta davvero.)**`,
    choices: [
      { text: '🧱 Al muro dei Coraggio, adesso. Si scende', next: 'b8' },
      { text: '📷 Prima chiederle di quella cartella di quattro anni fa', requires: { flag: 'archivio_lilia' }, once: true, next: 'b7_archivio' },
      { text: '🏖 Restare in acqua un\'altra mezz\'ora, e al muro ci si va dopo', next: 'b8' },
    ],
  },

  /* L'ARCHIVIO, secondo passaggio: adesso hanno una ragione per cercare, e la foto di
     quattro anni fa esiste davvero. Non è una prova di niente: è una banda verticale in
     una foto normale, cioè esattamente la cosa che Claudia ha già visto dal traghetto.
     Vale come indizio del mistero delle cisterne. */
  b7_archivio: {
    location: 'mare',
    npc: ['lilia'],
    caption: 'Il telefono di Lilia, sul gommone — ore 15:40',
    gold: 1,
    sets: { i_foto_lilia: true },
    text: `Il gommone è legato alla boa e il telefono passa di mano tre volte prima di arrivare dove deve arrivare.

Agosto di quattro anni fa. La cartella «buone». Ottantasei foto, e Lilia le scorre col pollice alla velocità di chi le conosce a memoria.

> Lilia: "Ecco, questa è quella che avevi fermato ieri."

Il mare fra Ventotene e Santo Stefano, alle sette di sera, controluce. Una foto bella e normalissima, di quelle che si fanno mille volte.

Solo che a metà del canale, verticale, dal pelo dell'acqua verso il basso, c'è **una banda** dove la luce non si comporta come intorno. Non è una scia: le scie sono orizzontali. Non è un riflesso: i riflessi stanno sopra.

> Claudia: "Tu questa l'hai guardata."

> Lilia: "Mille volte. Pensavo fosse l'obiettivo." *(si stringe le spalle, e per la prima volta da quando l'hanno ritrovata sembra una che ha vent'anni)* "Ho anche cambiato obiettivo, quell'anno."

> Gaetano: "E la banda?"

> Lilia: "La banda è rimasta."

Silenzio, e il rumore del gommone che batte piano contro la boa.

> Lilia: *(e lo dice ridendo, perché è l'unico modo)* "Vabbè, mi state dicendo che ho una foto di una cosa?"

> Claudia: "Ti stiamo dicendo che hai una foto della stessa cosa che ho io. Fatta dal traghetto. Mercoledì."

> Lilia: "...quattro anni dopo."

> Claudia: "Quattro anni dopo, nello stesso punto."

**(📷 INDIZIO: la banda verticale c'è anche in una foto di quattro anni fa, nello stesso braccio di mare. Non è la macchina fotografica, e non è ieri.)**`,
    choices: [
      { text: '🧱 Al muro dei Coraggio. Adesso c\'è più fretta di prima', next: 'b8' },
      { text: '📓 Prima scrivere sul Quaderno: data, ora, punto', next: 'b8', sets: { annotato_foto: true } },
    ],
  },

  b8: {
    location: 'sotto',
    metri: 4,
    caption: 'Venerdì 28, ore 16:20 — dentro la cisterna murata',
    text: `Si cala con la corda dei Coraggio annodata al tronco del fico. Quattro metri. Gaetano scende primo e mette i piedi sul terzo gradino della scala antica, quello che sta appena sopra il pelo dell'acqua e che è coperto di una patina verde che scivola come sapone.

Poi scende Claudia. Non ci mette niente. Quando è giù, dice: "Ok" — una volta, a sé stessa.

La torcia illumina una stanza che è **il doppio** di quelle di Peppe. La volta a botte è integra. I pilastri sono sette. Il cocciopesto rosa arriva fino a un metro e mezzo sopra l'acqua e poi finisce con una linea netta, orizzontale, perfetta: **il livello dell'acqua nel 1957.**

L'acqua adesso sta due metri e venti più su di quella linea. Il che vuol dire che in sessantanove anni questa stanza si è riempita, e che l'acqua da qualche parte entra.

Il secchiello giallo da spiaggia galleggia a tre metri. È di plastica dura, di quelli anni Cinquanta, con una decalcomania di un pesce quasi tutta andata. Accanto ci sono, a galla: due infradito spaiate, una palla di gomma sgonfia, un braccialetto di conchiglie.

Roba da bambini. Tutta roba da bambini. Galleggia in cerchio, piano, come se girasse in un imbuto molto lento.

E in mezzo al cerchio l'acqua è **più scura**: c'è un buco nel fondo, e il buco scende.

**(🫁 Fiato −2: qui sotto l'aria è pesante e si respira male. Il buco nel fondo è il punto in cui questo gioco comincia a chiedere il fiato che avete accumulato mangiando e dormendo.)**`,
    goldLoss: 2,
    sets: { scesa_cisterna: true },
    silenzio: true,
    choices: [
      { text: '🎧 Calare l\'idrofono nel buco prima di metterci un corpo', requires: { item: 'idrofono' }, once: true, next: 'b8_idro' },
      { text: '🪣 Recuperare il secchiello e la roba a galla. Guardarla bene', once: true, next: 'b8_roba' },
      { text: '🤿 Scendere nel buco. Claudia in apnea, Gaetano sulla corda', requiresGold: 7, tag: '(servono 7 di 🫁 fiato: sotto quella soglia non arrivate al fondo e lo sapete)', next: 'b8_apnea' },
      { text: '🥨 Sedersi sul gradino asciutto, i taralli e il thermos. Venti minuti, e poi si vede', once: true, requires: { item: 'taralli' }, removeItem: 'taralli', heal: 4, gold: 4, next: 'b8_respiro' },
      { text: '🪜 Risalire. Non oggi, non così', next: 'b9' },
    ],
  },

  b8_respiro: {
    location: 'sotto',
    metri: 3,
    caption: 'La cisterna murata, ore 16:35 — venti minuti su un gradino',
    text: `Si siedono sul gradino asciutto, quello sopra la patina verde, con le spalle al cocciopesto e i piedi a dieci centimetri dall'acqua nera.

Il sacchetto dei taralli fa un rumore osceno in una stanza così. Gaetano lo apre piano, come se la carta potesse offendere qualcuno, e poi si accorge di quello che sta facendo e lo apre normalmente, con rabbia.

"Ce ne stiamo a mangiare taralli in una cisterna," dice Claudia.

"Sì."

"E il bello è che ho fame."

Mangiano. Bevono dal thermos di Ada a turno, dal tappo. La torcia sta appoggiata di lato e fa un cono giallo sul soffitto, e nel cono passa la polvere.

E qui succede la cosa che questo gioco vuole insegnarvi: **si respira**. Tredici gradi, aria ferma, nessuno che parla. Il petto si allarga, le spalle scendono, il battito rallenta. Venti minuti di niente valgono, in fondo a un buco, più di qualunque coraggio.

Claudia si pulisce le mani sui pantaloncini e dice: "Ok. Adesso ci vado."

**(🫁 Fiato +4, 💪 TENUTA +4. Non è un trucco: in questo gioco il fiato si guadagna così e solo così — mangiando, bevendo, stando fermi. Adesso il fondo è a portata, e il briefing dell'immersione ve lo dirà in chiaro.)**`,
    gold: 4,
    heal: 4,
    stinger: 'heal',
    sets: { respirato_sotto: true },
    choices: [
      { text: '🤿 Adesso sì. Giù', requiresGold: 7, tag: '(servono 7 di 🫁 fiato)', next: 'b8_apnea' },
      { text: '🎧 Prima l\'idrofono nel buco, adesso che siamo calmi', requires: { item: 'idrofono' }, once: true, next: 'b8_idro' },
      { text: '🪜 No. Su, e domani con l\'attrezzatura giusta', next: 'b9' },
    ],
  },

  b8_roba: {
    location: 'sotto',
    metri: 4,
    caption: 'La cisterna murata — quello che galleggia',
    text: `La tirano su con l'asta del selfie, pezzo per pezzo, e la mettono sul gradino asciutto in fila, come si fanno gli inventari.

**Un secchiello giallo**, plastica dura, decalcomania di un pesce. Sul fondo, inciso col chiodo da una mano di bambino: **A**.

**Due infradito spaiate**, entrambe destre, misure diverse: una da adulto, una da bambino di sei anni.

**Una palla di gomma** sgonfia, rossa, con una striscia bianca.

**Un braccialetto di conchiglie** infilate su un elastico da mercerie, di quelli che si fanno in spiaggia.

E, sotto tutto, quella che Gaetano tira su per ultima e che gli fa dire *porca puttana* a mezza voce: **una maschera da sub**. Non antica. Anni Novanta, silicone azzurro sbiadito, vetro temperato, marca italiana. Con l'elastico **tagliato di netto**, non rotto: tagliato, con una lama, in un punto solo.

"Claudia. Questa è degli anni Novanta."

"Lo so."

"Questo muro è del cinquantasette."

"Lo so, Gaetano." Claudia guarda il buco nero in mezzo al cerchio di roba galleggiante. "Vuol dire che qualcuno, dopo il cinquantasette, è scesa qua sotto **da un'altra parte.** E la maschera se l'è tolta."

"O gliel'hanno tolta."

**(🎁 Oggetti: la MASCHERA BUONA — vetro temperato, si può usare, va solo cambiato l'elastico — e un TELO che era in fondo, di spugna, con dentro ancora la sabbia. 🎵 Attenzione +1: la roba a galla adesso gira in senso contrario.)**`,
    item: 'maschera_1997',
    attenzione: 1,
    sets: { sa_maschera_novanta: true, sa_secchiello_A: true },
    choices: [
      { text: '📓 "A". Il secchiello ha una A incisa sotto', once: true, next: 'b8_lettera' },
      { text: '🎧 L\'idrofono nel buco', requires: { item: 'idrofono' }, once: true, next: 'b8_idro' },
      { text: '🤿 Giù. Claudia in apnea', requiresGold: 7, tag: '(servono 7 di 🫁 fiato: sotto quella soglia non arrivate al fondo e lo sapete)', next: 'b8_apnea' },
    ],
  },

  b8_lettera: {
    location: 'sotto',
    metri: 4,
    caption: 'La cisterna murata — una lettera sul fondo di un secchiello',
    text: `Gaetano gira il secchiello verso la torcia. La **A** è incisa col chiodo, storta, con la traversa troppo bassa, come la fanno i bambini di cinque o sei anni quando hanno appena imparato.

"È un'iniziale," dice. "I bambini in spiaggia segnano il secchiello così, per non confonderlo. Lo facevo anch'io."

Claudia sta guardando il secchiello e dietro il secchiello sta pensando a un'altra cosa, e a un certo punto la dice, e la voce le si abbassa di un tono:

"Al museo. Ieri. La foto del molo di Napoli, ventiquattro ottobre millenovecentoquarantatré, la nave dei bambini."

"Sì?"

"La bambina in prima fila con il cappotto troppo grande." Claudia tira fuori il telefono, cerca la foto, la trova, la ingrandisce con due dita. "Guarda cosa tiene in mano."

Nella foto, sgranata, in bianco e nero, dentro il pugno di una bambina di sei anni che sta per salire su una nave che non arriverà da nessuna parte, c'è **un secchiello**.

Non si vede il colore. Non si vede la lettera. Sarebbe assurdo pretenderlo.

Ma è un secchiello, ed è tenuto come si tiene una cosa che è tua.

**(📓 Il Quaderno mette una riga accanto all'altra: il secchiello con la A, e una bambina sul molo nel 1943 con un secchiello in mano. Non è una prova. È peggio: è una cosa che adesso non riuscite più a non pensare.)**`,
    sets: { sa_secchiello_foto: true },
    choices: [
      { text: '🎧 L\'idrofono nel buco. Adesso serve sapere', requires: { item: 'idrofono' }, once: true, next: 'b8_idro' },
      { text: '🤿 Giù', requiresGold: 7, tag: '(servono 7 di 🫁 fiato: sotto quella soglia non arrivate al fondo e lo sapete)', next: 'b8_apnea' },
      { text: '🪜 Su. Bisogna respirare aria vera', next: 'b9' },
    ],
  },

  b8_idro: {
    location: 'sotto',
    metri: 8,
    caption: 'La cisterna murata — l\'idrofono nel buco, venti metri di corda',
    text: `Cala tutta la corda. Venti metri. Il cavo va giù e non trova fondo: l'idrofono resta appeso nel nero.

Nelle cuffie, il brusio dell'orto e del ninfeo qui non è un brusio. Qui è **vicino**.

Si distinguono le cose come in una stanza. Un uomo che tossisce. Qualcuno che sposta un piede su un pavimento. Una donna che dice una frase in latino con l'aria di chi la ripete. Un altro che risponde qualcosa in un dialetto duro, del sud, ma non napoletano — più stretto, più antico. Due che discutono piano, per niente, come si discute quando si è insieme da troppo tempo.

E sotto tutto, che tiene il tempo di tutto, come un metronomo, **una bambina che canta**.

Sette note. Tre parole. Le stesse che Rosa Coraggio ha cantato tra i pomodori due ore fa, e con la stessa melodia esatta, e con l'accento di ottant'anni prima.

Claudia si toglie le cuffie e le tiene in mano. Ha gli occhi asciutti e la faccia di una che ha deciso una cosa.

"Non è un mostro," dice. "Gaetano, quella è una bambina di sei anni che è sotto quest'acqua dal quarantatré e **tiene il tempo agli altri perché sennò si spaventano**."

**(✅ Se non ce l'avevate, il Quaderno registra la ninnananna sentita per intero. 🎵 Attenzione +1. E il gioco vi chiede di tenere a mente una cosa: da qui in poi non state andando ad ammazzare niente. State andando a prendere qualcuno.)**`,
    sets: { i_ninna_sentita: true, sa_bambina_tiene_tempo: true },
    attenzione: 1,
    stinger: 'coro',
    silenzio: true,
    choices: [
      { text: '🤿 Giù. Claudia scende', requiresGold: 7, tag: '(servono 7 di 🫁 fiato: sotto quella soglia non arrivate al fondo e lo sapete)', next: 'b8_apnea' },
      { text: '🎶 Cantare la ninnananna dentro il buco. Rispondere con la sua canzone', once: true, requires: { flag: 'i_ninna_sentita' }, next: 'b8_cantare' },
      { text: '🪜 Su. Non stasera. Serve un\'attrezzatura vera', next: 'b9' },
    ],
  },

  b8_cantare: {
    location: 'sotto',
    metri: 8,
    caption: 'La cisterna murata — due versi cantati male in un buco nero',
    text: `Claudia si mette in ginocchio sul gradino verde, con le mani sul bordo, la faccia sopra l'acqua nera, e canta.

Canta male. Ha una voce normale, un po' bassa, e la ninnananna la sa a metà, e la prima nota la prende sbagliata e ricomincia.

> *"Nonna nonna, ninna nonna…*
> *chi sta sott' nun torna sola…*
> *…si porta appriess' a chi la chiamma."*

Poi si ferma. Il suo respiro fa un'eco piccola contro la volta.

Sotto, l'acqua non si muove.

Poi, dal buco — non dall'idrofono: **dall'aria**, dal buco nero a due metri da lei, senza microfoni in mezzo — una voce di bambina di sei anni, in napoletano di ottant'anni fa, con una gioia che spacca il cuore:

*"L'hê ditta storta."*

Claudia, che sta piangendo e non se n'è accorta, risponde: "Sì. Scusa. Non la so bene."

*"T'a 'mparo io."*

E poi la canta lei. Tutta. Cinque strofe, di cui voi ne conoscevate una, e le altre quattro sono peggio, e Claudia le impara, e le imparerà davvero, e le canterà davvero, e quello che le succederà dopo dipenderà da questa scena.

**(🎶 Ha imparato la ninnananna dalla fonte. Se avete la collana di Giulia e la foto dal museo, adesso quelle due cose insieme fanno una terza cosa, e quella terza cosa è l'unica arma che funziona contro una bambina. 🎵 Attenzione +2.)**`,
    attenzione: 2,
    sets: { ninna_imparata: true, i_ninna_sentita: true },
    stinger: 'coro',
    choices: [
      { text: '🤿 Scendere. Con lei che canta, adesso', requiresGold: 7, tag: '(servono 7 di 🫁 fiato: sotto quella soglia non arrivate al fondo e lo sapete)', next: 'b8_apnea' },
      { text: '🪜 Risalire. Bastava così, per oggi bastava', next: 'b9' },
    ],
  },

  b8_apnea: {
    location: 'sotto',
    metri: 6,
    caption: 'La cisterna murata, ore 16:55 — Claudia entra in acqua',
    text: `Il piano è di Gaetano e Claudia lo accetta con due correzioni.

Il piano: lei scende, perché lei sotto ci sta più di lui — è una cosa che sa dai tempi della piscina di Latina, che ha i polmoni buoni e la testa che le si fa calma sotto invece di andare in panico. Lui resta sul gradino con la corda legata in vita a lei e conta i secondi ad alta voce, e alla fine dei secondi tira.

Le due correzioni di Claudia: che i secondi li conti **forte**, che li deve sentire; e che se lui sente qualsiasi cosa nelle cuffie, qualsiasi, **tira e non chiede**.

Si mette la maschera. Si siede sul bordo del gradino, con le gambe nell'acqua nera fino al ginocchio.

"Amore."

"Dimmi."

"Se torno su e non sono io," dice Claudia, "non farmi salire la scala."

Poi respira tre volte, piano, come si fa, e va sotto senza schizzi, senza un rumore, e la torcia diventa una macchia gialla che si rimpicciolisce, e la corda comincia a scendere tra le mani di suo marito.

**(🫁 L'APNEA. Tieni premuto per scendere, lascia per risalire. Il fiato scende sempre e più giù sei, più in fretta se ne va. Torna su col fiato ancora in petto: il gioco non ti fa un favore se fai l'eroe.)**`,
    goldLoss: 1,
    minigame: {
      type: 'apnea',
      hero: 'claudia',
      success: 'b8_apnea_ok',
      fail: 'b8_apnea_ko',
      config: {
        titolo: '🫁 Il buco nel fondo',
        profondita: 14,
        oggetto: 'rubinetto_rotto',
        cosa: 'qualcosa di metallico incastrato tra due pietre — sembra un rubinetto',
        extra: 9,
        extraFlag: 'sa_scala_continua',
        cosaExtra: 'la scala. Continua: sotto, nel buio, i gradini vanno ancora giù',
      },
      tag: 'Tieni premuto per scendere, lascia per risalire. Il fiato non aspetta.',
    },
    choices: [],
  },

  b8_apnea_ok: {
    location: 'sotto',
    metri: 14,
    caption: 'La cisterna murata, ore 17:02 — quaranta secondi',
    text: `Claudia rompe la superficie con la bocca prima che col naso, e il primo respiro le fa un rumore che Gaetano non vuole sentire mai più.

Quaranta secondi. Quattordici metri. Gaetano li ha contati tutti ad alta voce come promesso, e a trentuno gli si è rotta la voce e ha continuato comunque.

Lei si tira sul gradino, si strappa la maschera, tossisce due volte, e ride. **Ride.** Con i capelli appiccicati e il naso che cola e i denti che battono per i tredici gradi.

"Ci sono i gradini," dice tra un respiro e l'altro. "Gaetano. La scala. **Continua.** Va giù, sotto l'acqua, e continua, e ho visto almeno altri dodici gradini, e non finiva."

Apre la mano. C'è una cosa di ottone, corrosa, con una filettatura: un rubinetto vecchio, di quelli industriali, strappato da un tubo.

"Questo era incastrato tra due pietre a metà scala. Amore, **c'è un impianto** là sotto. Qualcuno ci ha portato dei tubi."

E poi, mentre si mette il telo sulle spalle, dice l'ultima cosa, e la dice piano, guardando l'acqua:

"E a un certo punto, giù, mi è passata accanto una cosa grande quanto me. Non mi ha toccata. Si è **spostata** per farmi passare."

**(🎁 Oggetto: il RUBINETTO ROTTO — con una bombola, diventa quaranta secondi d'aria in più a ogni immersione. Il Quaderno registra: la scala continua sotto il livello dell'acqua, e sotto c'è un impianto fatto da mani umane. 🫁 Fiato −2: quaranta secondi a quattordici metri si pagano.)**`,
    goldLoss: 2,
    item: 'rubinetto_rotto',
    sets: { sa_scala_continua: true, prima_apnea: true },
    stinger: 'apnea',
    choices: [
      { text: '🪜 Su. Basta. Si torna su, si mangia e si dorme', next: 'b9' },
      { text: '🤿 Ancora una. Adesso che sa dove sono i gradini', requires: { flag: 'sa_scala_continua' }, requiresGold: 8, tag: '(servono 8 di fiato: ne avete meno e non arrivate)', next: 'b8_seconda' },
    ],
  },

  b8_apnea_ko: {
    location: 'sotto',
    metri: 14,
    caption: 'La cisterna murata, ore 17:02 — la corda',
    text: `A trentaquattro secondi la corda smette di scendere e non risale.

Gaetano non aspetta. Non chiede. Tira, come promesso, con due mani, con la schiena, coi piedi puntati contro il gradino verde che scivola, e la corda viene su pesante e sbagliata, come viene su una cosa che non si aiuta.

Claudia esce dall'acqua a faccia in giù e lui la gira, e la tira sul gradino, e le tolgono la maschera in due — in due, perché lei ha già le mani che si muovono — e il primo respiro è una cosa lunga e brutta che si porta dietro dell'acqua.

Tossisce a lungo. Molto a lungo. Poi si mette a sedere da sola, con la schiena al muro di cocciopesto, e dice la prima frase con la voce di una che ha l'acqua nei polmoni:

"Non era il fiato."

"Che vuol dire non era il fiato."

"Il fiato ce l'avevo." Tossisce. "C'era una **mano** sulla caviglia. E non tirava, Gaetano. Mi **teneva**. Come si tiene per mano una che non deve scappare."

Le tiene un braccio dietro le spalle. Le sta bagnando la maglietta. Fuori, sopra i quattro metri di corda e il buco nel muro del 1957, è ancora un pomeriggio d'agosto e ci sono trentun gradi.

**(💪 −6 e ACQUA NEI POLMONI: −2 a tutto, e la vedete scritta nella scheda del personaggio col rimedio. Si toglie con il caffè delle Parracine, o quando qualcuno la chiama per nome nel modo giusto. 🎵 Attenzione +1.)**`,
    damage: 6,
    attenzione: 1,
    sets: { claudia_tenuta_giu: true },
    poisonRoller: true,
    choices: [
      { text: '☕ Il caffè delle Parracine. Adesso, subito, qui sul gradino', requires: { item: 'caffe_parracine' }, once: true, removeItem: 'caffe_parracine', next: 'b8_caffe' },
      { text: '🪜 Su. Portarla su e basta', next: 'b9' },
    ],
  },

  b8_seconda: {
    location: 'sotto',
    metri: 23,
    caption: 'La cisterna murata, ore 17:20 — la seconda immersione',
    text: `La seconda volta Claudia scende sapendo dove mettere le mani, e questo cambia tutto: non spreca fiato a cercare, lo spende a **andare**.

Ventitré metri. Diciotto gradini contati. E alla fine dei diciotto gradini la scala non finisce: **fa una svolta a destra** ed entra in un passaggio, un cunicolo squadrato, largo abbastanza per una persona, con le pareti di cocciopesto rosa che a ventitré metri sotto il pelo di una cisterna murata sono **ancora perfette**.

Nel cunicolo, incastrata in una fessura, c'è una cosa che Claudia riconosce prima di capire cos'è, perché il cervello riconosce le forme umane sempre in anticipo: un tubo di gomma nera con una fascetta di metallo. Un tubo da immersione, di quelli anni Novanta. Tagliato.

Lo prende. Risale. Ci mette troppo, esce con la vista che si stringe ai bordi, e sul gradino resta due minuti a occhi chiusi prima di riuscire a parlare.

Poi dice: "Là sotto c'è un corridoio, va verso il mare, e qualcuno negli anni Novanta ci è entrato con le bombole e non è più uscito."

**(🎁 Oggetto: una BOMBOLA PICCOLA, che era attaccata al tubo, ancora carica per un terzo — con il rubinetto rotto torna intera e vi regala quaranta secondi di vita a ogni immersione. 🫁 Fiato −4: questa ve la siete pagata cara.)**`,
    goldLoss: 4,
    item: 'bombola_piccola',
    damage: 4,
    sets: { sa_cunicolo: true, sa_sub_anni90: true },
    stinger: 'apnea',
    choices: [
      { text: '☕ Il caffè di Ada. Ha la faccia di una che ne ha bisogno', requires: { item: 'caffe_parracine' }, once: true, removeItem: 'caffe_parracine', next: 'b8_caffe' },
      { text: '🪜 Su. E domani si va a Santo Stefano', next: 'b9' },
    ],
  },

  b8_caffe: {
    location: 'sotto',
    metri: 4,
    caption: 'Il gradino verde — un caffè in un thermos da B&B',
    text: `Il caffè delle Parracine, che Ada mette in un thermos di acciaio con il tappo che si svita male, è ancora caldo alle cinque del pomeriggio, e questo è un piccolo miracolo domestico che nessuno dei due commenta.

Gaetano le tiene la nuca con una mano e il tappo con l'altra e le fa bere due sorsi.

Claudia beve. Tossisce. Beve ancora. E al terzo sorso fa una cosa fisica e visibile: **raddrizza la schiena**. Come se qualcosa che le stava sopra fosse scivolato via.

"Meglio," dice. Ha ancora la voce sbagliata, ma è la sua.

"Ada l'ha fatto stamattina alle sette."

"Ada lo sapeva." Claudia si passa il polso sulla bocca. "Ada mette il caffè nel thermos a tutti quelli che stanno in camera due?"

Gaetano guarda il thermos. Poi guarda la scala che porta fuori dal buco nel muro.

"No," dice. "Secondo me no."

**(☕ ACQUA NEI POLMONI curata: −2 tolto, la scheda del personaggio è pulita. Il caffè è finito, l'oggetto è consumato, e Ada delle Parracine non è una signora che affitta camere: è una che sa cosa succede e vi prepara le cose giuste senza dirvelo.)**`,
    heal: 6,
    sets: { ada_sa: true },
    stinger: 'heal',
    choices: [
      { text: '🤿 Ancora una immersione. Adesso che respira, e finché c\'è luce', requiresGold: 8, tag: '(servono 8 di fiato)', next: 'b8_seconda' },
      { text: '🪜 Su. Aria vera', next: 'b9' },
    ],
  },

  /* ---------------- CALA ROSSANO, LA SERA ---------------- */

  b9: {
    location: 'mare',
    caption: 'Venerdì 28, ore 18:40 — Cala Rossano, al riparo dal vento di sud',
    text: `Cala Rossano è la spiaggia sotto il porto, con la ghiaia grossa che fa male ai piedi e l'acqua che a venti metri da riva è già di un blu da cartolina. Alle sei e quaranta di sera è mezza vuota: due famiglie che smontano gli ombrelloni, un ragazzo con la maschera, un cane che entra in acqua fino alla pancia e non più giù.

Si siedono sulla ghiaia senza telo, perché il telo è nella cisterna e nessuno dei due ha voglia di parlarne.

Claudia ha i capelli ancora bagnati dall'acqua di dentro, che è un'altra acqua, e guarda quella di fuori.

"Ci vado," dice.

"Non devi."

"Devo." Si toglie la maglietta. "Se non entro **adesso** in un mare normale, con il cane e i bambini e gli ombrelloni, quella di sotto diventa l'unica acqua che esiste. E io non gliela regalo."

Entra. Ci mette il tempo che ci mette sempre — ginocchia, cosce, il salto quando arriva alla pancia, il *madonna che fredda* — e poi nuota. Venti metri. Torna. Rifà.

Gaetano resta sulla ghiaia con lo zaino tra i piedi e la guarda, e conta i secondi anche adesso, che non serve, perché ormai è una cosa che fa.

**(💪 TENUTA piena, 🫁 Fiato +2. Non è una scena di riempimento: è Claudia che si riprende con le mani il mare che quella cosa le stava rubando, ed è una vittoria vera. Il gioco la conta.)**`,
    fullHeal: true,
    gold: 2,
    stinger: 'heal',
    sets: { bagno_ripreso: true },
    choices: [
      { text: '🤿 Il ragazzo con la maschera. Andare a parlargli', once: true, next: 'b9_ragazzo' },
      { text: '🏊 Entrare anche lui. Nuotare accanto a lei senza dire niente', once: true, heal: 4, gold: 1, next: 'b9_insieme' },
      { text: '🌅 Restare a guardare il tramonto e poi andare a cena', next: 'b10' },
    ],
  },

  b9_ragazzo: {
    location: 'mare',
    caption: 'Cala Rossano — Simone, ventidue anni, un\'ARA da noleggio',
    text: `Il ragazzo con la maschera si chiama Simone, ha ventidue anni, è di Terracina, fa il secondo anno di biologia marina e lavora l'estate al diving del porto.

Gli chiedono una cosa tecnica, così, come si chiede a uno del mestiere: se in quest'isola ci sono grotte che dal mare entrano dentro la roccia.

Simone si siede sulla ghiaia. Ha l'entusiasmo di uno a cui nessuno chiede mai niente del suo lavoro.

"Un botto. Tutta l'isola è tufo, il tufo fa cavità, e qui il mare ha lavorato ottantamila anni." Prende un sasso e disegna sulla ghiaia. "Ma la cosa strana di Ventotene la sanno tutti quelli del diving e nessuno la dice ai turisti."

"Quale?"

"Che a nord, tra qua e Santo Stefano, sul fondo, a quarantacinque metri, ci stanno **dei muri**." Batte il sasso due volte. "Muri. Romani, dicono. Un porto sommerso, magari una peschiera. Ci si va con l'autorizzazione e ci vanno gli archeologi." Fa una faccia. "E c'è pure una cosa che sui forum si racconta e che al diving nessuno ti conferma, cioè che laggiù, oltre i muri, ci sta **una fossa**. Tipo un pozzo verticale che scende dal fondo del mare, dentro la roccia, e non si sa quanto va giù perché nessuno l'ha misurata."

"Perché nessuno l'ha misurata?"

Simone raccoglie la maschera. "Perché la strumentazione, sopra la fossa, fa i capricci. Il computer da immersione ti dà profondità sbagliate, la bussola gira. E perché nel novantasette ci sono andati due sub francesi e ne è tornato uno." Si stringe nelle spalle, con la leggerezza dei ventidue anni. "Comunque non ci potete andare, servono i brevetti. Perché, vi interessa?"

**(🫁 Fiato +1 e un dato che vale tutto il resto del gioco: a quarantacinque metri, tra Ventotene e Santo Stefano, c'è un porto romano sommerso e una FOSSA che nessuno ha misurato. E nel 1997 due sub sono scesi e ne è tornato uno.)**`,
    gold: 1,
    sets: { sa_fossa: true, sa_sub_1997: true, sa_muri_sommersi: true },
    choices: [
      { text: '🤿 "Simone. Quanto costa noleggiare un\'attrezzatura?"', once: true, next: 'b9_noleggio' },
      { text: '🌅 Ringraziarlo e andare a cena. Serve una cena', next: 'b10' },
    ],
  },

  b9_noleggio: {
    location: 'mare',
    caption: 'Cala Rossano — il prezzo delle cose',
    text: `"Costa che non si può," dice Simone. "Cioè: l'attrezzatura te la noleggiano se hai il brevetto, e a quarantacinque metri serve l'avanzato più la deco, e voi non ce l'avete, e comunque a quella profondità non ti ci porta nessuno senza guida." Si mette la maschera sulla fronte. "Ma poi scusate, non ci sono i pescatori? Quelli scendono ancora in apnea a venti, venticinque metri, sotto pagamento e senza fare domande. Mio zio dice che negli anni Ottanta ce n'era uno qui che arrivava a trenta."

"E adesso?"

"E adesso boh, ci sta un vecchio al molo che ha una lampara e non parla con nessuno. Ciro, mi pare. Prova con lui, ma auguri."

Gaetano e Claudia si guardano.

"Domani alle nove," dice Claudia.

"Domani alle nove," dice Gaetano.

Simone li guarda, non capisce, e fa l'unica cosa sensata: torna in acqua.

**(📓 Il Quaderno chiude il cerchio: l'appuntamento con Ciro di domani mattina alle nove, che ieri sembrava una cortesia, adesso è l'unico modo per arrivare a quarantacinque metri. 🫁 Fiato +1.)**`,
    gold: 1,
    sets: { sa_serve_ciro: true },
    choices: [
      { text: '🏊 Un ultimo bagno con lei, prima che faccia buio', once: true, heal: 4, gold: 1, next: 'b9_insieme' },
      { text: '🌅 A cena. E domani si va da Ciro', next: 'b10' },
    ],
  },

  b9_insieme: {
    location: 'mare',
    caption: 'Cala Rossano — venti metri, due volte, a fianco',
    text: `Gaetano si toglie la maglietta, entra facendo le facce che fa lui, dice *madonna che fredda* con esattamente la stessa intonazione di sua moglie, e va a mettersi al suo fianco.

Nuotano venti metri fino alla boa piccola, senza parlare, con lui che tiene mezzo metro più a destra perché lei ci sta più tranquilla se sente qualcuno sulla destra. Poi tornano. Poi rifanno.

Alla seconda andata Claudia si mette a fare il morto a galla, con le orecchie sotto, gli occhi chiusi, il sole sulla faccia. Lui la imita. Restano così, due adulti a galla in un mare di sera, con le orecchie sotto il pelo dell'acqua, che sentono solo il rumore che fa il mare da dentro: quel *frrr* continuo, di sabbia e di corrente.

E per novanta secondi, sotto quel rumore, **non c'è niente**. Nessuna voce, nessun brusio, nessuno stadio, nessun appello.

Solo il mare, che fa il mare.

Claudia tira su la testa. Ha gli occhi lucidi di sale e di un'altra cosa.

"Hai sentito?"

"No. Non c'era niente."

"Esatto," dice lei. "**Non c'era niente.** Gaetano, qui non ci sono. Qui davanti al porto, con i bambini e il cane, non ci sono." Si asciuga la faccia con la mano bagnata, che non serve a niente. "Vuol dire che c'è un confine. E se c'è un confine, quella cosa non è tutto il mare. È **un posto**. E ai posti si va, e dai posti si torna."

**(💪 TENUTA +4, 🫁 Fiato +1. E il dato più importante di tutta la giornata: il Coro NON è ovunque. Ha un perimetro. Il Quaderno lo registra, e alla fine sarà questo a dirvi che si può vincere.)**`,
    heal: 4,
    gold: 1,
    stinger: 'heal',
    sets: { sa_confine: true },
    choices: [
      { text: '🌅 A cena', next: 'b10' },
      { text: '🤿 Prima parlare col ragazzo con la maschera', once: true, next: 'b9_ragazzo' },
    ],
  },

  /* ---------------- LA SERA: LE VOCI VICINE ---------------- */

  b10: {
    location: 'porto',
    caption: 'Venerdì 28, ore 21:15 — di nuovo alla Terrazza di Mimì, il tavolo di fuori',
    text: `Alla Terrazza di Mimì li riconoscono. Il ragazzo dei tavoli dice "ah, i signori di ieri" e li mette allo stesso tavolo, quello contro la ringhiera, che di sera è il migliore che c'è: sotto, l'isola scende verso il porto tutta di luci gialle, e in mezzo alle luci gialle passa la sagoma nera di un gatto.

Ordinano le lenticchie di Ventotene, che sono minuscole e non si spappolano, e un pesce alla griglia. Bevono. Parlano di cose normali per venticinque minuti di fila, con lo sforzo di due professionisti: la macchina da far revisionare, il matrimonio di Serena a ottobre, se il gatto è lo stesso di ieri.

Poi Claudia mette la forchetta giù e dice: "Amore. Il mezzo secondo."

Gaetano non capisce per un secondo e mezzo. Poi capisce benissimo.

"Ieri notte, sul terrazzo," dice lei. "Hai registrato una cosa. Poi ti sei toccato le orecchie tre volte in dieci minuti e non mi hai fatto sentire niente, e stamattina hai portato il telefono in bagno." Beve un sorso. "Gaetano. Io ti conosco da undici anni. **Cosa c'era nel mezzo secondo?**"

**(⚠️ Il momento è arrivato e il gioco non ve lo fa saltare. Le cose non dette, in questa storia, hanno gli interessi — e questi sono di ventisei ore.)**`,
    silenzio: true,
    choices: [
      { text: '📱 Dirglielo. Tirare fuori il telefono e fargliela sentire, adesso', next: 'b10_verita' },
      { text: '🤥 "Niente. Un rumore. Un motore lontano."', next: 'b10_bugia' },
      { text: '😶 "Te lo dico domani. Non stasera."', next: 'b10_domani' },
    ],
  },

  b10_verita: {
    location: 'porto',
    caption: 'La Terrazza di Mimì — mezzo secondo a venticinque per cento',
    text: `Gaetano tira fuori il telefono. Cerca il file. Mette il volume a due tacche, perché siamo in un ristorante, e le porge un auricolare.

"Rallentato a un quarto," dice. "Sennò non si sente."

Claudia si mette l'auricolare. Ascolta. Il ragazzo dei tavoli passa e chiede se va tutto bene e Gaetano dice sì grazie senza guardarlo.

Mezzo secondo di rumore, tirato per due secondi, diventa una nota bassa che sale e scende, e dentro la nota bassa ci sono tre sillabe.

*Clau-di-a.*

Claudia ascolta quattro volte. Al terzo ascolto ha già gli occhi asciutti in quel modo che fa paura. Al quarto si toglie l'auricolare, lo appoggia sulla tovaglia, e dice la cosa che Gaetano si aspettava e la dice nell'ordine sbagliato:

"Da ieri notte."

"Da ieri notte."

"E stamattina, in cucina, quando Ada ha detto *state attenti a quella che non sa nuotare*, e io ho detto *io so nuotare*, e tu mi hai detto *lo so*." La voce non le sale. Peggio: si abbassa. "**Tu lo sapevi già.** E mi hai lasciata scendere in due cisterne senza dirmelo."

"Sì."

"Perché."

E Gaetano — che è un uomo che di mestiere fa i conti, e che ha avuto ventisei ore per costruirsi una risposta buona — non la usa. Dice quella vera:

"Perché se te lo dicevo, tu ci volevi andare. E io speravo di trovare un modo di risolverla senza che ci andassi tu."

**(⚠️ Adesso è detta. Il gioco lo registra: è la scelta più difficile dell'atto e vi ha appena fatto perdere il posto dove nascondervi. Continua.)**`,
    sets: { verita_detta: true },
    choices: [
      { text: '💬 Lasciarla parlare. Prendersi tutto quello che ha da dire', next: 'b10_litigio' },
    ],
  },

  b10_litigio: {
    location: 'porto',
    caption: 'La Terrazza di Mimì, ore 22:05 — quattro minuti al tavolo di fuori',
    text: `Claudia parla per quattro minuti e non alza mai la voce, e sarebbe stato mille volte meglio se l'avesse alzata.

Dice che è stanca di essere protetta. Dice che essere protetti e non essere creduti sono la stessa cosa vista da due lati. Dice che a sei anni, in un mare a Sperlonga, le è successa una cosa che non ha mai raccontato a nessuno e che se qualcuno le avesse creduto allora, forse, non avrebbe passato ventotto anni a spiegare a tutti che l'acqua le fa paura per un motivo. Dice che quando lui ha detto *lo so* in cucina, quel *lo so* era una bugia con dentro una cosa vera, e che questa è la cosa peggiore che le abbia mai fatto.

Poi si ferma. Beve un po' d'acqua. E dice l'ultima, che non è per lui:

"E la parte che mi fa incazzare di più è che **ha detto il mio nome e non il tuo**. Ha scelto me. E tu mi hai tolto ventisei ore in cui potevo prepararmi."

Silenzio. Sotto la ringhiera, il gatto attraversa la luce di un lampione.

Gaetano dice: "Hai ragione su tutto." Non aggiunge niente, che è l'unica cosa intelligente che gli riesce stasera.

Claudia allunga la mano sul tavolo, gira il palmo in su, e aspetta. Lui ci mette la sua.

"Domani mattina," dice lei, "andiamo da Ciro. E da domani in poi, tutto quello che senti, me lo dici entro trenta secondi. Anche se è brutto. Anche se sono le quattro di notte. Entro trenta secondi."

"Trenta secondi."

"E se mi devo preparare a una cosa, mi ci preparo io."

**(💪 TENUTA piena, 🫁 Fiato +3, mosse ricaricate. Non è una riconciliazione decorativa: da qui in poi il gioco non vi nasconde più niente e voi non vi nascondete più niente, e nel giorno che non finisce questa sarà la differenza tra uscirne e restare.)**`,
    fullHeal: true,
    recharge: true,
    gold: 3,
    stinger: 'heal',
    sets: { patto_trenta_secondi: true, gaetano_ha_taciuto: false },
    choices: [
      { text: '🛏 Alle Parracine. Domani alle nove, il molo', next: 'b11' },
    ],
  },

  b10_bugia: {
    location: 'porto',
    caption: 'La Terrazza di Mimì — "un motore lontano"',
    text: `"Niente," dice Gaetano. "Un rumore. Un motore lontano, credo. Un peschereccio."

Claudia lo guarda. Tre secondi.

Poi fa una cosa che è mille volte peggio di qualunque litigio: **dice "ah, ok"**, prende la forchetta, e torna a mangiare le lenticchie.

E per il resto della cena parlano della macchina da far revisionare, e del matrimonio di Serena a ottobre, e del gatto, e lei ride due volte, e le risate sono giuste, e il conto lo paga lui, e camminano fino alle Parracine tenendosi per mano.

E dentro quella mano tenuta, adesso, c'è una cosa che non c'era ieri.

In camera, con la luce spenta, Claudia dice al buio, con la voce di una che non dormirà:

"Gaetano."

"Dimmi."

"Il preservativo di Barcellona." Pausa. "Quello nel beauty. Perché stamattina l'hai usato per il microfono."

"Sì."

"E come sapevi che ci stava dentro il beauty?"

Lui non risponde perché la risposta è banale: gliel'ha detto lei quattro anni fa ridendo, in macchina, sull'Aurelia.

Ma nel buio, per come le è uscita la domanda, non era una domanda su un preservativo. Era: *quante altre cose sai di me che non mi dici.*

**(⚠️ 🎵 Attenzione +1. La bugia è in piedi e Claudia non ci crede: il gioco lo registra come una crepa, non come un segreto. Nel giorno che non finisce, questa crepa avrà un nome e una scena tutta sua.)**`,
    attenzione: 1,
    damage: 3,
    sets: { bugia_detta: true },
    choices: [
      { text: '🛏 Dormire. Provare a dormire', next: 'b11' },
      { text: '💡 Riaccendere la luce e dirglielo. Adesso, alle undici e mezza di sera', once: true, next: 'b10_verita' },
    ],
  },

  b10_domani: {
    location: 'porto',
    caption: 'La Terrazza di Mimì — "domani"',
    text: `"Te lo dico domani," dice Gaetano. "Non stasera. Ti giuro che te lo dico, ma non stasera, perché stasera abbiamo mangiato bene e io ho bisogno di una sera in cui non succede niente."

Claudia lo guarda a lungo. Poi fa una cosa generosa e adulta: **accetta**.

"Domani mattina, prima di Ciro."

"Prima di Ciro."

"E non è che me lo dimentico, Gaetano."

"Lo so che non te lo dimentichi."

Finiscono le lenticchie. Prendono un limoncello che non hanno ordinato e che il ragazzo dei tavoli porta perché siamo in un'isola e sono i signori di ieri. Sotto la ringhiera il gatto è tornato e si è messo a dormire su un motorino.

Camminano alle Parracine parlando di niente, e la cosa non detta cammina con loro, un passo indietro, come un cane a cui hanno detto di stare.

**(🫁 Fiato +1 — una sera intera in cui non succede niente vale un punto di fiato. Ma la verità è rinviata, non detta: e in questo gioco le cose rinviate arrivano sempre nel momento peggiore, non nel momento comodo.)**`,
    gold: 1,
    sets: { verita_rinviata: true },
    choices: [
      { text: '💡 Ripensarci a metà strada. Fermarsi sotto un lampione e dirglielo', once: true, next: 'b10_verita' },
      { text: '🛏 Le Parracine', next: 'b11' },
    ],
  },

  /* ---------------- LA NOTTE E IL CHECKPOINT ---------------- */

  b11: {
    location: 'notte',
    caption: 'Venerdì 28, ore 23:50 — le Parracine, camera due',
    text: `Il ventilatore a pale. La persiana a righe. Le cicale, che ad agosto smettono verso l'una.

Claudia si addormenta in quattro minuti, come sempre, con una gamba fuori dal lenzuolo. Gaetano no.

Alle 00:40 si alza, va sul terrazzino a piedi nudi, e fa la cosa che si era ripromesso di non fare: mette l'idrofono nella vasca dei limoni. Mezzo metro d'acqua, in un vaso, in una terrazza, quaranta metri sopra il mare.

Nelle cuffie c'è il ronzio del vaso. Poi, sotto, piccolissimo, come una radio in un'altra casa: **lo stadio**.

Anche qui. Dentro un vaso di limoni.

Lo tira su. Torna a letto. Non dorme.

Alle 03:20 lo sveglia una cosa, e la cosa è che **Claudia non c'è nel letto**.

La trova in piedi davanti alla finestra aperta, di spalle, immobile, con la faccia verso il mare che non si vede perché è notte. Dorme. Dorme in piedi, con gli occhi chiusi, respirando piano.

E canta. A bocca chiusa, appena, la ninnananna, tutta, comprese le quattro strofe che nessuno le ha insegnato.

Gaetano non la sveglia. Non si può: si sa che non si sveglia chi cammina nel sonno. Le mette una mano sulla schiena, la accompagna al letto, la rimette sotto il lenzuolo. Lei si gira, gli mette un braccio addosso e dice, senza svegliarsi, con la sua voce normale:

"Domani sotto ci vengo io. Tu tieni la corda."

**(⚠️ 🎵 Attenzione +1. Il Quaderno registra: Claudia canta nel sonno cinque strofe di una ninnananna che ha sentito a metà. Il Coro non l'ha presa: la sta INSEGNANDO.)**`,
    attenzione: 1,
    sets: { claudia_sonnambula: true },
    stinger: 'coro',
    silenzio: true,
    choices: [
      { text: '📱 Svegliarla e dirglielo. Entro trenta secondi, come promesso', requires: { flag: 'patto_trenta_secondi' }, once: true, next: 'b11_trenta' },
      { text: '📝 Scrivere tutto sul Quaderno e dirglielo a colazione', next: 'b12' },
      { text: '🎤 Registrarla. Serve la prova, anche se è una cosa oscena da fare', once: true, next: 'b11_registrare' },
    ],
  },

  b11_trenta: {
    location: 'notte',
    caption: 'Camera due, ore 03:24 — trenta secondi',
    text: `Gaetano accende la luce del comodino e la sveglia con una mano sulla spalla.

"Claudia. Trenta secondi."

Lei si tira su su un gomito, con la faccia gonfia di sonno, i capelli in mezzo agli occhi. Ci mette due secondi a ricordarsi la regola. Poi è sveglia del tutto.

"Dimmi."

"Eri in piedi davanti alla finestra. Dormivi. Cantavi la ninnananna. Tutta. Cinque strofe."

Claudia sta zitta. Si passa le mani sulla faccia. Guarda la finestra aperta. Guarda il pavimento tra la finestra e il letto, i due metri che ha camminato senza esserci.

"Cinque?"

"Cinque."

"Io ne so una." Poi: "Ne sapevo una."

Si mette a sedere sul letto con le gambe sotto il lenzuolo, alle tre e ventiquattro di notte, e fa la cosa che la rende quella che è: **prende il Quaderno dal comodino e si mette a scrivere.**

"Allora scriviamo," dice. "Perché se domani me ne dimentico, voglio che stia scritto. Le cinque strofe che mi ricordo, che sono cinque. Il fatto che le so. E il fatto che io non le ho imparate."

Alle quattro e dieci scrivono ancora. Alle quattro e venticinque dormono, seduti, appoggiati alla testiera, con il Quaderno aperto tra loro due e la luce del comodino accesa.

Non è una bella notte. Ma è una notte in cui sono in due.

**(💪 TENUTA piena, 🫁 Fiato +2. Il patto dei trenta secondi ha funzionato la prima volta che serviva, ed è per questo che nel giorno che non finisce vi crederete a vicenda. Le cinque strofe sono sul Quaderno.)**`,
    fullHeal: true,
    gold: 2,
    sets: { cinque_strofe_scritte: true, ninna_imparata: true },
    stinger: 'heal',
    choices: [
      { text: '📓 Prima di dormire: rileggere il Quaderno da capo, tutto', next: 'b3_quaderno' },
      { text: '☀️ Sabato 29 agosto. Il molo, alle nove', next: 'b12' },
    ],
  },

  b11_registrare: {
    location: 'notte',
    caption: 'Camera due, ore 03:26 — il telefono davanti alla bocca di sua moglie',
    text: `Gaetano prende il telefono. Apre il registratore. Si mette a cinquanta centimetri dalla faccia di Claudia, che dorme in piedi davanti a una finestra aperta, e registra due minuti e undici secondi.

Mentre lo fa, sa perfettamente cos'è: è una cosa **oscena**. Sta usando sua moglie come strumento di misura.

Lo sa e lo fa comunque, perché è la sua unica forma di coraggio, ed è anche il suo unico modo di volere bene: mettere le cose sul foglio, in colonna, dove non possono mentirti.

Il file, riascoltato all'alba con le cuffie, ha dentro due voci.

Una è Claudia, a bocca chiusa, che canta piano.

L'altra sta **sotto** la sua, sfasata di un quarto di secondo, e canta le stesse note, e non è la voce di una donna adulta.

Gaetano si mette il telefono in tasca. Guarda sua moglie dormire, con la bocca aperta e un braccio buttato fuori dal letto.

E la prima cosa che pensa non è *ho una prova*. La prima cosa che pensa, alle sei e dieci del mattino, con la luce che entra a righe dalla persiana, è:

*L'ho registrata mentre dormiva invece di svegliarla.*

**(⚠️ 🎵 Attenzione +1 e nessun punto di fiato: questa cosa non vi ha fatto respirare meglio. Oggetto vero però: la REGISTRAZIONE con due voci sovrapposte, che è la prima prova materiale che avete e che, con il registratore giusto, diventa un'arma.)**`,
    attenzione: 1,
    sets: { registrazione_notte: true, gaetano_ha_taciuto: true },
    choices: [
      { text: '🗑 Cancellare il file. Adesso, prima di guardarlo un\'altra volta', once: true, next: 'b11_cancella' },
      { text: '📱 Fargliela sentire a colazione. Prima di Ciro', next: 'b12' },
    ],
  },

  b11_cancella: {
    location: 'notte',
    caption: 'Camera due, ore 06:15 — il cestino del telefono',
    text: `Gaetano tiene il dito sul file per due secondi. *Elimina. Elimina definitivamente? Sì.*

E poi resta lì, al buio, con un telefono in mano che non ha più dentro la prova della cosa più importante che gli sia mai capitata.

Ha appena distrutto un dato. Lui. Uno che il dato lo tiene anche quando è brutto, anche quando è scomodo, anche quando gli dà torto: **è l'unica cosa in cui crede.**

Lo ha fatto perché quella registrazione non era un dato. Era sua moglie che dormiva.

Alle sei e venti Claudia si sveglia e lo trova seduto sul bordo del letto con il telefono spento in mano.

"Che hai."

"Ti ho registrata mentre dormivi," dice. "Cantavi. C'era un'altra voce sotto la tua. E ho cancellato tutto perché non era una cosa da fare."

Claudia lo guarda. Poi gli mette una mano sulla nuca, come si fa ai ragazzini, e dice:

"Bravo. **Era una cosa da schifo.**" Pausa. "Però ora me la canti tu, quello che ricordi, e la scriviamo. Con la mia voce vera, sveglia, mentre te la dico io."

E così, alle sei e mezza del mattino, in una camera di B&B, Claudia canta cinque strofe di una ninnananna del 1943 a suo marito che le scrive su un Quaderno, **da sveglia, per scelta**, e questa è la differenza tra le due cose ed è tutta la differenza del mondo.

**(💪 TENUTA piena, 🫁 Fiato +3. Avete perso una prova e guadagnato la cosa che nel giorno che non finisce vi salverà: le cinque strofe messe per iscritto DA LEI, con il suo consenso. Il gioco non vi punisce per aver fatto la cosa giusta. Mai.)**`,
    fullHeal: true,
    gold: 3,
    sets: { cinque_strofe_scritte: true, ninna_imparata: true, gaetano_ha_taciuto: false, file_cancellato: true },
    stinger: 'heal',
    choices: [
      { text: '☀️ Sabato 29 agosto. Il molo, alle nove', next: 'b12' },
      { text: '📓 Rileggere il Quaderno prima di uscire', next: 'b3_quaderno' },
    ],
  },

  b12: {
    location: 'bnb',
    caption: 'Sabato 29 agosto, ore 07:50 — la terrazza delle Parracine',
    text: `Ada porta il caffè e mette sul tavolino, senza dire niente, **un thermos di acciaio** con il tappo che si svita male. Poi porta le fette biscottate, la marmellata di albicocche, quattro fichi aperti a croce.

Poi si ferma, con il vassoio vuoto sotto il braccio, e guarda Claudia.

"Stanotte hai camminato," dice.

Non è una domanda. Claudia mette giù la tazza.

"Come lo sa."

"Perché il pavimento di sopra è di cotto e si sente tutto." Ada si sistema una ciocca. "E perché camminavi verso il mare, non verso il bagno."

Si siede. Ada delle Parracine, che ha una struttura da gestire e le lenzuola da cambiare in tre camere, alle otto meno dieci di un sabato di agosto si siede al tavolo dei clienti, e questo su un'isola vuol dire una cosa sola.

"Adesso mi ascoltate," dice. "Poi fate quello che volete, che siete grandi e non siete figli miei." Conta sulle dita, come Gaetano. "Uno: quest'anno l'acqua è alta. Nel pozzo della chiesa, a giugno, stava tre metri sotto; adesso sta uno e mezzo. Questo succede tre-quattro volte in un secolo e in paese quelli vecchi lo chiamano **la corda**."

"La corda."

"La corda. Perché tira." Secondo dito. "Due: quando c'è la corda, quelli che stanno sotto arrivano più su, e si sentono, e chiamano. E chiamano **per nome**, e chiamano chi ha paura dell'acqua, perché quelli hanno l'orecchio buono." Terzo dito. "Tre: dura una settimana, poi passa, e chi ha aspettato una settimana in casa non ha mai avuto niente."

Claudia dice: "E chi non ha aspettato?"

Ada guarda il thermos.

"Mia sorella non ha aspettato. Nel millenovecentonovantasette."

**(💪 TENUTA piena, mosse ricaricate, 🫁 Fiato +2. E il Quaderno registra tre cose enormi: la corda, che chiamano per nome chi ha paura dell'acqua, e che nel 1997 la sorella di Ada non ha aspettato. Nel 1997 sono scesi due sub e ne è tornato uno.)**`,
    fullHeal: true,
    recharge: true,
    gold: 2,
    item: 'caffe_parracine',
    sets: { sa_corda_spiegata: true, sa_sorella_ada: true, giorno_28_chiuso: true },
    stinger: 'heal',
    choices: [
      { text: '🗣 "Ada. Sua sorella era un sub?"', once: true, next: 'b12_sorella' },
      { text: '⛵ Il molo. Ciro aspetta alle nove', next: 'c0' },
    ],
  },

  b12_sorella: {
    location: 'bnb',
    caption: 'Le Parracine, ore 08:05 — la fotografia dentro il buffet',
    text: `Ada si alza, va dentro, torna con una cornice di legno che tiene per il vetro, con due dita, come si tiene una cosa che si guarda poco.

Nella foto ci sono due ragazze sul molo di Cala Rossano, con la maglietta della stessa marca, il taglio di capelli di metà anni Novanta e la faccia di due che ridono per una cosa detta un secondo prima. Quella a sinistra è Ada, giovane. Quella a destra ha la stessa faccia e cinque anni in meno.

"Marisa," dice Ada. "Faceva l'istruttrice al diving. Andava sotto meglio degli uomini." Appoggia la cornice sul tavolo, in piedi, contro la caffettiera. "Nell'agosto del novantasette c'era la corda, come adesso. E c'erano due francesi che volevano andare a vedere i muri sul fondo, quelli a quarantacinque metri, e non trovavano nessuno che ce li portasse."

"E lei ce li ha portati."

"Lei ce li ha portati." Ada raccoglie una briciola dal tavolo con l'unghia. "Sono scesi in tre. Sono tornati in due. Marisa e uno dei francesi." Alza gli occhi. "E il francese, quando è tornato, ha detto che erano scesi in tre e risaliti in due, e Marisa ha detto che erano scesi in **due** e risaliti in due, e che il terzo non è mai esistito, e che il francese era in narcosi."

Silenzio. La caffettiera fa il suo rumore.

"E chi aveva ragione?"

"Non lo so," dice Ada. "Marisa è stata bene per sei giorni. Il settimo si è messa a cantare una cosa e non la smetteva più. Poi il ventitré di settembre è uscita alle quattro di notte con la barca di nostro padre, e la barca l'hanno trovata a Punta Eolo, e lei no."

Prende la cornice e la rimette sotto il braccio, e prima di rientrare dice l'ultima frase, e la dice con un tono normalissimo, che è quello che vi resterà addosso:

"Quindi. Il caffè lo bevete tutto, il thermos lo portate, e se sentite qualcuno che vi chiama per nome **non rispondete**. Marisa ha risposto."

**(⚠️ Il Quaderno registra il 1997 per intero: la corda, i tre che sono scesi, i due che sono tornati, sei giorni di normalità e poi una canzone. E soprattutto la regola, detta da chi l'ha imparata nel modo peggiore: NON SI RISPONDE QUANDO CHIAMANO PER NOME.)**`,
    sets: { sa_marisa: true, sa_regola_non_rispondere: true },
    gold: 1,
    choices: [
      { text: '☕ Bere il caffè tutto, come ha detto lei. Fino in fondo', once: true, heal: 5, gold: 1, next: 'b12_caffe_tutto' },
      { text: '⛵ Il molo. Sono le nove meno dieci', next: 'c0' },
    ],
  },

  b12_caffe_tutto: {
    location: 'bnb',
    caption: 'Le Parracine, ore 08:20 — fino in fondo',
    text: `Bevono il caffè tutto, fino in fondo, anche la parte con la polvere, in silenzio, uno di fronte all'altro, come si prende una medicina.

Poi Claudia svita il thermos, controlla che sia pieno, lo avvita, e se lo mette nello zaino nella tasca laterale, quella dell'acqua, dove si prende senza guardare.

Ada, da dentro, con la voce di una che sta rifacendo un letto: "**E non rispondete.**"

"Non rispondiamo," dice Gaetano.

"Non ho sentito."

"NON RISPONDIAMO," dicono tutti e due, come due scolari, e Ada da dentro fa un verso che è quasi una risata, e per un secondo le Parracine sono solo un B&B con una signora simpatica e una terrazza coi limoni.

Poi escono nel sole, e sono le otto e venti di sabato ventinove agosto, e al molo di Cala Rossano c'è un vecchio con una lampara che li aspetta da mezz'ora perché sull'isola nove significa otto e mezza.

**(💪 TENUTA piena, 🫁 Fiato +1, il THERMOS nello zaino. La regola è ripetuta a voce due volte, e il gioco la registra: quando qualcuno vi chiamerà per nome — e vi chiamerà — vi ricorderete di aver promesso.)**`,
    fullHeal: true,
    gold: 1,
    item: 'caffe_parracine',
    sets: { promessa_non_rispondere: true },
    stinger: 'heal',
    choices: [
      { text: '⛵ Il molo. Ciro', next: 'c0' },
      { text: '🔧 Un ultimo controllo allo zaino: combinare quello che si può', next: 'b4_prepararsi' },
    ],
  },
};

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

/* ============ PANDATARIA — BLOCCO D: DOMENICA 30 AGOSTO ============
   IL GIORNO CHE NON FINISCE. Il 30 si ripete tre volte: G.flags.ciclo = 1, 2, 3.
   Ciclo 1 (d0 → d3):   una giornata normale e bellissima, con due dettagli sbagliati.
   Ciclo 2 (d4 → d9):   l'acqua è salita — è LA CORDA. L'isola sa che loro sanno.
   Ciclo 3 (d10 → d15): Ventotene è vuota, il traghetto è spento col portellone aperto.
   Entrata unica: d0 (dall'atto C). Uscite: SOLO l'atto E — e_vittoria, e_vittoria_muta,
   e_scambio, e_resta, e_coro, e_loop.
   Canone ereditato dagli atti A/B/C: la corda (NON SI RISPONDE), Marisa 1997, la fossa
   che nessuno ha misurato, la ninnananna in cinque strofe, il confine del Coro.
   Il silenzio (§10.7) è speso una volta sola qui: d13_stiva, l'ultima immersione.
   Le scene con `minigame` o `combat` hanno `choices: []`: l'engine le ignora.       */

const SCENE_D = {

  /* ==================== CICLO 1 — LA GIORNATA BELLA ==================== */

  d0: {
    location: 'alba',
    caption: 'Le Parracine — domenica 30 agosto, ore 07:10',
    stinger: 'heal',
    metri: 0,
    text: `Il ventilatore a pale gira piano. Entra un'aria che sa di limone e di sale, e sul muro sopra il letto c'è il rettangolo di sole che alle sette e dieci arriva sempre allo stesso posto.

Claudia dorme con una gamba fuori dal lenzuolo. E canta.

Piano, con la bocca chiusa, sul filo del respiro: tre note e una pausa, tre note e una pausa. Le stesse di stanotte. Le stesse di ieri notte.

Gaetano è sveglio da ventidue minuti e non si è mosso di un centimetro, perché sta facendo una cosa che non ha mai fatto in quarantun anni: sta controllando se il proprio corpo ha ancora ieri addosso.

Non ce l'ha. Niente sale nelle orecchie, niente bruciore agli occhi, le ginocchia intatte. I vestiti sono piegati sulla sedia come li piega lei, con la piega delle maniche in dentro.

Il costume di Claudia, steso sul davanzale, è **asciutto**.

> Claudia: *(senza aprire gli occhi, e la canzoncina si spegne a metà)* "Che ore sono."

> Gaetano: "Sette e dieci."

> Claudia: "Il traghetto?"

> Gaetano: "Cinque e mezza. Diciassette e trenta." *(e lo dice due volte, come se il numero avesse bisogno di una conferma)* "Da adesso sono dieci ore e venti minuti."

Claudia si mette a sedere e guarda la stanza: la sacca aperta, il phon che non serviva, il sacchetto dei taralli di ieri appallottolato sul tavolino.

E sul tavolino c'è anche la bottiglia dell'acqua. Un litro e mezzo. Ieri notte alle due ne hanno bevuto mezzo — lei direttamente dal collo, lamentandosi che era calda.

È piena. E l'anello di plastica sotto il tappo è **integro**.

> Claudia: "L'ha cambiata Ada."

> Gaetano: "Ada non entra in camera."

> Claudia: *(e se la rigira in mano come si rigira una cosa al supermercato, e poi la riappoggia esattamente dove stava)* "L'ha cambiata Ada, Gaetano." *(pausa)* "Ti va bene se oggi non facciamo niente di intelligente? Niente cisterne, niente misure, niente carcere."

> Gaetano: "Mi va bene."

E per un'ora e mezza è vero, e per un'ora e mezza è la vacanza più bella che abbiano fatto.

**(💪 TENUTA piena, mosse ricaricate: dentro le parracine si dorme. 🫁 Fiato +2. Il Quaderno registra la prima cosa sbagliata della mattina — la bottiglia col sigillo intatto — e ce n'è una seconda, più tardi, e sono due.)**`,
    gold: 2,
    fullHeal: true,
    recharge: true,
    sets: { d_ultimo_giorno: true, d_bottiglia: true, ciclo: 1 },
    choices: [
      { text: '📸 Fotografarla. Bottiglia, tappo, sigillo, con l\'ora sullo schermo', once: true, sets: { d_prova: true }, next: 'd0_dettaglio' },
      { text: '🧳 Cominciare a mettere le cose nella sacca: c\'è tutto il tempo del mondo', once: true, sets: { d_valigie: true }, next: 'd0_dettaglio' },
      { text: '☕ Giù: la moka di Ada, la terrazza, il mare', gold: 1, next: 'd1_colazione' },
      { text: '🫂 Dieci minuti così. Senza alzarsi, senza dire niente', once: true, heal: 4, gold: 1, next: 'd1_colazione' },
    ],
  },

  d0_dettaglio: {
    location: 'bnb',
    caption: 'La stanza — ore 07:40, la sacca aperta sul letto',
    metri: 0,
    text: `Fare la sacca l'ultimo giorno è la cosa più triste che sa fare una vacanza: si piega la stessa maglietta che tre giorni fa era una promessa.

Claudia infila il phon in fondo. Gaetano arrotola i cavi come li arrotola lui, in otto, con l'elastico. E mentre arrotola, senza guardarla, le fa la domanda che si è preparato mentre lei dormiva.

> Gaetano: "Sai che canti?"

> Claudia: "Come."

> Gaetano: "Nel sonno. Da due notti." *(un giro di cavo)* "Sempre la stessa. Sempre le stesse tre note e la pausa."

Claudia resta con la maglietta a mezz'aria.

> Claudia: "Fammela sentire."

> Gaetano: "Non l'ho registrata."

> Claudia: *(e lo guarda, e lo conosce da dieci anni)* "Gaetano."

> Gaetano: *(e cede subito, perché con lei ha smesso di provarci)* "L'ho registrata."

Ventidue secondi di telefono appoggiato sul comodino. C'è il ventilatore, c'è una cicala, e c'è una donna di quarant'anni che dorme e canta in napoletano, con la voce che le viene fuori un tono sotto il suo, la stessa strofa in circolo.

Claudia ascolta tutto. Poi si siede sul bordo del letto con il telefono in mano.

> Claudia: "Io quella canzone la so."

> Gaetano: "Da dove."

> Claudia: "Da lei. Me l'ha insegnata lei." *(e la voce non trema, e questa è la parte che fa più paura)* "Cinque strofe, Gaetà. Me ne ricordo cinque, e non le ho mai imparate da sveglia."

**(Il Quaderno registra: Claudia canta nel sonno da due notti, e sa cinque strofe di una ninnananna che nessuno le ha insegnato. 🫁 Fiato +1: dirsi le cose, in questa storia, tiene in piedi la baracca.)**`,
    gold: 1,
    sets: { d_canta_nel_sonno: true },
    choices: [
      { text: '🎧 Riascoltarla insieme, tutta, e provare a scrivere le parole', once: true, sets: { d_strofe_scritte: true }, gold: 1, next: 'd1_colazione' },
      { text: '☕ Spegnere il telefono e scendere a colazione: è l\'ultimo giorno', heal: 3, next: 'd1_colazione' },
    ],
  },

  d1_colazione: {
    location: 'terrazza',
    caption: 'La terrazza delle Parracine — ore 08:20',
    metri: 0,
    text: `Ada porta la moka, il pane con la marmellata di fichi che fa lei, e due albicocche in un piattino perché "quelle di ieri erano acerbe e mi è rimasto il magone".

Il mare, da lassù, è una lastra. Santo Stefano è appoggiato all'orizzonte e per la prima volta in tre giorni nessuno dei due lo guarda.

> Ada: "E allora oggi partite."

> Claudia: "Alle cinque e mezza."

> Ada: "Il libeccio non c'è, quindi parte. Se c'è libeccio non parte e vi tocca restare." *(versa il caffè, prima a Claudia)* "L'anno scorso una coppia di Bologna è rimasta tre giorni in più. Piangevano. Poi non volevano andarsene più."

Il caffè è quello di Ada: denso, forte, di quelli che ti raddrizzano la schiena e ti levano una cosa dalla testa.

Giù per la scaletta passa la signora dei fagiolini col catino sotto il braccio. Alza gli occhi, li vede, e dice la frase che ha detto giovedì.

> La signora: "Buongiorno. Turisti?"

> Gaetano: "Ci andiamo oggi, signora. Alle cinque e mezza."

> La signora: *(un fagiolino nel catino)* "Buoni, quelli. Brava gente." *(un altro)* "Fate i bagni dove **c'era** la gente."

Riprende la scaletta. Il catino cigola. Gaetano ha la tazzina a mezz'aria.

> Claudia: "Ha detto c'era."

> Gaetano: "Ha detto c'è. Ha l'accento chiuso, mangia le vocali—"

> Claudia: *(e non alza la voce, che è la cosa peggiore)* "Gaetà. Io il montaggio lo faccio a fotogrammi. Ha detto **c'era**, e l'ha detto al passato di una cosa che deve ancora succedere stasera."

Ada, dalla porta, si è girata a guardare la scaletta dove non c'è più nessuno. Poi rientra in cucina e dice, senza rivolgersi a nessuno in particolare, la cosa che vi ha già detto una volta:

> Ada: "Finché è aperta, non si risponde."

**(🫁 Fiato +2, 💪 TENUTA +6: il caffè di Ada è la cosa più concreta dell'isola. Il Quaderno registra la seconda cosa sbagliata della mattina — e con questa fanno due.)**`,
    gold: 2,
    heal: 6,
    sets: { d_fagiolini: true },
    choices: [
      { text: '🥨 Farsi mettere in tasca un sacchetto di taralli per la giornata', once: true, item: 'taralli', gold: 1, next: 'd2_paese' },
      { text: '📅 Chiedere ad Ada, ridendo, che giorno è oggi', once: true, sets: { d_chiesto_giorno: true }, gold: 1, next: 'd2_paese' },
      { text: '🏖 Basta. Costume, telo, e giù in paese: si va a buttare via una giornata', next: 'd2_paese' },
    ],
  },

  d2_paese: {
    location: 'paese',
    caption: 'Ventotene, l\'ultimo giorno — dalle 10:00 alle 16:30',
    metri: 0,
    text: `E poi la giornata è **bella**. Bella come le giornate che uno si ricorda a settant'anni.

Piazza Castello alle dieci: i vecchi schierati sulle panchine, il tabaccaio che discute di calcio con uno che passa in motorino senza fermarsi, quattro bambini che si tirano una palla contro il muro della chiesa e uno che urla "MANO!" ogni volta.

Pranzo alla **Marisqueria**: gamberi crudi, un litro di bianco freddo, due ore buttate via nel modo migliore possibile. Claudia racconta al cameriere la storia della boa gialla e il cameriere gliela fa raccontare due volte.

Pomeriggio a **Cala Nave**. Arrivano fino alla boa e restano attaccati alla plastica gialla, calda di sole, a non dire niente per due minuti.

Ed è lì, con l'orecchio a dieci centimetri dall'acqua, che Claudia sente il proprio nome.

Non forte. Non minaccioso. Detto come lo dice una persona che ti conosce, da sotto, a una profondità che da qui è ventidue metri:

> *Claudia.*

Le mani sulla plastica gialla diventano bianche sulle nocche.

> Gaetano: "Che c'è."

> Claudia: *(a labbra strette, e non gira la testa verso l'acqua)* "Niente. Niente. Torniamo a riva."

---

Alle quattro e mezza, risalendo verso il paese col telo sulle spalle, Gaetano si ferma davanti all'orologio della piazza.

> Gaetano: "Ferma. Sono undici minuti che segna le sedici e ventisette. Il secondario gira e non porta il minuto."

Gira davvero: fa il suo giro, torna, e sono ancora le sedici e ventisette. Poi la campana della chiesa batte le cinque, l'orologio fa scattare il minuto, e sono le sedici e ventotto.

**(🫁 Fiato +2, 💪 TENUTA +8: una giornata come si deve, e vi serviranno tutte e due. ⚠️ Attenzione del Coro +1. Il Quaderno registra: un minuto durato dodici minuti, e una voce che ha chiamato Claudia per nome dal fondo di Cala Nave.)**`,
    gold: 2,
    heal: 8,
    attenzione: 1,
    sets: { d_ora_ferma: true, d_chiamata_per_nome: true },
    choices: [
      { text: '🤐 Non rispondere. Uscire dall\'acqua e non dirlo nemmeno a lui, per adesso', once: true, gold: 1, next: 'd3_traghetto' },
      { text: '🗣 Rispondere. Mettere la faccia sotto e dire "sono qui"', once: true, damage: 4, sets: { ha_risposto: true }, tag: '⚠️ Ada ve l\'ha detto due volte: non si risponde', next: 'd3_traghetto' },
      { text: '⏱ Cronometrare la campana contro l\'orologio del telefono, fino in fondo', once: true, sets: { d_ora_misurata: true }, gold: 1, next: 'd3_traghetto' },
      { text: '⚓ Alla banchina. Sono le cinque meno un quarto', next: 'd3_traghetto' },
    ],
  },

  d3_traghetto: {
    location: 'porto',
    caption: 'Porto Romano, banchina — ore 17:30',
    stinger: 'coro',
    metri: 0,
    text: `L'imbarco delle diciassette e trenta è un casino allegro: sessanta persone con le borse frigo, due cani, un carrello di cassette di pesce, e il marinaio che urla i biglietti come si urlano i numeri della tombola.

Salgono. Trovano posto a poppa, sulla panchina di dritta, quella che prende il vento.

Il portellone si chiude col colpo di lamiera che si sente in tutta la baia. Le cime vengono mollate. L'acqua sotto la poppa diventa bianca.

**E il traghetto parte.**

Parte davvero, e Gaetano lo verifica come verifica tutto, cioè misurando: la banchina si allontana, il campanile cambia angolo, le case gialle si stringono una sull'altra. A due minuti Ventotene è già una cosa che si guarda tutta insieme, e Santo Stefano le è scivolato accanto.

> Claudia: *(la testa sulla sua spalla, gli occhi chiusi, la voce di una che sta per dormire)* "L'abbiamo fatta."

> Gaetano: "L'abbiamo fatta."

> Claudia: "Alla boa ci sono arrivata due volte, Gaetà. Due."

> Gaetano: "Tre. Ieri mattina."

> Claudia: *(un sorriso con gli occhi chiusi)* "Tre."

Il motore fa il suo rumore grosso e regolare. Il sole è basso a destra. Claudia si addormenta sulla sua spalla in quel modo che fa lei, con la bocca che si apre un millimetro. E canta, piano, tre note e una pausa.

Gaetano resta a guardare l'isola che diventa piccola.

Diventa piccola.

Diventa piccola.

E poi il ventilatore a pale gira piano, ed entra un'aria che sa di limone e di sale.

**(⚠️ Non c'è niente da segnare. Nessun oggetto, nessun indizio, nessun danno, nessun mostro. È esattamente questo il problema.)**`,
    choices: [
      { text: '🌅 Restare in coperta a guardare l\'isola che se ne va', gold: 1, next: 'd4_ciclo2' },
      { text: '☕ Scendere al bar del traghetto: due caffè e un cornetto di plastica', heal: 3, gold: 1, next: 'd4_ciclo2' },
    ],
  },

  /* ==================== CICLO 2 — L'ISOLA SA CHE LORO SANNO ==================== */

  d4_ciclo2: {
    location: 'alba',
    caption: 'Le Parracine — domenica 30 agosto, ore 07:10 (di nuovo)',
    stinger: 'voce_amata',
    metri: 0,
    text: `Sono svegli tutti e due. Da subito. Nessuno dei due ha aperto gli occhi piano.

Il rettangolo di sole è sul muro sopra il letto, nello stesso punto, con lo stesso taglio della tenda in mezzo. Il ventilatore gira. Il costume sul davanzale è asciutto.

Nessuno parla per quarantadue secondi, e Gaetano li conta, perché contare è l'unica cosa che gli impedisce di urlare.

> Claudia: "Non lo dire."

> Gaetano: "Devo dirlo."

> Claudia: "Se lo dici diventa vero."

> Gaetano: "È vero da prima che lo dicessi. Sono le sette e dieci di domenica trenta agosto e noi ieri sera eravamo a bordo."

Claudia si tira su a sedere col lenzuolo in mano, e la sua faccia non è quella di una che ha paura: è quella di una montatrice davanti a un girato che non torna.

> Claudia: "Ok. Dimmi cosa ricordi."

> Gaetano: "Panchina di dritta a poppa. Il portellone. Le cime. Tu che ti addormentavi e mi dicevi 'l'abbiamo fatta'. Il campanile che cambiava angolo — l'ho misurato a occhio contro il pollice."

> Claudia: *(e adesso ha la voce bassissima)* "Io ricordo il tuo maglione che sapeva di sale. E ricordo che mi hai detto tre volte, non due. La boa. **Tre**."

> Gaetano: "Te l'ho detto."

> Claudia: "Me l'hai detto. Quindi non è un sogno mio."

Si guardano. Sul tavolino c'è una bottiglia d'acqua da un litro e mezzo, piena, col sigillo intatto. Nella sacca, piegata, c'è la maglietta che ieri Claudia ha piegato due volte.

E dal piano di sotto, dalla cucina, si sente Ada che mette la moka sul fuoco.

**(🫁 Fiato +2. Il Quaderno registra: il 30 agosto è ricominciato, e vi ricordate tutto. Gli oggetti sono nello zaino, gli indizi nel Quaderno, le ricette in testa: il giorno si riavvolge, voi no. E quello che oggi era chiuso, oggi è aperto.)**`,
    gold: 2,
    sets: { ciclo1_fatto: true, ciclo: 2 },
    choices: [
      { text: '📷 Riguardare la foto della bottiglia di stamattina — di STAMATTINA', requires: { flag: 'd_prova' }, once: true, sets: { d_prova_regge: true }, gold: 1, next: 'd5_ada' },
      { text: '🧾 Cercare il biglietto nella sacca e guardare il tagliando', once: true, sets: { d_biglietto_intero: true }, next: 'd5_ada' },
      { text: '🫂 Dirlo ad alta voce, in faccia all\'altro: "sta succedendo, e non siamo pazzi"', once: true, heal: 5, gold: 2, next: 'd5_ada' },
      { text: '☕ Giù da Ada. Adesso', next: 'd5_ada' },
    ],
  },

  d5_ada: {
    location: 'bnb',
    caption: 'La cucina delle Parracine — ore 07:55',
    metri: 0,
    text: `Ada è girata verso il fuoco. La moka borbotta. Sul tavolo ci sono tre tazzine, e nessuno le ha detto che scendevano in due.

Si gira. E li **guarda**: uno sguardo che dura mezzo secondo di troppo — quel mezzo secondo in cui una faccia sta decidendo qualcosa e non lo dice — e poi torna la faccia di Ada, quella di sempre.

> Ada: "Stamattina il mare è salito di uno scalino a Cala Nave." *(posa la caffettiera)* "Non è la marea: qua la marea è quattro dita. È salito di uno scalino, e ieri era piano."

> Gaetano: "È la corda."

> Ada: *(e per la prima volta si siede al tavolo con loro)* "È la corda. Tre, quattro volte in cent'anni. Dura una settimana, dieci giorni, poi l'acqua torna giù e non se ne parla più." *(gira lo zucchero e non beve)* "Mentre è aperta, quelli di sotto chiamano. E chiamano per nome, e chiamano sempre gli stessi: quelli che hanno paura dell'acqua." *(alza gli occhi su Claudia)* "A me non mi ha chiamata mai, signora. In sessant'anni, mai. Io il mare me lo mangio."

> Claudia: "Ieri mi ha chiamata."

> Ada: "Lo so."

Poi tira fuori dal cassetto della credenza una fotocopia piegata in quattro: l'elenco d'imbarco del piroscafo **Santa Lucia**, 24 ottobre 1943, molo di Napoli. Centoquarantasei nomi a macchina. E in fondo, uno aggiunto **a penna**, di fretta, con la biro che ha bucato la carta: *Assuntina, a. 6, c/o madre.*

> Ada: "Ve l'ho chiesta ieri al Comune, che ho una cugina all'anagrafe. Ve l'ho chiesta perché ieri mi avete fatto una domanda e stanotte non ho dormito." *(e adesso ha le mani ferme sul tavolo)* "E allora mo' ve la dico, la regola, per la seconda volta, e poi non ve la dico più: **non si risponde**. Non importa chi vi chiama, non importa con che voce. Non si risponde e non si scende."

> Claudia: "A qualcuno l'ha già detto, questa cosa."

> Ada: *(e ci mette un tempo lungo)* "A mia sorella. Marisa." *(si alza, prende le tazzine, e la conversazione è finita)* "Marisa faceva l'istruttrice di sub. Nel novantasette."

**(Oggetto: la LISTA D'IMBARCO. 🫁 Fiato +1. Il Quaderno registra: si chiama LA CORDA, l'acqua sale, chi sta sotto chiama per nome chi ha paura — e non si risponde. E c'era una sorella, e si chiamava Marisa.)**`,
    item: 'lista_imbarco',
    gold: 1,
    sets: { i_nome_lista: true, d_acqua_alta: true, sa_la_corda: true, sa_di_marisa: true },
    choices: [
      { text: '🧂 "Signora, ci regala un chilo di sale grosso e un barattolo vuoto?"', once: true, item: 'sale_grosso', gold: 1, next: 'd1_colazione_bis' },
      { text: '🗒 [Ciro] Portare la lista a Ciro: i nomi di quest\'isola li sa leggere lui', requires: { hero: 'ciro' }, once: true, sets: { nome_letto_da_ciro: true }, gold: 1, next: 'd1_colazione_bis' },
      { text: '📱 [Gaetano] La traccia di ieri pomeriggio alla boa. Registra sempre, e ieri registrava', requires: { flag: 'ha_risposto' }, once: true, next: 'd5_voce_registrata' },
      { text: '🕳 Alla cisterna dei Detenuti: oggi la porta dietro la chiesa è aperta', next: 'd1_colazione_bis' },
    ],
  },

  /* IL DEBITO DELLA VOCE. `ha_risposto` era il flag piu disobbediente del gioco — lo
     imposta la scelta «Rispondere. Mettere la faccia sotto e dire sono qui», con il tag
     che avverte «Ada ve l'ha detto due volte» — e nessuna scena lo leggeva mai. Zero
     occorrenze in tutti i draft. Cioe: la regola che questo gioco ripete piu di ogni
     altra (Ada due volte, Ciro come regola tre, la signora dei fagiolini con «nun e
     isso ca te chiamma», la ninnananna che e letteralmente l'istruzione per l'uso) era
     l'unica che si potesse infrangere GRATIS.
     E la collana di Giulia promette «una voce ti risparmia» senza dire mai quale voce
     lascia fuori: una protezione senza buco dichiarato non fa paura, fa comodo. Qui il
     buco viene detto in faccia, e il debito ha un modo di essere pagato — cantare la
     seconda strofa ad Assuntina, perche chi la canta smette di essere uno che e stato
     chiamato e diventa uno che e venuto. */
  d5_voce_registrata: {
    location: 'bnb',
    caption: 'La stanza — ore 08:05, la traccia di ieri',
    stinger: 'voce_amata',
    metri: 0,
    /* Niente `requires` sulla scena: il motore lo legge sulle SCELTE, non sulle scene, e
       il validatore lo segnala come dato morto (giustamente). Il cancello sta dove deve
       stare: sulla scelta in d5_ada, che chiede `ha_risposto`. Chi non ha risposto non
       vede la strada e non sa che questa scena esiste. */
    text: `È Gaetano che ci arriva, e ci arriva per il motivo peggiore: perché registra sempre, e perché ieri pomeriggio a Cala Nave aveva il telefono nella custodia stagna dentro il costume.

Un file di quattro minuti e dodici, con l'ora nel nome: 15:12 di un pomeriggio che oggi non esiste più.

Si sente il mare contro la plastica della boa. Si sente lei che respira col naso. Si sente la sua voce, sotto il pelo dell'acqua, che dice due parole.

> *«Sono qui.»*

Poi, a quattro decimi di secondo — non uno: quattro decimi, e li misura tre volte perché tre volte è un dato — la stessa frase, la stessa voce, la stessa cadenza, la stessa erre di Claudia:

> *«Sono qui.»*

> Claudia: "L'ho detto una volta."

> Gaetano: "Lo so."

> Claudia: "Gaetano. Io l'ho detto **una volta**."

Lui non fa il numero, non fa la spiegazione, non prova a girarla. Mette il telefono a faccia in giù sul comodino e le dice l'unica cosa vera che ha.

> Gaetano: "La seconda non l'hai detta tu. La seconda ce l'hanno loro, e adesso sanno come suona la tua voce quando dice sì."

Claudia si porta la mano alla medaglietta di bronzo che ha al collo. È fredda, esattamente della temperatura dell'aria, come è stata sempre.

> Claudia: "E questa?"

> Gaetano: "Questa ti fa risparmiare da una voce del Coro. Giulia riconosce il suo nome e ti lascia passare, e lo fa una volta." *(e sceglie la verità, perché con lei ha smesso di fare altrimenti)* "Ma quella che ti viene a prendere non è una voce del Coro, Claudia. È la tua. E la collana non c'entra niente con la tua voce."

**(⚠️ IL DEBITO DELLA VOCE. Il vostro sì è registrato su un nastro che non è il vostro. La collana di Giulia continua a fare esattamente quello che ha promesso — una voce, una volta — e adesso sapete anche cosa NON copre. 💪 TENUTA −3, 🎵 Attenzione del Coro +1. Si paga una volta, e c'è un modo.)**`,
    damage: 3,
    attenzione: 1,
    sets: { debito_di_voce: true },
    choices: [
      { text: '🗑 Cancellare il file. Adesso, tenendo premuto, guardando la barretta', once: true, damage: 2, sets: { file_cancellato: true }, next: 'd1_colazione_bis' },
      { text: '🎧 Riascoltare il secondo «sono qui» dieci volte e imparare in cosa è diverso', once: true, gold: 1, sets: { sa_dove_sbaglia: true }, next: 'd1_colazione_bis' },
      { text: '🫂 Dirlo ad alta voce tutti e due: "ho risposto io, e non lo rifaccio"', once: true, heal: 4, sets: { risposta_ammessa: true }, next: 'd1_colazione_bis' },
      { text: '🕳 Alla cisterna dei Detenuti. Adesso, prima di pensarci', next: 'd1_colazione_bis' },
    ],
  },

  /* LA COLAZIONE DEL SECONDO GIRO. Il testo e quello di d1_colazione parola per parola —
     Ada, il libeccio, la coppia di Bologna che piangeva, la signora dei fagiolini col suo
     «c'era» — e cambia esattamente un dato misurabile: un'albicocca invece di due, con la
     stessa battuta identica sul magone. La ripetizione e uno strumento di misura, e va
     spesa con l'accetta: qui e in d10_ciclo3, e mai piu.
     Ed e l'UNICO posto del gioco in cui l'Attenzione del Coro SCENDE, perche la passiva
     di Gaetano dice che ogni cosa misurata gli fa perdere una nota, e questa e la prima
     volta che il gioco la applica al tempo invece che a un mostro. */
  d1_colazione_bis: {
    location: 'terrazza',
    caption: 'La terrazza delle Parracine — ore 08:20 (di nuovo)',
    metri: 0,
    text: `Ada porta la moka, il pane con la marmellata di fichi che fa lei, e **un'albicocca** in un piattino perché "quelle di ieri erano acerbe e mi è rimasto il magone".

Il mare, da lassù, è una lastra. Santo Stefano è appoggiato all'orizzonte e per la prima volta in tre giorni nessuno dei due lo guarda.

> Ada: "E allora oggi partite."

> Claudia: "Alle cinque e mezza."

> Ada: "Il libeccio non c'è, quindi parte. Se c'è libeccio non parte e vi tocca restare." *(versa il caffè, prima a Claudia)* "L'anno scorso una coppia di Bologna è rimasta tre giorni in più. Piangevano. Poi non volevano andarsene più."

Il caffè è quello di Ada: denso, forte, di quelli che ti raddrizzano la schiena e ti levano una cosa dalla testa.

E il rumore del caffè che cade nella tazzina arriva **prima** che Ada inclini la caffettiera. Non di molto: di quel poco che si sente e non si può dimostrare, lo stesso poco dell'eco nella seconda cisterna.

Giù per la scaletta passa la signora dei fagiolini col catino sotto il braccio. Alza gli occhi, li vede, e dice la frase che ha detto giovedì.

> La signora: "Buongiorno. Turisti?"

> Gaetano: "Ci andiamo oggi, signora. Alle cinque e mezza."

> La signora: *(un fagiolino nel catino)* "Buoni, quelli. Brava gente." *(un altro)* "Fate i bagni dove **c'era** la gente."

Riprende la scaletta. Il catino cigola. Gaetano ha la tazzina a mezz'aria.

> Claudia: "Ha detto c'era."

> Gaetano: "Ha detto c'è. Ha l'accento chiuso, mangia le vocali—"

E si ferma. Non perché lei lo guardi: lei non lo sta guardando. Si ferma perché ha sentito la propria voce fare una cosa che la propria voce ha già fatto.

> Gaetano: "L'ho già detto."

> Claudia: "Parola per parola." *(mette giù la tazzina senza rumore)* "Anche l'accento chiuso. Anche le vocali."

Nel piattino c'è un'albicocca. Ieri erano due, e la frase sul magone era la stessa.

Ada, dalla porta, si è girata a guardare la scaletta dove non c'è più nessuno. Poi rientra in cucina e dice, senza rivolgersi a nessuno in particolare, la cosa che vi ha già detto due volte.

> Ada: "Finché è aperta, non si risponde."

**(🫁 Fiato +2, 💪 TENUTA +6: il caffè di Ada resta la cosa più concreta dell'isola anche il secondo giro. Il Quaderno registra la differenza esatta di stamattina — un'albicocca invece di due, e il caffè che si sente cadere prima di cadere. Non è il giorno che si ripete male: è che si ripete BENE, e a sbagliare siete voi.)**`,
    gold: 2,
    heal: 6,
    sets: { d_colazione_bis: true },
    choices: [
      { text: '📹 Filmare la signora e sovrapporre l\'audio di ieri sulla stessa traccia: due «c\'era» a confronto', once: true, next: 'd1_confronto' },
      { text: '🥨 Farsi mettere in tasca il sacchetto di taralli, come ieri, con le stesse parole', once: true, item: 'taralli', gold: 1, next: 'd6_cisterna' },
      { text: '🍑 Chiedere ad Ada dov\'è la seconda albicocca', once: true, damage: 2, sets: { d_albicocca_chiesta: true }, next: 'd6_cisterna' },
      { text: '🕳 Alla cisterna dei Detenuti: oggi la porta dietro la chiesa è aperta', next: 'd6_cisterna' },
    ],
  },

  /* IL CONFRONTO. La scelta prometteva di sovrapporre due tracce audio, e una scelta che
     promette deve mantenere: qui la promessa e la scena. E questo e l'UNICO punto del
     gioco in cui l'Attenzione del Coro SCENDE, perche la passiva di Gaetano dice che ogni
     cosa misurata gli fa perdere una nota — e finora il gioco l'aveva applicata solo ai
     mostri, mai al tempo. Nota tecnica: `attenzione` il motore la legge sulle SCENE, non
     sulle scelte (il validatore me l'ha bocciata), e va bene cosi: un effetto del genere
     merita un posto dove accade. */
  d1_confronto: {
    location: 'terrazza',
    caption: 'La terrazza — le due tracce, una sopra l\'altra',
    metri: 0,
    text: `Ci vogliono quattro minuti col telefono appoggiato al muretto, e Gaetano li fa senza dire una parola: allinea l'audio di giovedì con quello di stamattina sulla stessa traccia, sposta di qualche fotogramma, e mette il volume basso perché non serve alto.

Le due «c'era» partono insieme.

Non è che si assomigliano: **è la stessa**. Stessa durata, stessa cadenza, stesso cigolio del catino a un decimo di secondo dopo, stesso respiro della signora prima della parola. Due registrazioni fatte a tre giorni di distanza che si sovrappongono come una sola.

> Claudia: *(che di mestiere fa questo, e quindi lo dice come lo direbbe a un cliente)* "Non è una persona che ripete una frase. È la stessa frase, rimessa."

> Gaetano: "Ventidue fagiolini. Li ho contati giovedì perché non avevo niente da fare e li ho contati adesso perché avevo paura." *(mette giù il telefono)* "Ventidue e ventidue."

E succede una cosa che in tre giorni non era mai successa: per un momento il rumore di fondo — quello che c'è sempre, sotto tutto, da giovedì pomeriggio — **si abbassa**. Non finisce. Si abbassa, come si abbassa una radio quando qualcuno in casa alza la voce.

Perché una cosa misurata è una cosa che ha perso una nota.

**(🫁 Fiato +1. 🎵 Attenzione del Coro −1, e in tutto il gioco succede solo qui: gli avete dato un numero e il numero non si discute. Il Quaderno registra ventidue fagiolini giovedì e ventidue stamattina.)**`,
    gold: 1,
    attenzione: -1,
    sets: { d_loop_misurato: true, d_fagiolini_contati: true },
    choices: [
      { text: '🕳 Alla cisterna dei Detenuti. Con il telefono in tasca e un numero in testa', next: 'd6_cisterna' },
    ],
  },

  d6_cisterna: {
    location: 'cisterna',
    caption: 'Cisterna dei Detenuti, dietro Santa Candida — ore 09:30',
    stinger: 'coro',
    attenzione: 1,
    text: `La porta dietro la chiesa oggi è aperta. Non forzata: **aperta**, col lucchetto appeso alla catena, chiuso, e la catena passata dentro il nulla.

Ventidue gradini di tufo, e la temperatura crolla di dieci gradi in dieci secondi.

La cisterna dei Detenuti è una nave rovesciata: quattro navate scavate nel tufo, pilastri quadrati, volte a botte, e il **cocciopesto** romano ancora attaccato ai muri per due metri d'altezza, rosa di coccio pestato, liscio come una vasca da bagno.

Sul fondo c'è l'acqua. Giovedì era una pozza alta un dito.

Oggi arriva alle caviglie, ed è ferma in un modo in cui l'acqua ferma non è.

> Gaetano: "Serve un dato. Uno buono, e poi ci ragioniamo."

Tira fuori il telefono, apre il registratore, lo appoggia in terra su un fazzoletto. Poi si mette in mezzo alla navata centrale, si porta due dita alla bocca e **fischia**: un fischio secco, corto, da campetto.

Il fischio parte. Torna. Ritorna. E continua a tornare.

> Claudia: "Quanto dura?"

> Gaetano: *(guardando la forma d'onda che non smette)* "Sta ancora durando."

Undici secondi di coda dentro una stanza di trenta metri. La cattedrale di Colonia ne fa otto.

> Gaetano: "Ok. I conti li faccio a voce, che a voce non sbaglio. Rispondi tu, che se conto e parlo insieme perdo il filo."

**(🧮 Si gioca: il conto del riverbero. Tre domande, venti secondi l'una, ad alta voce e insieme. Al Coro la precisione fa male — ma sbagliare, qua sotto, non è gratis: c'è una cosa che ascolta anche la matematica.)**`,
    minigame: {
      type: 'calcolo',
      success: 'd6_eco',
      fail: 'd7_sbaglia',
      tag: 'Il conto del riverbero — tre domande, 20 secondi l\'una, servono 2 giuste',
      config: {
        titolo: '🧮 Undici secondi',
        secondi: 20,
        domande: [
          { q: 'Il fischio torna la prima volta dopo 0,18 secondi. Il suono in aria fa 340 metri al secondo. Andata e ritorno: quanti metri ha fatto?', r: [{ t: '61 metri', ok: true }, { t: '31 metri' }, { t: '6,1 metri' }] },
          { q: 'Quindi la parete più lontana, da dove sta Gaetano, quanto dista?', r: [{ t: 'Trenta metri e mezzo', ok: true }, { t: 'Sessantun metri' }, { t: 'Quindici metri' }] },
          { q: 'La coda dura 11 secondi: in 11 secondi il suono fa 3.740 metri. Rimbalzando avanti e indietro tra due pareti a 30 metri, quanti rimbalzi sono?', r: [{ t: 'Una sessantina', ok: true }, { t: 'Undici, uno al secondo' }, { t: 'Tre o quattro' }] },
        ],
      },
      hero: 'gaetano',
    },
    choices: [],
  },

  d6_eco: {
    location: 'cisterna',
    caption: 'Il numero — ore 09:52',
    attenzione: 1,
    text: `Il conto torna. Torna perfettamente, ed è per questo che è insostenibile.

> Gaetano: "Trenta metri e mezzo di parete. Sessanta rimbalzi per fare undici secondi di coda. Ma un rimbalzo sul cocciopesto **perde** energia: dopo venti sei sotto la soglia dell'udibile." *(alza gli occhi dallo schermo)* "Per fare sessanta rimbalzi udibili questa stanza deve essere lunga tre volte tanto. Novanta metri. E questa stanza è lunga trenta."

> Claudia: "Quindi?"

> Gaetano: "Quindi il suono, qua dentro, rimbalza in un posto tre volte più grande di questo posto." *(e adesso lo dice piano)* "C'è un'altra stanza attaccata a questa, Claudia. E non è murata bene."

Claudia non risponde. Sta guardando l'acqua alle caviglie.

> Claudia: "Rifallo. Ma non guardare me: guarda il telefono."

Gaetano fischia.

E sulla forma d'onda, sullo schermo, davanti a due paia di occhi, l'eco compare **quattro centesimi prima del fischio**.

Prima. Non dopo. La risposta è registrata quattro centesimi di secondo prima della domanda.

> Gaetano: *(la voce di uno che legge un valore fuori scala)* "Meno zero virgola zero quattro."

> Claudia: "Cosa vuol dire."

> Gaetano: "Vuol dire che quella non è un'eco. Le eco vengono dopo." *(chiude il registratore con due dita che non gli obbediscono del tutto)* "Quella lì sapeva che stavo per fischiare."

**(🫁 Il Quaderno registra DUE indizi: l'eco misurata — undici secondi di riverbero in una stanza di trenta metri — e la seconda cisterna, quella che risponde PRIMA. ⚠️ Attenzione del Coro +1.)**`,
    sets: { i_eco_misurata: true, i_seconda: true },
    choices: [
      { text: '🎙 Calare l\'idrofono nell\'acqua e sentire cosa c\'è sotto lo scalino', requires: { item: 'idrofono' }, once: true, sets: { idrofono_calato: true }, goldLoss: 1, next: 'd7_ninna' },
      { text: '👂 Stare fermi. Zitti. Solo ascoltare, senza strumenti, per un minuto', once: true, gold: 1, next: 'd7_ninna' },
      { text: '🔦 In fondo alla quarta navata, dove la volta scende sull\'acqua', goldLoss: 2, next: 'd7_ninna' },
    ],
  },

  d7_ninna: {
    location: 'cisterna',
    caption: 'La quarta navata — ore 10:20',
    stinger: 'coro',
    text: `In fondo alla quarta navata la volta scende fino a mezzo metro dall'acqua, e l'acqua entra sotto la roccia e continua.

Da lì viene.

Non è più una nota sola: è una **voce**, e la voce ha sei anni. Canta piano, con l'intonazione un po' calante dei bambini che ripetono una cosa sentita da un'adulta.

E Claudia canta con lei.

Comincia senza accorgersene, sottovoce, sulla seconda parola, e sta cantando da otto secondi quando Gaetano le mette una mano sul braccio e lei si ferma di colpo e si porta le dita alla bocca come una che si è scottata.

> Claudia: "Non me ne sono accorta."

> Gaetano: "Lo so."

> Claudia: "Gaetano, non me ne sono **accorta**."

Restano fermi. La voce piccola, sotto la volta, va avanti da sola: arriva in fondo alla strofa, e sull'ultima parola l'acqua se la mangia.

> Gaetano: "Le parole. Devi darmi le parole esatte, e per esatte intendo esatte: se il Quaderno se le scrive sbagliate non valgono niente."

> Claudia: *(che si è appoggiata al pilastro con tutte due le mani, e ha la faccia concentratissima di una che sta ricostruendo un montaggio)* "Le prime due righe le so. La terza me la ricordo dal sonno e mi manca l'ultima parola." *(e si gira verso il buio)* "E l'ultima parola è quella che conta, perché è quella che dice cosa succede."

> Gaetano: "E se la sbagli?"

> Claudia: "Se la sbaglio, quella capisce che non la conosco."

**(🎵 Si gioca: completate il verso. Ad alta voce, tutti insieme, come si canta una ninnananna. Una parola sola. Se è quella giusta, il Quaderno si scrive la prima strofa — e voi capite perché Ada ve l'ha detto due volte.)**`,
    minigame: {
      type: 'filastrocca',
      success: 'd7_ninna_ok',
      fail: 'd7_sbaglia',
      tag: 'La prima strofa — manca l\'ultima parola',
      config: {
        titolo: '🎵 La ninnananna di Assuntina',
        versi: 'Nonna nonna, ninna nonna,\nchi sta sott\' nun torna sola:\nse porta appriess\' a chi la ___.',
        risposte: [
          { t: '«a chi la CHIAMMA» — a chi la chiama', ok: true },
          { t: '«a chi la LASSA» — a chi la lascia' },
          { t: '«a chi la SENTE» — a chi la sente' },
          { t: '«a chi la CANTA» — a chi la canta' },
        ],
      },
      hero: 'claudia',
    },
    choices: [],
  },

  d7_ninna_ok: {
    location: 'cisterna',
    caption: 'La parola giusta — ore 10:31',
    stinger: 'voce_amata',
    text: `Claudia lo dice. Male, con la voce due toni sotto, in un napoletano imparato dalle nonne degli altri:

> *Nonna nonna, ninna nonna,*

> *chi sta sott' nun torna sola:*

> *se porta appriess' a chi la **chiamma**.*

Sotto la roccia, l'acqua si ferma.

Non "si calma": si **ferma**. Per due secondi pieni la superficie diventa vetro, e in quel vetro ci sono due facce che guardano in giù e nient'altro.

Poi la voce piccola riprende da capo — e canta la strofa intera, con l'ultima parola al posto suo, e la canta più piano, come si canta a uno che sta ascoltando.

> Gaetano: *(fermo, il telefono in mano che registra e lui non lo sta guardando)* "Rileggila."

> Claudia: "L'ho capita."

> Gaetano: "Rileggila comunque."

> Claudia: "*Chi sta sotto non torna sola: si porta dietro chi la chiama.*" *(e alza gli occhi)* "Gaetà, non è una ninnananna. È un'**istruzione**. Sua madre le ha insegnato una cosa per farla dormire e quella cosa dice: se qualcuno mi chiama, io me lo porto."

> Gaetano: "Per questo Ada dice che non si risponde."

> Claudia: "Per questo Ada l'ha detto due volte." *(pausa)* "E ieri a Cala Nave, quando mi ha chiamata—"

> Gaetano: "Non hai risposto."

> Claudia: *(e non risponde subito, e in quel non-rispondere ci sta tutto)* "Lei non sta chiamando per cattiveria, Gaetano. Ha sei anni, ha paura, e sua madre le ha detto che se canti forte la paura non ti sente. E in ottantadue anni **nessuno le ha mai cantato la seconda strofa**, perché non ha fatto in tempo a impararla."

> Gaetano: "Quindi gliela cantiamo noi."

> Claudia: "Quindi gliela cantiamo noi. Ma la seconda strofa non ce la ricordiamo: ce la dobbiamo **fare**."

**(🫁 Fiato +1. Il Quaderno registra la ninnananna sentita in cisterna e le parole della prima strofa. 🔧 Se avete la foto del museo e qualcosa che porti un nome antico, nello zaino c'è una combinazione che adesso ha un senso preciso.)**`,
    gold: 1,
    sets: { i_ninna_sentita: true },
    choices: [
      { text: '🔧 Sedersi sui gradini e aprire lo zaino: mettere le cose vicine e guardarle', once: true, gold: 1, next: 'd8_giulia' },
      { text: '🧂 Riempire il barattolo con l\'acqua della cisterna, prima di uscire', requires: { item: 'sale_grosso' }, once: true, sets: { acqua_raccolta: true }, next: 'd8_giulia' },
      { text: '🕳 A Villa Stefania: c\'è una che parla da duemila anni e va sentita oggi', next: 'd8_giulia' },
    ],
  },

  d7_sbaglia: {
    location: 'cisterna',
    caption: 'La parola sbagliata — la quarta navata',
    stinger: 'risata',
    damage: 2,
    text: `La parola è sbagliata.

Lo si capisce subito, perché la voce piccola **smette**. Non finisce: smette a metà, sulla vocale, come un disco tolto dal piatto con la mano.

E nel silenzio che resta, qualcuno **ride**.

Non lei. Un'altra cosa, più grande, più in fondo, che ride nel modo in cui ridono gli adulti quando un bambino sbaglia una parola: bonaria. Divertita. Sinceramente divertita.

> Claudia: "Gaetano."

> Gaetano: "L'ho sentita."

> Claudia: "No: **Gaetano**." *(e gli indica i piedi)* "Guarda dove è arrivata l'acqua."

Al ginocchio. In diciotto secondi.

E nell'acqua, in fondo alle quattro navate, si stanno alzando delle forme. Non escono: si **compongono**, come si compone un'immagine quando metti a fuoco l'obiettivo. Sagome umane con le proporzioni che non tornano: braccia troppo lunghe per quelle spalle, teste attaccate un po' male, bordi che sfumano nell'acqua invece di finire.

Una si stacca dalle altre e ripete, con la voce di Claudia, con la cadenza di Claudia, la parola sbagliata che Claudia ha appena detto.

Poi la ripete un'altra volta.

Poi la ripetono tutte insieme, e sono tante.

> Gaetano: *(che si è messo davanti e ha già il fascio della torcia in mano, e la voce gli diventa più precisa, non meno)* "Trenta metri di stanza, ventidue gradini, la porta è dietro di noi. Claudia: le misure ce le abbiamo noi."

**(💪 TENUTA −2. Si combatte: dire la parola sbagliata, qua sotto, si paga subito. Ma la canzone è ancora lì, e chi resta in piedi ha un'altra occasione di impararla.)**`,
    combat: {
      enemies: ['sciame_voci', 'eco'],
      victory: 'd7_ninna',
      defeat: 'd9_ko',
      loot: { gold: 1 },
    },
    choices: [],
  },

  d8_giulia: {
    location: 'cisterna_sigillata',
    caption: 'Cisterna di Villa Stefania — ore 12:05',
    stinger: 'coro',
    text: `La cisterna di Villa Stefania è la più bella e la più antica: sala unica, volta perfetta, cocciopesto intatto. E in fondo — dove nessuna guida porta nessuno — un muro che non è romano: blocchi di tufo e calce messi in fretta, con le fughe fatte a mano.

Murato. Da fuori.

Dall'altra parte del muro c'è una donna che parla latino, e non è una registrazione, e **non ha eco**.

> La voce: *(calmissima, con le vocali larghe, il tono di chi è abituata a essere servita)* "Mio padre."

Claudia si è fermata a quattro metri dal muro. Gaetano un passo davanti a lei.

> La voce: "Non chiedo di uscire. Non l'ho chiesto per duemila anni e non lo chiedo a due che si sono comprati la torcia in un negozio del molo." *(pausa)* "Chiedo **notizie**. Cosa ha detto di me, dopo. Il Divo Augusto, padre della patria, che mi ha messa su una barca a ventidue anni. Cosa ha detto di sua figlia, dopo."

> Gaetano: *(pianissimo, a Claudia)* "Non risponderle la verità."

> Claudia: "Perché?"

> Gaetano: "Perché la verità è che nel testamento ha scritto che non voleva essere sepolto vicino a te." *(deglutisce)* "E perché se le mentiamo, lo sa."

> La voce: "Vi sento parlare fra voi. Fatelo pure: è quello che facevano tutti." *(e adesso è più vicina al muro, e la calce vibra)* "**Cosa ha detto di me.**"

**(⚠️ La voce più antica del Coro, e la più chiara. C'è un modo di passare senza combattere, e passa per il suo NOME o per una cosa che lei riconosce. Se non ce l'avete, resta la verità — e la verità, con Giulia, è un tiro di dado.)**`,
    choices: [
      { text: '📿 Tirare fuori la collana e appoggiarla al muro: il suo nome, portato al collo', requires: { item: 'collana_di_giulia' }, next: 'd8_evitata' },
      { text: '🧱 Dirle dov\'è la sesta cisterna, e che la chiuderete voi', requires: { flag: 'sa_sesta_cisterna' }, next: 'd8_promessa' },
      { text: '🗣 Risponderle. La verità, tutta, con rispetto, guardando il muro', tag: 'Prova di Carisma — CD 14', check: { stat: 'CAR', dc: 14, success: 'd8_evitata', fail: 'd8_boss', failDamage: 3 } },
      { text: '🤐 Non dirle niente. Il silenzio: l\'unica cosa che nessuno le ha mai fatto', goldLoss: 1, next: 'd8_boss' },
    ],
  },

  d8_boss: {
    location: 'cisterna_sigillata',
    caption: 'GIULIA — duemila anni di rancore, dietro un muro fatto in fretta',
    stinger: 'coro',
    text: `Il muro non cade. Il muro **si apre**, che è peggio: le fughe si allargano di due dita, la calce viene fuori come farina, e da quelle fessure entra nella sala una cosa che ha la forma di una donna e la consistenza dell'acqua ferma.

È vestita bene. È la sola di tutto il Coro a essere vestita bene: la stoffa cade come cade la stoffa buona, e sotto il collo, appesa a un filo che non c'è più, c'è l'ombra di un disco di bronzo.

La faccia no. La faccia è l'unica cosa che non ha finito di comporre, e non la finirà.

> Giulia: "Ventidue anni avevo. Cinque su questa roccia. Poi Reggio, e la fame, e mio padre che dallo scoglio più bello dell'impero mi ha spostata in una stanza." *(e non urla mai)* "E voi siete venuti in **vacanza**."

> Claudia: "Sì."

> Giulia: *(e si ferma, per la prima volta)* "…sì?"

> Claudia: "Sì. Siamo venuti in vacanza. Abbiamo pagato il biglietto, abbiamo prenotato la stanza con la terrazza a maggio e ci siamo messi la crema solare." *(alza il mento)* "Ti dà fastidio questo, vero? Non che siamo vivi: che siamo venuti **volendo**."

E allora Giulia urla, e l'urlo di Giulia fa cadere il cocciopesto dalle volte in scaglie grandi come mani.

**(⚔️ BOSS: GIULIA. Ruba vita, e ogni suo colpo può lasciarvi l'acqua nei polmoni. Le armi della realtà — il sale della sua stessa acqua, la luce vera, un nome detto giusto — le fanno danni DOPPI.)**`,
    combat: {
      enemies: ['giulia'],
      victory: 'd9_traghetto',
      defeat: 'd9_ko',
      loot: { gold: 2, items: ['medaglietta_giulia'] },
    },
    choices: [],
  },

  /* La promessa a Giulia ha la SUA scena: prima finiva in d8_evitata, che è scritta per
     chi le appoggia la collana al muro. Chi le prometteva di chiudere la sesta cisterna
     si ritrovava in un dialogo su una collana che non aveva mostrato. */
  d8_promessa: {
    location: 'cisterna_sigillata',
    caption: 'La promessa — ore 12:20',
    stinger: 'sigillo',
    gold: 2, heal: 4,
    sets: { giulia_risparmia: true, sa_di_marisa: true, promesso_a_giulia: true },
    text: `Gaetano parla al muro come si parla a un ufficio: piano, in ordine, coi numeri.

Dice che sono sei. Dice che due si visitano col biglietto e quattro sono murate. Dice che la sesta non è murata, è **sotto**, e che ci si arriva dalla fossa a quarantacinque metri. Dice l'ora del traghetto di domenica. Dice che prima di quell'ora la chiuderanno.

La calce non vibra più. Il silenzio dura abbastanza da diventare imbarazzante.

> Giulia: "A me le promesse le hanno fatte in latino."

> Gaetano: "Lo immagino."

> Giulia: "Mio padre mi ha promesso che sarebbe stato per poco. Il senato mi ha promesso una revisione. Il capitano che mi ha portata qui mi ha promesso che tornava a settembre." *(pausa)* "Sai qual è la differenza fra le loro promesse e la tua?"

> Gaetano: "No."

> Giulia: "La tua ha un numero dentro. Quarantacinque metri. E un'ora: le diciassette e trenta di domenica." *(e la voce si abbassa di un tono, e diventa una cosa più vecchia e più stanca)* "Le promesse vere hanno l'orario. Quelle false hanno gli aggettivi."

Un rumore lungo dietro il muro: qualcosa che si sposta di lato. Non si apre niente. Semplicemente, la pressione che c'era sul petto di tutti e due non c'è più.

> Giulia: "Passate. E siccome mi hai dato un'ora, te ne do una io: quella piccola che canta, in fondo, non chiama nessuno. Ha paura e non lo sa dire. L'ultima che le ha risposto stava a quarantacinque metri e faceva la maestra di nuoto."

> Claudia: "Come si chiamava?"

> Giulia: "Marisa. Nel novantasette." *(pausa)* "Sbrigatevi. Le promesse con l'orario dentro hanno un difetto: l'orario passa."

**(🫁 Fiato +2, 💪 TENUTA +4. Giulia vi risparmia perché le avete dato una data invece di una speranza. E vi ha detto il nome di Marisa, 1997.)**`,
    choices: [
      { text: '🧱 Misurare il muro: quanti blocchi, quanto spesso', next: 'd9_traghetto', sets: { muro_misurato: true } },
      { text: '⚓ Fuori. Sono le dodici e mezza e il traghetto parte domenica', next: 'd9_traghetto' },
    ],
  },

  /* Il nome della bambina ha la SUA scena. Prima questa scelta finiva in d12_dorme, dove
     Claudia CANTA: chi la chiamava per nome non sentiva mai pronunciare il nome. */
  d12_nome: {
    location: 'barca',
    caption: 'Assuntina — ore 11:52',
    stinger: 'sigillo',
    metri: 0,
    gold: 3, heal: 6,
    sets: { assuntina_dorme: true, chiamata_per_nome: true },
    text: `Claudia si sporge sul pagliolo, verso l'acqua, e non canta.

Dice un nome.

> Claudia: "Assuntina."

Non succede niente per due secondi interi. Poi l'acqua sotto la barca fa una cosa che l'acqua non fa: si liscia. Non si calma — si **liscia**, come un lenzuolo tirato dai piedi del letto, e per un attimo si vede il fondo che non si dovrebbe vedere da qui.

> Claudia: "Assuntina, la barca è arrivata."

Il nome era su una lista d'imbarco, aggiunto a penna in fondo, con la riga storta perché chi scriveva teneva il foglio in mano. Centoquarantasettesimo di centoquarantasei. Dopo quel foglio nessuno l'ha più scritto, e in ottantadue anni nessuno l'ha più detto ad alta voce: sul molo la chiamavano, in mare la contavano, e da allora è stata «la bambina».

> La bambina: *(e la voce arriva da vicinissimo, dal bordo, non dal fondo)* "Chi t'ha ditto comme me chiammo?"

> Claudia: "Tua madre. L'ha scritto su un foglio, all'ultimo momento, per portarti con sé."

> La bambina: "E la barca?"

> Claudia: "È questa. È in ritardo di ottantadue anni. Mi dispiace."

Una mano si appoggia al bordo di legno — piccola, con le unghie da bambina che ha giocato con la sabbia — e non stringe. Si appoggia soltanto, come si fa quando si sale su una barca aiutati da qualcuno.

> La bambina: "Aggio fatto tarde?"

> Claudia: "No. Sei arrivata giusta."

Poi il legno è libero, l'acqua smette di essere liscia, e sotto la barca non c'è più nessuno che chiama.

> Gaetano: *(che ha registrato tutto e non se n'è accorto)* "Il Coro ha perso metà della voce."

> Claudia: "Ha perso quella che teneva il tempo. Aveva sei anni e reggeva tutto."

**(🫁 Fiato +3, 💪 TENUTA +6. Assuntina non chiama più: qualcuno ha detto il suo nome. In fondo alla fossa sanno che state arrivando e non hanno più nessuno che tenga il ritmo.)**`,
    choices: [
      { text: '🌊 Vestirsi. Bombolino, torcia, coltello, cima. Si scende', next: 'd13_fossa' },
      { text: '🫂 Restare seduti sul pagliolo, tutti e due, per il tempo di un respiro', next: 'd13_fossa' },
    ],
  },

  d8_evitata: {
    location: 'cisterna_sigillata',
    caption: 'Riconosciuti — ore 12:20',
    stinger: 'sigillo',
    text: `Dietro il muro, la voce smette di premere.

Succede una cosa fisica e misurabile: la calce che vibrava si ferma, e nella sala l'aria torna a pesare quello che pesa l'aria.

> Giulia: "Quello lo conosco."

> Claudia: "Lo so."

> Giulia: "Chi ti ha detto di portarlo così, al collo, davanti?"

> Claudia: "Nessuno. Mi è sembrato più educato che tenerlo in tasca."

Silenzio lungo, di una che valuta con la calma di chi ha avuto duemila anni per imparare a valutare.

> Giulia: "Educato." *(e nella parola c'è qualcosa che assomiglia terribilmente a una risata)* "Ventidue secoli, e mi arriva l'educazione da una che ha paura dell'acqua."

> Claudia: "Come lo sai."

> Giulia: "Perché lo sentiamo tutti, cocca. È l'unica cosa che si sente da qua sotto: **chi ha paura e scende comunque**." *(e la voce si allontana di un passo dal muro)* "Passate. Non oggi, non io."

Poi, dopo una pausa, una frase che non chiede niente ed è la cosa più simile a un regalo che questa cosa sappia fare:

> Giulia: "Quella piccola che canta. Non chiama nessuno: ha paura e non lo sa dire, e chi le risponde se lo porta appresso senza volerlo." *(pausa)* "L'ultima che le ha risposto stava a quarantacinque metri e faceva la maestra di nuoto. Sbrigatevi."

**(🫁 Fiato +2, 💪 TENUTA +4. Giulia non vi tocca: una voce vi ha risparmiati. E vi ha appena detto che l'ultima persona che ha risposto alla bambina insegnava a nuotare.)**`,
    gold: 2,
    heal: 4,
    sets: { giulia_risparmia: true, sa_di_marisa: true },
    choices: [
      { text: '🧱 Misurare il muro: quanti blocchi, quanto spesso, che malta', once: true, sets: { muro_misurato: true }, gold: 1, next: 'd9_traghetto' },
      { text: '⚓ Fuori. Sono le dodici e mezza e il traghetto parte alle cinque e mezza', next: 'd9_traghetto' },
    ],
  },

  d9_traghetto: {
    location: 'porto',
    caption: 'Porto Romano, banchina — ore 17:26',
    stinger: 'coro',
    metri: 0,
    text: `Alle diciassette e ventisei sono sulla banchina con le sacche in mano, e hanno deciso una cosa insieme, camminando, senza discutere.

**Non salgono.**

> Gaetano: "Se saliamo, ricominciamo: ieri siamo saliti e ha ricominciato. Quindi non è il traghetto che non parte. Siamo noi che non arriviamo."

> Claudia: "E se restiamo a terra?"

> Gaetano: "Se restiamo a terra facciamo un esperimento con una variabile sola."

Il portellone si chiude. Le cime vengono mollate. L'acqua sotto la poppa diventa bianca, e il traghetto delle diciassette e trenta esce dall'imboccatura del porto romano **con sessanta persone a bordo e senza di loro**.

Restano sul molo a guardarlo diventare piccolo. Ci mette diciotto minuti a sparire dietro Punta Eolo.

Non succede niente.

Alle diciotto vanno a sedersi al chiosco. Non succede niente. Alle diciotto e mezza Claudia dice una battuta e ridono. Non succede niente.

Alle **18:40** Gaetano sta guardando l'ora sul telefono e non stacca gli occhi dallo schermo, perché ha deciso di vedere il momento esatto in cui accade.

E lo vede.

Non c'è un lampo, non c'è un buio, non c'è nessun effetto: il numero passa da 18:40 a 18:41, e insieme al numero cambia tutto il resto. La luce diventa quella del mattino. La sedia sotto di lui diventa il materasso. E la sua mano — che stringeva il telefono — sta stringendo il lenzuolo.

> Gaetano: *(al buio della stanza, con gli occhi ancora pieni del molo)* "Diciotto e quaranta."

> Claudia: *(accanto a lui, già sveglia)* "Lo so. L'ho visto pure io."

**(🫁 Fiato +1. Il Quaderno registra: non è il traghetto. Il giorno si riavvolge alle 18:40 e non gliene frega niente di dove siete. Restare a terra non serve, salire non serve. Si esce solo SCENDENDO.)**`,
    gold: 1,
    sets: { d_esperimento_fatto: true },
    choices: [
      { text: '🌊 Allora si scende. E si scende oggi', next: 'd10_ciclo3' },
      { text: '🫂 Prima cinque minuti abbracciati al buio, senza dire una parola', once: true, heal: 6, gold: 2, next: 'd10_ciclo3' },
    ],
  },

  d9_ko: {
    location: 'bnb',
    caption: 'Le Parracine — vi svegliate ASCIUTTI',
    stinger: 'defeat',
    metri: 0,
    fullHeal: true,
    recharge: true,
    text: `Vi svegliate.

Il ventilatore a pale gira piano. Le lenzuola sono fresche. Il rettangolo di sole è sul muro nello stesso punto di sempre.

E siete **asciutti**.

È questa la parte peggiore, e il gioco vi guarda in faccia mentre lo dice: non un capello bagnato, non un granello di sabbia, non un livido. I costumi sono stesi sul davanzale, asciutti. La torcia è sul tavolino, spenta, con la lente pulita.

Quello che vi ha preso non vi ha uccisi. Vi ha **rimessi a posto**, come si rimette a posto una sedia dopo aver spolverato.

> Claudia: *(seduta sul bordo del letto, le mani sulle ginocchia, e non guarda niente)* "Quanto ci siamo persi."

> Gaetano: "Non lo so."

> Claudia: "Sì che lo sai, tu tieni il conto di tutto."

> Gaetano: *(e ci mette qualche secondo, perché la risposta gli fa schifo)* "Un pezzo. Un pezzo di quello che avevamo capito." *(si passa le mani sulla faccia)* "Me lo sento che manca, Claudia. Come una parola che avevi sulla lingua."

Fuori, in cucina, Ada mette la moka sul fuoco. Sono le sette e cinquanta di domenica trenta agosto, ed è tutto pronto per essere fatto un'altra volta.

> Claudia: *(si alza)* "Ok. Allora lo rifacciamo, e stavolta lo facciamo meglio."

**(💪 TENUTA piena, mosse ricaricate. 🫁 Fiato +1. Quello che avevate capito dopo l'ultimo riposo l'avete perso, e il Quaderno vi dice per nome cosa manca. Il resto è vostro, e il giorno è ancora tutto lì.)**`,
    gold: 1,
    choices: [
      { text: '🕳 Giù nelle cisterne: c\'è una cosa che sappiamo di non aver finito', requires: { notFlag: 'ciclo2_fatto' }, next: 'd8_giulia' },
      { text: '⚓ Alla banchina, e stavolta guardiamo l\'ora fino alla fine', requires: { notFlag: 'ciclo2_fatto' }, next: 'd9_traghetto' },
      { text: '🌊 Alla barca. Alla fossa. Adesso', requires: { flag: 'ciclo2_fatto' }, next: 'd13_fossa' },
      { text: '🚢 Al porto, dove il traghetto è ormeggiato col portellone aperto', requires: { flag: 'ciclo2_fatto' }, next: 'd15_uscite' },
    ],
  },

  /* ==================== CICLO 3 — L'ISOLA NON FINGE PIÙ ==================== */

  d10_ciclo3: {
    location: 'alba',
    caption: 'Le Parracine — 30 agosto, ore 07:10 (la terza volta)',
    stinger: 'coro',
    metri: 0,
    text: `Il ventilatore non gira.

È la prima cosa che nota Gaetano, ed è piccolissima: le pale sono ferme a metà giro, e l'interruttore è su ON.

La seconda la nota Claudia, e non è piccola.

> Claudia: "Non ci sono le cicale."

Si mettono a sedere insieme, sul letto, come due che si sono svegliati in una casa che non conoscono.

Fuori dalla finestra aperta c'è un'aria che non si muove. Nessun motorino sulla strada di sopra. Nessuna radio. Nessun cane. Nessuno che chiama un nome verso una finestra.

Scendono in cucina.

La moka è sul fuoco, e il fuoco è **spento**, e la moka è calda. Sul tavolo tre tazzine: il caffè versato in due, lo zucchero girato dentro una sola. Il canovaccio è appeso al chiodo. La sedia di Ada è tirata indietro come si tira indietro quando ci si alza per un attimo, per andare a prendere una cosa di là.

Ada non è di là.

E nel corridoio, davanti alla porta di casa, c'è **acqua**. Un velo alto un dito che entra da sotto la porta e arriva fino al primo gradino delle scale, e Le Parracine stanno a quarantadue metri sul livello del mare.

> Gaetano: "Ada?"

La sua voce, in quella cucina, fa una cosa che non ha mai fatto: **non rimbomba e non muore**. Esce e resta ferma in mezzo alla stanza, come una cosa appoggiata.

> Claudia: *(pianissimo)* "Non chiamarla più."

> Gaetano: "Perché?"

> Claudia: "Perché se risponde non è lei. E perché lei ce l'ha detto due volte."

**(🫁 Fiato +2, 💪 TENUTA +4: il caffè lo hanno fatto per voi e la moka è ancora calda. Il Quaderno registra: terzo 30 agosto, la corda è arrivata fino a quarantadue metri sul livello del mare, e l'isola ha smesso di fingere.)**`,
    gold: 2,
    heal: 4,
    sets: { ciclo2_fatto: true, ciclo: 3, d_acqua_in_casa: true },
    choices: [
      { text: '☕ Bere il caffè che qualcuno ha fatto per voi. Tutto. In piedi', once: true, gold: 2, heal: 4, next: 'd11_vuoto' },
      { text: '🚪 Aprire tutte le porte del B&B e guardare in tutte le stanze', once: true, sets: { bnb_perquisito: true }, next: 'd11_vuoto' },
      { text: '🎒 Preparare lo zaino come si prepara per l\'ultima volta: torcia, coltello, tutto', sets: { pronti_per_la_fossa: true }, next: 'd11_vuoto' },
    ],
  },

  d11_vuoto: {
    location: 'paese',
    caption: 'Ventotene vuota — ore 08:40',
    attenzione: 1,
    metri: 0,
    text: `Piazza Castello, alle otto e quaranta di un domenica d'agosto, ha centoventi persone dentro.

Oggi ne ha zero.

I tavolini della Terrazza di Mimì sono apparecchiati: tovaglie di carta, bicchieri capovolti, portacenere. In uno c'è una sigaretta accesa che ha fatto tre centimetri di cenere senza che nessuno la fumasse. Il forno è aperto e dentro c'è il pane. Un motorino è appoggiato al muro col cavalletto giù, il quadro accesso e la spia dell'olio che lampeggia.

Al cantiere della strada per Punta Eolo, dietro il cartello, quattro sacchi di **calce viva** accatastati, e uno aperto a metà con la paletta ancora infilata dentro.

E c'è una porta aperta che nei giorni scorsi era chiusa: il **diving** del porto. Tre bombole in fila, una muta appesa a un gancio, il compressore, e alla parete una fotografia incorniciata di quelle degli anni Novanta, coi colori virati sul rosa.

Nella foto una donna di quarant'anni in muta, capelli tagliati corti, che ride, con il pollice in su. Dietro di lei due ragazzi biondi che ridono pure. Sotto, a pennarello, sul cartoncino: **"Marisa — corso avanzato, settembre '97"**.

Sul bancone c'è un registro delle immersioni. Ultima riga, scritta con una biro che scriveva male:

> *17.9.97 — muri sommersi −45. Scesi in TRE. Risaliti in due. J. dice che eravamo quattro.*

Poi sei righe di date senza niente scritto accanto: sei giorni normali, con la casella dell'immersione vuota e la firma messa comunque, per abitudine.

Poi, il 23 settembre, con una grafia diversa — larga, di una che scriveva in fretta e cantava mentre scriveva:

> *me ne vado a piglià chi m'ha chiammata.*

La barca di Marisa è stata trovata la mattina dopo, all'ancora davanti a Punta Eolo, col motore in folle e la scaletta calata. Vuota.

---

E poi scendono in banchina, e vedono il traghetto.

È **all'ormeggio**. Le cime legate come si legano. I motori spenti — non al minimo: spenti, senza vibrazione, senza scarico. E il **portellone di poppa è aperto**, calato sulla banchina, con la rampa a posto.

Dentro il garage non c'è nessuno: nessuna macchina, nessun carrello, nessun marinaio. La luce di servizio è accesa su trenta metri di lamiera vuota.

> Gaetano: *(dopo un tempo lungo)* "È pronto."

> Claudia: "Cosa?"

> Gaetano: "Il traghetto. È pronto a partire." *(guarda il portellone)* "Aspetta noi."

**(Oggetto: un sacco di CALCE. ⚠️ Attenzione del Coro +1. Il Quaderno registra Marisa: 1997, la corda, tre scesi a quarantacinque metri e due risaliti — e i due non erano d'accordo sul numero. Sei giorni normali. Poi si è messa a cantare e non ha smesso.)**`,
    item: 'calce',
    sets: { d_traghetto_aperto: true, sa_marisa: true },
    choices: [
      { text: '🍽 Entrare nella cucina della Marisqueria e mangiare come si deve, l\'ultima volta', once: true, gold: 3, heal: 8, next: 'd11_specchio' },
      { text: '🎙 Calare l\'idrofono profondo nell\'acqua del porto e sentire cosa aspetta', requires: { item: 'idrofono_profondo' }, once: true, sets: { porto_ascoltato: true, sa_confine: true }, goldLoss: 1, next: 'd11_specchio' },
      { text: '🕳 Dietro l\'orto dei Coraggio: il muro del \'57 è aperto e la scala continua sotto', requires: { flag: 'sa_scala_continua' }, once: true, sets: { via_di_terra: true }, gold: 1, next: 'd11_specchio' },
      { text: '🪑 Al tavolino in fondo alla piazza c\'è seduta una persona. Andare a vedere chi è', next: 'd11_signora' },
    ],
  },

  /* L'INDOVINELLO. Il committente l'aveva chiesto esplicitamente fra le cose nuove
     («indovinelli») e in tutto il gioco non ce n'era nessuno. Sta qui perché qui ha
     senso: l'unica persona rimasta in un'isola vuota, e la domanda è quella che
     l'isola fa da duemila anni. */
  d11_signora: {
    location: 'paese',
    caption: 'Piazza Castello, ore 09:05 — l\'unica persona rimasta',
    text: `Il tavolino in fondo alla piazza è quello dei vecchi che giocano a carte. Le carte ci sono ancora, calate, un mazzo napoletano tenuto insieme da un elastico. Il bicchiere è mezzo pieno e non ha condensa, con trentun gradi.

Seduta al tavolino, di spalle, c'è **la signora dei fagiolini**.

Quella del ventisette agosto, sulla salita, che vi ha detto *fate i bagni dove c'è la gente, il mare è pieno* e poi ha continuato a pulire i fagiolini come se non avesse detto niente.

Ha lo stesso vestito. Ha lo stesso catino di plastica verde. E dentro il catino ci sono gli stessi fagiolini, ancora tutti da fare, dopo tre giorni.

Non si gira. Dice:

> "Site venute 'n ritardo, guagliù."

Claudia si siede di fronte a lei, senza chiedere permesso, e mette le mani sul tavolino come si fa quando si vuole essere presi sul serio.

> Claudia: "Signora. Dove sono tutti?"
> La signora: *(continua a pulire)* "Stanno. Stanno tutti addò stanno sempe. Site vuje ca nun ce state."

Poi mette giù il fagiolino. Si asciuga le mani sul grembiule — asciutte anche stavolta — e per la prima volta si gira.

Ha la faccia di una signora di settantacinque anni che ha fatto le pulizie per cinquant'anni e non ha mai avuto paura di niente.

> "Mo' te faccio 'na domanda. Si m'a 'nnovini, te dico una cosa ca t'aiuta. Si nun m'a 'nnovini, nun te dico niente e vaje pe' 'a strada tua, ca è 'na strada brutta."

**(🗝 Un indovinello, in dialetto, da una signora coi fagiolini, in una piazza vuota. Se lo prendete, lei vi dice l'unica cosa che vi serve sapere prima di scendere.)**`,
    silenzio: true,
    minigame: {
      type: 'indovinello',
      success: 'd11_signora_ok',
      fail: 'd11_signora_no',
      tag: 'Una risposta sola. Ragionatela ad alta voce, come si fa al tavolo.',
      config: {
        titolo: '🗝 La domanda della signora',
        testo: `> "Nun tengo voce, e parlo.
> Nun tengo mano, e tengo.
> Chi me guarda 'a coppa nun me vede,
> chi me guarda 'a sotto nun torna.
>
> Che songo?"

<span class="minigame-gloss">(Non ho voce, e parlo. Non ho mani, e trattengo. Chi mi guarda da sopra non mi vede, chi mi guarda da sotto non torna.)</span>`,
        risposte: [
          { t: '💧 L\'acqua', ok: true },
          { t: '🕳 Il buio' },
          { t: '🪞 Lo specchio' },
          { t: '⏳ Il tempo' },
          { t: '🤐 Non rispondere: le domande di quest\'isola sono trappole' },
        ],
      },
    },
    choices: [],
  },

  d11_signora_ok: {
    location: 'paese',
    caption: 'Piazza Castello — «\'a stessa cosa»',
    text: `> Claudia: "L'acqua."

La signora annuisce una volta, piano, come si annuisce a un nipote che ha finalmente capito una cosa che gli hai spiegato tre volte.

> "Brava. E mo' sient'a mme, ca te lo dico una vota sola."

Prende il bicchiere, lo alza, e lo tiene in mano senza bere.

> "Chest'acqua ccà" *(indica il bicchiere)* "e chell'acqua llà" *(indica giù, verso il porto)* "**nun è 'a stessa cosa.** Chella 'e sotto se ferma addò fenisce 'a rena. Nun trase 'n paese, nun trase dint' 'e case, nun trase dint' 'o bicchiere mio. Nun po'."

Beve. Rimette il bicchiere sul tavolino.

> "Perciò quanno scennite — e scennite, 'o saccio — vuje nun avite da vincere niente. Avite da **turnà 'a coppa 'a riga**. 'A riga sta ddò 'o mare cagna culore. Chi ce arriva, è fore. Chi se fida 'e nun ce arrivà, resta."

Poi torna ai fagiolini.

> "E 'na cosa ancora, signò. Chella ca canta sotto tene sei anni. **Nun è essa 'a nemica.** Essa tene sulo friddo."

**(✅ Il Quaderno registra il CONFINE, detto da chi lo sa: quella cosa si ferma dove finisce la sabbia, e la riga è dove il mare cambia colore. 💪 TENUTA piena, 🫁 Fiato +3 — perché per la prima volta in tre giorni qualcuno vi ha detto una cosa vera senza che dovessate strappargliela.)**`,
    fullHeal: true,
    gold: 3,
    stinger: 'sigillo',
    sets: { sa_confine: true, signora_ha_parlato: true },
    choices: [
      { text: '🙏 Ringraziarla. E chiederle come si chiama', once: true, heal: 4, next: 'd11_signora_nome' },
      { text: '🪞 Andare. C\'è una cosa che aspetta al porto', next: 'd11_specchio' },
    ],
  },

  d11_signora_no: {
    location: 'paese',
    caption: 'Piazza Castello — la risposta sbagliata',
    text: `La signora ascolta la risposta fino in fondo, senza interrompere, con la faccia di una che ha sentito quella stessa risposta sbagliata da altre persone e non le è servito a niente correggerle.

Poi torna ai fagiolini.

> "Eh. Vabbuò."

E non dice più niente. Non per cattiveria: per come si fa con uno che ha già deciso, e a cui parlare è tempo perso.

Claudia resta seduta ancora un po'. Poi si alza e la sedia fa un rumore che in quella piazza vuota arriva fino al campanile e torna.

E mentre si girano per andare, dal catino dei fagiolini, senza che la signora apra la bocca, si sente una voce di bambina che dice:

*"'A dumanda era facile."*

**(⚠️ 🎵 Attenzione del Coro +1: la risposta sbagliata l'hanno sentita anche loro, e si sono divertiti. Il confine — la cosa che vi avrebbe salvato di sicuro — vi tocca scoprirla per conto vostro, se ci arrivate.)**`,
    attenzione: 1,
    stinger: 'risata',
    sets: { signora_muta: true },
    choices: [
      { text: '🪞 Andare. Al porto, con una domanda in meno e un dubbio in più', next: 'd11_specchio' },
      { text: '💧 «Signora. Era l\'acqua, vero?» — provarci comunque, con la faccia di chi ha capito tardi', once: true, next: 'd11_signora_tardi' },
    ],
  },

  d11_signora_tardi: {
    location: 'paese',
    caption: 'Piazza Castello — tardi, ma detto',
    text: `Claudia torna indietro di tre passi. Non si siede.

> "Signora. Era l'acqua, vero?"

La signora non alza la testa. Pulisce un fagiolino, lo mette nel catino, ne prende un altro.

> "Mo' sì."

> Claudia: "E allora me lo dice?"

> "No." *(un altro fagiolino)* "Ma te dico n'ata cosa, ca vale meno ma è 'a stessa."

Alza gli occhi. Sono occhi normalissimi, ed è questo che fa paura.

> "Quanno stai sotto e sient' 'o nomme tuo — **nun è isso ca te chiamma. Sî tu ca vuo' essere chiammata.** 'A differenza è tutta llà, signò. E chella differenza t'a salva o t'accide, secondo comme te sient' 'o juorno."

Torna ai fagiolini.

**(⚠️ Non è il confine, ma è la cosa più vera che sentirete oggi: laggiù non è la voce che chiama, siete voi che volete essere chiamati. Il Quaderno la registra, e nell'ultima immersione conterà.)**`,
    sets: { sa_perche_si_risponde: true },
    stinger: 'coro',
    choices: [
      { text: '🪞 Al porto. Adesso', next: 'd11_specchio' },
    ],
  },

  d11_signora_nome: {
    location: 'paese',
    caption: 'Piazza Castello — come si chiama',
    text: `> Claudia: "Signora, grazie. Come si chiama?"

La signora ci pensa un secondo di troppo, e quel secondo Claudia lo sentirà per anni.

> "Assunta."

Claudia non dice niente. Gaetano, dietro di lei, mette una mano sulla sua spalla e la stringe una volta: *andiamo.*

> "Eh." La signora sorride, e il sorriso è quello giusto, di una vecchia che sa di aver detto una cosa grossa. "Ccà 'e femmene se chiammano tutte accussì, signò. 'A metà 'e ll'isola se chiamma Assunta." Riprende un fagiolino. "Chella piccerella pure."

**(💪 TENUTA +4. E adesso sapete che la bambina che canta sotto quest'isola porta il nome di metà delle donne che ci sono nate — che è il modo in cui questo gioco vi dice, senza dirlo, che laggiù non c'è un mostro: c'è una di loro.)**`,
    heal: 4,
    sets: { sa_nome_assunta: true },
    silenzio: true,
    choices: [
      { text: '🪞 Al porto', next: 'd11_specchio' },
    ],
  },

  d11_specchio: {
    location: 'paese',
    caption: 'Il tavolino in fondo — ore 09:15',
    heal: 10,
    recharge: true,
    stinger: 'voce_amata',
    metri: 0,
    text: `Al tavolino in fondo, quello all'ombra sotto il fico, c'è seduta Claudia.

È girata di tre quarti. Ha il vestito di ieri — quello a fiori piccoli, che è nella sacca, piegato — e i capelli raccolti con l'elastico al polso sinistro, come li tiene lei. Davanti ha un caffè e mezzo bicchiere d'acqua. Con la destra gira il cucchiaino.

Claudia — quella vera, quella in piedi, quella con la mano di Gaetano che le stringe il braccio all'altezza del gomito — non si muove.

> Gaetano: "Non guardarla."

> Claudia: "La sto guardando."

> L'altra: *(senza girarsi, e ha la sua voce esatta, con la sua cadenza)* "Amore, siediti che si fredda."

Poi si gira. Ha la faccia di Claudia: non "una faccia simile", la faccia di Claudia, con la cicatrice piccola sopra il sopracciglio del 2011, la bici a Serapo. E la faccia di Claudia si accorge in questo momento che quella cicatrice è **al lato sbagliato**.

> L'altra: "Lo so cosa stai pensando. Lo penserei anch'io." *(beve un sorso, appoggia la tazzina, e lo fa nel modo in cui lo fa lei)* "Ma senti: tu hai promesso una cosa. Hai promesso di **insegnarle a nuotare**. L'hai detto tu, nessuno te l'ha chiesto, e adesso ci sono una decina di creature là sotto che ti stanno aspettando alle cinque, come si aspetta la maestra."

> Claudia: "Non è la stessa cosa."

> L'altra: "È esattamente la stessa cosa, e lo sai. Marisa insegnava a nuotare. Marisa ha risposto. Marisa è scesa." *(e la voce diventa dolce, e ha ragione, ed è insopportabile)* "L'unica differenza tra te e Marisa è che a Marisa nessuno aveva detto di non rispondere, e tu l'hai fatto lo stesso."

Claudia non risponde.

> L'altra: *(e questa è la frase che le arriva dentro)* "Siediti, amore. Sei stanca da giovedì. E lo sai che se non scendi tu ci va lui, perché lui ci va sempre."

**(⚠️ Non è una bugia: è la cosa più vera che vi abbiano detto in tre giorni, detta da una cosa che la usa come un coltello. Ciò che viene GUARDATO per intero perde il diritto di cambiare forma.)**`,
    choices: [
      { text: '📱 Far partire il file di ieri. Le due «sono qui», una dietro l\'altra, ad alta voce davanti al vetro',
        requires: { flag: 'debito_di_voce' }, once: true, damage: 5, sets: { specchio_smascherato: true } },
      { text: '🤐 Non risponderle. Non una parola. Il silenzio è l\'unica cosa che non sa fare', gold: 1, next: 'd11_boss' },
      { text: '📸 Inquadrarla. Treppiede, luce, e fotografarla per intero, faccia compresa', once: true, sets: { specchio_documentato: true }, next: 'd11_boss' },
      { text: '💍 Mostrarle le due fedi e chiederle dove sono le sue', requires: { item: 'le_due_fedi' }, once: true, sets: { specchio_smascherato: true }, heal: 4, next: 'd11_boss' },
      { text: '🎙 "Me l\'ha detto lui. In cisterna, da solo, senza che glielo chiedessi": la verità detta regge', requires: { flag: 'verita_detta' }, once: true, heal: 5, gold: 2, next: 'd11_boss' },
      { text: '🕳 Lei sa la cosa che Gaetano non ha detto. Lasciarglielo dire e restare in piedi', requires: { flag: 'bugia_detta' }, once: true, damage: 4, sets: { bugia_pagata: true }, next: 'd11_boss' },
      { text: '🗣 Rispondere: "Hai ragione. Ho paura. E scendo comunque"', heal: 2, gold: 1, next: 'd11_boss' },
    ],
  },

  d11_boss: {
    location: 'paese',
    caption: 'LA VOCE DI CHI AMI — Piazza Castello, ore 09:20',
    stinger: 'voce_amata',
    metri: 0,
    text: `L'altra si alza dal tavolino, e nel farlo appoggia la mano sul piano di marmo, e la mano sul marmo non fa rumore.

> L'altra: "Va bene." *(e sospira, esattamente come sospira lei quando ha perso una discussione e la riprenderà dopo)* "Va bene, amore. Facciamo come vuoi tu."

Poi comincia a camminare verso di loro, e mentre cammina **parla di continuo**, e non dice mai una cosa falsa.

Dice del litigio di dicembre e di chi aveva ragione. Dice la frase che Claudia ha detto a Gaetano in macchina nel 2019 e che nessuno dei due ha mai più ripetuto. Dice il nome con cui la chiamava sua nonna, quello che non usa nessuno.

E ogni cosa che dice è **giusta**, e ogni cosa che dice fa male dove doveva.

> Gaetano: *(che si è messo di fianco a Claudia — non davanti: di fianco)* "Claudia. Guardami."

> Claudia: "Sto bene."

> Gaetano: "Guardami e dimmi una cosa che sa solo lei."

> Claudia: *(e lo guarda, e in mezzo alla piazza vuota di un'isola trova la cosa)* "Che ho paura. Ma quella la sa mezza Italia, Gaetà: l'ho raccontata a tre tavoli diversi da Mimì."

> Gaetano: "Esatto."

> Claudia: *(e adesso è ferma)* "Esatto. Quella cosa lì la sanno tutti. **Non è un segreto: è una CARATTERISTICA.**"

E allora la cosa col vestito a fiori piccoli smette di parlare, e la faccia le si scompone al centro come si scompone un'immagine quando togli il fuoco all'obiettivo, e resta solo la bocca — troppo grande — che continua a dire il nome della nonna.

**(⚔️ BOSS: LA VOCE DI CHI AMI. Rispecchia i vostri colpi e sa cosa vi fa male. Ma è una VOCE: la luce vera, il sale e i nomi le fanno danni DOPPI — e questa cosa qua, voi due, la conoscete meglio di lei.)**`,
    combat: {
      enemies: ['se_stessa'],
      victory: 'd12_bambina',
      defeat: 'd9_ko',
      loot: { gold: 2 },
    },
    choices: [],
  },

  d12_bambina: {
    location: 'barca',
    caption: 'La barca, sopra la fossa — ore 11:40',
    fullHeal: true,
    recharge: true,
    stinger: 'coro',
    metri: 3,
    text: `La barca è quella di Ciro, ormeggiata al terzo pontile con le chiavi nel quadro. Il fuoribordo parte al primo colpo.

Venti minuti di mare piatto verso il canale tra Ventotene e Santo Stefano, e poi Gaetano taglia il motore, perché lo scandaglio è passato da diciotto metri a quarantasei in undici secondi.

**La fossa.** Quella che nessuno ha misurato.

Il mare, qui, ha un colore che non è blu: è una specie di nero che riflette il cielo per cortesia.

E a tre metri dalla fiancata di dritta, a pelo d'acqua, con la faccia rivolta in su, c'è una bambina.

Sei anni. Il cappottino buono della domenica, quello della foto del museo, che sotto l'acqua fa la campana. La mano destra è alzata fuori dall'acqua, aperta, come si alza la mano quando si vuole essere presi in braccio.

Non è gonfia. Non è consumata. È **intatta**, e questo è mille volte peggio, perché ottantadue anni sotto sale non lasciano intatto niente — e quindi quella cosa lì, in quest'acqua, non ci è mai stata davvero.

Canta piano, con la faccia in su, e nell'aria aperta la sua voce arriva sottilissima.

> *Nonna nonna, ninna nonna, chi sta sott' nun torna sola…*

> Claudia: *(inginocchiata sul bordo, e Gaetano la tiene per la cintura senza che nessuno gliel'abbia chiesto)* "Gaetà."

> Gaetano: "Sono qui."

> Claudia: "Guarda la mano." *(e le trema la voce e non si ferma)* "Ce l'ha alzata da ottantadue anni e non l'ha mai presa nessuno. E chi le rispondeva se lo portava appresso."

**(⚠️ Assuntina. Se avete la sua ninnananna, o se sapete il suo nome per intero, qui non c'è niente da combattere. Se non le avete, **rispondere** vi costa: questa cosa ha sei anni e non lo fa per cattiveria, e sarà peggio così.)**`,
    choices: [
      { text: '🎵 Cantarle la seconda strofa. Quella che nessuno le ha mai cantato', requires: { item: 'ninnananna' }, next: 'd12_dorme' },
      { text: '🕯 Chiamarla per nome: "Assuntina". E dirle che la barca è arrivata', requires: { flag: 'i_nome_lista' }, next: 'd12_nome' },
      { text: '🫂 Risponderle. Dirle la verità: "Abbiamo paura pure noi. Tantissima."', once: true, damage: 3, gold: 1, next: 'd12_boss' },
      { text: '🔦 Non avete niente da cantarle. Accendere la luce e prepararsi', goldLoss: 1, next: 'd12_boss' },
    ],
  },

  d12_boss: {
    location: 'barca',
    caption: 'LA BAMBINA CHE CANTA — a tre metri dalla fiancata',
    stinger: 'risata',
    metri: 3,
    text: `La bambina smette di cantare e **chiude la mano**.

E il canale tra le due isole, che era piatto come un tavolo, si alza: non un'onda, un rigonfiamento, come quando una cosa grossa passa sotto una coperta.

Lei viene su dall'acqua in piedi, senza spinta, e l'acqua le scivola addosso e il cappottino resta asciutto.

> La bambina: *(e la voce è quella di prima, quella di una bambina di sei anni, ed è per questo che è impossibile)* "Mammà ha ditto 'e cantà forte."

> Claudia: "Lo so, amore."

> La bambina: "Ha ditto ca si cante forte 'a paura nun te sente."

> Claudia: "Lo so."

> La bambina: *(e apre la bocca più di quanto una bocca si apra)* "**È VERO?**"

E canta.

Canta la stessa strofa, la stessa, ma tutta insieme e a tutti i volumi possibili — e sotto la barca, a quaranta metri, a quarantacinque, in tutta la fossa, un centinaio di voci risponde alla chiamata di una bambina che non ha mai saputo di poter chiamare.

**(⚔️ BOSS: LA BAMBINA CHE CANTA. Ventidue di TENUTA e CA 17: è piccola e non sta ferma, e il suo canto chiama gli altri. Il modo giusto di batterla non era combatterla, e lo sapete già.)**`,
    combat: {
      enemies: ['bambina'],
      victory: 'd13_fossa',
      defeat: 'd9_ko',
      loot: { gold: 1 },
    },
    choices: [],
  },

  d12_dorme: {
    location: 'barca',
    caption: 'La seconda strofa — ore 11:52',
    stinger: 'sigillo',
    metri: 0,
    text: `Claudia canta.

Non canta bene. Non ha mai cantato bene, e a nessuno è mai importato meno di adesso. Canta la prima strofa come l'ha imparata in cisterna — *chi sta sott' nun torna sola, se porta appriess' a chi la chiamma* — e poi, senza fermarsi, sullo stesso fiato, canta la **seconda**: quella che una madre non ha fatto in tempo a insegnare a sua figlia sul molo di Napoli il 24 ottobre del 1943.

> *Nonna nonna, ninna nonna,*

> *nun chiammà: ca so' venuta.*

> *Mo' te porto appriess' a me.*

Perché è questo, il rovescio. La bambina non deve più chiamare nessuno: è venuta qualcuno a prenderla, e chi viene se la porta appresso lui.

E c'è una seconda cosa che quella strofa fa, e la fa a chi la canta.

> Claudia: *(che se n'è accorta mentre la stava cantando)* "Gaetà. Io ieri le ho risposto."

> Gaetano: "Lo so."

> Claudia: "Uno che risponde è uno che è stato chiamato." *(guarda la mano piccola che tiene nella sua)* "Uno che canta questa è uno che è **venuto**. Non è la stessa cosa, e non lo è per loro."


La mano alzata resta alzata per tre secondi. Poi Claudia allunga la sua e la prende — e non c'è freddo, non c'è viscido, non c'è niente di quello che ci si aspetta: c'è il peso preciso di una mano di bambina di sei anni.

> La bambina: "Aggio fatto tarde?"

> Claudia: *(e le si spezza la voce a metà della parola e la finisce comunque)* "No, cocca. Sei in orario."

E poi la bambina fa la cosa più semplice del mondo, quella che aspettava di poter fare da ottantadue anni: chiude gli occhi.

Non sparisce. Non si dissolve, non fa luce, non c'è nessun effetto. **Si addormenta**, e scende piano nel nero come scende una cosa che ha finito, col cappottino buono che le fa la campana.

E sotto la barca, in tutta la fossa, cento voci che rispondevano a una chiamata restano senza chi le chiamava. Il canto del Coro perde il tempo: da accordo diventa **rumore**.

> Gaetano: *(che ha il telefono in mano e sta registrando, e piange, e registra)* "Ha perso metà della voce."

> Claudia: "Aveva sei anni, Gaetano."

> Gaetano: "Lo so."

> Claudia: "Aveva **sei anni** e reggeva tutto."

**(🫁 Fiato +3, 💪 TENUTA +6. Assuntina dorme, e senza il suo richiamo il Coro ha perso metà della voce: in fondo alla fossa sanno che state arrivando e non hanno più nessuno che tenga il tempo.)**`,
    gold: 3,
    heal: 6,
    sets: { assuntina_dorme: true, debito_pagato: true },
    choices: [
      { text: '🌊 Vestirsi. Bombolino, torcia, coltello, cima. Si scende', next: 'd13_fossa' },
      { text: '🫂 Restare seduti sul pagliolo, tutti e due, per il tempo che serve', once: true, heal: 6, gold: 2, next: 'd13_fossa' },
    ],
  },

  d13_fossa: {
    location: 'barca',
    caption: 'Sopra la fossa — ore 12:30, e lo scandaglio non è d\'accordo con sé stesso',
    fullHeal: true,
    recharge: true,
    metri: 0,
    text: `Gaetano cala la cima col piombo e conta i nodi: uno al metro, perché così si fa.

E mentre conta, controlla gli strumenti. E gli strumenti, qui, non funzionano.

> Gaetano: "Lo scandaglio mi dà quarantasei. Poi trentotto. Poi cinquantadue. Poi ottantuno, che è impossibile, perché a ottantuno metri qua non ci arriva nemmeno la fossa." *(gira il telefono nella mano)* "E la bussola fa un giro completo ogni undici secondi. Undici, Claudia. Come il riverbero."

> Claudia: "Quindi non sappiamo quanto è profondo."

> Gaetano: "Nessuno sa quanto è profondo. È l'unico punto del canale che non è mai stato battuto, e adesso capisco perché: **la strumentazione non tiene**." *(assicura la cima alla bitta con due giri e una gassa)* "Ma la cima non è uno strumento. La cima è una corda con i nodi, e i nodi li ho contati io."

Trentuno nodi e la cima trova.

> Gaetano: "Trentuno metri: c'è una cengia. È il fianco di poppa della nave, appoggiato su un muro. Perché sotto di noi, a quaranta metri, c'è un **porto romano intero**: banchine, colonne, gli alloggiamenti per le travi come quelli su in superficie. Quello che sta in cima all'isola, uguale, quaranta metri sotto." *(pausa)* "Da trentuno la parete continua giù, e a quarantacinque c'è lo squarcio della stiva."

> Claudia: "E cosa c'è nella stiva?"

> Gaetano: *(e non addolcisce, perché con lei ha smesso)* "I bagagli. E quello che i bagagli avevano dentro."

Poi fa il briefing come lo farebbe per un satellite, con le dita.

> Gaetano: "Uno: fino alla cengia si scende sulla cima, mano dopo mano, e la cima non si lascia mai. Due: da trentuno a quarantacinque **la barra del fiato conta quelli**, i quattordici metri, e non c'è aria in più che ce la metta qualcuno. Tre: prendere e risalire. Se ti fermi a guardare cos'era quella cosa bianca, la barra ti dice esattamente quanto ti costa guardare." *(la guarda)* "Non è coraggio, è aritmetica. Quaggiù il coraggio senza aritmetica ti annega."

> Claudia: "E quattro?"

> Gaetano: "Quattro è la risalita, e questa non è una raccomandazione: è aritmetica pure lei. Col bombolino a quarantacinque metri ti carichi azoto per quattro minuti. Se vieni su diretta quell'azoto ti si apre dentro — nei gomiti, nelle ginocchia, nel midollo." *(pausa)* "Quindi a dieci metri **ci si ferma**. E ci si sta **sette minuti**, contati."

> Claudia: "E se li conti male?"

> Gaetano: "Non li conto male." *(le mette il cronometro nel palmo e le chiude le dita sopra)* "E comunque li conti anche tu. Due cronometri, sette minuti, dieci metri. Se uno dei due sale prima, l'altro lo tira giù per la cintura."

**(⚠️ ULTIMA IMMERSIONE. Serve il bombolino riparato e il fiato accumulato: senza, i quattordici metri sotto la cengia non li fate, e il gioco ve lo scrive PRIMA di farvi scendere. E LA RISALITA HA UN PREZZO FISSO: a dieci metri si sta sette minuti, e sono sette minuti giocati — la superficie si vede, la carena della barca è là sopra, e non si può salire. Salire prima uccide, e ve lo stiamo dicendo adesso, non dopo. Se non siete pronti si risale, si mangia, si respira, e si torna: nessuno vi obbliga a scendere adesso.)**`,
    sets: { sa_porto_sommerso: true },
    choices: [
      { text: '🫧 Scendere col bombolino riparato: tre litri, duecento bar, quattro minuti', requires: { item: 'bombola_riparata' }, requiresGold: 10, tag: '(serve il bombolino riparato e 10 di 🫁 fiato)', next: 'd13_apnea' },
      { text: '🫁 Scendere in apnea pura, senza bombola, con quello che avete in petto', requiresGold: 17, tag: '(senza bombola servono 17 di 🫁 fiato — e sarà appena appena)', next: 'd13_apnea' },
      { text: '🥨 Risalire in barca: taralli, acqua, venti minuti fermi al sole. Poi si riprova', once: true, gold: 4, heal: 6, next: 'd13_fossa' },
      { text: '🥃 [Ciro] Farsi versare due dita di rum e sentirsi dire com\'è finita Marisa', requires: { hero: 'ciro' }, once: true, gold: 2, heal: 4, sets: { ciro_racconta_marisa: true }, next: 'd13_fossa' },
      { text: '⚓ Non oggi. Mollare la cima, rientrare al porto e decidere lì', next: 'd15_uscite' },
    ],
  },

  d13_apnea: {
    location: 'fossa',
    caption: 'Dalla cengia in giù — meno trentuno metri',
    stinger: 'apnea',
    metri: 45,
    text: `A trentuno metri la cima finisce su una lamiera.

Non è roccia: è **acciaio**, coperto da due centimetri di posidonia morta e di vita bianca, e sotto la torcia il rosso della ruggine è l'unico colore che sopravvive a questa profondità.

È il fianco di poppa della **Santa Lucia**, appoggiato su un muro romano con gli alloggiamenti quadrati per le travi. La lamiera prosegue in giù, curva, e a quattordici metri più sotto — nel fascio della torcia, proprio sul limite del fascio — la curva si interrompe in una bocca nera coi bordi accartocciati verso l'esterno.

Lo squarcio. Il punto in cui la nave si è spezzata in due il 24 ottobre 1943.

Il battito, quaggiù, si sente solo il proprio, e rallenta da sé, senza chiedere permesso.

E dentro la bocca nera, nel fascio, c'è una cosa **gialla**.

**(🫁 Si gioca: TIENI PREMUTO per scendere, lascia per risalire — il corpo galleggia da solo. Quattordici metri sotto la cengia, quarantacinque dalla superficie. Il fiato scende sempre, e più giù sei più in fretta se ne va. Torna su col fiato ancora in petto: non fare l'eroe.)**`,
    minigame: {
      type: 'apnea',
      success: 'd13_stiva',
      fail: 'd9_ko',
      tag: 'Quattordici metri sotto la cengia — la stiva della Santa Lucia',
      config: {
        titolo: '🫁 Quarantacinque metri — gli ultimi quattordici',
        profondita: 14,
        oggetto: 'giocattolo',
        cosa: 'lo squarcio della stiva, e dentro qualcosa di giallo',
        extra: 3,
        extraFlag: 'visto_il_fondo',
        cosaExtra: 'una muta da sub degli anni Novanta, in piedi sul fondo, che vi guarda risalire',
      },
    },
    choices: [],
  },

  d13_stiva: {
    location: 'relitto',
    caption: 'La stiva della Santa Lucia — meno quarantacinque metri',
    silenzio: true,
    metri: 45,
    goldLoss: 4,
    text: `Dentro non c'è corrente, non c'è suono, non c'è niente che si muova tranne la neve marina che sale nel fascio della torcia.

Una stanza di lamiera larga sei metri, inclinata di trenta gradi, col pavimento coperto da un metro di sedimento grigio che a toccarlo si alza come polvere e non si riappoggia più.

E dentro il sedimento, incastrati, i **bagagli**.

Valigie di cartone pressato, gonfie, aperte dal sale. Un fagotto legato con lo spago, con lo spago ancora annodato. Una cesta di vimini con dei barattoli dentro. Una scarpa da uomo, una sola, con la stringa fatta col doppio nodo di uno che quella mattina aveva fretta.

Nessun osso. Ottantadue anni di mare non lasciano ossa in una stiva aperta, e in tutta questa storia è l'unico dettaglio che sia una piccola misericordia.

Sul bordo di una valigia scoppiata, appoggiato come lo appoggia un bambino quando ha le mani impegnate, c'è un **cavallino di celluloide**.

Era giallo. Una zampa manca. Ha fatto ottantadue anni sotto sale e ha ancora la faccia allegra: due punti neri per gli occhi e la bocca ridente stampata nella plastica, perché nel 1943 i cavalli dei bambini ridevano.

Le dita di un guanto da tre millimetri lo chiudono in un pugno.

E in quel momento, a quarantacinque metri, dentro una stiva senza suono, non succede assolutamente niente.

Il Coro non canta. Nessuno parla. Nessuna faccia ai bordi dell'inquadratura.

Il silenzio, quaggiù, è il modo che ha questa cosa per dirvi che ha smesso di fingere di essere un rumore.

**(Oggetto: il CAVALLINO DI CELLULOIDE. 🫁 Fiato −4: quarantacinque metri si pagano. Il Quaderno registra il giocattolo dalla stiva, e il mistero della bambina della Santa Lucia ha il suo quarto indizio.)**`,
    sets: { i_giocattolo: true },
    choices: [
      { text: '🤿 Quella muta in piedi sul fondo, trenta metri più in là. Guardarla per bene',
        requires: { flag: 'visto_il_fondo' }, once: true, next: 'd13_marisa' },
      { text: '🐎 Risalire. Adesso. Senza guardare altro', next: 'd14_coro' },
      /* La prova di Costituzione, e il conto lo paga CHI TIRA. Prima erano quattro punti
         di danno spalmati sul gruppo — cioe niente, per un gesto che il briefing ha
         telegrafato. E `nome_valigia` stava nei `sets` della SCELTA, dove sarebbe scattato
         anche col check fallito (regola del CLAUDE.md): l'ho spostato nella scena di
         successo, perche il nome lo legge solo chi ce la fa. */
      { text: '🧳 Cinque secondi in più: leggere il nome sull\'etichetta di una valigia', once: true,
        tag: 'Prova di Costituzione — CD 14 · ⚠️ qui il conto lo paga chi tira',
        check: { stat: 'COS', dc: 14, success: 'd13_murena', fail: 'd13_cinque_secondi' } },
      { text: '📿 Lasciare qui dentro qualcosa, al posto di quello che avete preso', requires: { item: 'medaglietta_giulia' }, once: true, removeItem: 'medaglietta_giulia', gold: 2, next: 'd14_coro' },
    ],
  },

  /* LA MURENA DEL RELITTO. Murena e Annegata erano due schede complete — sprite, attacchi,
     e in combat.js perfino le due reazioni «se c'è Ciro contro la murena» e «se c'è Claudia
     contro l'annegata» — che nessuna scena faceva comparire: anche quegli echi erano codice
     morto. Lo scontro è il PREZZO dei cinque secondi in più nella stiva, non una tassa
     casuale: chi risale subito non incontra niente. Danno 5,5 + 5,5 = 11 al round, metà dei
     22 punti vita di Claudia, e subito dopo d14_coro cura di 12. */
  d13_murena: {
    location: 'relitto',
    caption: 'Cinque secondi in più — meno quarantacinque metri',
    stinger: 'pressione',
    metri: 45,
    text: `L'etichetta della valigia dice **SPINELLI ASSUNTA — NAPOLI**, e leggerla costa cinque secondi.

Cinque secondi, a quarantacinque metri, sono un'unità di misura del corpo: il diaframma comincia a contrarsi da solo, non per volontà, e ogni contrazione è un promemoria che l'aria è finita da un po'.

E in cinque secondi il relitto capisce che siete fermi.

Dal passo d'uomo alla vostra sinistra — quello che prima era vuoto — esce **una murena**. Non a scatti: continua, come si sfila una corda da un buco, un metro e venti di muscolo grigioverde che non ha nessuna intenzione di spaventarvi. Le murene non spaventano: chiudono la bocca e non la riaprono.

E dalla paratia in fondo, dove l'acqua è più scura, si stacca **una forma che ha la misura di una donna**. Cappottino. Le braccia lungo i fianchi. Viene verso di voi con la stessa calma con cui è stata ferma per ottantadue anni, e la calma è la cosa peggiore, perché vuol dire che non ha fretta e voi sì.

> Gaetano: *(dentro l'erogatore, che trasforma tutto in un ringhio)* "RISALIRE."

> Claudia: *(che ha già alzato il telefono come si alza uno scudo)* "Non ci lascia."

E qui una cosa va detta adesso, perché dopo non ci sarà tempo: **quella donna non vi vuole fare del male.** Sta tenendo. Ha tenuto un corridoio, una cuccetta, una mano, per ottantadue anni, e nessuno le ha mai insegnato a lasciare — le hanno solo insegnato a tenere, sul molo, il 24 ottobre, dicendole di non mollare per nessun motivo. Ha obbedito.

Quello che dovete rompere non è lei. È la presa.

**(⚔️ Un metro e venti di murena, e una passeggera che non ha imparato a lasciare. Vincere qui vuol dire farsi lasciare andare: del male, a lei, l'hanno già fatto nel Quarantatré.)**`,
    sets: { nome_valigia: true },
    combat: {
      enemies: ['murena', 'annegata'],
      victory: 'd14_coro',
      defeat: 'd9_ko',
      loot: { gold: 2 },
    },
  },

  /* PRESO DAL CORO. La cosa che il DESIGN promette da tutta la partita e che il codice non
     poteva fare: `killRoller` (engine.js:364) marca `h.morto` su CHI HA TIRATO per ultimo,
     e non tocca mai l'ultimo in piedi (`vivi > 1`). In atto D il gruppo e di due o tre,
     quindi scatta sempre e resta comunque una coppia giocabile. Da qui in avanti quella
     persona sta nella scheda come VOCE, e `requires: { spirit: true }` — implementato nel
     motore e mai usato da nessuna scena — apre le cose che vede solo lei.
     E l'ÀNCORA DI VOCE, una delle tre ricette obbligatorie per il finale migliore, era
     spendibile in un punto solo di tutta la campagna: un epilogo. Adesso ha il suo posto,
     e il suo posto e dentro l'acqua. */
  d13_cinque_secondi: {
    location: 'relitto',
    caption: 'Cinque secondi in più — meno quarantacinque metri',
    metri: 45,
    stinger: 'voce_amata',
    silenzio: true,
    text: `L'etichetta dice **SPINELLI ASSUNTA — NAPOLI**, e leggerla costa cinque secondi. A quarantacinque metri cinque secondi non sono un tempo: sono una quantità, e si toglie da un posto che ne aveva già poca.

Il diaframma si chiude da solo. Non è volontà: è un muscolo che ha finito la pazienza, e ogni contrazione è un promemoria scritto in prima persona.

E in quei cinque secondi il sedimento si alza. Non da sotto la mano: da tutta la stiva insieme, come si alza la polvere in una stanza quando qualcuno si siede sul letto. Un metro di grigio che sale e non si riappoggia, e dentro il grigio il fascio della torcia non arriva più a un braccio.

Uno dei due sente una cosa sulla nuca. Non una mano: **una temperatura**. Due gradi in meno alla base del cranio, larghi come un palmo.

Poi la stiva si chiude sopra come si chiude un'anta.

L'altro tira la cima. Con due mani, con la schiena, coi piedi puntati sulla lamiera, e la cima viene su. Viene su tutta, col nodo in fondo, e in fondo non c'è nessuno.

A trentun metri, sulla cengia, l'acqua è di nuovo acqua. La torcia funziona. In barca lo scandaglio dice quarantasei metri e stavolta non cambia numero.

E da quarantasei metri, chiarissima, come se parlasse da mezzo metro, arriva la voce che quella persona ha da quando la conoscete.

> La voce: "Sono qui. Sto bene. Non è come pensavamo."

**(🎵 PRESO DAL CORO. Non è un dado sfortunato: è il conto dei cinque secondi, e li ha spesi chi ha alzato la mano per leggere il nome di una morta. Da adesso resta come VOCE — sta nella scheda, sta nel registro degli scontri, e nelle scene che seguono ci sono cose che vede solo lei. L'unico oggetto che paga questo è l'ÀNCORA DI VOCE, e vale un uso solo. Se ce l'avete, è adesso.)**`,
    killRoller: true,
    damage: 3,
    attenzione: 1,
    sets: { uno_preso: true, prezzo_dei_cinque_secondi: true },
    choices: [
      { text: '⚓ L\'ÀNCORA DI VOCE. Adesso. Rimettersi la maschera e andare a riprenderlo',
        requires: { item: 'ancora_di_voce' }, removeItem: 'ancora_di_voce',
        sets: { ancora_usata: true }, next: 'd13_ancora' },
      { text: '⬆️ Risalire. Alla sosta dei dieci metri, senza guardare in giù', goldLoss: 2, next: 'd14_coro' },
    ],
  },

  /* L'ÀNCORA DI VOCE, spesa dove serve. `reviveAll` e una chiave vera del motore
     (engine.js:410) e finora la usavano solo i finali. */
  d13_ancora: {
    location: 'relitto',
    caption: 'L\'Àncora di Voce — meno quarantacinque metri',
    metri: 45,
    stinger: 'voce_amata',
    text: `Non c'è niente da decidere e non c'è tempo per decidere: si rimette la maschera, si morde l'erogatore e si scende, e scendere adesso è la cosa più stupida che si possa fare in un'immersione.

L'Àncora è tre cose messe insieme in un pomeriggio, sul tavolino di ferro delle Parracine: l'idrofono profondo, il nastro del 1965 con la voce di una guardia che chiede di restare, e la ninnananna cantata da chi non deve chiamare nessuno. Da sola non è niente. Insieme è l'unica frase che quaggiù non si può interrompere.

Si accende a trentun metri e si sente subito, perché il rumore di fondo — ottocento voci che parlano insieme da tre giorni — **fa una pausa**.

Nella pausa c'è spazio per una cosa sola, e quella cosa è un nome detto per intero, con il cognome, come si dice un nome quando si chiama qualcuno per riportarlo a casa e non per invitarlo.

Il sedimento si riapre. La stiva restituisce quello che aveva chiuso dentro, e lo restituisce con la maschera ancora sulla faccia e l'erogatore in bocca, e con gli occhi di uno che era da un'altra parte e c'è tornato.

Poi l'Àncora tace, perché era per un uso solo, ed è stato quello.

**(⚓ L'ÀNCORA DI VOCE È STATA SPESA — e non ce n'è un'altra. Chi era stato preso è tornato, con quello che aveva addosso. 🫁 Fiato −3: la risalita adesso si fa in due, e in due si fa piano. Il Quaderno registra che l'Àncora ha funzionato, e registra anche che era una sola.)**`,
    goldLoss: 3,
    reviveAll: true,
    sets: { ancora_ha_funzionato: true },
    choices: [
      { text: '⬆️ Su. Alla sosta dei dieci metri, insieme', next: 'd14_coro' },
    ],
  },

  /* LA VOCE. Primo uso in assoluto di `requires: { spirit: true }`: la scelta che vedono
     solo i gruppi in cui qualcuno e stato preso. Quello che chiede lo chiede una persona
     che vi vuole bene, e resta la cosa piu pericolosa che vi abbiano detto in quattro
     giorni. Nessuna scorciatoia: non da `sa_sesta_cisterna`, che resta premio del mistero,
     e non abilita la scelta di sigillare. Apre solo strade laterali. */
  d14_voce: {
    location: 'fossa',
    caption: 'La sosta dei dieci metri — la voce che sa i numeri',
    metri: 10,
    stinger: 'voce_amata',
    text: `Alla sosta dei dieci metri si può parlare, perché c'è aria in bocca e le orecchie stanno sopra il fastidio.

E alla sosta dei dieci metri, in mezzo a ottocento voci che parlano tutte insieme, ce n'è una che parla italiano corrente con l'accento di Scauri, e dice numeri.

> La voce: "Quarantasei virgola due. Non ottantadue: ottantadue è il secondo gradino e sta dopo. Quarantasei virgola due fino alla cengia della stiva, poi la parete continua, e la sesta bocca sta a sinistra, a quarantuno, sotto una trave romana. Ce l'ho davanti adesso."

È vero. È tutto vero, ed è detto nel modo in cui quella persona ha detto le cose vere per dieci anni: la cifra prima, la frase dopo, nessun aggettivo.

> La voce: "E senti. Ti devo dire una cosa perché è quella che ti terrebbe sveglio, e non voglio che ti tenga sveglio per niente: **non fa male.** Non c'è freddo, non c'è acqua, non c'è il petto. C'è che si sente tutto." *(pausa, e la pausa è la sua)* "Sento pure te. Stai respirando male."

> *(e chi è rimasto non risponde, perché Ada l'ha detto due volte)*

> La voce: "Fai bene." *(e poi lo chiede, e non lo chiede come una trappola: lo chiede come si chiede una cosa a una persona con cui si dorme da dieci anni)* "Però scendi. Cinque metri. Non per prendermi: per **vedere** dove sto. Poi risali e fai quello che devi fare, e almeno uno di noi due sa dov'è l'altro."

E la cosa insopportabile è che non è una bugia, non è un ricatto, e non ci sarebbe niente di male.

**(🫁 Fiato −2: ascoltarla costa aria, ed è l'aria che vi serviva per risalire. Il Quaderno registra la posizione della sesta bocca detta da chi la sta guardando — quarantuno metri, a sinistra, sotto una trave — e registra che vi è stato chiesto di scendere. ⚠️ Quello che vi ha chiesto lo chiede una persona che vi vuole bene, e resta la cosa più pericolosa che vi abbiano detto in quattro giorni.)**`,
    goldLoss: 2,
    sets: { voce_ha_indicato: true, la_voce_ha_chiesto: true },
    choices: [
      { text: '🙅 Non scendere. Restare sui dieci metri e contare i sette minuti', heal: 3, sets: { non_sono_scesa: true }, next: 'd14_coro' },
      { text: '⬇️ Cinque metri. Solo per vedere dove sta', next: 'd14_scesa' },
    ],
  },

  /* CINQUE METRI. La scelta prometteva «per vedere dove sta», e una scelta che promette
     mantiene: qui si vede. E l'attenzione sale QUI e non sulla scelta, perche il motore la
     legge sulle scene — la seconda volta in un giorno che ci sbatto, e la seconda volta
     che la correzione migliora la scena invece di peggiorarla. */
  d14_scesa: {
    location: 'fossa',
    caption: 'Quindici metri — cinque piu del dovuto',
    metri: 15,
    stinger: 'pressione',
    text: `Cinque metri non sono niente. Cinque metri sono due bracciate in giù e il petto che si stringe di un dito, e la sosta che ricomincia da zero.

Da quindici metri non si vede il fondo: il fondo sta a trentuno metri più sotto. Si vede il **blu**, che a questa profondità non è un colore ma una direzione.

E in mezzo al blu, a occhio, a una quarantina di metri, c'è una cosa più chiara. Non una sagoma: una macchia della grandezza di una mano tenuta a un braccio di distanza, e la macchia sta ferma.

> La voce: *(e adesso è vicinissima, e non è cambiata di una virgola)* "Mi vedi?"

E la cosa che gela non è la domanda. È che la risposta è sì, e che una persona a quaranta metri, senza bombole, senza luce, dopo venti minuti, non si vede perché non c'è niente da vedere.

La cima, sopra la testa, ha ripreso a vibrare.

**(🫁 Fiato −6: cinque metri di troppo si pagano tutti, e la sosta ricomincia da capo. 🎵 Attenzione del Coro +1: siete scesi perché ve l'ha chiesto, e questo lo sa. Il Quaderno registra che una cosa a quaranta metri di profondità era visibile a occhio nudo, e che vi ha chiesto se la vedevate.)**`,
    goldLoss: 6,
    attenzione: 1,
    sets: { scesa_a_vedere: true },
    choices: [
      { text: '⬆️ Su. Adesso, e la sosta si rifa da capo', next: 'd14_coro' },
    ],
  },

  /* MARISA IN PIEDI SUL FONDO, e il numero che Gaetano dice sbagliato con la voce di
     sempre. Due orfani trovano un consumatore: `visto_il_fondo`, che il minigioco
     dell'apnea assegnava a chi spendeva tre metri di fiato per guardare e che nessuna
     scena leggeva, diventa il cancello di questa scena; e `maschera_1997` — consegnata
     nella cisterna e mai richiesta da nessuna scelta — diventa una cosa che si RESTITUISCE.
     E la narcosi non fa vedere mostri: fa dire un numero sbagliato con la faccia di uno che
     ha ragione. Tocca solo un numero narrativo, mai il Fiato e mai i metri raggiungibili:
     il briefing continua a dire la verita, e la scena dopo dichiara qual era il numero
     falso. Quaggiu i conti che vi tengono in vita non mentono mai. Mente il resto. */
  d13_marisa: {
    location: 'relitto',
    caption: 'Risalendo — la cosa in piedi',
    metri: 45,
    stinger: 'pressione',
    text: `Sta trenta metri più in là dello squarcio, sul fondo piatto di sedimento, ed è in piedi.

Muta da cinque millimetri, azzurra e nera, di quelle a due pezzi che si vendevano negli anni Novanta. Le braccia lungo i fianchi. La testa alzata di dieci gradi, come si alza la testa per guardare una cosa che sale.

Gaetano la inquadra col fascio e fa la cosa che fa lui: le dà un numero.

> Gaetano: *(dentro l'erogatore, e la voce esce ferma e allegra, la voce di uno che ha risolto)* "Cinquantadue metri. Sta a **cinquantadue metri**, sono sicuro, l'ho contata sulla cima: cinquantadue."

E lo dice bene. Lo dice con lo stesso tono con cui ha detto ottantadue, e trenta e mezzo, e ottomilaquarantuno, e in tre giorni quel tono non ha mai sbagliato una volta.

Claudia gli mette la mano sul braccio e gli fa segno di guardare la cima. Poi gli fa il segno dei nodi, uno per uno, con l'indice, senza fretta, come si spiega una cosa a uno che sta bene.

La cima è calata dalla barca e ha trentun nodi fino alla cengia. Da lì giù, quattordici metri fino alla stiva. Trentuno più quattordici fa quarantacinque, e sotto la stiva il fondo prosegue per un metro e finisce.

Gaetano guarda i nodi. Guarda la cosa in piedi. Guarda i nodi.

Poi lascia andare tutta l'aria che aveva in bocca per parlare, e non parla più fino alla sosta.

**(⚠️ Uno dei due ha appena dato un numero sbagliato con la faccia di uno che ha ragione, e l'altra se n'è accorta prima di lui. Il Fiato e la TENUTA non si toccano: quaggiù i conti che vi tengono in vita non mentono mai. Mente il resto.)**`,
    sets: { vista_marisa: true },
    choices: [
      { text: '🤿 Lasciarle la sua maschera. Appoggiarla sul sedimento a due metri, non in mano',
        requires: { item: 'maschera_1997' }, once: true, removeItem: 'maschera_1997',
        gold: 2, sets: { maschera_restituita: true }, next: 'd14_coro' },
      { text: '📸 Fotografarla per intero, muta e faccia, e non risalire finché non è tutta nell\'inquadratura',
        once: true, damage: 4, sets: { marisa_documentata: true }, next: 'd14_coro' },
      { text: '⬆️ Non avvicinarsi di un metro. Su, alla sosta', next: 'd14_coro' },
    ],
  },

  d14_coro: {
    location: 'fossa',
    /* La didascalia diceva «la sosta a dieci metri» mentre la scena sta a QUARANTA
       (`metri: 40`): la sosta era una parola in una didascalia, non una cosa che accade.
       Adesso la sosta esiste per davvero e sta dopo, dove deve stare — hai appena visto
       la cosa, e non puoi uscire per sette minuti. */
    caption: 'Sulla verticale della cima — la risalita interrotta',
    heal: 12,
    recharge: true,
    stinger: 'coro',
    metri: 40,
    text: `A quaranta metri, sulla verticale, la risalita si ferma.

Non per una mano, non per una corrente: la cima è **tesa in giù**. Quaranta metri di corda con un piombo in fondo, tirati verso il basso da qualcosa che non si vede, e in cima alla corda due persone appese a un filo che qualcuno sta tenendo dall'altra parte.

E allora arriva.

Non ha una forma: ha un **volume**. L'acqua intorno smette di essere acqua e diventa una cosa che ha delle voci dentro come uno sciame ha delle api, e le voci sono tutte insieme e tutte separate — latino, napoletano, dialetto di Sicilia, una preghiera, un cane, un numero di matricola detto e ridetto — e non urlano. Parlano.

E una viene avanti, e questa è italiano di trent'anni fa, con l'accento di qui, e ha il tono allegro e pratico di chi ha fatto quel mestiere per vent'anni:

> "Claudia. Ciao. Sono Marisa." *(pausa, e la pausa è quella giusta)* "Stai respirando male: stai buttando fuori troppo presto. Te lo insegno io. Ci metto dieci minuti e non ti fa più paura niente."

Risalgono alla sosta dei dieci metri, dove c'è aria in bocca per parlare. Claudia si strappa l'erogatore e la prima cosa che dice non è una domanda.

> Claudia: "Non le rispondo. Non le rispondo, Gaetano, mi ha chiamata per nome e non le rispondo."
*(e poi, se c'è stato un venerdì pomeriggio su un gommone)*

> Claudia: "E poi mi ha detto una cosa sbagliata."

> Gaetano: "Quale?"

> Claudia: "Che mi insegna a respirare." *(si asciuga la faccia con la mano bagnata, gesto inutile e umanissimo)* "Me l'ha già insegnato Lilia. Venerdì, alle tre del pomeriggio, in mezzo alle calette, con l'elastico nei capelli e le pinne in mano. E non mi ha promesso che non avrei più avuto paura: mi ha detto di **annoiarmi**." *(guarda il nero)* "Quella lì mi promette che non avrò più paura di niente. Chi ti promette che non avrai più paura di niente ti sta chiedendo tutto."

E qui il Coro fa la sua unica mossa elegante di tutta la notte. Tutte le voci, insieme, dicono la parola che duemila anni di gente ha usato per dire *questo posto*:

> IL CORO: "**Pandataria.** Dispensatrice di ogni bene."

> IL CORO: *(e per la prima volta dice una cosa che si può controllare)* "Quelli di paradiso non li sentite. Quelli erano già zitti." *(pausa)* "Purgatorio parla la notte. Inferno non ha mai smesso: non aveva finestre, e non ha imparato a stare fermo."

> Claudia: *(dentro l'erogatore, e non si capisce, e la dice comunque)* "Quelli sono i nomi dei piani."

> IL CORO: "Sono i nomi che avevano. Io uso quelli che mi hanno dato."

Lo dice come si dice un titolo. Come chi presenta la casa.

> Gaetano: *(e per la prima volta stanotte gli trema la voce, e non è paura, è rabbia)* "Dà tutto e non restituisce niente. Non è generosità, quella." *(e lo dice all'acqua, non a Claudia)* "È un **fondale di tenuta**. Ce l'hai scritto in tutti i nomi che ti hanno dato: quello che ti butti sotto, sotto rimane."


> Gaetano: "Brava. **Brava.**" *(e poi si ferma, perché ha appena finito un conto lunghissimo)* "Claudia. Giulia l'hanno **portata**. I detenuti li hanno **portati**. I bambini del quarantatré li hanno **imbarcati**. Marisa è scesa perché una voce l'ha chiamata e lei ha risposto." *(la guarda)* "Nessuno di quelli là sotto è venuto qui volendo. In duemila anni, **nessuno**."

> Claudia: "E noi—"

> Gaetano: "E noi abbiamo pagato quarantasei euro a testa, abbiamo prenotato la stanza con la terrazza a maggio e abbiamo litigato sul phon."

> Claudia: *(e la capisce tutta insieme, e la dice piano)* "Non ci vuole morti."

> Gaetano: "No. Ai morti ci arriva comunque, e ha imparato che i morti non gli bastano: un morto sta e basta. Ci vuole **presenti**." *(guarda il nero sotto i piedi)* "Vuole due che sono venuti per scelta loro e che se ne potrebbero andare per scelta loro. Per questo il trenta agosto non finisce: perché finché non salite su quel traghetto siete gli unici, in duemila anni, che stanno qui **volendo**."

Sotto di loro, tutte le voci insieme dicono la stessa cosa nello stesso momento, con calma, in italiano:

> IL CORO: "Restate."

**(⚠️ Il gioco lo dice una volta sola e non lo ripete: il Coro non vi vuole morti, vi vuole PRESENTI. Da qui si sale o si scende, e sono due fini diverse.)**

> Claudia: *(se hanno guardato la cosa in piedi sul fondo — alla sosta, dove c'è aria in bocca per parlare, e lo dice piano perché non è un rimprovero)* "Cinquantadue non esiste. Lì sotto il fondo sta a quarantasei e la cima ne conta quarantacinque."

> Gaetano: "Lo so. L'ho sentito uscire e l'ho sentito giusto." *(si guarda le mani)* "È questo il pezzo che non mi aspettavo: che uscisse giusto."`,
    sets: { d_capito_tutto: true },
    choices: [
      { text: '🎧 Ascoltare quella voce. Quella sola, in mezzo a tutte le altre',
        requires: { spirit: true }, once: true, next: 'd14_voce' },
      { text: '⚔️ Rispondere di no. Con tutto quello che avete addosso', next: 'd14_boss' },
      { text: '🧂 Rispondere di no col sale della sua stessa acqua in mano', requires: { item: 'salamoia' }, sets: { sale_pronto: true }, next: 'd14_boss' },
      { text: '🧱 Sigillare la bocca: sapete dov\'è la sesta cisterna e avete lo stucco', requires: { item: 'stucco', flag: 'sa_sesta_cisterna' }, next: 'e_vittoria' },
      { text: '🎵 Rispondere di sì. Aprire la bocca e cantare con loro', tag: '⚠️ Questa è una fine, e per chi vi vuole bene non ne esiste una peggiore', next: 'e_coro' },
      { text: '⬆️ Non rispondere niente e risalire. Fino a dieci metri, e lì fermarsi', goldLoss: 2, next: 'd14_sosta1' },
    ],
  },

  d14_boss: {
    location: 'fossa',
    caption: 'IL CORO — sulla verticale della cima',
    stinger: 'coro',
    metri: 40,
    text: `Rispondono di no.

Lo dicono in due, dentro l'acqua, e l'acqua non porta le parole ma porta l'intenzione, e l'intenzione è chiarissima.

E allora il Coro fa la cosa che sa fare, l'unica: **canta**.

Duemila anni di voci tenute insieme in un accordo che non si risolve mai. Ed è bello — questa è la parte che non si potrà raccontare a chi non c'era, e che vi rovinerà tutte le canzoni per il resto della vita: quella cosa lì è **bella**. Una melodia semplice, in una scala che sul pianoforte non esiste, orecchiabile e sbagliata, e la senti nello sterno prima che nelle orecchie.

Se Assuntina dorme, l'accordo ha in mezzo un buco grosso come una casa e non tiene il tempo. Se non dorme, tiene — e allora è tutto molto più difficile.

> Gaetano: *(nell'erogatore, e non si capisce niente, e lo dice comunque perché lo deve dire)* "Quaranta metri. Il canto arriva da quaranta metri **e da zero metri contemporaneamente**."

E il Coro perde una nota, perché una cosa impossibile ha appena ricevuto un numero.

> Claudia: *(la ring light in mano, quattromila lumen puntati nel nero, il pollice sul pulsante)* "Guardaci."

**(⚔️ BOSS FINALE: IL CORO. Sessantasei di TENUTA, ruba vita, colpisce tutti insieme. Quello che avete capito conta: i misteri risolti, gli oggetti craftati, e quanto vi hanno notato — l'attenzione del Coro si paga adesso, davanti a tutti.)**

*(Se il vostro sì è ancora in acqua — se nessuno ha cantato la seconda strofa ad Assuntina — il Coro non deve chiamare nessuno: ha già una voce che ha detto sì, e la usa. Parte con sei punti di vita in più e uno dei due comincia con l'**acqua nei polmoni**: −2 a tutto, e passa solo col caffè di Ada o col proprio nome detto dall'altro. Il registro di combattimento lo scrive per esteso, perché una cosa che vi fa male dovete poterla leggere.)*`,
    combat: {
      enemies: ['coro_vero'],
      victory: 'd15_uscite',
      defeat: 'd9_ko',
      loot: { gold: 3 },
    },
    choices: [],
  },

  /* LA SOSTA. Il momento in cui la fuga e fisicamente VIETATA — la superficie si vede, la
     carena della barca e la sopra, e non si puo salire — era scritto come una parola in una
     didascalia. Adesso sono due minuti giocati, il briefing dichiara il conto PRIMA di far
     scendere (quindi la morte non e mai nascosta e il patto del Fiato resta intero), e
     dentro l'attesa ci sono azioni diverse a ogni minuto. */
  d14_sosta1: {
    location: 'fossa',
    caption: 'La sosta — sette minuti a dieci metri',
    metri: 10,
    stinger: 'apnea',
    text: `Dieci metri. Da qui la superficie è una cosa che **si vede**: un disco di luce mosso, e sopra il disco la carena della barca di Ciro, nera e piccola come una scarpa.

Il cronometro dice 00:07:00 e comincia a scendere.

E la cima, sotto i piedi, è ancora tesa in giù. Quaranta metri di corda con un piombo in fondo, tirati verso il basso da qualcosa che non si vede: vibra come una corda di basso, e la vibrazione arriva ai denti passando per il guanto.

Gaetano non può parlare con l'erogatore in bocca. Allora conta con le dita, girato verso di lei: sei, cinque, quattro.

Claudia guarda in su. Poi guarda giù. Poi guarda in su un'altra volta, e la seconda volta ci mette meno.

Sette minuti sono quattrocentoventi secondi: il tempo di una canzone e mezza. Sono anche il tempo che serve a una cosa che non ha nessuna fretta per farsi i quaranta metri che la separano dalle vostre pinne.

**(🫁 Fiato −1: la sosta si paga in aria. Non si può salire e la superficie si vede — fate qualcosa con le mani, perché l'alternativa è contare.)**`,
    goldLoss: 1,
    sets: { sosta_iniziata: true },
    choices: [
      { text: '🧮 [Gaetano] Cronometrare la vibrazione della cima e dirne la frequenza a gesti',
        requires: { hero: 'gaetano' }, once: true, sets: { sosta_misurata: true }, gold: 1, next: 'd14_sosta2' },
      { text: '🫂 Maschera contro maschera, faccia a faccia, e respirare insieme', once: true, heal: 4, next: 'd14_sosta2' },
      { text: '🔦 Spegnere le torce. Tutte e due. Venti secondi', once: true, sets: { torcia_spenta: true }, next: 'd14_sosta2' },
      { text: '⏱ Contare. Solo contare, fino alla fine', next: 'd14_sosta2' },
    ],
  },

  d14_sosta2: {
    location: 'fossa',
    caption: 'La sosta — gli ultimi tre minuti',
    metri: 10,
    stinger: 'apnea',
    silenzio: true,
    text: `Tre minuti. A dieci metri, con l'aria che basta, tre minuti sono una cosa lunghissima e non c'è niente da fare che li accorci.

La superficie continua a essere là. Il disco di luce si muove piano, e ogni tanto una piccola onda lo taglia in due e poi lo rimette insieme.

E a un certo punto la cima **smette di essere tesa**.

Non si allenta piano: smette. Come quando qualcuno dall'altra parte lascia la presa e la corda torna a fare quello che fa una corda con un piombo in fondo — cade dritta, e basta.

Sotto non c'è più niente che tiri.

Il cronometro dice 00:00:41. Nessuno dei due sale. Restano appesi a dieci metri per quarantun secondi, a guardare in giù una corda che non fa più niente, e sono i quarantun secondi peggiori dei quattro giorni.

Poi il cronometro fa zero, e la mano di Gaetano si apre e si chiude due volte: *tutto bene, andiamo*.

**(🫁 Fiato −1. La sosta è stata fatta per intero, e nessuno dei due è salito prima. Il Quaderno registra l'ora esatta in cui la cima ha smesso di tirare — e registra che avete finito di contare comunque.)**`,
    goldLoss: 1,
    sets: { sosta_finita: true },
    choices: [
      { text: '⬆️ Superficie. Tre metri, e fuori', next: 'd15_uscite' },
    ],
  },

  d15_uscite: {
    location: 'porto',
    caption: 'Porto Romano — il portellone aperto, ore 17:22',
    metri: 0,
    text: `Il porto romano alle diciassette e ventidue.

La cava di tufo, i buchi quadrati per le travi, l'acqua nera e liscia. Non c'è nessuno. Non c'è mai stato nessuno, oggi.

Il traghetto è all'ormeggio, spento, col portellone di poppa calato sulla banchina e la rampa a posto. Il garage è vuoto, la luce di servizio accesa. Dentro non c'è un marinaio, non c'è un motore che gira, non c'è una voce.

Ma la rampa è **giù**, e sopra la rampa ci sono trenta metri di lamiera che portano fuori.

Sono in piedi sulla banchina con le sacche in mano, bagnati, e uno dei due ha in tasca un cavallino di celluloide.

> Claudia: "Se saliamo, parte?"

> Gaetano: "Non lo so."

> Claudia: "Tu sai sempre."

> Gaetano: *(e appoggia la sacca in terra, che è il suo modo di dire che non ha un dato)* "Stavolta no. So una cosa sola: che finché stiamo su questa banchina siamo qui **volendo**. E quella cosa là sotto campa di questo."

Il sole è basso. L'ombra del campanile arriva a metà della rampa.

Dietro di loro l'isola: le case gialle, la scaletta delle parracine, il limone in vaso di Ada che ha più limoni di quanti se ne possano mangiare. Davanti, trenta metri di lamiera vuota.

> Claudia: "Ok." *(gli prende la mano — non per aiuto: per riferimento)* "Decidiamo."

**(⚠️ ULTIMA SCELTA. Non c'è un dado, non c'è una prova, non c'è modo di ritirare. Quello che avete capito in questi quattro giorni sta nel Quaderno, e adesso conta tutto.)**`,
    sets: { d_banchina_finale: true },
    choices: [
      { text: '🎵 Salire, e portarsi dietro il nome di Assuntina e la sua seconda strofa', requires: { flag: 'sa_ninnananna' }, next: 'e_vittoria' },
      { text: '🕯 Salire, e dire ad alta voce, sulla rampa, "Nicola Sperduto"', requires: { flag: 'sa_nome_guardia' }, next: 'e_vittoria' },
      { text: '🧱 Salire, sapendo dov\'è la sesta cisterna e che una bocca si può richiudere', requires: { flag: 'sa_sesta_cisterna' }, next: 'e_vittoria' },
      { text: '🧭 Salire: il confine di quella cosa passa davanti alla bocca del porto, e la rampa è oltre', requires: { flag: 'sa_confine' }, next: 'e_vittoria' },
      { text: '🚢 Salire e basta. Vivi, insieme, e senza aver capito un cazzo', gold: 1, next: 'e_vittoria_muta' },
      { text: '🕯 Uno dei due non sale. E non sale perché salga l\'altro', next: 'd15_scambio' },
      { text: '🏠 Uno dei due non sale, e non è per l\'altro: è perché ha deciso di restare', next: 'd15_resta' },
      { text: '🛏 Non salire. Tornare alle Parracine, mettersi a letto, e domani è oggi', tag: '⚠️ Nessuno vi prende, nessuno muore. È la fine peggiore che abbia questo gioco', next: 'e_loop' },
    ],
  },

  d15_scambio: {
    location: 'porto',
    caption: 'Sulla rampa — uno dei due',
    stinger: 'voce_amata',
    metri: 0,
    text: `Non è una discussione. Le discussioni le hanno già fatte tutte, in dieci anni, sul phon e sulle valigie e su chi ha ragione.

Questa è una di quelle cose che si dicono una volta e restano dette.

> "Tu sali."

> "No."

> "Tu sali, e io resto, e quella cosa là sotto si tiene una persona che è venuta qui **volendo**. Ed è esattamente quello che chiedeva. Si accontenta."

> "Ho detto no."

> "Allora restiamo tutti e due, e domani è oggi, e dopodomani è oggi, e fra quarant'anni è ancora oggi e siamo due vecchi che si tengono la mano sulla stessa banchina." *(pausa)* "Guardami. **Guardami.** Uno di noi due deve tornare a Scauri e raccontare che siamo esistiti."

E mentre lo dicono, l'acqua ai piedi della rampa dice una frase.

Non da sotto e non forte: da mezzo metro, all'altezza delle caviglie, con la calma di un impiegato che legge una pratica ad alta voce per controllare di averla scritta bene. Vocali larghe, l'italiano dei cinegiornali. Nessuna eco.

> LA VOCE: "Si dà atto che la predetta è discesa di sua spontanea volontà."

Poi va avanti, e va avanti in ordine, come si scorre un fascicolo con l'indice sulla riga.

> LA VOCE: "Del diciotto ottobre risulta rifiuto di cibo. Del nove giugno risulta che si è tolta la vita da sé, e il Senato ne ha reso grazie agli dèi. Del ventitré settembre risulta immersione non autorizzata, condotta in solitaria, contro le norme." *(una pausa esatta, della lunghezza di una riga)* "Io non prendo nessuno, signora. Io **verbalizzo**."

> Claudia: "E il verbale?"

> LA VOCE: "Il verbale è l'unica cosa che resta. Le persone non le legge nessuno. La carta sì."

Gaetano appoggia la sacca in terra per la seconda volta in dieci minuti.

> Gaetano: *(e non lo dice all'acqua, lo dice a lei)* "Ha ragione su una cosa sola: che quello che resta è quello che sta scritto." *(la guarda)* "Allora scriviamolo noi."

In mezzo alla rampa si fermano.

Uno dei due si toglie una cosa dal collo e la mette in mano all'altro. E chi resta non lo fa per essere ricordato: lo fa perché ha fatto un conto, e il conto torna, e nel conto ci sono quarant'anni di una persona che vive contro un giorno che non finisce mai per due.

> "Ogni trenta agosto io torno."

> "Lo so che torni."

> "Ogni trenta agosto, alle cinque e mezza, io sto su questa banchina. E porto l'idrofono."

> "Lo so. È per questo che ti lascio andare."

**(🕯 DECISIONE IRREVERSIBILE. Chi resta viene PRESO dal Coro: diventa una voce, e quella voce parlerà all'altro per il resto dei suoi giorni. Chi sale vive, e torna ogni trenta agosto. Scegliete chi, al tavolo, ad alta voce.)**`,
    choices: [
      /* La prima volta che il premio di un mistero annulla una scelta irreversibile
         invece di dare un bonus di combattimento: chi ha in tasca il nome della guardia
         puo rispondere al verbale, e il tavolo torna alla scelta finale con tutti e due
         vivi. Chi non ce l'ha, no. */
      { text: '🕯 Rispondere al verbale con un nome: «Nicola Sperduto, quarantatré anni, rimasto in servizio. Questo non risulta a nessuno, e lo sappiamo noi.»',
        requires: { flag: 'sa_nome_guardia' }, once: true, heal: 6, gold: 2,
        sets: { verbale_rifiutato: true }, next: 'd15_uscite' },
      { text: '🕯 Scegliere chi resta. E salire, senza girarsi', sacrifice: true, sacrificeSets: 'chi_e_rimasto', sacrificeTitle: 'Chi resta sulla banchina?', sacrificeText: 'Decidetelo insieme, ad alta voce, guardandovi in faccia. Chi resta viene preso dal Coro e diventa una voce. Chi sale vive, e torna ogni trenta agosto per il resto della vita. Non si rifà.', next: 'e_scambio' },
      { text: '↩ No. Tornare indietro sulla rampa e riparlarne', heal: 2, next: 'd15_uscite' },
    ],
  },

  d15_resta: {
    location: 'porto',
    caption: 'In fondo alla rampa — la scelta che nessuno si aspetta',
    stinger: 'sigillo',
    metri: 0,
    text: `Questa è diversa, e ci vuole più coraggio a dirla, perché non c'è dentro niente di eroico e non si può raccontare bene a nessuno.

Uno dei due appoggia la sacca in terra, in fondo alla rampa, e non la riprende.

> "Io non salgo."

> "Perché."

> "Non per te. Voglio che sia chiaro: **non per te**." *(e guarda l'isola, non la lamiera)* "Perché quella creatura di sei anni ha aspettato ottantadue anni che qualcuno le tenesse la mano. E ce n'è un centinaio come lei, e Giulia dietro un muro fatto in fretta, e una guardia che sta ancora facendo il turno in una prigione vuota da sessant'anni. E Marisa, che aveva detto a due francesi che ci metteva dieci minuti a non farti più paura niente."

> "Questo non è compito tuo."

> "No. È che non è compito di nessuno, e io sono qui." *(e sorride, e il sorriso è vero)* "Poi c'è un'altra cosa. Quella cosa là sotto adesso ha capito che noi possiamo andarcene. Se ce ne andiamo tutti e due si mette a chiamare i prossimi: un altro traghetto, un'altra coppia, un altro giovedì d'agosto. E i prossimi non sanno che non si risponde."

> "Torno a prenderti."

> "Certo che torni. Portati l'idrofono." *(pausa)* "E poi, sai, io a una l'ho promesso: che le insegnavo a nuotare. L'ho detto io, nessuno me l'ha chiesto. Le promesse dette a voce alta sopra il mare, su quest'isola, contano."

E allora chi parte sale, e chi resta si siede sul bordo della banchina, coi piedi a venti centimetri dall'acqua nera del porto romano, e aspetta il tramonto come si aspetta l'inizio di un turno.

**(🕯 DECISIONE IRREVERSIBILE, e non è un sacrificio: è una SCELTA. Chi resta lo fa di sua volontà, per mettersi in mezzo fra quella cosa e i prossimi che arriveranno. Scegliete chi, al tavolo, ad alta voce.)**`,
    choices: [
      /* `resta: true`: qui NON muore nessuno. Il motore marca l'eroe come `rimasto`
         (🌊 È RIMASTO), non come `morto`, e imposta `rimasto_<id>`. Senza questa chiave
         il finale e_resta seppellirebbe una persona viva. */
      { text: '🏠 Scegliere chi resta sull\'isola, di sua volontà', sacrifice: true, resta: true, sacrificeSets: 'chi_ha_scelto_di_restare', sacrificeTitle: 'Chi resta sull\'isola?', sacrificeText: 'Non è un sacrificio per l\'altro: è una scelta propria, presa a mente lucida, per mettersi in mezzo fra quella cosa e i prossimi che arriveranno. Decidetelo insieme, ad alta voce.', next: 'e_resta' },
      { text: '↩ Sedersi in due sul bordo della banchina e ripensarci', heal: 2, gold: 1, next: 'd15_uscite' },
    ],
  },

};

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

Alle Parracine il caffè è nel thermos di acciaio, quello col tappo che si svita male. Sul tavolo della cucina, accanto al thermos, c'è il registratore.

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

L'isola si stacca. È questo che fa: non sei tu che vai via, è lei che si stacca. Il paese giallo e rosa diventa una fila di sassi ordinati, la scaletta delle parracine una riga, Cala Nave una virgola bianca. La boa gialla si vede per quattro minuti e poi non si vede più.

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
      { text: '📋 Dirlo al vento: che i tre piani si chiamavano inferno, purgatorio e paradiso, e che quei nomi non li ha inventati un fantasma — li ha battuti a macchina un ufficio',
        requires: { flag: 'sa_i_tre_piani' }, once: true, sets: { detto_i_piani: true } },
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

A Lilia arriva tutto: le tredici pagine, i file, le misure, la lista con l'ultimo nome battuto a macchina. Risponde in ventidue minuti con un vocale di quattro secondi in cui si sente solo che sta camminando, e poi: *"Vi richiamo che sto salendo."* Richiama alle undici di sera e stanno al telefono un'ora e dieci.

Alla fine chiede una cosa sola, e la chiede da fotografa: *"La cartella di quattro anni fa la posso tenere?"* E poi, prima di chiudere: *"Quella foto sul gommone, quella di Claudia di spalle — l'ho stampata. Sta sul frigo anche a me."*

Del nome dell'isola non parlano più con nessuno, ma fra loro tre è diventata una battuta che non fa ridere. Quando qualcuno in chat dice «bella Ventotene», uno dei tre risponde sempre con la stessa parola sola: **Pandataria.** E gli altri due mettono il cuore, e nessuno spiega niente.

**Il primo settembre sono dieci anni.** Cade di martedì, come previsto, e il martedì si lavora: quindi la cena è alle nove e mezza in una pizzeria di Formia con l'aria condizionata troppo forte, e il regalo dei dieci anni è già stato speso tutto — quattro giorni su un'isola, prenotati a febbraio, pagati, e tenuti segreti per un mese e mezzo.

Claudia tira fuori dalla borsa una cosa piccola avvolta nella carta del pane e la posa sul tavolo, in mezzo ai bicchieri.

È una maschera. Non una nuova: **la sua**, quella di marzo, col silicone segnato dove l'ha stretta troppo. E dentro, sul bordo del vetro, scritto col pennarello indelebile in stampatello — come si scrivono le cose sulle attrezzature, per non confonderle con quelle di un altro — ci sono **una data e due iniziali**. Le stesse che stanno incise dentro le fedi.

> Gaetano: *(che ha capito e non riesce a dirlo)* "Claudia."

> Claudia: "Tu me ne hai comprate due a marzo e non me l'hai detto. Io te ne segno una e te lo dico." *(la spinge di due centimetri verso di lui)* "Non è un regalo. È un'attrezzatura assegnata."

Poi dice la frase per cui dieci anni sono stati una specie di rincorsa, e la dice guardando il tovagliolo, perché certe cose non si dicono in faccia:

> Claudia: "L'anno prossimo la fossa la guardiamo insieme. Non da sopra." *(pausa)* "E la prima che scende sono io."

Il resto è la vita. Gaetano ha ripreso a misurare cose lontanissime. Claudia ha ripreso a decidere come si guardano le cose. Il 4 ottobre, a Serapo, con l'acqua a diciannove gradi e la spiaggia vuota, è entrata con maschera, pinne e boccaglio e ha nuotato fino alla terza boa senza chiedere a nessuno quanto fosse profondo.

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

Il primo settembre, che è due giorni dopo il ritorno, sono dieci anni. Cade di martedì e si lavora, quindi si festeggia alle nove e mezza con una pizza, e nessuno dei due dice ad alta voce che il regalo dei dieci anni sono stati quattro giorni in cui hanno tenuto la bocca chiusa davanti a una cosa che chiedeva di essere lasciata entrare. Claudia gli mette in mano la sua maschera, con una data e due iniziali scritte dentro col pennarello, le stesse delle fedi. Non serve aggiungere altro.

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

Quello che invece si sente ogni anno è il primo settembre: dieci anni, poi undici, poi dodici. Cade sempre in mezzo alla settimana e si festeggia sempre di corsa, e va bene così — perché quella data non ha bisogno di prove. È l'unica cosa di tutta questa storia che non gli serve dimostrare a nessuno.

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

Il quarto anno chiede alla Capitaneria l'elenco dei passeggeri della corsa delle diciassette e trenta del 30 agosto 2026. Non fa storie nessuno: glielo mandano per posta in tre giorni, due fogli e un timbro tondo.

Alla riga del nome che cerca ci sono una sigla e due parole, battute con la stessa macchina di tutte le altre righe:

**n.i. — rinuncia volontaria.**

Non imbarcata. Rinuncia volontaria. Nessuno ha barato e nessuno ha mentito: la biglietteria stampa quello che le dicono, e quella sera qualcuno alla biglietteria ha detto quella cosa lì perché era la casella che c'era.

E allora fa l'unica cosa che si può fare contro un verbale, e ci mette dieci secondi.

Prende una penna. Sotto la riga stampata, nello spazio bianco del foglio, scrive il nome per intero, a mano, con le lettere grandi, e l'ultima schiacciata contro il bordo perché lo spazio era finito e lui non l'aveva calcolato.

Esattamente come fece una madre su una lista d'imbarco, il ventiquattro luglio del millenovecentoquarantatré, per portarsi appresso sua figlia.

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
    caption: 'Dentro la nota — e alle Parracine, il 31 agosto',
    ending: true,
    text: `Non c'è buio. Il buio era prima, quando c'erano gli occhi.

C'è la nota, larga come una stanza, e dentro ci sono ottocento persone che tengono il tempo da così tanto che il tempo ha preso la loro forma. C'è **Giulia**, che chiede ancora del figlio e ha il naso importante anche nella voce. C'è una **guardia** che dice "sono le due, tutto regolare" ogni due ore da sessant'anni. C'è una **bambina** che canta e non si ferma, perché se lei si ferma le altre si spaventano.

E c'è una donna di quarant'anni, istruttrice di sub, che nel 1997 ha risposto. Quando li sente arrivare dice le due cose che diceva da viva, in quest'ordine:

> Marisa: "Stai respirando male. Ci metto dieci minuti e non ti fa più paura niente." *(pausa)* "Ada è mia sorella. Ditele che sto bene."

Non possono. È questa la cosa: non possono più dire niente a nessuno di sopra. Ma ci sono due voci nuove, arrivate insieme, che si tengono — e questa è la crudeltà vera, detta in chiaro: **non siete soli.** Vi sentite. Sapete chi è l'altro, per sempre, e *per sempre* laggiù è una parola che significa qualcosa. Cantate la stessa nota a millesimi di secondo di distanza, quello scarto sotto i trenta millisecondi che fa sembrare un coro più grande di quanto sia, e ogni tanto uno dei due dice il nome dell'altro dentro il canto, e l'altro risponde, e non vi perdete.

Il Coro adesso ha una cosa che in duemila anni non aveva mai avuto: due voci che erano già insieme prima.

---

Alle Parracine, il 31 agosto alle undici, Ada entra nella stanza con la terrazza. Trova due borsoni fatti a metà, un phon, due maschere identiche appoggiate una sull'altra e un foglietto attaccato allo specchio col nastro, con due righe di penna diversa.

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
    caption: 'Le Parracine, camera due — la terza volta',
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

/* ============ LA CAMPAGNA COMPLETA ============ */
const CAMPAIGN = Object.assign({}, SCENE_A, SCENE_B, SCENE_C, SCENE_D, SCENE_E);
const CAMPAIGN_START = 'a0';

/* ============ PANDATARIA — footer della campagna ============
   CHAPTERS (barra dei capitoli / rientro) · DIARY_FLAGS (📔 Diario di viaggio)
   WORLD_MAP + MAP_ZONE_BY_LOCATION (🗺 la mappa dell'isola).
   Formati verificati su js/engine.js — non cambiarli a occhio:
     · CHAPTERS   → engine.js:1057 showRevive(), :1078 startChapter(), :1228
                    renderEnding(). Campi letti: { id | scene, prefixes[], label,
                    desc, flags?, items?, addHero? }. La destinazione è
                    `c.scene || c.id` e DEVE essere una scena di CAMPAIGN.
                    `prefixes` serve al conteggio "quanto avete visto".
     · DIARY_FLAGS→ engine.js:1105 showDiary(): `DIARY_FLAGS.filter(([f]) => …)
                    .map(([, t]) => …)`. Sono COPPIE `['flag', 'testo']`, non
                    oggetti. L'ordine è l'ordine di visualizzazione.
     · WORLD_MAP  → engine.js:963-999 drawMap(). Campi: { key, label, x, y,
                    scenes[] }, con x/y in frazioni di 0-1. Gli array `scenes`
                    NON si scrivono a mano: li riempie il ciclo in fondo a
                    questo file, via MAP_ZONE_BY_LOCATION[scene.location].
   CAMPAIGN e CAMPAIGN_START li dichiara tests/assemble.mjs: qui NON si ridichiarano.
                                                                                  */

/* ============ I CAPITOLI — uno per giornata, più gli epiloghi ============
   Servono a due cose: la percentuale di esplorazione per capitolo (mostrata a
   fine partita, "quello che non vi ha mostrato") e il rientro dopo il primo
   finale. Ogni capitolo prepara i flag e lo zaino minimi per essere giocabile
   da lì. Se gli atti B/C/D cambiano la scena d'ingresso, aggiornare `id`.      */

const CHAPTERS = [
  { id: 'a0', prefixes: ['a'],
    label: '☀️ Giovedì 27 — l\'arrivo',
    desc: 'Scauri, Formia, il traghetto. Le Parracine, Cala Nave, la boa gialla. E una nota sola.' },

  { id: 'b0', prefixes: ['b'],
    label: '🕯 Venerdì 28 — le cisterne',
    desc: 'Dietro la chiesa, sotto il paese: sei cisterne, quattro murate, e la prima voce che risponde.',
    flags: { giorno_27_chiuso: true, arrivati_parracine: true, ada_amica: true, gaetano_crede: true,
             valigie_fatte: true, i_registro_acqua: true, i_foto_museo: true, sa_la_corda: true,
             sa_di_ciro: true, registrata_nota: true, sa_il_nome: true },
    items: ['torcia_sub', 'nastro_isolante', 'microfono', 'preservativo', 'gopro', 'asta_selfie',
            'coltello', 'filo_nylon', 'foto_bambina', 'caffe_parracine', 'maschera_buona',
            'anello_gaetano', 'anello_claudia'] },

  { id: 'c0', prefixes: ['c'],
    label: '⛓ Sabato 29 — Santo Stefano',
    desc: 'Il panopticon, la cella 47, il cimitero dei detenuti. E un pescatore che sale in barca con voi.',
    flags: { giorno_27_chiuso: true, giorno_28_chiuso: true, ada_amica: true, appuntamento_ciro: true,
             i_registro_acqua: true, i_foto_museo: true, i_iscrizione: true, i_seconda: true,
             i_eco_misurata: true, i_ninna_sentita: true, promessa_incisa: true, sa_confine: true },
    items: ['torcia_sub', 'nastro_isolante', 'cavo_lungo', 'medaglietta_giulia', 'sale_grosso',
            'resina', 'filo_nylon', 'foto_bambina', 'caffe_parracine', 'taralli',
            'idrofono', 'torcia_da_casco', 'anello_gaetano', 'anello_claudia'] },

  { id: 'd0', prefixes: ['d'],
    label: '🔁 Domenica 30 — il giorno che non finisce',
    desc: 'Il traghetto delle 17:30 non parte, e alle 18:40 la giornata si riavvolge. Si esce solo scendendo.',
    addHero: 'ciro',
    flags: { giorno_27_chiuso: true, giorno_28_chiuso: true, giorno_29_chiuso: true,
             ciro_in_squadra: true, ada_amica: true, promessa_incisa: true, sa_confine: true,
             claudia_ha_promesso: true, gaetano_ha_taciuto: true,
             i_iscrizione: true, i_seconda: true, i_registro_acqua: true, i_eco_misurata: true,
             i_graffito: true, i_registro_detenuti: true, i_ciro_racconta: true, i_osso: true,
             i_foto_museo: true, i_giocattolo: true, i_nome_lista: true, i_ninna_sentita: true },
    items: ['torcia_da_casco', 'idrofono_profondo', 'registratore', 'nastro_1965', 'collana_di_giulia',
            'ninnananna', 'bombola_riparata', 'coltello_da_cintura', 'salamoia', 'stucco',
            'giocattolo', 'lista_imbarco', 'rum_di_ciro', 'anello_gaetano', 'anello_claudia'] },

  { id: 'e_vittoria', prefixes: ['e_'],
    label: '🌅 Gli epiloghi — il traghetto delle 17:30',
    desc: 'Il ritorno, il tramonto a metà canale, e i sei modi in cui questa storia può finire.',
    addHero: 'ciro',
    flags: { giorno_27_chiuso: true, giorno_28_chiuso: true, giorno_29_chiuso: true,
             ciro_in_squadra: true, ada_amica: true, promessa_incisa: true, sa_confine: true,
             claudia_ha_promesso: true, patto_trenta_secondi: true, verita_detta: true,
             i_iscrizione: true, i_seconda: true, i_registro_acqua: true, i_eco_misurata: true,
             i_graffito: true, i_registro_detenuti: true, i_ciro_racconta: true, i_osso: true,
             i_foto_museo: true, i_giocattolo: true, i_nome_lista: true, i_ninna_sentita: true },
    items: ['torcia_da_casco', 'ancora_di_voce', 'le_due_fedi', 'ninnananna', 'la_voce_del_65',
            'idrofono_profondo', 'stucco', 'giocattolo', 'caffe_parracine'] },
];

/* ============ IL DIARIO DI VIAGGIO — 📔 le cose che sapete, in chiaro ============
   Coppie ['flag', 'testo']. Compare solo ciò che il giocatore ha davvero preso.
   Ordine: le tre domande e i loro indizi · i misteri risolti · le cose che
   l'isola vi ha detto · la verità detta o tenuta · le cose messe insieme ·
   i giorni chiusi. Nessun flag inventato: sono quelli di campaign-header.js
   (MISTERI, RECIPES, CHECKPOINT_FLAGS) e delle scene degli atti A-E.          */

const DIARY_FLAGS = [

  /* --- perché sei cisterne --- */
  ['i_iscrizione',        'Sull\'architrave crollato di Villa Giulia, a Punta Eolo: SEX — QUINQUE CLAUSAE. Sei. Cinque chiuse. Chi l\'ha incisa contava, e contava una cosa che non era acqua.'],
  ['i_seconda',           'Nella seconda cisterna l\'eco risponde PRIMA. Non dopo: prima. Gaetano ha battuto le mani tre volte e la terza risposta è arrivata mezzo secondo in anticipo.'],
  ['i_registro_acqua',    'La carta dell\'acquedotto al museo: portata calcolata per seimila persone, su un\'isola che non ne ha mai avute più di ottocento. Le cisterne non le hanno scavate per bere.'],
  ['i_eco_misurata',      'La misura di Gaetano: undici secondi di riverbero in una stanza di trenta metri. In un ambiente così, undici secondi non sono fisica: sono un\'altra stanza attaccata a questa.'],

  /* --- chi c'era nella cella 47 --- */
  ['i_graffito',          'Nella cella 47, sul muro a destra della finestrella: 8.041 tacche fatte con un chiodo. L\'ultima non ha la polvere delle altre. L\'ultima è fresca.'],
  ['i_registro_detenuti', 'Il registro dei trasferimenti del 1965: la cella 47 risulta VUOTA dal 1943 e OCCUPATA dal 1943, sulla stessa pagina, con due grafie diverse.'],
  ['i_ciro_racconta',     'Ciro, undici anni, sul molo il 2 settembre 1965: una guardia che piangeva mentre gli altri caricavano le brande. Non piangeva per i detenuti. Chiedeva di restare.'],
  ['sa_i_tre_piani',      'I tre piani del panopticon si chiamavano inferno, purgatorio e paradiso. Non è una metafora di nessuno: è la nomenclatura di servizio, sta sul pannello del Comune all\'ingresso e prima stava sul registro. Qualcuno, a tavolino, ha deciso che un uomo può salire di un piano ed essere meno dannato.'],
  ['d_loop_misurato',     'La colazione del secondo giro e identica a quella del primo, parola per parola: la stessa frase di Ada sul magone, lo stesso «c\'era» della signora dei fagiolini, lo stesso accento chiuso. Cambia un dato solo — un\'albicocca invece di due — e il caffe si sente cadere prima che la caffettiera si inclini. Non e il giorno che si ripete male: si ripete BENE.'],
  ['uno_preso',           'A quarantacinque metri, dentro la stiva della Santa Lucia, cinque secondi in piu sono costati una persona. Non e stato un dado sfortunato: e stato il conto dei cinque secondi, e li ha spesi chi ha alzato la mano per leggere il nome di una morta su un\'etichetta.'],
  ['ancora_ha_funzionato', 'L\'Ancora di Voce ha funzionato: idrofono profondo, il nastro del 1965 e la ninnananna, messi insieme sul tavolino di ferro delle Parracine. Nella pausa che ha aperto c\'era spazio per un nome detto per intero, col cognome — come si dice un nome quando si chiama qualcuno per riportarlo a casa e non per invitarlo. Ed era per un uso solo.'],
  ['voce_ha_indicato',     'La sesta bocca sta a quarantuno metri, a sinistra, sotto una trave romana. Lo ha detto chi la stava guardando in quel momento, con la cifra prima e la frase dopo, senza aggettivi: il modo in cui quella persona ha detto le cose vere per dieci anni.'],
  ['scesa_a_vedere',      'Cinque metri in piu, solo per vedere dove stava. A quaranta metri, a occhio nudo, c\'era una macchia chiara grande come una mano tenuta a un braccio di distanza, e la macchia stava ferma. «Mi vedi?» E la risposta era si.'],
  ['non_sono_scesa',      'Alla sosta dei dieci metri ve l\'ha chiesto una persona che vi vuole bene, con la voce di sempre, e non era una trappola: cinque metri, solo per vedere dove sta. Non siete scesi.'],
  ['sosta_finita',        'La sosta di decompressione: sette minuti a dieci metri, con la superficie che si vede e la carena della barca la sopra, e non si puo salire. A tre minuti dalla fine la cima ha smesso di essere tesa — non si e allentata piano: ha smesso, come quando qualcuno dall\'altra parte lascia la presa. Sono rimasti appesi altri quarantun secondi a guardare in giu una corda che non faceva piu niente.'],
  ['i_osso',              'Nel cimitero dei detenuti le fosse contate sono novantatré e i nomi novantadue. In quella in più non c\'è una divisa da carcerato: ci sono bottoni di ottone.'],

  /* --- la bambina che canta --- */
  ['i_foto_museo',        'La foto al museo: molo di Napoli, 24 ottobre 1943. Una bambina col cappottino buono, la mano dentro la mano di qualcuno che l\'inquadratura taglia via al polso.'],
  ['i_giocattolo',        'Nella stiva della Santa Lucia, a quarantacinque metri: un cavallino di celluloide giallo, una zampa in meno, la faccia ancora allegra dopo ottantadue anni di sale.'],
  ['i_nome_lista',        'La lista d\'imbarco: centoquarantasei nomi a macchina e uno aggiunto a penna in fondo, in fretta. Quello a penna è di una bambina di sei anni.'],
  ['i_ninna_sentita',     'La ninnananna sentita in cisterna, prima strofa: «Nonna nonna, ninna nonna / chi sta sott\' nun torna sola / si porta appriess\' a chi la chiamma.» Non è una canzone. È l\'istruzione per l\'uso.'],
  ['i_banda_foto',        'Le cinque foto dal traghetto: tutte mosse, tutte nello stesso punto, una banda verticale larga tre dita sopra il braccio di mare tra le due isole. Il resto è nitido come un manifesto.'],
  ['i_prima_nota',        'La prima nota, alla boa di Cala Nave: bassa, lunga, due secondi e mezzo, con un attacco e una fine. I motori hanno il rumore. Questa aveva l\'ALTEZZA.'],

  /* --- i misteri risolti: e adesso si può usare --- */
  ['sa_sesta_cisterna',   '🗝 RISOLTO. La sesta cisterna non è perduta: è SOTTO le altre cinque, sotto il livello del mare, e non è una cisterna — è la bocca. E una bocca, con la calce giusta, si richiude.'],
  ['sa_nome_guardia',     '🗝 RISOLTO. Nella cella 47 non c\'era un detenuto: c\'era la guardia. NICOLA SPERDUTO, quarantatré anni, rimasto a fare il turno in un carcere vuoto. E i nomi, col Coro, valgono più delle armi.'],
  ['sa_ninnananna',       '🗝 RISOLTO. Si chiamava ASSUNTINA, sei anni. Non chiama nessuno: tiene il tempo alle altre voci perché sennò si spaventano, e canta la prima strofa da ottantadue anni perché la seconda non ha fatto in tempo a impararla. Adesso la sapete voi.'],

  /* --- quello che l'isola vi ha detto, e quello che avete capito da soli --- */
  ['sa_la_corda',         'Si chiama LA CORDA. Ada la sente da quando è nata: prima i cani, poi la nota, e il giorno dopo il mare è calmissimo. E la regola di sua madre, che vale più di tutto: se ti chiamano per nome, NON SI RISPONDE.'],
  ['sa_confine',          'Il Coro ha un PERIMETRO. Davanti al porto, dove ci sono i bambini, il cane e la gente, non c\'è e non c\'è mai stato. È il dato che rende questa storia vincibile — e una signora coi fagiolini l\'aveva già detto in due secondi.'],
  ['avviso_fagiolini',    '«Fate i bagni dove c\'è la gente.» Detto da una signora di ottant\'anni che pulisce fagiolini, alle sei e venti di un giovedì d\'agosto, con lo stesso tono con cui si dice di mettere il cappello.'],
  ['avviso_esplicito',    '«Il mare qua è un camposanto grande. Non è brutto: è pieno. Se fate i bagni dove c\'è la gente, quelli non vi vengono a cercare, perché a loro dà fastidio la confusione.»'],
  ['sa_apertura_coraggio','Il padre di Ada, negli anni Cinquanta, giocava dentro una delle cisterne murate: l\'apertura stava dietro l\'orto dei Coraggio. Un anno l\'hanno chiusa e lui non ha mai detto perché. Raccontava duemila storie. Quella no.'],
  ['sa_di_ciro',          'Se serve una barca per Santo Stefano si cerca Ciro, al terzo pontile. «Ciro ci va, ma non ci resta dopo le sei.»'],
  ['ciro_conosciuto',     'Ciro, settantadue anni, canottiera e occhiali tenuti col nastro adesivo: «Gli altri due vi portano e non vi raccontano niente. Io non vi racconto niente e in più vi riporto indietro. Fate voi.»'],
  ['appuntamento_ciro',   'Appuntamento con Ciro: sabato 29, alle nove del mattino, terzo pontile. Quaranta euro andata e ritorno.'],
  ['ciro_in_squadra',     'Ciro è con voi. Nel 1965 aveva undici anni ed era sul molo: sa cose, e le dice quando servono. In acqua il coltello si lega, sempre — e il primo fallimento in apnea, con lui a bordo, è gratis.'],
  ['ada_amica',           'Ada delle Parracine è un\'alleata, non un mistero: il caffè con la moka da sei, il thermos di acciaio col tappo che si svita male, e la porta della cucina aperta anche all\'una di notte.'],
  ['conosciuta_lilia',    'Lilia, la figlia di Ada: cinque anni senza sentirsi, e un abbraccio storto con le pinne in mezzo. È lei che ha dato la stanza con la terrazza, ed è lei che ha detto la seconda metà del nome dell\'isola — quella che non sta nei libri ma nella bocca di chi va in barca: l\'isola dei buoni fondali. Fondali di TENUTA.'],
  ['archivio_lilia',      'Ventimila foto dell\'isola in dieci anni, ordinate per mese, tutte fatte col trentacinque fisso «perché ti costringe ad avvicinarti». Se un giorno servirà una prova, la prova potrebbe essere già stata scattata da qualcun altro.'],
  ['lezione_lilia',       'La lezione delle calette, venerdì alle tre del pomeriggio: butta fuori l\'aria PIANO, guarda AVANTI e non alzare mai la testa col boccaglio. E soprattutto: non serve coraggio, serve ANNOIARSI. «Il coraggio dura trenta secondi e poi finisce.» Da allora, in immersione, c\'è più aria.'],
  ['i_foto_lilia',        'La banda verticale nel canale c\'è anche in una foto di quattro anni fa, nello stesso punto, alla stessa ora. Lilia l\'aveva guardata mille volte e aveva cambiato obiettivo. La banda è rimasta.'],
  ['scoglio_nave',        'Ottanta metri di traverso fino allo scoglio che dà il nome alla baia, andati e tornati con le pinne. «Non è profondo: è ALTO. Siamo noi che stiamo sopra.»'],
  ['promesso_a_giulia',   'A Giulia è stata detta una promessa con un numero e un\'ora dentro, e lei ha spiegato la differenza: «Le promesse vere hanno l\'orario. Quelle false hanno gli aggettivi.»'],
  ['chiamata_per_nome',   'Il nome della bambina, detto ad alta voce sopra la fossa: Assuntina. Era su una lista d\'imbarco, aggiunto a penna in fondo, centoquarantasettesimo di centoquarantasei — e in ottantadue anni nessuno l\'aveva più pronunciato.'],
  ['visto_polpo',         'Il polpo di Cala Nave, che ha guardato Claudia da un buco con quell\'occhio orizzontale e ha deciso che non valeva la pena spostarsi. «C\'È UN POLPO E MI HA GUARDATA.»'],
  ['promessa_boa',        'La promessa detta a voce alta sopra il mare, arrivando: quest\'anno ci prova, e se dice basta si torna. Due maschere identiche comprate senza dirlo.'],
  ['boa_raggiunta',       'Claudia ha toccato la boa gialla di Cala Nave con tutte e due le mani, con ventidue metri d\'acqua sotto i piedi. Questo è avvenuto, ed è la cosa che non si cancella.'],
  ['guardato_sotto',      '«Io non ho paura di quello che c\'è sotto: ho paura di quello che NON SO se c\'è. È diverso, e si cura guardando.» Regola operativa del gioco: guardare costa, e paga sempre.'],
  ['gaetano_crede',       'Gaetano ha scelto di CREDERLE. Non per gentilezza: perché su una cosa che ha sentito lei non si è mai sbagliata. È la trave che tiene su tutta questa storia.'],
  ['nota_da_terra',       'La nota arrivata dal BASSO, sotto la terrazza delle Parracine, sotto il tufo dell\'isola — e non dal mare. Prima i dieci cani che si fermano tutti insieme sulla stessa battuta, poi lei.'],
  ['registrata_nota',     'La registrazione: sol basso, sostenuto, calante di un quarto di tono, con sotto un\'altra nota a un intervallo che sul pianoforte non esiste. Due note che non possono stare insieme, e stanno insieme.'],
  ['promessa_incisa',     'Nella cisterna murata, incise nel tufo con un chiodo: CI SIAMO STATI. C. E G. — 28.8.26. E sotto: E SIAMO TORNATI SU. «È al futuro, è un impegno: adesso è scritto sul muro, quindi si fa.»'],
  ['claudia_ha_promesso', 'Claudia ha promesso a una bambina morta il 24 ottobre 1943 che le insegna a nuotare. L\'ha detto con la sua voce, e quella ci ha creduto. È la promessa più grossa di tutto il gioco.'],
  ['sa_il_nome',          'Dentro la registrazione, dopo la nota, mezzo secondo che a un quarto di velocità diventa una parola di tre sillabe. La dice una voce di donna, con le vocali larghe dell\'Istituto Luce. La parola è «Claudia».'],

  /* --- la verità: detta, rinviata o tenuta. Il gioco lo ricorda in faccia --- */
  ['gaetano_ha_taciuto',  '⚠️ Gaetano ha sentito la voce dire il nome di Claudia e non gliel\'ha detto. Undici minuti a guardarla dormire con una registrazione in mano. Le cose non dette, in questa storia, hanno gli interessi.'],
  ['verita_rinviata',     '⚠️ «Te lo dico dopo.» La verità rinviata è una verità con la data di scadenza, e la data di scadenza è il 30 agosto.'],
  ['bugia_detta',         '⚠️ La bugia è stata detta, con la faccia giusta e la voce ferma. Il Coro ascolta tutto, e delle bugie fra due che si amano fa la sua roba migliore.'],
  ['verita_detta',        'La verità è stata detta, per intero, a voce alta. Non ha risolto niente e ha cambiato tutto: da quel momento sono due che sanno la stessa cosa.'],
  ['patto_trenta_secondi','Il patto dei trenta secondi: qualunque cosa uno dei due senta, l\'altro lo sa entro trenta secondi. Nessun mezzo secondo tenuto in tasca. Mai più.'],

  /* --- 🔧 le cose messe insieme (Diario delle Combinazioni) --- */
  ['r_torcia',            '🔧 TORCIA DA CASCO — tre giri di nastro sul cinturino della maschera. Mani libere: laggiù, con una mano occupata, non ti tiri su.'],
  ['r_idrofono',          '🔧 IDROFONO — microfono a clip dentro un preservativo, aria spremuta, nodo e nastro. Si fa davvero così. Il lattice trasmette il suono e non passa l\'acqua: è solo una membrana.'],
  ['r_idro_prof',         '🔧 IDROFONO PROFONDO — venticinque metri di prolunga e la giunta annegata nella resina. Sente la fossa da sopra la barca. Sentirla è brutto ed è l\'unico modo di sapere.'],
  ['r_occhio',            '🔧 L\'OCCHIO LUNGO — GoPro in cima all\'asta. Un metro e venti: puoi guardare dentro un posto stando un metro e venti FUORI da quel posto.'],
  ['r_coltello',          '🔧 COLTELLO DA CINTURA — annegato nella resina dentro un tubo, legato alla cintura. In acqua il coltello si lega. Sempre.'],
  ['r_salamoia',          '🔧 SALAMOIA DI PANDATARIA — sale di questo mare disciolto nell\'acqua della cisterna. Alle voci fa male perché gli ricorda cosa non sono più.'],
  ['r_bombola',           '🔧 BOMBOLINO RIPARATO — rubinetto nuovo, guarnizione di camera d\'aria, duecento bar. Quattro minuti. Che laggiù vogliono dire due.'],
  ['r_collana',           '🔧 LA COLLANA DI GIULIA — la medaglietta IVL al collo, sul filo di nylon. Si è scaldata subito: ha capito di essere portata. Chi porta il suo nome viene riconosciuto una volta.'],
  ['r_voce65',            '🔧 LA VOCE DEL \'65 — la cassetta dentro il registratore, il tasto PLAY ancora alzato. È l\'arma migliore che avete. È anche la cosa che vi ha fregati.'],
  ['r_palamito',          '🔧 PALAMITO — lenza, amo da cernia, sughero. Tira su dal fondo senza scendere. «A volte tiri su una cosa che era meglio lasciare dov\'era. Ma almeno l\'hai tirata su tu.»'],
  ['r_stucco',           '🔧 STUCCO DI CALCE E TUFO — la stessa ricetta con cui hanno chiuso quattro bocche senza scriverlo in nessun registro. Nei registri si scrivono le cose finite.'],
  ['r_molotov',           '🔧 LA BOTTIGLIA DI CIRO — rum a sessanta gradi, benzina, uno straccio del telo. Sott\'acqua niente. In una cella di due metri per tre, la fine di una conversazione.'],
  ['r_ninnananna',        '🔧 LA NINNANANNA — la foto e la medaglietta tenute vicine, e una frase che adesso sapete dire. Non è un\'arma: è l\'unica cosa gentile che avete.'],
  ['r_ancora',            '🔧 L\'ÀNCORA DI VOCE — l\'idrofono girato al contrario: il cavo che portava su il suono, adesso lo porta GIÙ. Duemila anni e nessuno era mai scesso a chiamarli indietro.'],
  ['r_ancora_completa',   '🔧 L\'ÀNCORA, COMPLETA — una guardia che piange nel 1965 e una donna che canta nel 2026, sopra la stessa bobina. «Hai cantato la seconda strofa. Nessuno l\'aveva mai cantata.» Un uso. Uno solo.'],
  ['r_fedi',              '🔧 LE DUE FEDI — due anelli d\'oro su un filo da pesca da venti chili. Non cura, non illumina, non taglia. «Una cosa che è di tutti e due, in fondo al mare, è un indirizzo.»'],

  /* --- i giorni chiusi: dentro i muretti a secco non arriva niente --- */
  ['giorno_27_chiuso',    '✔ Giovedì 27 chiuso alle Parracine: una boa raggiunta, un polpo, dieci cani fermati sulla stessa battuta e una nota dentro un telefono.'],
  ['giorno_28_chiuso',    '✔ Venerdì 28 chiuso alle Parracine: le cisterne sotto il paese, l\'eco che risponde prima, e una riga incisa nel tufo al futuro.'],
  ['giorno_29_chiuso',    '✔ Sabato 29 chiuso alle Parracine: Santo Stefano, la cella 47, il cimitero — e Ciro che a settantadue anni ha deciso di raccontare.'],
];

/* ============ LA MAPPA DELL'ISOLA ============
   Dieci zone, disposte come stanno davvero: Ventotene lunga e bassa in alto a
   sinistra, il porto e il paese al centro, Santo Stefano a destra, e sotto —
   più giù di tutto — l'acqua che non è più acqua. x/y sono frazioni del canvas.
   NB: engine.js drawMap() traccia i corridoi tratteggiati con una lista di
   coppie ereditata dalla Casa che non Finisce: con queste chiavi non disegna
   linee (e le icone diventano '▪'). Va aggiornata lì quando si adatta il
   motore — la mappa resta comunque leggibile e la stella "voi siete qui" no.  */

const WORLD_MAP = [
  { key: 'traversata', label: 'La traversata', x: 0.12, y: 0.14, scenes: [] },
  { key: 'porto',      label: 'Il porto',      x: 0.30, y: 0.40, scenes: [] },
  { key: 'paese',      label: 'Il paese',      x: 0.44, y: 0.26, scenes: [] },
  { key: 'bnb',        label: 'Le Parracine',   x: 0.22, y: 0.62, scenes: [] },
  { key: 'cisterne',   label: 'Le cisterne',   x: 0.48, y: 0.50, scenes: [] },
  { key: 'rovine',     label: 'Punta Eolo',    x: 0.62, y: 0.12, scenes: [] },
  { key: 'mare',       label: 'Le calette',    x: 0.16, y: 0.84, scenes: [] },
  { key: 'carcere',    label: 'Santo Stefano', x: 0.86, y: 0.34, scenes: [] },
  { key: 'sotto',      label: 'Sotto i 15 m',  x: 0.44, y: 0.86, scenes: [] },
  { key: 'fossa',      label: 'La fossa',      x: 0.72, y: 0.70, scenes: [] },
];

/* location → zona della mappa.
   Copre tutte le `location` usate dalle scene e tutte quelle riconosciute da
   MUSIC_BY_LOCATION in engine.js, più gli alias brevi (mare, notte, alba,
   rovine, carcere, cisterne) così che una scena nuova non finisca mai fuori
   mappa. Se aggiungete una location, aggiungetela QUI nello stesso commit.   */

const MAP_ZONE_BY_LOCATION = {
  // il mare aperto, l'andata e il ritorno — e Scauri, che è dove l'andata comincia
  traghetto: 'traversata', barca: 'traversata', alba: 'traversata', scauri: 'traversata',
  // il porto romano, Cala Rossano, i pontili
  porto: 'porto', molo: 'porto',
  // il paese: Piazza Castello, la chiesa di Santa Candida, il museo, il forno
  paese: 'paese', notte_isola: 'paese', notte: 'paese',
  // il rifugio: dentro i muretti a secco non arriva niente
  bnb: 'bnb', terrazza: 'bnb',
  // le cisterne romane dietro la chiesa, e le quattro murate
  cisterna: 'cisterne', cisterna_sigillata: 'cisterne', cisterne: 'cisterne',
  // Villa Giulia a Punta Eolo, il ninfeo, il faro
  villa_giulia: 'rovine', punta_eolo: 'rovine', rovine: 'rovine',
  // Cala Nave, Cala Rossano, Parata Grande, le peschiere romane
  cala: 'mare', spiaggia: 'mare', mare: 'mare', peschiera: 'mare',
  // Santo Stefano: il panopticon, la cella 47, il cimitero dei detenuti
  santo_stefano: 'carcere', panopticon: 'carcere', cella: 'carcere',
  cimitero: 'carcere', carcere: 'carcere',
  // sotto i quindici metri: l'altrove
  sotto: 'sotto', grotta: 'sotto', relitto: 'sotto',
  // la fossa tra Ventotene e Santo Stefano
  fossa: 'fossa',
};

/* Gli array `scenes` della mappa si CALCOLANO dalla campagna: nessun elenco a
   mano da tenere aggiornato, e nessun riferimento fantasma possibile. */
for (const [id, scene] of Object.entries(CAMPAIGN)) {
  const zone = WORLD_MAP.find(w => w.key === MAP_ZONE_BY_LOCATION[scene.location]);
  if (zone) zone.scenes.push(id);
}
