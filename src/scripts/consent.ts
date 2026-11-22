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
