import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import brandLogos from '../data/brandLogos';
import SceneArt from './SceneArt';
import styles from './ThoughtLeadership.module.css';

// Unequal panels form five staggered strips rather than aligned square cells.
const panelSpans = [3, 2, 3, 3, 3, 4, 3, 4, 3, 2, 3, 3, 3, 3, 4, 4, 3, 3, 5, 4, 5];

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
        <ul className={styles.logoWall} aria-label="Global brands">
          {brandLogos.map((brand, index) => <li key={brand.name} style={{ '--panel-span': panelSpans[index] || 3 }}>
            <div className={styles.logoFace}>
              <img src={brand.src} alt={brand.name} style={{ maxWidth: brand.width }} loading="lazy" />
            </div>
          </li>)}
        </ul>
      </section>
    </div>
  </div>;
}
