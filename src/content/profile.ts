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
  /** Short badge in the card header, e.g. "15M+ USERS". */
  status: string;
  /** Who the product was for; client names stay anonymous under NDA. */
  client: string;
  role: string;
  description: string;
  tech: string[];
  /** OPTIONAL — real screenshot only; the card shows a terminal header without it. */
  image?: string;
  /** OPTIONAL — public store or product URL. */
  link?: string;
  /** OPTIONAL — public repository URL. */
  github?: string;
  /** Slug of a case study in `caseStudies`; adds a "Case study" button once published. */
  caseStudy?: string;
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
  bio: "12+ years building Android apps in Kotlin and Java, from estimation and architecture to Google Play release. I lead teams, design multi-module apps, and ship products with demanding security, offline, and real-time requirements.",
  /** Used in search results and link previews. */
  metaDescription:
    "Senior Android Engineer and team lead with 12+ years of experience: multi-module Kotlin and Jetpack Compose apps, streaming media for 15M+ users, secure healthcare apps, and real-time video communication.",
  siteUrl: "https://kozakov.me",
  cvPath: "andriikozakov.pdf",
  /** OPTIONAL — hidden while empty. Up to 3 figures shown under the hero CTAs. */
  proofPoints: [
    { value: "15M+", label: "users on a streaming app I led" },
    { value: "20", label: "max people per WebRTC call" },
    { value: "2", label: "products as team or tech lead" },
  ] as ProofPoint[],
  links: {
    github: "https://github.com/koza4e4ok",
    email: "koza4e4ok@gmail.com",
    telegram: "https://t.me/koza4e4ok",
    telegramHandle: "@koza4e4ok",
    /** OPTIONAL — hidden while empty, e.g. "https://www.linkedin.com/in/<handle>/" */
    linkedin: "https://www.linkedin.com/in/andrii-kozakov-b67724a5/",
  },
  knowsAbout: [
    "Android",
    "Kotlin",
    "Java",
    "Jetpack Compose",
    "Multi-module architecture",
    "MVVM",
    "Offline-first apps",
    "Android security",
    "WebRTC",
    "CI/CD",
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: "CORE_ANDROID",
    skills: [
      "Kotlin",
      "Java",
      "Jetpack Compose",
      "Coroutines & Flow",
      "Navigation 3",
      "Media3 / ExoPlayer",
    ],
  },
  {
    title: "ARCHITECTURE",
    skills: [
      "MVVM",
      "MVP",
      "Multi-module",
      "Dagger2 / Hilt",
      "Offline-first sync",
      "Keystore & SQLCipher",
    ],
  },
  {
    title: "DELIVERY_&_QUALITY",
    skills: [
      "JUnit & Espresso",
      "UI Automator",
      "Screenshot tests",
      "GitLab CI/CD",
      "Google Play releases",
      "Sentry & Crashlytics",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Media Streaming Platform",
    status: "15M+ USERS",
    client: "Global entertainment company",
    role: "Senior developer · Team lead",
    description:
      "24/7 streaming, breaking news, video playlists, and galleries for 15M+ users. I led the Android team, designed the multi-module architecture, and built the Shopify + Google Pay shop and the ExoPlayer news and video modules.",
    tech: [
      "Kotlin",
      "Coroutines",
      "Dagger2",
      "ExoPlayer",
      "Shopify",
      "Google Pay",
    ],
  },
  {
    title: "Dementia Care Tablet Suite",
    status: "TECH LEAD",
    client: "US-based healthcare provider",
    role: "Tech lead",
    description:
      "Two offline-first tablet apps that help people with dementia and their caregivers organise daily life. Architected from scratch: Compose with Navigation 3, WorkManager sync, on-device media, and MDM-managed kiosk devices.",
    tech: [
      "Compose",
      "Navigation 3",
      "WorkManager",
      "Room",
      "Media3",
      "ML Kit",
    ],
    caseStudy: "dementia-care-tablets",
  },
  {
    title: "Medical Therapy App",
    status: "SECURE",
    client: "Healthcare client",
    role: "Android developer",
    description:
      "Therapy programs with encrypted storage (Android Keystore, SQLCipher), Play Integrity, root and debug detection, biometric sign-in, offline sync, custom progress charts, and an event calendar. Shipped to Google Play.",
    tech: ["Kotlin", "Flow", "Hilt", "Room", "SQLCipher", "Biometrics"],
  },
  {
    title: "Secure Video Communication",
    status: "REAL-TIME",
    client: "European company, email-server partner",
    role: "Android developer",
    description:
      "Video conferencing and messaging for small businesses: WebRTC calls with up to 20 participants, real-time chat with document, audio, and video previews, incoming-call notifications, and accounts across multiple servers.",
    tech: ["Java", "WebRTC", "SignalR", "RxJava", "Realm", "MVP"],
  },
];

