import { ReactElement } from 'react';
import { FaCode, FaMobile, FaCog } from 'react-icons/fa';

export interface ServiceItem {
  icon: ReactElement;
  title: string;
  description: string;
}

export const servicesData: ServiceItem[] = [
  {
    icon: <FaCode />,
    title: 'Custom Software Development',
    description: 'Tailored software solutions designed to meet your unique business requirements and drive growth.',
  },
  {
    icon: <FaMobile />,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
  },
  {
    icon: <FaCog />,
    title: 'IT Consulting',
    description: 'Strategic technology consulting to optimize your IT infrastructure and processes.',
  },
];
