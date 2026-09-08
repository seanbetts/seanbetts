import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

const mount = () => render(<MemoryRouter><About /></MemoryRouter>);

test('chapter shortcuts reach named sections with biography and project links preserved', () => {
  mount();
  const navigation = screen.getByRole('navigation', { name: 'About chapters' });
  for (const [name, section] of [['Professional Experience', 'professional'], ['AI Research & Development', 'research'], ['Speaking & Advocacy', 'advocacy']]) {
    const link = within(navigation).getByRole('link', { name: new RegExp(name) });
    expect(link).toHaveAttribute('href', `#${section}`);
    expect(document.getElementById(section)).toHaveAttribute('aria-labelledby', `${section}-heading`);
  }
  expect(screen.getByText(/I lead our AI Centre of Excellence/)).toBeInTheDocument();
  expect(screen.getByText(/2,800\+ questions across 20 marketing/)).toBeInTheDocument();
  expect(screen.getByText(/burnout followed by depression and anxiety in 2017/)).toBeInTheDocument();
  expect(screen.getByText(/My autism diagnosis in 2022/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'benchmarking framework' })).toHaveAttribute('href', '/building/genai-marketing-benchmarks');
  expect(screen.getByRole('link', { name: 'Thought leadership for global brands' })).toHaveAttribute('href', '/thought-leadership');
  expect(screen.queryByRole('complementary', { name: 'Get in touch' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', '/contact');
});

test('retains the About canonical URL and profile structured data', async () => {
  mount();
  await waitFor(() => {
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.seanbetts.com/about');
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute('content', 'profile');
    const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
    expect(schema).toMatchObject({ '@type': 'Person', name: 'Sean Betts', jobTitle: 'Chief AI & Innovation Officer', worksFor: { name: 'Omnicom Media Group UK' } });
  });
});
