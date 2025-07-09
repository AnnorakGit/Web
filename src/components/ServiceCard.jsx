import React from 'react';
import { motion } from 'framer-motion';
import styles from './ServiceCard.module.css';

const ServiceCard = ({ title, description, index, icon: Icon }) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.iconWrapper}>
        {Icon && <Icon />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </motion.div>
  );
};

export default ServiceCard; 