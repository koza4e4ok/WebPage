import { motion } from "motion/react";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "VitaFit Mobile Engine",
      status: "ONLINE",
      description: "Real-time biometric visualization matrix and multi-device synchronization engine across secure channels.",
      tech: ["Compose", "Health API"],
      image: "https://picsum.photos/seed/vitafithack/800/600",
      link: "#",
      github: "#"
    },
    {
      title: "CryptoEdge Protocol",
      status: "SECURE",
      description: "Secure wallet architecture initialized with biometric protocols and offline synchronization algorithms.",
      tech: ["Security", "MVVM"],
      image: "https://picsum.photos/seed/cryptohack/800/600",
      link: "#",
      github: "#"
    },
    {
      title: "FlowSync Task Daemon",
      status: "ACTIVE",
      description: "Project management ecosystem using RoomDB daemons and background thread execution.",
      tech: ["Room DB", "WorkManager"],
      image: "https://picsum.photos/seed/taskerhack/800/600",
      link: "#",
      github: "#"
    }
  ];

  return (
    <section id="projects" className="w-full h-full flex-shrink-0 snap-start snap-always p-2 md:p-4 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-4 md:p-8 lg:p-12 flex flex-col justify-center relative z-10 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 lg:mb-8 gap-4 lg:gap-8 w-full">
        <div className="border-l-4 border-terminal-green pl-4 lg:pl-6">
          <h2 className="text-xs lg:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-1 lg:mb-2">{">_"} LS PROJECTS/</h2>
          <h3 className="text-3xl md:text-5xl font-terminal text-white">Deployed Systems.</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8 min-h-0 flex-1 overflow-hidden">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-black border border-gray-800 rounded-xl flex flex-row md:flex-col group overflow-hidden hover:border-terminal-green/50 hover:shadow-[0_4px_20px_rgba(0,255,65,0.05)] transition-all duration-300 flex-1 min-h-0"
          >
            {/* Image is only shown on larger vertical screens to save space on strict 100vh grids */}
            <div className="hidden lg:block w-full lg:h-24 xl:h-32 relative overflow-hidden border-b border-terminal-green/20 bg-black flex-shrink-0">
              <div className="absolute inset-0 bg-terminal-green/20 mix-blend-color group-hover:opacity-0 transition-opacity z-10 pointer-events-none" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                 <span className="w-3 h-3 rounded-full bg-red-500 border border-red-900 shadow-lg" />
                 <span className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-900 shadow-lg" />
                 <span className="w-3 h-3 rounded-full bg-terminal-green border border-terminal-green shadow-lg" />
              </div>
            </div>

            <div className="p-3 bg-[#0a0a0a] min-h-0 flex-1 flex flex-col justify-between">
              <div className="min-h-0 overflow-hidden flex flex-col">
                <div className="flex gap-1 mb-1.5 flex-wrap shrink-0">
                  {project.tech.map(t => (
                    <span key={t} className="text-[9px] lg:text-[10px] font-mono text-terminal-green bg-terminal-green/10 px-1 py-0.5 rounded border border-terminal-green/20 whitespace-nowrap">
                      {t}
                    </span>
                  ))}
                </div>

                <h4 className="text-sm lg:text-base font-terminal mb-1 text-white flex items-center gap-1.5 shrink-0 truncate">
                  <FolderGit2 size={12} className="text-terminal-dim shrink-0 hidden lg:block" /> 
                  <span className="truncate">{project.title}</span>
                </h4>
                
                <p className="text-gray-400 text-[10px] lg:text-xs leading-tight mb-2 font-mono flex-1 line-clamp-2 md:line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="flex gap-1.5 pt-1 flex-shrink-0">
                <a href={project.link} className="hacker-btn flex-1 px-1 py-1 text-[9px] text-center glitch-hover flex items-center justify-center min-h-[26px]">
                  <ExternalLink size={10} className="mr-1 hidden sm:block" /> OPEN
                </a>
                <a href={project.github} className="hacker-btn hacker-btn-alt px-1 py-1 glitch-hover flex items-center justify-center min-w-[32px] min-h-[26px]">
                  <Github size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
