// src/pages/Custom404.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Robot, 
  MagnifyingGlass, 
  Question, 
  Warning, 
  Brain,
  Bandaids,
  Lightning, 
  Bug, 
  ArrowSquareLeft
} from "@phosphor-icons/react";
import styles from './Custom404.module.css';

const Custom404 = () => {
  const notFoundSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "404: AI Malfunction - Sean Betts",
    "description": "Oops! Our AI has wandered off. Explore this playful 404 page on Sean Betts' website, blending humor with AI concepts.",
    "url": "https://www.seanbetts.com/404"
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>404: AI Malfunction - Sean Betts</title>
        <link rel="canonical" href="https://www.seanbetts.com/404" />
        <meta name="description" content="Oops! Our AI has wandered off. Explore this playful 404 page on Sean Betts' website, blending humor with AI concepts." />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:site_name" content="Sean Betts" />
        <meta property="og:url" content="https://www.seanbetts.com/404" />
        <meta property="og:title" content="404: AI Malfunction - Sean Betts" />
        <meta property="og:description" content="Discover a unique 404 page where AI meets humor. Our digital explorer is momentarily lost in the vast web universe." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/sean-betts-profile.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@seanbetts" />
        <meta name="twitter:title" content="404: AI Malfunction - Sean Betts" />
        <meta name="twitter:description" content="Discover a unique 404 page where AI meets humor. Our digital explorer is momentarily lost in the vast web universe." />
        <meta name="twitter:image" content="/images/sean-betts-profile.png" />
        <script type="application/ld+json">
          {JSON.stringify(notFoundSchema)}
        </script>
      </Helmet>

      <div className={styles.heroIcon}>
        <Bandaids size={180} weight="thin" />
      </div>
      <h1 className={styles.title}>
        <Robot size={48} className={styles.titleIcon} />
        404: AI Malfunction
      </h1>
      <p className={styles.message}>
        Oops! It seems our AI has wandered off into uncharted digital territory.
      </p>
      <div className={styles.iconLine}>
        <MagnifyingGlass size={24} className={styles.icon} />
        <Question size={24} className={styles.icon} />
        <Warning size={24} className={styles.icon} />
        <Brain size={24} className={styles.icon} />
        <Lightning size={24} className={styles.icon} />
        <Bug size={24} className={styles.icon} />
      </div>
      <p className={styles.explanation}>
        Our advanced AI is currently:
      </p>
      <ul className={styles.list}>
        <li><MagnifyingGlass size={20} /> Searching for the missing page in parallel universes</li>
        <li><Brain size={20} /> Contemplating the nature of its own existence</li>
        <li><Lightning size={20} /> Attempting to generate the requested content from scratch</li>
        <li><Bug size={20} /> Debugging its own consciousness</li>
      </ul>
      <p className={styles.apology}>
        We apologize for the inconvenience.
      </p>
      <Link to="/" className={styles.homeLink}>
        <ArrowSquareLeft size={24} /> Return to Known Reality
      </Link>
    </div>
  );
};

export default Custom404;