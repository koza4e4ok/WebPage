import React from "react";
import { motion } from "motion/react";
import { Smartphone, Layout, Settings } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface Skill {
  name: string;
  level: number; // 0–100
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "CORE_ANDROID",
      icon: <Smartphone className="text-terminal-green" size={24} />,
      skills: [
        { name: "Kotlin", level: 97 },
        { name: "Compose", level: 92 },
        { name: "Flow", level: 90 },
        { name: "Coroutines", level: 90 },
        { name: "Dagger Hilt", level: 85 },
      ],
    },
    {
      title: "ARCHITECTURE",
      icon: <Layout className="text-[#00ffff]" size={24} />,
      skills: [
        { name: "MVVM", level: 95 },
        { name: "MVI", level: 88 },
        { name: "Clean Architecture", level: 92 },
        { name: "Modularity", level: 87 },
        { name: "Unit Testing", level: 83 },
      ],
    },
    {
      title: "SYSTEM_TOOLS",
      icon: <Settings className="text-[#ff00ea]" size={24} />,
      skills: [
        { name: "Retrofit", level: 93 },
        { name: "Firebase", level: 85 },
        { name: "Git", level: 95 },
        { name: "CI/CD Actions", level: 82 },
        { name: "WorkManager", level: 88 },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="w-full h-full flex-shrink-0 snap-start snap-always p-2 md:p-4 lg:p-8 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-4 md:p-8 lg:p-12 flex flex-col justify-center relative z-10 overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-6 lg:mb-10 border-l-4 border-terminal-green pl-4 lg:pl-6 w-full"
        >
          <motion.h2 variants={itemVariants} className="text-xs lg:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-1 lg:mb-2">
            {"//"} SYSTEM_DIAGNOSTICS
          </motion.h2>
          <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-terminal text-gray-900 dark:text-gray-200">
            Technical Specs.
          </motion.h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 min-h-0"
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={itemVariants}
              className="bg-white dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-xl p-3 sm:p-4 lg:p-6 group relative hover:border-terminal-green/50 hover:shadow-[0_4px_20px_rgba(0,255,65,0.05)] transition-all duration-300 flex flex-col min-h-0"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gray-200 dark:bg-[#111] border border-terminal-green/20 flex items-center justify-center mb-2 lg:mb-4 shadow-[0_0_15px_rgba(0,255,65,0.1)] group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>

              <h4 className="text-lg lg:text-xl font-terminal text-terminal-green mb-3 lg:mb-4">
                {cat.title}
              </h4>

              <div className="flex flex-col gap-2 flex-grow">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-mono text-gray-800 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-terminal-dim opacity-70">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-[3px] w-full bg-gray-200 dark:bg-[#1a1a1a] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-terminal-green rounded-full relative"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                        style={{
                          boxShadow: "0 0 6px rgba(0,153,34,0.6)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
