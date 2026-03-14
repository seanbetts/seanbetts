import fs from 'fs';
import path from 'path';

describe('ProjectPage hero layout CSS', () => {
  const cssPath = path.join(__dirname, 'ProjectPage.module.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  test('centers the hero media within the framed container', () => {
    expect(css).toMatch(/\.projectHero\s*\{[^}]*display:\s*flex;/s);
    expect(css).toMatch(/\.projectHero\s*\{[^}]*justify-content:\s*center;/s);
    expect(css).toMatch(/\.projectHero\s*\{[^}]*align-items:\s*center;/s);
  });

  test('lets the image wrapper fill the frame and center the image', () => {
    expect(css).toMatch(/\.projectImage\s*\{[^}]*width:\s*100%;/s);
    expect(css).toMatch(/\.projectImage\s*\{[^}]*display:\s*flex;/s);
    expect(css).toMatch(/\.projectImage\s*\{[^}]*justify-content:\s*center;/s);
    expect(css).toMatch(/\.projectImage\s*\{[^}]*align-items:\s*center;/s);
    expect(css).toMatch(/\.projectImage img\s*\{[^}]*max-width:\s*100%;/s);
  });
});
