// Shared readers for checking the actual export against the source inventory.
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const build = path.resolve(__dirname, '../build');
const inventory = require('../src/generated/site-inventory.json');
const readOutput = file => fs.readFileSync(path.join(build, file), 'utf8');
const readPage = route => new JSDOM(readOutput(route === '/404' ? '404.html' : path.join(route, 'index.html'))).window.document;
const sitemapUrls = () => [...new JSDOM(readOutput('sitemap.xml'), { contentType: 'text/xml' }).window.document.querySelectorAll('loc')].map(node => node.textContent);
module.exports = { build, inventory, readOutput, readPage, sitemapUrls };
