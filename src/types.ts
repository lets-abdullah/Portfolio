export interface Project {
  id: string;
  title: string;
  category: 'mern' | 'erp' | 'dashboard' | 'web';
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: number; // percentage
  }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  bullets?: string[];
  tags: string[];
  isCurrent?: boolean;
}