export const experience: Role[] = [
  {
    company: "DataArt Solutions, Inc.",
    companyUrl: "https://www.dataart.com",
    role: "SENIOR SOFTWARE DEVELOPER",
    period: "2021 — PRESENT",
    summary:
      "Team lead and tech lead on Android products for media and healthcare clients: architecture from scratch, estimation and planning, code review, testing, and CI/CD.",
    highlights: [
      "Led the Android team of a streaming app for 15M+ users; split it into independent feature modules",
      "Tech lead for two offline-first Compose tablet apps deployed in MDM kiosk mode",
      "Secured a therapy app with Keystore and SQLCipher encryption plus Play Integrity checks",
    ],
  },
  {
    company: "Unicreo",
    companyUrl: "https://unicreo.com/",
    role: "SOFTWARE DEVELOPER",
    period: "2016 — 2021",
    summary:
      "Full-cycle Android development from project estimation and architecture design through to Google Play delivery, working directly with clients on features.",
    highlights: [
      "Built WebRTC video conferencing for up to 20 participants with real-time chat and file sharing",
      "Designed the MVP + DI architecture and shipped releases to Google Play",
    ],
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
    slug: "dementia-care-tablets",
    draft: true,
    title: "Offline-first tablet apps for dementia care",
    summary:
      "Two tablet apps for a US healthcare provider that help people with dementia and their caregivers organise daily activities, built from scratch to work with little or no internet on locked-down devices.",
    role: "Tech lead",
    period: "[Year — Year]",
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Navigation 3",
      "Hilt",
      "WorkManager",
      "Room",
      "Media3",
      "ML Kit",
      "MDM",
    ],
    results: [
      { value: "2", label: "apps designed from scratch" },
      { value: "[N]", label: "[devices or users rolled out to]" },
    ],
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "A US-based healthcare provider needed two dedicated systems to improve the caregiving experience for people with dementia and help them organise their day. Both run on tablets with limited or no internet access, need specific accessibility features, and are managed through an MDM system.",
          "[Who uses each app, and how many people or devices it serves.]",
        ],
      },
      {
        heading: "Problem",
        paragraphs: [
          "[What was hard for patients and caregivers before, and why the client needed new apps.]",
        ],
      },
      {
        heading: "Constraints",
        paragraphs: [
          "The apps had to work offline first, handle video, audio, image, and text content stored on the device, and run in kiosk mode with device functionality restricted through MDM.",
          "[Team size, deadlines, and any other limits.]",
        ],
      },
      {
        heading: "Options considered",
        paragraphs: [
          "[The approaches you weighed, e.g. for navigation, sync, or content storage, and why you chose what you did.]",
        ],
      },
      {
        heading: "What I did",
        paragraphs: [
          "I designed the architecture from scratch as a multi-module project split into independent feature modules. The UI is built in Jetpack Compose, with all screens combined under one main navigation using Navigation 3.",
          "Sync workers built on WorkManager keep data current when a connection is available, and dedicated managers download and store mixed media content on the device. I also built the pipeline that uploads app updates through the MDM system and set up devices in kiosk mode, and integrated Crashlytics and analytics.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "[What changed for users or the client, measured if possible, and what you would do differently.]",
        ],
      },
    ],
  },
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
