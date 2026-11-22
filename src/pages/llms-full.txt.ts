import type { APIRoute } from 'astro'

import { site } from '@/config/site'
import type { Steps, Table } from '@/data/blocks'
import { homeFaq, type FaqItem } from '@/data/faq'
import {
  audience,
  compare,
  hero,
  shape,
  summary,
  supercharge,
} from '@/data/home'
import { integrationPath, integrations } from '@/data/integrations'
import { platformPages } from '@/data/platform-pages'
import { plans, pricing } from '@/data/pricing'

/** The full text of the site for LLMs; llms.txt is the map. */
export const GET: APIRoute = () => {
  const url = (path: string) => new URL(path, site.url).href
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '')
  const faq = (items: FaqItem[]) =>
    items.flatMap((item) => [`### ${item.question}`, '', stripHtml(item.answer), ''])
  const steps = (block: Steps) => [
    `### ${block.title}`,
    '',
    ...block.steps.map(
      (step, index) =>
        `${index + 1}. **${step.title}** — ${step.text}${step.code ? `\n\n\`\`\`\n${step.code}\n\`\`\`` : ''}`
    ),
    '',
  ]
  const table = (block: Table) => [
    `### ${block.title}`,
    '',
    `| ${block.rowHeader} | ${block.columns.join(' | ')} |`,
    `| --- | ${block.columns.map(() => '---').join(' | ')} |`,
    ...block.rows.map(
      (row) =>
        `| ${row.label} | ${row.values
          .map((value) => (value === true ? 'Yes' : value === false ? 'No' : value))
          .join(' | ')} |`
    ),
    '',
  ]

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.defaultDescription}`,
    '',
    `## ${hero.title}`,
    '',
    hero.tagline,
    '',
    `## ${summary.title}`,
    '',
    summary.intro,
    '',
    ...summary.cards.flatMap((card) => [`- **${card.title}** — ${card.text}`]),
    '',
    `## ${shape.title}`,
    '',
    ...[shape.boilerplate, shape.cli, shape.components, shape.library].map(
      (card) => `- **${card.title}** — ${card.text}`
    ),
    '',
    `## Integrations`,
    '',
    ...integrations.map(
      (item) => `- **${item.name}** (${item.kind}) — ${item.summary} ${url(integrationPath(item))}`
    ),
    '',
    `## ${supercharge.title}`,
    '',
    ...supercharge.cards.map((card) => `- **${card.title}** — ${card.text}`),
    '',
    `## ${audience.title}`,
    '',
    ...audience.personas.flatMap((persona) => [
      `### ${persona.title}`,
      '',
      persona.text,
      '',
      ...persona.points.map((point) => `- ${point}`),
      '',
    ]),
    `## ${compare.title}`,
    '',
    compare.intro,
    '',
    `| Task | ${compare.columns.join(' | ')} |`,
    '| --- | --- | --- |',
    ...compare.rows.map((row) => `| ${row.task} | ${row.without} | ${row.with} |`),
    `| ${compare.total.label} | ${compare.total.without} | ${compare.total.with} |`,
    '',
    `## ${pricing.title}`,
    '',
    pricing.intro,
    '',
    ...plans.flatMap((plan) => [
      `### ${plan.tag} — ${plan.price}${plan.period ? ` (${plan.period})` : ''}`,
      '',
      ...plan.features.map((feature) => `- ${feature.text}`),
      '',
    ]),
    '## FAQ',
    '',
    ...faq(homeFaq),
    ...platformPages.flatMap((page) => [
      `## ${page.hero.title} (${url(page.path)})`,
      '',
      page.overview,
      '',
      ...steps(page.build),
      ...table(page.table),
      ...steps(page.publish),
      ...faq(page.faq),
    ]),
    ...integrations.flatMap((item) => [
      `## ${item.hero.title} (${url(integrationPath(item))})`,
      '',
      item.overview,
      '',
      ...steps(item.steps),
      ...table(item.table),
      ...faq(item.faq),
    ]),
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
