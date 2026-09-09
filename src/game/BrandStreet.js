import styles from './BrandStreet.module.css';

export default function BrandStreet() {
  return <figure className={styles.street}>
    <div className={styles.viewport} tabIndex={0} role="region" aria-label="Illustrated brand high street" aria-describedby="street-pan-hint">
      <div className={styles.scene}>
        <img className={styles.environment} src="/images/game/brand-street/street-integrated-v3.png" alt="Illustrated high street with Sainsbury's, Chanel, Apple and Barclays shopfronts, a Channel 4 poster and a British Gas van." width="2172" height="724" loading="lazy" />
      </div>
    </div>
    <figcaption id="street-pan-hint" className={styles.hint}>Swipe or scroll sideways to explore the street.</figcaption>
  </figure>;
}
