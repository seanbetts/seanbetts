# Responsive image exports

Keep source artwork and photographs in `public/images`. `npm start`, `npm test`
and `npm run build` automatically prepare WebP exports using Sharp. To refresh
exports while a development server is already running, use `npm run images:prepare`.

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
