import fs from 'fs';
import path from 'path';
import projectsData from './projectsData';

test('project hero images point to real local assets when supplied', () => {
  const missing = projectsData.filter(project => project.heroImage &&
    !fs.existsSync(path.join(__dirname, '../../public', project.heroImage)));
  expect(missing.map(project => project.id)).toEqual([]);
});

test('projects data module loads project definitions without React warnings', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  let projectsData;

  jest.isolateModules(() => {
    projectsData = require('./projectsData').default;
  });

  expect(projectsData.length).toBeGreaterThan(0);
  expect(projectsData[0].id).toBe('sidebar');
  expect(consoleErrorSpy).not.toHaveBeenCalled();

  consoleErrorSpy.mockRestore();
});
