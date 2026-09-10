import { fireEvent, render, screen } from '@testing-library/react';
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
  expect(screen.getByRole('heading', { name: /AI thought leadership for global brands/, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Sean Betts home' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('button', { name: 'Open navigation' })).toBeInTheDocument();
});


test.each(['/about', '/about/', '/About'])('opens %s in the portfolio shell', (pathname) => {
  window.history.replaceState({}, '', pathname);
  render(<App />);
  expect(screen.getByRole('heading', { name: /^About\s*\.$/, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Sean Betts home' })).toHaveAttribute('href', '/');
});

test('About pane to About to project keeps the return journey intact', () => {
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: /About A little more about me/i }));
  expect(screen.getByRole('heading', { name: /^About\s*\.$/, level: 1 })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'sideBar', exact: true }));
  expect(screen.getByRole('heading', { name: 'sideBar', level: 1 })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Back to About' }));
  expect(screen.getByRole('heading', { name: /^About\s*\.$/, level: 1 })).toBeInTheDocument();
  jest.restoreAllMocks();
});

test.each(['/map', '/map/', '/Map'])('retired map URL %s redirects home without Map navigation', pathname => {
  window.history.replaceState({}, '', pathname);
  render(<App />);
  expect(window.location.pathname).toBe('/');
  expect(screen.getByRole('heading', { name: 'Sean Betts', level: 1 })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Map' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
  expect(screen.queryByRole('link', { name: 'Map' })).not.toBeInTheDocument();
});

test.each(['/speaking', '/speaking/', '/Speaking'])('opens %s with the game navigation', pathname => {
  window.history.replaceState({}, '', pathname);
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /^Speaking\s*\.$/ })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open navigation' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/');
});

test.each(['/contact', '/contact/', '/Contact'])('opens %s with the game navigation', pathname => {
  window.history.replaceState({}, '', pathname);
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /^Contact\s*\.$/ })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open navigation' })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Connect with Sean' })).toBeInTheDocument();
});
