# Dependency security triage

Reviewed on 11 September 2026 after the React Router upgrade. The site publishes static
HTML, CSS, JavaScript and images; build/test tools are not deployed as a Node server.

## Current audit

Both the full `npm audit --json` and `npm audit --omit=dev --json` report
**zero findings** across all severities. Repeat the audit when updating because
advisory metadata and available fixes change.

| Review stage | Critical | High | Moderate | Low | Total affected packages |
| --- | ---: | ---: | ---: | ---: | ---: |
| Initial baseline | 3 | 35 | 14 | 17 | 69 |
| Initial compatible fixes | 0 | 31 | 16 | 16 | 63 |
| Transitive maintenance | 0 | 14 | 9 | 9 | 32 |
| Vite and Vitest migration | 0 | 0 | 2 | 0 | 2 |
| React Router 7.18.3 upgrade | 0 | 0 | 0 | 0 | 0 |

Counts include vulnerable-package propagation through the tree; they are not
counts of independently exploitable issues. Historical CRA tooling was declared
in `dependencies`, so the earlier omit-dev audit still included it. The current
full audit covers all development dependencies as well as the browser application.

## Tooling migration

[React deprecated Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app).
Vite now builds both the browser and temporary static renderer; Vitest/JSDOM
run the existing React tests. CRA, webpack, its development server, Babel preset
and legacy Jest dependency chains have been removed. React 18.3.1, React DOM
18.3.1, React Helmet 6.1.0 and Phosphor 2.1.7 are retained. React Router was
subsequently upgraded from 6.30.6 to 7.18.3.
No forced audit fix or dependency override is used.

The new lockfile was resolved from the replacement tooling manifest because
npm's incremental resolution retained incompatible optional Babel peer packages
from CRA. A clean install and `npm ls` verify the resolved dependency tree.

## React Router upgrade

Following the [official v6-to-v7 migration guide](https://github.com/remix-run/react-router/blob/react-router%407.18.3/docs/upgrading/v6.md),
the site now imports browser APIs and StaticRouter from the unified
`react-router` package. The `react-router-dom` wrapper and old
`@remix-run/router` dependency are removed. Version 7.18.3 resolves the two
previous source advisories:

- [Backslash navigation redirect](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6).
- [Error deserialization during router hydration](https://github.com/advisories/GHSA-337j-9hxr-rhxg).

Node 26.4 and React 18 meet v7's requirements. The existing BrowserRouter,
Routes and build-time StaticRouter architecture is retained. The site has no
multi-segment splat routes with relative links, component-local React.lazy,
data-router loaders/actions, fetchers or serialized error hydration to migrate.
Route paths and project return-link state are unchanged.

The export gains React Router's `data-discover="true"` attribute on internal
links; content, metadata, destinations and CSS remain the same. The browser
JavaScript bundle grows by about 6 kB gzipped with the newer router.

## Validation

Validation covers 93 React tests in 14 suites, 11 image-pipeline tests and
one regression test for browser/server CSS-module consistency. The
production build compares all 14 CSS-module export maps, generates 24 pages plus
404, and checks crawl output, 39 appearances and 135 images across 25 documents.
ESLint explicitly checks source and Hooks rules before building.

Content and metadata match the preceding export, excluding the new internal-link
discovery attribute. Browser comparisons cover nine page
types at 1440px and 390px in both themes, with matching layout/computed-style
measurements. Run the documented commands and repeat browser checks after future
build-tool changes; passing unit tests alone does not establish hydration parity.
