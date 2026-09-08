import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    try { localStorage.setItem('darkMode', String(next)); } catch { /* Keep the toggle usable when storage is unavailable. */ }
  };

  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>;
};
