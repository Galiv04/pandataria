/* ============ SOUND — effetti chiptune via WebAudio (zero asset) ============ */

const Sound = (() => {

  let ctx = null;
  let muted = false;
  try { muted = localStorage.getItem('pandataria-muted') === '1'; } catch (e) {}

  function ac() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // nota singola stile chip: onda quadra con decadimento
  function blip(freq, dur = 0.08, type = 'square', vol = 0.12, when = 0) {
    const a = ac();
    if (!a || muted) return;
    const t = a.currentTime + when;
    const osc = a.createOscillator();
    const gain = a.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain); gain.connect(a.destination);
    osc.start(t); osc.stop(t + dur + 0.02);
  }

  function noise(dur = 0.15, vol = 0.1, when = 0) {
    const a = ac();
    if (!a || muted) return;
    const t = a.currentTime + when;
    const len = Math.floor(a.sampleRate * dur);
    const buf = a.createBuffer(1, len, a.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = a.createBufferSource();
    src.buffer = buf;
    const gain = a.createGain();
    gain.gain.setValueAtTime(vol, t);
    src.connect(gain); gain.connect(a.destination);
    src.start(t);
  }


  /* ---------- primitive dell'orrore (tecniche vere del cinema, docs/DESIGN.md § 10.9) ---------- */

  /* VOCI SOVRAPPOSTE: 3-5 oscillatori scordati di pochi cent e sfasati sotto i 30 ms.
     È il trucco che fa sentire "più di uno che parla insieme". */
  function coro(freq, dur = 1.6, vol = 0.055, when = 0, n = 4) {
    const a = ac();
    if (!a || muted) return;
    const t = a.currentTime + when;
    for (let i = 0; i < n; i++) {
      const det = 1 + (i - (n - 1) / 2) * 0.011;        // pochi cent di scarto
      const off = (i * 7) / 1000;                        // < 30 ms: sfasamento sporco
      const osc = a.createOscillator();
      const gain = a.createGain();
      const filt = a.createBiquadFilter();
      filt.type = 'lowpass'; filt.frequency.setValueAtTime(900 + i * 120, t);
      osc.type = i % 2 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq * det, t + off);
      gain.gain.setValueAtTime(0.0001, t + off);
      gain.gain.exponentialRampToValueAtTime(vol, t + off + dur * 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + off + dur);
      osc.connect(filt); filt.connect(gain); gain.connect(a.destination);
      osc.start(t + off); osc.stop(t + off + dur + 0.05);
    }
  }

  /* REVERSE SWELL: la coda arriva PRIMA della nota — la voce sembra venire da un altrove.
     È l'effetto dell'Esorcista, fatto con una rampa che si taglia sull'attacco. */
  function swell(freq, dur = 1.1, vol = 0.07, when = 0) {
    const a = ac();
    if (!a || muted) return;
    const t = a.currentTime + when;
    const osc = a.createOscillator();
    const gain = a.createGain();
    const filt = a.createBiquadFilter();
    filt.type = 'bandpass'; filt.Q.value = 2.5;
    filt.frequency.setValueAtTime(freq * 1.6, t);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq * 0.55, t);
    osc.frequency.linearRampToValueAtTime(freq, t + dur);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(vol, t + dur);      // sale...
    gain.gain.setValueAtTime(vol, t + dur);
    gain.gain.linearRampToValueAtTime(0.0001, t + dur + 0.06);  // ...e si TAGLIA
    osc.connect(filt); filt.connect(gain); gain.connect(a.destination);
    osc.start(t); osc.stop(t + dur + 0.1);
  }

  /* SUB-BASS: non lo senti, lo provi in petto (le cisterne) */
  function sub(freq = 34, dur = 2.4, vol = 0.20, when = 0) {
    const a = ac();
    if (!a || muted) return;
    const t = a.currentTime + when;
    const osc = a.createOscillator();
    const gain = a.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain); gain.connect(a.destination);
    osc.start(t); osc.stop(t + dur + 0.05);
  }

  function coro_nota(f, dur, vol, when) { swell(f, 0.22, vol * 0.8, when); coro(f, dur, vol, when + 0.2, 3); }

  const effects = {
    /* --- Pandataria: la voce del Coro --- */
    // IL CANTO: melodia semplice e bella in scala fuori temperamento — orecchiabile e SBAGLIATA
    coro() {
      const base = 220;
      const scala = [1, 1.116, 1.26, 1.335, 1.5, 1.68, 1.87];   // quarti di tono: nessuna nota è "giusta"
      const mel = [0, 2, 4, 3, 2, 0, 4, 5];
      mel.forEach((n, i) => coro_nota(base * scala[n], 0.62, 0.045, i * 0.34));
      sub(36, 3.2, 0.14, 0);
    },
    // una voce sola che ti chiama: swell + coro stretto (la voce di chi ami)
    voce_amata() { swell(196, 0.95, 0.075); coro(196, 1.9, 0.05, 0.95, 5); },
    // apnea: il battito che rallenta e la pressione
    apnea() {
      for (let i = 0; i < 5; i++) { blip(58, 0.12, 'sine', 0.22 - i * 0.02, i * (0.62 + i * 0.06)); }
      sub(30, 3.0, 0.16, 0);
    },
    // il click del registratore del '65
    nastro() { noise(0.04, 0.22); blip(1400, 0.03, 'square', 0.13, 0.05); noise(0.9, 0.05, 0.1); },
    // la risata delle voci: peggio di un urlo
    risata() {
      [1, 0.94, 1.06, 0.9, 1.1, 0.86].forEach((k, i) => coro(330 * k, 0.2, 0.06, i * 0.13, 3));
    },
    // il sigillo: pietra su pietra, e poi silenzio
    sigillo() { noise(0.2, 0.2); blip(96, 0.5, 'triangle', 0.16, 0.12); sub(40, 1.6, 0.14, 0.2); },
    // la pressione che schiaccia (danno in profondità)
    pressione() { sub(28, 1.2, 0.22); noise(0.35, 0.14, 0.05); },
    click()   { blip(660, 0.05, 'square', 0.06); },
    dice()    { for (let i = 0; i < 6; i++) blip(300 + Math.random() * 500, 0.04, 'square', 0.05, i * 0.05); },
    success() { blip(523, 0.09, 'square', 0.1); blip(659, 0.09, 'square', 0.1, 0.09); blip(784, 0.16, 'square', 0.12, 0.18); },
    crit()    { blip(523, 0.08, 'square', 0.1); blip(659, 0.08, 'square', 0.1, 0.08); blip(784, 0.08, 'square', 0.1, 0.16); blip(1047, 0.25, 'square', 0.13, 0.24); },
    fail()    { blip(220, 0.12, 'sawtooth', 0.1); blip(165, 0.22, 'sawtooth', 0.1, 0.12); },
    hit()     { noise(0.12, 0.12); blip(140, 0.1, 'sawtooth', 0.1); },
    heal()    { blip(392, 0.08, 'triangle', 0.12); blip(523, 0.08, 'triangle', 0.12, 0.08); blip(659, 0.14, 'triangle', 0.12, 0.16); },
    victory() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => blip(f, 0.12, 'square', 0.11, i * 0.12)); },
    gold()    { blip(1319, 0.05, 'square', 0.1); blip(1760, 0.09, 'square', 0.1, 0.06); },
    item()    { blip(659, 0.07, 'triangle', 0.11); blip(880, 0.07, 'triangle', 0.11, 0.08); blip(1319, 0.12, 'triangle', 0.12, 0.16); },
    defeat()  { [392, 330, 262, 196].forEach((f, i) => blip(f, 0.2, 'sawtooth', 0.1, i * 0.18)); },
    combat()  { blip(196, 0.1, 'sawtooth', 0.12); blip(196, 0.1, 'sawtooth', 0.12, 0.14); blip(233, 0.25, 'sawtooth', 0.13, 0.28); },
    jumpscare() { noise(0.3, 0.22); blip(880, 0.05, 'sawtooth', 0.2); blip(92, 0.5, 'sawtooth', 0.18, 0.05); blip(87, 0.6, 'sawtooth', 0.14, 0.2); },
    campana()  { for (let i = 0; i < 3; i++) { blip(220, 1.1, 'triangle', 0.16, i * 1.2); blip(331, 0.9, 'sine', 0.08, i * 1.2 + 0.02); } },
    // la penna che si spezza: uno SCROCCO secco, poi il patto che si slega — una scala che scende e si apre
    penna()    { noise(0.06, 0.2); blip(1200, 0.03, 'square', 0.14); blip(880, 0.04, 'square', 0.1, 0.04);
                 [659, 523, 392, 330, 262].forEach((f, i) => blip(f, 0.22, 'triangle', 0.1, 0.15 + i * 0.13));
                 blip(523, 1.4, 'sine', 0.07, 0.85); blip(659, 1.2, 'sine', 0.05, 0.9); },
    // la risata di Ada: giovane, roca, fuori orario — terzine di campanelle che salgono e inciampano
    risata()   { [523, 659, 587, 784, 698, 880, 1047].forEach((f, i) => blip(f, 0.09, 'triangle', 0.11, i * 0.09));
                 blip(784, 0.3, 'sine', 0.08, 0.66); blip(392, 0.5, 'triangle', 0.06, 0.7); },
  };

  function play(name) {
    try { if (effects[name]) effects[name](); } catch (e) { /* audio non disponibile: pazienza */ }
  }

  function toggleMute() {
    muted = !muted;
    try { localStorage.setItem('pandataria-muted', muted ? '1' : '0'); } catch (e) {}
    return muted;
  }

  function isMuted() { return muted; }

  /* ================= MUSICA DI SOTTOFONDO =================
     Piccolo sequencer chiptune: basso a onda triangolare + melodia quadra,
     tracce componibili come array di semitoni (null = pausa).          */

  let musicMuted = false;
  try { musicMuted = localStorage.getItem('pandataria-music-muted') === '1'; } catch (e) {}

  const NOTE = st => 440 * Math.pow(2, (st - 57) / 12); // semitono -> Hz (57 = LA4)

  /* Tracce tematiche horror: { bpm, vol, bass, lead, hat? } — step da 1/8.
     Poco volume, molte pause: nella casa che non finisce è il silenzio a suonare. */
  const TRACKS = {
    // Titolo: il canto del Coro suonato lento, con una nota fuori temperamento
    title: {
      bpm: 46, vol: 0.045,
      bass: [33, null, null, null, null, null, null, null, 31, null, null, null, null, null, null, null],
      lead: [69, null, null, 71, null, null, 74, null, 71, null, null, 69, null, null, null, null],
    },
    // Il traghetto, il mare aperto: bello. Bello e basta. Per ora.
    mare: {
      bpm: 74, vol: 0.04,
      bass: [40, null, null, 47, null, null, 45, null, 40, null, null, 47, null, null, 43, null],
      lead: [null, 64, null, 67, null, 71, null, 67, null, 64, null, 62, null, null, null, null],
    },
    // Il porto romano, il paese: vita vera, gente, motorini
    porto: {
      bpm: 92, vol: 0.038,
      bass: [38, null, 45, null, 38, null, 43, null, 38, null, 45, null, 41, null, 40, null],
      lead: [62, null, 66, 69, null, 66, null, 62, null, 64, null, 67, null, null, null, null],
    },
    // Le Parracine: il rifugio. L'unica traccia che si può ascoltare in pace
    bnb: {
      bpm: 60, vol: 0.036,
      bass: [36, null, null, null, 43, null, null, null, 36, null, null, null, 41, null, null, null],
      lead: [null, null, 67, null, 71, null, 69, null, null, null, 66, null, 64, null, null, null],
    },
    // Sotto i quindici metri: il canto comincia a sentirsi
    sotto: {
      bpm: 50, vol: 0.042,
      bass: [28, null, null, null, null, null, 26, null, null, null, null, null, 28, null, null, null],
      lead: [null, null, 59, null, null, 61, null, null, 59, null, null, 57, null, null, null, null],
    },
    // Le cisterne: il sub-bass e l'eco. Quasi niente melodia: l'eco fa il resto
    cisterna: {
      bpm: 42, vol: 0.05,
      bass: [24, null, null, null, null, null, null, null, 24, null, null, null, null, null, 23, null],
      lead: [null, null, null, 55, null, null, null, null, null, null, null, 54, null, null, null, null],
    },
    // Villa Giulia, le rovine a Punta Eolo: duemila anni di vento
    rovine: {
      bpm: 56, vol: 0.038,
      bass: [33, null, null, null, 40, null, null, null, 31, null, null, null, 38, null, null, null],
      lead: [null, 64, null, null, 68, null, 66, null, null, 63, null, null, 61, null, null, null],
    },
    // Il carcere: metronomo. Il panopticon è una macchina, e le macchine tengono il tempo
    carcere: {
      bpm: 64, vol: 0.045,
      bass: [26, null, 26, null, 26, null, 26, null, 26, null, 26, null, 26, null, 26, null],
      lead: [null, null, null, null, 58, null, null, null, null, null, null, null, 57, null, null, null],
    },
    // La fossa, l'ultima immersione: il Coro al completo
    fossa: {
      bpm: 38, vol: 0.055,
      bass: [22, null, null, null, 21, null, null, null, 22, null, null, null, 20, null, null, null],
      lead: [57, null, 58, null, 60, null, 58, null, 57, null, 55, null, 57, null, null, null],
    },
    // La notte sull'isola: cicale e qualcosa che le zittisce a intervalli regolari
    notte: {
      bpm: 54, vol: 0.036,
      bass: [31, null, null, null, null, null, 38, null, 29, null, null, null, null, null, 36, null],
      lead: [null, null, 62, null, null, null, 64, null, null, null, 61, null, null, null, null, null],
    },
    // Combattimenti
    combat: {
      bpm: 128, vol: 0.05,
      bass: [33, 33, null, 33, 40, null, 33, null, 31, 31, null, 31, 38, null, 31, null],
      lead: [null, null, 64, null, null, 67, null, 64, null, null, 62, null, null, 66, null, null],
    },
    combat_sotto: {
      bpm: 104, vol: 0.05,
      bass: [26, null, 26, 26, null, 33, null, 26, 24, null, 24, 24, null, 31, null, 24],
      lead: [null, 57, null, null, 61, null, 59, null, null, 57, null, null, 56, null, null, null],
    },
    boss: {
      bpm: 116, vol: 0.055,
      bass: [22, 22, 29, 22, 27, 22, 29, 22, 21, 21, 28, 21, 26, 21, 28, 21],
      lead: [58, null, 61, null, 63, null, 61, null, 58, null, 60, null, 63, null, 65, null],
    },
    // L'alba, gli epiloghi: la prima traccia in tono giusto di tutto il gioco
    alba: {
      bpm: 68, vol: 0.04,
      bass: [36, null, null, 43, null, null, 41, null, 36, null, null, 43, null, null, 45, null],
      lead: [72, null, 76, null, 79, null, 76, null, 72, null, 74, null, 76, null, null, null],
    },
  };

  let music = { track: null, timer: null, step: 0, nextTime: 0 };

  function stopMusic() {
    if (music.timer) { clearInterval(music.timer); music.timer = null; }
    music.track = null;
  }

  function scheduleNote(freq, t, dur, type, vol) {
    const a = ac();
    if (!a) return;
    const osc = a.createOscillator();
    const gain = a.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain); gain.connect(a.destination);
    osc.start(t); osc.stop(t + dur + 0.03);
  }

  function playMusic(name) {
    if (music.track === name) return;      // già in riproduzione
    stopMusic();
    if (muted || musicMuted) { music.track = name; return; } // ricorda la traccia per il toggle
    const a = ac();
    const tr = TRACKS[name];
    if (!a || !tr) { music.track = name; return; }
    music.track = name;
    music.step = 0;
    music.nextTime = a.currentTime + 0.06;
    const stepDur = 60 / tr.bpm / 2; // ottavi
    music.timer = setInterval(() => {
      if (muted || musicMuted) return;
      const ahead = a.currentTime + 0.25;
      while (music.nextTime < ahead) {
        const i = music.step % tr.bass.length;
        const b = tr.bass[i], l = tr.lead[i];
        if (b != null) scheduleNote(NOTE(b), music.nextTime, stepDur * 0.9, 'triangle', tr.vol * 1.15);
        if (l != null) scheduleNote(NOTE(l), music.nextTime, stepDur * 0.75, 'square', tr.vol * 0.7);
        if (tr.hat && tr.hat[i % tr.hat.length]) scheduleNote(NOTE(93 + (i % 2)), music.nextTime, 0.03, 'square', tr.vol * 0.25);
        music.nextTime += stepDur;
        music.step++;
      }
    }, 100);
  }

  function toggleMusicMute() {
    musicMuted = !musicMuted;
    try { localStorage.setItem('pandataria-music-muted', musicMuted ? '1' : '0'); } catch (e) {}
    const cur = music.track;
    stopMusic();
    if (!musicMuted && cur) playMusic(cur);
    else music.track = cur;
    return musicMuted;
  }

  // le AudioContext partono "suspended" finché l'utente non interagisce:
  // al primo gesto riavviamo la traccia richiesta
  if (typeof document !== 'undefined') {
    document.addEventListener('pointerdown', () => {
      const a = ac();
      if (a && music.track && !music.timer && !muted && !musicMuted) {
        const cur = music.track; music.track = null; playMusic(cur);
      }
    });
  }

  return { play, toggleMute, isMuted, music: playMusic, toggleMusicMute, isMusicMuted: () => musicMuted };
})();
