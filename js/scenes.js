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

  function house(ctx, x, groundY, w, h, wall, roof, rand, windowLit = true) {
    blocks(ctx, x, groundY - h, w, h, wall, 8, rand, 0.12);
    const steps = 7, over = 14;
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const rw = (w + over * 2) * (1 - t);
      blocks(ctx, x + (w - rw) / 2, groundY - h - 8 - i * 8, rw, 9, roof, 8, rand, 0.16);
    }
    ctx.fillStyle = '#3a3a40'; ctx.fillRect(x + w / 2 - 9, groundY - 28, 18, 28);
    ctx.fillStyle = '#55555c'; ctx.fillRect(x + w / 2 - 11, groundY - 31, 22, 4);
    if (windowLit) {
      for (const wx of [x + 10, x + w - 24]) {
        ctx.fillStyle = 'rgba(200,200,210,.12)'; ctx.fillRect(wx - 6, groundY - h + 6, 26, 26);
        ctx.fillStyle = '#c8c8ce'; ctx.fillRect(wx, groundY - h + 12, 14, 14);
        ctx.fillStyle = '#55555c'; ctx.fillRect(wx + 6, groundY - h + 12, 2, 14);
      }
    }
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

  // OPUS RETICOLATUM: la rete di losanghe di tufo. È la firma di Villa Giulia.
  function reticolatum(ctx, x, y, w, h, color, rand, px = 7) {
    ctx.fillStyle = shade(color, 0.62);
    ctx.fillRect(x, y, w, h);
    for (let yy = y; yy < y + h; yy += px) {
      for (let xx = x + ((yy - y) / px % 2) * (px / 2); xx < x + w; xx += px) {
        ctx.fillStyle = shade(color, 0.92 + rand() * 0.26);
        const cw = Math.min(px - 2, x + w - xx), ch = Math.min(px - 2, y + h - yy);
        if (cw > 1 && ch > 1) ctx.fillRect(xx, yy, cw, ch);
      }
    }
  }

  // FASCIA DI COCCIOPESTO: il rosa dell'opus signinum, con la LINEA in cima
  // (il livello dell'acqua: nelle cisterne è la cosa che dice da quanto tempo)
  function cocciopesto(ctx, x, y, w, h, rand, tint = '#c07a68') {
    blocks(ctx, x, y, w, h, tint, 6, rand, 0.16);
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
    // l'anello di pietra in cima: un muro curvo, alto come una diga
    const rw = w * 0.34, ry = baseY - h * 0.94;
    ctx.fillStyle = ring;
    ctx.fillRect(x - rw / 2, ry, rw, Math.max(3, h * 0.20));
    ctx.fillStyle = shade(ring, 1.18);
    ctx.fillRect(x - rw / 2, ry, rw, 2);
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
      glow(ctx, W * 0.15, H * 0.16, H * 0.26, H * 0.24, '186,204,232');
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

      /* IL PAESE: case cubiche appoggiate sul ciglio, non puntini sparsi. Ognuna ha il
         suo tetto piatto e una o due finestre accese. È il grappolo attorno a Santa
         Candida, cioè la parte alta dell'isola. */
      const paeseDa = -iw * 0.30, paeseA = iw * 0.06;
      glow(ctx, ix + (paeseDa + paeseA) / 2, horiz - ih * 0.55, iw * 0.40, ih * 1.05, '224,178,90');
      for (let dx = paeseDa; dx < paeseA; dx += 7) {
        const suolo = horiz - quotaAl(dx);
        const hw = 5 + (r() * 4 | 0), hh2 = 4 + (r() * 5 | 0);
        const hx = ix + dx + (r() * 3 | 0), hy = suolo - hh2 + 1;
        ctx.fillStyle = '#101823';
        ctx.fillRect(hx, hy, hw, hh2 + 2);
        ctx.fillStyle = 'rgba(150,168,198,.10)';            // il tetto piatto, appena chiaro
        ctx.fillRect(hx, hy, hw, 1);
        if (r() > 0.30) {                                   // la finestra accesa
          const fx = hx + 1 + (r() * Math.max(1, hw - 3) | 0);
          ctx.fillStyle = r() > 0.72 ? '#fff0c0' : '#e8b860';
          ctx.fillRect(fx, hy + 1 + (r() * Math.max(1, hh2 - 2) | 0), 2, 2);
        }
      }

      /* IL CAMPANILE DI SANTA CANDIDA: l'unica cosa verticale dell'isola, e va letta
         come un edificio. Base che affonda nei tetti, cella campanaria con l'arco
         scuro, cornicione, tetto piramidale, e il lato di sinistra illuminato dalla
         luna. La lampada è piccola: una lampada, non un faro. */
      const bcx = Math.round(ix - iw * 0.14);
      const bBase = horiz - quotaAl(-iw * 0.14) + 3;         // dentro i tetti, non sopra
      const bW = 13, bH = ih * 1.05;
      const bTop = bBase - bH;
      ctx.fillStyle = '#0e1620'; ctx.fillRect(bcx, bTop, bW, bH);
      ctx.fillStyle = 'rgba(158,176,206,.16)'; ctx.fillRect(bcx, bTop, 2, bH);          // lato luna
      ctx.fillStyle = 'rgba(4,8,15,.55)'; ctx.fillRect(bcx + bW - 2, bTop, 2, bH);      // lato ombra
      // la cella campanaria: un arco scuro dove sta la campana
      const cellaY = bTop + Math.round(bH * 0.16);
      ctx.fillStyle = '#050a11'; ctx.fillRect(bcx + 4, cellaY, 5, 6);
      ctx.fillStyle = '#050a11'; ctx.fillRect(bcx + 5, cellaY - 1, 3, 1);
      // cornicione e tetto piramidale
      ctx.fillStyle = '#141d28'; ctx.fillRect(bcx - 2, bTop - 2, bW + 4, 2);
      for (let k = 0; k < 5; k++) {
        ctx.fillStyle = k === 0 ? 'rgba(158,176,206,.20)' : '#101923';
        ctx.fillRect(bcx + 1 + k, bTop - 3 - k, bW - 2 - k * 2, 1);
      }
      // la lampada sotto il cornicione, piccola, col suo mezzo alone
      ctx.fillStyle = '#f0d078'; ctx.fillRect(bcx + bW - 4, cellaY + 8, 2, 2);
      glow(ctx, bcx + bW - 3, cellaY + 9, 9, 7, '240,208,120');

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
      /* IL RESPIRO DEL MARE nella parte bassa: righe lunghissime e quasi invisibili.
         Prima quel terzo era nero piatto e sembrava una fascia morta. */
      for (let y = horiz + H * 0.14; y < H - 4; y += 7) {
        const t = (y - horiz) / (H - horiz);
        ctx.fillStyle = `rgba(96,124,160,${0.030 - t * 0.014})`;
        const lw = W * (0.30 + r() * 0.55);
        ctx.fillRect((r() * (W - lw)) | 0, y | 0, lw | 0, 1);
      }

      /* LA COSA: in mezzo al braccio di mare fra le due isole, SOTTO il pelo
         dell'acqua, un chiarore che sale. Era un'ellisse a bordo netto e sembrava un
         uovo: adesso è una colonna di trattini irregolari, più stretta e più chiara
         appena sotto la superficie, che si sfilaccia scendendo. Niente simmetria. */
      const bx = W * 0.68;
      for (let y = horiz + 4; y < horiz + H * 0.34; y += 3) {
        const t = (y - horiz) / (H * 0.34);
        const larg = 5 + t * 46;
        const n = 2 + (r() * 3 | 0);
        for (let k = 0; k < n; k++) {
          const ww = 2 + r() * larg * 0.5;
          const off = (r() - 0.5) * (larg - ww) * 1.3;
          ctx.fillStyle = `rgba(176,212,228,${(0.085 - t * 0.070) * (0.55 + r() * 0.7)})`;
          ctx.fillRect((bx + off) | 0, y, ww | 0, 2);
        }
      }
      // il punto più chiaro, appena sotto il pelo: due trattini e basta
      ctx.fillStyle = 'rgba(214,238,246,.13)';
      ctx.fillRect((bx - 4) | 0, (horiz + 3) | 0, 7, 2);
      ctx.fillStyle = 'rgba(214,238,246,.08)';
      ctx.fillRect((bx + 2) | 0, (horiz + 6) | 0, 5, 2);

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
      // IL CIGLIO, che adesso si vede contro il cielo: una riga di tufo chiaro,
      // le sterpaglie secche e due case bianche sul bordo, come stanno davvero
      ctx.fillStyle = '#e0bc78'; ctx.fillRect(0, cigli - 5, cliffW, 7);
      ctx.fillStyle = 'rgba(255,246,214,.30)'; ctx.fillRect(0, cigli - 5, cliffW, 2);
      sterpaglie(ctx, 0, cigli - 4, cliffW, '#8a8a52', r, 26);
      house(ctx, W * 0.09, cigli - 6, 58, 38, '#f0e2bc', '#c07a58', r, false);
      house(ctx, W * 0.31, cigli - 6, 46, 30, '#e8d4ae', '#b06a50', r, false);
      house(ctx, W * 0.52, cigli - 6, 38, 24, '#e0cca8', '#a86048', r, false);
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
      // la spalla di tufo a destra, che chiude la cava
      blocks(ctx, W * 0.88, H * 0.16, W * 0.12, waterY - H * 0.16, '#c8a058', 12, r, 0.12);
      // L'ACQUA DENTRO LA CAVA: verde bottiglia, ferma, con il riflesso del tufo
      sea(ctx, W, waterY, quayY, '#0e3038', '#134048', r, 7, 0.3);
      ctx.fillStyle = 'rgba(200,160,88,.13)';
      for (let y = waterY + 2; y < quayY; y += 6) ctx.fillRect(0, y, cliffW, 3);
      // LE BARCHE: piccole, di legno, ormeggiate di prua alla banchina
      for (const [fx, bw, col] of [[0.14, 74, '#e0e4e8'], [0.34, 62, '#d8dcd0'], [0.52, 86, '#e8e0c8'], [0.72, 58, '#d0d8de']]) {
        const bxx = W * fx, byy = waterY + 24 + (fx * 40 % 14);
        ctx.fillStyle = shade(col, 0.62); ctx.fillRect(bxx - bw / 2, byy, bw, 13);       // opera viva in ombra
        ctx.fillStyle = col; ctx.fillRect(bxx - bw / 2, byy - 9, bw, 10);                 // fiancata
        ctx.fillStyle = '#2a6a80'; ctx.fillRect(bxx - bw / 2, byy - 3, bw, 3);            // bagliolo azzurro
        ctx.fillStyle = shade(col, 1.14); ctx.fillRect(bxx - bw / 2, byy - 11, bw, 3);
        ctx.fillStyle = '#8a6a3a'; ctx.fillRect(bxx - 3, byy - 40, 4, 31);                // l'albero
        ctx.fillStyle = 'rgba(20,40,44,.34)'; ctx.fillRect(bxx - bw / 2 + 4, byy + 13, bw - 8, 5);
      }
      // LA BANCHINA in primo piano: cemento vecchio, bitte, una cima avvolta
      blocks(ctx, 0, quayY - 6, W, H - quayY + 6, '#a8a094', 12, r, 0.10);
      ctx.fillStyle = 'rgba(255,255,240,.10)'; ctx.fillRect(0, quayY - 6, W, 3);
      ctx.fillStyle = 'rgba(60,54,44,.30)';
      for (let x = 0; x < W; x += 68) ctx.fillRect(x, quayY - 4, 3, H - quayY + 4);
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
      const horiz = H * 0.30, railY = H * 0.60, deckY = H * 0.72;
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
      // LA SCIA: si allarga venendo verso di noi, bianca e piena di bolle
      for (let i = 0; i < 16; i++) {
        const t = i / 15;
        const y = horiz + 2 + t * (deckY - horiz);
        const w2 = W * (0.020 + t * 0.30);
        ctx.fillStyle = `rgba(226,244,250,${0.10 + t * 0.34})`;
        ctx.fillRect(W * 0.40 - w2 / 2, y, w2, (deckY - horiz) / 15 + 1);
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
      ctx.fillStyle = 'rgba(20,26,30,.24)';
      for (let x = 0; x < W; x += 24) ctx.fillRect(x, deckY, 3, H - deckY);
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
      ctx.fillStyle = 'rgba(150,190,206,.16)';
      ctx.fillRect(W * 0.345, horiz - H * 0.09, 13, railY - horiz + H * 0.09);
      ctx.fillStyle = 'rgba(210,232,240,.10)';
      ctx.fillRect(W * 0.349, horiz - H * 0.09, 5, railY - horiz + H * 0.09);
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
      ctx.fillStyle = 'rgba(70,58,44,.22)';
      for (let y = groundY; y < H; y += 15) for (let x = ((y / 15) % 2) * 32; x < W; x += 64) ctx.fillRect(x, y, 60, 2);
      ctx.fillStyle = 'rgba(255,224,170,.12)'; ctx.fillRect(0, groundY, W, H - groundY);
      // I TAVOLINI DI FERRO con le sedie: tre, apparecchiati
      for (const [fx, fy] of [[0.10, 0.06], [0.30, 0.20], [0.78, 0.12]]) {
        const tx = W * fx, ty = groundY + (H - groundY) * fy;
        ctx.fillStyle = 'rgba(50,40,30,.28)'; pixelEllipse(ctx, tx, ty + 30, 30, 8, 4);
        ctx.fillStyle = '#3a4a44'; ctx.fillRect(tx - 24, ty, 48, 5);          // il piano
        ctx.fillStyle = '#f0ece0'; ctx.fillRect(tx - 22, ty - 3, 44, 4);      // tovaglia di carta
        ctx.fillStyle = '#2e3a36'; ctx.fillRect(tx - 3, ty + 5, 6, 26);
        ctx.fillRect(tx - 14, ty + 29, 28, 3);
        ctx.fillStyle = '#3a4a44';                                            // due sedie
        ctx.fillRect(tx - 40, ty + 6, 14, 4); ctx.fillRect(tx - 40, ty - 14, 4, 22);
        ctx.fillRect(tx + 27, ty + 6, 14, 4); ctx.fillRect(tx + 37, ty - 14, 4, 22);
        ctx.fillStyle = '#e8e4d4'; ctx.fillRect(tx - 8, ty - 9, 5, 7); ctx.fillRect(tx + 4, ty - 8, 4, 6);
      }
      // I GATTI: uno sulla sedia, uno steso al sole in mezzo alla piazza
      for (const [gx, gy, col] of [[W * 0.355, groundY + (H - groundY) * 0.20 - 12, '#c8b498'], [W * 0.55, H - 22, '#5a5248']]) {
        ctx.fillStyle = col;
        pixelEllipse(ctx, gx, gy, 13, 6, 3);
        ctx.fillStyle = col; ctx.fillRect(gx + 9, gy - 9, 8, 8);
        ctx.fillRect(gx + 9, gy - 13, 3, 5); ctx.fillRect(gx + 14, gy - 13, 3, 5);
        ctx.fillStyle = shade(col, 0.7); ctx.fillRect(gx - 16, gy - 2, 8, 3);
      }
      // il motorino appoggiato al muro col cavalletto giù
      const mx = W * 0.455;
      ctx.fillStyle = '#2a2a30'; pixelDisc(ctx, mx, groundY + 12, 10, 3); pixelDisc(ctx, mx + 34, groundY + 12, 10, 3);
      ctx.fillStyle = '#7a2e2e'; ctx.fillRect(mx, groundY - 6, 36, 12);
      ctx.fillStyle = '#3a3a40'; ctx.fillRect(mx + 24, groundY - 20, 8, 16);
      ctx.fillStyle = '#5a5a62'; ctx.fillRect(mx + 20, groundY - 22, 18, 4);
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
      ctx.fillStyle = 'rgba(146,182,196,.26)'; ctx.fillRect(W * 0.735, horiz - 18, 14, H * 0.16 + 18);
      ctx.fillStyle = 'rgba(210,230,234,.16)'; ctx.fillRect(W * 0.739, horiz - 18, 6, H * 0.16 + 18);
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
      // la scaletta di parracine che sale da un livello all'altro, a destra
      for (let i = 0; i < 9; i++) {
        ctx.fillStyle = '#cfb078'; ctx.fillRect(W * 0.90, H * 0.44 + i * 12, 88 - i, 8);
        ctx.fillStyle = 'rgba(90,70,34,.30)'; ctx.fillRect(W * 0.90, H * 0.44 + i * 12 + 8, 88 - i, 4);
      }
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
      // IL BASILICO nel bidone di latta tagliato a metà
      ctx.fillStyle = '#5a7a8a'; ctx.fillRect(W * 0.855, H * 0.53, 46, 30);
      ctx.fillStyle = '#48687a'; ctx.fillRect(W * 0.855, H * 0.53, 46, 5);
      ctx.fillStyle = '#3a5464'; ctx.fillRect(W * 0.855, H * 0.53 + 12, 46, 3);
      ctx.fillStyle = '#4a8a48';
      for (let k = 0; k < 9; k++) pixelEllipse(ctx, W * 0.858 + 6 + k * 5, H * 0.52 - (k % 4) * 5, 7, 5, 3);
      // IL TAVOLINO DI FERRO con la moka da sei e le tazzine, e TRE sedie di
      // plastica: la terza la tira su Ada dal muretto.
      const tx = W * 0.26, ty = H * 0.86;
      ctx.fillStyle = 'rgba(70,54,26,.26)'; pixelEllipse(ctx, tx, ty + 42, 52, 10, 4);
      ctx.fillStyle = '#3a4a46'; ctx.fillRect(tx - 40, ty, 80, 7);
      ctx.fillStyle = '#4a5a54'; ctx.fillRect(tx - 40, ty - 2, 80, 3);
      ctx.fillStyle = '#2e3a36'; ctx.fillRect(tx - 5, ty + 7, 10, 34); ctx.fillRect(tx - 20, ty + 41, 40, 5);
      ctx.fillStyle = '#9a9aa0'; ctx.fillRect(tx - 9, ty - 20, 18, 20);      // la moka da sei
      ctx.fillStyle = '#74747c'; ctx.fillRect(tx - 7, ty - 29, 14, 10);
      ctx.fillStyle = '#2a2a2e'; ctx.fillRect(tx + 9, ty - 25, 8, 4);
      ctx.fillStyle = '#f4f0e4'; ctx.fillRect(tx - 30, ty - 9, 11, 9); ctx.fillRect(tx + 18, ty - 9, 11, 9);
      ctx.fillStyle = '#6a4a2a'; ctx.fillRect(tx - 28, ty - 7, 7, 3); ctx.fillRect(tx + 20, ty - 7, 7, 3);
      for (const [sfx, sy0] of [[-0.085, 0], [0.085, 0], [0.0, -0.055]]) {
        const sx = tx + W * sfx, syy = ty + H * sy0;
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
      {
        const gx0 = W * 0.90, gy0 = H * 0.62;
        for (let k = 0; k < 9; k++) {
          const gx = gx0 - k * 2, gy = gy0 + k * 7;
          if (gy > H - 6) break;
          ctx.fillStyle = k % 2 ? '#b8a074' : '#cdb689';
          ctx.fillRect(gx, gy, W - gx, 5);
          ctx.fillStyle = 'rgba(58,46,30,.40)';
          ctx.fillRect(gx, gy + 5, W - gx, 2);
          ctx.fillStyle = 'rgba(255,236,190,.16)';          // il filo di luce sul bordo del gradino
          ctx.fillRect(gx, gy, W - gx, 1);
        }
        // il muretto che accompagna la rampa, e il buco nero dove la rampa svolta
        ctx.fillStyle = 'rgba(96,80,52,.55)'; ctx.fillRect(gx0 - 20, gy0 - 4, 5, H - gy0);
        ctx.fillStyle = 'rgba(14,20,18,.5)'; ctx.fillRect(gx0 - 16, gy0 + 58, 16, 8);
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
      // IL SOLE BASSO, a destra, appoggiato sull'acqua
      glow(ctx, W * 0.80, horiz - 4, 190, 130, '255,186,104');
      ctx.fillStyle = '#ffcc70'; pixelDisc(ctx, W * 0.80, horiz - 8, 32, 4);
      ctx.fillStyle = '#fff2c8'; pixelDisc(ctx, W * 0.80, horiz - 8, 18, 4);
      // IL MARE FUORI DALLA RIGA: blu, e sotto la posidonia non si vede niente
      sea(ctx, W, horiz, rigaY, '#1d4a72', '#2a6a94', r, 7, 0.8);
      // la colonna del sole: trattini larghi che si allargano venendo verso riva
      for (let y = horiz; y < shoreY - 8; y += 5) {
        const t = (y - horiz) / (shoreY - horiz);
        const spread = 22 + t * 150;
        for (let k = 0; k < 3; k++) {
          const ww = 10 + r() * spread * 0.55;
          ctx.fillStyle = `rgba(255,206,130,${0.34 - t * 0.20})`;
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
      ctx.fillStyle = 'rgba(3,12,18,.72)';
      ctx.fillRect(W * 0.285, rigaY + 11, W * 0.16, 13);
      ctx.fillRect(W * 0.437, rigaY + 16, W * 0.042, 8);
      ctx.fillStyle = 'rgba(3,12,18,.44)'; ctx.fillRect(W * 0.265, rigaY + 15, W * 0.024, 7);
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
      const boaX = W * 0.56;
      ctx.fillStyle = 'rgba(14,32,42,.5)'; pixelEllipse(ctx, boaX, rigaY + 6, 16, 5, 3);
      ctx.fillStyle = '#3a3a40'; ctx.fillRect(boaX - 2, rigaY - 34, 5, 16);
      ctx.fillStyle = '#e8c030'; pixelDisc(ctx, boaX, rigaY - 10, 15, 3);
      ctx.fillStyle = '#f8e478'; pixelDisc(ctx, boaX, rigaY - 14, 9, 3);
      ctx.fillStyle = '#6a5a14'; ctx.fillRect(boaX - 15, rigaY - 6, 30, 4);      // le alghe alla base
      // LA GENTE, alle sette di sera: in acqua fino alla vita, sul bagnasciuga,
      // e uno che nuota lentissimo e perfetto parallelo alla riva
      const gente = [
        [0.09, shoreY + 16, 1.0], [0.14, shoreY + 22, 1.05], [0.22, shoreY + 6, 0.95],
        [0.35, rigaY + 52, 0.80], [0.41, rigaY + 60, 0.82], [0.66, rigaY + 66, 0.85],
        [0.72, shoreY + 10, 1.0], [0.91, shoreY + 18, 1.0],
      ];
      for (const [fx, by, s] of gente) {
        const bx = W * fx;
        const inAcqua = by < shoreY;
        ctx.fillStyle = 'rgba(20,40,50,.24)'; ctx.fillRect(bx - 6 * s, by - 2, 13 * s, 4);
        ctx.fillStyle = ['#2a4a5a', '#7a3a4a', '#3a5a3a', '#5a4a6a'][(fx * 100 | 0) % 4];
        ctx.fillRect(bx - 5 * s, by - (inAcqua ? 18 : 30) * s, 10 * s, (inAcqua ? 18 : 26) * s);
        ctx.fillStyle = '#d8b090';
        ctx.fillRect(bx - 4 * s, by - (inAcqua ? 26 : 38) * s, 8 * s, 9 * s);
        ctx.fillStyle = '#3a2a20'; ctx.fillRect(bx - 4 * s, by - (inAcqua ? 27 : 39) * s, 8 * s, 4 * s);
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
      for (const [fx, fy, sc, open] of [[0.14, 0.30, 0.78, true], [0.40, 0.72, 1.0, true], [0.60, 0.34, 0.74, false]]) {
        const ux = W * fx, uy = shoreY + 12 + (H - shoreY - 12) * fy;
        ctx.fillStyle = 'rgba(90,70,44,.26)'; pixelEllipse(ctx, ux, uy, 34 * sc, 6 * sc, 3);
        ctx.fillStyle = '#8a7a5a'; ctx.fillRect(ux - 3, uy - 66 * sc, 7, 66 * sc);
        if (open) {
          // LA CALOTTA come una cupola vera: righe orizzontali che si accorciano
          // salendo, e poi gli spicchi a spicchi alterni sopra
          const R = 62 * sc, Hd = 26 * sc, cy = uy - 68 * sc;
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
          ctx.fillStyle = '#3a8a9a'; ctx.fillRect(ux - 7, uy - 84 * sc, 15, 22 * sc);
          ctx.fillStyle = '#f0ece0'; ctx.fillRect(ux - 4, uy - 88 * sc, 9, 8 * sc);
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
      // L'ISOLA CHE SCENDE VERSO IL PORTO, tutta di luci gialle
      blocks(ctx, 0, H * 0.36, W * 0.62, murettoY - H * 0.36, '#0c1218', 14, r, 0.10);
      for (let i = 0; i < 90; i++) {
        const t = r();
        const lx = r() * W * 0.60;
        const ly = H * 0.40 + t * (murettoY - H * 0.42);
        ctx.fillStyle = r() > 0.82 ? '#fff0c0' : (r() > 0.4 ? '#e8b860' : '#c89848');
        ctx.fillRect(lx | 0, ly | 0, 2, 2);
      }
      // il grumo di luce del porto, in fondo a sinistra, e i lampioni della salita
      glow(ctx, W * 0.14, murettoY - 26, 150, 70, '226,180,96');
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
      glow(ctx, W * 0.24, horiz - 2, 90, 10, '226,196,140');
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
      // IL MURETTO A SECCO su cui si tengono i piedi
      muretto(ctx, 0, murettoY, W, H - murettoY, '#6a5a3e', r);
      ctx.fillStyle = 'rgba(255,230,170,.06)'; ctx.fillRect(0, murettoY, W, 4);
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

      // IL TAVOLINO e LE DUE SEDIE DI PLASTICA, in controluce
      const tx = W * 0.30, ty = murettoY - 4;
      ctx.fillStyle = '#1a1d22'; ctx.fillRect(tx - 30, ty - 44, 60, 6);
      ctx.fillRect(tx - 3, ty - 38, 7, 38);
      ctx.fillRect(tx - 16, ty - 4, 34, 4);
      ctx.fillStyle = '#2a2e34'; ctx.fillRect(tx - 22, ty - 52, 8, 8);       // due bicchieri
      ctx.fillRect(tx + 10, ty - 51, 7, 7);
      ctx.fillStyle = '#3a3e44'; ctx.fillRect(tx - 8, ty - 50, 14, 7);       // il sacchetto dei taralli
      for (const sfx of [-0.10, 0.10]) {
        const sx = tx + W * sfx;
        ctx.fillStyle = '#23272c';
        ctx.fillRect(sx - 16, ty - 34, 32, 6);
        ctx.fillRect(sx + (sfx < 0 ? -16 : 10), ty - 68, 6, 36);
        ctx.fillRect(sx - 16 + (sfx < 0 ? 0 : 4), ty - 68, 28, 6);
        ctx.fillRect(sx - 13, ty - 28, 5, 28); ctx.fillRect(sx + 8, ty - 28, 5, 28);
      }
      // il vaso dei limoni, a destra: mezzo metro d'acqua quaranta metri sopra il mare
      ctx.fillStyle = '#3a2a20'; ctx.fillRect(W * 0.80, murettoY - 30, 40, 30);
      ctx.fillStyle = '#0e1418'; ctx.fillRect(W * 0.803, murettoY - 28, 34, 6);
      ctx.fillStyle = 'rgba(150,196,214,.14)'; ctx.fillRect(W * 0.803, murettoY - 28, 34, 3);
      ctx.fillStyle = '#1a2a1e';
      for (const [ox, oy] of [[8, -52], [26, -48], [17, -62]]) pixelEllipse(ctx, W * 0.80 + ox, murettoY + oy, 14, 9, 3);
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
      ctx.fillStyle = 'rgba(190,160,120,.20)';
      for (let y = floorY + 3; y < H; y += 6) ctx.fillRect(0, y, W, 3);
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
      glow(ctx, lx, ly + 10, 170, 130, '255,214,140');
      glow(ctx, lx, ly + 10, 86, 66, '255,232,180');
      glow(ctx, lx, ly + 10, 40, 32, '255,244,214');
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
      for (let i = 0; i < 6; i++) {
        const gx = W * (0.14 + i * 0.14);
        ctx.fillStyle = 'rgba(226,240,248,.7)';
        ctx.fillRect(gx, H * (0.32 + (i % 3) * 0.13), 3, 9);
        ctx.fillStyle = 'rgba(226,240,248,.26)';
        pixelEllipse(ctx, gx + 1, floorY + 6, 12, 4, 3);
      }
      // il freddo che scende dai ventidue gradini, a sinistra, fuori inquadratura
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = `rgba(186,206,222,${0.05 - i * 0.01})`;
        ctx.fillRect(0, H * 0.22 + i * 10, W * (0.10 - i * 0.02), floorY - H * 0.22);
      }
      // LE QUATTRO PAROLE INCISE nel tufo a destra, ad altezza di mano
      ctx.fillStyle = 'rgba(60,44,24,.5)';
      for (let k = 0; k < 4; k++) ctx.fillRect(W * 0.86, floorY - 104 + k * 10, 30 - (k % 2) * 10, 3);
      ctx.fillStyle = 'rgba(255,236,200,.24)';
      for (let k = 0; k < 4; k++) ctx.fillRect(W * 0.86, floorY - 101 + k * 10, 30 - (k % 2) * 10, 1);
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
      glow(ctx, bx + bw / 2, by + bh / 2, bw * 2.0, bh * 2.2, '214,222,208');
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
      for (const [fx, fs] of [[0.22, 1], [0.29, 0.66]]) {
        ctx.fillStyle = '#5a7a9a';
        pixelEllipse(ctx, W * fx, waterY + 34, 18 * fs, 6 * fs, 3);
        ctx.fillStyle = '#7a9ab8'; ctx.fillRect(W * fx - 7 * fs, waterY + 30, 14 * fs, 4);
      }
      ctx.fillStyle = '#a8202e'; pixelDisc(ctx, W * 0.56, waterY + 26, 14, 3);
      ctx.fillStyle = '#e8e0d0'; ctx.fillRect(W * 0.56 - 14, waterY + 24, 28, 5);
      ctx.fillStyle = 'rgba(10,16,20,.44)'; pixelEllipse(ctx, W * 0.56, waterY + 40, 19, 5, 3);
      const mx2 = W * 0.63;
      ctx.fillStyle = '#6a9ab8'; pixelEllipse(ctx, mx2, waterY + 22, 18, 10, 3);
      ctx.fillStyle = '#b8dce8'; pixelEllipse(ctx, mx2, waterY + 21, 13, 6, 3);
      ctx.fillStyle = '#5a88a8'; ctx.fillRect(mx2 - 32, waterY + 18, 15, 4);   // l'elastico TAGLIATO
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
      // IL PRECIPIZIO: il taglio del tufo, quaranta metri di niente sotto il ciglio
      blocks(ctx, 0, edgeY, W, H - edgeY, '#cfc0a0', 14, r, 0.12);
      ctx.fillStyle = 'rgba(255,255,240,.22)'; ctx.fillRect(0, edgeY, W, 6);
      // il salto, a destra: dove la terra finisce e c'è solo aria
      ctx.fillStyle = '#8a7a5e';
      for (let x = W * 0.70; x < W; x += 8) {
        const d = (x - W * 0.70) / (W * 0.30);
        ctx.fillRect(x, edgeY + 6 + d * 20, 8, H - edgeY);
      }
      ctx.fillStyle = 'rgba(60,54,40,.34)';
      for (let x = W * 0.78; x < W; x += 6) ctx.fillRect(x, edgeY + 20 + (x - W * 0.78) * 0.22, 6, H);
      // LA TERRA BIANCA: secca, calcinata, con le sterpaglie
      ctx.fillStyle = 'rgba(255,252,230,.20)'; ctx.fillRect(0, edgeY, W, H - edgeY);
      sterpaglie(ctx, 0, H - 6, W * 0.72, '#b0a460', r, 34);
      sterpaglie(ctx, 0, edgeY + 28, W * 0.66, '#a89858', r, 22);
      fichidindia(ctx, W * 0.03, H - 4, 60, '#7a9a68', r);
      fichidindia(ctx, W * 0.63, edgeY + 44, 42, '#6e8e5e', r);
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
      // IL TAGLIO DELLE VASCHE nella roccia, a sinistra: rettangoli scavati, vuoti
      for (let i = 0; i < 3; i++) {
        const vx = W * 0.03 + i * W * 0.045, vy = H * 0.78;
        ctx.fillStyle = '#9a8a66'; ctx.fillRect(vx, vy, W * 0.040, 34);
        ctx.fillStyle = '#4a4232'; ctx.fillRect(vx + 3, vy + 3, W * 0.040 - 6, 28);
        ctx.fillStyle = '#2a2620'; ctx.fillRect(vx + 6, vy + 8, W * 0.040 - 12, 20);
        ctx.fillStyle = 'rgba(255,252,230,.20)'; ctx.fillRect(vx, vy, W * 0.040, 3);
      }
      // IL NINFEO sul filo del precipizio: un cubo di roccia aperto sul mare da
      // tre archi che non ci sono più, e venti gradi invece di trentaquattro.
      const nx = W * 0.60, nw = W * 0.22, ny = edgeY - 96, nh = 100;
      blocks(ctx, nx, ny, nw, nh, '#c0ac84', 10, r, 0.10);
      reticolatum(ctx, nx + 4, ny + 8, nw - 8, nh - 30, '#c8b48c', r, 7);
      ctx.fillStyle = '#d8ccaa'; ctx.fillRect(nx - 6, ny - 9, nw + 12, 11);
      for (let k = 0; k < 3; k++) {                        // i tre archi che non ci sono più
        const ax = nx + 12 + k * (nw - 24) / 3;
        ctx.fillStyle = '#241f18'; ctx.fillRect(ax, ny + 34, (nw - 24) / 3 - 8, nh - 40);
        arco(ctx, ax + ((nw - 24) / 3 - 8) / 2, ny + 38, ((nw - 24) / 3 - 8) / 2, 22, 6, '#241f18', r, 4);
        ctx.fillStyle = '#0e0c0a'; ctx.fillRect(ax + 3, ny + 42, (nw - 24) / 3 - 14, nh - 50);
      }
      // il canale di adduzione: il taglio nella roccia che portava l'acqua qui
      // dentro. Non è asciutto. In fondo, dove sparisce nel tufo, c'è acqua che scorre.
      ctx.fillStyle = '#8a7a5c'; ctx.fillRect(nx + nw, edgeY - 18, W * 0.10, 14);
      ctx.fillStyle = '#3a4a48'; ctx.fillRect(nx + nw, edgeY - 15, W * 0.10, 8);
      ctx.fillStyle = 'rgba(160,200,210,.34)'; ctx.fillRect(nx + nw + 6, edgeY - 14, W * 0.085, 3);
      ctx.fillStyle = '#0a0e10'; ctx.fillRect(nx + nw + W * 0.10 - 8, edgeY - 17, 12, 12);
      // LA PIETRA DELL'ISCRIZIONE, appoggiata a un muretto, mezza nelle sterpaglie
      const ix = W * 0.44, iy = H - 46;
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
      // LA PARETE DEL PORTO che sta sopra la spiaggia, a sinistra: tufo giallo
      blocks(ctx, 0, H * 0.02, W * 0.26, shoreY - H * 0.02, '#c8a058', 12, r, 0.12);
      for (let y = H * 0.08; y < shoreY - 6; y += 14) {
        ctx.fillStyle = 'rgba(110,80,40,.24)'; ctx.fillRect(0, y, W * 0.26, 2);
      }
      ctx.fillStyle = '#b08c4a'; ctx.fillRect(W * 0.24, H * 0.02, 12, shoreY - H * 0.02);
      sterpaglie(ctx, 0, H * 0.04, W * 0.26, '#8a8a52', r, 14);
      // la banchina del porto in cima, con le bitte in controluce
      ctx.fillStyle = '#a09884'; ctx.fillRect(0, H * 0.02, W * 0.26, 8);
      // LA RIVA e LA GHIAIA GROSSA: sassi disegnati uno per uno, che fanno male ai piedi
      for (let x = 0; x < W; x += 12) {
        const off = Math.round((r() - 0.5) * 8);
        ctx.fillStyle = '#7a8a86'; ctx.fillRect(x, shoreY + off, 12, 10);
        ctx.fillStyle = 'rgba(255,255,250,.34)'; ctx.fillRect(x, shoreY + off - 3, 12, 3);
      }
      blocks(ctx, 0, shoreY + 10, W, H - shoreY - 10, '#a8a496', 10, r, 0.10);
      for (let i = 0; i < 190; i++) {
        const gx = r() * W, gy = shoreY + 12 + r() * (H - shoreY - 14);
        const gs = 4 + r() * 7;
        ctx.fillStyle = ['#8a8880', '#b0aca0', '#9a9488', '#c0bcae', '#78746c'][Math.floor(r() * 5)];
        pixelEllipse(ctx, gx, gy, gs, gs * 0.62, 3);
      }
      ctx.fillStyle = 'rgba(255,214,150,.14)'; ctx.fillRect(0, shoreY + 10, W, H - shoreY - 10);
      // GLI OMBRELLONI che si smontano: uno ancora aperto, due già chiusi e a terra
      const ux = W * 0.44;
      ctx.fillStyle = '#8a7a5a'; ctx.fillRect(ux - 2, shoreY - 4, 5, 60);
      for (let k = 0; k < 5; k++) {
        ctx.fillStyle = k % 2 ? '#e8e4d0' : '#c85a3a';
        ctx.fillRect(ux - 48 + k * 20, shoreY - 12 + Math.abs(k - 2) * 4, 20, 8);
      }
      ctx.fillStyle = '#3a5a6a'; ctx.fillRect(W * 0.62, H - 26, 96, 8);
      ctx.fillStyle = '#c85a3a'; ctx.fillRect(W * 0.625, H - 30, 78, 6);
      ctx.fillStyle = '#8a7a5a'; ctx.fillRect(W * 0.70, H - 44, 90, 5);
      // LE TRE BOMBOLE del noleggio, in fila sulla ghiaia, e la muta appesa
      for (let i = 0; i < 3; i++) {
        const bx = W * 0.26 + i * 26, by = H - 30;
        ctx.fillStyle = '#3a6a5a'; ctx.fillRect(bx, by - 54, 17, 54);
        ctx.fillStyle = '#4a8a70'; ctx.fillRect(bx, by - 54, 17, 4);
        ctx.fillStyle = '#c8c8c0'; ctx.fillRect(bx + 4, by - 62, 9, 9);
        ctx.fillStyle = '#8a8a82'; ctx.fillRect(bx + 1, by - 66, 15, 5);
        ctx.fillStyle = 'rgba(40,50,46,.30)'; ctx.fillRect(bx - 4, by - 2, 25, 5);
      }
      ctx.fillStyle = '#1a2a34'; ctx.fillRect(W * 0.365, H - 84, 26, 54);
      ctx.fillStyle = '#2a3e4a'; ctx.fillRect(W * 0.365, H - 84, 26, 6);
      ctx.fillStyle = '#1a2a34'; ctx.fillRect(W * 0.352, H - 78, 12, 22); ctx.fillRect(W * 0.392, H - 78, 12, 22);
      // il cane in acqua fino alla pancia, e non più giù
      const dx2 = W * 0.86;
      ctx.fillStyle = '#4a3e30'; pixelEllipse(ctx, dx2, shoreY - 6, 17, 8, 3);
      ctx.fillStyle = '#5a4c3a'; ctx.fillRect(dx2 + 12, shoreY - 20, 11, 12);
      ctx.fillRect(dx2 + 11, shoreY - 26, 4, 7); ctx.fillRect(dx2 + 19, shoreY - 26, 4, 7);
      ctx.fillStyle = '#4a3e30'; ctx.fillRect(dx2 - 22, shoreY - 16, 7, 10);
      ctx.fillStyle = 'rgba(255,255,255,.30)'; pixelEllipse(ctx, dx2, shoreY - 1, 24, 4, 3);
      // il disegno fatto con un sasso sulla ghiaia: l'isola, e una crocetta a nord
      ctx.fillStyle = 'rgba(60,58,50,.44)';
      pixelEllipse(ctx, W * 0.54, H - 16, 30, 12, 3);
      ctx.fillStyle = 'rgba(168,164,150,.9)'; pixelEllipse(ctx, W * 0.54, H - 16, 25, 8, 3);
      ctx.fillStyle = 'rgba(60,58,50,.5)';
      ctx.fillRect(W * 0.575, H - 26, 14, 3); ctx.fillRect(W * 0.581, H - 31, 3, 13);
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
      // LA METÀ DI DESTRA: il lenzuolo, il corpo che ci dorme sotto, il cuscino
      const dxh = bx + bw * 0.46;
      ctx.fillStyle = '#b0bac6'; ctx.fillRect(dxh + 10, by - 64, bw * 0.40, 18);    // il corpo sotto
      ctx.fillStyle = '#c2ccd6'; ctx.fillRect(dxh, by - 56, bw * 0.54, 14);         // il lenzuolo
      ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(dxh + 16, by - 56, bw * 0.30, 6);
      ctx.fillStyle = 'rgba(70,82,96,.34)';
      for (let i = 0; i < 4; i++) ctx.fillRect(dxh + 26 + i * 44, by - 54, 5, 20);
      ctx.fillStyle = '#d2dae2'; ctx.fillRect(bx + bw - 98, by - 72, 86, 22);       // il cuscino occupato
      ctx.fillStyle = 'rgba(70,82,96,.36)'; ctx.fillRect(bx + bw - 72, by - 64, 44, 11);
      // LA GAMBA FUORI DAL LENZUOLO: come sempre, come ogni notte da dieci anni
      ctx.fillStyle = '#c8a888'; ctx.fillRect(dxh + 4, by - 48, 42, 13);
      ctx.fillStyle = '#b89878'; ctx.fillRect(dxh - 8, by - 44, 15, 9);
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
        ctx.fillStyle = '#f0ecdc'; ctx.fillRect(x, y, 4, 9);                 // il bianco del capo di banda
        ctx.fillStyle = '#3a7290'; ctx.fillRect(x, y + 9, 4, 15);            // la fascia azzurra consumata
        ctx.fillStyle = '#2a5670'; ctx.fillRect(x, y + 22, 4, 5);
        ctx.fillStyle = '#8a7452'; ctx.fillRect(x, y + 27, 4, H - y);        // il fasciame interno
      }
      // le ordinate (le costole) che si vedono da dentro
      for (let x = 20; x < W; x += 74) {
        const y = gun(x);
        ctx.fillStyle = 'rgba(60,42,24,.30)'; ctx.fillRect(x, y + 27, 13, H - y);
        ctx.fillStyle = 'rgba(200,170,110,.16)'; ctx.fillRect(x, y + 27, 4, H - y);
      }
      // le doghe orizzontali del fondo, e due dita d'acqua che scivola avanti e indietro
      for (let y = H * 0.72; y < H; y += 13) {
        ctx.fillStyle = 'rgba(50,34,18,.26)'; ctx.fillRect(0, y, W, 3);
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
      // il riflettore smaltato, la lampada nella sua gabbia, e il cavo che scende
      ctx.fillStyle = '#3a4048'; ctx.fillRect(W * 0.40, H * 0.04, 78, 9);
      for (let k = 0; k < 6; k++) {
        ctx.fillStyle = shade('#c8c4b0', 0.84 + k * 0.05);
        ctx.fillRect(W * 0.40 + k * 6, H * 0.04 + 9, 78 - k * 12, 6);
      }
      ctx.fillStyle = '#f4f0d0'; ctx.fillRect(W * 0.427, H * 0.04 + 43, 34, 16);
      ctx.fillStyle = '#fffbe0'; ctx.fillRect(W * 0.431, H * 0.04 + 46, 24, 7);
      ctx.fillStyle = '#5a5e64';
      for (let k = 0; k < 5; k++) ctx.fillRect(W * 0.427 + k * 8, H * 0.04 + 43, 3, 16);
      ctx.fillStyle = '#5a5e64'; ctx.fillRect(W * 0.425, H * 0.04 + 41, 38, 3);
      ctx.fillStyle = '#3a4048'; ctx.fillRect(W * 0.474, H * 0.04 + 12, 3, 34);
      glow(ctx, W * 0.457, H * 0.04 + 50, 74, 46, '240,236,200');
      // L'ECOSCANDAGLIO degli anni Novanta sulla consolle di poppa, schermo verde
      ctx.fillStyle = '#4a4238'; ctx.fillRect(W * 0.80, gun(W * 0.83) - 8, 92, 40);
      ctx.fillStyle = '#2a2e30'; ctx.fillRect(W * 0.808, gun(W * 0.83) - 44, 66, 44);
      ctx.fillStyle = '#0e140e'; ctx.fillRect(W * 0.815, gun(W * 0.83) - 38, 52, 30);
      glow(ctx, W * 0.842, gun(W * 0.83) - 23, 60, 36, '120,224,140');
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
      const cx = W * 0.52, cw = W * 0.76, ch = H * 0.60;
      for (let dx = -cw / 2; dx < cw / 2; dx += 4) {
        const t = dx / (cw / 2);
        const bumps = Math.sin(dx * 0.05) * 0.05 + Math.sin(dx * 0.017) * 0.06;
        const hh = ch * (Math.pow(Math.max(0, 1 - t * t), 0.40) + bumps * (1 - Math.abs(t)));
        const f = 0.80 + (1 - Math.abs(t)) * 0.24 + ((dx | 0) % 7) * 0.012;
        ctx.fillStyle = shade('#bda57a', f);
        ctx.fillRect(cx + dx, horiz + 2 - hh, 4, hh + 2);
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
      for (let i = 0; i < 10; i++) {
        ctx.fillStyle = shade('#b8b4a6', 1 - i * 0.02);
        ctx.fillRect(W * 0.13 - i * 2, horiz - 2 - i * 7, 50 + i * 4, 8);
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
      const rw = W * 0.44, rx = cx - rw / 2, ry = horiz - ch - 6, rh = H * 0.26;
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
      // la scia della barca che ci ha portati: l'unica cosa che si muove
      ctx.fillStyle = 'rgba(226,244,250,.30)';
      for (let i = 0; i < 14; i++) {
        const t = i / 14;
        ctx.fillRect(W * 0.05 + t * W * 0.13, H - 8 - t * (H - horiz) * 0.62, 30 - t * 16, 4);
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
      for (let y = floorY + 12; y < H; y += 14) { ctx.fillStyle = 'rgba(30,26,18,.20)'; ctx.fillRect(0, y, W, 2); }
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
      const tx0 = cornerX + 14, tw = W - tx0 - 40, ty0 = H * 0.17, rows = 13;
      for (let row = 0; row < rows; row++) {
        const y = ty0 + row * 30;
        if (y > floorY - 16) break;
        let x = tx0, g = 0;
        while (x < tx0 + tw - 6) {
          const hh = 15 + (r() * 5 | 0);
          const luce = 1 - Math.abs(x - W * 0.5) / W;          // il fascio sta al centro
          ctx.fillStyle = `rgba(36,30,20,${0.44 + luce * 0.34})`;
          ctx.fillRect(x, y, 2, hh);
          ctx.fillStyle = `rgba(236,226,200,${0.16 + luce * 0.34})`;
          ctx.fillRect(x + 2, y, 2, hh);
          x += 5; g++;
          if (g % 5 === 0) x += 6;                              // i gruppi di cinque
        }
      }
      // LA COSA FREDDA: l'ultima tacca, in alto a destra, quella dopo cui non c'è
      // niente. Dentro le altre ottomilaquaranta il tufo è grigio di sessant'anni
      // di polvere. Dentro questa il tufo è GIALLO. Chiaro. Pulito.
      const ux = tx0 + tw - 30, uy = ty0 - 2;
      glow(ctx, ux + 3, uy + 11, 74, 62, '240,206,96');
      glow(ctx, ux + 3, uy + 11, 34, 30, '255,230,150');
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
          fosse.push([W * 0.038 + i * W * 0.068 + row * W * 0.014,
                      terrY + 48 + row * (H - terrY - 66) / 2.5, row]);
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
        const tilt = ((i * 37) % 11 - 5) * 0.7;
        const hh = 44 * s;
        ctx.fillStyle = 'rgba(60,52,38,.26)'; ctx.fillRect(x + 5, y + 12, 17 * s, 4);
        ctx.fillStyle = '#3a342c';
        ctx.fillRect(x + tilt, y + 13 - hh, 5 * s, hh);
        ctx.fillRect(x + tilt - 10 * s, y + 13 - hh * 0.70, 25 * s, 5 * s);
        ctx.fillStyle = '#4e463c';
        ctx.fillRect(x + tilt, y + 13 - hh, 2 * s, hh);
        // la piastra ovale col numero dipinto in bianco
        ctx.fillStyle = '#5e564a'; pixelEllipse(ctx, x + tilt + 2, y + 13 - hh * 0.40, 9 * s, 7 * s, 3);
        ctx.fillStyle = '#eceadc';
        ctx.fillRect(x + tilt - 3 * s, y + 13 - hh * 0.42, 3 * s, 6 * s);
        ctx.fillRect(x + tilt + 3 * s, y + 13 - hh * 0.42, 3 * s, 6 * s);
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
      // l'ombra della torcia: tutto quello che sta lontano dal fascio si spegne
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = `rgba(4,10,14,${0.08 + i * 0.05})`;
        ctx.fillRect(W - 90 - i * 70, 0, 90 + i * 70, H);
      }
      ctx.fillStyle = 'rgba(4,10,14,.20)'; ctx.fillRect(0, H - 60, W, 60);
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
      // la cesta di vimini con i barattoli dentro
      ctx.fillStyle = '#a89058'; ctx.fillRect(W * 0.02, floorY - 36, 66, 40);
      ctx.fillStyle = '#7a6840';
      for (let k = 0; k < 7; k++) ctx.fillRect(W * 0.02, floorY - 34 + k * 6, 66, 3);
      for (let k = 0; k < 5; k++) ctx.fillRect(W * 0.02 + k * 14, floorY - 36, 3, 40);
      ctx.fillStyle = '#a8a89e';
      for (let k = 0; k < 3; k++) { ctx.fillRect(W * 0.026 + k * 21, floorY - 48, 17, 14);
        ctx.fillStyle = '#c8c8be'; ctx.fillRect(W * 0.026 + k * 21, floorY - 48, 17, 3); ctx.fillStyle = '#a8a89e'; }
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
      ctx.fillStyle = '#c89858'; ctx.fillRect(cvx, cvy, 30, 15);
      ctx.fillRect(cvx + 22, cvy - 13, 11, 15);
      ctx.fillStyle = '#e8b878'; ctx.fillRect(cvx, cvy, 30, 4); ctx.fillRect(cvx + 22, cvy - 13, 11, 4);
      ctx.fillStyle = '#a87c40'; ctx.fillRect(cvx + 2, cvy + 15, 6, 12); ctx.fillRect(cvx + 20, cvy + 15, 6, 12);
      ctx.fillStyle = '#8a6430'; ctx.fillRect(cvx + 28, cvy - 11, 6, 9);
      ctx.fillStyle = '#3a2a18'; ctx.fillRect(cvx + 29, cvy - 10, 3, 3);   // l'occhio dipinto
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
      glow(ctx, sx, horiz - 10, 140, 104, '255,196,110');
      glow(ctx, sx, horiz - 8, 76, 58, '255,224,150');
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
      for (let x = 0; x < W; x += 7) {
        const top = H * 0.87 + Math.sin(x * 0.031) * 9 + Math.sin(x * 0.011) * 7;
        ctx.fillStyle = '#2e2622'; ctx.fillRect(x, top, 7, H - top);
        ctx.fillStyle = '#ffcf8c'; ctx.fillRect(x, top, 7, 3);            // il ciglio in luce
        ctx.fillStyle = 'rgba(255,170,100,.24)'; ctx.fillRect(x, top + 3, 7, 5);
      }
      // i sassi del bordo, e le pozze d'acqua di mare che tengono l'alba dentro
      for (let i = 0; i < 26; i++) {
        const sx = r() * W, sy = H * 0.90 + r() * H * 0.09;
        ctx.fillStyle = '#3a302a'; pixelEllipse(ctx, sx, sy, 7 + r() * 13, 5, 3);
        ctx.fillStyle = 'rgba(255,196,120,.24)'; pixelEllipse(ctx, sx, sy - 4, 6 + r() * 10, 2, 3);
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
  function paint(canvasId, locationKey, heroKeys = null, npcKeys = null) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const W = canvas.width, H = canvas.height;
    const painter = painters[locationKey] || painters.porto;
    painter(ctx, W, H);
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

  return { paint, painters, rng, blocks, shade, heroesRow, tree, willow, house, torch, sign, ground, hills, moon, setEclipse, getEclipse, setDepth, getDepth, pixelDisc };
})();
