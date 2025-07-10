import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import heroLogo from '@/assets/images/LogoTransparent.png';
import heroVideo from '@/assets/videos/hero-background.webm';

const Hero = () => {
  return (
    <section className={styles.hero} id="hero">
      <video
        className={styles.video}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />
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