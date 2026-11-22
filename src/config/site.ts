/**
 * Single source of truth for site-wide metadata and links.
 * Pages and components read from here instead of hardcoding URLs.
 */

export const site = {
  name: 'Unoff',
  url: 'https://unoff.dev',
  locale: 'en',
  /** @unoff/ui mode family: `<mode>-light` / `<mode>-dark` (keep in sync with postcss.config.mjs). */
  mode: 'yelbolt-uno',
  themeStorageKey: 'unoff-theme',
  defaultTitle: 'Unoff — Build & Monetize Figma and Penpot Plugins',
  defaultDescription:
    'Unoff is a free toolkit to build and ship plugins on the design marketplaces: a CLI, a Figma-native UI kit, agentic skills, and every service already wired.',
  defaultOgImage: '/og-default.png',
  email: 'hello@yelbolt.co',
  license: 'MPL 2.0',
  author: {
    name: 'Aurélien Grimaud',
    url: 'https://an.gd/',
    sameAs: [
      'https://an.gd/',
      'https://github.com/a-ng-d',
      'https://www.linkedin.com/in/augrimaud',
    ],
  },
  /** Official profiles (Organization `sameAs`). Final URLs, never short links. */
  profiles: ['https://github.com/yelbolt', 'https://discord.com/invite/HjWeQYg2Yb'],
  /** X handle with the @. Twitter tags are omitted while null. */
  twitterHandle: null as string | null,
  publisher: {
    name: 'Yelbolt',
    url: 'https://yelbolt.co/',
  },
  /** Google Search Console verification, or null when the domain is verified by DNS. */
  googleSiteVerification: null as string | null,
} as const

export interface NavLink {
  label: string
  href: string
  badge?: string
}

/**
 * Final URLs of the outbound links. Structured data and llms.txt use these:
 * crawlers and agents should not depend on a redirect.
 */
export const destinations = {
  docs: 'https://angd.notion.site/Unoff-Documentation-dfd2ae035e004b078bb3725fb0cecc14',
  learner: 'https://angd.notion.site/acb0ac334d5e4212b65ab52fd9eca205',
  coffee: 'https://buymeacoffee.com/a_ng_d',
  community: 'https://discord.com/invite/HjWeQYg2Yb',
  github: 'https://github.com/yelbolt',
  cli: 'https://github.com/yelbolt/unoff-cli',
  cliUsage: 'https://github.com/yelbolt/unoff-cli/blob/main/USAGE.md',
  ui: 'https://ui.unoff.dev',
  utils: 'https://github.com/yelbolt/unoff-utils',
  templates: 'https://github.com/orgs/yelbolt/repositories?q=template',
} as const

/**
 * Links in the pages. Third-party destinations go through the `uno.ylb.lt`
 * short links (click counts, destination editable without a deploy), as on UI
 * Color Palette; own domains stay direct.
 */
export const links = {
  docs: 'https://uno.ylb.lt/docs',
  learner: 'https://uno.ylb.lt/start',
  coffee: 'https://uno.ylb.lt/author',
  /** Direct: `uno.ylb.lt/network` leads to the UI Color Palette company page. */
  linkedin: 'https://www.linkedin.com/in/augrimaud',
  github: 'https://uno.ylb.lt/repository',
  community: 'https://uno.ylb.lt/community',
  privacy: 'https://uno.ylb.lt/privacy',
  terms: 'https://uno.ylb.lt/terms',
  cli: 'https://uno.ylb.lt/repository-cli',
  cliUsage: destinations.cliUsage,
  ui: destinations.ui,
  utils: 'https://uno.ylb.lt/repository-utils',
  templates: 'https://uno.ylb.lt/repository-templates',
  claudePlugin: 'https://uno.ylb.lt/run-claude-plugin',
  plugins: 'https://uno.ylb.lt/repository-plugins',
  yelbolt: 'https://yelbolt.co/',
  figmaCommunity: 'https://www.figma.com/community',
  penpotCommunity: 'https://community.penpot.app',
} as const

/** The final URL behind one of `links`, for structured data. */
export const finalUrl = (href: string) => {
  const name = Object.entries(links).find(([, value]) => value === href)?.[0]
  return name && name in destinations
    ? destinations[name as keyof typeof destinations]
    : href
}

export const mainNav: NavLink[] = [
  { label: 'Integrations', href: '/integrations' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Docs', href: links.docs },
  { label: 'Support', href: links.community },
]

export const footerNav = {
  unoff: [
    { label: 'CLI', href: links.cli },
    { label: 'UI', href: links.ui },
    { label: 'Utils', href: links.utils },
    { label: 'Templates', href: links.templates },
    { label: 'Claude', href: links.claudePlugin },
    { label: 'Plugins', href: links.plugins },
  ],
  build: [
    { label: 'Build a Figma plugin', href: '/figma' },
    { label: 'Build a Penpot plugin', href: '/penpot' },
    { label: 'Integrations', href: '/integrations' },
  ],
  resources: [
    { label: 'Docs', href: links.docs },
    { label: 'Contribution', href: links.github },
    { label: 'Community', href: links.community },
  ],
  legal: [
    { label: 'Privacy Policy', href: links.privacy },
    { label: 'Terms and Conditions', href: links.terms },
  ],
} satisfies Record<string, NavLink[]>

export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href)
