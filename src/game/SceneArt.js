import { responsiveBackground } from '../components/ResponsiveImage';
import styles from './SceneArt.module.css';

export default function SceneArt({ scene = 'building', className = '', image = '/images/game/scenes.webp' }) {
  return <div aria-hidden="true" className={`${styles.art} ${className}`} data-art={scene}><div style={{ backgroundImage: responsiveBackground(image) }} className={`${styles.sprite} ${styles[scene] || styles.building}`} /></div>;
}
