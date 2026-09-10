import ResponsiveImage from '../components/ResponsiveImage';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import brandLogos from '../data/brandLogos';
import BrandStreet from './BrandStreet';
import BrandScenes from './BrandScenes';
import styles from './ThoughtLeadership.module.css';

// These brands already appear in the illustrated street and individual scenes.
const featuredBrands = new Set([
  "Sainsbury's", 'Chanel', 'Apple', 'Barclays', 'British Gas', 'Channel 4',
  "McDonald's", 'Warner Bros.', 'Halfords', 'Lidl', 'John Lewis',
]);
const additionalBrands = brandLogos.filter(brand => !featuredBrands.has(brand.name));

export default function ThoughtLeadership() {
  return <div className={styles.page}>
    <Seo title="AI Thought Leadership for Global Brands | Sean Betts" description="Strategic perspectives on how AI is rewiring discovery, consumer behaviour and digital marketing strategies." canonicalPath="/thought-leadership" />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Home</Link>
    <section className={styles.cover} aria-labelledby="thought-leadership-heading">
      <header className={styles.introduction}>
        <div className={styles.copy}>
          <div className={styles.copyInner}>
            <h1 id="thought-leadership-heading">AI thought leadership{' '}<span className={styles.titleLine}>for global brands<span className={styles.period}>.</span></span></h1>
            <p>Providing strategic perspectives to global brands on how AI is rewiring discovery, consumer behaviour, and digital marketing strategies.</p>
          </div>
        </div>
        <figure className={styles.portrait} aria-label="John Lewis: movers discover an extravagant armchair is too wide for a penthouse doorway.">
          <div className={styles.portraitArt}>
            <ResponsiveImage className={styles.portraitImage} src="/images/game/brand-scenes/delivery-integrated-v2.png" alt="John Lewis" fetchpriority="high" sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1000px) 40vw, (max-width: 1500px) 30vw, 450px" width="1024" height="1536" decoding="async" />
          </div>
        </figure>
      </header>
        <BrandStreet />
        <BrandScenes />
        <div className={styles.brandCredits}>
          <div className={styles.creditsInner}>
            <p className={styles.creditsLabel}>Also featuring</p>
            <ul className={styles.brandNames} aria-label="Additional global brands">
              {additionalBrands.map(brand => <li key={brand.name}>{brand.name}</li>)}
            </ul>
          </div>
        </div>
    </section>
  </div>;
}
