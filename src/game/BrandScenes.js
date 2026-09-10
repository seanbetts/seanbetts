import ResponsiveImage from '../components/ResponsiveImage';
import styles from './BrandScenes.module.css';

const scenes = [
  {
    id: 'takeaway', artwork: 'takeaway-cast-v3.png', brand: "McDonald's", width: 1024, height: 1536,
    description: 'A chauffeur solemnly presents a fast-food takeaway on a silver tray beside a luxury limousine.',
  },
  {
    id: 'film-set', artwork: 'film-set-cast-v3.png', brand: 'Warner Bros.', width: 1672, height: 941,
    description: 'A glamorous skyline revealed as a timber-backed film set, with a stagehand supporting a prop palm tree.',
  },
  {
    id: 'getaway', artwork: 'getaway-cast-v3.png', brand: 'Halfords', width: 1672, height: 941,
    description: 'An immaculate supercar overwhelmed by camping gear and an enormous inflatable flamingo.',
  },
  {
    id: 'marina', artwork: 'marina-integrated-v2.png', brand: 'Lidl', width: 1024, height: 1536,
    description: 'A yacht guest returns with a supermarket bag overflowing with a drill, camping mat and garden gnome.',
  },
];

export default function BrandScenes() {
  return <div className={styles.panels}>
    {scenes.map(scene => <figure key={scene.id} className={`${styles.panel} ${styles[scene.id]}`} aria-label={`${scene.brand}: ${scene.description}`} style={{ '--scene-ratio': `${scene.width} / ${scene.height}` }}>
      <div className={styles.art}>
        <ResponsiveImage sizes={`(max-width: 700px) 100vw, ${scene.id === 'film-set' || scene.id === 'getaway' ? '40vw' : '30vw'}`} className={styles.environment} src={`/images/game/brand-scenes/${scene.artwork}`} alt={scene.brand} width={scene.width} height={scene.height} loading="lazy" decoding="async" />
      </div>
    </figure>)}
  </div>;
}
