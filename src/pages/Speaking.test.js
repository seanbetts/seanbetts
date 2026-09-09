import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Speaking from './Speaking';
import speakingData from '../data/speakingData';

function openPage() {
  render(<MemoryRouter><Speaking /></MemoryRouter>);
  return screen.getByRole('region', { name: /^More appearances\s*\.$/ });
}

test('features every event photograph and keeps logo and artwork appearances in the archive without duplicates', () => {
  const archive = openPage();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Speaking.');
  const selected = screen.getByRole('region', { name: 'Appearances in pictures' });
  expect(within(selected).getAllByRole('article')).toHaveLength(16);
  expect(within(selected).getAllByRole('img')).toHaveLength(16);
  expect(within(selected).queryByText('Overbury Client Seminar')).not.toBeInTheDocument();
  expect(within(selected).getByText('Barclays Marketing Frontiers')).toBeVisible();
  expect(within(selected).getByText('Apple Interactive Conference')).toBeVisible();
  expect(within(archive).getAllByRole('article')).toHaveLength(12);
  while (screen.queryByRole('button', { name: 'Show more appearances' })) {
    fireEvent.click(screen.getByRole('button', { name: 'Show more appearances' }));
  }
  const articles = screen.getAllByRole('article');
  expect(articles).toHaveLength(speakingData.length);
  expect(within(archive).getAllByRole('article')).toHaveLength(23);
  for (const talk of speakingData) {
    const group = talk.imageType === 'photo' ? selected : archive;
    expect(within(group).getAllByRole('article').some(article => article.textContent.includes(talk.conference) && article.textContent.includes(talk.title))).toBe(true);
    expect(articles.some(article => article.textContent.includes(talk.title) && article.textContent.includes(talk.conference) && article.textContent.includes(talk.description))).toBe(true);
  }
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
});

test('combines year and format filters and recovers from an empty result', () => {
  const archive = openPage();
  fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2023' } });
  fireEvent.change(screen.getByLabelText('Format'), { target: { value: 'podcast' } });
  expect(within(archive).queryAllByRole('article')).toHaveLength(0);
  expect(screen.getByText(/No appearances match/)).toBeVisible();
  fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2025' } });
  expect(within(archive).getAllByRole('article')).toHaveLength(speakingData.filter(talk => talk.type === 'podcast' && talk.date.includes('2025')).length);
  expect(screen.queryByText(/No appearances match/)).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Year'), { target: { value: 'all' } });
  fireEvent.change(screen.getByLabelText('Format'), { target: { value: 'all' } });
  expect(within(archive).getAllByRole('article')).toHaveLength(12);
});

test('keeps event context visible if a featured photograph fails to load', () => {
  openPage();
  fireEvent.error(screen.getByRole('img', { name: 'Sean Betts speaking at Apple Interactive Conference' }));
  expect(screen.queryByRole('img', { name: 'Sean Betts speaking at Apple Interactive Conference' })).not.toBeInTheDocument();
  expect(screen.getAllByText('Apple Interactive Conference')).toHaveLength(2);
});

test('featured descriptions support focus, Escape, tap toggling and outside dismissal', () => {
  openPage();
  const talk = speakingData.find(item => item.id === 'future-of-brands-2026');
  const button = screen.getByRole('button', { name: `About this talk: ${talk.title}` });
  const description = screen.getByText(talk.description);
  expect(description).not.toBeVisible();
  fireEvent.focus(button);
  expect(description).toBeVisible();
  expect(button).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(button, { key: 'Escape' });
  expect(description).not.toBeVisible();
  fireEvent.click(button);
  expect(description).toBeVisible();
  fireEvent.click(button);
  expect(description).not.toBeVisible();
  fireEvent.click(button);
  fireEvent.pointerDown(document.body);
  expect(description).not.toBeVisible();
});
