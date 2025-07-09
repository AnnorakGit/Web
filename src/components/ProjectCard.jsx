import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ title, description, videoSrc }) => {
  return (
    <div className={styles.card}>
      <video
        src={videoSrc}
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard; 