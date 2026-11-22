/** `answer` is trusted HTML: it is rendered as is, and stripped for JSON-LD and llms.txt. */
export interface FaqItem {
  question: string
  answer: string
}

export const homeFaq: FaqItem[] = [
  {
    question: 'Is Unoff free?',
    answer:
      'Yes. The whole toolkit — the CLI, the boilerplate, the unoff-ui component library, the Storybook documentation, and the agentic skills — is free and open source (the CLI and the skills under MPL 2.0, unoff-ui under MIT). The paid /learner tier covers guidance and extras: onboarding, dedicated support, integration guides, the Figma component library, and early access.',
  },
  {
    question:
      'Do I need to know how to code to build a Figma plugin with Unoff?',
    answer:
      'No. Unoff ships agentic skills for Claude Code, Cursor, Windsurf, and GitHub Copilot, so an AI agent can write the plugin with guardrails — while the boilerplate handles the structure, the UI, and the service wiring.',
  },
  {
    question: 'Does Unoff work with Penpot as well as Figma?',
    answer:
      'Yes. Unoff provides templates for both <a href="/figma">Figma</a> and <a href="/penpot">Penpot</a>, and the unoff-ui component library renders a platform-native interface on each.',
  },
  {
    question: 'How do I monetize a plugin built with Unoff?',
    answer:
      'Unoff pre-wires <a href="/integrations/lemon-squeezy">Lemon Squeezy</a> for license key verification and transactional payments. You can also use the design marketplace’s built-in payment service.',
  },
  {
    question: 'How long does it take to ship a plugin with Unoff?',
    answer:
      'Wiring scaffolding, native UI, payments, analytics, error tracking, auth, announcements, localization, and a CORS proxy by hand takes roughly 13 to 23 days. With Unoff, the same setup takes about 1 to 2 days.',
  },
]
