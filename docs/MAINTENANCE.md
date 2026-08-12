# Maintenance and Release Guide

This guide is for the portfolio owner or a future contributor making routine changes to the content, assets, configuration, and published site. It complements the [architecture guide](ARCHITECTURE.md): use that document for runtime decisions, and use this one for day-to-day editing and release operations.

## Operating principles

The site is a public professional asset. A change should improve the visitor’s understanding of Andrii’s work without compromising the qualities that make the portfolio effective: fast access to the hero, stable mobile layout, accessible interaction, and a coherent terminal visual language.

| Principle | Practical interpretation |
|---|---|
| **Keep source and deploy history aligned.** | Make each related change in one small commit, validate it locally, and let the Pages workflow publish from the default branch. |
| **Protect the first viewport.** | Do not add large images, remote fonts, analytics, animation libraries, or blocking API calls to the initial hero without a measured reason. |
| **Treat motion as enhancement.** | Every new effect requires a reduced-motion treatment and must preserve keyboard and touch usability. |
| **Keep public configuration public.** | Client-side environment values can be visible in the generated bundle; never use them for private keys or personal credentials. |
| **Verify destinations.** | Public CV, email, social, project, and legal links should point to maintained, intentional destinations. |

## Common content updates

### Update professional copy

The portfolio is intentionally content-local. Edit the component that renders the relevant content, then run the standard checks.

| Content to change | File | Validation focus |
|---|---|---|
| Name, role, hero message, headline calls to action | `src/components/Hero.tsx` | Desktop and mobile line wrapping; reserved hero slot height; CTA link behavior. |
| Technical skills and proficiency indicators | `src/components/Skills.tsx` | Category balance, readable labels, color contrast, and reduced-motion presentation. |
| Project title, description, technology tags, and links | `src/components/Projects.tsx` | URL correctness, descriptive link text, card-height consistency, and external-link safety. |
| Career roles, employers, and timeline copy | `src/components/Experience.tsx` | Chronology, text density, mobile layout, and motion fallback. |
| Email, Telegram, and contact-form wording | `src/components/Contact.tsx` | Address accuracy, form labels, submission success/failure messaging, and live-region announcements. |
| Navigation labels and section structure | `src/components/Navbar.tsx` and section components | Fragment targets, active nav state, keyboard navigation, and scroll snapping. |
| Title, description, social cards, canonical URL, or structured data | `index.html` | Final generated HTML, sharing-preview tools, schema validity, and correct `<script>` closing tags. |

### Update projects and social links

Use real, stable public URLs. For a link that opens a new tab, retain both `target="_blank"` and `rel="noreferrer noopener"`. The `noopener` value prevents the new page from receiving a reference to the opener window, and `noreferrer` also omits the referring page URL. [1]

Do not use a placeholder link such as `#` for a portfolio item that claims to be available. If a project is private, explain that succinctly in the card or link to a public case study instead.

### Replace the CV or portrait

The public CV resides at `public/andriikozakov.pdf`. Replace it with a complete, final PDF under the same name unless the hero link is updated at the same time. Verify the file download in a production preview and on the deployed site.

The current `public/avatar.webp` asset is known to be corrupt. Replace it with a valid WebP portrait before displaying or re-enabling it in the interface. Start with a properly cropped image at the largest visible display size multiplied by two for high-density screens, then run image compression and check it at mobile and desktop widths. Provide meaningful alternative text if the portrait conveys information not already present in surrounding text. [2]

## Contact-form configuration

The form posts directly from the browser to the Web3Forms endpoint. The access key is supplied at build time with `VITE_WEB3FORMS_KEY`.

### Local configuration

```bash
cp .env.example .env.local
```

Then set the local value:

```dotenv
VITE_WEB3FORMS_KEY="your-web3forms-access-key"
```

Restart `npm run dev` after changing environment variables. Vite loads `.env` files during startup and exposes only variables beginning with `VITE_` to client-side code. [3]

