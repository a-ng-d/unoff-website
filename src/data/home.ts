export const hero = {
  title: 'The fastest way to build plugins for the design marketplaces',
  tagline:
    "Stop wiring services together for weeks. Unoff gives you everything you need to build, ship, and grow plugins on the design marketplaces — even if you've never written a line of code.",
}

export const summary = {
  title: "Everything you need, nothing you don't",
  intro:
    'A CLI, a UI kit, services on tap, and AI at your side — all in one toolkit.',
  demo: {
    title: 'Create your first Figma plugin in minutes',
    src: 'https://app.supademo.com/embed/cmmm2wy3h0867hlo6ctfjrn82?embed_v=2&utm_source=embed',
  },
  cards: [
    {
      icon: 'cone',
      title: 'Shape it',
      text: 'From zero to a polished plugin in one command — structure, UI, and design assets ready to go.',
      href: '#shape',
    },
    {
      icon: 'waypoints',
      title: 'Wire it',
      text: 'Payments, analytics, auth, localization — every service plugged in, so you never start from scratch.',
      href: '#wire',
    },
    {
      icon: 'zap',
      title: 'Supercharge it',
      text: 'Let AI write code for you, toggle features on the fly, and forget about CORS forever.',
      href: '#supercharge',
    },
  ],
} as const

export const shape = {
  title: 'Shape it',
  intro:
    'From zero to a polished plugin in one command — structure, UI, and design assets ready to go.',
  boilerplate: {
    title: 'Preact + Vite Boilerplate',
    text: 'Start from a Figma-ready, React-compatible template with a single CLI command. Hot reload, TypeScript, and modern DX out of the box.',
  },
  cli: {
    title: 'Simple CLI commands',
    text: 'Create, dev, build, add — run them straight from your terminal or IDE. No npx rabbit holes.',
    commands: [
      'unoff create figma-plugin',
      'unoff add worker cors',
      'unoff add skills',
      'unoff check',
      'unoff dev',
      'unoff build',
    ],
  },
  components: {
    title: 'Platform-native UI Components',
    text: "A component library that mirrors Figma's own interface — your plugin feels native from day one.",
  },
  library: {
    title: 'Figma Component Library',
    text: 'Design with real components synced to unoff-ui. What you see in Figma is what ships in code.',
  },
}

export const wire = {
  title: 'Wire it',
  intro:
    'Payments, analytics, auth, localization — every service plugged in, so you never start from scratch.',
}

export const supercharge = {
  title: 'Supercharge it',
  intro:
    'Let AI write code for you, toggle features on the fly, and forget about CORS forever.',
  cards: [
    {
      id: 'cors',
      tag: 'Worker',
      title: 'CORS Proxy',
      text: 'Route outbound requests through the CORS worker for proper headers — license calls already do. No more blocked calls.',
    },
    {
      id: 'skills',
      title: 'Agentic Skills',
      text: 'Purpose-built skills for Copilot, Cursor, Windsurf, and Claude Code. Let AI write your plugin with guardrails.',
    },
    {
      id: 'flags',
      tag: 'unoff-utils',
      title: 'Feature Flags',
      text: 'Gate features by plan, editor and service from one config file.',
    },
  ],
} as const

export const audience = {
  title: 'Built for dreamers who ship',
  intro:
    'From zero to a polished plugin in one command — structure, UI, and design assets ready to go.',
  personas: [
    {
      title: 'Solopreneurs',
      text: 'You have an idea, not a dev team. Unoff handles the hard parts — monitoring, auth, analytics, payments — so you can focus on your product.',
      points: [
        'No technical background needed — AI agents and skills do the heavy lifting',
        'Native-feeling UI — your users get a polished experience from the start',
        'Days saved, not spent — go from idea to published plugin in a weekend',
      ],
    },
    {
      title: 'Vibecoders',
      text: "You're a designer who builds internal tools. You don't need a developer — you need the right scaffolding.",
      points: [
        'No dev dependency — build and ship tooling on your own',
        'Rapid design-to-code — Figma library synced to real components',
        'AI-assisted workflow — vibe-code with Claude Code, Cursor, or Windsurf',
      ],
    },
  ],
}

export const compare = {
  title: 'Weeks become weekends',
  intro: "The boring stuff is already done. Here's what you're really saving.",
  columns: ['Without Unoff', 'With Unoff'],
  rows: [
    { task: 'Project scaffolding (boilerplate, bundler, Figma config)', without: '1 – 2 days', with: '30 min' },
    { task: "UI that matches Figma's look & feel", without: '3 – 5 days', with: 'Included' },
    { task: 'Payments & license verification (Lemon Squeezy / Figma)', href: '/integrations/lemon-squeezy', without: '2 – 3 days', with: '~2 h' },
    { task: 'User analytics (Mixpanel)', href: '/integrations/mixpanel', without: '1 – 2 days', with: '~2 h' },
    { task: 'Error tracking & user feedback (Sentry)', href: '/integrations/sentry', without: '1 – 2 days', with: '~2 h' },
    { task: 'Auth & database (Supabase)', href: '/integrations/supabase', without: '2 – 4 days', with: '~2 h' },
    { task: 'Announcements & onboarding (Notion)', href: '/integrations/notion', without: '1 – 2 days', with: '~2 h' },
    { task: 'Localization (Tolgee)', href: '/integrations/tolgee', without: '1 – 2 days', with: '~2 h' },
    { task: 'CORS proxy setup', without: '0.5 – 1 day', with: 'Included' },
  ],
  total: { label: 'Total estimate', without: '~13 – 23 days', with: '~1 – 2 days' },
}

export const author = {
  quote: "I've shipped plugins across four platforms. Here's what I learned.",
  bio: "I'm Aurélien Grimaud. I created UI Color Palette, a mini-app available on Figma, Penpot, Sketch, and Framer, and founded Yelbolt to keep building and helping others do the same. Unoff isn't theory — it's the toolkit I built from years of doing this every single day.",
  links: [
    { label: 'UI Color Palette', href: 'https://ui-color-palette.com' },
    { label: 'Yelbolt', href: 'https://yelbolt.co/' },
  ],
}
