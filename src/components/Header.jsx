import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logoSrc from '@/assets/images/LogoTransparentSimple.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logoSrc} alt="Annorak" />
      </div>
      <nav className={styles.nav}>
        <a href="/#services">Services</a>
        <a href="/#projects">Projects</a>
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>
        <Link to="/book" className={styles.ctaButton}>Book a Call</Link>
      </nav>
    </header>
  );
};

export default Header; 