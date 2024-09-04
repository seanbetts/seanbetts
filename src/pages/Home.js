// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Robot, Brain, Microphone, FolderOpen, Article, User } from "@phosphor-icons/react";
import styles from './Home.module.css';
import profileImage from '../assets/sean-betts-profile.png';

const Home = () => {
  return (
    <div className={styles.home}>
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
          Visionary technology leader with 20+ years in marketing, now driving innovation at the intersection of AI and business. 
          Specializing in responsible AI development and its application in marketing, I'm passionate about AI interpretability, 
          ethics, and unlocking AI's transformative potential across industries.
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