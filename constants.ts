import { Article, Category } from './types';

const AUTHORS = ["Alex Hormozi", "Naval Ravikant", "Tim Ferriss", "James Clear", "Simon Sinek", "Brené Brown", "Gary Vaynerchuk", "Ryan Holiday"];

// Helper to generate specific themed data
const generateThemedArticles = (count: number, startIndex: number, category: Category, themeTitles: string[]): Article[] => {
  return Array.from({ length: count }).map((_, i) => {
    const titleIndex = i % themeTitles.length;
    return {
      id: `${category.toLowerCase()}-${startIndex + i}`,
      title: themeTitles[titleIndex],
      excerpt: "Descubre las estrategias probadas que están cambiando las reglas del juego en este sector.",
      category: category,
      author: AUTHORS[i % AUTHORS.length],
      date: `Mayo ${10 + (i % 20)}, 2024`,
      imageUrl: `https://picsum.photos/seed/${category}${startIndex + i}/800/600`,
      isVideo: i % 7 === 0 // Occasional video
    };
  });
};

const STARTUP_TITLES = [
  "Cómo escalar de 0 a 1 Millón sin inversión externa",
  "El dilema del fundador: ¿Vender o mantener el control?",
  "Product-Market Fit: La única métrica que importa al inicio",
  "Pitch Deck Perfecto: Lo que Sequoia busca en 2024",
  "Growth Hacking para B2B: Estrategias de bajo coste",
  "La cultura de Netflix: ¿Aplicable a tu pequeña empresa?",
  "SaaS Metrics: LTV, CAC y Churn explicados simplemente",
  "De Freelancer a Agencia: La hoja de ruta definitiva",
  "Errores legales que matan startups en su primer año",
  "Networking real vs. Perder el tiempo en eventos"
];

const MINDSET_TITLES = [
  "Estoicismo Moderno: Mantén la calma en el caos del mercado",
  "Dopamina Detox: Recupera tu capacidad de concentración profunda",
  "El Club de las 5 AM: ¿Mito o superpoder real?",
  "Mentalidad de Abundancia vs. Escasez en las negociaciones",
  "Meditación para CEOs: 10 minutos para claridad total",
  "Resiliencia Antifragil: Beneficiarse del desorden",
  "Cómo decir 'No' al 99% de las oportunidades",
  "Visualización creativa: La técnica de los atletas olímpicos",
  "Síndrome del Impostor: Cómo usarlo a tu favor",
  "Rutinas nocturnas para un sueño reparador y productivo"
];

const FINANCE_TITLES = [
  "Bitcoin Halving: ¿Qué significa para tu portafolio?",
  "Interés Compuesto: La octava maravilla del mundo explicada",
  "Diversificación inteligente para emprendedores ocupados",
  "Bienes Raíces vs. Mercado de Valores en 2024",
  "Cómo estructurar tu sueldo como fundador para pagar menos impuestos",
  "Cash Flow: Por qué el flujo de caja mata más empresas que la falta de beneficios",
  "Inversión Ángel: Cómo empezar con poco capital",
  "La psicología del dinero: Lecciones de Morgan Housel",
  "Inflación y tu negocio: Estrategias de precios defensivas",
  "Deuda buena vs. Deuda mala: Apalancamiento estratégico"
];

const TECH_TITLES = [
  "IA Generativa: 5 herramientas que reemplazan a un equipo entero",
  "No-Code Revolution: Crea tu MVP en un fin de semana",
  "Ciberseguridad básica para equipos remotos",
  "Automatización con Zapier: Ahorra 20 horas a la semana",
  "El futuro del trabajo asíncrono y las herramientas necesarias",
  "Web3 y Blockchain: ¿Siguen siendo relevantes para tu negocio?",
  "Los mejores CRM para 2024 según tu industria",
  "Marketing en el Metaverso: ¿Oportunidad o distracción?",
  "Productividad extrema con Notion y Obsidian",
  "Hardware para nómadas digitales: El setup perfecto"
];

// Generate datasets
export const HERO_ARTICLES = generateThemedArticles(5, 100, Category.STARTUP, [
  "El Fin de Silicon Valley: ¿El auge de los Hubs remotos?",
  "Biohacking para Ejecutivos: Energía ilimitada sin café",
  "La IA no te reemplazará, te reemplazará quien use IA",
  "Guerra de Talentos: Cómo contratar A-Players con poco presupuesto",
  "Venta Consultiva: El arte de vender sin vender"
]);

export const BLOCK_STARTUPS = generateThemedArticles(10, 200, Category.STARTUP, STARTUP_TITLES);
export const BLOCK_MINDSET = generateThemedArticles(8, 300, Category.MINDSET, MINDSET_TITLES);
export const BLOCK_FINANCE = generateThemedArticles(8, 400, Category.FINANCE, FINANCE_TITLES);
export const BLOCK_TECH = generateThemedArticles(8, 500, Category.TECH, TECH_TITLES);

export const POPULAR_NEWS = [...BLOCK_STARTUPS.slice(0, 3), ...BLOCK_MINDSET.slice(0, 3)];

export const NAV_LINKS = [
  { label: 'Inicio', href: '#' },
  { label: 'Startups', href: '#startups' },
  { label: 'Mentalidad', href: '#mindset' },
  { label: 'Finanzas', href: '#finanzas' },
  { label: 'Tecnología', href: '#tech' },
  { label: 'Newsletter', href: '#newsletter' },
];