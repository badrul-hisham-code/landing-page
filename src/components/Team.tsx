import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

// Import team member images
import muazImage from '../assets/team/muaz.jpg';
import mas from '../assets/team/mas.jpg'
import bad from '../assets/team/bruh.png'

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
}

const teamData: TeamMember[] = [
  {
    name: 'Badrul Hisham',
    role: 'Full Stack Developer / Co-Founder',
    image: bad,
    bio: 'Full-stack developer with 5+ years of experience building scalable enterprise level web applications. Always carry in DOTA',
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      email: 'john@example.com',
    },
  },
  {
    name: 'Muaz Rahman',
    role: 'Full Stack Developer / Co-Founder',
    image: muazImage,
    bio: 'Full-stack developer with 5+ years of experience building multiple scalable web applications. Always no TP during team fight',
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'jane@example.com',
    },
  },
  {
    name: 'Mas Adli',
    role: 'Full Stack Developer / Co-Founder',
    image: mas,
    bio: 'Full-stack developer with 5+ years of experience building web applications, POS system, Mobile Apps, and more. Ako Mid 2 tango anjeng',
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      email: 'mike@example.com',
    },
  },
];

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="team" className="team-section">
      <div className="container">
        <motion.div
          className="team-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Meet the Team</h2>
          <p>The talented people behind our success</p>
        </motion.div>

        <motion.div
          ref={ref}
          className="team-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {teamData.map((member, index) => (
            <motion.div
              key={index}
              className="team-card glass-card"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div className="team-image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-image"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=300&background=random`;
                  }}
                />
                <div className="team-overlay">
                  <div className="team-social">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        <FaTwitter />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="social-link"
                      >
                        <FaEnvelope />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
