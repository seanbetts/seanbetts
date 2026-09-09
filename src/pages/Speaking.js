import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Microphone, Users, ChatsCircle, Headphones, Info } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import styles from './Speaking.module.css';
import speakingData from '../data/speakingData';

const featuredIds = ['future-of-brands-2026', 'iab-leadership-summit-2026', 'apple-web4-2025'];
const featured = featuredIds.map(id => speakingData.find(talk => talk.id === id)).filter(Boolean);
const archive = speakingData.filter(talk => !featuredIds.includes(talk.id));
const yearOf = talk => talk.date.match(/20\d{2}/)?.[0] || 'Other';
const years = [...new Set(archive.map(yearOf))].sort().reverse();
const formats = {
  keynote: { Icon: Microphone, label: 'Keynote' },
  panel: { Icon: Users, label: 'Panel' },
  talk: { Icon: ChatsCircle, label: 'Talk' },
  podcast: { Icon: Headphones, label: 'Podcast' },
};
const PAGE_SIZE = 12;

function Format({ type }) {
  const { Icon, label } = formats[type] || formats.keynote;
  return <span className={styles.format}><Icon size={17} aria-hidden="true" />{label}</span>;
}

function EventPhoto({ talk }) {
  const [failed, setFailed] = useState(false);
  return <div className={styles.photo}>
    {failed ? <span className={styles.photoFallback}>{talk.conference}</span> :
      <img src={talk.image} alt={`Sean Betts speaking at ${talk.conference}`} loading="lazy" decoding="async" onError={() => setFailed(true)} />}
  </div>;
}

function TalkInfo({ talk }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const root = useRef(null);
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
  return <div ref={root} className={styles.talkInfo}
    onPointerEnter={event => { if (event.pointerType === 'mouse') { setHovered(true); setDismissed(false); } }}
    onPointerLeave={() => setHovered(false)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setFocused(false); setPinned(false); } }}>
    <button type="button" className={styles.infoButton} aria-label={`About this talk: ${talk.title}`}
      aria-expanded={open} aria-controls={`description-${talk.id}`}
      onFocus={() => { setFocused(true); setDismissed(false); }}
      onClick={() => { if (pinned) close(); else { setPinned(true); setDismissed(false); } }}>
      <Info size={28} aria-hidden="true" />
    </button>
    <div id={`description-${talk.id}`} className={styles.talkDescription} hidden={!open}>
      <p>{talk.description}</p>
    </div>
  </div>;
}

function FeaturedAppearance({ talk, lead }) {
  return <article className={`${styles.feature} ${lead ? styles.lead : ''}`} aria-labelledby={`featured-${talk.id}`}>
    <EventPhoto talk={talk} />
    <TalkInfo talk={talk} />
    <div className={styles.featureCopy}>
      <div className={styles.upright}>
        <Format type={talk.type} />
        <h3 id={`featured-${talk.id}`}>{talk.title}<span className={styles.period}>.</span></h3>
        <p className={styles.conference}>{talk.conference}</p>
        <p className={styles.metadata}>{talk.date} · {talk.location}</p>
      </div>
    </div>
  </article>;
}

export default function Speaking() {
  const [year, setYear] = useState('all');
  const [format, setFormat] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filtered = archive.filter(talk => (year === 'all' || yearOf(talk) === year) && (format === 'all' || talk.type === format));
  const shown = filtered.slice(0, visibleCount);
  const updateFilter = (setter, value) => { setter(value); setVisibleCount(PAGE_SIZE); };
  const speakingPageSchema = {
    '@context': 'https://schema.org', '@type': 'WebPage',
    name: "Sean Betts' Speaking Engagements",
    description: 'Keynotes, talks, panels and podcast appearances on AI, marketing, technology and neurodiversity.',
    url: 'https://www.seanbetts.com/speaking',
    author: { '@type': 'Person', name: 'Sean Betts', url: 'https://www.seanbetts.com' },
  };
  return <div className={styles.speaking}>
      <Seo
        title="Sean Betts Speaking | AI, Marketing and Neurodiversity Talks"
        description="Explore Sean Betts' keynote talks, panels, podcasts and speaking appearances on AI, marketing innovation, technology and neurodiversity."
        keywords={[
          'Sean Betts',
          'keynote speaker',
          'AI talks',
          'marketing innovation',
          'neurodiversity',
          'panels',
          'podcasts'
        ]}
        canonicalPath="/speaking"
        imagePath="/images/sean-betts-profile.png"
        ogType="website"
        jsonLd={speakingPageSchema}
      />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" />Home</Link>
    <div className={styles.cover}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.upright}>
            <p className={styles.eyebrow}>Keynotes · Panels · Conversations</p>
            <h1>Speaking<span className={styles.period}>.</span></h1>
            <p className={styles.intro}>Perspectives on AI, innovation and the human side of change.</p>
            <p className={styles.heroBody}>I speak at conferences and events around the world, exploring the future of technology and sharing my lived experience of autism, leadership and mental health.</p>
            <Link to="/contact" className={styles.enquiry}>Speaking enquiries<ArrowUpRight size={21} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className={styles.heroArt}><img src="/images/game/speaking/stage-v1.webp" alt="Illustration of Sean Betts presenting on stage" width="941" height="1672" decoding="async" /></div>
      </header>
      <section className={styles.features} aria-label="Selected appearances">
        <h2 className="sr-only">Selected appearances</h2>
        {featured.map((talk, index) => <FeaturedAppearance key={talk.id} talk={talk} lead={index === 0} />)}
      </section>
      <section className={styles.archive} aria-labelledby="archive-heading">
        <div className={styles.upright}>
          <div className={styles.archiveHeader}>
            <h2 id="archive-heading">More appearances<span className={styles.period}>.</span></h2>
            <div className={styles.filters}>
              <label>Year<select value={year} onChange={event => updateFilter(setYear, event.target.value)}><option value="all">All years</option>{years.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
              <label>Format<select value={format} onChange={event => updateFilter(setFormat, event.target.value)}><option value="all">All formats</option>{Object.entries(formats).map(([value, { label }]) => <option key={value} value={value}>{label}</option>)}</select></label>
            </div>
          </div>
          <p className="sr-only" role="status">Showing {shown.length} of {filtered.length} additional appearances.</p>
          <div className={styles.archiveList}>
            {shown.map(talk => <article className={styles.archiveEntry} key={talk.id} aria-labelledby={`archive-${talk.id.replace(/\s/g, '-')}`}>
              <div className={styles.entryMeta}><Format type={talk.type} /><p>{talk.date}</p><p>{talk.location}</p></div>
              <div className={styles.entryCopy}><h3 id={`archive-${talk.id.replace(/\s/g, '-')}`}>{talk.title}</h3><p className={styles.conference}>{talk.conference}</p><p className={styles.description}>{talk.description}</p></div>
            </article>)}
          </div>
          {filtered.length === 0 && <p className={styles.empty}>No appearances match this year and format. Try another combination.</p>}
          {shown.length < filtered.length && <button className={styles.more} onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>Show more appearances<span aria-hidden="true">+</span></button>}
        </div>
      </section>
    </div>
  </div>;
}
