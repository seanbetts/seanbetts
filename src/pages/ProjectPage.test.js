import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectPage from './ProjectPage';
import projectsData from '../data/projectsData';

test('shows a back link for the referring page when navigation state is present', () => {
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: '/building/sidebar',
          state: { fromLabel: 'About', fromPath: '/about' }
        }
      ]}
    >
      <Routes>
        <Route path="/building/:id" element={<ProjectPage projects={projectsData} />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: /back to about/i })).toHaveAttribute('href', '/about');
});
