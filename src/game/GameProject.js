import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, MapTrifold } from '@phosphor-icons/react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import projectsData from '../data/projectsData';
import SceneArt from './SceneArt';
import styles from './GameProject.module.css';

const tabs = ['Overview', 'Features', 'Tech'];
// These two record paths have no corresponding asset in the existing public folder.
const missingImages = ['/images/projects/xxx.jpg', '/images/projects/llm-search-analysis-hero.png'];

function ProjectDossier({ project, index, origin }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const tabRefs = useRef([]);
  const heroImage = missingImages.includes(project.heroImage) ? null : project.heroImage;
  const backPath = origin?.fromPath || '/building';
  const backLabel = origin?.fromLabel || 'Building';
  const onTabKeyDown = event => {
    const next = event.key === 'ArrowRight' ? (selectedTab + 1) % tabs.length : event.key === 'ArrowLeft' ? (selectedTab + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setSelectedTab(next);
    tabRefs.current[next].focus();
  };
  return (
    <article className={styles.page}>
      <Seo title={`${project.name} | What Sean Betts is Building`} description={`Explore ${project.name}, a ${project.type} project by Sean Betts. ${project.description}`} canonicalPath={`/building/${project.id}`} imagePath={heroImage || '/images/sean-betts-profile.png'} keywords={['Sean Betts', project.name, project.type, ...(project.technologies || [])]} ogType="article" jsonLd={{ '@context': 'https://schema.org', '@type': project.technologies ? 'SoftwareApplication' : 'CreativeWork', name: project.name, description: project.description, url: `https://www.seanbetts.com/building/${project.id}`, image: heroImage || '/images/sean-betts-profile.png', author: { '@type': 'Person', name: 'Sean Betts', url: 'https://www.seanbetts.com' } }} />
      <nav className={styles.breadcrumb} aria-label="Project navigation"><Link to={backPath}><ArrowLeft size={16} aria-hidden="true" /> Back to {backLabel}</Link><span>Building / Project file {String(index + 1).padStart(2, '0')}</span></nav>
      <header className={styles.heading}><div><h1>{project.name}</h1></div><span className={styles.status}>{project.status}</span></header>
      <div className={styles.dossier}>
        <div className={styles.mediaColumn}>
          <div className={`${styles.media} game-art ${project.heroVideo ? styles.video : ''}`}>
            <SceneArt scene="building" className={styles.workshopArt} />
            <div className={styles.mediaWash} />
            {project.heroVideo ? <iframe src={project.heroVideo} title={`${project.name} demo`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : heroImage && !imageFailed ? <img src={heroImage} alt={`${project.name} project screenshot`} onError={() => setImageFailed(true)} /> : <div className={styles.fallback}><span aria-hidden="true">{project.icon}</span><p>From the workshop</p><strong>{project.name}</strong></div>}
          </div>
          <div className={styles.mediaCaption}><span>{project.type}</span><span>{project.date}</span></div>
          <div className={styles.description}><span className={styles.eyebrow}>The idea</span><p>{project.description}</p></div>
        </div>
        <div className={styles.details}>
          <div className={styles.detailsHeading}><span className={styles.eyebrow}>Project dossier</span><ArrowUpRight size={18} aria-hidden="true" /></div>
          <div role="tablist" aria-label="Project details" className={styles.tabs}>
            {tabs.map((tab, tabIndex) => <button key={tab} type="button" role="tab" id={`project-tab-${tabIndex}`} aria-controls={`project-panel-${tabIndex}`} aria-selected={selectedTab === tabIndex} tabIndex={selectedTab === tabIndex ? 0 : -1} ref={element => { tabRefs.current[tabIndex] = element; }} onClick={() => setSelectedTab(tabIndex)} onKeyDown={onTabKeyDown}>{tab}</button>)}
          </div>
          <div role="tabpanel" id={`project-panel-${selectedTab}`} aria-labelledby={`project-tab-${selectedTab}`} tabIndex={0} className={styles.panel}>
            {selectedTab === 0 && <><h2>Challenges & solutions</h2><p>{project.challenges}</p><h2>What comes next</h2><p>{project.futureImprovements}</p></>}
            {selectedTab === 1 && <><h2>What it does</h2><ol className={styles.features}>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ol></>}
            {selectedTab === 2 && <>{project.technologies?.length ? <><h2>Built with</h2><ul className={styles.technologies}>{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul></> : <p>This project focuses on ideas and education.</p>}{project.topics?.length > 0 && <><h2>Topics covered</h2><ul className={styles.topics}>{project.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></>}</>}
          </div>
          <div className={styles.actions}><a href={project.url} target="_blank" rel="noopener noreferrer">View project <ArrowUpRight size={18} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a><Link to="/map">Back to map <MapTrifold size={18} aria-hidden="true" /></Link></div>
        </div>
      </div>
    </article>
  );
}

export default function GameProject() {
  const { id } = useParams();
  const location = useLocation();
  const index = projectsData.findIndex(project => project.id === id);
  if (index < 0) return <div className={`${styles.page} ${styles.notFound}`}><Seo title="Project not found | Sean Betts" description="Explore Sean Betts's products, prototypes and experiments." canonicalPath={`/building/${id}`} noindex /><p className={styles.eyebrow}>Project file unavailable</p><h1>Project not found</h1><p>This project isn't in the workshop. Find your next stop in the collection or on the map.</p><div className={styles.actions}><Link to="/building"><ArrowLeft size={16} aria-hidden="true" /> Back to Building</Link><Link to="/map">Back to map</Link></div></div>;
  return <ProjectDossier key={id} project={projectsData[index]} index={index} origin={location.state} />;
}
