import { lazy } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { DeferredSection } from "./components/DeferredSection";
import { HackerBackground } from "./components/HackerBackground";

const Skills = lazy(() => import("./components/Skills").then(({ Skills: Component }) => ({ default: Component })));
const Projects = lazy(() => import("./components/Projects").then(({ Projects: Component }) => ({ default: Component })));
const Experience = lazy(() => import("./components/Experience").then(({ Experience: Component }) => ({ default: Component })));
const Contact = lazy(() => import("./components/Contact").then(({ Contact: Component }) => ({ default: Component })));

export default function App() {
  return (
    <div className="h-screen w-full bg-gray-100 dark:bg-[#020202] text-gray-800 dark:text-gray-300 font-mono relative selection:bg-terminal-green selection:text-black flex flex-col overflow-hidden">
      <div className="pt-2 md:pt-4 lg:pt-6 px-2 md:px-4 lg:px-6 w-full max-w-[100rem] mx-auto z-50 flex-shrink-0 relative">
        <Navbar />
      </div>

      <div className="p-2 md:p-4 lg:p-6 pb-2 md:pb-4 lg:pb-6 flex-1 w-full max-w-[100rem] mx-auto flex flex-col min-h-0">
        <div className="relative flex-1 bg-white dark:bg-[#050505] rounded-xl lg:rounded-[2rem] border-[6px] md:border-[12px] border-gray-300 dark:border-[#111] overflow-hidden shadow-[0_4px_30px_rgba(0,255,65,0.05),inset_0_0_60px_rgba(0,0,0,0.05)] flex flex-col min-h-0">
          <HackerBackground />
          <div className="crt-overlay absolute inset-0 z-40 pointer-events-none" />
          <div className="crt-vignette absolute inset-0 z-30 pointer-events-none" />

          <main className="relative z-10 w-full h-full overflow-y-auto scroll-smooth custom-scrollbar snap-y snap-mandatory flex flex-col">
            <Hero />
            <DeferredSection id="skills"><Skills /></DeferredSection>
            <DeferredSection id="projects"><Projects /></DeferredSection>
            <DeferredSection id="experience"><Experience /></DeferredSection>
            <DeferredSection id="contact"><Contact /></DeferredSection>

            <section className="w-full h-full flex-shrink-0 snap-start snap-always p-2 md:p-4 lg:p-8 flex items-center justify-center">
              <footer className="w-full max-w-6xl mx-auto h-full hacker-card p-6 md:p-12 flex flex-col items-center justify-center text-center text-gray-500 text-sm">
                <p className="font-terminal text-3xl md:text-5xl text-terminal-dim mb-6 glitch-hover">{">"}_ SYSTEM_HALTED // EOF</p>
                <p className="font-mono text-base">© {new Date().getFullYear()} Andrii Kozakov. All systems operational.</p>
              </footer>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
