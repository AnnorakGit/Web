import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Annorak</div>
      <div className={styles.legal}>
        <span>© {new Date().getFullYear()} Annorak. All Rights Reserved.</span>
        <Link to="/login" className={styles.adminLink}>Admin</Link>
      </div>
      <div className={styles.social}>
        <a href="https://github.com/AnnorakGit" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        {/* Add other social links here */}
      </div>
    </footer>
  );
};

export default Footer; 