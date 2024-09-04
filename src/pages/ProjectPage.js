import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from "@phosphor-icons/react";
import styles from './ProjectPage.module.css';

const ProjectPage = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className={styles.projectPage}>
      <Link to="/projects" className={styles.backLink}>
        <ArrowLeft size={24} /> Back to Projects
      </Link>
      <div className={styles.projectHeader}>
        {React.cloneElement(project.icon, { size: 48 })}
        <h1>{project.name}</h1>
      </div>
      <div className={styles.projectImage}>
        <div className={styles.imagePlaceholder}></div>
      </div>
      <div className={styles.projectInfo}>
        <div className={styles.infoSection}>
          <h2>Overview</h2>
          <p><strong>Date:</strong> {project.date || 'N/A'}</p>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Technologies Used:</strong> {project.technologies?.join(', ') || 'N/A'}</p>
        </div>
        <div className={styles.infoSection}>
          <h2>Key Features</h2>
          <ul>
            {project.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className={styles.infoSection}>
          <h2>Challenges and Solutions</h2>
          <p>{project.challenges || 'No challenges reported.'}</p>
        </div>
        <div className={styles.infoSection}>
          <h2>Future Improvements</h2>
          <p>{project.futureImprovements || 'No future improvements planned at this time.'}</p>
        </div>
        <div className={styles.infoSection}>
          <h2>Project Status</h2>
          <p>{project.status || 'Status not specified'}</p>
        </div>
        <a href={project.url} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
          View Project
        </a>
      </div>
    </div>
  );
};

export default ProjectPage;