import { motion } from "motion/react";
import { Mail, Send, TerminalSquare, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const email = "koza4e4ok@gmail.com";
  // Uses GitHub Secrets/Env var if available, otherwise falls back to the hardcoded key
  const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";
  
  const [formData, setFormData] = useState({
    name: "",
    returnAddr: "",
    payload: ""
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleTransmit = async () => {
    if (!formData.returnAddr || !formData.payload) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('submitting');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name || "Guest_User",
          email: formData.returnAddr,
          message: formData.payload,
          subject: `[System Ping] Connection from ${formData.name || 'node@network.com'}`,
        }),
      });
      
      const json = await response.json();
      
      if (json.success) {
        setStatus('success');
        setFormData({ name: "", returnAddr: "", payload: "" });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
    
    setTimeout(() => setStatus('idle'), 4000);
  };

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
                  <div className="text-sm lg:text-base text-white glitch-hover">@koza4e4ok</div>
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
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs text-terminal-dim uppercase tracking-widest mb-2">{">"}_ INPUT RETURN_ADDR</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3"
                  placeholder="node@network.com"
                  value={formData.returnAddr}
                  onChange={(e) => setFormData({...formData, returnAddr: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs text-terminal-dim uppercase tracking-widest mb-2">{">"}_ INPUT PAYLOAD</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 resize-none"
                  placeholder="Encrypting message..."
                  value={formData.payload}
                  onChange={(e) => setFormData({...formData, payload: e.target.value})}
                />
              </div>
              <motion.button
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                type="button"
                onClick={handleTransmit}
                disabled={status === 'submitting'}
                className={`w-full mt-1 lg:mt-2 py-2 lg:py-3 text-sm lg:text-base flex items-center justify-center gap-2 ${
                  status === 'idle' ? 'hacker-btn glitch-hover' : 
                  status === 'submitting' ? 'bg-[#111] text-terminal-dim border border-gray-800' :
                  status === 'success' ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green' :
                  'bg-red-900/20 text-red-500 border border-red-900'
                }`}
              >
                {status === 'idle' && <>Execute Transmit <Send size={18} /></>}
                {status === 'submitting' && <>Transmitting... <Loader2 size={18} className="animate-spin" /></>}
                {status === 'success' && <>Payload Delivered <CheckCircle2 size={18} /></>}
                {status === 'error' && <>Transmission Failed <AlertCircle size={18} /></>}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
