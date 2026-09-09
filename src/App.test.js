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
  expect(screen.getByRole('link', { name: 'Map' })).toHaveAttribute('href', '/map');
  expect(screen.getByRole('button', { name: 'Open navigation' })).toBeInTheDocument();
});


test.each(['/about', '/about/', '/About'])('opens %s in the portfolio shell', (pathname) => {
  window.history.replaceState({}, '', pathname);
  render(<App />);
  expect(screen.getByRole('heading', { name: /^About\s*\.$/, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Map' })).toHaveAttribute('href', '/map');
});

test('portrait to About to project keeps the return journey intact', () => {
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'About Sean Betts', exact: true }));
  expect(screen.getByRole('heading', { name: /^About\s*\.$/, level: 1 })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'sideBar', exact: true }));
  expect(screen.getByRole('heading', { name: 'sideBar', level: 1 })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Back to About' }));
  expect(screen.getByRole('heading', { name: /^About\s*\.$/, level: 1 })).toBeInTheDocument();
  jest.restoreAllMocks();
});

describe('desktop-only map', () => {
  let originalMatchMedia;
  let media;
  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    media = { matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() };
    window.matchMedia = jest.fn(() => media);
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });
  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    jest.restoreAllMocks();
  });

  test('a mobile map URL redirects home without offering Map navigation', () => {
    window.history.replaceState({}, '', '/map');
    render(<App />);
    expect(window.location.pathname).toBe('/');
    expect(screen.getByRole('heading', { name: 'Sean Betts', level: 1 })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Map' })).not.toBeInTheDocument();
  });

  test('mobile Building and project navigation avoid the map', () => {
    window.history.replaceState({}, '', '/building');
    render(<App />);
    expect(screen.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/');
    expect(screen.queryByRole('link', { name: /map/i })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Open sideBar project' }));
    expect(screen.getByRole('link', { name: 'Back to Building' })).toHaveAttribute('href', '/building');
    expect(screen.queryByRole('link', { name: /map/i })).not.toBeInTheDocument();
  });

  test('desktop keeps the interactive map', () => {
    media.matches = true;
    window.history.replaceState({}, '', '/map');
    render(<App />);
    expect(window.location.pathname).toBe('/map');
    expect(screen.getByRole('heading', { name: /Choose your next stop/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Map' })).toHaveAttribute('href', '/map');
  });
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
