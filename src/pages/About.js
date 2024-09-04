// src/pages/About.js
import React from 'react';
import { Briefcase, Robot, Megaphone } from "@phosphor-icons/react";
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <h1>About Sean Betts</h1>
      <p className={styles.intro}>
        I am a visionary product and technology leader with over 20 years of experience in marketing, 
        now focused on AI-driven innovation at the intersection of technology and business. As an independent 
        AI researcher and developer, I'm committed to driving responsible AI development and its practical 
        application in business.
      </p>
      
      <section className={styles.experience}>
        <h2><Briefcase size={24} /> Professional Experience</h2>
        <h3>Chief Product & Technology Officer @ Omnicom Media Group UK (2020 - Present)</h3>
        <ul>
          <li>Lead the group-wide product and technology strategy</li>
          <li>Spearhead OMG UK's Artificial Intelligence strategy</li>
          <li>Develop cutting-edge generative AI applications</li>
          <li>Establish data privacy & ethics practices</li>
          <li>Foster a culture of continuous learning in AI</li>
          <li>Lead a team of 150 professionals across various disciplines</li>
        </ul>
        
        <h3>Managing Director @ Annalect, OMG UK (2015 - 2020)</h3>
        <ul>
          <li>Led 75 people, with direct line management of seven senior team members</li>
          <li>Developed strategic vision for Annalect's products, services, and technology</li>
          <li>Delivered revenue growth for products and services</li>
        </ul>
      </section>
      
      <section className={styles.aiProjects}>
        <h2><Robot size={24} /> AI Research & Development</h2>
        <ul>
          <li>Developing benchmarks to assess marketing capabilities of LLMs</li>
          <li>Active participant in the Advertising Association's AI taskforce</li>
          <li>Key contributor to industry principles for generative AI in advertising</li>
          <li>Author of a weekly AI newsletter, "The Blueprint"</li>
          <li>Creator of a generative AI chatbot with memory capabilities</li>
        </ul>
      </section>
      
      <section className={styles.speaking}>
        <h2><Megaphone size={24} /> Speaking & Advocacy</h2>
        <p>
          As an advocate for neurodiversity and mental health awareness, I frequently speak about these topics. 
          My late-life autism diagnosis has given me a unique perspective on problem-solving and innovation in the AI space.
        </p>
      </section>
    </div>
  );
};

export default About;