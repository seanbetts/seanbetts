import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GameHome from './GameHome';

test('preserves home search and social descriptions and keywords with the new cover copy', async () => {
  render(<MemoryRouter><GameHome /></MemoryRouter>);
  const description = 'Sean Betts is Chief AI & Innovation Officer at Omnicom Media Group UK, an independent AI researcher and builder focused on AI strategy, product innovation and business transformation.';
  await waitFor(() => {
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      expect(document.querySelector(selector)).toHaveAttribute('content', description);
    }
    expect(document.querySelector('meta[name="keywords"]')).toHaveAttribute('content', 'Sean Betts, AI strategy, product innovation, business transformation, marketing technology, generative AI, Omnicom Media Group UK');
  });
  expect(screen.getByText('Chief AI & Innovation Officer')).toBeInTheDocument();
  expect(screen.getByText('Hands-on AI leader')).toBeInTheDocument();
  expect(screen.getByText(/AI strategy, transformation/)).toHaveTextContent('AI strategy, transformation& product innovation');
  expect(screen.getByText('Autistic').parentElement).toHaveTextContent('Autistic · Neurodiversity& mental health speaker');
});

test('publishes the original WebSite and Person structured data without advertising a nonexistent search route', async () => {
  render(<MemoryRouter><GameHome /></MemoryRouter>);
  await waitFor(() => {
    const schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]'), node => JSON.parse(node.textContent));
    expect(schemas).toEqual([
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Sean Betts',
        url: 'https://www.seanbetts.com',
        description: 'Sean Betts: Chief AI & Innovation Officer, AI researcher and builder focused on AI strategy, product innovation and business transformation.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Sean Betts',
        jobTitle: 'Chief AI & Innovation Officer',
        description: 'AI Researcher & Developer, Neurodiversity Advocate',
        url: 'https://www.seanbetts.com',
        sameAs: [
          'https://www.linkedin.com/in/seanbetts/',
          'https://github.com/seanbetts',
          'https://twitter.com/seanbetts',
          'https://bsky.app/profile/seanbetts.com',
        ],
      },
    ]);
  });
});
