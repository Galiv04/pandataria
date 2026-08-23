/* ============ SPRITES — pixel art procedurale ============
   PANDATARIA. Ogni sprite è una mappa di caratteri 16x16 o 32x32: ogni carattere
   è un colore nella palette dello sprite, '.' = trasparente. Le mappe 32x32
   occupano lo STESSO ingombro delle 16x16, con il doppio del dettaglio.
   Tavolozza: marina e profonda — blu-neri d'abisso, verdi-petrolio di posidonia,
   il rosa del cocciopesto romano, il bianco del sale, il giallo della torcia
   sott'acqua e il rosso del Coro (#8f1d2c). Vedi docs/DESIGN.md § 10.8. */

const Sprites = (() => {

  function drawSprite(ctx, map, palette, x, y, scale, flip = false) {
    const h = map.length, w = map[0].length;
    // 'scale' è la dimensione della cella di una griglia 16: mappe a risoluzione
    // doppia (32x32) occupano lo STESSO ingombro con il doppio del dettaglio.
    const px = scale * 16 / h;
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        const ch = map[r][flip ? w - 1 - c : c];
        if (ch === '.') continue;
        const col = palette[ch];
        if (!col) continue;
        ctx.fillStyle = col;
        // ceil per evitare cuciture tra celle non intere
        ctx.fillRect(x + c * px, y + r * px, Math.ceil(px), Math.ceil(px));
      }
    }
  }

  function renderToCanvas(canvas, spriteDef, bg = '#071219') {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min(canvas.width, canvas.height) / 16;
    const off = Math.floor((canvas.width - scale * 16) / 2);
    drawSprite(ctx, spriteDef.map, spriteDef.palette, off, off, scale);
  }

  /* ---------- I TRE EROI ---------- */

  // Gaetano — l'ingegnere satellitare: occhiali, polo blu col badge, multimetro (32x32)
  const gaetano = {
    palette: { s:'#e0b090', h:'#2a2018', e:'#2a2a35', p:'#2a4a7a', P:'#1d3558', d:'#3a3a45', w:'#fff', k:'#8a5a48', n:'#c89878', K:'#1a1a22', y:'#e8c840', G:'#7ae0a8', B:'#d85040' },
    map: [
      '................................',
      '................................',
      '..........hhhhhhhhhhhh..........',
      '.........hhhhhhhhhhhhhh.........',
      '.........hhhhhhhhhhhhhh.........',
      '.........hhhhhhhhhhhhhh.........',
      '.........hhshhhsshhhshh.........',
      '.........hhswwwsswwwshh.........',
      '.........hhswewsswewshh.........',
      '.........ssssssnnssssss.........',
      '..........sssskkkkssss..........',
      '..........ssssssssssss..........',
      '..............ssss..............',
      '..............ssss..............',
      '.........ppppPPPPPPpppp.........',
      '.......pppppBBppppppppppp.......',
      '.......ppppPBBPPPPPPPpppp.......',
      '.......ppppPPPPPPPPPPpppp.......',
      '.......ppppPPPPPPPPPPpppyyyyyy..',
      '.......ppppPPPPPPPPPPpppyGGGGy..',
      '.......ppppPPPPPPPPPPpppyGGGGy..',
      '.......ssppPPPPPPPPPPppssGGGGy..',
      '.......ssppppppppppppppssyyyyy..',
      '...........dddd..dddd...yyKyKy..',
      '...........dddd..dddd...yyyyyy..',
      '...........dddd..dddd...yyyyyy..',
      '...........dddd..dddd...........',
      '...........dddd..dddd...........',
      '...........dddd..dddd...........',
      '..........KKKKK..KKKKK..........',
      '..........KKKKK..KKKKK..........',
      '................................',
    ],
  };

  // Claudia — l'Antenna: telefono alzato col flash, top magenta (32x32)
  const claudia = {
    palette: { s:'#e8bc98', h:'#241a14', e:'#3a2a20', t:'#a83a6a', T:'#7a2848', D:'#2e2e3a', w:'#fff', n:'#d0a080', K:'#1a1a22', f:'#1a1a22', F:'#5ad8e0', r:'#b04858' },
    map: [
      '................................',
      '..........hhhhhhhhhhhh...w......',
      '.........hhhhhhhhhhhhhh.w.w.....',
      '.........hhhhhhhhhhhhhhfffff....',
      '........hhhhhhhhhhhhhhhfFFFf....',
      '........hhhsssssssssshhfFFFf....',
      '........hhhshhhsshhhshhfFFFf....',
      '........hhhswwwsswwwshhfFFFf....',
      '........hhhswewsswewshhfffff....',
      '........hhhssssnnsssshhhss......',
      '........hhhsssrrrrssshhhss......',
      '........hhhsssssssssshhhss......',
      '........hhh...ssss...hhhss......',
      '........hhh...ssss...hhhss......',
      '........hhhtttttttttthhhss......',
      '.......thhhtttttttttthh.........',
      '.......ttttTTTTTTTTTTtt.........',
      '.......ttttTTTTTTTTTTtt.........',
      '.......ttttTTTTTTTTTTtt.........',
      '.......ttttTTTTTTTTTTtt.........',
      '.......ttttTTTTTTTTTTtt.........',
      '.......ssttTTTTTTTTTTtt.........',
      '.......sstttttttttttttt.........',
      '..........DDDDDDDDDDDD..........',
      '..........DDDDDDDDDDDD..........',
      '..........DDDDDDDDDDDD..........',
      '...........ssss..ssss...........',
      '...........ssss..ssss...........',
      '...........ssss..ssss...........',
      '..........KKKKK..KKKKK..........',
      '..........KKKKK..KKKKK..........',
      '................................',
    ],
  };

  // Ciro — il pescatore: ottant'anni, canottiera slavata, mani enormi, la lampara (32x32)
  const ciro = {
    palette: { s:'#b58259', S:'#8a5c3c', n:'#d3a377', h:'#dedac9', H:'#a9a496', e:'#23232a', w:'#f0ecdd', k:'#3b2d23', c:'#e2ddcd', C:'#b6b0a0', t:'#7c7660', T:'#5c5747', y:'#ffd27f', Y:'#c8961f', K:'#241c1a' },
    map: [
      '................................',
      '............h.hhh.h.h...........',
      '..........HhhHhhhhHhhH..........',
      '..........HhHhhhhhhHhH..........',
      '..........HHssssssssHH..........',
      '..........SsHHssHHsssS..........',
      '..........SsswessewssS..........',
      '..........SssSssssSssS..........',
      '..........SsssnnsssssS..........',
      '..........SsssskkssssS..........',
      '..........SssHHHHHHssS..........',
      '...........SSSSSSSSSS...........',
      '..............ssss..............',
      '..............SSSS..............',
      '.........ssccssssssccss.........',
      '........ssccssssssssccss........',
      '........sscccsssssscccss........',
      '........ssccccccccccccss........',
      '........ssccCCCCCCCCccss........',
      '........ssccCCCCCCCCccss........',
      '........ssccCCCCCCCCccss........',
      '........ssccCCCCCCCCccss........',
      '......ssssttttttttttttssss......',
      '......SssSttttttttttttSssS......',
      '......ssssttttt..tttttssss......',
      '..........ttttt..ttttt...Y......',
      '..........ttttt..ttttt.YYYYY....',
      '..........ttttt..ttttt.YyyyY....',
      '..........ttttt..ttttt.YywyY....',
      '..........TTTTT..TTTTT.YyyyY....',
      '..........KKKKK..KKKKK.YYYYY....',
      '..........KKKKK..KKKKK..........',
    ],
  };

  /* ---------- LE VOCI ---------- */

  // Un'Eco — non un corpo: acqua che ha preso l'abitudine di stare in piedi (32x32)
  const eco = {
    // Nessun occhio, nessuna faccia, nessun contorno chiuso: se si legge come una
    // creatura ha già perso. Tre soli toni, tutti vicinissimi al fondo — la si vede
    // perché l'acqua dietro è ferma e lei no.
    palette: { v:'#16303c', V:'#255060', w:'#3f7580', f:'#0f2028' },
    map: [
      '................................',
      '................................',
      '..............f.................',
      '.............fvf................',
      '............fvvvf...............',
      '............fvvvvf..............',
      '...........fvvvvvf..............',
      '...........fvvvvv.f.............',
      '..........fvvVvvvvf.............',
      '..........fvvvvvvv.f............',
      '.........fvvvvvvvvvf............',
      '.........fvvvvwvvvv.f...........',
      '........fvvvvvvvvvvvf...........',
      '.......f.vvvvvvvvvv.f...........',
      '........fvvvvvvvvvvvf...........',
      '.......fvvvvvvvvvvvv.f..........',
      '.......fvvvvVvvvvvvvf...........',
      '......fvvvvvvvvvvvvv.f..........',
      '......fvvvvvvvvvvvvvf...........',
      '.....f.vvvvvvvvvvvv.f...........',
      '......fvvvvvvvvvvvvf............',
      '.....fvvvvvvvvvvvvv.f...........',
      '.....fvvvvvvvvvvvvf.............',
      '....f.vvvvvvvvvvv.f.............',
      '.....fvvvvvvvvvvf...............',
      '....fvvvvvvvvvv.f...............',
      '.....fvvvvvvvvf.................',
      '....f.vvvvvvv.f.................',
      '.....fvvvvvf....................',
      '......fvvvf.....................',
      '.......f.f......................',
      '................................',
    ],
  };

  // Una Annegata del '43 — il vestito buono che galleggia verso l'alto, i capelli sospesi (32x32)
  const annegata = {
    palette: { s:'#9aa39c', S:'#6e7972', e:'#191f24', w:'#cfd8d4', h:'#141d26', H:'#26333e', d:'#2c4d5c', D:'#1b3240', b:'#4a545e' },
    map: [
      '................................',
      '..........HhH...................',
      '.........hHhhHh.................',
      '........hHhhhhHh................',
      '.......hHhhssshHh...............',
      '.......hHhsssssHhh..............',
      '......hHhssesssshh..............',
      '......hhhsssssssHh..............',
      '.....hHhhsssswsshh.h............',
      '.....hhHhhssssshhhhh............',
      '......hhhHhsssshhh.h............',
      '.......hhhhhssHhh...............',
      '........hhhhSSh.................',
      '....s....hhSSS..................',
      '...ss...ddSSSdd.................',
      '..sss..dddSSSddd............s...',
      '..ss..ddddSSdddddd........sss...',
      '.....dddddSdddddddd.....ssss....',
      '....ddddddddddddddddd..sss......',
      '....DdddddddddddddddDdss........',
      '...DDdddddddddddddddDDd.........',
      '...DDdddddddddddddddDD..........',
      '..DDdddddddddddddddDD...........',
      '..DDddddddddddddddDDD...........',
      '.DDDdddddddddddddDDD............',
      '.DDDddddddddddddDDDD............',
      '.DDDDdddddddddDDDDD.............',
      '..DDDDdddddddDDDDD..............',
      '...DDDDddddDDDDD................',
      '.....DDDDDDDDD..................',
      '.......DDDDD....................',
      '................................',
    ],
  };

  // Un Detenuto della Cella 47 — divisa a righe sbiadita, scalzo, e la faccia CONFUSA (32x32)
  const detenuto = {
    palette: { s:'#a5896d', S:'#7d6650', e:'#24242a', w:'#e6e2d4', k:'#33281f', h:'#2e2a26', c:'#c9c2b0', C:'#615c4c' },
    map: [
      '................................',
      '................................',
      '...........hhhhhhhhhh...........',
      '..........hhhhhhhhhhhh..........',
      '..........hhhhhhhhhhhh..........',
      '..........hssssssssssh..........',
      '..........hssSSssSSssh..........',
      '..........hswewsswewsh..........',
      '..........hssssssssssh..........',
      '..........hssssSSssssh..........',
      '..........hssskkkksssh..........',
      '..........hssssssssssh..........',
      '...........SSSSSSSSSS...........',
      '..............ssss..............',
      '..........cccccccccccc..........',
      '.........ssCCCCCCCCCCss.........',
      '.........ssccccccccccss.........',
      '.........ssCCCCCCCCCCss.........',
      '.........ssccccccccccss.........',
      '.........ssCCCCCCCCCCss.........',
      '.........ssccccccccccss.........',
      '.........ssCCCCCCCCCCss.........',
      '........sssccccccccccsss........',
      '........sssCCCCCCCCCCsss........',
      '...........cccc..cccc...........',
      '...........CCCC..CCCC...........',
      '...........cccc..cccc...........',
      '...........CCCC..CCCC...........',
      '...........sss....sss...........',
      '...........sss....sss...........',
      '...........ssss..ssss...........',
      '...........SSSS..SSSS...........',
    ],
  };

  // La Guardia che Piangeva — divisa, berretto, e le mani sulla faccia (32x32)
  const guardia = {
    palette: { s:'#c0a082', S:'#96775c', k:'#221c20', g:'#2a1e18', u:'#3c4a58', U:'#2a3540', b:'#1e2630', B:'#131920', y:'#b89a3a', w:'#d8dcd4', T:'#9fb8c4' },
    map: [
      '................................',
      '...........bbbbbbbbbb...........',
      '..........bbbbbbbbbbbb..........',
      '..........bbbbbyybbbbb..........',
      '..........bbbbbbbbbbbb..........',
      '.........BBBBBBBBBBBBBB.........',
      '..........gggggggggggg..........',
      '.........ssssssggssssss.........',
      '........ussgssggggssgssu........',
      '.......uussgssggggssgssuu.......',
      '......uuussgssggggssgssuuu......',
      '......uuussssssggssssssuuu......',
      '......uuussTsssggsssTssuuu......',
      '......uuu..TSSkkkkSST..uuu......',
      '......uuu..TwwwwwwwwT..uuu......',
      '......uuuuuuuuuuuuuuuuuuuu......',
      '......uuUUUUUUUUUUUUUUUUuu......',
      '......uuUUUUUUUUyUUUUUUUuu......',
      '......uuUUUUUUUUUUUUUUUUuu......',
      '......uuUUUUUUUUyUUUUUUUuu......',
      '......uuUUUUUUUUUUUUUUUUuu......',
      '......uuUUUUUUUUyUUUUUUUuu......',
      '......uuUUUUUUUUUUUUUUUUuu......',
      '.......kkkkkkkkkkkkkkkkkk.......',
      '........UUUUUUUUUUUUUUUU........',
      '.........UUUUUU..UUUUUU.........',
      '.........uuuuuu..uuuuuu.........',
      '.........UUUUUU..UUUUUU.........',
      '.........uuuuuu..uuuuuu.........',
      '.........UUUUUU..UUUUUU.........',
      '.........kkkkkk..kkkkkk.........',
      '........kkkkkkk..kkkkkkk........',
    ],
  };

  // GIULIA (boss) — stola color cocciopesto, capelli alla romana, la medaglietta d'argento (32x32)
  const giulia = {
    palette: { s:'#ccae94', S:'#9c8068', w:'#f0ece0', k:'#7a2a30', h:'#2b2018', H:'#46362a', t:'#a86a60', T:'#7e4a44', b:'#e0d8c4', g:'#d2d8e0', G:'#8f959e', r:'#8f1d2c' },
    map: [
      '.............hhhhhh.............',
      '............hHHHHHHh............',
      '...........hhhhhhhhhh...........',
      '..........hhhhhhhhhhhh..........',
      '..........hHHHHHHHHHHh..........',
      '..........hhhhhhhhhhhh..........',
      '..........hssssssssssh..........',
      '..........hshhsshhsssh..........',
      '..........hswrssssrwsh..........',
      '..........hssssssssssh..........',
      '..........hssssSSssssh..........',
      '..........hsssskkssssh..........',
      '..........hssssssssssh..........',
      '...........SSSSSSSSSS...........',
      '.............ssssss.............',
      '.............sGssGs.............',
      '........ttttttGggGtttttt........',
      '........ttttttGggGtttttt........',
      '........ttTbtTttTttTttTt........',
      '........ttTbtTttTttTttTt........',
      '........ttTbtTttTttTttTt........',
      '........ttTbtTttTttTttTt........',
      '........ttTbtTttTttTttTt........',
      '........ttTbtTttTttTttTt........',
      '........ttTbtTssSSssttTt........',
      '........ttTbtTSSssSSttTt........',
      '.......TttTbtTttTttTttTtt.......',
      '.......TttTbtTttTttTttTtt.......',
      '......tTttTbtTttTttTttTttT......',
      '......tTttTbtTttTttTttTttT......',
      '.....ttTttTbtTttTttTttTttTt.....',
      '.....TTTTTTTTTTTTTTTTTTTTTT.....',
    ],
  };

  // La Bambina che Canta (boss) — Assuntina: cappotto troppo grande, secchiello giallo (32x32)
  const bambina = {
    palette: { s:'#ddb99a', S:'#ac8a6e', e:'#23232c', w:'#f4efe2', k:'#7a4a48', h:'#4a3220', H:'#674630', c:'#4a5a6e', C:'#33414f', D:'#1e2833', b:'#d8d2c0', y:'#e8c73f', Y:'#a8891c', p:'#b5b0a2', K:'#2a2228' },
    map: [
      '................................',
      '............hhhhhhhh............',
      '...........hhhhhhhhhh...........',
      '..........hhhhhhhhhhhh..........',
      '..........hhhhhhhhhhhh..........',
      '..........hHssssssssHh..........',
      '..........hssssssssssh..........',
      '..........hswessssewsh..........',
      '..........hseesssseesh..........',
      '..........hssssssssssh..........',
      '..........hssssSSssssh..........',
      '..........hsssskkssssh..........',
      '...........sssskkssss...........',
      '............SSSSSSSS............',
      '........bbbbbbbbbbbbbbbb........',
      '.....cccccccccccccccccccccc.....',
      '.....cCCCCCCCCCCCCCCCCCCCCc.....',
      '.....cccDCCCCCCbbCCCCCCDccc.....',
      '.....cccDCCCCCCCCCCCCCCDccc.....',
      '.....cccDCCCCCCbbCCCCCCDccc.....',
      '.....cccDCCCCCCCCCCCCCCDccc.....',
      '.....cccDCCCCCCbbCCCCCCDccc.....',
      '.....cccDCCCCCCCCCCCCCCDccc.....',
      '.....cccDccccccccccccccDccc.....',
      '.....CCCDCCCCCCCCCCCCCCDCCC.....',
      '......CCDCCCCCCCCCCCCCCDCC......',
      '......CC.cccccccccccccc.sss.....',
      '.........cccccccccccccc.YYYYY...',
      '............sss..sss....yyyyy...',
      '............sss..sss....YyyyY...',
      '............ppp..ppp....YyyyY...',
      '...........KKKK..KKKK...YYYYY...',
    ],
  };

  // IL CORO (boss finale) — sagome sovrapposte, tante teste da una sola forma d'acqua, decine di occhi (32x32)
  const coro = {
    palette: { v:'#16303c', V:'#27596b', d:'#0b1a22', w:'#7fb0ba', r:'#8f1d2c', y:'#ffd27f', W:'#c9c2b0' },
    map: [
      '................................',
      '................................',
      '................................',
      '...............wv...............',
      '..............vvvv..............',
      '..............vvvv..............',
      '..........wv..rvvr..............',
      '.........vvvv.vvvv..wv..........',
      '.........vvvv.vvvv.vvvv.........',
      '.....wv..rvvr.vvvv.vvvv.........',
      '....vvvv.vvvv.vvvv.rvvr..wv.....',
      '....vvvvvvvvvvvvvvvvvvvvvvvv....',
      '....vvvvvvvvvvvvvvvvvvvvvvvv....',
      '....vvvVvvvvvvvyvyvvvvvvVvvv....',
      '......VvvvvdvvvvvvvvvvvvvV......',
      '.....VvvvvvdvvvvvvvvvvdvvvV.....',
      '....VrdvvrvdvvvvvvvrvvdvvvvV....',
      '...VvvdvvvvdvvrvvvvvvvdvrvvvV...',
      '..VvWWdvvvvdvvvvvdvvvvdvvvWWrV..',
      '..VvvvdvvvydvvvvvdvvvvdvvvvvvV..',
      '.VvrvvdvvvvdvrvvvdvvvvdrvvvdvvV.',
      '.VvvvvdvrvvdvvvvvdrvvvdvvvvdvrV.',
      'VvvvvvdvvvvdvvvWWdvvvvdvvvvdvvvV',
      'VvvvvvdvvvvvvvvvvdvvvvdvvvvdvvvV',
      'VvvvvvdvvvvrvvvvvdvvvrdvvvvdvvvV',
      'VdvvvvrvdvvvvvvdrdvvvvdvvvrdvdvV',
      'VvvdvvvvvvdvvvvvvdvvvvvvdvvdvvvV',
      'VvvvvdvvvvWWdvvvvdvdWWvvvvddvvvV',
      'VvvvvvvdvvvvvvdvvdvvvdvvvvvvdvvV',
      '.VdvvvvvvdvvvvvvddvvvvvdvvvvvvV.',
      '..vvvvv..vvvvvvv..vvvvvv..vvvv..',
      '....vvvv...vvvvvv...vvvvv.......',
    ],
  };

  // Il Polpo della Peschiera — occhio orizzontale, otto braccia, nessuna cattiveria (16x16)
  const polpo = {
    palette: { p:'#7d4a46', P:'#5a3230', e:'#f0e6c8', k:'#1a1418', w:'#c89a90' },
    map: [
      '......pppp......',
      '....pppppppp....',
      '...pppppppppp...',
      '..pppppppppppp..',
      '..peeeeppeeeep..',
      '..pekkeppekkep..',
      '..pPPPPppPPPPp..',
      '..PPPPPPPPPPPP..',
      '.PPPPPPPPPPPPPP.',
      'PPPPPPPPPPPPPPPP',
      'pp.pp.pp.pp.pp.p',
      'p.pp.pp..pp.pp.p',
      'w.p.pp..pp..p.pp',
      '.p..p..pp..p..w.',
      '..w..p..p..w....',
      '......p..p......',
    ],
  };

  // La Murena del Relitto — bocca aperta, il corpo che esce da una fessura di roccia (16x16)
  const murena = {
    palette: { m:'#6a7a4a', M:'#4a5636', R:'#2e3a3e', N:'#46545a', k:'#0a1216', w:'#e8e4d4', e:'#d8c860', p:'#141014', r:'#6e2f33' },
    map: [
      'RRRRRN..........',
      'RRRRN...........',
      'RRRNk...........',
      'RRNkmmm.........',
      'RRRkmmmmm.......',
      'RRRkmmepmmmm....',
      'RRNkmmmmmmmm....',
      'RRNkmmmwrwrwrwr.',
      'RRRkmmmrrrrrrrr.',
      'RRRkmmmrwrwrwrw.',
      'RRNkmmmmmmmmm...',
      'RRNkmmmmmmmm....',
      'RRRkMmmmmm......',
      'RRNkmmmmm.......',
      'RRRRkmmm........',
      'RRRRNkmm........',
    ],
  };

  // Uno Sciame di Sussurri — bolle che salgono, ognuna con una bocca minuscola dentro (16x16)
  const sciameVoci = {
    palette: { w:'#dfeef2', b:'#9dc4cc', B:'#5b8b95', v:'#2b4f59', k:'#0d1a20' },
    map: [
      '.......B........',
      '...v........v...',
      '.........wB.....',
      '....wv...Bk...v.',
      '....vkwbb.......',
      '.wB...bkb..B....',
      '.Bk...bbb....wB.',
      '...wBB.......Bk.',
      '...BkB....b.....',
      'B..BBB......wb.b',
      '......wbb...bk..',
      '..wb..bkb.......',
      '..bk..bbb..wb.b.',
      'b..........bk...',
      '....wb...wb...wB',
      '....bk.b.bk...Bk',
    ],
  };

  /* La Voce di Chi Ami — Claudia che incontra sé stessa. Stessa silhouette, palette
     ROVESCIATA: un riflesso in acqua nera. L'unica differenza è nella riga 8 —
     le pupille convergono di un pixel. Si nota solo se la guardi. */
  const seStessa = {
    palette: { s:'#1b3038', h:'#8fa6ac', e:'#dce8ea', t:'#2f7a5f', T:'#1d4f3e', D:'#7d8e92', w:'#0a1014', n:'#22333a', K:'#66787d', f:'#93a5a8', F:'#6a2820', r:'#3d6a72' },
    map: claudia.map.map((row, i) =>
      i === 8 ? '........hhhswwessewwshh.........' : row),
  };

  const registry = {
    // i tre eroi
    gaetano, claudia, ciro,
    // le undici voci del bestiario
    eco, annegata, detenuto, guardia, giulia, bambina, coro,
    se_stessa: seStessa, polpo, murena, sciame_voci: sciameVoci,
  };

  return { drawSprite, renderToCanvas, registry };
})();
