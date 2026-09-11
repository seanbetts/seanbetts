const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const sharp = require('sharp');
const { JSDOM } = require('jsdom');
const { checkImageSources } = require('../check-image-sources.cjs');

test('local static originals cannot bypass optimisation, even when absent from the manifest', async t => {
  const build = await fs.mkdtemp(path.join(os.tmpdir(), 'image-source-check-'));
  t.after(() => fs.rm(build, { recursive: true, force: true }));
  await fs.mkdir(path.join(build, 'images/responsive'), { recursive: true });
  await sharp({ create: { width: 4, height: 4, channels: 3, background: 'red' } }).png().toFile(path.join(build, 'images/new.png'));
  await sharp(path.join(build, 'images/new.png')).webp().toFile(path.join(build, 'images/responsive/test-480.webp'));
  await sharp(path.join(build, 'images/new.png')).gif().toFile(path.join(build, 'images/static.gif'));
  await fs.copyFile(path.resolve(__dirname, '../../public/images/projects/pixel-loader-solid.gif'), path.join(build, 'images/animation.gif'));
  const options = { build, route: '/building/example/', origin: 'https://www.seanbetts.com', variants: new Set(['/images/responsive/test-480.webp']) };
  const check = html => checkImageSources(new JSDOM(html).window.document, options);
  for (const src of ['/images/new.png', '../../images/new.png?v=2', 'https://www.seanbetts.com/images/new.png', '/images/static.gif']) {
    await assert.rejects(check(`<img src="${src}">`), /bypasses responsive optimisation/);
  }
  await assert.rejects(check('<img src="/images/missing.png">'), /missing local image/);
  await assert.rejects(check('<img src="/images/responsive/test-480.webp" srcset="/images/new.png 4w">'), /bypasses responsive optimisation/);
  await assert.rejects(check('<picture><source srcset="/images/new.png 4w"><img src="/images/responsive/test-480.webp"></picture>'), /bypasses responsive optimisation/);
  await check('<img src="/images/responsive/test-480.webp"><img src="https://example.org/remote.png"><img src="/images/logo.svg"><img src="/images/animation.gif">');
  await check('<picture><source media="(prefers-reduced-motion: reduce)" srcset="/images/new.png"><img src="/images/animation.gif"></picture>');
  await assert.rejects(check('<picture><source media="(prefers-reduced-motion: reduce)" srcset="/images/new.png"><img src="/images/static.gif"></picture>'), /bypasses responsive optimisation/);
});
