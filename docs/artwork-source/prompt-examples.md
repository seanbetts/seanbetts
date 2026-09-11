# Original image prompt examples

These two historical examples preserve the original prompt wording from the redesign. They are intermediate edit steps, not complete recipes for the final published images. Later colour and object refinements produced the current Writing and Building artwork. Reference images are necessary to reproduce edits.

Source commit: `9b8055535ac7b4f5872dfb9a34e5869a6c5a3a55` (before the artwork notes were consolidated). Historical asset paths and generation output IDs below are preserved verbatim; recover referenced assets from Git history where available.


---

Original note: `docs/artwork/images/game/home-studies/writing-v10.md`

## Writing v10: Balcombe Viaduct and refined Diet Coke

Generated with built-in imagegen on 10 September 2026. Uses v9 plus the four user-provided Balcombe Viaduct photos. A second edit repaired a horizontal generation glitch in the foreground notebook. Page text remains illustrative rather than an actual article.

- Master: `masters/writing-desk-v10-balcombe.png`
- Web asset: `writing-desk-v10-balcombe.webp`
- Final source: `exec-2bdae257-3511-4c35-bded-a7b22fc6a214.png`
- Crop: `center 25%`

## Initial prompt

Use case: precise-object-edit. Improve this existing GTA-style illustrated personal website Writing panel. Input 1 is the EDIT TARGET: preserve its portrait composition, wooden desk, open AI report, Blueprint handwritten article notes, diagonal black/gold pen, plants, window frame and warm light. Inputs 2-5 are ONLY architectural/location references for Balcombe Viaduct, to replace the view through the window. Make two principal improvements. (1) Replace ALL London skyline, Big Ben, Westminster, river and boat imagery outside the window with Balcombe Viaduct in the Sussex countryside as shown in the photos: a long elegant red-brick railway viaduct of repeating tall semicircular arches, slender masonry piers with distinctive elongated arched openings through them, pale stone parapet, green fields and trees. Use a slightly elevated oblique landscape view, with nearer arches on the right, viaduct receding towards the left across the valley, and clearly readable arch silhouettes in the upper centre of the narrow portrait composition. Use the photos to get the architecture right. Keep a warm late-afternoon peach/pink sky and sunset light on the brick, with muted green fields and purple shadows to harmonise with the room. Render this as a crisp hand-painted GTA loading-screen illustration, not pasted photography. (2) Substantially refine the Diet Coke can on the desk. It should look like a neatly drawn recognisable standard silver 330ml Diet Coke can, correct cylinder proportions and perspective, clean symmetric elliptical top and base, rolled metal rim, convincing pull tab and opening. Clean silver surface with selective warm highlights and cool shaded facets, no dented/wobbly shape, no exaggerated bevels, no smeared texture. Use accurate sharp 'Diet Coke' branding, small dark Diet and large red Coke lettering following the curved can surface with correct spacing, no distorted or invented characters. Keep the entire can comfortably inside the right edge with breathing room, approximately its current size, resting naturally on the desk with a consistent contact shadow. Improve general linework and clarity of paper edges, pen, and page typography while retaining exactly the same illustrated level of detail and main page headings 'GENERATIVE AI', 'INDUSTRY INSIGHTS', and magenta 'THE BLUEPRINT'. Other small writing can remain subordinate. Keep all desktop content about AI writing/research; no drawings, charts, sketches, coffee cups or new objects. Preserve foreground layout and overall crop; landscape and can are the primary edits. Output one polished full-bleed 1024x1536 portrait illustration.

## Repair prompt

Repair the severe horizontal image-generation glitch across the foreground notebook and pen in input 1. Input 1 is the edit target; input 2 is reference ONLY for the original correct notebook and pen geometry. In input 1 there is a torn-looking horizontal offset band at about 75-82% of image height, duplicating the 'What comes next?' heading, splitting the pen and misaligning the notebook pages. Reconstruct the ENTIRE foreground notebook as ONE coherent open notebook with exactly two continuous flat facing pages, one continuous central binding and one continuous outer contour. ONE intact black-and-gold pen lies diagonally across the left page, with ONE nib, matching input 2 geometry. Right page has one Product innovation section and ONE What comes next? section. Left page has magenta THE BLUEPRINT and AI strategy. Remove ALL horizontal seams, slicing, displaced strips, duplicated text bands, duplicate pages and pen fragments. Match input 2's physical notebook proportions and placement exactly. Preserve input 1's improved silver Diet Coke can and Balcombe Viaduct view, sunset, plants, window, research report and overall illustration style without changes. No other edits. Deliver a flawless uninterrupted full-bleed 1024x1536 illustration.


---

Original note: `docs/artwork/images/game/home-studies/building-v4.md`

## Building v4: code editor screen

Created with built-in imagegen. Replaces the MacBook split view with a dark code editor, using v3 as the edit target. Surrounding composition retained; generated code is illustrative.

- Master: `masters/building-studio-v4-code.png`
- Web asset: `building-studio-v4-code.webp`
- Reference: `masters/building-studio-v3-tattoos.png`
- Source: `exec-47b08758-129f-4a7a-89a4-73fa1df91793.png`
- Crop: `65% center`

## Prompt

Use case: precise-object-edit. EDIT ONLY THE MACBOOK SCREEN CONTENT in the supplied illustration. Replace the current split view (dark code editor left, white sideBar chat/app right) with ONE dark code editor filling the entire active display. Remove the white app/chat pane completely. Show a credible programming editor with a narrow file explorer at the left, restrained tab strip at top, line numbers and syntax-highlighted TypeScript/React code across the main editing area: indented functions, imports, JSX, braces; small cyan, blue, muted green and amber text on charcoal. Code should look organised and technically plausible, not oversized decorative text. No chat, AI assistant pane, app preview, browser page, logos or big titles anywhere on screen. Map the new content precisely into the existing display quadrilateral, matching the original perspective, mild screen reflections and illustrated shading. CRITICAL INVARIANTS: Everything OUTSIDE the inner screen area must stay exactly as in the supplied source. Preserve the laptop lid and bezel, webcam, keyboard, trackpad, metal chassis, screen angle; both hands, fingers and their exact tattoos, sleeves and body; Diet Coke can and lettering; floppy disks; entire desk, chair, plants, books, window, city view, brick wall and posters; colours, light, crop and composition. Do not improve or redraw any surrounding object. This is a screen-content-only substitution. Retain original 1672x941 wide landscape aspect ratio, full image, identical framing. Preserve the GTA illustrated aesthetic.
