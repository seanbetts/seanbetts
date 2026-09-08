# GTA portfolio prototype implementation plan

> **For agentic workers:** Use superpowers:subagent-driven-development for independent map and project surfaces, with controller integration and final review.

**Goal:** Make the approved illustrated cover, map and Building-to-sideBar journey work locally.

**Architecture:** Existing App routes select a scoped `GameShell` for prototype routes and retain legacy layout elsewhere. Shared design tokens and `SceneArt` provide consistent artwork. `WorldMap`, `GameBuilding` and `GameProject` consume existing router/data without backend changes.

**Tech Stack:** React 18, React Router 6, CSS Modules, Phosphor icons, existing Jest/Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-08-gta-prototype.md`

## Global constraints

- Worktree `/Users/sean/Coding/seanbetts-worktrees/gta-prototype`, branch `codex/gta-prototype`; local preview only.
- Real content/data/URLs, code-native controls, accessible navigation, reduced motion; no audio placeholder.
- Generated art and fixed Pricedown SVG wordmark are project assets. Do not embed/distribute font software.

## Tasks

### 1. Cover and shell (controller)
- [x] Baseline tests. Create focused route/menu tests that fail for missing prototype navigation.
- [x] Create `src/game/GameShell.js`, `GameShell.module.css`, `game.css`, `SceneArt.js`, `SceneArt.module.css`, `GameHome.js`, `GameHome.module.css`.
- [x] Interface: `<SceneArt scene="building|writing|speaking|about" className="" />` decorative absolute art. Public atlas `/images/game/scenes.webp`; portrait `/images/game/portrait.webp`; wordmark `/images/game/sean-betts.svg`.
- [x] Route prototype components in App; existing content preserved in legacy Home export for authority tests.
- [x] Verify real homepage links, menu Escape/route close and mobile layout.

### 2. Project collection and dossier (independent worker)
- [x] Create `src/game/GameBuilding.js`, `GameBuilding.module.css`, `GameProject.js`, `GameProject.module.css`, `GameProject.test.js`.
- [x] Interface: default React components `GameBuilding()` reads projectsData; `GameProject()` uses useParams and projectsData. Runs inside Router and GameShell; no App or shell edits.
- [x] Test missing-project recovery, tabs and contextual back navigation before implementing.
- [x] Real project links, media, data and accessible tabs; all projects reachable.

### 3. Map (independent worker)
- [x] Create `src/game/WorldMap.js`, `WorldMap.module.css`, `WorldMap.test.js` and optional vector map asset.
- [x] Interface: default component `WorldMap()` inside Router/GameShell; selectable destinations link to `/building`, `/writing`, `/speaking`, `/about`.
- [x] Test selecting a location changes detail/action and bounded zoom/reset before implementation.
- [x] Build carefully drawn illustrative vector map with coral route, destination pins, keyboard-operable controls and responsive details. No App or shared file edits.

### 4. Integrate and review (controller plus independent reviewer)
- [x] Run focused tests, full suite, production build.
- [x] Browser verify `/` → Building → sideBar → tabs → back, map selections/zoom/actions, menu and legacy return, mobile 390px and desktop 1440px.
- [x] Compare cover structure, typography, gutters, artwork crops, captions and mobile hierarchy to accepted reference. Record deliberate deviations and remaining issues.
- [x] Address reviewer findings, leave local preview open, report exact branch and verification. No push/deploy.

## Verified outcome

- Baseline: 11 tests across 8 suites passed before prototype changes.
- Final: 30 tests across 12 suites passed; optimized production build compiled successfully.
- Browser: Codex in-app browser via CUA; 1440×1024 desktop and 390×844 mobile, plus default 1280×720.
- Verified cover -> Building (13 links) -> sideBar, Overview/Features/Tech including keyboard arrows, back navigation, map selection/zoom/reset, mobile map -> existing Speaking -> home, same-route menu close and focus.
- Production preview verified at http://127.0.0.1:3017; no browser console errors or warnings on the core production journey.
- Comparison: portrait hierarchy, fixed Pricedown lettering, uneven dark panel dividers, section captions, coral arrows and mobile stack checked against approved reference.
- Deliberate adaptations: regenerated separate text-free artwork; no decorative slogans; sound control deferred until actual audio is designed; real sideBar screenshot retained; map is native vector illustration; original legacy pages reachable. No hidden screenshot UI.
- Independent review found missing homepage structured data and same-route menu dismissal. Both fixed, regression tested and scoped re-reviewed clean.
- SEO ruling: restored existing description/keywords/Person/WebSite data but omitted the old SearchAction because the site has no /search route.
- Runtime: used bundled Node 24 because existing Netlify CLI dependencies fail during installation under system Node 26. No dependency upgrades.
