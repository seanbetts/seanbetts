import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the current home page content', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /sean betts/i, level: 1 })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/autistic thought leader/i)
  ).toBeInTheDocument();
});
