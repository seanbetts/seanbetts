import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InternalLink from './InternalLink';

test('renders a router link for internal navigation', () => {
  render(
    <MemoryRouter>
      <InternalLink to="/contact" aria-label="Email">
        Contact
      </InternalLink>
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', '/contact');
});
