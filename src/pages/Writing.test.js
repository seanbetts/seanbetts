import { render, screen, waitFor } from '@testing-library/react';
import Writing from './Writing';
import fetchUrlMetadata from '../utils/fetchUrlMetadata';

jest.mock('../utils/fetchUrlMetadata');
jest.mock('../data/articlesData', () => [
  {
    title: 'Example Article',
    url: 'https://example.com/article'
  }
]);

test('shows a fallback preview state when article metadata is unavailable', async () => {
  fetchUrlMetadata.mockResolvedValue(null);

  render(<Writing />);

  await waitFor(() => {
    expect(fetchUrlMetadata).toHaveBeenCalledWith('https://example.com/article');
  });

  expect(screen.getByRole('heading', { name: /example article/i })).toBeInTheDocument();
  expect(await screen.findByText(/^Preview unavailable$/i, { selector: 'p' })).toBeInTheDocument();
  expect(screen.queryByText(/^loading\.\.\.$/i)).not.toBeInTheDocument();
});
