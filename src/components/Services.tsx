import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaCloud, FaMobile, FaChartLine, FaShieldAlt, FaCog } from 'react-icons/fa';

const servicesData = [
  {
    icon: <FaCode />,
    title: 'Custom Software Development',
    description: 'Tailored software solutions designed to meet your unique business requirements and drive growth.',
  },
  {
    icon: <FaCloud />,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services to modernize your business operations.',
  },
  {
    icon: <FaMobile />,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
  },
  {
    icon: <FaChartLine />,
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights with advanced analytics and visualization tools.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets and ensure compliance.',
  },
  {
    icon: <FaCog />,
    title: 'IT Consulting',
    description: 'Strategic technology consulting to optimize your IT infrastructure and processes.',
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Our Services</h2>
          <p>Comprehensive solutions to elevate your business to the next level</p>
        </motion.div>

        <motion.div
          ref={ref}
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="service-card glass-card"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              <span className="service-icon">{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
