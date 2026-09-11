import { useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import ResponsiveImage from './ResponsiveImage';
import images from '../generated/images.json';

test.each([
  ['failed before hydration', true, 0, true],
  ['still loading', false, 0, false],
  ['loaded successfully', true, 640, false],
])('an image that %s selects the appropriate presentation', async (_, complete, naturalWidth, expectedFallback) => {
  function ImageWithFallback() {
    const [failed, setFailed] = useState(false);
    return failed ? <p>Project artwork fallback</p> : <ResponsiveImage
      src="/images/projects/example.png" alt="Project screenshot" onError={() => setFailed(true)} />;
  }
  const container = document.createElement('div');
  document.body.appendChild(container);
  container.innerHTML = renderToString(<ImageWithFallback />);
  // JSDOM does not fetch images. Set the browser's completed request state
  // before hydration, when React has not yet attached the error handler.
  Object.defineProperties(container.querySelector('img'), {
    complete: { value: complete },
    naturalWidth: { value: naturalWidth },
  });
  let root;
  try {
    await act(async () => { root = hydrateRoot(container, <ImageWithFallback />); });
    expect(container.textContent.includes('Project artwork fallback')).toBe(expectedFallback);
    expect(Boolean(container.querySelector('img'))).toBe(!expectedFallback);
  } finally {
    act(() => root?.unmount());
    container.remove();
  }
});

test('illustrated artwork offers AVIF while retaining its responsive WebP image and loading hints', () => {
  const src = '/images/game/about-studies/professional-discussion-v2-colour.png';
  const { container } = render(<ResponsiveImage src={src} alt="Illustrated discussion" sizes="400px" fetchpriority="high" />);
  const image = screen.getByRole('img', { name: 'Illustrated discussion' });
  const source = container.querySelector('picture source');
  expect(source).toHaveAttribute('type', 'image/avif');
  expect(source.getAttribute('srcset')).toContain(images[src].avif[0].src);
  expect(source).toHaveAttribute('sizes', '400px');
  expect(image.getAttribute('srcset')).toContain(images[src].variants[0].src);
  expect(image).toHaveAttribute('fetchpriority', 'high');
  expect(image).toHaveAttribute('width', String(images[src].width));
});

test('vector assets keep their original source and do not receive raster format candidates', () => {
  const { container } = render(<ResponsiveImage src="/images/game/sean-betts.svg" alt="Sean Betts" width={610} height={360} />);
  expect(screen.getByRole('img')).toHaveAttribute('src', '/images/game/sean-betts.svg');
  expect(container.querySelector('picture')).toBeNull();
});


test('artwork that compresses better as WebP keeps that format', () => {
  const { container } = render(<ResponsiveImage src="/images/game/backgrounds/river-sunset.webp" alt="River at sunset" />);
  expect(screen.getByRole('img')).toHaveAttribute('srcset');
  expect(container.querySelector('source[type="image/avif"]')).toBeNull();
});
