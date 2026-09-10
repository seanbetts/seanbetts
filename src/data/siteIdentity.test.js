import { pagePath, pageUrl } from './siteIdentity';

test.each([
  ['/', '/'], ['/about', '/about/'], ['/about/', '/about/'],
  ['/about#research', '/about/#research'],
  ['/building/sidebar?from=about#details', '/building/sidebar/?from=about#details'],
])('public page URL preserves query and fragment for %s', (input, expected) => {
  expect(pagePath(input)).toBe(expected);
  expect(pageUrl(input)).toBe(`https://www.seanbetts.com${expected}`);
});
