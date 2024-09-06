import React from 'react';
import styles from './ArticlePreview.module.css';

// Helper function to extract and format domain name
const formatDomain = (url) => {
  try {
    const domain = new URL(url).hostname;
    return domain
      .replace(/^www\./, '')
      .replace(/\.(com|co|org|net|io|ai|uk|us)$/, ''); 
  } catch (error) {
    console.error('Invalid URL:', url);
    return url;
  }
};

const ArticlePreview = ({ article }) => {
  return (
    <div className={styles.articlePreview}>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <div className={`${styles.imageContainer} ${!article.image ? styles.fallbackImage : ''}`}>
          {article.image ? (
            <img 
              src={article.image} 
              alt={article.title} 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.classList.add(styles.fallbackImage);
              }}
            />
          ) : null}
          {!article.image && <div className={styles.loadingOverlay}>LOADING...</div>}
        </div>
        <h3>{article.title}</h3>
        <p>{article.description || 'LOADING...'}</p>
      </a>
      <p className={styles.domain}>{formatDomain(article.url)}</p>
    </div>
  );
};

export default ArticlePreview;