// Check the actual production output, without executing its JavaScript.
const assert = require('node:assert/strict');
const { inventory, readOutput, readPage, sitemapUrls } = require('./site-output.cjs');
const urls = sitemapUrls();
assert.ok(inventory.urls.length > 0, 'The source route inventory must not be empty');
assert.equal(new Set(urls).size, urls.length, 'No duplicate sitemap entries');
assert.deepEqual([...urls].sort(), [...inventory.urls].sort(), 'Every source route must be in the sitemap');
for (const url of urls) {
  const pathname = new URL(url).pathname;
  assert.ok(pathname.endsWith('/'), `${pathname}: directory canonical URL`);
  const doc = readPage(pathname);
  assert.equal(doc.querySelectorAll('h1').length, 1, `${pathname}: one readable heading`);
  assert.ok(doc.querySelector('main').textContent.trim().length > 80, `${pathname}: readable content`);
  assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1, `${pathname}: duplicate descriptions`);
  assert.equal(doc.querySelector('link[rel="canonical"]').href, url);
  assert.ok(doc.querySelectorAll('a[href]').length > 2, `${pathname}: crawlable links`);
  for (const link of doc.querySelectorAll('a[href]')) {
    const href = link.getAttribute('href');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const target = new URL(href, url);
    if (!target.pathname.split('/').pop().includes('.')) {
      assert.ok(target.pathname.endsWith('/'), `${pathname}: noncanonical internal link ${href}`);
    }
  }
  const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(n => JSON.parse(n.textContent));
  assert.ok(schemas.some(s => s['@type'] === 'Person' && s['@id']), `${pathname}: connected identity`);
  assert.ok(!doc.querySelector('meta[name="robots"]')?.content.includes('noindex'));
}
const speaking = readPage('/speaking');
const appearances = [...speaking.querySelectorAll('article')];
assert.ok(inventory.appearances.length > 0, 'The speaking inventory must not be empty');
assert.equal(appearances.length, inventory.appearances.length, 'Every appearance must be readable without clicking');
for (const talk of inventory.appearances) {
  const id = talk.id.replace(/\s/g, '-');
  const article = appearances.find(node => ['featured-' + id, 'archive-' + id].includes(node.getAttribute('aria-labelledby')));
  assert.ok(article, `Missing appearance: ${talk.id}`);
  const title = article.querySelector('h3').textContent.replace(/[.!?]$/, '');
  assert.equal(title, talk.title.replace(/[.!?]$/, ''), `Incorrect appearance: ${talk.id}`);
}
const videoPage = readPage('/building/ai-chat-experience');
assert.equal(videoPage.querySelectorAll('iframe').length, 0, 'Video player must wait for interaction');
assert.ok(videoPage.querySelector('a[href*="youtube.com/embed/"]'), 'Video remains accessible without JavaScript');
const missing = readPage('/404');
assert.ok(missing.querySelector('meta[name="robots"]').content.includes('noindex'));
const redirects = readOutput('_redirects');
assert.ok(redirects.includes('/projects /building/ 301'));
assert.ok(redirects.includes('/projects/:project /building/:project/ 301'));
assert.ok(redirects.includes('/projects/:project/ /building/:project/ 301'));
assert.ok(redirects.includes('/map / 301'));
assert.ok(!/^\/\*\s/m.test(redirects), 'Cloudflare must use the native 404, not a blanket rewrite');
assert.ok(readOutput('llms.txt').includes('training'));
for (const url of urls) assert.ok(readOutput('llms.txt').includes(url), `AI index missing ${url}`);
console.log(`Crawl checks passed for ${urls.length} pages, ${appearances.length} appearances and 404 output.`);
