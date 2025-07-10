import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import heroLogo from '@/assets/images/LogoTransparent.png';

// Import assets directly to get their final paths from Vite
import heroVideoWebm from '@/assets/videos/hero-background.webm';
import heroVideoMp4 from '@/assets/videos/hero-background.mp4';

const Hero = () => {
  return (
    <section className={styles.hero} id="hero">
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={heroVideoWebm} type="video/webm" />
        <source src={heroVideoMp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <img src={heroLogo} alt="Annorak Intelligence Group" className={styles.heroLogo} />
        <p className={styles.description}>
          Vision, built with discipline
        </p>
        <Link to="/book" className={styles.ctaButton}>
          Discover More
        </Link>
      </div>
    </section>
  );
};

export default Hero; 