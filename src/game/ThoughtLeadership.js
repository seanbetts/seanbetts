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
    <Seo title="AI Perspectives for Business Leaders | Sean Betts" description="I help business leaders understand how AI is changing discovery, consumer behaviour and customer experiences—and what those changes mean for their organisations." canonicalPath="/thought-leadership" />
    <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Home</Link>
    <section className={styles.cover} aria-labelledby="thought-leadership-heading">
      <header className={styles.introduction}>
        <div className={styles.copy}>
          <div className={styles.copyInner}>
            <h1 id="thought-leadership-heading">AI perspectives{' '}<span className={styles.titleLine}>for business leaders<span className={styles.period}>.</span></span></h1>
            <p>I help business leaders understand how AI is changing discovery, consumer behaviour and customer experiences—and what those changes mean for their organisations.</p>
          </div>
        </div>
        <figure className={styles.portrait} aria-label="John Lewis: movers discover an extravagant armchair is too wide for a penthouse doorway.">
          <div className={styles.portraitArt}>
            <ResponsiveImage className={styles.portraitImage} src="/images/game/brand-scenes/delivery-integrated-v3-colour.png" alt="John Lewis" fetchpriority="high" sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1000px) 40vw, (max-width: 1500px) 30vw, 450px" width="1024" height="1536" decoding="async" />
          </div>
        </figure>
      </header>
        <section className={styles.perspective} aria-labelledby="perspective-heading">
          <div className={styles.perspectiveInner}>
            <h2 id="perspective-heading">Informed by building. Grounded in business<span className={styles.period}>.</span></h2>
            <p>My perspectives draw on building and testing AI systems, developing products and leading technology teams. Through executive briefings, workshops and strategic conversations, I help leaders explore emerging capabilities, challenge assumptions and make informed decisions about where AI can create value.</p>
          </div>
        </section>
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
