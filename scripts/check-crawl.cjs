// Check the actual production output, without executing its JavaScript.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const base = path.resolve(__dirname, '../build');
const sitemap = new JSDOM(fs.readFileSync(path.join(base, 'sitemap.xml'), 'utf8'), { contentType: 'text/xml' });
const urls = [...sitemap.window.document.querySelectorAll('loc')].map(n => n.textContent);
assert.equal(urls.length, 20, 'All current pages must be in the sitemap');
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const file = path.join(base, pathname, 'index.html');
  assert.ok(fs.existsSync(file), `Missing static page: ${pathname}`);
  const doc = new JSDOM(fs.readFileSync(file, 'utf8')).window.document;
  assert.equal(doc.querySelectorAll('h1').length, 1, `${pathname}: one readable heading`);
  assert.ok(doc.querySelector('main').textContent.trim().length > 80, `${pathname}: readable content`);
  assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1, `${pathname}: duplicate descriptions`);
  assert.equal(doc.querySelector('link[rel="canonical"]').href, url);
  assert.ok(doc.querySelectorAll('a[href]').length > 2, `${pathname}: crawlable links`);
  const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(n => JSON.parse(n.textContent));
  assert.ok(schemas.some(s => s['@type'] === 'Person' && s['@id']), `${pathname}: connected identity`);
  assert.ok(!doc.querySelector('meta[name="robots"]')?.content.includes('noindex'));
}
const speaking = new JSDOM(fs.readFileSync(path.join(base, 'speaking/index.html'), 'utf8')).window.document;
assert.equal(speaking.querySelectorAll('article').length, 39, 'Entire speaking archive must be readable without clicking');
const missing = new JSDOM(fs.readFileSync(path.join(base, '404.html'), 'utf8')).window.document;
assert.ok(missing.querySelector('meta[name="robots"]').content.includes('noindex'));
const redirects = fs.readFileSync(path.join(base, '_redirects'), 'utf8');
assert.ok(redirects.trim().endsWith('/* /404.html 404'));
assert.ok(!redirects.includes('/* /index.html 200'));
assert.ok(fs.readFileSync(path.join(base, 'llms.txt'), 'utf8').includes('training'));
console.log(`Crawl checks passed for ${urls.length} pages, full speaking archive and 404 output.`);
