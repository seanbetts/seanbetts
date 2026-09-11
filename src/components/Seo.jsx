import React from 'react';
import { Helmet } from 'react-helmet';
import { personSchema, websiteSchema, PERSON_ID, WEBSITE_ID, SITE_URL, pageUrl } from '../data/siteIdentity';

export const SITE_NAME = 'Sean Betts';
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
  const canonical = canonicalUrl || pageUrl(canonicalPath || '/');
  const image = imageUrl || toAbsoluteUrl(imagePath);
  const metaKeywords = normalizeKeywords(keywords);
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;
  const resolvedTwitterTitle = twitterTitle || title;
  const resolvedTwitterDescription = twitterDescription || description;
  const supplied = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const pageType = canonicalPath === '/about' ? 'ProfilePage'
    : ['/writing', '/building', '/speaking'].includes(canonicalPath) ? 'CollectionPage'
    : canonicalPath === '/contact' ? 'ContactPage' : 'WebPage';
  const entities = supplied.map(entry => ({ ...entry, '@id': entry['@id'] || `${canonical}#${entry['@type'] === 'ItemList' ? 'items' : 'work'}` }));
  const pageSchema = {
    '@context': 'https://schema.org', '@type': pageType, '@id': `${canonical}#webpage`,
    url: canonical, name: title, description,
    isPartOf: { '@id': WEBSITE_ID }, about: { '@id': PERSON_ID },
    ...(['ProfilePage', 'ContactPage'].includes(pageType) ? { mainEntity: { '@id': PERSON_ID } }
      : entities.length ? { mainEntity: { '@id': entities[0]['@id'] } } : {}),
  };
  const jsonLdItems = noindex ? [] : [personSchema, websiteSchema, pageSchema,
    ...entities];

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
      {image === toAbsoluteUrl(DEFAULT_IMAGE_PATH) ? <meta property="og:image:width" content="850" /> : null}
      {image === toAbsoluteUrl(DEFAULT_IMAGE_PATH) ? <meta property="og:image:height" content="850" /> : null}
      <link rel="describedby" href={`${SITE_URL}/llms.txt`} type="text/plain" />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      {resolvedTwitterTitle ? <meta name="twitter:title" content={resolvedTwitterTitle} /> : null}
      {resolvedTwitterDescription ? <meta name="twitter:description" content={resolvedTwitterDescription} /> : null}
      {image ? <meta name="twitter:image" content={image} /> : null}
      {jsonLdItems.map((entry, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(entry).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
