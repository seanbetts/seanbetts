// Compare actual CSS-module exports, including classes that only use composes.
const assert = require('node:assert/strict');
function checkCssModules(browser, renderer) {
  assert(Object.keys(browser).length > 0, 'Browser CSS-module inventory is empty');
  assert.deepStrictEqual(renderer, browser, 'Browser and static renderer CSS-module exports differ');
  return Object.keys(browser).length;
}
module.exports = { checkCssModules };
