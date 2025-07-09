import React from 'react';
import ProjectCard from '../components/ProjectCard';
import styles from './FeaturedProjects.module.css';

const projectsData = [
  {
    title: 'AI-Powered Analytics Platform',
    description: 'A web platform that uses machine learning to provide deep business insights from sales data.'
  },
  {
    title: 'Automated Invoicing System',
    description: 'An enterprise tool that automates the entire invoicing and payment tracking process.'
  },
  {
    title: 'E-commerce Mobile App',
    description: 'A cross-platform mobile app for a retail client, focused on user experience and performance.'
  }
];

const FeaturedProjects = () => {
  return (
    <section className={styles.projects} id="projects">
      <h2 className={styles.title}>Featured Projects</h2>
      <div className={styles.grid}>
        {projectsData.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects; 