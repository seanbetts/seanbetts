import ResponsiveImage from '../components/ResponsiveImage';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Microphone, Users, ChatsCircle, Headphones } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import InfoPopover from '../components/InfoPopover';
import styles from './Speaking.module.css';
import speakingData from '../data/speakingData';

const featuredIds = new Set([
  'future-of-brands-2026', 'iab-leadership-summit-2026', 'lead-2026',
  'apple-web4-2025', 'gcs-learning-festival 2025', 'giffgaff-ai-day-2025',
]);
const featured = speakingData.filter(talk => featuredIds.has(talk.id));
const archive = speakingData.filter(talk => !featuredIds.has(talk.id));
const topics = [
  { title: 'How AI is changing the internet', description: 'How AI is changing the way people discover information, choose brands and make decisions, and what that means for marketing and communications.' },
  { title: 'Putting AI to work', description: 'What it takes to move from experimentation to everyday use, drawing on my experience of AI adoption, product development and organisational change.' },
  { title: 'Leading with autism', description: 'My experience of being an autistic leader, what diagnosis changed for me, and what I’ve learned about leadership, working relationships and mental health.' },
];
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
      <ResponsiveImage sizes={talk === featured[0] ? "(max-width: 700px) max(660px, 100vw), (max-width: 1500px) 100vw, 1440px" : "(max-width: 700px) max(660px, 100vw), (max-width: 1500px) max(700px, 50vw), 720px"} src={talk.image} style={talk.imagePosition ? { objectPosition: talk.imagePosition } : undefined} alt={`Sean Betts speaking at ${talk.conference}`} loading="lazy" decoding="async" onError={() => setFailed(true)} />}
  </div>;
}


function FeaturedAppearance({ talk, lead }) {
  return <article className={`${styles.feature} ${lead ? styles.lead : ''}`} aria-labelledby={`featured-${talk.id.replace(/\s/g, '-')}`}>
    <div className={styles.panelWindow}>
      <div className={styles.scrim} aria-hidden="true" />
      <EventPhoto talk={talk} />
      <div className={styles.featureCopy}>
        <div className={styles.upright}>
          <Format type={talk.type} />
          <h3 id={`featured-${talk.id.replace(/\s/g, '-')}`}>{talk.title}</h3>
          <InfoPopover label={`About this talk: ${talk.title}`} description={talk.description}>
            <p className={styles.conference}>{talk.conference}</p>
            <p className={styles.metadata}>{talk.date} · {talk.location}</p>
          </InfoPopover>
        </div>
      </div>
    </div>
  </article>;
}

export default function Speaking() {
  const [year, setYear] = useState('all');
  const [format, setFormat] = useState('all');
  const [visibleCount, setVisibleCount] = useState(archive.length);
  const archiveEntries = useRef(null);
  const nextFocusIndex = useRef(null);
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, []);
  useEffect(() => {
    if (nextFocusIndex.current === null) return;
    archiveEntries.current?.children[nextFocusIndex.current]?.focus();
    nextFocusIndex.current = null;
  }, [visibleCount]);
  const filtered = archive.filter(talk => (year === 'all' || yearOf(talk) === year) && (format === 'all' || talk.type === format));
  const shown = filtered.slice(0, visibleCount);
  const updateFilter = (setter, value) => { setter(value); setVisibleCount(PAGE_SIZE); };
  const showMore = () => {
    nextFocusIndex.current = visibleCount;
    setVisibleCount(count => count + PAGE_SIZE);
  };

  return <div className={styles.speaking}>
      <Seo
        title="Sean Betts Speaking | AI, Marketing and Neurodiversity Talks"
        description="Keynotes, panels and podcasts on AI, the future of marketing and leading with autism. Explore Sean Betts' speaking experience and discuss an event."
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
      />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" />Home</Link>
    <div className={styles.cover}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.upright}>
            <p className={styles.eyebrow}>Keynotes · Panels · Podcasts</p>
            <h1>Speaking<span className={styles.period}>.</span></h1>
            <p className={styles.intro}>AI, the future of marketing, and leading with autism.</p>
            <p className={styles.heroBody}>I speak about how AI is changing business, marketing and the internet, drawing on my work leading AI adoption and building products myself. I also share my experience of autism, leadership and mental health.</p>
            <Link to="/contact/" className={styles.enquiry}>Discuss a speaking opportunity<ArrowUpRight size={20} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className={styles.heroArt}><ResponsiveImage src="/images/game/speaking/stage-v2-colour.png" alt="Illustration of Sean Betts presenting on stage" fetchpriority="high" sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1000px) 40vw, (max-width: 1500px) 36vw, 520px" width="941" height="1672" decoding="async" /></div>
      </header>
      <section className={styles.topics} aria-labelledby="speaking-topics-heading">
        <div className={styles.upright}>
          <h2 id="speaking-topics-heading">What I speak about<span className={styles.period}>.</span></h2>
          <div className={styles.topicGrid}>{topics.map(topic => <div className={styles.topic} key={topic.title}>
            <h3>{topic.title}</h3><p>{topic.description}</p>
          </div>)}</div>
        </div>
      </section>
      <section className={styles.features} aria-label="Selected appearances">
        <h2 className="sr-only">Selected appearances</h2>
        {featured.map((talk, index) => <FeaturedAppearance key={talk.id} talk={talk} lead={index === 0} />)}
      </section>
      <section className={styles.archive} aria-labelledby="archive-heading">
        <div className={styles.upright}>
          <div className={styles.archiveHeader}>
            <h2 id="archive-heading">More appearances<span className={styles.period}>.</span></h2>
            <div className={styles.filters} data-js-only>
              <label>Year<select value={year} onChange={event => updateFilter(setYear, event.target.value)}><option value="all">All years</option>{years.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
              <label>Format<select value={format} onChange={event => updateFilter(setFormat, event.target.value)}><option value="all">All formats</option>{Object.entries(formats).map(([value, { label }]) => <option key={value} value={value}>{label}</option>)}</select></label>
            </div>
          </div>
          <p className="sr-only" role="status">Showing {shown.length} of {filtered.length} additional appearances.</p>
          <div ref={archiveEntries}>
            {filtered.map((talk, index) => <article tabIndex={-1} hidden={index >= visibleCount} className={styles.archiveEntry} key={talk.id} aria-labelledby={`archive-${talk.id.replace(/\s/g, '-')}`}>
              <div className={styles.entryMeta}><Format type={talk.type} /><p>{talk.date}</p><p>{talk.location}</p></div>
              <div className={styles.entryCopy}><h3 id={`archive-${talk.id.replace(/\s/g, '-')}`}>{talk.title}</h3><p className={styles.conference}>{talk.conference}</p><p className={styles.description}>{talk.description}</p></div>
            </article>)}
          </div>
          {filtered.length === 0 && <p className={styles.empty}>No appearances match this year and format. Try another combination.</p>}
          {shown.length < filtered.length && <button className={styles.more} onClick={showMore}>Show more appearances<span aria-hidden="true">+</span></button>}
        </div>
      </section>
    </div>
  </div>;
}
