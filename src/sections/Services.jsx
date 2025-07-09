import React from 'react';
import ServiceCard from '../components/ServiceCard';
import styles from './Services.module.css';
import { FaLightbulb, FaCode, FaRobot } from 'react-icons/fa';

const servicesData = [
  {
    icon: FaLightbulb,
    title: 'MVP Development',
    description: 'We transform your vision into a functional product. Ideal for validating business ideas and launching to market quickly, minimizing initial risks and costs.'
  },
  {
    icon: FaCode,
    title: 'Custom-Tailored Solutions',
    description: 'We analyze your unique challenges to design and implement robust software that perfectly fits your needs, not the other way around.'
  },
  {
    icon: FaRobot,
    title: 'AI & Process Automation',
    description: 'We integrate artificial intelligence and automation into your workflows to eliminate repetitive tasks, optimize efficiency, and boost your team\'s productivity.'
  }
];

const Services = () => {
  return (
    <section className={styles.services} id="services">
      <h2 className={styles.title}>What We Offer</h2>
      <div className={styles.grid}>
        {servicesData.map((service, index) => (
          <ServiceCard
            key={index}
            index={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Services; 