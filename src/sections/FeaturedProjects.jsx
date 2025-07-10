import React from 'react';
import Slider from 'react-slick';
import ProjectCard from '../components/ProjectCard';
import styles from './FeaturedProjects.module.css';

// Import slick carousel styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import all project videos directly, only if they exist
import annorakMp4 from '@/assets/videos/AnnorakIntelligendeGroup.mp4';
import saferHoldingWebm from '@/assets/videos/SaferHoldingAnimatedLogo.webm';
import saferHoldingMp4 from '@/assets/videos/SaferHoldingAnimatedLogo.mp4';
import businessArchWebm from '@/assets/videos/BussinesArch.webm';
import businessArchMp4 from '@/assets/videos/BussinesArch.mp4';
import industrialAutoWebm from '@/assets/videos/7247869-hd_1920_1080_30fps.webm';
import industrialAutoMp4 from '@/assets/videos/7247869-hd_1920_1080_30fps.mp4';
import cascadeWebm from '@/assets/videos/CascadeLogoAnimated.webm';
import cascadeMp4 from '@/assets/videos/CascadeLogoAnimated.mp4';


const projectsData = [
  {
    title: 'Annorak Intelligence Group',
    description: 'Corporate brand development and internal management system.',
    webmSrc: null, // No .webm available for this video
    mp4Src: annorakMp4,
  },
  {
    title: 'SaferHolding',
    description: 'Web platform for comprehensive management of rental properties.',
    webmSrc: saferHoldingWebm,
    mp4Src: saferHoldingMp4,
  },
  {
    title: 'Business Architecture',
    description: 'Consulting and implementation of scalable business systems.',
    webmSrc: businessArchWebm,
    mp4Src: businessArchMp4,
  },
  {
    title: 'Industrial Automation',
    description: 'Process optimization through robotics and automated systems.',
    webmSrc: industrialAutoWebm,
    mp4Src: industrialAutoMp4,
  },
  {
    title: 'Cascade',
    description: 'Development of high-availability, real-time data streaming services.',
    webmSrc: cascadeWebm,
    mp4Src: cascadeMp4,
  },
];

const FeaturedProjects = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
                webmSrc={project.webmSrc}
                mp4Src={project.mp4Src}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedProjects; 