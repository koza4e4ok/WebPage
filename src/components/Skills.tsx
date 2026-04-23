import { motion } from "motion/react";
import { Smartphone, Layout, Settings } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "CORE_ANDROID",
      icon: <Smartphone className="text-terminal-green" size={24} />,
      skills: ["Kotlin", "Compose", "Flow", "Coroutines", "Dagger Hilt"]
    },
    {
      title: "ARCHITECTURE",
      icon: <Layout className="text-[#00ffff]" size={24} />,
      skills: ["MVVM", "MVI", "Clean Architecture", "Modularity", "Unit Testing"]
    },
    {
      title: "SYSTEM_TOOLS",
      icon: <Settings className="text-[#ff00ea]" size={24} />,
      skills: ["Retrofit", "Firebase", "Git", "CI/CD Actions", "WorkManager"]
    }
  ];

  return (
    <section id="skills" className="w-full h-full flex-shrink-0 snap-start snap-always p-2 md:p-4 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-4 md:p-8 lg:p-12 flex flex-col justify-center relative z-10 overflow-hidden">
        <div className="mb-6 lg:mb-10 border-l-4 border-terminal-green pl-4 lg:pl-6 w-full">
        <h2 className="text-xs lg:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-1 lg:mb-2">{"//"} SYSTEM_DIAGNOSTICS</h2>
        <h3 className="text-3xl md:text-5xl font-terminal text-white">Technical Specs.</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 min-h-0">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-black border border-gray-800 rounded-xl p-3 sm:p-4 lg:p-6 group relative hover:border-terminal-green/50 hover:shadow-[0_4px_20px_rgba(0,255,65,0.05)] transition-all duration-300 flex flex-col min-h-0"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-[#111] border border-terminal-green/20 flex items-center justify-center mb-2 lg:mb-4 shadow-[0_0_15px_rgba(0,255,65,0.1)] group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>

            <h4 className="text-lg lg:text-xl font-terminal text-terminal-green mb-2 lg:mb-4">{cat.title}</h4>
            
            <div className="flex flex-wrap gap-1 lg:gap-2 flex-grow items-start content-start">
              {cat.skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-2 py-1 lg:px-3 lg:py-1.5 rounded-md bg-[#111] border border-gray-800 text-xs lg:text-sm text-gray-300 font-mono group-hover:border-terminal-green/30 transition-colors inline-block"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
