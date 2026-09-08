import { render, screen } from '@testing-library/react';
import App from './App';

afterEach(() => { window.history.replaceState({}, '', '/'); });

test('renders the current home page content', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /sean betts/i, level: 1 })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Hands-on AI Leader/i)
  ).toBeInTheDocument();
});


test.each(['/thought-leadership', '/thought-leadership/', '/Thought-Leadership'])('loads %s with the game navigation', (pathname) => {
  window.history.replaceState({}, '', pathname);
  render(<App />);
  expect(screen.getByRole('heading', { name: /Thought leadership/, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Map' })).toHaveAttribute('href', '/map');
  expect(screen.getByRole('button', { name: 'Open navigation' })).toBeInTheDocument();
});
