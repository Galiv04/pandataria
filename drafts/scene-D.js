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

**(⚠️ ULTIMA IMMERSIONE. Serve il bombolino riparato e il fiato accumulato: senza, i quattordici metri sotto la cengia non li fate, e il gioco ve lo scrive PRIMA di farvi scendere. Se non siete pronti si risale, si mangia, si respira, e si torna: nessuno vi obbliga a scendere adesso.)**`,
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
    caption: 'La sosta a dieci metri — la risalita interrotta',
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
      { text: '⬆️ Non rispondere niente e risalire: dieci metri, cinque, tre, superficie', goldLoss: 2, next: 'd15_uscite' },
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
