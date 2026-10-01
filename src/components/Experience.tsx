import { motion } from "motion/react";
import { useState } from "react";
import { experience } from "../content/profile";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

export function Experience() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section
      id="experience"
      className="w-full h-full flex-shrink-0 snap-start snap-always p-1 sm:p-2 md:p-4 lg:p-8 compact:p-2 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-2.5 sm:p-4 md:p-8 lg:p-12 compact:p-6 flex flex-col justify-center relative z-10 overflow-hidden text-xs sm:text-sm lg:text-base">
        <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col min-h-0">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-4 short:mb-2 sm:mb-6 lg:mb-10 compact:mb-4 shrink-0"
          >
            <motion.h2 variants={itemVariants} className="text-[11px] sm:text-xs lg:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-1 lg:mb-2">
              {"//"} Execution Logs
            </motion.h2>
            <motion.h3 variants={itemVariants} className="text-3xl short:text-2xl sm:text-3xl md:text-5xl compact:text-4xl font-terminal text-gray-900 dark:text-gray-200">
              System Timeline.
            </motion.h3>
          </motion.div>

          {/* Timeline container */}
          <div className={`relative ml-2 md:ml-6 flex-1 flex flex-col justify-evenly py-1 sm:py-2 min-h-0 ${expanded ? "max-md:overflow-y-auto max-md:justify-start compact:overflow-y-auto compact:justify-start mobile-scrollbar-none" : ""}`}>
            {/* Animated timeline line */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-px bg-terminal-green/30"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className={`flex flex-col justify-evenly flex-1 min-h-0 ${expanded ? "max-md:justify-start max-md:gap-4 compact:justify-start compact:gap-4" : ""}`}
            >
              {experience.map((exp) => {
                const isExpanded = expanded === exp.company;
                const hasHighlights = exp.highlights.length > 0;
                const descId = `exp-desc-${exp.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                return (
                <motion.div
                  key={exp.company}
                  variants={itemVariants}
                  className="relative pl-6 md:pl-10 group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[5.5px] top-[4px] md:top-[6px] w-[10px] h-[10px] rounded-full bg-gray-200 dark:bg-[#111] border border-terminal-green group-hover:bg-terminal-green transition-colors shadow-[0_0_8px_rgba(0,255,65,0.5)] z-10" />

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-1 md:mb-2 gap-1 sm:gap-4">
                    <h4 className="text-lg short:text-base md:text-lg lg:text-xl font-terminal text-terminal-green leading-none glitch-hover">
                      {exp.role}
                    </h4>
                    <span className="text-[11px] md:text-xs font-mono text-gray-500 bg-gray-200 dark:bg-[#111] px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-800 leading-none shrink-0 inline-block w-fit">
                      {exp.period}
                    </span>
                  </div>

                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Visit ${exp.company} website`}
                      className="text-gray-900 dark:text-gray-200 font-mono text-sm md:text-xs lg:text-sm mb-1 lg:mb-2 hover:text-terminal-green transition-colors underline underline-offset-2 decoration-terminal-green/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-1 inline-block"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <p className="text-gray-900 dark:text-gray-200 font-mono text-sm md:text-xs lg:text-sm mb-1 lg:mb-2">
                      {exp.company}
                    </p>
                  )}

                  <div id={descId}>
                    <p
                      className={`text-gray-600 dark:text-gray-400 font-mono text-[13px] md:text-xs leading-snug md:leading-relaxed md:line-clamp-4 ${
                        isExpanded ? "" : "short:line-clamp-2 compact:line-clamp-2"
                      }`}
                    >
                      {">"} {exp.summary}
                    </p>
                    {hasHighlights && (
                      <ul className={`${isExpanded ? "block" : "hidden md:block compact:hidden"} mt-1.5 space-y-1 font-mono text-[13px] md:text-xs text-gray-800 dark:text-gray-300 leading-snug`}>
                        {exp.highlights.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-terminal-green shrink-0" aria-hidden="true">+</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : exp.company)}
                    aria-expanded={isExpanded}
                    aria-controls={descId}
                    className={`${hasHighlights ? "inline-flex md:hidden compact:inline-flex" : "hidden short:inline-flex"} py-1 text-[11px] font-mono uppercase tracking-widest text-terminal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green rounded`}
                  >
                    {isExpanded ? "< less" : hasHighlights ? "> results" : "> more"}
                  </button>
                </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
