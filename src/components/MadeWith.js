import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

export default function MadeWith({ className }) {
  const { darkMode } = useContext(ThemeContext);
  return <span className={className}>Made with <span role="img" aria-label="love">{darkMode ? '🩷' : '💜'}</span> and Codex</span>;
}
