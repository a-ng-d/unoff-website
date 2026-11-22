# unoff.dev

The website of [Unoff](https://unoff.dev), the toolkit to build, ship and monetize Figma
and Penpot plugins. Static [Astro](https://astro.build) site on the
[@unoff/ui](https://ui.unoff.dev) design system, deployed on Netlify.

## Develop

```bash
nvm use            # Node 24 (.nvmrc)
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check + static build to dist/
npm run preview
```

## Deploy (Netlify)

`netlify.toml` holds everything: build command `npm run build`, publish directory `dist`,
Node 24, long cache on `/_astro/*` and security headers. No environment variable is needed.

After the first production deploy on `unoff.dev`:

1. Point the domain to Netlify (DNS at OVH today, apex and `www`).
2. In Google Search Console (the domain is already verified by DNS), submit
   `https://unoff.dev/sitemap-index.xml` and request indexing of the home page.

## Structure

| Path | What |
| --- | --- |
| `src/pages/` | `/`, `/figma`, `/penpot`, `/integrations`, `/integrations/<service>`, `404`, `robots.txt`, `llms.txt`, `llms-full.txt` |
| `src/data/` | All copy, links, pricing, FAQ, integrations and JSON-LD builders |
| `src/components/` | Sections and UI blocks |
| `src/styles/` | Tokens (@unoff/ui), global styles, motion |
| `.claude/` | Conventions skill and agents (orchestrator, SEO, facts, style) |
| `docs/seo/` | SEO program and backlog |

## License

MPL 2.0, Yelbolt.
