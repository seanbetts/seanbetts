import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import brandLogos from '../data/brandLogos';
import BrandStreet from './BrandStreet';
import BrandScenes from './BrandScenes';
import styles from './ThoughtLeadership.module.css';

export default function ThoughtLeadership() {
  return <div className={styles.page}>
    <Seo title="AI Thought Leadership for Global Brands | Sean Betts" description="Strategic perspectives on how AI is rewiring discovery, consumer behaviour and digital marketing strategies." canonicalPath="/thought-leadership" />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Home</Link>
    <header className={styles.introduction}>
      <h1 id="thought-leadership-heading">AI thought leadership{' '}<span className={styles.titleLine}>for global brands<span className={styles.period}>.</span></span></h1>
      <p>Providing strategic perspectives to global brands on how AI is rewiring discovery, consumer behaviour, and digital marketing strategies.</p>
    </header>
    <section className={styles.cover} aria-labelledby="thought-leadership-heading">
        <BrandStreet />
        <BrandScenes />
        <details className={styles.brandDirectory}>
          <summary>View all {brandLogos.length} brands</summary>
          <ul className={styles.brandNames} aria-label="Global brands">
            {brandLogos.map(brand => <li key={brand.name}>{brand.name}</li>)}
          </ul>
        </details>
    </section>
  </div>;
}
