# Design intent

## Personality

- **A developer toolkit shown as a toolkit.** Decoration is made of the product's own
  material: terminal lines, code, the rows of a plugin panel, service logos. No stock
  illustration.
- **Technological, calm, crafted.** Motion evokes a screen: a spinner, a scan line, light
  running under the rows. Slow and fine, never bouncy.
- **Monospace for statements, humanist sans for reading.** Martian Mono 700 for titles,
  Lexend 500 for text (same type scale as the UI Color Palette site).

## The card system

- A mosaic of **cards on an 8px gutter**, 16px radius, 1px border.
- **Two border strengths**: strong for content cards, soft for title cards.
- **Title cards** (`.title-card`) introduce a section inside the mosaic, title at the bottom,
  tilted 1deg; tall ones stay straight (`.title-card--straight`).
- Integration and feature cards: illustration on top (`.illustration-lines` + `LogoTile`),
  tag, title and text at the bottom (`FeatureCard`).

## The line grid and the light

- The unoff signature (Figma "Lines") replaces UICP's shade grid: full-width rows, rounded at
  the bottom, separated by 2px grooves (`LineGrid`).
- **Brand light lives under the rows** and shows through the grooves: blurred blobs in the
  three brand tints of the mode, light points running, a beam under the pointer. Never on
  top of content; a central veil keeps text readable.
- Illustrations use the same vocabulary at small scale: offset rows of cells
  (`.illustration-lines`, Figma "Wire" pattern) behind a tilted logo tile with shards.

## Terminal

The CLI is the product's front door: commands are shown in dark terminal blocks with the
syntax colours of the Figma hero (command, verb, argument). Commands shown must exist in
`unoff-cli/src/cli.ts`.

## Tone of copy

Short, direct, second person. "Shape it / Wire it / Supercharge it". Service and product
names exact: Lemon Squeezy, Supabase, Mixpanel, Sentry, Notion, Tolgee, Figma, Penpot,
Claude Code, Cursor, Windsurf, GitHub Copilot, MPL 2.0.
