import projects from './projectsData';
export const siteRoutes = [
  { path: '/', name: 'Sean Betts' },
  { path: '/about', name: 'About Sean Betts' },
  { path: '/building', name: 'Building' },
  { path: '/writing', name: 'Writing' },
  { path: '/speaking', name: 'Speaking' },
  { path: '/thought-leadership', name: 'Thought leadership' },
  { path: '/contact', name: 'Contact' },
  ...projects.map(project => ({ path: `/building/${project.id}`, name: project.name })),
];
