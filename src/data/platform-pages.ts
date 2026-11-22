import { links } from '@/config/site'
import type { NextStep, Steps, Table } from '@/data/blocks'
import type { FaqItem } from '@/data/faq'

export interface PlatformPage {
  path: '/figma' | '/penpot'
  platform: 'Figma' | 'Penpot'
  seo: { title: string; description: string }
  hero: { title: string; tagline: string; cta: { label: string; href: string } }
  /** Answer-first summary, 40 to 60 words. */
  overview: string
  build: Steps
  publish: Steps
  table: Table
  faq: FaqItem[]
}

export const nextSteps: NextStep[] = [
  {
    icon: 'waypoints',
    title: 'Wire your services',
    label: 'See the integrations',
    href: '/integrations',
  },
  {
    icon: 'badge-dollar-sign',
    title: 'Pick your pace',
    label: 'See the plans',
    href: '/#pricing',
  },
  {
    icon: 'book-open',
    title: 'Read the docs',
    label: 'Open the documentation',
    href: links.docs,
  },
]

const templateRows = [
  { label: 'Preact + Vite boilerplate with TypeScript (React-compatible)', values: [true, true] },
  { label: 'unoff-ui, a platform-native component library', values: [true, true] },
  { label: 'Payments (Lemon Squeezy)', href: '/integrations/lemon-squeezy', values: [true, true] },
  { label: 'Auth & database (Supabase)', href: '/integrations/supabase', values: [true, true] },
  { label: 'Analytics (Mixpanel)', href: '/integrations/mixpanel', values: [true, true] },
  { label: 'Error tracking (Sentry)', href: '/integrations/sentry', values: [true, true] },
  { label: 'Announcements & onboarding (Notion)', href: '/integrations/notion', values: [true, true] },
  { label: 'Localization (Tolgee)', href: '/integrations/tolgee', values: [true, true] },
  { label: 'Agentic skills (installed by the CLI)', values: [true, true] },
]

