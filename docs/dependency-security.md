# Dependency security triage

Reviewed on 11 September 2026. The site publishes static HTML, CSS, JavaScript
and images. CRA, webpack, JSDOM and the development server run during local
development or builds; they are not deployed as a Node server.

## Compatible updates

- React Router DOM and React Router: 6.26.1 to 6.30.6, with
  `@remix-run/router` 1.19.1 to 1.23.4. This removes the reported high-severity
  router advisory and earlier redirect advisories without a v7 migration.
- webpack: 5.94.0 to 5.110.3, retaining the explicit webpack 5 pin used by
  the prerender pipeline. This removes its reported build-time URL allow-list
  advisories. Its normal dependency updates are recorded in the lockfile.
- Compatible transitive updates: form-data 3.0.1 to 3.0.5, shell-quote 1.8.1
  to 1.10.0 and websocket-driver 0.7.4 to 0.7.5. These remove all three
  critical package findings in the baseline audit. They belong to JSDOM or
  CRA's development tooling, rather than the site's browser application.

The initial review used named package installs/updates with lifecycle scripts
disabled. A subsequent maintenance pass used
`npm audit fix --ignore-scripts --no-fund` to update 74 existing package versions
within their parents' supported ranges. Direct dependency declarations remain
unchanged. The lockfile includes patched Babel, AJV, brace-expansion,
cross-spawn, Express/body-parser, http-proxy-middleware, js-yaml, lodash,
PostCSS 8, Rollup, WebSocket and YAML dependencies, among others.

No forced audit fix, major framework migration or dependency overrides were
used. Normal install/build commands remain documented in `development.md`.

## Remaining findings and exposure

The initial `npm audit --omit=dev --json` changed from 69 affected packages
(3 critical, 35 high, 14 moderate, 17 low) to 63 (0 critical, 31 high,
16 moderate, 16 low). The subsequent maintenance pass reduced the full
`npm audit --json` count from those same 63 packages to **32 affected packages:
0 critical, 14 high, 9 moderate and 9 low**.
These counts include vulnerable-package propagation through the dependency
tree; they are not counts of independently exploitable issues. CRA is currently
declared in `dependencies`, so `--omit=dev` still includes its build tooling.
Repeat the audit when updating: advisory metadata and available fixes change.

Two moderate React Router advisories remain in npm's affected-version ranges:

- [Backslash navigation redirect](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6):
  requires an attacker-supplied path to reach a navigation API. This site's
  route destinations and About/Building return-link state are supplied by
  its own code and project catalogue; no URL query input is used as a return
  destination. Revisit this if user-provided destinations are introduced.
- [Error deserialization during router hydration](https://github.com/advisories/GHSA-337j-9hxr-rhxg):
  concerns React Router's serialized error hydration path. The site uses
  BrowserRouter, build-time StaticRouter and React's `hydrateRoot`; it does
  not use a data router or serialized loader/action errors. React hydration
  itself does not establish that this affected router path is used.

The published fixes in these advisories require React Router 7.18 or later.
They remain recorded debt, not an assertion that the installed v6 packages
are advisory-free. A v7 migration should be evaluated separately.

Other remaining findings predominantly concern CRA's build, test and local
development dependencies. Review and upgrade those tools separately, taking
particular care with untrusted build inputs and development-server exposure.
Do not deploy the development server. The audit's proposed forced replacement
of `react-scripts` with version `0.0.0` is not a usable remediation plan.

The remaining source packages are `@tootallnate/once`, `nth-check`, `postcss`,
`qs`, `react-router`, `serialize-javascript`, `svgo`, `underscore`, `uuid` and
`webpack-dev-server`; the other affected packages propagate these findings.
In particular:

- The remaining PostCSS finding is the PostCSS 7 copy inside
  `resolve-url-loader`, not the updated root PostCSS 8 dependency.
- Express 4.22.2 requires `qs ~6.15.1`, which excludes the patched 6.16.0.
  Body-parser's separate copy is already 6.16.0.
- JSONPath 1.3.0 pins Underscore exactly to 1.13.6. Neither this nor Express's
  constraint can be resolved by another compatible lockfile update, even
  though npm labels these findings `fixAvailable: true`.
- CRA retains old SVGO/nth-check, serializer, UUID, development-server and
  Jest/JSDOM dependencies. Updating the direct JSDOM package alone would not
  remove Jest's separate legacy dependency chain.

## Recommended separate migration

[React has deprecated Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app).
Replacing `react-scripts` is warranted to address the remaining tooling debt.
Evaluate a maintained build tool such as Vite in a separate change; React 18
and the current site design need not change at the same time.

This is more than a build-command substitution: `scripts/prerender.cjs` imports
CRA's webpack configuration and adapts its plugins and CSS handling for the
Node renderer. A replacement must preserve matching CSS-module names between
browser and server builds, hydration, all 24 static pages and the true 404,
metadata, redirects, sitemap/llms output and responsive-image preparation.
Replace or decouple the CRA/Jest test harness as part of that migration, then
reassess JSDOM and the remaining audit. Assess React Router 7 separately using
the navigation and hydration exposure described above.

## Validation of the maintenance pass

A fresh `npm ci --ignore-scripts --no-audit --no-fund` succeeded, followed by
11 image-pipeline regression tests and 93 React tests across 14 suites. The
production build passed, prerendering 24 pages plus the 404. Crawl checks
covered all 24 pages and 39 appearances; image checks covered 135 rendered
images across 25 pages. The generated main JavaScript and CSS asset names
match the production release preceding this maintenance pass.

Repeat these checks after future dependency changes; the static export relies
on webpack configuration directly and must stay consistent with the browser.
