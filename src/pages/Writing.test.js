import { createEvent, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Writing from './Writing';
import articlesData from '../data/articlesData';
import { PERSON_ID } from '../data/siteIdentity';

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
  window.history.replaceState({}, '', '/');
});

afterEach(() => {
  global.fetch = originalFetch;
});

test('keeps every article reachable without preview requests or cached metadata', () => {
  localStorage.setItem('articleMetadata', '{invalid old cache');
  render(<MemoryRouter><Writing /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1, name: 'Writing' })).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
  expect(screen.queryByText(/preview unavailable|loading\.\.\./i)).not.toBeInTheDocument();
  const featured = screen.getByRole('region', { name: 'Featured articles' });
  expect(screen.queryByRole('region', { name: 'More writing' })).not.toBeInTheDocument();
  expect(articlesData.every(article => article.image)).toBe(true);
  expect(screen.queryByRole('button', { name: 'Show more articles' })).not.toBeInTheDocument();
  expect(within(featured).getAllByRole('link')).toHaveLength(articlesData.filter(article => article.image).length - 1);
  articlesData.forEach(article => {
    const title = screen.getByRole('heading', { name: article.title });
    const link = within(title.closest('article')).getByRole('link');
    expect(link).toHaveAttribute('href', article.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(within(title.closest('article')).getByText(article.publication)).toBeInTheDocument();
    expect(link).toHaveAccessibleName(`${article.title} Opens in a new tab`);
    expect(screen.getAllByRole('heading', { name: article.title })).toHaveLength(1);
    if (article.image) {
      const panel = title.closest('article');
      const info = within(panel).getByRole('button', { name: `About this article: ${article.title}` });
      fireEvent.click(info);
      expect(within(panel).getByText(article.description)).toBeVisible();
      fireEvent.click(info);
      expect(within(panel).getByText(article.description)).not.toBeVisible();
    } else {
      expect(within(link).getByText(article.description)).toBeInTheDocument();
    }
  });
  localStorage.removeItem('articleMetadata');
});

test('places the lead article in the hero without repeating it in the gallery', () => {
  render(<MemoryRouter><Writing /></MemoryRouter>);
  const article = articlesData.find(article => article.image);
  const heading = screen.getByRole('heading', { level: 2, name: article.title });
  expect(heading.closest('header')).not.toBeNull();
  expect(screen.getAllByRole('heading', { name: article.title })).toHaveLength(1);
  expect(within(heading.closest('article')).getByRole('img', { name: article.imageAlt })).toHaveAttribute('loading', 'eager');
  expect(screen.queryByRole('img', { name: /Illustrated hands/ })).not.toBeInTheDocument();
});

test('article summaries support hover, keyboard focus, Escape, touch toggling and outside dismissal', () => {
  render(<MemoryRouter><Writing /></MemoryRouter>);
  const article = articlesData[0];
  const button = screen.getByRole('button', { name: `About this article: ${article.title}` });
  const summary = screen.getByText(article.description);
  expect(summary).not.toBeVisible();
  const hover = createEvent.pointerOver(button, { bubbles: true });
  Object.defineProperty(hover, 'pointerType', { value: 'mouse' });
  fireEvent(button, hover);
  expect(summary).toBeVisible();
  fireEvent.pointerOut(button);
  expect(summary).not.toBeVisible();
  fireEvent.focus(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
  expect(summary).toBeVisible();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(summary).not.toBeVisible();
  fireEvent.click(button);
  expect(summary).toBeVisible();
  fireEvent.pointerDown(document.body);
  expect(summary).not.toBeVisible();
  fireEvent.click(button);
  expect(summary).toBeVisible();
  fireEvent.click(button);
  expect(summary).not.toBeVisible();
  expect(button.closest('a')).toBeNull();
});

test('an image failure preserves the article title, summary control and destination', () => {
  render(<MemoryRouter><Writing /></MemoryRouter>);
  const article = articlesData[0];
  const panel = screen.getByRole('article', { name: article.title });
  fireEvent.error(within(panel).getByRole('img', { name: article.imageAlt }));
  expect(within(panel).queryByRole('img', { name: article.imageAlt })).not.toBeInTheDocument();
  expect(within(panel).getByRole('link')).toHaveAttribute('href', article.url);
  fireEvent.click(screen.getByRole('button', { name: `About this article: ${article.title}` }));
  expect(screen.getByText(article.description)).toBeVisible();
});

test('offers The Blueprint and formats verified publication dates', () => {
  render(<MemoryRouter><Writing /></MemoryRouter>);
  expect(screen.getByRole('link', { name: /Read The Blueprint/ })).toHaveAttribute('href', 'https://www.the-blueprint.ai');
  expect(screen.getByText('29 June 2026')).toHaveAttribute('dateTime', '2026-06-29');
});

test('credits journalists and co-authors without assigning every article to Sean', async () => {
  render(<MemoryRouter><Writing /></MemoryRouter>);
  await waitFor(() => {
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent));
    const list = schemas.find(schema => schema['@type'] === 'ItemList');
    expect(list).toBeDefined();
    const items = list.itemListElement.map(entry => entry.item);
    expect(items.find(item => item.headline === 'The Hidden Layer of the Internet').author).toEqual({ '@id': PERSON_ID });
    expect(items.find(item => item.headline.startsWith('Judge of the Day:')).author).toEqual([{ '@type': 'Person', name: 'Margo Waldrop' }]);
    expect(items.find(item => item.headline.startsWith('Predictions for 2026:')).author).toEqual([{ '@type': 'Person', name: 'Katie Duffy' }]);
    expect(items.find(item => item.headline.startsWith('AI can fix advertising')).author).toEqual([{ '@type': 'Person', name: 'Conor Nichols' }]);
    expect(items.find(item => item.headline.startsWith('Your brand must be available')).author).toEqual([{ '@id': PERSON_ID }, { '@type': 'Person', name: 'Rob Beevers' }]);
  });
});

test.each(['/writing', '/writing/', '/Writing'])('opens %s in the shared portfolio shell', pathname => {
  window.history.replaceState({}, '', pathname);
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: 'Writing' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open navigation' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/');
  expect(document.body).toHaveClass('game-mode');
});

test('homepage Writing panel and Home link complete the return journey', () => {
  const scroll = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Writing The Blueprint' }));
  expect(screen.getByRole('heading', { level: 1, name: 'Writing' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Home', exact: true }));
  expect(screen.getByRole('heading', { level: 1, name: 'Sean Betts' })).toBeInTheDocument();
  scroll.mockRestore();
});
