import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Newspaper, PaperPlaneTilt, LinkedinLogo, Butterfly, GithubLogo } from "@phosphor-icons/react";
import styles from './Contact.module.css';
import profileImage from '../assets/sean-betts-profile.png';

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isChatEnabled, setIsChatEnabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChatEnabled && input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setTimeout(() => {
        setMessages(messages => [...messages, { 
          text: "Thanks for your message! I'll get back to you soon.", 
          sender: 'bot' 
        }]);
      }, 1000);
      setInput('');
    }
  };

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
      <Helmet>
        <title>Contact Sean Betts - AI and Marketing Expert</title>
        <link rel="canonical" href="https://www.seanbetts.com/contact" />
        <meta name="description" content="Connect with Sean Betts. Subscribe to his newsletter, follow on social media, or send a direct message to discuss AI, marketing, and technology." />
        <meta name="keywords" content="contact Sean Betts, AI discussion, marketing expertise, technology insights" />
        <meta property="og:site_name" content="Sean Betts" />
        <meta property="og:url" content="https://www.seanbetts.com/contact" />
        <meta property="og:title" content="Contact Sean Betts - AI and Marketing Expert" />
        <meta property="og:description" content="Get in touch with Sean Betts for insights on AI, marketing, and technology. Connect via social media or send a message." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/sean-betts-profile.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@seanbetts" />
        <meta name="twitter:title" content="Contact Sean Betts - AI & Marketing Expert" />
        <meta name="twitter:description" content="Get in touch with Sean Betts for insights on AI, marketing, and technology. Connect via social media or send a message." />
        <meta name="twitter:image" content="/images/sean-betts-profile.png" />
        <script type="application/ld+json">
          {JSON.stringify(contactPageSchema)}
        </script>
      </Helmet>

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
