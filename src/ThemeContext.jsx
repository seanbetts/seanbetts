import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Match the static HTML on the first render, then restore the visitor's choice.
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) setDarkMode(saved === 'true');
    } catch { /* Storage is optional. */ }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    try { localStorage.setItem('darkMode', String(next)); } catch { /* Keep the toggle usable when storage is unavailable. */ }
  };

  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>;
};
