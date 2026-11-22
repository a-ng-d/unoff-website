import { links } from '@/config/site'
import type { Steps, Table } from '@/data/blocks'
import type { FaqItem } from '@/data/faq'

export type IntegrationSlug =
  | 'lemon-squeezy'
  | 'supabase'
  | 'mixpanel'
  | 'sentry'
  | 'notion'
  | 'tolgee'

export interface Integration {
  slug: IntegrationSlug
  name: string
  /** What Unoff ships for it: API, SDK, worker, template. */
  kind: string
  category: string
  /** Home card copy. */
  summary: string
  /** Brand colour of the logo tile (allowed exception, see tokens.css). */
  tile: string
  tilt: number
  seo: { title: string; description: string }
  hero: { title: string; tagline: string }
  /** Answer-first summary, 40 to 60 words. */
  overview: string
  steps: Steps
  table: Table
  faq: FaqItem[]
  related: IntegrationSlug[]
}

export const integrationPath = (item: { slug: string }) =>
  `/integrations/${item.slug}`

const scaffold = {
  title: 'Scaffold your plugin',
  text: 'Create a Figma or a Penpot plugin from the Unoff template. The service code is already in src/app/external/.',
  code: 'unoff create figma-plugin',
}

const platforms = ['Figma', 'Penpot']

export const integrationsHub = {
  title: 'Integrations',
  tagline:
    'Payments, analytics, auth, localization — every service plugged in, so you never start from scratch.',
  seo: {
    title: 'Figma & Penpot Plugin Integrations | Unoff',
    description:
      'The services Unoff wires into every Figma and Penpot plugin: Lemon Squeezy, Supabase, Mixpanel, Sentry, Notion and Tolgee, with the commands to turn them on.',
  },
}

