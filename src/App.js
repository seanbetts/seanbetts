// src/App.js
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectPage from './pages/ProjectPage';
import Writing from './pages/Writing';
import Contact from './pages/Contact';
import ContactTest from './pages/ContactTest';
import Custom404 from './pages/Custom404';
import projectsData from './data/projectsData';

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectPage projects={projectsData} />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-test" element={<ContactTest />} />
          <Route path="*" element={<Custom404 />} />
        </Routes>
      </Layout>
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