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
