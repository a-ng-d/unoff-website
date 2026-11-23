import 'vanilla-cookieconsent/dist/cookieconsent.css'
import '@/styles/consent.css'
import * as CookieConsent from 'vanilla-cookieconsent'
import { site, links } from '@/config/site'

/**
 * Consent banner (vanilla-cookieconsent), as on UI Color Palette, and the only
 * place where third-party content is loaded. Nothing is requested before the
 * visitor accepts:
 *  - analytics → Google Analytics 4 (gtag.js)
 *  - demo      → the Supademo player of the home page
 *    (`iframe[data-consent-src]`, its URL is set on consent).
 * Analytics runs in production builds only, so local, preview and CI pages
 * never hit the live property.
 */

/** Analytics runs in production, or locally when PUBLIC_THIRD_PARTY=true. */
const analyticsEnabled =
  import.meta.env.PROD || import.meta.env.PUBLIC_THIRD_PARTY === 'true'

type GtagWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}
const w = window as GtagWindow

let analyticsLoaded = false
const loadAnalytics = () => {
  if (analyticsLoaded || !analyticsEnabled) return
  analyticsLoaded = true
  w.dataLayer = w.dataLayer || []
  w.gtag = function () {
    // gtag.js reads `arguments` objects from the dataLayer, not arrays.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments)
  }
  w.gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'granted',
  })
  w.gtag('js', new Date())
  w.gtag('config', site.googleAnalyticsId)
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${site.googleAnalyticsId}`
  document.head.appendChild(script)
}

const loadDemos = () => {
  for (const frame of document.querySelectorAll<HTMLIFrameElement>(
    'iframe[data-consent-src]'
  )) {
    if (!frame.getAttribute('src'))
      frame.setAttribute('src', frame.dataset.consentSrc ?? '')
    frame.closest('[data-consent-frame]')?.setAttribute('data-loaded', '')
  }
}

/**
 * Anonymous count of the banner's outcomes (netlify/functions/consent.mjs):
 * no cookie, no identifier, so it runs whatever the visitor picks. It tells
 * how much of the audience Google Analytics can't see. Production builds only.
 */
type ConsentEvent = 'shown' | 'accept_all' | 'reject' | 'custom'
const track = (event: ConsentEvent) => {
  if (!import.meta.env.PROD) return
  try {
    navigator.sendBeacon('/api/consent', event)
  } catch {
    // Counting is best effort: never break the banner for it.
  }
}

/** One `shown` per session, not one per page browsed without choosing. */
const trackShown = () => {
  const key = 'unoff-consent-shown'
  try {
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
  } catch {
    // Storage blocked: count it anyway, a duplicate beats a missing count.
  }
  track('shown')
}

const choiceOf = (categories: string[]): ConsentEvent => {
  const optional = categories.filter((c) => c !== 'necessary')
  if (optional.length === 0) return 'reject'
  if (optional.includes('analytics') && optional.includes('demo'))
    return 'accept_all'
  return 'custom'
}

const apply = () => {
  if (CookieConsent.acceptedCategory('analytics')) loadAnalytics()
  if (CookieConsent.acceptedCategory('demo')) loadDemos()
}

/** "Load the demo": accepts that category alone, keeping the others as set. */
for (const button of document.querySelectorAll<HTMLButtonElement>(
  '[data-consent-accept]'
)) {
  button.hidden = false
  button.addEventListener('click', () => {
    const accepted = CookieConsent.getUserPreferences().acceptedCategories
    CookieConsent.acceptCategory([
      ...accepted,
      button.dataset.consentAccept ?? '',
    ])
    CookieConsent.hide()
  })
}

const privacy = `<a href="${links.privacy}" target="_blank" rel="noopener">Privacy Policy</a>`

void CookieConsent.run({
  autoClearCookies: true,
  guiOptions: {
    consentModal: { layout: 'box inline', position: 'bottom right' },
    preferencesModal: { layout: 'box' },
  },
  categories: {
    necessary: { enabled: true, readOnly: true },
    analytics: {
      autoClear: { cookies: [{ name: /^_ga/ }] },
    },
    demo: {},
  },
  // The footer reopens the preferences modal for people who already chose:
  // only the first-visit banner counts as `shown`.
  onModalShow: ({ modalName }) => {
    if (modalName === 'consentModal' && !CookieConsent.validConsent())
      trackShown()
  },
  onFirstConsent: ({ cookie }) => track(choiceOf(cookie.categories)),
  onConsent: apply,
  onChange: ({ changedCategories }) => {
    // A script or player that is already running can't be unloaded: reload to drop it.
    const revoked = changedCategories.some(
      (c) => !CookieConsent.acceptedCategory(c)
    )
    if (revoked) location.reload()
    else apply()
  },
  language: {
    default: 'en',
    translations: {
      en: {
        consentModal: {
          title: 'Cookies, your call',
          description:
            'We use optional cookies to measure audience (Google Analytics) and to play the interactive demo (Supademo). Nothing optional loads until you accept.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Customize',
          footer: `<button type="button" class="consent-link" data-cc="accept-necessary">Continue without accepting</button>${privacy}`,
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save choices',
          closeIconLabel: 'Close',
          sections: [
            {
              title: 'Your choices',
              description: `Pick what you accept. You can change your mind anytime from the footer. ${privacy}`,
            },
            {
              title: 'Strictly necessary',
              description:
                'Remember your choice here and your light or dark mode. Always on.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Analytics',
              description:
                'Google Analytics 4 tells us which pages are read, so we can improve the site.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Interactive demo',
              description:
                'The Supademo player of the home page. Supademo counts views and may set cookies.',
              linkedCategory: 'demo',
            },
          ],
        },
      },
    },
  },
})
