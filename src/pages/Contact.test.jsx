import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from './Contact';

test('presents the existing contact channels with LinkedIn first', () => {
  render(<MemoryRouter><Contact /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Contact.');
  const links = within(screen.getByRole('navigation', { name: 'Connect with Sean' })).getAllByRole('link');
  expect(links.map(link => link.getAttribute('href'))).toEqual([
    'https://www.linkedin.com/in/seanbetts/', 'https://www.the-blueprint.ai/',
    'https://github.com/seanbetts', 'https://bsky.app/profile/seanbetts.com',
  ]);
  links.forEach(link => {
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
  expect(screen.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/');
});
