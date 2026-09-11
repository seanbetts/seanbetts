# Developing the portfolio

## Run locally

```sh
npm ci
npm start
```

Open the local URL printed by the development server. Set `HOST` and `PORT` when a specific address is needed; the temporary preview URLs used during design work are not permanent services.

## Validate and build

```sh
CI=true npm test -- --watchAll=false --runInBand
npm run build
```

Start, test and build commands prepare the responsive image exports automatically. The production build compiles the React app, prerenders its public routes and runs crawl and image checks. Cloudflare publishes `build/`. Building locally does not deploy the site. Crawl checks use a generated, ignored source inventory under `src/generated/`; it is not published.

Cloudflare build settings are `npm run build` and output directory `build`. For Pages, the exported directory index pages and top-level `404.html` provide native routing. `public/_redirects` retains legacy URLs; `public/_headers` retains response headers. No Netlify CLI or configuration is required.

See [deployment.md](deployment.md) for the production branch, custom domains,
edge redirects, verification and rollback details.

## Where changes belong

- `src/App.js` and `src/data/siteRoutes.js`: routing and the public route inventory. `/map` redirects home; old `/projects` URLs redirect to `/building`.
- `src/game/` and `src/pages/`: page layouts and content presentation. The standalone 404 sits outside the shared site shell.
- `src/components/InfoPopover.js`: shared Writing and Speaking summary interaction; its CSS Module owns the shared presentation.
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

Use the Node version in `.nvmrc`, which matches Cloudflare's `NODE_VERSION`.
The `Site validation` GitHub Actions workflow runs image-pipeline regression
tests, React tests, and the production build with crawl and image checks for
every pull request to `main`, including documentation changes. It also runs on
pushes to `main`. It uses published image exports as an optional cache.

Merge through a pull request after `Validate site` passes for an up-to-date
branch. The main branch protection requires this check, prevents force pushes
and deletion, and requires a pull request without a second-person approval.
