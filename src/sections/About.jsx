import React from 'react';
import styles from './About.module.css';
import aboutVideo from '../assets/videos/AnnorakIntelligendeGroup.mp4';

const About = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.mediaContainer}>
          <video
            src={aboutVideo}
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <div className={styles.content}>
          <div>
            <h2 className={styles.title}>About Us</h2>
            <p className={styles.description}>
              Born from the conviction that the old rules no longer apply, Annorak was founded in 2025 to pioneer a new paradigm in technology. We are a next-generation collective of architects, engineers, and strategists, driven by an ambition to redefine industry standards. We don’t just adapt to the future; we build it.
            </p>
          </div>
          <div className={styles.values}>
            <div>
              <h3>Vision</h3>
              <p>To architect the future of business intelligence, turning data into market leadership.</p>
            </div>
            <div>
              <h3>Mission</h3>
              <p>To deliver elite software and data strategies that provide a definitive competitive edge.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 