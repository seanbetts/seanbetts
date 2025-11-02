// src/pages/Home.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Laptop, Robot, Brain, Microphone, FolderOpen, Article, User } from "@phosphor-icons/react";
import styles from './Home.module.css';
import profileImage from '../assets/sean-betts-profile.png';

const Home = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sean Betts",
    "url": "https://www.seanbetts.com",
    "description": "Sean Betts: AI Researcher, Marketing Technology Leader, and Neurodiversity Advocate",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.seanbetts.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sean Betts",
    "jobTitle": "Chief AI & Innovation Officer",
    "description": "AI Researcher & Developer, Neurodiversity Advocate",
    "url": "https://www.seanbetts.com",
    "sameAs": [
      "https://www.linkedin.com/in/seanbetts/",
      "https://github.com/seanbetts",
      "https://twitter.com/seanbetts",
      "https://bsky.app/profile/seanbetts.com"
    ]
  };

  return (
    <div className={styles.home}>
      <Helmet>
        <title>Sean Betts - AI Innovation in Marketing and Technology</title>
        <link rel="canonical" href="https://www.seanbetts.com/" />
        <meta name="description" content="Sean Betts: Chief AI & Innovation Officer, AI Researcher & Developer, and Neurodiversity Advocate. Explore AI-driven innovation in marketing and technology." />
        <meta name="keywords" content="Sean Betts, AI, marketing, technology, neurodiversity, product leadership" />
        <meta property="og:site_name" content="Sean Betts" />
        <meta property="og:url" content="https://www.seanbetts.com/" />
        <meta property="og:title" content="Sean Betts - AI Innovation in Marketing and Technology" />
        <meta property="og:description" content="Explore Sean Betts' work in AI-driven innovation, marketing technology, and neurodiversity advocacy." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/sean-betts-profile.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@seanbetts" />
        <meta name="twitter:title" content="Sean Betts - AI Innovation in Marketing and Technology" />
        <meta name="twitter:description" content="Explore Sean Betts' work in AI-driven innovation, marketing technology, and neurodiversity advocacy." />
        <meta name="twitter:image" content="/images/sean-betts-profile.png" />
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      <section className={styles.hero}>
        <img src={profileImage} alt="Sean Betts" className={styles.profileImage} />
        <div className={styles.heroContent}>
          <h1>Sean Betts</h1>
          <p className={styles.summary}>
            <span><Laptop size={20} /> Chief AI & Innovation Officer</span>
            <span><Robot size={20} /> AI Researcher & Developer</span>
            <span><Brain size={20} /> Autistic Thought Leader</span>
            <span><Microphone size={20} /> Neurodiversity & Mental Health Speaker</span>
          </p>
        </div>
      </section>
      
      <section className={styles.intro}>
        <p>
        As a visionary product and technology leader with over 20 years of experience in marketing, 
        I'm now focussing my career on AI-driven innovation at the intersection of technology and business.
        </p>
        <p>
        My role as an independent AI researcher and developer complements my position as Chief AI & Innovation Officer 
        at Omnicom Media Group UK, where I'm committed to driving responsible AI development and its practical application in marketing.
        </p>
      </section>
      
      <div className={styles.sections}>
        <Link to="/building" className={styles.section}>
          <FolderOpen size={48} />
          <h2>Building</h2>
          <p>Explore what I'm building in AI and marketing</p>
        </Link>
        
        <Link to="/writing" className={styles.section}>
          <Article size={48} />
          <h2>Writing</h2>
          <p>Read my latest thoughts and articles</p>
        </Link>

        <Link to="/speaking" className={styles.section}>
          <Microphone size={48} />
          <h2>Speaking</h2>
          <p>View my keynotes and conference talks</p>
        </Link>

        <Link to="/about" className={styles.section}>
          <User size={48} />
          <h2>About</h2>
          <p>Learn more about my experience and contributions</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;