### Published configuration

1. Open the repository’s **Settings → Secrets and variables → Actions** page.
2. Create or update the `VITE_WEB3FORMS_KEY` repository secret.
3. Push a change to `main`, or manually run the Pages workflow.
4. Submit a test message using the deployed contact form and verify delivery.

> **Security note:** A `VITE_` value is compiled into browser code. It must be safe for a visitor to inspect. Never store mailbox passwords, private API credentials, payment tokens, cloud secrets, or any personally sensitive value in it.

If the key is absent or invalid, the form’s error state is expected. Direct email and Telegram links remain available as fallback contact channels.

## Local verification workflow

A production-quality change follows the sequence below.

```bash
npm install
npm run lint
npm run build
npm run preview
```

| Check | What it catches |
|---|---|
| `npm install` | Dependency and lockfile consistency. |
| `npm run lint` | TypeScript errors and broken imports. |
| `npm run build` | Production-only bundling or HTML parsing failures. |
| `npm run preview` | Asset paths, static routing, rendered metadata, and runtime issues in the compiled build. |
| Browser smoke test | Content correctness, navigation, contact behavior, and visual regressions that a compiler cannot detect. |

When checking the browser, use at least one narrow mobile viewport and one desktop viewport. For meaningful mobile stability coverage, use **360 × 800** and **412 × 915**, which match the project’s current Lighthouse regression profiles.

## Accessibility acceptance checklist

A portfolio should be usable with a keyboard, a screen reader, browser zoom, and user preference overrides. The Web Content Accessibility Guidelines provide the underlying principles: content must be perceivable, operable, understandable, and robust. [4]

| Area | Release check |
|---|---|
| **Keyboard** | Tab through navigation, buttons, controls, form fields, and external links. Focus must remain visible at each stop. |
| **Headings and labels** | Verify headings retain a sensible outline and every form control retains a visible associated `<label>`. |
| **Status messages** | Submit empty and valid contact forms. Screen-reader users must receive the success or error update from the polite live region. |
| **Links** | Use descriptive labels, preserve external-link safety attributes, and avoid URLs as the only visible link name when a meaningful name is possible. |
| **Color and contrast** | Ensure terminal green, cyan, muted copy, and error states remain readable in both visual themes. Do not use color as the only error signal. |
| **Zoom and reflow** | Check at 200% browser zoom and on a narrow viewport; no essential control should be clipped or dependent on horizontal scrolling. |
| **Reduced motion** | Enable reduced motion in the operating system or browser emulator. Canvas activity and decorative transitions must stop or simplify without hiding content. |
| **Sound and haptics** | Confirm sound is silent by default, the toggle is labelled, and lack of vibration support does not change functionality. |

## Performance acceptance checklist

Run a Lighthouse audit after changes to the first viewport, fonts, media, CSS, canvas behavior, or client-side dependencies. Use a cold profile whenever possible and compare results to the baseline in the README and architecture guide.

| Metric | Current lab reference | Guardrail |
|---|---:|---|
| Desktop performance score | 96 | Investigate material regressions. |
| Mobile performance score | 88–92 | Avoid changes that make both representative profiles regress. |
| Mobile LCP | 2.2–2.5 s | Preserve the hero’s small initial path and font preload strategy. |
| Mobile CLS | 0.043–0.068 | Maintain reserved hero slots and typewriter measurement layout. |
| Mobile TBT | 30–70 ms | Avoid new eager runtime work, especially animation libraries or third-party scripts. |

Lighthouse is a controlled lab diagnostic. It does not substitute for field measurements from actual visitors, and one isolated run should not be used to judge a change without considering test variance. [5]

### Do not regress these intentional optimizations

