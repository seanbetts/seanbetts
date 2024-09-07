import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from "@phosphor-icons/react";
import { GithubLogo, Article, Globe, Video } from "@phosphor-icons/react";
import styles from './ProjectPage.module.css';

const ProjectPage = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [imageError, setImageError] = useState(false);

  if (!project) {
    return <div>Project not found</div>;
  }

  const handleImageError = () => {
    setImageError(true);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'github':
        return {
          icon: <GithubLogo size={36} />,
          text: 'GitHub Project'
        };
      case 'blog':
        return {
          icon: <Article size={36} />,
          text: 'Writing Project'
        };
      case 'video':
        return {
          icon: <Video size={36} />,
          text: 'Video Project'
        };
      default:
        return {
          icon: <Globe size={36} />,
          text: 'Web Project'
        };
    }
  };

  const { icon, text } = getTypeIcon(project.type);

  const renderHeroContent = () => {
    if (project.heroVideo) {
      return (
        <div className={styles.projectVideo}>
          <iframe
            src={project.heroVideo}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title={`${project.name} demo`}
          ></iframe>
        </div>
      );
    } else if (project.heroImage && !imageError) {
      return (
        <div className={styles.projectImage}>
          <img
            src={project.heroImage}
            alt={`${project.name} hero`}
            onError={handleImageError}
          />
        </div>
      );
    } else {
      return (
        <div className={styles.imagePlaceholder}>
        </div>
      );
    }
  };

  return (
    <div className={styles.projectPage}>
      <Helmet>
        <title>{`${project.name} - Sean Betts' Projects`}</title>
        <meta name="description" content={`Explore ${project.name}, an ${project.type} project by Sean Betts. ${project.description.slice(0, 150)}...`} />
        <meta name="keywords" content={`Sean Betts, ${project.name}, ${project.type}, ${project.technologies?.join(', ')}`} />
        <meta property="og:title" content={`${project.name} - Sean Betts' Projects`} />
        <meta property="og:description" content={`Discover ${project.name}, a ${project.type} project by Sean Betts. ${project.description.slice(0, 200)}...`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://github.com/seanbetts/seanbetts/blob/afbf46d811138cec479b66d741aab0a9e23bbdd5/public/images/sean-betts-profile.png" />
      </Helmet>

    <Link to="/projects" className={styles.backLink}>
      <ArrowLeft size={24} /> Back to Projects
    </Link>
    <div className={styles.projectHeader}>
      {React.cloneElement(project.icon, { size: 48 })}
      <h1>{project.name}</h1>
    </div>
    <div className={styles.projectHero}>
      {renderHeroContent()}
    </div>
    <div className={styles.projectInfo}>
      <div className={styles.infoSection}>
        <div className={styles.overviewHeader}>
          <h2>Overview</h2>
          <div className={styles.typeInfo}>
            {icon}
            <span>{text}</span>
          </div>
        </div>
        <div className={styles.infoDetails}> 
          <div className={styles.infoRow}> {/* Updated className */}
            <span className={styles.label}>DATE:</span> {/* Updated className */}
            <span className={styles.value}>{project.date || 'N/A'}</span> {/* Updated className */}
          </div>
          <div className={styles.infoRow}> {/* Updated className */}
            <span className={styles.label}>DESCRIPTION:</span> {/* Updated className */}
            <span className={styles.value}>{project.description}</span> {/* Updated className */}
          </div>
        </div>
      </div>
      {project.technologies && (
        <div className={styles.infoSection}>
          <h2>Technologies Used</h2>
          {project.technologies.join(', ') + '.'}
        </div>
      )}
      {project.topics && (
        <div className={styles.infoSection}>
          <h2>Topics Covered</h2>
          {project.topics.length > 10 ? (
            <p>{project.topics.join(', ') + '.'}</p>
          ) : (
            <ol>
              {project.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ol>
          )}
        </div>          
      )}
      <div className={styles.infoSection}>
        <h2>Key Features</h2>
        <ul>
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className={styles.infoSection}>
        <h2>Challenges and Solutions</h2>
        <p>{project.challenges}</p>
      </div>
      <div className={styles.infoSection}>
        <h2>Future Improvements</h2>
        <p>{project.futureImprovements}</p>
      </div>
      <div className={styles.projectFooter}>
        <div className={styles.infoSection}>
          <h2>Project Status</h2>
          <p>{project.status}</p>
        </div>
        <a href={project.url} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
          View Project
        </a>
    </div>
    </div>
  </div>
  );
};

export default ProjectPage;