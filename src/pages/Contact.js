import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Newspaper, PaperPlaneTilt, LinkedinLogo, TwitterLogo, GithubLogo } from "@phosphor-icons/react";
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

  return (
    <div className={styles.contact}>
      <Helmet>
        <title>Contact Sean Betts - AI and Marketing Expert</title>
        <meta name="description" content="Connect with Sean Betts. Subscribe to his newsletter, follow on social media, or send a direct message to discuss AI, marketing, and technology." />
        <meta name="keywords" content="contact Sean Betts, AI discussion, marketing expertise, technology insights" />
        <meta property="og:title" content="Contact Sean Betts - AI and Marketing Expert" />
        <meta property="og:description" content="Get in touch with Sean Betts for insights on AI, marketing, and technology. Connect via social media or send a message." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://github.com/seanbetts/seanbetts/blob/afbf46d811138cec479b66d741aab0a9e23bbdd5/public/images/sean-betts-profile.png" />
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
          <a href="https://twitter.com/seanbetts" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <TwitterLogo size={24} /> <span>Twitter</span>
          </a>
        </div>
      </section>

      <hr className={styles.divider} />

      <h2>Send me a Message</h2>
      <p>If you'd like to get in touch with me directly, please use the chat box below to send me a message.</p>

      <div className={styles.chatContainer}>
        {/* Coming Soon message inside chat container */}
        <div className={styles.comingSoonMessage}>
          <img src={profileImage} alt="Sean Betts" className={styles.chatLogo} />
          <p>The chat feature is coming soon!</p>
        </div>
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className={styles.input}
            disabled={!isChatEnabled} 
          />
          <button 
            type="submit" 
            className={styles.sendButton} 
            disabled={!isChatEnabled} 
          >
            <PaperPlaneTilt size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