- Do not make the deferred sections eager in `App.tsx` without reviewing initial JavaScript and mobile LCP.
- Do not import Motion into the hero or top-level navigation merely for a small visual effect; use existing CSS-first patterns where possible.
- Do not remove the hidden measurement span or absolute overlay from `TypewriterText.tsx`.
- Do not remove hero subtitle, copy, or CTA slot reservations from `index.css` without checking mobile CLS.
- Do not add remote font imports; keep terminal fonts self-hosted and preloaded.
- Do not start continuous canvas rendering while the tab is hidden or the pointer is idle.

## Release and deployment procedure

The GitHub Pages workflow runs whenever a commit is pushed to `main` or `master`; `workflow_dispatch` also supports manual publication. [6]

1. Make the change in a focused branch or working copy.
2. Run `npm run lint && npm run build`.
3. Preview the production output and run the relevant browser checks.
4. Review `git diff` and confirm no local environment files, audit JSON files, or temporary artifacts are included accidentally.
5. Commit with a concise, descriptive message.
6. Push to `main`.
7. Open the repository’s **Actions** tab and confirm **Deploy static content to Pages** completes successfully.
8. Visit [kozakov.me](https://kozakov.me/) and verify the changed area after the deployment completes.

The Pages workflow uses `npm install`, builds with the `VITE_WEB3FORMS_KEY` Actions secret, uploads `dist/`, then deploys the artifact. Configuration changes to Node, build scripts, dependencies, public assets, or the custom domain should therefore be tested through both `npm run build` and a completed workflow run.

## Troubleshooting

| Symptom | Likely cause | Resolution |
|---|---|---|
| Blank page after deployment | An HTML parsing error, especially in document-level structured data, can prevent the module entry script from loading. | Run `npm run build`; inspect `index.html`; ensure JSON-LD uses a literal `</script>` closing tag rather than an escaped closing tag. |
| Site displays an older version | CDN/browser caching or a deployment still in progress. | Check the Pages workflow status, use a private window or hard refresh, and allow cache propagation time. |
| Contact form shows failure | Missing or invalid `VITE_WEB3FORMS_KEY`, rejected provider configuration, or network interruption. | Check the repository secret, redeploy, test the provider configuration, and use direct contact links as fallback. |
| Navigation highlight does not update | A section ID changed or deferred section markup no longer matches the active-section hook expectations. | Verify section IDs, placeholder IDs, navigation targets, and `useActiveSection` behavior after lazy mounts. |
| Mobile layout jumps | An element in the hero now changes height after first paint. | Recheck typewriter measurement layout and hero slot reservation styles at 360 px and 412 px. |
| First load becomes noticeably slower | A dependency, font, media file, or eager module grew the initial path. | Review bundle output, restore deferred loading, optimize the asset, and rerun Lighthouse. |
| Background uses excessive CPU | A canvas loop is rendering too often or fails to pause. | Verify reduced-motion, document-visibility, and idle-pointer guards in the relevant canvas component. |
| Sound plays without consent | Audio was initialized or a handler bypasses the toggle state. | Trace calls through `audioEngine` and ensure the default persisted setting remains disabled. |

## Housekeeping

Keep generated artifacts out of source commits unless there is a clear, documented reason to retain them. In particular, local Lighthouse JSON reports, screenshots, temporary HTML backups, node modules, and personal `.env.local` files should not be treated as application source.

Review dependencies periodically and remove packages that no longer appear in source imports. A smaller dependency graph reduces security surface area, installation time, and the chance of accidental client-side bloat.

## References

[1]: https://developer.mozilla.org/docs/Web/HTML/Reference/Attributes/rel/noopener "MDN: rel=noopener"
[2]: https://www.w3.org/WAI/tutorials/images/ "W3C WAI: Images Tutorial"
[3]: https://vite.dev/guide/env-and-mode.html#env-variables "Vite: Environment Variables and Modes"
[4]: https://www.w3.org/WAI/standards-guidelines/wcag/ "Web Content Accessibility Guidelines"
[5]: https://developer.chrome.com/docs/lighthouse/performance/performance-scoring "Lighthouse Performance Scoring"
[6]: https://docs.github.com/actions "GitHub Actions documentation"
