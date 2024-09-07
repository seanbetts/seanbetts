// File: src/components/ContactTest.js
import React, { useState } from 'react';
import styles from './ContactTest.module.css';

const ContactTest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() && message.trim()) {
      setIsSending(true);
      setSendResult(null);

      const API_URL = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:8888/.netlify/functions/send-email'
      : '/.netlify/functions/send-email';
      
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify({ email, message }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          setSendResult(result.message);
          setEmail('');
          setMessage('');
        } else {
          const errorData = await response.json();
          setSendResult(`Failed to send message: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setSendResult('An error occurred. Please try again later.');
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.title}>Contact Us</h2>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            required
          />
        </div>
        <button type="submit" disabled={isSending} className={styles.submitButton}>
          {isSending ? 'Sending...' : 'Send Message'}
        </button>
        {sendResult && <p className={styles.resultMessage}>{sendResult}</p>}
      </form>
    </div>
  );
};

export default ContactTest;