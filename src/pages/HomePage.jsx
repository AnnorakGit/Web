import React from 'react';

import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import FeaturedProjects from '../sections/FeaturedProjects';
import Contact from '../sections/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <About />
      <Contact />
    </>
  );
};

export default HomePage; 