import { playTick } from "../lib/audioEngine";
import { haptic } from "../hooks/useHaptic";

interface CarouselDotsProps {
  labels: string[];
  active: number;
  onSelect: (index: number) => void;
  groupLabel: string;
}

export function CarouselDots({
  labels,
  active,
  onSelect,
  groupLabel,
}: CarouselDotsProps) {
  return (
    <div
      role="group"
      aria-label={groupLabel}
      className="md:hidden flex justify-center gap-1 pt-2 short:pt-1 shrink-0"
    >
      {labels.map((label, i) => {
        const isActive = i === active;
        return (
          <button
            key={label}
            type="button"
            onClick={() => {
              onSelect(i);
              playTick();
              haptic("tick");
            }}
            aria-label={`Show ${label}`}
            aria-current={isActive ? "true" : undefined}
            className="p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-6 bg-terminal-green shadow-[0_0_6px_rgba(0,153,34,0.6)]"
                  : "w-1.5 bg-terminal-green/30"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
