/* ============ LUOGHI — la lettura della scena ============
   Un pulsante sul quadro, e una scheda che spiega cosa si sta guardando.

   PERCHÉ ESISTE. Richiesta del committente, 23 agosto 2026: «ogni scena grafica,
   un tastino che puoi cliccare, un piccolo pop-up che ti spiega la scena, cosa
   vivi, elementi che potrebbero essere interessanti sia per la storia che per altre
   dinamiche nel gioco».

   COS'È E COSA NON È. È una didascalia da museo: dice cosa c'è nel quadro, perché
   quel posto esiste per davvero, e cosa ci si può fare. **Non anticipa niente.**
   Parla solo di quello che è già sullo schermo o già detto dal Narratore: se un
   dettaglio è una minaccia, la scheda lo nomina come lo nominerebbe un visitatore
   («una sagoma nell'erba»), non come lo sa l'autore. La sorpresa è del gioco.

   IL RIUSO. La funzione `apri()` e l'aggancio `aggiorna()` sono identici in tutti i
   giochi della serie: si copia questo file e si riscrive solo la tabella LUOGHI.
   Le chiavi sono le stesse di `Scenes.painters` — se una manca, il pulsante non
   compare e non succede niente (un luogo senza scheda è meglio di una scheda
   inventata). Il validatore controlla che ci sia una scheda per ogni painter. */

