import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logoSrc from '@/assets/images/LogoTransparentSimple.png';
import { FiMenu, FiX } from 'react-icons/fi'; // Import icons

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close menu when a link is clicked
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <a href="/#hero"><img src={logoSrc} alt="Annorak" /></a>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.navDesktop}>
          <a href="/#services">Services</a>
          <a href="/#projects">Projects</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
          <Link to="/book" className={styles.ctaButton}>Book a Call</Link>
        </nav>

        {/* Hamburger Button */}
        <button className={styles.hamburgerButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* Mobile Navigation */}
      <nav className={`${styles.navMobile} ${isMenuOpen ? styles.navMobileOpen : ''}`}>
        <a href="/#services" onClick={handleLinkClick}>Services</a>
        <a href="/#projects" onClick={handleLinkClick}>Projects</a>
        <a href="/#about" onClick={handleLinkClick}>About</a>
        <a href="/#contact" onClick={handleLinkClick}>Contact</a>
        <Link to="/book" className={styles.ctaButtonMobile} onClick={handleLinkClick}>Book a Call</Link>
      </nav>
    </>
  );
};

export default Header; 