# Search and AI discovery

`npm run build` compiles the browser app, renders its routes to static HTML, then runs `check:crawl` against the generated output. No crawler-specific rendering or hosted prerender service is used. Humans and bots receive the same HTML.

## Sources and ownership

- `src/data/siteRoutes.js`: public route inventory, including every project in `projectsData.js`.
- `src/data/siteIdentity.js`: shared Person and WebSite identities.
- `src/components/Seo.js`: one title, description, canonical and connected page schema. Page-specific lists and projects reference the same person.
- `src/prerender.js`: renders the actual React routes using StaticRouter and collects Helmet metadata.
- `scripts/prerender.cjs`: uses CRA's webpack/CSS configuration to match browser class names; writes route HTML, a 404 document, sitemap, Netlify route rules and llms.txt. Temporary server bundles are removed after each build.
- `public/robots.txt`: permits public crawling and signals permission for AI training, search, retrieval and reuse. Content-Signal is an optional extension; ordinary robots rules remain valid without support for it.

Do not maintain a second sitemap in public. Dates are omitted until there is an authoritative per-page content modification date; build time is not a content update date. The route catalogue and sitemap contain canonical URLs only, excluding error pages and retired aliases.

The browser hydrates the static HTML. Theme starts in the same state as the static page and restores a saved preference after hydration. Speaking includes the entire archive in initial HTML; the interactive view progressively reveals rows without removing their content from the DOM. Navigation remains available without JavaScript.

## Hosting

Netlify builds and publishes `build`. Only known pages receive successful route rewrites. Other paths receive `404.html` with HTTP 404. The old Projects aliases and Map redirect are preserved. Static files are served normally, including robots.txt and llms.txt. The 404 page carries noindex in the initial response.

Cloudflare is configured separately by the site owner. Keep Search, Agent and Training allowed, crawler-specific blocks disabled, and managed restrictive robots content off. A repository change cannot override a block at the edge.

## Verification

Run `npm run build` and the React tests. The build checks all 20 current public pages, readable content, canonical URLs, singular descriptions, connected identities, complete speaking archive and generated error routing. When adding or removing content, update explicit inventory assertions in `scripts/check-crawl.cjs` as needed.

Before publishing, check the generated site with JavaScript enabled and disabled. After deployment, fetch representative pages and unknown paths from the public domain, check response codes and initial HTML, and use Search Console URL Inspection and structured-data validation. Cloudflare logs can identify the actual URLs behind the previously observed 404 requests; aggregate counts alone cannot establish whether these were removed pages or crawler probes.

This work does not submit URLs to search engines, alter Cloudflare settings, or establish indexing/citation performance. It does not add new editorial sections or optimise artwork files.
