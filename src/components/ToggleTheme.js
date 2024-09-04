// src/components/ToggleTheme.js
import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Sun, Moon } from "@phosphor-icons/react";
import styles from './ToggleTheme.module.css';

const ToggleTheme = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button onClick={toggleDarkMode} className={styles.toggleButton}>
      {darkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ToggleTheme;