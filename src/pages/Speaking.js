import React from 'react';
import { Microphone, Users, ChatsCircle, Headphones } from "@phosphor-icons/react";
import Seo from '../components/Seo';
import styles from './Speaking.module.css';
import speakingData from '../data/speakingData';

const Speaking = () => {
  // Helper function to get icon and label for each type
  const getTypeConfig = (type) => {
    const configs = {
      keynote: { icon: <Microphone size={16} weight="fill" />, label: 'Keynote' },
      panel: { icon: <Users size={16} weight="fill" />, label: 'Panel' },
      talk: { icon: <ChatsCircle size={16} weight="fill" />, label: 'Talk' },
      podcast: { icon: <Headphones size={16} weight="fill" />, label: 'Podcast' }
    };
    return configs[type] || configs.keynote;
  };

  const speakingPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sean Betts' Speaking Engagements",
    "description": "Keynote presentations, talks, panels, and podcast appearances by Sean Betts on AI, marketing, and technology",
    "url": "https://www.seanbetts.com/speaking",
    "author": {
      "@type": "Person",
      "name": "Sean Betts",
      "url": "https://www.seanbetts.com"
    }
  };

  return (
    <div className={styles.speaking}>
      <Seo
        title="Sean Betts Speaking | AI, Marketing and Neurodiversity Talks"
        description="Explore Sean Betts' keynote talks, panels, podcasts and speaking appearances on AI, marketing innovation, technology and neurodiversity."
        keywords={[
          'Sean Betts',
          'keynote speaker',
          'AI talks',
          'marketing innovation',
          'neurodiversity',
          'panels',
          'podcasts'
        ]}
        canonicalPath="/speaking"
        imagePath="/images/sean-betts-profile.png"
        ogType="website"
        jsonLd={speakingPageSchema}
      />

      <h1>Speaking</h1>

      <section className={styles.intro}>
        <p>
          I regularly speak at conferences and events around the world, sharing insights on AI,
          marketing innovation, and the future of technology. Below are some of my recent keynote
          presentations, panel discussions, talks, and podcast appearances.
        </p>
      </section>

      <section className={styles.talksList}>
        <div className={styles.talks}>
          {speakingData.map((talk) => {
            const isPngOrSvg = talk.image.match(/\.(png|svg|webp)$/i);
            return (
            <div key={talk.id} className={styles.talkCard}>
              <div className={styles.imageContainer}>
                <img
                  src={talk.image}
                  alt={talk.title}
                  className={isPngOrSvg ? styles.containImage : ''}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add(styles.fallbackImage);
                  }}
                />
              </div>
              <div className={styles.talkContent}>
                <div className={styles.titleContainer}>
                  <h2>{talk.title}</h2>
                  <span className={`${styles.typeBadge} ${styles[talk.type]}`}>
                    {getTypeConfig(talk.type).icon}
                    {getTypeConfig(talk.type).label}
                  </span>
                </div>
                <div className={styles.talkMeta}>
                  <span className={styles.conference}>
                    {talk.conference}
                  </span>
                  <span className={styles.date}>{talk.date}</span>
                  <span className={styles.location}>{talk.location}</span>
                </div>
                <p className={styles.description}>{talk.description}</p>
              </div>
            </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Speaking;
