import { motion } from "motion/react";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function Projects() {
  const projects = [
    {
      title: "VitaFit",
      status: "ONLINE",
      description:
        "Health & fitness Android app with real-time biometric tracking, multi-device sync, and offline-first architecture built with Jetpack Compose and Health API.",
      tech: ["Kotlin", "Compose", "Health API", "Flow"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      link: "https://github.com/koza4e4ok",
      github: "https://github.com/koza4e4ok",
    },
    {
      title: "CryptoEdge",
      status: "SECURE",
      description:
        "Secure crypto wallet for Android featuring biometric authentication, offline transaction signing, and MVVM clean architecture with encrypted local storage.",
      tech: ["Kotlin", "MVVM", "Biometrics", "Room"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      link: "https://github.com/koza4e4ok",
      github: "https://github.com/koza4e4ok",
    },
    {
      title: "FlowSync",
      status: "ACTIVE",
      description:
        "Task management Android app using WorkManager for reliable background scheduling, RoomDB for local persistence, and Kotlin Coroutines for async processing.",
      tech: ["Kotlin", "WorkManager", "Room DB", "Coroutines"],
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
      link: "https://github.com/koza4e4ok",
      github: "https://github.com/koza4e4ok",
    },
  ];

  return (
    <section
      id="projects"
      className="w-full h-full flex-shrink-0 snap-start snap-always p-2 md:p-4 lg:p-8 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-4 md:p-8 lg:p-12 flex flex-col justify-center relative z-10 overflow-hidden">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-4 lg:mb-8 gap-4 lg:gap-8 w-full"
        >
          <div className="border-l-4 border-terminal-green pl-4 lg:pl-6">
            <motion.h2 variants={itemVariants} className="text-xs lg:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-1 lg:mb-2">
              {">_"} LS PROJECTS/
            </motion.h2>
            <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-terminal text-gray-900 dark:text-gray-200">
              Deployed Systems.
            </motion.h3>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8 min-h-0 flex-1 overflow-hidden"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="bg-white dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-xl flex flex-row md:flex-col group overflow-hidden hover:border-terminal-green/50 hover:shadow-[0_4px_20px_rgba(0,255,65,0.08)] transition-all duration-300 flex-1 min-h-0"
            >
              <div className="hidden lg:block w-full lg:h-24 xl:h-32 relative overflow-hidden border-b border-terminal-green/20 bg-white dark:bg-[#050505] flex-shrink-0">
                <div className="absolute inset-0 bg-terminal-green/20 mix-blend-color group-hover:opacity-0 transition-opacity z-10 pointer-events-none" />
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                />
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 border border-red-900 shadow-lg" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-900 shadow-lg" />
                  <span className="w-3 h-3 rounded-full bg-terminal-green border border-terminal-green shadow-lg" />
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-[#0a0a0a] min-h-0 flex-1 flex flex-col justify-between">
                <div className="min-h-0 overflow-hidden flex flex-col">
                  <div className="flex gap-1 mb-1.5 flex-wrap shrink-0">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] lg:text-[10px] font-mono text-terminal-green bg-terminal-green/10 px-1 py-0.5 rounded border border-terminal-green/20 whitespace-nowrap"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-sm lg:text-base font-terminal mb-1 text-gray-900 dark:text-gray-200 flex items-center gap-1.5 shrink-0 truncate">
                    <FolderGit2 size={12} className="text-terminal-dim shrink-0 hidden lg:block" />
                    <span className="truncate">{project.title}</span>
                  </h4>

                  <p className="text-gray-600 dark:text-gray-400 text-[10px] lg:text-xs leading-tight mb-2 font-mono flex-1 line-clamp-2 md:line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex gap-1.5 pt-1 flex-shrink-0">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View ${project.title} project`}
                    className="hacker-btn flex-1 px-1 py-1 text-[9px] text-center glitch-hover flex items-center justify-center min-h-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-1"
                  >
                    <ExternalLink size={10} className="mr-1 hidden sm:block" /> OPEN
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View ${project.title} on GitHub`}
                    className="hacker-btn hacker-btn-alt px-1 py-1 glitch-hover flex items-center justify-center min-w-[32px] min-h-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-1"
                  >
                    <Github size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
