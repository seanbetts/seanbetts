import fs from 'fs';
import path from 'path';
import projectsData from './projectsData';

test('project hero images point to real local assets when supplied', () => {
  const missing = projectsData.flatMap(project => [project.heroImage, ...(project.heroGallery || []).map(image => image.src), ...(project.heroAnimations || []).flatMap(image => [image.src, image.poster])]
    .filter(src => src && !fs.existsSync(path.join(__dirname, '../../public', src))));
  expect(missing).toEqual([]);
});

test('projects data module loads project definitions without React warnings', async () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.resetModules();
  const { default: projectsData } = await import('./projectsData');

  expect(projectsData.length).toBeGreaterThan(0);
  expect(projectsData[0].id).toBe('sidebar');
  expect(consoleErrorSpy).not.toHaveBeenCalled();

  consoleErrorSpy.mockRestore();
});
