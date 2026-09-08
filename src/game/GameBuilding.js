import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import projectsData from '../data/projectsData';
import SceneArt from './SceneArt';
import useDesktop from './useDesktop';
import styles from './GameBuilding.module.css';

const origin = { fromPath: '/building', fromLabel: 'Building' };

export default function GameBuilding() {
  const isDesktop = useDesktop();
  const [primary, ...otherProjects] = projectsData;
  const [imageFailed, setImageFailed] = useState(false);
  const featured = otherProjects.slice(0, 2);
  return (
    <div className={styles.page}>
      <Seo title="What Sean Betts is Building | AI Products, Benchmarks and Experiments" description="Explore AI products, benchmarks and experiments Sean Betts is building, including sideBar, evaluation frameworks and applied AI workflows." canonicalPath="/building" jsonLd={{ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: projectsData.map((project, index) => ({ '@type': 'ListItem', position: index + 1, url: `https://www.seanbetts.com/building/${project.id}`, name: project.name, description: project.description })) }} />
      <div className={styles.breadcrumb}><Link to={isDesktop ? "/map" : "/"}><ArrowLeft size={16} aria-hidden="true" /> {isDesktop ? "Back to map" : "Home"}</Link><span>02 / The workshop</span></div>
      <header className={styles.heading}>
        <div><h1>Building<span>.</span></h1></div>
        <p>Products, prototypes and experiments.<br />Exploring what AI can do in the real world.</p>
      </header>
      <section className={`${styles.featured} game-art`} aria-label="Featured projects">
        <Link to={`/building/${primary.id}`} state={origin} aria-label={`Open ${primary.name} project`} className={styles.primary}>
          <SceneArt scene="building" />
          <div className={styles.primaryWash} />
          <div className={styles.primaryTop}><span>01 / Featured project</span><span className={styles.status}>{primary.status}</span></div>
          {!imageFailed && <img src={primary.heroImage} alt="sideBar workspace on iPad" className={styles.device} onError={() => setImageFailed(true)} />}
          <div className={styles.primaryCaption}><span className={styles.eyebrow}>Your context. Connected.</span><h2>{primary.name}</h2><p>{primary.description}</p><span className={styles.cta}>Open project <ArrowUpRight size={18} aria-hidden="true" /></span></div>
        </Link>
        <div className={styles.secondary}>
          {featured.map((project, index) => <Link key={project.id} to={`/building/${project.id}`} state={origin} aria-label={`Open ${project.name} project`} className={`${styles.secondaryCard} ${index === 0 ? styles.dots : styles.research}`}>
            {index === 1 && <SceneArt scene="writing" />}
            <div className={styles.cardWash} />
            <div className={styles.secondaryTop}><span>0{index + 2} / {project.type}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
            <div className={styles.secondaryCaption}><h2>{project.name}</h2><p>{project.description}</p></div>
          </Link>)}
        </div>
      </section>
      <section className={styles.archive} aria-labelledby="archive-title">
        <div className={styles.archiveHeading}><h2 id="archive-title">More from the workshop</h2><span>{String(otherProjects.length - 2).padStart(2, '0')} project files</span></div>
        <div className={styles.projectGrid}>{otherProjects.slice(2).map((project, index) => <Link key={project.id} to={`/building/${project.id}`} state={origin} aria-label={`Open ${project.name} project`} className={styles.project}>
          <div className={styles.projectMeta}><span>{String(index + 4).padStart(2, '0')} / {project.type}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
          <h3>{project.name}</h3><p>{project.description}</p>
          <div className={styles.projectFooter}><span>{project.date}</span><span>{project.status}</span></div>
        </Link>)}</div>
      </section>
    </div>
  );
}
