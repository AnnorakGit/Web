import React from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.container}>
        <h2 className={styles.title}>What Our Clients Say</h2>
        <div className={styles.testimonialCard}>
          <p className={styles.quote}>
            "Working with Annorak was a game-changer. Their expertise in AI and automation streamlined our operations beyond what we thought possible. True professionals with a deep understanding of technology."
          </p>
          <div className={styles.author}>
            <span className={styles.authorName}>Jane Doe</span>
            <span className={styles.authorTitle}>CEO, TechCorp</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 