import ResponsiveImage from '../components/ResponsiveImage';
import PanelFocusCanvas from '../components/PanelFocusCanvas';
import { useId, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import InfoPopover from '../components/InfoPopover';
import { PERSON_ID, SITE_URL, SOCIAL_URLS } from '../data/siteIdentity';
import articlesData from '../data/articlesData';
import styles from './Writing.module.css';

const featured = articlesData.filter(article => article.image);
const collection = articlesData.filter(article => !article.image);
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const articleListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Writing and contributions from Sean Betts',
  itemListElement: articlesData.map((article, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Article',
      '@id': article.url,
      author: article.authors
        ? article.authors.map(name => name === 'Sean Betts' ? { '@id': PERSON_ID } : { '@type': 'Person', name })
        : { '@id': PERSON_ID },
      headline: article.title,
      url: article.url,
      description: article.description,
      ...(article.image ? { image: `${SITE_URL}${article.image}` } : {}),
      ...(article.datePublished ? { datePublished: article.datePublished } : {}),
      publisher: { '@type': 'Organization', name: article.publication },
    },
  })),
};

function ArticleDate({ article }) {
  return article.datePublished ? <time dateTime={article.datePublished}>{dateFormat.format(new Date(`${article.datePublished}T00:00:00Z`))}</time> : null;
}


function ArticlePanel({ article }) {
  const [failed, setFailed] = useState(false);
  const titleId = useId();
  return <article className={styles.feature} aria-labelledby={titleId}>
    <div data-panel-shape className={styles.panelWindow}>
      <a data-panel-focus href={article.url} target="_blank" rel="noopener noreferrer" className={styles.featureLink} aria-labelledby={`${titleId} ${titleId}-external`}>
        <span id={`${titleId}-external`} className="sr-only">Opens in a new tab</span>
      </a>
      <div className={styles.articleContent}>
        <div className={styles.articleCopy}>
          <h3 id={titleId}>{article.title}</h3>
          <InfoPopover className={styles.articleDetails} label={`About this article: ${article.title}`} description={article.description}>
            <div className={styles.metadata}>
              <p className={styles.publication}>{article.publication}</p>
              <ArticleDate article={article} />
            </div>
          </InfoPopover>
        </div>
        <div className={styles.photo}>
          {!failed && <ResponsiveImage src={article.image} alt={article.imageAlt} loading="lazy" decoding="async"
            sizes="(max-width: 360px) 80vw, (max-width: 700px) 132px, (max-width: 1000px) 220px, 280px"
            style={{ objectPosition: article.imagePosition }} onError={() => setFailed(true)} />}
        </div>
      </div>
    </div>
  </article>;
}

function ArchiveArticle({ article }) {
  return <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.archiveEntry}>
    <div className={styles.entryMeta}><p>{article.publication}</p><ArticleDate article={article} /></div>
    <div className={styles.entryCopy}><h3>{article.title}</h3><p>{article.description}</p></div>
    <ArrowUpRight size={23} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
  </a>;
}

export default function Writing() {
  return <div className={styles.page}>
    <Seo
      title="Sean Betts Writing | AI, Marketing and Technology Insights"
      description="Essays, experiments and conversations from Sean Betts on how AI is changing products, choices and businesses. Read The Blueprint and contributions to industry publications."
      keywords={['Sean Betts', 'AI writing', 'marketing insights', 'The Blueprint', 'generative AI', 'technology essays']}
      canonicalPath="/writing"
      jsonLd={articleListSchema}
    />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Home</Link>
    <PanelFocusCanvas className={styles.panels}>
      <header className={styles.hero}>
        <div className={styles.introduction}>
          <div className={styles.upright}>
            <h1>Writing<span aria-hidden="true">.</span></h1>
            <p className={styles.standfirst}>I write about how AI is changing the products we use, the choices we make and the businesses we build, connecting developments in technology with their consequences for people, brands and organisations.</p>
            <div className={styles.blueprint}>
              <h2>The Blueprint</h2>
              <p>The Blueprint is my newsletter exploring AI, technology and what comes next. Expect analysis, experiments and personal perspectives on what new capabilities make possible and the assumptions we should question along the way.</p>
              <a href={SOCIAL_URLS.blueprint} target="_blank" rel="noopener noreferrer" className={styles.cta}>Read The Blueprint <ArrowUpRight size={21} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
        </div>
        <div className={styles.heroArtwork}>
          <ResponsiveImage src="/images/game/writing/over-shoulder-v2-colour.png"
            alt="Sean seen from behind at his writing desk, with a mostly obscured laptop screen and Balcombe Viaduct beyond the window."
            loading="eager" fetchpriority="high" decoding="async"
            sizes="(max-width: 1000px) calc(100vw - 64px), (max-width: 1500px) 42vw, 600px" />
        </div>
      </header>
      <section className={styles.featured} aria-labelledby="featured-writing-heading">
        <h2 id="featured-writing-heading" className="sr-only">Featured articles</h2>
        <div className={styles.featureGrid}>
          {featured.map(article => <ArticlePanel key={article.url} article={article} />)}
        </div>
      </section>
      {collection.length > 0 && <section className={styles.archive} aria-labelledby="more-writing-heading">
        <div className={styles.upright}>
          <h2 id="more-writing-heading">More writing<span aria-hidden="true">.</span></h2>
          <div>{collection.map(article => <ArchiveArticle key={article.url} article={article} />)}</div>
        </div>
      </section>}
    </PanelFocusCanvas>
  </div>;
}