export const platformPages: PlatformPage[] = [
  {
    path: '/figma',
    platform: 'Figma',
    seo: {
      title: 'Build a Figma Plugin with Preact & Vite | Unoff',
      description:
        'Build and monetize a Figma plugin with Unoff: one CLI command scaffolds a Preact + Vite plugin with a Figma-native UI, and payments, analytics and auth wired.',
    },
    hero: {
      title: 'Build a Figma plugin',
      tagline:
        'One command gives you a Preact + Vite plugin, React-compatible, that looks native in Figma, with payments, analytics and auth already wired.',
      cta: { label: 'Get started', href: links.docs },
    },
    overview:
      'To build a Figma plugin with Unoff, run unoff create figma-plugin, then unoff dev, and import the manifest in Figma. You start from a Preact + Vite template with TypeScript (React-compatible), a component library that mirrors Figma’s interface, and the services a published plugin needs.',
    build: {
      title: 'From zero to a running plugin',
      intro: 'Four steps, from your terminal to the Figma canvas.',
      steps: [
        {
          title: 'Install the CLI',
          text: 'Unoff needs Node.js 18 or later, npm 9 or later and git.',
          code: 'npm install -g @unoff/cli',
        },
        {
          title: 'Scaffold the plugin',
          text: 'The CLI asks for the plugin details, creates the project and initialises a git repository.',
          code: 'unoff create figma-plugin',
        },
        {
          title: 'Start the dev server',
          text: 'Install the dependencies, then build in watch mode.',
          code: 'npm install\nunoff dev',
        },
        {
          title: 'Import it in Figma',
          text: 'In Figma, open Plugins > Development > Import plugin from manifest…, then select the manifest.json of your plugin.',
        },
      ],
      docs: { label: 'Read the CLI guide', href: links.cliUsage },
    },
    publish: {
      title: 'Publish on the Figma Community',
      intro: 'What to do before you submit.',
      steps: [
        {
          title: 'Set your plugin ID',
          text: 'Replace the id of manifest.json with the plugin ID Figma gives you, and update package.json.',
        },
        {
          title: 'Configure your services',
          text: 'Fill the environment variables of the integrations you use, then test in Figma.',
        },
        {
          title: 'Build and submit',
          text: 'Build for production, then submit the plugin to the Figma Community.',
          code: 'unoff build',
        },
      ],
    },
    table: {
      id: 'figma-template',
      title: 'What the Figma template includes',
      intro: 'The same foundations as the Penpot template, with Figma’s look.',
      caption: 'Contents of the Unoff templates for Figma and Penpot',
      rowHeader: 'Included',
      columns: ['Figma', 'Penpot'],
      rows: templateRows,
    },
    faq: [
      {
        question: 'What do I need to build a Figma plugin with Unoff?',
        answer:
          'Node.js 18 or later, npm 9 or later, git, and the Figma desktop app to import the plugin from its manifest.',
      },
      {
        question: 'Can I sell my Figma plugin?',
        answer:
          'Yes, with Figma’s built-in payments or with <a href="/integrations/lemon-squeezy">Lemon Squeezy license keys</a>, both supported by the template.',
      },
      {
        question: 'Can AI write the plugin for me?',
        answer:
          'Unoff ships agentic skills for Claude Code, Cursor, Windsurf and GitHub Copilot. <code>unoff add skills</code> installs them in your project.',
      },
    ],
  },
  {
    path: '/penpot',
    platform: 'Penpot',
    seo: {
      title: 'Build a Penpot Plugin with Preact & Vite | Unoff',
      description:
        'Build and ship a Penpot plugin with Unoff: one CLI command scaffolds a Preact + Vite plugin with a native-looking UI, served locally for Penpot to load.',
    },
    hero: {
      title: 'Build a Penpot plugin',
      tagline:
        'One command gives you a Preact + Vite plugin that Penpot loads from a URL, with the services you need already wired.',
      cta: { label: 'Get started', href: links.docs },
    },
    overview:
      'To build a Penpot plugin with Unoff, run unoff create penpot-plugin, then unoff dev, and add http://localhost:4400/manifest.json in Penpot’s plugin manager. You start from a Preact + Vite template with TypeScript (React-compatible), a native-looking component library, and pre-wired services.',
    build: {
      title: 'From zero to a running plugin',
      intro: 'Four steps, from your terminal to Penpot.',
      steps: [
        {
          title: 'Install the CLI',
          text: 'Unoff needs Node.js 18 or later, npm 9 or later and git.',
          code: 'npm install -g @unoff/cli',
        },
        {
          title: 'Scaffold the plugin',
          text: 'The CLI asks for the plugin details, creates the project and initialises a git repository.',
          code: 'unoff create penpot-plugin',
        },
        {
          title: 'Start the dev server',
          text: 'The manifest is served from public/ at the root of the dev server, on port 4400.',
          code: 'npm install\nunoff dev',
        },
        {
          title: 'Load it in Penpot',
          text: 'In Penpot, open the plugin manager, add a custom plugin and enter http://localhost:4400/manifest.json.',
        },
      ],
      docs: { label: 'Read the CLI guide', href: links.cliUsage },
    },
    publish: {
      title: 'Publish on the Penpot Community',
      intro: 'Penpot loads plugins from a URL: host the build first.',
      steps: [
        {
          title: 'Host the build',
          text: 'Build for production and host it on a public server; the public/ folder is served at the root.',
          code: 'unoff build',
        },
        {
          title: 'Update the manifest',
          text: 'Fill public/manifest.json with your plugin details and test it in Penpot from the hosted URL.',
        },
        {
          title: 'Submit',
          text: 'Submit the plugin to the Penpot Community with your manifest URL.',
        },
      ],
    },
    table: {
      id: 'penpot-template',
      title: 'What the Penpot template includes',
      intro: 'The same foundations as the Figma template.',
      caption: 'Contents of the Unoff templates for Figma and Penpot',
      rowHeader: 'Included',
      columns: ['Figma', 'Penpot'],
      rows: templateRows,
    },
    faq: [
      {
        question: 'How does Penpot load a plugin in development?',
        answer:
          'From a URL. <code>unoff dev</code> serves the manifest at http://localhost:4400/manifest.json; add that address in Penpot’s plugin manager while the dev server runs.',
      },
      {
        question: 'Can testers try my plugin before it is hosted?',
        answer:
          'Yes. Run the Build and Download workflow in the GitHub Actions of your repository, serve the downloaded build locally, and add its manifest URL in Penpot.',
      },
    ],
  },
]
