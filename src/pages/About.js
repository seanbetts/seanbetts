import React from 'react';
import { Helmet } from 'react-helmet';
import { Briefcase, Robot, Megaphone, LinkedinLogo, GithubLogo, EnvelopeSimple } from "@phosphor-icons/react";
import styles from './About.module.css';
import profileImage from '../assets/sean-betts-profile.png';

const About = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sean Betts",
    "jobTitle": "Chief Product & Technology Officer",
    "description": "AI Researcher & Developer, Neurodiversity Advocate",
    "url": "https://www.seanbetts.com/about",
    "image": "https://www.seanbetts.com/images/sean-betts-profile.png",
    "sameAs": [
      "https://www.linkedin.com/in/seanbetts/",
      "https://github.com/seanbetts",
      "https://twitter.com/seanbetts",
      "https://bsky.app/profile/seanbetts.com"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Omnicom Media Group UK"
    }
  };

  return (
    <div className={styles.about}>
      <Helmet>
        <title>About Sean Betts - AI Researcher and Marketing Technology Leader</title>
        <link rel="canonical" href="https://www.seanbetts.com/about" />
        <meta name="description" content="Learn about Sean Betts: 20+ years in marketing, AI researcher, and neurodiversity advocate. Discover his work in responsible AI development and marketing innovation." />
        <meta name="keywords" content="Sean Betts, AI research, marketing technology, neurodiversity, OMG UK, professional experience" />
        <meta property="og:site_name" content="Sean Betts" />
        <meta property="og:url" content="https://www.seanbetts.com/about" />
        <meta property="og:title" content="About Sean Betts - AI Researcher and Marketing Technology Leader" />
        <meta property="og:description" content="Explore Sean Betts' journey in AI research, marketing technology leadership, and neurodiversity advocacy." />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="/images/sean-betts-profile.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@seanbetts" />
        <meta name="twitter:title" content="About Sean Betts - AI Researcher and Marketing Technology Leader" />
        <meta name="twitter:description" content="Explore Sean Betts' journey in AI research, marketing technology leadership, and neurodiversity advocacy." />
        <meta name="twitter:image" content="/images/sean-betts-profile.png" />
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      <h1>About</h1>
      <div className={styles.header}>
        <img src={profileImage} alt="Sean Betts" className={styles.profileImage} />
        <div className={styles.headerContent}>
          <section className={styles.intro}>
            <p>
              As a visionary product and technology leader with over 20 years of experience in marketing, 
              I'm now focussing my career on AI-driven innovation at the intersection of technology and business. 
              My role as an independent AI researcher and developer complements my position as Chief Product & 
              Technology Officer at Omnicom Media Group UK, where I'm committed to driving responsible AI 
              development and its practical application in marketing.
            </p>
            <p>
              My unique blend of marketing expertise and technological acumen allows me to bridge the gap 
              between AI's potential and its real-world applications. I'm passionate about transforming 
              complex AI concepts into practical solutions that enhance human capabilities rather than replace them.
            </p>
          </section>
        </div>
      </div>

      <hr className={styles.divider} />
      
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2><Briefcase size={36} /></h2>
          <h3>Professional Experience</h3>
          <a href="https://linkedin.com/in/seanbetts/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn Profile">
            <LinkedinLogo size={36} />
          </a>
        </div>
        <h4>Chief Product & Technology Officer @ OMG UK</h4>
        <p>
          In my role at OMG UK, I lead the group-wide product and technology strategy, overseeing a team 
          of 150 professionals across various disciplines. We're dedicated to developing and deploying 
          transformational products, advanced cloud technology, and innovative operational processes.
        </p>
        <p>
          Key responsibilities include:
        </p>
        <ul>
          <li>Spearheading OMG UK's Artificial Intelligence strategy</li>
          <li>Developing cutting-edge marketing applications</li>
          <li>Establishing our data privacy & ethics practices</li>
          <li>Fostering a culture of continuous learning & improvement</li>
        </ul>
        <p>
          My focus on AI education is enabling OMG UK to navigate the rapidly evolving technology landscape, 
          driving innovation, and setting new industry standards.
        </p>
      </section>

      <hr className={styles.divider} />
      
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2><Robot size={36} /></h2>
          <h3>AI Research & Development</h3>
          <a href="https://github.com/seanbetts/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub Profile">
            <GithubLogo size={36} />
          </a>
        </div>
        <p>
          As an independent AI researcher and developer, I'm actively engaged in several projects that 
          deepen my understanding of artificial intelligence and contribute to the field:
        </p>
        <ul>
          <li>Developing comprehensive benchmarks to assess marketing capabilities of LLMs, including a 
              database of 2,800+ multiple-choice questions across various marketing disciplines</li>
          <li>Exploring how we can develop important product features that will evolve generative AI chatbots into 
              more personalised digital companions</li>
          <li>Active participant in the Advertising Association's AI taskforce and key contributor to 
              industry principles for generative AI in advertising</li>
          <li>Author of a weekly AI newsletter, The Blueprint, focusing on AI developments and their 
              impact on society</li>
          <li>Creator of a proof-of-concept generative AI chatbot with memory capabilities, exploring 
              the potential of more personalized AI interactions in marketing contexts</li>
        </ul>
      </section>

      <hr className={styles.divider} />
      
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2><Megaphone size={36} /></h2>
          <h3>Speaking & Advocacy</h3>
          <a href="/contact" rel="noopener noreferrer" className={styles.socialLink} aria-label="Email">
            <EnvelopeSimple size={36} />
          </a>
        </div>
        <p>
          As an advocate for neurodiversity and mental health awareness, I frequently speak about these topics. 
          My late-life autism diagnosis has given me a unique perspective on problem-solving and innovation in the AI space.
        </p>
        <p>
          Since experiencing burnout followed by depression and anxiety in 2017, I've been openly sharing my 
          mental health experiences. I believe that by speaking about mental health and neurodiversity, we 
          encourage others to share their stories, which is the best way to break down stigma.
        </p>
        <p>
          My autism diagnosis in 2022 has further enriched my advocacy work, allowing me to share insights 
          on both mental health and autistic experiences.
        </p>
      </section>
    </div>
  );
};

export default About;