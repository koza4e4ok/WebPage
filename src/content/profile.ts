/**
 * Single source of truth for the portfolio's text and links.
 *
 * Fields marked "OPTIONAL — hidden while empty" are not rendered anywhere
 * until they contain real data, so the live site never shows filler.
 * Only add facts you can back up in an interview.
 */

export interface ProofPoint {
  /** Short, scannable figure, e.g. "400k" or "99.9%". */
  value: string;
  /** What the figure means, e.g. "monthly active users". */
  label: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Project {
  title: string;
  status: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  github: string;
  /** Slug of a case study in `caseStudies`; adds a "Case study" button. */
  caseStudy?: string;
  /** True while the entry is sample content awaiting real work. */
  placeholder?: boolean;
}

export interface Role {
  company: string;
  companyUrl: string | null;
  role: string;
  period: string;
  summary: string;
  /** OPTIONAL — hidden while empty. 2–3 measurable outcomes, one line each. */
  highlights: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "Engineering Manager, DataArt" */
  title: string;
}

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
}

export interface CaseStudy {
  /** URL segment: the page is published at /work/<slug>/ */
  slug: string;
  title: string;
  /** One or two sentences; also used as the page's meta description. */
  summary: string;
  role: string;
  period: string;
  stack: string[];
  results: ProofPoint[];
  sections: CaseStudySection[];
  /** Drafts are visible in `npm run dev` only and never published. */
  draft?: boolean;
}

export const profile = {
  name: "Andrii Kozakov",
  title: "Senior Android Engineer",
  statusBadge: "System Secure & Ready",
  yearsExperience: 12,
  bio: "12+ years shipping Android apps with Kotlin and Jetpack Compose. I lead modular architecture, delivery pipelines, and code review, and turn complex requirements into apps that teams can keep changing safely.",
  /** Used in search results and link previews. */
  metaDescription:
    "Senior Android Engineer with 12+ years of experience building Kotlin and Jetpack Compose applications. Modular architecture, delivery pipelines, and code quality.",
  siteUrl: "https://kozakov.me",
  cvPath: "andriikozakov.pdf",
  /** OPTIONAL — hidden while empty. Up to 3 figures shown under the hero CTAs. */
  proofPoints: [] as ProofPoint[],
  links: {
    github: "https://github.com/koza4e4ok",
    email: "koza4e4ok@gmail.com",
    telegram: "https://t.me/koza4e4ok",
    telegramHandle: "@koza4e4ok",
    /** OPTIONAL — hidden while empty, e.g. "https://www.linkedin.com/in/<handle>/" */
    linkedin: "",
  },
  knowsAbout: [
    "Kotlin",
    "Jetpack Compose",
    "Android",
    "MVVM",
    "Clean Architecture",
    "CI/CD",
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: "CORE_ANDROID",
    skills: ["Kotlin", "Jetpack Compose", "Coroutines", "Flow", "Dagger Hilt"],
  },
  {
    title: "ARCHITECTURE",
    skills: [
      "MVVM",
      "MVI",
      "Clean Architecture",
      "Modularization",
      "Unit Testing",
    ],
  },
  {
    title: "DELIVERY_&_TOOLS",
    skills: [
      "Retrofit",
      "Room",
      "WorkManager",
      "Firebase",
      "Git",
      "GitHub Actions CI/CD",
    ],
  },
];

// TODO(content): these three entries are placeholders. Replace them with real
// work (Play Store / repo links and real screenshots), then delete `placeholder`.
export const projects: Project[] = [
  {
    title: "VitaFit",
    status: "ONLINE",
    description:
      "Health & fitness Android app with real-time biometric tracking, multi-device sync, and offline-first architecture built with Jetpack Compose and Health API.",
    tech: ["Kotlin", "Compose", "Health API", "Flow"],
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    link: "https://github.com/koza4e4ok",
    github: "https://github.com/koza4e4ok",
    placeholder: true,
  },
  {
    title: "CryptoEdge",
    status: "SECURE",
    description:
      "Secure crypto wallet for Android featuring biometric authentication, offline transaction signing, and MVVM clean architecture with encrypted local storage.",
    tech: ["Kotlin", "MVVM", "Biometrics", "Room"],
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    link: "https://github.com/koza4e4ok",
    github: "https://github.com/koza4e4ok",
    placeholder: true,
  },
  {
    title: "FlowSync",
    status: "ACTIVE",
    description:
      "Task management Android app using WorkManager for reliable background scheduling, RoomDB for local persistence, and Kotlin Coroutines for async processing.",
    tech: ["Kotlin", "WorkManager", "Room DB", "Coroutines"],
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    link: "https://github.com/koza4e4ok",
    github: "https://github.com/koza4e4ok",
    placeholder: true,
  },
];

export const experience: Role[] = [
  {
    company: "DataArt Solutions, Inc.",
    companyUrl: "https://www.dataart.com",
    role: "SENIOR ANDROID ENGINEER",
    period: "2021 — PRESENT",
    summary:
      "Leading development of multi-module Android applications using Jetpack Compose and modern architecture. Mentoring junior developers, conducting code reviews, and implementing CI/CD pipelines with GitHub Actions.",
    highlights: [],
  },
  {
    company: "Unicreo",
    companyUrl: "https://unicreo.com/",
    role: "ANDROID DEVELOPER",
    period: "2016 — 2021",
    summary:
      "Full-cycle Android development from project estimation and architecture design through to Google Play delivery. Owned feature development, code quality, and release management.",
    highlights: [],
  },
  {
    company: "Digital Horizon",
    companyUrl: null,
    role: "JUNIOR SOFTWARE ENGINEER",
    period: "2014 — 2016",
    summary:
      "Contributed to cross-platform and native Android projects. Gained deep experience with Java, XML layouts, and REST API integrations.",
    highlights: [],
  },
];

/** OPTIONAL — the Testimonials section and nav item appear once this has entries. Keep quotes under ~300 characters. */
export const testimonials: Testimonial[] = [];

/**
 * Case studies are published at /work/<slug>/. Copy the template below,
 * replace every [bracketed prompt], drop `draft`, and link it from a project.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "template",
    draft: true,
    title: "[Project or initiative name]",
    summary:
      "[One or two sentences: what you changed, for whom, and the headline result.]",
    role: "[Your role, e.g. Tech lead, team of 6]",
    period: "[Year — Year]",
    stack: ["Kotlin", "Jetpack Compose"],
    results: [
      { value: "[X%]", label: "[metric that improved]" },
      { value: "[N]", label: "[second metric]" },
    ],
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "[The product, its users and scale, and where it stood when you joined.]",
        ],
      },
      {
        heading: "Problem",
        paragraphs: [
          "[What was broken or limiting, and why it mattered to the business or users.]",
        ],
      },
      {
        heading: "Constraints",
        paragraphs: [
          "[Deadlines, team size, legacy code, compliance — what limited the options.]",
        ],
      },
      {
        heading: "Options considered",
        paragraphs: [
          "[Two or three approaches and the trade-offs you weighed between them.]",
        ],
      },
      {
        heading: "What I did",
        paragraphs: [
          "[The decision, how you rolled it out, and how you brought the team along.]",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "[Measured results, what you would do differently, and what the team kept using.]",
        ],
      },
    ],
  },
];

export function publishedCaseStudies(includeDrafts: boolean): CaseStudy[] {
  return caseStudies.filter((study) => includeDrafts || !study.draft);
}
