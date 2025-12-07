export enum Category {
  STARTUP = 'Startup',
  MINDSET = 'Mentalidad',
  FINANCE = 'Finanzas',
  LEADERSHIP = 'Liderazgo',
  PRODUCTIVITY = 'Productividad',
  TECH = 'Tecnología',
  HEALTH = 'Bienestar'
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: Category;
  author: string;
  date: string;
  imageUrl: string;
  isVideo?: boolean;
}

export interface SectionBlock {
  title: string;
  articles: Article[];
  layout: 'grid' | 'list' | 'featured';
}
