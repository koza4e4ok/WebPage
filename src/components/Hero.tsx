import { motion } from "motion/react";
import { Terminal, Download, Cpu } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="w-full h-full flex-shrink-0 snap-start snap-always p-2 md:p-4 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-4 md:p-8 lg:p-12 flex flex-col justify-center relative z-10 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full min-h-0">
        
        {/* Hacker Data Console (User Friendly) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-terminal-green/10 border border-terminal-green/30 rounded-full text-terminal-green text-xs font-mono uppercase tracking-widest mb-8">
            <span className="w-2 h-2 bg-terminal-green animate-pulse rounded-full" />
            System Secure & Ready
          </div>
          
          <h1 className="text-4xl md:text-6xl font-terminal mb-2 md:mb-4 leading-none uppercase drop-shadow-[0_0_8px_rgba(0,255,65,0.3)]">
            Andrii <br/>Kozakov<span className="blink">_</span>
          </h1>
          
          <h2 className="text-lg md:text-xl font-mono text-gray-800 dark:text-gray-300 font-bold mb-3 md:mb-4">
            Android Developer
          </h2>
          
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-mono mb-6 lg:mb-8 max-w-xl leading-relaxed lg:leading-relaxed">
            Senior Android Engineer building high-performance applications with Kotlin and modern architecture. Bridging the gap between robust systems and elegant UI.
          </p>

          <div className="flex flex-wrap gap-4 font-mono">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="hacker-btn glitch-hover"
            >
              <Terminal size={18} />
              View Projects
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`${import.meta.env.BASE_URL}andriikozakov.pdf`}
              download="andriikozakov.pdf"
              className="hacker-btn hacker-btn-alt glitch-hover"
            >
              <Download size={18} />
              Fetch CV
            </motion.a>
          </div>
        </motion.div>

        {/* Profile Image with Terminal Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full max-w-[280px] lg:max-w-[400px] mx-auto">
            <div className="absolute inset-0 bg-terminal-green/20 blur-[80px] rounded-full" />
            
            <div className="hacker-card p-2 relative z-10 bg-white dark:bg-[#050505]">
              <div className="w-full aspect-square rounded-lg overflow-hidden relative border border-terminal-green/20 bg-white dark:bg-[#0a0a0a]">
                <div className="absolute inset-0 bg-terminal-green/10 mix-blend-color z-10 pointer-events-none" />
                <img 
                  src="avatar.webp"
                  alt="Portrait of Andrii Kozakov"
                  className="w-full h-full object-cover grayscale contrast-125"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 z-20 hacker-card px-6 py-4 flex items-center gap-4 bg-gray-50 dark:bg-[#0a0a0a]">
              <div className="p-3 bg-terminal-green/10 rounded-lg text-terminal-green border border-terminal-green/20">
                <Cpu size={24} />
              </div>
              <div>
                <div className="text-2xl font-terminal text-gray-900 dark:text-gray-200 glitch-hover">12+ YEARS</div>
                <div className="text-xs text-gray-500 font-mono tracking-wider">UPTIME</div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
