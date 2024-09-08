import React from 'react';
import { Helmet } from 'react-helmet';
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

  const projectListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": projectsData.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.seanbetts.com/projects/${project.id}`,
      "name": project.name,
      "description": project.description
    }))
  };

  return (
    <div className={styles.projects}>
      <Helmet>
        <title>Sean Betts' AI and Marketing Projects</title>
        <link rel="canonical" href="https://www.seanbetts.com/projects" />
        <meta name="description" content="Explore Sean Betts' innovative AI and marketing projects. Discover cutting-edge applications of AI in business and responsible development practices." />
        <meta name="keywords" content="AI projects, marketing innovation, responsible AI, Sean Betts, technology leadership" />
        <meta property="og:site_name" content="Sean Betts" />
        <meta property="og:url" content="https://www.seanbetts.com/projects" />
        <meta property="og:title" content="Sean Betts' AI & Marketing Projects" />
        <meta property="og:description" content="Discover innovative AI and marketing projects by Sean Betts, showcasing practical applications and responsible development." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/sean-betts-profile.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@seanbetts" />
        <meta name="twitter:title" content="Sean Betts' AI and Marketing Projects" />
        <meta name="twitter:description" content="Discover innovative AI and marketing projects by Sean Betts, showcasing practical applications and responsible development." />
        <meta name="twitter:image" content="/images/sean-betts-profile.png" />
        <script type="application/ld+json">
          {JSON.stringify(projectListSchema)}
        </script>
      </Helmet>

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