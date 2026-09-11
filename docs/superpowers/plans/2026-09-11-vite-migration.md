# Vite Migration Implementation Plan

> **For agentic workers:** Execute tasks in order, tracking their checks below.

**Goal:** Replace CRA build and tests while preserving the static portfolio.
**Architecture:** Shared Vite client/SSR configuration, existing static writer,
Vitest/JSDOM React tests, explicit lint and existing Node export checks.
**Tech Stack:** React 18, React Router 6, Vite 8, Vitest 5, JSDOM 30.
**Spec:** `docs/superpowers/specs/2026-09-11-vite-migration.md`

## Global Constraints

- Preserve the site design, public content, 24 routes plus a true 404, SEO,
  redirects, responsive images and Cloudflare Pages.
- React 18 and React Router 6 remain unchanged. No runtime server is deployed.
- Keep `build/` and hashed assets under `static/`.

## Tasks

- [x] Capture the preceding build outside Git for content and browser comparison.
- [x] Add `vite.config.mjs`, root `index.html`, PostCSS and ESLint configuration;
  remove CRA/webpack/Babel-only dependencies; retain browser targets and images.
  Use `vite build` for browser output and `build({build:{ssr:'src/prerender.jsx'}})`
  for the temporary renderer. Share configuration, disable public copying in SSR.
- [x] Replace the webpack wrapper in `scripts/prerender.cjs` with Vite's build API;
  preserve the existing renderPage/siteRoutes contract and output writer.
- [x] Rename JSX source files, translate `jest.fn/spyOn/restoreAllMocks` to `vi`,
  replace isolateModules/require with resetModules/dynamic import, and configure
  `test: {environment:'jsdom',globals:true,setupFiles:['./src/setupTests.js']}`.
- [x] Compare complete browser/server CSS-module export maps during prerendering;
  test matching, missing and altered composed-class mappings.
- [x] Run `npm ci`, `node --test scripts/tests/*.test.cjs`, `npm test`, and
  `npm run build`; inspect full failures before adjusting compatibility details.
- [x] Serve baseline and new exports locally; compare all page content/metadata,
  desktop/mobile layouts and both themes, then exercise navigation and hydration.
- [ ] Update development/security/deployment notes and required CI commands;
  review diff, commit, open PR, verify preview, merge and verify production.
