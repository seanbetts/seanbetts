import styles from './SceneArt.module.css';

export default function SceneArt({ scene = 'building', className = '' }) {
  return <div aria-hidden="true" className={`${styles.art} ${className}`} data-art={scene}><div className={`${styles.sprite} ${styles[scene] || styles.building}`} /></div>;
}
