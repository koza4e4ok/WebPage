import { motion } from "motion/react";
import { Github, Mail, Instagram, Facebook, Twitter, Menu, X, TerminalSquare, Activity } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#hero" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "CONTACT", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <Instagram size={16} />, href: "https://instagram.com", label: "INSTA" },
    { icon: <Facebook size={16} />, href: "https://facebook.com", label: "FB" },
    { icon: <Twitter size={16} />, href: "https://twitter.com", label: "TWTR" },
    { icon: <Mail size={16} />, href: "mailto:koza4e4ok@gmail.com", label: "MAIL" },
    { icon: <Github size={16} />, href: "https://github.com", label: "GIT" },
  ];

  return (
    <nav className="w-full relative z-50 bg-white dark:bg-[#050505] rounded-2xl md:rounded-full border-2 border-gray-300 dark:border-[#111] shadow-[0_4px_30px_rgba(0,255,65,0.05)]">
      {/* Top Edge Highlight / Hardware Accent */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-terminal-green/30 dark:via-terminal-green/10 to-transparent opacity-80" />
      
      <div className="px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
        
        {/* Left Side: Logo & Status */}
        <div className="flex items-center gap-6">
          <motion.a 
            href="#hero"
            className="flex items-center gap-2 text-xl md:text-2xl font-terminal font-bold text-terminal-green glitch-hover"
          >
            <div className="bg-terminal-green text-black p-1 block">
              <TerminalSquare size={20} />
            </div>
            <span>ANDRII_K<span className="blink">_</span></span>
          </motion.a>

          {/* System Status / CPU Monitor - Desktop Only */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 bg-gray-50 dark:bg-[#0a0a0a] rounded-full border border-gray-200 dark:border-gray-800 text-[11px] uppercase font-mono text-gray-600 dark:text-gray-400 tracking-wider shadow-inner ml-4">
             <div className="flex items-center gap-1.5 text-terminal-green">
               <Activity size={12} className="animate-pulse" />
               <span className="text-terminal-green">SYS.ON</span>
             </div>
             <div className="w-[1px] h-3 bg-gray-700" />
             <span className="text-gray-500 font-terminal text-sm">{time}</span>
          </div>
        </div>

        {/* Right Side: Desktop Nav */}
        <div className="hidden lg:flex items-center font-mono text-sm tracking-widest gap-1 pr-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-terminal-green hover:bg-terminal-green/10 transition-all duration-300 glitch-hover uppercase relative flex items-center"
            >
              <span className="text-terminal-dim opacity-50 mr-1.5">{">"}</span>
              {link.name}
            </a>
          ))}
          
          <div className="h-6 w-[1px] bg-gray-200 dark:bg-[#111] mx-2" />
          
          {/* Social Links Panel */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-terminal-green hover:border-terminal-green hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all glitch-hover"
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 lg:hidden">
          <span className="text-terminal-green/70 font-terminal text-lg tracking-widest">{time}</span>
          <button 
            className="text-terminal-green rounded-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-terminal-green hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:bg-terminal-green/10 p-2 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
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
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-terminal-green hover:bg-terminal-green/5 rounded-xl border border-transparent hover:border-terminal-green/30 glitch-hover uppercase text-sm flex items-center p-3 transition-colors"
              >
                <span className="text-terminal-dim mr-3">{">_"}</span>
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex gap-4 p-4 mt-1 bg-white dark:bg-[#050505] justify-around">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="p-3 w-12 h-12 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-terminal-green hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:text-terminal-green transition-all"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
