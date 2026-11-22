import type { APIRoute } from 'astro'

import { destinations, site } from '@/config/site'
import { homeFaq } from '@/data/faq'
import { integrationPath, integrations } from '@/data/integrations'
import { platformPages } from '@/data/platform-pages'
import { plans } from '@/data/pricing'

/** llms.txt (https://llmstxt.org): Markdown map of the site for LLMs, generated at build time. */
export const GET: APIRoute = () => {
  const url = (path: string) => new URL(path, site.url).href
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '')

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.defaultDescription}`,
    '',
    `Unoff is built and maintained by ${site.publisher.name}. The toolkit is free and open source (the CLI and the skills under MPL 2.0, unoff-ui and unoff-utils under MIT); the paid /learner plan adds guidance and extras, not access to the code.`,
    '',
    `The full text of the site is in [llms-full.txt](${url('/llms-full.txt')}).`,
    '',
    '## Build a plugin',
    '',
    ...platformPages.map(
      (page) => `- [${page.hero.title}](${url(page.path)}): ${page.seo.description}`
    ),
    '',
    '## Integrations',
    '',
    `- [Integrations](${url('/integrations')}): every service Unoff wires into a plugin`,
    ...integrations.map(
      (item) =>
        `- [${item.hero.title}](${url(integrationPath(item))}): ${item.seo.description}`
    ),
    '',
    '## Core packages',
    '',
    `- [unoff-cli](${destinations.cli}): scaffolds a plugin, runs the dev server, builds for production, and adds workers and skills (\`create\`, \`dev\`, \`build\`, \`check\`, \`add worker\`, \`add skills\`)`,
    `- [unoff-ui](${destinations.ui}): component library that mirrors Figma's own interface, documented in Storybook`,
    `- [unoff-utils](${destinations.utils}): shared utilities`,
    `- [Templates](${destinations.templates}): Figma and Penpot plugin templates on Preact + Vite (React-compatible) with TypeScript`,
    '',
    '## Pricing',
    '',
    ...plans.map(
      (plan) =>
        `- \`${plan.tag}\` — ${plan.price}${plan.period ? ` (${plan.period.toLowerCase()})` : ''}: ${plan.features.map((f) => f.text).join('; ')}`
    ),
    '',
    '## Documentation',
    '',
    `- [Docs](${destinations.docs})`,
    `- [CLI usage guide](${destinations.cliUsage})`,
    `- [unoff-ui Storybook](${destinations.ui})`,
    `- [GitHub organization](${destinations.github})`,
    `- [Discord community](${destinations.community})`,
    '',
    '## FAQ',
    '',
    ...homeFaq.flatMap((item) => [
      `### ${item.question}`,
      '',
      stripHtml(item.answer),
      '',
    ]),
    '## Optional',
    '',
    `- [${site.publisher.name}](${site.publisher.url}): the studio behind Unoff`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
