import { TeamMember } from '../interfaces';

// Import team member images
import muazImage from '../assets/team/muaz.jpg';
import mas from '../assets/team/mas.jpg';
import bad from '../assets/team/bruh.png';

export const teamData: TeamMember[] = [
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
