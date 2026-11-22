/**
 * The editors' own interface, as @unoff/ui draws it on each platform, for the
 * home illustrations. These are the editors' colours, not the site's (allowed
 * exception, like the logo tiles).
 */

export type Editor = 'figma' | 'penpot' | 'sketch' | 'framer'

interface Paint {
  background: string
  ink: string
}

interface EditorButton {
  light: Paint
  dark: Paint
  /** @unoff/ui radius step: `--border-radius-<radius>`. */
  radius: 'medium' | 'large' | 'xlarge'
  /** Figma's 24px button instead of 32px. */
  compact?: boolean
  uppercase?: boolean
}

/** Primary button of each editor, light and dark. */
export const editorButtons: Record<Editor, EditorButton> = {
  figma: {
    light: { background: '#0d99ff', ink: '#ffffff' },
    dark: { background: '#0c8ce9', ink: '#ffffff' },
    radius: 'medium',
    compact: true,
  },
  penpot: {
    light: { background: '#6911d4', ink: '#e8eaee' },
    dark: { background: '#7efff5', ink: '#000000' },
    radius: 'xlarge',
    uppercase: true,
  },
  sketch: {
    light: { background: '#e36e3a', ink: '#ffffff' },
    dark: { background: '#ce5820', ink: '#ffffff' },
    radius: 'large',
  },
  framer: {
    light: { background: '#0099ff', ink: '#ffffff' },
    dark: { background: '#0099ff', ink: '#ffffff' },
    radius: 'xlarge',
  },
}

/** Figma's light UI: the plugin window and the blocked (Pro) controls. */
const figmaUi = {
  window: '#ffffff',
  border: '#e6e6e6',
  ink: 'rgb(0 0 0 / 0.9)',
  placeholder: '#e5f4ff',
  'placeholder-border': '#0d99ff',
  disabled: '#d9d9d9',
  'disabled-ink': '#ffffff',
  chip: '#f2f9ff',
  'chip-ink': '#007be5',
  input: '#e6e6e6',
  'input-ink': 'rgb(0 0 0 / 0.3)',
  swatch: '#88ebf9',
}

/** `figmaUi` as `--figma-*` custom properties, for a `style` attribute. */
export const figmaUiStyle = Object.entries(figmaUi)
  .map(([name, value]) => `--figma-${name}:${value}`)
  .join(';')
