export interface Patent {
  id: string;
  number: string;
  title: string;
  category: string;
  subcategory: string;
  date: string;
  excerpt: string;
  description: string;
  readTime: string;
  tags: string[];
  keyPoints: string[];
  citations: number;
  image?: string;
  hasPPT: boolean;
  hasVideo: boolean;
  videoUrl?: string;
  pptUrl?: string;
}

export interface PatentCategory {
  id: string;
  name: string;
  count: number;
  icon: string;
  description: string;
  tags: string[];
  image: string;
}

export interface Comment {
  id: string;
  patentId: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

export interface Statistic {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface AnalysisItem {
  id: string;
  patentNumber: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  category: string;
  image?: string;
}
