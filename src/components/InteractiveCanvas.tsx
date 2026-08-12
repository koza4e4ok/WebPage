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

const DESKTOP_PARTICLES = 28;
const MOBILE_PARTICLES = 12;
const MAX_DPR = 1.5;
const LINK_DISTANCE = 118;
const CURSOR_RADIUS = 150;
const IDLE_AFTER_MS = 550;

/**
 * An interaction-driven canvas background. It paints a static field when idle,
 * activates only while the pointer is moving (or its short trail is fading),
 * and stops all work when the tab is hidden or reduced motion is requested.
 */
export function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const particleCount = coarsePointer ? MOBILE_PARTICLES : DESKTOP_PARTICLES;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let animationFrame = 0;
    let running = false;
    let documentVisible = !document.hidden;
    let lastFrame = performance.now();
    let lastPointerMove = 0;
    const mouse = { x: 0, y: 0, active: false };
    const trail: TrailPoint[] = [];

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      radius: 0.65 + Math.random() * 1.15,
      alpha: 0.12 + Math.random() * 0.2,
    });

    let particles: Particle[] = [];

    const draw = (delta = 0, updateParticles = false) => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (updateParticles) {
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;

          if (particle.x < -4) particle.x = width + 4;
          if (particle.x > width + 4) particle.x = -4;
          if (particle.y < -4) particle.y = height + 4;
          if (particle.y > height + 4) particle.y = -4;

          if (mouse.active) {
            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0 && distance < CURSOR_RADIUS) {
              const force = (1 - distance / CURSOR_RADIUS) * 0.025 * delta;
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
          }
          particle.vx *= 0.996;
          particle.vy *= 0.996;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(0, 153, 34, ${particle.alpha})`;
        context.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < LINK_DISTANCE) {
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(0, 153, 34, ${(1 - distance / LINK_DISTANCE) * 0.07})`;
            context.lineWidth = 0.5;
            context.stroke();
          }
        }
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        const point = trail[i];
        point.life -= 0.045 * Math.max(delta, 1);
        if (point.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        context.beginPath();
        context.arc(point.x, point.y, 1.5 + point.life * 3, 0, Math.PI * 2);
        context.fillStyle = `rgba(0, 255, 65, ${point.life * 0.38})`;
        context.fill();
      }

      if (mouse.active) {
        const glow = context.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 30);
        glow.addColorStop(0, "rgba(0, 255, 65, 0.23)");
        glow.addColorStop(0.22, "rgba(0, 255, 65, 0.07)");
        glow.addColorStop(1, "rgba(0, 255, 65, 0)");
        context.fillStyle = glow;
        context.fillRect(mouse.x - 30, mouse.y - 30, 60, 60);
      }
    };

    const tick = (now: number) => {
      if (!documentVisible) {
        running = false;
        return;
      }
      const delta = Math.min((now - lastFrame) / 16.67, 2);
      lastFrame = now;
      if (now - lastPointerMove > IDLE_AFTER_MS) mouse.active = false;

      draw(delta, true);
      if (mouse.active || trail.length > 0) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        running = false;
        // One final static frame leaves the particle field visible without another animation loop.
        draw(0, false);
      }
    };

    const ensureRunning = () => {
      if (!documentVisible || running) return;
      running = true;
      lastFrame = performance.now();
      animationFrame = requestAnimationFrame(tick);
    };

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
      particles = Array.from({ length: particleCount }, makeParticle);
      draw(0, false);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
      lastPointerMove = performance.now();
      const lastPoint = trail[trail.length - 1];
      if (!lastPoint || Math.hypot(lastPoint.x - mouse.x, lastPoint.y - mouse.y) > 7) {
        trail.push({ x: mouse.x, y: mouse.y, life: 1 });
        if (trail.length > 16) trail.shift();
      }
      ensureRunning();
    };

    const onPointerLeave = () => {
      mouse.active = false;
      ensureRunning();
    };

    const onVisibilityChange = () => {
      documentVisible = !document.hidden;
      if (!documentVisible) {
        cancelAnimationFrame(animationFrame);
        running = false;
      } else {
        draw(0, false);
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

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
