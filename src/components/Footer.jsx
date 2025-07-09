import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        Annorak
      </div>
      <div className={styles.social}>
        {/* Placeholder for social icons */}
        <a href="#">LinkedIn</a>
        <a href="#">Twitter</a>
      </div>
      <div className={styles.legal}>
        <p>© {new Date().getFullYear()} Annorak Intelligence Group. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 