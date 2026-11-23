# unoff.dev

Static Astro site of Unoff, built with the **@unoff/ui** design system (theme `yelbolt`,
modes `yelbolt-uno-light|dark`) for full control over SEO and GEO. Design source: Figma
file `OCuxjzljBCvDse4Lb57EhK`, frame `1:3813`. Forked from `website-ui-color-palette`.

## Load before working

| Task | Skill |
| --- | --- |
| Any page, section, component, style, motion change | `unoff-website` (then the reference file it points to) |
| Any SEO/GEO, metadata, structured data, content change | `seo-geo` |
| Astro how-tos | `astro` |

## Routing (agents in `.claude/agents/`)

Entry point: `claude --agent site-orchestrator`. In any session:

- **Content = SEO**: copy, titles, descriptions, FAQ, headings, links, new page →
  `seo-reviewer` (+ `fact-checker` when product facts are stated).
- **Style**: markup, CSS, components, layout, motion, dark mode → `style-guardian`.
- Pure code or a verified one-line fix → no reviewer.

## Non-negotiables

- Everything is a card: `.surface-card` (static), `<a class="card">` (clickable),
  `.title-card` (section intro).
- Colours, type, spacing, radii only from @unoff/ui variables / `--site-*` roles. No hex
  (exceptions in the skill's tokens.md). The library wins over Figma hex values.
- Real `<a href>` for navigation, native `<details>` for disclosures; content in the HTML
  at build time; complete with no JS and with reduced motion.
- Light and dark both work. One `<h1>`, unique title and description, JSON-LD per page.
- Product claims come from `../unoff-cli/`, `../unoff-skills/`, `../unoff-ui/`,
  `../unoff-claude-plugin/` and `../seo/`, never from memory.
- Third-party links in the pages use the `uno.ylb.lt` short links; own domains, JSON-LD
  and llms.txt use final URLs (`destinations` in `src/config/site.ts`).

## Code comments

Comments are rare. Code, names and tokens carry the "what"; a comment exists only for a
**why** the reader cannot recover from the code. Reading noise is a defect. The default
is no comment; when in doubt, leave it out.

**Delete test**: remove the comment and reread the code. If a reader loses nothing they
could not get from the code in a few seconds, the comment stays deleted.

Keep (short, one to three lines):

- a non-obvious constraint, browser quirk or workaround, with the reason;
- an invariant or **keep-in-sync** link between two files (e.g. the REVEAL selector list
  in `motion.css` and `reveal.ts`);
- a module header that states a file's role when it is not evident from its name;
- a documented exception to a rule (a hex value, a `!important`, an a11y trade-off);
- JSDoc on a shared helper, type or prop only for what its name and type cannot say: a
  unit, a format, a trust level, a side effect, a non-obvious rendering rule.

Do not write:

- comments that restate the next line or the selector (`/* Header */`, `// loop over items`);
- JSDoc or prop docs that paraphrase the name or the type (`/** The docs URL. */ docs`,
  `/** Every platform page. */ platformPages`);
- module headers that only repeat the file name or list what the file obviously contains;
- `TODO`, `FIXME`, `XXX`, `HACK` or "to validate" markers: open work goes in a GitHub
  issue or the relevant `docs/` file, never in the code;
- narration of a change or its history ("now centred", "fixed", "added for the Menu toggle");
- section banners and decorative separators, except one per long CSS file where it aids
  navigation;
- commented-out code (git has it);
- a comment on every block "for consistency".

When editing code, leave the existing comments that still hold true, update those your
change made false, delete the ones that fail the delete test, and add none by default.

## Shared core

These files come from `website-ui-color-palette` and are shared with `website-yelbolt`.
Port a fix made in one repo to the others:

- `src/styles/global.css`, `motion.css`, `unoff-links.css`, `consent.css`; `src/scripts/reveal.ts`
- `src/components/seo/Seo.astro`; `src/components/ui/` Button, TertiaryLink, Tag,
  IconTile, IntroCardSection, StackSection, StepsSection, TableSection, TextCardsSection,
  CodeSnippet
- `src/data/structured-data.ts` (generic builders), `src/plugins/sitemap-lastmod.mjs`
- `postcss.config.mjs`, `astro.config.mjs`, `scripts/unoff-tokens.mjs`
- `netlify/dev-functions.mjs`, `netlify/functions/consent.mjs` (counter of the banner's
  outcomes, read with `CONSENT_STATS_TOKEN`)

Diverged on purpose here: `tokens.css` (roles on `[data-mode]`), `BaseLayout` +
`scripts/scheme.ts` (mode from `site.mode`), `Button` (`icon-end` slot), `StackSection`
(`minmax(0, 1fr)` column), `LineGrid`, `LogoTile`, `FeatureCard`.

## Where things live

- Pages `src/pages/`, components `src/components/`, copy and links `src/data/`,
  `src/config/site.ts`, styles `src/styles/`.
- Integration pages: `src/data/integrations.ts` → `components/integrations/IntegrationPageView`.
  Platform pages: `src/data/platform-pages.ts` → `components/platform/PlatformPageView`.
- SEO program and backlog: `docs/seo/README.md`.

## Commands

- `npm run build` — spinner token, `astro check` (must be 0 errors), build to `dist/`.
- `npm run dev` — use another port than 4321 for your own server; never stop the user's.
  Preview: `npx astro preview --port <n>`.
- Don't commit unless asked.
