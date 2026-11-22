# Building a page

## 1. Source

- Figma file `OCuxjzljBCvDse4Lb57EhK`, unoff home frame `1:3813` (sections: Jumbotron
  `1:3815`, Summary `1:3894`, Shape `1:3905`, Wire `1:3912`, Supercharge `1:3921`, Who
  `1:3927`, Compare `1:3932`, Pricing `1:3981`, Faq `1:4038`, Me `1:4052`, Footer `1:4060`).
  New pages have no frame: compose them from layout-patterns.md.
- **Product facts** come from, in order: `../unoff-cli/templates/` and `src/cli.ts` (what
  ships), `README.md`, `CHANGELOG.md`, `USAGE.md` (lags behind); `../unoff-ui/`;
  `../unoff-skills/unoff-create-plugin/` (patterns, not always shipped);
  `../unoff-claude-plugin/README.md`. Commands must exist in `src/cli.ts`. The template is
  Preact + Vite (React-compatible); unoff-ui and unoff-utils are MIT, the CLI and skills
  MPL 2.0.

## 2. Page file

Data in `src/data/`, a view in `src/components/<area>/`, a short page in `src/pages/`.
`BaseLayout` takes `title`, `description`, `jsonLd` (builders of `structured-data.ts`:
`organization`, `person`, `website`, `softwareApplication`, `webPage`, `howTo`, `faqPage`,
`breadcrumbs`, `pageBreadcrumbs`). One `h1`, `h2` per section, `h3` per card.

## 3. Site-wide files

- `src/config/site.ts` for nav and links: `links` (short links for third-party destinations) and `destinations` (final URLs, for JSON-LD and llms.txt).
- `src/pages/llms.txt.ts` (one line) and `llms-full.txt.ts` (full text).
- `src/plugins/sitemap-lastmod.mjs` when the page reads a new data file.
- Every non-home page emits a `BreadcrumbList`; link a new page from at least 2 pages.
- Slugs are never renamed once published (301 in `netlify.toml` if unavoidable).

## 4. Verify

1. `npm run build` (0 errors).
2. HTML audit of `dist/`: one h1, title and description lengths, canonical, JSON-LD parses,
   internal links are `<a href>`, no `<div>` in `<p>`, alt on logos.
3. Screenshots 1280 and 390, light and dark; no horizontal scroll at 390.
4. Motion: during/after reveal, reduced motion, no JS.
5. Preview on a free port (`npx astro preview --port <n>`), never stop a server on 4321.
