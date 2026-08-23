/* ============ PERSONAGGI — Gaetano, Claudia, Ciro, e le voci ============
   Sistema della serie: caratteristiche come modificatori diretti, d20 + mod vs CD.
   PV = TENUTA 💪 · Valuta = FIATO 🫁 (G.gold, 0-20)
   h.veleno = ACQUA NEI POLMONI 🎵 (-2, e ti compaiono scelte che l'altro non vede)
   h.morto  = PRESO DAL CORO (morte vera: resta come VOCE; torna con l'Àncora di Voce)
   undead: true su un nemico = è una VOCE → prende danni doppi dalle armi della realtà
   (`holy`): il sale della sua stessa acqua, la luce vera, il nome che aveva da vivo. */

const HEROES = [
  {
    id: 'gaetano',
    sprite: 'gaetano',
    name: 'Gaetano',
    class: 'L\'Idrofono',
    tagline: 'Progetta satelliti: misura cose a settecento chilometri. Stanotte gli tocca misurare cose PROFONDE.',
    role: 'La mente che dà un numero all\'impossibile. E al Coro, i numeri fanno male.',
    stats: { FOR: 1, DES: 1, COS: 1, INT: 3, SAG: 1, CAR: 0 },
    maxHp: 24, ac: 13,
    attack: {
      name: 'Dato di Fatto', stat: 'INT', dice: [1, 8], bonus: 1,
      desc: '1d8+4 — dire ad alta voce la misura esatta di una cosa che non può esistere. «Quarantuno metri. Il canto arriva da quarantuno metri E da zero metri.» Detto così, con la voce che non trema, a quella cosa fa MALE.',
    },
    abilities: [
      { id: 'idrofono', name: 'Idrofono Artigianale', uses: 3, type: 'mark', dice: [2, 6], bonus: 3,
        desc: 'Un microfono a clip dentro un preservativo, sigillato col nastro, calato su venti metri di cavo. Si fa davvero così. Localizza la voce e la INCHIODA a una coordinata: 2d6+3 danni e per 2 round tutti gli attacchi contro quel bersaglio hanno VANTAGGIO.' },
      { id: 'risalita', name: 'Calcolo della Risalita', uses: 2, type: 'heal', dice: [2, 8], bonus: 3,
        desc: 'Tabelle di decompressione a memoria, tempi contati sul cronometro del telefono. Ridà 2d8+3 di TENUTA a un compagno — e rialza chi è crollato. Il metodo, quando serve, è una carezza.' },
    ],
    passive: 'Metodo: +2 a tutte le prove di Intelligenza. E ogni volta che una cosa impossibile riceve un NUMERO, il Coro perde una nota: il gioco lo dice.',
    backstory: `Gaetano fa un lavoro che consiste nel non sbagliare: se sbagli un conto, un oggetto da mezza tonnellata smette di stare in orbita. Da questo mestiere si è portato dietro un vizio e una virtù, che sono la stessa cosa: se non lo puoi misurare, per lui non esiste ancora.

A Ventotene ci è venuto per Claudia. Quattro giorni, un B&B con la terrazza, il mare più bello del Tirreno e — segretamente — la speranza che lei faccia il bagno dove non si toccà, una volta, senza quella faccia. Ha portato la maschera buona per due, e non l'ha detto.

Il Coro, sotto l'isola, non ha mai incontrato uno come lui. Gli altri, in duemila anni, hanno pregato o urlato. Questo qua prende appunti.`,
    voice: 'Misura, cronometra, verbalizza. Quando ha paura diventa più preciso, non meno: "Ok. Ok. Diciotto secondi tra una nota e l\'altra. È regolare. È REGOLARE, Claudia, e questo è il problema."',
  },
  {
    id: 'claudia',
    sprite: 'claudia',
    name: 'Claudia',
    class: 'L\'Antenna',
    tagline: 'Ha paura dell\'acqua profonda da quando ha memoria. È per questo che il Coro la vuole.',
    role: 'L\'unica che SENTE. Vede il dettaglio che stona, e stanotte tutto stona.',
    stats: { FOR: 0, DES: 2, COS: 1, INT: 1, SAG: 3, CAR: 2 },
    maxHp: 22, ac: 14,
    attack: {
      name: 'Inquadratura', stat: 'SAG', dice: [1, 8], bonus: 1,
      desc: '1d8+4 — treppiede, luce, e il coraggio di GUARDARE la cosa invece di scappare. Ciò che viene visto per intero perde il diritto di cambiare forma.',
    },
    abilities: [
      { id: 'ringlight', name: 'Ring Light Subacquea', uses: 3, type: 'pet', dice: [2, 6], bonus: 2,
        desc: 'Quattromila lumen comprati "per i contenuti", accesi in faccia a una cosa che non ha visto luce vera da secoli: 2d6+2 danni automatici, e il bersaglio attacca con SVANTAGGIO. La luce, quaggiù, è violenza.' },
      { id: 'scatto', name: 'Lo Scatto', uses: 2, type: 'taunt',
        desc: 'Fotografa la cosa. Un file, una data, un\'ora: da quel momento esiste in un modo che non può negare. Per un round le voci puntano LEI — e lei subisce metà danni, perché ciò che è documentato non ti tocca come vuole.' },
    ],
    passive: 'Occhio Assoluto: +2 a tutte le prove di Saggezza. E se sta per accadere qualcosa nell\'acqua, lo sa TRE SECONDI prima: il gioco glielo dice, sempre.',
    backstory: `Claudia ha paura dell'acqua dove non si tocca. Non della piscina, non del bagno a riva: del punto esatto in cui il fondo scompare e sotto c'è solo blu che continua. Ci ha fatto pace come si fa pace con le cose che non passano: le gira intorno, non ne parla, e ogni tanto ci prova.

Di lavoro decide come le cose vengono VISTE. Dieci anni a inquadrare, tagliare, scegliere il dettaglio che regge una storia — e a scoprire prima di tutti quando una storia non torna.

A Ventotene ha detto sì subito. Ha anche detto, ridendo, una cosa che si rimangerà: "Magari stavolta arrivo fino alla boa." Il Coro, sotto l'isola, l'ha sentita dire quella frase dal traghetto. Ed è per questo che quattro giorni di vacanza sono diventati questo: perché una voce che ha paura del profondo e scende COMUNQUE ha un timbro che il Coro, in duemila anni, non ha mai posseduto.`,
    voice: 'Nomina l\'orrore con precisione da montatrice: "Aspetta. Rimetti quella frase. L\'ha detta con la MIA cadenza, Gaetano. Non la mia voce: la mia CADENZA."',
  },
  {
    id: 'ciro',
    sprite: 'ciro',
    name: 'Ciro',
    class: 'Il Pescatore',
    tagline: 'Settantadue anni. Nel \'65 ne aveva undici ed era sul molo il giorno che chiusero il carcere. Sa cose.',
    role: 'Chi conosce il mare: sa dove non si scende, e quando invece bisogna.',
    stats: { FOR: 2, DES: 1, COS: 2, INT: 0, SAG: 2, CAR: 1 },
    maxHp: 26, ac: 13,
    locked: true,
    attack: {
      name: 'Gaffa da pesca', stat: 'FOR', dice: [1, 10], bonus: 1,
      desc: '1d10+3 — due metri di legno e un uncino d\'acciaio che ha tirato a bordo pesci più grossi di un uomo. Non è un\'arma. È un attrezzo, ed è peggio.',
    },
    abilities: [
      { id: 'nome_giusto', name: 'Il Nome Giusto', uses: 2, type: 'holy', dice: [3, 6], stat: 'SAG',
        desc: 'Chiama la voce col nome che aveva da VIVA — quello che Ciro ha letto sui registri o sentito da bambino. 3d6+2 danni, DOPPI (è un\'arma della realtà), e la voce smette di cantare per un turno: non riesce a fare due cose insieme, ricordarsi ed essere.' },
      { id: 'rete', name: 'Rete da posta', uses: 2, type: 'smoke',
        desc: 'Trecento metri di rete calati come si cala da cinquant\'anni. Imbriglia tutte le voci in scena: per un giro attaccano con svantaggio e non possono avvicinarsi.' },
    ],
    passive: 'Chi conosce il mare: il PRIMO fallimento di ogni apnea è gratis — Ciro vi tira su per la cintura prima che l\'acqua se ne accorga. E finché è con voi, nessuno annega per un solo errore.',
    backstory: `Ciro pesca da quando aveva nove anni. Ha visto Ventotene diventare un posto per turisti e non gliene importa niente: il mare, sotto, è rimasto quello.

Il 2 settembre 1965 aveva undici anni ed era sul molo quando le barche portarono via gli ultimi novanta detenuti di Santo Stefano. Ricorda tre cose, e le racconta sempre in questo ordine: che gli uomini non parlavano; che una guardia piangeva; e che quella notte, per la prima e ultima volta in vita sua, suo padre — che era un uomo duro — legò le barche e disse a tutti di non uscire, per nessun motivo, fino all'alba.

Non crede nei fantasmi. Crede in quello che ha sentito con le orecchie sue. È una differenza che gli sembra enorme e che a voi, dopo stanotte, sembrerà enorme pure a voi.`,
    voice: 'Dice le cose gravi con la calma di chi le sa da sessant\'anni: "Signorina. Quella cosa che sente lei, io la sento da quando ho undici anni. Il fatto è che a lei RISPONDE."',
  },
];

