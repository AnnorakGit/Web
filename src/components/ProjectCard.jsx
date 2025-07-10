import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ title, description, videoSrc, tags }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.1, // Trigger when 10% of the card is visible
  });

  return (
    <div className={styles.card} ref={ref}>
      {inView && (
        <video
          className={styles.video}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 