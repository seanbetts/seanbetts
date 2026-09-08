import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GameShell from './GameShell';
import GameHome from './GameHome';

beforeEach(() => { jest.spyOn(window, 'scrollTo').mockImplementation(() => {}); });
afterEach(() => { jest.restoreAllMocks(); });

function mount(pathname = '/') {
  return render(<MemoryRouter initialEntries={[pathname]}><GameShell><Routes>
    <Route path="/" element={<GameHome />} />
    <Route path="/building" element={<h1>Project collection</h1>} />
    <Route path="/map" element={<h1>World map</h1>} />
  </Routes></GameShell></MemoryRouter>);
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
  ['/map', 'Map'],
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

test('map panel is a normal link and the name is an accessible heading', () => {
  mount();
  expect(screen.getByRole('heading', { name: 'Sean Betts', level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Explore the map Projects/i })).toHaveAttribute('href', '/map');
});
