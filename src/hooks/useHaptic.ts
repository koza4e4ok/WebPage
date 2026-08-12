/**
 * useHaptic — wrapper around the Vibration API.
 * Silently no-ops on browsers/devices that don't support it.
 */

type HapticPattern = "tick" | "confirm" | "nav" | "success" | "error" | "keypress";

const PATTERNS: Record<HapticPattern, number | number[]> = {
  tick: 8,           // very short tap
  keypress: 5,       // barely perceptible key feel
  nav: [10, 20, 10], // double-tap for section change
  confirm: [15, 30, 15], // button press
  success: [10, 50, 10, 50, 30], // celebratory
  error: [30, 20, 30],  // short buzz
};

export function haptic(type: HapticPattern = "tick") {
  try {
    if ("vibrate" in navigator) {
      navigator.vibrate(PATTERNS[type]);
    }
  } catch {
    // Silently ignore — vibration is a progressive enhancement
  }
}
