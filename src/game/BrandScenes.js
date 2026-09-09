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
  {
    id: 'getaway', brand: 'Halfords', width: 1672, height: 941,
    description: 'An immaculate supercar overwhelmed by camping gear and an enormous inflatable flamingo.',
    sign: { left: '14%', top: '17.5%', width: '25%', height: '6%', transform: 'skewY(7deg)' },
  },
  {
    id: 'marina', brand: 'Lidl', width: 1024, height: 1536,
    description: 'A yacht guest returns with a supermarket bag overflowing with a drill, camping mat and garden gnome.',
    sign: { left: '21%', top: '57%', width: '24%', height: '16%', transform: 'skew(-6deg, 5deg)' },
  },
];

export default function BrandScenes() {
  return <div className={styles.panels}>
    {scenes.map(scene => <figure key={scene.id} className={`${styles.panel} ${styles[scene.id]}`} aria-label={`${scene.brand}: ${scene.description}`} style={{ '--scene-ratio': `${scene.width} / ${scene.height}` }}>
      <div className={styles.art}>
        <img className={styles.environment} src={`/images/game/brand-scenes/${scene.id}-v1.png`} alt="" width={scene.width} height={scene.height} loading="lazy" decoding="async" />
        <img className={styles.logo} src={brandLogos.find(brand => brand.name === scene.brand).src} alt={scene.brand} style={scene.sign} />
      </div>
    </figure>)}
  </div>;
}
