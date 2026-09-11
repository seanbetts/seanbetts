const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { contentHash, createManifest, createAssetHasher } = require('../indexnow-manifest.cjs');
const { changedUrls, notifyDeployment } = require('../indexnow.cjs');

const origin = 'https://www.seanbetts.com';
const revision = 'a'.repeat(40);
const key = '1234567890abcdef1234567890abcdef';
const manifest = pages => ({ version: 1, revision, host: 'www.seanbetts.com', pages });
const html = (text = 'Original article', description = 'Description') => `<html><head><title>Example</title><meta name="description" content="${description}"><link rel="canonical" href="${origin}/about/"></head><body><main class="old"><h1>About</h1><p>${text}</p><a href="/writing/">Writing</a><img src="/image.png" alt="Diagram"></main><script src="/assets/old.js"></script></body></html>`;

test('ignores bundle and class changes but detects content, metadata, links and image changes', () => {
  const base = html();
  assert.equal(contentHash(base), contentHash(base.replace('class="old"', 'class="new"').replace('old.js', 'new.js')));
  assert.equal(contentHash(base), contentHash(base.replace('</head>', '<meta name="theme-color" content="#fff"><meta name="viewport" content="width=device-width"></head>')));
  for (const changed of [html('New article'), html('Original article', 'New description'), base.replace('/writing/', '/speaking/'), base.replace('/image.png', '/new.png')]) {
    assert.notEqual(contentHash(base), contentHash(changed));
  }
});

test('builds a manifest from canonical pages and rejects foreign URLs and missing main content', () => {
  const m = createManifest([{ url: `${origin}/about/`, html: html() }], revision);
  assert.deepEqual(Object.keys(m.pages), [`${origin}/about/`]);
  assert.match(m.pages[`${origin}/about/`], /^[a-f0-9]{64}$/);
  assert.throws(() => createManifest([{ url: 'https://example.org/', html: html() }], revision));
  assert.throws(() => createManifest([{ url: `${origin}/about/`, html: '<html></html>' }], revision));
});

test('detects reduced-motion poster changes and local media replaced at the same URL', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'indexnow-media-'));
  try {
    fs.writeFileSync(path.join(directory, 'animation.gif'), 'original animation');
    fs.writeFileSync(path.join(directory, 'poster.png'), 'original poster');
    fs.writeFileSync(path.join(directory, 'new-poster.png'), 'new poster');
    const page = '<main><h1>Pixel Loader Lab</h1><picture><source media="(prefers-reduced-motion: reduce)" srcset="/poster.png"><img src="/animation.gif" alt="Pixel loader"></picture></main>';
    const hash = () => contentHash(page, createAssetHasher(directory));
    const initial = hash();
    assert.notEqual(initial, contentHash(page.replace('/poster.png', '/new-poster.png'), createAssetHasher(directory)));
    fs.writeFileSync(path.join(directory, 'animation.gif'), 'revised animation');
    assert.notEqual(initial, hash());
    fs.writeFileSync(path.join(directory, 'animation.gif'), 'original animation');
    fs.writeFileSync(path.join(directory, 'poster.png'), 'revised poster');
    assert.notEqual(initial, hash());
    const assets = createAssetHasher(directory);
    assert.equal(assets('https://example.org/image.png'), null);
    assert.throws(() => assets('/missing.png'), /ENOENT/);
    assert.throws(() => assets('/..%2foutside.png'), /outside/);
  } finally { fs.rmSync(directory, { recursive: true, force: true }); }
});

test('submits added, changed and removed pages; unchanged pages and repeated submissions are omitted', () => {
  const previous = manifest({ [`${origin}/`]: '1'.repeat(64), [`${origin}/about/`]: '2'.repeat(64), [`${origin}/old/`]: '3'.repeat(64) });
  const current = manifest({ [`${origin}/`]: '1'.repeat(64), [`${origin}/about/`]: '4'.repeat(64), [`${origin}/new/`]: '5'.repeat(64) });
  assert.deepEqual(changedUrls(current, previous), [`${origin}/about/`, `${origin}/new/`, `${origin}/old/`]);
  assert.deepEqual(changedUrls(current, current), []);
  assert.throws(() => changedUrls(current, { ...previous, host: 'example.org' }));
});

// External HTTP boundaries are replaced; the submission and state decisions are real.
function network({ main = revision, deployed = revision, status = 200, keyBody = key, checks, mainChanges = false, message = 'Publish website update' } = {}) {
  const posts = [];
  let mainReads = 0;
  const current = manifest({ [`${origin}/about/`]: '1'.repeat(64) });
  const fetchImpl = async (url, options = {}) => {
    if (options.method === 'POST') { posts.push(JSON.parse(options.body)); return new Response('', { status }); }
    if (url.includes('/git/ref/heads/main')) return Response.json({ object: { sha: mainChanges && mainReads++ > 0 ? 'b'.repeat(40) : main } });
    if (url.includes('/check-runs')) return Response.json({ check_runs: checks || [
      { name: 'Cloudflare Pages', head_sha: revision, status: 'completed', conclusion: 'success', app: { id: 85455 } },
      { name: 'Validate site', head_sha: revision, status: 'completed', conclusion: 'success', app: { id: 15368 } },
    ] });
    if (url.endsWith(`/commits/${revision}`)) return Response.json({ sha: revision, commit: { message } });
    if (url.includes('/indexnow-manifest.json')) return Response.json({ ...current, revision: deployed });
    if (url.endsWith('/indexnow-key.txt')) return new Response(keyBody);
    throw new Error(`Unexpected request: ${url}`);
  };
  return { posts, current, fetchImpl };
}

