import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { GithubLogo, Article, Globe, Video } from "@phosphor-icons/react";
import styles from './Building.module.css';
import projectsData from '../data/projectsData';

const Building = () => {
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
      "url": `https://www.seanbetts.com/building/${project.id}`,
      "name": project.name,
      "description": project.description
    }))
  };

  return (
    <div className={styles.projects}>
      <Helmet>
        <title>What Sean Betts is Building - AI and Marketing Innovation</title>
        <link rel="canonical" href="https://www.seanbetts.com/building" />
        <meta name="description" content="Explore what Sean Betts is building in AI and marketing. Discover cutting-edge applications of AI in business and responsible development practices." />
        <meta name="keywords" content="AI projects, marketing innovation, responsible AI, Sean Betts, technology leadership" />
        <meta property="og:site_name" content="Sean Betts" />
        <meta property="og:url" content="https://www.seanbetts.com/building" />
        <meta property="og:title" content="What Sean Betts is Building - AI & Marketing" />
        <meta property="og:description" content="Discover what Sean Betts is building in AI and marketing, showcasing practical applications and responsible development." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/sean-betts-profile.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@seanbetts" />
        <meta name="twitter:title" content="What Sean Betts is Building - AI and Marketing" />
        <meta name="twitter:description" content="Discover what Sean Betts is building in AI and marketing, showcasing practical applications and responsible development." />
        <meta name="twitter:image" content="/images/sean-betts-profile.png" />
        <script type="application/ld+json">
          {JSON.stringify(projectListSchema)}
        </script>
      </Helmet>

      <h1>Building</h1>
      <p>Here's what I'm building. You'll find a collection of my work exploring AI and marketing. From developing AI benchmarks to creating educational resources, these projects showcase practical applications of AI in the business world. Each initiative aims to push boundaries while focusing on responsible AI development. Feel free to explore and discover how I think AI is reshaping the marketing landscape.</p>
      <div className={styles.projectList}>
        {projectsData.map((project, index) => (
          <Link key={index} to={`/building/${project.id}`} className={styles.project}>
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

export default Building;