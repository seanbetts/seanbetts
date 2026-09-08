import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WorldMap from './WorldMap';

function renderMap() {
  return render(<MemoryRouter><WorldMap /></MemoryRouter>);
}

test('each destination updates its selected detail and real navigation link', () => {
  renderMap();
  const destinations = [
    ['Writing', 'The newsroom', '/writing'],
    ['Speaking', 'The stage', '/speaking'],
    ['About', 'The story', '/about'],
    ['Building', 'The workshop', '/building'],
  ];
  destinations.forEach(([name, title, path]) => {
    fireEvent.click(screen.getByRole('button', { name: `Select ${name}` }));
    expect(screen.getByRole('button', { name: `Select ${name}` })).toHaveAttribute('aria-pressed', 'true');
    expect(within(screen.getByRole('group', { name: 'Destination choices' })).getAllByRole('button', { pressed: true })).toHaveLength(1);
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: `Explore ${name}` })).toHaveAttribute('href', path);
  });
});

test('zoom is bounded and reset restores the full map without losing selection', () => {
  renderMap();
  const zoomIn = screen.getByRole('button', { name: 'Zoom in' });
  const zoomOut = screen.getByRole('button', { name: 'Zoom out' });
  expect(zoomOut).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Select About' }));
  for (let i = 0; i < 10; i += 1) fireEvent.click(zoomIn);
  expect(zoomIn).toBeDisabled();
  expect(screen.getByRole('status')).toHaveTextContent('200%');
  fireEvent.click(screen.getByRole('button', { name: 'Reset map zoom' }));
  expect(screen.getByRole('status')).toHaveTextContent('100%');
  expect(zoomOut).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Select About' })).toHaveAttribute('aria-pressed', 'true');
});

test('the city is identified as illustrative and all location controls are native buttons', () => {
  renderMap();
  expect(screen.getByRole('img', { name: /illustrative navigation map/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Select Building' }).tagName).toBe('BUTTON');
});

test('the map markers and always visible destination choices control the same selection', () => {
  renderMap();
  fireEvent.click(screen.getByRole('button', { name: 'Select Speaking on map' }));
  expect(screen.getByRole('button', { name: 'Select Speaking' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('link', { name: 'Explore Speaking' })).toHaveAttribute('href', '/speaking');
});
