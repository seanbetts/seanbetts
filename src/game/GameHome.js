import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import SceneArt from './SceneArt';
import styles from './GameHome.module.css';

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
      description="Sean Betts is Chief AI & Innovation Officer at Omnicom Media UK, an independent AI researcher and builder focused on AI strategy, product innovation and business transformation."
      keywords={['Sean Betts', 'AI strategy', 'product innovation', 'business transformation', 'marketing technology', 'generative AI', 'Omnicom Media UK']}
      canonicalPath="/"
      imagePath="/images/sean-betts-profile.png"
      ogType="website"
    />
    <div className={`${styles.cover} game-art`}>
      <Link to="/about" className={`${styles.panel} ${styles.portrait}`} aria-label="About Sean Betts">
        <img className={styles.portraitImage} src="/images/game/portrait-sean-london-candidate-v1.png" alt="" fetchpriority="high" width="1024" height="1536" />
        <div className={styles.identity}>
          <h1><span className="sr-only">Sean Betts</span><img src="/images/game/sean-betts.svg" alt="" aria-hidden="true" width="610" height="360" /></h1>
          <p className={styles.role}>Hands-on AI Leader</p>
          <p className={styles.expertise}>AI strategy · Transformation · Product innovation</p>
          <p className={styles.advocacy}>Autistic · Neurodiversity & Mental Health Speaker</p>
        </div>
      </Link>
      <CoverPanel scene="building" title="Building" description="Products, prototypes & experiments" to="/building" />
      <CoverPanel scene="writing" title="Writing" description="The Blueprint" to="/writing" />
      <CoverPanel scene="speaking" title="Speaking" description="Keynotes, panels & podcasts" to="/speaking" />
      <CoverPanel scene="about" title="About" description="A little more about me" to="/about" />
      <CoverPanel scene="speaking" panel="leadership" title="Thought leadership" description="AI perspectives for global brands" to="/thought-leadership" />
      <svg className={styles.dividers} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M22 0L25 100 M56 0L59 100 M0 46L23.44 48 M57.41 47L100 43 M78 45.066L77 100" />
      </svg>
    </div>
  </>;
}
