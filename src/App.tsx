import { lazy, useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { DeferredSection } from "./components/DeferredSection";
import { HackerBackground } from "./components/HackerBackground";
import { TerminalModal } from "./components/TerminalModal";
import { playConfirm, playSuccess } from "./lib/audioEngine";
import { haptic } from "./hooks/useHaptic";
import { Terminal as TerminalIcon } from "lucide-react";

const Skills = lazy(() => import("./components/Skills").then(({ Skills: Component }) => ({ default: Component })));
const Projects = lazy(() => import("./components/Projects").then(({ Projects: Component }) => ({ default: Component })));
const Experience = lazy(() => import("./components/Experience").then(({ Experience: Component }) => ({ default: Component })));
const Contact = lazy(() => import("./components/Contact").then(({ Contact: Component }) => ({ default: Component })));

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMatrixOverdrive, setIsMatrixOverdrive] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);

  const openTerminal = useCallback(() => {
    setIsTerminalOpen(true);
    playConfirm();
    haptic("confirm");
  }, []);

  const closeTerminal = useCallback(() => {
    setIsTerminalOpen(false);
  }, []);

  const toggleMatrixOverdrive = useCallback(() => {
    setIsMatrixOverdrive((prev) => !prev);
  }, []);

  // Global keydown handler for Konami code and shortcut keys (~ or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keypresses if user is typing inside an input/textarea (unless inside modal input)
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea") {
        return;
      }

      // 1. Backtick (`) or Tilde (~) or Ctrl+K shortcut
      if (e.key === "`" || e.key === "~" || (e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
        playConfirm();
        haptic("confirm");
        return;
      }

      // 2. Konami Code detection
      const expectedKey = KONAMI_CODE[konamiIndex];
      const pressedKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (pressedKey === expectedKey.toLowerCase()) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          // Success! Konami Code triggered
          playSuccess();
          setIsMatrixOverdrive(true);
          setIsTerminalOpen(true);
          setKonamiIndex(0);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  return (
    <div className="h-screen w-full bg-gray-100 dark:bg-[#020202] text-gray-800 dark:text-gray-300 font-mono relative selection:bg-terminal-green selection:text-black flex flex-col overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-terminal-green text-black font-bold outline-none ring-2 ring-terminal-green ring-offset-2 ring-offset-white dark:ring-offset-[#020202] rounded-md transition-all"
      >
        Skip to main content
      </a>

      <div className="pt-2 md:pt-4 lg:pt-6 px-2 md:px-4 lg:px-6 w-full max-w-[100rem] mx-auto z-50 flex-shrink-0 relative">
        <Navbar onOpenTerminal={openTerminal} />
      </div>

      <div className="p-2 md:p-4 lg:p-6 pb-2 md:pb-4 lg:pb-6 flex-1 w-full max-w-[100rem] mx-auto flex flex-col min-h-0">
        <div className="relative flex-1 bg-white dark:bg-[#050505] rounded-xl lg:rounded-[2rem] border-[6px] md:border-[12px] border-gray-300 dark:border-[#111] overflow-hidden shadow-[0_4px_30px_rgba(0,255,65,0.05),inset_0_0_60px_rgba(0,0,0,0.05)] flex flex-col min-h-0">
          <HackerBackground isMatrixOverdrive={isMatrixOverdrive} />
          <div className="crt-overlay absolute inset-0 z-40 pointer-events-none" />
          <div className="crt-vignette absolute inset-0 z-30 pointer-events-none" />

          <main id="main-content" tabIndex={-1} className="relative z-10 w-full h-full overflow-y-auto scroll-smooth custom-scrollbar snap-y snap-mandatory flex flex-col focus-visible:outline-none focus-visible:ring-0 focus:outline-none">
            <Hero />
            <DeferredSection id="skills"><Skills /></DeferredSection>
            <DeferredSection id="projects"><Projects /></DeferredSection>
            <DeferredSection id="experience"><Experience /></DeferredSection>
            <DeferredSection id="contact"><Contact /></DeferredSection>

            <section className="w-full h-full flex-shrink-0 snap-start snap-always p-2 md:p-4 lg:p-8 flex items-center justify-center">
              <footer className="w-full max-w-6xl mx-auto h-full hacker-card p-6 md:p-12 flex flex-col items-center justify-center text-center text-gray-500 text-sm">
                <p className="font-terminal text-3xl md:text-5xl text-terminal-dim mb-4 glitch-hover">{">"}_ SYSTEM_HALTED // EOF</p>
                <p className="font-mono text-base mb-6">© {new Date().getFullYear()} Andrii Kozakov. All systems operational.</p>

                {/* Floating terminal trigger hint in footer */}
                <button
                  onClick={openTerminal}
                  aria-keyshortcuts="~"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-[#0a0a0a] border border-terminal-green/30 text-terminal-green text-xs font-mono hover:bg-terminal-green/10 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green"
                >
                  <TerminalIcon size={12} className="animate-pulse" />
                  <span>Launch CLI Shell</span>
                  <span className="px-1.5 py-0.2 rounded bg-terminal-green/20 text-[10px] border border-terminal-green/40">~ or Ctrl+K</span>
                </button>
              </footer>
            </section>
          </main>
        </div>
      </div>

      {/* Terminal Easter Egg Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={closeTerminal}
        onToggleMatrixOverdrive={toggleMatrixOverdrive}
        isMatrixOverdrive={isMatrixOverdrive}
      />
    </div>
  );
}
