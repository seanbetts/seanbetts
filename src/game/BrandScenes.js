import brandLogos from '../data/brandLogos';
import styles from './BrandScenes.module.css';

const scenes = [
  {
    id: 'takeaway', brand: "McDonald's", width: 1024, height: 1536,
    description: 'A chauffeur solemnly presents a fast-food takeaway on a silver tray beside a luxury limousine.',
    sign: { left: '44.2%', top: '41.2%', width: '14%', height: '8%' },
  },
  {
    id: 'film-set', brand: 'Warner Bros.', width: 1672, height: 941,
    description: 'A glamorous skyline revealed as a timber-backed film set, with a stagehand supporting a prop palm tree.',
    sign: { left: '44.5%', top: '64%', width: '11%', height: '15%' },
  },
];

export default function BrandScenes() {
  return <div className={styles.panels}>
    {scenes.map(scene => <figure key={scene.id} className={`${styles.panel} ${styles[scene.id]}`} aria-label={`${scene.brand}: ${scene.description}`}>
      <div className={styles.art}>
        <img className={styles.environment} src={`/images/game/brand-scenes/${scene.id}-v1.png`} alt="" width={scene.width} height={scene.height} loading="lazy" decoding="async" />
        <img className={styles.logo} src={brandLogos.find(brand => brand.name === scene.brand).src} alt={scene.brand} style={scene.sign} />
      </div>
    </figure>)}
  </div>;
}
