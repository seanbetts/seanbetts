const { test } = require('node:test');
const assert = require('node:assert/strict');
const { checkCssModules } = require('../check-css.cjs');

test('browser and renderer must agree on scoped and composed CSS-module exports', () => {
  const browser = { 'src/Page.module.css': { title: 'sb_title_abc', back: 'sb_back_xyz sb_shared_123' } };
  assert.equal(checkCssModules(browser, structuredClone(browser)), 1);
  assert.throws(() => checkCssModules(browser, { 'src/Page.module.css': { title: 'sb_title_abc', back: 'sb_back_xyz sb_shared_456' } }), /CSS-module exports differ/);
  assert.throws(() => checkCssModules(browser, {}), /CSS-module exports differ/);
  assert.throws(() => checkCssModules({}, {}), /inventory is empty/);
});
