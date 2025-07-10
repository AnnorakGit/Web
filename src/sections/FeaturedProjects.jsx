import React from 'react';
import Slider from 'react-slick';
import ProjectCard from '../components/ProjectCard';
import styles from './FeaturedProjects.module.css';

// Import slick carousel styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Using the optimized .webm videos
import saferHoldingVideo from '../assets/videos/SaferHoldingAnimatedLogo.webm';
import businessArchVideo from '../assets/videos/BussinesArch.webm';
import cascadeVideo from '../assets/videos/CascadeLogoAnimated.webm';
import proposalsVideo from '../assets/videos/7247869-hd_1920_1080_30fps.webm';
import dueDateDiligenceVideo from '../assets/videos/5716913-uhd_3840_2160_25fps.webm';
import complianceVideo from '../assets/videos/2314024-uhd_3840_2160_24fps.webm';

const projects = [
  {
    title: 'Automated Rental Management',
    description: 'A fully automated platform that takes care of invoices, utility expenses, tenant communication, contract follow-ups, and reporting.',
    videoSrc: saferHoldingVideo,
    tags: ['AI', 'Automation', 'SaaS'],
  },
  {
    title: 'Smart Industrial Automation',
    description: 'A unified SCADA + HMI platform that automates machine monitoring, PLC communication, 3D plant visualization, and production analytics.',
    videoSrc: cascadeVideo,
    tags: ['SCADA', 'IoT', 'Industry 4.0'],
  },
  {
    title: 'Automated Strategic Proposals',
    description: 'Engineering automated workflows that generate complex business proposals, reducing delivery times from weeks to hours.',
    videoSrc: proposalsVideo,
    tags: ['Automation', 'BPA', 'Document AI'],
  },
  {
    title: 'AI-Accelerated Due Diligence',
    description: 'Implementing intelligent systems to analyze documents and data, streamlining the due diligence process with unparalleled accuracy.',
    videoSrc: dueDateDiligenceVideo,
    tags: ['AI/ML', 'NLP', 'Legal Tech'],
  },
  {
    title: 'Automated Compliance & Operations',
    description: 'Developing solutions for automated compliance verification and employee lifecycle management, ensuring efficiency and security.',
    videoSrc: complianceVideo,
    tags: ['Compliance', 'HR Tech', 'Automation'],
  },
  {
    title: 'Core Digital Transformation',
    description: 'Leading end-to-end digital transformation projects, modernizing legacy systems and unlocking new levels of productivity.',
    videoSrc: businessArchVideo, // Renamed from transformationVideo to match import
    tags: ['Digitalization', 'Legacy Systems', 'Consulting'],
  },
];

const FeaturedProjects = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        }
      }
    ]
  };

  return (
    <section className={styles.projects} id="projects">
      <h2 className={styles.title}>Featured Projects</h2>
      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {projects.map((project, index) => (
            <div key={index} className={styles.slide}>
              <ProjectCard
                title={project.title}
                description={project.description}
                videoSrc={project.videoSrc}
                tags={project.tags}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedProjects; 