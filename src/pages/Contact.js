// src/pages/Contact.js
import React, { useState } from 'react';
import { PaperPlaneTilt } from "@phosphor-icons/react";
import styles from './Contact.module.css';

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
      <h1>Contact Me</h1>
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