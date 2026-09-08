import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThoughtLeadership from './ThoughtLeadership';
import brandLogos from '../data/brandLogos';

test('preserves all global brands and removes the bottom writing and speaking links', () => {
  render(<MemoryRouter><ThoughtLeadership /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Thoughtleadership.');
  expect(screen.getByText(/Providing strategic perspectives to global brands/)).toBeInTheDocument();
  fireEvent.click(screen.getByText('View all 21 brands'));
  const list = screen.getByRole('list', { name: 'Global brands' });
  expect(within(list).getAllByRole('listitem')).toHaveLength(21);
  for (const brand of brandLogos) expect(within(list).getByText(brand.name)).toBeInTheDocument();
  const street = screen.getByRole('region', { name: 'Illustrated brand high street' });
  for (const name of ["Sainsbury's", 'Chanel', 'Apple', 'Barclays', 'British Gas', 'Channel 4']) {
    expect(within(street).getByRole('img', { name })).toHaveAttribute('src', brandLogos.find(brand => brand.name === name).src);
  }
  for (const name of ["McDonald's", 'Warner Bros.']) {
    expect(screen.getByRole('img', { name })).toHaveAttribute('src', brandLogos.find(brand => brand.name === name).src);
  }
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(screen.queryByRole('region', { name: 'Explore my perspectives' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Writing & The Blueprint/ })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Speaking & keynotes/ })).not.toBeInTheDocument();
});
