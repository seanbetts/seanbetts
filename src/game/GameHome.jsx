import ResponsiveImage from '../components/ResponsiveImage';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import styles from './GameHome.module.css';

const homeArtwork = {
  building: '/images/game/home-studies/building-studio-v5-colour.png',
  writing: '/images/game/home-studies/writing-desk-v11-sharpie.png',
  speaking: '/images/game/home-studies/speaking-rear-v5-jeans.png',
  leadership: '/images/game/home-studies/leadership-hands-v1.png',
  about: '/images/game/home-studies/about-personal-room-v3-eames.png',
};

// Match the collage's shared seam coordinates, in cover percentages.
const focusPolygons = {
  focusBuilding: '56,0 100,0 100,43 57.41,47',
  focusWriting: '0,46 23.44,48 25,100 0,100',
  focusSpeaking: '0,0 22,0 23.44,48 0,46',
  focusLeadership: '57.41,47 78,45.066 77,100 59,100',
  focusAbout: '78,45.066 100,43 100,100 77,100',
};

function CoverPanel({ scene, title, description, to, panel = scene }) {
  return <Link to={to} className={`${styles.panel} ${styles[panel]}`}>
    <ResponsiveImage data-art={scene} className={styles.panelImage} src={homeArtwork[panel]} alt="" loading="lazy" decoding="async"
      sizes={panel === 'building' ? '(max-width: 700px) max(480px, calc(100vw - 52px)), 44vw' : `(max-width: 700px) calc(100vw - 52px), ${panel === 'leadership' ? '21vw' : '25vw'}`} />
    <div className={styles.caption}><div><h2>{title}</h2><p>{description}</p></div></div>
  </Link>;
}

export default function GameHome() {
  return <>
    <Seo
      title="Sean Betts | AI Strategy, Transformation & Product Innovation"
      description="Sean Betts, Chief AI & Innovation Officer at Omnicom Media UK. Explore his AI research, products, writing and speaking."
      keywords={['Sean Betts', 'AI strategy', 'product innovation', 'business transformation', 'marketing technology', 'generative AI', 'Omnicom Media UK']}
      canonicalPath="/"
      imagePath="/images/sean-betts-profile.png"
      ogType="website"
    />
    <div className={`${styles.cover} game-art`}>
      <div className={`${styles.panel} ${styles.portrait}`}>
        <ResponsiveImage className={styles.portraitImage} sizes="(max-width: 700px) max(440px, calc(100vw - 52px)), (max-width: 1000px) 500px, (max-width: 1800px) max(500px, 37vw), 680px" src="/images/game/portrait-sean-london-v2-colour.png" alt="" fetchpriority="high" width="1024" height="1536" />
        <div className={styles.identity}>
          <h1><span className="sr-only">Sean Betts</span><ResponsiveImage src="/images/game/sean-betts.svg" alt="" aria-hidden="true" width="610" height="360" /></h1>
          <p className={styles.role}>Hands-on AI Leader</p>
          <p className={styles.expertise}>AI strategy · Product innovation · Technology leadership</p>
          <p className={styles.advocacy}>Autistic · Neurodiversity & Mental Health Speaker</p>
        </div>
      </div>
      <CoverPanel scene="speaking" title="Speaking" description="Keynotes, panels & podcasts" to="/speaking/" />
      <CoverPanel scene="building" title="Building" description="Products, prototypes & experiments" to="/building/" />
      <CoverPanel scene="writing" title="Writing" description="The Blueprint" to="/writing/" />
      <CoverPanel scene="speaking" panel="leadership" title="Thought leadership" description="AI perspectives for global brands" to="/thought-leadership/" />
      <CoverPanel scene="about" title="About" description="A little more about me" to="/about/" />
      <svg className={styles.dividers} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M22 0L25 100 M56 0L59 100 M0 46L23.44 48 M57.41 47L100 43 M78 45.066L77 100" />
      </svg>
      <svg className={styles.focusRings} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {Object.entries(focusPolygons).map(([name, points]) => <g key={name} className={styles[name]}>
          <polygon points={points} />
          <polygon points={points} className={styles.focusAccent} />
        </g>)}
      </svg>
    </div>
  </>;
}
