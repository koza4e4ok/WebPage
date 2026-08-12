import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      company: "DataArt Solutions, Inc.",
      companyUrl: "https://www.dataart.com",
      role: "SENIOR ANDROID ENGINEER",
      period: "2021 — PRESENT",
      description: "Leading development of multi-module Android applications using Jetpack Compose and modern architecture. Mentoring junior developers, conducting code reviews, and implementing CI/CD pipelines with GitHub Actions."
    },
    {
      company: "Unicreo",
      companyUrl: null,
      role: "ANDROID DEVELOPER",
      period: "2016 — 2021",
      description: "Full-cycle Android development from project estimation and architecture design through to Google Play delivery. Owned feature development, code quality, and release management."
    },
    {
      company: "Digital Horizon",
      companyUrl: null,
      role: "JUNIOR SOFTWARE ENGINEER",
      period: "2014 — 2016",
      description: "Contributed to cross-platform and native Android projects. Gained deep experience with Java, XML layouts, and REST API integrations."
    }
  ];

  return (
    <section id="experience" className="w-full h-full flex-shrink-0 snap-start snap-always p-2 md:p-4 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-4 md:p-8 lg:p-12 flex flex-col justify-center relative z-10 overflow-hidden text-sm lg:text-base">
        <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col min-h-0">
        <div className="text-center mb-6 lg:mb-10">
          <h2 className="text-xs lg:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-1 lg:mb-2">{"//"} Execution Logs</h2>
          <h3 className="text-3xl md:text-5xl font-terminal text-gray-900 dark:text-gray-200">System Timeline.</h3>
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
              <div className="absolute -left-[5.5px] top-[4px] md:top-[6px] w-[10px] h-[10px] rounded-full bg-gray-200 dark:bg-[#111] border border-terminal-green group-hover:bg-terminal-green transition-colors shadow-[0_0_8px_rgba(0,255,65,0.5)] z-10" />
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-1 md:mb-2 gap-1 sm:gap-4">
                <h4 className="text-sm md:text-lg lg:text-xl font-terminal text-terminal-green leading-none glitch-hover">{exp.role}</h4>
                <span className="text-[9px] md:text-xs font-mono text-gray-500 bg-gray-200 dark:bg-[#111] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-800 leading-none shrink-0 inline-block w-fit">
                  {exp.period}
                </span>
              </div>
              
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gray-900 dark:text-gray-200 font-mono text-[10px] md:text-xs lg:text-sm mb-1 lg:mb-2 hover:text-terminal-green transition-colors underline underline-offset-2 decoration-terminal-green/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-1 inline-block"
                >
                  {exp.company}
                </a>
              ) : (
                <p className="text-gray-900 dark:text-gray-200 font-mono text-[10px] md:text-xs lg:text-sm mb-1 lg:mb-2">{exp.company}</p>
              )}
              
              <p className="text-gray-600 dark:text-gray-400 font-mono text-[10px] md:text-xs leading-snug md:leading-relaxed line-clamp-3 md:line-clamp-4">
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
