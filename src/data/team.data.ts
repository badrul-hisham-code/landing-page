import { TeamMember } from "../interfaces";

// Import team member images
import muazImage from "../assets/team/muaz.jpeg";
import mas from "../assets/team/adli.jpeg";
import bad from "../assets/team/bruh.png";

export const teamData: TeamMember[] = [
  {
    name: "Badrul Hisham",
    role: "Full Stack Developer / Co-Founder",
    image: bad,
    bio: "Full-stack developer with 5+ years of experience building scalable enterprise level web applications.",
    social: {
      linkedin: "https://www.linkedin.com/in/badrul-hisham-babjee/",
      github: "https://github.com/badrul-hisham-code",
      email: "badrulhisham2471@gmail.com",
    },
  },
  {
    name: "Muaz Wahiyudin",
    role: "Full Stack Developer / Co-Founder",
    image: muazImage,
    bio: "Full-stack developer with 5+ years of experience building multiple scalable web applications.",
    social: {
      linkedin: "https://www.linkedin.com/in/muaz-wahiyudin-307b06347/",
      github: "https://github.com/muaish",
      email: "muazwahiyudin@gmail.com",
    },
  },
  {
    name: "Adli Fata",
    role: "Full Stack Developer / Co-Founder",
    image: mas,
    bio: "Full-stack developer with 5+ years of experience building web applications, POS system, Mobile Apps, and more.",
    social: {
      linkedin: "https://www.linkedin.com/in/adlifata/",
      github: "https://github.com/adlifata",
      email: "adlifata@gmail.com",
    },
  },
];
