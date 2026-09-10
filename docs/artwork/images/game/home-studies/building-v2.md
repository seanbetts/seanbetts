# Building revision 2

Generated with the built-in image-generation tool on 9 September 2026. Approved for the home page Building panel: corrected can packaging and replaced gallery with a sideBar app preview. The home page uses a 65% horizontal crop position to favour the laptop over the can.

- Master: `masters/building-studio-v2.png`
- Delivery: `building-studio-v2.webp`
- Edit target: `masters/building-studio-v1.png`
- App reference: `public/images/projects/overview.png`
- Packaging reference: https://www.coca-cola.com/gb/en/brands/diet-coke
- Product image reference: https://www.coca-cola.com/content/dam/onexp/gb/en/brands/diet-coke/Product-Information-diet-coke.jpg

## Edit prompt

Use case: precise-object-edit.
Edit image 1, the illustrated laptop and hands in a sunlit brick studio. Make ONLY TWO LOCAL CORRECTIONS; preserve the entire composition, hands, laptop geometry, left code-editor pane, desk, floppy disks, lighting, colours, background, plants and illustration style.

Input roles:
Image 1 = edit target scene.
Image 2 = faithful product-packaging reference for the replacement Diet Coke can.
Image 3 = actual sideBar app interface reference. Use only the interface INSIDE the iPad display; exclude the iPad hardware and outer black bezel.

Correction 1: replace the incorrect can at the right of image 1 with a clean, undented, realistically proportioned silver Diet Coke can closely following image 2. Match its cylindrical body and narrow rolled rims. Most importantly reproduce the packaging correctly: big RED 'Coke' lettering runs HORIZONTALLY around the upper body (NOT vertical or rotated ninety degrees), smaller RED script 'Diet' near the upper right, generous plain silver space below. Do not duplicate the Diet lettering, do not add black Diet script. Rotate the can around its vertical axis slightly so the main Diet Coke branding can be recognized. Keep approximately the existing location and overall size as an incidental object on the desk. Render in the SAME crisp cel-shaded illustrated style and warm natural studio light, with plausible perspective and contact shadow; not a photographic sticker pasted in. No melting, crumpling, random scratches through the logo or extra brand text.

Correction 2: replace ONLY the right-hand photo-carousel pane ON the laptop display. Remove every photograph, thumbnail, palm-tree scenic preview and carousel dot from that pane. Show a scaled desktop preview of Sean's actual sideBar productivity app from image 3, in the same screen perspective. The app should be recognizable by its quiet white/light grey interface, slim left navigation rail and chat list, sideBar name in the top bar, clean central workspace with its simple black split-rectangle icon, and right-hand chat panel containing a couple of grey rounded text message cards and a small bottom input field. Preserve the exact lowercase/uppercase spelling 'sideBar'. Keep tiny text understated at this screen scale, clean UI structure matters more than legible fine print. Fit the app within the existing right-hand preview pane rather than drawing an iPad device inside it. This is an AI productivity workspace, absolutely no gallery or scenic images. Keep the left-hand code editor in place unchanged.
Preserve original landscape aspect ratio, full resolution, no new objects or layout changes. Return only the full corrected illustration.
