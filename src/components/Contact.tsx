import { motion } from "motion/react";
import { Mail, Send, TerminalSquare } from "lucide-react";

export function Contact() {
  const email = "koza4e4ok@gmail.com";

  return (
    <section id="contact" className="w-full h-full flex-shrink-0 snap-start snap-always p-2 md:p-4 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-4 md:p-8 lg:p-12 flex flex-col justify-center relative z-10 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terminal-green/5 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none z-0" />
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full min-h-0">
          <div className="flex flex-col justify-center">
            <h2 className="text-xs lg:text-sm font-mono text-terminal-green uppercase tracking-widest mb-2 flex items-center gap-2">
              <TerminalSquare size={14} /> Establish Connection
            </h2>
            <h3 className="text-3xl md:text-5xl font-terminal mb-4 text-white">Open a new socket.</h3>
            <p className="text-gray-400 font-mono text-xs lg:text-sm mb-6 lg:mb-10 max-w-md leading-relaxed hidden sm:block">
              Ready to deploy new solutions or optimize existing ones. Drop a ping and I'll confirm reception.
            </p>

            <div className="space-y-4 lg:space-y-6 font-mono">
              <a 
                href={`mailto:${email}`}
                className="flex items-center gap-3 lg:gap-4 group"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-[#111] border border-terminal-green/20 flex items-center justify-center group-hover:bg-terminal-green/10 group-hover:border-terminal-green transition-all glitch-hover">
                  <Mail className="text-gray-400 group-hover:text-terminal-green transition-colors" size={18} />
                </div>
                <div>
                  <div className="text-[10px] lg:text-xs text-gray-500 uppercase tracking-widest mb-0.5 lg:mb-1">Email Endpoint</div>
                  <div className="text-sm lg:text-base text-white glitch-hover truncate max-w-[200px] sm:max-w-none">{email}</div>
                </div>
              </a>

              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 lg:gap-4 group"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-[#111] border border-[#00ffff]/20 flex items-center justify-center group-hover:bg-[#00ffff]/10 group-hover:border-[#00ffff] transition-all glitch-hover">
                  <Send className="text-gray-400 group-hover:text-[#00ffff] transition-colors" size={18} />
                </div>
                <div>
                  <div className="text-[10px] lg:text-xs text-gray-500 uppercase tracking-widest mb-0.5 lg:mb-1">Telegram Secure Line</div>
                  <div className="text-sm lg:text-base text-white glitch-hover">@alexkoz_dev</div>
                </div>
              </a>
            </div>
          </div>

          <form className="bg-[#050505] p-5 lg:p-8 rounded-2xl border border-gray-800 relative z-10 shadow-lg min-h-0 flex flex-col justify-center">
            <div className="space-y-3 lg:space-y-5 font-mono">
              <div>
                <label className="block text-xs text-terminal-dim uppercase tracking-widest mb-2">{">"}_ INPUT NAME</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3"
                  placeholder="Guest_User"
                />
              </div>
              <div>
                <label className="block text-xs text-terminal-dim uppercase tracking-widest mb-2">{">"}_ INPUT RETURN_ADDR</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3"
                  placeholder="node@network.com"
                />
              </div>
              <div>
                <label className="block text-xs text-terminal-dim uppercase tracking-widest mb-2">{">"}_ INPUT PAYLOAD</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 resize-none"
                  placeholder="Encrypting message..."
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                className="hacker-btn w-full mt-1 lg:mt-2 glitch-hover py-2 lg:py-3 text-sm lg:text-base"
              >
                Execute Transmit <Send size={18} />
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
