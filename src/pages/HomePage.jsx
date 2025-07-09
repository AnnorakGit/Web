import React from 'react';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import FeaturedProjects from '../sections/FeaturedProjects';
import About from '../sections/About';
import Contact from '../sections/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <main>
        <Services />
        <FeaturedProjects />
        <About />
        <Contact />
      </main>
    </>
  );
};

export default HomePage; 