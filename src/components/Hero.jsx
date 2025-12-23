import { motion } from 'framer-motion';
import Hero3D from './Hero3D';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="hero-section">
      <Hero3D />
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="hero-title" variants={itemVariants}>
          <span className="gradient-text">LUNARIS</span>
        </motion.h1>
        <motion.p className="hero-subtitle" variants={itemVariants}>
          Luna Integrated Solution - Empowering Your Business with Cutting-Edge Technology
        </motion.p>
        <motion.div className="hero-buttons" variants={itemVariants}>
          <a href="#contact" className="btn btn-primary">
            Get Started
          </a>
          <a href="#services" className="btn btn-secondary">
            Our Services
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
