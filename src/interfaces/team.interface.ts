// Team component interfaces
export interface TeamMember {
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
