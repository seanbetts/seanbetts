import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import brandLogos from '../data/brandLogos';
import SceneArt from './SceneArt';
import styles from './ThoughtLeadership.module.css';

export default function ThoughtLeadership() {
  return <div className={styles.page}>
    <Seo title="AI Thought Leadership for Global Brands | Sean Betts" description="Strategic perspectives on how AI is rewiring discovery, consumer behaviour and digital marketing strategies." canonicalPath="/thought-leadership" />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Back to the cover</Link>
    <header className={styles.hero}>
      <SceneArt scene="speaking" />
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>Ideas with real-world impact</span>
        <h1>Thought<br />leadership<span>.</span></h1>
        <p>AI strategy, transformation &amp; product innovation.</p>
      </div>
    </header>
    <section className={styles.brands} aria-labelledby="brands-heading">
      <div className={styles.intro}>
        <h2 id="brands-heading">AI thought leadership<br />for global brands</h2>
        <p>Providing strategic perspectives to global brands on how AI is rewiring discovery, consumer behaviour, and digital marketing strategies.</p>
      </div>
      <ul className={styles.logoGrid} aria-label="Global brands">
        {brandLogos.map(brand => <li key={brand.name}><img src={brand.src} alt={brand.name} style={{ maxWidth: brand.width }} loading="lazy" /></li>)}
      </ul>
    </section>
    <section className={styles.next} aria-label="Explore my perspectives">
      <Link to="/writing"><span>Read the thinking</span><h2>Writing &amp; The Blueprint <ArrowUpRight size={28} aria-hidden="true" /></h2></Link>
      <Link to="/speaking"><span>Join the conversation</span><h2>Speaking &amp; keynotes <ArrowUpRight size={28} aria-hidden="true" /></h2></Link>
    </section>
  </div>;
}
