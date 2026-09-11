const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const { ORIGIN, validateManifest } = require('./indexnow.cjs');

const text = value => value.replace(/\s+/g, ' ').trim();

// One cache per build/check: digest only referenced local media, never remote URLs.
function createAssetHasher(directory) {
  const root = path.resolve(directory);
  const hashes = new Map();
  return url => {
    if (!url.startsWith('/') && !url.startsWith(`${ORIGIN}/`)) return null;
    const parsed = new URL(url, ORIGIN);
    if (parsed.origin !== ORIGIN) return null;
    const file = path.resolve(root, '.' + decodeURIComponent(parsed.pathname));
    if (!file.startsWith(root + path.sep)) throw new Error('IndexNow asset is outside the build directory');
    if (!hashes.has(file)) hashes.set(file, createHash('sha256').update(fs.readFileSync(file)).digest('hex'));
    return hashes.get(file);
  };
}

function contentHash(html, assetHash = () => null) {
  const dom = new JSDOM(html);
  try {
    const document = dom.window.document;
    const main = document.querySelector('main');
    if (!main || !text(main.textContent)) throw new Error('IndexNow page has no readable main content');
    main.querySelectorAll('script, style').forEach(node => node.remove());
    // Ignore CSS classes and JS/CSS bundle names. Retain content and discovery metadata.
    const content = {
      title: document.title,
      metadata: [...document.querySelectorAll('meta[name], meta[property], link[rel="canonical"]')]
        .map(node => [node.getAttribute('name') || node.getAttribute('property') || 'canonical', node.getAttribute('content') || node.getAttribute('href')])
        .filter(([name]) => /^(description|robots|googlebot|bingbot|author|canonical|og:.*|twitter:.*)$/.test(name))
        .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
      schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent)),
      text: text(main.textContent),
      headings: [...main.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(node => [node.tagName, text(node.textContent)]),
      links: [...main.querySelectorAll('a[href]')].map(node => [node.getAttribute('href'), text(node.textContent), node.getAttribute('aria-label')]),
      images: [...main.querySelectorAll('img')].map(node => [node.getAttribute('src'), node.getAttribute('alt')]),
      media: [...main.querySelectorAll('img,source,video,audio,iframe')].map(node => {
        const attributes = ['src', 'srcset', 'poster', 'media', 'type'].map(name => node.getAttribute(name));
        const urls = node.tagName === 'IFRAME' ? [] : [node.getAttribute('src'), node.getAttribute('poster'),
          ...(node.getAttribute('srcset') || '').split(',').map(candidate => candidate.trim().split(/\s+/)[0])].filter(Boolean);
        return [node.tagName, attributes, urls.map(url => [url, assetHash(url)])];
      }),
    };
    return createHash('sha256').update(JSON.stringify(content)).digest('hex');
  } finally {
    dom.window.close();
  }
}

function createManifest(pages, revision, assetHash) {
  const manifest = { version: 1, revision, host: new URL(ORIGIN).host, pages: {} };
  for (const page of pages) {
    if (Object.hasOwn(manifest.pages, page.url)) throw new Error('Duplicate IndexNow page');
    manifest.pages[page.url] = contentHash(page.html, assetHash);
  }
  return validateManifest(manifest);
}

module.exports = { contentHash, createManifest, createAssetHasher };
