import React from 'react';
import ServiceCard from '../components/ServiceCard';
import styles from './Services.module.css';
import { FiTarget, FiLayers, FiCpu } from 'react-icons/fi';

// Import images
import mvpImage from '../assets/images/pexels-googledeepmind-17485678.jpg';
import solutionsImage from '../assets/images/pexels-googledeepmind-18069365.jpg';
import automationImage from '../assets/images/pexels-googledeepmind-25626428.jpg';

const servicesData = [
  {
    icon: FiTarget,
    title: 'MVP Development',
    description: 'We transform your vision into a functional product. Ideal for validating business ideas and launching to market quickly, minimizing initial risks and costs.',
    imageSrc: mvpImage,
  },
  {
    icon: FiLayers,
    title: 'Bespoke Solutions',
    description: 'We analyze your unique challenges to design and implement robust software that perfectly fits your needs, not the other way around.',
    imageSrc: automationImage,
  },
  {
    icon: FiCpu,
    title: 'AI & Process Automation',
    description: "We use AI and automation to streamline workflows, eliminating repetitive tasks and boosting your team's productivity.",
    imageSrc: solutionsImage,
  }
];

const Services = () => {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <h2 className={styles.title}>Services</h2>
        <div className={styles.grid}>
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 