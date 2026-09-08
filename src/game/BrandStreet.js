import brandLogos from '../data/brandLogos';
import styles from './BrandStreet.module.css';

// Sign positions are percentages of the original illustration, so the scene and
// original brand artwork scale and pan together without changing alignment.
const signs = [
  { name: "Sainsbury's", left: 7.2, top: 38.8, width: 14.3, height: 6.2 },
  { name: 'Chanel', left: 32.3, top: 38, width: 11.4, height: 6.6 },
  { name: 'Apple', left: 56.3, top: 28.5, width: 3.5, height: 10.1, light: true },
  { name: 'Barclays', left: 74.2, top: 39.8, width: 13.7, height: 5.6 },
  { name: 'British Gas', left: 69.3, top: 65.2, width: 7.7, height: 5.6 },
  { name: 'Channel 4', left: 25.2, top: 61, width: 1.7, height: 10.5 },
];

export default function BrandStreet() {
  return <figure className={styles.street}>
    <div className={styles.viewport} tabIndex={0} role="region" aria-label="Illustrated brand high street" aria-describedby="street-pan-hint">
      <div className={styles.scene}>
        <img className={styles.environment} src="/images/game/brand-street/street-v1.png" alt="" width="2172" height="724" loading="lazy" />
        {signs.map(sign => {
          const brand = brandLogos.find(item => item.name === sign.name);
          return <div key={sign.name} className={`${styles.sign} ${sign.light ? styles.light : ''}`} style={{ left: `${sign.left}%`, top: `${sign.top}%`, width: `${sign.width}%`, height: `${sign.height}%` }}>
            <img src={brand.src} alt={brand.name} />
          </div>;
        })}
      </div>
    </div>
    <figcaption id="street-pan-hint" className={styles.hint}>Swipe or scroll sideways to explore the street.</figcaption>
  </figure>;
}
