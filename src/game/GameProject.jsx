import { artworkForProject } from '../data/projectArtwork';
import Custom404 from '../pages/Custom404';
import ResponsiveImage, { RecoverableImage } from '../components/ResponsiveImage';
import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { PERSON_ID, SITE_URL, pageUrl, pagePath } from '../data/siteIdentity';
import projectsData from '../data/projectsData';
import styles from './GameProject.module.css';

// Match the media column after shell, frame and inner padding. Framed
// screenshots occupy 80% of that space; diagrams and device mockups use it all.
const fullImageSizes = '(max-width: 650px) calc(100vw - 92px), (max-width: 700px) calc(100vw - 128px), (max-width: 1000px) calc(50vw - 112px), min(calc(58.333vw - 136px), 737px)';
const framedImageSizes = '(max-width: 650px) calc(80vw - 74px), (max-width: 700px) calc(80vw - 103px), (max-width: 1000px) calc(40vw - 90px), min(calc(46.667vw - 109px), 590px)';
function ProjectMedia({ project, heroImage }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [animationPaused, setAnimationPaused] = useState(false);
  const art = artworkForProject(project.id);
  const mediaFrame = project.heroImageFrame === false ? '' : styles.mediaFrame;
  return (
    <div className={`${styles.media} game-art ${project.heroVideo ? styles.video : ''}`}>
      <div className={styles.artwork} aria-hidden="true">
        <ResponsiveImage src={art.background} alt="" />
      </div>
      <div className={styles.mediaWash} />
      <div className={styles.mediaInner}>
        {project.heroVideo ? videoStarted ? (
          <iframe className={mediaFrame} src={project.heroVideo} title={`${project.name} demo`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen autoFocus />
        ) : (
          <a className={`${styles.videoPreview} ${mediaFrame}`} href={project.heroVideo} onClick={event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault(); setVideoStarted(true);
          }} aria-label={`Play ${project.name} demo`}>
            <span aria-hidden="true" className={styles.playIcon}>▶</span>
            <span>Watch {project.name} demo</span>
          </a>
        ) : project.heroAnimations?.length > 0 && !imageFailed ? (
          <div className={`${styles.animationPanel} ${mediaFrame}`}>
            <span className={styles.animationTitle}>Pixel Loader Lab</span>
            <div className={styles.animationGrid}>
              {project.heroAnimations.map(animation => <picture key={animation.src}>
                <source media="(prefers-reduced-motion: reduce)" srcSet={animation.poster} />
                <RecoverableImage src={animationPaused ? animation.poster : animation.src} alt={animation.alt} width="192" height="192" onError={() => setImageFailed(true)} />
              </picture>)}
            </div>
            <button type="button" className={styles.animationToggle} onClick={() => setAnimationPaused(paused => !paused)}>{animationPaused ? 'Play animation' : 'Pause animation'}</button>
          </div>
        ) : project.heroGallery?.length > 0 && !imageFailed ? (
          <div className={`${styles.artGrid} ${mediaFrame}`} role="group" aria-label={`${project.name} artwork`}>
            {project.heroGallery.map(image => <ResponsiveImage key={image.src} src={image.src} alt={image.alt} sizes="(max-width: 700px) 28vw, 18vw" onError={() => setImageFailed(true)} />)}
          </div>
        ) : heroImage && project.heroImageKind === 'logo' && !imageFailed ? (
          <div className={`${styles.logoPanel} ${mediaFrame} ${project.heroImageTone === 'dark' ? styles.logoDark : ''}`}>
            <ResponsiveImage src={heroImage} alt={project.heroImageAlt} onError={() => setImageFailed(true)} />
          </div>
        ) : heroImage && project.heroImageKind === 'diagram' && !imageFailed ? (
          <ResponsiveImage className={`${styles.screenshot} ${mediaFrame}`} sizes={fullImageSizes} src={heroImage} alt={project.heroImageAlt} onError={() => setImageFailed(true)} />
        ) : heroImage && !imageFailed ? (
          <ResponsiveImage className={`${styles.screenshot} ${mediaFrame} ${project.heroImageFrame === false ? '' : styles.screenshotFrame}`} sizes={project.heroImageFrame === false ? fullImageSizes : framedImageSizes} src={heroImage} alt={project.heroImageAlt || `${project.name} project screenshot`} onError={() => setImageFailed(true)} />
        ) : (
          <div className={styles.artCaption}><span aria-hidden="true" className={styles.projectIcon}>{project.icon}</span><span className={styles.eyebrow}>{project.type}</span><strong>{project.name}</strong></div>
        )}
      </div>
    </div>
  );
}

