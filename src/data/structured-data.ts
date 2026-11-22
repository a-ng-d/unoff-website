/**
 * schema.org builders. Each page picks the ones that describe it,
 * instead of every page carrying the same blocks.
 */
import { destinations, finalUrl, site } from '@/config/site'
import type { FaqItem } from '@/data/faq'
import { plans } from '@/data/pricing'

const absolute = (path: string) => new URL(path, site.url).href
const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '')

export const organizationId = `${site.publisher.url}#organization`
export const websiteId = `${site.url}/#website`
export const softwareId = `${site.url}/#software`
export const authorId = `${site.url}/#aurelien-grimaud`

const softwareFeatures = [
  'Preact + Vite plugin boilerplate (React-compatible) scaffolded with a single CLI command',
  'CLI commands: create, dev, build, check, add',
  'unoff-ui, a component library mirroring Figma’s native interface',
  'Agentic skills for Claude Code, Cursor, Windsurf and GitHub Copilot',
  'Feature gating by plan, editor and service from one config file',
  'CORS proxy worker for outbound plugin requests',
  'Lemon Squeezy license key verification and payments',
  'Mixpanel product analytics with consent',
  'Sentry error tracking, replays and user feedback',
  'Supabase authentication and database',
  'Notion-powered in-app announcements and onboarding',
  'Tolgee localization',
]

/** The author, as the page subject of the “Me” section (E-E-A-T). */
export const person = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': authorId,
  name: site.author.name,
  url: site.author.url,
  image: absolute('/author-aurelien-grimaud.jpg'),
  jobTitle: 'Founder of Yelbolt',
  sameAs: [...site.author.sameAs],
  worksFor: { '@id': organizationId },
})

/** Yelbolt publishes Unoff: the Organization is the studio, not the product. */
export const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: site.publisher.name,
  url: site.publisher.url,
  email: site.email,
  sameAs: [...site.profiles],
  founder: { '@id': authorId },
})

export const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  name: site.name,
  url: site.url,
  inLanguage: site.locale,
  publisher: { '@id': organizationId },
})

export const softwareApplication = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': softwareId,
  name: site.name,
  alternateName: 'Unoff Toolkit',
  url: site.url,
  description: site.defaultDescription,
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'Plugin development toolkit',
  operatingSystem: 'macOS, Windows, Linux',
  softwareRequirements: 'Node.js 18 or later',
  programmingLanguage: ['TypeScript', 'JavaScript'],
  license: 'https://www.mozilla.org/en-US/MPL/2.0/',
  isAccessibleForFree: true,
  codeRepository: destinations.cli,
  softwareHelp: { '@type': 'CreativeWork', url: destinations.docs },
  featureList: softwareFeatures,
  author: { '@id': organizationId },
  publisher: { '@id': organizationId },
  offers: plans
    .filter((plan) => plan.amount !== undefined)
    .map((plan) => ({
      '@type': 'Offer',
      name: plan.tag,
      price: String(plan.amount),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: plan.cta ? finalUrl(plan.cta.href) : site.url,
      ...(plan.period
        ? {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: String(plan.amount),
              priceCurrency: 'USD',
              unitCode: 'ANN',
            },
          }
        : {}),
    })),
})

/** `about`: the `@id` of the entity the page describes. */
export const webPage = (page: {
  path: string
  name: string
  description: string
  about?: string
  type?: 'WebPage' | 'CollectionPage'
  dateModified?: string
  mainEntity?: object
}) => ({
  '@context': 'https://schema.org',
  '@type': page.type ?? 'WebPage',
  '@id': `${absolute(page.path)}#webpage`,
  url: absolute(page.path),
  name: page.name,
  description: page.description,
  inLanguage: site.locale,
  isPartOf: { '@id': websiteId },
  ...(page.about ? { about: { '@id': page.about } } : {}),
  ...(page.dateModified ? { dateModified: page.dateModified } : {}),
  ...(page.mainEntity ? { mainEntity: page.mainEntity } : {}),
})

export const faqPage = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: stripHtml(item.answer) },
  })),
})

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absolute(item.path),
  })),
})

/** The steps of a how-to section, as a HowTo (code lines become supplies of text). */
export const howTo = (howto: {
  path: string
  name: string
  description: string
  steps: { title: string; text: string; code?: string }[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${absolute(howto.path)}#howto`,
  name: howto.name,
  description: howto.description,
  inLanguage: site.locale,
  step: howto.steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.title,
    text: step.code ? `${step.text} ${step.code.replace(/\n/g, '; ')}` : step.text,
  })),
})

/** Home > page: the breadcrumb of a top-level page. */
export const pageBreadcrumbs = (name: string, path: string) =>
  breadcrumbs([
    { name: 'Home', path: '/' },
    { name, path },
  ])
