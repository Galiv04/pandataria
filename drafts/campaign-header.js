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
  sale_grosso: { name: 'Sale grosso', desc: 'Un chilo, dalla cucina delle Paracine. Sale marino, di QUESTO mare: raccolto, essiccato, macinato dall\'acqua in cui vivono loro.', usable: false },
  bombola_piccola: { name: 'Bombolino da 3 litri', desc: 'Una mini-bombola da diving comprata usata da Ciro. Rubinetto che perde, quindici minuti d\'aria se non perdesse.', usable: false },
  rubinetto_rotto: { name: 'Rubinetto di ricambio', desc: 'Ottone, filettato, ammaccato. Ciro ne ha una cassa: "Su un\'isola non si butta niente, signò."', usable: false },
  filo_nylon: { name: 'Filo di nylon 0,60', desc: 'Da pesca, resistente a venti chili. Tiene un pesce serio o una cosa piccola che non vuoi perdere.', usable: false },
  lenza: { name: 'Lenza a mano', desc: 'Cinquanta metri su un rocchetto di sughero, come si pescava prima dei mulinelli.', usable: false },
  amo_grande: { name: 'Amo da cernia', desc: 'Acciaio, curvo, grosso come un dito. Fa una brutta impressione anche fuori dall\'acqua.', usable: false },
  tappo_sughero: { name: 'Sughero da rete', desc: 'Galleggiante da rete da posta, consumato dal sale.', usable: false },
  calce: { name: 'Sacchetto di calce', desc: 'Dal cantiere della strada per Punta Eolo. Calce viva: quella con cui si chiudevano le cose, una volta.', usable: false },
  pietra_carcere: { name: 'Pietra di Santo Stefano', desc: 'Un pezzo di muro del panopticon, staccato dove era già staccato. Tufo e calce, e dentro qualcosa di scuro che non è muffa.', usable: false },
  registratore: { name: 'Registratore a cassette', desc: 'Un Geloso a batterie, dalla casa di Ciro. Funziona. Ciro dice che è meglio se resta senza nastro.', usable: false },
  nastro_1965: { name: 'Il nastro del 1965', desc: '⚠️ Una cassetta senza custodia, etichetta a penna: "2 SETT. \'65 — ULTIMA NOTTE — NON". La frase finisce lì. Ciro dice di non suonarlo. Ciro dice anche molte altre cose.', usable: false,
    lore: `L'etichetta dice: "2 SETT. '65 — ULTIMA NOTTE — NON".\n\nNon cosa? Non suonare. Non ascoltare. Non buttare. Non dimenticare. Chiunque l'abbia scritta si è fermato lì, e la cosa peggiore è che si è fermata di mano ferma: non è un tratto interrotto di fretta. È uno che ha deciso, a metà parola, che il resto era meglio non scriverlo.\n\nCiro l'ha tenuto in un cassetto per sessant'anni senza aprirlo. Quando ve lo dà non dice "custoditelo". Dice: "Adesso è vostro. Io non lo voglio più in casa."` },
  rum_di_ciro: { name: 'Rum di Ciro', desc: 'Bottiglia senza etichetta, 60 gradi buoni, dal fondo della barca. "Serve per il freddo, signò. E per le altre cose."', usable: true, heal: 6 },
  benzina: { name: 'Taniga di benzina', desc: 'Cinque litri per il fuoribordo. Nell\'acqua non serve a niente. Dentro una cella, invece.', usable: false },
  medaglietta_giulia: { name: 'Medaglietta romana', desc: 'Un disco di bronzo ossidato trovato nel tufo: un profilo di donna e tre lettere, IVL. Iulia. Pesa più di quanto dovrebbe.', usable: false,
    lore: `Un disco di bronzo, grande come una moneta da due euro, verde di ossido tranne dove qualcuno l'ha strofinato — di recente, e non siete stati voi.\n\nDa una parte un profilo di donna col naso importante e i capelli raccolti come si usava sotto Augusto. Dall'altra tre lettere incise a punta: IVL.\n\nIulia. Giulia.\n\nSe la tieni nel palmo chiuso per più di dieci secondi si SCALDA, e non è il calore della mano: è il verso opposto, come una cosa che si accorge di essere tenuta.` },
  foto_bambina: { name: 'Foto dal museo', desc: 'La riproduzione di una foto del 1943: una bambina di sei anni sul molo di Napoli, cappottino buono, la mano nella mano di qualcuno tagliato via dall\'inquadratura. Sotto: "imbarco del 24.10".', usable: false },
  lista_imbarco: { name: 'Lista d\'imbarco della Santa Lucia', desc: 'Fotocopia da un archivio: centoquarantasei nomi a macchina, e uno aggiunto a penna in fondo, in fretta. Quello a penna è di una bambina.', usable: false },
  giocattolo: { name: 'Un cavallino di celluloide', desc: 'Recuperato dalla stiva del relitto a quarantacinque metri. Giallo, era. Una zampa manca. Ha fatto ottantadue anni sotto sale e ha ancora la faccia allegra.', usable: false },
  anello_gaetano: { name: 'La fede di Gaetano', desc: 'Se la tolse in acqua nel 2019 e per miracolo la ritrovò. Da allora, in mare, la tiene al collo.', usable: false },
  anello_claudia: { name: 'La fede di Claudia', desc: 'Identica all\'altra, mezza misura più piccola. Dentro, incisa, una data e due iniziali.', usable: false },
  caffe_paracine: { name: 'Il caffè delle Paracine', desc: 'Fatto con la moka della signora, bevuto in terrazza guardando Santo Stefano. Toglie la nota dalla testa: la cosa più concreta dell\'isola.', usable: true, heal: 8, cureVeleno: true },
  taralli: { name: 'Taralli', desc: 'Comprati al forno del paese, sacchetto di carta unto. Il cibo vero è un\'arma della realtà, e questi sono molto veri.', usable: true, heal: 5 },
  telo_mare: { name: 'Telo da mare', desc: 'A righe, gigante, di quelli che si portano in due. Asciuga, scalda, e serve per una cosa a cui nessuno ha pensato.', usable: false },
  maschera_buona: { name: 'La maschera buona (per due)', desc: 'Gaetano ne ha comprate DUE, identiche, e non l\'ha detto. Vetro temperato, silicone morbido. Vedere bene, sotto, cambia tutto — in tutti e due i sensi.', usable: false },

  /* --- risultati del crafting --- */
  torcia_da_casco: { name: 'Torcia da casco', desc: 'La torcia fasciata al cinturino della maschera con tre giri di nastro. Mani libere. Serve per la fossa: laggiù, con una mano occupata, non si torna su.', usable: false },
  idrofono: { name: 'Idrofono artigianale', desc: 'Microfono a clip sigillato in un preservativo, calato su una prolunga. Si fa DAVVERO così. Sente le voci e dà loro una coordinata: al Coro, essere localizzato fa male.', combat: { dice: [2, 6], distract: true, distractText: ' — la voce si sente MISURATA, e per un attimo non sa più dove stare!' }, icon: '🎙' },
  idrofono_profondo: { name: 'Idrofono profondo', desc: 'L\'idrofono su venticinque metri di cavo, con la resina sui contatti. Arriva a sentire il relitto. Sentirlo è brutto, ma è l\'unico modo di sapere.', usable: false },
  occhio_lungo: { name: 'L\'occhio lungo', desc: 'GoPro all\'asta telescopica, nastro e resina. Guardi dentro senza entrare — dentro le cisterne sigillate, dentro le celle, dentro le cose.', usable: false },
  coltello_da_cintura: { name: 'Coltello da cintura', desc: 'Coltellino annegato nella resina dentro un pezzo di tubo, legato alla cintura. In acqua non lo perdi. In acqua, perdere il coltello è come perdere la mano.', combat: { dice: [1, 8] }, icon: '🔪' },
  salamoia: { name: 'Salamoia di Pandataria', desc: 'Sale di questo mare disciolto nell\'acqua della cisterna. Alle voci fa un male atroce: è la loro stessa acqua, ma CONCENTRATA — la cosa che sono state senza il resto.', combat: { dice: [2, 8], holy: true }, icon: '🧂' },
  bombola_riparata: { name: 'Bombolino riparato', desc: 'Rubinetto nuovo, guarnizione di fortuna, tre litri a duecento bar. Non è un\'immersione: sono quattro minuti. Ma quattro minuti, laggiù, sono un\'era.', usable: false },
  collana_di_giulia: { name: 'La collana di Giulia', desc: 'La medaglietta IVL appesa al filo di nylon, al collo. Chi la porta viene RICONOSCIUTO: Giulia non tocca chi porta il suo nome. Una volta.', usable: false },
  la_voce_del_65: { name: 'La voce del \'65', desc: '⚠️ Il registratore col nastro dentro, pronto a partire. Fa sentire al Coro la voce di una guardia che piangeva. È l\'arma migliore che avete. È anche la cosa che vi ha fregato.', combat: { all: true, distract: true, dice: [2, 6], distractText: ' — sente la voce del \'65 e si FERMA: quella voce la conosce!' }, icon: '📻' },
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
