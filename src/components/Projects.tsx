import { motion } from "motion/react";
import { ExternalLink, Github, FileText } from "lucide-react";
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

const BUTTON_BASE =
  "hacker-btn px-1 py-1 text-xs md:text-[10px] md:leading-normal glitch-hover flex items-center justify-center min-h-11 md:min-h-[30px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:ring-offset-1";

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

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
          className="flex flex-col md:flex-row md:items-end justify-between mb-5 short:mb-3 md:mb-6 lg:mb-8 compact:mb-4 gap-2 lg:gap-8 w-full shrink-0"
        >
          <div className="border-l-4 border-terminal-green pl-2.5 lg:pl-6">
            <motion.h2 variants={itemVariants} className="text-[11px] sm:text-xs lg:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-1 lg:mb-2">
              {">_"} LS PROJECTS/
            </motion.h2>
            <motion.h3 variants={itemVariants} className="text-3xl short:text-2xl sm:text-3xl md:text-5xl compact:text-4xl font-terminal text-gray-900 dark:text-gray-200">
              Deployed Systems.
            </motion.h3>
          </div>
          <motion.p variants={itemVariants} className="hidden md:block font-mono text-xs text-gray-500 max-w-xs md:text-right">
            Client products under NDA. Names withheld, details from my own work.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          ref={carousel.ref}
          className="flex md:grid md:grid-cols-2 overflow-x-auto snap-x snap-mandatory gap-3 md:gap-5 lg:gap-6 compact:gap-3 min-h-0 custom-scrollbar mobile-scrollbar-none -mx-2 px-2 md:mx-0 md:px-0"
        >
          {projects.map((project) => {
            const hasCaseStudy = project.caseStudy !== undefined && caseStudySlugs.has(project.caseStudy);
            const hasActions = hasCaseStudy || project.link || project.github;
            return (
              <motion.article
                key={project.title}
                variants={itemVariants}
                onMouseEnter={playHover}
                className="w-[85%] sm:w-[320px] md:w-auto shrink-0 snap-center md:shrink bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl flex flex-col group overflow-hidden hover:border-terminal-green/50 hover:shadow-[0_4px_20px_rgba(0,255,65,0.08)] transition-all duration-300 min-h-0"
              >
                <div className="flex items-center gap-2 px-3 py-2 short:py-1.5 border-b border-terminal-green/20 bg-white dark:bg-[#050505] shrink-0">
                  <span className="flex gap-1.5 shrink-0" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-terminal-green/80" />
                  </span>
                  <span className="font-mono text-[11px] text-gray-500 truncate">~/clients/{slugify(project.title)}</span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-widest text-terminal-green bg-terminal-green/10 border border-terminal-green/30 rounded px-1.5 py-0.5">
                    {project.status}
                  </span>
                </div>

                {project.image && (
                  <div className="block md:hidden lg:block w-full h-32 short:h-20 lg:h-24 xl:h-32 relative overflow-hidden border-b border-terminal-green/20 flex-shrink-0">
                    <div className="absolute inset-0 bg-terminal-green/20 mix-blend-color group-hover:opacity-0 transition-opacity z-10 pointer-events-none" />
                    <img
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}

                <div className="p-4 short:p-3 lg:p-5 compact:p-3 min-h-0 flex-1 flex flex-col">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-gray-500 mb-1 truncate">{project.client}</p>
                  <h4 className="text-xl lg:text-2xl compact:text-xl font-terminal leading-none text-gray-900 dark:text-gray-200 mb-1">
                    {project.title}
                  </h4>
                  <p className="font-mono text-xs text-terminal-green mb-2 short:mb-1.5">{project.role}</p>

                  <p className="text-gray-600 dark:text-gray-400 text-[13px] md:text-xs lg:text-[13px] leading-snug font-mono mb-3 short:mb-2 compact:mb-2 short:line-clamp-6 compact:line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex gap-1 flex-wrap mt-auto" aria-label={`${project.title} technologies`}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] md:text-[10px] font-mono text-terminal-green bg-terminal-green/10 px-1.5 py-0.5 rounded border border-terminal-green/20 whitespace-nowrap"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {hasActions && (
                    <div className="flex gap-2 md:gap-1.5 pt-3 short:pt-2 flex-shrink-0">
                      {hasCaseStudy && (
                        <a
                          href={`${import.meta.env.BASE_URL}work/${project.caseStudy}/`}
                          onClick={() => { playConfirm(); haptic("confirm"); }}
                          onMouseEnter={playTick}
                          className={`${BUTTON_BASE} flex-1`}
                        >
                          <FileText size={12} className="mr-1" /> Case study
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`Open ${project.title}`}
                          title={`Open ${project.title}`}
                          onClick={() => { playConfirm(); haptic("confirm"); }}
                          onMouseEnter={playTick}
                          className={`${BUTTON_BASE} flex-1`}
                        >
                          <ExternalLink size={12} className="mr-1" /> Open
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`View ${project.title} on GitHub`}
                          title={`View ${project.title} on GitHub`}
                          onClick={() => { playConfirm(); haptic("confirm"); }}
                          onMouseEnter={playTick}
                          className={`${BUTTON_BASE} hacker-btn-alt min-w-11 md:min-w-[32px]`}
                        >
                          <Github size={12} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
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
