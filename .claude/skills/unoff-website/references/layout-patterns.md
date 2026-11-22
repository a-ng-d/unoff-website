# Layout patterns

Every section is `<section class="section …" aria-labelledby="…">`. Breakpoints:
`1023.98px`, `799.98px`, `639.98px`. Desktop rules first, `max-width` overrides.

| Pattern | Example | Grid |
| --- | --- | --- |
| Hero in a line grid | `home/Jumbotron` | `LineGrid`, content max 960px, code block, CTA, tags |
| Title card + demo + 3 link cards | `home/Summary` | 3 cols; title rows 1–2, demo cols 2–3 rows 1–2, cards row 3 |
| Mosaic (`.mosaic__grid`) | `home/Shape`, `home/Wire`, `home/Supercharge` | `--mosaic-columns` (3), 540px rows; `.mosaic__wide`, `.mosaic__tall`, `.mosaic__title`; 2 cols < 1024, 1 < 640 |
| Title alone on its row | `home/Wire` | title col 2 row 1, cards rows 2–3 |
| Tall title + persona cards | `home/Audience` | 3 cols, all tall |
| Comparison table | home `TableSection` | intro card on top, table full width |
| Pricing | `home/Pricing` | areas `title hobby learner / title supporter learner` |
| Sticky intro + FAQ | `home/Faq` (`IntroCardSection`) | `0.5fr 1fr` |
| Author | `home/Author` | one straight title card, portrait + quote (`h2`) + bio |
| Page hero | `platform/PlatformHero` | `LineGrid` (40 rows), slot `visual` |
| Platform page | `platform/PlatformPageView` (`data/platform-pages.ts`) | hero, summary, build steps, template table, publish steps, FAQ, next steps |
| Integration page | `integrations/IntegrationPageView` (`data/integrations.ts`) | hero with logo, summary, steps, table, FAQ, related |
| Hub | `pages/integrations.astro` | hero + `.mosaic__grid` of `FeatureCard`s + next steps |

Grid children that may hold long code need `min-width: 0` (or a `minmax(0, 1fr)` track),
otherwise the column grows past the screen.
