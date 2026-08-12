/**
 * Terminal Audio Engine
 * All sounds are synthesized procedurally using the Web Audio API.
 * No external audio files are required.
 */

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
// Sound must remain opt-in: browsers also restrict audio until a user gesture.
let enabled = false;

function getCtx(): AudioContext | null {
  if (!enabled) return null;
  if (!ctx) {
    try {
      ctx = new AudioContext();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.18; // low master volume — subtle, not intrusive
      masterGain.connect(ctx.destination);
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  return ctx;
}

function getMaster(): GainNode | null {
  getCtx();
  return masterGain;
}

// ─── Sound primitives ────────────────────────────────────────────────────────

/** Short high-pitched click — nav hover */
export function playTick() {
  const c = getCtx();
  const m = getMaster();
  if (!c || !m) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(1200, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, c.currentTime + 0.03);
  gain.gain.setValueAtTime(0.6, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.04);
  osc.connect(gain);
  gain.connect(m);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.04);
}

/** Soft key press — typewriter character */
export function playKeypress() {
  const c = getCtx();
  const m = getMaster();
  if (!c || !m) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "square";
  // Slight random pitch variation for natural feel
  const base = 300 + Math.random() * 120;
  osc.frequency.setValueAtTime(base, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(base * 0.6, c.currentTime + 0.025);
  gain.gain.setValueAtTime(0.35, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.03);
  osc.connect(gain);
  gain.connect(m);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.03);
}

/** Positive confirm — button click / CTA */
export function playConfirm() {
  const c = getCtx();
  const m = getMaster();
  if (!c || !m) return;
  // Two-tone ascending blip
  [0, 0.06].forEach((delay, i) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(i === 0 ? 660 : 880, c.currentTime + delay);
    gain.gain.setValueAtTime(0.5, c.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + 0.08);
    osc.connect(gain);
    gain.connect(m);
    osc.start(c.currentTime + delay);
    osc.stop(c.currentTime + delay + 0.08);
  });
}

/** Section navigation — low sweep */
export function playNavSelect() {
  const c = getCtx();
  const m = getMaster();
  if (!c || !m) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(220, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, c.currentTime + 0.12);
  gain.gain.setValueAtTime(0.4, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
  osc.connect(gain);
  gain.connect(m);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.15);
}

/** Form submit success — ascending three-note chime */
export function playSuccess() {
  const c = getCtx();
  const m = getMaster();
  if (!c || !m) return;
  const notes = [523, 659, 784]; // C5, E5, G5
  notes.forEach((freq, i) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, c.currentTime + i * 0.1);
    gain.gain.setValueAtTime(0.45, c.currentTime + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.1 + 0.2);
    osc.connect(gain);
    gain.connect(m);
    osc.start(c.currentTime + i * 0.1);
    osc.stop(c.currentTime + i * 0.1 + 0.2);
  });
}

/** Form submit error — descending buzz */
export function playError() {
  const c = getCtx();
  const m = getMaster();
  if (!c || !m) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(300, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, c.currentTime + 0.2);
  gain.gain.setValueAtTime(0.4, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.22);
  osc.connect(gain);
  gain.connect(m);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.22);
}

/** Hover on interactive card */
export function playHover() {
  const c = getCtx();
  const m = getMaster();
  if (!c || !m) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1000, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, c.currentTime + 0.05);
  gain.gain.setValueAtTime(0.15, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.06);
  osc.connect(gain);
  gain.connect(m);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.06);
}

// ─── Global controls ─────────────────────────────────────────────────────────

export function setSoundEnabled(on: boolean) {
  enabled = on;
  if (masterGain) {
    masterGain.gain.value = on ? 0.18 : 0;
  }
}

export function isSoundEnabled() {
  return enabled;
}

export function setVolume(v: number) {
  if (masterGain) masterGain.gain.value = v;
}
