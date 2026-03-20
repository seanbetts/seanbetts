import Seo from '../components/Seo';
import { Newspaper, LinkedinLogo, Butterfly, GithubLogo } from "@phosphor-icons/react";
import styles from './Contact.module.css';
import profileImage from '../assets/sean-betts-profile.png';

const Contact = () => {

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Sean Betts",
    "description": "Get in touch with Sean Betts for insights on AI, marketing, and technology.",
    "url": "https://www.seanbetts.com/contact",
    "mainEntity": {
      "@type": "Person",
      "name": "Sean Betts",
      "sameAs": [
        "https://www.linkedin.com/in/seanbetts/",
        "https://github.com/seanbetts",
        "https://twitter.com/seanbetts",
        "https://bsky.app/profile/seanbetts.com"
      ]
    }
  };

  return (
    <div className={styles.contact}>
      <Seo
        title="Contact Sean Betts | Newsletter, Socials and Collaboration"
        description="Get in touch with Sean Betts via The Blueprint, social profiles or direct contact to discuss AI, marketing, technology and collaboration."
        keywords={[
          'contact Sean Betts',
          'newsletter',
          'LinkedIn',
          'GitHub',
          'Bluesky',
          'AI collaboration'
        ]}
        canonicalPath="/contact"
        imagePath="/images/sean-betts-profile.png"
        ogType="website"
        jsonLd={contactPageSchema}
      />

      <div className={styles.lockup}>
        <img src={profileImage} alt="Sean Betts" className={styles.logo} />
        <h1>Contact Me</h1>
      </div>

      <section className={styles.socialMedia}>
        <p>You can subscribe to my newsletter, connect with me on social media, or check out my work using the links below:</p>
        <div className={styles.socialLinks}>
          <a href="https://www.the-blueprint.ai/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <Newspaper size={24} /> <span>The Blueprint</span>
          </a>
          <a href="https://www.linkedin.com/in/seanbetts/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <LinkedinLogo size={24} /> <span>LinkedIn</span>
          </a>
          <a href="https://github.com/seanbetts" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <GithubLogo size={24} /> <span>GitHub</span>
          </a>
          <a href="https://bsky.app/profile/seanbetts.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <Butterfly size={24} /> <span>Bluesky</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
