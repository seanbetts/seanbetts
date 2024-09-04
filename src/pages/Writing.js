import React, { useState, useEffect, useCallback } from 'react';
import { Newspaper } from "@phosphor-icons/react";
import styles from './Writing.module.css';
import ArticlePreview from '../components/ArticlePreview';
import fetchUrlMetadata from '../utils/fetchUrlMetadata';

const initialArticles = [
  {
    title: "Beyond Chatbots: A Blueprint for LLMs",
    url: "https://www.the-blueprint.ai/p/beyond-chatbots-a-blueprint-for-llms"
  },
  {
    title: "AI For The Rest Of Us",
    url: "https://www.the-blueprint.ai/p/ai-for-the-rest-of-us"
  },
  {
    title: "The Search for (im)perfection",
    url: "https://newdigitalage.co/agencies/sean-betts-the-search-for-imperfection/"
  },
  {
    title: "O is for Omni, but A is for Agent",
    url: "https://www.the-blueprint.ai/p/o-is-for-omni-but-a-is-for-agent"
  },
  {
    title: "The Marketing Singularity is Nearer Than You Think",
    url: "https://newdigitalage.co/agencies/sean-betts-the-marketing-singularity-is-nearer-than-you-think/"
  },
  {
    title: "Leadership Lessons",
    url: "https://www.the-blueprint.ai/p/leadership-lessons"
  },
  {
    title: "Tech Pail Kids",
    url: "https://www.the-blueprint.ai/p/tech-pail-kids"
  },
  {
    title: "The Power of GPTs",
    url: "https://www.the-blueprint.ai/p/the-power-of-gpts"
  },
  {
    title: "OpenAI DevDay Special",
    url: "https://www.the-blueprint.ai/p/openai-devday-special"
  },
  {
    title: "AI Safety Summit: what marketers need to know",
    url: "https://www.thedrum.com/opinion/2023/11/07/ai-safety-summit-what-marketers-need-know"
  },
  {
    title: "Is Generative AI a Feature or a Platform?",
    url: "https://www.the-blueprint.ai/p/is-generative-ai-a-feature-or-a-platform"
  },
  {
    title: "The Balancing Act",
    url: "https://www.the-blueprint.ai/p/the-balancing-act"
  },
  {
    title: "Navigating the role of generative AI in digital marketing",
    url: "https://newdigitalage.co/agencies/sean-betts-the-generative-ai-hype-cycle/"
  }
];

const Writing = () => {
  const [articles, setArticles] = useState(initialArticles.map(article => ({ ...article, loading: true })));

  const fetchMetadata = useCallback(async () => {
    const cachedMetadata = JSON.parse(localStorage.getItem('articleMetadata')) || {};
    const currentTime = new Date().getTime();
    const cacheExpiration = 24 * 60 * 60 * 1000; // 24 hours

    const updatedArticles = await Promise.all(initialArticles.map(async (article, index) => {
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