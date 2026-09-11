import { artworkForProject } from '../data/projectArtwork';
import ResponsiveImage from '../components/ResponsiveImage';
import PanelFocusCanvas from '../components/PanelFocusCanvas';
import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router';
import Seo from '../components/Seo';
import { pageUrl, pagePath } from '../data/siteIdentity';
import projectsData, { projectsByStartDate } from '../data/projectsData';
import styles from './GameBuilding.module.css';

const origin = { fromPath: '/building/', fromLabel: 'Building' };

function ProjectPanel({ project, className }) {
  return (
    <Link data-panel-focus to={pagePath(`/building/${project.id}`)} state={origin} aria-label={`Open ${project.name} project`} className={`${styles.secondaryCard} ${className}`}>
      <div className={styles.secondaryTop}><span>{project.type}</span><ArrowUpRight size={22} aria-hidden="true" /></div>
      <div className={styles.secondaryCaption}>
        <h2>{project.name}</h2><p>{project.description}</p>
        <div className={styles.projectFooter}><span>{project.date}</span><span>{project.status}</span></div>
      </div>
    </Link>
  );
}

export default function GameBuilding() {
  const primary = projectsData.find(project => project.id === 'sidebar');
  const collection = projectsByStartDate.filter(project => project.id !== primary.id);
  const featured = collection.slice(0, 2);
  const otherProjects = collection.slice(2);
  const orderedProjects = [primary, ...collection];
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <div className={styles.page}>
      <Seo title="What Sean Betts is Building | AI Products, Benchmarks and Experiments" description="Explore AI products, benchmarks and experiments Sean Betts is building, including sideBar, evaluation frameworks and applied AI workflows." canonicalPath="/building" jsonLd={{ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: orderedProjects.map((project, index) => ({ '@type': 'ListItem', position: index + 1, url: pageUrl(`/building/${project.id}`), name: project.name, description: project.description })) }} />
      <Link to="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Home</Link>
      <PanelFocusCanvas className={styles.panels}>
      <section className={styles.hero} aria-label="Featured projects">
        <header className={styles.introCopy}><div className={styles.upright}>
          <span className={styles.eyebrow}>Products · Prototypes · Experiments</span>
          <h1>Building<span>.</span></h1>
          <p className={styles.introLead}>Curiosity is usually where I start. I build things I want to use, investigate questions I can’t leave alone, and make room for experiments that are simply fun.</p>
          <p>My projects range from personal AI assistants and travel tools to research, automation and generative art. I work across the product, interface and code, exploring how an idea becomes something useful or opens up another question.</p>
          <p>For me, hands-on work and AI strategy are inseparable. I need to use and build with AI to understand how it works, where it falls short and where it can create value. That understanding shapes my strategy, while the strategic questions shape what I explore and build next.</p>
        </div></header>
        <Link data-panel-focus to={pagePath(`/building/${primary.id}`)} state={origin} aria-label={`Open ${primary.name} project`} className={`${styles.primary} game-art`}>
          <div className={styles.scene} aria-hidden="true"><ResponsiveImage src={artworkForProject(primary.id).background} alt="" width="1672" height="941" decoding="async" /></div>
          <div className={styles.primaryWash} />
          <div className={styles.primaryTop}><span>Featured project</span><span className={styles.status}>{primary.status}</span></div>
          {/* The 3137:2450 screenshot is contained in a 230/260/300px-high stage.
              Request its painted width, rather than the much wider stage. */}
          <div className={styles.deviceStage}>{!imageFailed && <ResponsiveImage src={primary.heroImage} alt={primary.heroImageAlt || `${primary.name} project screenshot`} sizes="(max-width: 700px) min(calc(100vw - 84px), 295px), (max-width: 1000px) 333px, 385px" className={styles.device} onError={() => setImageFailed(true)} />}</div>
          <div className={styles.primaryCaption}><span className={styles.eyebrow}>Your context. Connected.</span><h2>{primary.name}</h2><p>{primary.description}</p><span className={styles.cta}>Open project <ArrowUpRight size={18} aria-hidden="true" /></span></div>
        </Link>
      </section>
      <section className={styles.featured} aria-label="Recent projects">
        {featured.map((project, index) => (
          <ProjectPanel key={project.id} project={project} className={index === 0 ? styles.firstFeature : styles.lastFeature} />
        ))}
      </section>
      <section className={styles.archive} aria-label="More projects">
        <div className={styles.projectGrid}>{otherProjects.map((project) => <Link data-panel-focus key={project.id} to={pagePath(`/building/${project.id}`)} state={origin} aria-label={`Open ${project.name} project`} className={styles.project}>
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
