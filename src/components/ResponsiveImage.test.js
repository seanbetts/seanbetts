import { render, screen } from '@testing-library/react';
import ResponsiveImage from './ResponsiveImage';
import images from '../generated/images.json';

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
