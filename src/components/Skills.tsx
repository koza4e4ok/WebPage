import React from "react";
import { motion } from "motion/react";
import { Smartphone, Layout, Settings } from "lucide-react";
import { skillGroups } from "../content/profile";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const GROUP_ICONS: React.ReactNode[] = [
  <Smartphone className="text-terminal-green" size={22} />,
  <Layout className="text-[#00ffff]" size={22} />,
  <Settings className="text-[#ff00ea]" size={22} />,
];

export function Skills() {
  return (
    <section
      id="skills"
      className="w-full h-full flex-shrink-0 snap-start snap-always p-1 sm:p-2 md:p-4 lg:p-8 compact:p-2 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-2.5 sm:p-4 md:p-8 lg:p-12 compact:p-6 flex flex-col justify-center relative z-10 overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-5 short:mb-3 sm:mb-6 lg:mb-10 compact:mb-4 border-l-4 border-terminal-green pl-2.5 lg:pl-6 w-full shrink-0"
        >
          <motion.h2 variants={itemVariants} className="text-[11px] sm:text-xs lg:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-1 lg:mb-2">
            {"//"} SYSTEM_DIAGNOSTICS
          </motion.h2>
          <motion.h3 variants={itemVariants} className="text-3xl short:text-2xl sm:text-3xl md:text-5xl compact:text-4xl font-terminal text-gray-900 dark:text-gray-200">
            Technical Specs.
          </motion.h3>
        </motion.div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 short:gap-2 md:gap-6 min-h-0"
        >
          {skillGroups.map((group, i) => (
            <motion.li
              key={group.title}
              variants={itemVariants}
              className="bg-white dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-xl p-4 short:p-3 lg:p-6 group relative hover:border-terminal-green/50 hover:shadow-[0_4px_20px_rgba(0,255,65,0.05)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 md:block mb-3 short:mb-2 lg:mb-4">
                <div className="w-9 h-9 short:w-8 short:h-8 lg:w-10 lg:h-10 shrink-0 rounded-xl bg-gray-200 dark:bg-[#111] border border-terminal-green/20 flex items-center justify-center md:mb-3 lg:mb-4 shadow-[0_0_15px_rgba(0,255,65,0.1)] group-hover:scale-110 transition-transform">
                  {GROUP_ICONS[i % GROUP_ICONS.length]}
                </div>
                <h4 className="text-xl font-terminal text-terminal-green">{group.title}</h4>
              </div>

              <ul className="flex flex-wrap gap-1.5 lg:gap-2" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-xs font-mono px-2 py-1 rounded-md border border-terminal-green/20 bg-terminal-green/5 text-gray-800 dark:text-gray-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
