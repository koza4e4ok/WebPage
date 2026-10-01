import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { testimonials } from "../content/profile";
import { useCarousel } from "../hooks/useCarousel";
import { CarouselDots } from "./CarouselDots";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function Testimonials() {
  const carousel = useCarousel<HTMLUListElement>();
  const items = testimonials.slice(0, 3);

  return (
    <section
      id="testimonials"
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
            {"//"} PEER_REVIEW.LOG
          </motion.h2>
          <motion.h3 variants={itemVariants} className="text-3xl short:text-2xl sm:text-3xl md:text-5xl compact:text-4xl font-terminal text-gray-900 dark:text-gray-200">
            What colleagues say.
          </motion.h3>
        </motion.div>

        <motion.ul
          ref={carousel.ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={`flex md:grid ${items.length > 1 ? "md:grid-cols-2" : ""} ${items.length > 2 ? "lg:grid-cols-3" : ""} overflow-x-auto snap-x snap-mandatory gap-3 md:gap-6 min-h-0 custom-scrollbar mobile-scrollbar-none -mx-2 px-2 md:mx-0 md:px-0`}
        >
          {items.map((item) => (
            <motion.li
              key={item.name}
              variants={itemVariants}
              className={`${items.length > 1 ? "w-[85%]" : "w-full"} md:w-auto shrink-0 snap-center md:shrink bg-white dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-xl p-5 short:p-4 lg:p-6 flex flex-col justify-between gap-4`}
            >
              <figure className="flex flex-col gap-4 h-full justify-between">
                <blockquote className="font-mono text-sm short:text-[13px] md:text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
                  <Quote size={18} className="text-terminal-green mb-2" aria-hidden="true" />
                  {item.quote}
                </blockquote>
                <figcaption className="border-t border-terminal-green/20 pt-3">
                  <div className="font-terminal text-lg text-terminal-green leading-none">{item.name}</div>
                  <div className="font-mono text-xs text-gray-500 mt-1">{item.title}</div>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
        {items.length > 1 && (
          <CarouselDots
            labels={items.map((item) => item.name)}
            active={carousel.index}
            onSelect={carousel.scrollToIndex}
            groupLabel="Testimonials"
          />
        )}
      </div>
    </section>
  );
}
