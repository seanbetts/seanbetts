// src/components/Footer.js
import React from 'react';
import { LinkedinLogo, GithubLogo, Butterfly, Newspaper } from "@phosphor-icons/react";
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <a href="https://linkedin.com/in/seanbetts/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn Profile">
          <LinkedinLogo size={36} />
        </a>
        <a href="https://github.com/seanbetts/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub Profile">
          <GithubLogo size={36} />
        </a>
        <a href="https://bsky.app/profile/seanbetts.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Bluesky Profile">
          <Butterfly size={36} />
        </a>
        <a href="https://www.the-blueprint.ai" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="The Blueprint Blog">
          <Newspaper size={36} />
        </a>
      </div>
      <p className={styles.copyright}>&copy; {new Date().getFullYear()} Sean Betts. All rights reserved.</p>
    </footer>
  );
};

export default Footer;