import React from 'react';
import Slider from 'react-slick';
import ProjectCard from '../components/ProjectCard';
import styles from './FeaturedProjects.module.css';

// Import slick carousel styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import .webm videos
import saferHoldingVideo from '../assets/videos/SaferHoldingAnimatedLogo.webm';
import businessArchVideo from '../assets/videos/BussinesArch.webm';
import cascadeVideo from '../assets/videos/CascadeLogoAnimated.webm';
import rentalAutomationVideo from '../assets/videos/7247869-hd_1920_1080_30fps.webm';

const projects = [
  {
    title: 'Rental Management Automation',
    description: 'A complete system to automate guest check-ins, communications, and manage cleaning schedules for vacation rentals.',
    videoSrc: rentalAutomationVideo,
    tags: ['React', 'Node.js', 'Automation', 'API'],
  },
  {
    title: 'Industrial Process Control',
    description: 'Real-time monitoring and control software for industrial machinery, reducing downtime and improving efficiency.',
    videoSrc: businessArchVideo,
    tags: ['Python', 'SCADA', 'IoT', 'Real-Time'],
  },
  {
    title: 'Business Intelligence Dashboard',
    description: 'A financial analytics dashboard providing key insights and data visualizations for strategic decision-making.',
    videoSrc: saferHoldingVideo,
    tags: ['React', 'D3.js', 'Data-Viz', 'Finance'],
  },
  {
    title: 'E-commerce Recommendation Engine',
    description: 'An AI-powered engine that personalizes product recommendations, increasing user engagement and sales.',
    videoSrc: cascadeVideo,
    tags: ['AI/ML', 'Python', 'E-commerce', 'API'],
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