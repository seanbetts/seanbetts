# Site frame system

`src/game/Frame.module.css` owns the frame treatment used by the live portfolio routes. Page CSS Modules compose these primitives; they retain only their layout, crop and polygon geometry.

- `canvas`: one continuous ink background, frame padding, desktop/mobile tilt and matching counter-angle variables. Use on the outer framed group on About, Building, project details, Contact, Speaking, Thought Leadership and Writing.
- `flatCanvas`: the same ink and width for the unskewed home collage. Its SVG uses `seams` to draw each shared edge once with a non-scaling stroke.
- `surface`: a clipped panel surface with a 1px ink guard along the horizontal edges. The guard stays aligned with the frame, paints above the artwork, and never receives pointer events. Keep gradients off this pseudo-element.
- `window`: an isolated content window inside a stable ink-backed card. Set `--frame-window` on the card for the desktop polygon; the shared mobile rule removes that mask. Writing and Speaking use this for image, caption and summary controls together, so their outer frame is not clipped away.
- `scrim`: the common full-card caption fade. Its final colour stays visibly separate from the ink frame while retaining contrast behind text.

Frame width and ink colour remain the shared `--game-frame` and `--game-ink` tokens in `game.css`: 22px on desktop, 16px at 700px and below. Change tilt, edge guards and card fades in the shared module rather than copying them into page styles. Different panel arrangements may use different polygons; neighbouring edges must expose the same frame-width gutter.

Keep text and artwork counter-skewed, but never counter-skew the frame or seam guards. Summary controls and keyboard focus indicators belong inside the content window and must remain visible when a card is clipped. Page-specific decorative overlays can remain local; they must not paint over the shared frame.

The full-viewport 404 has no framed panels, so it deliberately does not use a canvas.

## Verification

Check Home, Writing, Speaking, About, Building, a project detail, Thought Leadership and Contact at desktop, tablet and mobile widths. Inspect both themes, multiple gallery rows, horizontal overflow, frame width, seam joins, and summary/focus controls. Run the existing React test suite and a production build. A build alone cannot verify frame rendering.
