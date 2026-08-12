import { useEffect, useRef } from "react";

const CHARS = "01アイウエオカキクケコABCDEF0123456789";
const FONT_SIZE = 13;
const OPACITY = 0.032;
// Eight frames per second is visually sufficient for a background matrix field.
const FRAME_DELAY = 125;

export function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let animationFrame = 0;
    let timeoutId = 0;
    let scheduled = false;
    let documentVisible = !document.hidden;
    let drops: number[] = [];

    const columnCount = () => Math.max(1, Math.floor(canvas.width / FONT_SIZE));

    const resetDrops = () => {
      drops = Array.from({ length: columnCount() }, () => Math.floor(Math.random() * -50));
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.round(bounds.width);
      canvas.height = Math.round(bounds.height);
      resetDrops();
    };

    const renderFrame = () => {
      context.fillStyle = document.documentElement.classList.contains("dark")
        ? "rgba(2,2,2,0.18)"
        : "rgba(243,244,246,0.18)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = `rgba(0,153,34,${OPACITY})`;
      context.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        context.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const scheduleFrame = () => {
      if (!documentVisible || scheduled) return;
      scheduled = true;
      timeoutId = window.setTimeout(() => {
        animationFrame = requestAnimationFrame(() => {
          scheduled = false;
          if (!documentVisible) return;
          renderFrame();
          scheduleFrame();
        });
      }, FRAME_DELAY);
    };

    const onVisibilityChange = () => {
      documentVisible = !document.hidden;
      if (!documentVisible) {
        window.clearTimeout(timeoutId);
        cancelAnimationFrame(animationFrame);
        scheduled = false;
      } else {
        renderFrame();
        scheduleFrame();
      }
    };

    resize();
    renderFrame();
    scheduleFrame();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
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
