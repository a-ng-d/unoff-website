import 'vanilla-cookieconsent/dist/cookieconsent.css'
import '@/styles/consent.css'
import * as CookieConsent from 'vanilla-cookieconsent'
import { links } from '@/config/site'

/**
 * Consent banner (vanilla-cookieconsent), as on UI Color Palette, and the only
 * place where third-party content is loaded. Nothing is requested before the
 * visitor accepts:
 *  - demo → the Supademo player of the home page
 *    (`iframe[data-consent-src]`, its URL is set on consent).
 */

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
 * no cookie, no identifier, so it runs whatever the visitor picks. The site
 * has no analytics: `shown` is its only audience figure. Production builds
 * only.
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

/** `demo` is the only optional category, so `custom` never occurs here. */
const choiceOf = (categories: string[]): ConsentEvent =>
  categories.includes('demo') ? 'accept_all' : 'reject'

const apply = () => {
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
  guiOptions: {
    consentModal: { layout: 'box inline', position: 'bottom right' },
    preferencesModal: { layout: 'box' },
  },
  categories: {
    necessary: { enabled: true, readOnly: true },
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
    // A player that is already running can't be unloaded: reload to drop it.
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
            'The interactive demo is hosted by Supademo, which counts views and may set cookies. It loads only if you accept.',
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
