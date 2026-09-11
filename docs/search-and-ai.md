# Search and AI discovery

`npm run build` compiles the browser app, renders its routes to static HTML, then runs `check:crawl` against the generated output. No crawler-specific rendering or hosted prerender service is used. Humans and bots receive the same HTML.

## Sources and ownership

- `src/data/siteRoutes.js`: page routes, navigation labels/order and public route inventory, including every project in `projectsData.jsx`.
- `src/data/siteIdentity.js`: shared Person and WebSite identities and profile URLs used by the site and AI index.
- `src/components/Seo.jsx`: one title, description, canonical and connected page schema. Page-specific lists and projects reference the same person.
- `src/prerender.jsx`: renders the actual React routes using StaticRouter and collects Helmet metadata.
- `scripts/prerender.cjs`: uses the shared Vite configuration and checks full CSS-module export parity; writes route HTML, a 404 document, sitemap, a source inventory for validation and llms.txt. Temporary server bundles are removed after each build.
- `public/robots.txt`: permits public crawling and signals permission for AI training, search, retrieval and reuse. Content-Signal is an optional extension; ordinary robots rules remain valid without support for it.

Do not maintain a second sitemap in public. Dates are omitted until there is an authoritative per-page content modification date; build time is not a content update date. The route catalogue and sitemap contain canonical URLs only, excluding error pages and retired aliases.

The browser hydrates the static HTML. Theme starts in the same state as the static page and restores a saved preference after hydration. Speaking includes the entire archive in initial HTML; the interactive view progressively reveals rows without removing their content from the DOM. Navigation remains available without JavaScript.

## Hosting

Cloudflare publishes `build`. On Cloudflare Pages, generated directory index files serve known pages and the top-level `404.html` handles unknown paths with HTTP 404. There is no blanket SPA rewrite or Netlify-style 404 rule. The old Projects aliases and Map redirect are preserved. Static files are served normally, including robots.txt and llms.txt. The 404 page carries noindex in the initial response.

Cloudflare deployment settings and crawler controls are managed by the site owner. Keep Search, Agent and Training allowed, crawler-specific blocks disabled, and managed restrictive robots content off. A repository change cannot override a block at the edge.

## Verification

Run `npm run build` and the React tests. The build compares the sitemap with the full source route inventory and verifies each page’s readable content, canonical URL, singular description and connected identities. It checks every speaking appearance by ID and title, legacy redirects, the AI index and the exported 404. Counts follow the source data rather than fixed totals. Image checks include the 404 artwork.

Before publishing, check the generated site with JavaScript enabled and disabled. After deployment, fetch representative pages and unknown paths from the public domain, check response codes and initial HTML, and use Search Console URL Inspection and structured-data validation. Cloudflare logs can identify the actual URLs behind the previously observed 404 requests; aggregate counts alone cannot establish whether these were removed pages or crawler probes.

## IndexNow deployment notifications

`.github/workflows/indexnow.yml` runs separately after successful `Site validation` on `main`. It waits for both GitHub validation and the Cloudflare Pages check for that commit, confirms the public `indexnow-manifest.json` belongs to the same commit, and verifies `indexnow-key.txt`. It skips superseded commits and excludes pull requests and previews. No notification runs inside the browser or build.

The build creates content hashes from each canonical page's readable main content, headings, links, media sources, search metadata and JSON-LD. Referenced local media files are also digested, so replacing an animation or reduced-motion poster at the same URL counts as a content change; remote media is compared by URL without fetching it. Class names, script/style bundles and display metadata are ignored. The output check verifies the hashes against the exported HTML and the URL list against the sitemap. Revision comes from `CF_PAGES_COMMIT_SHA`, `GITHUB_SHA`, or the local Git HEAD in that order.

The notification compares this manifest with the last successful submission, sending added, changed and removed URLs to [IndexNow](https://www.indexnow.org/documentation). The first production run seeds all current pages. Later unchanged deployments send nothing. The baseline is held in a GitHub Actions cache; if it expires or is evicted, the next run seeds current pages again and cannot recover historical deleted URLs. This is a best-effort notification service, with the sitemap remaining the durable discovery source.

The public ownership key is intentionally committed in `public/indexnow-key.txt`; it is not a credential. The workflow needs only GitHub's temporary read-only token. The manifest and key have `noindex` response headers and are omitted from the sitemap.

HTTP 200 is accepted; HTTP 202 is accepted pending key verification. Both save the baseline. Other responses fail the notification job without advancing its baseline or changing the deployed website. Review the workflow summary for URLs and status. After resolving a failure (including waiting after HTTP 429), rerun the job to retry outstanding changes. Successful acceptance does not guarantee indexing or AI citations.

To inspect without sending, run the **IndexNow** workflow manually on `main` with **dry_run** checked (the default). A dry run also leaves the baseline unchanged. To retry submissions manually, uncheck it. The equivalent local command is `GITHUB_TOKEN=… node scripts/indexnow.cjs --revision <production-commit>`; it defaults to a dry run and requires `--submit` to send. Keep tokens out of shell history by supplying them through the environment.

IndexNow complements Google Search Console and Bing Webmaster Tools; continue checking their crawl and indexing reports. This workflow does not change Cloudflare crawler controls or establish indexing/citation performance.
