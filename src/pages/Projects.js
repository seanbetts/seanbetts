import React from 'react';
import { Link } from 'react-router-dom';
import { GithubLogo, Article, Globe, Video } from "@phosphor-icons/react";
import styles from './Projects.module.css';
import projectsData from '../data/projectsData';

const Projects = () => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'github':
        return <GithubLogo size={24} />;
      case 'blog':
        return <Article size={24} />;
      case 'video':
        return <Video size={24} />;
      default:
        return <Globe size={24} />;
    }
  };

  return (
    <div className={styles.projects}>
      <h1>Projects</h1>
      <p>Welcome to my projects page. Here, you'll find a collection of my work exploring AI and marketing. From developing AI benchmarks to creating educational resources, these projects showcase practical applications of AI in the business world. Each initiative aims to push boundaries while focusing on responsible AI development. Feel free to explore and discover how I think AI is reshaping the marketing landscape.</p>
      <div className={styles.projectList}>
        {projectsData.map((project, index) => (
          <Link key={index} to={`/projects/${project.id}`} className={styles.project}>
            <div className={styles.icon}>{project.icon}</div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <div className={styles.typeIcon}>{getTypeIcon(project.type)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;