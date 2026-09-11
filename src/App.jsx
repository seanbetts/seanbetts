// src/App.js
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes, useLocation } from 'react-router';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import About from './pages/About';
import Writing from './pages/Writing';
import Speaking from './pages/Speaking';
import Contact from './pages/Contact';
import Custom404 from './pages/Custom404';
import GameShell from './game/GameShell';
import GameHome from './game/GameHome';
import GameBuilding from './game/GameBuilding';
import GameProject from './game/GameProject';
import ThoughtLeadership from './game/ThoughtLeadership';
import { siteRoutes, sitePages } from './data/siteRoutes';

const pages = { home: GameHome, about: About, building: GameBuilding, writing: Writing,
  speaking: Speaking, thoughtLeadership: ThoughtLeadership, contact: Contact };

export function SiteRoutes() {
  const { pathname } = useLocation();
  const normalized = pathname.replace(/\/$/, '').toLowerCase() || '/';
  if (!siteRoutes.some(route => route.path === normalized) && normalized !== '/map') return <Custom404 />;
  // Route-owned layouts leave the 404 free to fill the viewport.
  return <Routes>
    <Route element={<GameShell><Outlet /></GameShell>}>
      {sitePages.map(({ path, key }) => {
        const Page = pages[key];
        return <Route key={path} path={path} element={<Page />} />;
      })}
      <Route path="/map" element={<Navigate to="/" replace />} />
      <Route path="/building/:id" element={<GameProject />} />
    </Route>
    <Route path="*" element={<Custom404 />} />
  </Routes>;
}

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  return (
    <Router>
      <SiteRoutes />
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
