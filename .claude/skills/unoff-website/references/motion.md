# Motion

Source: `src/styles/motion.css`, `src/scripts/reveal.ts`, the scripts of `LineGrid` (and
`ShadeGrid` in the Yelbolt repo). Same story as the UI Color Palette site.

- `BaseLayout` adds `html.motion` before paint only with JS and without
  `prefers-reduced-motion`; a 3s safety net removes it. Without `.motion` the page is
  complete and still.
- **Reveal** (every `.card, .surface-card, .shade-grid__area, .intro-card__intro,
  .stack__intro, .title-card` — keep the list identical in motion.css and reveal.ts):
  scale in, @unoff/ui spinner, cover with a CRT-like scan band sliding down, phase-shifted.
  Content is only covered, never moved or removed.
- **Header bar**: not in the REVEAL list (its dropdowns forbid `position`/`overflow`). `reveal.ts` still
  observes `.header__bar` so it enters first in the batch, with the scale-in only (`motion.css`, no cover).
- **Line grid**: rows slide in from the centre outwards (`--i` = distance to the middle row),
  then the glow fades in and circles (`wave-travel`, 18s); light points run (`light-flow`);
  under a fine pointer a 240px beam follows (`--spot-x/y`, 420ms trail) and the glow dims.
- **Shards** sparkle around logo tiles, faster on card hover.
- Loops pause off screen (`data-inview`). Animate `translate`, `scale`, `opacity` only.

Verify with Playwright screenshots during and after the reveal, with `reducedMotion: 'reduce'`
and `javaScriptEnabled: false`.
