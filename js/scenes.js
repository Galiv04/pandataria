/* ============ SCENES — sfondi pixel/blocchi procedurali ============
   "Pandataria" — Ventotene e Santo Stefano, e quello che c'è sotto.
   Tavolozza marina e profonda: blu-neri, verde petrolio, il rosa del cocciopesto,
   il bianco del sale, il giallo del tufo al sole, il giallo sporco della torcia.
   L'orrore avanza con la PROFONDITÀ: velo blu-nero + vignetta + neve marina. */

const Scenes = (() => {

  // RNG con seme, per texture riproducibili
  function rng(seed) {
    let s = seed >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function shade(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    r = Math.max(0, Math.min(255, Math.round(r * f)));
    g = Math.max(0, Math.min(255, Math.round(g * f)));
    b = Math.max(0, Math.min(255, Math.round(b * f)));
    return `rgb(${r},${g},${b})`;
  }

  // Riempi area con blocchi stile minecraft (variazione di tono per blocco)
  function blocks(ctx, x, y, w, h, color, blockSize, rand, variance = 0.18) {
    for (let by = y; by < y + h; by += blockSize) {
      for (let bx = x; bx < x + w; bx += blockSize) {
        const f = 1 - variance / 2 + rand() * variance;
        ctx.fillStyle = shade(color, f);
        ctx.fillRect(bx, by, Math.min(blockSize, x + w - bx), Math.min(blockSize, y + h - by));
        // bordo superiore più chiaro (effetto 3D blocco)
        ctx.fillStyle = shade(color, f * 1.15);
        ctx.fillRect(bx, by, Math.min(blockSize, x + w - bx), 2);
      }
    }
  }

  function skyGradient(ctx, W, H, top, bottom, bands = 8) {
    for (let i = 0; i < bands; i++) {
      const t = i / (bands - 1);
      const c1 = parseInt(top.slice(1), 16), c2 = parseInt(bottom.slice(1), 16);
      const r = Math.round(((c1 >> 16) & 255) * (1 - t) + ((c2 >> 16) & 255) * t);
      const g = Math.round(((c1 >> 8) & 255) * (1 - t) + ((c2 >> 8) & 255) * t);
      const b = Math.round((c1 & 255) * (1 - t) + (c2 & 255) * t);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, Math.floor(H * i / bands), W, Math.ceil(H / bands) + 1);
    }
  }

  function stars(ctx, W, H, rand, n = 60) {
    for (let i = 0; i < n; i++) {
      const x = Math.floor(rand() * W), y = Math.floor(rand() * H * 0.7);
      ctx.fillStyle = rand() > 0.8 ? '#d8d8dc' : '#8a8a96';
      const s = rand() > 0.9 ? 3 : 2;
      ctx.fillRect(x, y, s, s);
    }
  }

  /* ---------- LA PROFONDITÀ ----------
     metri = 0 (superficie) .. 45 (la fossa). Più si scende: più buio, più stretto,
     più vuoto — e l'unica cosa che si muove è il marine snow che sale.
     La imposta il motore scena per scena (Engine.depthFor). DESIGN § 10.8 */
  let depthM = 0;
  let snow = null;
  function setDepth(m) { depthM = Math.max(0, Math.min(45, m || 0)); }
  function getDepth() { return depthM; }
  // compatibilità col motore della serie (alcuni moduli chiamano ancora setEclipse)
  function setEclipse(p) { depthM = Math.max(0, Math.min(45, (p || 0) * 45)); }
  function getEclipse() { return depthM / 45; }

  /* Velo della profondità: viraggio blu-nero, vignetta che stringe, marine snow */
  function profondita(ctx, W, H, m) {
    if (m <= 0.5) return;
    const p = Math.min(1, m / 45);

    // viraggio: prima il rosso muore, poi il verde. A 40 m resta solo il blu e il buio
    ctx.fillStyle = `rgba(8,26,44,${0.10 + p * 0.42})`;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = `rgba(2,6,12,${p * 0.34})`;
    ctx.fillRect(0, 0, W, H);

    // marine snow: l'unica cosa che si muove nel buio
    if (p > 0.15) {
      if (!snow || snow.W !== W) {
        snow = { W, p: Array.from({ length: 70 }, () => ({ x: Math.random() * W, y: Math.random() * H, s: 0.3 + Math.random() * 0.9 })) };
      }
      const t = (typeof performance !== 'undefined' ? performance.now() : Date.now()) / 1000;
      ctx.fillStyle = `rgba(226,238,255,${0.10 + p * 0.35})`;
      for (const q of snow.p) {
        const y = (q.y - t * 12 * q.s) % H;
        ctx.fillRect(q.x | 0, (y < 0 ? y + H : y) | 0, 2, 2);
      }
    }

    // la vignetta che stringe: a 45 m il campo visivo è un buco
    const cx = W / 2, cy = H / 2;
    const r = Math.max(24, (W * 0.72) * (1 - p * 0.66));
    const g = ctx.createRadialGradient(cx, cy, r * 0.25, cx, cy, r);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, `rgba(0,3,8,${0.30 + p * 0.62})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // in superficie: caustiche che tremolano. In profondità: immobilità assoluta
    if (p < 0.3) {
      const t = (typeof performance !== 'undefined' ? performance.now() : Date.now()) / 400;
      ctx.fillStyle = `rgba(190,235,255,${0.06 * (1 - p * 3)})`;
      for (let x = 0; x < W; x += 9) {
        ctx.fillRect(x, (H * 0.12 + Math.sin(t + x * 0.09) * 7) | 0, 7, 2);
      }
    }
  }


  // Disco a pixel simmetrico (usato per luci tonde, sole dell'alba)
  function pixelDisc(ctx, cx, cy, r, px = 3) {
    const CX = Math.round(cx / px) * px, CY = Math.round(cy / px) * px;
    const R = Math.max(px, Math.round(r / px) * px);
    for (let dy = -R; dy < R; dy += px) {
      const yy = dy + px / 2;
      const hw = Math.sqrt(Math.max(0, R * R - yy * yy));
      const w = Math.max(px, Math.round(hw / px) * px);
      ctx.fillRect(CX - w, CY + dy, w * 2, px);
    }
  }

  function mix(a, b, t) {
    const ca = parseInt(a.slice(1), 16), cb = parseInt(b.slice(1), 16);
    const r = Math.round(((ca >> 16) & 255) * (1 - t) + ((cb >> 16) & 255) * t);
    const g = Math.round(((ca >> 8) & 255) * (1 - t) + ((cb >> 8) & 255) * t);
    const bl = Math.round((ca & 255) * (1 - t) + (cb & 255) * t);
    return `rgb(${r},${g},${bl})`;
  }

  // Compat con l'API storica: disco pieno (niente più eclissi lunare)
  function moon(ctx, x, y, r, color = '#e8e0f0') {
    ctx.fillStyle = color; pixelDisc(ctx, x, y, r);
  }

  /* ---------- helper di terreno ---------- */

  // Profilo di terreno irregolare: niente bande orizzontali nette
  function ground(ctx, W, H, topY, color, rand, blockSize = 12, jag = 8) {
    for (let x = 0; x < W; x += blockSize) {
      const off = Math.round((rand() - 0.5) * jag / blockSize) * blockSize;
      blocks(ctx, x, topY + off, blockSize, H - topY - off, color, blockSize, rand, 0.22);
    }
  }

  // Colline/skyline morbidi sul fondo (silhouette a gradini)
  function hills(ctx, W, baseY, height, color, rand, step = 24) {
    let h = height * (0.5 + rand() * 0.5);
    for (let x = 0; x < W; x += step) {
      h += (rand() - 0.5) * height * 0.5;
      h = Math.max(height * 0.25, Math.min(height, h));
      blocks(ctx, x, baseY - h, step, h + 4, color, 12, rand, 0.14);
    }
  }

  // ALBERO — la chioma poggia sul tronco
  function tree(ctx, x, groundY, size, leaf, trunk, rand) {
    const tw = Math.max(8, Math.round(size / 6) * 2);
    const topY = groundY - size;
    blocks(ctx, x - tw / 2, topY, tw, size, trunk, 6, rand);
    blocks(ctx, x - tw, groundY - 8, tw * 2, 8, trunk, 6, rand, 0.3);
    const lw = size * 1.15;
    const leafBottom = topY + size * 0.22;
    blocks(ctx, x - lw / 2, leafBottom - lw * 0.5, lw, lw * 0.5, leaf, 8, rand, 0.28);
    blocks(ctx, x - lw * 0.36, leafBottom - lw * 0.8, lw * 0.72, lw * 0.34, leaf, 8, rand, 0.28);
    blocks(ctx, x - lw * 0.2, leafBottom - lw * 0.98, lw * 0.4, lw * 0.24, leaf, 8, rand, 0.28);
  }

  function willow(ctx, x, groundY, size, leaf, trunk, rand) {
    const tw = Math.max(8, Math.round(size / 7) * 2);
    blocks(ctx, x - tw / 2, groundY - size, tw, size, trunk, 6, rand);
    const lw = size * 1.3;
    blocks(ctx, x - lw / 2, groundY - size - lw * 0.28, lw, lw * 0.42, leaf, 8, rand, 0.26);
    for (let i = -4; i <= 4; i++) {
      const bx = x + i * (lw / 10);
      const len = size * (0.5 - Math.abs(i) * 0.05) + rand() * 10;
      blocks(ctx, bx - 3, groundY - size + lw * 0.1, 6, len, leaf, 6, rand, 0.34);
    }
  }

  /* ---------- helper di costruzioni e luci ---------- */

  /* CASA. Le proporzioni di una cosa vera si cercano, non si stimano — e questa le
     aveva sbagliate tutte e due nel modo che fa più danno: la falda sporgeva di
     quattordici pixel per lato (il 60% su un muro di 46) e il tetto era alto
     cinquantasei pixel su una facciata di trentotto. Sullo schermo veniva un FUNGO:
     cappello grande il doppio del gambo. Sui tetti veri lo sporto della falda sta
     fra il 10 e il 15% della facciata per lato e l'altezza del tetto è circa un
     TERZO di quella del muro; una porta è larga 0,41 volte la sua altezza. E la
     sagoma diventa una casa solo quando accanto alla porta c'è una FINESTRA con la
     persiana verde e sul tetto un CAMINO: senza quelle due cose, anche con le
     proporzioni giuste, restano un muro e un triangolo. */
  function house(ctx, x, groundY, w, h, wall, roof, rand, windowLit = true) {
    const over = Math.max(2, Math.round(w * 0.12));      // sporto della falda per lato
    const rh = Math.max(7, Math.round(h / 3));           // altezza del tetto: un terzo
    blocks(ctx, x, groundY - h, w, h, wall, 8, rand, 0.12);
    // le due falde, a gradini: la più larga in basso (la gronda), il colmo in cima
    const steps = Math.max(3, Math.round(rh / 3));
    const rowH = rh / steps;
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const rw = (w + over * 2) * (1 - t * 0.80);
      blocks(ctx, x + (w - rw) / 2, groundY - h - (i + 1) * rowH, rw, rowH + 1, roof, 6, rand, 0.16);
    }
    ctx.fillStyle = 'rgba(60,40,30,.34)';                // l'ombra sotto la gronda
    ctx.fillRect(x - over, groundY - h, w + over * 2, 2);
    // il camino, sulla falda di destra
    const chW = Math.max(5, Math.round(w * 0.11));
    const chX = x + Math.round(w * 0.70);
    ctx.fillStyle = shade(wall, 0.86); ctx.fillRect(chX, groundY - h - rh - Math.round(rh * 0.5), chW, rh);
    ctx.fillStyle = shade(wall, 1.10); ctx.fillRect(chX - 1, groundY - h - rh - Math.round(rh * 0.5), chW + 2, 2);
    // la porta: alta più di metà facciata, larga 0,41 volte l'altezza
    const dh = Math.max(12, Math.round(h * 0.56)), dw = Math.max(6, Math.round(dh * 0.41));
    const dx = x + Math.round(w * 0.30) - Math.round(dw / 2);
    ctx.fillStyle = shade(wall, 0.62); ctx.fillRect(dx - 2, groundY - dh - 2, dw + 4, dh + 2);
    ctx.fillStyle = '#3a3a40'; ctx.fillRect(dx, groundY - dh, dw, dh);
    // la finestra accanto, con la persiana verde: due battenti e la spalletta
    const ws = Math.max(8, Math.round(h * 0.30));
    const wx = x + Math.round(w * 0.66) - Math.round(ws / 2), wy = groundY - dh - Math.round(ws * 0.5);
    ctx.fillStyle = shade(wall, 0.62); ctx.fillRect(wx - 2, wy - 2, ws + 4, ws + 4);
    ctx.fillStyle = windowLit ? '#e8d8a0' : '#2e3238'; ctx.fillRect(wx, wy, ws, ws);
    ctx.fillStyle = '#4a7a4e';
    ctx.fillRect(wx - 3, wy, 3, ws); ctx.fillRect(wx + ws, wy, 3, ws);
    ctx.fillStyle = '#3a6440'; ctx.fillRect(wx - 3, wy + Math.round(ws / 2), 3, 1);
    ctx.fillRect(wx + ws, wy + Math.round(ws / 2), 3, 1);
    if (windowLit) glow(ctx, wx + ws / 2, wy + ws / 2, ws * 0.5, ws * 0.5, '232,216,150');
  }

  // Torcia con staffa (compat API)
  function torch(ctx, x, y, bracket = true) {
    if (bracket) { ctx.fillStyle = '#3a3a45'; ctx.fillRect(x - 5, y + 4, 16, 4); ctx.fillRect(x - 5, y + 4, 4, 12); }
    ctx.fillStyle = '#5a5248'; ctx.fillRect(x, y, 6, 22);
    ctx.fillStyle = 'rgba(232,200,140,.14)'; ctx.fillRect(x - 14, y - 22, 34, 34);
    ctx.fillStyle = '#e8c88c'; ctx.fillRect(x - 3, y - 10, 12, 12);
    ctx.fillStyle = '#f5e0aa'; ctx.fillRect(x, y - 7, 6, 6);
  }

  // Cartello con righe di "scritta" (compat API)
  function sign(ctx, x, groundY, w = 84, h = 30, lines = 2) {
    ctx.fillStyle = '#4a4440'; ctx.fillRect(x - 4, groundY - 46, 8, 46);
    ctx.fillStyle = '#6e6660'; ctx.fillRect(x - w / 2, groundY - 76, w, h);
    ctx.fillStyle = '#5a544e'; ctx.fillRect(x - w / 2, groundY - 76, w, 3);
    ctx.fillStyle = '#2e2a28';
    for (let i = 0; i < lines; i++) {
      const lw = w * (0.5 + (i % 2) * 0.2);
      ctx.fillRect(x - lw / 2, groundY - 66 + i * 9, lw, 4);
    }
  }

  // Ellisse a pixel (come pixelDisc, ma con raggi indipendenti)
  function pixelEllipse(ctx, cx, cy, rx, ry, px = 4) {
    const CX = Math.round(cx / px) * px, CY = Math.round(cy / px) * px;
    const RY = Math.max(px, Math.round(ry / px) * px);
    for (let dy = -RY; dy < RY; dy += px) {
      const t = (dy + px / 2) / RY;
      const hw = rx * Math.sqrt(Math.max(0, 1 - t * t));
      const w = Math.max(px, Math.round(hw / px) * px);
      ctx.fillRect(CX - w, CY + dy, w * 2, px);
    }
  }

  // Alone luminoso morbido: dischi pixelati concentrici, MAI rettangoli
  // (i rettangoli annidati creavano aloni squadrati attorno a ogni luce)
  /* ATTENZIONE ALLE MISURE: w e h NON sono l'ingombro dell'alone, sono il suo NUCLEO.
     L'anello più esterno ha semiassi w*2 e h*2, quindi l'alone finito è larghezza 4w e
     altezza 4h. Passare `W * 0.40` qui dentro significa un alone più largo del canvas:
     è così che l'alone del paese, nel titolo, tingeva di ocra tutta l'isola e mezzo
     cielo. Regola: w ≈ un quarto di quanto si vuole vedere. */
  function glow(ctx, x, y, w, h, rgb) {
    for (let i = 4; i >= 1; i--) {
      ctx.fillStyle = `rgba(${rgb},${0.022 * i})`;
      pixelEllipse(ctx, x, y, w * (5 - i) / 2, h * (5 - i) / 2, 4);
    }
  }

  // Porta chiusa con stipite e maniglia; targhetta opzionale
  function door(ctx, x, floorY, w, h, leaf, frame, tag = null) {
    ctx.fillStyle = frame; ctx.fillRect(x - 4, floorY - h - 4, w + 8, h + 4);
    ctx.fillStyle = leaf; ctx.fillRect(x, floorY - h, w, h);
    ctx.fillStyle = shade(leaf, 0.72);
    ctx.fillRect(x + 6, floorY - h + 8, w - 12, h * 0.36);
    ctx.fillRect(x + 6, floorY - h * 0.5, w - 12, h * 0.36);
    ctx.fillStyle = '#8a8a90'; ctx.fillRect(x + w - 9, floorY - h * 0.52, 5, 5);
    if (tag) { ctx.fillStyle = tag; ctx.fillRect(x + w / 2 - 9, floorY - h - 12, 18, 7); }
  }

  // Sagoma umana grigia, seduta o in piedi, appoggiata al pavimento dato
  function sagoma(ctx, x, footY, hgt, color = '#3a3a40', seated = false) {
    const w = Math.round(hgt * 0.34);
    if (seated) {
      ctx.fillStyle = color;
      ctx.fillRect(x - w / 2, footY - hgt * 0.62, w, hgt * 0.42);          // busto
      ctx.fillRect(x - w / 2, footY - hgt * 0.22, w * 1.3, hgt * 0.10);    // gambe piegate
      ctx.fillRect(x - w * 0.32, footY - hgt * 0.86, w * 0.64, hgt * 0.26); // testa
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x - w / 2, footY - hgt * 0.72, w, hgt * 0.72);
      ctx.fillRect(x - w * 0.3, footY - hgt, w * 0.6, hgt * 0.3);
    }
  }

  function heroesRow(ctx, W, groundY, partySpriteKeys, scale = 4) {
    const n = partySpriteKeys.length;
    const totalW = n * 20 * scale;
    let x = Math.floor(W / 2 - totalW / 2);
    for (const key of partySpriteKeys) {
      const def = Sprites.registry[key];
      if (def) Sprites.drawSprite(ctx, def.map, def.palette, x, groundY - 16 * scale, scale);
      x += 20 * scale;
    }
  }

  /* ---------- helper marini e archeologici (Pandataria) ---------- */

  // Seme derivato dal NOME del luogo: ogni sfondo è sempre identico a sé stesso
  function seedOf(name) {
    let s = 7919;
    for (let i = 0; i < name.length; i++) s = (s * 31 + name.charCodeAt(i)) >>> 0;
    return s;
  }

  // come shade(), ma restituisce un ESADECIMALE: serve quando il colore schiarito
  // va passato a blocks()/shade(), che sanno leggere solo "#rrggbb"
  function shadeHex(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    const c = i => {
      const v = Math.max(0, Math.min(255, Math.round(((n >> i) & 255) * f)));
      return v.toString(16).padStart(2, '0');
    };
    return '#' + c(16) + c(8) + c(0);
  }

  // MARE a fasce orizzontali: dal colore di riva a quello del largo, con qualche
  // luccichio fermo. Nessuna onda disegnata: il mare di questo gioco è una lastra.
  function sea(ctx, W, y0, y1, near, far, rand, bands = 9, sparkle = 0.5) {
    const h = (y1 - y0) / bands;
    for (let i = 0; i < bands; i++) {
      const t = i / (bands - 1);
      ctx.fillStyle = mix(far, near, t);          // in alto il largo, in basso la riva
      ctx.fillRect(0, y0 + i * h, W, h + 1);
    }
    if (sparkle > 0) {
      for (let i = 0; i < 34 * sparkle; i++) {
        const yy = y0 + rand() * (y1 - y0);
        const t = (yy - y0) / Math.max(1, y1 - y0);
        ctx.fillStyle = `rgba(226,242,250,${0.06 + t * 0.14})`;
        ctx.fillRect(rand() * W | 0, yy | 0, 5 + rand() * 12 | 0, 2);
      }
    }
  }

  /* BARCA ORMEGGIATA, DI PROFILO. Le quattro barche del porto erano un
     parallelepipedo bianco sopra un parallelepipedo grigio con un'asta infilata in
     mezzo: senza prua, senza poppa e senza la curva del bordo leggevano come mattoni
     bianchi che galleggiano — e in un porto scavato nel tufo le barche sono la cosa
     viva dell'inquadratura. Quello che fa la barca è il PROFILO: la falchetta che
     sale verso prua e si impenna nell'ultimo quinto, la poppa più bassa e tagliata
     di netto (lo specchio), la carena che alla prua finisce prima perché il dritto è
     inclinato. Poi le tre fasce della fiancata — falchetta chiara, colore base,
     sotto la linea d'acqua scuro — e un pixel di luce sul filo della falchetta, dove
     prende il sole. `len` è la lunghezza fuori tutto, `dir` = +1 se la prua è a
     destra; l'albero si mette solo a qualcuna, sennò tornano tutte uguali. */
  function barchetta(ctx, cx, waterY, len, col, rand, dir = 1, albero = false) {
    const hh = Math.max(9, Math.round(len * 0.17));   // bordo libero a mezza barca
    const x0 = Math.round(cx - len / 2);
    const sheer = u => Math.pow(u, 2.4) * hh * 0.42 + Math.pow(Math.max(0, u - 0.78) / 0.22, 2.2) * hh * 0.62;
    const carena = u => Math.max(0, Math.pow(Math.max(0, u - 0.80) / 0.20, 1.5) * hh * 0.7)
                      + Math.max(0, Math.pow(Math.max(0, 0.06 - u) / 0.06, 1.5) * hh * 0.3);
    for (let i = 0; i < len; i++) {
      const u = dir > 0 ? i / (len - 1) : 1 - i / (len - 1);
      const x = x0 + i;
      const top = Math.round(waterY - hh - sheer(u));
      const base = Math.round(waterY + 4 - carena(u));
      if (base <= top) continue;
      ctx.fillStyle = shade(col, 0.99);                                  // la fiancata
      ctx.fillRect(x, top, 1, base - top);
      ctx.fillStyle = shade(col, 1.16);                                  // la falchetta chiara
      ctx.fillRect(x, top, 1, 3);
      ctx.fillStyle = 'rgba(255,255,246,.60)';                           // il filo che prende luce
      ctx.fillRect(x, top, 1, 1);
      const wl = Math.min(base - 1, waterY - 3);                         // sotto la linea d'acqua
      if (base > wl) { ctx.fillStyle = shade(col, 0.50); ctx.fillRect(x, wl, 1, base - wl); }
      ctx.fillStyle = 'rgba(40,30,20,.16)';                              // l'ombra dentro lo scafo
      ctx.fillRect(x, top + 3, 1, 2);
    }
    // la fascia di colore lungo la fiancata: ogni barca di questi porti ne ha una
    ctx.fillStyle = 'rgba(42,106,128,.85)';
    for (let i = 3; i < len - 3; i++) {
      const u = dir > 0 ? i / (len - 1) : 1 - i / (len - 1);
      ctx.fillRect(x0 + i, Math.round(waterY - hh - sheer(u)) + 6, 1, 3);
    }
    if (albero) {
      const mx = Math.round(cx + dir * len * 0.10);
      ctx.fillStyle = '#8a6a3a'; ctx.fillRect(mx, waterY - hh - Math.round(len * 0.62), 3, Math.round(len * 0.62));
      ctx.fillStyle = 'rgba(180,168,140,.55)';                           // un accenno di sartia
      for (let k = 0; k < 12; k++) {
        ctx.fillRect(mx - dir * k * Math.round(len * 0.024), waterY - hh - Math.round(len * 0.60) + k * Math.round(len * 0.046), 1, 2);
      }
    }
    ctx.fillStyle = 'rgba(16,34,38,.36)';                                // il riflesso corto
    ctx.fillRect(x0 + 4, waterY + 4, len - 8, 4);
  }

  /* GOMMONE DI QUATTRO METRI, DI PROFILO. Cercate, non stimate: su un battello
     pneumatico da quattro metri il tubolare ha 45 cm di diametro (un nono della
     lunghezza), i coni di prua si assottigliano e si alzano nell'ultimo quinto, e a
     poppa c'è uno specchio verticale con il fuoribordo attaccato fuori — un 15 cavalli
     è alto come un braccio, un metro e dieci dal piede della gamba alla calandra.
     Quindi `len` detta tutto: a 420 px un metro sono 105 px e nessuna misura si
     inventa. Il tubolare è GOMMA, non lamiera, ma la convenzione è la stessa: tre
     fasce di tono (in alto ci si riflette il cielo, in mezzo il colore, in basso
     l'acqua) più un pixel bianco sul colmo. È quello che fa sembrare tonda una cosa
     che è piatta. `dir` = +1 se la prua è a destra. */
  function gommone(ctx, cx, wl, len, rand, dir = 1) {
    const rad = Math.round(len * 0.056);                 // il raggio del tubolare
    const x0 = Math.round(cx - len / 2);
    const lift = u => Math.pow(Math.max(0, u - 0.44) / 0.56, 2.1) * len * 0.075;
    /* IL RASTREMO DEL CONO, seconda stesura. Prima il tubolare cominciava ad
       assottigliarsi al 74% della lunghezza e ci metteva tutto il quarto restante:
       la sagoma perdeva altezza mentre la prua si alzava, e quello che restava era
       il profilo di una CANOA. Su un battello pneumatico vero il tubolare è grosso
       uguale fin quasi in punta e il cono è corto: si stringe negli ultimi venti
       centesimi e ci arriva con un arco di cerchio, non con una rampa. Con
       `u < 0.80 ? 1 : sqrt(1-((u-0.80)/0.20)²)·0,66 + 0,34` al 90% della barca il
       tubolare è ancora al 91% del suo diametro — è quella grossezza tenuta fino in
       fondo che si legge come gomma gonfia — e il naso chiude a un terzo di raggio.
       Vale esattamente 1 all'inizio del cono, quindi sul colmo non c'è gradino. */
    const raggio = u => rad * (u < 0.80 ? 1
      : Math.sqrt(Math.max(0, 1 - Math.pow((u - 0.80) / 0.20, 2))) * 0.66 + 0.34);
    const asse = u => wl - rad * 0.46 - lift(u);
    const at = u => Math.round(x0 + (dir > 0 ? u : 1 - u) * (len - 1));
    // LO SPECCHIO DI POPPA, prima del tubolare perché ci sta DIETRO
    const sx = at(0), fw = Math.round(len * 0.085), fh = Math.round(len * 0.072);
    const stTop = Math.round(asse(0) - rad);
    ctx.fillStyle = '#4a4a44';
    ctx.fillRect(dir > 0 ? sx - 7 : sx, stTop + 3, 8, Math.round(wl - stTop));
    // IL TUBOLARE DI LÀ: spunta sopra quello di qua, e fra i due si vede il buio di
    // dentro. Senza di lui il gommone è una salsiccia; con lui ha due fianchi.
    for (let i = 0; i < len; i++) {
      const u = dir > 0 ? i / (len - 1) : 1 - i / (len - 1);
      if (u < 0.05 || u > 0.95) continue;
      const f = raggio(u) / rad;                       // tutto si assottiglia insieme
      const yy = Math.round(asse(u) - raggio(u) - rad * 0.64 * f);
      const hh2 = Math.max(3, Math.round(rad * 0.46 * f));
      ctx.fillStyle = '#7d838b'; ctx.fillRect(x0 + i, yy, 1, hh2);
      ctx.fillStyle = '#a3a9b0'; ctx.fillRect(x0 + i, yy, 1, 3);
      ctx.fillStyle = 'rgba(232,238,244,.70)'; ctx.fillRect(x0 + i, yy, 1, 1);
      ctx.fillStyle = '#23272e'; ctx.fillRect(x0 + i, yy + hh2, 1, Math.max(2, Math.round(rad * 0.20 * f)));
    }
    for (let i = 0; i < len; i++) {
      const u = dir > 0 ? i / (len - 1) : 1 - i / (len - 1);
      const rr = raggio(u), ax = asse(u);
      const top = Math.round(ax - rr), bot = Math.round(Math.min(wl + 3, ax + rr));
      if (bot <= top) continue;
      const h = bot - top;
      ctx.fillStyle = '#8b9199'; ctx.fillRect(x0 + i, top, 1, h);                       // il colore
      ctx.fillStyle = '#c4c9cd'; ctx.fillRect(x0 + i, top, 1, Math.max(2, h * 0.32));    // il cielo sopra
      ctx.fillStyle = '#4e545c'; ctx.fillRect(x0 + i, bot - Math.max(2, h * 0.28), 1, Math.max(2, h * 0.28));
      ctx.fillStyle = 'rgba(255,255,255,.78)'; ctx.fillRect(x0 + i, top, 1, 1);          // il colmo
      // il bordo di rinforzo, la striscia di gomma nera che gira tutto il tubolare
      ctx.fillStyle = 'rgba(26,32,40,.78)'; ctx.fillRect(x0 + i, Math.round(ax + rr * 0.26), 1, 3);
    }
    /* LE DUE COSE CHE DICONO «GOMMONE» E NON «BARCA GRIGIA». La prima sono le
       PARATIE: un tubolare è diviso in camere d'aria stagne, e ogni saldatura fa una
       riga verticale sulla gomma ogni quaranta centimetri circa. La seconda, che è
       quella che si riconosce da lontano, è la CIMA DI SICUREZZA: una corda che gira
       fuori dal tubolare passando per gli anelli e che fra un anello e l'altro fa la
       sua pancia. Una fila di festoncini appesi lungo il fianco non ce l'ha nessun'altra
       barca al mondo, e costa dieci righe di codice. */
    for (let k = 1; k <= 5; k++) {
      const u = 0.13 + k * 0.135, rr = raggio(u), ax = asse(u), sxx = at(u);
      ctx.fillStyle = 'rgba(70,78,86,.50)';
      ctx.fillRect(sxx, Math.round(ax - rr + 2), 1, Math.round(rr * 1.5));
      ctx.fillStyle = 'rgba(226,232,238,.26)';
      ctx.fillRect(sxx + 1, Math.round(ax - rr + 2), 1, Math.round(rr * 1.5));
    }
    for (let k = 0; k < 6; k++) {
      const ua = 0.10 + k * 0.135, ub = ua + 0.135;
      if (ub > 0.94) break;
      const xa = at(ua), xb = at(ub);
      const ya = Math.round(asse(ua) - raggio(ua) * 0.06), yb = Math.round(asse(ub) - raggio(ub) * 0.06);
      const passi = Math.abs(xb - xa);
      for (let s = 0; s <= passi; s++) {
        const t = s / Math.max(1, passi);
        const y = ya + (yb - ya) * t + Math.sin(t * Math.PI) * rad * 0.34;
        ctx.fillStyle = 'rgba(236,232,214,.86)';
        ctx.fillRect(Math.round(xa + (xb - xa) * t), Math.round(y), 1, 2);
      }
      ctx.fillStyle = '#5a6068';                                  // l'anello a cui è legata
      ctx.fillRect(xa - 1, ya - 1, 3, 4);
      if (k === 5) ctx.fillRect(xb - 1, yb - 1, 3, 4);
    }
    const mx = sx - dir * (fw + 4);
    ctx.fillStyle = '#3c4148'; ctx.fillRect(mx, stTop - fh, fw, fh);                     // la calandra
    ctx.fillStyle = '#4e545c'; ctx.fillRect(mx, stTop - fh, fw, Math.round(fh * 0.34));
    ctx.fillStyle = 'rgba(255,255,255,.30)'; ctx.fillRect(mx, stTop - fh, fw, 1);
    ctx.fillStyle = '#2a2e34'; ctx.fillRect(mx + Math.round(fw * 0.30), stTop, Math.round(fw * 0.34), Math.round(wl - stTop + 6));
    ctx.fillStyle = '#22262c';                                                            // la piastra anticavitazione
    ctx.fillRect(mx + Math.round(fw * 0.10), Math.round(wl - 2), Math.round(fw * 0.80), 3);
    ctx.fillStyle = '#5a6068';                                                            // la barra del timone
    ctx.fillRect(mx + (dir > 0 ? fw : 0), stTop - Math.round(fh * 0.72), Math.round(len * 0.10) * dir, 3);
    // LA PRUA: il golfare, e la cima che va alla boa
    const bx = at(1), bAsse = asse(1);
    ctx.fillStyle = '#33383e'; ctx.fillRect(bx - (dir > 0 ? 4 : 0), Math.round(bAsse - 3), 5, 6);
    // le due cose di Lilia a bordo: le pinne agganciate al tubolare e il sacco stagno
    const px1 = at(0.34), px2 = at(0.58);
    ctx.fillStyle = '#1e2a34';
    ctx.fillRect(px1 - 6, Math.round(asse(0.34) - rad - 14), 13, 15);
    ctx.fillRect(px1 + 8, Math.round(asse(0.34) - rad - 11), 12, 12);
    ctx.fillStyle = '#c8a83a'; pixelEllipse(ctx, px2, Math.round(asse(0.58) - rad - 9), 13, 10, 3);
    ctx.fillStyle = '#e0c052'; ctx.fillRect(px2 - 8, Math.round(asse(0.58) - rad - 17), 16, 3);
    // l'ombra del gommone sull'acqua, e il riflesso corto sotto la poppa
    ctx.fillStyle = 'rgba(14,40,54,.34)'; ctx.fillRect(x0 + 8, Math.round(wl + 2), len - 16, 5);
    ctx.fillStyle = 'rgba(200,226,236,.16)'; ctx.fillRect(x0 + 20, Math.round(wl + 7), len - 60, 3);
  }

  // MURETTO A SECCO: pietre di tufo incastrate senza malta, fughe scure.
  // È la texture di Ventotene: le parracine, il cimitero, la terrazza.
  function muretto(ctx, x, y, w, h, color, rand) {
    ctx.fillStyle = shade(color, 0.55);
    ctx.fillRect(x, y, w, h);
    let yy = y + 1;
    let row = 0;
    while (yy < y + h) {
      const sh = 7 + Math.floor(rand() * 5);
      let xx = x + (row % 2 ? 5 : 0);
      while (xx < x + w) {
        const sw = 12 + Math.floor(rand() * 16);
        const f = 0.86 + rand() * 0.28;
        ctx.fillStyle = shade(color, f);
        ctx.fillRect(xx, yy, Math.min(sw, x + w - xx), Math.min(sh - 1, y + h - yy));
        ctx.fillStyle = shade(color, f * 1.18);
        ctx.fillRect(xx, yy, Math.min(sw, x + w - xx), 1);
        xx += sw + 2;
      }
      yy += sh; row++;
    }
  }

  // ARCO / VOLTA A BOTTE: la banda di pietra che chiude una navata romana.
  // Disegnata per colonne verticali, così resta pixel e non serve un path.
  function arco(ctx, cx, baseY, rx, ry, thick, color, rand, step = 6) {
    for (let dx = -rx; dx <= rx; dx += step) {
      const t = dx / rx;
      const yy = baseY - ry * Math.sqrt(Math.max(0, 1 - t * t));
      const f = 0.80 + (1 - Math.abs(t)) * 0.34 + rand() * 0.10;
      ctx.fillStyle = shade(color, f);
      ctx.fillRect(cx + dx, yy, step, thick);
    }
  }

  /* OPUS RETICOLATUM: la rete di LOSANGHE di tufo. E' la firma di Villa Giulia, ed e' il
     motivo per cui una parete romana si riconosce da trenta metri.
     Prima questa funzione disegnava QUADRATI allineati agli assi, sfalsati di mezzo passo:
     cioe' un corso a giunti alterni, cioe' muratura di mattoni. Zero losanghe su zero. Il
     nome diceva reticolatum, il commento diceva «la rete di losanghe», e il disegno diceva
     muro di mattoni — e a un occhio che ha visto una volta l'opus reticolatum la differenza
     salta subito, perche' e' l'unica cosa che quella parete ha di caratteristico.
     I rombi si disegnano per RIGHE (a passo intero non lasciano buchi): per ogni riga la
     mezza larghezza del rombo e' px/2 meno la distanza dal centro del passo. */
  function reticolatum(ctx, x, y, w, h, color, rand, px = 7) {
    ctx.fillStyle = shade(color, 0.62);
    ctx.fillRect(x, y, w, h);
    const toni = [];
    for (let i = 0; i < 64; i++) toni.push(shade(color, 0.92 + rand() * 0.26));
    for (let yy = Math.round(y); yy < y + h; yy++) {
      const dy = ((yy - y) % px);
      const d = px / 2 - Math.abs(dy - px / 2);
      if (d < 1) continue;
      const fila = Math.floor((yy - y) / px);
      for (let xx = Math.round(x) + (fila % 2) * (px / 2); xx < x + w; xx += px) {
        const i0 = Math.max(x, xx - d), i1 = Math.min(x + w, xx + d);
        if (i1 - i0 < 1) continue;
        ctx.fillStyle = toni[(Math.floor(xx / px) + fila * 7) & 63];
        ctx.fillRect(Math.round(i0), yy, Math.round(i1 - i0), 1);
        ctx.fillStyle = 'rgba(240,232,208,.16)';                 // la calce nella fuga
        ctx.fillRect(Math.round(i0), yy, 1, 1);
      }
    }
  }

  // FASCIA DI COCCIOPESTO: il rosa dell'opus signinum, con la LINEA in cima
  // (il livello dell'acqua: nelle cisterne è la cosa che dice da quanto tempo)
  /* Il cocciopesto e' INTONACO: «liscio come una vasca da bagno, con l'unghia non lo
     scalfisci», dice il commento del painter. E la funzione lo disegnava con blocks(), cioe'
     un reticolo di blocchi da sei pixel con la riga chiara in cima a ognuno: sullo schermo
     una piastrellatura rosa, che e' il contrario di liscio. Un intonaco si fa con un fondo
     pieno e delle chiazze larghe senza spigoli. */
  function cocciopesto(ctx, x, y, w, h, rand, tint = '#c07a68') {
    ctx.fillStyle = shade(tint, 0.94);
    ctx.fillRect(x, y, w, h);
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = shade(tint, 0.88 + rand() * 0.22);
      pixelEllipse(ctx, x + rand() * w, y + rand() * h, 20 + rand() * 40, 4 + rand() * 4, 3);
    }
    for (let i = 0; i < 8; i++) {                              // qualche crepa verticale
      const cx4 = x + rand() * w, cy4 = y + rand() * h * 0.6;
      ctx.fillStyle = 'rgba(70,40,34,.24)';
      ctx.fillRect(cx4 | 0, cy4 | 0, 1, 6 + rand() * (h * 0.5));
    }
    for (let i = 0; i < 200; i++) {                            // la grana, a punti
      ctx.fillStyle = `rgba(255,236,226,${0.05 + rand() * 0.07})`;
      ctx.fillRect(x + rand() * w | 0, y + rand() * h | 0, 1, 1);
    }
    ctx.fillStyle = shade(tint, 1.28);
    ctx.fillRect(x, y, w, 2);                       // la linea netta, orizzontale, perfetta
    ctx.fillStyle = 'rgba(0,0,0,.18)';
    ctx.fillRect(x, y + 2, w, 2);
  }

  // CONO DI TORCIA: un cuneo di luce che si allarga e muore. Sott'acqua è tutto
  // quello che esiste. Composto di ellissi, mai un triangolo netto.
  function conoTorcia(ctx, x, y, dx, dy, len, spread, rgb = '255,210,127') {
    const n = 9;
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      const cx = x + dx * len * t, cy = y + dy * len * t;
      ctx.fillStyle = `rgba(${rgb},${0.11 * (1 - t * 0.86)})`;
      pixelEllipse(ctx, cx, cy, spread * t + 6, (spread * t + 6) * 0.72, 4);
    }
    ctx.fillStyle = `rgba(${rgb},.55)`;
    ctx.fillRect(x - 3, y - 3, 7, 7);
  }

  // FICO D'INDIA: pale ovali sovrapposte. Cresce su ogni scoglio di queste isole.
  function fichidindia(ctx, x, baseY, s, color, rand) {
    for (const [ox, oy, sc] of [[0, 0, 1], [-s * 0.5, -s * 0.35, 0.72], [s * 0.5, -s * 0.28, 0.66], [0, -s * 0.75, 0.6]]) {
      ctx.fillStyle = shade(color, 0.86 + rand() * 0.3);
      pixelEllipse(ctx, x + ox, baseY - s * 0.5 + oy, s * 0.24 * sc, s * 0.44 * sc, 3);
    }
  }

  // STERPAGLIE: ciuffi secchi. Il colore dell'agosto che ha vinto.
  function sterpaglie(ctx, x, baseY, w, color, rand, n = 7) {
    ctx.fillStyle = color;
    for (let i = 0; i < n; i++) {
      const sx = x + rand() * w, hh = 4 + rand() * 9;
      ctx.fillRect(sx | 0, baseY - hh, 2, hh);
      ctx.fillRect((sx - 2) | 0, baseY - hh * 0.6, 5, 2);
    }
  }

  // La sagoma nera di SANTO STEFANO all'orizzonte: una gobba con l'anello sopra.
  // Compare in mezza dozzina di sfondi: è la cosa che aspetta, sempre a destra.
  function santoStefanoLontano(ctx, x, baseY, w, h, rock, ring) {
    const px = 4;
    for (let dx = -w / 2; dx < w / 2; dx += px) {
      const t = dx / (w / 2);
      const hh = h * Math.pow(Math.max(0, 1 - t * t), 0.62);
      ctx.fillStyle = rock;
      ctx.fillRect(x + dx, baseY - hh, px, hh + 1);
    }
    /* L'ANELLO DI PIETRA in cima: il panopticon. Era un rettangolo pieno con una riga
       chiara sopra, e da lontano leggeva come una lastra grigia appoggiata sul monte.
       Ma è la forma che dà il nome all'orrore di questo gioco, quindi va riconosciuta:
       ferro di cavallo, più alto al centro e più basso alle ali (la curva che si
       allontana), cornicione in cima, e le fessure verticali delle celle — nere,
       perché di notte nessuna di quelle finestre è accesa. */
    const rw = w * 0.40, rh = Math.max(4, h * 0.24), ry = baseY - h * 0.94;
    for (let dx = -rw / 2; dx < rw / 2; dx += 2) {
      const t = Math.abs(dx / (rw / 2));
      const hh = rh * (1 - t * t * 0.42);                   // le ali scendono: è un ferro di cavallo
      ctx.fillStyle = t > 0.62 ? shade(ring, 0.80) : ring;  // e si spengono girando via
      ctx.fillRect(x + dx, ry + (rh - hh), 2, hh + 1);
      ctx.fillStyle = shade(ring, t > 0.62 ? 0.94 : 1.20);  // il cornicione
      ctx.fillRect(x + dx, ry + (rh - hh), 2, 1);
    }
    for (let k = -3; k <= 3; k++) {                          // le fessure delle celle
      const fx = x + k * (rw / 8), t = Math.abs(k / 3.2);
      ctx.fillStyle = shade(ring, 0.42);
      ctx.fillRect(fx, ry + (rh - rh * (1 - t * t * 0.42)) + 2, 1, Math.max(1, rh * 0.42));
    }
  }

  /* ------------- PITTORI DI LOCATION -------------
     Venti luoghi di Ventotene e Santo Stefano, più il titolo. Il canvas è largo
     (960×360): si compone in orizzontale — orizzonti, filari, il ferro di cavallo —
     e mai a pila. Ogni luogo ha UNA cosa fredda dentro, anche quello bello. */

  const painters = {

    titolo(ctx, W, H) {
      /* Ventotene di notte, vista dal mare da nord-est. Riscritto il 24 agosto 2026
         dopo che il committente ha indicato la cosa giusta: «quella luce tipo lampione
         che sembra sospesa in aria». Era il campanile di Santa Candida — una barra
         scura larga otto pixel con un puntino giallo in cima e un alone, cioè
         esattamente la forma di un lampione. Adesso il campanile è un EDIFICIO: base
         quadrata appoggiata sui tetti del paese, cella campanaria con l'arco, tetto
         piramidale, e il lato rivolto alla luna che prende luce. Il paese non è più
         una manciata di puntini sparsi ma un grappolo di case cubiche sul ciglio, con
         le finestre accese: da lontano si legge come un paese, che è quello che è.
         E il chiarore sotto il pelo dell'acqua non è più un'ellisse a bordo netto —
         sembrava un uovo — ma una colonna di trattini irregolari che sale dal fondo. */
      const r = rng(seedOf('titolo'));
      skyGradient(ctx, W, H, '#04080f', '#16243c', 12);
      stars(ctx, W, H * 0.86, r, 80);
      const horiz = H * 0.60;
      // la luna bassa a sinistra: è lei che decide da che lato le cose prendono luce
      glow(ctx, W * 0.15, H * 0.16, H * 0.075, H * 0.068, '186,204,232');
      moon(ctx, W * 0.15, H * 0.16, H * 0.048, '#dde4f0');

      /* L'ISOLA: un tavolato di tufo, basso e lungo, col ciglio tagliato a picco sul
         mare. Ventotene è piatta: il profilo è una linea, non una gobba. */
      const ix = W * 0.42, iw = W * 0.80, ih = H * 0.17;
      const quotaAl = (dx) => {
        const t = dx / (iw / 2);
        const prof = Math.pow(Math.max(0, 1 - t * t), 0.30);   // spalle ripide, cima piatta
        return ih * prof * (0.80 + Math.sin(dx * 0.031) * 0.06 + Math.sin(dx * 0.011) * 0.05);
      };
      for (let dx = -iw / 2; dx < iw / 2; dx += 3) {
        const hh = quotaAl(dx);
        ctx.fillStyle = '#0a1119';
        ctx.fillRect(ix + dx, horiz - hh, 3, hh + 2);
        // il ciglio che prende la luna: una riga sola, e solo sul versante di sinistra
        if (dx < iw * 0.10) {
          const t = Math.abs(dx / (iw / 2));
          ctx.fillStyle = `rgba(150,168,198,${0.06 + (1 - t) * 0.13})`;
          ctx.fillRect(ix + dx, horiz - hh, 3, 2);
        }
      }
      /* La macchia sul tavolato: prima di ridurre l'alone del paese, questa parete era
         tinta d'ocra dalla luce e sembrava texturata. Togliendo l'ocra restava un
         rettangolo nero morto. Quindi la texture ci va per davvero: cespugli di
         fico degli ottentotti a chiazze, appena più chiari del tufo, solo dove il
         cielo li stacca. Niente sotto il ciglio: là il buio è giusto che sia pieno. */
      for (let i = 0; i < 90; i++) {
        const dx = (r() - 0.5) * iw * 0.94;
        const hh = quotaAl(dx);
        if (hh < ih * 0.30) continue;
        const y = horiz - hh + r() * Math.min(9, hh * 0.35);
        ctx.fillStyle = `rgba(84,102,86,${0.05 + r() * 0.07})`;
        ctx.fillRect((ix + dx) | 0, y | 0, 2 + (r() * 4 | 0), 1);
      }

      /* IL PAESE: case cubiche appoggiate sul ciglio, non puntini sparsi. Ognuna ha il
         suo tetto piatto e una o due finestre accese. È il grappolo attorno a Santa
         Candida, cioè la parte alta dell'isola. */
      const paeseDa = -iw * 0.30, paeseA = iw * 0.06;
      glow(ctx, ix + (paeseDa + paeseA) / 2, horiz - ih * 0.88, iw * 0.09, ih * 0.14, '224,178,90');
      for (let dx = paeseDa; dx < paeseA; dx += 7) {
        const suolo = horiz - quotaAl(dx);
        const hw = 5 + (r() * 4 | 0), hh2 = 4 + (r() * 5 | 0);
        const hx = ix + dx + (r() * 3 | 0), hy = suolo - hh2 + 1;
        /* Le pareti erano #101823 su un'isola #0a1119: due neri a un pixel di
           distanza. Finché l'alone sbagliato del paese schiariva tutto si vedevano;
           ridotto l'alone, restavano solo le finestre gialle sul nero — di nuovo una
           fila di lucine sospese, cioè l'errore di partenza moltiplicato per venti.
           Un paese di notte non si vede per le finestre: si vede perché i muri
           bianchi tengono un po' di luna. */
        ctx.fillStyle = '#1c2532';
        ctx.fillRect(hx, hy, hw, hh2 + 2);
        ctx.fillStyle = 'rgba(168,186,214,.20)';            // il tetto piatto che prende la luna
        ctx.fillRect(hx, hy, hw, 1);
        ctx.fillStyle = 'rgba(168,186,214,.13)';            // lo spigolo rivolto a lei
        ctx.fillRect(hx, hy, 1, hh2 + 2);
        ctx.fillStyle = 'rgba(4,8,15,.45)';                 // e il lato in ombra
        ctx.fillRect(hx + hw - 1, hy, 1, hh2 + 2);
        if (r() > 0.30) {                                   // la finestra accesa
          const fx = hx + 1 + (r() * Math.max(1, hw - 3) | 0);
          ctx.fillStyle = r() > 0.72 ? '#fff0c0' : '#e8b860';
          ctx.fillRect(fx, hy + 1 + (r() * Math.max(1, hh2 - 2) | 0), 2, 2);
        }
      }

      /* IL CAMPANILE DI SANTA CANDIDA. Secondo giro di correzioni, 23 agosto 2026,
         guardandolo su Pages a due volte e mezzo: era ancora sbagliato. Alto 48 px
         contro case di 6 — otto volte un tetto — e con la lampada appiccicata al
         bordo destro, il mezzo alone per tre quarti fuori dalla muratura. Da lontano:
         un faro, cioè di nuovo una luce sospesa accanto a un palo.
         Adesso è BASSO e LARGO (27×12: due volte e mezzo una casa, come un campanile
         vero visto da tre miglia) e la luce sta DENTRO l'arco della cella, che è
         l'unica apertura dell'isola illuminata da dentro. Una finestra accesa in un
         muro non può sembrare sospesa: è il muro che la tiene. */
      const bcx = Math.round(ix - iw * 0.14);
      const bBase = horiz - quotaAl(-iw * 0.14) + 3;         // dentro i tetti, non sopra
      const bW = 12, bH = Math.round(ih * 0.60);
      const bTop = bBase - bH;
      ctx.fillStyle = '#0e1620'; ctx.fillRect(bcx, bTop, bW, bH);
      ctx.fillStyle = 'rgba(158,176,206,.18)'; ctx.fillRect(bcx, bTop, 2, bH);          // lato luna
      ctx.fillStyle = 'rgba(4,8,15,.55)'; ctx.fillRect(bcx + bW - 2, bTop, 2, bH);      // lato ombra
      /* LA CELLA CAMPANARIA: cornice scura, interno caldo, arco in cima. La campana
         è la barretta nera in mezzo alla luce — si vede perché è controluce. */
      const cellaY = bTop + 4, cellaX = bcx + 4, cellaW = 5, cellaH = 6;
      ctx.fillStyle = '#04080e';
      ctx.fillRect(cellaX - 1, cellaY - 2, cellaW + 2, cellaH + 3);
      ctx.fillStyle = '#c8a054'; ctx.fillRect(cellaX, cellaY, cellaW, cellaH);
      ctx.fillStyle = '#e8c47c'; ctx.fillRect(cellaX + 1, cellaY - 1, cellaW - 2, 2);   // l'arco
      ctx.fillStyle = '#0a0f16'; ctx.fillRect(cellaX + 2, cellaY + 1, 1, 3);            // la campana
      glow(ctx, cellaX + cellaW / 2, cellaY + 2, 5, 4, '240,208,120');
      // cornicione: sporge di due pixel per lato, ed è la riga che prende la luna
      ctx.fillStyle = '#16202c'; ctx.fillRect(bcx - 2, bTop - 2, bW + 4, 2);
      ctx.fillStyle = 'rgba(158,176,206,.22)'; ctx.fillRect(bcx - 2, bTop - 2, bW + 4, 1);
      // tetto piramidale basso: quattro gradini, il versante di luna più chiaro
      for (let k = 0; k < 4; k++) {
        const rw = bW - 1 - k * 2, rx = bcx + (bW - rw) / 2;
        ctx.fillStyle = '#0c141d'; ctx.fillRect(rx, bTop - 3 - k, rw, 1);
        ctx.fillStyle = 'rgba(158,176,206,.13)'; ctx.fillRect(rx, bTop - 3 - k, Math.max(1, rw / 2 | 0), 1);
      }
      ctx.fillStyle = 'rgba(158,176,206,.16)'; ctx.fillRect(bcx + bW / 2 - 1 | 0, bTop - 8, 1, 2);  // la croce

      // SANTO STEFANO, a destra: nessuna luce, e l'anello del panopticon appena leggibile
      santoStefanoLontano(ctx, W * 0.88, horiz, W * 0.17, H * 0.13, '#070c12', '#111a23');

      // IL MARE: una lastra nera lucida che si muove appena
      sea(ctx, W, horiz, H, '#04080e', '#0a121c', r, 10, 0.30);
      // la colonna della luna, che si allarga venendo avanti
      for (let y = horiz + 2; y < H; y += 5) {
        const t = (y - horiz) / (H - horiz);
        const spread = 14 + t * 120;
        for (let k = 0; k < 3; k++) {
          const ww = 5 + r() * spread * 0.42;
          const off = (r() - 0.5) * (spread - ww);
          ctx.fillStyle = `rgba(178,198,228,${0.19 - t * 0.10})`;
          ctx.fillRect(W * 0.15 + off, y, ww, 3);
        }
      }
      // il riflesso giallo del paese: trattini corti sotto le case, non una fascia
      for (let i = 0; i < 46; i++) {
        const rx2 = ix - iw * 0.32 + r() * iw * 0.42;
        const ry2 = horiz + 3 + r() * H * 0.10;
        ctx.fillStyle = `rgba(206,156,72,${0.20 - (ry2 - horiz) / (H * 0.10) * 0.12})`;
        ctx.fillRect(rx2 | 0, ry2 | 0, 4 + r() * 12 | 0, 2);
      }
      /* LA COSA: in mezzo al braccio di mare fra le due isole, SOTTO il pelo
         dell'acqua, un chiarore che sale. Prima era un'ellisse a bordo netto e
         sembrava un uovo; poi è diventata una colonna di trattini azzurri che si
         allargava scendendo — cioè la stessa forma e lo stesso colore della colonna
         della luna, mezzo canvas più a destra. Sullo schermo si leggevano due lune.
         Quattro correzioni: il colore vira al verde marcio (la luna è argento, questa
         no); la colonna NON si allarga, stringe (il sentiero lunare si allarga perché
         viene verso di te, una luce ferma sul fondo no); il punto più chiaro non è più
         al pelo dell'acqua ma a metà profondità, perché una cosa illuminata da sotto
         non ha il massimo in superficie; e le righe del respiro del mare le passano
         SOPRA — è quel passare sopra che la mette sott'acqua. */
      const bx = W * 0.68;
      for (let y = horiz + 3; y < horiz + H * 0.30; y += 3) {
        const t = (y - horiz) / (H * 0.30);
        const larg = 26 - t * 9;                                    // stretta, e stringe
        const fuoco = Math.max(0, 1 - Math.abs(t - 0.42) / 0.52);   // il massimo a metà
        /* Terza taratura: era ancora la cosa più chiara della metà bassa del quadro e
           sembrava un graffio sulla pellicola. Meno trattini, più trasparenza, e il
           verde più saturo — a queste opacità un verde smorto vira al grigio, e
           grigio in mezzo al mare vuol dire luna, non vuol dire "cosa". */
        const n = 1 + (r() * 2 | 0);
        for (let k = 0; k < n; k++) {
          const ww = 2 + r() * larg * 0.45;
          const off = (r() - 0.5) * (larg - ww);
          ctx.fillStyle = `rgba(96,196,140,${(0.012 + fuoco * 0.040) * (0.55 + r() * 0.7)})`;
          ctx.fillRect((bx + off) | 0, y, ww | 0, 2);
        }
      }

      /* IL RESPIRO DEL MARE nella parte bassa: righe lunghissime e quasi invisibili.
         Prima quel terzo era nero piatto e sembrava una fascia morta. */
      for (let y = horiz + H * 0.10; y < H - 4; y += 7) {
        const t = (y - horiz) / (H - horiz);
        ctx.fillStyle = `rgba(96,124,160,${0.030 - t * 0.014})`;
        const lw = W * (0.30 + r() * 0.55);
        ctx.fillRect((r() * (W - lw)) | 0, y | 0, lw | 0, 1);
      }

      // il velo di nero sul bordo: l'inquadratura si chiude da sola
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = `rgba(1,4,9,${0.05 + i * 0.04})`;
        ctx.fillRect(0, 0, W, 6 + i * 5);
        ctx.fillRect(0, H - 6 - i * 5, W, 6 + i * 5);
        ctx.fillRect(0, 0, 8 + i * 6, H);
        ctx.fillRect(W - 8 - i * 6, 0, 8 + i * 6, H);
      }
    },

    porto(ctx, W, H) {
      // PORTO ROMANO, ore 17:20. Non costruito: SCAVATO. La parete di tufo giallo
      // tagliata a picco, i segni degli scalpelli, e gli alloggiamenti quadrati
      // per le travi a un metro dall'acqua. Alcuni, i più grandi, erano per le catene.
      const r = rng(seedOf('porto'));
      /* Riscritto dopo la verifica visiva su Pages (23 ago 2026): la parete di tufo
         era un lastrone piatto che occupava mezza inquadratura, le case sul ciglio
         restavano sepolte e i segni degli scalpelli non si vedevano. Adesso il cielo
         corre in alto su tutta la larghezza, il ciglio si legge contro il cielo, e la
         parete ha le facce verticali della cava e due nicchie scavate. */
      skyGradient(ctx, W, H * 0.30, '#7ec0dc', '#cfe4ea', 8);
      const waterY = H * 0.56, quayY = H * 0.80, cigli = H * 0.20;
      // il mare aperto che si vede fuori dalla cava, a destra
      sea(ctx, W, H * 0.26, waterY, '#1d6a86', '#2a7e9a', r, 6, 0.6);
      // LA PARETE DI TUFO tagliata a picco: da sinistra fino a tre quarti
      const cliffW = W * 0.70;
      blocks(ctx, 0, cigli, cliffW, waterY - cigli, '#d0a860', 12, r, 0.12);
      // LE FACCE DELLA CAVA: bande verticali di tono diverso, larghe come un uomo
      // e sfalsate, perché il tufo non è stato tagliato tutto nello stesso giorno
      let fx = 0;
      while (fx < cliffW) {
        const fw = 34 + (r() * 46 | 0);
        const t = 0.90 + r() * 0.20;
        ctx.fillStyle = shade('#d0a860', t);
        ctx.fillRect(fx, cigli + (r() * 14 | 0), Math.min(fw, cliffW - fx), waterY - cigli);
        // lo spigolo fra due facce: una riga d'ombra e una di luce
        ctx.fillStyle = 'rgba(96,68,30,.30)'; ctx.fillRect(fx, cigli, 2, waterY - cigli);
        ctx.fillStyle = 'rgba(255,240,198,.14)'; ctx.fillRect(fx + 2, cigli, 1, waterY - cigli);
        fx += fw;
      }
      /* I SEGNI DEGLI SCALPELLI, che sono la firma di questo posto e che il testo della
         scena nomina per primi: «righe verticali regolari su tutta la parete. Ogni riga e
         un uomo con un martello, duemila anni fa». Nel quadro, prima, le righe che si
         vedevano erano ORIZZONTALI — il reticolo di blocks() a dodici pixel — e la parete
         leggeva come muratura di conci. Il testo diceva una cosa e il quadro un'altra.
         Cento colpi verticali, corti, di lunghezza diversa e mai allineati: la regolarita
         sta nella direzione, non nella griglia. */
      for (let k = 0; k < 110; k++) {
        const x = (r() * cliffW) | 0;
        const da = cigli + 4 + (r() * (waterY - cigli - 40) | 0);
        const lung = 18 + (r() * 70 | 0);
        ctx.fillStyle = `rgba(104,72,28,${0.09 + r() * 0.12})`;
        ctx.fillRect(x, da, 2, Math.min(lung, waterY - da - 2));
        ctx.fillStyle = 'rgba(255,244,206,.09)';
        ctx.fillRect(x + 2, da, 1, Math.min(lung, waterY - da - 2));
      }
      // IL CIGLIO, che adesso si vede contro il cielo: una riga di tufo chiaro,
      // le sterpaglie secche e due case bianche sul bordo, come stanno davvero
      ctx.fillStyle = '#e0bc78'; ctx.fillRect(0, cigli - 5, cliffW, 7);
      ctx.fillStyle = 'rgba(255,246,214,.30)'; ctx.fillRect(0, cigli - 5, cliffW, 2);
      sterpaglie(ctx, 0, cigli - 4, cliffW, '#8a8a52', r, 26);
      // le case sul ciglio: adesso il muro è più alto del tetto e la sagoma si legge
      house(ctx, W * 0.07, cigli - 6, 76, 42, '#f0e2bc', '#c07a58', r, false);
      house(ctx, W * 0.30, cigli - 6, 62, 34, '#e8d4ae', '#b06a50', r, false);
      house(ctx, W * 0.51, cigli - 6, 54, 30, '#e0cca8', '#a86048', r, false);
      /* LA SCALETTA A ZIG-ZAG E IL CARTELLO, che il testo della prima scena sull'isola nomina
         per nome — «una scaletta di pietra sale a zig-zag, e in cima si vede un cartello di
         legno dipinto a mano: LE PARRACINE — B&B — 200 m, con una freccia storta» — e che nel
         quadro non c'erano. E' la lezione 62, e il giocatore la nota per primo perche' ha
         appena letto la frase. Sei rampanti sulla parete di tufo, con le pedate che si
         accorciano SALENDO (vanno via dall'occhio) e il fianco in ombra: la stessa ricetta dei
         gradini del B&B. */
      {
        /* TRE RAMPANTI COLLEGATI, e non sei. Al primo colpo ne avevo messi sei con la
           larghezza calcolata a mano: i rampanti non si attaccavano fra loro e uno passava
           sopra una nicchia. Il ciglio sta a y=72 e l'acqua a y=202: centotrenta pixel per
           tre rampanti sono quarantatre' a testa, e a quarantatre' pixel un rampante di
           cinque gradini si legge. La scaletta sta a SINISTRA delle due nicchie (che stanno a
           0.16 e 0.46 della parete), cioe' nei primi novanta pixel. */
        const xA = 10, xB = 86, alt = (waterY - 14 - cigli) / 3;
        for (let k = 0; k < 3; k++) {
          const yBasso = waterY - 14 - k * alt, verso = k % 2 === 0;   // su a destra, poi a sinistra
          for (let g = 0; g < 6; g++) {
            const t = g / 5;
            const gy = Math.round(yBasso - t * alt);
            const gx = Math.round(verso ? xA + t * (xB - xA - 26) : xB - 26 - t * (xB - xA - 26));
            const sc2 = 1 - k * 0.06 - t * 0.03;
            ctx.fillStyle = shade(g % 2 ? '#c4ac7c' : '#d8c294', sc2);
            ctx.fillRect(gx, gy, 28, 5);
            ctx.fillStyle = 'rgba(38,28,14,.38)'; ctx.fillRect(gx, gy + 5, 28, 3);
            ctx.fillStyle = 'rgba(255,240,200,.22)'; ctx.fillRect(gx, gy, 28, 1);
          }
          // il pianerottolo dove la rampa gira
          const py2 = Math.round(yBasso - alt);
          ctx.fillStyle = shade('#cdb689', 1 - k * 0.06);
          ctx.fillRect(verso ? xB - 28 : xA, py2 - 3, 28, 6);
          ctx.fillStyle = 'rgba(38,28,14,.38)'; ctx.fillRect(verso ? xB - 28 : xA, py2 + 3, 28, 3);
        }
        ctx.fillStyle = 'rgba(30,22,12,.26)'; ctx.fillRect(xA - 3, cigli, 3, waterY - cigli - 10);
        /* IL CARTELLO in cima, sul ciglio: legno dipinto a mano, tre righe di lettere a
           tratti e la freccia storta. Il testo lo nomina per nome — LE PARRACINE — B&B —
           200 m — e nel quadro non c'era. */
        const cax = xA + 6, cay = Math.round(cigli - 42);
        ctx.fillStyle = '#6a5230'; ctx.fillRect(cax + 42, cay + 34, 6, 20);
        ctx.fillStyle = '#2a2014'; ctx.fillRect(cax - 2, cay - 2, 96, 38);
        ctx.fillStyle = '#b08a52'; ctx.fillRect(cax, cay, 92, 34);
        ctx.fillStyle = 'rgba(255,240,206,.22)'; ctx.fillRect(cax, cay, 92, 3);
        ctx.fillStyle = '#f4ecd8';
        ctx.fillRect(cax + 7, cay + 6, 54, 4);
        ctx.fillRect(cax + 7, cay + 14, 30, 4);
        ctx.fillRect(cax + 7, cay + 22, 42, 4);
        for (let q = 0; q < 10; q++) ctx.fillRect(cax + 66 + q, cay + 24 - q * 1.4, 3, 3);
        ctx.fillRect(cax + 72, cay + 9, 11, 3); ctx.fillRect(cax + 80, cay + 9, 3, 11);
      }
      // LE NICCHIE scavate nella parete: due archi, uno pieno d'ombra
      for (const nf of [0.16, 0.46]) {
        const nx = cliffW * nf, ny = waterY - 96, nw = 52, nh = 74;
        ctx.fillStyle = 'rgba(84,58,24,.42)'; ctx.fillRect(nx - 3, ny - 3, nw + 6, nh + 3);
        ctx.fillStyle = '#8a6a34'; ctx.fillRect(nx, ny, nw, nh);
        pixelEllipse(ctx, nx + nw / 2, ny, nw / 2, 16, 4);
        ctx.fillStyle = '#4a3418'; ctx.fillRect(nx + 6, ny + 8, nw - 12, nh - 8);
        pixelEllipse(ctx, nx + nw / 2, ny + 8, nw / 2 - 6, 12, 4);
        ctx.fillStyle = '#120c06'; ctx.fillRect(nx + 12, ny + 20, nw - 24, nh - 20);
      }
      // i SEGNI DEGLI SCALPELLI: righe parallele a mezzo metro l'una dall'altra,
      // e adesso si vedono davvero
      for (let y = cigli + 10; y < waterY - 6; y += 12) {
        ctx.fillStyle = 'rgba(104,72,28,.44)';
        ctx.fillRect(0, y, cliffW, 2);
        ctx.fillStyle = 'rgba(255,240,198,.22)';
        ctx.fillRect(0, y + 2, cliffW, 1);
      }
      // ombra alla base della parete, dove il tufo entra in acqua
      ctx.fillStyle = 'rgba(70,48,20,.34)';
      ctx.fillRect(0, waterY - 26, cliffW, 26);
      // GLI ALLOGGIAMENTI PER LE TRAVI: buchi quadrati, regolari, ordinatissimi
      for (let i = 0; i < 12; i++) {
        const hx = 22 + i * (cliffW - 44) / 11, hy = waterY - 40;
        ctx.fillStyle = '#3a2a16'; ctx.fillRect(hx, hy, 15, 14);
        ctx.fillStyle = 'rgba(255,240,200,.16)'; ctx.fillRect(hx, hy, 15, 2);
      }
      // ...tranne UNO. Il quinto è il doppio, e dentro il buio va più a fondo
      // di quanto sia spesso il muro.
      const bx = 22 + 4 * (cliffW - 44) / 11;
      ctx.fillStyle = '#2a1e10'; ctx.fillRect(bx - 6, waterY - 48, 30, 24);
      ctx.fillStyle = '#05070a'; ctx.fillRect(bx - 2, waterY - 44, 22, 17);
      /* LA SPALLA DI TUFO a destra, che chiude la cava. Era un rettangolo pieno con lo
         spigolo di sinistra a piombo e il piede su una riga: nel PNG leggeva come una
         lastra giallo canarino appoggiata sul mare, non come la roccia che chiude il
         porto. Le tre cose che la rimettono in piedi sono le stesse della parete
         grande: il bordo ROTTO (una falesia non ha lo spigolo di un mobile), le facce
         verticali della cava, e il piede in ombra dove il tufo entra in acqua. */
      {
        const spx = Math.round(W * 0.885), spTop = Math.round(H * 0.16);
        // il bordo a GRADINI, non a onda: una prima stesura con due seni sovrapposti
        // veniva una S morbida che sembrava un drappo di stoffa appeso. Il tufo si
        // rompe per scaglie, quindi il profilo salta di sette pixel ogni quattordici.
        const prof = [];
        let cur = 0;
        for (let y = spTop - 6; y < waterY; y++) {
          if ((y - spTop) % 14 === 0) cur = Math.round((r() - 0.5) * 13);
          prof[y] = spx + cur;
        }
        for (let y = spTop; y < waterY; y++) {
          const bs = prof[y];
          // il tono scende SCENDENDO, di seguito. Prima variava con un resto su y
          // (`(y*7)%11`), che è una riga chiara ogni undici pixel: righe orizzontali
          // regolari su una colonna stretta = tavole, di nuovo.
          ctx.fillStyle = shade('#c8a058', 1.03 - 0.20 * (y - spTop) / (waterY - spTop));
          ctx.fillRect(bs, y, W - bs, 1);
          // un pixel di luce sul filo e l'ombra subito dentro. Con tre pixel di luce
          // ogni gradino aveva la sua testa chiara e la spalla leggeva come una pila
          // di TAVOLE di legno: su una colonna larga cento pixel la regolarità si
          // vede tutta, mentre sulla parete grande la stessa mano fa strati.
          ctx.fillStyle = 'rgba(255,240,198,.24)'; ctx.fillRect(bs, y, 1, 1);
          ctx.fillStyle = 'rgba(96,68,30,.26)'; ctx.fillRect(bs + 1, y, 2, 1);
        }
        /* Terza stesura della faccia, dopo il collaudo: «e una GRIGLIA REGOLARE, righe
           orizzontali ogni otto pixel piu due giunti verticali per tutta l'altezza —
           legge come muro costruito, non come parete di tufo scalpellata». Vero, e la
           causa era proprio quella regolarita: due facce verticali continue piu una riga
           orizzontale ogni diciassette fanno un reticolo, e un reticolo e muratura.
           Il Porto Romano e SCAVATO, e la sua firma sono le striature VERTICALI degli
           scalpelli — corte, di lunghezza diversa, mai allineate — piu gli strati di
           cenere, che sono orizzontali ma irregolari e non passano da parte a parte. */
        for (let k = 0; k < 46; k++) {                          // i colpi di scalpello, verticali
          const x = spx + 5 + (r() * (W - spx - 8) | 0);
          const da = spTop + 4 + (r() * (waterY - spTop - 30) | 0);
          const lung = 14 + (r() * 46 | 0);
          ctx.fillStyle = `rgba(104,72,28,${0.10 + r() * 0.13})`;
          ctx.fillRect(x, da, 2, Math.min(lung, waterY - da - 2));
          ctx.fillStyle = 'rgba(255,244,206,.10)';
          ctx.fillRect(x + 2, da, 1, Math.min(lung, waterY - da - 2));
        }
        for (let k = 0; k < 9; k++) {                           // gli strati, che non attraversano
          const y = spTop + 8 + (r() * (waterY - spTop - 20) | 0);
          const x0 = spx + 2 + (r() * 30 | 0);
          ctx.fillStyle = `rgba(96,68,30,${0.12 + r() * 0.10})`;
          ctx.fillRect(x0, y, (W - x0) * (0.45 + r() * 0.55), 2);
        }
        ctx.fillStyle = '#e0bc78'; ctx.fillRect(prof[spTop], spTop - 5, W, 7);
        ctx.fillStyle = 'rgba(255,246,214,.30)'; ctx.fillRect(prof[spTop], spTop - 5, W, 2);
        sterpaglie(ctx, prof[spTop] + 6, spTop - 4, W - prof[spTop] - 10, '#8a8a52', r, 7);
      }
      // L'ACQUA DENTRO LA CAVA: verde bottiglia, ferma, con il riflesso del tufo
      sea(ctx, W, waterY, quayY, '#0e3038', '#134048', r, 7, 0.3);
      ctx.fillStyle = 'rgba(200,160,88,.13)';
      for (let y = waterY + 2; y < quayY; y += 6) ctx.fillRect(0, y, cliffW, 3);
      /* IL PIEDE DELLA SPALLA, disegnato QUI e non dentro il suo blocco: il mare si dipinge
         DOPO la spalla, quindi la fascia bagnata, le alghe e il riflesso finivano sotto
         l'acqua e sullo schermo restava la riga retta di prima. Un difetto di ORDINE, non
         di disegno — e per due render di seguito ho creduto che il codice non funzionasse. */
      {
        const spx2 = Math.round(W * 0.885);
          /* IL PIEDE. Il collaudo: «la spalla finisce su un taglio orizzontale perfettamente
             rettilineo che coincide col cambio di banda dell'acqua, senza ombra portata,
             senza filo di bagnasciuga, senza detrito». Era una lastra appoggiata sul mare.
             Servono quattro cose, e sono le stesse di qualunque cosa che entra nell'acqua:
             la fascia BAGNATA piu scura appena sopra il pelo, il filo di alghe, il riflesso
             che scende nell'acqua sotto, e il detrito caduto ai piedi. */
          for (let x = spx2 - 6; x < W; x++) {
            const onda = Math.round(Math.sin(x * 0.09) * 1.6 + (r() - 0.5) * 1.4);
            const pelo = waterY + onda;
            for (let k = 0; k < 16; k++) {                        // la fascia bagnata che schiarisce salendo
              ctx.fillStyle = `rgba(58,40,16,${0.34 - k * 0.020})`;
              ctx.fillRect(x, pelo - 16 + k, 1, 1);
            }
            // il filo di alghe: a .44 su tre pixel leggeva come ERBA, un prato sul pelo
          // dell'acqua. Un filo di alghe su una parete e una riga scura sottile e sfrangiata.
          if (r() > 0.30) { ctx.fillStyle = 'rgba(40,56,36,.30)'; ctx.fillRect(x, pelo - 1, 1, 1 + (r() > 0.7 ? 1 : 0)); }
            for (let k = 0; k < 9; k++) {                        // il riflesso nell'acqua ferma
              ctx.fillStyle = `rgba(200,160,88,${0.16 - k * 0.017})`;
              if (r() > 0.35) ctx.fillRect(x, pelo + 2 + k * 2, 1, 2);
            }
          }
          for (let k = 0; k < 14; k++) {                          // il detrito ai piedi della cava
            const x = spx2 - 6 + 2 + (r() * (W - spx2 - 6 - 6) | 0);
            ctx.fillStyle = shade('#b08c4a', 0.66 + r() * 0.34);
            ctx.fillRect(x, waterY - 3 - (r() * 5 | 0), 3 + (r() * 5 | 0), 3);
          }
      }
      /* LE BARCHE: di legno, ormeggiate lungo la parete. Erano quattro rettangoli
         identici allineati alla stessa altezza — adesso hanno il profilo (barchetta()),
         lunghezze e colori diversi, la prua girata da parti diverse e una quota d'acqua
         propria: sono la cosa viva di questa inquadratura e devono sembrare quattro
         barche, non quattro copie. */
      for (const [fx, bw, col, dir, alb] of [[0.13, 118, '#e6e8e4', 1, false],
                                             [0.33, 92, '#dcdcc8', -1, false],
                                             [0.53, 132, '#efe6c6', 1, false],
                                             [0.73, 84, '#cfd8de', -1, true]]) {
        barchetta(ctx, W * fx, waterY + 26 + (bw % 11), bw, col, r, dir, alb);
      }
      /* LA BANCHINA in primo piano: cemento vecchio, bitte, una cima avvolta.
         E' UN PIANO ORIZZONTALE, e prima era dipinta come una parete: quattordici giunti
         verticali da tre pixel, tirati per tutti i settantotto pixel di profondita' con zero
         convergenza, piu' corsi trasversali di dodici pixel costanti. Su un piano orizzontale
         i giunti longitudinali CONVERGONO verso il punto di fuga e i corsi trasversali si
         ALLARGANO venendo avanti: sono due righe di codice in piu' e sono la differenza fra
         un pavimento e un muro visto da davanti. Con l'orizzonte a y=94, sui settantotto
         pixel di banchina lo spostamento e' di venti pixel, e i corsi passano da dodici a
         diciassette. */
      blocks(ctx, 0, quayY - 6, W, H - quayY + 6, '#a8a094', 12, r, 0.10);
      ctx.fillStyle = 'rgba(255,255,240,.10)'; ctx.fillRect(0, quayY - 6, W, 3);
      const fugaX = W * 0.50;
      for (let x0 = 0; x0 < W + 68; x0 += 68) {
        for (let y = quayY - 4; y < H; y++) {
          const t = (y - (quayY - 4)) / Math.max(1, H - quayY + 4);
          const x = x0 + (fugaX - x0) * (1 - t) * 0.29;
          ctx.fillStyle = 'rgba(60,54,44,.30)';
          ctx.fillRect(Math.round(x), y, 3, 1);
        }
      }
      for (let y = quayY - 4, passo = 12; y < H; y += passo, passo += 1.6) {
        ctx.fillStyle = 'rgba(60,54,44,.22)'; ctx.fillRect(0, Math.round(y), W, 2);
      }
      for (const fx of [0.20, 0.62]) {
        ctx.fillStyle = '#4a4640'; ctx.fillRect(W * fx - 7, quayY - 20, 15, 20);
        ctx.fillStyle = '#5c574e'; ctx.fillRect(W * fx - 10, quayY - 24, 21, 6);
        ctx.fillStyle = '#c8bc98';
        for (let i = 0; i < 4; i++) pixelEllipse(ctx, W * fx + 22, quayY - 6 - i * 3, 16 - i * 2, 4, 3);
      }
      // due casse di polistirolo e un carrello: il casino bellissimo di agosto
      ctx.fillStyle = '#d8dcd8'; ctx.fillRect(W * 0.80, quayY - 16, 34, 16);
      ctx.fillStyle = '#c4c8c4'; ctx.fillRect(W * 0.80, quayY - 22, 34, 7);
      ctx.fillStyle = '#8a3a32'; ctx.fillRect(W * 0.88, quayY - 26, 26, 26);
      ctx.fillStyle = '#5a5a60'; ctx.fillRect(W * 0.885, quayY - 6, 5, 6); ctx.fillRect(W * 0.925, quayY - 6, 5, 6);
    },

    traghetto(ctx, W, H) {
      // Il ponte di poppa del traghetto per Formia. Il parapetto bianco caldo di
      // sole, la scia che si allarga, e l'isola che SI STACCA — non sei tu che vai via.
      const r = rng(seedOf('traghetto'));
      skyGradient(ctx, W, H * 0.30, '#79bcd8', '#d4e6ea', 8);
      /* IL PARAPETTO ERA UN CORDOLO. railY a H*0.60 e deckY a H*0.72 fanno quarantatre'
         pixel; con l'orizzonte a y=108 e l'occhio a un metro e sessanta sul ponte, un
         parapetto da 1,10 m alla riga di base 259 ne misura 1,10/1,60 x (259-108) = 104. A
         quarantatre' pixel quella ringhiera e' alta quarantasei centimetri, cioe' si scavalca
         camminando — e il testo dice che Claudia ci sta APPOGGIATA con la faccia dentro il
         vento. Portato railY a H*0.435, che da' 105 pixel. */
      const horiz = H * 0.30, railY = H * 0.435, deckY = H * 0.72;
      // qualche nuvola bassa, piatta
      for (const [fx, fy, fw] of [[0.10, 0.09, 110], [0.46, 0.06, 84], [0.74, 0.13, 130]]) {
        ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(W * fx, H * fy, fw, 8);
        ctx.fillStyle = 'rgba(255,255,255,.32)'; ctx.fillRect(W * fx + 14, H * fy - 5, fw * 0.6, 6);
      }
      // IL MARE APERTO: dal blu del largo al blu di sotto
      sea(ctx, W, horiz, deckY, '#12456a', '#2a7ea0', r, 12, 0.9);
      ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(0, horiz, W, 2);   // la riga dell'orizzonte
      // VENTOTENE che si stacca: bassa e verde, a sinistra, già piccola
      for (let dx = -W * 0.13; dx < W * 0.13; dx += 4) {
        const t = dx / (W * 0.13);
        const hh = H * 0.055 * Math.pow(Math.max(0, 1 - t * t), 0.45);
        ctx.fillStyle = '#3a5a4a'; ctx.fillRect(W * 0.26 + dx, horiz - hh, 4, hh + 1);
      }
      ctx.fillStyle = '#d8c088';   // il paese, una fila di sassi ordinati
      for (let i = 0; i < 9; i++) ctx.fillRect(W * 0.20 + i * 12, horiz - 5 - (i % 3), 7, 4);
      // SANTO STEFANO dietro, come una cosa appoggiata male
      santoStefanoLontano(ctx, W * 0.44, horiz, W * 0.075, H * 0.048, '#2e4450', '#4a5a60');
      /* LA SCIA, riga per riga e non a sedici blocchi. Sedici rettangoli larghi 20-300 px e
         alti dieci, messi uno sotto l'altro, sullo schermo sono una SCALETTA di gradini
         chiari che va verso l'orizzonte — sembra un pontile, non una scia. Riga per riga, con
         i due lembi che divergono e il mezzo piu' chiaro, e' una scia. */
      for (let y = Math.round(horiz + 2); y < deckY; y++) {
        const t = (y - horiz - 2) / Math.max(1, deckY - horiz - 2);
        const w2 = W * (0.014 + Math.pow(t, 1.15) * 0.30);
        const cx2 = W * 0.40;
        ctx.fillStyle = `rgba(226,244,250,${(0.06 + t * 0.16).toFixed(3)})`;
        ctx.fillRect(Math.round(cx2 - w2 / 2), y, Math.round(w2), 1);
        ctx.fillStyle = `rgba(255,255,255,${(0.10 + t * 0.34).toFixed(3)})`;   // i due lembi
        ctx.fillRect(Math.round(cx2 - w2 / 2), y, Math.max(2, Math.round(w2 * 0.10)), 1);
        ctx.fillRect(Math.round(cx2 + w2 / 2 - w2 * 0.10), y, Math.max(2, Math.round(w2 * 0.10)), 1);
      }
      for (let i = 0; i < 40; i++) {
        const t = r();
        const y = horiz + 6 + t * (deckY - horiz - 8);
        ctx.fillStyle = 'rgba(255,255,255,.42)';
        ctx.fillRect(W * 0.40 + (r() - 0.5) * W * (0.03 + t * 0.30), y, 3, 2);
      }
      // IL PARAPETTO: vernice bianca calda di sole, e sotto le mani la vibrazione
      ctx.fillStyle = '#eceee8'; ctx.fillRect(0, railY, W, 9);
      ctx.fillStyle = '#c8ccc4'; ctx.fillRect(0, railY + 7, W, 4);
      ctx.fillStyle = '#e4e6e0'; ctx.fillRect(0, railY + 26, W, 5);
      for (let x = 10; x < W; x += 74) {
        ctx.fillStyle = '#e0e2dc'; ctx.fillRect(x, railY, 7, deckY - railY);
        ctx.fillStyle = '#b4b8b0'; ctx.fillRect(x + 5, railY, 2, deckY - railY);
        ctx.fillStyle = 'rgba(120,110,90,.30)'; ctx.fillRect(x, railY + 14, 7, 3); // ruggine sotto la vernice
      }
      // IL PONTE: doghe di gomma grigio-azzurra, e la vibrazione che arriva ai denti
      blocks(ctx, 0, deckY, W, H - deckY, '#5a646c', 12, r, 0.09);
      /* Anche questo e' un PIANO ORIZZONTALE: quaranta giunti verticali ogni ventiquattro
         pixel su centouno pixel di ponte, con zero convergenza, facevano di un ponte una
         parete grigia vista di fronte. Con l'orizzonte a y=108 lo spostamento e' di
         trentatre' pixel sui centouno di profondita', e i corsi trasversali passano da dieci
         a sedici. */
      for (let x0 = 0; x0 < W + 24; x0 += 24) {
        for (let y = deckY; y < H; y++) {
          const t = (y - deckY) / Math.max(1, H - deckY);
          const x = x0 + (W * 0.40 - x0) * (1 - t) * 0.33;
          ctx.fillStyle = 'rgba(20,26,30,.24)';
          ctx.fillRect(Math.round(x), y, 3, 1);
        }
      }
      for (let y = deckY, passo = 10; y < H; y += passo, passo += 1.5) {
        ctx.fillStyle = 'rgba(20,26,30,.16)'; ctx.fillRect(0, Math.round(y), W, 2);
      }
      ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(0, deckY, W, 3);
      // la panca di poppa e il salvagente: il posto dove si sta
      ctx.fillStyle = '#7a6a4a'; ctx.fillRect(W * 0.66, deckY + 6, W * 0.22, 12);
      ctx.fillStyle = '#8a7a58'; ctx.fillRect(W * 0.66, deckY + 4, W * 0.22, 4);
      ctx.fillStyle = '#5a5040'; ctx.fillRect(W * 0.68, deckY + 18, 6, H - deckY - 18);
      ctx.fillRect(W * 0.855, deckY + 18, 6, H - deckY - 18);
      ctx.fillStyle = '#e04a2a'; pixelDisc(ctx, W * 0.11, railY + 40, 26, 4);
      ctx.fillStyle = '#f0f0ea'; pixelDisc(ctx, W * 0.11, railY + 40, 14, 4);
      ctx.fillStyle = '#e04a2a'; ctx.fillRect(W * 0.11 - 28, railY + 38, 56, 5);
      // un trolley dimenticato di sbieco, e l'ombra che fa
      ctx.fillStyle = 'rgba(20,26,30,.26)'; ctx.fillRect(W * 0.40, H - 16, 44, 8);
      ctx.fillStyle = '#3a4048'; ctx.fillRect(W * 0.41, H - 42, 30, 30);
      ctx.fillStyle = '#4a525c'; ctx.fillRect(W * 0.41, H - 42, 30, 4);
      ctx.fillStyle = '#8a9098'; ctx.fillRect(W * 0.423, H - 56, 4, 15);
      // e in mezzo alla scia, dove l'acqua è bianca, una banda verticale che
      // non è nitida come tutto il resto: tre dita d'aria che vibrano
      /* Sfumata, e senza entrare nel cielo. Il rettangolo di prima partiva trentadue pixel
         SOPRA l'orizzonte: una colonna pallida a spigoli netti che tagliava la linea del
         mare. Una cosa che non e' nitida non si disegna con un rettangolo. */
      {
        const bx = Math.round(W * 0.345), bw = 15, y0 = Math.round(horiz + 1), y1 = Math.round(railY - 4);
        for (let dx = 0; dx < bw; dx++) {
          const t = 1 - Math.abs(dx - bw / 2) / (bw / 2);
          for (let y = y0; y < y1; y++) {
            const v = 1 - Math.abs(y - (y0 + y1) / 2) / ((y1 - y0) / 2);
            ctx.fillStyle = `rgba(190,220,232,${(0.20 * Math.pow(t, 0.9) * Math.pow(Math.max(0, v), 0.5)).toFixed(3)})`;
            ctx.fillRect(bx + dx, y, 1, 1);
          }
        }
      }
    },

    paese(ctx, W, H) {
      // PIAZZA CASTELLO nel tardo pomeriggio: case basse intonacate di giallo e
      // rosa, il campanile di Santa Candida, i tavolini di ferro, i gatti, i panni.
      // È la cosa che ti fa pensare di volerci vivere.
      const r = rng(seedOf('paese'));
      skyGradient(ctx, W, H * 0.30, '#8ec6dc', '#f0dcbc', 8);
      const roofY = H * 0.20, groundY = H * 0.76;
      // IL FILARE DI CASE BASSE: gialle, rosa, ocra, tutte diverse, tutte uguali
      const facciate = [
        [0.00, 0.15, '#e8c878', '#b0603c'], [0.15, 0.13, '#e0a898', '#a85a48'],
        [0.28, 0.12, '#f0d898', '#b8704a'], [0.40, 0.10, '#d8b0a0', '#a05a4a'],
        /* Questa mancava. Il filare arrivava a 0.50 e ripartiva da 0.62, e il
           campanile che sta in mezzo è più stretto del vuoto: restava una fessura
           nera alta mezza inquadratura, e sembrava un vicolo. */
        [0.50, 0.125, '#e4cfa4', '#ac6a4a'],
        [0.62, 0.14, '#e8cc90', '#b06a44'], [0.76, 0.12, '#dcb4a4', '#a86050'],
        [0.88, 0.12, '#f0dca8', '#b87850'],
      ];
      for (const [fx, fw, wall, roof] of facciate) {
        const x = W * fx, w = W * fw, top = roofY + (fx * 90 % 22);
        blocks(ctx, x, top, w, groundY - top, wall, 10, r, 0.07);
        blocks(ctx, x - 5, top - 9, w + 10, 11, roof, 8, r, 0.12);     // il coppo
        ctx.fillStyle = 'rgba(255,240,200,.14)'; ctx.fillRect(x, top + 11, w, 4);
        // persiane VERDI, due file
        for (let ro = 0; ro < 2; ro++) for (let co = 0; co < 2; co++) {
          const wx = x + 12 + co * (w - 40), wy = top + 24 + ro * 52;
          if (wy + 30 > groundY - 30) continue;
          ctx.fillStyle = '#f4ecd8'; ctx.fillRect(wx - 3, wy - 3, 28, 34);
          ctx.fillStyle = '#3a6a4a'; ctx.fillRect(wx, wy, 22, 28);
          ctx.fillStyle = '#2e5a3e';
          for (let k = 0; k < 6; k++) ctx.fillRect(wx, wy + 2 + k * 4, 22, 2);
          ctx.fillStyle = '#4a7a58'; ctx.fillRect(wx + 10, wy, 2, 28);
        }
        // il portoncino
        ctx.fillStyle = '#5a4a3a'; ctx.fillRect(x + w / 2 - 11, groundY - 34, 22, 34);
        ctx.fillStyle = '#6a5844'; ctx.fillRect(x + w / 2 - 13, groundY - 37, 26, 4);
      }
      // I PANNI STESI tra due case: la cosa più viva della piazza
      const px0 = W * 0.40 + W * 0.10, px1 = W * 0.62;
      ctx.fillStyle = '#8a8a80'; ctx.fillRect(px0, roofY + 34, px1 - px0, 2);
      const panni = ['#e8e8e0', '#88b8d0', '#e0c060', '#d88a90', '#f0f0e8'];
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = panni[i];
        ctx.fillRect(px0 + 8 + i * (px1 - px0 - 20) / 5, roofY + 36, 15, 22 + (i % 2) * 8);
      }
      // IL CAMPANILE DI SANTA CANDIDA: l'unica cosa alta, dietro il filare
      const cx = W * 0.52, cw = W * 0.085;
      blocks(ctx, cx - cw / 2, H * 0.04, cw, groundY - H * 0.04, '#e4d4b0', 10, r, 0.06);
      blocks(ctx, cx - cw / 2 - 6, H * 0.02, cw + 12, 10, '#c08a5a', 8, r, 0.10);
      // la cella campanaria: un arco vuoto e la campana dentro
      ctx.fillStyle = '#4a3a2e'; ctx.fillRect(cx - cw * 0.28, H * 0.10, cw * 0.56, H * 0.13);
      arco(ctx, cx, H * 0.10 + 4, cw * 0.28, cw * 0.28, 5, '#4a3a2e', r, 4);
      ctx.fillStyle = '#8a7a52'; pixelDisc(ctx, cx, H * 0.17, 9, 3);
      ctx.fillStyle = '#6a5c3a'; ctx.fillRect(cx - 2, H * 0.13, 4, 12);
      // il quadrante dell'orologio
      ctx.fillStyle = '#f0e8d0'; pixelDisc(ctx, cx, H * 0.31, 15, 3);
      ctx.fillStyle = '#3a3428'; pixelDisc(ctx, cx, H * 0.31, 12, 3);
      ctx.fillStyle = '#e8e0c8'; ctx.fillRect(cx - 1, H * 0.31 - 9, 3, 10); ctx.fillRect(cx, H * 0.31, 8, 3);
      // LA PIAZZA: basolato di pietra vulcanica, caldo di sole
      blocks(ctx, 0, groundY, W, H - groundY, '#a89888', 14, r, 0.10);
      /* Il basolato e' un piano orizzontale: il passo delle righe si ALLARGA venendo avanti
         (da undici pixel in fondo a diciannove in primo piano) e i giunti fra i basoli
         convergono verso il punto di fuga. A passo fisso sembrava un muro di mattoni messo
         per terra, che e' esattamente quello che era. */
      {
        let y = groundY, passo = 11, riga = 0;
        while (y < H) {
          const largo = Math.round(60 * (0.78 + (y - groundY) / (H - groundY) * 0.34));
          for (let x = (riga % 2) * (largo / 2); x < W; x += largo + 4) {
            ctx.fillStyle = 'rgba(70,58,44,.22)';
            ctx.fillRect(Math.round(x), Math.round(y), largo, 2);
            ctx.fillRect(Math.round(x + largo), Math.round(y), 2, Math.round(passo));
          }
          y += passo; passo += 1.3; riga++;
        }
      }
      ctx.fillStyle = 'rgba(255,224,170,.12)'; ctx.fillRect(0, groundY, W, H - groundY);
      /* UN TAVOLINO SOLO, GRANDE, TAGLIATO DAL BORDO. Prima ce n'erano tre col piano di
         quarantotto pixel, due gatti da ventisei e un motorino da quarantasei. Il metro di
         questo quadro e' la persiana — 22×28 px per una finestra di 1,10 × 1,45 m, cioe'
         venti pixel il metro — e con quel metro un tavolino da bar (0,70 m) e' quindici
         pixel, un gatto venticinque, una Vespa sessanta. Erano tutti e sei fuori scala di
         tre volte E sotto la soglia di leggibilita' insieme: il motorino, nel PNG, leggeva
         come un trattorino rosso senza sella ne' scudo ne' forcella.
         La regola del progetto e' che un fondale ha UN soggetto grande almeno un terzo
         dell'inquadratura, e che un oggetto che non si riesce a far leggere si TOGLIE. Quindi
         qui adesso c'e' un tavolino in primo piano, tagliato dal bordo di sotto, dove la
         scala e' quella giusta per farlo grande — e la piazza dietro e' vuota, che alle
         nove e mezza di sera d'agosto e' anche piu' vero. */
      {
        const tx = Math.round(W * 0.20), ty = H - 46;
        ctx.fillStyle = 'rgba(50,40,30,.30)'; pixelEllipse(ctx, tx, ty + 44, 62, 11, 4);
        // le due sedie, dietro e di fianco: spalliera alta, ferro verniciato verde
        for (const [sx, sy] of [[tx - 86, ty - 6], [tx + 84, ty - 2]]) {
          ctx.fillStyle = '#2e3a36';
          ctx.fillRect(sx - 22, sy + 10, 44, 6);                 // la seduta
          ctx.fillRect(sx - 20, sy - 44, 6, 56); ctx.fillRect(sx + 14, sy - 44, 6, 56);
          for (let k = 0; k < 4; k++) ctx.fillRect(sx - 20, sy - 40 + k * 11, 40, 5);
          ctx.fillStyle = '#3a4a44';
          ctx.fillRect(sx - 18, sy + 16, 5, 30); ctx.fillRect(sx + 13, sy + 16, 5, 30);
        }
        // il piano: settanta centimetri, cioe' settanta pixel di semiasse a questa distanza
        ctx.fillStyle = '#2e3a36'; ctx.fillRect(tx - 6, ty + 8, 12, 40);
        ctx.fillStyle = '#3a4a44'; pixelEllipse(ctx, tx, ty + 46, 26, 6, 3);
        ctx.fillStyle = '#3a4a44'; pixelEllipse(ctx, tx, ty, 70, 17, 3);
        ctx.fillStyle = '#4a5a52'; pixelEllipse(ctx, tx, ty - 3, 70, 16, 3);
        ctx.fillStyle = '#f0ece0'; pixelEllipse(ctx, tx, ty - 4, 58, 13, 3);   // la tovaglia di carta
        ctx.fillStyle = 'rgba(180,170,150,.40)'; ctx.fillRect(tx - 58, ty - 4, 116, 2);
        // due bicchieri e un cestino del pane: le cose che stanno su un tavolo apparecchiato
        ctx.fillStyle = '#dfe4e2'; ctx.fillRect(tx - 30, ty - 26, 13, 22);
        ctx.fillStyle = '#c8d0ce'; ctx.fillRect(tx - 30, ty - 26, 13, 4);
        ctx.fillStyle = '#dfe4e2'; ctx.fillRect(tx + 14, ty - 24, 12, 20);
        ctx.fillStyle = '#c8d0ce'; ctx.fillRect(tx + 14, ty - 24, 12, 4);
        ctx.fillStyle = '#b08a52'; pixelEllipse(ctx, tx - 4, ty - 12, 17, 7, 3);
        ctx.fillStyle = '#e8d8a8'; pixelEllipse(ctx, tx - 4, ty - 16, 13, 5, 3);
      }
      /* IL GATTO, uno solo e grande: cinquanta pixel di lunghezza, steso sul basolato caldo
         a due passi dal tavolino. A venticinque pixel era un'ellisse grigia. */
      {
        const gx = Math.round(W * 0.63), gy = H - 26;
        ctx.fillStyle = 'rgba(50,40,30,.26)'; pixelEllipse(ctx, gx, gy + 7, 30, 6, 3);
        ctx.fillStyle = '#5a5248'; pixelEllipse(ctx, gx, gy, 26, 11, 3);
        ctx.fillStyle = '#6a6154'; pixelEllipse(ctx, gx, gy - 3, 24, 7, 3);
        ctx.fillStyle = '#5a5248'; ctx.fillRect(gx + 20, gy - 16, 15, 15);          // la testa
        ctx.fillRect(gx + 21, gy - 22, 5, 7); ctx.fillRect(gx + 29, gy - 22, 5, 7); // le orecchie
        ctx.fillStyle = '#c8b070'; ctx.fillRect(gx + 24, gy - 11, 3, 3); ctx.fillRect(gx + 31, gy - 11, 3, 3);
        ctx.fillStyle = '#4a443c'; ctx.fillRect(gx - 34, gy - 2, 16, 5);            // la coda
        ctx.fillStyle = '#6a6154'; ctx.fillRect(gx - 6, gy + 8, 9, 5); ctx.fillRect(gx + 8, gy + 8, 9, 5);
      }
      // il ballatoio a destra: sotto la ringhiera l'isola scende verso il porto
      ctx.fillStyle = '#8a8478'; ctx.fillRect(W * 0.955, groundY - 40, W * 0.045, 40);
      ctx.fillStyle = '#2a6a80'; ctx.fillRect(W * 0.955, groundY - 40, W * 0.045, 22);
      // LA COSA FREDDA: in tutta la piazza al sole, UNA finestra aperta sul nero,
      // con la tenda che non si muove di un millimetro.
      const fwx = W * 0.295, fwy = roofY + 26;
      ctx.fillStyle = '#f4ecd8'; ctx.fillRect(fwx - 4, fwy - 4, 30, 38);
      ctx.fillStyle = '#04060a'; ctx.fillRect(fwx, fwy, 22, 30);
      ctx.fillStyle = 'rgba(230,226,210,.5)'; ctx.fillRect(fwx + 14, fwy, 7, 30);
      ctx.fillStyle = '#3a6a4a'; ctx.fillRect(fwx - 12, fwy, 10, 30);   // una persiana aperta a battente
    },

    bnb(ctx, W, H) {
      // LE PARRACINE. È il rifugio, e deve sembrarlo: un fazzoletto di terra tenuto
      // su da TRE livelli di muretti a secco, la casa bassa di tufo giallo con le
      // finestre verdi, i pomodori sulle canne, il basilico nel bidone tagliato e
      // un limone in vaso che ha più limoni di quanti ne possa mangiare una famiglia.
      const r = rng(seedOf('bnb'));
      const horiz = H * 0.30;
      skyGradient(ctx, W, horiz, '#74bad8', '#d4e8e4', 10);
      // IL MARE oltre i muretti: il blu di chi sta al sicuro, quaranta metri sotto
      sea(ctx, W, horiz, H * 0.44, '#1a6484', '#2f88a6', r, 8, 0.7);
      ctx.fillStyle = 'rgba(255,255,255,.20)'; ctx.fillRect(0, horiz, W, 2);
      santoStefanoLontano(ctx, W * 0.84, horiz + 2, W * 0.13, H * 0.062, '#42585e', '#8a9088');
      // LA COSA FREDDA: sul mare, in mezzo tra le due isole, una banda verticale
      // larga tre dita dove l'aria non è nitida come tutto il resto.
      /* LA BANDA SFUMA, e prima aveva gli SPIGOLI. Un fillRect di quattordici pixel a bordi
         netti non e' aria che non e' nitida: e' una colonna pallida disegnata sopra il mare, e
         nel PNG si vede il rettangolo. Una cosa che «non e' nitida» si fa colonna per colonna,
         con l'alfa che cresce al centro e muore ai lati — e senza sconfinare nel cielo. */
      {
        const bx = Math.round(W * 0.735), bw = 16, y0 = Math.round(horiz + 1), y1 = Math.round(horiz + H * 0.15);
        for (let dx = 0; dx < bw; dx++) {
          const t = 1 - Math.abs(dx - bw / 2) / (bw / 2);
          for (let y = y0; y < y1; y++) {
            const v = 1 - Math.abs((y - (y0 + y1) / 2)) / ((y1 - y0) / 2);
            ctx.fillStyle = `rgba(186,214,224,${(0.26 * Math.pow(t, 0.9) * Math.pow(Math.max(0, v), 0.6)).toFixed(3)})`;
            ctx.fillRect(bx + dx, y, 1, 1);
          }
        }
      }
      // I TRE LIVELLI DI TERRA, ognuno più scuro e più vicino, che scendono a destra
      const liv = [
        [H * 0.44, '#a89464'],   // il livello più alto, dove sta la casa
        [H * 0.62, '#9c8a5c'],
        [H * 0.82, '#8e7d52'],   // quello in cui siamo, col tavolino
      ];
      for (let i = 0; i < 3; i++) {
        const [ly, col] = liv[i];
        blocks(ctx, 0, ly, W, H - ly, col, 12, r, 0.11);
        ctx.fillStyle = 'rgba(255,236,180,.10)'; ctx.fillRect(0, ly, W, H - ly);
        // il muretto a secco che tiene su la terra: pietre incastrate senza malta
        muretto(ctx, 0, ly - 20, W, 24, '#d4b478', r);
        ctx.fillStyle = 'rgba(255,252,220,.20)'; ctx.fillRect(0, ly - 20, W, 3);
        ctx.fillStyle = 'rgba(70,54,26,.24)'; ctx.fillRect(0, ly + 4, W, 4);
        sterpaglie(ctx, 0, ly - 20, W, '#8a9a4a', r, 22);
        // i capperi e i fichi d'India nelle fessure
        ctx.fillStyle = '#4a7a48';
        for (let k = 0; k < 12; k++) pixelEllipse(ctx, r() * W, ly - 18 + r() * 16, 6, 4, 3);
      }
      // (la scaletta a destra si disegna in fondo al painter, sopra i livelli di terra)
      // LA CASA: bassa, tufo giallo, finestre verdi, tetto piano, sul livello alto
      const hx = W * 0.05, hw = W * 0.32, hy = H * 0.16, hh = H * 0.30;
      ctx.fillStyle = 'rgba(70,54,26,.24)'; ctx.fillRect(hx + 8, hy + hh - 4, hw, 10);
      blocks(ctx, hx, hy, hw, hh, '#e8cc84', 10, r, 0.07);
      blocks(ctx, hx - 8, hy - 11, hw + 16, 13, '#c08a54', 9, r, 0.10);
      ctx.fillStyle = 'rgba(255,248,210,.16)'; ctx.fillRect(hx, hy + 13, hw, 6);
      ctx.fillStyle = 'rgba(120,90,40,.14)'; ctx.fillRect(hx, hy + hh - 30, hw, 30);
      const finW = 42, finMarg = 7, nFin = 3;
      const finSpazio = Math.max(0, hw - finMarg * 2 - finW);
      for (let iFin = 0; iFin < nFin; iFin++) {
        const wx = hx + finMarg + 5 + finSpazio * iFin / (nFin - 1), wy = hy + hh * 0.22;
        ctx.fillStyle = '#f8f0de'; ctx.fillRect(wx - 5, wy - 5, 42, 50);
        ctx.fillStyle = '#3a7a52'; ctx.fillRect(wx, wy, 32, 40);
        ctx.fillStyle = '#2e6442';
        for (let k = 0; k < 9; k++) ctx.fillRect(wx, wy + 2 + k * 4, 32, 2);
        ctx.fillStyle = '#4e9064'; ctx.fillRect(wx + 15, wy, 2, 40);
        ctx.fillStyle = '#e8dcbc'; ctx.fillRect(wx - 5, wy + 45, 42, 5);   // il davanzale
      }
      // la porta aperta della cucina, da dove il marito dice buonasera e non si vede
      const dx2 = hx + hw * 0.26;
      ctx.fillStyle = '#5a4632'; ctx.fillRect(dx2, hy + hh - 52, 34, 52);
      ctx.fillStyle = '#241c12'; ctx.fillRect(dx2 + 5, hy + hh - 47, 24, 47);
      glow(ctx, dx2 + 17, hy + hh - 24, 40, 42, '245,205,125');
      ctx.fillStyle = 'rgba(255,222,155,.26)'; ctx.fillRect(dx2 + 7, hy + hh - 32, 20, 32);
      // i panni stesi sul filo, tra la casa e una canna
      ctx.fillStyle = '#8a8a76'; ctx.fillRect(hx + hw, hy + hh * 0.30, W * 0.14, 2);
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = ['#e8e8e0', '#7ab0cc', '#e0c060', '#d88a90'][i];
        ctx.fillRect(hx + hw + 8 + i * 30, hy + hh * 0.30 + 2, 18, 24 + (i % 2) * 8);
      }
      // IL LIMONE IN VASO: più limoni di quanti se ne possano mangiare
      const lx = W * 0.52, ly2 = H * 0.60;
      ctx.fillStyle = 'rgba(70,54,26,.28)'; pixelEllipse(ctx, lx, ly2 + 2, 24, 6, 3);
      ctx.fillStyle = '#b06a44'; ctx.fillRect(lx - 18, ly2 - 26, 36, 28);
      ctx.fillStyle = '#c8825a'; ctx.fillRect(lx - 20, ly2 - 30, 40, 6);
      ctx.fillStyle = '#8a5030'; ctx.fillRect(lx - 18, ly2 - 8, 36, 4);
      ctx.fillStyle = '#5a4a2a'; ctx.fillRect(lx - 3, ly2 - 66, 7, 42);
      for (const [ox, oy, s] of [[0, -88, 30], [-24, -70, 23], [23, -72, 24], [-12, -104, 19], [14, -102, 18], [0, -60, 20]]) {
        ctx.fillStyle = shade('#3a7a44', 0.86 + r() * 0.3);
        pixelEllipse(ctx, lx + ox, ly2 + oy, s * 0.82, s * 0.62, 3);
      }
      ctx.fillStyle = '#f0d040';
      for (const [ox, oy] of [[-20, -78], [-5, -94], [16, -82], [25, -66], [-27, -62], [4, -108], [20, -100], [-14, -70], [8, -66], [-2, -56]]) {
        pixelDisc(ctx, lx + ox, ly2 + oy, 5, 3);
        ctx.fillStyle = '#fff0a0'; pixelDisc(ctx, lx + ox - 1, ly2 + oy - 1, 2, 2);
        ctx.fillStyle = '#f0d040';
      }
      // I POMODORI sulle canne, sul livello di mezzo
      for (let i = 0; i < 5; i++) {
        const px2 = W * 0.64 + i * 32;
        ctx.fillStyle = '#a89058'; ctx.fillRect(px2, H * 0.48, 4, H * 0.15);
        ctx.fillStyle = '#3a6a3a';
        for (let k = 0; k < 5; k++) pixelEllipse(ctx, px2 + (k % 2 ? 9 : -7), H * 0.50 + k * 11, 9, 5, 3);
        ctx.fillStyle = '#c8382e';
        pixelDisc(ctx, px2 + (i % 2 ? 9 : -8), H * 0.53 + (i % 3) * 11, 5, 3);
        pixelDisc(ctx, px2 - 6, H * 0.59, 4, 3);
      }
      /* IL BASILICO nel bidone di latta tagliato a metà. Spostato a sinistra: stava
         a W*0.855, cioè esattamente sopra la scaletta, e il parapetto gli passava
         dietro come un palo — sullo schermo era una fioriera in cima a un bastone. */
      const bidX = W * 0.795;
      ctx.fillStyle = '#5a7a8a'; ctx.fillRect(bidX, H * 0.53, 46, 30);
      ctx.fillStyle = '#48687a'; ctx.fillRect(bidX, H * 0.53, 46, 5);
      ctx.fillStyle = '#3a5464'; ctx.fillRect(bidX, H * 0.53 + 12, 46, 3);
      ctx.fillStyle = '#4a8a48';
      for (let k = 0; k < 9; k++) pixelEllipse(ctx, bidX + 9 + k * 5, H * 0.52 - (k % 4) * 5, 7, 5, 3);
      /* IL TAVOLINO DI FERRO con la moka da sei e le tazzine, e TRE sedie di
         plastica: la terza la tira su Ada dal muretto.
         Rifatto il 23 agosto 2026 dopo averlo guardato a tre volte il vero: in mezzo
         al tavolo c'era un monumento. Due errori sovrapposti — la terza sedia era
         disegnata DOPO il tavolo (quindi davanti, non dietro) e proprio all'altezza
         della moka, così spalliera + caffettiera + tazzine si fondevano in un unico
         piedistallo chiaro; e la moka era un parallelepipedo grigio 18×30, un terzo
         del tavolo, senza vita. Ordine giusto: la sedia di fondo, poi il tavolo che la
         copre, poi le due davanti. E la moka ha la sua sagoma. */
      const tx = W * 0.26, ty = H * 0.86;
      // la sedia di fondo, spostata di lato: dietro il tavolo e fuori dall'asse della moka
      {
        const sx = tx - W * 0.042, syy = ty - H * 0.075;
        ctx.fillStyle = '#d4d0c4'; ctx.fillRect(sx - 15, syy + 8, 30, 6);
        ctx.fillStyle = '#c0bcb0'; ctx.fillRect(sx - 15, syy - 26, 26, 6);
        ctx.fillRect(sx - 15, syy - 26, 5, 34);
        ctx.fillStyle = '#aca89c'; ctx.fillRect(sx - 12, syy + 14, 5, 26); ctx.fillRect(sx + 8, syy + 14, 5, 26);
      }
      ctx.fillStyle = 'rgba(70,54,26,.26)'; pixelEllipse(ctx, tx, ty + 42, 52, 10, 4);
      ctx.fillStyle = '#3a4a46'; ctx.fillRect(tx - 40, ty, 80, 7);
      ctx.fillStyle = '#4a5a54'; ctx.fillRect(tx - 40, ty - 2, 80, 3);
      ctx.fillStyle = '#2e3a36'; ctx.fillRect(tx - 5, ty + 7, 10, 34); ctx.fillRect(tx - 20, ty + 41, 40, 5);
      /* LA MOKA DA SEI: caldaia ottagonale che si stringe alla vita, bricco più
         stretto, coperchio col pomello, manico nero. Alta 21, larga 13 in basso. */
      ctx.fillStyle = '#8e8e96'; ctx.fillRect(tx - 7, ty - 9, 13, 9);        // caldaia
      ctx.fillStyle = '#a6a6ae'; ctx.fillRect(tx - 7, ty - 9, 3, 9);         // lo spigolo in luce
      ctx.fillStyle = '#5e5e66'; ctx.fillRect(tx - 7, ty - 11, 13, 2);       // la vita, in ombra
      ctx.fillStyle = '#9a9aa2'; ctx.fillRect(tx - 5, ty - 19, 10, 8);       // bricco
      ctx.fillStyle = '#b0b0b8'; ctx.fillRect(tx - 5, ty - 19, 2, 8);
      ctx.fillStyle = '#6e6e76'; ctx.fillRect(tx - 6, ty - 21, 12, 2);       // coperchio
      ctx.fillStyle = '#c8c8d0'; ctx.fillRect(tx - 1, ty - 23, 2, 2);        // il pomello
      ctx.fillStyle = '#26262a'; ctx.fillRect(tx + 6, ty - 18, 6, 3);        // il manico
      ctx.fillRect(tx + 10, ty - 15, 2, 5);
      ctx.fillStyle = '#f4f0e4'; ctx.fillRect(tx - 30, ty - 9, 11, 9); ctx.fillRect(tx + 18, ty - 9, 11, 9);
      ctx.fillStyle = '#6a4a2a'; ctx.fillRect(tx - 28, ty - 7, 7, 3); ctx.fillRect(tx + 20, ty - 7, 7, 3);
      for (const sfx of [-0.085, 0.085]) {
        const sx = tx + W * sfx, syy = ty;
        ctx.fillStyle = '#e0dcd0'; ctx.fillRect(sx - 16, syy + 8, 32, 6);
        ctx.fillRect(sx + (sfx < 0 ? -16 : 10), syy - 28, 6, 38);
        ctx.fillStyle = '#ccc8bc'; ctx.fillRect(sx - 16 + (sfx < 0 ? 0 : 4), syy - 28, 28, 6);
        ctx.fillStyle = '#b8b4a8'; ctx.fillRect(sx - 13, syy + 14, 6, 28); ctx.fillRect(sx + 8, syy + 14, 6, 28);
      }
      /* I GRADINI CHE SCENDONO A CALA NAVE, al bordo destro del giardino: dal livello
         più basso una rampa stretta se ne va giù e scompare oltre il ciglio. È il
         dettaglio vero di questo posto — la spiaggia sta sotto, a una rampa di distanza
         — ed è anche la ragione per cui questo rifugio confina col mare profondo.
         Disegnati QUI, dopo i livelli di terra: prima li coprivano e non si vedevano. */
      /* Secondo giro, 23 agosto 2026, guardando il bordo destro a tre volte il vero.
         Due errori, e il secondo era grosso.
         Uno: non leggevano come gradini che scendono ma come MENSOLE appoggiate al
         muro — barre tutte della stessa lunghezza e della stessa luce, senza alzata in
         ombra e senza niente che dicesse "questi vanno via".
         Due: in quell'angolo c'erano DUE scale sovrapposte. Una c'era già («la
         scaletta di parracine che sale da un livello all'altro»), e a febbraio le ho
         affiancato quella per Cala Nave senza accorgermene: si incrociavano per
         quaranta pixel. Adesso è una sola rampa — quella vera del posto, che dal
         cancello alto scende di livello in livello e poi se ne va giù alla cala — coi
         gradini che si accorciano e si spengono (è così che si fa la profondità, non
         col colore), il parapetto in muratura vera, e il buco d'ombra dove svolta. */
      {
        const gx0 = W * 0.87, gy0 = H * 0.44, nG = 17, passo = 9;
        muretto(ctx, gx0 - 15, gy0 - 10, 13, H - gy0 + 10, '#c4a870', r);
        /* OGNI PEDATA HA LA SUA LARGHEZZA, e prima arrivavano tutte al bordo destro della
           tela: `fillRect(gx, gy, W - gx, 6)`. Una scala i cui gradini finiscono tutti sulla
           stessa verticale non e' una scala — sono mensole sovrapposte appese a un muro, ed e'
           ESATTAMENTE il difetto che il committente aveva segnalato su Scauri («tipo delle
           scale senza senso da sole»). Una rampa che scende di sbieco ha le pedate che si
           accorciano andando giu', perche' vanno via dall'occhio: novanta pixel in cima,
           quaranta in fondo. */
        let ky = 0;
        for (let k = 0; k < nG; k++) {
          const gx = gx0 + k * 5, gy = gy0 + k * passo;
          if (gy > H - 9) break;
          ky = gy;
          const sc = 1 - k * 0.042;                            // scendono all'ombra del ciglio
          const larg = Math.max(34, Math.round(92 - k * 3.4)); // la pedata si accorcia
          ctx.fillStyle = shade(k % 2 ? '#b8a074' : '#cdb689', sc);
          ctx.fillRect(gx, gy, larg, 6);
          ctx.fillStyle = `rgba(34,28,18,${0.32 + k * 0.020})`;  // l'alzata: è lei che fa lo scalino
          ctx.fillRect(gx, gy + 6, larg, 3);
          ctx.fillStyle = `rgba(255,236,190,${0.18 * sc})`;      // il filo di luce sullo spigolo
          ctx.fillRect(gx, gy, larg, 1);
          ctx.fillStyle = 'rgba(24,20,12,.30)';                  // il fianco della rampa, a destra
          ctx.fillRect(gx + larg, gy, 3, 9);
        }
        // il buco d'ombra dove la rampa svolta e se ne va sotto il ciglio: alto poco,
        // che tirato fino in fondo al quadro diventava una porta nera nel prato
        ctx.fillStyle = 'rgba(10,16,14,.55)';
        ctx.fillRect(gx0 - 2, ky + 9, 26, Math.min(11, Math.max(0, H - ky - 9)));
      }

    },

    cala(ctx, W, H) {
      // CALA NAVE, ore 19:05. Il sole basso e arancione, la sabbia calda sotto e
      // fresca sopra, trenta persone che fanno le cose che fa la gente al mare alle
      // sette di sera. E a venti metri LA RIGA, dove l'azzurro diventa blu e il
      // fondo non si vede più. In fondo, a sessanta metri, la boa gialla.
      const r = rng(seedOf('cala'));
      skyGradient(ctx, W, H * 0.32, '#e09a58', '#f8dcae', 10);
      skyGradient(ctx, W, H * 0.15, '#c47a68', '#e09a58', 6);
      const horiz = H * 0.32, rigaY = H * 0.48, shoreY = H * 0.68;
      // IL SOLE BASSO, a destra, appoggiato sull'acqua. L'alone era 190×130, cioè
      // 760×520 finito — più largo del quadro: lavava tutto di arancione.
      glow(ctx, W * 0.80, horiz - 4, 58, 40, '255,186,104');
      ctx.fillStyle = '#ffcc70'; pixelDisc(ctx, W * 0.80, horiz - 8, 32, 4);
      ctx.fillStyle = '#fff2c8'; pixelDisc(ctx, W * 0.80, horiz - 8, 18, 4);
      // IL MARE FUORI DALLA RIGA: blu, e sotto la posidonia non si vede niente
      sea(ctx, W, horiz, rigaY, '#1d4a72', '#2a6a94', r, 7, 0.8);
      /* la colonna del sole: trattini che si allargano venendo verso riva. Prima era
         un triangolo pieno — tre trattini per riga, larghi fino a metà dello spread,
         a opacità alta: sullo schermo diventava una scaletta di gradini regolari.
         Serve il vuoto: righe che a volte non ci sono, trattini staccati. */
      for (let y = horiz; y < shoreY - 8; y += 4) {
        const t = (y - horiz) / (shoreY - horiz);
        const spread = 14 + t * 150;
        if (r() < 0.22) continue;                      // le righe che mancano
        for (let k = 0; k < 3; k++) {
          if (r() < 0.30) continue;
          const ww = 4 + r() * spread * 0.34;
          ctx.fillStyle = `rgba(255,206,130,${(0.30 - t * 0.19) * (0.6 + r() * 0.7)})`;
          ctx.fillRect(W * 0.80 - spread / 2 + r() * (spread - ww), y, ww, 3);
        }
      }
      // LA POSIDONIA: una prateria verde scuro, mossa, che copre tutto e non
      // lascia vedere niente di quello che c'è sotto le foglie.
      for (let i = 0; i < 7; i++) {
        ctx.fillStyle = mix('#1d3b2a', '#2c5a3e', i / 6);
        ctx.fillRect(0, rigaY + 2 + i * 4, W, 5);
      }
      for (let i = 0; i < 120; i++) {
        ctx.fillStyle = `rgba(${18 + r() * 30 | 0},${50 + r() * 40 | 0},${34 + r() * 24 | 0},.5)`;
        pixelEllipse(ctx, r() * W, rigaY + 4 + r() * 26, 8 + r() * 20, 4, 3);
      }
      // LA RIGA: non è una cosa immaginaria. È un vero cambio di colore, netto.
      ctx.fillStyle = 'rgba(240,252,255,.30)'; ctx.fillRect(0, rigaY - 4, W, 3);
      ctx.fillStyle = '#123048'; ctx.fillRect(0, rigaY - 1, W, 3);
      // LA COSA FREDDA: dentro la posidonia, una radura. Un rettangolo di fondo
      // pulito, larghezza di spalle, dove le foglie sono state schiacciate — e
      // dentro la radura una sagoma lunga, ferma, più scura del verde.
      for (let i = 0; i < 22; i++) {
        ctx.fillStyle = `rgba(150,190,170,${0.14 + r() * 0.16})`;
        pixelEllipse(ctx, W * 0.26 + r() * W * 0.21, rigaY + 8 + r() * 20, 10 + r() * 16, 4, 3);
      }
      /* La sagoma dentro la radura. Era tre rettangoli a spigoli netti e sullo schermo
         leggeva come una tavola di legno affiorata — una cosa che galleggia, non una
         cosa che sta. Adesso è un profilo: più alta in cima (le spalle), che si
         assottiglia scendendo, con la testa staccata di un pixel e le foglie della
         posidonia che le passano sopra i bordi. È quel passare sopra che la mette
         SOTTO l'erba invece che addosso. Resta una sagoma e non diventa altro: qui
         non serve mostrare, serve che il giocatore non riesca a smettere di guardare. */
      {
        /* VENTISEI PIXEL, non centoquarantanove. Il metro sono i bagnanti: chi nuota a
           rigaY+52 e' alto ventitre' pixel per il metro che sporge, e alla riga della sagoma
           la scala e' 14,4 px/m — quindi un corpo di 1,75 m fa venticinque pixel. A
           centoquarantanove era lungo dieci metri, e a dieci metri non e' una sagoma: e' un
           oggetto. Una sagoma si nota perche' sta nel posto sbagliato, non perche' e' grande:
           a farla notare sono il contrasto e la radura, non la taglia. */
        const sgX = W * 0.30, sgY = rigaY + 11, sgL = 26;
        for (let dx = 0; dx < sgL; dx += 2) {
          const t = dx / sgL;
          const sp = 7 * (1 - t * 0.62) * (t < 0.10 ? 0.55 + t * 4.5 : 1);   // spalle, poi si assottiglia
          ctx.fillStyle = `rgba(3,12,18,${0.70 - t * 0.22})`;
          ctx.fillRect((sgX + dx) | 0, (sgY + (13 - sp) / 2) | 0, 2, Math.max(2, sp) | 0);
        }
        ctx.fillStyle = 'rgba(3,12,18,.62)';                                  // la testa, staccata
        pixelEllipse(ctx, sgX - 7, sgY + 6, 6, 5, 2);
        for (let i = 0; i < 14; i++) {                                        // le foglie che le passano sopra
          ctx.fillStyle = `rgba(${24 + r() * 26 | 0},${58 + r() * 34 | 0},${40 + r() * 20 | 0},.42)`;
          pixelEllipse(ctx, sgX - 10 + r() * (sgL + 22), sgY + 1 + r() * 13, 7 + r() * 12, 3, 3);
        }
      }
      // l'acqua dentro la riga: trasparente, coi sassi bianchi che si vedono uno
      // per uno, e la sabbia che si accende di sole basso
      sea(ctx, W, rigaY + 30, shoreY, '#84d8cc', '#3e9aae', r, 8, 1.0);
      ctx.fillStyle = 'rgba(70,90,80,.30)';
      for (let i = 0; i < 130; i++) pixelEllipse(ctx, r() * W, rigaY + 34 + r() * (shoreY - rigaY - 38), 4 + r() * 6, 3, 3);
      ctx.fillStyle = 'rgba(255,214,150,.12)'; ctx.fillRect(0, rigaY + 30, W, shoreY - rigaY - 30);
      /* LO SCOGLIO DELLA NAVE, a destra, oltre la riga: è quello che dà il nome alla
         baia. Prua bassa, fianco lungo, la cintura nera delle patelle sul pelo
         dell'acqua e due gabbiani sopra. Nel quadro non c'era, e senza di lui questa
         non era Cala Nave: era una cala qualunque. */
      const scX = W * 0.175, scY = rigaY + 4;
      ctx.fillStyle = 'rgba(10,28,38,.45)'; pixelEllipse(ctx, scX, scY + 9, 50, 8, 3);
      for (let dx = -48; dx < 50; dx += 3) {
        const t = dx / 48;
        // profilo asimmetrico: la prua a sinistra è più bassa, la poppa più alta
        const hh = 26 * Math.pow(Math.max(0, 1 - t * t), 0.46) * (t < 0 ? 0.70 : 1.0) + Math.sin(dx * 0.09) * 2;
        ctx.fillStyle = '#a9997a';
        ctx.fillRect(scX + dx, scY - hh, 3, hh + 6);
        ctx.fillStyle = 'rgba(255,206,150,.30)';                      // il sole basso sul fianco
        ctx.fillRect(scX + dx, scY - hh, 3, 2);
        if (dx % 9 === 0) { ctx.fillStyle = 'rgba(46,36,26,.55)'; ctx.fillRect(scX + dx, scY + 2, 3, 4); }  // patelle
      }
      ctx.fillStyle = '#e8e4dc'; ctx.fillRect(scX - 10, scY - 29, 3, 2); ctx.fillRect(scX + 13, scY - 25, 3, 2);   // due gabbiani

      // LA BOA GIALLA, a sessanta metri, appena oltre la riga: calda di sole e
      // scivolosa di alghe
      /* Ridimensionata il 23 agosto 2026 su segnalazione del committente: «va bene
         vederla, ma è molto molto grande». Aveva ragione, e si misura. Il metro di
         paragone sono le persone: chi sta in acqua a rigaY+52 è alto una trentina di
         pixel. La boa sta OLTRE la riga, quindi più lontano, quindi il suo uomo lì
         sarebbe alto venti pixel — e una boa da segnalazione è larga settanta
         centimetri, cioè meno di mezza persona. Nove pixel, non trenta. Prima era
         larga come il torso di chi le nuotava accanto: una boa da nave in mezzo ai
         bagnanti. Il palo era alto sedici pixel, quasi un uomo. */
      const boaX = W * 0.56;
      ctx.fillStyle = 'rgba(14,32,42,.5)'; pixelEllipse(ctx, boaX, rigaY + 3, 7, 3, 2);
      ctx.fillStyle = '#3a3a40'; ctx.fillRect(boaX - 1, rigaY - 15, 2, 7);
      ctx.fillStyle = '#e8c030'; pixelDisc(ctx, boaX, rigaY - 5, 5, 2);
      ctx.fillStyle = '#f8e478'; pixelDisc(ctx, boaX, rigaY - 7, 3, 2);
      ctx.fillStyle = '#6a5a14'; ctx.fillRect(boaX - 5, rigaY - 3, 11, 2);      // le alghe alla base
      // LA GENTE, alle sette di sera: in acqua fino alla vita, sul bagnasciuga,
      // e uno che nuota lentissimo e perfetto parallelo alla riva
      const gente = [
        [0.09, shoreY + 16, 1.0], [0.14, shoreY + 22, 1.05], [0.22, shoreY + 6, 0.95],
        [0.35, rigaY + 52, 0.80], [0.41, rigaY + 60, 0.82], [0.66, rigaY + 66, 0.85],
        [0.72, shoreY + 10, 1.0], [0.91, shoreY + 18, 1.0],
      ];
      /* Rifatte il 23 agosto 2026: erano un rettangolo colorato con un quadrato color
         pelle sopra, e sullo schermo leggevano come colonnine — otto idranti sulla
         battigia. Bastano tre cose perché una macchia diventi una persona: le SPALLE
         più larghe del collo, le GAMBE separate (chi è fuori dall'acqua), e le
         BRACCIA staccate dal tronco. Nessuna faccia: a questa scala una faccia
         diventa una smorfia. Conta perché è l'unica scena del gioco con la gente che
         fa le cose normali, e la sagoma nell'erba pesa quanto pesano loro. */
      for (const [fx, by, s] of gente) {
        const bx = W * fx;
        const inAcqua = by < shoreY;
        const hTor = (inAcqua ? 15 : 19) * s, wTor = 9 * s;
        const torY = by - (inAcqua ? 18 : 30) * s;
        ctx.fillStyle = 'rgba(20,40,50,.24)'; ctx.fillRect(bx - 6 * s, by - 2, 13 * s, 4);
        const col = ['#2a4a5a', '#7a3a4a', '#3a5a3a', '#5a4a6a'][(fx * 100 | 0) % 4];
        if (!inAcqua) {                                    // le gambe, separate
          ctx.fillStyle = shade(col, 0.72);
          ctx.fillRect(bx - 4 * s, torY + hTor, 3 * s, 11 * s);
          ctx.fillRect(bx + 1 * s, torY + hTor, 3 * s, 11 * s);
        }
        ctx.fillStyle = col;
        ctx.fillRect(bx - wTor / 2, torY, wTor, hTor + (inAcqua ? 3 * s : 0));
        ctx.fillStyle = shade(col, 0.82);                  // le braccia lungo i fianchi
        ctx.fillRect(bx - wTor / 2 - 2 * s, torY + 2 * s, 2 * s, (inAcqua ? 8 : 11) * s);
        ctx.fillRect(bx + wTor / 2, torY + 2 * s, 2 * s, (inAcqua ? 8 : 11) * s);
        ctx.fillStyle = '#d8b090';                         // il collo, poi la testa più stretta
        ctx.fillRect(bx - 2 * s, torY - 3 * s, 4 * s, 3 * s);
        ctx.fillRect(bx - 3 * s, torY - 10 * s, 6 * s, 7 * s);
        ctx.fillStyle = '#3a2a20'; ctx.fillRect(bx - 3 * s, torY - 11 * s, 6 * s, 4 * s);
      }
      // il signore che nuota parallelo alla riva da quarant'anni
      ctx.fillStyle = '#d8b090'; pixelEllipse(ctx, W * 0.49, rigaY + 44, 9, 5, 3);
      ctx.fillStyle = 'rgba(255,255,255,.44)'; pixelEllipse(ctx, W * 0.49, rigaY + 48, 22, 4, 3);
      ctx.fillStyle = 'rgba(255,255,255,.30)'; ctx.fillRect(W * 0.505, rigaY + 40, 16, 4);
      // LA RIVA: profilo irregolare di sabbia bagnata, e la schiuma piccola
      for (let x = 0; x < W; x += 12) {
        const off = Math.round((r() - 0.5) * 7);
        ctx.fillStyle = '#4a423c'; ctx.fillRect(x, shoreY + off, 12, 10);   // sabbia bagnata: scura, vulcanica
        ctx.fillStyle = 'rgba(255,255,250,.42)'; ctx.fillRect(x, shoreY + off - 4, 12, 4);
      }
      // LA SABBIA, calda di sole basso
      ground(ctx, W, H, shoreY + 10, '#6b6055', r, 12, 9);
      ctx.fillStyle = 'rgba(255,186,104,.16)'; ctx.fillRect(0, shoreY + 10, W, H - shoreY - 10);
      /* I SASSOLINI: Cala Nave è sabbia vulcanica scura mescolata a ghiaia, ed è la
         prima cosa che si sente sotto i piedi nudi. Senza, la spiaggia sembrava
         quella dorata di un altro mare. */
      for (let i = 0; i < 260; i++) {
        const sx = r() * W, sy = shoreY + 12 + r() * (H - shoreY - 14);
        const c = r();
        ctx.fillStyle = c > 0.72 ? 'rgba(212,198,180,.55)' : (c > 0.4 ? 'rgba(150,138,124,.5)' : 'rgba(58,50,44,.55)');
        ctx.fillRect(sx | 0, sy | 0, 2 + (r() > 0.8 ? 1 : 0), 2);
      }
      ctx.fillStyle = 'rgba(120,96,60,.22)';
      for (let i = 0; i < 60; i++) ctx.fillRect(r() * W | 0, shoreY + 18 + r() * (H - shoreY - 22) | 0, 3, 2);
      // GLI OMBRELLONI, piantati nella sabbia a profondità diverse: due aperti e
      // uno già chiuso per la sera
      /* Scale ridotte con lo stesso metro della boa: la calotta era larga 124 px dove
           una persona alla stessa distanza è alta 50 — quattro metri di ombrellone.
           Un ombrellone da spiaggia è due metri di diametro e due e venti di altezza,
           cioè poco più alto di chi ci sta sotto, non il doppio. */
        for (const [fx, fy, sc, open] of [[0.14, 0.30, 0.50, true], [0.40, 0.72, 0.64, true], [0.60, 0.34, 0.47, false]]) {
        const ux = W * fx, uy = shoreY + 12 + (H - shoreY - 12) * fy;
        ctx.fillStyle = 'rgba(90,70,44,.26)'; pixelEllipse(ctx, ux, uy, 34 * sc, 6 * sc, 3);
        /* IL PALO A 145*sc E NON A 66. Un ombrellone da spiaggia e' due metri di diametro e
           due e venti di ALTEZZA: se il palo e' 66 e la calotta e' larga 124, l'altezza
           totale sta sotto la larghezza e sullo schermo viene un FUNGO. Con 145 l'altezza
           supera la larghezza e diventa un ombrellone. */
        ctx.fillStyle = '#8a7a5a'; ctx.fillRect(ux - 3, uy - 145 * sc, 7, 145 * sc);
        if (open) {
          // LA CALOTTA come una cupola vera: righe orizzontali che si accorciano
          // salendo, e poi gli spicchi a spicchi alterni sopra
          const R = 62 * sc, Hd = 26 * sc, cy = uy - 147 * sc;
          for (let dy = -Hd; dy <= 4; dy += 3) {
            const hw = R * Math.sqrt(Math.max(0, 1 - Math.pow(dy / Hd, 2)));
            ctx.fillStyle = '#e8e4d6'; ctx.fillRect(ux - hw, cy + dy, hw * 2, 4);
          }
          for (let k = 0; k < 8; k += 2) {
            const u0 = k / 8 * 2 - 1, u1 = (k + 1) / 8 * 2 - 1;
            for (let dy = -Hd; dy <= 4; dy += 3) {
              const hw = R * Math.sqrt(Math.max(0, 1 - Math.pow(dy / Hd, 2)));
              const x0 = ux + u0 * hw, x1 = ux + u1 * hw;
              ctx.fillStyle = '#3a8a9a'; ctx.fillRect(x0, cy + dy, x1 - x0, 4);
            }
          }
          ctx.fillStyle = 'rgba(90,70,44,.26)';
          for (let dy = 0; dy <= 6; dy += 3) {
            const hw = R * Math.sqrt(Math.max(0, 1 - Math.pow(dy / Hd, 2)));
            ctx.fillRect(ux - hw, cy + dy, hw * 2, 4);
          }
          ctx.fillStyle = '#8a7a5a'; ctx.fillRect(ux - 3, cy - Hd - 8, 7, 14 * sc);
        } else {
          ctx.fillStyle = '#3a8a9a'; ctx.fillRect(ux - 7, uy - 163 * sc, 15, 22 * sc);
          ctx.fillStyle = '#f0ece0'; ctx.fillRect(ux - 4, uy - 167 * sc, 9, 8 * sc);
        }
      }
      // le tracce di piedi che vanno verso l'acqua, e i castelli mezzi crollati
      ctx.fillStyle = 'rgba(140,112,68,.30)';
      for (let i = 0; i < 9; i++) {
        const t = i / 9;
        ctx.fillRect(W * 0.48 + t * W * 0.03, H - 8 - t * (H - shoreY - 16), 9, 5);
      }
      ctx.fillStyle = '#c8ac7a'; pixelEllipse(ctx, W * 0.30, H - 22, 20, 9, 3);
      ctx.fillStyle = '#d8bc8a'; ctx.fillRect(W * 0.295, H - 38, 14, 16);
      ctx.fillStyle = '#e0c894'; ctx.fillRect(W * 0.293, H - 42, 18, 5);
      // il telo, il vestito PIEGATO con calma, e le due maschere identiche
      ctx.fillStyle = '#4a7a9a'; ctx.fillRect(W * 0.72, H - 52, 128, 40);
      ctx.fillStyle = '#5e92b2'; ctx.fillRect(W * 0.72, H - 52, 128, 6);
      ctx.fillStyle = 'rgba(30,50,70,.30)'; ctx.fillRect(W * 0.72, H - 18, 128, 6);
      ctx.fillStyle = '#e8dcc8'; ctx.fillRect(W * 0.735, H - 46, 52, 18);
      ctx.fillStyle = '#d8ccb4'; ctx.fillRect(W * 0.735, H - 46, 52, 5);
      ctx.fillStyle = '#c8bca4'; ctx.fillRect(W * 0.735, H - 34, 52, 3);
      for (let i = 0; i < 2; i++) {
        const mx = W * 0.88 + i * 40;
        ctx.fillStyle = '#2a3a48'; pixelEllipse(ctx, mx, H - 26, 16, 11, 3);
        ctx.fillStyle = '#a8dcea'; pixelEllipse(ctx, mx, H - 27, 11, 7, 3);
        ctx.fillStyle = '#1a2530'; ctx.fillRect(mx - 19, H - 30, 8, 4);
      }
      // gli scogli a destra della cala, dove l'acqua è alta un metro e mezzo e
      // piena di roba: castagnole, saraghi, e un polpo che non si sposta
      for (const [fx, s2] of [[0.985, 60], [0.945, 40], [0.92, 26]]) {
        blocks(ctx, W * fx - s2 / 2, shoreY - s2 * 0.7, s2, s2 * 1.5, '#9a8a6a', 9, r, 0.22);
        ctx.fillStyle = 'rgba(255,214,150,.20)'; ctx.fillRect(W * fx - s2 / 2, shoreY - s2 * 0.7, s2, 4);
      }
    },

    terrazza(ctx, W, H) {
      // LA TERRAZZA DELLE PARRACINE, mezzanotte e quaranta. Il paese sotto quasi
      // spento, il mare una lastra nera, Santo Stefano a tre chilometri che non è
      // più un ferro di cavallo: è solo una gobba scura. E più stelle del necessario.
      const r = rng(seedOf('terrazza'));
      skyGradient(ctx, W, H * 0.46, '#050a14', '#152238', 12);
      stars(ctx, W, H * 0.44, r, 110);
      const horiz = H * 0.46, murettoY = H * 0.74;
      /* L'ISOLA CHE SCENDE VERSO IL PORTO, tutta di luci gialle. Era un
         rettangolo che finiva di taglio a W*0.62: una costa non si chiude con
         un taglio verticale, e quello era il bordo più netto del quadro. Ora è
         un profilo — il crinale che scende da destra verso il porto e poi
         l'ultimo promontorio che entra in acqua. */
      const cresta = x => {
        const u = x / (W * 0.66);
        return H * 0.335 + Math.sin(u * 2.6) * H * 0.020 + u * u * H * 0.075;
      };
      for (let x = 0; x < W * 0.66; x += 3) {
        const cy0 = cresta(x) + (r() - 0.5) * 4;
        if (cy0 > murettoY - 4) break;
        blocks(ctx, x, cy0, 3, murettoY - cy0, '#0c1218', 14, r, 0.10);
        ctx.fillStyle = 'rgba(28,38,50,.30)'; ctx.fillRect(x, cy0, 3, 2);   // il filo del crinale
      }
      for (let i = 0; i < 90; i++) {
        const t = r();
        const lx = r() * W * 0.60;
        const ly = H * 0.40 + t * (murettoY - H * 0.42);
        ctx.fillStyle = r() > 0.82 ? '#fff0c0' : (r() > 0.4 ? '#e8b860' : '#c89848');
        ctx.fillRect(lx | 0, ly | 0, 2, 2);
      }
      // il grumo di luce del porto, in fondo a sinistra, e i lampioni della salita
      glow(ctx, W * 0.14, murettoY - 26, 74, 30, '226,180,96');   // era 150×70 = 600×280 finito: mezzo quadro
      for (let i = 0; i < 6; i++) {
        const lx = W * 0.30 + i * 26, ly = H * 0.50 + i * 22;
        if (ly > murettoY - 8) break;
        glow(ctx, lx, ly, 26, 18, '232,192,110');
        ctx.fillStyle = '#f0d078'; ctx.fillRect(lx - 2, ly - 2, 5, 4);
      }
      /* LA COSTA NAPOLETANA, all'orizzonte: da questa terrazza si vede il golfo — Ischia,
         Procida, e in fondo il Vesuvio. Di notte non si vedono le sagome: si vedono le
         LUCI, una riga bassissima e interrotta, con un grumo più fitto dove sta Ischia.
         Sessanta chilometri di golfo da una sedia di plastica. Nel quadro non c'erano. */
      for (let i = 0; i < 120; i++) {
        const lx = r() * W * 0.80;
        const ly = horiz - 1 - (r() > 0.85 ? 1 : 0);
        ctx.fillStyle = `rgba(226,196,140,${0.10 + r() * 0.16})`;
        ctx.fillRect(lx | 0, ly | 0, 1 + (r() > 0.9 ? 1 : 0), 1);
      }
      // Ischia: il grumo più fitto, e il suo alone appena accennato
      glow(ctx, W * 0.24, horiz - 2, 28, 6, '226,196,140');       // Ischia sta a quaranta chilometri
      for (let i = 0; i < 34; i++) {
        ctx.fillStyle = `rgba(240,214,160,${0.14 + r() * 0.20})`;
        ctx.fillRect((W * 0.24 + (r() - 0.5) * 78) | 0, (horiz - 1 - r() * 2) | 0, 1, 1);
      }
      // il Vesuvio: una gobba bassissima e senza luci, appena più scura del cielo
      for (let dx = -34; dx < 34; dx += 2) {
        const hh = 5 * Math.pow(Math.max(0, 1 - (dx / 34) ** 2), 0.5);
        ctx.fillStyle = 'rgba(10,16,28,.55)';
        ctx.fillRect((W * 0.52 + dx) | 0, (horiz - hh) | 0, 2, hh + 1);
      }

      // IL MARE: una lastra nera che si muove appena
      sea(ctx, W, horiz, murettoY, '#040810', '#0a1220', r, 8, 0.2);
      // SANTO STEFANO: una gobba scura contro il cielo, senza una luce
      santoStefanoLontano(ctx, W * 0.80, horiz + 4, W * 0.17, H * 0.075, '#070c12', '#0c141c');
      // LA COSA FREDDA: in mezzo al campo di luci gialle, una luce che non è
      // gialla — è bianco-azzurra, ed è SOTTO la linea dell'acqua.
      const cx = W * 0.66, cy = horiz + H * 0.10;
      for (let y = cy - 10; y < cy + H * 0.16; y += 3) {
        const t = (y - (cy - 10)) / (H * 0.16 + 10);
        const larg = 6 + t * 40;
        const n = 2 + (r() * 3 | 0);
        for (let k = 0; k < n; k++) {
          const ww = 2 + r() * larg * 0.5;
          const off = (r() - 0.5) * (larg - ww) * 1.4;
          ctx.fillStyle = `rgba(158,202,220,${(0.13 - t * 0.105) * (0.5 + r() * 0.8)})`;
          ctx.fillRect((cx + off) | 0, y | 0, ww | 0, 2);
        }
      }
      ctx.fillStyle = 'rgba(196,228,240,.20)'; ctx.fillRect((cx - 3) | 0, (cy - 12) | 0, 6, 2);
      ctx.fillStyle = 'rgba(196,228,240,.12)'; ctx.fillRect((cx + 3) | 0, (cy - 8) | 0, 4, 2);
      /* IL PAVIMENTO E IL PARAPETTO, che prima erano la stessa cosa. Il muretto occupava
         tutti i novantaquattro pixel di primo piano — il 26% del quadro — con luminanza 100
         contro un cielo a 18 e un mare a 12: otto volte piu' luminoso di tutto il resto, e
         senza nessuna sorgente nell'inquadratura che lo illuminasse. E soprattutto la
         terrazza non aveva un PAVIMENTO: il tavolino e le sedie stavano coi piedi a y=262 e
         il muretto cominciava a 266, cioe' i mobili erano in equilibrio sul filo del
         parapetto. Adesso sono due piani: il basolato in scorcio davanti (giunti trasversali
         che si allargano venendo avanti, perche' e' un piano orizzontale) e il parapetto
         solo dove sta un parapetto. */
      const pavY = Math.round(H * 0.835);
      muretto(ctx, 0, murettoY, W, pavY - murettoY, '#241f16', r);
      ctx.fillStyle = 'rgba(255,230,170,.03)'; ctx.fillRect(0, murettoY, W, 3);
      ctx.fillStyle = '#2a251c'; ctx.fillRect(0, pavY, W, H - pavY);
      for (let y = pavY, passo = 9; y < H; y += passo, passo += 2) {
        ctx.fillStyle = 'rgba(14,12,9,.55)'; ctx.fillRect(0, y, W, 2);
      }
      ctx.fillStyle = 'rgba(120,104,74,.10)'; ctx.fillRect(0, pavY, W, 2);
      /* il filo del coronamento: due pixel piu' chiari sul bordo di sopra del parapetto.
         Senza, parapetto e pavimento sono due marroni scuri attaccati e l'occhio non
         capisce dove finisce il piano su cui si sta e dove comincia quello che ti tiene. */
      ctx.fillStyle = 'rgba(168,150,112,.22)'; ctx.fillRect(0, murettoY, W, 2);
      ctx.fillStyle = 'rgba(10,8,6,.50)'; ctx.fillRect(0, pavY - 2, W, 2);

      /* LA LAMPADA SOPRA LA PORTA DELLE PARRACINE, che sta DIETRO la macchina.
         Questo quadro aveva il 99% dei pixel sotto la luminanza 42: su un
         telefono in mano, di sera, era un rettangolo nero con qualche puntino.
         E la cura non è schiarire tutto — il mare deve restare una lastra
         nera, il buio è il soggetto — ma mettere l'unica luce che a mezzanotte
         e quaranta su quella terrazza c'è davvero: la lampadina sopra la porta
         del B&B, alle spalle di chi guarda. Illumina il pavimento, il tavolino
         e la faccia del parapetto, e non arriva a un metro d'acqua.
         Costa poco e vale doppio: il chiaro davanti fa il nero più nero, e le
         ombre del tavolo e delle sedie vengono verso il mare — cioè dicono che
         la luce è dietro di te, che è una cosa che non si guarda. */
      const luceX = W * 0.34;
      for (let y = pavY; y < H; y += 2) {
        const t = (y - pavY) / (H - pavY);
        for (let x = 0; x < W; x += 8) {
          const d = Math.abs(x - luceX) / W;
          const a = (0.05 + t * 0.26) * Math.max(0, 1 - d * 1.6);
          if (a <= 0.004) continue;
          ctx.fillStyle = `rgba(252,214,148,${a.toFixed(3)})`;
          ctx.fillRect(x, y, 8, 2);
        }
      }
      // la faccia del parapetto la prende di rimbalzo, e sempre meno salendo
      for (let y = murettoY + 2; y < pavY; y += 2) {
        const t = 1 - (y - murettoY) / (pavY - murettoY);
        const a = (0.02 + (1 - t) * 0.10) * 1;
        ctx.fillStyle = `rgba(246,206,142,${a.toFixed(3)})`;
        ctx.fillRect(0, y, W, 2);
      }
      ctx.fillStyle = 'rgba(255,226,168,.20)'; ctx.fillRect(0, murettoY, W, 2);   // il coronamento
      /* LE OMBRE dei mobili: la luce è dietro e in alto, quindi vanno verso il
         mare (su nel quadro) e si allargano allontanandosi. Tre ombre lunghe
         che arrivano al muretto: è la cosa che rende un pavimento un posto. */
      for (const ox of [W * 0.165, W * 0.30, W * 0.435]) {   // sotto le due sedie e il tavolo
        for (let y = H - 6; y > murettoY + 4; y -= 2) {
          const t = (H - 6 - y) / (H - 6 - murettoY);
          const larg = 12 + t * 34;
          const dx = (ox - luceX) * t * 0.55;
          ctx.fillStyle = `rgba(8,6,4,${(0.44 * (1 - t * 0.75)).toFixed(3)})`;
          ctx.fillRect((ox + dx - larg / 2) | 0, y, larg | 0, 2);
        }
      }
      /* IL GAZEBO DI CANNE: sulla terrazza solarium la colazione si fa qui sotto, e di
         notte le canne tagliano il cielo in strisce sopra la testa. Dà il soffitto a
         un'inquadratura che prima era tutta cielo aperto. */
      for (let i = 0; i < 5; i++) {
        const gy = 2 + i * 5;
        ctx.fillStyle = `rgba(38,30,20,${0.40 - i * 0.055})`;
        ctx.fillRect(0, gy, W, 2);
      }
      for (let gx = 8; gx < W; gx += 30) {
        ctx.fillStyle = 'rgba(46,36,24,.30)';
        ctx.fillRect(gx, 0, 3, 24);
      }
      ctx.fillStyle = 'rgba(58,46,30,.42)'; ctx.fillRect(0, 24, W, 2);

      /* IL TAVOLINO e LE DUE SEDIE DI PLASTICA. Prima erano «in controluce»:
         tre grigi bluastri fra 26 e 44 di luminanza, cioè invisibili. Ma la
         luce sta dietro la macchina, quindi le facce rivolte a noi la prendono
         e i PIANI DI SOPRA la prendono in pieno: è il tavolino l'oggetto che
         dice cos'è questo posto. */
      /* E le quote vengono da UNA scala sola. Il misuratore dei soggetti diceva
         che in questo quadro nessun oggetto arrivava a cento pixel di lato: un
         tavolino da 60 px e due sedie da 68 in PRIMO PIANO, a un metro e mezzo
         dall'occhio, mentre il parapetto dietro ne faceva 34 per un metro e
         cinque. Alla distanza del tavolino un metro fa 122 pixel, e allora un
         tavolo di plastica (72 cm d'altezza, 80 di lato) è 88x98, e una sedia
         (85 cm) è alta 104. Le spalliere passano sopra il filo del parapetto e
         si stagliano sul mare nero: è così che si vede che sono sedie. */
      const M = 122;                          // pixel per metro, alla distanza del tavolino
      const tx = W * 0.30, ty = H - 16;       // i piedi sul PAVIMENTO, non sul filo del parapetto
      // le due sedie prima del tavolo: il tavolo è più vicino e le copre
      for (const sfx of [-0.135, 0.135]) {
        const sx = tx + W * sfx, sedu = ty - Math.round(0.36 * M), spal = ty - Math.round(0.85 * M);
        ctx.fillStyle = '#413a30';
        ctx.fillRect(sx - 24, sedu, 48, 7);                                 // la seduta
        ctx.fillRect(sx - 22, spal, 44, 8);                                 // il tratto alto della spalliera
        ctx.fillRect(sx + (sfx < 0 ? -22 : 16), spal, 7, sedu - spal);      // il montante in luce
        ctx.fillStyle = '#312b23';
        ctx.fillRect(sx + (sfx < 0 ? 16 : -22), spal + 4, 6, sedu - spal);  // e quello in ombra
        ctx.fillRect(sx - 20, ty - 8, 7, 8); ctx.fillRect(sx + 13, ty - 8, 7, 8);
        ctx.fillStyle = '#665c4a';                                          // i bordi di sopra
        ctx.fillRect(sx - 24, sedu, 48, 2); ctx.fillRect(sx - 22, spal, 44, 2);
        ctx.fillStyle = '#2a251e';                                          // le gambe
        ctx.fillRect(sx - 20, sedu + 7, 7, ty - sedu - 7);
        ctx.fillRect(sx + 13, sedu + 7, 7, ty - sedu - 7);
      }
      const tTop = ty - Math.round(0.72 * M), tSemi = Math.round(0.40 * M);
      ctx.fillStyle = '#4a4034'; ctx.fillRect(tx - tSemi, tTop, tSemi * 2, 9);   // il piano
      ctx.fillStyle = '#6e5f48'; ctx.fillRect(tx - tSemi, tTop, tSemi * 2, 3);   // la luce sopra il piano
      ctx.fillStyle = '#332c24'; ctx.fillRect(tx - tSemi, tTop + 9, tSemi * 2, 4);
      ctx.fillRect(tx - 6, tTop + 13, 13, ty - tTop - 13);                       // il fusto centrale
      ctx.fillRect(tx - 26, ty - 6, 55, 6);                                      // e la base a croce
      ctx.fillStyle = '#8e8878'; ctx.fillRect(tx - 30, tTop - 15, 10, 15);       // due bicchieri, 12 cm
      ctx.fillRect(tx + 14, tTop - 14, 9, 14);
      ctx.fillStyle = '#d8cfb4';                                                // il filo di luce sull'orlo
      ctx.fillRect(tx - 30, tTop - 15, 10, 3); ctx.fillRect(tx + 14, tTop - 14, 9, 3);
      ctx.fillStyle = '#6a6252'; ctx.fillRect(tx - 12, tTop - 17, 24, 17);      // il sacchetto dei taralli
      ctx.fillStyle = '#8a8070'; ctx.fillRect(tx - 12, tTop - 17, 24, 3);
      // il vaso dei limoni, a destra: mezzo metro d'acqua quaranta metri sopra il mare
      ctx.fillStyle = '#5a4230'; ctx.fillRect(W * 0.80, H - 34, 40, 30);
      ctx.fillStyle = '#6e523c'; ctx.fillRect(W * 0.80, H - 34, 40, 2);
      ctx.fillStyle = '#0e1418'; ctx.fillRect(W * 0.803, H - 32, 34, 6);
      ctx.fillStyle = 'rgba(150,196,214,.14)'; ctx.fillRect(W * 0.803, H - 32, 34, 3);
      ctx.fillStyle = '#1a2a1e';
      for (const [ox, oy] of [[8, -56], [26, -52], [17, -66]]) pixelEllipse(ctx, W * 0.80 + ox, H + oy, 14, 9, 3);
      ctx.fillStyle = '#6a5a20'; pixelDisc(ctx, W * 0.80 + 12, murettoY - 50, 4, 3);
      // il cavetto del microfono che scende oltre il muretto
      ctx.fillStyle = '#2a2e34';
      for (let i = 0; i < 9; i++) ctx.fillRect(W * 0.52 + i * 2, murettoY - 30 + i * 5, 2, 6);

    },


    cisterna(ctx, W, H) {
      // LA CISTERNA VISITABILE. Una navata scavata nel tufo, trenta metri per otto,
      // volta a botte, i pilastri lasciati in piedi ogni sei metri, il cocciopesto
      // rosa fino a un metro e mezzo, due dita d'acqua sul fondo e UNA lampada del
      // Comune. Tredici gradi: il tufo è caldo di colore e la luce è fredda.
      const r = rng(seedOf('cisterna'));
      const floorY = H * 0.76;
      blocks(ctx, 0, 0, W, H, '#8a7250', 14, r, 0.10);
      // LA VOLTA A BOTTE: l'intradosso, con i solchi degli scalpelli che seguono
      // la curva. Chiara al centro, che è dove arriva la lampada.
      for (let i = 0; i < 9; i++) {
        const t = i / 9;
        ctx.fillStyle = shadeHex('#9a8158', 1.02 - t * 0.44);
        arco(ctx, W * 0.5, H * (0.30 - t * 0.012), W * 0.56, H * (0.30 - t * 0.028), 12, shadeHex('#9a8158', 1.02 - t * 0.40), r, 6);
      }
      for (let i = 0; i < 12; i++) {
        arco(ctx, W * 0.5, H * 0.30 - i * 2.2, W * 0.56 - i * 3, H * 0.29 - i * 2.4, 2, '#6a5836', r, 8);
      }
      // le pareti laterali di tufo, coi segni degli scalpelli orizzontali
      for (const side of [0, 1]) {
        const x = side ? W * 0.80 : 0, w = W * 0.20;
        blocks(ctx, x, H * 0.20, w, floorY - H * 0.20, '#8a7250', 10, r, 0.14);
        for (let y = H * 0.24; y < floorY; y += 15) {
          ctx.fillStyle = 'rgba(70,54,30,.24)'; ctx.fillRect(x, y, w, 2);
        }
      }
      // IL FONDO DELLA NAVATA: trenta metri finiscono nel buio, non in un muro.
      // Un imbuto di fasce che si stringono e si spengono verso il centro.
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = mix('#6a5636', '#07070a', Math.pow(i / 7, 0.7));
        const hw = W * (0.19 - i * 0.021);
        ctx.fillRect(W * 0.5 - hw, H * (0.31 + i * 0.014), hw * 2, floorY - H * (0.31 + i * 0.014));
      }
      // I PILASTRI ogni sei metri, quattro per lato, in prospettiva. Chiari sul
      // lato della lampada, neri sull'altro: sono loro a fare le ombre lunghe.
      for (let i = 3; i >= 0; i--) {
        const t = i / 4;
        const pw = W * 0.085 * (1 - t * 0.52), ph = (floorY - H * 0.30) * (1 - t * 0.26);
        for (const side of [0, 1]) {
          const px = side ? W * (0.80 - t * 0.26) - pw : W * (0.04 + t * 0.26);
          const py = floorY - ph;
          blocks(ctx, px, py, pw, ph, shadeHex('#a08658', 1 - t * 0.26), 8, r, 0.14);
          // il lato in ombra del pilastro (la lampada sta a sinistra e in alto)
          ctx.fillStyle = 'rgba(20,14,6,.42)'; ctx.fillRect(px + pw * 0.6, py, pw * 0.4, ph);
          ctx.fillStyle = 'rgba(255,226,170,.14)'; ctx.fillRect(px, py, pw * 0.3, ph);
          // il cocciopesto sale anche sui pilastri: un metro e mezzo, poi la linea
          cocciopesto(ctx, px, floorY - 52 * (1 - t * 0.34), pw, 52 * (1 - t * 0.34), r,
                      shadeHex('#c07a68', 1 - t * 0.22));
        }
      }
      // IL COCCIOPESTO ROSA sulle pareti: fino a un metro e mezzo, linea netta,
      // liscio come una vasca da bagno. Con l'unghia non lo scalfisci.
      for (const side of [0, 1]) {
        const x = side ? W * 0.78 : 0, w = W * 0.22;
        cocciopesto(ctx, x, floorY - 70, w, 70, r);
        ctx.fillStyle = 'rgba(255,214,196,.14)'; ctx.fillRect(x, floorY - 64, w, 30);
      }
      // L'ACQUA: due dita sul fondo, che nessuno ha messo lì. Riflette la volta.
      blocks(ctx, 0, floorY, W, H - floorY, '#5e4c32', 12, r, 0.10);
      ctx.fillStyle = 'rgba(24,34,42,.44)'; ctx.fillRect(0, floorY, W, H - floorY);
      // le onde del riflesso si allargano venendo avanti: a passo fisso una
      // superficie d'acqua legge come una tapparella sdraiata
      ctx.fillStyle = 'rgba(190,160,120,.20)';
      for (let y = floorY + 3, p = 3; y < H; p *= 1.42, y += p) ctx.fillRect(0, y, W, Math.max(2, p * 0.5 | 0));
      ctx.fillStyle = 'rgba(232,244,250,.16)';
      for (let i = 0; i < 30; i++) ctx.fillRect(r() * W | 0, floorY + r() * (H - floorY) | 0, 10 + r() * 18 | 0, 2);
      // le OMBRE DEI PILASTRI sull'acqua: partono dalla lampada e sono lunghe
      // dodici metri, e si allargano
      ctx.fillStyle = 'rgba(10,10,14,.34)';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(W * (0.10 + i * 0.24), floorY, W * 0.05 + i * 14, H - floorY);
      }
      // LA LAMPADA DEL COMUNE: una sola, in gabbia, appesa a un cavo
      const lx = W * 0.26, ly = H * 0.17;
      ctx.fillStyle = '#3a2e1c'; ctx.fillRect(lx - 1, 0, 3, ly);
      // una lampadina in gabbia illumina molto, ma 170×130 vuol dire 680×520 finito:
      // più del canvas, cioè cisterna in pieno giorno
      glow(ctx, lx, ly + 10, 100, 50, '255,214,140');
      glow(ctx, lx, ly + 10, 50, 28, '255,232,180');
      glow(ctx, lx, ly + 10, 22, 14, '255,244,214');
      ctx.fillStyle = '#4a4030'; ctx.fillRect(lx - 11, ly, 23, 6);
      ctx.fillStyle = '#fff0c8'; pixelDisc(ctx, lx, ly + 11, 10, 3);
      ctx.fillStyle = '#4a4438';
      for (let k = -2; k < 3; k++) ctx.fillRect(lx + k * 6, ly + 3, 2, 18);
      // il cerchio di luce che la lampada butta sull'acqua, sotto di sé
      for (let k = 3; k >= 1; k--) {
        ctx.fillStyle = `rgba(255,220,150,${0.05 * k})`;
        pixelEllipse(ctx, lx, floorY + 20, 60 * k, 14 * k, 4);
      }
      // LO STILLICIDIO: le gocce cadono dalla volta a intervalli PRECISI. Non
      // regolari-di-natura: regolari precisi, ogni due secondi e mezzo, tutte.
      /* LE GOCCE PARTONO DALLA VOLTA, e prima due file su tre stavano da cinquanta a cento
         pixel SOTTO il bordo dell'arco, sospese in mezzo all'aria senza niente sopra. E una
         goccia non si vede cadere da sola: si vede dagli ANELLI che fa sull'acqua quando
         arriva. Tre anelli concentrici sotto ognuna, ed e' quello che dice «sta cadendo». */
      for (let i = 0; i < 6; i++) {
        const gx = Math.round(W * (0.14 + i * 0.14));
        const t = Math.abs(gx - W / 2) / (W / 2);
        const volta = H * 0.30 + Math.pow(t, 2) * H * 0.11;      // il filo dell'arco, sopra
        const cad = volta + 14 + (i % 3) * 26;                   // quanto e' scesa
        ctx.fillStyle = 'rgba(226,240,248,.24)';                 // la scia, dal punto di stacco
        ctx.fillRect(gx + 1, volta, 1, cad - volta);
        ctx.fillStyle = 'rgba(240,250,255,.85)';                 // la testa
        ctx.fillRect(gx, cad, 3, 6);
        ctx.fillStyle = 'rgba(226,240,248,.45)';                 // la coda che sfuma
        ctx.fillRect(gx + 1, cad - 10, 1, 10);
        for (const [rr, al] of [[18, 0.22], [12, 0.16], [6, 0.10]]) {
          ctx.fillStyle = `rgba(226,240,248,${al})`;
          pixelEllipse(ctx, gx + 1, floorY + 6, rr, Math.max(2, Math.round(rr * 0.22)), 3);
        }
      }
      // il freddo che scende dai ventidue gradini, a sinistra, fuori inquadratura
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = `rgba(186,206,222,${0.05 - i * 0.01})`;
        ctx.fillRect(0, H * 0.22 + i * 10, W * (0.10 - i * 0.02), floorY - H * 0.22);
      }
      /* LE QUATTRO PAROLE INCISE: una TABULA, non quattro trattini. Prima erano quattro
         barrette da trenta pixel su un muro di tufo, e a trenta pixel non si legge «qui c'e'
         scritto qualcosa»: si legge «qui il muro e' graffiato». Un riquadro incassato di
         centoventi per sessantaquattro — col filo d'ombra su due lati e il filo di luce sugli
         altri due, che e' cosi' che si vede un incasso — e dentro quattro righe di segni. */
      {
        const tx2 = Math.round(W * 0.80), ty2 = Math.round(floorY - 118), tw2 = 120, th2 = 64;
        ctx.fillStyle = 'rgba(40,28,14,.42)'; ctx.fillRect(tx2, ty2, tw2, th2);
        ctx.fillStyle = 'rgba(24,16,8,.55)';                       // l'ombra: alto e sinistra
        ctx.fillRect(tx2, ty2, tw2, 3); ctx.fillRect(tx2, ty2, 3, th2);
        ctx.fillStyle = 'rgba(255,240,206,.30)';                   // la luce: basso e destra
        ctx.fillRect(tx2, ty2 + th2 - 3, tw2, 3); ctx.fillRect(tx2 + tw2 - 3, ty2, 3, th2);
        for (let k = 0; k < 4; k++) {
          const larg = [96, 74, 88, 52][k], yy = ty2 + 10 + k * 13;
          ctx.fillStyle = 'rgba(28,18,8,.62)'; ctx.fillRect(tx2 + 10, yy, larg, 6);
          ctx.fillStyle = 'rgba(255,238,204,.34)'; ctx.fillRect(tx2 + 10, yy + 6, larg, 2);
          ctx.fillStyle = 'rgba(40,28,14,.42)';                    // gli spazi fra le parole
          for (let q = 1; q < 4; q++) ctx.fillRect(tx2 + 10 + Math.round(larg * q / 4), yy, 4, 6);
        }
      }
    },

    cisterna_sigillata(ctx, W, H) {
      // CISTERNA DI VILLA STEFANIA: la più bella e la più antica. Sala unica, volta
      // perfetta, cocciopesto intatto. E in fondo, dove nessuna guida porta nessuno,
      // UN MURO CHE NON È ROMANO: blocchi di tufo e calce messi in fretta, con le
      // fughe fatte a mano. Murato. Da fuori.
      const r = rng(seedOf('cisterna_sigillata'));
      const floorY = H * 0.80, vaultBase = H * 0.30;
      blocks(ctx, 0, 0, W, H, '#7e6848', 14, r, 0.10);
      // LA VOLTA PERFETTA: un solo arco, integro, che copre tutta la larghezza
      for (let i = 0; i < 7; i++) {
        const t = i / 7;
        arco(ctx, W * 0.5, vaultBase + 34 - t * 10, W * (0.56 - t * 0.05), (vaultBase + 26) * (1 - t * 0.10), 12,
             shadeHex('#8a7450', 1.04 - t * 0.40), r, 6);
      }
      // pareti e cocciopesto INTATTO, liscio come una vasca da bagno
      for (const side of [0, 1]) {
        const x = side ? W * 0.76 : 0, w = W * 0.24;
        blocks(ctx, x, vaultBase * 0.6, w, floorY - vaultBase * 0.6, '#8a7250', 10, r, 0.12);
        for (let y = vaultBase; y < floorY; y += 16) {
          ctx.fillStyle = 'rgba(70,54,30,.20)'; ctx.fillRect(x, y, w, 2);
        }
        cocciopesto(ctx, x, floorY - 104, w, 104, r);
        ctx.fillStyle = 'rgba(255,220,200,.12)'; ctx.fillRect(x, floorY - 98, w, 46);
      }
      // il pavimento, asciutto e liscio
      blocks(ctx, 0, floorY, W, H - floorY, '#8a7250', 12, r, 0.10);
      ctx.fillStyle = 'rgba(30,20,14,.30)'; ctx.fillRect(0, floorY, W, 5);
      ctx.fillStyle = 'rgba(255,226,180,.08)'; ctx.fillRect(0, floorY + 5, W, H - floorY);
      // L'ARCO ROMANO in fondo: la curva del tufo antico esce dai lati del muro
      // nuovo di dieci centimetri per parte, come una cornice sotto un quadro
      // appeso male.
      const mw = W * 0.42, mx = W * 0.5 - mw / 2, mTop = H * 0.34, mBot = floorY + 2;
      const aw = mw / 2 + 24;
      for (let k = 0; k < 4; k++) {
        arco(ctx, W * 0.5, mBot, aw - k * 5, mBot - mTop + 34 - k * 5, 8, shadeHex('#a88c60', 1.1 - k * 0.14), r, 5);
      }
      ctx.fillStyle = '#5e4c30'; ctx.fillRect(W * 0.5 - aw, mTop + 26, 16, mBot - mTop - 26);
      ctx.fillStyle = '#5e4c30'; ctx.fillRect(W * 0.5 + aw - 16, mTop + 26, 16, mBot - mTop - 26);
      // IL MURO CHE NON È ROMANO: blocchi di tufo squadrati e calce, in fretta.
      // Le fughe sono larghe, disuguali, fatte a mano: non c'è una riga che torni.
      ctx.fillStyle = '#c8c0a4'; ctx.fillRect(mx, mTop, mw, mBot - mTop);
      let yy = mTop + 2, row = 0;
      while (yy < mBot) {
        const bh = 17 + Math.floor(r() * 13);
        let xx = mx + 2 + (row % 3) * 9;
        while (xx < mx + mw - 4) {
          const bw = 26 + Math.floor(r() * 34);
          const f = 0.84 + r() * 0.30;
          const skew = Math.floor((r() - 0.5) * 5);       // i blocchi non sono in bolla
          ctx.fillStyle = shade('#a08a62', f);
          ctx.fillRect(xx, yy + skew, Math.min(bw, mx + mw - 4 - xx), Math.min(bh - 4, mBot - yy - skew));
          ctx.fillStyle = shade('#a08a62', f * 1.20);
          ctx.fillRect(xx, yy + skew, Math.min(bw, mx + mw - 4 - xx), 2);
          ctx.fillStyle = shade('#a08a62', f * 0.66);
          ctx.fillRect(xx, yy + skew + Math.min(bh - 6, mBot - yy - skew), Math.min(bw, mx + mw - 4 - xx), 2);
          xx += bw + 4 + Math.floor(r() * 7);              // fughe disuguali: mano, non squadra
        }
        yy += bh; row++;
      }
      // la calce sbavata fuori dalle fughe: si vede che l'ha stesa una cazzuola
      // tenuta da una mano che aveva fretta
      ctx.fillStyle = 'rgba(226,220,198,.62)';
      for (let i = 0; i < 60; i++) {
        ctx.fillRect(mx + 4 + r() * (mw - 10) | 0, mTop + r() * (mBot - mTop) | 0, 5 + r() * 12 | 0, 3);
      }
      // e la calce che viene fuori come farina e cade a terra
      ctx.fillStyle = 'rgba(238,232,214,.8)';
      for (let i = 0; i < 22; i++) ctx.fillRect(mx + 8 + r() * (mw - 16) | 0, mTop + 20 + r() * (mBot - mTop - 40) | 0, 3, 2);
      ctx.fillStyle = 'rgba(240,236,220,.44)';
      for (let i = 0; i < 12; i++) pixelEllipse(ctx, mx + 12 + r() * (mw - 24), floorY + 8 + r() * (H - floorY - 12), 9 + r() * 12, 4, 3);
      // LA CREPA: una sola, sottile, che non va dritta da nessuna parte
      let cxp = W * 0.5 - 6;
      for (let i = 0; i < 22; i++) {
        cxp += (r() - 0.45) * 9;
        ctx.fillStyle = '#141008';
        ctx.fillRect(cxp, mTop + 14 + i * ((mBot - mTop - 20) / 22), 3, (mBot - mTop) / 20);
      }
      // e dall'altra parte della crepa un chiarore che non è una torcia: appena
      // un alone, come una stanza illuminata dietro una porta chiusa male
      for (let k = 3; k >= 1; k--) {
        ctx.fillStyle = `rgba(150,196,214,${0.024 * k})`;
        pixelEllipse(ctx, W * 0.5 - 4, (mTop + mBot) / 2, 22 * k, (mBot - mTop) * 0.30 * k, 4);
      }
      // LA TORCIA, dalla nostra parte: il cono arriva sul muro e si ferma lì
      conoTorcia(ctx, W * 0.06, floorY - 76, 0.96, 0.02, W * 0.42, 74);
      // il gradino d'ingresso, a sinistra, e il freddo che scende
      ctx.fillStyle = 'rgba(30,20,14,.40)'; ctx.fillRect(0, floorY - 14, W * 0.07, 14);
      ctx.fillStyle = 'rgba(186,206,222,.05)'; ctx.fillRect(0, vaultBase, W * 0.08, floorY - vaultBase);
    },

    sotto(ctx, W, H) {
      // LA CISTERNA MURATA nel 1957, dall'interno. La breccia nel muro in alto, la
      // corda che scende, quattro metri di vuoto, l'acqua nera come uno specchio.
      // Il cocciopesto rosa finisce con una linea netta un metro e mezzo sopra il
      // pelo: il livello dell'acqua nel 1957. E a galla, roba da bambini.
      const r = rng(seedOf('sotto'));
      const waterY = H * 0.58;
      blocks(ctx, 0, 0, W, H, '#5a4a30', 14, r, 0.14);
      // LA VOLTA A BOTTE integra, il doppio di quelle di Peppe
      for (let i = 0; i < 6; i++) {
        const t = i / 6;
        arco(ctx, W * 0.5, H * (0.36 - t * 0.01), W * 0.58, H * (0.34 - t * 0.03), 13,
             shadeHex('#6a5838', 1.0 - t * 0.44), r, 6);
      }
      for (let i = 0; i < 9; i++) arco(ctx, W * 0.5, H * 0.36 - i * 2, W * 0.58 - i * 4, H * 0.33 - i * 2.6, 2, '#463824', r, 8);
      // le pareti di tufo dietro i pilastri
      blocks(ctx, 0, H * 0.18, W, waterY - H * 0.18, '#5e4c32', 12, r, 0.13);
      for (let y = H * 0.24; y < waterY; y += 17) {
        ctx.fillStyle = 'rgba(40,30,16,.26)'; ctx.fillRect(0, y, W, 2);
      }
      // I SETTE PILASTRI, in fila: chiari sul lato della torcia, scuri sull'altro,
      // e ognuno con la sua fascia di cocciopesto alla base.
      for (let i = 6; i >= 0; i--) {
        const t = i / 7;
        const pw = 54 * (1 - t * 0.56), px = W * (0.08 + t * 0.76);
        const pTop = H * (0.28 + t * 0.05);
        blocks(ctx, px, pTop, pw, waterY - pTop + 6, shadeHex('#8a7048', 1.02 - t * 0.50), 8, r, 0.14);
        ctx.fillStyle = `rgba(255,214,150,${0.16 - t * 0.10})`; ctx.fillRect(px, pTop, pw * 0.34, waterY - pTop + 6);
        ctx.fillStyle = `rgba(12,10,6,${0.34 + t * 0.20})`; ctx.fillRect(px + pw * 0.62, pTop, pw * 0.38, waterY - pTop + 6);
        cocciopesto(ctx, px, waterY - 40, pw, 40, r, shadeHex('#b87868', 1.02 - t * 0.46));
        // il riflesso del pilastro nell'acqua: capovolto, più corto, più scuro
        ctx.fillStyle = `rgba(120,86,60,${0.22 - t * 0.13})`;
        ctx.fillRect(px, waterY, pw, 30 * (1 - t * 0.5));
      }
      // IL COCCIOPESTO e LA LINEA DEL 1957: netta, orizzontale, perfetta. L'acqua
      // adesso sta due metri e venti più su di quella linea.
      cocciopesto(ctx, 0, waterY - 50, W, 50, r, '#b87868');
      ctx.fillStyle = 'rgba(255,206,186,.26)'; ctx.fillRect(0, waterY - 48, W, 4);
      ctx.fillStyle = 'rgba(255,232,220,.16)'; ctx.fillRect(0, waterY - 44, W, 18);
      // IL MURO DEL 1957: blocchi di tufo squadrati e malta grigia, e nella malta
      // le impronte di una cazzuola tenuta da una mano destra. Chiude tutto il
      // lato destro, e in alto ha la breccia.
      const bx = W * 0.76, by = H * 0.12, bw = 108, bh = 68;
      blocks(ctx, W * 0.66, H * 0.05, W * 0.34, waterY - H * 0.05 + 4, '#928872', 9, r, 0.10);
      ctx.fillStyle = 'rgba(60,52,40,.32)';
      for (let y = H * 0.05; y < waterY; y += 24) ctx.fillRect(W * 0.66, y, W * 0.34, 4);
      for (let y = H * 0.05; y < waterY; y += 24) {
        for (let x = W * 0.66 + ((y / 24 | 0) % 2) * 30; x < W; x += 60) {
          ctx.fillStyle = 'rgba(60,52,40,.26)'; ctx.fillRect(x, y, 4, 24);
        }
      }
      ctx.fillStyle = 'rgba(230,226,210,.16)';                    // le impronte della cazzuola
      for (let i = 0; i < 22; i++) pixelEllipse(ctx, W * 0.68 + r() * W * 0.30, H * 0.06 + r() * (waterY - H * 0.08), 14, 4, 3);
      ctx.fillStyle = 'rgba(16,12,8,.40)'; ctx.fillRect(W * 0.655, H * 0.05, 11, waterY - H * 0.05);
      // l'iscrizione fatta col dito prima che la malta asciugasse: A. C. — 1957
      ctx.fillStyle = 'rgba(50,42,30,.5)';
      for (let k = 0; k < 3; k++) ctx.fillRect(W * 0.90, waterY - 130 + k * 11, 46 - (k % 2) * 16, 4);
      // LA BRECCIA: venti centimetri di malta levati col martello. Non è un buco
      // tondo: è uno strappo, con le scaglie che sporgono e il giorno dentro.
      glow(ctx, bx + bw / 2, by + bh / 2, bw * 0.72, bh * 0.80, '214,222,208');  // era 864×598: tutto il quadro
      ctx.fillStyle = '#0e0e0c';
      for (let k = 0; k < 34; k++) {
        const a = k / 34 * 6.283;
        const rr = 0.80 + ((k * 11) % 7) * 0.055;
        ctx.fillRect(bx + bw / 2 + Math.cos(a) * bw / 2 * rr - 9,
                     by + bh / 2 + Math.sin(a) * bh / 2 * rr - 8, 19, 17);
      }
      // il giorno che si vede attraverso: cielo pallido in alto, il verde del fico
      for (let k = 0; k < 26; k++) {
        const a = k / 26 * 6.283;
        const rr = 0.56 + ((k * 5) % 4) * 0.06;
        ctx.fillStyle = '#c8d0c0';
        ctx.fillRect(bx + bw / 2 + Math.cos(a) * bw / 2 * rr - 11,
                     by + bh / 2 + Math.sin(a) * bh / 2 * rr - 10, 23, 21);
      }
      ctx.fillStyle = '#dfe6d6'; ctx.fillRect(bx + 22, by + 12, bw - 46, bh - 34);
      ctx.fillStyle = '#e8eee0'; ctx.fillRect(bx + 26, by + 14, bw - 60, 12);
      ctx.fillStyle = '#7e9a6c'; ctx.fillRect(bx + 26, by + 34, 30, 16);     // le foglie del fico
      ctx.fillStyle = '#6a8a5c'; ctx.fillRect(bx + 54, by + 28, 22, 12);
      // le scaglie di malta che sporgono dal bordo, in controluce
      ctx.fillStyle = '#5e5646';
      for (let k = 0; k < 14; k++) {
        const a = k / 14 * 6.283;
        ctx.fillRect(bx + bw / 2 + Math.cos(a) * bw * 0.42 - 5, by + bh / 2 + Math.sin(a) * bh * 0.40 - 4, 11, 9);
      }
      // il cono di luce del giorno: entra obliquo e muore prima dell'acqua
      for (let i = 1; i <= 9; i++) {
        const t = i / 9;
        ctx.fillStyle = `rgba(200,212,198,${0.06 * (1 - t * 0.82)})`;
        pixelEllipse(ctx, bx + bw / 2 - t * 110, by + bh / 2 + t * (waterY - by) * 0.92, 34 + t * 70, 28 + t * 46, 4);
      }
      // LA CORDA dei Coraggio, annodata al tronco del fico: esce dalla breccia e
      // scende quattro metri fino a sfiorare l'acqua
      for (let i = 0; i < 40; i++) {
        const t = i / 40;
        const cx2 = bx + 18 - t * 26 + Math.sin(t * 3.4) * 5;
        ctx.fillStyle = t < 0.8 ? '#d8c898' : '#b8a878';
        ctx.fillRect(cx2, by + bh - 10 + t * (waterY - by - bh + 30), 5, 7);
      }
      ctx.fillStyle = '#a89060';
      for (let i = 0; i < 9; i++) {
        const t = i / 9;
        ctx.fillRect(bx + 16 - t * 26 + Math.sin(t * 3.4) * 5, by + bh - 6 + t * (waterY - by - bh + 26), 9, 4);
      }
      // LA SCALA ANTICA a sinistra: scende, tocca il pelo dell'acqua e CONTINUA
      // sotto. Il terzo gradino è quello appena sopra il pelo, verde e saponoso.
      for (let i = 0; i < 9; i++) {
        const sy = waterY - 76 + i * 14, sw = 140 - i * 8;
        ctx.fillStyle = 'rgba(10,8,4,.62)'; ctx.fillRect(0, sy + 9, sw, 6);       // l'ombra sotto l'alzata
        ctx.fillStyle = shadeHex('#c8a86c', 1.02 - i * 0.06);                     // la pedata, in luce
        ctx.fillRect(0, sy, sw, 9);
        ctx.fillStyle = 'rgba(255,236,190,.26)'; ctx.fillRect(0, sy, sw, 3);
        ctx.fillStyle = 'rgba(74,140,92,.42)'; ctx.fillRect(0, sy + 6, sw, 4);    // la patina verde che scivola
        ctx.fillStyle = shadeHex('#6a5636', 0.94 - i * 0.05);                     // il fianco della scala
        ctx.fillRect(sw - 7, sy, 7, 15);
      }
      // L'ACQUA: nera come uno specchio, ferma, e il fondo non si vede
      sea(ctx, W, waterY, H, '#060a0e', '#0c1820', r, 8, 0.18);
      ctx.fillStyle = 'rgba(6,10,14,.44)'; ctx.fillRect(0, waterY + 30, W, H - waterY - 30);
      ctx.fillStyle = 'rgba(210,226,230,.26)'; ctx.fillRect(0, waterY, W, 2);
      // LA SCALA CHE CONTINUA SOTTO IL PELO: due gradini pallidi, e poi il nero
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = `rgba(122,150,146,${0.26 - i * 0.05})`;
        ctx.fillRect(0, waterY + 6 + i * 13, 88 - i * 16, 10);
      }
      // ROBA DA BAMBINI, a galla: il secchiello giallo, due infradito spaiate, la
      // palla rossa, e una maschera da sub degli anni Novanta.
      const sbx = W * 0.40, sby = waterY + 20;
      ctx.fillStyle = 'rgba(10,16,20,.5)'; pixelEllipse(ctx, sbx, sby + 11, 24, 6, 3);
      ctx.fillStyle = '#e8c838'; ctx.fillRect(sbx - 14, sby - 14, 28, 22);
      ctx.fillStyle = '#f8e070'; ctx.fillRect(sbx - 14, sby - 14, 28, 4);
      ctx.fillStyle = '#c8a420'; ctx.fillRect(sbx - 12, sby - 22, 24, 3);
      ctx.fillStyle = '#7ab0c8'; ctx.fillRect(sbx - 7, sby - 7, 10, 7);      // la decalcomania del pesce
      ctx.fillStyle = '#e8e0d0'; ctx.fillRect(sbx - 9, sby + 1, 5, 5);       // la A incisa col chiodo
      /* QUI GALLEGGIAVANO CINQUE COSE E TRE LEGGEVANO COME PESCI. Le due infradito erano
         ellissi celesti lisce di 36×12 e 24×8 px, la maschera un'ellisse di 36×20 con dentro
         una piu' chiara: a quella taglia, in acqua nera, sono tre macchie azzurre. La regola
         del progetto e' che un oggetto che non si riesce a far leggere si TOGLIE, e restano
         le due che si leggono — il secchiello giallo con la A incisa col chiodo e la palla
         rossa — che sono gia' due oggetti in piu' del necessario.
         LA MASCHERA invece si sposta, perche' il suo elastico TAGLIATO serve alla storia: va
         sul gradino asciutto in primo piano, dove la profondita' permette settanta pixel e la
         torcia la prende in pieno, e li' un cinturino reciso di netto si VEDE. */
      ctx.fillStyle = 'rgba(10,16,20,.44)'; pixelEllipse(ctx, W * 0.56, waterY + 40, 19, 5, 3);
      ctx.fillStyle = '#a8202e'; pixelDisc(ctx, W * 0.56, waterY + 26, 14, 3);
      ctx.fillStyle = '#e8e0d0'; ctx.fillRect(W * 0.56 - 14, waterY + 24, 28, 5);
      {
        const gm = 118, gy = waterY - 62;                   // sul gradino, in primo piano
        ctx.fillStyle = 'rgba(10,16,20,.42)'; pixelEllipse(ctx, gm, gy + 20, 34, 6, 3);
        ctx.fillStyle = '#3a5a70'; pixelEllipse(ctx, gm, gy, 36, 22, 3);        // il facciale
        ctx.fillStyle = '#1e2c38'; pixelEllipse(ctx, gm, gy, 30, 17, 3);
        ctx.fillStyle = '#b8dce8'; pixelEllipse(ctx, gm, gy - 2, 26, 13, 3);    // il vetro
        ctx.fillStyle = 'rgba(255,255,255,.42)'; ctx.fillRect(gm - 20, gy - 10, 14, 4);
        ctx.fillStyle = '#3a5a70'; ctx.fillRect(gm - 8, gy + 16, 16, 9);        // la stecca del naso
        // l'elastico, e il taglio: due tronconi che non si toccano, netti
        ctx.fillStyle = '#2e4658';
        ctx.fillRect(gm + 34, gy - 6, 30, 7);
        ctx.fillRect(gm + 78, gy + 2, 34, 7);
        ctx.fillStyle = 'rgba(230,240,246,.50)';                                // i due capi recisi
        ctx.fillRect(gm + 63, gy - 6, 2, 7);
        ctx.fillRect(gm + 78, gy + 2, 2, 7);
      }
      // LA TORCIA: il cono da sinistra, sull'acqua e sui pilastri
      conoTorcia(ctx, W * 0.03, waterY - 70, 0.97, 0.20, W * 0.62, 76);
      // il gradino verde e asciutto dove si fanno gli inventari, in fila
      ctx.fillStyle = 'rgba(120,170,130,.20)'; ctx.fillRect(0, waterY - 64, 118, 5);
    },

    rovine(ctx, W, H) {
      // VILLA GIULIA A PUNTA EOLO, mezzogiorno e mezza. Non c'è ombra. Zero. Il
      // sentiero è bianco, la terra è bianca, il cielo è bianco di caldo. La
      // piattaforma di opus reticolatum sul precipizio, il ninfeo, il taglio delle
      // vasche nella roccia. E Santo Stefano intero, in fondo.
      const r = rng(seedOf('rovine'));
      skyGradient(ctx, W, H * 0.36, '#a8c8d0', '#e8eae0', 9);
      ctx.fillStyle = 'rgba(255,255,240,.24)'; ctx.fillRect(0, 0, W, H * 0.36);
      const horiz = H * 0.36, edgeY = H * 0.60;
      // IL MARE: una lastra blu dura, senza un riflesso gentile
      sea(ctx, W, horiz, edgeY, '#1c5c84', '#2470a0', r, 7, 0.5);
      ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(0, horiz, W, 2);
      // SANTO STEFANO intero, con il carcere in cima come un anello di pietra
      santoStefanoLontano(ctx, W * 0.82, horiz + 2, W * 0.19, H * 0.13, '#5a6a64', '#c8c0a8');
      /* LA TERRA BIANCA, secca e calcinata: metà bassa dell'inquadratura, cioè la
         superficie più grande del quadro. Era `blocks()` con passo quattordici, e
         blocks() disegna una riga più chiara in cima a ogni blocco: il risultato erano
         corsi orizzontali regolari su tutta la larghezza, cioè un MURO DI CONCI messo
         in piano — e un muro in piano fa sembrare di cartone anche il precipizio che
         gli sta sopra. Un piano di terra si dice al contrario di un muro: fondo pieno
         (che è anche l'unico modo di essere sicuri che non resti scoperto niente),
         chiazze larghe e schiacciate perché la terra non ha corsi, e le crepe, che
         vengono verso di noi e si allargano avvicinandosi. */
      ctx.fillStyle = '#d3c4a4'; ctx.fillRect(0, edgeY, W, H - edgeY);
      for (let i = 0; i < 170; i++) {
        const cx2 = r() * W, cy2 = edgeY + 16 + r() * (H - edgeY - 16), cs = 16 + r() * 54;
        ctx.fillStyle = ['#cdbd98', '#dccfae', '#c6b78e', '#d9ccaa', '#c9b992'][Math.floor(r() * 5)];
        pixelEllipse(ctx, cx2, cy2, cs, cs * 0.30, 4);
      }
      for (let k = 0; k < 8; k++) {                       // le crepe di agosto
        let cx3 = 40 + r() * (W - 80), cy3 = edgeY + 10 + r() * 30;
        const fine = H - r() * 40;
        while (cy3 < fine) {
          const sp = 1 + Math.round((cy3 - edgeY) / 90);
          ctx.fillStyle = 'rgba(120,104,66,.26)';
          ctx.fillRect(cx3 | 0, cy3 | 0, sp, 4);
          ctx.fillStyle = 'rgba(255,252,226,.20)';
          ctx.fillRect((cx3 + sp) | 0, cy3 | 0, 1, 4);
          cx3 += (r() - 0.5) * 9; cy3 += 4;
        }
      }
      ctx.fillStyle = 'rgba(255,252,230,.16)'; ctx.fillRect(0, edgeY, W, 10);
      /* IL PRECIPIZIO. Qui c'era un cuneo beige di due toni piatti col bordo superiore
         rettilineo, in basso a destra: l'oggetto più grande della metà bassa
         dell'inquadratura, e nessuno capiva cosa fosse. Tolto — e il precipizio,
         che è IL FATTO di questa scena (b6_ninfeo insiste sui «quaranta metri di niente
         sotto» e sul sentiero che negli ultimi tre metri richiede di mettere una mano),
         adesso lo dicono le due cose che lo dicono per davvero quando si guarda da
         SOPRA una falesia: il CIGLIO — la terra finisce su una linea rotta e chiara,
         non su un righello, e sotto quella linea non c'è niente — e il FIANCO della
         punta, che a destra gira e si mostra: una parete in ombra, a due fasce di tono,
         che dal suo spigolo illuminato scende dritta nell'acqua. Il vuoto è il pezzo di
         mare che sta FRA il ciglio e quella parete: quaranta metri, e si vedono. */
      /* Come si legge, riga per riga, guardando dal bordo: la terra bianca sotto, il
         RIM al sole sul filo dove finisce, poi la PARETE in ombra — che nel quadro sta
         SOPRA il ciglio, perché quello che è più lontano sta più in alto, e la parete
         precipita allontanandosi da noi — e in cima alla parete la SCHIUMA, che è
         l'acqua alla base: quaranta metri sotto i piedi.
         SECONDA STESURA, e le tre cose che ho dovuto cambiare perché il vuoto si
         leggesse invece di sembrare una collina marrone dietro il piano:
         (1) IL TONO ERA AL ROVESCIO. La parete si schiariva verso il ciglio, quindi
             fra la terra bianca e la roccia c'era una rampa continua di grigi e il
             salto non aveva un BORDO: sembrava un pendio. Su una falesia a
             mezzogiorno il contrasto massimo sta proprio sul filo — la tavola di terra
             è accecante, la parete verticale sotto è nell'ombra sua — e più giù, dove
             l'acqua rimanda luce, la roccia si SCHIARISCE. Adesso è così: scurissima
             sotto il ciglio, più chiara al piede.
         (2) IL FIANCO STAVA DAVANTI AL NINFEO. Cresceva da x=0,58·W, cioè esattamente
             dietro i tre archi, e attraverso le aperture il giocatore vedeva la roccia
             invece del mare che il testo di b6_ninfeo gli promette. La costa gira
             DOPO il ninfeo: il fianco profondo comincia a 0,84·W, di là dall'edificio,
             e dietro gli archi resta il mare.
         (3) MANCAVA IL METRO. Quaranta metri, dall'alto, in scorcio, non si possono
             disegnare: si possono solo far misurare. Al piede della parete c'è una
             barca da pesca di sedici pixel con la sua scia — piccola perché è lontana
             e in basso, ed è lei che dice quanto è alta la roccia. */
      /* La profondità della parete è una TRATTATIVA fra due cose che si mordono la
         coda: più è alta, più il salto si sente, e più mangia il mare che si deve
         vedere attraverso gli archi del ninfeo. A ventidue pixel il fianco spariva e
         la terra bianca sembrava toccare l'acqua — una spiaggia, cioè il contrario.
         Trentotto è la misura che tiene le due cose: metà dell'apertura degli archi
         resta mare e cielo, l'altra metà è la roccia che scende, e dove la punta gira
         (da 0,84·W) arriva a sessanta e più. */
      const parete = x => 38 + Math.round(Math.sin(x * 0.037) * 6 + Math.sin(x * 0.113) * 3)
                        + (x > W * 0.84 ? Math.pow((x - W * 0.84) / (W * 0.16), 0.80) * 26 : 0);
      const eY = Math.round(edgeY);
      /* LA RAMPA DI TONO ERA AL CONTRARIO. La parete andava da un ocra medio in cima a
         #26200f — quasi nero — proprio SOTTO il ciglio, cioe' era piu' scura dove il sole di
         mezzogiorno la prende e piu' chiara dove sta l'ombra propria. Sullo schermo la costa
         diventava una fascia scura di quaranta pixel senza volume, e il filo di luce che
         doveva separarla dalla terra bianca era di due pixel: invisibile. Invertita — buia al
         PIEDE, sotto la cengia, e schiarita verso il ciglio — e il filo portato a cinque
         pixel con l'ombra portata sopra: sono quegli otto pixel che dicono «qui la terra
         finisce». */
      const tonoParete = (y, t0, d) =>
        mix('#3a3020', '#8a7c60', Math.pow(Math.min(1, Math.max(0, (y - t0) / Math.max(6, d))), 0.62));
      for (let x = 0; x < W; x += 2) {
        const d = Math.round(parete(x)), t0 = eY - d;
        for (let y = t0 + 3; y < eY; y++) {
          ctx.fillStyle = tonoParete(y, t0, d);
          ctx.fillRect(x, y, 2, 1);
        }
        ctx.fillStyle = 'rgba(60,50,30,.45)'; ctx.fillRect(x, t0 - 3, 2, 3);   // l'ombra portata sul ciglio
        ctx.fillStyle = 'rgba(255,250,214,.90)'; ctx.fillRect(x, t0, 2, 5);     // IL FILO al sole
        ctx.fillStyle = '#cfe6ee'; ctx.fillRect(x, eY - 6, 2, 6);               // la schiuma alla base
        ctx.fillStyle = 'rgba(255,250,214,.80)'; ctx.fillRect(x, eY - 1, 2, 2); // il rim al sole
      }
      /* LO SPIGOLO dove la costa volta. Una parete che gira si riconosce dal filo
         verticale: la faccia di qua prende il sole di sbieco, quella di là è al buio.
         Senza questa riga il fianco profondo sembra solo una macchia più scura. */
      for (let y = eY - Math.round(parete(W * 0.845)); y < eY; y++) {
        ctx.fillStyle = 'rgba(255,244,198,.30)'; ctx.fillRect(Math.round(W * 0.845) - 2, y, 2, 1);
        ctx.fillStyle = 'rgba(12,10,4,.34)'; ctx.fillRect(Math.round(W * 0.845), y, 3, 1);
      }
      /* LE DUE GROTTE al piede della parete SONO STATE TOLTE, ed è la terza volta che
         le disegno. Prima erano due riquadri di nero pieno alti quanto larghi a mezza
         parete: due buchi nell'immagine. Poi, sapendo che un'onda scava in orizzontale
         e che una grotta marina sta attaccata all'acqua, le ho rifatte basse, larghe e
         subito sotto la schiuma — e con quattro righe di altezza sono venute due
         tettoie scure appiccicate al muro, peggio di prima. Su una parete che nel
         quadro è alta cinquanta pixel una grotta non ci sta: non c'è spazio per farla
         leggere, e una macchia scura che nessuno riconosce ruba il salto a tutta la
         scena. La roccia se la raccontano da sole i canaloni e lo strato. */
      /* I canaloni verticali del tufo e i due strati orizzontali. La spaziatura è
         irregolare di proposito: a passo fisso ogni quindici pixel la parete leggeva
         come una PALIZZATA di pali di legno, che è il contrario di una falesia. */
      for (let x = 0; x < W; x += 9) {
        if ((x * 13) % 29 < 15) continue;
        const d = Math.round(parete(x)), t0 = Math.round(edgeY) - d;
        if (d < 17) continue;
        ctx.fillStyle = 'rgba(10,8,2,.34)'; ctx.fillRect(x, t0 + 4, 2, d - 10);
        ctx.fillStyle = 'rgba(226,206,150,.14)'; ctx.fillRect(x + 2, t0 + 5, 1, d - 12);
      }
      for (let x = 0; x < W; x += 4) {          // un solo strato orizzontale: due facevano un tessuto
        const d = Math.round(parete(x)), t0 = Math.round(edgeY) - d;
        if (d < 26) continue;
        ctx.fillStyle = 'rgba(214,192,132,.15)';
        ctx.fillRect(x, Math.round(t0 + 4 + (d - 12) * 0.52), 4, 2);
      }
      /* LA BARCA AL PIEDE DELLA PARETE: il metro. Sedici pixel di scafo bianco con la
         scia, sull'acqua che sta alla base del fianco che gira — e siccome si legge
         subito che è una barca, dice per confronto quanto è alta la roccia sopra di
         lei. È l'unica cosa piccola che questa inquadratura si tiene: le altre sono
         state tolte perché a sessanta pixel non dicevano cosa erano, mentre una barca
         lontana e in basso è piccola PER IL MOTIVO GIUSTO. */
      {
        // in acqua per davvero: dodici pixel sopra la schiuma, non appoggiata sul filo
        // della roccia — a quattro pixel sembrava un paletto piantato sulla cresta
        const bx2 = Math.round(W * 0.93), bd = Math.round(parete(bx2)), by2 = eY - bd - 13;
        ctx.fillStyle = 'rgba(226,242,248,.30)'; ctx.fillRect(bx2 - 27, by2 + 3, 24, 2);
        ctx.fillStyle = 'rgba(226,242,248,.20)'; ctx.fillRect(bx2 - 47, by2 + 5, 22, 2);
        ctx.fillStyle = '#eef0ea'; ctx.fillRect(bx2 - 8, by2, 16, 3);
        ctx.fillStyle = '#8d9aa2'; ctx.fillRect(bx2 - 6, by2 + 3, 12, 2);
        ctx.fillStyle = '#e8eae4'; ctx.fillRect(bx2 - 1, by2 - 4, 3, 4);
      }
      sterpaglie(ctx, 0, H - 6, W * 0.46, '#b0a460', r, 26);
      sterpaglie(ctx, 0, edgeY + 28, W * 0.52, '#a89858', r, 20);
      fichidindia(ctx, W * 0.03, H - 4, 60, '#7a9a68', r);
      fichidindia(ctx, W * 0.46, edgeY + 40, 42, '#6e8e5e', r);
      // LA PIATTAFORMA DI OPUS RETICOLATUM sul ciglio: la rete di losanghe
      const plx = W * 0.16, plw = W * 0.34, ply = edgeY - 46;
      reticolatum(ctx, plx, ply, plw, 52, '#c8b48c', r, 8);
      ctx.fillStyle = '#ddd0ac'; ctx.fillRect(plx - 5, ply - 8, plw + 10, 10);      // il coronamento
      ctx.fillStyle = 'rgba(255,255,240,.24)'; ctx.fillRect(plx - 5, ply - 8, plw + 10, 3);
      ctx.fillStyle = '#a89474'; ctx.fillRect(plx, ply + 52, plw, 8);
      // i rocchi di colonna caduti e i moncherini di muro, in fila
      for (const [fx, hh] of [[0.20, 34], [0.30, 22], [0.42, 40], [0.56, 26]]) {
        const sx = W * fx;
        reticolatum(ctx, sx, edgeY + 22 - hh, 30, hh, '#c8b48c', r, 7);
        ctx.fillStyle = '#e0d4b0'; ctx.fillRect(sx - 2, edgeY + 20 - hh, 34, 5);
        // le ombre di mezzogiorno: corte e a sinistra... tranne una.
        ctx.fillStyle = 'rgba(80,72,52,.28)';
        if (fx === 0.42) ctx.fillRect(sx + 30, edgeY + 22, 26, 7);   // questa va a DESTRA
        else ctx.fillRect(sx - 22, edgeY + 22, 24, 7);
      }
      /* IL TAGLIO DELLE VASCHE nella roccia, a sinistra. Erano tre riquadri di tre
         toni sempre più scuri, l'ultimo quasi nero: da lontano tre finestre nere in
         mezzo alla terra bianca, cioè tre buchi nell'immagine (la lezione del nero che
         sembra sempre contenuto). Una vasca vuota, guardata da qui, non si riconosce
         dal buio: si riconosce dal FONDO. Sotto il bordo c'è la fascia buia che il
         bordo stesso fa d'ombra, e più sotto il fondo di tufo che prende luce piena —
         e fra i due si legge la profondità. Il buio da solo non dice niente. */
      /* Seconda stesura, dopo il collaudo: «a 1x le tre celle dentro una cornice chiara
         continua leggono come UN PANNELLO CON TRE FINESTRE SCURE, e la vasca non ha un
         dentro: e una nicchia in un muro visto di faccia». Vero, e la cosa che mancava
         non era il buio giusto: era la PROSPETTIVA. Una vasca la si riconosce da una cosa
         sola — il fondo che si STRINGE allontanandosi — piu la parete di fondo che prende
         luce e quella vicina che sta in ombra. Tre rettangoli concentrici non lo diranno
         mai, per bravi che siano i toni.
         E ci va dentro un dito d'acqua ferma, perche e una peschiera e perche il testo
         della scena dice che l'acqua adesso e tutta ferma. */
      for (let i = 0; i < 3; i++) {
        const vx = Math.round(W * 0.03 + i * W * 0.048), vy = Math.round(H * 0.78);
        const vw = Math.round(W * 0.042), vh = 36, fuga = 7;
        // la vera del bordo, tutt'attorno: e la cosa che prende piu luce
        ctx.fillStyle = '#c3b28c'; ctx.fillRect(vx - 4, vy - 4, vw + 8, vh + 8);
        ctx.fillStyle = 'rgba(255,252,230,.34)'; ctx.fillRect(vx - 4, vy - 4, vw + 8, 3);
        // il vano: per righe, e ogni riga piu strettadella precedente andando in su
        for (let y = 0; y < vh; y++) {
          const t = y / (vh - 1);
          const stretta = Math.round((1 - t) * fuga);
          const x0 = vx + stretta, larg = vw - stretta * 2;
          if (larg < 4) continue;
          // in alto la parete di fondo, che prende luce; scendendo si passa al fondo
          ctx.fillStyle = t < 0.42
            ? mix('#6a5f49', '#8d8265', t / 0.42)
            : mix('#8d8265', '#a2977a', (t - 0.42) / 0.58);
          ctx.fillRect(x0, vy + y, larg, 1);
        }
        // l'ombra della vera sulla parete di fondo: tre righe, non una fascia
        for (let k = 0; k < 4; k++) {
          ctx.fillStyle = `rgba(36,30,20,${0.34 - k * 0.07})`;
          ctx.fillRect(vx + fuga - k, vy + k, vw - (fuga - k) * 2, 1);
        }
        // gli spigoli interni: quello a sinistra in ombra, quello a destra in luce
        ctx.fillStyle = 'rgba(30,26,16,.34)'; ctx.fillRect(vx, vy + fuga, 3, vh - fuga);
        ctx.fillStyle = 'rgba(255,250,222,.16)'; ctx.fillRect(vx + vw - 3, vy + fuga, 2, vh - fuga);
        // IL DITO D'ACQUA sul fondo, ferma: una riga scura e una riga di cielo dentro
        ctx.fillStyle = 'rgba(46,62,58,.52)'; ctx.fillRect(vx + 2, vy + vh - 7, vw - 4, 6);
        ctx.fillStyle = 'rgba(168,200,208,.26)'; ctx.fillRect(vx + 3, vy + vh - 7, vw - 6, 2);
      }
      // IL NINFEO sul filo del precipizio: un cubo di roccia aperto sul mare da
      // tre archi che non ci sono più, e venti gradi invece di trentaquattro.
      const nx = W * 0.60, nw = W * 0.22, ny = edgeY - 96, nh = 100;
      blocks(ctx, nx, ny, nw, nh, '#c0ac84', 10, r, 0.10);
      reticolatum(ctx, nx + 4, ny + 8, nw - 8, nh - 30, '#c8b48c', r, 7);
      ctx.fillStyle = '#d8ccaa'; ctx.fillRect(nx - 6, ny - 9, nw + 12, 11);
      /* I TRE ARCHI CHE NON CI SONO PIÙ. Erano tre rettangoli di nero puro a spigoli
         retti con l'arco disegnato SOPRA il rettangolo: apertura e arco non
         coincidevano, quindi leggevano come tre porte nere con un semicerchio
         dipinto sopra — e il nero pieno, dentro un'immagine, legge come un buco
         nell'immagine, non come un vano. Due cose lo sistemano. La prima: il vano si
         TAGLIA nella forma dell'arco, colonna per colonna, e la ghiera segue quel
         taglio invece di stargli sopra. La seconda, che è quella che conta: dentro il
         vano non ci va il nero, ci va QUELLO CHE SI VEDE DALL'ALTRA PARTE — perché
         b6_ninfeo dice che il ninfeo è «aperto sul mare da tre archi che non ci sono
         più», e attraverso quelle aperture il giocatore deve vedere il mare e, più in
         basso, la parete della falesia coi suoi quaranta metri. `dietro()` ricalcola
         esattamente il fondo che il ninfeo copre, così il vano è una finestra e non
         una macchia. Più tre pixel di strombatura sul bordo interno, che sono lo
         spessore del muro: senza quelli il taglio resta un adesivo. */
      const dietro = (x, y) => {
        const dd = Math.round(parete(x)), tt = eY - dd;
        if (y >= tt + 3) return tonoParete(y, tt, dd);
        if (y >= tt) return '#cfe6ee';                 // la schiuma, quaranta metri sotto la soglia
        return mix('#2470a0', '#1c5c84', Math.max(0, Math.min(1, (y - horiz) / (edgeY - horiz))));
      };
      for (let k = 0; k < 3; k++) {
        const bw = (nw - 24) / 3, aw = Math.round(bw - 8);
        const ax = Math.round(nx + 12 + k * bw), arx = aw / 2;
        const spring = Math.round(ny + 54), sill = Math.round(ny + nh - 12);
        // la ghiera di conci, che segue il giro del vano
        arco(ctx, ax + arx, spring, arx + 7, arx + 7, 9, '#b09a70', r, 3);
        for (let dx = 0; dx < aw; dx++) {
          const x = ax + dx, t = (dx - arx + 0.5) / arx;
          const top = Math.round(spring - arx * Math.sqrt(Math.max(0, 1 - t * t)));
          for (let y = top; y < sill; y++) { ctx.fillStyle = dietro(x, y); ctx.fillRect(x, y, 1, 1); }
          ctx.fillStyle = 'rgba(34,27,18,.62)'; ctx.fillRect(x, top, 1, 3);          // strombatura in cima
          if (dx < 3 || dx >= aw - 3) {                                             // e sulle spalle
            ctx.fillStyle = `rgba(34,27,18,${dx < 3 ? 0.44 : 0.60})`;
            ctx.fillRect(x, top, 1, sill - top);
          }
        }
        ctx.fillStyle = '#c8b48c'; ctx.fillRect(ax - 1, sill, aw + 2, 3);            // la soglia al sole
        ctx.fillStyle = 'rgba(255,252,228,.34)'; ctx.fillRect(ax - 1, sill, aw + 2, 1);
      }
      /* IL CANALE DI ADDUZIONE. Stava a destra del ninfeo, sopra il pelo dell'acqua:
         una passerella scura che galleggiava sul mare. Ma un canale è un TAGLIO NELLA
         TERRA e va dove la terra c'è — qui davanti al ninfeo, sul piano calcinato,
         dove uno ci si può inginocchiare accanto per calare un idrofono e per dire una
         parola a dieci centimetri dall'acqua (b6_idro_canale, b6_presente). */
      const cay = edgeY + 26, cax = Math.round(W * 0.44), caw = Math.round(nx + 26 - W * 0.44);
      ctx.fillStyle = '#ded0a8'; ctx.fillRect(cax, cay, caw, 5);                   // il ciglio di là, al sole
      ctx.fillStyle = 'rgba(255,255,238,.42)'; ctx.fillRect(cax, cay, caw, 2);
      ctx.fillStyle = '#514936'; ctx.fillRect(cax, cay + 5, caw, 11);              // la parete di là, in ombra
      ctx.fillStyle = 'rgba(20,16,10,.30)'; ctx.fillRect(cax, cay + 5, caw, 3);
      ctx.fillStyle = '#26382f'; ctx.fillRect(cax, cay + 16, caw, 12);             // l'acqua, che non è asciutta
      ctx.fillStyle = 'rgba(170,206,214,.40)'; ctx.fillRect(cax + 9, cay + 18, caw - 26, 2);
      ctx.fillStyle = 'rgba(226,242,246,.20)'; ctx.fillRect(cax + 30, cay + 23, caw - 70, 2);
      ctx.fillStyle = '#6d6450'; ctx.fillRect(cax, cay + 28, caw, 6);              // la sponda di qua
      ctx.fillStyle = '#c6b992'; ctx.fillRect(cax - 3, cay + 34, caw + 6, 6);
      ctx.fillStyle = 'rgba(255,252,230,.30)'; ctx.fillRect(cax - 3, cay + 34, caw + 6, 2);
      ctx.fillStyle = '#0a0e10'; ctx.fillRect(cax + caw - 16, cay + 5, 16, 23);    // dove sparisce nel tufo
      ctx.fillStyle = '#b5a680';                                                    // le due lastre di copertura,
      ctx.fillRect(cax + 26, cay + 2, 34, 30); ctx.fillRect(cax + 84, cay + 2, 26, 30);  // rimaste in mezzo
      ctx.fillStyle = 'rgba(255,252,230,.26)';
      ctx.fillRect(cax + 26, cay + 2, 34, 2); ctx.fillRect(cax + 84, cay + 2, 26, 2);
      // LA PIETRA DELL'ISCRIZIONE, appoggiata a un muretto, mezza nelle sterpaglie.
      // Il muretto a secco c'è perché b6_iscrizione dice che la pietra «sta appoggiata
      // a un muretto a secco a venti metri dal sentiero»: se il testo lo nomina, c'è.
      const ix = W * 0.44, iy = H - 46;
      muretto(ctx, ix - 14, iy - 8, 104, 20, '#c6b48e', r);
      ctx.fillStyle = '#d8cdae'; ctx.fillRect(ix, iy, 70, 40);
      ctx.fillStyle = 'rgba(255,255,240,.26)'; ctx.fillRect(ix, iy, 70, 3);
      ctx.fillStyle = '#6a6048';
      for (let k = 0; k < 4; k++) ctx.fillRect(ix + 7, iy + 7 + k * 8, 56 - (k % 2) * 18, 3);
      ctx.fillStyle = 'rgba(90,80,58,.30)'; ctx.fillRect(ix - 18, iy + 30, 20, 8);
      sterpaglie(ctx, ix - 6, iy + 40, 84, '#b0a460', r, 9);
      // e la lattina di Peroni schiacciata accanto: il 2026 dentro il 2 dopo Cristo
      ctx.fillStyle = '#3a6a48'; ctx.fillRect(ix + 76, iy + 33, 13, 7);
      ctx.fillStyle = '#c8c8b0'; ctx.fillRect(ix + 76, iy + 33, 13, 2);
    },

    mare(ctx, W, H) {
      // CALA ROSSANO, ore 18:40: la spiaggia sotto il porto. Ghiaia grossa che fa
      // male ai piedi, l'acqua che a venti metri è già di un blu da cartolina, due
      // famiglie che smontano gli ombrelloni, e le bombole del diving sulla ghiaia.
      const r = rng(seedOf('mare'));
      skyGradient(ctx, W, H * 0.26, '#8ec2d8', '#e0dcc0', 8);
      const horiz = H * 0.26, blueY = H * 0.44, shoreY = H * 0.64;
      // il mare del largo, poi la riga dei venti metri, poi il basso fondale
      sea(ctx, W, horiz, blueY, '#123c66', '#1a5a86', r, 7, 0.7);
      ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(0, horiz, W, 2);
      ctx.fillStyle = '#0e3358'; ctx.fillRect(0, blueY - 4, W, 5);          // il blu da cartolina comincia qui
      sea(ctx, W, blueY + 1, shoreY, '#8ad8cc', '#2f8ea8', r, 7, 1.0);
      ctx.fillStyle = 'rgba(60,80,70,.26)';
      for (let i = 0; i < 70; i++) ctx.fillRect(r() * W | 0, blueY + 8 + r() * (shoreY - blueY - 12) | 0, 5 + r() * 6 | 0, 3);
      /* LA PARETE DEL PORTO sopra la spiaggia, a sinistra. Era un lastrone giallo
         piatto con qualche riga orizzontale: sullo schermo un foglio di compensato
         appoggiato al bordo dell'inquadratura. Il tufo di Ventotene è cenere vulcanica
         compattata e si legge da quattro cose, tutte assenti: gli STRATI (bande di
         colore diverso, perché ogni eruzione ha lasciato la sua cenere), il TAGLIO
         VERTICALE degli scalpelli, le FESSURE con dentro i capperi, e il fatto che la
         parete non è a piombo — si svasa scendendo, e alla base c'è il detrito che ne
         è caduto. Anche il profilo del bordo non è una riga: è una linea rotta. */
      {
        const pw = Math.round(W * 0.265), cima = Math.round(H * 0.02);
        const bordoA = y => pw - Math.round(Math.pow((y - cima) / (shoreY - cima), 1.6) * 26)
                            + Math.round(Math.sin(y * 0.11) * 3);
        for (let y = cima; y < shoreY; y++) {
          const larg = bordoA(y);
          const t = (y - cima) / (shoreY - cima);
          // gli strati: bande larghe da dodici a venti pixel, ognuna di un giallo suo
          /* Gli strati. NOTA: shade() vuole un esadecimale e mix() restituisce
             `rgb(...)`, quindi shade(mix(...)) fa parseInt('gb(200,...)', 16) = NaN e
             produce `rgb(NaN,NaN,NaN)`. Il browser ignora un colore non valido e riusa
             quello di prima — quindi il bug non si vede — mentre il rasterizzatore lo
             rendeva NERO, ed è così che l'ho scoperto: la parete di tufo, in PNG, era
             una lastra nera. Qui si passa sempre esadecimale a shade(). */
          const banda = Math.floor((y - cima) / 17);
          const strati = ['#c8a058', '#c3995a', '#bd934e', '#b78c46', '#c09550'];
          ctx.fillStyle = shade(strati[banda % strati.length], 0.99 - t * 0.34);
          ctx.fillRect(0, y, larg, 1);
          // la riga d'ombra fra due strati
          if ((y - cima) % 17 === 0) { ctx.fillStyle = 'rgba(96,68,30,.30)'; ctx.fillRect(0, y, larg, 2); }
          // lo spigolo: una riga di luce sul bordo, e il taglio in ombra sotto
          ctx.fillStyle = 'rgba(255,238,190,.24)'; ctx.fillRect(larg - 3, y, 3, 1);
          ctx.fillStyle = 'rgba(60,40,16,.34)'; ctx.fillRect(larg - 1, y, 2, 1);
        }
        /* IL TAGLIO DEGLI SCALPELLI. Alla prima stesura erano ventidue colpi a distanza
           FISSA di undici pixel, per quasi tutta l'altezza: sullo schermo una griglia, e
           una griglia legge come muratura di conci — lo stesso difetto che il collaudo ha
           trovato sulla spalla del porto. La regolarita di questi segni sta nella
           DIREZIONE, non nel passo: sono cinquanta colpi corti, a caso, di lunghezza
           diversa e mai allineati. */
        for (let k = 0; k < 50; k++) {
          const da = cima + 6 + (r() * (shoreY - cima - 40) | 0);
          const lung = 12 + (r() * 52 | 0);
          const a = Math.min(shoreY - 4, da + lung);
          const x = 4 + (r() * (bordoA(a) - 8) | 0);
          if (x < 2 || x > bordoA(a)) continue;
          ctx.fillStyle = `rgba(92,66,28,${0.09 + r() * 0.12})`;
          ctx.fillRect(x, da, 2, a - da);
          ctx.fillStyle = 'rgba(255,240,200,.09)';
          ctx.fillRect(x + 2, da, 1, a - da);
        }
        // LE FESSURE coi capperi: l'unico verde della parete
        for (let k = 0; k < 12; k++) {
          const y = cima + 20 + r() * (shoreY - cima - 50);
          const x = 4 + r() * (bordoA(y) - 20);
          ctx.fillStyle = 'rgba(48,34,14,.42)'; ctx.fillRect(x, y, 12 + r() * 16, 3);
          ctx.fillStyle = '#4a7a3e';
          for (let q = 0; q < 4; q++) pixelEllipse(ctx, x + 4 + q * 6, y + 4 + (q % 2) * 4, 6, 4, 3);
        }
        // IL DETRITO alla base: quello che la parete ha perso
        for (let k = 0; k < 40; k++) {
          const y = shoreY - 4 - r() * 22;
          ctx.fillStyle = shade('#b08c4a', 0.7 + r() * 0.4);
          ctx.fillRect(bordoA(y) - 6 + r() * 16, y, 4 + r() * 6, 3);
        }
        // LA BANCHINA in cima, e una bitta in controluce
        ctx.fillStyle = '#a09884'; ctx.fillRect(0, cima, bordoA(cima) + 2, 9);
        ctx.fillStyle = '#7e7768'; ctx.fillRect(0, cima + 9, bordoA(cima) + 2, 3);
        ctx.fillStyle = '#4e4a42';
        ctx.fillRect(Math.round(pw * 0.42), cima - 11, 11, 12);
        ctx.fillRect(Math.round(pw * 0.42) - 3, cima - 13, 17, 4);
        sterpaglie(ctx, 0, cima - 1, Math.round(pw * 0.9), '#8a8a52', r, 12);
      }
      // LA RIVA e LA GHIAIA GROSSA: sassi disegnati uno per uno, che fanno male ai piedi
      for (let x = 0; x < W; x += 12) {
        const off = Math.round((r() - 0.5) * 8);
        ctx.fillStyle = '#7a8a86'; ctx.fillRect(x, shoreY + off, 12, 10);
        ctx.fillStyle = 'rgba(255,255,250,.34)'; ctx.fillRect(x, shoreY + off - 3, 12, 3);
      }
      blocks(ctx, 0, shoreY + 10, W, H - shoreY - 10, '#a8a496', 10, r, 0.10);
      /* I SASSI, con la GRANA che cresce venendo avanti. Prima erano centonovanta ciottoli
         della stessa taglia sparsi su tutta la fascia: una ghiaia con i sassi grandi uguali
         vicino e lontano non e un piano che si allontana, e un tappeto a pallini — ed e per
         questo che il terzo basso dell'inquadratura leggeva vuoto pur essendo pieno di
         roba. E la grana, non il colore, che dice a un occhio quanto e lontana una cosa
         (lezione 59). Quindi: sassi da due pixel sul bagnasciuga, sassi da dodici sotto i
         piedi, e i piu vicini con l'ombra sotto, perche un sasso che ha l'ombra sta appoggiato
         su qualcosa e un sasso senza ombra galleggia. */
      for (let i = 0; i < 300; i++) {
        const t = Math.pow(r(), 0.55);                       // piu sassi davanti che in fondo
        const gy = shoreY + 12 + t * (H - shoreY - 16);
        const gx = r() * W;
        const gs = 1.6 + t * t * 10;
        ctx.fillStyle = ['#8a8880', '#b0aca0', '#9a9488', '#c0bcae', '#78746c'][Math.floor(r() * 5)];
        if (gs > 5) { ctx.fillStyle = 'rgba(48,50,46,.30)'; pixelEllipse(ctx, gx + 1, gy + gs * 0.45, gs, gs * 0.34, 2); }
        ctx.fillStyle = ['#8a8880', '#b0aca0', '#9a9488', '#c0bcae', '#78746c'][Math.floor(r() * 5)];
        pixelEllipse(ctx, gx, gy, gs, gs * 0.64, gs > 6 ? 3 : 2);
        if (gs > 6) { ctx.fillStyle = 'rgba(255,255,248,.22)'; pixelEllipse(ctx, gx - gs * 0.2, gy - gs * 0.28, gs * 0.4, gs * 0.22, 2); }
      }
      // i sassi bagnati del bagnasciuga: piu scuri e lucidi, e stanno solo li
      for (let i = 0; i < 40; i++) {
        const gx = r() * W, gy = shoreY + 10 + r() * 14;
        ctx.fillStyle = `rgba(58,66,64,${0.30 + r() * 0.24})`;
        pixelEllipse(ctx, gx, gy, 2 + r() * 3, 1.6 + r() * 2, 2);
      }
      ctx.fillStyle = 'rgba(255,214,150,.14)'; ctx.fillRect(0, shoreY + 10, W, H - shoreY - 10);
      /* IL GOMMONE DI LILIA, il soggetto. Questa inquadratura era una spiaggia di
         ghiaia con SETTE cose sotto i sessanta pixel — tre bombole, una muta, un'asta
         d'ombrellone, un ovale grigio, una barretta rossa — e nessuna che facesse da
         soggetto: guardandola non si capiva che cosa facesse vedere. E soprattutto
         mentiva, perché due delle scene che ci stanno sopra si svolgono A BORDO: in
         b7_calette «Lilia arriva con un gommone di quattro metri», spegne il motore, e
         in b7_archivio «il gommone è legato alla boa» e il telefono passa di mano.
         Quindi il gommone c'è, grande 430 px su 960 — quasi metà inquadratura — e i
         prop illeggibili sono stati tolti: la falesia e la ghiaia bastano a dire dove
         siamo, e i dettagli piccoli (le pinne, il sacco stagno) stanno DENTRO il
         soggetto, che è dove il giocatore li cerca. */
      const glen = 430, gcx = W * 0.50, gwl = shoreY - 17;
      gommone(ctx, gcx, gwl, glen, r, 1);
      // LA BOA e la cima tesa: il gommone è legato, non alla deriva
      const boax = gcx + glen / 2 + 74, boay = gwl - 16;
      ctx.fillStyle = 'rgba(240,244,248,.80)';
      for (let k = 0; k <= 16; k++) {                       // la cima, che fa la sua pancia
        const t = k / 16;
        ctx.fillRect((gcx + glen / 2 - 4 + t * 78) | 0, (gwl - 34 + Math.sin(t * Math.PI) * 13 + t * 20) | 0, 5, 2);
      }
      ctx.fillStyle = '#c85a3a'; pixelEllipse(ctx, boax, boay, 19, 17, 3);
      ctx.fillStyle = '#e8e4dc'; pixelEllipse(ctx, boax, boay - 6, 17, 8, 3);
      ctx.fillStyle = 'rgba(255,255,255,.44)'; ctx.fillRect(boax - 12, boay - 13, 12, 3);
      ctx.fillStyle = '#6a6a64'; ctx.fillRect(boax - 2, boay - 24, 4, 8);
      ctx.fillStyle = 'rgba(255,255,255,.26)'; pixelEllipse(ctx, boax, boay + 15, 22, 4, 3);
      /* QUI C'ERA L'OMBRELLONE, e non c'e' piu'. Terza volta che un ombrellone viene
         togliuto da un fondale di questo gioco, e stavolta il motivo e' un numero: la
         calotta era larga 150 px con la base a y=344, mentre il gommone di Lilia — che sta
         131 pixel PIU' IN ALTO nel quadro, cioe' piu' lontano — e' lungo 430 px per i
         quattro metri che il testo gli da', cioe' 107 px/m. L'ombrellone stava a 75 px/m:
         un oggetto piu' VICINO disegnato piu' PICCOLO del suo metro, che e' la cosa che
         l'occhio non perdona mai. Alla distanza giusta sarebbe alto 496 px e largo 451: in
         un canvas di 360 non ci sta, e un oggetto che non ci sta non si rimpicciolisce —
         si toglie (lezione 60). Il primo piano lo tiene la ghiaia grossa con la grana che
         cresce, che funziona da sola. */
      // IL CANE in acqua fino alla pancia, e non più giù: il testo di b9 lo nomina
      const dx2 = W * 0.855, dy2 = shoreY - 4;
      ctx.fillStyle = '#4a3e30'; pixelEllipse(ctx, dx2, dy2 - 9, 29, 12, 3);        // il corpo
      ctx.fillStyle = '#5a4c3a'; pixelEllipse(ctx, dx2 + 26, dy2 - 20, 12, 10, 3);  // la testa
      ctx.fillStyle = '#4a3e30'; ctx.fillRect(dx2 + 20, dy2 - 18, 8, 12);           // il collo
      ctx.fillStyle = '#3a3026'; ctx.fillRect(dx2 + 20, dy2 - 30, 7, 11);           // l'orecchio che casca
      ctx.fillStyle = '#5a4c3a'; ctx.fillRect(dx2 + 34, dy2 - 22, 7, 5);            // il muso
      ctx.fillStyle = '#2a2218'; ctx.fillRect(dx2 + 39, dy2 - 21, 3, 3);
      ctx.fillStyle = '#4a3e30'; ctx.fillRect(dx2 - 34, dy2 - 24, 6, 16);           // la coda, alta
      ctx.fillRect(dx2 - 38, dy2 - 30, 6, 8);
      ctx.fillStyle = 'rgba(255,255,255,.34)'; pixelEllipse(ctx, dx2, dy2 + 1, 36, 5, 3);
      ctx.fillStyle = 'rgba(226,242,246,.30)'; pixelEllipse(ctx, dx2 + 4, dy2 + 5, 27, 3, 3);
      // LA COSA FREDDA: le orme che vanno in acqua. Sei. E nessuna che torna.
      ctx.fillStyle = 'rgba(70,74,70,.34)';
      for (let i = 0; i < 6; i++) {
        const t = i / 6;
        ctx.fillRect(W * 0.70 - t * W * 0.05, H - 8 - t * (H - shoreY - 6), 9, 5);
      }
    },

    notte(ctx, W, H) {
      // CAMERA DUE, l'una di notte. Il ventilatore a pale, la persiana che fa le
      // righe, il lenzuolo, la finestra aperta sul nero. Le cicale ad agosto
      // smettono verso l'una — e stanotte hanno smesso alle undici e mezza.
      const r = rng(seedOf('notte'));
      const floorY = H * 0.74;
      blocks(ctx, 0, 0, W, H, '#242a34', 16, r, 0.10);
      ctx.fillStyle = 'rgba(120,140,166,.05)'; ctx.fillRect(0, 0, W, floorY);
      // il pavimento di graniglia, freddo sotto i piedi
      blocks(ctx, 0, floorY, W, H - floorY, '#333a44', 12, r, 0.10);
      ctx.fillStyle = 'rgba(20,24,30,.34)'; ctx.fillRect(0, floorY, W, 4);
      ctx.fillStyle = 'rgba(198,208,220,.07)';
      for (let i = 0; i < 220; i++) ctx.fillRect(r() * W | 0, floorY + 6 + r() * (H - floorY - 8) | 0, 3, 2);
      // LA PERSIANA, a sinistra: le stecche, e la notte che filtra
      const px = W * 0.04, pw = W * 0.23, py = H * 0.13, ph = H * 0.42;
      ctx.fillStyle = '#463c2a'; ctx.fillRect(px - 8, py - 8, pw + 16, ph + 16);
      ctx.fillStyle = '#2e2618'; ctx.fillRect(px - 4, py - 4, pw + 8, ph + 8);
      ctx.fillStyle = '#10141a'; ctx.fillRect(px, py, pw, ph);
      const nst = 16;
      for (let k = 0; k < nst; k++) {
        ctx.fillStyle = '#333f4c'; ctx.fillRect(px, py + k * (ph / nst), pw, ph / nst - 3);
        ctx.fillStyle = 'rgba(186,212,232,.5)'; ctx.fillRect(px, py + k * (ph / nst) + ph / nst - 3, pw, 3);
      }
      // LE RIGHE che la persiana butta dentro: sul muro, sul letto, sul pavimento
      const rigaY = k => py + k * (ph / nst) + ph / nst - 3 + (k * (ph / nst)) * 0.62 + 26;
      for (let k = 0; k < nst; k++) {
        const yy = rigaY(k);
        if (yy > H) break;
        ctx.fillStyle = 'rgba(168,198,222,.13)';
        ctx.fillRect(px + pw, yy, W - px - pw, 6);
        ctx.fillStyle = 'rgba(168,198,222,.06)';
        ctx.fillRect(px + pw, yy + 6, W - px - pw, 4);
      }
      // IL VENTILATORE A PALE: gira piano, e le pale sono tre fantasmi sovrapposti
      const fx2 = W * 0.56, fy2 = H * 0.06;
      ctx.fillStyle = '#3a4048'; ctx.fillRect(fx2 - 4, 0, 9, fy2);
      for (const [k, al] of [[0, 0.16], [1, 0.26], [2, 0.5]]) {
        ctx.fillStyle = `rgba(152,166,180,${al})`;
        pixelEllipse(ctx, fx2, fy2 + 6, 118 - k * 22, 7 - k, 4);
      }
      ctx.fillStyle = 'rgba(172,186,200,.72)';
      ctx.fillRect(fx2 - 112, fy2 + 3, 100, 8); ctx.fillRect(fx2 + 14, fy2 + 3, 100, 8);
      ctx.fillStyle = '#5a626c'; pixelDisc(ctx, fx2, fy2 + 7, 15, 3);
      ctx.fillStyle = '#7a828c'; pixelDisc(ctx, fx2, fy2 + 5, 8, 3);
      // IL LETTO: il lenzuolo bianco, il cuscino affossato, una gamba fuori
      const bx = W * 0.30, bw = W * 0.46, by = floorY - 4;
      ctx.fillStyle = 'rgba(12,16,22,.44)'; ctx.fillRect(bx - 6, by + 4, bw + 12, 10);
      ctx.fillStyle = '#3a3024'; ctx.fillRect(bx - 10, by - 26, bw + 20, 34);       // il telaio di legno
      ctx.fillStyle = '#4a3e2e'; ctx.fillRect(bx - 10, by - 30, bw + 20, 6);
      ctx.fillStyle = '#8e98a4'; ctx.fillRect(bx, by - 48, bw, 26);                 // il materasso
      ctx.fillStyle = 'rgba(40,48,58,.30)'; ctx.fillRect(bx, by - 48, bw, 7);       // il materasso nudo, a sinistra
      /* IL LETTO DI TRE QUARTI, e prima era tutto in alzato: nemmeno un pixel di PIANO di
         sopra. Il corpo sotto il lenzuolo era un rettangolo piatto di 177×18 px — alla scala
         della finestra, che e' 150 px/m, un rilievo di dodici centimetri — e «la gamba fuori
         dal lenzuolo» era una barretta color pelle di 42×13, cioe' ventotto centimetri per
         nove, in mezzo al letto e orizzontale. Un letto visto di fianco non puo' mostrare chi
         ci dorme: serve il piano del materasso, e sul piano il corpo come DUE GOBBE
         raccordate — spalla, vita, anca — perche' e' da quelle due gobbe che un occhio
         riconosce una persona sotto una coperta. */
      const dxh = bx + bw * 0.46;
      // il piano del materasso: trapezio, bordo lontano piu' corto perche' e' piu' lontano
      for (let k = 0; k < 14; k++) {
        const t = k / 13, ins = Math.round((1 - t) * bw * 0.07);
        ctx.fillStyle = mix('#7e8894', '#96a0ac', t);
        ctx.fillRect(bx + ins, by - 52 + k, bw - ins * 2, 1);
      }
      // IL CORPO: due gobbe raccordate per righe. Spalla 26, vita 12, anca 22.
      {
        const x0 = dxh + 6, x1 = bx + bw - 24;
        for (let x = x0; x < x1; x++) {
          const u = (x - x0) / (x1 - x0);
          /* La spalla sta VICINO AL CUSCINO, che sta a destra: al primo colpo l'avevo messa
             a u=0,16, cioe' a sinistra, e il corpo dormiva coi piedi sul cuscino. */
          const h = 26 * Math.exp(-Math.pow((u - 0.82) / 0.20, 2))
                  + 22 * Math.exp(-Math.pow((u - 0.32) / 0.26, 2)) + 7;
          const top = by - 52 - Math.round(h);
          ctx.fillStyle = '#c2ccd6'; ctx.fillRect(x, top, 1, Math.round(h) + 10);
          ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fillRect(x, top, 1, 3);
          ctx.fillStyle = 'rgba(70,82,96,.26)'; ctx.fillRect(x, top + Math.round(h) + 6, 1, 4);
        }
      }
      ctx.fillStyle = 'rgba(70,82,96,.30)';
      for (let i = 0; i < 3; i++) ctx.fillRect(dxh + 40 + i * 52, by - 50, 4, 14);   // le pieghe
      ctx.fillStyle = '#d2dae2'; ctx.fillRect(bx + bw - 98, by - 78, 86, 26);        // il cuscino occupato
      ctx.fillStyle = 'rgba(70,82,96,.36)'; ctx.fillRect(bx + bw - 74, by - 68, 46, 13);
      /* LA GAMBA: sessanta centimetri per quattordici, OBLIQUA, che esce dal bordo VICINO del
         lenzuolo e finisce col piede sul telaio. E' la cosa che il testo nomina ogni volta
         che si entra in questa stanza — «dorme con una gamba fuori dal lenzuolo» — e per
         dieci notti era una barretta orizzontale in mezzo al materasso. */
      /* E la gamba va OMBREGGIATA ATTRAVERSO, perché un arto è un cilindro: con
         un tono unico e un filo di luce in cima restava un trapezio marrone
         in mezzo a un quadro azzurro, e il misuratore dei soggetti l'ha
         inquadrata come un oggetto a sé — a occhio leggeva come una TAVOLA DI
         LEGNO appoggiata sul letto. Tre toni sullo spessore (la luce in alto,
         il mezzo, l'ombra di sotto), il polpaccio più grosso del malleolo, e
         in fondo IL PIEDE: è il piede che fa capire che è una gamba. Il colore
         è desaturato, perché una pelle sotto la luna non è color legno. */
      /* E questa è la TERZA posa, perché le prime due non si riconoscevano e la
         regola dice che allora si cambia — non si ritocca ancora. La prima era
         una barretta orizzontale in mezzo al materasso; la seconda una gamba
         intera di ottantotto pixel, obliqua, uscita sopra il telaio: con o
         senza ombreggiatura leggeva come una TAVOLA DI LEGNO appoggiata sul
         letto, perché una gamba distesa in profilo, a questa risoluzione, è un
         trapezio lungo — e un trapezio lungo è una tavola.
         Quello che si riconosce senza esitare, invece, è la gamba che PENDE
         GIÙ dal bordo del letto: ginocchio alzato sotto il lenzuolo, tibia
         corta e quasi verticale, e il piede in fondo, di taglio, con le dita
         di fuori. È corta perché viene verso di noi, ed è per questo che si
         legge: nessuna tavola sta appesa così. */
      const gnx = dxh + 34;                                     // dove il lenzuolo si alza
      ctx.fillStyle = '#c8d2dc';                                 // il ginocchio sotto il lenzuolo
      for (let x = -20; x <= 20; x++) {
        const hh = Math.round(15 * Math.exp(-Math.pow(x / 13, 2)));
        ctx.fillRect(gnx + x, by - 52 - hh, 1, hh + 6);
      }
      ctx.fillStyle = 'rgba(255,255,255,.20)'; ctx.fillRect(gnx - 9, by - 66, 19, 3);
      for (let k = 0; k < 34; k++) {                             // la tibia, giù dal bordo
        const t = k / 33;
        const sp = Math.round(17 - t * 6);
        const gx = gnx + 4 + Math.round(t * 5);                  // appena obliqua, verso di noi
        ctx.fillStyle = mix('#a89a8c', '#8e8074', t);
        ctx.fillRect(gx, by - 34 + k, sp, 1);
        ctx.fillStyle = mix('#cfc2b2', '#b4a698', t); ctx.fillRect(gx, by - 34 + k, 3, 1);
        ctx.fillStyle = 'rgba(38,44,54,.34)'; ctx.fillRect(gx + sp - 3, by - 34 + k, 3, 1);
      }
      {                                                          // IL PIEDE, di taglio
        const fxp = gnx + 9, fyp = by;
        ctx.fillStyle = '#9c8e80'; ctx.fillRect(fxp - 19, fyp - 2, 24, 9);      // la pianta
        ctx.fillStyle = '#b4a698'; ctx.fillRect(fxp - 19, fyp - 2, 24, 3);      // il dorso in luce
        ctx.fillStyle = '#8a7c70'; ctx.fillRect(fxp + 1, fyp - 6, 8, 10);       // il tallone
        ctx.fillStyle = '#a89a8c';                                              // e le dita
        for (let d = 0; d < 4; d++) ctx.fillRect(fxp - 23 - d, fyp - 1 + d, 5, 4);
        ctx.fillStyle = 'rgba(30,36,46,.44)'; ctx.fillRect(fxp - 23, fyp + 7, 32, 3);
      }
      /* Qui c'erano un SECONDO PIEDE (17×12 a dxh-40) e l'ombra lunga 106 px
         della gamba distesa: i resti della posa precedente, rimasti in scena
         quando la gamba è stata rifatta. Due piedi per una gamba sola, e
         un'ombra sotto il niente. Il piede nuovo si porta la sua ombra. */
      // LA SEDIA coi vestiti piegati come li piega lei, maniche in dentro
      ctx.fillStyle = '#3a3a34'; ctx.fillRect(W * 0.855, floorY - 42, 52, 7);
      ctx.fillRect(W * 0.855, floorY - 88, 7, 50);
      ctx.fillRect(W * 0.862, floorY - 35, 6, 35); ctx.fillRect(W * 0.94, floorY - 35, 6, 35);
      ctx.fillStyle = '#6a7078'; ctx.fillRect(W * 0.862, floorY - 54, 44, 13);
      ctx.fillStyle = '#8a7a68'; ctx.fillRect(W * 0.868, floorY - 63, 36, 10);
      ctx.fillStyle = '#4a5a6a'; ctx.fillRect(W * 0.874, floorY - 70, 28, 8);
      // le due paia di infradito, in terra, una allineata e una no
      ctx.fillStyle = '#2a3a48'; pixelEllipse(ctx, W * 0.22, H - 18, 14, 5, 3); pixelEllipse(ctx, W * 0.245, H - 18, 14, 5, 3);
      ctx.fillStyle = '#6a3a44'; pixelEllipse(ctx, W * 0.30, H - 12, 13, 5, 3); pixelEllipse(ctx, W * 0.335, H - 24, 13, 5, 3);
      // LA FINESTRA APERTA SUL NERO, a destra: un rettangolo di niente. Fuori
      // dovrebbe esserci il mare, e non c'è: fuori non c'è nulla.
      const wx = W * 0.68, wy = H * 0.11, ww = W * 0.19, wh = H * 0.40;
      ctx.fillStyle = '#463c2a'; ctx.fillRect(wx - 9, wy - 9, ww + 18, wh + 18);
      ctx.fillStyle = '#2e2618'; ctx.fillRect(wx - 4, wy - 4, ww + 8, wh + 8);
      ctx.fillStyle = '#000002'; ctx.fillRect(wx, wy, ww, wh);
      ctx.fillStyle = 'rgba(184,196,208,.12)'; ctx.fillRect(wx + ww - 42, wy, 34, wh);   // la tenda, immobile
      ctx.fillStyle = 'rgba(184,196,208,.06)'; ctx.fillRect(wx + ww - 52, wy, 10, wh);
      ctx.fillStyle = '#463c2a'; ctx.fillRect(wx + ww / 2 - 3, wy, 7, wh);
      ctx.fillStyle = '#3a3226'; ctx.fillRect(wx - 4, wy + wh, ww + 8, 6);
      // il vaso dei limoni sul terrazzino, appena fuori: mezzo metro d'acqua
      ctx.fillStyle = '#241c14'; ctx.fillRect(wx + 6, wy + wh - 30, 30, 30);
      ctx.fillStyle = 'rgba(150,196,214,.16)'; ctx.fillRect(wx + 9, wy + wh - 28, 24, 4);
      // LA COSA FREDDA. Il letto è grande e nel letto ci sta UNA persona sola: la
      // metà di sinistra ha il lenzuolo tirato indietro, il materasso nudo, e nel
      // cuscino l'incavo fresco di una testa che se n'è andata da poco.
      // il lenzuolo tirato indietro, ripiegato su sé stesso a metà letto
      ctx.fillStyle = '#c8d2dc'; ctx.fillRect(bx + bw * 0.40, by - 60, 36, 22);
      ctx.fillStyle = '#e6ecf2'; ctx.fillRect(bx + bw * 0.40, by - 60, 36, 7);
      ctx.fillStyle = 'rgba(70,82,96,.34)'; ctx.fillRect(bx + bw * 0.40, by - 60, 6, 22);
      // il cuscino di sinistra, con l'incavo di una testa che non si è richiuso
      ctx.fillStyle = '#d2dae2'; ctx.fillRect(bx + 10, by - 70, 84, 22);
      ctx.fillStyle = '#e6ecf2'; ctx.fillRect(bx + 10, by - 70, 84, 5);
      ctx.fillStyle = 'rgba(52,64,78,.50)'; pixelEllipse(ctx, bx + 52, by - 58, 27, 9, 3);
      ctx.fillStyle = 'rgba(52,64,78,.26)'; pixelEllipse(ctx, bx + 52, by - 52, 34, 5, 3);
      // e sulla graniglia, fra la finestra aperta e il letto, DUE impronte bagnate.
      // Vanno verso la finestra. Nessuna torna indietro.
      ctx.fillStyle = 'rgba(150,186,206,.30)';
      for (let i = 0; i < 5; i++) {
        const t = i / 5;
        pixelEllipse(ctx, bx + bw * 0.30 + t * bw * 0.62, floorY + 26 - t * 14, 11 - t * 3, 5, 3);
        ctx.fillStyle = `rgba(150,186,206,${0.30 - t * 0.05})`;
      }
      ctx.fillStyle = 'rgba(190,216,230,.22)';
      pixelEllipse(ctx, bx + bw * 0.30, floorY + 27, 8, 4, 3);
    },

    barca(ctx, W, H) {
      // LA BARCA DI CIRO, la Santa Candida, sopra la fossa. Duecento metri di fondo
      // sotto sette metri di legno: la rete a poppa, le bombole, il fuoribordo, la
      // lampara sul suo palo. E intorno l'acqua, che qui non si guarda più uguale.
      const r = rng(seedOf('barca'));
      skyGradient(ctx, W, H * 0.24, '#84bed6', '#dae4dc', 8);
      const horiz = H * 0.24;
      // IL MARE INTORNO: blu profondo, e più giù non si vede niente
      sea(ctx, W, horiz, H * 0.56, '#0c3252', '#1a5c80', r, 11, 0.8);
      ctx.fillStyle = 'rgba(255,255,255,.24)'; ctx.fillRect(0, horiz, W, 2);
      // Ventotene bassa a sinistra, Santo Stefano che si ALZA a destra
      for (let dx = -W * 0.17; dx < W * 0.17; dx += 4) {
        const t = dx / (W * 0.17);
        const hh = H * 0.05 * Math.pow(Math.max(0, 1 - t * t), 0.42);
        ctx.fillStyle = '#4a6a58'; ctx.fillRect(W * 0.17 + dx, horiz - hh, 4, hh + 1);
      }
      ctx.fillStyle = '#d8c088';
      for (let i = 0; i < 11; i++) {
        ctx.fillRect(W * 0.10 + i * 10 + (i % 3), horiz - 4 - ((i * 5) % 4), 4 + (i % 3), 4);
      }
      santoStefanoLontano(ctx, W * 0.78, horiz + 1, W * 0.16, H * 0.12, '#6a6a5e', '#c0b89e');
      // LA COSA FREDDA: tutto il mare si muove appena. Lungo la fiancata destra,
      // per dieci metri, l'acqua è una lastra: nessun luccichio, nessuna piega.
      // Ferma. I sazi non cantano.
      ctx.fillStyle = 'rgba(12,34,52,.26)'; pixelEllipse(ctx, W * 0.80, H * 0.44, 96, 26, 4);
      ctx.fillStyle = 'rgba(20,50,72,.20)'; pixelEllipse(ctx, W * 0.80, H * 0.44, 80, 19, 4);
      ctx.fillStyle = 'rgba(210,232,240,.07)'; ctx.fillRect(W * 0.71, H * 0.395, 175, 2);
      // IL CAPO DI BANDA: il bordo della barca, che sale verso la prua a sinistra
      // e scende verso poppa a destra. È la linea che dice "siamo dentro".
      const gun = x => H * 0.50 + Math.pow(x / W, 0.7) * H * 0.10 - (x < W * 0.22 ? (W * 0.22 - x) * 0.16 : 0);
      for (let x = 0; x < W; x += 4) {
        const y = gun(x);
        /* Il mare finisce a H*0.56 ma il capo di banda scende verso poppa fino a
           H*0.60: fra i due restava una striscia di 292×9 che nessuno dipingeva, e
           nel riquadro si vedeva nera. Qui il mare arriva fino alla barca, colonna
           per colonna, che è l'unico modo di non lasciare fessure fra due profili
           che non hanno la stessa forma. */
        if (y > H * 0.56 - 1) {
          ctx.fillStyle = '#1a5c80';
          ctx.fillRect(x, H * 0.56 - 1, 4, y - H * 0.56 + 2);
        }
        ctx.fillStyle = '#f0ecdc'; ctx.fillRect(x, y, 4, 9);                 // il bianco del capo di banda
        ctx.fillStyle = '#3a7290'; ctx.fillRect(x, y + 9, 4, 15);            // la fascia azzurra consumata
        ctx.fillStyle = '#2a5670'; ctx.fillRect(x, y + 22, 4, 5);
        ctx.fillStyle = '#8a7452'; ctx.fillRect(x, y + 27, 4, H - y);        // il fasciame interno
      }
      /* LE ORDINATE SI FERMANO DOVE COMINCIA IL FONDO, e prima arrivavano fino al bordo
         inferiore: le costole (verticali) e le doghe del fondo (orizzontali) si sovrapponevano
         per centouno pixel sulle stesse righe, e sullo schermo il risultato era una griglia —
         cioe' nessuno dei due piani. Una barca vista da dentro ha DUE piani: la fiancata, che
         e' verticale, e il fondo, che e' orizzontale. Fra i due ci va la riga di raccordo
         scura, ed e' quella riga che fa capire che si e' DENTRO la barca. */
      const fondoY = H * 0.72;
      for (let x = 20; x < W; x += 74) {
        const y = gun(x);
        const alt = Math.max(0, fondoY - y - 27);
        ctx.fillStyle = 'rgba(60,42,24,.30)'; ctx.fillRect(x, y + 27, 13, alt);
        ctx.fillStyle = 'rgba(200,170,110,.16)'; ctx.fillRect(x, y + 27, 4, alt);
      }
      ctx.fillStyle = 'rgba(34,22,10,.46)'; ctx.fillRect(0, fondoY - 3, W, 4);   // il raccordo
      /* E le doghe del fondo si allargano venendo avanti, come su qualunque piano
         orizzontale: a passo fisso di tredici pixel il fondo era un muro coricato. */
      for (let y = fondoY, passo = 9; y < H; y += passo, passo += 1.8) {
        ctx.fillStyle = 'rgba(50,34,18,.26)'; ctx.fillRect(0, Math.round(y), W, 3);
      }
      ctx.fillStyle = 'rgba(100,160,168,.20)'; pixelEllipse(ctx, W * 0.44, H - 10, 190, 16, 4);
      ctx.fillStyle = 'rgba(160,206,210,.14)'; pixelEllipse(ctx, W * 0.44, H - 14, 150, 9, 4);
      // il parabordo bianco appeso fuori bordo, a prua
      ctx.fillStyle = '#e0d8c0'; pixelEllipse(ctx, W * 0.13, gun(W * 0.13) + 16, 12, 22, 3);
      ctx.fillStyle = '#c8c0a8'; ctx.fillRect(W * 0.13 - 2, gun(W * 0.13) - 4, 5, 10);
      // LA CIMA avvolta a prua, sul fondo
      ctx.fillStyle = '#d0c49c';
      for (let i = 0; i < 6; i++) pixelEllipse(ctx, W * 0.08, H - 22 - i * 5, 34 - i * 4, 9, 3);
      ctx.fillStyle = '#b0a480'; pixelEllipse(ctx, W * 0.08, H - 22, 34, 9, 3);
      // LA RETE a poppa: un mucchio di maglie verdi, con i sugheri e i piombi
      const nx = W * 0.70, ny = H - 44;
      ctx.fillStyle = '#1e3324'; pixelEllipse(ctx, nx, ny, 150, 46, 4);
      // le maglie: losanghe chiare su fondo scuro, così la rete si legge come rete
      for (let i = 0; i < 40; i++) {
        for (let k = 0; k < 11; k++) {
          const xx = nx - 146 + i * 8, yy = ny - 40 + k * 8 + (i % 2) * 4;
          if (Math.pow((xx - nx) / 150, 2) + Math.pow((yy - ny) / 46, 2) > 1) continue;
          ctx.fillStyle = 'rgba(126,178,124,.62)';
          ctx.fillRect(xx, yy, 7, 2); ctx.fillRect(xx, yy, 2, 7);
          ctx.fillStyle = 'rgba(16,28,18,.5)';
          ctx.fillRect(xx + 3, yy + 3, 4, 4);
        }
      }
      // la lima dei sugheri sul bordo alto, e i piombi su quello basso
      ctx.fillStyle = '#8a7a52'; pixelEllipse(ctx, nx, ny - 40, 128, 5, 3);
      ctx.fillStyle = '#e8a030';
      for (let i = 0; i < 9; i++) pixelDisc(ctx, nx - 124 + i * 31, ny - 42 - (i % 3) * 6, 8, 3);
      ctx.fillStyle = '#f0c060';
      for (let i = 0; i < 9; i++) pixelDisc(ctx, nx - 126 + i * 31, ny - 44 - (i % 3) * 6, 4, 3);
      ctx.fillStyle = '#8a8a82'; pixelEllipse(ctx, nx, ny + 26, 120, 4, 3);
      ctx.fillStyle = '#b0b0a8';
      for (let i = 0; i < 7; i++) ctx.fillRect(nx - 104 + i * 35, ny + 22, 9, 7);
      // LE DUE BOMBOLE coricate sul fondo, con le fasce e i rubinetti
      for (let i = 0; i < 2; i++) {
        const by = H - 74 + i * 30, bxx = W * 0.24;
        ctx.fillStyle = 'rgba(40,28,14,.34)'; ctx.fillRect(bxx - 4, by + 20, 92, 6);
        ctx.fillStyle = '#3a6a5a'; ctx.fillRect(bxx, by, 80, 21);
        ctx.fillStyle = '#4e8e74'; ctx.fillRect(bxx, by, 80, 5);
        ctx.fillStyle = '#2e5648'; ctx.fillRect(bxx, by + 17, 80, 4);
        ctx.fillStyle = '#3a6a5a'; pixelEllipse(ctx, bxx, by + 10, 6, 11, 3);
        ctx.fillStyle = '#c8c8c0'; ctx.fillRect(bxx + 80, by + 5, 13, 11);
        ctx.fillStyle = '#8a8a82'; ctx.fillRect(bxx + 90, by + 2, 7, 17);
        ctx.fillStyle = '#1a1a1e'; ctx.fillRect(bxx + 22, by, 7, 21); ctx.fillRect(bxx + 54, by, 7, 21);
      }
      // IL FUORIBORDO a poppa: cofano, gambo, e la tinozza dell'acqua di scarico
      ctx.fillStyle = '#262c34'; ctx.fillRect(W * 0.905, gun(W * 0.93) - 54, 66, 62);
      ctx.fillStyle = '#3a424c'; ctx.fillRect(W * 0.905, gun(W * 0.93) - 54, 66, 8);
      ctx.fillStyle = '#8a9098'; ctx.fillRect(W * 0.912, gun(W * 0.93) - 46, 48, 6);
      ctx.fillStyle = '#c8342a'; ctx.fillRect(W * 0.915, gun(W * 0.93) - 34, 14, 8);
      ctx.fillStyle = '#1a1e24'; ctx.fillRect(W * 0.868, gun(W * 0.90) - 26, 44, 9);   // la barra
      ctx.fillStyle = '#2a3038'; ctx.fillRect(W * 0.848, gun(W * 0.88) - 28, 24, 12);
      // LA LAMPARA sul palo: la lampada da pesca, spenta di giorno ma enorme
      ctx.fillStyle = '#6a5a44'; ctx.fillRect(W * 0.46, 0, 8, gun(W * 0.46) + 27);
      ctx.fillStyle = '#8a7658'; ctx.fillRect(W * 0.46, 0, 3, gun(W * 0.46) + 27);
      /* IL RIFLETTORE E' UN CONO SMALTATO VISTO DI SBIECO, cioe' un'ELLISSE in scorcio con
         il tronco di cono sopra. Prima erano sei rettangoli sovrapposti alti sei pixel — 78,
         66, 54, 42, 30, 18 — e una gabbia di cinque barrette parallele: nel PNG una scaletta
         grigia con una tacca gialla sotto. Un riflettore da lampara e' largo un metro e
         trenta: centotrenta pixel, non settantotto. */
      {
        const cx3 = W * 0.462 + 4, y0 = H * 0.04;
        ctx.fillStyle = '#2e343c'; ctx.fillRect(cx3 - 3, y0 - 6, 7, 14);        // l'attacco al palo
        for (let k = 0; k < 22; k++) {                                          // il tronco di cono
          const t = k / 21;
          const rx = 18 + t * 44;
          ctx.fillStyle = mix('#8a8678', '#e0dcc8', Math.pow(t, 0.6));
          ctx.fillRect(Math.round(cx3 - rx), Math.round(y0 + 6 + k), Math.round(rx * 2), 1);
        }
        ctx.fillStyle = '#e8e4d0'; pixelEllipse(ctx, cx3, y0 + 28, 62, 20, 3);  // la bocca
        ctx.fillStyle = '#6a6658'; pixelEllipse(ctx, cx3, y0 + 30, 54, 16, 3);  // l'ombra dentro
        ctx.fillStyle = '#f4f0d0'; pixelEllipse(ctx, cx3, y0 + 32, 30, 11, 3);  // la lampada
        ctx.fillStyle = '#fffbe0'; pixelEllipse(ctx, cx3, y0 + 31, 20, 7, 3);
        // la gabbia: due archi incrociati, non cinque barrette parallele
        ctx.fillStyle = '#5a5e64';
        for (let dx = -34; dx <= 34; dx += 2) {
          const h = Math.round(Math.sqrt(Math.max(0, 1 - Math.pow(dx / 34, 2))) * 15);
          ctx.fillRect(cx3 + dx, y0 + 32 - h, 2, 2);
        }
        for (let dy = -15; dy <= 15; dy += 2) {
          const w4 = Math.round(Math.sqrt(Math.max(0, 1 - Math.pow(dy / 15, 2))) * 34);
          ctx.fillRect(cx3 - w4, y0 + 32 + dy, 2, 2);
          ctx.fillRect(cx3 + w4, y0 + 32 + dy, 2, 2);
        }
        ctx.fillStyle = '#3a4048'; ctx.fillRect(cx3 + 58, y0 + 20, 3, 40);      // il cavo
        glow(ctx, cx3, y0 + 32, 22, 14, '240,236,200');
      }
      // L'ECOSCANDAGLIO degli anni Novanta sulla consolle di poppa, schermo verde
      ctx.fillStyle = '#4a4238'; ctx.fillRect(W * 0.80, gun(W * 0.83) - 8, 92, 40);
      ctx.fillStyle = '#2a2e30'; ctx.fillRect(W * 0.808, gun(W * 0.83) - 44, 66, 44);
      ctx.fillStyle = '#0e140e'; ctx.fillRect(W * 0.815, gun(W * 0.83) - 38, 52, 30);
      glow(ctx, W * 0.842, gun(W * 0.83) - 23, 17, 10, '120,224,140');
      ctx.fillStyle = '#78e08c'; ctx.fillRect(W * 0.822, gun(W * 0.83) - 20, 38, 5);
      ctx.fillStyle = '#3a8a4a'; ctx.fillRect(W * 0.822, gun(W * 0.83) - 34, 26, 3);
      ctx.fillStyle = '#78e08c'; ctx.fillRect(W * 0.822, gun(W * 0.83) - 28, 14, 3);
    },


    santo_stefano(ctx, W, H) {
      // SANTO STEFANO dal mare. Da lontano era una gobba con una cosa sopra. Da
      // vicino non si avvicina: si ALZA. Un cono di roccia con addosso un muro
      // curvo, giallo di calce vecchia, alto come una diga, con dentro tre file di
      // finestre tutte uguali e tutte alla stessa distanza. Ha l'aria di aspettare.
      const r = rng(seedOf('santo_stefano'));
      const horiz = H * 0.66;
      skyGradient(ctx, W, horiz, '#7ab8d2', '#e0e8dc', 12);
      // qualche nuvola piatta, alta
      for (const [fx, fy, fw] of [[0.04, 0.06, 120], [0.60, 0.04, 90], [0.86, 0.10, 110]]) {
        ctx.fillStyle = 'rgba(255,255,255,.44)'; ctx.fillRect(W * fx, H * fy, fw, 7);
        ctx.fillStyle = 'rgba(255,255,255,.26)'; ctx.fillRect(W * fx + 12, H * fy - 5, fw * 0.6, 6);
      }
      sea(ctx, W, horiz, H, '#12456a', '#1f6b90', r, 10, 0.8);
      ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(0, horiz, W, 2);
      // IL CONO DI ROCCIA: sale dal mare e occupa quasi tutta l'altezza. Non è una
      // cupola liscia: è tufo, stratificato, mangiato dal mare e dal sale.
      const cx = W * 0.52, cw = W * 0.86, ch = H * 0.60;   // l'isola cresce: il carcere non e' il doppio di lei
      for (let dx = -cw / 2; dx < cw / 2; dx += 4) {
        const t = dx / (cw / 2);
        const bumps = Math.sin(dx * 0.05) * 0.05 + Math.sin(dx * 0.017) * 0.06;
        const hh = ch * (Math.pow(Math.max(0, 1 - t * t), 0.40) + bumps * (1 - Math.abs(t)));
        /* LA ROCCIA CAMBIA MATERIA. Con #bda57a la roccia e il muro del carcere sopra (#c0b89e)
           stanno a otto punti di luminanza: stessa grana, stesso giallo, e i due diventano un
           OGGETTO SOLO — una cupola con delle finestre, che non e' quello che il testo dice
           («un cono di roccia con addosso un muro»). Il tufo a #7a6a52 sta quaranta punti
           sotto il muro, e allora fra i due c'e' un profilo. */
        const f = 0.80 + (1 - Math.abs(t)) * 0.24 + ((dx | 0) % 7) * 0.012;
        ctx.fillStyle = shade('#7a6a52', f);
        ctx.fillRect(cx + dx, horiz + 2 - hh, 4, hh + 2);
        // le striature verticali del tufo mangiato dal sale: e' la grana che lo fa roccia
        if ((dx | 0) % 12 === 0) {
          ctx.fillStyle = 'rgba(48,38,24,.22)';
          ctx.fillRect(cx + dx, horiz + 2 - hh * 0.86, 2, hh * 0.86);
        }
        // il taglio a picco sul mare: l'ultimo metro è scuro di battente
        ctx.fillStyle = 'rgba(60,50,34,.30)'; ctx.fillRect(cx + dx, horiz - 12, 4, 14);
      }
      // le stratificazioni orizzontali del tufo
      for (let y = horiz - ch * 0.92; y < horiz - 6; y += 13) {
        const d = (horiz - y) / ch;
        const halfw = (cw / 2) * Math.sqrt(Math.max(0, 1 - Math.pow(d, 2.5)));
        ctx.fillStyle = 'rgba(84,68,42,.22)'; ctx.fillRect(cx - halfw, y, halfw * 2, 2);
        ctx.fillStyle = 'rgba(255,244,210,.10)'; ctx.fillRect(cx - halfw, y + 2, halfw * 2, 1);
      }
      // il fianco in ombra, a destra
      ctx.fillStyle = 'rgba(50,40,26,.22)';
      for (let dx = 0; dx < cw / 2; dx += 4) {
        const t = dx / (cw / 2);
        const hh = ch * Math.pow(Math.max(0, 1 - t * t), 0.40);
        ctx.fillRect(cx + dx, horiz + 2 - hh, 4, hh + 2);
      }
      // I FICHI D'INDIA a mezza costa: l'unica cosa verde dell'isola
      for (let i = 0; i < 20; i++) {
        const t = (r() - 0.5) * 1.75;
        const hx = cx + t * cw / 2;
        const hy = horiz - ch * Math.pow(Math.max(0, 1 - t * t), 0.40) * (0.06 + r() * 0.34);
        fichidindia(ctx, hx, hy, 20 + r() * 18, '#6a8a5a', r);
      }
      // LO SCIVOLO DI CEMENTO colato sulla roccia negli anni Cinquanta: non c'è
      // un porto. Ciro ci appoggia la prua e tiene il motore in tiro con una mano.
      /* LO SCIVOLO SCENDE, e prima saliva. Il ciclo partiva dall'orizzonte e andava verso
         l'alto allargandosi: sessantacinque dei suoi settantuno pixel stavano nel CIELO, e
         uno scivolo di alaggio che si allarga salendo e finisce in aria non e' uno scivolo,
         e' un triangolo grigio appoggiato sulla roccia. Adesso parte attaccato alla roccia
         all'altezza dell'orizzonte e si allarga SCENDENDO, fino a entrare nell'acqua. */
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = shade('#b8b4a6', 1 - i * 0.02);
        ctx.fillRect(W * 0.115 - i * 3, horiz + 2 + i * 4, 44 + i * 7, 5);
      }
      ctx.fillStyle = 'rgba(255,255,250,.24)'; ctx.fillRect(W * 0.11, horiz - 6, 66, 3);
      ctx.fillStyle = 'rgba(30,50,60,.44)'; ctx.fillRect(W * 0.12, horiz + 2, 62, 8);
      // LA MULATTIERA: duecento metri di salita a serpentina fra i fichi d'India
      for (let i = 0; i < 26; i++) {
        const t = i / 26;
        const mx = W * 0.19 + Math.sin(t * 8.2) * W * 0.075 + t * W * 0.17;
        const my = horiz - 16 - t * ch * 0.72;
        ctx.fillStyle = '#ddd2b4'; ctx.fillRect(mx, my, 24, 6);
        ctx.fillStyle = 'rgba(90,74,46,.34)'; ctx.fillRect(mx, my + 6, 24, 3);
      }
      // L'ANELLO DI PIETRA in cima: il muro curvo, giallo di calce vecchia, alto
      // come una diga. Il ferro di cavallo, visto da fuori.
      /* Il carcere scende dal 58% al 37% della larghezza dell'isola: resta esagerato di
         proposito — e' un edificio che sull'isola vera si vede da dieci chilometri — ma non
         e' piu' il doppio della roccia che lo tiene su. */
      const rw = W * 0.32, rx = cx - rw / 2, ry = horiz - ch - 6, rh = H * 0.26;
      for (let dx = 0; dx < rw; dx += 5) {
        const u = (dx / rw) * 2 - 1;
        const lift = 20 * (1 - u * u);            // il muro segue la curva del ferro di cavallo
        blocks(ctx, rx + dx, ry - lift, 5, rh + lift + 10, '#cfc7a8', 5, r, 0.09);
        ctx.fillStyle = `rgba(70,58,38,${0.06 + Math.abs(u) * 0.18})`;
        ctx.fillRect(rx + dx, ry - lift, 5, rh + lift + 10);
      }
      // il coronamento, e l'ombra che butta sulla facciata
      for (let dx = 0; dx < rw; dx += 5) {
        const u = (dx / rw) * 2 - 1, lift = 20 * (1 - u * u);
        ctx.fillStyle = '#e6e2c8'; ctx.fillRect(rx + dx, ry - lift - 5, 5, 9);
        ctx.fillStyle = 'rgba(60,50,32,.26)'; ctx.fillRect(rx + dx, ry - lift + 4, 5, 6);
      }
      // le colature di calce e ruggine sulla facciata: sessant'anni di pioggia
      for (let i = 0; i < 22; i++) {
        const u = (r() - 0.5) * 1.9;
        const dx = (u + 1) / 2 * rw, lift = 20 * (1 - u * u);
        ctx.fillStyle = r() > 0.6 ? 'rgba(120,90,60,.22)' : 'rgba(255,252,232,.20)';
        ctx.fillRect(rx + dx, ry - lift + 8, 4 + r() * 5, rh * (0.3 + r() * 0.7));
      }
      // LE TRE FILE DI FINESTRE: tutte uguali, tutte alla stessa distanza
      for (let row = 0; row < 3; row++) {
        for (let i = 0; i < 15; i++) {
          const u = (i + 0.5) / 15 * 2 - 1;
          const wx = rx + (u + 1) / 2 * rw;
          const lift = 20 * (1 - u * u);
          const wy = ry - lift + 22 + row * (rh - 26) / 3;
          const ww = 14 * (0.70 + Math.abs(u) * 0.36);
          ctx.fillStyle = '#b4ac94'; ctx.fillRect(wx - ww / 2 - 2, wy - 3, ww + 4, 21);
          ctx.fillStyle = '#0c0b0a'; ctx.fillRect(wx - ww / 2, wy, ww, 16);
          ctx.fillStyle = 'rgba(255,250,220,.26)'; ctx.fillRect(wx - ww / 2 - 2, wy - 3, ww + 4, 2);
          ctx.fillStyle = 'rgba(40,32,20,.34)'; ctx.fillRect(wx - ww / 2 - 2, wy + 17, ww + 4, 3);
        }
      }
      // LA COSA FREDDA: novantanove finestre nere. Una no: una è più CHIARA, e la
      // luce non ci entra da fuori — sembra venire da dentro la pietra.
      {
        const i = 7, row = 1;
        const u = (i + 0.5) / 15 * 2 - 1;
        const wx = rx + (u + 1) / 2 * rw, lift = 20 * (1 - u * u);
        const wy = ry - lift + 22 + row * (rh - 26) / 3;
        glow(ctx, wx, wy + 8, 36, 28, '206,214,196');
        ctx.fillStyle = '#8a968a'; ctx.fillRect(wx - 7, wy, 14, 16);
        ctx.fillStyle = '#a8b4a4'; ctx.fillRect(wx - 5, wy + 2, 10, 7);
      }
      // il portone ad arco senza porta, in cima alla mulattiera: appoggiato al
      // muro, non staccato da esso
      const gx = rx + 16;
      ctx.fillStyle = '#b8ae90'; ctx.fillRect(gx - 21, ry + rh - 42, 42, 52);
      ctx.fillStyle = '#d0c8ac'; ctx.fillRect(gx - 21, ry + rh - 44, 42, 5);
      ctx.fillStyle = 'rgba(60,50,32,.28)'; ctx.fillRect(gx + 12, ry + rh - 42, 9, 52);
      ctx.fillStyle = '#100f0c'; ctx.fillRect(gx - 13, ry + rh - 30, 26, 40);
      arco(ctx, gx, ry + rh - 26, 13, 15, 6, '#100f0c', r, 4);
      /* LA SCIA E LA BARCA DI CIRO. Prima la scia erano quattordici rettangoli alti quattro
         pixel che scendevano in diagonale con un salto di undici pixel fra uno e l'altro: nel
         PNG una scaletta di gradini pallidi appoggiata sull'acqua aperta, e in cima non c'era
         nessuna barca. Una scia si disegna per colonne, con due lembi che divergono venendo
         avanti; e in testa ci va la barca, che a questa inquadratura serve anche per un'altra
         ragione — e' l'unico metro di scala. Ventisei pixel di scafo per una barca da sei
         metri dicono all'occhio quanto e' grande l'isola dietro. */
      {
        /* La barca sta sull'ACQUA, al piede dello scivolo. Al primo colpo l'avevo messa a
           y=205, che su questa inquadratura e' la parete di tufo dell'isola: una barca
           bianca appoggiata sulla roccia a trenta metri dal mare. La linea d'acqua sta a
           y=240, e il piede dello scivolo a 268. */
        const px0 = 172, py0 = 268;
        for (let x = 40; x < px0; x += 2) {
          const t = (px0 - x) / (px0 - 40);
          const y = py0 + t * (H - 18 - py0);
          const div = (px0 - x) * 0.16;
          ctx.fillStyle = `rgba(226,244,250,${0.34 - t * 0.24})`;
          ctx.fillRect(x, Math.round(y - div * 0.5), 2, 2);
          ctx.fillRect(x, Math.round(y + div * 0.5), 2, 2);
        }
        ctx.fillStyle = 'rgba(12,30,40,.30)'; pixelEllipse(ctx, px0, py0 + 5, 15, 3, 3);
        ctx.fillStyle = '#e8ece6'; ctx.fillRect(px0 - 13, py0, 26, 5);        // lo scafo
        ctx.fillStyle = '#c8ccc6'; ctx.fillRect(px0 - 13, py0 + 4, 26, 2);
        ctx.fillStyle = '#e8ece6'; ctx.fillRect(px0 + 11, py0 - 2, 4, 4);     // la prua alzata
        ctx.fillStyle = '#4a4238'; ctx.fillRect(px0 - 11, py0 - 4, 3, 5);     // Ciro, in piedi a poppa
        ctx.fillStyle = '#8a7a5a'; ctx.fillRect(px0 - 11, py0 - 7, 3, 3);
      }
    },

    panopticon(ctx, W, H) {
      // L'INTERNO DEL CARCERE BORBONICO. Novantanove celle su TRE PIANI a ferro di
      // cavallo intorno a una cappella tonda col tetto crollato. Costruito nel 1797
      // perché UNA guardia sola vedesse tutti. Siamo in piedi dove stava la guardia:
      // il posto smette di essere un'architettura e diventa un imbuto.
      const r = rng(seedOf('panopticon'));
      const wellY = H * 0.82;
      blocks(ctx, 0, 0, W, H, '#5e564a', 16, r, 0.10);
      // il muro di fondo delle gallerie: calce sporca, colature, e il buio in alto
      blocks(ctx, 0, 0, W, wellY, '#8a8270', 12, r, 0.09);
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = 'rgba(56,48,36,.24)';
        ctx.fillRect(r() * W | 0, 0, 5 + r() * 14 | 0, r() * wellY | 0);
      }
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = `rgba(14,12,10,${0.10 + i * 0.06})`;
        ctx.fillRect(0, 0, W, H * 0.10 - i * H * 0.017);
      }
      // la luce che scende dal tetto crollato della cappella
      for (let i = 1; i <= 7; i++) {
        const t = i / 7;
        ctx.fillStyle = `rgba(214,220,202,${0.045 * (1 - t * 0.6)})`;
        pixelEllipse(ctx, W * 0.5, H * 0.02 + t * wellY, W * (0.09 + t * 0.15), H * 0.04 + t * 24, 4);
      }
      // I TRE ANELLI. Il centro è LONTANO (in alto, piccolo), i lati sono VICINI
      // (in basso, grandi): è la curva che ti si chiude addosso.
      const TH = 1.30;                                  // mezza apertura del ferro di cavallo
      const N = 17;                                     // porte visibili per anello
      for (let tier = 0; tier < 3; tier++) {
        const yc = H * (0.17 + tier * 0.19);
        // il fondo della galleria: più scuro del muro, così le porte staccano
        for (let dx = 0; dx <= W; dx += 5) {
          const u = (dx / W) * 2 - 1, n = u * u;
          const y = yc + n * (H * 0.095 + tier * H * 0.05);
          const s = 0.60 + 0.40 * n;
          blocks(ctx, dx, y - 56 * s, 5, 56 * s, shadeHex('#8a8270', 0.60 + n * 0.26), 5, r, 0.08);
          ctx.fillStyle = `rgba(10,10,12,${0.30 - n * 0.14})`;
          ctx.fillRect(dx, y - 56 * s, 5, 20 * s);
        }
        // LE PORTE: tutte rivolte al centro, tutte alla stessa distanza, tutte con
        // lo spioncino alla stessa altezza da terra.
        for (let j = 0; j < N; j++) {
          const th = (-1 + 2 * j / (N - 1)) * TH;
          const u = Math.sin(th) / Math.sin(TH);
          const n = Math.abs(u);
          const x = W * 0.5 + W * 0.485 * u;
          const s = 0.58 + 0.42 * n * n;
          const fy = yc + n * n * (H * 0.095 + tier * H * 0.05);
          const dh = 48 * s, dw = 28 * s * (1 - 0.42 * n);
          // l'imbotte scavata nel muro di calce, con l'arco sopra
          ctx.fillStyle = shadeHex('#c9c2b0', 0.84 + n * 0.16);
          ctx.fillRect(x - dw / 2 - 4, fy - dh - 5, dw + 8, dh + 5);
          ctx.fillStyle = shadeHex('#c9c2b0', 1.02 + n * 0.06);
          ctx.fillRect(x - dw / 2 - 4, fy - dh - 5, dw + 8, 3);
          // quattro porte del secondo anello sono ACCOSTATE: non chiuse, accostate,
          // di quel tanto che basta a fare buio dietro. Sono quelle che fanno clac.
          const ajar = tier === 1 && (j === 4 || j === 6 || j === 9 || j === 12);
          if (ajar) {
            ctx.fillStyle = '#000000'; ctx.fillRect(x - dw / 2, fy - dh, dw, dh);
            ctx.fillStyle = shadeHex('#7a6748', 0.92 + n * 0.20);       // il battente scostato
            ctx.fillRect(x - dw / 2, fy - dh, dw * 0.40, dh);
            ctx.fillStyle = shadeHex('#7a6748', 0.60);
            ctx.fillRect(x - dw / 2 + dw * 0.40, fy - dh, 3, dh);
            ctx.fillStyle = 'rgba(226,222,200,.34)';                     // il filo di luce sul bordo
            ctx.fillRect(x - dw / 2 - 2, fy - dh, 2, dh);
          } else {
            ctx.fillStyle = shadeHex('#7a6748', 0.92 + n * 0.22);
            ctx.fillRect(x - dw / 2, fy - dh, dw, dh);
            ctx.fillStyle = shadeHex('#7a6748', 0.68 + n * 0.14);
            ctx.fillRect(x - dw / 2 + 3, fy - dh + 5, dw - 6, dh * 0.38);
            ctx.fillRect(x - dw / 2 + 3, fy - dh * 0.50, dw - 6, dh * 0.38);
            ctx.fillStyle = shadeHex('#7a6748', 1.18);
            ctx.fillRect(x - dw / 2, fy - dh, dw, 2);
          }
          // LO SPIONCINO: alla stessa altezza da terra in tutte e novantanove
          ctx.fillStyle = '#100e0a';
          ctx.fillRect(x - 2 * s, fy - dh * 0.60, Math.max(3, 6 * s), Math.max(3, 6 * s));
          ctx.fillStyle = 'rgba(226,222,200,.26)';
          ctx.fillRect(x - 2 * s, fy - dh * 0.60, Math.max(3, 6 * s), 1);
          // il numero dipinto a mano sopra la porta, con lo stampino, in nero
          ctx.fillStyle = `rgba(24,20,14,${0.40 + n * 0.26})`;
          ctx.fillRect(x - 7 * s, fy - dh - 12 * s, 4 * s, 4 * s);
          ctx.fillRect(x - 1 * s, fy - dh - 12 * s, 4 * s, 4 * s);
          ctx.fillRect(x + 5 * s, fy - dh - 12 * s, 4 * s, 4 * s);
        }
        // IL BALLATOIO che corre davanti alle porte, con la lastra e il parapetto
        for (let dx = 0; dx <= W; dx += 5) {
          const u = (dx / W) * 2 - 1, n = u * u;
          const y = yc + n * (H * 0.095 + tier * H * 0.05);
          ctx.fillStyle = shadeHex('#c9c2b0', 0.94 + n * 0.14);
          ctx.fillRect(dx, y - 7, 5, 5);
          ctx.fillStyle = shadeHex('#8a8272', 0.70 + n * 0.22);
          ctx.fillRect(dx, y - 2, 5, 13);
          ctx.fillStyle = `rgba(12,12,14,${0.34 + n * 0.14})`;
          ctx.fillRect(dx, y + 11, 5, 7);
        }
        // le colonnine di ferro della ringhiera, poche e storte
        for (let j = 0; j < 26; j++) {
          const u = -1 + 2 * j / 25, n = u * u;
          const x = W * 0.5 + W * 0.5 * u;
          const y = yc + n * (H * 0.095 + tier * H * 0.05);
          ctx.fillStyle = 'rgba(34,28,20,.62)';
          ctx.fillRect(x + ((j % 3) - 1), y - 20, 3, 14);
        }
      }
      // IL POZZO in fondo: il pavimento dove sta la guardia
      blocks(ctx, 0, wellY, W, H - wellY, '#a09884', 12, r, 0.10);
      ctx.fillStyle = 'rgba(40,34,26,.26)';
      for (let x = 0; x < W; x += 44) ctx.fillRect(x, wellY, 3, H - wellY);
      ctx.fillStyle = 'rgba(40,34,26,.22)';
      for (let y = wellY; y < H; y += 16) ctx.fillRect(0, y, W, 2);
      // il disco di luce che il tetto crollato butta sul pavimento del pozzo
      for (let i = 4; i >= 1; i--) {
        ctx.fillStyle = `rgba(224,228,210,${0.055 * i})`;
        pixelEllipse(ctx, W * 0.5, wellY + 34, 80 + i * 34, 16 + i * 8, 4);
      }
      // i calcinacci e le tegole cadute intorno alla cappella
      for (let i = 0; i < 34; i++) {
        const px2 = W * 0.5 + (r() - 0.5) * W * 0.7, py2 = wellY + 4 + r() * (H - wellY - 6);
        ctx.fillStyle = ['#8a8272', '#6a6252', '#b0a894'][Math.floor(r() * 3)];
        ctx.fillRect(px2 | 0, py2 | 0, 6 + r() * 12 | 0, 4);
      }
      // LA CAPPELLA TONDA al centro, col tetto crollato dentro sé stessa
      const chx = W * 0.5, chw = W * 0.21, chy = H * 0.62, chh = H * 0.22;
      blocks(ctx, chx - chw / 2, chy, chw, chh, '#c0b8a4', 8, r, 0.08);
      ctx.fillStyle = 'rgba(255,250,230,.16)'; ctx.fillRect(chx - chw / 2, chy, chw * 0.4, chh);
      ctx.fillStyle = 'rgba(30,26,20,.30)'; ctx.fillRect(chx + chw * 0.16, chy, chw * 0.34, chh);
      // il tetto: una cupola CROLLATA — il bordo resta solo ai lati, e in mezzo
      // c'è il buco da cui entra la luce
      arco(ctx, chx, chy + 6, chw / 2, 34, 9, '#b0a894', r, 5);
      ctx.fillStyle = '#08080a';
      for (let dx = -chw * 0.34; dx < chw * 0.34; dx += 6) {
        const t = dx / (chw * 0.34);
        ctx.fillRect(chx + dx, chy - 30 * Math.sqrt(Math.max(0, 1 - t * t)) + 4, 6, 34 * Math.sqrt(Math.max(0, 1 - t * t)) + 4);
      }
      ctx.fillStyle = '#8a8272';
      for (let k = 0; k < 7; k++) {
        const dx = -chw * 0.30 + k * chw * 0.10;
        ctx.fillRect(chx + dx, chy - 12 + ((k * 5) % 13), 8, 5);
      }
      // la porta della cappella, aperta sul niente
      ctx.fillStyle = '#3a342a'; ctx.fillRect(chx - 17, chy + chh - 48, 34, 48);
      arco(ctx, chx, chy + chh - 44, 17, 18, 6, '#3a342a', r, 4);
      ctx.fillStyle = '#040406'; ctx.fillRect(chx - 11, chy + chh - 40, 22, 40);
      // LA COSA FREDDA: se parli, la tua voce torna da novantanove punti insieme e
      // arriva un pelo dopo. Gli anelli del ritorno, sul pavimento del pozzo.
      for (let i = 1; i <= 6; i++) {
        ctx.fillStyle = `rgba(214,220,200,${0.05 - i * 0.006})`;
        pixelEllipse(ctx, W * 0.5, wellY + 36, 54 + i * 48, 11 + i * 10, 4);
      }
    },

    cella(ctx, W, H) {
      // LA CELLA 47. Due metri per tre. Il tavolato di pietra colato nel muro, il
      // buco nel pavimento nell'angolo, la finestrella quaranta per venti che dà
      // su un pezzo di cielo grande come un francobollo. E la parete destra, che è
      // un referto: ottomilaquarantuno tacche, in gruppi di cinque.
      const r = rng(seedOf('cella'));
      const floorY = H * 0.78, cornerX = W * 0.24;
      // LA PARETE DI FONDO e quella DESTRA, con l'angolo in mezzo: la stanza esiste
      blocks(ctx, 0, 0, W, floorY, '#b0a894', 14, r, 0.07);
      // il muro di sinistra, in ombra, visto di scorcio
      for (let x = 0; x < cornerX; x += 6) {
        const t = 1 - x / cornerX;
        ctx.fillStyle = shade('#8a8270', 0.72 + (1 - t) * 0.22);
        ctx.fillRect(x, -t * 20, 6, floorY + t * 30);
      }
      ctx.fillStyle = 'rgba(20,16,10,.34)'; ctx.fillRect(cornerX - 5, 0, 8, floorY);
      // GLI STRATI DI CALCE staccati, e sotto il tufo vivo col grasso di duecento
      // anni di corpi: una patina scura, unta, che non è muffa e non viene via.
      for (let i = 0; i < 26; i++) {
        const sx = cornerX + r() * (W - cornerX), sy = r() * floorY;
        ctx.fillStyle = ['rgba(158,148,128,.5)', 'rgba(124,110,88,.46)', 'rgba(70,58,42,.44)'][Math.floor(r() * 3)];
        ctx.fillRect(sx, sy, 34 + r() * 90, 22 + r() * 60);
      }
      ctx.fillStyle = 'rgba(40,32,22,.34)'; ctx.fillRect(0, floorY - 120, W, 120);
      // IL PAVIMENTO, e il buco nell'angolo con intorno sessant'anni di niente
      blocks(ctx, 0, floorY, W, H - floorY, '#7e7664', 12, r, 0.11);
      ctx.fillStyle = 'rgba(24,20,14,.44)'; ctx.fillRect(0, floorY, W, 6);
      ctx.fillStyle = 'rgba(255,246,220,.10)'; ctx.fillRect(0, floorY + 6, W, 3);
      // i corsi del pavimento si allargano venendo avanti (a passo fisso è un
      // muro messo giù), e i giunti dritti convergono al centro del quadro
      ctx.fillStyle = 'rgba(30,26,18,.20)';
      for (let y = floorY + 10, p = 8; y < H; p *= 1.5, y += p) ctx.fillRect(0, y, W, 2);
      for (let k = -6; k <= 6; k++) {
        for (let yy = floorY + 6; yy < H; yy++) {
          const t = (yy - floorY) / (H - floorY);
          ctx.fillRect(Math.round(W / 2 + k * 46 * (1 + t * 1.6)), yy, 2, 1);
        }
      }
      ctx.fillStyle = '#4a4238'; pixelEllipse(ctx, W * 0.90, H - 26, 40, 18, 4);
      ctx.fillStyle = '#2a241c'; pixelEllipse(ctx, W * 0.90, H - 26, 32, 13, 4);
      ctx.fillStyle = '#04050a'; pixelEllipse(ctx, W * 0.90, H - 25, 24, 9, 4);
      ctx.fillStyle = 'rgba(120,104,74,.34)'; pixelEllipse(ctx, W * 0.90, H - 40, 44, 8, 4);
      // IL TAVOLATO DI PIETRA colato nel muro, a sinistra: era il letto
      ctx.fillStyle = 'rgba(20,16,10,.42)'; ctx.fillRect(0, floorY - 44, W * 0.30, 12);
      ctx.fillStyle = '#a49c88'; ctx.fillRect(0, floorY - 62, W * 0.30, 20);
      ctx.fillStyle = '#c0b8a2'; ctx.fillRect(0, floorY - 65, W * 0.30, 6);
      ctx.fillStyle = 'rgba(30,26,18,.28)'; ctx.fillRect(0, floorY - 45, W * 0.30, 6);
      // il pagliericcio: paglia marcita in un sacco che non c'è più
      ctx.fillStyle = '#8a7448';
      for (let i = 0; i < 110; i++) ctx.fillRect(r() * W * 0.28 | 0, floorY - 78 + r() * 17 | 0, 7 + r() * 10 | 0, 2);
      ctx.fillStyle = '#5e5034';
      for (let i = 0; i < 45; i++) ctx.fillRect(r() * W * 0.26 | 0, floorY - 72 + r() * 12 | 0, 10, 2);
      // LA FINESTRELLA alta, quaranta per venti: un francobollo di cielo
      const fx2 = W * 0.40, fy2 = H * 0.09;
      ctx.fillStyle = '#5a5244'; ctx.fillRect(fx2 - 14, fy2 - 12, 74, 50);
      ctx.fillStyle = '#726a58'; ctx.fillRect(fx2 - 10, fy2 - 8, 66, 6);
      ctx.fillStyle = '#8ab4cc'; ctx.fillRect(fx2, fy2, 46, 24);
      ctx.fillStyle = '#c0dae6'; ctx.fillRect(fx2 + 3, fy2 + 2, 22, 10);
      ctx.fillStyle = '#3a3a34'; ctx.fillRect(fx2 + 21, fy2, 5, 24);
      ctx.fillStyle = '#2e2a22'; ctx.fillRect(fx2, fy2 + 11, 46, 3);
      // il fascio dalla finestrella: obliquo, stretto, muore a metà parete
      for (let i = 1; i <= 8; i++) {
        const t = i / 8;
        ctx.fillStyle = `rgba(182,208,226,${0.06 * (1 - t * 0.74)})`;
        pixelEllipse(ctx, fx2 + 26 - t * 110, fy2 + 24 + t * (floorY - fy2), 26 + t * 36, 13 + t * 24, 4);
      }
      // LA BANDA LUCIDA E CONSUMATA all'altezza della spalla, lungo tutta la
      // parete destra: duecento anni di schiene che passano nello stesso metro.
      ctx.fillStyle = 'rgba(56,46,34,.44)'; ctx.fillRect(cornerX, H * 0.46, W - cornerX, 18);
      ctx.fillStyle = 'rgba(214,204,182,.24)'; ctx.fillRect(cornerX, H * 0.46, W - cornerX, 6);
      // LE TACCHE: ottomilaquarantuno, in fasce, in gruppi di cinque. La torcia
      // tenuta di taglio, radente al muro, le fa venire fuori una per una.
      const tx0 = cornerX + 14, tw = W - tx0 - 40, ty0 = H * 0.17;
      /* Tredici righe alte trenta, tutte da tx0 a tx0+tw: la mano era regolare
         nel piccolo (la quinta di traverso, il dy di un pixel) e una STAMPANTE
         nel grande. Tredici bande identiche che coprono tutta la parete
         leggono come carta da parati anche se ogni singola tacca è storta,
         perché l'occhio vede prima il reticolo e poi il tratto.
         Un muro contato per ventidue anni non è un reticolo: si comincia
         all'altezza della mano da seduti sul tavolato (H*0.46, dove il
         tavolato è), si va avanti finché la fascia arriva alla porta, poi si
         scende, poi quando sotto è pieno si sale — e le ultime, quelle degli
         ultimi anni, sono corte e più leggere, perché contare stanca. La
         fascia di ogni anno parte da dove finiva quella prima, non dal
         margine: `da` non è mai tx0 due volte di seguito.
         Le fasce stanno a ventisette pixel: sotto i ventisei le tacche alte
         quattordici si toccano fra una fascia e l'altra e tornano a fare una
         massa tratteggiata, che è lo stesso difetto con un altro passo. */
      const fasce = [
        // y,            da,               a,                 forza
        [H * 0.470, tx0, tx0 + tw, 1.00],
        [H * 0.545, tx0 + 6, tx0 + tw - 12, 0.96],
        [H * 0.395, tx0 + 22, tx0 + tw, 0.92],
        [H * 0.620, tx0, tx0 + tw * 0.84, 0.88],
        [H * 0.320, tx0 + 40, tx0 + tw - 30, 0.82],
        [H * 0.695, tx0 + 18, tx0 + tw * 0.62, 0.74],
        [H * 0.245, tx0 + 30, tx0 + tw - 70, 0.64],
        [H * 0.170, tx0 + 120, tx0 + tw - 30, 0.48],  // l'ultimo anno: corta e stanca
      ];
      for (const [fy, fda, fa, forza] of fasce) {
        const y = fy;
        if (y > floorY - 16) continue;
        /* I gruppi di cinque non si leggevano: quattro tacche più una, staccate di
           sei pixel invece di cinque, facevano una tessitura regolare — sullo schermo
           veniva carta da parati a righe, non un uomo che conta. Un gruppo di cinque
           si riconosce da una cosa sola: la QUINTA È DI TRAVERSO, tirata sopra le
           altre quattro. E la mano non è una stampante: ogni gruppo scende o sale di
           un pixel, e le tacche non sono mai alte uguali. */
        let x = fda, g = 0, dy = 0;
        while (x < fa - 6) {
          const hh = 11 + (r() * 4 | 0);      // tre centimetri di unghia, non venti
          const luce = (1 - Math.abs(x - W * 0.5) / W) * forza;  // il fascio sta al centro
          const scuro = `rgba(36,30,20,${(0.44 + luce * 0.34) * forza})`;
          const chiaro = `rgba(236,226,200,${(0.16 + luce * 0.34) * forza})`;
          if (g % 5 === 4) {                                    // la quinta, di traverso
            for (let s = 0; s < 22; s++) {
              const sx = x - 20 + s, sy = y + dy + hh - 2 - (s * hh) / 24;
              ctx.fillStyle = scuro; ctx.fillRect(sx, sy, 2, 2);
              ctx.fillStyle = chiaro; ctx.fillRect(sx, sy - 2, 2, 1);
            }
            x += 11; g++; dy = (r() * 3 | 0) - 1;               // e si ricomincia più su o più giù
            continue;
          }
          ctx.fillStyle = scuro; ctx.fillRect(x, y + dy, 2, hh);
          ctx.fillStyle = chiaro; ctx.fillRect(x + 2, y + dy, 2, hh);
          x += 5; g++;
        }
      }
      // LA COSA FREDDA: l'ultima tacca, in alto a destra, quella dopo cui non c'è
      // niente. Dentro le altre ottomilaquaranta il tufo è grigio di sessant'anni
      // di polvere. Dentro questa il tufo è GIALLO. Chiaro. Pulito.
      const ux = tx0 + tw - 30, uy = ty0 - 2;
      // aloni 74×62 e 34×30 volevano dire 296×248 e 136×120 finiti: un lampione in
      // cima al muro per un segno di quattro pixel. Deve essere piccolo e sveglio.
      glow(ctx, ux + 3, uy + 11, 19, 16, '240,206,96');
      glow(ctx, ux + 3, uy + 11, 9, 8, '255,230,150');
      ctx.fillStyle = '#2e2410'; ctx.fillRect(ux - 1, uy, 4, 24);
      ctx.fillStyle = '#f2d878'; ctx.fillRect(ux + 3, uy, 4, 24);
      ctx.fillStyle = '#fff6c8'; ctx.fillRect(ux + 4, uy, 3, 11);
      // e intorno, la polvere di tufo appena caduta: qualcuno l'ha incisa adesso
      ctx.fillStyle = 'rgba(232,206,120,.34)';
      for (let i = 0; i < 9; i++) ctx.fillRect(ux - 8 + r() * 22 | 0, uy + 26 + r() * 14 | 0, 3, 2);
      // il bordo della porta, dietro di noi a destra: l'unica uscita, e la 47 è
      // l'unica chiusa di novantanove
      ctx.fillStyle = 'rgba(18,16,12,.52)'; ctx.fillRect(W * 0.97, 0, W * 0.03, floorY);
      ctx.fillStyle = 'rgba(255,248,220,.10)'; ctx.fillRect(W * 0.968, 0, 3, floorY);
      // la torcia, tenuta di taglio da sinistra, appena sopra il tavolato
      conoTorcia(ctx, cornerX - 20, H * 0.54, 0.99, -0.10, W * 0.62, 44);
    },

    cimitero(ctx, W, H) {
      // IL CIMITERO DEI DETENUTI: fuori dal muro, a mezza costa, su un terrazzamento
      // che guarda il mare aperto. Un quadrato di terra secca dentro un muretto che
      // arriva alla vita, e dentro le croci di ferro tondo saldate a mano. Non hanno
      // nomi: hanno NUMERI. Trentanove croci. Quaranta avvallamenti.
      const r = rng(seedOf('cimitero'));
      const horiz = H * 0.30, terrY = H * 0.46;
      skyGradient(ctx, W, horiz, '#7eb8d0', '#e4e6d4', 9);
      ctx.fillStyle = 'rgba(255,255,240,.16)'; ctx.fillRect(0, 0, W, horiz);
      // il mare aperto, sotto e dietro: si vede da sopra il muretto
      sea(ctx, W, horiz, terrY, '#17527a', '#22709a', r, 6, 0.6);
      ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(0, horiz, W, 2);
      // IL MURETTO che arriva alla vita, sul filo del terrazzamento
      muretto(ctx, 0, terrY - 14, W, 36, '#cfc39c', r);
      ctx.fillStyle = 'rgba(255,255,240,.26)'; ctx.fillRect(0, terrY - 14, W, 4);
      ctx.fillStyle = 'rgba(60,52,36,.26)'; ctx.fillRect(0, terrY + 18, W, 5);
      // LA TERRA SECCA dentro il muretto, e la calce sparsa a manciate
      blocks(ctx, 0, terrY + 22, W, H - terrY - 22, '#bfae86', 14, r, 0.12);
      ctx.fillStyle = 'rgba(255,252,236,.20)'; ctx.fillRect(0, terrY + 22, W, H - terrY - 22);
      ctx.fillStyle = 'rgba(255,255,250,.34)';
      for (let i = 0; i < 46; i++) pixelEllipse(ctx, r() * W, terrY + 28 + r() * (H - terrY - 32), 9 + r() * 16, 4, 4);
      // GLI AVVALLAMENTI: la terra sopra una fossa si assesta e fa un incavo lungo,
      // larghezza di spalle, che dopo cent'anni si vede ancora se ti abbassi e
      // guardi in radente contro la luce.
      const fosse = [];
      for (let row = 0; row < 3 && fosse.length < 40; row++) {
        for (let i = 0; i < 14 && fosse.length < 40; i++) {
          /* UN PO' DI DISORDINE, perche' un cimitero di fossa comune non e' un vivaio: il
             passo era esatto — 65,3 px orizzontali, 13,4 di sfalsamento, tre righe — e
             sullo schermo era un reticolo. Chi ha scavato queste quaranta fosse in
             centoventisette anni non aveva una dima. */
          fosse.push([W * 0.038 + i * W * 0.068 + row * W * 0.014 + ((i * 53) % 13 - 6),
                      terrY + 48 + row * (H - terrY - 66) / 2.5 + ((i * 29) % 7 - 3), row]);
        }
      }
      for (const [x, y] of fosse) {
        ctx.fillStyle = 'rgba(255,252,236,.26)'; pixelEllipse(ctx, x, y + 11, 19, 4, 4);
        ctx.fillStyle = 'rgba(104,88,58,.36)'; pixelEllipse(ctx, x, y + 17, 19, 7, 4);
      }
      // LE CROCI: ferro tondo, saldate a mano, alte un metro, ognuna storta a modo
      // suo. Trentanove: la quarantesima fossa, nell'angolo, non ce l'ha.
      for (let i = 0; i < fosse.length; i++) {
        if (i === 39) continue;
        const [x, y, row] = fosse[i];
        const s = 0.74 + row * 0.18;
        /* LE CROCI SI INCLINANO DAVVERO. Il commento diceva «ognuna storta a modo suo» e il
           codice sommava lo stesso `tilt` al palo E al braccio: cioe' traslava la croce
           intera di tre pixel e mezzo, tenendola perfettamente a piombo. Tutte e trentanove.
           Un'inclinazione vera si fa scostando ogni riga del palo di tan(angolo) per la sua
           altezza — sono due righe di codice — e allora il ferro tondo saldato a mano da
           centoventisette anni nella terra si vede che ha ceduto. */
        const ang = ((i * 37) % 11 - 5) * 0.022;
        const hh = 44 * s;
        ctx.fillStyle = 'rgba(60,52,38,.26)'; ctx.fillRect(x + 5, y + 12, 17 * s, 4);
        for (let k = 0; k < hh; k++) {
          const yy = y + 13 - k, dx = Math.tan(ang) * k;
          ctx.fillStyle = '#3a342c'; ctx.fillRect(x + dx, yy, 5 * s, 1);
          ctx.fillStyle = '#4e463c'; ctx.fillRect(x + dx, yy, 2 * s, 1);
        }
        const bracY = y + 13 - hh * 0.70, bracDx = Math.tan(ang) * hh * 0.70;
        for (let k = 0; k < 25 * s; k++) {
          ctx.fillStyle = '#3a342c';
          ctx.fillRect(x + bracDx - 10 * s + k, bracY + Math.round(Math.tan(ang) * (10 * s - k)), 1, 5 * s);
        }
        // la piastra ovale col numero dipinto in bianco
        const piY = y + 13 - hh * 0.40, piDx = Math.tan(ang) * hh * 0.40;
        ctx.fillStyle = '#5e564a'; pixelEllipse(ctx, x + piDx + 2, piY, 9 * s, 7 * s, 3);
        ctx.fillStyle = '#eceadc';
        ctx.fillRect(x + piDx - 3 * s, piY - 3 * s, 3 * s, 6 * s);
        ctx.fillRect(x + piDx + 3 * s, piY - 3 * s, 3 * s, 6 * s);
      }
      // IL QUARANTESIMO, nell'angolo: solo l'avvallamento. Nessuna croce, e la
      // calce intorno è più fresca di tutte le altre.
      {
        const [x, y] = fosse[39];
        ctx.fillStyle = 'rgba(255,255,250,.60)'; pixelEllipse(ctx, x, y + 12, 22, 6, 4);
        ctx.fillStyle = 'rgba(120,100,64,.46)'; pixelEllipse(ctx, x, y + 18, 21, 7, 4);
        ctx.fillStyle = 'rgba(255,255,250,.34)'; pixelEllipse(ctx, x, y + 25, 26, 5, 4);
      }
      // le sterpaglie che si mangiano il recinto, e un fico d'India nell'angolo
      sterpaglie(ctx, 0, terrY + 34, W, '#ada056', r, 34);
      sterpaglie(ctx, 0, H - 4, W, '#9a8a4a', r, 30);
      fichidindia(ctx, W * 0.03, H - 8, 58, '#6a8a5a', r);
      fichidindia(ctx, W * 0.97, H - 14, 44, '#638253', r);
      // IL MURO DEL CARCERE che chiude la scena in alto a sinistra: siamo FUORI,
      // e da fuori quel muro è solo un muro.
      blocks(ctx, 0, 0, W * 0.17, terrY - 8, '#cfc7a8', 10, r, 0.08);
      ctx.fillStyle = 'rgba(255,252,232,.20)'; ctx.fillRect(0, 0, W * 0.17, 5);
      ctx.fillStyle = 'rgba(40,34,26,.26)'; ctx.fillRect(W * 0.15, 0, 14, terrY - 8);
      ctx.fillStyle = '#0e0e0c'; ctx.fillRect(W * 0.035, H * 0.13, 24, 30);
      ctx.fillStyle = 'rgba(255,252,232,.20)'; ctx.fillRect(W * 0.035, H * 0.13, 24, 3);
      // e una lampada di calce sbiadita sul muro, spenta da sessant'anni
      ctx.fillStyle = '#8a8272'; ctx.fillRect(W * 0.11, H * 0.10, 14, 8);
      ctx.fillStyle = '#5a5448'; ctx.fillRect(W * 0.113, H * 0.11, 9, 10);
    },

    fossa(ctx, W, H) {
      // LA FOSSA. Un pozzo verticale che scende dal fondo del mare: quarantacinque
      // metri al bordo, ottantadue dentro. Il punto più buio e più stretto di tutto
      // il gioco. Il fondo è lì, illuminato e leggibile — e in mezzo si apre una
      // BOCCA che la torcia non riesce a riempire.
      const r = rng(seedOf('fossa'));
      // l'acqua sopra il fondo: il poco blu che sopravvive a quaranta metri
      for (let i = 0; i < 10; i++) {
        ctx.fillStyle = mix('#123444', '#1d4a5c', i / 9);
        ctx.fillRect(0, i * H * 0.05, W, H * 0.05 + 1);
      }
      const rimY = H * 0.44;
      // IL FONDO DEL MARE: sedimento chiaro nel fascio della torcia. Chiaro
      // apposta: a quaranta metri il velo lo spegne, e deve restare leggibile.
      // Non è un pavimento: è polvere, e la polvere non ha spigoli.
      ctx.fillStyle = '#77856f'; ctx.fillRect(0, rimY - 6, W, H - rimY + 6);
      for (let i = 0; i < 260; i++) {
        const sx = r() * W, sy = rimY - 8 + r() * (H - rimY + 10);
        ctx.fillStyle = ['rgba(140,152,132,.34)', 'rgba(96,108,92,.34)', 'rgba(58,70,56,.30)',
                         'rgba(170,182,160,.26)'][Math.floor(r() * 4)];
        pixelEllipse(ctx, sx, sy, 10 + r() * 34, 4 + r() * 5, 4);
      }
      ctx.fillStyle = 'rgba(226,238,220,.22)'; ctx.fillRect(0, rimY - 6, W, 5);
      // le pieghe del sedimento, che convergono tutte verso la bocca
      for (let i = 0; i < 22; i++) {
        const t = i / 22;
        ctx.fillStyle = `rgba(50,66,54,${0.10 + t * 0.16})`;
        ctx.fillRect(0, rimY + t * (H - rimY), W, 3);
      }
      for (let i = 0; i < 26; i++) {
        const sx = r() * W, sy = rimY + r() * (H - rimY);
        ctx.fillStyle = 'rgba(44,60,48,.34)';
        pixelEllipse(ctx, sx, sy, 18 + r() * 40, 5 + r() * 5, 4);
      }
      // posidonia morta a ciuffi, e la vita bianca che cresce sui bordi
      ctx.fillStyle = 'rgba(58,74,44,.62)';
      for (let i = 0; i < 70; i++) {
        const sx = r() * W, sy = rimY - 4 + r() * (H - rimY);
        ctx.fillRect(sx | 0, sy | 0, 7 + r() * 12 | 0, 3);
      }
      ctx.fillStyle = 'rgba(236,244,232,.5)';
      for (let i = 0; i < 60; i++) ctx.fillRect(r() * W | 0, rimY - 2 + r() * (H - rimY) | 0, 3, 3);
      // LA BOCCA: un'ellisse larga, vista un po' dall'alto, con il ciglio ILLUMINATO
      const mx = W * 0.5, my = rimY + H * 0.16, mrx = W * 0.23, mry = H * 0.20;
      // il ciglio: un anello chiaro che si sbriciola verso l'interno
      for (let k = 5; k >= 0; k--) {
        ctx.fillStyle = k % 2 ? 'rgba(186,204,178,.34)' : 'rgba(150,170,146,.44)';
        pixelEllipse(ctx, mx, my, mrx + 4 + k * 5, mry + 3 + k * 4, 4);
      }
      // e dentro: la gola. Anelli che si stringono e si spengono scendendo.
      for (let k = 0; k < 14; k++) {
        const t = k / 13;
        ctx.fillStyle = mix('#33423a', '#010306', Math.pow(t, 0.5));
        pixelEllipse(ctx, mx + t * 8, my + t * mry * 0.72, mrx * (1 - t * 0.72), mry * (1 - t * 0.66), 4);
      }
      ctx.fillStyle = '#000102';
      pixelEllipse(ctx, mx + 9, my + mry * 0.62, mrx * 0.24, mry * 0.30, 4);
      // le scaglie di roccia che franano dentro: il bordo non è mai pulito
      for (let i = 0; i < 30; i++) {
        const a = r() * 6.283;
        const px2 = mx + Math.cos(a) * mrx * (0.86 + r() * 0.24);
        const py2 = my + Math.sin(a) * mry * (0.86 + r() * 0.24);
        ctx.fillStyle = r() > 0.5 ? 'rgba(120,140,116,.5)' : 'rgba(30,40,34,.6)';
        ctx.fillRect(px2 | 0, py2 | 0, 6 + r() * 10 | 0, 5);
      }
      // LA CIMA: quaranta metri di corda con un piombo in fondo, TESA IN GIÙ.
      // Scende quasi a piombo e sparisce nella bocca: non si vede dove finisce.
      for (let i = 0; i < 70; i++) {
        const t = i / 70;
        const cx2 = mx - 34 + t * 22 + Math.sin(t * 2.2) * 4;
        const cy2 = t * (my + mry * 0.34);
        ctx.fillStyle = t < 0.78 ? `rgba(226,214,176,${0.92 - t * 0.44})` : `rgba(140,132,108,${0.5 - (t - 0.78) * 2.2})`;
        ctx.fillRect(cx2 | 0, cy2 | 0, 6, 6);
        ctx.fillStyle = `rgba(120,106,74,${0.5 - t * 0.3})`;      // la torsione dei legnoli
        ctx.fillRect(cx2 + 4 | 0, cy2 + (i % 2 ? 0 : 3) | 0, 2, 3);
      }
      // i nodi di riferimento, uno ogni cinque metri
      ctx.fillStyle = 'rgba(255,242,208,.85)';
      for (let i = 1; i < 8; i++) {
        const t = i / 9;
        ctx.fillRect(mx - 36 + t * 22 + Math.sin(t * 2.2) * 4, t * (my + mry * 0.34), 11, 5);
      }
      // LA TORCIA: dall'alto a sinistra. Illumina il fondo, e sulla bocca si ferma:
      // non c'è fondo da illuminare.
      conoTorcia(ctx, W * 0.10, H * 0.06, 0.66, 0.62, H * 0.62, 96);
      /* L'OMBRA FUORI DAL FASCIO, per colonne e non a scalini. Prima erano quattro fillRect
         annidati ancorati al bordo destro: quattro cuciture verticali nette alte trecentosessanta
         pixel, visibilissime, che sembravano bande di rendering e non un decadimento di luce.
         Trecentosessantacinque passi da un pixel con la curva a esponente 1,6 fanno il buio che
         STRINGE — e non costano niente. Stessa forma per la fascia in basso. */
      for (let x = Math.round(W * 0.62); x < W; x++) {
        const t = (x - W * 0.62) / (W * 0.38);
        ctx.fillStyle = `rgba(4,10,14,${(0.02 + Math.pow(t, 1.6) * 0.34).toFixed(3)})`;
        ctx.fillRect(x, 0, 1, H);
      }
      for (let y = H - 90; y < H; y++) {
        const t = (y - (H - 90)) / 90;
        ctx.fillStyle = `rgba(4,10,14,${(0.02 + Math.pow(t, 1.6) * 0.26).toFixed(3)})`;
        ctx.fillRect(0, y, W, 1);
      }
      // LA NEVE MARINA nel fascio: l'unica cosa che si muove
      ctx.fillStyle = 'rgba(232,242,255,.62)';
      for (let i = 0; i < 70; i++) ctx.fillRect(W * 0.06 + r() * W * 0.56 | 0, r() * H * 0.9 | 0, 2, 2);
      ctx.fillStyle = 'rgba(232,242,255,.30)';
      for (let i = 0; i < 30; i++) ctx.fillRect(W * 0.06 + r() * W * 0.6 | 0, r() * H | 0, 3, 3);
      // e sul labbro della bocca, a destra, un rosso che non c'entra niente con
      // l'acqua: la lamiera della Santa Lucia, appoggiata su un muro romano.
      ctx.fillStyle = '#6b2b1a'; ctx.fillRect(mx + mrx * 0.55, my + mry * 0.42, W * 0.13, 13);
      ctx.fillStyle = '#8a3a22'; ctx.fillRect(mx + mrx * 0.55, my + mry * 0.42, W * 0.13, 4);
      ctx.fillStyle = 'rgba(60,74,58,.5)'; ctx.fillRect(mx + mrx * 0.55, my + mry * 0.42 + 10, W * 0.13, 5);
      // IL MURO ROMANO a quarantacinque metri, con gli alloggiamenti quadrati per
      // le travi: gli stessi del porto, duemila anni più giù.
      const wmx = W * 0.79, wmy = my + mry * 0.26, wmw = W * 0.19;
      for (let row = 0; row < 3; row++) {
        let xx = wmx + (row % 2) * 9;
        while (xx < wmx + wmw) {
          const bw = 26 + (r() * 16 | 0);
          ctx.fillStyle = shade('#6e7866', 0.86 + r() * 0.30);
          ctx.fillRect(xx, wmy + row * 13, Math.min(bw, wmx + wmw - xx), 11);
          ctx.fillStyle = 'rgba(226,238,220,.16)';
          ctx.fillRect(xx, wmy + row * 13, Math.min(bw, wmx + wmw - xx), 2);
          xx += bw + 3;
        }
      }
      ctx.fillStyle = 'rgba(58,74,58,.5)';
      for (let i = 0; i < 26; i++) ctx.fillRect(wmx + r() * wmw | 0, wmy - 3 + r() * 42 | 0, 6 + r() * 9 | 0, 3);
      ctx.fillStyle = '#141a13';
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(wmx + 12 + i * 58, wmy + 15, 16, 14);
        ctx.fillStyle = 'rgba(226,238,220,.14)'; ctx.fillRect(wmx + 12 + i * 58, wmy + 15, 16, 2);
        ctx.fillStyle = '#141a13';
      }
    },

    relitto(ctx, W, H) {
      // LA STIVA DELLA SANTA LUCIA, a quarantacinque metri. Una stanza di lamiera
      // larga sei metri, INCLINATA DI TRENTA GRADI, col pavimento coperto da un
      // metro di sedimento grigio. E dentro il sedimento, i bagagli del 24 ottobre
      // 1943. Nessun osso: in tutta questa storia è l'unica misericordia.
      const r = rng(seedOf('relitto'));
      ctx.fillStyle = '#0a1014'; ctx.fillRect(0, 0, W, H);
      // tutta la stiva è inclinata: si ruota il mondo, non gli oggetti
      ctx.save();
      ctx.translate(W * 0.5, H * 0.5);
      ctx.rotate(-0.52);                       // trenta gradi, come dice il rilievo
      ctx.translate(-W * 0.5, -H * 0.5);
      const floorY = H * 0.60;
      // LE PARATIE DI LAMIERA ondulata, con le file di chiodi ribaditi. Chiare
      // quanto serve: a quaranta metri il velo si mangia tutto il resto. Il
      // rettangolo è largo il doppio del canvas, perché ruotato deve coprirlo tutto.
      blocks(ctx, -W * 0.7, -H * 1.0, W * 2.4, floorY + H * 1.0, '#5a5148', 14, r, 0.16);
      for (let y = -H * 1.0; y < floorY; y += 24) {
        ctx.fillStyle = 'rgba(140,64,34,.44)'; ctx.fillRect(-W * 0.7, y, W * 2.4, 8);
        ctx.fillStyle = 'rgba(30,26,22,.44)'; ctx.fillRect(-W * 0.7, y + 8, W * 2.4, 5);
        ctx.fillStyle = 'rgba(206,186,150,.20)';
        for (let x = -W * 0.7; x < W * 1.7; x += 26) ctx.fillRect(x, y + 2, 5, 5);
      }
      // le nervature verticali, e la ruggine che cola lungo ognuna
      for (let x = -W * 0.6; x < W * 1.6; x += W * 0.20) {
        ctx.fillStyle = 'rgba(150,132,110,.30)'; ctx.fillRect(x, -H * 1.0, 16, floorY + H * 1.0);
        ctx.fillStyle = 'rgba(140,64,34,.42)'; ctx.fillRect(x + 3, -H * 1.0, 7, floorY + H * 1.0);
      }
      // IL BOCCAPORTO: un quadrato nella paratia, in alto. Buio dentro il buio:
      // da lì la luce non entra, e non è che sia chiuso.
      const hx = W * 0.60, hy = H * 0.36, hw = W * 0.16, hh = H * 0.21;
      ctx.fillStyle = '#8a7a64'; ctx.fillRect(hx - 11, hy - 11, hw + 22, hh + 22);
      ctx.fillStyle = 'rgba(206,186,150,.30)'; ctx.fillRect(hx - 11, hy - 11, hw + 22, 6);
      ctx.fillStyle = 'rgba(140,64,34,.5)'; ctx.fillRect(hx - 11, hy + hh + 5, hw + 22, 6);
      ctx.fillStyle = '#000000'; ctx.fillRect(hx, hy, hw, hh);
      ctx.fillStyle = '#9a8a70';                 // i galletti di chiusura, tutti aperti
      for (const [ox, oy] of [[-9, hh * 0.18], [hw, hh * 0.18], [-9, hh * 0.72], [hw, hh * 0.72]]) {
        ctx.fillRect(hx + ox, hy + oy, 11, 11);
        ctx.fillStyle = '#6a5a48'; ctx.fillRect(hx + ox + 2, hy + oy + 2, 7, 7);
        ctx.fillStyle = '#9a8a70';
      }
      // IL SEDIMENTO: un metro di polvere grigia che a toccarlo si alza e non si
      // riappoggia più. Bordo sfrangiato, non una rampa liscia.
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = `rgba(${104 - i * 6},${108 - i * 6},${100 - i * 6},${0.94 - i * 0.05})`;
        for (let x = -W * 0.4; x < W * 1.4; x += 12) {
          const wob = Math.sin(x * 0.05 + i * 1.7) * 6 + Math.sin(x * 0.17) * 4;
          ctx.fillRect(x, floorY + i * 8 + wob, 12, 14);
        }
      }
      ctx.fillStyle = 'rgba(84,88,82,.92)'; ctx.fillRect(-W * 0.7, floorY + 48, W * 2.4, H * 1.2);
      ctx.fillStyle = 'rgba(150,154,146,.22)';
      for (let i = 0; i < 60; i++) pixelEllipse(ctx, r() * W, floorY + 10 + r() * 60, 8 + r() * 22, 4, 4);
      // I BAGAGLI incastrati nel sedimento: valigie di cartone pressato, gonfie,
      // aperte dal sale, mezze sepolte.
      const bag = [
        [0.12, 0.00, 104, 50, '#8a7250'], [0.28, 0.03, 80, 42, '#9a8058'],
        [0.44, -0.01, 112, 46, '#7e6c50'], [0.62, 0.04, 72, 38, '#8e7654'],
      ];
      for (const [fx, fy, bw, bh, col] of bag) {
        const bx = W * fx, by = floorY + fy * H + 14;
        ctx.fillStyle = 'rgba(30,34,30,.44)'; ctx.fillRect(bx - 4, by - 6, bw + 8, 10);
        ctx.fillStyle = col; ctx.fillRect(bx, by - bh, bw, bh);
        ctx.fillStyle = shade(col, 1.24); ctx.fillRect(bx, by - bh, bw, 6);
        ctx.fillStyle = shade(col, 0.60); ctx.fillRect(bx, by - bh * 0.46, bw, 6);   // la cerniera scoppiata
        ctx.fillStyle = 'rgba(6,8,10,.72)'; ctx.fillRect(bx + 7, by - bh * 0.46 + 3, bw - 14, bh * 0.22);
        ctx.fillStyle = '#4a4038'; ctx.fillRect(bx + bw * 0.42, by - bh * 0.46 - 4, 14, 11);  // la serratura
        ctx.fillStyle = 'rgba(160,164,156,.40)'; ctx.fillRect(bx, by - 10, bw, 10);
        // le cinghie di cuoio, ancora chiuse
        ctx.fillStyle = 'rgba(70,52,34,.7)';
        ctx.fillRect(bx + bw * 0.18, by - bh, 8, bh); ctx.fillRect(bx + bw * 0.70, by - bh, 8, bh);
      }
      // il fagotto legato con lo spago, con lo spago ancora annodato. Piccolo:
      // è la roba di una famiglia, non un carico.
      ctx.fillStyle = '#8a8272'; pixelEllipse(ctx, W * 0.82, floorY + 2, 27, 16, 4);
      ctx.fillStyle = '#9a9284'; pixelEllipse(ctx, W * 0.82, floorY - 2, 22, 11, 4);
      ctx.fillStyle = '#c8bea6';
      for (let k = -1; k < 2; k++) ctx.fillRect(W * 0.82 + k * 11 - 2, floorY - 12, 3, 28);
      ctx.fillStyle = '#e0d6bc'; ctx.fillRect(W * 0.816, floorY - 16, 12, 6);
      ctx.fillStyle = '#b0a690'; ctx.fillRect(W * 0.804, floorY - 14, 26, 3);
      /* LA CESTA DI VIMINI, e prima non era nel quadro. Era disegnata a x=W*0.02, y=floorY−36
         DENTRO il contesto ruotato di −0,52 rad attorno a (480, 180) — la stiva e' sbandata,
         come una nave appoggiata sul fianco — e quella rotazione le portava lo spigolo piu'
         alto a y=399 su una tela alta 360: fuori, tutta, compresi i barattoli. Sessantasei
         per cinquantadue pixel di roba disegnata per nessuno. La stiva ruotata tiene solo la
         banda centrale, quindi la cesta va dentro quella. */
      const cesX = W * 0.16, cesY = floorY - 10;
      ctx.fillStyle = '#a89058'; ctx.fillRect(cesX, cesY - 36, 66, 40);
      ctx.fillStyle = '#7a6840';
      for (let k = 0; k < 7; k++) ctx.fillRect(cesX, cesY - 34 + k * 6, 66, 3);
      for (let k = 0; k < 5; k++) ctx.fillRect(cesX + k * 14, cesY - 36, 3, 40);
      ctx.fillStyle = '#a8a89e';
      for (let k = 0; k < 3; k++) { ctx.fillRect(cesX + 6 + k * 21, cesY - 48, 17, 14);
        ctx.fillStyle = '#c8c8be'; ctx.fillRect(cesX + 6 + k * 21, cesY - 48, 17, 3); ctx.fillStyle = '#a8a89e'; }
      // UNA SCARPA DA UOMO, una sola, con la stringa fatta col doppio nodo di uno
      // che quella mattina aveva fretta
      ctx.fillStyle = '#4a3c30'; pixelEllipse(ctx, W * 0.37, floorY + 34, 28, 11, 3);
      ctx.fillStyle = '#5e4e3e'; ctx.fillRect(W * 0.37 - 7, floorY + 20, 24, 14);
      ctx.fillStyle = '#b0a690'; ctx.fillRect(W * 0.37 - 3, floorY + 17, 13, 5);
      ctx.fillStyle = '#c8bea6'; ctx.fillRect(W * 0.37 + 1, floorY + 14, 6, 5);
      // IL CAVALLINO DI LEGNO, appoggiato sul bordo di una valigia scoppiata come
      // lo appoggia un bambino quando ha le mani impegnate. È l'unica cosa calda.
      const cvx = W * 0.44 + 66, cvy = floorY - 62;
      glow(ctx, cvx + 14, cvy + 8, 62, 46, '220,170,96');
      /* IL CAVALLINO. E' l'oggetto piu' importante di tutto il gioco — quello che si puo'
         riportare dov'era — e nel PNG era una macchia gialla di trenta pixel indistinguibile
         dalle valigie di cartone, che sono dello stesso ocra a dieci pixel di distanza. Due
         cose lo salvano, e nessuna delle due e' il colore: il CONTORNO scuro, che lo stacca
         da tutto quello che gli sta attorno, e la SAGOMA — un cavallo si riconosce da collo,
         groppa, coda e ZAMPE, e le zampe qui sono TRE, perche' il testo dice «con una zampa
         in meno» e quello che il testo dice il quadro lo deve far vedere. Quarantasei pixel
         invece di trenta: sotto quella misura, in mezzo a delle valigie, non c'e' contorno
         che tenga. */
      ctx.fillStyle = '#2a1e10';                                            // il contorno
      ctx.fillRect(cvx - 2, cvy - 2, 46, 22);
      ctx.fillRect(cvx + 30, cvy - 20, 17, 22);
      ctx.fillStyle = '#c89858'; ctx.fillRect(cvx, cvy, 42, 18);            // la groppa
      ctx.fillRect(cvx + 32, cvy - 18, 13, 20);                             // il collo
      ctx.fillStyle = '#e8b878'; ctx.fillRect(cvx, cvy, 42, 5); ctx.fillRect(cvx + 32, cvy - 18, 13, 5);
      ctx.fillStyle = '#2a1e10';                                            // le zampe: TRE
      ctx.fillRect(cvx + 2, cvy + 18, 9, 18); ctx.fillRect(cvx + 30, cvy + 18, 9, 18);
      ctx.fillStyle = '#a87c40';
      ctx.fillRect(cvx + 3, cvy + 18, 7, 16); ctx.fillRect(cvx + 31, cvy + 18, 7, 16);
      ctx.fillStyle = '#a87c40'; ctx.fillRect(cvx + 16, cvy + 18, 7, 11);   // la terza, spezzata
      ctx.fillStyle = '#8a6430'; ctx.fillRect(cvx - 6, cvy + 1, 8, 14);     // la coda
      ctx.fillStyle = '#8a6430'; ctx.fillRect(cvx + 43, cvy - 16, 8, 11);   // il muso
      ctx.fillStyle = '#f0e0c0'; ctx.fillRect(cvx + 44, cvy - 15, 4, 4);    // l'occhio dipinto
      ctx.fillStyle = '#3a2a18'; ctx.fillRect(cvx + 45, cvy - 14, 2, 2);
      ctx.restore();
      // LA TORCIA, dalla nostra parte: un cono che dentro la stiva non arriva da
      // nessuna parte, perché la stiva è più grande della luce.
      conoTorcia(ctx, W * 0.02, H * 0.22, 0.94, 0.26, W * 0.70, 110);
      // LA NEVE MARINA che sale nel fascio: l'unica cosa che si muove, qui dentro
      ctx.fillStyle = 'rgba(232,242,255,.62)';
      for (let i = 0; i < 90; i++) ctx.fillRect(r() * W | 0, r() * H | 0, 2, 2);
      ctx.fillStyle = 'rgba(232,242,255,.30)';
      for (let i = 0; i < 40; i++) ctx.fillRect(r() * W | 0, r() * H | 0, 3, 3);
      // il nero che chiude i bordi: dentro non c'è corrente, non c'è suono
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = `rgba(2,6,10,${0.07 + i * 0.05})`;
        ctx.fillRect(0, 0, W, 10 + i * 8);
        ctx.fillRect(0, H - 10 - i * 8, W, 10 + i * 8);
        ctx.fillRect(0, 0, 10 + i * 8, H);
        ctx.fillRect(W - 10 - i * 8, 0, 10 + i * 8, H);
      }
    },

    scauri(ctx, W, H) {
      /* SCAURI, LUNGOMARE, ore 06:55 — la prima immagine del gioco.
         QUARTA STESURA, e questa volta da zero. Il committente, guardando la terza:
         «non capisco assolutamente che cosa fa vedere l'immagine. Vedo tipo una
         strada, la spiaggia, e tipo delle scale senza senso da sole; la macchina è
         fatta male». Aveva ragione su tutto, e la causa era una: le tre stesure prima
         erano un PANORAMA — cielo, mare, spiaggia, lidi, muretto, asfalto, macchina —
         sette cose in 960×360, ognuna troppo piccola per leggersi, e nessuna che
         facesse da soggetto. Le «scale senza senso» erano le pile di lettini: a
         quaranta pixel non c'è verso di far capire cos'è una pila di lettini.
         Adesso c'è UN soggetto grande e inconfondibile — la macchina di profilo col
         PORTELLONE APERTO e il borsone in terra accanto — e dietro solo il minimo che
         serve a dire dove siamo: il mare all'alba, la battigia, il muretto del
         lungomare. Un lampione tagliato dal bordo dà la scala. Cinque cose in tutto,
         tutte abbastanza grandi da riconoscersi. */
      const r = rng(seedOf('scauri'));
      const horiz = Math.round(H * 0.30);        // l'orizzonte, alto: il mare fa da fondo
      const riva = Math.round(H * 0.50);         // la battigia
      /* Le quote di sotto non sono scelte a occhio: sono le distanze. Con l'occhio a
         1,86 m e la focale a 2560 px, y = orizzonte + focale × altezza / distanza. Il
         cordolo del marciapiede sta a 22 metri (y=307), il piede del muretto a 26
         (y=276): e' per questo che le ruote davanti della macchina, che sono a 23,7
         metri, possono STARE sul marciapiede. Con le fasce messe a occhio stavano a una
         distanza dove il marciapiede non c'era ancora, e la macchina galleggiava. */
      const muro = Math.round(H * 0.695);        // il muretto del lungomare
      const asfalto = Math.round(H * 0.766);     // il suo piede, a ventisei metri

      /* IL CIELO dell'alba: il sole è sorto da venti minuti ma sta dietro le case,
         quindi il cielo è già chiaro e la luce viene da dietro l'osservatore. */
      skyGradient(ctx, W, horiz + 2, '#4e6d94', '#e9d3ac', 12);
      ctx.fillStyle = 'rgba(255,226,178,.20)'; ctx.fillRect(0, horiz - 30, W, 30);

      /* IL PROMONTORIO DI GAETA, a destra: Monte Orlando chiude il golfo. Sagoma
         piena e profilo netto — a venti chilometri, controluce, una montagna non è
         una velatura. */
      {
        /* Piu' scuro e con la cima piu' piatta: alla prima stesura era un azzurro
           chiaro con un profilo tondo, e sopra il mare sembrava una nuvola bassa. Una
           montagna controluce e' quasi nera, e Monte Orlando e' un tavolato, non una
           gobba. La riga di base sull'orizzonte e' quella che la tiene attaccata al
           mare invece di farla galleggiare. */
        const pcx = Math.round(W * 0.80), pw = W * 0.30, ph = H * 0.145;
        for (let dx = -pw / 2; dx < pw / 2 + 2; dx += 2) {
          const t = Math.abs(dx / (pw / 2));
          let hh = ph * Math.pow(Math.max(0, 1 - t * t), 0.22);   // spalle ripide, cima piatta
          hh *= 0.90 + Math.sin(dx * 0.055) * 0.07;
          if (hh < 1) continue;
          ctx.fillStyle = '#37485c';
          ctx.fillRect(pcx + dx, horiz - Math.round(hh), 2, Math.round(hh) + 2);
          ctx.fillStyle = 'rgba(255,224,178,.20)';
          ctx.fillRect(pcx + dx, horiz - Math.round(hh), 2, 1);
        }
        ctx.fillStyle = 'rgba(18,26,36,.45)';                     // la base, sull'acqua
        ctx.fillRect(Math.round(pcx - pw / 2), horiz, Math.round(pw), 2);
      }
      /* LE DUE SAGOME all'orizzonte, a sinistra: una lunga e bassa, una tozza. Da
         Scauri, nei mattini puliti, Ventotene si vede — e quindi il posto dove stanno
         andando li sta già guardando da casa. È la cosa fredda di questa scena. */
      for (const [fx, larg, alt] of [[0.24, 34, 4], [0.305, 9, 5]]) {
        for (let dx = -larg / 2; dx < larg / 2; dx += 2) {
          const hh = alt * Math.pow(Math.max(0, 1 - Math.pow(dx / (larg / 2), 2)), 0.36);
          ctx.fillStyle = 'rgba(120,138,166,.40)';
          ctx.fillRect(Math.round(W * fx + dx), horiz - Math.round(hh), 2, Math.round(hh) + 1);
        }
      }

      /* IL MARE: una lastra. Nessuna onda — non c'è vento — solo tre righe di luce
         ferme e la fascia più chiara vicino a riva, dove il fondo si alza. */
      ctx.fillStyle = '#3f6183'; ctx.fillRect(0, horiz, W, riva - horiz);
      for (let y = horiz; y < riva; y++) {
        const t = (y - horiz) / (riva - horiz);
        ctx.fillStyle = mix('#3f6183', '#7fa2bd', Math.pow(t, 1.5));
        ctx.fillRect(0, y, W, 1);
      }
      for (let i = 0; i < 3; i++) {
        const y = horiz + 6 + i * 9, lw = Math.round(W * (0.30 + r() * 0.44));
        ctx.fillStyle = `rgba(255,238,200,${0.11 - i * 0.03})`;
        ctx.fillRect(Math.round(r() * (W - lw)), y, lw, 1);
      }

      /* LA BATTIGIA e LA SABBIA SCURA. La riva sale appena da sinistra a destra: una
         diagonale in mezzo alle orizzontali, così l'occhio ha una strada da fare. La
         sabbia è scura e bagnata verso l'acqua, chiara e asciutta venendo avanti. */
      /* La battigia, seconda taratura. Prima: dodici pixel di pendenza piu' un seno,
         sabbia bagnata quasi nera sotto un'acqua chiara — sullo schermo un ARGINE di
         terra con il bordo dentellato. Il contrasto stava tutto su un bordo
         irregolare, ed e' quello che fa leggere «scarpata» invece di «riva». Adesso la
         pendenza e' meta', l'acqua bassa si schiarisce arrivando a terra, la schiuma e'
         una riga vera (due pixel, non uno) e la sabbia bagnata parte da un marrone
         chiaro: fra acqua e sabbia c'e' un passaggio, non un taglio. */
      const rivaA = dx => riva + 4 - Math.round((dx / W) * 6);
      ctx.fillStyle = '#3e352d'; ctx.fillRect(0, riva - 3, W, muro - riva + 5);
      for (let dx = 0; dx < W; dx += 2) {
        const y0 = rivaA(dx) + Math.round(Math.sin(dx * 0.035) * 1.4);
        for (let y = riva - 3; y < y0; y++) {          // l'acqua bassa, che si schiarisce
          const t = (y - (riva - 3)) / Math.max(1, y0 - riva + 3);
          ctx.fillStyle = mix('#7fa2bd', '#b9cede', Math.pow(t, 1.2));
          ctx.fillRect(dx, y, 2, 1);
        }
        ctx.fillStyle = 'rgba(248,252,255,.42)'; ctx.fillRect(dx, y0, 2, 2);
        const alt = muro - y0;
        for (let y = 2; y < alt; y++) {
          ctx.fillStyle = mix('#463c33', '#6f5f4d', Math.pow((y - 2) / (alt - 2), 0.85));
          ctx.fillRect(dx, y0 + y, 2, 1);
        }
        if (r() > 0.78) {
          ctx.fillStyle = `rgba(${214 + r() * 30 | 0},${200 + r() * 26 | 0},${170 + r() * 22 | 0},.36)`;
          ctx.fillRect(dx, y0 + 4 + Math.round(r() * Math.max(1, alt - 6)), 2, 1);
        }
      }
      /* Due impronte che vanno all'acqua e non tornano: c'è qualcuno che si è fatto il
         bagno alle sette meno un quarto, e non sono loro. Basta questo a dire l'ora. */
      for (let k = 0; k < 6; k++) {
        const t = k / 5;
        const ix = Math.round(W * 0.62 + t * 26), iy = Math.round(muro - 6 - t * (muro - rivaA(W * 0.63) - 8));
        ctx.fillStyle = `rgba(58,50,40,${0.34 - t * 0.12})`;
        ctx.fillRect(ix + (k % 2 ? 5 : 0), iy, 4, 3);
      }

      /* IL MURETTO del lungomare e il marciapiede: la quinta che separa la spiaggia
         dalla strada. Basso, in ombra — a quest'ora il sole non lo prende. */
      muretto(ctx, 0, muro, W, asfalto - muro, '#8f8672', r);
      ctx.fillStyle = 'rgba(255,232,190,.12)'; ctx.fillRect(0, muro, W, 2);
      /* IL MARCIAPIEDE, e il CORDOLO. Non e' decorazione: il testo dice «due ruote sul
         marciapiede», e finche' il marciapiede non c'era quel dettaglio non si poteva
         disegnare. Lastre di cemento coi giunti, il cordolo di pietra piu' chiaro col
         filo di sopra in luce, e sotto l'asfalto. Tre fasce orizzontali di valore
         diverso: e' quello che fa leggere il gradino. */
      const marcio = Math.round(H * 0.853), cordolo = Math.round(H * 0.878);
      ctx.fillStyle = '#6d6a63'; ctx.fillRect(0, asfalto, W, marcio - asfalto);
      for (let y = asfalto; y < marcio; y++) {
        ctx.fillStyle = mix('#605d57', '#7b7871', (y - asfalto) / (marcio - asfalto));
        ctx.fillRect(0, y, W, 1);
      }
      ctx.fillStyle = 'rgba(40,38,34,.28)';
      for (let x = 12; x < W; x += 96) ctx.fillRect(x, asfalto, 2, marcio - asfalto);
      ctx.fillStyle = '#8b8779'; ctx.fillRect(0, marcio, W, cordolo - marcio);
      ctx.fillStyle = 'rgba(255,240,206,.26)'; ctx.fillRect(0, marcio, W, 2);
      ctx.fillStyle = '#2f2c29'; ctx.fillRect(0, cordolo - 2, W, 3);
      ctx.fillStyle = '#4e4a46'; ctx.fillRect(0, cordolo, W, H - cordolo);
      for (let i = 0; i < 260; i++) {
        ctx.fillStyle = `rgba(${88 + r() * 30 | 0},${84 + r() * 26 | 0},${80 + r() * 24 | 0},.30)`;
        ctx.fillRect(Math.round(r() * W), cordolo + 2 + Math.round(r() * (H - cordolo - 4)), 2, 2);
      }
      ctx.fillStyle = 'rgba(255,248,224,.16)';
      for (let x = 0; x < W; x += 78) ctx.fillRect(x, H - 9, 40, 3);   // la riga tratteggiata

      /* Qui c'era un fascio di ombrelloni chiusi appoggiato al muretto. Tre stesure,
         tre volte illeggibile: guglia, obelisco, e infine una lama pallida che
         spuntava da dietro la macchina. Tolto. In questo quadro ci sono cinque cose e
         si riconoscono tutte; sei, e non se ne riconosceva nessuna. Un oggetto che non
         si riesce a far leggere si toglie: non e' un pareggio, e' una scena piu'
         pulita. */

      /* IL LAMPIONE, tagliato dal bordo di sopra: è lui che dà la scala a tutto il
         resto — cinque metri veri — e tiene insieme il lato destro. Ancora accesa,
         perché a quest'ora i lampioni del lungomare non li ha spenti nessuno. */
      {
        const lx = Math.round(W * 0.905);
        ctx.fillStyle = 'rgba(20,18,16,.30)'; pixelEllipse(ctx, lx + 4, marcio - 3, 17, 4, 3);
        ctx.fillStyle = '#5e6266'; ctx.fillRect(lx, 0, 9, marcio - 4);
        ctx.fillStyle = '#767b80'; ctx.fillRect(lx, 0, 3, marcio - 4);
        ctx.fillStyle = '#4a4e52'; ctx.fillRect(lx - 5, marcio - 12, 19, 9);   // il plinto, sul marciapiede
        ctx.fillStyle = '#5e6266'; ctx.fillRect(lx - 26, 22, 30, 7);           // il braccio
        ctx.fillStyle = '#3a3e42'; ctx.fillRect(lx - 40, 26, 20, 9);           // l'armatura
        ctx.fillStyle = '#ffe9a8'; ctx.fillRect(lx - 38, 35, 16, 4);           // la luce
        glow(ctx, lx - 30, 39, 13, 9, '255,226,150');
      }

      /* LA MACCHINA, il soggetto — QUINTA STESURA, e la prima in TRE QUARTI DA DIETRO.
         La quarta era di profilo. Di profilo era giusta come automobile e sbagliata come
         scena: «il bagaglio della macchina, il baule aperto, non si capisce bene». Non
         era un difetto di rifinitura, era la GEOMETRIA — e le rifiniture su una geometria
         sbagliata sono soldi buttati. Di fianco, il vano di carico e' una fessura di
         74×31 px e quello che ci sta dentro sono oggetti da 12 a 17 px, cioe' sotto la
         soglia che questo progetto si e' dato da se': sotto i sessanta pixel un oggetto
         non dice cosa e', dice solo che c'e'. E un portellone alzato, di fianco, lo si
         vede DI TAGLIO: quello che contiene sta dietro la lamiera per definizione.
         Girata di tre quarti il retro guarda l'obiettivo, e i numeri cambiano di categoria:
         il vano diventa 142×94, il borsone dentro 54, le pinne in piedi 64, il portellone
         alzato 228 di larghezza. La prospettiva e' calcolata e non stimata — orizzonte a
         y=108, il retro a dieci metri, il muso a quattordici — e viene tutta da una
         costante sola: le rette del 3D restano rette sullo schermo, quindi tetto e suolo
         si interpolano lineari fra il piano vicino e quello lontano, e la macchina
         rimpicciolisce E SALE verso l'orizzonte andando avanti. E' la cosa che nessuna
         stima a occhio azzecca, ed e' la ragione per cui i tre quarti a mano vengono male.
         Le due ruote davanti stanno sul marciapiede, come dice il testo: il muso e'
         alzato di tredici pixel e la macchina beccheggia attorno all'asse posteriore. */
      {
        /* LA PROSPETTIVA VIENE DA TRE NUMERI, E DA NIENT'ALTRO: focale, altezza
           dell'occhio, azimut. Tutte le altre misure di questa macchina si ricavano, e
           per questo tornano fra loro. Le due stesure prima non lo facevano, e ognuna
           aveva un errore che sembrava di disegno e invece era di aritmetica:
             la prima aveva il retro a larghezza piena (1,80 m × 100 px/m = 180 px, cioe'
             il retro PARALLELO al piano dell'immagine) e insieme una fiancata lunga 270
             px. Se il retro ci guarda in pieno la fiancata non si vede; se la fiancata si
             vede il retro e' scorciato. Due misure che si contraddicono: sullo schermo
             viene un furgone, e nessun ritocco lo raddrizza.
             la seconda teneva 100 px/m con la macchina appoggiata a y=346. Ma la riga di
             terra dice da sola dove sta l'occhio: y_terra − orizzonte = (px/m) × altezza
             dell'occhio. Con 238 px e 100 px/m l'occhio stava a DUE METRI E QUARANTA, e
             una macchina guardata da due metri e quaranta e' una macchina piatta.
           Qui l'altezza dell'occhio e' 1,86 m — uno in piedi sul marciapiede, che sta
           quindici centimetri sopra l'asfalto — e la scala esce da lei: 128 px/m sul piano
           vicino. La macchina viene 454 px per 192, cioe' quasi metа' inquadratura, ed e'
           giusto che sia cosi': un fondale ha UN soggetto e lo deve avere grande. */
        const OCC = 1.86;                                    // l'occhio, sul marciapiede
        const FOC = 2560;                                    // la focale, in pixel
        const AZ = 32 * Math.PI / 180;                       // l'azimut: da dietro, a sbieco
        const COS = Math.cos(AZ), SEN = Math.sin(AZ);
        const dR = 20.0;                                     // il retro, a venti metri
        const dRR = dR + 1.80 * SEN;                         // il suo spigolo lontano
        const dF = dR + 4.40 * COS;                          // il muso
        const suoloD = d => Math.round(horiz + FOC * OCC / d);
        const pxm = d => FOC / d;
        const gN = suoloD(dR), gR = suoloD(dRR), gF = suoloD(dF);
        const tN = gN - Math.round(1.50 * pxm(dR));
        const tR = gR - Math.round(1.50 * pxm(dRR));
        const tF = gF - Math.round(1.50 * pxm(dF));
        const xrR = Math.round(W * 0.729);
        const xrL = xrR - Math.round(1.80 * COS * FOC / ((dR + dRR) / 2));
        const xsF = xrL - Math.round(4.40 * SEN * FOC / ((dR + dF) / 2));
        /* Le quote di un'automobile, in frazione dell'altezza totale. Sono misure vere e
           non stime, ed e' l'unico modo perche' restino giuste su tutti e tre i piani:
             brancardo 0,32 m  → 0,213     mozzo      0,33 m → 0,220
             cintura   0,98 m  → 0,653     cofano     0,92 m → 0,613
           La cintura al 65% vuol dire vetro per il 35% dell'altezza: la lamiera e' la
           parte grossa. Alla prima prova l'avevo messa al 42%, cioe' vetro per il 58%, e
           sullo schermo era un pullmino di linea. */
        /* IL BECCHEGGIO: ventisei pixel di muso alzato, che sono i quindici centimetri
           di cordolo visti a ventiquattro metri. La macchina non e' parallela al
           marciapiede — «parcheggiata male come si parcheggia quando si parte per
           quattro giorni: due ruote sul marciapiede» — e questo risolve anche la
           geometria del fondo: il cordolo corre parallelo al piano dell'immagine, la
           macchina sta di sbieco a trentadue gradi, e il muso e' sopra il cordolo. */
        const bec = t => Math.round(Math.max(0, (0.78 - t) / 0.78) * 26);
        const suoloL = t => Math.round(gF + t * (gN - gF)) - bec(t);
        const tettoL = t => Math.round(tF + t * (tN - tF)) - bec(t);
        const altL = t => suoloL(t) - tettoL(t);
        const cimaL = t => {
          const su = suoloL(t), te = tettoL(t), cof = su - Math.round(altL(t) * 0.613);
          if (t >= 0.36) return te;                                          // il tetto
          if (t >= 0.22) { const u = (t - 0.22) / 0.14; return Math.round(cof - Math.pow(u, 0.8) * (cof - te)); }
          return cof + Math.round((0.22 - t) / 0.22 * altL(t) * 0.07);       // il cofano
        };
        const sottoL = t => suoloL(t) - Math.round(altL(t) * 0.213);
        const cintL = t => suoloL(t) - Math.round(altL(t) * 0.653);
        const suoloR = x => Math.round(gN + (x - xrL) / (xrR - xrL) * (gR - gN));
        const tettoR = x => Math.round(tN + (x - xrL) / (xrR - xrL) * (tR - tN));
        const altR = x => suoloR(x) - tettoR(x);

        /* DUE OMBRE. Una larga e morbida sotto tutta la macchina, e una nera e stretta
           attaccata alle gomme: senza la seconda una macchina galleggia sempre. */
        ctx.fillStyle = 'rgba(10,12,18,.26)';
        pixelEllipse(ctx, Math.round((xsF + xrR) / 2), gN - 6, Math.round((xrR - xsF) / 2) + 14, 17, 4);
        ctx.fillStyle = 'rgba(6,8,12,.42)';
        pixelEllipse(ctx, Math.round((xrL + xrR) / 2), gN + 2, Math.round((xrR - xrL) / 2), 8, 4);
        /* La gomma dell'altro fianco: se ne vede uno spicchio sotto il paraurti, e basta.
           E' un'ellisse come le altre, e il suo centro sta un raggio SOPRA il suo
           appoggio: alla prima prova stava otto pixel sotto, e sullo schermo era una
           ruota di scorta appesa al paraurti. */
        {
          const ry = Math.round(0.33 * pxm(dRR));
          ctx.fillStyle = '#0d1218';
          pixelEllipse(ctx, xrR - Math.round((xrR - xrL) * 0.22), gR - ry, Math.round(ry * SEN) + 3, ry, 3);
        }

        /* LA FIANCATA. Lamiera in tre fasce — alta piu' chiara che ci si riflette il
           cielo, media il colore base, bassa piu' scura che ci si riflette l'asfalto — e
           sopra tutto il filo di cintura, il pixel chiaro dove la portiera incontra il
           vetro. E' quel pixel che fa la macchina.
           E il MUSO SI ARROTONDA negli ultimi quattordici pixel: senza, la fiancata
           finiva in una parete verticale di ottantacinque pixel, e da dietro, di sbieco,
           di un'automobile si vede lo SPIGOLO anteriore — e uno spigolo e' una curva. */
        for (let x = xsF; x < xrL; x++) {
          const t = (x - xsF) / (xrL - xsF);
          const rd = Math.round(Math.pow(1 - Math.min(1, (x - xsF) / 14), 1.6) * 12);
          const su = sottoL(t) - Math.round(rd * 0.55), cy = cimaL(t) + rd;
          const cint = Math.max(cy + 2, cintL(t));
          for (let y = cy; y < su; y++) {
            const t2 = (y - cy) / Math.max(1, su - cy);
            ctx.fillStyle = y < cint ? '#2b3846'
                          : t2 > 0.80 ? '#181f27'
                          : mix('#26313c', '#1e2832', (t2 - 0.42) / 0.5);
            ctx.fillRect(x, y, 1, 1);
          }
          ctx.fillStyle = '#38495a'; ctx.fillRect(x, cy, 1, 2);
          ctx.fillStyle = '#4f657a'; ctx.fillRect(x, cint - 1, 1, 1);
          ctx.fillStyle = '#10161c'; ctx.fillRect(x, su - 5, 1, 6);
          /* IL SOTTOSCOCCA. Il brancardo sta a trentadue centimetri da terra e la strada
             sta a zero: in mezzo c'e' il buio sotto la macchina, e se non lo si disegna
             si vede il MARCIAPIEDE fra le ruote — cioe' una macchina su due trampoli.
             Buio pieno fino a nove centimetri da terra, che e' l'ombra vera. */
          ctx.fillStyle = '#0a0e12';
          ctx.fillRect(x, su + 1, 1, suoloL(t) - Math.round(altL(t) * 0.06) - su);
        }
        /* I VETRI: il parabrezza, e tre luci laterali separate da due montanti. Una banda
           unica di vetro non e' una station wagon, e' un monovolume. */
        for (let x = xsF; x < xrL; x++) {
          const t = (x - xsF) / (xrL - xsF);
          if (!((t >= 0.245 && t <= 0.345) || (t >= 0.395 && t <= 0.955))) continue;
          if ((t > 0.595 && t < 0.625) || (t > 0.795 && t < 0.825)) continue;   // i montanti
          const cy = cimaL(t), cint = cintL(t);
          const a = cy + 5, b = cint - 3;
          if (b <= a) continue;
          for (let y = a; y < b; y++) {
            ctx.fillStyle = mix('#93aec0', '#547187', Math.pow((y - a) / (b - a), 0.8));
            ctx.fillRect(x, y, 1, 1);
          }
          ctx.fillStyle = 'rgba(255,248,224,.22)'; ctx.fillRect(x, a, 1, 2);
        }
        // le maniglie sul filo di cintura, e lo specchietto sul montante del parabrezza
        for (const t of [0.50, 0.72]) {
          ctx.fillStyle = '#8f9aa2';
          ctx.fillRect(Math.round(xsF + t * (xrL - xsF)) - 9, cintL(t) + Math.round(altL(t) * 0.08), 19, 4);
        }
        {
          const t = 0.355;
          ctx.fillStyle = '#22303c';
          ctx.fillRect(Math.round(xsF + t * (xrL - xsF)) - 5, cintL(t) - 3, 14, 9);
        }

        /* LE RUOTE SONO ELLISSI, ed e' questo il difetto che faceva sembrare finta la
           prima prova in tre quarti. Vista di sbieco una ruota e' scorciata lungo l'asse
           della macchina come tutto il resto: il diametro pieno in ALTEZZA, e diametro ×
           sen(32°) in LARGHEZZA. Disegnate tonde erano piu' larghe del passo — due ruote
           da 66 px su un passo di 125 non ci stanno nemmeno dentro — e l'occhio se ne
           accorge prima del cervello: legge «giocattolo».
           E il passaruota sta ADDOSSO alla gomma, tre pixel: un arco piu' largo lascia
           vedere la carrozzeria dentro l'arco, cioe' un buco nero nella fiancata. */
        const ruota = t => {
          /* Una gomma di sbieco non e' un'ellisse sottile: e' il FIANCO ellittico piu' il
             BATTISTRADA, che e' una fascia larga 20 cm × cos(32°) e sta dalla parte di
             dietro. Col solo fianco — 35 px di larghezza su 84 di altezza — sullo schermo
             sono dischi da carrello, ed e' quello che si vedeva. E il passaruota sta
             addosso alla gomma UN pixel: a tre, intorno alla gomma restava un alone
             scuro, e un alone intorno a una ruota legge «ruota staccata». */
          const ry = Math.round(altL(t) * 0.220);
          const rx = Math.max(5, Math.round(ry * SEN));
          const bat = Math.max(4, Math.round(0.20 * COS * (altL(t) / 1.50)));   // il battistrada
          const wx = Math.round(xsF + t * (xrL - xsF)), cy = suoloL(t) - ry;
          for (let dx = -rx - 1; dx <= rx + bat + 1; dx++) {
            const d2 = Math.min(Math.abs(dx), Math.abs(dx - bat));
            const h = Math.round(Math.sqrt(Math.max(0, 1 - Math.pow(d2 / (rx + 1), 2))) * (ry + 2) * 0.86);
            if (h < 1) continue;
            const top = cy - h + Math.round(ry * 0.10);
            ctx.fillStyle = '#141b22'; ctx.fillRect(wx + dx, top, 1, h + 8);
            ctx.fillStyle = 'rgba(140,158,176,.20)'; ctx.fillRect(wx + dx, top, 1, 1);
          }
          /* La sagoma e' una CAPSULA: le due ellissi dei fianchi raccordate dal
             battistrada. Al primo colpo avevo raccordato con un fillRect alto tutta la
             ruota, cioe' col rettangolo che CONTIENE l'ellisse invece dell'ellisse: due
             quadrati neri al posto delle gomme. Si raccorda riga per riga. */
          for (let dy = -ry; dy <= ry; dy++) {
            const hw = Math.round(rx * Math.sqrt(Math.max(0, 1 - Math.pow(dy / ry, 2))));
            if (hw < 1) continue;
            ctx.fillStyle = '#0f141a'; ctx.fillRect(wx - hw, cy + dy, hw * 2 + bat, 1);
            ctx.fillStyle = '#181f27'; ctx.fillRect(wx + hw, cy + dy, bat, 1);   // il battistrada
          }
          ctx.fillStyle = '#0f141a'; pixelEllipse(ctx, wx, cy, rx, ry, 3);        // il fianco
          ctx.fillStyle = '#232c34'; pixelEllipse(ctx, wx, cy, Math.max(2, rx - 4), ry - Math.round(ry * 0.24), 3);
          /* IL CERCHIO SI LEGGE PER FORMA, NON PER LUMINANZA. Con #6d777f e #8a949c su gomme
             #0f141a e una carrozzeria che di media sta sotto luminanza 60, i due mozzi erano i
             punti piu' CHIARI di tutta la meta' bassa del quadro alle sette meno cinque del
             mattino, e a grandezza naturale leggevano come due luci accese. Abbassati, il
             cerchio resta leggibile e il vano illuminato del baule torna a essere il punto
             piu' chiaro — che e' il soggetto della scena. */
          ctx.fillStyle = '#4a5258'; pixelEllipse(ctx, wx, cy, Math.max(2, rx - 8), Math.max(3, ry - Math.round(ry * 0.48)), 3);
          ctx.fillStyle = '#5c656c'; pixelEllipse(ctx, wx, cy, Math.max(2, rx - 13), Math.max(2, ry - Math.round(ry * 0.68)), 3);
          ctx.fillStyle = 'rgba(6,8,12,.55)';
          pixelEllipse(ctx, wx + Math.round(bat / 2), cy + ry, Math.round((rx + bat) * 0.9), 3, 3);
        };
        ruota(0.78); ruota(0.20);

        /* IL RETRO, il piano che ci guarda. In un tre quarti quello che fa capire il
           volume sono i DUE PIANI DI VALORE DIVERSO: il fianco in ombra, il retro che
           prende la luce di dietro l'osservatore (il sole e' sorto da venti minuti e sta
           dietro le case). Se i due piani hanno lo stesso colore il tre quarti torna a
           essere una macchia — ed e' per questo che di solito viene male. */
        for (let x = xrL; x <= xrR; x++) {
          const su = suoloR(x), te = tettoR(x), fondo = su - Math.round(altR(x) * 0.213);
          for (let y = te; y < fondo; y++) {
            const t2 = (y - te) / (su - te);
            ctx.fillStyle = t2 < 0.06 ? '#4d6274' : t2 > 0.90 ? '#28343f' : mix('#40525f', '#33424e', t2);
            ctx.fillRect(x, y, 1, 1);
          }
          ctx.fillStyle = '#5b7285'; ctx.fillRect(x, te, 1, 3);
          ctx.fillStyle = '#0a0e12';                              // il sottoscocca, anche qui
          ctx.fillRect(x, fondo, 1, su - Math.round(altR(x) * 0.06) - fondo);
        }

        /* IL VANO: il soggetto dentro il soggetto. Centoquarantadue per novantaquattro, ed
           e' per avere questi due numeri che la macchina e' stata girata. Si legge da
           quattro piani, e vanno tutti e quattro o non se ne legge nessuno:
             il BUIO in fondo, che e' profondita' e non un colore;
             lo SCHIENALE dei sedili in alto, con le cuciture verticali;
             il PIANO DI CARICO in basso, che RIENTRA — piu' su e piu' stretto, cosi' il
               pavimento e' un piano orizzontale e non una riga;
             la LUCETTA in alto a destra, con la fetta di luce che cade sul piano: e' la
               fetta, non il quadratino giallo, a dire che la luce sta DENTRO.
           E dentro tre oggetti soli e grandi — le pinne in piedi, il borsone, il telo
           piegato — invece dei sei da dodici pixel della stesura di fianco. */
        const apL = xrL + 22, apR = xrR - 20;
        const apT = x => tettoR(x) + Math.round(altR(x) * 0.05);
        const apB = x => suoloR(x) - Math.round(altR(x) * 0.470);
        for (let x = apL; x <= apR; x++) {
          const a = apT(x), b = apB(x);
          for (let y = a; y < b; y++) {
            ctx.fillStyle = mix('#070b0f', '#131c24', Math.pow((y - a) / (b - a), 0.5));
            ctx.fillRect(x, y, 1, 1);
          }
        }
        // lo schienale dei sedili, in fondo in alto, con le cuciture
        {
          const a = apT(apL) + 10, h = 40;
          for (let x = apL + 7; x <= apR - 7; x++) {
            for (let y = a; y < a + h; y++) {
              ctx.fillStyle = mix('#2f2a22', '#4a4234', Math.pow((y - a) / h, 0.7));
              ctx.fillRect(x, y, 1, 1);
            }
          }
          ctx.fillStyle = 'rgba(20,16,12,.55)';
          for (let k = 1; k < 5; k++) ctx.fillRect(apL + 7 + k * Math.round((apR - apL - 14) / 5), a, 2, h);
          ctx.fillStyle = 'rgba(120,108,86,.30)'; ctx.fillRect(apL + 7, a, apR - apL - 14, 2);
        }
        // IL PIANO DI CARICO: rientra andando in dentro, ed e' quel rientro che lo fa piano
        {
          const b = apB(Math.round((apL + apR) / 2)), prof = 30;
          for (let k = 0; k < prof; k++) {
            const ins = Math.round((k / prof) * 19), y = b - k;
            ctx.fillStyle = mix('#39424a', '#1c2329', k / prof);
            ctx.fillRect(apL + ins, y, apR - apL - ins * 2, 1);
          }
          ctx.fillStyle = '#5a6670'; ctx.fillRect(apL, b, apR - apL, 2);       // lo spigolo, in luce
          ctx.fillStyle = '#12181e'; ctx.fillRect(apL, b + 2, apR - apL, 2);
        }
        // LE PINNE, in piedi contro la parete: due lame lunghe, e il calzante scuro sotto
        {
          const px2 = apL + 9, base = apB(px2) - 5, alt = 64;
          for (const dx of [0, 19]) {
            ctx.fillStyle = 'rgba(4,6,9,.66)'; ctx.fillRect(px2 + dx - 1, base - 1, 17, 4);
            for (let y = 0; y < alt; y++) {
              const t2 = y / alt, restr = Math.round(Math.pow(t2, 2.4) * 3);
              ctx.fillStyle = y > alt - 17 ? '#16242b' : mix('#2f5d6b', '#244854', t2);
              ctx.fillRect(px2 + dx + restr, base - alt + y, 15 - restr * 2, 1);
            }
            ctx.fillStyle = 'rgba(120,180,198,.34)'; ctx.fillRect(px2 + dx + 2, base - alt + 2, 2, alt - 20);
          }
        }
        // IL BORSONE, quello che invece e' stato caricato: manici, cerniera, un fianco in luce
        {
          const bx = apL + 48, bh = 44, by = apB(bx) - 4 - bh, bw = 54;
          ctx.fillStyle = 'rgba(4,6,9,.66)'; ctx.fillRect(bx - 2, by + bh - 1, bw + 5, 4);
          for (let y = 0; y < bh; y++) {
            ctx.fillStyle = mix('#4e5742', '#333a2c', Math.pow(y / bh, 0.8));
            ctx.fillRect(bx, by + y, bw, 1);
          }
          ctx.fillStyle = '#66705334'.slice(0, 7); ctx.fillRect(bx, by, bw, 2);
          ctx.fillStyle = 'rgba(200,208,170,.22)'; ctx.fillRect(bx, by, bw, 2);
          ctx.fillStyle = '#22271c'; ctx.fillRect(bx, by + 15, bw, 3);            // la cerniera
          ctx.fillStyle = 'rgba(210,216,180,.30)'; ctx.fillRect(bx, by + 15, bw, 1);
          ctx.fillStyle = '#2b3124';                                              // i due manici
          ctx.fillRect(bx + 13, by - 9, 28, 4);
          ctx.fillRect(bx + 13, by - 9, 4, 11); ctx.fillRect(bx + 37, by - 9, 4, 11);
          ctx.fillStyle = 'rgba(200,208,170,.16)'; ctx.fillRect(bx + 13, by - 9, 28, 1);
        }
        // IL TELO piegato in tre: si legge dalle pieghe, non dal colore
        {
          const tx = apL + 106, tw = 30, base = apB(tx) - 4;
          ctx.fillStyle = 'rgba(4,6,9,.66)'; ctx.fillRect(tx - 1, base - 1, tw + 3, 3);
          for (let k = 0; k < 3; k++) {
            ctx.fillStyle = k % 2 ? '#9e8b6e' : '#b8a382';
            ctx.fillRect(tx + k, base - 8 - k * 8, tw - k * 2, 8);
            ctx.fillStyle = 'rgba(255,244,214,.22)'; ctx.fillRect(tx + k, base - 8 - k * 8, tw - k * 2, 2);
          }
          ctx.fillStyle = 'rgba(90,72,46,.46)'; ctx.fillRect(tx + tw - 6, base - 24, 2, 24);
        }
        // LA LUCETTA e la sua fetta di luce sul piano
        {
          const luX = apR - 20, luY = apT(apR) + 5;
          ctx.fillStyle = '#39434c'; ctx.fillRect(luX - 2, luY - 2, 14, 8);
          ctx.fillStyle = '#fff4cc'; ctx.fillRect(luX, luY, 10, 4);
          glow(ctx, luX + 5, luY + 2, 7, 5, '255,238,180');
          for (let k = 0; k < 7; k++) {
            ctx.fillStyle = `rgba(255,238,180,${0.15 - k * 0.02})`;
            ctx.fillRect(apR - 34 - k * 7, apB(apR) - 3 - k, 30 + k * 9, 1);
          }
        }
        // il telaio del vano: due pixel scuri intorno, e il filo di luce sul bordo di sopra
        for (let x = apL - 2; x <= apR + 2; x++) {
          ctx.fillStyle = '#0c1116'; ctx.fillRect(x, apT(x) - 2, 1, 3);
          ctx.fillStyle = 'rgba(150,172,190,.26)'; ctx.fillRect(x, apT(x) - 3, 1, 1);
        }
        ctx.fillStyle = '#0c1116';
        ctx.fillRect(apL - 3, apT(apL), 3, apB(apL) - apT(apL));
        ctx.fillRect(apR + 1, apT(apR), 3, apB(apR) - apT(apR));

        /* I FANALI, il PARAURTI e LA TARGA. La targa e' il segnale piu' economico che
           esista per dire «questo e' il dietro di un'automobile»: cinquantadue pixel di
           rettangolo pallido, e non serve che ci sia scritto niente. */
        /* I FANALI. Ventisei pixel, che sono i venticinque centimetri veri di un gruppo
           ottico: al primo colpo erano quarantasei, e due barre rosse alte mezzo metro
           tiravano l'occhio via dal vano, che e' il soggetto. */
        for (const [fx, fw] of [[xrL + 5, 16], [apR + 5, 16]]) {
          const te = apT(fx) + Math.round(altR(fx) * 0.06);
          ctx.fillStyle = '#8e1f1a'; ctx.fillRect(fx, te, fw, 30);
          ctx.fillStyle = '#c9302a'; ctx.fillRect(fx, te, fw, 17);
          ctx.fillStyle = '#e8564c'; ctx.fillRect(fx, te, fw, 4);
          ctx.fillStyle = '#e6e2d4'; ctx.fillRect(fx, te + 31, fw, 8);          // la retromarcia
          ctx.fillStyle = 'rgba(255,120,110,.18)'; ctx.fillRect(fx - 2, te, fw + 4, 2);
        }
        for (let x = xrL; x <= xrR; x++) {
          const su = suoloR(x), a = su - Math.round(altR(x) * 0.470), b = su - Math.round(altR(x) * 0.245);
          ctx.fillStyle = '#2b3540'; ctx.fillRect(x, a, 1, b - a);
          ctx.fillStyle = '#3d4b58'; ctx.fillRect(x, a, 1, 2);
          ctx.fillStyle = '#141a20'; ctx.fillRect(x, b - 2, 1, 3);
        }
        {
          const cxT = Math.round((xrL + xrR) / 2), su = suoloR(cxT), h = altR(cxT);
          const py = su - Math.round(h * 0.44);
          ctx.fillStyle = '#15191d'; ctx.fillRect(cxT - 32, py, 64, 19);
          ctx.fillStyle = '#d9d5c6'; ctx.fillRect(cxT - 30, py + 2, 60, 15);
          ctx.fillStyle = '#2a3d7a'; ctx.fillRect(cxT - 30, py + 2, 9, 15);    // la banda blu
          ctx.fillStyle = 'rgba(60,60,60,.55)'; ctx.fillRect(cxT - 16, py + 6, 38, 6);
        }

        /* IL PORTELLONE ALZATO. Tre cose lo fanno leggere, e sono tre e non una:
             il VETRO CHIARO — il lunotto alzato ha dietro il cielo dell'alba, quindi da
               qui e' pallido, e il contrasto col vano buio di sotto racconta tutto;
             lo SBALZO — il pannello e' piu' vicino all'obiettivo della carrozzeria e
               quindi sporge dai due lati: e' il sormonto che dice «alzato» e non «chiuso»;
             le CERNIERE agli spigoli di sotto, che sono quelle che lo attaccano alla
               macchina. La quarta stesura era un parallelogramma appoggiato sopra il
               tetto, senza sormonto e senza cerniere: sullo schermo un cartello stradale.
           Le molle a gas invece NON ci sono, e non e' una dimenticanza: da dietro, con il
           pannello inclinato verso l'obiettivo, stanno dentro la sua sagoma. Si vedono di
           fianco. Disegnarle qui sarebbe stato disegnare una cosa che non si vede. */
        {
          const pL = xrL - 11, pR = xrR + 6;
          const giu = x => Math.round(tN + (x - xrL) / (xrR - xrL) * (tR - tN));
          const su = x => giu(x) - (Math.round(altR(xrL) * 0.53) - Math.round((x - pL) / (pR - pL) * 5));
          for (let x = pL; x <= pR; x++) {
            const a = su(x), b = giu(x);
            for (let y = a; y < b; y++) {
              ctx.fillStyle = mix('#33414f', '#232e39', (y - a) / (b - a));
              ctx.fillRect(x, y, 1, 1);
            }
            ctx.fillStyle = '#5f7789'; ctx.fillRect(x, a, 1, 4);              // il bordo libero
            ctx.fillStyle = '#7c93a6'; ctx.fillRect(x, a, 1, 2);
            ctx.fillStyle = '#67788a'; ctx.fillRect(x, b - 4, 1, 3);          // il labbro di sotto
            ctx.fillStyle = '#131a21'; ctx.fillRect(x, b - 1, 1, 2);
          }
          // il lunotto: il cielo dell'alba visto da sotto, attraverso il vetro
          for (let x = pL + 26; x <= pR - 26; x++) {
            const arco = Math.round(Math.pow(Math.abs((x - (pL + pR) / 2) / ((pR - pL) / 2 - 26)), 2.6) * 7);
            const a = su(x) + 17 + arco, b = giu(x) - 17;
            for (let y = a; y < b; y++) {
              const t2 = (y - a) / (b - a);
              ctx.fillStyle = mix('#a9bccb', '#6b849a', Math.pow(t2, 0.7));
              ctx.fillRect(x, y, 1, 1);
            }
            ctx.fillStyle = 'rgba(255,246,224,.30)'; ctx.fillRect(x, a, 1, 2);
          }
          // il tergilunotto, e la terza luce di stop sul bordo
          {
            const x1 = pL + 32, x2 = pR - 40, n = x2 - x1;
            for (let k = 0; k <= n; k++) {
              const x = x1 + k, y = su(x) + 22 + Math.round(Math.pow(k / n, 1.5) * 26);
              ctx.fillStyle = '#1a222a'; ctx.fillRect(x, y, 1, 3);
            }
            ctx.fillStyle = '#c9302a'; ctx.fillRect(Math.round((pL + pR) / 2) - 15, su(Math.round((pL + pR) / 2)) + 4, 30, 5);
          }
          // le due cerniere, sullo spigolo del tetto: sono loro che dicono di chi e'
          ctx.fillStyle = '#151d24';
          ctx.fillRect(xrL + 6, giu(xrL + 6) - 3, 18, 9);
          ctx.fillRect(xrR - 25, giu(xrR - 25) - 3, 18, 9);
        }
      }

      /* IL BORSONE IN MEZZO ALLA STRADA, quello che nessuno dei due ha deciso di caricare
         per primo: il testo lo dice, ed e' il dettaglio che fa capire che sono in due e
         che stanno litigando per niente alle sette meno cinque. Grande, sull'asfalto, con
         la sua ombra: e' il secondo oggetto leggibile del quadro dopo il vano. */
      {
        const bx = Math.round(W * 0.775), by = H - 58, bw = 104, bh = 46;
        ctx.fillStyle = 'rgba(10,10,14,.36)'; pixelEllipse(ctx, bx + 52, by + bh + 3, 60, 8, 3);
        for (let y = 0; y < bh; y++) {
          ctx.fillStyle = mix('#6b5340', '#41332a', Math.pow(y / bh, 0.8));
          ctx.fillRect(bx, by + y, bw, 1);
        }
        ctx.fillStyle = 'rgba(240,220,186,.20)'; ctx.fillRect(bx, by, bw, 3);
        ctx.fillStyle = '#2f251e'; ctx.fillRect(bx, by + 17, bw, 4);              // la cerniera
        ctx.fillStyle = 'rgba(240,220,186,.24)'; ctx.fillRect(bx, by + 17, bw, 1);
        ctx.fillStyle = '#3a2e24';                                                // i manici
        ctx.fillRect(bx + 30, by - 14, 44, 5);
        ctx.fillRect(bx + 30, by - 14, 5, 16); ctx.fillRect(bx + 69, by - 14, 5, 16);
        ctx.fillStyle = 'rgba(240,220,186,.14)'; ctx.fillRect(bx + 30, by - 14, 44, 1);
        ctx.fillStyle = '#4a3a2c';                                                // la tracolla
        ctx.fillRect(bx + bw - 4, by + 32, 44, 5); ctx.fillRect(bx + bw + 36, by + 26, 5, 11);
        ctx.fillStyle = '#8f9aa2'; ctx.fillRect(bx + bw + 34, by + 24, 9, 5);     // il gancio
      }

      // il velo del bordo, come in tutte le altre
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = `rgba(8,10,16,${0.03 + i * 0.03})`;
        ctx.fillRect(0, 0, W, 5 + i * 5); ctx.fillRect(0, H - 5 - i * 5, W, 5 + i * 5);
        ctx.fillRect(0, 0, 7 + i * 6, H); ctx.fillRect(W - 7 - i * 6, 0, 7 + i * 6, H);
      }
    },

    alba(ctx, W, H) {
      // L'ALBA DAL MARE. È l'unico sfondo caldo del gioco, e il motore non ci mette
      // sopra il velo della profondità: qui si respira. Il sole che esce dall'acqua,
      // la colonna d'oro, e Santo Stefano a destra — nero, contro la luce.
      const r = rng(seedOf('alba'));
      // il cielo: indaco in alto, viola, poi arancio e una banda d'oro sull'acqua
      skyGradient(ctx, W, H * 0.62, '#2a3a72', '#f0a868', 14);
      skyGradient(ctx, W, H * 0.26, '#1a2358', '#5a4a90', 7);
      ctx.fillStyle = 'rgba(255,190,110,.22)'; ctx.fillRect(0, H * 0.40, W, H * 0.22);
      stars(ctx, W, H * 0.22, r, 26);
      const horiz = H * 0.62;
      // IL SOLE che esce dall'acqua, appena a sinistra del centro
      const sx = W * 0.42;
      glow(ctx, sx, horiz - 10, 62, 44, '255,196,110');
      glow(ctx, sx, horiz - 8, 30, 22, '255,224,150');
      ctx.fillStyle = '#ffcc6c'; pixelDisc(ctx, sx, horiz - 4, 36, 4);
      ctx.fillStyle = '#fff2c0'; pixelDisc(ctx, sx, horiz - 4, 21, 4);
      // le nuvole basse, accese da sotto
      for (const [fx, fy, fw] of [[0.06, 0.20, 130], [0.62, 0.14, 104], [0.80, 0.26, 150], [0.30, 0.30, 90]]) {
        ctx.fillStyle = '#6a5a92'; ctx.fillRect(W * fx, H * fy, fw, 11);
        ctx.fillStyle = '#f0a878'; ctx.fillRect(W * fx + 8, H * fy + 9, fw * 0.86, 5);
        ctx.fillStyle = '#8a6aa8'; ctx.fillRect(W * fx + 18, H * fy - 7, fw * 0.6, 8);
      }
      // IL MARE: oro sotto il sole, ardesia ai lati
      sea(ctx, W, horiz, H, '#1a3a58', '#2a5a7e', r, 12, 0.4);
      ctx.fillStyle = 'rgba(255,214,140,.20)'; ctx.fillRect(0, horiz, W, H - horiz);
      ctx.fillStyle = 'rgba(255,255,255,.26)'; ctx.fillRect(0, horiz, W, 2);
      // LA COLONNA D'ORO, spezzata in trattini che si allargano avvicinandosi...
      // ...e che si FERMA prima della riva. Gli ultimi metri d'acqua non hanno luce.
      for (let y = horiz + 2; y < H * 0.86; y += 4) {
        const t = (y - horiz) / (H - horiz);
        const w2 = 14 + t * 190;
        for (let k = 0; k < 4; k++) {
          const ww = 6 + r() * w2 * 0.34;
          const off = (r() - 0.5) * (w2 - ww);
          ctx.fillStyle = `rgba(255,214,130,${(0.46 - t * 0.34) * (0.5 + r() * 0.5)})`;
          ctx.fillRect(sx + off, y, ww, 3);
        }
      }
      // SANTO STEFANO a destra: nero contro la luce, con l'anello in cima
      santoStefanoLontano(ctx, W * 0.80, horiz + 2, W * 0.19, H * 0.14, '#141a26', '#1e2632');
      ctx.fillStyle = 'rgba(20,26,38,.5)';                     // la sua ombra sull'acqua
      pixelEllipse(ctx, W * 0.80, horiz + 16, W * 0.10, 12, 4);
      // Ventotene bassa a sinistra, che si stacca
      for (let dx = -W * 0.14; dx < W * 0.14; dx += 4) {
        const t = dx / (W * 0.14);
        const hh = H * 0.05 * Math.pow(Math.max(0, 1 - t * t), 0.45);
        ctx.fillStyle = '#20283a'; ctx.fillRect(W * 0.13 + dx, horiz + 1 - hh, 4, hh + 1);
      }
      // i gabbiani: tre, contro il sole
      ctx.fillStyle = '#4a3a44';
      for (const [ux, uy] of [[W * 0.30, H * 0.22], [W * 0.36, H * 0.16], [W * 0.56, H * 0.20]]) {
        ctx.fillRect(ux - 8, uy, 8, 3); ctx.fillRect(ux, uy - 4, 3, 4); ctx.fillRect(ux + 3, uy, 8, 3);
      }
      // IL PRIMO PIANO: il bordo di tufo dell'isola, dove si sta in piedi. È
      // controluce, quindi è quasi nero — ma il ciglio prende il sole per intero.
      /* Il primo piano deve dire di essere un PIANO che viene verso di noi. Prima era una
         fascia piatta di #2e2622 con dentro sassi di #3a302a: dieci punti di luminanza di
         differenza, cioe' invisibili, e nessuna grana che cresce. Adesso il tufo si schiarisce
         scendendo (quello vicino prende piu' cielo), i sassi hanno cinquanta punti di
         differenza invece di dieci, e la loro grana cresce venendo avanti — che e' la cosa
         che dice a un occhio quanto e' lontano un piano (lezione 59). */
      for (let x = 0; x < W; x += 7) {
        const top = H * 0.87 + Math.sin(x * 0.031) * 9 + Math.sin(x * 0.011) * 7;
        for (let y = Math.round(top); y < H; y++) {
          const t = (y - top) / Math.max(1, H - top);
          ctx.fillStyle = mix('#3a302a', '#5a4c40', Math.pow(t, 0.8));
          ctx.fillRect(x, y, 7, 1);
        }
        ctx.fillStyle = '#ffcf8c'; ctx.fillRect(x, top, 7, 6);            // il ciglio in luce
        ctx.fillStyle = 'rgba(255,170,100,.24)'; ctx.fillRect(x, top + 6, 7, 5);
      }
      // i sassi del bordo, con la grana che cresce, e sotto i piu' vicini l'ombra di contatto
      for (let i = 0; i < 44; i++) {
        const t = r();
        const sx = r() * W, sy = H * 0.895 + t * H * 0.095;
        const rr = 2 + t * 10;
        ctx.fillStyle = 'rgba(18,14,12,.44)'; pixelEllipse(ctx, sx, sy + rr * 0.5, rr, 2, 3);
        ctx.fillStyle = '#221c18'; pixelEllipse(ctx, sx, sy, rr, Math.max(2, rr * 0.5), 3);
        ctx.fillStyle = '#6a5a4c'; pixelEllipse(ctx, sx, sy - 1, rr * 0.8, Math.max(1, rr * 0.3), 3);
      }
      for (const [fx, fw] of [[0.14, 46], [0.52, 62], [0.84, 38]]) {
        ctx.fillStyle = 'rgba(255,206,140,.30)'; pixelEllipse(ctx, W * fx, H * 0.955, fw, 7, 4);
        ctx.fillStyle = 'rgba(255,236,190,.26)'; pixelEllipse(ctx, W * fx, H * 0.95, fw * 0.6, 3, 4);
      }
    },

  };


  /* Disegna una scena, con eventuali eroi e PNG.
     npcKeys accetta stringhe oppure oggetti posizionati:
     { key, x, y, scale, flip } con x/y in frazioni di larghezza/altezza. */
  /* ============ IL VELO DELLA NOTTE ============
     PERCHE' ESISTE. Cinque scene notturne stavano su fondali di pieno giorno: a6_porto apre
     con «il porto di notte e' piu' bello che di giorno, l'acqua nera e liscia dentro la cava
     di tufo» e mostrava il porto delle 17:20 col cielo #7ec0dc; c15_dopo da' l'ora esatta —
     00:33 — sopra il fondale del B&B col mare turchese e il sole in faccia. E' la lezione 62
     nella forma piu' pura (il quadro deve mostrare quello che il testo dice), ed e' il
     difetto che il giocatore nota per primo, perche' ha appena letto la frase. In un gioco
     dove il buio E' la minaccia, far vedere il pomeriggio mentre il testo dice «acqua nera»
     disinnesca la scena.
     COME. Tre veli rgba e niente altro: nessuna operazione di composizione, nessun accesso
     ai pixel. La ragione e' pratica e vale piu' dell'eleganza — il rasterizzatore in Node
     con cui si guardano i fondali (tools/fondali-in-png.mjs) deve vedere ESATTAMENTE quello
     che vede il browser, altrimenti la verifica visiva non verifica niente.
     E le luci calde: di notte un posto abitato non e' buio, e' buio CON DENTRO due luci. Il
     grumo giallo delle barche al terzo pontile, e la finestra della cucina di Ada. */
  const LUCI_DI_NOTTE = {
    porto:    [[0.35, 0.58, 13, 8, '255,214,140'], [0.52, 0.55, 8, 6, '255,200,120']],
    bnb:      [[0.62, 0.52, 10, 7, '255,226,160']],
    paese:    [[0.30, 0.55, 11, 7, '255,220,150'], [0.66, 0.52, 9, 6, '255,210,140']],
    terrazza: [[0.50, 0.40, 9, 6, '255,232,170']],
  };

  function notte(ctx, W, H, locationKey) {
    const cielo = Math.round(H * 0.42);
    ctx.fillStyle = 'rgba(6,10,22,.70)';   ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(0,0,0,.26)';     ctx.fillRect(0, 0, W, cielo);
    ctx.fillStyle = 'rgba(16,24,50,.22)';  ctx.fillRect(0, cielo, W, H - cielo);
    for (const [fx, fy, w, h, rgb] of (LUCI_DI_NOTTE[locationKey] || [])) {
      const x = Math.round(W * fx), y = Math.round(H * fy);
      glow(ctx, x, y, w, h, rgb);
      ctx.fillStyle = `rgba(${rgb},.55)`;
      ctx.fillRect(x - Math.round(w / 3), y - 2, Math.round(w * 2 / 3), 4);
    }
  }

  function paint(canvasId, locationKey, heroKeys = null, npcKeys = null, opts = null) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const W = canvas.width, H = canvas.height;
    const painter = painters[locationKey] || painters.porto;
    painter(ctx, W, H);
    if (opts && opts.notturno) notte(ctx, W, H, locationKey);
    // il velo della profondità: mai sull'alba, che è l'unica scena che respira
    if (locationKey !== 'alba') profondita(ctx, W, H, depthM);
    if (heroKeys && heroKeys.length) heroesRow(ctx, W, H - 8, heroKeys, 3);
    if (npcKeys && npcKeys.length) drawNpcs(ctx, W, H, npcKeys);
  }

  function drawNpcs(ctx, W, H, npcKeys) {
    const plain = npcKeys.filter(n => typeof n === 'string');
    const placed = npcKeys.filter(n => typeof n === 'object' && n);
    const scale = 5, size = 16 * scale;
    const baseFeet = H - 34;
    let x = Math.floor(W * 0.70 - (plain.length - 1) * (size + 16) / 2);
    for (const key of plain) {
      const def = Sprites.registry[key];
      if (def) {
        ctx.fillStyle = 'rgba(0,0,0,.35)';
        ctx.fillRect(x + 6, baseFeet - 4, size - 12, 8);
        Sprites.drawSprite(ctx, def.map, def.palette, x, baseFeet - size, scale, true);
      }
      x += size + 16;
    }
    for (const n of placed) {
      const def = Sprites.registry[n.key];
      if (!def) continue;
      const s = n.scale || 5, sz = 16 * s;
      const px = Math.round((n.x != null ? n.x * W : W * 0.7) - sz / 2);
      const finalY = n.y != null ? Math.round(n.y * H) - sz : H - 34 - sz;
      ctx.fillStyle = 'rgba(0,0,0,.3)';
      ctx.fillRect(px + 6, finalY + sz - 4, sz - 12, 7);
      Sprites.drawSprite(ctx, def.map, def.palette, px, finalY, s, n.flip !== false);
    }
  }

  return { paint, painters, notte, rng, blocks, shade, heroesRow, tree, willow, house, torch, sign, ground, hills, moon, setEclipse, getEclipse, setDepth, getDepth, pixelDisc };
})();
