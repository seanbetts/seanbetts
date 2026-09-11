# Vite migration design

Migrate the existing browser build and static renderer to Vite, and the React
suite to Vitest. The approved scope preserves the site design, public content,
24 routes plus a true 404, SEO, redirects, responsive images and Cloudflare Pages.
React 18 and React Router 6 remain unchanged. No runtime server is deployed.

Use one Vite configuration for client and Node SSR builds so CSS-module names
agree during hydration. Keep `build/` and hashed assets under `static/` for
existing Pages settings and cache headers. Retain browserslist targets and
Autoprefixer. Rename JSX-bearing JavaScript files to `.jsx` so the toolchain
uses standard parsing. Keep the current static-page writer, route inventory,
image scripts and export checks. Build the temporary SSR bundle inside the
repository so Node can resolve external dependencies; always remove it.

Use Vitest with JSDOM and Testing Library; translate Jest mock/module APIs,
preserve all assertions and add export checks for browser/server CSS-module agreement.
Replace CRA's implicit linting with explicit ESLint checks. Update developer
commands and required CI, with no Cloudflare setting changes.

Acceptance: all tests and lint pass after a clean install; output checks pass;
compare content/metadata and rendered layouts with the preceding build at desktop
and mobile widths in both themes; navigation and hydration have no app errors;
PR review and required CI pass before merge, then verify production. Record
remaining audit findings without forcing unrelated major upgrades.
