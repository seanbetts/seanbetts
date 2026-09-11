# Dependency security triage

Reviewed on 11 September 2026 after the Vite migration. The site publishes static
HTML, CSS, JavaScript and images; build/test tools are not deployed as a Node server.

## Current audit

The full `npm audit --json` reports **2 affected packages: 0 critical, 0 high,
2 moderate and 0 low**. Both entries are React Router (`react-router` and its
parent `react-router-dom`); they propagate the same source advisories.
`npm audit --omit=dev --json` reports the same two packages. Repeat the audit
when updating because advisory metadata and available fixes change.

| Review stage | Critical | High | Moderate | Low | Total affected packages |
| --- | ---: | ---: | ---: | ---: | ---: |
| Initial baseline | 3 | 35 | 14 | 17 | 69 |
| Initial compatible fixes | 0 | 31 | 16 | 16 | 63 |
| Transitive maintenance | 0 | 14 | 9 | 9 | 32 |
| Vite and Vitest migration | 0 | 0 | 2 | 0 | 2 |

Counts include vulnerable-package propagation through the tree; they are not
counts of independently exploitable issues. Historical CRA tooling was declared
in `dependencies`, so the earlier omit-dev audit still included it. The current
full audit covers all development dependencies as well as the browser application.

## Tooling migration

[React deprecated Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app).
Vite now builds both the browser and temporary static renderer; Vitest/JSDOM
run the existing React tests. CRA, webpack, its development server, Babel preset
and legacy Jest dependency chains have been removed. React 18.3.1, React DOM
18.3.1, React Router 6.30.6, React Helmet 6.1.0 and Phosphor 2.1.7 are retained.
No forced audit fix or dependency override is used.

The new lockfile was resolved from the replacement tooling manifest because
npm's incremental resolution retained incompatible optional Babel peer packages
from CRA. A clean install and `npm ls` verify the resolved dependency tree.

## Remaining React Router findings

- [Backslash navigation redirect](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6):
  requires an attacker-supplied path to reach a navigation API. Route destinations
  and About/Building return-link state come from the site's own code and catalogue;
  no URL query input is used as a return destination. Revisit if that changes.
- [Error deserialization during router hydration](https://github.com/advisories/GHSA-337j-9hxr-rhxg):
  concerns serialized error hydration. This site uses BrowserRouter, build-time
  StaticRouter and React's hydrateRoot, without a data router or serialized
  loader/action errors. React hydration does not establish use of this affected path.

The published fixes require React Router 7.18 or later. Evaluate that migration
separately; these packages remain recorded debt, not advisory-free dependencies.

## Validation

The migration retains 93 React tests in 14 suites and 11 image-pipeline tests,
and adds one regression test for browser/server CSS-module consistency. The
production build compares all 14 CSS-module export maps, generates 24 pages plus
404, and checks crawl output, 39 appearances and 135 images across 25 documents.
ESLint explicitly checks source and Hooks rules before building.

Content and metadata match the preceding export, excluding generated CSS class
names and equivalent viewport whitespace. Browser comparisons cover nine page
types at 1440px and 390px in both themes, with matching layout/computed-style
measurements. Run the documented commands and repeat browser checks after future
build-tool changes; passing unit tests alone does not establish hydration parity.
