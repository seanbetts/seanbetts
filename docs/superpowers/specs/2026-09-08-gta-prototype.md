# GTA portfolio prototype

Approved direction: the cover-art mockup in the conversation, with a dominant Sean portrait, actual Pricedown wordmark, thick dark dividers, irregular illustrated panels, coral controls and game-style map navigation. Desktop composition reference: `/Users/sean/.codex/generated_images/01a081ae-ae44-75a1-9682-a8c3e895dad3/exec-03d33a51-0a60-478a-a2c8-718ba5fb9aa4.png`. Earlier map/dossier reference: `exec-b744ea67-aa2c-4580-bb74-2f8519b8dfca.png` in that directory.

Scope: local isolated prototype; cover homepage, Building collection, project dossier (sideBar is the primary verified journey), map. Existing Writing, Speaking, About and Contact remain reachable. No deployment, push, or live data changes. Existing React 18, React Router and CSS Modules remain.

Tokens: background #16051f; surfaces #211329; gutters #110818; white #fffaf4; muted #c8bdce; coral #ff777f. Square corners, 10–16px cover dividers, small uppercase condensed sans navigation. Pricedown is fixed outlined vector wordmark artwork, with an accessible HTML heading; do not redistribute or embed a restricted font. Other text and all controls remain HTML. Generated artwork is separate from labels. Body copy remains legible. Focus and reduced-motion states required.

Homepage: toolbar (Sean Betts, Map, Contact, menu); central portrait and stacked wordmark; Speaking left upper, Writing left lower, Building right upper, map and About right lower. Captions are accessible links. Mobile: portrait, Building, Writing, Speaking, About, map. No decorative sound toggle until actual audio exists.

Building: actual projectsData records, featured illustrated panels, all projects reachable. Project dossier uses real record, overview/features/tech tabs, actual hero media when available, clear external action and back navigation.

Map: dark illustrative city cartography, four selectable destinations corresponding to Building/Writing/Speaking/About, selected location detail, working zoom/reset and routes. Label it as an illustrative navigation map in accessible description. Native vector map geometry is appropriate for this interactive navigation surface; it is not a geographic accuracy claim.

Retain existing SEO and project data. Prototype shell applies to `/`, `/building`, `/building/:id`, `/map`; remaining routes use existing layout. Motion is short reveal/hover/focus feedback, not a loading gate. No new runtime dependencies unless technically necessary. Desktop and mobile browser review plus focused route/map/tab tests and production build.
