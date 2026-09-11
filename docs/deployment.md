# Cloudflare Pages deployment

The production website is https://www.seanbetts.com/. The apex domain redirects
to `www`, preserving the path and query string.

## Build and release

The Cloudflare account and Pages project are both named `seanbetts`. The project
is connected to the GitHub repository `seanbetts/seanbetts`.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Output directory | `build` |
| Root directory | Repository root |
| Environment variable | `NODE_VERSION=26.4.0` |
| Pages hostname | `seanbetts.pages.dev` |

Merge reviewed changes into `main`, then push `main` to automatically build and
deploy the production site. Other branches create preview deployments. Building
locally does not deploy anything.

The first successful Pages release was commit `500b744`, deployed on 11 September
2026. Its cold build took 19 minutes 20 seconds, mostly generating AVIF artwork.
Image preparation logs each completed source. Watch build duration when adding
artwork; locally cached exports do not represent a fresh remote build.

For documentation-only commits, the prefix `[CF-Pages-Skip]` skips a Pages
deployment. See the [GitHub integration documentation](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/).

## DNS and edge redirects

Both `seanbetts.com` and `www.seanbetts.com` are proxied CNAME records targeting
`seanbetts.pages.dev`, with automatic TTL. Both are associated with the Pages
project as custom domains.

Two Single Redirect rules in the `seanbetts.com` zone complement the repository's
`public/_redirects`:

- **Canonical website: apex to www** matches host `seanbetts.com` except paths
  starting with `/.well-known/`, returning a 301 to
  `concat("https://www.seanbetts.com", http.request.uri.path)` and preserving the
  query string. The exception allows Pages certificate validation and renewal.
- **Legacy Map URLs** matches `/map` and `/map/` on the apex or `www`, returning a
  301 to `https://www.seanbetts.com/` and preserving the query string. The edge
  rule covers the trailing-slash alias, which is absent from the Pages export.

The pre-existing Local Web shortcut rule and unrelated DNS records are unchanged.

## Verification and rollback

The migration verified all 24 public pages, project and Map aliases, real 404
responses with `noindex`, HTTPS/canonical redirects, security headers, and asset
caching on the public domain. The hosted HTML has no Google Analytics tag or
Cloudflare analytics beacon. The Pages build also passed crawl and image checks.

Netlify automatic builds are stopped, retaining its published deployment from
commit `c5e0254` as the rollback target. Keep builds stopped unless deliberately
resuming Netlify deployments. To roll back, restore
both website CNAME targets to `seanbetts.netlify.app`, retaining proxied status
and automatic TTL. The canonical redirect can remain enabled. Disable the
Legacy Map URLs rule if restoring the previous Map behaviour is required.
Verify the public site after any routing change. When moving back to Pages,
check custom-domain activation again before declaring the switch complete.

## Build performance and merge checks

Image preparation can reuse matching exports from the current production site;
see [responsive-images.md](responsive-images.md) for validation, fallback and
cache invalidation. Fresh builds only need to encode new or changed images when
the published cache is available. Full offline builds retain the original cold
encoding cost.

Before merging to `main`, the required GitHub Actions check `Validate site` runs
the image pipeline regression tests, React tests and production build. Main
requires an up-to-date pull request, blocks force pushes and deletion, and does
not require another person to approve a solo-maintained change. Cloudflare
publishes the resulting push to `main`; its preview deployments remain separate.
