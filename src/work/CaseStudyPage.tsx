import { ArrowLeft, Download, Mail } from "lucide-react";
import { profile, publishedCaseStudies, type CaseStudy } from "../content/profile";

const HOME = import.meta.env.BASE_URL;

function Article({ study }: { study: CaseStudy }) {
  return (
    <article>
      {study.draft && (
        <p className="mb-6 px-3 py-2 rounded-lg border border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-mono text-xs uppercase tracking-widest">
          Draft: visible in local development only, never published
        </p>
      )}

      <p className="text-[11px] md:text-sm font-mono text-terminal-dim uppercase tracking-widest mb-2">{"//"} CASE_STUDY</p>
      <h1 className="text-4xl md:text-6xl font-terminal leading-none mb-4">{study.title}</h1>
      <p className="text-base md:text-lg font-mono text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{study.summary}</p>

      <dl className="grid grid-cols-2 md:grid-cols-[auto_auto_1fr] gap-x-8 gap-y-4 mb-10 font-mono text-sm">
        <div>
          <dt className="text-[11px] text-gray-500 uppercase tracking-widest mb-1">Role</dt>
          <dd className="text-gray-900 dark:text-gray-200">{study.role}</dd>
        </div>
        <div>
          <dt className="text-[11px] text-gray-500 uppercase tracking-widest mb-1">Period</dt>
          <dd className="text-gray-900 dark:text-gray-200">{study.period}</dd>
        </div>
        <div className="col-span-2 md:col-span-1">
          <dt className="text-[11px] text-gray-500 uppercase tracking-widest mb-1">Stack</dt>
          <dd className="flex flex-wrap gap-1.5">
            {study.stack.map((tech) => (
              <span key={tech} className="text-xs px-2 py-0.5 rounded-md border border-terminal-green/20 bg-terminal-green/5 text-terminal-green">
                {tech}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      {study.results.length > 0 && (
        <section aria-labelledby="results-heading" className="hacker-card p-5 md:p-8 mb-12">
          <h2 id="results-heading" className="text-[11px] md:text-xs font-mono text-terminal-dim uppercase tracking-widest mb-4">
            {">_"} Results
          </h2>
          <dl className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {study.results.map((result) => (
              <div key={result.label} className="border-l-2 border-terminal-green/40 pl-3">
                <dt className="sr-only">{result.label}</dt>
                <dd className="text-3xl md:text-4xl font-terminal text-gray-900 dark:text-gray-200 leading-none">{result.value}</dd>
                <dd aria-hidden="true" className="text-xs font-mono text-gray-500 mt-1 leading-snug">{result.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="space-y-10">
        {study.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl md:text-3xl font-terminal mb-3">{section.heading}</h2>
            <div className="space-y-4 font-mono text-[15px] md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside className="hacker-card p-5 md:p-8 mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <p className="font-terminal text-2xl md:text-3xl text-gray-900 dark:text-gray-200 leading-tight">
          Working on a similar problem?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 font-mono">
          <a href={`${HOME}#contact`} className="hacker-btn glitch-hover">
            <Mail size={18} /> Get in touch
          </a>
          <a href={`${HOME}${profile.cvPath}`} download={profile.cvPath} className="hacker-btn hacker-btn-alt glitch-hover">
            <Download size={18} /> Download CV
          </a>
        </div>
      </aside>
    </article>
  );
}

function NotFound() {
  return (
    <div className="hacker-card p-8 text-center">
      <p className="font-terminal text-4xl text-terminal-green mb-3">404 // CASE_NOT_FOUND</p>
      <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-6">This case study doesn't exist or hasn't been published yet.</p>
      <a href={`${HOME}#projects`} className="hacker-btn inline-flex">
        <ArrowLeft size={18} /> See all projects
      </a>
    </div>
  );
}

export function CaseStudyPage({ slug }: { slug: string }) {
  const study = publishedCaseStudies(import.meta.env.DEV).find((item) => item.slug === slug);

  return (
    <div className="h-dvh overflow-y-auto custom-scrollbar bg-gray-100 dark:bg-[#020202] text-gray-800 dark:text-gray-300 font-mono relative selection:bg-terminal-green selection:text-black">
      <div className="crt-overlay fixed inset-0 z-40 pointer-events-none" />
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#050505]/90 backdrop-blur border-b border-gray-300 dark:border-[#111]">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <a
            href={`${HOME}#projects`}
            className="flex items-center gap-2 min-h-11 text-terminal-green text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green rounded"
          >
            <ArrowLeft size={16} /> Back to portfolio
          </a>
          <a href={HOME} className="font-terminal text-xl text-terminal-green" aria-label={`${profile.name} home`}>
            ANDRII_K<span className="blink" aria-hidden="true">_</span>
          </a>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8 md:py-14">
        {study ? <Article study={study} /> : <NotFound />}
      </main>
    </div>
  );
}
