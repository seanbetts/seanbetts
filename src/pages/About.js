import React from 'react';
import { Briefcase, Robot, Megaphone, LinkedinLogo, GithubLogo, EnvelopeSimple } from "@phosphor-icons/react";
import InternalLink from '../components/InternalLink';
import Seo from '../components/Seo';
import styles from './About.module.css';
import profileImage from '../assets/sean-betts-profile.png';

const About = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sean Betts",
    "jobTitle": "Chief AI & Innovation Officer",
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
      <Seo
        title="About Sean Betts | Chief AI & Innovation Officer, Researcher and Builder"
        description="Learn about Sean Betts, Chief AI & Innovation Officer at Omnicom Media Group UK, independent AI researcher and builder focused on AI strategy, product innovation and business transformation."
        keywords={[
          'Sean Betts',
          'AI strategy',
          'generative AI',
          'AI innovation',
          'product innovation',
          'business transformation',
          'Omnicom Media Group UK'
        ]}
        canonicalPath="/about"
        imagePath="/images/sean-betts-profile.png"
        ogType="profile"
        jsonLd={personSchema}
      />

      <h1>About</h1>
      <div className={styles.header}>
        <img src={profileImage} alt="Sean Betts" className={styles.profileImage} />
        <div className={styles.headerContent}>
          <section className={styles.intro}>
            <p>
              I’m an AI leader, researcher and builder working at the intersection of AI, product innovation and business transformation.
            </p>
            <p>
              Alongside my role as Chief AI & Innovation Officer at Omnicom Media UK, I design and build independent AI products, benchmarks
              and applied systems to better understand how emerging technologies are reshaping products, knowledge work and consumer experiences.
            </p>
            <p>
              My work combines strategic leadership with hands-on technical exploration, from AI strategy and organisational transformation to
              prototyping, evaluation and product development. I’m particularly interested in turning complex advances in AI into practical tools,
              capabilities and ideas that create real value for people and organisations.
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
        <h4>Chief AI & Innovation Officer @ OM UK</h4>
        <p>
          At Omnicom Media UK, I lead AI strategy, innovation and transformation across the business, helping shape how our agencies, teams
          and clients respond to the rapid evolution of artificial intelligence.
        </p>
        <p>
          My role spans AI strategy and governance, client consultancy, capability building, product innovation and organisational change. I lead
          our AI Centre of Excellence, sit on the OM UK board and work closely with agency leadership, to identify where emerging AI capabilities
          can create real operational and commercial value.
        </p>
        <p>
          A key part of my role is translating fast-moving technical change into practical action. That includes advising client boards and internal
          teams on AI adoption, developing new use cases and solutions, building AI readiness across the organisation, and helping position OMG UK
          for a future increasingly shaped by AI.
        </p>
        <p>
          Areas of focus:
        </p>
        <ul>
          <li>Leading AI strategy and transformation across OM UK.</li>
          <li>Advising agencies and client boards on practical AI adoption and use cases.</li>
          <li>Building AI capability, readiness and learning programmes.</li>
          <li>Identifying emerging technologies and their commercial implications.</li>
          <li>Shaping board-level thinking on AI, innovation and business change.</li>
          <li>Supporting product and solution development across internal and client contexts.</li>
        </ul>
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
          As an independent AI researcher and developer, I build practical AI products, benchmarks and experiments to better understand the capabilities
          and limitations of emerging technologies.
        </p>
        <p>
          My work includes building <InternalLink to="/building/sidebar" state={{ fromLabel: 'About', fromPath: '/about' }}>sideBar</InternalLink>, a cross-platform AI assistant that explores personal knowledge, memory and
          tool use; creating a <InternalLink to="/building/genai-marketing-benchmarks" state={{ fromLabel: 'About', fromPath: '/about' }}>benchmarking framework</InternalLink> with 2,800+ questions across 20 marketing
          disciplines to assess LLM performance; and developing applied AI workflows spanning <InternalLink to="/building/ai-brand-detection" state={{ fromLabel: 'About', fromPath: '/about' }}>OCR</InternalLink>,
          transcription, automated classification and <InternalLink to="/building/youtube-sdg-analysis" state={{ fromLabel: 'About', fromPath: '/about' }}>large-scale content analysis</InternalLink>.
        </p>
        <p>
          I also write <a href="https://www.the-blueprint.ai" target="_blank" rel="noopener noreferrer">The Blueprint</a>, a weekly newsletter on AI
          developments and their broader implications, and contribute to industry discussions on the future of generative AI and its responsible use.
        </p>
      </section>

      <hr className={styles.divider} />
      
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2><Megaphone size={36} /></h2>
          <h3>Speaking & Advocacy</h3>
          <InternalLink to="/contact" className={styles.socialLink} aria-label="Email">
            <EnvelopeSimple size={36} />
          </InternalLink>
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
