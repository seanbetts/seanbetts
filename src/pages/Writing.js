import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Info } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import articlesData from '../data/articlesData';
import styles from './Writing.module.css';

const featured = articlesData.filter(article => article.image);
const collection = articlesData.filter(article => !article.image);
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const articleListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Selected writing by Sean Betts',
  itemListElement: articlesData.map((article, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Article',
      headline: article.title,
      url: article.url,
      description: article.description,
      ...(article.image ? { image: `https://www.seanbetts.com${article.image}` } : {}),
      ...(article.datePublished ? { datePublished: article.datePublished } : {}),
      publisher: { '@type': 'Organization', name: article.publication },
    },
  })),
};

function ArticleDate({ article }) {
  return article.datePublished ? <time dateTime={article.datePublished}>{dateFormat.format(new Date(`${article.datePublished}T00:00:00Z`))}</time> : null;
}

function ArticleInfo({ article }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const root = useRef(null);
  const id = useId();
  const open = !dismissed && (hovered || focused || pinned);
  const close = () => { setPinned(false); setDismissed(true); };
  useEffect(() => {
    if (!open) return undefined;
    const outside = event => {
      if (!root.current?.contains(event.target)) { setPinned(false); setDismissed(true); }
    };
    const escape = event => {
      if (event.key === 'Escape') { setPinned(false); setDismissed(true); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);
  return <div ref={root} className={styles.articleInfo}
    onPointerEnter={event => { if (event.pointerType === 'mouse') { setHovered(true); setDismissed(false); } }}
    onPointerLeave={() => setHovered(false)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setFocused(false); setPinned(false); } }}>
    <button type="button" className={styles.infoButton} aria-label={`About this article: ${article.title}`}
      aria-expanded={open} aria-controls={id}
      onFocus={() => { setFocused(true); setDismissed(false); }}
      onClick={() => { if (pinned) close(); else { setPinned(true); setDismissed(false); } }}>
      <Info size={28} aria-hidden="true" />
    </button>
    <div id={id} className={styles.articleDescription} hidden={!open}><p>{article.description}</p></div>
  </div>;
}

function ArticlePanel({ article, hero = false }) {
  const Heading = hero ? 'h2' : 'h3';
  const [failed, setFailed] = useState(false);
  const titleId = useId();
  return <article className={`${styles.feature} ${hero ? styles.heroFeature : ''}`} aria-labelledby={titleId}>
    <div className={styles.photo}>
      {!failed && <img src={article.image} alt={article.imageAlt} loading={hero ? "eager" : "lazy"} fetchpriority={hero ? "high" : undefined} decoding="async"
        style={{ objectPosition: article.imagePosition }} onError={() => setFailed(true)} />}
    </div>
    <ArticleInfo article={article} />
    <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.featureLink}>
      <div className={styles.upright}>
        <Heading id={titleId}>{article.title}</Heading>
        <p className={styles.publication}>{article.publication}</p>
        <div className={styles.metadata}><ArticleDate article={article} /><span className={styles.read}>Read article <ArrowUpRight size={21} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></span></div>
      </div>
    </a>
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
      description="Read Sean Betts' writing on AI, marketing and technology, including The Blueprint newsletter and featured essays on generative AI and industry trends."
      keywords={['Sean Betts', 'AI writing', 'marketing insights', 'The Blueprint', 'generative AI', 'technology essays']}
      canonicalPath="/writing"
      jsonLd={[
        { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Sean Betts’ Writing', url: 'https://www.seanbetts.com/writing', description: 'Ideas and perspectives on AI, marketing and technology.' },
        articleListSchema,
      ]}
    />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Home</Link>
    <div className={styles.panels}>
      <header className={styles.hero}>
        <div className={styles.introduction}>
          <div className={styles.upright}>
            <h1>Writing<span aria-hidden="true">.</span></h1>
            <p className={styles.standfirst}>Ideas and perspectives on AI, marketing and the technology changing how we live and work.</p>
            <div className={styles.blueprint}>
              <h2>The Blueprint</h2>
              <p>My newsletter and essays exploring generative AI, its possibilities and what it means for people and businesses.</p>
              <a href="https://www.the-blueprint.ai" target="_blank" rel="noopener noreferrer" className={styles.cta}>Read The Blueprint <ArrowUpRight size={21} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
        </div>
        <ArticlePanel article={featured[0]} hero />
      </header>
      <section className={styles.featured} aria-labelledby="featured-writing-heading">
        <h2 id="featured-writing-heading" className="sr-only">Featured articles</h2>
        <div className={styles.featureGrid}>
          {featured.slice(1).map(article => <ArticlePanel key={article.url} article={article} />)}
        </div>
      </section>
      {collection.length > 0 && <section className={styles.archive} aria-labelledby="more-writing-heading">
        <div className={styles.upright}>
          <h2 id="more-writing-heading">More writing<span aria-hidden="true">.</span></h2>
          <div className={styles.archiveList}>{collection.map(article => <ArchiveArticle key={article.url} article={article} />)}</div>
        </div>
      </section>}
    </div>
  </div>;
}
