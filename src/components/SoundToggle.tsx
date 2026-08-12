import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { setSoundEnabled, isSoundEnabled, playConfirm } from "../lib/audioEngine";
import { haptic } from "../hooks/useHaptic";

const STORAGE_KEY = "kozakov_sound_enabled";

export function SoundToggle() {
  const [on, setOn] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // Default to OFF — never auto-play audio without user consent
      return stored === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    setSoundEnabled(on);
    try {
      localStorage.setItem(STORAGE_KEY, String(on));
    } catch {
      // ignore
    }
  }, [on]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    haptic("confirm");
    if (next) {
      // Play a small confirmation sound immediately after enabling
      setTimeout(() => playConfirm(), 50);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute sound effects" : "Enable sound effects"}
      aria-pressed={on}
      title={on ? "Sound ON — click to mute" : "Sound OFF — click to enable"}
      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-2 ${
        on
          ? "bg-terminal-green/10 border-terminal-green text-terminal-green shadow-[0_0_8px_rgba(0,153,34,0.3)]"
          : "bg-gray-50 dark:bg-[#0a0a0a] border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600"
      }`}
    >
      {on ? <Volume2 size={14} /> : <VolumeX size={14} />}
    </button>
  );
}
