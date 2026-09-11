# Developing the portfolio

## Run locally

```sh
npm ci
npm start
```

Open the local URL printed by the development server. Use `npm start -- --host 127.0.0.1 --port 3017 --strictPort` when a specific address is needed; the temporary preview URLs used during design work are not permanent services.

## Validate and build

```sh
node --test scripts/tests/*.test.cjs
npm test
npm run build
```

Start, test and build commands prepare the responsive image exports automatically. The production build lints the source, compiles the React app with Vite, checks browser/server CSS-module parity, prerenders its public routes and runs crawl and image checks. Cloudflare publishes `build/`. Building locally does not deploy the site. Crawl checks use a generated, ignored source inventory under `src/generated/`; it is not published.

Cloudflare build settings are `npm run build` and output directory `build`. For Pages, the exported directory index pages and top-level `404.html` provide native routing. `public/_redirects` retains legacy URLs; `public/_headers` retains response headers. No Netlify CLI or configuration is required.

See [deployment.md](deployment.md) for the production branch, custom domains,
edge redirects, verification and rollback details.

## Build and test tooling

`vite.config.mjs` is shared by browser and static-renderer builds. The root
`index.html` is Vite's entry template; `public/` contains files copied unchanged.
JSX-bearing source uses `.jsx`; extensionless imports continue to work.
`postcss.config.mjs` retains Autoprefixer and the package's browserslist targets.
Hashed bundles stay under `build/static/` for the existing immutable cache rule.

`npm test` runs the React suite once with Vitest/JSDOM, serially as in the
previous CI setup; `npm run test:watch`
starts watch mode. `npm run lint` checks source and Hooks rules. The existing
Node image tests run separately, alongside the CSS-module regression test.
JSDOM reports unsupported scroll/navigation operations in a few existing tests;
real-browser checks cover those interactions.

`scripts/prerender.cjs` builds a temporary Node bundle, compares its complete
CSS-module map with the browser's map (including composed classes), then writes
the static export. Both temporary maps and the server bundle are removed;
only static files are published. `build/.vite/` may remain as an empty directory.
Vite/PostCSS emits a missing `from` metadata warning for declarations imported
through CSS Modules `composes`. The shared Frame/Page declarations currently
contain no asset URLs; the font and logo URLs resolve correctly and rendered
layout matches the preceding build. Recheck asset resolution if those shared
modules gain relative asset URLs.

## Routing

Browser and test routing APIs, plus build-time StaticRouter, come from
`react-router` 7.18.3 or a compatible v7 release. Keep imports unified; the old
`react-router-dom/server` entry no longer exists. The app remains a static
portfolio with BrowserRouter and the existing prerender pipeline.

After router updates, verify direct route loads, internal navigation, browser
back/forward, About-to-project return links, anchor links, `/map` redirects,
404 recovery and hydration, alongside the existing tests and export checks.

## Where changes belong

- `src/App.jsx` and `src/data/siteRoutes.js`: routing and the public route inventory. `/map` redirects home; old `/projects` URLs redirect to `/building`.
- `src/game/` and `src/pages/`: page layouts and content presentation. The standalone 404 sits outside the shared site shell.
- `src/components/InfoPopover.jsx`: shared Writing and Speaking summary interaction; its CSS Module owns the shared presentation.
- `src/data/`: projects, project artwork, articles, speaking appearances, brand logos, navigation and shared site identity. Omit a project hero image when none is available; image errors retain the illustrated fallback.
- `public/images/`: source images. Generated responsive exports and their manifest are ignored by Git.
- `src/components/Page.module.css`: shared back-link styling.
- `src/game/Frame.module.css`: shared frame primitives; keep page-specific crops in the page's CSS Module.

Project `url` values should point to destinations that visitors can access publicly. Set `url: null` for a private repository or a project without a public destination. Its portfolio page and internal navigation remain available, but the external project button is omitted. YouTube SDG Analysis uses this convention because its repository is private.

Before finishing a UI change, check desktop and mobile layouts, both themes, keyboard navigation and the affected interactions. Writing and Speaking summaries support hover, focus, tap, Escape and outside dismissal. About-to-project navigation preserves a return link. Confirm the unknown-route recovery screen as well as ordinary pages.

## Supporting notes

- [Frame system](frame-system.md)
- [Responsive images](responsive-images.md)
- [Search and AI discovery](search-and-ai.md)
- [Artwork sources](artwork.md)

Historical design plans and generation briefs remain available in Git history.

## Pull requests

For manually created worktrees, use `.worktrees/<task-name>/` inside the main
repository. Verify the directory is ignored with `git check-ignore` before
creating a checkout. Use `codex/` branch names and Git's `worktree add`, `move`
and `remove` commands to keep its registry consistent. Avoid sibling
`seanbetts-worktrees` folders and temporary-directory checkouts.

After a change is merged and verified, check that its worktree has no unmerged
commits, uncommitted work, unique local files or running processes before
removing it and its merged branch. Remove the empty `.worktrees/` directory
when no worktrees remain. Worktrees managed by the Codex app should be managed
through the app's own lifecycle rather than relocated manually.

Use the Node version in `.nvmrc`, which matches Cloudflare's `NODE_VERSION`.
The `Site validation` GitHub Actions workflow runs image-pipeline regression
tests, React tests, and the production build with crawl and image checks for
every pull request to `main`, including documentation changes. It also runs on
pushes to `main`. It uses published image exports as an optional cache.

Merge through a pull request after `Validate site` passes for an up-to-date
branch. The main branch protection requires this check, prevents force pushes
and deletion, and requires a pull request without a second-person approval.
