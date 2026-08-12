import { motion } from "motion/react";
import { Github, Mail, Menu, X, TerminalSquare, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import { ScanlineWipe } from "./ScanlineWipe";
import { SoundToggle } from "./SoundToggle";
import { playTick, playNavSelect } from "../lib/audioEngine";
import { haptic } from "../hooks/useHaptic";

const SECTION_IDS = ["hero", "skills", "projects", "experience", "contact"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const updateTime = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#hero", id: "hero" },
    { name: "SKILLS", href: "#skills", id: "skills" },
    { name: "PROJECTS", href: "#projects", id: "projects" },
    { name: "EXPERIENCE", href: "#experience", id: "experience" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  const socialLinks = [
    { icon: <Github size={16} />, href: "https://github.com/koza4e4ok", label: "GitHub profile" },
    { icon: <Mail size={16} />, href: "mailto:koza4e4ok@gmail.com", label: "Send email" },
  ];

  const handleNavClick = () => {
    playNavSelect();
    haptic("nav");
  };

  const handleSocialClick = () => {
    playTick();
    haptic("tick");
  };

  return (
    <>
      <ScanlineWipe trigger={activeSection} />

      <nav className="w-full relative z-50 bg-white dark:bg-[#050505] rounded-2xl md:rounded-full border-2 border-gray-300 dark:border-[#111] shadow-[0_4px_30px_rgba(0,255,65,0.05)]">
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-terminal-green/30 dark:via-terminal-green/10 to-transparent opacity-80" />

        <div className="px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">

          {/* Left: Logo & Status */}
          <div className="flex items-center gap-6">
            <motion.a
              href="#hero"
              onClick={handleNavClick}
              className="flex items-center gap-2 text-xl md:text-2xl font-terminal font-bold text-terminal-green glitch-hover"
            >
              <div className="bg-terminal-green text-black p-1 block">
                <TerminalSquare size={20} />
              </div>
              <span>ANDRII_K<span className="blink">_</span></span>
            </motion.a>

            <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 bg-gray-50 dark:bg-[#0a0a0a] rounded-full border border-gray-200 dark:border-gray-800 text-[11px] uppercase font-mono text-gray-600 dark:text-gray-400 tracking-wider shadow-inner ml-4">
              <div className="flex items-center gap-1.5 text-terminal-green">
                <Activity size={12} className="animate-pulse" />
                <span className="text-terminal-green">SYS.ON</span>
              </div>
              <div className="w-[1px] h-3 bg-gray-700" />
              <span className="text-gray-500 font-terminal text-sm">{time}</span>
            </div>
          </div>

          {/* Right: Desktop Nav */}
          <div className="hidden lg:flex items-center font-mono text-sm tracking-widest gap-1 pr-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  onMouseEnter={() => { playTick(); haptic("tick"); }}
                  className={`px-4 py-2 rounded-full transition-all duration-300 glitch-hover uppercase relative flex items-center ${
                    isActive
                      ? "text-terminal-green bg-terminal-green/10 border-b-2 border-terminal-green"
                      : "text-gray-600 dark:text-gray-400 hover:text-terminal-green hover:bg-terminal-green/10"
                  }`}
                >
                  <span className="text-terminal-dim opacity-50 mr-1.5">{">"}</span>
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-terminal-green rounded-full"
                    />
                  )}
                </a>
              );
            })}

            <div className="h-6 w-[1px] bg-gray-200 dark:bg-[#111] mx-2" />

            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={link.label}
                  onClick={handleSocialClick}
                  onMouseEnter={() => { playTick(); haptic("tick"); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-terminal-green hover:border-terminal-green hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-2"
                >
                  {link.icon}
                </a>
              ))}

              {/* Sound toggle */}
              <SoundToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            <span className="text-terminal-green/70 font-terminal text-lg tracking-widest">{time}</span>
            <SoundToggle />
            <button
              className="text-terminal-green rounded-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-terminal-green hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:bg-terminal-green/10 p-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-2"
              onClick={() => {
                setIsOpen(!isOpen);
                playTick();
                haptic("tick");
              }}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="lg:hidden bg-white dark:bg-[#050505] rounded-3xl border-2 border-gray-300 dark:border-[#111] mt-2 font-mono flex flex-col overflow-hidden shadow-[0_10px_30px_rgba(0,255,65,0.1)] absolute top-full left-0 right-0 z-40 mx-2"
          >
            <div className="px-5 py-3 bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-terminal">
              <Activity size={12} className="text-terminal-green animate-pulse" />
              System Interface Menu
            </div>

            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setIsOpen(false);
                      handleNavClick();
                    }}
                    onMouseEnter={() => { playTick(); haptic("tick"); }}
                    className={`glitch-hover uppercase text-sm flex items-center p-3 transition-colors rounded-xl border ${
                      isActive
                        ? "text-terminal-green bg-terminal-green/10 border-terminal-green/40"
                        : "text-gray-600 dark:text-gray-400 hover:text-terminal-green hover:bg-terminal-green/5 border-transparent hover:border-terminal-green/30"
                    }`}
                  >
                    <span className="text-terminal-dim mr-3">{">_"}</span>
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="flex gap-4 p-4 mt-1 bg-white dark:bg-[#050505] justify-around">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={link.label}
                  onClick={handleSocialClick}
                  className="p-3 w-12 h-12 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-terminal-green hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:text-terminal-green transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-2"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}
