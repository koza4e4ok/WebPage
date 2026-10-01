import { motion } from "motion/react";
import { ExternalLink, Github, FolderGit2, FileText } from "lucide-react";
import { playConfirm, playHover, playTick } from "../lib/audioEngine";
import { haptic } from "../hooks/useHaptic";
import { useCarousel } from "../hooks/useCarousel";
import { CarouselDots } from "./CarouselDots";
import { projects, publishedCaseStudies } from "../content/profile";

const caseStudySlugs = new Set(publishedCaseStudies(import.meta.env.DEV).map((study) => study.slug));

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function Projects() {
  const carousel = useCarousel<HTMLDivElement>();

  return (
    <section
      id="projects"
      className="w-full h-full flex-shrink-0 snap-start snap-always p-1 sm:p-2 md:p-4 lg:p-8 compact:p-2 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl mx-auto h-full hacker-card p-2.5 sm:p-4 md:p-8 lg:p-12 compact:p-6 flex flex-col justify-center relative z-10 overflow-hidden">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-5 short:mb-3 md:mb-2 lg:mb-8 compact:mb-4 gap-2 lg:gap-8 w-full shrink-0"
        >
          <div className="border-l-4 border-terminal-green pl-2.5 lg:pl-6">
            <motion.h2 variants={itemVariants} className="text-[11px] sm:text-xs lg:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-1 lg:mb-2">
              {">_"} LS PROJECTS/
            </motion.h2>
            <motion.h3 variants={itemVariants} className="text-3xl short:text-2xl sm:text-3xl md:text-5xl compact:text-4xl font-terminal text-gray-900 dark:text-gray-200">
              Deployed Systems.
            </motion.h3>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          ref={carousel.ref}
          className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-3 md:gap-6 lg:gap-8 min-h-0 md:flex-1 custom-scrollbar mobile-scrollbar-none -mx-2 px-2 md:mx-0 md:px-0"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              onMouseEnter={playHover}
              className="w-[85%] sm:w-[280px] md:w-auto shrink-0 snap-center md:shrink bg-white dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-xl flex flex-col group overflow-hidden hover:border-terminal-green/50 hover:shadow-[0_4px_20px_rgba(0,255,65,0.08)] transition-all duration-300 min-h-0"
            >
              <div className="block md:hidden lg:block w-full h-32 short:h-20 lg:h-24 xl:h-32 relative overflow-hidden border-b border-terminal-green/20 bg-white dark:bg-[#050505] flex-shrink-0">
                <div className="absolute inset-0 bg-terminal-green/20 mix-blend-color group-hover:opacity-0 transition-opacity z-10 pointer-events-none" />
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title} project interface`}
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

              <div className="p-4 md:p-3 bg-gray-50 dark:bg-[#0a0a0a] min-h-0 flex-1 flex flex-col justify-between">
                <div className="min-h-0 overflow-hidden flex flex-col">
                  <div className="flex gap-1 mb-3 short:mb-2 md:mb-1.5 flex-wrap shrink-0">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] md:text-[9px] lg:text-[10px] font-mono text-terminal-green bg-terminal-green/10 px-1.5 md:px-1 py-0.5 rounded border border-terminal-green/20 whitespace-nowrap"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-xl md:text-sm lg:text-base font-terminal mb-1 text-gray-900 dark:text-gray-200 flex items-center gap-1.5 shrink-0 truncate">
                    <FolderGit2 size={12} className="text-terminal-dim shrink-0 hidden lg:block" />
                    <span className="truncate">{project.title}</span>
                  </h4>

                  <p className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[10px] lg:text-xs leading-snug md:leading-tight mb-4 short:mb-3 md:mb-2 font-mono flex-1 short:line-clamp-3 md:line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {project.caseStudy && caseStudySlugs.has(project.caseStudy) && (
                  <a
                    href={`${import.meta.env.BASE_URL}work/${project.caseStudy}/`}
                    onClick={() => { playConfirm(); haptic("confirm"); }}
                    onMouseEnter={playTick}
                    className="hacker-btn w-full mb-2 md:mb-1.5 px-1 py-1 text-xs md:text-[9px] md:leading-normal glitch-hover flex items-center justify-center min-h-11 md:min-h-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-1"
                  >
                    <FileText size={12} className="mr-1" /> Case study
                  </a>
                )}

                <div className="flex gap-2 md:gap-1.5 pt-1 flex-shrink-0">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View ${project.title} project`}
                    title={`View ${project.title} project`}
                    onClick={() => { playConfirm(); haptic("confirm"); }}
                    onMouseEnter={playTick}
                    className="hacker-btn flex-1 px-1 py-1 text-xs md:text-[9px] md:leading-normal text-center glitch-hover flex items-center justify-center min-h-11 md:min-h-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-1"
                  >
                    <ExternalLink size={12} className="mr-1" /> OPEN
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View ${project.title} on GitHub`}
                    title={`View ${project.title} on GitHub`}
                    onClick={() => { playConfirm(); haptic("confirm"); }}
                    onMouseEnter={playTick}
                    className="hacker-btn hacker-btn-alt px-1 py-1 glitch-hover flex items-center justify-center min-w-11 md:min-w-[32px] min-h-11 md:min-h-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-1"
                  >
                    <Github size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <CarouselDots
          labels={projects.map((project) => project.title)}
          active={carousel.index}
          onSelect={carousel.scrollToIndex}
          groupLabel="Projects"
        />
      </div>
    </section>
  );
}
