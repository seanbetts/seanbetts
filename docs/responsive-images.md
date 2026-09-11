# Responsive image exports

Keep source artwork and photographs in `public/images`. `npm start`, `npm test`
and `npm run build` automatically prepare WebP exports using Sharp. To refresh
exports while a development server is already running, use `npm run images:prepare`.

Illustrated artwork also gets AVIF exports at quality 60 and encoding effort 4.
The lower encoding effort keeps fresh Cloudflare builds practical without changing
the quality setting or image dimensions. Image preparation logs each completed
source so remote build progress is visible.

The generated `public/images/responsive` files and `src/generated/images.json`
are disposable and ignored by Git. Original images are never overwritten.
Content hashes in export filenames allow changed artwork to invalidate browser
caches. Animated images, vectors and remote URLs are passed through unchanged.

Use `ResponsiveImage` for local raster images and set `sizes` to their rendered
width at each breakpoint. For `object-fit: cover`, account for the width needed
to fill the height as well (the tall homepage portrait is an example).
`responsiveBackground` supplies density variants for the existing scene backgrounds.

The production build runs `check-images.cjs` to verify image references, width
descriptors and alternative text in the generated pages, alongside crawl checks.
It also rejects local static raster originals in `src` or `srcset`, even when
they are missing from the manifest. Real animated images and their reduced-motion
posters remain supported, as do vectors and remote images. Run the guard's
regression tests with `node --test scripts/tests/check-image-sources.test.cjs`.

Building's sideBar screenshot uses its contained, painted width when choosing a
variant. Project screenshots and diagrams have separate `sizes` hints reflecting
their column widths, frame padding and desktop width cap. Keep these hints in
step with the corresponding layout CSS; decorative cover backgrounds need to
retain enough resolution to fill their height as well as their width.

## Reusing published exports during builds

Cloudflare builds automatically try to restore missing exports from
`https://seanbetts.pages.dev/images/responsive/`. This production project hostname
avoids custom-domain redirect and security rules. The URLs use the existing source
and encoding-policy hashes, so only matching exports can be reused. Dimensions,
format, byte limit and full decoding are checked before a downloaded file is
accepted. The manifest is always regenerated from the checked-out originals.
New or changed images are encoded normally; obsolete exports are still pruned.

This is an optional cache. A missing file falls back to encoding; a timeout,
server error or invalid image disables further downloads for that build. At most
four requests run concurrently, with a five-second timeout per request. Builds
still work without access to the published site, but take the original cold-build
time. No image quality, dimensions or encoding settings have changed.

Local development remains offline by default. Set `SEANBETTS_IMAGE_CACHE=1` to
opt in locally or in CI; set `SEANBETTS_IMAGE_CACHE=0` to force local-only encoding,
including on Cloudflare. Existing local exports are always reused first. Delete
`public/images/responsive/` before measuring a genuinely fresh preparation run.

When changing encoding settings or making an encoder upgrade that should
regenerate output, update the corresponding hash policy string in
`scripts/prepare-images.cjs`. Otherwise existing published bytes will be reused.
Run the pipeline regression tests with `node --test scripts/tests/*.test.cjs`.
