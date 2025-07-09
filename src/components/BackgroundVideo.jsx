import React from 'react';
import styles from './BackgroundVideo.module.css';
import backgroundVideo from '@/assets/videos/site-background.mp4';

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