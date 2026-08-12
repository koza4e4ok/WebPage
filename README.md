# Andrii Kozakov — Personal Brand Website

This repository contains the source code for **[kozakov.me](https://kozakov.me/)**, Andrii Kozakov’s personal brand and software-engineering portfolio. The site is a fast, single-page React application that presents experience, selected work, technical skills, and contact details through a deliberately retro-terminal interface.

The visual system is intentionally expressive without making the page dependent on heavy initial-load animation. The first screen renders immediately, while the lower portfolio sections and their animation runtime are loaded only when the visitor reaches them. The site is published as a static build on GitHub Pages through the repository’s deployment workflow.

## Project at a glance

| Area | Implementation |
|---|---|
| **Live site** | [kozakov.me](https://kozakov.me/) |
| **Application model** | Client-side, single-page React portfolio |
| **Core stack** | React 19, TypeScript, Vite 6, Tailwind CSS 4 |
| **Motion and icons** | Motion for React and Lucide React |
| **Hosting** | GitHub Pages with a custom domain |
| **Contact delivery** | Web3Forms public form endpoint |
| **Design language** | Responsive hacker-console / CRT terminal aesthetic |
| **Default branch** | `main` |

## Product and interaction overview

The site is structured as a focused professional narrative rather than a conventional multi-page brochure. The top navigation anchors to a hero, skills, projects, experience, and contact sequence inside a scroll-snapping terminal shell. The interaction design adds feedback selectively: terminal-style transitions, hover states, a typewriter boot sequence, restrained canvas effects, opt-in sound, and optional haptic feedback on capable devices.

| Visitor-facing area | Purpose | Notable implementation details |
|---|---|---|
| **Hero** | Establishes the professional identity and primary calls to action. | Typewriter copy reserves final layout dimensions to prevent layout shift; CSS entrance effects avoid loading the animation runtime on the first route. |
| **Navigation** | Provides in-page wayfinding and direct section access. | Active-section tracking, accessible focus handling, scanline transition, sound toggle, and haptic-aware interactions. |
| **Skills, projects, and experience** | Communicate capabilities and evidence of work. | Loaded on demand after their snap-scroll placeholders enter the main scroll viewport. |
| **Contact** | Offers direct email, Telegram, and contact-form channels. | Client-side validation, status announcements for assistive technology, and Web3Forms submission when configured. |
| **Ambient terminal layer** | Reinforces the visual identity without blocking content. | Matrix and interactive particle canvases pause when hidden, respect reduced motion, and avoid continuous idle work. |

## Technology

The codebase is intentionally small and static. Vite compiles and bundles the React application, while Tailwind supplies utility-first styling and the project’s custom CSS supplies the CRT, scanline, terminal, and accessibility layers. React’s `lazy` and `Suspense` APIs support deferred sections, and Motion is isolated into a separate bundle for animation-heavy sections. [1] [2]

| Layer | Primary responsibility |
|---|---|
| **React + TypeScript** | Typed component composition, state, browser interaction, and code splitting. |
| **Vite** | Local development server, optimized production build, static asset handling, and chunk output. |
| **Tailwind CSS** | Responsive utility styling, dark-mode variants, spacing, sizing, and component composition. |
| **Custom CSS** | Fonts, theme tokens, CRT overlays, glitch treatments, hero layout reservations, focus states, and reduced-motion overrides. |
| **Motion** | Deferred in-view reveals and interaction feedback in lower sections. |
| **Web APIs** | Intersection Observer, Canvas 2D, Web Audio, Vibration, `localStorage`, and `prefers-reduced-motion`. |
| **GitHub Actions + Pages** | Repeatable build and static deployment on changes to the default branch. |

## Repository layout

```text
.
├── .github/workflows/deploy.yml    # GitHub Pages build and deployment workflow
├── docs/
│   ├── ARCHITECTURE.md             # Runtime and component architecture
│   └── MAINTENANCE.md              # Content, operations, and troubleshooting guide
├── public/
│   ├── fonts/                      # Self-hosted JetBrains Mono and VT323 web fonts
│   ├── CNAME                       # Custom-domain configuration for GitHub Pages
│   └── ...                         # Static assets, downloadable CV, favicon, health check
├── src/
│   ├── components/                 # Page sections and reusable interaction components
│   ├── hooks/                      # Active-section, count-up, and haptic hooks
│   ├── lib/audioEngine.ts          # Opt-in procedural terminal audio
│   ├── App.tsx                     # Application shell and deferred-section composition
│   └── index.css                   # Global design system, responsive rules, motion safeguards
├── .env.example                    # Optional local contact-form configuration
├── index.html                      # Metadata, JSON-LD, font preloads, and application entry point
├── package.json                    # Scripts and dependencies
└── vite.config.ts                  # Vite, Tailwind, aliases, and bundle chunk strategy
```

> **Architecture detail:** Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) before changing lazy-loading, canvas, audio, or navigation behavior. Those systems are coordinated to preserve visual quality without degrading first-load performance.

## Local development

### Prerequisites

Use a current Node.js LTS release. The deployment workflow uses Node.js 20, so using Node.js 20 or a compatible later LTS release locally minimizes environment differences. [3]

### Start the site

```bash
git clone https://github.com/koza4e4ok/WebPage.git
cd WebPage
npm install
cp .env.example .env.local
npm run dev
```

The development server listens on `http://localhost:3000`. The contact form is optional during local work; leave `VITE_WEB3FORMS_KEY` empty if form delivery is not being tested.

### Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the Vite development server on port 3000 and binds to all local interfaces. |
| `npm run build` | Produces the optimized static site in `dist/`. |
| `npm run preview` | Serves the production build locally for a final smoke test. |
| `npm run lint` | Runs TypeScript type checking without emitting files. |
| `npm run clean` | Removes the generated `dist/` directory. |

A standard pre-push verification is:

```bash
npm run lint && npm run build
```

## Configuration and contact form

The only optional runtime build variable is listed below. Copy `.env.example` to `.env.local` for local development; do not commit `.env.local`.

| Variable | Required | Used by | Notes |
|---|---|---|---|
| `VITE_WEB3FORMS_KEY` | No | `src/components/Contact.tsx` | Enables direct submission through the Web3Forms endpoint. The form remains visible without it, but delivery will fail until a valid key is configured. |

Variables prefixed with `VITE_` are replaced into the client bundle by Vite. Treat the Web3Forms access key as public service configuration, **not as a private server credential**, and never place personal tokens, API secrets, or private keys in this variable. [4]

For the published site, add `VITE_WEB3FORMS_KEY` as a GitHub Actions repository secret. The deployment workflow passes it only to the build command, where Vite embeds the configured value into the generated static contact-form code.

## Deployment

Every push to `main` (or `master`) triggers `.github/workflows/deploy.yml`. The workflow installs dependencies, runs the Vite production build, uploads `dist/` as the Pages artifact, and deploys it to the GitHub Pages environment. It can also be started manually from the repository’s **Actions** tab. [5]

| Deployment concern | Where to manage it |
|---|---|
| **Source of truth** | `main` branch |
| **Build command** | `npm run build` |
| **Public artifact** | `dist/` |
| **Custom domain** | `public/CNAME` and GitHub Pages repository settings |
| **Contact-form configuration** | `VITE_WEB3FORMS_KEY` repository secret |
| **Deployment status** | GitHub repository → Actions → “Deploy static content to Pages” |

After changing files that affect rendered content, push the commit and confirm that the Pages workflow reaches a successful deployment. A published build should then be checked at [kozakov.me](https://kozakov.me/) in a private browser window or a fresh device profile.

## Performance engineering

The portfolio favors a rich visual identity while protecting Core Web Vitals. The performance strategy keeps the initial route narrow, delays off-screen work, and prevents intentional animations from introducing unstable layout.

| Measure | Implementation |
|---|---|
| **Initial JavaScript** | The hero and navigation load immediately; skills, projects, experience, and contact sections are lazy-loaded only once their placeholders enter the main scroll viewport. |
| **Vendor isolation** | React and Motion are emitted as separate chunks; Motion is not part of the initial hero-only route. |
| **Font delivery** | JetBrains Mono and VT323 are self-hosted and preloaded, removing the render dependency on an external font CDN. |
| **Layout stability** | Hero copy uses final-size reservations; typewriter text renders in an absolute overlay over a hidden final-text measurement span. |
| **Canvas workload** | Matrix and particle effects respect reduced motion, pause in hidden tabs, and remain idle unless there is relevant visual activity. |
| **Progressive rendering** | `DeferredSection` maintains the snap-scroll geometry while delaying lower-section DOM, images, and reveal animations. |

The latest recorded local Lighthouse snapshots measured the following outcomes after the final layout-stability pass. Results depend on device, network, browser version, cache state, and test configuration; they are a useful regression baseline rather than a permanent production guarantee. [6]

| Audit profile | Performance score | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|
| Desktop | 96 | 1.3 s | 2.3 s | 80 ms | 0.043 |
| Mobile — 360 × 800 | 88 | 2.2 s | 2.5 s | 30 ms | 0.068 |
| Mobile — 412 × 915 | 92 | 1.9 s | 2.2 s | 70 ms | 0.043 |

The long-term thresholds remain **LCP ≤ 2.5 seconds**, **INP ≤ 200 milliseconds**, and **CLS ≤ 0.1** at the 75th percentile of real-user page views. Lighthouse’s Total Blocking Time is a lab diagnostic, rather than the field replacement for INP, but it remains useful for detecting unnecessary main-thread work during local regression tests. [7]

## Accessibility and user preference support

Accessibility is part of the component contract, not an afterthought. Navigation and controls have programmatic labels, external links use safe `rel` attributes, form inputs have associated labels, form status is announced with a polite live region, and interactive elements retain visible focus feedback.

All nonessential motion is covered by a project-level `prefers-reduced-motion` fallback. When the user requests reduced motion, CSS motion stops and the canvas systems avoid decorative animation. The same preference must be honored by any future animation, including Motion variants, new CSS keyframes, and WebGL or video effects. [8]

Sound effects are **opt-in**. The audio toggle defaults to off and persists the visitor’s choice locally. Haptic feedback is conditional on the browser’s Vibration API and safely does nothing where the capability is unavailable.

## Content maintenance

The portfolio copy is deliberately stored close to its view components, keeping a small personal site straightforward to maintain. Edit the corresponding component and run the build before publishing.

| Update | Primary file |
|---|---|
| Hero copy, CV call-to-action, and top-level identity | `src/components/Hero.tsx` |
| Navigation labels and utility controls | `src/components/Navbar.tsx` |
| Skill categories and proficiency presentation | `src/components/Skills.tsx` |
| Featured work, external project URLs, and project summaries | `src/components/Projects.tsx` |
| Career timeline | `src/components/Experience.tsx` |
| Email, Telegram, and contact-form copy | `src/components/Contact.tsx` |
| Metadata, Open Graph images, canonical URL, and JSON-LD | `index.html` |
| Global colors, typography, motion rules, and responsive polish | `src/index.css` |
| Static CV, favicon, fonts, and domain configuration | `public/` |

### Known maintenance items

| Item | Why it matters | Recommended action |
|---|---|---|
| `public/avatar.webp` | The current source asset is corrupted and may not render reliably. | Replace it with a valid, optimized WebP portrait, then verify the hero at desktop and mobile widths. |
| Project links | Placeholder destinations weaken the credibility of a professional portfolio. | Replace placeholders in `Projects.tsx` with real GitHub or case-study URLs. |
| Professional social link | A LinkedIn endpoint is not yet represented. | Add the verified public profile URL when available. |
| Typewriter visual completion | The intentional boot sequence can increase Lighthouse Speed Index even when LCP and CLS pass. | Keep it as a brand choice, or replace it with a CSS-only reveal if a higher lab score is more important. |

Operational guidance, editing routines, and troubleshooting steps are available in [docs/MAINTENANCE.md](docs/MAINTENANCE.md).

## Contribution conventions

This is a personal portfolio, but changes should follow the same quality bar as a production front-end project. Keep the terminal visual language coherent, use TypeScript rather than untyped browser logic, preserve mobile layout stability, and verify the reduced-motion experience before merging.

Do not add external media, tracking, fonts, or client-side services casually. Each addition should have a clear user benefit, a privacy rationale, an accessibility review, and a performance budget. Any third-party asset must have an appropriate license and should be optimized before placement in `public/`.

## References

[1]: https://react.dev/reference/react/lazy "React lazy"
[2]: https://vite.dev/guide/features.html#async-chunk-loading-optimization "Vite: Async Chunk Loading Optimization"
[3]: https://nodejs.org/en/about/previous-releases "Node.js Release Schedule"
[4]: https://vite.dev/guide/env-and-mode.html#env-variables "Vite: Environment Variables and Modes"
[5]: https://docs.github.com/actions "GitHub Actions documentation"
[6]: https://developer.chrome.com/docs/lighthouse/overview "Lighthouse overview"
[7]: https://web.dev/articles/vitals "Web Vitals"
[8]: https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-motion "MDN: prefers-reduced-motion"
