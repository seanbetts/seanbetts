import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThoughtLeadership from './ThoughtLeadership';

test('preserves all global brands and removes the bottom writing and speaking links', () => {
  render(<MemoryRouter><ThoughtLeadership /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('AI thought leadership for global brands.');
  expect(screen.getByText(/Providing strategic perspectives to global brands/)).toBeInTheDocument();
  expect(screen.queryByText('Ideas with real-world impact')).not.toBeInTheDocument();
  expect(screen.queryByText('AI strategy · Transformation · Product innovation')).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  expect(screen.queryByText('View all brands')).not.toBeInTheDocument();
  const list = screen.getByRole('list', { name: 'Additional global brands' });
  expect(list).toBeVisible();
  expect(list.closest('details')).toBeNull();
  expect(within(list).getAllByRole('listitem').map(item => item.textContent)).toEqual([
    'Allwyn', 'giffgaff', 'HM Government', 'NatWest', 'PepsiCo', 'pladis',
    'Renault', 'Virgin Media O2', 'Volkswagen', 'Whitbread',
  ]);
  const street = screen.getByRole('region', { name: 'Illustrated brand high street' });
  const streetImage = within(street).getByRole('img');
  expect(streetImage).toHaveAttribute('src', '/images/game/brand-street/street-integrated-v4.png');
  for (const name of ["Sainsbury's", 'Chanel', 'Apple', 'Barclays', 'British Gas', 'Channel 4']) {
    expect(streetImage.getAttribute('alt')).toContain(name);
  }
  for (const [name, scene] of [["McDonald's", 'takeaway'], ['Warner Bros.', 'film-set'], ['Halfords', 'getaway'], ['Lidl', 'marina'], ['John Lewis', 'delivery']]) {
    expect(screen.getByRole('img', { name })).toHaveAttribute('src', `/images/game/brand-scenes/${scene}-integrated-v2.png`);
  }
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(screen.queryByRole('region', { name: 'Explore my perspectives' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Writing & The Blueprint/ })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Speaking & keynotes/ })).not.toBeInTheDocument();
});
