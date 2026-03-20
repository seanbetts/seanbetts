import React from 'react';
import { Helmet } from 'react-helmet';

export const SITE_NAME = 'Sean Betts';
export const SITE_URL = 'https://www.seanbetts.com';
const DEFAULT_IMAGE_PATH = '/images/sean-betts-profile.png';
const DEFAULT_TWITTER_SITE = '@seanbetts';

const toAbsoluteUrl = (value) => {
  if (!value) {
    return '';
  }

  try {
    return new URL(value, SITE_URL).toString();
  } catch (error) {
    return value;
  }
};

const normalizeKeywords = (keywords) => {
  if (!keywords) {
    return '';
  }

  return Array.isArray(keywords) ? keywords.join(', ') : keywords;
};

const Seo = ({
  title,
  description,
  keywords,
  canonicalPath,
  canonicalUrl,
  ogType = 'website',
  imagePath = DEFAULT_IMAGE_PATH,
  imageUrl,
  twitterCard = 'summary_large_image',
  noindex = false,
  jsonLd,
  siteName = SITE_NAME,
  twitterSite = DEFAULT_TWITTER_SITE,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
}) => {
  const canonical = canonicalUrl || (canonicalPath ? toAbsoluteUrl(canonicalPath) : SITE_URL);
  const image = imageUrl || toAbsoluteUrl(imagePath);
  const metaKeywords = normalizeKeywords(keywords);
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;
  const resolvedTwitterTitle = twitterTitle || title;
  const resolvedTwitterDescription = twitterDescription || description;
  const jsonLdItems = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      {description ? <meta name="description" content={description} /> : null}
      {metaKeywords ? <meta name="keywords" content={metaKeywords} /> : null}
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonical} />
      {resolvedOgTitle ? <meta property="og:title" content={resolvedOgTitle} /> : null}
      {resolvedOgDescription ? <meta property="og:description" content={resolvedOgDescription} /> : null}
      <meta property="og:type" content={ogType} />
      {image ? <meta property="og:image" content={image} /> : null}
      {image ? <meta property="og:image:width" content="800" /> : null}
      {image ? <meta property="og:image:height" content="800" /> : null}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      {resolvedTwitterTitle ? <meta name="twitter:title" content={resolvedTwitterTitle} /> : null}
      {resolvedTwitterDescription ? <meta name="twitter:description" content={resolvedTwitterDescription} /> : null}
      {image ? <meta name="twitter:image" content={image} /> : null}
      {jsonLdItems.map((entry, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
