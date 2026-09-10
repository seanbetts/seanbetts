import projects from './projectsData';

// Page names serve the sitemap/AI index; navigation labels and order serve the menu.
export const sitePages = [
  { path: '/', name: 'Sean Betts', key: 'home', label: 'Home', menuOrder: 0 },
  { path: '/about', name: 'About Sean Betts', key: 'about', label: 'About', menuOrder: 5 },
  { path: '/building', name: 'Building', key: 'building', label: 'Building', menuOrder: 1 },
  { path: '/writing', name: 'Writing', key: 'writing', label: 'Writing', menuOrder: 2 },
  { path: '/speaking', name: 'Speaking', key: 'speaking', label: 'Speaking', menuOrder: 3 },
  { path: '/thought-leadership', name: 'Thought leadership', key: 'thoughtLeadership', label: 'Thought leadership', menuOrder: 4 },
  { path: '/contact', name: 'Contact', key: 'contact', label: 'Contact', menuOrder: 6 },
];
export const navigationLinks = [...sitePages].sort((a, b) => a.menuOrder - b.menuOrder);
export const siteRoutes = [
  ...sitePages.map(({ path, name }) => ({ path, name })),
  ...projects.map(project => ({ path: `/building/${project.id}`, name: project.name })),
];
