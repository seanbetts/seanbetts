import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Helmet } from 'react-helmet';
import { SiteRoutes } from './App';
import { ThemeProvider } from './ThemeContext';
export { siteRoutes } from './data/siteRoutes';
export { default as speakingData } from './data/speakingData';
export { SITE_URL, SOCIAL_URLS, pageUrl } from './data/siteIdentity';

export function renderPage(path) {
  const content = renderToString(<ThemeProvider><StaticRouter location={path}><SiteRoutes /></StaticRouter></ThemeProvider>);
  const head = Helmet.renderStatic();
  return { content, head: head.title.toString() + head.meta.toString() + head.link.toString() + head.script.toString() };
}
