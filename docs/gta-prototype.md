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
4. Try the menu, Escape and the stacked mobile panels.

The new treatment covers Home, Building, project pages and Map. Writing, Speaking, About and Contact keep their existing layouts for the next iteration. Audio is deferred. All original project records are used.

The approved cover composition is recorded in `superpowers/specs/2026-09-08-gta-prototype.md`; verification and deliberate adaptations are recorded in the plan. Artwork provenance is in `public/images/game/README.md`. The Pricedown wordmark is fixed vector art, not an embedded font.

Verified: 30 tests / 12 suites; successful optimized build; desktop and mobile browser navigation; clean core production console; independent review and regression fixes.
