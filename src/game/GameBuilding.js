import { artworkForProject } from '../data/projectArtwork';
import ResponsiveImage from '../components/ResponsiveImage';
import PanelFocusCanvas from '../components/PanelFocusCanvas';
import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { pageUrl, pagePath } from '../data/siteIdentity';
import projectsData from '../data/projectsData';
import styles from './GameBuilding.module.css';

const origin = { fromPath: '/building/', fromLabel: 'Building' };

function ProjectPanel({ project, className }) {
  const { background: backgroundImage } = artworkForProject(project.id);
  return (
    <Link data-panel-focus to={pagePath(`/building/${project.id}`)} state={origin} aria-label={`Open ${project.name} project`} className={`${styles.secondaryCard} ${className} game-art`}>
      <div className={styles.scene} aria-hidden="true">
        <ResponsiveImage src={backgroundImage} alt="" width="1672" height="941" decoding="async" />
      </div>
      <div className={styles.cardWash} />
      <div className={styles.secondaryTop}><span>{project.type}</span><ArrowUpRight size={22} aria-hidden="true" /></div>
      <div className={styles.secondaryCaption}><h2>{project.name}</h2><p>{project.description}</p></div>
    </Link>
  );
}

export default function GameBuilding() {
  const [primary, pointilism, ...otherProjects] = projectsData;
  const [imageFailed, setImageFailed] = useState(false);
  const featured = otherProjects.slice(0, 2);
  return (
    <div className={styles.page}>
      <Seo title="What Sean Betts is Building | AI Products, Benchmarks and Experiments" description="Explore AI products, benchmarks and experiments Sean Betts is building, including sideBar, evaluation frameworks and applied AI workflows." canonicalPath="/building" jsonLd={{ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: projectsData.map((project, index) => ({ '@type': 'ListItem', position: index + 1, url: pageUrl(`/building/${project.id}`), name: project.name, description: project.description })) }} />
      <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Home</Link>
      <PanelFocusCanvas className={styles.panels}>
      <section className={styles.hero} aria-label="Featured projects">
        <header className={styles.introCopy}><div className={styles.upright}>
          <span className={styles.eyebrow}>Products · Prototypes · Experiments</span>
          <h1>Building<span>.</span></h1>
          <p>My independent projects in AI, software and creative coding.</p>
        </div></header>
        <Link data-panel-focus to={pagePath(`/building/${primary.id}`)} state={origin} aria-label={`Open ${primary.name} project`} className={`${styles.primary} game-art`}>
          <div className={styles.scene} aria-hidden="true"><ResponsiveImage src={artworkForProject(primary.id).background} alt="" width="1672" height="941" decoding="async" /></div>
          <div className={styles.primaryWash} />
          <div className={styles.primaryTop}><span>Featured project</span><span className={styles.status}>{primary.status}</span></div>
          <div className={styles.deviceStage}>{!imageFailed && <ResponsiveImage src={primary.heroImage} alt={primary.heroImageAlt || `${primary.name} project screenshot`} className={styles.device} onError={() => setImageFailed(true)} />}</div>
          <div className={styles.primaryCaption}><span className={styles.eyebrow}>Your context. Connected.</span><h2>{primary.name}</h2><p>{primary.description}</p><span className={styles.cta}>Open project <ArrowUpRight size={18} aria-hidden="true" /></span></div>
        </Link>
        <ProjectPanel project={pointilism} className={styles.topFeature} />
      </section>
      <section className={`${styles.featured} game-art`} aria-label="Applied AI projects">
        {featured.map((project, index) => (
          <ProjectPanel key={project.id} project={project} className={index === 0 ? styles.firstFeature : styles.lastFeature} />
        ))}
      </section>
      <section className={styles.archive} aria-label="More projects">
        <div className={styles.projectGrid}>{otherProjects.slice(2).map((project) => <Link data-panel-focus key={project.id} to={pagePath(`/building/${project.id}`)} state={origin} aria-label={`Open ${project.name} project`} className={styles.project}>
          <div className={styles.projectInner}>
          <div className={styles.projectMeta}><span>{project.type}</span><ArrowUpRight size={22} aria-hidden="true" /></div>
          <h2>{project.name}</h2><p>{project.description}</p>
          <div className={styles.projectFooter}><span>{project.date}</span><span>{project.status}</span></div>
          </div>
        </Link>)}</div>
      </section>
      </PanelFocusCanvas>
    </div>
  );
}
