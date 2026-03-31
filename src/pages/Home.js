// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Robot, Brain, Microphone, FolderOpen, Article, User } from "@phosphor-icons/react";
import Seo from '../components/Seo';
import styles from './Home.module.css';
import profileImage from '../assets/sean-betts-profile.png';
import brandLogos from '../data/brandLogos';

const Home = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sean Betts",
    "url": "https://www.seanbetts.com",
    "description": "Sean Betts: Chief AI & Innovation Officer, AI researcher and builder focused on AI strategy, product innovation and business transformation.",
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
      <Seo
        title="Sean Betts | AI Strategy, Transformation & Product Innovation"
        description="Sean Betts is Chief AI & Innovation Officer at Omnicom Media Group UK, an independent AI researcher and builder focused on AI strategy, product innovation and business transformation."
        keywords={[
          'Sean Betts',
          'AI strategy',
          'product innovation',
          'business transformation',
          'marketing technology',
          'generative AI',
          'Omnicom Media Group UK'
        ]}
        canonicalPath="/"
        imagePath="/images/sean-betts-profile.png"
        ogType="website"
        jsonLd={[websiteSchema, personSchema]}
      />

      <section className={styles.hero}>
        <img src={profileImage} alt="Sean Betts" className={styles.profileImage} />
        <div className={styles.heroContent}>
          <h1>Sean Betts</h1>
          <p className={styles.summary}>
            <span><Laptop size={20} /> Chief AI & Innovation Officer</span>
            <span><Robot size={20} /> Hands-On AI Leader</span>
            <span><Brain size={20} /> AI Strategy, Transformation & Product Innovation</span>
            <span><Microphone size={20} /> Autistic Neurodiversity & Mental Health Speaker</span>
          </p>
        </div>
      </section>
      
      <section className={styles.intro}>
        <p>
        I’m a hands-on AI leader, researcher and builder working at the intersection of AI, product innovation and business transformation.
        </p>
        <p>
        Alongside my role as Chief AI & Innovation Officer at Omnicom Media UK, I design and build independent AI products, benchmarks
        and applied systems to better understand how emerging technologies will reshape platforms, knowledge work and consumer experiences.
        </p>
      </section>

      <section className={styles.brandProof} aria-labelledby="brand-proof-heading">
        <h2 id="brand-proof-heading">Brands I&apos;ve Delivered AI Thought Leadership To</h2>
        <p className={styles.brandProofSummary}>
          Providing strategic perspectives to global brands on how AI is rewiring discovery, consumer behaviour, and digital marketing strategies.
        </p>

        {brandLogos.length > 0 ? (
          <ul className={styles.logoGrid} aria-label="Global brand logos">
            {brandLogos.map(({ name, src, width }) => (
              <li key={name}>
                <figure
                  className={styles.logoTile}
                  tabIndex="0"
                  aria-label={name}
                >
                  <img
                    src={src}
                    alt={`${name} logo`}
                    className={styles.logoImage}
                    style={width ? { maxWidth: `${width}px` } : undefined}
                  />
                  <figcaption className={styles.logoTooltip}>{name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : null}
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
          <p>View my keynotes, panels, talks, and podcasts</p>
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
