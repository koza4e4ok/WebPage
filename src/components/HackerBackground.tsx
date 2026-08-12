import { MatrixCanvas } from "./MatrixCanvas";

export function HackerBackground() {
  return (
    <>
      {/* Matrix canvas — hidden automatically under prefers-reduced-motion via JS check inside MatrixCanvas */}
      <MatrixCanvas />

      {/* Static fallback grid overlay — always present, very low opacity */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[-1] pointer-events-none"
      >
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f3f4f6_90%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#020202_90%)] z-10" />
        {/* Scanline grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.025)_1px,transparent_1px)] bg-[size:40px_40px] z-10" />
      </div>
    </>
  );
}
