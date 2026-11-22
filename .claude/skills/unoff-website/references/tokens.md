# Tokens

All values come from **@unoff/ui** (theme `yelbolt`, modes `yelbolt-uno-light|dark`).
`<html>` carries `data-theme="yelbolt"`, `data-scheme="light|dark"` and
`data-mode="yelbolt-uno-<scheme>"`, set before paint from the saved choice or the system
setting (`BaseLayout`, `scripts/scheme.ts`). Source: `src/styles/tokens.css`.

## Colour roles (use these first)

| Role | Variable | Maps to |
| --- | --- | --- |
| Page background | `--site-surface` | `--global-background-color-default` |
| Muted surface (grooves, illustration lines) | `--site-surface-muted` | `--color-background-secondary-default` |
| Text | `--site-ink` | `--color-text-primary-default` |
| Strong border | `--site-border-strong` | `--color-border-tertiary-strong` |
| Soft border | `--site-border-soft` | `--color-border-secondary-default` |
| Light under the grids | `--brand-glow-a/b/c`, `--brand-gradient` | brand background, icon, strong border |

Roles are declared on `[data-mode]`, not on `:root`: a custom property resolves where it is
declared, so a block that wears another mode (`data-mode-base`) would otherwise keep the
root's colours.

When a role is missing, use the semantic variable
(`--color-{background|border|text|icon}-{primary|secondary|tertiary|brand|inverse|…}-{default|…}`),
never a primitive and never a hex.

### Allowed exceptions

- Logo tiles: each brand's own colour (`tile` in `src/data/logos.ts`).
- Terminal snippets stay dark in both modes: `--snippet-*` from Yelbolt primitives
  (`--uno-1/5/8`, syntax `--tcn-3`, `--uicp-3`, `--isb-3`).
- Home illustrations stay as drawn in Figma in both modes: `--illustration-*` and
  `--mark-*` (tokens.css) from UNO primitives.
- Editors' own UI in the illustrations (Figma plugin window, Pro controls, each editor's
  primary button): `src/data/editor-ui.ts`.

The Figma file's hex values differ slightly from the library primitives (`UNO/2` #e0deff vs
`--uno-2` #cfceff). The library wins; change a colour in unoff-ui, not here.

## Typography

`--font-display` Martian Mono, `--font-text` Lexend (self-hosted). Classes:
`.t-main-title` (56), `.t-section-title` (40), `.t-paragraph-primary-title` (32),
`.t-paragraph-secondary-title` (24), `.t-accent` (24), `.t-tagline` (24); body 16/24.
Terminal blocks use `--text-code-size` (20, fluid).

## Spacing, radii, layout

- Gutter `--layout-gutter` (8px), section gap `--layout-section-gap` (80px), card padding
  `--space-inset-800` (32px), inner gaps `--space-gap-400`.
- The Yelbolt theme defines `--space-gap-025/050/100/200/400/600/800` and
  `--space-inset-025…600/800`. **There is no `--space-gap-300`**: it resolves to nothing.
- Radii: `--site-radius-card` (16), `--site-radius-inner` (8), `--site-radius-pill`.
- Never `calc()` with spacing tokens (`--space-none` is a unitless 0).

## Density overrides

@unoff/ui is sized for plugin panels. Overrides go in the
`:root[data-theme='yelbolt'][data-mode]` block of tokens.css, through variables only.

## CSS weight

`postcss.config.mjs` drops rules of other themes and modes. A new mode goes in `KEEP_MODES`
(keep in sync with `site.mode`). The icon stylesheet is stubbed in `astro.config.mjs`.
