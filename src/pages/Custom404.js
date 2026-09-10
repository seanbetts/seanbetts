import ResponsiveImage from '../components/ResponsiveImage';
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_URL } from '../data/siteIdentity';
import styles from './Custom404.module.css';

export default function Custom404() {
  const main = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.classList.add('busted-mode');
    return () => document.body.classList.remove('busted-mode');
  }, []);

  useEffect(() => {
    window.scrollTo?.(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  return <main ref={main} tabIndex={-1} className={styles.scene} aria-label="Page not found">
    <Seo
      title="404: Busted | Sean Betts"
      description="This page could not be found. Return to Sean Betts' site and keep exploring AI strategy, transformation and product innovation."
      keywords={['Sean Betts', '404', 'page not found']}
      canonicalPath="/404"
      imagePath="/images/sean-betts-profile.png"
      ogType="website"
      twitterCard="summary"
      noindex
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '404: Busted - Sean Betts',
        description: 'Page not found. Return to Sean Betts’ website.',
        url: `${SITE_URL}/404`,
      }}
    />
    <ResponsiveImage sizes="100vw" className={styles.art} src="/images/game/404/motorbike.png" alt="" fetchpriority="high" />
    <div className={styles.shade} aria-hidden="true" />
    <div className={styles.verdict}>
      <h1 className={styles.title}><ResponsiveImage className={styles.wordmark} src="/images/game/404/busted.svg" alt="Busted" /></h1>
      <p className={styles.reason}>404 — Page not found.</p>
    </div>
    <nav className={styles.actions} aria-label="Recovery">
      <Link className={styles.home} to="/">Return home <span aria-hidden="true">↵</span></Link>
    </nav>
  </main>;
}
