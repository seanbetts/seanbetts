const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

// Check URLs independently of the manifest: new originals must not silently
// pass through ResponsiveImage before their exports have been generated.
async function checkImageSources(doc, { build, route, origin, variants }) {
  const metadata = new Map();
  const localImage = src => {
    if (!src) return null;
    const url = new URL(src, new URL(route, origin));
    if (url.origin !== new URL(origin).origin) return null;
    const pathname = decodeURIComponent(url.pathname);
    if (!/\.(png|jpe?g|webp|avif|gif)$/i.test(pathname)) return null;
    const file = path.resolve(build, '.' + pathname);
    assert.ok(file.startsWith(path.resolve(build) + path.sep), `${route}: invalid local image path`);
    assert.ok(fs.existsSync(file), `${route}: missing local image ${pathname}`);
    return { pathname, file };
  };
  const info = image => {
    if (!metadata.has(image.file)) metadata.set(image.file, sharp(image.file).metadata());
    return metadata.get(image.file);
  };
  for (const element of doc.querySelectorAll('img[src], img[srcset], picture source[srcset]')) {
    const candidates = [element.getAttribute('src')].filter(Boolean);
    if (element.hasAttribute('srcset')) {
      // Inline data is passed through by ResponsiveImage, like remote media.
      const srcset = element.getAttribute('srcset');
      if (!srcset.trim().startsWith('data:')) candidates.push(...srcset.split(',').map(candidate => candidate.trim().split(/\s+/)[0]));
    }
    for (const src of candidates) {
      const image = localImage(src);
      if (!image || variants.has(image.pathname)) continue;
      const details = await info(image);
      if (details.pages > 1) continue; // Preserve real animations, not all GIF files.
      if (element.tagName === 'SOURCE' && element.media === '(prefers-reduced-motion: reduce)') {
        const animation = localImage(element.parentElement.querySelector('img')?.getAttribute('src'));
        if (animation && (await info(animation)).pages > 1) continue;
      }
      assert.fail(`${route}: ${image.pathname} bypasses responsive optimisation; use ResponsiveImage and run npm run images:prepare`);
    }
  }
}

module.exports = { checkImageSources };
