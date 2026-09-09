import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import GameBuilding from './GameBuilding';
import GameProject from './GameProject';
import projectsData from '../data/projectsData';

function renderProject(path = '/building/sidebar', state) {
  return render(<MemoryRouter initialEntries={[{ pathname: path, state }]}><Routes>
    <Route path="/building/:id" element={<GameProject />} />
    <Route path="/building" element={<GameBuilding />} />
    <Route path="/writing" element={<h1>Writing destination</h1>} />
    <Route path="/map" element={<h1>Map destination</h1>} />
  </Routes></MemoryRouter>);
}

test('project tabs reveal real features and technologies with keyboard navigation', () => {
  renderProject();
  expect(screen.getByRole('heading', { name: 'sideBar', level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  fireEvent.click(screen.getByRole('tab', { name: 'Features' }));
  expect(within(screen.getByRole('tabpanel')).getByText(projectsData[0].features[0])).toBeInTheDocument();
  fireEvent.keyDown(screen.getByRole('tab', { name: 'Features' }), { key: 'ArrowRight' });
  expect(screen.getByRole('tab', { name: 'Tech' })).toHaveFocus();
  expect(within(screen.getByRole('tabpanel')).getByText('FastAPI')).toBeInTheDocument();
  fireEvent.keyDown(screen.getByRole('tab', { name: 'Tech' }), { key: 'Home' });
  expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('img', { name: 'sideBar project screenshot' })).toHaveAttribute('src', '/images/projects/sidebar-welcome-ipad.png');
  expect(screen.getByRole('link', { name: /View project/ })).toHaveAttribute('href', 'https://trysidebar.ai');
});

test('project returns to its referring page and offers a separate map destination', () => {
  renderProject('/building/sidebar', { fromPath: '/writing', fromLabel: 'Writing' });
  expect(screen.getByRole('link', { name: /Back to map/i })).toHaveAttribute('href', '/map');
  fireEvent.click(screen.getByRole('link', { name: /Back to Writing/i }));
  expect(screen.getByRole('heading', { name: 'Writing destination' })).toBeInTheDocument();
});

test('unknown project offers a working recovery to all projects', () => {
  renderProject('/building/not-a-real-project');
  expect(screen.getByRole('heading', { name: 'Project not found' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: /Back to Building/i }));
  projectsData.forEach(project => expect(screen.getByRole('link', { name: new RegExp(`Open ${project.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} project`) })).toHaveAttribute('href', `/building/${project.id}`));
});

test('full narrative and technologies remain accessible for coding projects', () => {
  renderProject('/building/genai-marketing-benchmarks');
  const record = projectsData.find(project => project.id === 'genai-marketing-benchmarks');
  expect(screen.getByText(record.challenges)).toBeInTheDocument();
  expect(screen.getByText(record.futureImprovements)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('tab', { name: 'Tech' }));
  expect(screen.getByText('Flask')).toBeInTheDocument();
});

test('placeholder media uses workshop illustration and real video remains playable', () => {
  const view = renderProject('/building/genai-explorer');
  expect(view.container.querySelector('img[src$="xxx.jpg"]')).toBeNull();
  expect(screen.getByText('From the workshop')).toBeInTheDocument();
  view.unmount();
  renderProject('/building/ai-chat-experience');
  expect(screen.getByTitle('🐼 panda.ai demo')).toHaveAttribute('src', projectsData.find(project => project.id === 'ai-chat-experience').heroVideo);
});

test('Building retains its illustrated feature panel if the sideBar screenshot fails', () => {
  renderProject('/building');
  const screenshot = screen.getByRole('img', { name: 'sideBar welcome screen on iPad' });
  fireEvent.error(screenshot);
  expect(screen.queryByRole('img', { name: 'sideBar welcome screen on iPad' })).not.toBeInTheDocument();
  const feature = screen.getByRole('link', { name: 'Open sideBar project' });
  expect(feature.querySelector('img[src="/images/game/backgrounds/river-sunset.webp"]')).toBeInTheDocument();
});
