// src/pages/Blog.js
import React from 'react';
import { Article, Newspaper } from "@phosphor-icons/react";
import styles from './Writing.module.css';

const Writing = () => {
  const articles = [
    {
      title: "Navigating the role of generative AI in digital marketing",
      url: "https://newdigitalage.co/agencies/sean-betts-the-generative-ai-hype-cycle/"
    },
    {
      title: "AI Safety Summit: what marketers need to know",
      url: "#"
    },
    {
      title: "Industry Views from the AI Safety Summit",
      url: "#"
    },
    {
      title: "The Marketing Singularity is Nearer Than You Think",
      url: "https://newdigitalage.co/agencies/sean-betts-the-marketing-singularity-is-nearer-than-you-think/"
    },
    {
      title: "The Search for Imperfection",
      url: "https://newdigitalage.co/agencies/sean-betts-the-search-for-imperfection/"
    }
  ];

  return (
    <div className={styles.blog}>
      <h1>Blog</h1>
      
      <section className={styles.featuredArticles}>
        <h2>Featured Articles</h2>
        <div className={styles.articleList}>
          {articles.map((article, index) => (
            <div key={index} className={styles.article}>
              <Article size={24} className={styles.icon} />
              <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
            </div>
          ))}
        </div>
      </section>
      
      <section className={styles.blueprint}>
        <h2>The Blueprint</h2>
        <p>Check out my blog 'The Blueprint' where I write about generative AI and share a weekly newsletter.</p>
        <a href="https://www.the-blueprint.ai" target="_blank" rel="noopener noreferrer" className={styles.blueprintLink}>
          <Newspaper size={24} className={styles.icon} />
          Visit The Blueprint
        </a>
      </section>
      
      <section className={styles.aiLessons}>
        <h2>Little AI Lessons</h2>
        <p>Explore my 100-day 'Little AI Lessons' series, now available on The Blueprint blog.</p>
        <a href="https://www.the-blueprint.ai/p/little-ai-lessons" target="_blank" rel="noopener noreferrer" className={styles.aiLessonsLink}>
          Read Little AI Lessons
        </a>
      </section>
    </div>
  );
};

export default Writing;