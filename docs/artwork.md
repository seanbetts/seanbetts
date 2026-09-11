# Artwork sources

## Illustrations and article images

The portfolio illustrations were created with the built-in image-generation tool, using Sean's photographs and supplied references where appropriate. Website images live in `public/images`; layouts, captions and framing are implemented in code. Generation prompts, rejected concepts and deleted master-image references remain available in Git history. Two representative original edit prompts, for the Writing and Building panels, are also preserved in [prompt-examples.md](artwork-source/prompt-examples.md).

Writing-page images come from the linked publishers. Their original URLs, alternative text and crop positions are recorded alongside the articles in [articlesData.js](../src/data/articlesData.js).

## Product screenshots

The sideBar iPad screenshot in `public/images/projects/sidebar-notes-ipad.png` comes from the [sideBar product website](https://trysidebar.ai/screenshots/notes-ipad.png), retrieved on 10 September 2026. It shows the assistant creating a note beside the conversation. The original image is unmodified; the build's image pipeline creates responsive WebP versions.

The Explorer screenshot in `public/images/projects/genai-explorer-comparison.png` was captured from the [live Model Comparer](https://explorer.the-blueprint.ai/compare) on 10 September 2026. It shows GPT-5 and Claude-4.1 Opus using the published August 2025 dataset. It is an unmodified browser screenshot; the image pipeline creates responsive WebP versions.

## Wordmarks

The nAnimals project gallery uses six untouched 600 × 600 PNGs (1, 8, 12, 28, 34 and 60) recovered from Sean's original `nAnimalsGen1` archive. The arrangement is a CSS grid, not a newly generated composite. The files are stored as `public/images/projects/nanimals-*.png`.

`public/images/projects/mems-logo.png` is the original wordmark from the private MEMs repository (`img/mems-logo-large-rounded.png`). `mihndbot-logo.png` is the original robot mark from Sean's archived MiHND branding (`Content/Logos/Circle Logo/MiHNDbot-logo-png.png`). Both are unmodified, with contrasting backgrounds provided by the page layout.

`public/images/projects/plotter-europe-roadtrip.png` is an unmodified screenshot of Sean's running Plotter application, captured on 10 September 2026. It shows the Europe Roadtrip itinerary and route map. No trip records were changed for the capture.

`sean-betts.svg`, `sean-betts-inline.svg` and `404/busted.svg` under `public/images/game` are fixed outlined artwork made with Pricedown Black v5.200 by Typodermic, obtained on 8 September 2026 from [DaFont](https://www.dafont.com/pricedown.font).

The original production notes cite Typodermic Desktop EULA v260817, section 2.2, as the basis for distributing finished static artwork. These SVGs contain composed words, not font software or a reusable glyph set. See [Typodermic licensing](https://typodermicfonts.com/licensing/) for the source licence reference.

## Project outputs and explanatory graphics

Added on 10 September 2026:

- `brand-detection-film.jpg` is the original annotated film frame from the Product Placement archive (`testing/_brand_frame_000450.jpg`). It shows the prototype's Pizza Hut detection. The underlying film imagery is third-party source material; the detection annotation is project output.
- `pixel-loader-solid.gif` and `pixel-loader-bordered.gif` are the untouched optimised animation exports from Pixel Loader Lab (`loader-solid-transition-opt.gif` and `loader-transition-opt.gif`). Their stills are original `frame-000.png` exports from the corresponding `solid-light` and `border-light` frame directories. Reduced-motion preferences select the stills; a pause control is available otherwise. `pixel-loader-overview.png` provides a static social-sharing image.
- `llm-search-evidence.png` is a new graphic based on saved interaction/response 1 in the archived LLM Search Analysis database, dated 1 December 2025. The captured GPT-5.1 query has 20 `query_sources` rows and 9 `sources_used` rows. It describes one recorded case, not a benchmark or current model behaviour.
- `steam-hardware-evidence.png` summarises the saved `steam-hardware-watch/status/runs/2026-08-24.md` report. Its date, asset counts, source limitations and verdict are historical.
- `apple-hig-workflow.png` illustrates the documented extraction workflow and includes a short frontmatter excerpt from the generated `content/buttons/index.md`.
- `cains-jawbone-workflow.png` illustrates the repository's 100 source pages and documented research process. The numeric page inventory is not a proposed solution or inferred ordering.
- `youtube-sdg-workflow.png` illustrates the two-stage analysis described in the YouTube Channels toolkit README and `prompts/transcript_analysis_stage2.py`. It contains no client results or invented scores.

The five explanatory graphics are browser-rendered layouts, not screenshots of product interfaces. Their editable source is retained in [project-diagrams.html](artwork-source/project-diagrams.html); website exports are stored in `public/images/projects`. The layouts are exported at 2400 × 1400 pixels with a solid edge-to-edge background and no rounded screenshot clipping. Each is displayed without a link and has a descriptive text alternative.

## UI font

Barlow Condensed Semibold comes from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/barlowcondensed). Its SIL Open Font License is retained with the font in [public/fonts/OFL.txt](../public/fonts/OFL.txt).