/* ---------- LE VOCI (bestiario) ----------
   Non sono mostri: sono voci che hanno preso una forma provvisoria per venirti incontro.
   ai: 'random' | 'weakest' | 'strongest' | 'smart' (punta chi cura)
   undead: true = è una voce → danni DOPPI dalle armi della realtà (sale, luce vera, il nome). */

const BESTIARY = {
  eco: {
    name: 'Un\'Eco', short: 'Eco', sprite: 'eco',
    maxHp: 16, ac: 13, ai: 'random', undead: true,
    special: 'evasive',
    attack: { name: 'La tua frase, restituita', bonus: 5, dice: [1, 6], plus: 1 },
    flavor: 'Ripete l\'ultima cosa che hai detto. Con la tua voce, col tuo accento, con la tua pausa in mezzo. Se stai zitto, ripete il tuo respiro. Se trattieni il respiro, ripete il battito.',
  },
  annegata: {
    name: 'Una Annegata del \'43', short: 'Annegata', sprite: 'annegata',
    maxHp: 26, ac: 14, ai: 'weakest', undead: true,
    special: 'latch',
    attack: { name: 'L\'abbraccio del passeggero', bonus: 6, dice: [1, 8], plus: 1 },
    flavor: 'Ottantadue anni sotto sale. La pelle è andata dove l\'acqua ha voluto, e quel che resta è tenuto insieme dal vestito buono della domenica. Ti prende per il polso con una dolcezza terribile: non vuole ucciderti, vuole COMPAGNIA, e non sa più che sono due cose diverse.',
  },
  detenuto: {
    name: 'Un Detenuto della Cella 47', short: 'Detenuto', sprite: 'detenuto',
    maxHp: 30, ac: 14, ai: 'strongest', undead: true,
    special: 'cleave',
    attack: { name: 'Ventitré anni di rabbia', bonus: 6, dice: [1, 6], plus: 2 },
    flavor: 'Ventitré anni nella stessa cella, di cui gli ultimi undici senza mai vedere in faccia chi lo guardava. Adesso vede te. Non è cattivo: è ESPLOSO, e nessuno gli ha mai spiegato dove mettere quello che gli è cresciuto dentro.',
  },
  guardia: {
    name: 'La Guardia che Piangeva', short: 'Guardia', sprite: 'guardia',
    maxHp: 28, ac: 15, ai: 'smart', undead: true,
    special: 'mirror',
    attack: { name: 'Il turno di notte', bonus: 6, dice: [1, 8], plus: 1 },
    flavor: 'Ha fatto il suo lavoro per diciannove anni e il suo lavoro era guardare. Nel \'65 ha pianto sul molo davanti a un bambino di undici anni. Non è mai andata a casa. Continua il turno: cammina, guarda, segna. E se la guardi negli occhi, ti SEGNA.',
  },
  giulia: {
    name: 'GIULIA', short: 'Giulia', sprite: 'giulia',
    maxHp: 130, ac: 16, ai: 'smart', undead: true, boss: true, lifesteal: true,
    special: 'poisonOnHit',
    attack: { name: 'La figlia dell\'imperatore', bonus: 7, dice: [1, 8], plus: 1 },
    flavor: 'Giulia maggiore, figlia di Augusto, esiliata su quest\'isola dal proprio padre. Duemila anni nella prima cisterna, la voce più antica del Coro e la più chiara. Non chiede aiuto: chiede NOTIZIE. "Mio padre. Cosa ha detto di me, dopo. Ditemi cosa ha detto." E se le rispondi la verità, ti uccide. Se le menti, lo sa.',
  },
  bambina: {
    name: 'La Bambina che Canta', short: 'La Bambina', sprite: 'bambina',
    maxHp: 95, ac: 17, ai: 'random', undead: true, boss: true,
    special: 'evasive',
    attack: { name: 'La ninnananna', bonus: 5, dice: [1, 6], plus: 1 },
    flavor: 'Sei anni, il 24 ottobre 1943, su un piroscafo che si spezza in due. Cantava per non avere paura: sua madre le aveva detto che se canti forte la paura non ti sente. Canta ancora. Ed è il suo canto che chiama tutti gli altri: da ottantadue anni chiama, e non ha capito che rispondono.',
  },
  coro_vero: {
    name: 'IL CORO', short: 'IL CORO', sprite: 'coro',
    maxHp: 150, ac: 17, ai: 'smart', undead: true, boss: true, lifesteal: true,
    special: 'cleave',
    attack: { name: 'Tutte le voci insieme', bonus: 8, dice: [1, 10], plus: 2 },
    flavor: 'Non ha un corpo, non ha una faccia, non ha fame. Ha ORECCHIO. Duemila anni di voci tenute insieme in un accordo che non si risolve mai — esiliate, deportati, naufraghi, un cane del 1911, e adesso vuole te. Non ti odia. Ti VUOLE, che è infinitamente peggio.',
  },
  se_stessa: {
    name: 'La Voce di Chi Ami', short: 'La Voce', sprite: 'se_stessa',
    maxHp: 120, ac: 16, ai: 'smart', undead: true, boss: true,
    special: 'mirror',
    attack: { name: 'Le parole giuste', bonus: 7, dice: [1, 8], plus: 1 },
    flavor: 'Ha la voce della persona con cui dormi. Dice le cose che dice lei, nell\'ordine in cui le dice lei, e ha ragione. È la cosa più difficile del gioco perché non vuoi che smetta di parlare.',
  },
  polpo: {
    name: 'Il Polpo della Peschiera', short: 'Il Polpo', sprite: 'polpo',
    maxHp: 24, ac: 15, ai: 'weakest',
    special: 'latch',
    attack: { name: 'Otto braccia e un becco', bonus: 6, dice: [1, 8], plus: 2 },
    flavor: 'Non c\'entra niente col Coro: è un animale, vive nella peschiera romana da anni, pesa quattordici chili e quella è CASA SUA. Onestamente, avete torto voi.',
  },
  murena: {
    name: 'La Murena del Relitto', short: 'Murena', sprite: 'murena',
    maxHp: 20, ac: 16, ai: 'random',
    special: 'evasive',
    attack: { name: 'Morso che non lascia', bonus: 7, dice: [1, 10], plus: 1 },
    flavor: 'Due metri, dentro la stiva della Santa Lucia da chissà quanto. I denti sono curvi all\'indietro: quello che entra non esce. Non ce l\'ha con voi. È che voi siete entrati in un tubo dove lei aspettava.',
  },
  sciame_voci: {
    name: 'Uno Sciame di Sussurri', short: 'Sussurri', sprite: 'sciame_voci',
    maxHp: 32, ac: 14, ai: 'random', undead: true,
    special: 'cleave',
    attack: { name: 'Mille cose insieme', bonus: 6, dice: [1, 6], plus: 0 },
    flavor: 'Le voci minori: quelle che non hanno abbastanza storia per stare in piedi da sole. Un pescatore del 1834, una suora, tre soldati, un bambino che chiedeva l\'acqua. Insieme fanno una cosa che ha la forma di una nuvola e il suono di una folla che aspetta il tuo turno.',
  },
};
