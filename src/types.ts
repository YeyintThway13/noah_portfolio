export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  role: string;
  category: 'frontend' | 'backend' | 'fullstack';
  tags: string[];
  achievements: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  details: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ToolItem {
  name: string;
  category: string;
  iconName: string;
}
