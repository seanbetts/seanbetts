// src/pages/Contact.js
import React, { useState } from 'react';
import { Newspaper, PaperPlaneTilt, LinkedinLogo, TwitterLogo, GithubLogo } from "@phosphor-icons/react";
import styles from './Contact.module.css';
import profileImage from '../assets/sean-betts-profile.png';

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Here you would typically send the message to a backend
      // For now, we'll just simulate a response
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

      <h2>Send a Message</h2>
      <p>If you'd like to get in touch with me directly, please use the chat box below to send me a message:</p>
      <div className={styles.chatContainer}>
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
          />
          <button type="submit" className={styles.sendButton}>
            <PaperPlaneTilt size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;