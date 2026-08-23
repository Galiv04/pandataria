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
