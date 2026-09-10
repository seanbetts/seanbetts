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

Start, test and build commands prepare the responsive image exports automatically. The production build compiles the React app, prerenders its public routes and runs crawl and image checks. Only `build/` is published by Netlify. Building locally does not deploy the site.

## Where changes belong

- `src/App.js` and `src/data/siteRoutes.js`: routing and the public route inventory. `/map` redirects home; old `/projects` URLs redirect to `/building`.
- `src/game/` and `src/pages/`: page layouts and content presentation. The standalone 404 sits outside the shared site shell.
- `src/components/InfoPopover.js`: shared Writing and Speaking summary interaction; page styles control its appearance.
- `src/data/`: projects, articles, speaking appearances, brand logos and shared site identity. Omit a project hero image when none is available; image errors retain the illustrated fallback.
- `public/images/`: source images. Generated responsive exports and their manifest are ignored by Git.
- `src/game/Frame.module.css`: shared frame primitives; keep page-specific crops in the page's CSS Module.

Before finishing a UI change, check desktop and mobile layouts, both themes, keyboard navigation and the affected interactions. Writing and Speaking summaries support hover, focus, tap, Escape and outside dismissal. About-to-project navigation preserves a return link. Confirm the unknown-route recovery screen as well as ordinary pages.

## Supporting notes

- [Frame system](frame-system.md)
- [Responsive images](responsive-images.md)
- [Search and AI discovery](search-and-ai.md)
- [Artwork sources](artwork.md)

The initial design plans under `docs/superpowers/` are historical records. Current code and these focused guides describe the implemented site.
