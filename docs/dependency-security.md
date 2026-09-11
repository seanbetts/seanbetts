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

Updates used named package installs/updates with lifecycle scripts disabled.
No forced audit fix, major framework migration or dependency overrides were
used. Normal install/build commands remain documented in `development.md`.

## Remaining findings and exposure

`npm audit --omit=dev --json` changed from 69 affected packages (3 critical,
35 high, 14 moderate, 17 low) to 63 (0 critical, 31 high, 16 moderate, 16 low).
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

After dependency changes, run the existing React tests and production build.
The build must also pass prerender, crawl and image checks because this project
uses webpack's configuration directly for its static export.
