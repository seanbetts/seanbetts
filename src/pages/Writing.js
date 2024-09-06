import React, { useState, useEffect, useCallback } from 'react';
import { Newspaper } from "@phosphor-icons/react";
import styles from './Writing.module.css';
import ArticlePreview from '../components/ArticlePreview';
import fetchUrlMetadata from '../utils/fetchUrlMetadata';
import articlesData from '../data/articlesData';

const Writing = () => {
  const [articles, setArticles] = useState(articlesData.map(article => ({ ...article, loading: true })));

  const fetchMetadata = useCallback(async () => {
    const cachedMetadata = JSON.parse(localStorage.getItem('articleMetadata')) || {};
    const currentTime = new Date().getTime();
    const cacheExpiration = 24 * 60 * 60 * 1000; // 24 hours

    const updatedArticles = await Promise.all(articlesData.map(async (article, index) => {
      if (article.url !== "#") {
        const cachedData = cachedMetadata[article.url];
        if (cachedData && (currentTime - cachedData.timestamp) < cacheExpiration) {
          return { ...article, ...cachedData.data, loading: false };
        }

        try {
          const metadata = await fetchUrlMetadata(article.url);
          const newData = { 
            ...article, 
            description: metadata?.description || '',
            image: metadata?.image || '',
            loading: false
          };

          cachedMetadata[article.url] = {
            data: newData,
            timestamp: currentTime
          };

          return newData;
        } catch (error) {
          console.error(`Error fetching metadata for ${article.url}:`, error);
          return { ...article, loading: false };
        }
      }
      return { ...article, loading: false };
    }));

    localStorage.setItem('articleMetadata', JSON.stringify(cachedMetadata));
    setArticles(updatedArticles);
  }, []);

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  return (
    <div className={styles.blog}>
      <h1>Writing</h1>

      <section className={styles.blueprint}>
        <h2>The Blueprint</h2>
        <p>Check out my blog 'The Blueprint' where I write about generative AI and share a weekly newsletter.</p>
        <a href="https://www.the-blueprint.ai" target="_blank" rel="noopener noreferrer" className={styles.blueprintLink}>
          <Newspaper size={24} className={styles.icon} />
          Visit The Blueprint
        </a>
      </section>
      
      <section className={styles.featuredArticles}>
        <h2>Featured Articles</h2>
        <div className={styles.articleList}>
          {articles.map((article, index) => (
            <ArticlePreview key={index} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Writing;