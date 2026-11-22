/**
 * `lastmod` of each sitemap URL: last commit of the page's content files.
 * Site-wide chrome is excluded so it does not re-date every page. Without git
 * history, lastmod is omitted, never faked.
 */
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))

/** Content sources per path; any other path falls back to `src/pages<path>.astro`. */
const sources = {
  '/': [
    'src/pages/index.astro',
    'src/data/home.ts',
    'src/data/faq.ts',
    'src/data/pricing.ts',
    'src/components/home',
  ],
  '/integrations': [
    'src/pages/integrations.astro',
    'src/data/integrations.ts',
  ],
}
const integrationSources = [
  'src/data/integrations.ts',
  'src/components/integrations',
]

for (const platform of ['figma', 'penpot'])
  sources[`/${platform}`] = [
    `src/pages/${platform}.astro`,
    'src/data/platform-pages.ts',
    'src/components/platform',
  ]

const gitDate = (paths) => {
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...paths],
      {
        cwd: root,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }
    ).trim()
    return out ? new Date(out) : undefined
  } catch {
    return undefined
  }
}

/** @param {string} url absolute URL of a sitemap entry */
export const lastmodFor = (url) => {
  const path = new URL(url).pathname.replace(/(.)\/$/, '$1')
  if (path.startsWith('/integrations/')) return gitDate(integrationSources)
  return gitDate(sources[path] ?? [`src/pages${path}.astro`])
}
