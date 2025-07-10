import React from 'react';
import backgroundVideo from '@/assets/videos/site-background.webm';
import styles from './BackgroundVideo.module.css';

const BackgroundVideo = () => {
  return (
    <video
      className={styles.video}
      src={backgroundVideo}
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

export default BackgroundVideo; 