import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="about-content"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>About <span className="gradient-text">LUNARIS</span></h2>
            <p>
              Luna Integrated Solution (LUNARIS) is a cutting-edge technology company dedicated to 
              delivering innovative solutions that transform businesses. We combine expertise in 
              software development, cloud computing, and digital transformation to help our clients 
              achieve their goals.
            </p>
            <p>
              Our team of experienced professionals is committed to excellence, leveraging the latest 
              technologies and best practices to deliver solutions that drive real business value. 
              We believe in building long-term partnerships with our clients, understanding their 
              unique challenges, and crafting tailored solutions that exceed expectations.
            </p>
            <p>
              With a focus on innovation, quality, and customer satisfaction, LUNARIS is your trusted 
              partner in navigating the digital landscape and achieving sustainable growth.
            </p>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Team Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
