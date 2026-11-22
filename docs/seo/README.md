# SEO / GEO program — unoff.dev

- **Status**: Phase 1 done (this repository), Phase 2 backlog
- **Baseline**: `../../../seo/AUDIT.md` (2026-07-30): one URL on Figma Sites, no h1, no
  canonical, CTAs without `href`, `robots.txt` and `llms.txt` in 404, content rendered 4×,
  1.45 MB on the critical path. Google Search Console is verified by DNS.

## Goal

Present the offer clearly and start ranking on precise, low-competition plugin queries
("figma plugin payments lemon squeezy", "build a penpot plugin"), and be cited by AI
answers. Light program: no blog for now.

## Phase 1 — Static site (done)

| Audit finding | Fix in this repo |
| --- | --- |
| T1 description of another product | `site.defaultDescription`, unique per page |
| T2 no h1 | one h1 per page, h2 per section, FAQ questions as summaries |
| T3 short links | own domains direct; short links only for third-party destinations, final URLs in JSON-LD and llms.txt (`src/config/site.ts`) |
| T4 CTAs not crawlable | every CTA is an `<a href>` |
| T5 no canonical | `Seo.astro`, per page |
| T6 no structured data | Organization (Yelbolt), Person, WebSite, SoftwareApplication with offers, WebPage, HowTo, BreadcrumbList, FAQPage |
| T7 weight, T8 content ×4 | static HTML, one copy of the content, ~30 KB CSS |
| T9 robots / llms | `robots.txt`, `llms.txt`, `llms-full.txt` generated from the data |
| C1 one page | `/figma`, `/penpot`, `/integrations` + 6 integration pages |
| C2 alt on logos | `LogoTile` alt "<Name> logo" outside titled cards |
| C3 FAQ, E-E-A-T | FAQ (5 questions) and author section with `Person` |

## Rules ("do not distort")

1. Every product claim comes from the unoff repositories (`fact-checker`).
2. Commands shown exist in `unoff-cli/src/cli.ts` (USAGE.md lags behind).
3. Prices live in `src/data/pricing.ts` only; JSON-LD offers read it.
4. No thin page: an integration without enough unique material stays unpublished.
5. Slugs are never renamed once published (301 in `netlify.toml` otherwise).
6. English only.

## Phase 2 — Backlog

| Item | Source | Notes |
| --- | --- | --- |
| `/changelog` | `unoff-cli/CHANGELOG.md` | fresh content, generated at build time |
| `/compare/create-figma-plugin` | dated primary sources | factual, dated, re-verified |
| `/pricing` page | `src/data/pricing.ts` | only if "unoff pricing" gets impressions |
| Docs on the domain (`/docs/*` or `docs.unoff.dev`) | Notion docs, CLI README | largest content pool (audit C1) |
| Guides: publish on the Figma Community, build a plugin without code | USAGE.md, skills | |
| Social proof: plugins built with Unoff | owner | unlocks `aggregateRating` later |

## Measurement

GSC (impressions, clicks, queries per page) monthly; check AI answers for "how to build a
figma plugin with payments" and similar prompts.
