import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ title, description, webmSrc, mp4Src }) => {
  return (
    <div className={styles.card}>
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        loading="lazy"
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        {mp4Src && <source src={mp4Src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard; 