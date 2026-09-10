import imageExports from '../generated/images.json';
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
  </Routes></MemoryRouter>);
}

test('nAnimals shows six original artworks and recovers to project artwork if an image fails', () => {
  renderProject('/building/nanimals');
  const gallery = screen.getByRole('group', { name: 'nAnimals artwork' });
  const images = within(gallery).getAllByRole('img');
  expect(images).toHaveLength(6);
  images.forEach(image => expect(image).toHaveAttribute('alt', expect.stringMatching(/.+/)));
  fireEvent.error(images[0]);
  expect(screen.queryByRole('group', { name: 'nAnimals artwork' })).not.toBeInTheDocument();
  expect(screen.getByText('nAnimals', { selector: 'strong' })).toBeInTheDocument();
});

test('Pixel Loader Lab can pause its original animations', () => {
  renderProject('/building/pixel-loader-lab');
  const animation = screen.getByRole('img', { name: 'Original bordered pixel loader animation' });
  expect(animation).toHaveAttribute('src', '/images/projects/pixel-loader-bordered.gif');
  expect(animation.closest('picture').querySelector('source')).toHaveAttribute('media', '(prefers-reduced-motion: reduce)');
  fireEvent.click(screen.getByRole('button', { name: 'Pause animation' }));
  expect(animation).toHaveAttribute('src', '/images/projects/pixel-loader-bordered-still.png');
  fireEvent.click(screen.getByRole('button', { name: 'Play animation' }));
  expect(animation).toHaveAttribute('src', '/images/projects/pixel-loader-bordered.gif');
});

test('research graphics are not linked and retain an image failure fallback', () => {
  renderProject('/building/llm-search-analysis');
  const graphic = screen.getByRole('img', { name: /Recorded GPT-5.1 interaction/ });
  expect(graphic.closest('a')).toBeNull();
  expect(screen.queryByText('View graphic full size')).not.toBeInTheDocument();
  fireEvent.error(graphic);
  expect(screen.queryByRole('link', { name: /View graphic full size/ })).not.toBeInTheDocument();
  expect(screen.getByText('LLM Search Analysis', { selector: 'strong' })).toBeInTheDocument();
});

test.each(projectsData)('$name exposes its story, features and technologies without tabs', project => {
  renderProject(`/building/${project.id}`);
  expect(screen.getByRole('heading', { name: project.name, level: 1 })).toBeInTheDocument();
  expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  project.features.forEach(feature => expect(screen.getByText(feature)).toBeVisible());
  expect(screen.getByText(project.challenges)).toBeVisible();
  if (project.learnings) {
    expect(screen.getByRole('heading', { name: 'What I learned' })).toBeVisible();
    expect(screen.getByText(project.learnings)).toBeVisible();
  } else {
    expect(screen.queryByRole('heading', { name: 'What I learned' })).not.toBeInTheDocument();
  }
  project.technologies?.forEach(technology => expect(within(screen.getByRole('region', { name: /Built with|Tools & methods/ })).getByText(technology)).toBeVisible());
  if (project.url) expect(screen.getByRole('link', { name: /Visit project|View on GitHub/ })).toHaveAttribute('href', project.url);
  else expect(screen.queryByRole('link', { name: /Visit project|View on GitHub/ })).not.toBeInTheDocument();
});

test('a project without a public URL retains its story and navigation without an external CTA', () => {
  const project = projectsData.find(item => item.id === 'sidebar');
  const originalUrl = project.url;
  try {
    project.url = null;
    renderProject();
    expect(screen.getByRole('heading', { name: 'sideBar', level: 1 })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'What I learned' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Back to Building' })).toHaveAttribute('href', '/building/');
    expect(screen.queryByRole('link', { name: /Visit project|View on GitHub/ })).not.toBeInTheDocument();
  } finally {
    project.url = originalUrl;
  }
});

test('sideBar screenshot recovers to illustrated project artwork on failure', () => {
  renderProject();
  const screenshot = screen.getByRole('img', { name: 'sideBar on iPad with a note created by the assistant beside the conversation' });
  expect(imageExports['/images/projects/sidebar-notes-ipad.png'].variants.map(image => image.src)).toContain(screenshot.getAttribute('src'));
  expect(screenshot).toHaveAttribute('srcset');
  fireEvent.error(screenshot);
  expect(screen.queryByRole('img', { name: 'sideBar on iPad with a note created by the assistant beside the conversation' })).not.toBeInTheDocument();
  expect(screen.getByText('sideBar', { selector: 'strong' })).toBeInTheDocument();
});

test('project returns to its referring page without duplicate footer navigation', () => {
  renderProject('/building/sidebar', { fromPath: '/writing', fromLabel: 'Writing' });
  expect(screen.queryByRole('link', { name: 'All projects' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: /Back to Writing/i }));
  expect(screen.getByRole('heading', { name: 'Writing destination' })).toBeInTheDocument();
});

test('full narrative and technologies remain accessible for coding projects', () => {
  renderProject('/building/genai-marketing-benchmarks');
  const record = projectsData.find(project => project.id === 'genai-marketing-benchmarks');
  expect(screen.getByText(record.challenges)).toBeInTheDocument();
  expect(screen.getByText(record.learnings)).toBeInTheDocument();
  expect(screen.getByText('Flask')).toBeInTheDocument();
});

test('real video remains playable', () => {
  renderProject('/building/ai-chat-experience');
  expect(screen.queryByTitle('🐼 panda.ai demo')).not.toBeInTheDocument();
  const preview = screen.getByRole('link', { name: 'Play 🐼 panda.ai demo' });
  expect(preview).toHaveAttribute('href', projectsData.find(project => project.id === 'ai-chat-experience').heroVideo);
  fireEvent.click(preview, { ctrlKey: true });
  expect(screen.queryByTitle('🐼 panda.ai demo')).not.toBeInTheDocument();
  fireEvent.click(preview);
  expect(screen.getByTitle('🐼 panda.ai demo')).toHaveAttribute('src', projectsData.find(project => project.id === 'ai-chat-experience').heroVideo);
});

test('Building retains its illustrated feature panel if the sideBar screenshot fails', () => {
  renderProject('/building');
  const screenshot = screen.getByRole('img', { name: 'sideBar on iPad with a note created by the assistant beside the conversation' });
  fireEvent.error(screenshot);
  expect(screen.queryByRole('img', { name: 'sideBar on iPad with a note created by the assistant beside the conversation' })).not.toBeInTheDocument();
  const feature = screen.getByRole('link', { name: 'Open sideBar project' });
  const background = feature.querySelector('img');
  expect(background).toBeInTheDocument();
  expect(imageExports['/images/game/backgrounds/river-sunset.webp'].variants.map(image => image.src)).toContain(background.getAttribute('src'));
});


test('Explorer shows its real comparison screenshot and dataset date beside the project link', () => {
  renderProject('/building/genai-explorer');
  const screenshot = screen.getByRole('img', { name: /Generative AI Explorer comparing/ });
  expect(screenshot).toHaveAttribute('srcset');
  expect(screen.getByText('Published version uses an August 2025 dataset.')).toBeVisible();
  expect(screen.getByRole('link', { name: /Visit project/i })).toHaveAttribute('href', 'https://explorer.the-blueprint.ai/');
});
