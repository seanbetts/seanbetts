import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import brandLogos from '../data/brandLogos';
import SceneArt from './SceneArt';
import BrandStreet from './BrandStreet';
import BrandScenes from './BrandScenes';
import styles from './ThoughtLeadership.module.css';

export default function ThoughtLeadership() {
  return <div className={styles.page}>
    <Seo title="AI Thought Leadership for Global Brands | Sean Betts" description="Strategic perspectives on how AI is rewiring discovery, consumer behaviour and digital marketing strategies." canonicalPath="/thought-leadership" />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Home</Link>
    <div className={styles.cover}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Ideas with real-world impact</span>
          <h1>Thought<br />leadership<span>.</span></h1>
          <p>AI strategy · Transformation · Product innovation</p>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          <div className={styles.imageWindow}><SceneArt scene="speaking" /></div>
        </div>
      </header>
      <section className={styles.brands} aria-labelledby="brands-heading">
        <div className={styles.intro}>
          <h2 id="brands-heading">Global brands<span>.</span></h2>
          <p>Providing strategic perspectives to global brands on how AI is rewiring discovery, consumer behaviour, and digital marketing strategies.</p>
        </div>
        <BrandStreet />
        <BrandScenes />
        <details className={styles.brandDirectory}>
          <summary>View all {brandLogos.length} brands</summary>
          <ul className={styles.brandNames} aria-label="Global brands">
            {brandLogos.map(brand => <li key={brand.name}>{brand.name}</li>)}
          </ul>
        </details>
      </section>
    </div>
  </div>;
}
