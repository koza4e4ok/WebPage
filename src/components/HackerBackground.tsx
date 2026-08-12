import { InteractiveCanvas } from "./InteractiveCanvas";
import { MatrixCanvas } from "./MatrixCanvas";

/**
 * Ambient visuals are confined to the CRT screen, below scroll content and above
 * the plain screen surface. pointer-events-none guarantees they never block UI.
 */
export function HackerBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Static base remains available when motion is reduced. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f3f4f6_90%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#020202_90%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <MatrixCanvas />
      <InteractiveCanvas />
    </div>
  );
}
