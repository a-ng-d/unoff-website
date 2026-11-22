import lemonSqueezy from '@/assets/logos/lemon-squeezy.svg'
import mixpanel from '@/assets/logos/mixpanel.svg'
import notion from '@/assets/logos/notion.svg'
import react from '@/assets/logos/react.svg'
import sentry from '@/assets/logos/sentry.svg'
import supabase from '@/assets/logos/supabase.svg'
import tolgee from '@/assets/logos/tolgee.svg'
import vite from '@/assets/logos/vite.svg'
import figma from '@/assets/platforms/figma.svg'
import framer from '@/assets/platforms/framer.svg'
import penpot from '@/assets/platforms/penpot.svg'
import sketch from '@/assets/platforms/sketch.svg'
import claude from '@/assets/ai/claude.svg'
import cursor from '@/assets/ai/cursor.svg'
import vscode from '@/assets/ai/vscode.png'
import windsurf from '@/assets/ai/windsurf.svg'
import shardsA from '@/assets/decor/shards-a.svg'
import shardsB from '@/assets/decor/shards-b.svg'
import shardsC from '@/assets/decor/shards-c.svg'

/** Brand logos with the colour of their tile (allowed exception, see tokens.css). */
export const logos = {
  'lemon-squeezy': { name: 'Lemon Squeezy', src: lemonSqueezy, tile: '#f4f8fb' },
  supabase: { name: 'Supabase', src: supabase, tile: '#11181c' },
  mixpanel: { name: 'Mixpanel', src: mixpanel, tile: '#7856ff' },
  sentry: { name: 'Sentry', src: sentry, tile: '#e1567c' },
  notion: { name: 'Notion', src: notion, tile: '#ffffff' },
  tolgee: { name: 'Tolgee', src: tolgee, tile: '#f9c4d6' },
  react: { name: 'React', src: react, tile: '#23272f' },
  vite: { name: 'Vite', src: vite, tile: '#370a7f' },
  figma: { name: 'Figma', src: figma, tile: '#ffffff' },
  penpot: { name: 'Penpot', src: penpot, tile: '#f4f8fb' },
  framer: { name: 'Framer', src: framer, tile: '#0099ff' },
  sketch: { name: 'Sketch', src: sketch, tile: '#fbf9fa' },
  claude: { name: 'Claude Code', src: claude, tile: '#f4f3ee' },
  cursor: { name: 'Cursor', src: cursor, tile: '#ffffff' },
  vscode: { name: 'VS Code', src: vscode, tile: '#ffffff' },
  windsurf: { name: 'Windsurf', src: windsurf, tile: '#feffff' },
} satisfies Record<
  string,
  { name: string; src: ImageMetadata; tile: string }
>

export type LogoId = keyof typeof logos

export const shards = [shardsA, shardsB, shardsC]
