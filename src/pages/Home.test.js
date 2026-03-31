import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import brandLogos from '../data/brandLogos';

test('renders the homepage authority section copy', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('heading', {
      name: /ai thought leadership for global brands/i,
      level: 2,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText(
      /providing strategic perspectives to global brands on how ai is rewiring discovery, consumer behaviour, and digital marketing strategies\./i
    )
  ).toBeInTheDocument();
});

test('renders brand logos in alphabetical order', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const renderedLogoNames = screen
    .getAllByRole('img')
    .map((image) => image.getAttribute('alt'))
    .filter((alt) => alt?.endsWith(' logo'))
    .map((alt) => alt.replace(/ logo$/, ''));

  const sortedBrandNames = [...brandLogos]
    .map(({ name }) => name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  expect(renderedLogoNames).toEqual(sortedBrandNames);
});

test('renders brand logo tiles with tooltip labels', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByLabelText('Apple')).toHaveAttribute('tabIndex', '0');
  expect(screen.getByText('Apple')).toBeInTheDocument();
});