export const integrations: Integration[] = [
  {
    slug: 'lemon-squeezy',
    name: 'Lemon Squeezy',
    kind: 'API',
    category: 'Payments',
    summary:
      "License key verification and transactional payments — or use the marketplace's built-in payment service. Ready whenever you are.",
    tile: '#f4f8fb',
    tilt: -2,
    seo: {
      title: 'Lemon Squeezy Payments for Figma & Penpot Plugins | Unoff',
      description:
        'Sell your Figma or Penpot plugin with Lemon Squeezy license keys: activation, validation and deactivation are pre-wired in the Unoff template.',
    },
    hero: {
      title: 'Lemon Squeezy payments for Figma & Penpot plugins',
      tagline:
        'License keys that activate, validate and deactivate out of the box, so you can charge for your plugin from day one.',
    },
    overview:
      'Unoff wires Lemon Squeezy license keys into your plugin: a user pastes a key, the plugin activates it through the Lemon Squeezy API, stores it, and validates it again at every launch. Requests go through the Unoff CORS worker. On Figma, you can use the built-in payments instead.',
    steps: {
      title: 'Charge for your plugin',
      intro: 'Four steps from the template to a paid plugin.',
      steps: [
        scaffold,
        {
          title: 'Add the CORS worker',
          text: 'License requests to the Lemon Squeezy API go through this Cloudflare Worker, which adds the CORS headers a plugin needs.',
          code: 'unoff add worker cors',
        },
        {
          title: 'Set the environment',
          text: 'Point the plugin to the Lemon Squeezy API and to your deployed worker in .env.local.',
          code: "VITE_LEMONSQUEEZY_URL='https://api.lemonsqueezy.com/v1'\nVITE_CORS_WORKER_URL='https://cors.your-worker.workers.dev'",
        },
        {
          title: 'Turn the paid plan on',
          text: 'Set globalConfig.plan.isProEnabled to true and keep a field where users paste their key. On Figma, also remove the payments permission from manifest.json.',
        },
      ],
      docs: { label: 'Read the CLI guide', href: links.cliUsage },
    },
    table: {
      id: 'lemon-squeezy-table',
      title: 'What Unoff wires',
      intro: 'The license flow is the same on both platforms.',
      caption: 'Lemon Squeezy features wired by Unoff, per platform',
      rowHeader: 'Feature',
      columns: platforms,
      rows: [
        { label: 'License key activation', values: [true, true] },
        { label: 'Validation at every launch', values: [true, true] },
        { label: 'License removal (deactivation)', values: [true, true] },
        { label: 'Requests through the CORS worker', values: [true, true] },
        {
          label: 'Alternative: the marketplace’s built-in payments',
          values: [true, false],
        },
      ],
    },
    faq: [
      {
        question: 'Can I use Figma’s built-in payments instead?',
        answer:
          'Yes. The template supports either Figma’s built-in payments or Lemon Squeezy license keys. Choose exactly one, and make the payments permission of manifest.json match it.',
      },
      {
        question: 'Why choose Lemon Squeezy over Figma payments?',
        answer:
          'Lemon Squeezy keys are not tied to one marketplace, so a license can follow your users across platforms, and you sell directly. Figma payments give a checkout with no key to copy.',
      },
      {
        question: 'Why do license requests go through a worker?',
        answer:
          'Requests from a plugin are often blocked by CORS. The Unoff CORS worker forwards them with the right headers, so activation and validation calls go through.',
      },
    ],
    related: ['supabase', 'mixpanel'],
  },
  {
    slug: 'supabase',
    name: 'Supabase',
    kind: 'Worker + SDK',
    category: 'Auth & database',
    summary:
      'Authentication, database interaction, and server-side logic — all pre-wired and ready to go.',
    tile: '#11181c',
    tilt: 2,
    seo: {
      title: 'Supabase Auth for Figma & Penpot Plugins | Unoff',
      description:
        'Add sign-in and a Supabase database to your Figma or Penpot plugin: Unoff ships the Supabase client, a browser sign-in flow and a Cloudflare auth worker.',
    },
    hero: {
      title: 'Supabase auth for Figma & Penpot plugins',
      tagline:
        'Sign-in through the browser, database calls and a worker for the server side, already wired.',
    },
    overview:
      'Unoff ships a Supabase client and a sign-in flow in src/app/external/auth: users sign in through the browser, the auth worker on Cloudflare hands the session back to the plugin, and signOut ends it. Set four variables and your plugin knows who its users are.',
    steps: {
      title: 'Add accounts to your plugin',
      intro: 'From the template to signed-in users.',
      steps: [
        scaffold,
        {
          title: 'Add the auth worker',
          text: 'The worker joins your repository as a git submodule and a workspace, with a start:token script.',
          code: 'unoff add worker auth',
        },
        {
          title: 'Set the environment',
          text: 'Give the plugin your Supabase project, your sign-in page and your deployed worker.',
          code: 'VITE_SUPABASE_URL=https://xxxxx.supabase.co\nVITE_SUPABASE_PUBLIC_ANON_KEY=your-anon-key\nVITE_AUTH_URL=https://auth.your-plugin.com\nVITE_AUTH_WORKER_URL=your-auth-worker-url',
        },
        {
          title: 'Call it from your UI',
          text: 'Import signIn and signOut from src/app/external/auth/authentication.ts, and checkConnectionStatus from checkConnectionStatus.ts, in your components.',
        },
      ],
      docs: { label: 'Read the CLI guide', href: links.cliUsage },
    },
    table: {
      id: 'supabase-table',
      title: 'What Unoff wires',
      intro: 'The auth layer is shared by the Figma and Penpot templates.',
      caption: 'Supabase features wired by Unoff, per platform',
      rowHeader: 'Feature',
      columns: platforms,
      rows: [
        { label: 'Supabase client (supabase-js)', values: [true, true] },
        { label: 'Sign-in through the browser', values: [true, true] },
        { label: 'Sign-out', values: [true, true] },
        { label: 'Connection status check', values: [true, true] },
        { label: 'Auth worker on Cloudflare', values: [true, true] },
      ],
    },
    faq: [
      {
        question: 'Where does the auth code live?',
        answer:
          'In src/app/external/auth: the Supabase client in index.ts, signIn and signOut in authentication.ts, and the connection check in checkConnectionStatus.ts.',
      },
      {
        question: 'Do I need my own server?',
        answer:
          'No. The server side runs in the auth worker, a Cloudflare Worker that <code>unoff add worker auth</code> adds to your repository.',
      },
      {
        question: 'What does “Worker + SDK” mean?',
        answer:
          'The plugin uses the Supabase SDK directly, and a Cloudflare Worker handles what must not run in the plugin.',
      },
    ],
    related: ['lemon-squeezy', 'notion'],
  },
  {
    slug: 'mixpanel',
    name: 'Mixpanel',
    kind: 'SDK',
    category: 'Analytics',
    summary:
      'User analytics with custom events. Understand how people actually use your plugin.',
    tile: '#7856ff',
    tilt: -2,
    seo: {
      title: 'Mixpanel Analytics for Figma & Penpot Plugins | Unoff',
      description:
        'Track how people use your Figma or Penpot plugin with Mixpanel: Unoff ships consent-based tracking and ready-made events for sign-in, trial and purchase.',
    },
    hero: {
      title: 'Mixpanel analytics for Figma & Penpot plugins',
      tagline:
        'Know which features people use, where they drop, and what converts.',
    },
    overview:
      'Unoff initialises Mixpanel on its EU host, without cookies, and tracks only after the user consents. It ships ready-made events for sign-in, sign-out, trial, purchase, onboarding, announcements, pricing and language, each tied to the user. Add your token, then your own events with getMixpanel().track().',
    steps: {
      title: 'Measure your plugin',
      intro: 'Three steps to your first events.',
      steps: [
        scaffold,
        {
          title: 'Set the token',
          text: 'Add your Mixpanel project token to .env.local.',
          code: 'VITE_MIXPANEL_TOKEN=your-mixpanel-token',
        },
        {
          title: 'Track what matters',
          text: 'The ready-made events live in src/app/external/tracking/eventsTracker.ts; add yours next to them.',
          code: "getMixpanel().track('Export completed', { format: 'css' })",
        },
      ],
      docs: { label: 'Read the CLI guide', href: links.cliUsage },
    },
    table: {
      id: 'mixpanel-table',
      title: 'What Unoff wires',
      intro: 'The tracking helpers are shared by the Figma and Penpot templates.',
      caption: 'Mixpanel features wired by Unoff, per platform',
      rowHeader: 'Feature',
      columns: platforms,
      rows: [
        { label: 'EU host, no cookies', values: [true, true] },
        { label: 'Tracking only after consent', values: [true, true] },
        { label: 'Ready-made product events', values: [true, true] },
        { label: 'Events tied to the user', values: [true, true] },
        { label: 'Your own events with getMixpanel()', values: [true, true] },
      ],
    },
    faq: [
      {
        question: 'Where are the tracking helpers?',
        answer:
          'In src/app/external/tracking/eventsTracker.ts: one function per event (trackSignInEvent, trackPurchaseEvent, trackOnboardingEvent…). Mixpanel is initialised once in src/app/index.tsx.',
      },
      {
        question: 'Does tracking respect consent?',
        answer:
          'Yes. The events run only once the user has accepted tracking, and Mixpanel is set up without cookies on its EU host.',
      },
    ],
    related: ['sentry', 'supabase'],
  },
  {
    slug: 'sentry',
    name: 'Sentry',
    kind: 'SDK',
    category: 'Error tracking',
    summary:
      'Error tracking and user feedback. Catch bugs before your users report them.',
    tile: '#e1567c',
    tilt: 2,
    seo: {
      title: 'Sentry Error Tracking for Figma & Penpot Plugins | Unoff',
      description:
        'Catch errors in your Figma or Penpot plugin before users report them: Unoff sets up Sentry with tracing, replays of the sessions that fail and user feedback.',
    },
    hero: {
      title: 'Sentry error tracking for Figma & Penpot plugins',
      tagline:
        'Errors, traces, replays and user feedback in your production builds, without wiring anything.',
    },
    overview:
      'Unoff initialises Sentry in production builds with browser tracing, a replay of each session that hits an error, and the user feedback widget. Add your DSN and every crash of your plugin reaches your Sentry project with the context to fix it.',
    steps: {
      title: 'Catch your first error',
      intro: 'Two settings after the template.',
      steps: [
        scaffold,
        {
          title: 'Set the DSN',
          text: 'Add the DSN of your Sentry project to .env.local.',
          code: 'VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx',
        },
        {
          title: 'Ship',
          text: 'Sentry starts with production builds only, so local development stays quiet.',
          code: 'unoff build',
        },
      ],
      docs: { label: 'Read the CLI guide', href: links.cliUsage },
    },
    table: {
      id: 'sentry-table',
      title: 'What Unoff wires',
      intro: 'Monitoring is shared by the Figma and Penpot templates.',
      caption: 'Sentry features wired by Unoff, per platform',
      rowHeader: 'Feature',
      columns: platforms,
      rows: [
        { label: 'Error capture in production builds', values: [true, true] },
        { label: 'Browser tracing', values: [true, true] },
        { label: 'Replay of sessions with an error', values: [true, true] },
        { label: 'User feedback widget', values: [true, true] },
      ],
    },
    faq: [
      {
        question: 'Where is Sentry set up?',
        answer:
          'In src/app/index.tsx, where Sentry.init runs with the tracing, replay and feedback integrations when the build is not a development build.',
      },
      {
        question: 'Can users report a bug themselves?',
        answer:
          'Yes. The Sentry feedback widget is part of the setup, so users can send a report with their context.',
      },
    ],
    related: ['mixpanel', 'tolgee'],
  },
  {
    slug: 'notion',
    name: 'Notion',
    kind: 'Worker + Template',
    category: 'Announcements & onboarding',
    summary:
      'In-app announcements and onboarding flows powered by Notion — update content without redeploying.',
    tile: '#ffffff',
    tilt: -2,
    seo: {
      title: 'Notion Announcements in Figma & Penpot Plugins | Unoff',
      description:
        'Write your plugin’s announcements and onboarding in Notion and update them without redeploying: Unoff ships the worker and the dialogs.',
    },
    hero: {
      title: 'Notion announcements & onboarding for plugins',
      tagline:
        'Write what’s new in Notion; your plugin shows it on its next launch, no release needed.',
    },
    overview:
      'Unoff reads announcements and onboarding from two Notion databases through the announcements worker, a Cloudflare Worker that keeps your Notion key secret. At launch, the plugin compares versions and opens a dialog for a major update or a notification for a minor one.',
    steps: {
      title: 'Talk to your users from Notion',
      intro: 'From the template to your first announcement.',
      steps: [
        scaffold,
        {
          title: 'Add the announcements worker',
          text: 'The worker fetches your Notion databases; the plugin never calls Notion directly.',
          code: 'unoff add worker announcement',
        },
        {
          title: 'Connect your databases',
          text: 'Create an announcements and an onboarding database in Notion, then set their IDs and the worker URL.',
          code: 'VITE_ANNOUNCEMENTS_WORKER_URL=your-announcements-worker-url\nVITE_NOTION_ANNOUNCEMENTS_ID=your-notion-db-id\nVITE_NOTION_ONBOARDING_ID=your-notion-db-id',
        },
        {
          title: 'Keep the key on the worker',
          text: 'In production, the Notion token is a worker secret, never a VITE_ variable.',
          code: 'wrangler secret put NOTION_API_KEY',
        },
      ],
      docs: { label: 'Read the CLI guide', href: links.cliUsage },
    },
    table: {
      id: 'notion-table',
      title: 'What Unoff wires',
      intro: 'Content is filtered by platform, so one database serves both.',
      caption: 'Notion features wired by Unoff, per platform',
      rowHeader: 'Feature',
      columns: platforms,
      rows: [
        { label: 'Announcements dialog', values: [true, true] },
        { label: 'Notification for minor updates', values: [true, true] },
        { label: 'Onboarding filtered by platform and editor', values: [true, true] },
        { label: 'Notion key kept as a worker secret', values: [true, true] },
      ],
    },
    faq: [
      {
        question: 'Do I need to redeploy to change an announcement?',
        answer:
          'No. Edit the page in Notion; the plugin fetches it through the worker on its next launch.',
      },
      {
        question: 'How does the plugin decide what to show?',
        answer:
          'It compares the announcements version with the one it stored: a major change opens the announcements dialog, a minor one shows a notification, and new users see the onboarding first.',
      },
      {
        question: 'Is my Notion token exposed?',
        answer:
          'Not in production: the worker holds it as a secret. Use VITE_NOTION_API_KEY only in local development.',
      },
    ],
    related: ['tolgee', 'supabase'],
  },
  {
    slug: 'tolgee',
    name: 'Tolgee',
    kind: 'API + SDK',
    category: 'Localization',
    summary:
      'Ship your plugin in multiple languages with Tolgee translation management.',
    tile: '#f9c4d6',
    tilt: 2,
    seo: {
      title: 'Tolgee Localization for Figma & Penpot Plugins | Unoff',
      description:
        'Translate your Figma or Penpot plugin with Tolgee: Unoff wires the UI strings, the canvas messages and the saved language, ready for your Tolgee project.',
    },
    hero: {
      title: 'Tolgee localization for Figma & Penpot plugins',
      tagline:
        'Ship your plugin in several languages and manage translations in Tolgee.',
    },
    overview:
      'Unoff wires Tolgee into the interface of your plugin with bundled English and French translations, while the canvas side uses its own createI18n() helper for the messages it sends. The chosen language is saved on the platform. Connect your Tolgee project to manage translations there.',
    steps: {
      title: 'Translate your plugin',
      intro: 'Three steps to a multilingual plugin.',
      steps: [
        scaffold,
        {
          title: 'Connect Tolgee',
          text: 'Add your Tolgee project key and URL to .env.local, then uncomment apiUrl and apiKey (and add DevTools) in src/app/external/translation/index.ts.',
          code: 'VITE_TOLGEE_API_KEY=your-tolgee-api-key\nVITE_TOLGEE_URL=your-tolgee-url',
        },
        {
          title: 'Write keys, not strings',
          text: 'UI components read translations with useTranslate or WithTranslation; canvas messages go through createI18n().',
        },
      ],
      docs: { label: 'Read the CLI guide', href: links.cliUsage },
    },
    table: {
      id: 'tolgee-table',
      title: 'What Unoff wires',
      intro: 'Only the storage of the language differs between platforms.',
      caption: 'Tolgee features wired by Unoff, per platform',
      rowHeader: 'Feature',
      columns: platforms,
      rows: [
        { label: 'UI translations with Tolgee (English and French bundled)', values: [true, true] },
        { label: 'Canvas messages with createI18n()', values: [true, true] },
        {
          label: 'Saved language preference',
          values: ['figma.clientStorage', 'penpot.localStorage'],
        },
      ],
    },
    faq: [
      {
        question: 'Why two translation systems?',
        answer:
          'The interface runs Tolgee; the canvas side has no UI framework, so it uses a small createI18n() helper for the messages it sends.',
      },
      {
        question: 'Where is the language saved?',
        answer:
          'In figma.clientStorage on Figma and penpot.localStorage on Penpot, so it survives restarts.',
      },
    ],
    related: ['notion', 'sentry'],
  },
]

export const integrationBySlug = (slug: IntegrationSlug) =>
  integrations.find((item) => item.slug === slug)!