const options = n => ({ revision, key, token: 'test-token', fetchImpl: n.fetchImpl, sleep: async () => {}, attempts: 1 });

test('intentional Pages skip prefixes exit without waiting, submitting or advancing the baseline', async () => {
  for (const prefix of ['[CF-Pages-Skip]', '[CI Skip]', '[CI-Skip]', '[Skip CI]', '[Skip-CI]', '[cf-pages-skip]']) {
    const n = network({ message: `${prefix} Merge worktree housekeeping`, checks: [] });
    let waits = 0;
    const result = await notifyDeployment({ ...options(n), submit: true, previous: n.current, attempts: 2, sleep: async () => { waits++; } });
    assert.deepEqual(result, { status: 'deployment-skipped', urls: [] });
    assert.equal(waits, 0);
    assert.equal(n.posts.length, 0);
  }
});

test('mentioning a skip marker in prose does not bypass deployment verification', async () => {
  for (const message of ['Document [CF-Pages-Skip] behaviour', 'Update docs\n\n[CF-Pages-Skip] is an example', '[CF-Pages-Skipper] Update site']) {
    const n = network({ message, checks: [] });
    await assert.rejects(notifyDeployment({ ...options(n), submit: true }), /Timed out/);
    assert.equal(n.posts.length, 0);
  }
});

test('skip detection rejects missing or mismatched commit evidence', async () => {
  for (const commit of [{ sha: 'b'.repeat(40), commit: { message: '[CF-Pages-Skip] Docs' } }, { sha: revision, commit: {} }]) {
    const n = network();
    const fetchImpl = (url, config) => url.endsWith(`/commits/${revision}`) ? Promise.resolve(Response.json(commit)) : n.fetchImpl(url, config);
    await assert.rejects(notifyDeployment({ ...options(n), fetchImpl, submit: true }), /Invalid commit/);
    assert.equal(n.posts.length, 0);
  }
});

test('dry run verifies production but neither submits nor advances the baseline', async () => {
  const n = network();
  const result = await notifyDeployment(options(n));
  assert.equal(result.status, 'dry-run');
  assert.deepEqual(result.urls, [`${origin}/about/`]);
  assert.equal(result.state, undefined);
  assert.equal(n.posts.length, 0);
});

for (const status of [200, 202]) test(`accepted HTTP ${status} submission returns a new baseline`, async () => {
  const n = network({ status });
  const result = await notifyDeployment({ ...options(n), submit: true });
  assert.equal(result.status, status === 200 ? 'accepted' : 'pending-verification');
  assert.deepEqual(result.state, n.current);
  assert.deepEqual(n.posts, [{ host: 'www.seanbetts.com', key, keyLocation: `${origin}/indexnow-key.txt`, urlList: [`${origin}/about/`] }]);
});

test('superseded production revisions skip without submitting', async () => {
  const n = network({ main: 'b'.repeat(40) });
  assert.equal((await notifyDeployment({ ...options(n), submit: true })).status, 'superseded');
  assert.equal(n.posts.length, 0);
});

test('a new main commit during verification prevents submission', async () => {
  const n = network({ mainChanges: true });
  assert.equal((await notifyDeployment({ ...options(n), submit: true })).status, 'superseded');
  assert.equal(n.posts.length, 0);
});

test('stale live content, wrong keys and failed deployment checks cannot submit', async () => {
  for (const setup of [{ deployed: 'b'.repeat(40) }, { keyBody: 'wrong' }, { checks: [{ name: 'Cloudflare Pages', head_sha: revision, status: 'completed', conclusion: 'failure', app: { id: 85455 } }] }]) {
    const n = network(setup);
    await assert.rejects(notifyDeployment({ ...options(n), submit: true }));
    assert.equal(n.posts.length, 0);
  }
});

test('failed submissions do not return an accepted baseline', async () => {
  for (const status of [403, 422, 429, 500]) {
    const n = network({ status });
    await assert.rejects(notifyDeployment({ ...options(n), submit: true }), new RegExp(String(status)));
  }
});

test('unchanged deployments do not send requests to IndexNow', async () => {
  const n = network();
  const result = await notifyDeployment({ ...options(n), previous: n.current, submit: true });
  assert.equal(result.status, 'unchanged');
  assert.equal(n.posts.length, 0);
});

test('missing, unfinished, wrong-app and wrong-revision checks cannot unlock submission', async () => {
  for (const checks of [[], [
    { name: 'Cloudflare Pages', head_sha: revision, status: 'in_progress', app: { id: 85455 } },
  ], [
    { name: 'Cloudflare Pages', head_sha: revision, status: 'completed', conclusion: 'success', app: { id: 999 } },
    { name: 'Validate site', head_sha: revision, status: 'completed', conclusion: 'success', app: { id: 15368 } },
  ], [
    { name: 'Cloudflare Pages', head_sha: 'b'.repeat(40), status: 'completed', conclusion: 'success', app: { id: 85455 } },
    { name: 'Validate site', head_sha: revision, status: 'completed', conclusion: 'success', app: { id: 15368 } },
  ]]) {
    const n = network({ checks });
    await assert.rejects(notifyDeployment({ ...options(n), submit: true }), /Timed out/);
    assert.equal(n.posts.length, 0);
  }
});

test('waits for production checks before submitting once', async () => {
  const n = network();
  let waiting = true;
  const fetchImpl = (url, config) => waiting && url.includes('/check-runs')
    ? Promise.resolve(Response.json({ check_runs: [] })) : n.fetchImpl(url, config);
  const result = await notifyDeployment({ ...options(n), fetchImpl, submit: true, attempts: 2, sleep: async () => { waiting = false; } });
  assert.equal(result.status, 'accepted');
  assert.equal(n.posts.length, 1);
});
