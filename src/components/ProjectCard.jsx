import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.videoPlaceholder}>
        {/* Placeholder for project video */}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <a href="#" className={styles.link}>View Project →</a>
      </div>
    </div>
  );
};

export default ProjectCard; 