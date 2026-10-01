import React from "react";
import { motion } from "motion/react";
import { Smartphone, Layout, Settings } from "lucide-react";
import { CarouselDots } from "./CarouselDots";
import { useCarousel } from "../hooks/useCarousel";

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
  const carousel = useCarousel<HTMLDivElement>();
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
      className="w-full h-full flex-shrink-0 snap-start snap-always p-1 sm:p-2 md:p-4 lg:p-8 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-2.5 sm:p-4 md:p-8 lg:p-12 flex flex-col justify-center relative z-10 overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-5 short:mb-3 sm:mb-6 lg:mb-10 border-l-4 border-terminal-green pl-2.5 lg:pl-6 w-full shrink-0"
        >
          <motion.h2 variants={itemVariants} className="text-[11px] sm:text-xs lg:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-1 lg:mb-2">
            {"//"} SYSTEM_DIAGNOSTICS
          </motion.h2>
          <motion.h3 variants={itemVariants} className="text-3xl short:text-2xl sm:text-3xl md:text-5xl font-terminal text-gray-900 dark:text-gray-200">
            Technical Specs.
          </motion.h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          ref={carousel.ref}
          className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-3 md:gap-6 min-h-0 custom-scrollbar mobile-scrollbar-none -mx-2 px-2 md:mx-0 md:px-0"
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={itemVariants}
              className="w-[85%] sm:w-[280px] md:w-auto shrink-0 snap-center md:shrink bg-white dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-xl p-4 short:p-3 lg:p-6 group relative hover:border-terminal-green/50 hover:shadow-[0_4px_20px_rgba(0,255,65,0.05)] transition-all duration-300 flex flex-col min-h-0 justify-between"
            >
              <div>
                <div className="w-10 h-10 short:w-8 short:h-8 rounded-xl bg-gray-200 dark:bg-[#111] border border-terminal-green/20 flex items-center justify-center mb-3 short:mb-2 lg:mb-4 shadow-[0_0_15px_rgba(0,255,65,0.1)] group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>

                <h4 className="text-xl font-terminal text-terminal-green mb-4 short:mb-2 lg:mb-4">
                  {cat.title}
                </h4>
              </div>

              <div className="flex flex-col gap-3 short:gap-2 md:gap-2 flex-grow justify-center">
                {cat.skills.map((skill) => {
                  const skillId = `skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1 md:mb-0.5">
                        <span id={skillId} className="text-sm md:text-xs font-mono text-gray-800 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-xs md:text-[10px] md:leading-normal font-mono text-terminal-dim opacity-70" aria-hidden="true">
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className="h-1 md:h-[3px] w-full bg-gray-200 dark:bg-[#1a1a1a] rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-labelledby={skillId}
                      >
                        <motion.div
                          className="h-full bg-terminal-green rounded-full relative origin-left"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                          style={{
                            width: `${skill.level}%`,
                            boxShadow: "0 0 6px rgba(0,153,34,0.6)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <CarouselDots
          labels={skillCategories.map((cat) => cat.title)}
          active={carousel.index}
          onSelect={carousel.scrollToIndex}
          groupLabel="Skill categories"
        />
      </div>
    </section>
  );
}
