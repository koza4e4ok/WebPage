import { motion } from "motion/react";
import { Mail, Send, TerminalSquare, Loader2, CheckCircle2, AlertCircle, Linkedin } from "lucide-react";
import { useState } from "react";
import { playConfirm, playError, playSuccess, playTick } from "../lib/audioEngine";
import { haptic } from "../hooks/useHaptic";
import { profile } from "../content/profile";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Contact() {
  const { email, telegram, telegramHandle, linkedin } = profile.links;
  const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";

  const [formData, setFormData] = useState({ name: "", returnAddr: "", payload: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleTransmit = async () => {
    if (!formData.returnAddr || !formData.payload) {
      playError();
      haptic("error");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    playConfirm();
    haptic("confirm");
    setStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name || "Guest_User",
          email: formData.returnAddr,
          message: formData.payload,
          subject: `Portfolio contact from ${formData.name || formData.returnAddr}`,
        }),
      });
      const json = await response.json();
      if (json.success) {
        playSuccess();
        haptic("success");
        setStatus("success");
        setFormData({ name: "", returnAddr: "", payload: "" });
      } else {
        playError();
        haptic("error");
        setStatus("error");
      }
    } catch {
      playError();
      haptic("error");
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section
      id="contact"
      className="w-full h-full flex-shrink-0 snap-start snap-always p-1 sm:p-2 md:p-4 lg:p-8 compact:p-2 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-2.5 sm:p-4 md:p-8 lg:p-12 compact:p-6 flex flex-col justify-center relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-terminal-green/5 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none z-0" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative z-10 grid lg:grid-cols-2 gap-3 lg:gap-12 items-center w-full min-h-0"
        >
          {/* Left: contact info */}
          <div className="flex flex-col justify-center">
            <motion.h2 variants={itemVariants} className="text-[11px] sm:text-xs lg:text-sm font-mono text-terminal-green uppercase tracking-widest mb-1 flex items-center gap-2">
              <TerminalSquare size={12} /> Establish Connection
            </motion.h2>
            <motion.h3 variants={itemVariants} className="text-3xl short:text-2xl sm:text-3xl md:text-5xl compact:text-4xl font-terminal mb-2 lg:mb-4 compact:mb-2 text-gray-900 dark:text-gray-200">
              Open a new socket.
            </motion.h3>
            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 font-mono text-sm lg:text-sm mb-4 lg:mb-10 compact:mb-4 max-w-md leading-relaxed short:hidden">
              Ready to deploy new solutions or optimize existing ones. Drop a ping and I&apos;ll confirm reception.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 short:gap-2 sm:gap-4 lg:gap-6 compact:gap-3 font-mono mb-4 short:mb-3 lg:mb-0">
              <motion.a
                variants={itemVariants}
                href={`mailto:${email}`}
                aria-label="Send email"
                onClick={() => { playTick(); haptic("tick"); }}
                onMouseEnter={playTick}
                className="flex items-center gap-2 sm:gap-3 lg:gap-4 group"
              >
                <div className="w-10 h-10 short:w-9 short:h-9 lg:w-12 lg:h-12 rounded-lg bg-gray-200 dark:bg-[#111] border border-terminal-green/20 flex items-center justify-center group-hover:bg-terminal-green/10 group-hover:border-terminal-green transition-all glitch-hover shrink-0">
                  <Mail className="text-gray-600 dark:text-gray-400 group-hover:text-terminal-green transition-colors" size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] lg:text-xs text-gray-500 uppercase tracking-widest mb-0.5">Email</div>
                  <div className="text-sm lg:text-base text-gray-900 dark:text-gray-200 glitch-hover truncate">{email}</div>
                </div>
              </motion.a>

              <motion.a
                variants={itemVariants}
                href={telegram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Contact on Telegram"
                onClick={() => { playTick(); haptic("tick"); }}
                onMouseEnter={playTick}
                className="flex items-center gap-2 sm:gap-3 lg:gap-4 group"
              >
                <div className="w-10 h-10 short:w-9 short:h-9 lg:w-12 lg:h-12 rounded-lg bg-gray-200 dark:bg-[#111] border border-[#00ffff]/20 flex items-center justify-center group-hover:bg-[#00ffff]/10 group-hover:border-[#00ffff] transition-all glitch-hover shrink-0">
                  <Send className="text-gray-600 dark:text-gray-400 group-hover:text-[#00ffff] transition-colors" size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] lg:text-xs text-gray-500 uppercase tracking-widest mb-0.5">Telegram</div>
                  <div className="text-sm lg:text-base text-gray-900 dark:text-gray-200 glitch-hover truncate">{telegramHandle}</div>
                </div>
              </motion.a>

              {linkedin && (
                <motion.a
                  variants={itemVariants}
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="View LinkedIn profile"
                  onClick={() => { playTick(); haptic("tick"); }}
                  onMouseEnter={playTick}
                  className="flex items-center gap-2 sm:gap-3 lg:gap-4 group"
                >
                  <div className="w-10 h-10 short:w-9 short:h-9 lg:w-12 lg:h-12 rounded-lg bg-gray-200 dark:bg-[#111] border border-[#0a66c2]/30 flex items-center justify-center group-hover:bg-[#0a66c2]/10 group-hover:border-[#0a66c2] transition-all glitch-hover shrink-0">
                    <Linkedin className="text-gray-600 dark:text-gray-400 group-hover:text-[#0a66c2] transition-colors" size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] lg:text-xs text-gray-500 uppercase tracking-widest mb-0.5">LinkedIn</div>
                    <div className="text-sm lg:text-base text-gray-900 dark:text-gray-200 glitch-hover truncate">{linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</div>
                  </div>
                </motion.a>
              )}
            </div>
          </div>

          {/* Right: contact form */}
          <motion.form
            variants={itemVariants}
            className="bg-white dark:bg-[#050505] p-4 short:p-3 sm:p-5 lg:p-8 compact:p-5 rounded-2xl border border-gray-200 dark:border-gray-800 relative z-10 shadow-lg min-h-0 flex flex-col justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleTransmit();
            }}
          >
            <div className="space-y-3 short:space-y-2 lg:space-y-5 compact:space-y-3 font-mono">
              <div>
                <label htmlFor="contact-name" className="block text-[11px] sm:text-xs text-terminal-dim uppercase tracking-widest mb-1 sm:mb-2">
                  <span aria-hidden="true">{">_"}</span> Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  disabled={status === "submitting"}
                  className="w-full px-3 py-2.5 short:py-2 sm:px-4 sm:py-3 compact:py-2 text-base sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Your name"
                  value={formData.name}
                  onFocus={() => { playTick(); haptic("tick"); }}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[11px] sm:text-xs text-terminal-dim uppercase tracking-widest mb-1 sm:mb-2">
                  <span aria-hidden="true">{">_"}</span> Email <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={status === "submitting"}
                  aria-invalid={status === "error"}
                  className="w-full px-3 py-2.5 short:py-2 sm:px-4 sm:py-3 compact:py-2 text-base sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="your@email.com"
                  value={formData.returnAddr}
                  onFocus={() => { playTick(); haptic("tick"); }}
                  onChange={(e) => setFormData({ ...formData, returnAddr: e.target.value })}
                />
              </div>
              <div>
                <div className="flex justify-between items-end mb-1 sm:mb-2">
                  <label htmlFor="contact-message" className="block text-[11px] sm:text-xs text-terminal-dim uppercase tracking-widest">
                    <span aria-hidden="true">{">_"}</span> Message <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <span id="contact-message-counter" className={`text-[10px] ${formData.payload.length >= 500 ? 'text-red-500' : 'text-terminal-dim/70'}`}>
                    {formData.payload.length}/500
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={2}
                  required
                  maxLength={500}
                  disabled={status === "submitting"}
                  aria-invalid={status === "error"}
                  aria-describedby="contact-message-counter"
                  className="w-full h-24 short:h-16 sm:h-auto px-3 py-2.5 short:py-2 sm:px-4 sm:py-3 compact:py-2 text-base sm:text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Your message..."
                  value={formData.payload}
                  onFocus={() => { playTick(); haptic("tick"); }}
                  onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
                />
              </div>

              <div aria-live="polite" aria-atomic="true" className="sr-only">
                {status === "success" && "Message sent successfully."}
                {status === "error" && "Failed to send message. Please try again."}
              </div>

              <motion.button
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                type="submit"
                disabled={status === "submitting"}
                aria-disabled={status === "submitting"}
                className={`w-full mt-1 lg:mt-2 py-3 short:py-2.5 text-sm lg:text-base flex items-center justify-center gap-2 rounded-lg font-mono uppercase tracking-widest font-bold border transition-all ${
                  status === "idle"
                    ? "hacker-btn glitch-hover"
                    : status === "submitting"
                    ? "bg-gray-200 dark:bg-[#111] text-terminal-dim border-gray-200 dark:border-gray-800"
                    : status === "success"
                    ? "bg-terminal-green/20 text-terminal-green border-terminal-green"
                    : "bg-red-900/20 text-red-500 border-red-900"
                }`}
              >
                {status === "idle" && <>Send message <Send size={18} /></>}
                {status === "submitting" && <>Sending... <Loader2 size={18} className="animate-spin" /></>}
                {status === "success" && <>Message sent <CheckCircle2 size={18} /></>}
                {status === "error" && <>Not sent, try again <AlertCircle size={18} /></>}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
