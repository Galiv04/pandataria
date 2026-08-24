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
  ['mano_nella_stiva',     'A quarantacinque metri, nella stiva, qualcuno le ha preso la mano. Non stringeva: TENEVA, col pollice sopra le nocche. Cinque secondi, e poi due colpetti col pollice — il segnale che quei due usano da dieci anni sotto la doccia, in aereo, nelle sale d\'attesa: tutto bene, andiamo.'],
  ['mano_sbagliata',      'Il girato della stiva, guardato sulla banchina alle 17:22, alla luce e in due, come dice la regola dell\'occhio lungo. Al minuto 02:14 una mano entra nell\'inquadratura e le prende la mano. Due secondi prima, in alto a sinistra, c\'e l\'alone della torcia da casco: mille lumen, e l\'illuminamento cade col quadrato della distanza. Undici metri sopra di lei. Rifatto due volte: undici metri.'],
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
