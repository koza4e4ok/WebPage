import { useEffect, useRef } from "react";

const CHARS = "01アイウエオカキクケコABCDEF0123456789";
const FONT_SIZE = 13;
const OPACITY = 0.032;
const SPEED = 28; // ms per frame

export function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.round(bounds.width);
      canvas.height = Math.round(bounds.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = () => Math.floor(canvas.width / FONT_SIZE);
    let drops: number[] = Array.from({ length: cols() }, () =>
      Math.floor(Math.random() * -50)
    );

    window.addEventListener("resize", () => {
      drops = Array.from({ length: cols() }, () =>
        Math.floor(Math.random() * -50)
      );
    });

    const draw = (timestamp: number) => {
      animId = requestAnimationFrame(draw);
      if (timestamp - lastTime < SPEED) return;
      lastTime = timestamp;

      // Fade trail
      ctx.fillStyle = "rgba(243,244,246,0.18)";
      if (document.documentElement.classList.contains("dark")) {
        ctx.fillStyle = "rgba(2,2,2,0.18)";
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = `rgba(0,153,34,${OPACITY})`;
      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
