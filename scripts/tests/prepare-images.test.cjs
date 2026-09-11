const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const sharp = require('sharp');
const { prepareImages } = require('../prepare-images.cjs');

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'prepare-images-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await fs.mkdir(path.join(root, 'public/images/game'), { recursive: true });
  await sharp({ create: { width: 32, height: 24, channels: 3, background: 'coral' } })
    .png().toFile(path.join(root, 'public/images/game/test.png'));
  return root;
}
const exportsAt = root => path.join(root, 'public/images/responsive');

test('a fresh build reuses identical published bytes and still rebuilds its manifest', async t => {
  const root = await fixture(t);
  await prepareImages({ root, widths: [16, 32], cacheOrigin: null });
  const expected = await fs.readFile(path.join(root, 'src/generated/images.json'), 'utf8');
  const bytes = new Map(await Promise.all((await fs.readdir(exportsAt(root))).map(async name =>
    [name, await fs.readFile(path.join(exportsAt(root), name))])));
  await fs.rm(exportsAt(root), { recursive: true });
  await fs.rm(path.join(root, 'src/generated/images.json'));
  let calls = 0;
  const fetchImpl = async url => {
    calls++;
    return new Response(bytes.get(path.basename(new URL(url).pathname)), { headers: { 'content-type': url.endsWith('.avif') ? 'image/avif' : 'image/webp' } });
  };
  const result = await prepareImages({ root, widths: [16, 32], cacheOrigin: 'https://cache.example', fetchImpl });
  assert.equal(result.restored, 4);
  assert.equal(result.generated, 0);
  assert.equal(calls, 4);
  assert.equal(await fs.readFile(path.join(root, 'src/generated/images.json'), 'utf8'), expected);
  for (const [name, data] of bytes) assert.deepEqual(await fs.readFile(path.join(exportsAt(root), name)), data);
  const warm = await prepareImages({ root, widths: [16, 32], cacheOrigin: 'https://cache.example', fetchImpl });
  assert.equal(calls, 4, 'local exports do not need network requests');
  assert.equal(warm.generated, 0);
});

test('missing remote exports fall back to encoding and changed source bytes get new filenames', async t => {
  const root = await fixture(t);
  const options = { root, widths: [16], cacheOrigin: 'https://cache.example', fetchImpl: async () => new Response('', { status: 404 }) };
  assert.equal((await prepareImages(options)).generated, 2);
  const old = await fs.readdir(exportsAt(root));
  await sharp({ create: { width: 32, height: 24, channels: 3, background: 'blue' } }).png().toFile(path.join(root, 'public/images/game/test.png'));
  assert.equal((await prepareImages(options)).generated, 2);
  const updated = await fs.readdir(exportsAt(root));
  assert.ok(updated.every(name => !old.includes(name)));
  assert.equal(updated.length, 2, 'obsolete exports are pruned');
});

for (const problem of ['HTML', 'wrong dimensions', 'network failure']) {
  test(`${problem} cannot become a cached export or prevent a successful build`, async t => {
    const root = await fixture(t);
    const wrong = await sharp({ create: { width: 3, height: 3, channels: 3, background: 'red' } }).webp().toBuffer();
    let calls = 0;
    const fetchImpl = async () => {
      calls++;
      if (problem === 'network failure') throw new Error('offline');
      return new Response(problem === 'HTML' ? '<html>error</html>' : wrong, { headers: { 'content-type': problem === 'HTML' ? 'text/html' : 'image/webp' } });
    };
    const result = await prepareImages({ root, widths: [16, 32], cacheOrigin: 'https://cache.example', fetchImpl });
    assert.equal(result.generated, 4);
    assert.equal(result.restored, 0);
    assert.ok(calls <= 4, 'cache failure stops further remote work');
    for (const name of await fs.readdir(exportsAt(root))) {
      const metadata = await sharp(path.join(exportsAt(root), name)).metadata();
      assert.ok([16, 32].includes(metadata.width));
      assert.equal(metadata.height, metadata.width * 3 / 4);
    }
  });
}

const { createImageCache } = require('../image-cache.cjs');
for (const problem of ['wrong dimensions', 'truncated bytes', 'oversized response', 'timeout']) {
  test(`the cache rejects ${problem} and stops requesting subsequent batches`, async t => {
    const root = await fixture(t);
    const output = path.join(root, 'cached.webp');
    const good = await sharp({ create: { width: 16, height: 12, channels: 3, background: 'red' } }).webp().toBuffer();
    const wrong = await sharp({ create: { width: 3, height: 3, channels: 3, background: 'red' } }).webp().toBuffer();
    let calls = 0;
    const keepAlive = setInterval(() => {}, 1000);
    t.after(() => clearInterval(keepAlive));
    const cache = createImageCache({ origin: 'https://cache.example', timeoutMs: 15, fetchImpl: async (_url, { signal }) => {
      calls++;
      if (problem === 'timeout') return new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true }));
      return new Response(problem === 'wrong dimensions' ? wrong : problem === 'truncated bytes' ? good.subarray(0, 20) : good,
        { headers: { 'content-type': 'image/webp', ...(problem === 'oversized response' ? { 'content-length': '11000000' } : {}) } });
    } });
    const candidates = [{ output, name: 'test-16.webp', width: 16, height: 12, format: 'webp' }];
    await cache.restore(candidates);
    await cache.restore(candidates);
    assert.equal(calls, 1);
    assert.equal(cache.restored, 0);
    await assert.rejects(fs.access(output));
  });
}

test('cache validation accepts the one-pixel height rounding used by JPEG shrink-on-load', async t => {
  const root = await fixture(t);
  const output = path.join(root, 'rounding.webp');
  const buffer = await sharp({ create: { width: 640, height: 426, channels: 3, background: 'red' } }).webp().toBuffer();
  const cache = createImageCache({ origin: 'https://cache.example', fetchImpl: async () => new Response(buffer, { headers: { 'content-type': 'image/webp' } }) });
  await cache.restore([{ name: 'rounded-640.webp', output, width: 640, height: 427, format: 'webp' }]);
  assert.equal(cache.restored, 1);
  assert.deepEqual(await fs.readFile(output), buffer);
});
