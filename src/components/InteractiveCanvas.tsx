import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

type TrailPoint = {
  x: number;
  y: number;
  life: number;
};

const DESKTOP_PARTICLES = 34;
const MOBILE_PARTICLES = 16;
const MAX_DPR = 1.5;
const LINK_DISTANCE = 118;
const CURSOR_RADIUS = 150;

/**
 * InteractiveCanvas
 * A deliberately restrained, pointer-events-none canvas background:
 * - idle particles float with faint proximity links
 * - mouse movement emits a short terminal-green cursor trail
 * - particles respond gently inside the cursor field
 *
 * It runs at devicePixelRatio <= 1.5, pauses in hidden tabs, and is entirely
 * disabled when a visitor requests reduced motion.
 */
export function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const particleCount = isCoarsePointer ? MOBILE_PARTICLES : DESKTOP_PARTICLES;
    let width = canvas.getBoundingClientRect().width;
    let height = canvas.getBoundingClientRect().height;
    let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let animationFrame = 0;
    let lastFrame = performance.now();
    let documentVisible = !document.hidden;
    let mouseActive = false;
    const mouse = { x: width / 2, y: height / 2 };
    const trail: TrailPoint[] = [];

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      radius: 0.65 + Math.random() * 1.25,
      alpha: 0.12 + Math.random() * 0.22,
    });

    let particles = Array.from({ length: particleCount }, makeParticle);

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouseActive = true;
      // One point per animation interval keeps the trail smooth without growing unbounded.
      const latest = trail[trail.length - 1];
      if (!latest || Math.hypot(latest.x - mouse.x, latest.y - mouse.y) > 7) {
        trail.push({ x: mouse.x, y: mouse.y, life: 1 });
        if (trail.length > 20) trail.shift();
      }
    };

    const onPointerLeave = () => {
      mouseActive = false;
    };

    const onVisibilityChange = () => {
      documentVisible = !document.hidden;
      if (documentVisible) lastFrame = performance.now();
    };

    const draw = (now: number) => {
      animationFrame = requestAnimationFrame(draw);
      if (!documentVisible) return;

      // Avoid expensive updates above ~45 fps; visual difference is imperceptible for an ambient layer.
      const delta = Math.min((now - lastFrame) / 16.67, 2);
      if (now - lastFrame < 22) return;
      lastFrame = now;

      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        if (particle.x < -4) particle.x = width + 4;
        if (particle.x > width + 4) particle.x = -4;
        if (particle.y < -4) particle.y = height + 4;
        if (particle.y > height + 4) particle.y = -4;

        if (mouseActive) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < CURSOR_RADIUS) {
            const force = (1 - distance / CURSOR_RADIUS) * 0.025 * delta;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        // Gentle damping maintains a calm field even after cursor movement.
        particle.vx *= 0.996;
        particle.vy *= 0.996;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(0, 153, 34, ${particle.alpha})`;
        context.fill();
      }

      // Faint particle graph: complexity is bounded (34 max) and intentionally subtle.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < LINK_DISTANCE) {
            const alpha = (1 - distance / LINK_DISTANCE) * 0.075;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(0, 153, 34, ${alpha})`;
            context.lineWidth = 0.5;
            context.stroke();
          }
        }
      }

      // Fade and draw cursor trail after the ambient particles.
      for (let i = trail.length - 1; i >= 0; i--) {
        const point = trail[i];
        point.life -= 0.045 * delta;
        if (point.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        const radius = 1.5 + point.life * 3;
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(0, 255, 65, ${point.life * 0.38})`;
        context.fill();
      }

      if (mouseActive) {
        const gradient = context.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 30);
        gradient.addColorStop(0, "rgba(0, 255, 65, 0.23)");
        gradient.addColorStop(0.22, "rgba(0, 255, 65, 0.07)");
        gradient.addColorStop(1, "rgba(0, 255, 65, 0)");
        context.fillStyle = gradient;
        context.fillRect(mouse.x - 30, mouse.y - 30, 60, 60);
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
