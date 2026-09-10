import { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Butterfly, ChatsCircle, GithubLogo, Heart, LinkedinLogo, List, Moon, Newspaper, Sun, X } from '@phosphor-icons/react';
import styles from './GameShell.module.css';
import packageJson from '../../package.json';
import './game.css';
import { ThemeContext } from '../ThemeContext';
import MadeWith from '../components/MadeWith';

const links = [['/', 'Home'], ['/building', 'Building'], ['/writing', 'Writing'], ['/speaking', 'Speaking'], ['/thought-leadership', 'Thought leadership'], ['/about', 'About'], ['/contact', 'Contact']];

export default function GameShell({ children }) {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const menu = useRef(null);
  const main = useRef(null);
  const { pathname } = useLocation();
  const lastPath = useRef(pathname);

  const closeNavigation = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setOpen(false);
    if (event.currentTarget.pathname === pathname) main.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    document.body.classList.add('game-mode');
    return () => document.body.classList.remove('game-mode');
  }, []);

  useEffect(() => {
    setOpen(false);
    if (lastPath.current !== pathname) {
      window.scrollTo?.(0, 0);
      main.current?.focus({ preventScroll: true });
      lastPath.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const outside = (event) => {
      if (!menu.current?.contains(event.target) && !trigger.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', dismiss);
      document.removeEventListener('pointerdown', outside);
    };
  }, [open]);

  return <div className={`game ${darkMode ? 'game-dark' : 'game-light'}`}>
    <a className={styles.skip} href="#game-content">Skip to content</a>
    <header className={styles.header} data-nojs-header>
      <div className={styles.brandGroup}>
        <Link to="/" onClick={closeNavigation} className={styles.brand} aria-label="Sean Betts home">
          <img src="/images/game/sean-betts-inline.svg" alt="Sean Betts" width="132" height="28" />
        </Link>
        <span className={styles.version}>v{packageJson.version}</span>
      </div>
      <div className={styles.tools}>
        <Link to="/contact" onClick={closeNavigation} className={styles.tool} aria-label="Contact" title="Contact"><ChatsCircle size={23} weight="bold" aria-hidden="true" /></Link>
        <div className={styles.controls} data-js-only>
          <button className={styles.menuButton} onClick={toggleDarkMode} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {darkMode ? <Sun size={23} weight="bold" aria-hidden="true" /> : <Moon size={23} weight="bold" aria-hidden="true" />}
          </button>
          <button ref={trigger} className={styles.menuButton} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="game-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>
            {open ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
          </button>
        </div>
      </div>
      <nav hidden={!open} data-nojs-nav ref={menu} id="game-navigation" className={styles.menu} aria-label="Primary navigation">
        {links.map(([to, label]) => <NavLink key={to} to={to} onClick={closeNavigation} end className={({ isActive }) => isActive ? styles.selected : undefined}>{label}<ArrowUpRight size={21} weight="bold" /></NavLink>)}
      </nav>
    </header>
    <main id="game-content" ref={main} tabIndex={-1} className={styles.main} key={pathname}>{children}</main>
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} Sean Betts</span>
      <MadeWith className={styles.credit} heart={<Heart size={14} weight="bold" className={styles.heart} aria-hidden="true" />} />
      <div className={styles.socials}>
        <a href="https://www.linkedin.com/in/seanbetts/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><LinkedinLogo size={23} weight="bold" aria-hidden="true" /></a>
        <a href="https://github.com/seanbetts" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><GithubLogo size={23} weight="bold" aria-hidden="true" /></a>
        <a href="https://bsky.app/profile/seanbetts.com" target="_blank" rel="noreferrer" aria-label="Bluesky" title="Bluesky"><Butterfly size={23} weight="bold" aria-hidden="true" /></a>
        <a href="https://www.the-blueprint.ai" target="_blank" rel="noreferrer" aria-label="The Blueprint" title="The Blueprint"><Newspaper size={23} weight="bold" aria-hidden="true" /></a>
      </div>
    </footer>
  </div>;
}
