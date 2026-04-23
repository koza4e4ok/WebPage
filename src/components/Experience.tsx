import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      company: "TechNova Mobile",
      role: "SENIOR ANDROID ENGINEER",
      period: "2022 - PRESENT",
      description: "Leading the development of multi-module Android applications using Jetpack Compose and modern architecture. Mentoring junior developers and implementing CI/CD pipelines."
    },
    {
      company: "AppScale Systems",
      role: "ANDROID DEVELOPER",
      period: "2019 - 2022",
      description: "Focused on high-performance SDK development and internal library creation. Optimized application startup time by 40% and improved memory efficiency."
    },
    {
      company: "Digital Horizon",
      role: "JUNIOR SOFTWARE ENGINEER",
      period: "2017 - 2019",
      description: "Contributed to cross-platform and native Android projects. Gained deep experience with Java, XML layouts, and REST API integrations."
    }
  ];

  return (
    <section id="experience" className="w-full h-full flex-shrink-0 snap-start snap-always p-2 md:p-4 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-4 md:p-8 lg:p-12 flex flex-col justify-center relative z-10 overflow-hidden text-sm lg:text-base">
        <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col min-h-0">
        <div className="text-center mb-6 lg:mb-10">
          <h2 className="text-xs lg:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-1 lg:mb-2">{"//"} Execution Logs</h2>
          <h3 className="text-3xl md:text-5xl font-terminal text-white">System Timeline.</h3>
        </div>

        <div className="relative border-l border-terminal-green/30 ml-2 md:ml-6 flex-1 overflow-hidden flex flex-col justify-evenly py-2 min-h-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-6 md:pl-10 group"
            >
              {/* Timeline Dot Server Node */}
              <div className="absolute -left-[5.5px] top-[4px] md:top-[6px] w-[10px] h-[10px] rounded-full bg-[#111] border border-terminal-green group-hover:bg-terminal-green transition-colors shadow-[0_0_8px_rgba(0,255,65,0.5)] z-10" />
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-1 md:mb-2 gap-1 sm:gap-4">
                <h4 className="text-sm md:text-lg lg:text-xl font-terminal text-terminal-green leading-none glitch-hover">{exp.role}</h4>
                <span className="text-[9px] md:text-xs font-mono text-gray-500 bg-[#111] px-2 py-0.5 rounded border border-gray-800 leading-none shrink-0 inline-block w-fit">
                  {exp.period}
                </span>
              </div>
              
              <p className="text-white font-mono text-[10px] md:text-xs lg:text-sm mb-1 lg:mb-2">{exp.company}</p>
              
              <p className="text-gray-400 font-mono text-[10px] md:text-xs leading-snug md:leading-relaxed line-clamp-3 md:line-clamp-4">
                {">"} {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
