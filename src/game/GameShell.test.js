import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GameShell from './GameShell';
import GameHome from './GameHome';
import { ThemeProvider } from '../ThemeContext';

beforeEach(() => { localStorage.clear(); jest.spyOn(window, 'scrollTo').mockImplementation(() => {}); });
afterEach(() => { jest.restoreAllMocks(); });

function mount(pathname = '/') {
  return render(<ThemeProvider><MemoryRouter initialEntries={[pathname]}><GameShell><Routes>
    <Route path="/" element={<GameHome />} />
    <Route path="/building" element={<h1>Project collection</h1>} />
  </Routes></GameShell></MemoryRouter></ThemeProvider>);
}

test('cover Building panel navigates to the real collection route', () => {
  mount();
  fireEvent.click(screen.getByRole('link', { name: /Building Products/i }));
  expect(screen.getByRole('heading', { name: 'Project collection' })).toBeInTheDocument();
});

test('quick navigation closes on selection and Escape restores the trigger focus', () => {
  mount();
  const trigger = screen.getByRole('button', { name: 'Open navigation' });
  fireEvent.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(trigger).toHaveFocus();
  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole('link', { name: 'Building', exact: true }));
  expect(screen.getByRole('heading', { name: 'Project collection' })).toBeInTheDocument();
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByRole('main')).toHaveFocus();
  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
});

test.each([
  ['/', 'Home'],
  ['/building', 'Building'],
  ['/', 'Sean Betts home'],
])('activating the current route %s through %s closes navigation and focuses content', (pathname, name) => {
  mount(pathname);
  const trigger = screen.getByRole('button', { name: 'Open navigation' });
  fireEvent.click(trigger);
  const link = screen.getByRole('link', { name, exact: true });
  link.focus();
  fireEvent.click(link);
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByRole('navigation', { name: 'Primary navigation' })).not.toBeInTheDocument();
  expect(screen.getByRole('main')).toHaveFocus();
  expect(window.scrollTo).not.toHaveBeenCalled();
});

test('cover links to thought leadership and About without Map navigation', () => {
  mount();
  expect(screen.getByRole('heading', { name: 'Sean Betts', level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Thought leadership AI perspectives/i })).toHaveAttribute('href', '/thought-leadership');
  expect(screen.queryByRole('link', { name: 'Map' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'About Sean Betts' })).toHaveAttribute('href', '/about');
  expect(screen.queryByRole('link', { name: /Explore the map/i })).not.toBeInTheDocument();
});


test('social icon links retain accessible platform names and destinations', () => {
  mount();
  for (const [name, href] of [
    ['LinkedIn', 'https://www.linkedin.com/in/seanbetts/'],
    ['GitHub', 'https://github.com/seanbetts'],
    ['Bluesky', 'https://bsky.app/profile/seanbetts.com'],
    ['The Blueprint', 'https://www.the-blueprint.ai'],
  ]) {
    const link = screen.getByRole('link', { name, exact: true });
    expect(link).toHaveAttribute('href', href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveTextContent('');
    expect(link.querySelector('svg')).toBeInTheDocument();
  }
});


test('theme toggle updates the palette, preserves the accessible heart and remembers the choice', () => {
  const view = mount();
  expect(view.container.firstChild).toHaveClass('game-dark');
  expect(screen.getByRole('img', { name: 'love' }).querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }));
  expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
  expect(view.container.firstChild).toHaveClass('game-light');
  expect(screen.getByRole('img', { name: 'love' })).toBeInTheDocument();
  expect(localStorage.getItem('darkMode')).toBe('false');
  view.unmount();
  mount('/building');
  expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
  expect(localStorage.getItem('darkMode')).toBe('true');
  expect(screen.getByRole('img', { name: 'love' })).toBeInTheDocument();
});
