import React from 'react';
import Slider from 'react-slick';
import ProjectCard from '../components/ProjectCard';
import styles from './FeaturedProjects.module.css';

// Import slick carousel styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import videos
import saferHoldingVideo from '../assets/videos/SaferHoldingAnimatedLogo.mp4';
import cascadeVideo from '../assets/videos/CascadeLogoAnimated.mp4';
import proposalsVideo from '../assets/videos/7247869-hd_1920_1080_30fps.mp4';
import dueDateDiligenceVideo from '../assets/videos/5716913-uhd_3840_2160_25fps.mp4';
import complianceVideo from '../assets/videos/2314024-uhd_3840_2160_24fps.mp4';
import transformationVideo from '../assets/videos/BussinesArch.mp4';


// Import just the base names of the videos, without extension
const projectsData = [
  {
    title: 'Annorak Intelligence Group',
    description: 'Corporate brand development and internal management system.',
    videoName: 'AnnorakIntelligendeGroup',
  },
  {
    title: 'SaferHolding',
    description: 'Web platform for comprehensive management of rental properties.',
    videoName: 'SaferHoldingAnimatedLogo',
  },
  {
    title: 'Business Architecture',
    description: 'Consulting and implementation of scalable business systems.',
    videoName: 'BussinesArch',
  },
  {
    title: 'Industrial Automation',
    description: 'Process optimization through robotics and automated systems.',
    videoName: '7247869-hd_1920_1080_30fps',
  },
  {
    title: 'Cascade',
    description: 'Development of high-availability, real-time data streaming services.',
    videoName: 'CascadeLogoAnimated',
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
      <div className={styles.container}>
        <h2 className={styles.title}>Featured Projects</h2>
        <Slider {...settings}>
          {projectsData.map((project, index) => (
            <div key={index} className={styles.slide}>
              <ProjectCard
                title={project.title}
                description={project.description}
                videoName={project.videoName} // Pass the base name
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedProjects; 