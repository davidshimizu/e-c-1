import { Article, Category } from './types';

// Helper to generate consistent fake data
const generateArticles = (count: number, startIndex: number): Article[] => {
  const titles = [
    "El Arte de la Guerra en los Negocios Modernos",
    "5 Hábitos Matutinos de los CEO más Exitosos",
    "Cómo Levantar Capital sin Perder el Control",
    "La Psicología del Dinero: Lecciones Atemporales",
    "Estoicismo para Emprendedores: Mantén la Calma",
    "Productividad Profunda: Más Allá del Pomodoro",
    "El Futuro de la IA en tu Pequeña Empresa",
    "Networking Real: Construyendo Relaciones que Duran",
    "De Freelancer a Agencia: La Guía Completa",
    "Meditación para Mentes Hiperactivas",
    "Estrategias de Marketing de Guerrilla 2024",
    "Por qué Fracasan las Startups (y cómo evitarlo)",
    "Biohacking para Energía Ilimitada",
    "Liderazgo Empático: La Nueva Moneda de Cambio",
    "Criptomonedas: ¿Inversión o Apuesta?",
    "Minimalismo Digital: Recupera tu Atención"
  ];

  const authors = ["Alex Hormozi", "Naval Ravikant", "Tim Ferriss", "James Clear", "Simon Sinek", "Brené Brown"];
  
  return Array.from({ length: count }).map((_, i) => {
    const index = (startIndex + i) % titles.length;
    const catKeys = Object.values(Category);
    
    return {
      id: `art-${startIndex + i}`,
      title: titles[index],
      excerpt: "Descubre las claves fundamentales para transformar tu realidad profesional y personal con estrategias probadas.",
      category: catKeys[i % catKeys.length],
      author: authors[i % authors.length],
      date: "Mayo 14, 2024",
      imageUrl: `https://picsum.photos/seed/${startIndex + i}/800/600`,
      isVideo: i % 5 === 0
    };
  });
};

export const HERO_ARTICLES = generateArticles(5, 100);
export const LATEST_NEWS = generateArticles(8, 200);
export const POPULAR_NEWS = generateArticles(8, 300);
export const TRENDING_NEWS = generateArticles(8, 400);
export const TECH_NEWS = generateArticles(8, 500);

export const NAV_LINKS = [
  { label: 'Inicio', href: '#' },
  { label: 'Startups', href: '#' },
  { label: 'Mentalidad', href: '#' },
  { label: 'Finanzas', href: '#' },
  { label: 'Libros', href: '#' },
  { label: 'Cursos', href: '#' },
];
