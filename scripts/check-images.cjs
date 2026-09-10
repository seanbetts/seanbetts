// Verify the rendered export, not only the component's markup in isolation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { build, inventory, readPage } = require('./site-output.cjs');
const images = require('../src/generated/images.json');

async function main() {
  const routes = [...inventory.urls.map(url => new URL(url).pathname), '/404'];
  let count = 0;
  for (const route of routes) {
    const doc = readPage(route);
    for (const image of doc.querySelectorAll('img[srcset], picture source[srcset]')) {
      assert.ok(image.getAttribute('sizes'), `${route}: missing responsive sizes`);
      if (image.tagName === 'IMG') assert.ok(image.hasAttribute('alt'), `${route}: lost alternative text`);
      else {
        assert.equal(image.type, 'image/avif');
        assert.ok(image.parentElement.querySelector('img[srcset]'), `${route}: AVIF needs a WebP fallback`);
      }
      for (const candidate of image.getAttribute('srcset').split(', ')) {
        const [src, descriptor] = candidate.split(' ');
        assert.ok(fs.existsSync(path.join(build, src)), `${route}: missing ${src}`);
        assert.match(descriptor, /^\d+w$/);
      }
      count++;
    }
    for (const image of doc.querySelectorAll('img[src]')) {
      assert.ok(!images[image.getAttribute('src')], `${route}: still serving original ${image.src}`);
    }
  }
  for (const image of Object.values(images)) {
    for (const candidate of [...image.variants, ...(image.avif || [])]) {
      const metadata = await sharp(path.join(build, candidate.src)).metadata();
      assert.equal(metadata.width, candidate.width, 'The browser must receive the advertised pixel width');
      assert.equal(metadata.format, candidate.src.endsWith('.avif') ? 'heif' : 'webp');
      assert.ok(metadata.width <= image.width, 'Do not upscale originals');
    }
  }
  assert.ok(count > 0, 'Expected responsive images in the portfolio');
  console.log(`Image checks passed: ${count} rendered images across ${routes.length} pages; every variant exists and has the advertised width.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
