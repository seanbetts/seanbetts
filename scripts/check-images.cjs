// Verify the rendered export, not only the component's markup in isolation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { JSDOM } = require('jsdom');
const images = require('../src/generated/images.json');
const build = path.resolve(__dirname, '../build');

async function main() {
  const sitemap = new JSDOM(fs.readFileSync(path.join(build, 'sitemap.xml'), 'utf8'), { contentType: 'text/xml' });
  const routes = [...sitemap.window.document.querySelectorAll('loc')].map(node => new URL(node.textContent).pathname);
  let count = 0;
  for (const route of routes) {
    const doc = new JSDOM(fs.readFileSync(path.join(build, route, 'index.html'), 'utf8')).window.document;
    for (const image of doc.querySelectorAll('img[srcset]')) {
      assert.ok(image.getAttribute('sizes'), `${route}: missing responsive sizes`);
      assert.ok(image.hasAttribute('alt'), `${route}: lost alternative text`);
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
    for (const candidate of image.variants) {
      const metadata = await sharp(path.join(build, candidate.src)).metadata();
      assert.equal(metadata.width, candidate.width, 'The browser must receive the advertised pixel width');
      assert.equal(metadata.format, 'webp');
      assert.ok(metadata.width <= image.width, 'Do not upscale originals');
    }
  }
  assert.ok(count > 50, 'Expected responsive images across the portfolio');
  console.log(`Image checks passed: ${count} rendered images across ${routes.length} pages; every variant exists and has the advertised width.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
