import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  FaCoffee, FaUsers, FaProjectDiagram, 
  FaCode, FaRocket, FaBolt,
  FaLightbulb, FaComments, FaPencilRuler,
  FaLaptopCode, FaServer, FaBatteryFull
} from 'react-icons/fa';

// Light mode stories - Developer's Morning
const morningStories = [
  {
    icon: <FaCoffee />,
    title: 'Morning Planning',
    subtitle: 'Starting the day right',
    description: 'Fresh coffee, clear mind. Daily standup meetings, sprint planning, and setting priorities for the day ahead.',
    color: '#FF6B35',
  },
  {
    icon: <FaUsers />,
    title: 'Team Collaboration',
    subtitle: 'Working together',
    description: 'Code reviews, pair programming, and brainstorming sessions. Sharing knowledge and building solutions as a team.',
    color: '#FF8C42',
  },
  {
    icon: <FaProjectDiagram />,
    title: 'Architecture & Design',
    subtitle: 'Building the foundation',
    description: 'Whiteboarding system designs, planning scalable architectures, and making technical decisions that matter.',
    color: '#FFB347',
  },
];

// Dark mode stories - Developer's Night
const nightStories = [
  {
    icon: <FaCode />,
    title: 'Deep Coding Sessions',
    subtitle: 'In the zone',
    description: 'Late night focus. Headphones on, world off. Writing clean code, solving complex problems, and building features.',
    color: '#00d4ff',
  },
  {
    icon: <FaRocket />,
    title: 'Production Deployments',
    subtitle: 'Going live',
    description: 'CI/CD pipelines running, monitoring dashboards active. Pushing code to production and watching it come alive.',
    color: '#b537f2',
  },
  {
    icon: <FaBolt />,
    title: 'Deadline Crunch',
    subtitle: 'Powered by determination',
    description: 'Energy drinks, coffee, and pure focus. Late-night commits, debugging sessions, and delivering on promises.',
    color: '#ff2e97',
  },
];

const StoryCard = ({ story, index, theme }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="story-card glass-card"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="story-icon" style={{ color: story.color }}>
        {story.icon}
      </div>
      <h3 className="story-title">{story.title}</h3>
      <p className="story-subtitle" style={{ color: story.color }}>
        {story.subtitle}
      </p>
      <p className="story-description">{story.description}</p>
    </motion.div>
  );
};

const DeveloperStory = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const stories = theme === 'dark' ? nightStories : morningStories;
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="developer-story-section">
      <div className="container">
        <motion.div
          ref={headerRef}
          className="story-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2>
            {theme === 'dark' ? (
              <>A Developer's <span className="gradient-text">Night</span></>
            ) : (
              <>A Developer's <span className="gradient-text">Day</span></>
            )}
          </h2>
          <p>
            {theme === 'dark'
              ? 'When the sun sets, the real magic happens. Fueled by passion and caffeine.'
              : 'Every great solution starts with a plan. Collaboration, creativity, and coffee.'}
          </p>
        </motion.div>

        <div className="story-grid">
          {stories.map((story, index) => (
            <StoryCard key={index} story={story} index={index} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperStory;
