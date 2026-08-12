import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;          // ms per character
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  speed = 60,
  className = "",
  onComplete,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span className={done ? "blink" : "opacity-100"}>_</span>
      )}
    </span>
  );
}
