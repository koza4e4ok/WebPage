import { useEffect, useState } from "react";
import { playKeypress } from "../lib/audioEngine";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

/**
 * Reserves the final string width before typing begins. The visible text is
 * absolutely overlaid on an aria-hidden measurement copy, preventing layout
 * shifts as characters are appended on narrower viewports.
 */
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
    let index = 0;
    const id = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));
      playKeypress();
      if (index >= text.length) {
        clearInterval(id);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, onComplete]);

  const cursor = showCursor ? "_" : "";

  return (
    <span className={`typewriter-reserved ${className}`}>
      <span aria-hidden="true" className="typewriter-measure">{text}{cursor}</span>
      <span className="typewriter-output" aria-live="off">
        {displayed}
        {showCursor && <span className={done ? "blink" : "opacity-100"}>_</span>}
      </span>
    </span>
  );
}
