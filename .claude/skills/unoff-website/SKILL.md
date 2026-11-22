---
name: unoff-website
description: Design system, intentions and conventions of the Unoff website (unoff.dev, this Astro repo). Use whenever you create, migrate or change a page or section of this site — e.g. "add an integration page", "build /changelog", "add a section", "change the hero", "new card", "tweak the animation", "dark mode issue" — and before choosing a component, a colour, a layout or a motion for it. Covers the card-based visual language, @unoff/ui tokens (Yelbolt UNO modes) and components, the line grid and its light, layout patterns, the reveal motion, SEO/GEO rules specific to the site, and the checklist to ship a new page.
---

# Unoff website

Static Astro build of unoff.dev on **@unoff/ui** (theme `yelbolt`, modes
`yelbolt-uno-light|dark`), forked from the UI Color Palette website. Generic how-tos live in
the `astro` and `seo-geo` skills; this skill holds what is specific to this site.

| Task | Read |
| --- | --- |
| Any visual decision | [design-intent.md](references/design-intent.md) |
| Colours, type, spacing, radii, dark mode | [tokens.md](references/tokens.md) |
| Picking a component, button, link, icon, tag, card | [components.md](references/components.md) |
| Composing a section or a page grid | [layout-patterns.md](references/layout-patterns.md) |
| Reveal, line grid light, spotlight, shards | [motion.md](references/motion.md) |
| Building a page end to end | [new-page.md](references/new-page.md) |

## Non-negotiables

1. **Everything is a card** on an 8px gutter. Static content: `.surface-card`; clickable
   card: `<a class="card">`; section intro: `.title-card`.
2. **Colours only from @unoff/ui variables** (`--site-*` roles, semantic `--color-*`).
   Exceptions are listed in tokens.md (logo tiles, terminal primitives).
   **The library is the source of truth**, not the hex values of the Figma file.
3. **Real `<a href>`** for navigation, native `<details>` for disclosures. Content in the
   HTML at build time; complete with no JS and with reduced motion.
4. **Light and dark both work.** One `<h1>`, unique title (≤ ~60) and description
   (120–160), JSON-LD per page.
5. **Product claims come from the unoff sources** (see new-page.md), never from memory.
6. **Comments only for a non-obvious why** (repo `CLAUDE.md`, "Code comments").

## Where things live

```
src/config/site.ts        metadata, mode, nav, links (short) and destinations (final URLs)
src/data/                 home.ts, pricing.ts, faq.ts, integrations.ts, platform-pages.ts,
                          logos.ts, blocks.ts, structured-data.ts (schema.org builders)
src/styles/tokens.css     @unoff/ui imports + site roles ([data-mode]) + density overrides
src/styles/global.css     base, .t-* type, .title-card, .mosaic__grid, .illustration-lines, .logo-tile
src/styles/motion.css     reveal sequence, line/shade grid light, spotlight, shards
src/scripts/reveal.ts     IntersectionObserver for reveal + pausing loops
src/scripts/scheme.ts     light/dark switching (data-scheme → data-mode, nested [data-mode-base])
src/scripts/consent.ts    cookie banner (vanilla-cookieconsent); third-party content (the Supademo
                          demo) loads only on consent, from `iframe[data-consent-src]`
src/components/ui/        Button, TertiaryLink, Tag, LineGrid, LogoTile, FeatureCard, sections
postcss.config.mjs        drops @unoff/ui rules of other themes/modes (KEEP_MODES)
```

## Shared core

The files listed in `CLAUDE.md` ("Shared core") come from `website-ui-color-palette`. A fix
there is ported here and to `website-yelbolt` by hand.

## Agents (`.claude/agents/`)

`site-orchestrator` is the entry point. It builds site changes itself and calls, only when
needed: `seo-reviewer` (content), `fact-checker` (product claims), `style-guardian`
(markup, CSS, motion).
