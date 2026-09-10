# GTA portfolio prototype

Local prototype on `codex/gta-prototype`. No production deployment.

## Busted 404

Unknown routes now show the approved full-bleed motorbike scene with a cyan Pricedown Busted wordmark, translucent band, page-not-found copy and Return home link. Preview at `http://127.0.0.1:3016/404`. It deliberately stands outside both site layouts to preserve the game failure-screen composition. The source image is unchanged; all overlays are separate code/vector elements. Narrow screens use the approved close crop; short landscape screens reduce the wordmark to keep recovery visible. Keyboard entry focuses the error content, and returning home restores the portfolio layout and saved theme. The existing project-specific missing-record page is retained.

Verified 9 September 2026: 49 tests across 15 suites, successful production build, desktop and phone browser rendering, keyboard recovery to Home. The existing React Helmet development StrictMode warning remains. Asset provenance is in [artwork.md](artwork.md).

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

The approved cover composition is recorded in `superpowers/specs/2026-09-08-gta-prototype.md`; verification and deliberate adaptations are recorded in the plan. Artwork provenance is in [artwork.md](artwork.md). The Pricedown wordmark is fixed vector art, not an embedded font.

Verified: 45 tests / 14 suites; successful optimized build; desktop and mobile browser navigation; clean core production console; independent review and regression fixes.

## Cover refinements

The cover uses matching polygon boundaries and a single SVG overlay for consistent 11px diagonal dividers. Mobile panels use straight 10px gaps for a clean vertical reading order. Thought Leadership replaces the map tile; Map remains in the header. The main portrait is one About link with Hands-on AI Leader beneath the fixed wordmark and two single-line, dot-separated statements for expertise and advocacy. Social icons retain accessible names and 44px targets. The Thought Leadership page reuses the original global-brand copy and all 21 logos.

## About page

About now uses the portfolio shell, an illustrated portrait introduction, chapter shortcuts and three illustrated reading sections. The original biography, four contextual project links and profile metadata are retained. Section actions lead to Thought Leadership, Building and Speaking, with Contact available from the header and advocacy email icon. Project links preserve the return-to-About journey. The panels share sloping black dividers, with angled image edges and upright text. Phone layouts stack short illustration banners above the text. Social icons have no decorative borders; the bottom contact box is removed. New artwork remains a later pass.

## Daylight and night modes

The header sun/moon control restores the shared, saved theme preference. Night is the default for a new visitor; a previous explicit choice is respected immediately. Daylight uses a pastel pink canvas with consistent pale-lilac reading surfaces, deep purple text and a vivid berry accent. Illustrated overlays and the map retain their dark artwork palette for legibility. The footer credit is centred using equal outer grid columns, with a centred second row on phones: pink heart at night, purple in daylight. Footer social icons remain 23px; About icons remain 36px.

Structural blocks now use a shared near-black outer frame as well as internal dividers (22px desktop, 16px mobile). Home, About, Thought Leadership, the project collections/dossiers and Map use the same frame token; adjoining About chapters share a single horizontal edge.

The homepage panels use their full clickable artwork and captions without link arrows. The theme toggle and navigation menu share a compact control group with adjacent 44px click targets.

The footer credit inherits the surrounding footer typography while remaining centred. The homepage profile line reads “Autistic · Neurodiversity & Mental Health Speaker”. Map is available at desktop widths (1024px and above); narrower viewports omit all map links, use Home as the Building breadcrumb, and redirect direct map visits to Home. Resizing an open map below the cutoff also returns Home.

About now uses one continuous ink frame around all four rows. Image windows clip diagonal seams inside that frame, replacing individually skewed image borders; text and artwork remain upright. Mobile footer rows are copyright, a single centred social icon row, then the centred credit. Map and Contact are icon-only links alongside the theme and menu controls, with accessible labels and 44px click targets; Contact remains visible on mobile.

## Thought Leadership

Thought Leadership opens inside the continuous ink frame with a title-and-copy panel on the left and a John Lewis delivery portrait on the right. The heading reads “AI thought leadership for global brands.” with the original strategic-perspectives paragraph beneath. The speaking image, eyebrow, expertise tagline and duplicate Global Brands strip are removed. The retained high street joins directly below the title row. Its six original SVG logos appear on four storefronts, a poster and a van. The street pans horizontally on phones, with all 21 brand names retained in a compact disclosure below the collage. The former Writing/Speaking action container is removed; those destinations remain in the global menu. Artwork source notes are in [artwork.md](artwork.md); the original generation prompts remain in Git history.

Four additional cover-art scenes now sit below the high street: McDonald's chauffeur takeaway and Lidl marina portraits flank Warner Bros. film-set and Halfords holiday landscapes. Original SVG logos sit on generated blank bags, flight case and shop signage. Images and logos share an intrinsic-ratio stage so cropping preserves alignment and proportions. Matching diagonal cuts expose one shared ink canvas; phones stack the four scenes in reading order. The complete art direction is in `docs/brand-box-art-plan.md`; artwork source notes are in [artwork.md](artwork.md), with the original generation prompts retained in Git history.
