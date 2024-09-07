// src/pages/Home.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Laptop, Robot, Brain, Microphone, FolderOpen, Article, User } from "@phosphor-icons/react";
import styles from './Home.module.css';
import profileImage from '../assets/sean-betts-profile.png';

const Home = () => {
  return (
    <div className={styles.home}>
      <Helmet>
        <title>Sean Betts - AI Innovation in Marketing and Technology</title>
        <meta name="description" content="Sean Betts: Chief Product & Technology Officer, AI Researcher & Developer, and Neurodiversity Advocate. Explore AI-driven innovation in marketing and technology." />
        <meta name="keywords" content="Sean Betts, AI, marketing, technology, neurodiversity, product leadership" />
        <meta property="og:title" content="Sean Betts - AI Innovation in Marketing and Technology" />
        <meta property="og:description" content="Explore Sean Betts' work in AI-driven innovation, marketing technology, and neurodiversity advocacy." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://github.com/seanbetts/seanbetts/blob/afbf46d811138cec479b66d741aab0a9e23bbdd5/public/images/sean-betts-profile.png" />
      </Helmet>

      <section className={styles.hero}>
        <img src={profileImage} alt="Sean Betts" className={styles.profileImage} />
        <div className={styles.heroContent}>
          <h1>Sean Betts</h1>
          <p className={styles.summary}>
            <span><Laptop size={20} /> Chief Product & Technology Officer</span>
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
        My role as an independent AI researcher and developer complements my position as Chief Product & Technology Officer 
        at Omnicom Media Group UK, where I'm committed to driving responsible AI development and its practical application in marketing.
        </p>
      </section>
      
      <div className={styles.sections}>
        <Link to="/projects" className={styles.section}>
          <FolderOpen size={48} />
          <h2>Projects</h2>
          <p>Explore my AI and marketing projects</p>
        </Link>
        
        <Link to="/blog" className={styles.section}>
          <Article size={48} />
          <h2>Writing</h2>
          <p>Read my latest thoughts and articles</p>
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