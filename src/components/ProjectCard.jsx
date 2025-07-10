import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ title, description, videoName }) => {
  // Construct paths to the new, optimized video formats
  const webmSrc = `/src/assets/videos/${videoName}.webm`;
  const mp4Src = `/src/assets/videos/${videoName}.mp4`;

  return (
    <div className={styles.card}>
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        loading="lazy" // Lazy load the video
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
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