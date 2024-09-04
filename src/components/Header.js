// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { House, User, FolderOpen, Article, EnvelopeSimple } from "@phosphor-icons/react";
import ToggleTheme from './ToggleTheme';
import styles from './Header.module.css';
import profileImage from '../assets/sean-betts-profile.png'; // Make sure this path is correct
import packageJson from '../../package.json'; // Import package.json

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoLink}>
            <img src={profileImage} alt="Sean Betts" className={styles.logo} />
          </Link>
          <span className={styles.versionNumber}>v{packageJson.version}</span>
        </div>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link to="/" className={styles.navLink}><House size={24} /> Home</Link></li>
          <li className={styles.navItem}><Link to="/projects" className={styles.navLink}><FolderOpen size={24} /> Projects</Link></li>
          <li className={styles.navItem}><Link to="/writing" className={styles.navLink}><Article size={24} /> Writing</Link></li>
          <li className={styles.navItem}><Link to="/about" className={styles.navLink}><User size={24} /> About</Link></li>
          <li className={styles.navItem}><Link to="/contact" className={styles.navLink}><EnvelopeSimple size={24} /> Contact</Link></li>
        </ul>
        <div className={styles.themeToggle}>
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
};

export default Header;