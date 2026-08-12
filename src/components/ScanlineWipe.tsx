import { useEffect, useRef, useState } from "react";

interface ScanlineWipeProps {
  trigger: string;
}

/** Lightweight CSS-driven sweep retriggered by a changing key. */
export function ScanlineWipe({ trigger }: ScanlineWipeProps) {
  const [sequence, setSequence] = useState(0);
  const previousTrigger = useRef(trigger);

  useEffect(() => {
    if (trigger !== previousTrigger.current) {
      previousTrigger.current = trigger;
      setSequence((current) => current + 1);
    }
  }, [trigger]);

  if (sequence === 0) return null;

  return (
    <div
      key={sequence}
      aria-hidden="true"
      className="scanline-wipe fixed top-0 left-0 right-0 h-[2px] bg-terminal-green z-[9999] pointer-events-none"
    />
  );
}
