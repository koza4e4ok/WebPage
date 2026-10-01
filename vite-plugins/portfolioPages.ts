import type { Plugin } from 'vite';
import { profile, publishedCaseStudies, type CaseStudy } from '../src/content/profile';

const CASE_META = '<!--case-study-meta-->';
const PERSON_JSON_LD = '<!--person-json-ld-->';

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function caseStudyHead(study: CaseStudy | undefined): string {
  const title = study ? `${study.title} — ${profile.name}` : `Case study — ${profile.name}`;
  const description = study?.summary ?? profile.metaDescription;
  const url = study ? `${profile.siteUrl}/work/${study.slug}/` : `${profile.siteUrl}/`;
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${profile.siteUrl}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(study && !study.draft ? [] : ['<meta name="robots" content="noindex" />']),
  ].join('\n    ');
}

function personJsonLd(): string {
  const { links } = profile;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: profile.siteUrl,
    image: `${profile.siteUrl}/avatar.webp`,
    jobTitle: profile.title,
    description: profile.metaDescription,
    email: links.email,
    sameAs: [links.github, links.telegram, links.linkedin].filter(Boolean),
    knowsAbout: profile.knowsAbout,
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function sitemap(studies: CaseStudy[]): string {
  const urls = [`${profile.siteUrl}/`, ...studies.map((study) => `${profile.siteUrl}/work/${study.slug}/`)];
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');
}

/**
 * Generates content-driven HTML: Person JSON-LD, one static page per published
 * case study at /work/<slug>/ (so each has its own title and preview card), a
 * sitemap, and the Cloudflare Web Analytics beacon when a token is configured.
 */
export function portfolioPages({ analyticsToken }: { analyticsToken?: string }): Plugin {
  let isBuild = false;

  return {
    name: 'portfolio-pages',
    configResolved(config) {
      isBuild = config.command === 'build';
    },
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && /^\/work\/[^/?#]+\/?(\?.*)?$/.test(req.url)) req.url = '/work.html';
        next();
      });
    },
    transformIndexHtml(html, ctx) {
      let out = html.replace(PERSON_JSON_LD, personJsonLd());
      const slug = ctx.originalUrl?.match(/\/work\/([^/?#]+)/)?.[1];
      if (slug) {
        out = out.replace(CASE_META, caseStudyHead(publishedCaseStudies(!isBuild).find((study) => study.slug === slug)));
      }
      if (isBuild && analyticsToken) {
        const beacon = `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({ token: analyticsToken })}'></script>`;
        out = out.replace('</head>', `  ${beacon}\n  </head>`);
      }
      return out;
    },
    generateBundle: {
      // Runs after Vite has emitted the HTML entries into the bundle.
      order: 'post',
      handler(_options, bundle) {
        const template = bundle['work.html'];
        if (!template || template.type !== 'asset') return;
        const html = String(template.source);
        delete bundle['work.html'];

        const studies = publishedCaseStudies(false);
        for (const study of studies) {
          this.emitFile({
            type: 'asset',
            fileName: `work/${study.slug}/index.html`,
            source: html.replace(CASE_META, caseStudyHead(study)),
          });
        }
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap(studies) });
      },
    },
  };
}
