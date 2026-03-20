import { render, waitFor } from '@testing-library/react';
import Seo from './Seo';

test('normalizes relative seo URLs to absolute site URLs', async () => {
  render(
    <Seo
      title="Example Page"
      description="Example description"
      canonicalPath="/example"
      imagePath="/images/example.png"
    />
  );

  await waitFor(() => {
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.seanbetts.com/example'
    );
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://www.seanbetts.com/images/example.png'
    );
    expect(document.title).toBe('Example Page');
  });
});
