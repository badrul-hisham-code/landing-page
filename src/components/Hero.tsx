import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Hero3D } from "./3d";
import { lightModeStories, darkModeStories } from "../data";

const Hero: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const stories = theme === "dark" ? darkModeStories : lightModeStories;
  const textSide = theme === "dark" ? "right" : "left";

  // Calculate which page we're on based on scroll progress
  // Page 0: 0 - 0.33 (main hero)
  // Page 1: 0.33 - 0.66 (first story)
  // Page 2: 0.66 - 1.0 (second story)
  const currentPage = scrollProgress < 0.33 ? 0 : scrollProgress < 0.66 ? 1 : 2;

  return (
    <section className="hero-section">
      <Hero3D onScrollUpdate={setScrollProgress} />

      {/* Page 0: Main title and CTA */}
      <motion.div
        className={`hero-content hero-page-0 text-${textSide}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: currentPage === 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 className="hero-title">
          <span className="gradient-text">Luna Lab</span>
        </motion.h1>
        <motion.p className="hero-subtitle">
          Empowering Your Business with Cutting-Edge Technology
        </motion.p>
        <motion.div className="hero-buttons">
          <a href="#services" className="btn btn-primary">
            Get Started
          </a>
          <a href="#services" className="btn btn-secondary">
            Our Services
          </a>
        </motion.div>
        <p className="scroll-hint">Scroll to explore our journey</p>
      </motion.div>

      {/* Pages 1-3: Story points */}
      {stories.map((story, index) => (
        <motion.div
          key={index}
          className={`hero-content hero-story text-${textSide}`}
          initial={{ opacity: 0, x: textSide === "left" ? -50 : 50 }}
          animate={{
            opacity: currentPage === index + 1 ? 1 : 0,
            x: currentPage === index + 1 ? 0 : textSide === "left" ? -50 : 50,
          }}
          transition={{ duration: 0.6 }}
        >
          <div className="story-number">0{index + 1}</div>
          <h2 className="story-title">{story.title}</h2>
          <p className="story-description">{story.description}</p>
        </motion.div>
      ))}
    </section>
  );
};

export default Hero;
