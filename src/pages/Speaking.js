import ResponsiveImage from '../components/ResponsiveImage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Microphone, Users, ChatsCircle, Headphones } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import InfoPopover from '../components/InfoPopover';
import styles from './Speaking.module.css';
import speakingData from '../data/speakingData';

const featured = speakingData.filter(talk => talk.imageType === 'photo');
const archive = speakingData.filter(talk => talk.imageType !== 'photo');
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
      <ResponsiveImage sizes={talk === featured[0] ? "(max-width: 700px) 700px, 100vw" : "(max-width: 700px) 700px, 50vw"} src={talk.image} style={talk.imagePosition ? { objectPosition: talk.imagePosition } : undefined} alt={`Sean Betts speaking at ${talk.conference}`} loading="lazy" decoding="async" onError={() => setFailed(true)} />}
  </div>;
}


function FeaturedAppearance({ talk, lead }) {
  return <article className={`${styles.feature} ${lead ? styles.lead : ''}`} aria-labelledby={`featured-${talk.id.replace(/\s/g, '-')}`}>
    <div className={styles.panelWindow}>
      <div className={styles.scrim} aria-hidden="true" />
      <EventPhoto talk={talk} />
      <InfoPopover label={`About this talk: ${talk.title}`} description={talk.description}
        className={styles.talkInfo} buttonClassName={styles.infoButton} contentClassName={styles.talkDescription} />
      <div className={styles.featureCopy}>
        <div className={styles.upright}>
          <Format type={talk.type} />
          <h3 id={`featured-${talk.id.replace(/\s/g, '-')}`}>{talk.title.replace(/[.!?]$/, '')}<span className={styles.period}>{talk.title.match(/[.!?]$/)?.[0] || '.'}</span></h3>
          <p className={styles.conference}>{talk.conference}</p>
          <p className={styles.metadata}>{talk.date} · {talk.location}</p>
        </div>
      </div>
    </div>
  </article>;
}

export default function Speaking() {
  const [year, setYear] = useState('all');
  const [format, setFormat] = useState('all');
  const [visibleCount, setVisibleCount] = useState(archive.length);
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, []);
  const filtered = archive.filter(talk => (year === 'all' || yearOf(talk) === year) && (format === 'all' || talk.type === format));
  const shown = filtered.slice(0, visibleCount);
  const updateFilter = (setter, value) => { setter(value); setVisibleCount(PAGE_SIZE); };

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
      />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" />Home</Link>
    <div className={styles.cover}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.upright}>
            <p className={styles.eyebrow}>Keynotes · Panels · Podcasts</p>
            <h1>Speaking<span className={styles.period}>.</span></h1>
            <p className={styles.intro}>Perspectives on AI, innovation and the human side of change.</p>
            <p className={styles.heroBody}>I speak at conferences and events around the world, exploring the future of technology and sharing my lived experience of autism, leadership and mental health.</p>
          </div>
        </div>
        <div className={styles.heroArt}><ResponsiveImage src="/images/game/speaking/stage-v1.webp" alt="Illustration of Sean Betts presenting on stage" width="941" height="1672" decoding="async" /></div>
      </header>
      <section className={styles.features} aria-label="Appearances in pictures">
        <h2 className="sr-only">Appearances in pictures</h2>
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
          <div className={styles.archiveList}>
            {filtered.map((talk, index) => <article hidden={index >= visibleCount} className={styles.archiveEntry} key={talk.id} aria-labelledby={`archive-${talk.id.replace(/\s/g, '-')}`}>
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
