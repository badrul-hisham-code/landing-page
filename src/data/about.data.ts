export interface AboutContent {
  title: string;
  paragraphs: string[];
}

export interface StatItem {
  number: string;
  label: string;
}

export const aboutContent: AboutContent = {
  title: 'About LUNARIS',
  paragraphs: [
    'Luna Integrated Solution (LUNARIS) is a cutting-edge technology company dedicated to delivering innovative solutions that transform businesses. We combine expertise in software development, cloud computing, and digital transformation to help our clients achieve their goals.',
    'Our team of experienced professionals is committed to excellence, leveraging the latest technologies and best practices to deliver solutions that drive real business value. We believe in building long-term partnerships with our clients, understanding their unique challenges, and crafting tailored solutions that exceed expectations.',
    'With a focus on innovation, quality, and customer satisfaction, LUNARIS is your trusted partner in navigating the digital landscape and achieving sustainable growth.',
  ],
};

export const statsData: StatItem[] = [
  {
    number: '500+',
    label: 'Projects Completed',
  },
  {
    number: '200+',
    label: 'Happy Clients',
  },
  {
    number: '50+',
    label: 'Team Members',
  },
  {
    number: '10+',
    label: 'Years Experience',
  },
];
