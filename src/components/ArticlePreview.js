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
  const isLoading = article.loading;
  const hasImage = Boolean(article.image);
  const description = article.description || (isLoading ? 'LOADING...' : 'Preview unavailable');

  return (
    <div className={styles.articlePreview}>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <div className={`${styles.imageContainer} ${!hasImage ? styles.fallbackImage : ''}`}>
          {hasImage ? (
            <img 
              src={article.image} 
              alt={article.title} 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.classList.add(styles.fallbackImage);
              }}
            />
          ) : null}
          {!hasImage && (
            <div className={styles.loadingOverlay}>
              {isLoading ? 'LOADING...' : 'PREVIEW UNAVAILABLE'}
            </div>
          )}
        </div>
        <h3>{article.title}</h3>
        <p>{description}</p>
      </a>
      <p className={styles.domain}>{formatDomain(article.url)}</p>
    </div>
  );
};

export default ArticlePreview;