function ProjectStory({ project, origin }) {
  const { heroImage } = project;
  const backPath = pagePath(origin?.fromPath || '/building');
  const backLabel = origin?.fromLabel || 'Building';
  const isResearch = project.schemaType === 'CreativeWork';
  const projectLinkLabel = project.url?.includes('github.com/') ? 'View on GitHub' : 'Visit project';
  return (
    <article className={styles.page}>
      <Seo title={`${project.name} | What Sean Betts is Building`} description={`Explore ${project.name}, a ${project.type} project by Sean Betts. ${project.description}`} canonicalPath={`/building/${project.id}`} imagePath={heroImage || '/images/sean-betts-profile.png'} keywords={['Sean Betts', project.name, project.type, ...(project.technologies || [])]} ogType="article" jsonLd={{ '@context': 'https://schema.org', '@type': project.schemaType || (project.technologies ? 'SoftwareApplication' : 'CreativeWork'), name: project.name, description: project.description, url: pageUrl(`/building/${project.id}`), '@id': `${pageUrl(`/building/${project.id}`)}#project`, mainEntityOfPage: { '@id': `${pageUrl(`/building/${project.id}`)}#webpage` }, image: new URL(heroImage || '/images/sean-betts-profile.png', SITE_URL).href, author: { '@id': PERSON_ID } }} />
      <Link to={backPath} className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Back to {backLabel}</Link>
      <div className={styles.panels}>
        <header className={styles.hero}>
          <div className={styles.introduction}><div className={styles.upright}>
            <div className={styles.metadata}><span>{project.type}</span><span className={styles.status}>{project.status}</span></div>
            <h1>{project.name}<span className={styles.period} aria-hidden="true">.</span></h1>
            <p className={styles.summary}>{project.description}</p>
            <span className={styles.date}>{project.role && <>{project.role} · </>}{project.date}</span>
            {project.url && <a className={styles.cta} href={project.url} target="_blank" rel="noopener noreferrer">{projectLinkLabel}<ArrowUpRight size={20} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
            {project.projectNote && <p className={styles.projectNote}>{project.projectNote}</p>}
          </div></div>
          <ProjectMedia project={project} heroImage={heroImage} />
        </header>
        <div className={styles.story}>
          <section className={styles.featuresPanel} aria-labelledby="project-features-title"><div className={styles.upright}>
            <span className={styles.eyebrow}>{isResearch ? 'The investigation' : 'In practice'}</span>
            <h2 id="project-features-title">{isResearch ? 'How it works' : 'What it does'}<span className={styles.period} aria-hidden="true">.</span></h2>
            <ol className={styles.features}>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ol>
          </div></section>
          <section className={styles.narrative} aria-labelledby="project-challenges-title"><div className={styles.upright}>
            <span className={styles.eyebrow}>Behind the work</span>
            <h2 id="project-challenges-title">The challenge<span className={styles.period} aria-hidden="true">.</span></h2>
            <p>{project.challenges}</p>
            {project.learnings && <div className={styles.learnings}><h3>What I learned</h3><p>{project.learnings}</p></div>}
          </div></section>
        </div>
        {(project.technologies?.length > 0 || project.topics?.length > 0) && <section className={styles.tools} aria-labelledby="project-tools-title"><div className={styles.toolsInner}>
          <h2 id="project-tools-title" className={styles.toolsLabel}>{isResearch ? 'Tools & methods' : 'Built with'}</h2>
          <div>
            {project.technologies?.length > 0 && <ul className={styles.technologies}>{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>}
            {project.topics?.length > 0 && <ul className={styles.topics}>{project.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>}
          </div>
        </div></section>}
      </div>
    </article>
  );
}

export default function GameProject() {
  const { id } = useParams();
  const location = useLocation();
  const project = projectsData.find(project => project.id === id?.toLowerCase());
  if (!project) return <Custom404 />;
  return <ProjectStory key={id} project={project} origin={location.state} />;
}
