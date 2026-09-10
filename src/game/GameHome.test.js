import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GameHome from './GameHome';

test('preserves home search and social descriptions and keywords with the new cover copy', async () => {
  render(<MemoryRouter><GameHome /></MemoryRouter>);
  const description = 'Sean Betts is Chief AI & Innovation Officer at Omnicom Media UK, an independent AI researcher and builder focused on AI strategy, product innovation and business transformation.';
  await waitFor(() => {
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      expect(document.querySelector(selector)).toHaveAttribute('content', description);
    }
    expect(document.querySelector('meta[name="keywords"]')).toHaveAttribute('content', 'Sean Betts, AI strategy, product innovation, business transformation, marketing technology, generative AI, Omnicom Media UK');
  });
  expect(screen.queryByText('Chief AI & Innovation Officer')).not.toBeInTheDocument();
  expect(screen.getByText('Hands-on AI Leader')).toBeInTheDocument();
  expect(screen.getByText('AI strategy · Transformation · Product innovation')).toBeInTheDocument();
  expect(screen.getByText('Autistic · Neurodiversity & Mental Health Speaker')).toBeInTheDocument();
});

test('publishes the original WebSite and Person structured data without advertising a nonexistent search route', async () => {
  render(<MemoryRouter><GameHome /></MemoryRouter>);
  await waitFor(() => {
    const schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]'), node => JSON.parse(node.textContent));
    expect(schemas).toEqual(expect.arrayContaining([
      expect.objectContaining({ '@type': 'WebSite', '@id': 'https://www.seanbetts.com/#website' }),
      expect.objectContaining({ '@type': 'Person', '@id': 'https://www.seanbetts.com/#sean-betts', name: 'Sean Betts' }),
    ]));
    expect(JSON.stringify(schemas)).not.toContain('SearchAction');
  });
});
