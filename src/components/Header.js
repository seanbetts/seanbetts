import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { House, User, FolderOpen, Article, EnvelopeSimple, List } from "@phosphor-icons/react";
import ToggleTheme from './ToggleTheme';
import styles from './Header.module.css';
import profileImage from '../assets/sean-betts-profile.png';
import packageJson from '../../package.json';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoLink}>
            <img src={profileImage} alt="Sean Betts" className={styles.logo} />
          </Link>
          <span className={styles.versionNumber}>v{packageJson.version}</span>
        </div>
        <button className={styles.hamburgerMenu} onClick={toggleMenu}>
          <List size={24} />
        </button>
        <ul className={`${styles.navList} ${isMenuOpen ? styles.open : ''}`}>
          <li className={styles.navItem}><Link to="/" className={styles.navLink} onClick={toggleMenu}><House size={24} /> Home</Link></li>
          <li className={styles.navItem}><Link to="/projects" className={styles.navLink} onClick={toggleMenu}><FolderOpen size={24} /> Projects</Link></li>
          <li className={styles.navItem}><Link to="/writing" className={styles.navLink} onClick={toggleMenu}><Article size={24} /> Writing</Link></li>
          <li className={styles.navItem}><Link to="/about" className={styles.navLink} onClick={toggleMenu}><User size={24} /> About</Link></li>
          <li className={styles.navItem}><Link to="/contact" className={styles.navLink} onClick={toggleMenu}><EnvelopeSimple size={24} /> Contact</Link></li>
        </ul>
        <div className={styles.themeToggle}>
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
};

export default Header;