const Luoghi = (() => {

  const LUOGHI = {

    scauri: {
      titolo: 'Scauri, il lungomare di casa',
      ora: 'Giovedì 27 agosto, 06:55 — il sole è sorto da venti minuti',
      guarda: [
        ['La macchina', 'Parcheggiata come si parcheggia quando si parte per quattro giorni: due ruote sul marciapiede, il portellone alzato, la lucina del baule accesa.'],
        ['Il borsone in mezzo alla strada', 'Quello che nessuno dei due ha deciso di caricare per primo. È l\'unica cosa in movimento in tutta l\'inquadratura, e non si muove.'],
        ['I lidi verso Gianola', 'Le sdraio ancora accatastate e legate con la cinghia, gli ombrelloni chiusi come pali. A quest\'ora non c\'è nessuno.'],
        ['L\'acqua', 'Una lastra. Nessuna onda: è il mare di casa, quello che si guarda dal lungomare mentre si va a prendere il caffè.'],
        ['All\'orizzonte, a sinistra', 'Due sagome quasi invisibili. Una lunga e bassa, e una tozza. Nei mattini puliti, da qui, si vede dove state andando.'],
      ],
      storia: 'Scauri è la frazione di mare di Minturno, sulla Domiziana, ventidue chilometri da Formia. Sabbia scura di origine vulcanica, la stessa famiglia di quella di Ventotene: le due spiagge sono parenti anche se una è casa e l\'altra è la vacanza. Il primo settembre sono dieci anni, e cade di martedì: per questo il regalo è anticipato.',
      gioco: 'È la scena d\'apertura e non si torna: quello che scegliete qui decide il tono con cui i due partono, non le loro risorse. Il Fiato — l\'aria che avrete sotto — comincia a contare dalla traversata.',
    },

    traghetto: {
      titolo: 'Il traghetto per Ventotene',
      ora: 'Giovedì 27 agosto, dalle 08:30 — due ore e un quarto di mare aperto',
      guarda: [
        ['Il ponte di poppa', 'La ringhiera, le panche di vetroresina, la scia. Il posto dove si sta quando non si vuole stare al chiuso.'],
        ['Le due isole all\'orizzonte', 'Una lunga e bassa: Ventotene. Una tozza e scura, con sopra un affare a forma di ferro di cavallo: Santo Stefano.'],
        ['Il mare del canale', 'Fra le due isole il fondo scende presto. Da qui non si vede, ma è la ragione per cui questa vacanza sarà quello che sarà.'],
      ],
      storia: 'La rotta Formia–Ponza–Ventotene è la linea di vita dell\'isola: quando il mare è forte da sud-ovest il traghetto non parte, e Ventotene resta senza pane. Il nome greco dell\'isola era **Pandataria**, «dispensatrice di ogni bene» — da *pan*, tutto, e la radice di *dateomai*, distribuire. Gliel\'hanno dato per la posizione e per la terra grassa.',
      gioco: 'Il Quaderno registra la prima cosa che vedete e come la guardate. Le due ore di mare aperto valgono Fiato: mangiare, il caffè di bordo, stare fermi un momento in due.',
    },

    porto: {
      titolo: 'Il Porto Romano (Cala Rossano)',
      ora: 'Dal primo pomeriggio del 27 in poi — e di nuovo, di notte',
      guarda: [
        ['La parete di tufo', 'Non è costruita: è **scavata**. La roccia tagliata a picco, e sopra il ciglio le case del paese.'],
        ['I segni degli scalpelli', 'Righe verticali regolari su tutta la parete. Ogni riga è un uomo con un martello, duemila anni fa.'],
        ['Gli alloggiamenti quadrati', 'Buchi a un metro dall\'acqua, allineati: ci entravano le travi degli scivoli per tirare in secco le barche. I più grandi erano per le catene.'],
        ['I pontili', 'Legno e ferro moderni appoggiati su duemila anni. Di notte il terzo pontile è quello dove non arriva la luce dei lampioni.'],
      ],
      storia: 'È l\'unico porto del mondo interamente **scavato nella roccia viva**, opera romana del I secolo: non un molo costruito in mare, ma una vasca sottratta all\'isola col martello. Serviva la villa imperiale a Punta Eolo e le peschiere. È ancora il porto che si usa oggi, con gli stessi bordi.',
      gioco: 'Qui c\'è **il negozio del molo**: è dove si compra e si baratta la roba che serve sotto. Il porto è anche uno dei punti in cui il gioco salva la partita: se cadete tutti, si riparte da qui con quello che avevate allora.',
    },

    paese: {
      titolo: 'Il paese: Piazza Castello e la salita',
      ora: 'Le ore della gente — mattina, pomeriggio, e le nove e mezza di sera',
      guarda: [
        ['Le case', 'Cubi di tufo intonacati di rosa, ocra, azzurrino sbiadito. Tetti piani, per raccogliere l\'acqua: su un\'isola senza sorgenti il tetto è una cisterna.'],
        ['La salita di parracine', 'Duecento metri di muretti a secco. **Parracine** in dialetto sono proprio quelli: pietre incastrate senza malta.'],
        ['Piazza Castello', 'I tavolini all\'ombra, il municipio, il campanile di Santa Candida. Il centro di un\'isola di settecento abitanti d\'inverno.'],
        ['Il museo archeologico', 'Due stanze. Anfore, un mosaico, e le didascalie scritte a macchina da qualcuno che ci teneva.'],
      ],
      storia: 'I muretti a secco reggono da secoli **perché lasciano passare l\'aria**: se li fai pieni, il vento li butta giù. Tengono su la terra dei terrazzamenti e tengono fuori il vento di sud-ovest. Il paese moderno è borbonico, fondato nel Settecento sopra la città romana, che è ancora tutta lì sotto.',
      gioco: 'È il posto dove si parla con la gente, e parlare è la meccanica principale del gioco: ogni ventotenese vivo è un alleato, senza doppi fondi. Le domande giuste diventano indizi dei tre misteri.',
    },

    bnb: {
      titolo: 'B&B Le Parracine — il giardino',
      ora: 'Mezzogiorno e venti del 27, e tutte le volte che si torna',
      guarda: [
        ['La casa', 'Bassa, tufo giallo, finestre con le persiane verdi, tetto piano. Tre stanze e una terrazza.'],
        ['I terrazzamenti', 'Tre livelli di terra tenuti su dai muretti a secco che danno il nome al posto. Su quello di mezzo l\'orto: pomodori sulle canne, basilico in un bidone di latta tagliato a metà.'],
        ['I limoni in vaso', 'Sopra Cala Nave. Il dettaglio per cui questo B&B si riconosce nelle fotografie.'],
        ['La scaletta a destra', 'Sale di livello in livello e poi se ne va giù, fuori dall\'inquadratura: la spiaggia sta sotto, a una rampa di distanza.'],
        ['Il tavolino di ferro', 'La moka da sei, due tazzine, tre sedie di plastica. La terza la tira su Ada dal muretto.'],
      ],
      storia: 'Le Parracine sta sopra Cala Nave, sul versante che guarda Santo Stefano. È il rifugio della storia: dentro i muretti a secco non arriva niente. Ada lo gestisce con sua figlia **Lilia**, che è nata sull\'isola e la fotografa da dieci anni.',
      gioco: 'Dormire qui e bere il caffè di Ada sono due dei pochi modi di guadagnare **Fiato**, e il Fiato è l\'aria che avrete a quaranta metri. Il giardino è un checkpoint: è il posto da cui si riparte.',
    },

    terrazza: {
      titolo: 'La terrazza delle Parracine, di notte',
      ora: 'Mezzanotte e quaranta — e le otto e venti del mattino dopo',
      guarda: [
        ['Il golfo di Napoli', 'Cento e più luci sulla costa, lontanissime. Il grumo più fitto è Ischia; la gobba bassa dietro, il Vesuvio.'],
        ['Il gazebo di canne', 'Cinque bande di canna sopra la testa, e il cielo a righe attraverso.'],
        ['Il muretto', 'Quello su cui si appoggiano i gomiti. Sotto, il buio che scende verso Cala Nave.'],
        ['Il grumo di luce in basso a sinistra', 'Il porto. Da qui si vedono i lampioni della salita, uno per curva.'],
      ],
      storia: 'Ventotene è a quaranta chilometri dalla costa e a sessanta da Ischia: nelle notti pulite si vede il golfo intero, e l\'isola resta l\'unico posto buio in mezzo. È anche il motivo per cui qui il cielo è quello che è.',
      gioco: 'La terrazza è la scena delle cose che si dicono in due. Il gioco tiene il conto dell\'**Attenzione del Coro** (0-6): sale quando si ascolta e quando si scende, e alla fine si paga in combattimento. Stare qui a non fare niente, invece, si guadagna.',
    },

    cala: {
      titolo: 'Cala Nave',
      ora: 'Le sette di sera del 27 — la luce buona',
      guarda: [
        ['Lo scoglio', 'A sinistra, oltre la riga: prua bassa, fianco lungo, la cintura nera delle patelle sul pelo dell\'acqua. È lui che dà il nome alla baia.'],
        ['La riga', 'Non è un modo di dire. È un cambio di colore netto, a venti metri da riva: dentro si tocca, fuori il fondo non si vede più.'],
        ['La prateria verde scuro', 'Posidonia. Copre tutto quello che c\'è sotto le foglie, e a guardarla bene, in un punto, c\'è una radura con dentro una sagoma ferma.'],
        ['La boa', 'Gialla, a sessanta metri, appena oltre la riga. Calda di sole e scivolosa di alghe.'],
        ['La gente', 'Trenta persone che alle sette di sera fanno le cose che fa la gente al mare. Uno nuota parallelo alla riva, lentissimo e perfetto, da quarant\'anni.'],
      ],
      storia: 'La sabbia di Ventotene è scura perché l\'isola è tufo: cenere vulcanica compattata. La posidonia non è un\'alga ma una pianta con radici, fiori e frutti, e le sue praterie sono la ragione per cui l\'acqua qui è trasparente — filtrano tutto. Vive fino a quarant\'anni e cresce di un centimetro l\'anno.',
      gioco: 'È qui che comincia l\'apnea. **Engine.metriPossibili()** dice a quanti metri arrivate col Fiato che avete: con poco fiato certi oggetti sono fisicamente fuori portata, e il gioco ve lo dice prima di farvi scendere. Maschera, pinne e boccaglio cambiano cosa potete raggiungere.',
    },

    mare: {
      titolo: 'Le calette e il mare aperto',
      ora: 'Il pomeriggio del 28 — e Cala Rossano alle sei e quaranta',
      guarda: [
        ['Il gommone', 'Quello di Lilia, che conosce ogni caletta di quest\'isola perché le ha fotografate tutte.'],
        ['Le pareti di tufo', 'Giallo, tagliate a picco sull\'acqua, coi buchi dei gabbiani e le fessure dove crescono i capperi.'],
        ['L\'acqua bassa', 'Turchese sopra la sabbia, blu sopra la posidonia. Il confine si vede a occhio e non sbaglia mai.'],
        ['Il vento', 'Da sud-ovest tutto il pomeriggio. Cala Rossano è la parte dell\'isola che ci sta al riparo, e per questo è dove si ripara tutto.'],
      ],
      storia: 'Ventotene si gira in barca in un\'ora e mezza, e da mare si capisce com\'è fatta: un tavolato di tufo alto trenta metri, tagliato dal mare su tutti i lati. Le calette sono i punti in cui il taglio ha ceduto.',
      gioco: 'Le calette sono la scena in cui l\'arco di Claudia avanza per mano di qualcun altro: la lezione che riceve qui vale **aria vera** in immersione, e alza il tetto dei metri raggiungibili.',
    },

    cisterna: {
      titolo: 'Le cisterne romane, dietro Santa Candida',
      ora: 'La mattina del 28, dalle 09:25',
      guarda: [
        ['Il cocciopesto', 'L\'intonaco rosa che copre tutte le pareti: coccio di anfora pestato e mescolato alla calce. Impermeabile, e ancora funzionante.'],
        ['I pilastri', 'Tozzi, quadrati, in file. Reggono la volta e dividono la vasca in navate.'],
        ['La lampada del Comune', 'Una sola, in gabbia, appesa a un cavo. Fuori dal suo cono la cisterna continua per un pezzo che non si vede.'],
        ['Il livello dell\'acqua', 'La riga scura sul cocciopesto, a un\'altezza che dice quanto era piena quando serviva.'],
      ],
      storia: 'Su un\'isola senza sorgenti, l\'acqua era **solo** quella di pioggia: i romani hanno scavato nel tufo **sei cisterne**, con i tetti piani del paese come bacino di raccolta. Oggi se ne visitano due. Le altre quattro sono in paese, sotto le case, e non ne parla nessuno volentieri.',
      gioco: 'Le cisterne sono la spina dorsale dei tre misteri: ogni mistero ha quattro indizi, e al 4/4 il premio è un **effetto meccanico reale** in combattimento, non una pacca sulla spalla. L\'eco qui dentro dice quanto è grande il posto vero.',
    },

    cisterna_sigillata: {
      titolo: 'La cisterna murata di Villa Stefania',
      ora: 'Mezzogiorno meno dieci del 28',
      guarda: [
        ['Il muro nuovo', 'Venti centimetri di malta, tirati su in fretta. Si vede che è in fretta dalla superficie: nessuno l\'ha lisciata.'],
        ['L\'iscrizione col dito', 'Fatta prima che la malta asciugasse. Iniziali e una data: **1957**.'],
        ['I bordi', 'Dove la malta incontra il tufo antico non combacia. Il muro è stato messo lì per chiudere, non per costruire.'],
      ],
      storia: 'Nel dopoguerra molte cisterne dell\'isola sono state chiuse per sicurezza — bambini, crolli, acqua stagnante. Quattro di quelle romane sono state murate senza che ne restasse un verbale. La data sulla malta è l\'unico documento che esista di questa.',
      gioco: 'Un muro di venti centimetri si può aprire: qui la **fucina** conta più che altrove. Le sedici ricette del gioco producono roba che nessuna scena vi regalerà mai — quello che serve, si fa.',
    },

    sotto: {
      titolo: 'Dentro la cisterna murata',
      ora: 'Le quattro e venti del pomeriggio, e i venti minuti dopo',
      guarda: [
        ['La breccia', 'Il buco da cui siete entrati, adesso alle vostre spalle. È l\'unica luce, ed è una luce che viene da fuori.'],
        ['L\'acqua ferma', 'Alta, nera, senza una ruga. Ferma da sessantanove anni.'],
        ['Il gradino', 'Uno scalino di tufo dove si può stare seduti. Qualcuno ci è stato seduto prima.'],
        ['Quello che galleggia', 'Roba. Cose che l\'acqua tiene su perché sono leggere, e che stanno lì da quando è stato chiuso il muro.'],
      ],
      storia: 'L\'acqua di una cisterna chiusa non si guasta come quella di uno stagno: senza luce non cresce niente di verde, e senza correnti non si mescola. Resta quella che era, alla temperatura del tufo, per decenni.',
      gioco: 'Qui il gioco misura la **profondità percepita**: più si scende, più il quadro si scurisce e si stringe, e più il Coro vi sente. È anche uno dei posti in cui trovate le cose che serviranno a quaranta metri.',
    },

    rovine: {
      titolo: 'Villa Giulia, a Punta Eolo',
      ora: 'Mezzogiorno e mezza del 28, col vento',
      guarda: [
        ['Il pianoro', 'Trecento metri per cento, sulla punta nord dell\'isola. Guarda a est: il primo sole e tutta l\'apertura del mare.'],
        ['I muri a terra', 'Alti mezzo metro, il resto è nelle sterpaglie. Si cammina sopra le stanze senza accorgersene.'],
        ['La peschiera', 'Scavata nella roccia sul bordo del mare, con le **paratoie** per far entrare l\'acqua e due bacini coperti a volta.'],
        ['Il nodo di nylon', 'Legato a una pietra. Il nylon non c\'era, duemila anni fa.'],
      ],
      storia: 'Qui Augusto ha relegato sua figlia **Giulia** nel 2 a.C.; poi l\'isola ha ospitato Agrippina Maggiore, Ottavia, Flavia Domitilla. La villa aveva un impianto che muoveva l\'acqua della peschiera: dolce, salata, corrente. Il nome dell\'isola — «quella che dà tutto» — Roma se l\'è tenuto mentre la usava per togliere tutto alle sue donne. E adesso l\'acqua della peschiera è tutta ferma.',
      gioco: 'È il posto dei quattro indizi più difficili. Ed è la scena in cui il gioco dice il suo tema con la voce di un personaggio invece che con la propria: quello che state guardando è un posto bellissimo usato come prigione.',
    },

    notte: {
      titolo: 'Camera due, le Parracine',
      ora: 'Le 23:50 del 28 — e le 03:24, e le 03:26',
      guarda: [
        ['Il ventilatore a pale', 'Gira piano. Le pale sono tre fantasmi sovrapposti, perché l\'occhio non ce la fa a seguirle.'],
        ['La persiana', 'Butta dentro le righe: sul muro, sul letto, sul pavimento. È l\'unica luce.'],
        ['Il letto', 'Grande, e dentro ci sta una persona sola. La metà di sinistra ha il lenzuolo tirato indietro e il materasso nudo.'],
        ['Il cuscino di sinistra', 'L\'incavo di una testa che non si è richiuso.'],
        ['La finestra aperta', 'Fuori dovrebbe esserci il mare. Sul terrazzino, appena fuori, il vaso dei limoni.'],
        ['La graniglia', 'Fra la finestra e il letto, due impronte bagnate. Vanno verso la finestra. Nessuna torna indietro.'],
      ],
      storia: 'Le cicale, ad agosto, smettono verso l\'una: si zittiscono quando la temperatura scende sotto una certa soglia, e ricominciano col caldo del mattino. È l\'orologio più affidabile di un\'isola d\'estate — a Ventotene la gente ci regola le notti in terrazza. Stanotte hanno smesso alle undici e mezza.',
      gioco: 'Le scene di notte non hanno scelte innocue: quello che fate alle 03:24 cambia chi avrete accanto il giorno dopo. Il telefono è un oggetto vero dell\'inventario, e serve.',
    },

    barca: {
      titolo: 'La barca di Ciro, sopra la fossa',
      ora: 'La mattina del 29, dalle 09:40',
      guarda: [
        ['La consolle', 'Legno consumato, un GPS degli anni Duemila e un **ecoscandaglio** degli anni Novanta con lo schermo verde.'],
        ['Il numero sullo schermo', 'La profondità sotto la chiglia. È l\'unico dato che conta oggi.'],
        ['La murata', 'Bassa. Da seduti, l\'acqua è a quaranta centimetri dalla mano.'],
        ['Il mare del canale', 'Fra Ventotene e Santo Stefano. Piatto sopra, e sotto niente che si veda.'],
      ],
      storia: 'Il canale fra le due isole è il punto dove il fondo cade: la piattaforma di tufo finisce e comincia il mare vero. I pescatori dell\'isola sanno a memoria dove sta il gradino, perché è dove si perdono le reti.',
      gioco: 'È il punto di partenza di tutte le discese. **Engine.apneaFiato()** calcola l\'aria che avete: ci entrano il cibo vero, il sonno, il caffè di Ada, le risate — e la lezione che Claudia ha ricevuto alle calette. Con la bombola riparata il tetto sale di molto.',
    },

    santo_stefano: {
      titolo: 'Santo Stefano — lo sbarco e il muro di fuori',
      ora: 'Le dieci del 29, e il pomeriggio',
      guarda: [
        ['L\'isola', 'Un blocco di tufo di ventisette ettari, senza un porto: si sbarca su uno scivolo, e solo col mare giusto.'],
        ['Il muro di cinta', 'Alto, senza appoggi, che segue la cima. Il carcere non ha sbarre verso il mare: il mare **è** le sbarre.'],
        ['Il terrazzamento', 'Fuori dal muro. I detenuti coltivavano qui, a vista della guardia.'],
        ['L\'edificio a ferro di cavallo', 'Si vede da tutta Ventotene. Da vicino è più grande di come sembra da lontano.'],
      ],
      storia: 'Il carcere borbonico di Santo Stefano è del **1797** (progetto di Francesco Carpi, voluto da Ferdinando IV) e ha chiuso nel **1965**. Ci sono passati Luigi Settembrini, Gaetano Bresci, Sandro Pertini. Nessuno è mai evaso a nuoto.',
      gioco: 'Da qui in poi il gioco cambia ritmo: l\'isola è disabitata e non ci sono alleati da chiamare. Chi vi accompagna, vi accompagna perché avete fatto qualcosa perché lo facesse.',
    },

    panopticon: {
      titolo: 'Il panopticon, dal centro',
      ora: 'Mezzogiorno meno venti',
      guarda: [
        ['Il ferro di cavallo', 'Tre piani di celle su un unico anello curvo, tutte affacciate all\'interno.'],
        ['Il pozzo centrale', 'Il vuoto in mezzo. Da qui, una guardia sola vede dentro tutte le celle nello stesso momento.'],
        ['La cappella', 'Al centro, dentro il pozzo: si assisteva alla messa dalla porta della propria cella.'],
        ['Le porte', 'Novantanove, tutte aperte da sessant\'anni. Ne conterete una che fa **clac**.'],
      ],
      storia: 'Il panopticon è un\'idea del filosofo Jeremy Bentham: una prigione in cui il sorvegliante vede tutti e nessuno vede lui, così che i sorvegliati si comportino **come se** fossero guardati sempre. Santo Stefano è la prima realizzazione al mondo di quell\'idea, e ha preceduto il libro di Bentham. La forma dell\'edificio è un teatro: le celle sono i palchi, e la scena è il pozzo.',
      gioco: 'La struttura dell\'edificio è la struttura di questa parte del gioco: si gira l\'anello, e ogni cella aperta è una scelta. Il Coro qui è al lavoro da duecento anni e non ha mai avuto bisogno di alzare la voce.',
    },

    cella: {
      titolo: 'La cella 47, secondo anello',
      ora: 'Il pomeriggio del 29',
      guarda: [
        ['Le tacche', 'Sulla parete di fondo, in fasce, in gruppi di cinque: la quinta di traverso sopra le altre quattro. Sono **ottomilaquarantuno**.'],
        ['La calce staccata', 'Sotto, il tufo vivo con una patina scura e unta. Non è muffa e non viene via: è duecento anni di corpi.'],
        ['Il tavolato di pietra', 'Colato nel muro, a sinistra. Era il letto.'],
        ['Il buco nell\'angolo', 'Con intorno sessant\'anni di niente.'],
        ['L\'ultima tacca, in alto a destra', 'Dentro le altre ottomilaquaranta il tufo è grigio di polvere. Dentro questa il tufo è **giallo**. Chiaro. Pulito.'],
      ],
      storia: 'Le celle di Santo Stefano misuravano circa 4,50 × 4,20 metri e dopo il 1900 sono state divise in due. Ottomilaquarantuno giorni sono ventidue anni: la pena di un ergastolo commutato, o la pazienza di un uomo che ha deciso di contare invece di impazzire. Contare è un modo di restare qualcuno.',
      gioco: 'Questa cella è una delle stanze in cui il gioco vi chiede di **fare** una cosa lunga e inutile, e poi la conta. Non tutte le meccaniche servono a vincere.',
    },

    cimitero: {
      titolo: 'Il cimitero dei detenuti',
      ora: 'Le due e venti del pomeriggio',
      guarda: [
        ['Le croci', 'File regolari, tutte uguali, tutte di ferro, tutte piccole.'],
        ['I numeri', 'Al posto dei nomi. Il numero di matricola, che in carcere era il nome.'],
        ['Il terreno', 'Tufo e sterpaglie. Nessuno taglia l\'erba da sessant\'anni, e l\'erba qui non cresce molto.'],
      ],
      storia: 'Chi moriva a Santo Stefano restava a Santo Stefano: le famiglie erano lontane, il trasporto costava, e molti non avevano più nessuno. Le croci portano il numero perché il registro portava il numero. Sull\'isola sono sepolte più persone di quante ne siano mai uscite vive in un anno qualunque.',
      gioco: 'Non c\'è nulla da raccogliere qui. È una delle poche scene del gioco senza premio: serve a guardare, e il gioco se ne accorge se guardate davvero.',
    },

    fossa: {
      titolo: 'La fossa, sulla verticale della cima',
      ora: 'Meno trentuno metri — e poi meno quarantuno',
      guarda: [
        ['La cengia', 'Il gradino di roccia a meno trenta. Da qui in giù la parete non ha più appigli.'],
        ['Il blu', 'Che smette di essere blu. A questa profondità il rosso è già morto da venticinque metri: resta il verde, poi solo il blu, poi il grigio.'],
        ['La neve marina', 'Le particelle che salgono nel fascio della torcia. Sono l\'unica cosa che si muove.'],
        ['Il fondo', 'Che non è un fondo. È un\'apertura.'],
      ],
      storia: 'A quaranta metri l\'azoto comincia a fare effetto sul pensiero: la narcosi non fa paura, fa il contrario — dà sicurezza. È il motivo per cui a quella profondità le decisioni sbagliate sembrano ottime. La sosta di sicurezza in risalita non è una precauzione: è la parte dell\'immersione in cui si smaltisce quello che si è respirato.',
      gioco: 'Qui il Fiato è finito e conta solo quello che avete portato. L\'**Attenzione del Coro** presenta il conto: a 5 o più i nemici finali prendono +2 ai colpi e +6 PV; a 0 partono con svantaggio. Ascoltare troppo, nei giorni prima, si paga adesso e davanti a tutti.',
    },

    relitto: {
      titolo: 'La stiva della Santa Lucia',
      ora: 'Meno quarantacinque metri',
      guarda: [
        ['Lo scafo', 'Legno, non ferro. Coperto di concrezioni bianche e di posidonia morta.'],
        ['L\'apertura della stiva', 'Nera. La torcia ci entra e non torna indietro.'],
        ['Le cose piccole', 'Sul fondo della stiva. Ce ne sono molte, e sono tutte piccole.'],
      ],
      storia: 'Il 24 luglio 1943 il piroscafo **Santa Lucia**, che faceva la linea per le isole ponziane, è stato affondato da aerei alleati con centinaia di persone a bordo. Molti erano civili, e molti erano bambini in evacuazione. È una delle stragi meno raccontate di quella guerra.',
      gioco: 'È l\'ultimo posto del gioco e non ha una meccanica nuova: ha soltanto quello che avete portato e quello che avete deciso di essere nei tre giorni precedenti. Il gioco tiene il conto di tutte e due le cose.',
    },

    alba: {
      titolo: 'L\'alba dalle Parracine',
      ora: 'Domenica 30 agosto, 07:10',
      guarda: [
        ['Il sole che esce dall\'acqua', 'A sinistra del centro. Da Ventotene si vede sorgere dal mare, perché a est non c\'è niente.'],
        ['Il colore del cielo', 'Arancione basso, poi verde, poi il blu della notte che se ne va. Dura otto minuti.'],
        ['Le due sagome', 'Ancora là, e adesso le conoscete.'],
      ],
      storia: 'Il primo settembre sono dieci anni. Cade di martedì, e martedì lavorano tutti e due: per questo il regalo era anticipato.',
      gioco: 'È l\'unico sfondo del gioco su cui il motore **non** mette il velo della profondità: qui si respira. Se ci arrivate, ci arrivate con quello che avete tenuto — e il gioco, alla fine, vi dice anche quello che non vi ha mostrato.',
    },
  };

  /* ---------- il rendering: identico in tutti i giochi della serie ---------- */

  const $ = id => document.getElementById(id);
  let corrente = null;

  function apri(key, titoloHUD) {
    const L = LUOGHI[key];
    if (!L) return;
    const box = $('modal-generic-content');
    if (!box) return;
    box.innerHTML = `<h2>🔎 ${L.titolo}</h2>`
      + `<p style="color:var(--text-dim);margin:-6px 0 14px">${L.ora}</p>`
      + (titoloHUD && titoloHUD !== L.titolo
          ? `<p style="color:var(--text-dim);font-size:.92em;margin:-10px 0 14px">Nel gioco, adesso: <b>${titoloHUD}</b></p>` : '')
      + `<h3>👁 Cosa vedete nel quadro</h3><ul style="margin:0 0 14px;padding-left:18px">`
      + L.guarda.map(([n, t]) => `<li style="margin-bottom:7px"><b>${n}.</b> ${t}</li>`).join('')
      + `</ul><h3>📜 Perché questo posto esiste</h3><p style="margin:0 0 14px">${L.storia}</p>`
      + `<h3>🎲 Cosa c'entra col gioco</h3><p style="margin:0 0 4px">${L.gioco}</p>`
      + `<p style="color:var(--text-dim);font-size:.86em;margin:14px 0 0">Questa scheda racconta solo quello che`
      + ` avete già davanti agli occhi: non anticipa niente di quello che deve ancora succedere.</p>`;
    const chiudi = document.createElement('button');
    chiudi.className = 'btn';
    chiudi.style.marginTop = '14px';
    chiudi.textContent = '↩ Torna alla scena';
    chiudi.onclick = () => $('modal-generic').classList.add('hidden');
    box.appendChild(chiudi);
    $('modal-generic').classList.remove('hidden');
  }

  /* Chiamata dal motore dopo ogni Scenes.paint(): accende il pulsante se questo
     luogo ha una scheda, lo spegne se non ce l'ha. Un luogo senza scheda non
     mostra un pulsante che apre il vuoto. */
  function aggiorna(key, titoloHUD) {
    corrente = key;
    const b = $('btn-scena');
    if (!b) return;
    const haScheda = !!LUOGHI[key];
    b.classList.toggle('hidden', !haScheda);
    if (!haScheda) return;
    b.onclick = () => apri(key, titoloHUD);
    b.title = 'Cosa sto guardando?';
  }

  return { LUOGHI, apri, aggiorna, corrente: () => corrente };
})();
