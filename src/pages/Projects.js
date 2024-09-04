// src/pages/Projects.js
import React from 'react';
import { FolderOpen, Newspaper, Robot, ChalkboardTeacher, Clock } from "@phosphor-icons/react";
import styles from './Projects.module.css';

const Projects = () => {
  const projects = [
    {
      name: "GenAI Marketing Benchmarks",
      description: "Developing comprehensive benchmarks to assess the marketing knowledge and capabilities of large language models.",
      url: "https://github.com/seanbetts/genai-marketing-benchmarks",
      icon: <Robot size={24} />
    },
    {
      name: "GenAI Timeline",
      description: "A timeline of generative AI developments and milestones, tracking the rapid progress in the field.",
      url: "https://github.com/seanbetts/genai-timeline",
      icon: <Clock size={24} />
    },
    {
      name: "AI Chat Experience Prototype",
      description: "A proof-of-concept GenAI chat experience capable of creating user memories for more personalized AI interactions.",
      url: "#",
      icon: <Robot size={24} />
    }
  ];

  return (
    <div className={styles.projects}>
      <h1>Projects</h1>
      <div className={styles.projectList}>
        {projects.map((project, index) => (
          <div key={index} className={styles.project}>
            <h2>
              {project.icon}
              <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
            </h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;