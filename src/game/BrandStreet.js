import ResponsiveImage from '../components/ResponsiveImage';
import styles from './BrandStreet.module.css';

export default function BrandStreet() {
  return <figure className={styles.street}>
    <div className={styles.viewport} tabIndex={0} role="region" aria-label="Illustrated brand high street" aria-describedby="street-pan-hint">
      <div className={styles.scene}>
        <ResponsiveImage sizes="(max-width: 1000px) 1000px, 100vw" className={styles.environment} src="/images/game/brand-street/street-integrated-v4.png" alt="Illustrated high street with Sainsbury's, Chanel, Apple and Barclays shopfronts, a Channel 4 poster and a British Gas van." width="2172" height="724" loading="lazy" />
      </div>
    </div>
    <figcaption id="street-pan-hint" className={styles.hint}>Swipe or scroll sideways to explore the street.</figcaption>
  </figure>;
}
