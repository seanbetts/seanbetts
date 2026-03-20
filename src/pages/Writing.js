import React, { useState, useEffect, useCallback } from 'react';
import { Newspaper } from "@phosphor-icons/react";
import Seo from '../components/Seo';
import styles from './Writing.module.css';
import ArticlePreview from '../components/ArticlePreview';
import fetchUrlMetadata from '../utils/fetchUrlMetadata';
import articlesData from '../data/articlesData';

const FALLBACK_DESCRIPTION = 'Preview unavailable';

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
            description: metadata?.description || FALLBACK_DESCRIPTION,
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

  const writingPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sean Betts' Writing",
    "description": "Sean Betts' insights on AI, marketing, and technology",
    "url": "https://www.seanbetts.com/writing",
    "author": {
      "@type": "Person",
      "name": "Sean Betts",
      "url": "https://www.seanbetts.com"
    }
  };

  const articleListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": articles.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "BlogPosting",
        "headline": article.title,
        "url": article.url.startsWith('http') ? article.url : `https://www.seanbetts.com${article.url}`,
        "description": article.description,
        "image": article.image,
        "author": {
          "@type": "Person",
          "name": "Sean Betts",
          "url": "https://www.seanbetts.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "The Blueprint",
          "url": "https://www.the-blueprint.ai"
        }
      }
    }))
  };

  return (
    <div className={styles.blog}>
      <Seo
        title="Sean Betts Writing | AI, Marketing and Technology Insights"
        description="Read Sean Betts' writing on AI, marketing and technology, including The Blueprint newsletter and featured essays on generative AI and industry trends."
        keywords={[
          'Sean Betts',
          'AI writing',
          'marketing insights',
          'The Blueprint',
          'generative AI',
          'technology essays'
        ]}
        canonicalPath="/writing"
        imagePath="/images/sean-betts-profile.png"
        ogType="blog"
        jsonLd={[writingPageSchema, articleListSchema]}
      />

      <h1>Writing</h1>

      <section className={styles.blueprint}>
        <h2>The Blueprint</h2>
        <p>Check out my blog, The Blueprint, where I write about generative AI and share a weekly newsletter.</p>
        <a href="https://www.the-blueprint.ai" target="_blank" rel="noopener noreferrer" className={styles.blueprintLink}>
          <Newspaper size={24} className={styles.icon} />
          Visit The Blueprint
        </a>
      </section>
      
      <section className={styles.featuredArticles}>
        <h2>Featured Articles</h2>
        <p>Below are some featured articles, showcasing the best of my writing on AI and marketing over the past few years:</p>
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
