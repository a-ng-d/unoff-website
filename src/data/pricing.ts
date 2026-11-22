import { links } from '@/config/site'

export type PlanIcon =
  | 'terminal'
  | 'book-open'
  | 'bot-message-square'
  | 'users-round'
  | 'lock-open'
  | 'book-open-text'
  | 'biceps-flexed'
  | 'plus'
  | 'presentation'
  | 'headset'
  | 'milestone'
  | 'figma'
  | 'test-tube-diagonal'

export interface Plan {
  id: 'hobby' | 'supporter' | 'learner'
  tag: string
  /** Shown price; `amount` is the number declared in the JSON-LD offer (USD). */
  price: string
  amount?: number
  listPrice?: string
  period?: string
  summary?: string
  features: { icon: PlanIcon; text: string }[]
  cta?: { label: string; href: string }
  badge?: string
}

export const pricing = {
  title: 'Pick your pace',
  intro:
    'The toolkit is free — all of it. What you can support is the guidance that comes with it.',
}

export const plans: Plan[] = [
  {
    id: 'hobby',
    tag: '/hobby',
    price: 'Free',
    amount: 0,
    summary: 'Everything you need to build.',
    features: [
      { icon: 'terminal', text: 'CLI & boilerplate' },
      { icon: 'book-open', text: 'unoff-ui component library (npm)' },
      { icon: 'book-open', text: 'unoff-ui Storybook documentation' },
      {
        icon: 'bot-message-square',
        text: 'Agentic skills (Claude Code, Cursor, Windsurf, Copilot)',
      },
      { icon: 'users-round', text: 'Community support' },
    ],
    cta: { label: 'Get started', href: links.docs },
  },
  {
    id: 'supporter',
    tag: '/supporter',
    price: 'Give what you want',
    summary: 'No package. Just fuel.',
    features: [
      {
        icon: 'lock-open',
        text: 'Nothing to unlock — the toolkit is already free',
      },
      { icon: 'book-open-text', text: 'Your name on the Unoff website' },
      {
        icon: 'biceps-flexed',
        text: 'You keep the CLI, the UI kit, and the skills free for everyone else',
      },
    ],
    cta: { label: 'Buy me a coffee', href: links.coffee },
  },
  {
    id: 'learner',
    tag: '/learner',
    price: '$210',
    amount: 210,
    listPrice: '$299',
    period: 'Billed yearly',
    badge: 'Welcome',
    features: [
      { icon: 'plus', text: 'Everything in /hobby' },
      {
        icon: 'presentation',
        text: 'Onboarding session — we get your first plugin running together',
      },
      {
        icon: 'headset',
        text: 'Dedicated support — one bounded question at a time, answered by me',
      },
      {
        icon: 'milestone',
        text: 'Step-by-step guides to set up and connect external services (Sentry, Mixpanel, Supabase, Lemon Squeezy, Notion, Tolgee) to your plugin',
      },
      { icon: 'figma', text: 'Figma component library' },
      {
        icon: 'test-tube-diagonal',
        text: 'Early access to upcoming CLI features & templates',
      },
    ],
    cta: { label: 'Reserve your spot', href: links.learner },
  },
]
