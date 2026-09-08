import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import SceneArt from './SceneArt';
import styles from './GameHome.module.css';

const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sean Betts',
    url: 'https://www.seanbetts.com',
    description: 'Sean Betts: Chief AI & Innovation Officer, AI researcher and builder focused on AI strategy, product innovation and business transformation.',
    // The site has no search route, so do not advertise the legacy SearchAction.
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sean Betts',
    jobTitle: 'Chief AI & Innovation Officer',
    description: 'AI Researcher & Developer, Neurodiversity Advocate',
    url: 'https://www.seanbetts.com',
    sameAs: [
      'https://www.linkedin.com/in/seanbetts/',
      'https://github.com/seanbetts',
      'https://twitter.com/seanbetts',
      'https://bsky.app/profile/seanbetts.com',
    ],
  },
];

function CoverPanel({ scene, title, description, to, panel = scene }) {
  return <Link to={to} className={`${styles.panel} ${styles[panel]}`}>
    <SceneArt scene={scene} />
    <div className={styles.caption}><div><h2>{title}</h2><p>{description}</p></div></div>
  </Link>;
}

export default function GameHome() {
  return <>
    <Seo
      title="Sean Betts | AI Strategy, Transformation & Product Innovation"
      description="Sean Betts is Chief AI & Innovation Officer at Omnicom Media Group UK, an independent AI researcher and builder focused on AI strategy, product innovation and business transformation."
      keywords={['Sean Betts', 'AI strategy', 'product innovation', 'business transformation', 'marketing technology', 'generative AI', 'Omnicom Media Group UK']}
      canonicalPath="/"
      imagePath="/images/sean-betts-profile.png"
      ogType="website"
      jsonLd={homeSchema}
    />
    <div className={`${styles.cover} game-art`}>
      <Link to="/about" className={`${styles.panel} ${styles.portrait}`} aria-label="About Sean Betts">
        <img className={styles.portraitImage} src="/images/game/portrait.webp" alt="" fetchpriority="high" width="1024" height="1536" />
        <div className={styles.identity}>
          <h1><span className="sr-only">Sean Betts</span><img src="/images/game/sean-betts.svg" alt="" aria-hidden="true" width="610" height="360" /></h1>
          <p className={styles.role}>Hands-on AI Leader</p>
          <p className={styles.expertise}>AI strategy · Transformation · Product innovation</p>
          <p className={styles.advocacy}>Autistic · Neurodiversity & Mental Health Speaker</p>
        </div>
      </Link>
      <CoverPanel scene="building" title="Building" description="Products, prototypes & experiments" to="/building" />
      <CoverPanel scene="writing" title="Writing" description="The Blueprint & beyond" to="/writing" />
      <CoverPanel scene="speaking" title="Speaking" description="Keynotes, panels & conversations" to="/speaking" />
      <CoverPanel scene="about" title="About" description="The story so far" to="/about" />
      <CoverPanel scene="speaking" panel="leadership" title="Thought leadership" description="AI perspectives for global brands" to="/thought-leadership" />
      <svg className={styles.dividers} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M22 0L25 100 M56 0L59 100 M0 46L23.44 48 M57.41 47L100 43 M78 45.066L77 100" />
      </svg>
    </div>
  </>;
}
