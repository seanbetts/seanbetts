import imageExports from '../generated/images.json';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThoughtLeadership from './ThoughtLeadership';

test('introduces the perspectives while preserving the visual brand showcase', () => {
  render(<MemoryRouter><ThoughtLeadership /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('AI perspectives for business leaders.');
  expect(screen.getByText(/I help business leaders understand how AI is changing discovery/)).toBeInTheDocument();
  expect(screen.queryByText('Ideas with real-world impact')).not.toBeInTheDocument();
  expect(screen.queryByText('AI strategy · Transformation · Product innovation')).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Informed by building. Grounded in business.');
  expect(screen.getByText('Also featuring')).toBeInTheDocument();
  expect(screen.queryByText('View all brands')).not.toBeInTheDocument();
  const list = screen.getByRole('list', { name: 'Additional global brands' });
  expect(list).toBeVisible();
  expect(list.closest('details')).toBeNull();
  expect(within(list).getAllByRole('listitem').map(item => item.textContent)).toEqual([
    'Allwyn', 'giffgaff', 'HM Government', 'NatWest', 'PepsiCo', 'pladis',
    'Renault', 'Virgin Media O2', 'Volkswagen', 'Whitbread',
  ]);
  const street = screen.getByRole('region', { name: 'Illustrated brand high street' });
  const perspective = screen.getByRole('region', { name: 'Informed by building. Grounded in business.' });
  expect(perspective.nextElementSibling).toContainElement(street);
  const streetImage = within(street).getByRole('img');
  expect(imageExports['/images/game/brand-street/street-integrated-v4.png'].variants.map(image => image.src)).toContain(streetImage.getAttribute('src'));
  expect(streetImage).toHaveAttribute('srcset');
  for (const name of ["Sainsbury's", 'Chanel', 'Apple', 'Barclays', 'British Gas', 'Channel 4']) {
    expect(streetImage.getAttribute('alt')).toContain(name);
  }
  for (const [name, artwork] of [["McDonald's", 'takeaway-cast-v3.png'], ['Warner Bros.', 'film-set-cast-v3.png'], ['Halfords', 'getaway-cast-v3.png'], ['Lidl', 'marina-integrated-v2.png'], ['John Lewis', 'delivery-integrated-v2.png']]) {
    expect(imageExports[`/images/game/brand-scenes/${artwork}`].variants.map(image => image.src)).toContain(screen.getByRole('img', { name }).getAttribute('src'));
  }
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(screen.queryByRole('region', { name: 'Explore my perspectives' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Writing & The Blueprint/ })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Speaking & keynotes/ })).not.toBeInTheDocument();
});
