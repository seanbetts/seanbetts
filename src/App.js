// src/App.js
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
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
import { siteRoutes } from './data/siteRoutes';

export function SiteRoutes() {
  const { pathname } = useLocation();
  const normalized = pathname.replace(/\/$/, '').toLowerCase() || '/';
  if (!siteRoutes.some(route => route.path === normalized) && normalized !== '/map') return <Custom404 />;
  // Route-owned layouts leave the 404 free to fill the viewport.
  return <Routes>
    <Route element={<GameShell><Outlet /></GameShell>}>
      <Route path="/" element={<GameHome />} />
      <Route path="/thought-leadership" element={<ThoughtLeadership />} />
      <Route path="/map" element={<Navigate to="/" replace />} />
      <Route path="/building" element={<GameBuilding />} />
      <Route path="/building/:id" element={<GameProject />} />
      <Route path="/about" element={<About />} />
      <Route path="/speaking" element={<Speaking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/writing" element={<Writing />} />
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
