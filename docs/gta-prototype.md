# GTA portfolio prototype

Local prototype on `codex/gta-prototype`. No production deployment.

## Preview

The current production-build preview is http://127.0.0.1:3017. The live development preview is http://127.0.0.1:3016. These are local processes and last only while running.

To restart development, use Node 24 (`nvm use` if available), then:

```sh
npm ci
BROWSER=none HOST=127.0.0.1 PORT=3016 npm start
```

On the current machine, Node 24 is bundled at `/Users/sean/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin`; prepend it to PATH if the shell selects Node 26.

```sh
CI=true npm test -- --watchAll=false --runInBand
npm run build
```

## Try it

1. Select Building on the cover, then sideBar.
2. Try Overview, Features and Tech; arrow keys work between tabs.
3. Open Map, select destinations and try zoom/reset.
4. Open Thought Leadership from the cover for the existing global-brand proof, then Writing or Speaking.
5. Click the main portrait or wordmark to open About.
6. Try the menu, Escape, social icons and the stacked mobile panels.

The new treatment covers Home, About, Thought Leadership, Building, project pages and Map. Writing, Speaking and Contact keep their existing layouts for the next iteration. Audio is deferred. All original project records are used.

The approved cover composition is recorded in `superpowers/specs/2026-09-08-gta-prototype.md`; verification and deliberate adaptations are recorded in the plan. Artwork provenance is in `public/images/game/README.md`. The Pricedown wordmark is fixed vector art, not an embedded font.

Verified: 45 tests / 14 suites; successful optimized build; desktop and mobile browser navigation; clean core production console; independent review and regression fixes.

## Cover refinements

The cover uses matching polygon boundaries and a single SVG overlay for consistent 11px diagonal dividers. Mobile panels use straight 10px gaps for a clean vertical reading order. Thought Leadership replaces the map tile; Map remains in the header. The main portrait is one About link with Hands-on AI Leader beneath the fixed wordmark and two single-line, dot-separated statements for expertise and advocacy. Social icons retain accessible names and 44px targets. The Thought Leadership page reuses the original global-brand copy and all 21 logos.

## About page

About now uses the portfolio shell, an illustrated portrait introduction, chapter shortcuts and three illustrated reading sections. The original biography, four contextual project links and profile metadata are retained. Section actions lead to Thought Leadership, Building and Speaking, with Contact available from the header and advocacy email icon. Project links preserve the return-to-About journey. The panels share sloping black dividers, with angled image edges and upright text. Phone layouts stack short illustration banners above the text. Social icons have no decorative borders; the bottom contact box is removed. New artwork remains a later pass.

## Daylight and night modes

The header sun/moon control restores the shared, saved theme preference. Night is the default for a new visitor; a previous explicit choice is respected immediately. Daylight uses a pastel pink canvas with lavender, sunset-pink and pale turquoise reading surfaces, deep purple text and a vivid berry accent. Illustrated overlays and the map retain their dark artwork palette for legibility. The footer credit is centred using equal outer grid columns, with a centred second row on phones: pink heart at night, purple in daylight. Footer social icons remain 23px; About icons remain 36px.

Structural blocks now use a shared near-black outer frame as well as internal dividers (22px desktop, 16px mobile). Home, About, Thought Leadership, the project collections/dossiers and Map use the same frame token; adjoining About chapters share a single horizontal edge.

The homepage panels use their full clickable artwork and captions without link arrows. The theme toggle and navigation menu share a compact control group with adjacent 44px click targets.

The footer credit inherits the surrounding footer typography while remaining centred. The homepage profile line reads “Autistic · Neurodiversity & Mental Health Speaker”. Map is available at desktop widths (1024px and above); narrower viewports omit all map links, use Home as the Building breadcrumb, and redirect direct map visits to Home. Resizing an open map below the cutoff also returns Home.
