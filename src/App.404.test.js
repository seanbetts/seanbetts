import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  window.history.replaceState({}, '', '/');
  localStorage.clear();
  jest.restoreAllMocks();
});

test.each(['/404', '/missing-page', '/building/not-a-real-project', '/building/missing/extra'])('%s opens a standalone accessible error screen', async pathname => {
  window.history.replaceState({}, '', pathname);
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Busted', level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('main', { name: 'Page not found' })).toHaveFocus();
  expect(screen.queryByRole('banner')).not.toBeInTheDocument();
  expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Return home' })).toHaveAttribute('href', '/');
  await waitFor(() => expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow'));
});

test('returning home restores the portfolio shell and the saved daylight preference', async () => {
  localStorage.setItem('darkMode', 'false');
  window.history.replaceState({}, '', '/missing-page');
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Return home' }));

  expect(window.location.pathname).toBe('/');
  expect(screen.getByRole('heading', { name: 'Sean Betts', level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
  expect(document.body).not.toHaveClass('busted-mode');
  await waitFor(() => expect(document.querySelector('meta[name="robots"]')).not.toBeInTheDocument());
});
