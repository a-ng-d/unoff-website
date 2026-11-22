# Components

Reuse @unoff/ui for visuals, keep native HTML for behaviour.

| Need | Use | Not |
| --- | --- | --- |
| Button or button-styled link | `ui/Button.astro` (`variant`, `size`, `block`, `iconOnly`; slots `icon`, `icon-end` for a right arrow) | @unoff/ui `<Button>` (navigates in JS) |
| Text link in nav, footer | `ui/TertiaryLink.astro` — never inside a `<p>` | — |
| Pill label, platform tag | `ui/Tag.astro` (`size`, `as`, `href` renders a link, `tone="brand"` filled) | Chip |
| Clickable card | `<a class="card">`, or `FeatureCard` with `href` | @unoff/ui `<Card>` |
| Static card | `.surface-card` | — |
| Section intro in a mosaic | `.title-card` (+ `--straight`) | — |
| Card with illustration + info | `ui/FeatureCard.astro` (`title`, `text`, `tag`, `href`, `media` top/bottom, default slot = an `.illustration-lines` frame) | — |
| Editor button in an illustration | `ui/EditorButton.astro` (`editor`, `scheme`, `disabled`, `tilt`) | @unoff/ui `<Button>` |
| Brand logo with shards | `ui/LogoTile.astro` (`logo` id of `data/logos.ts`, `tilt`, `size`, `index`, `decorative`) | inline SVG |
| Hero frame with light | `ui/LineGrid.astro` (`count`, `rowHeight`; slot = content) | — |
| Icon in a tile | `ui/IconTile.astro` (ids in `data/blocks.ts`) | — |
| Icon | `@lucide/astro/icons/<name>` (brand icons are not in Lucide: use `data/logos.ts` or `assets/icons/*-mono.svg`) | @unoff/ui `<Icon>` |
| FAQ | `home/Faq.astro` (native `<details>`) | @unoff/ui `<Accordion>` |
| Steps, tables, text cards | `ui/StepsSection`, `ui/TableSection`, `ui/TextCardsSection` | — |
| Terminal line | `.code-snippet` + `__command` / `__verb` / `__argument` spans, `{' '}` between spans (Astro drops whitespace between elements) | — |
| Terminal pill in an illustration | `.code-pill` (Figma "Command" / "Chat"); `.illustration-fit` shrinks a composition in a narrow frame | — |

Illustrations inside cards are decorative (`aria-hidden`); the card title carries the
meaning. Fake controls in illustrations are `<span class="text-button …">`, never focusable.
A logo not inside a titled card gets `alt="<Name> logo"`.
