import React, { useEffect, useState } from 'react';
import { Menu, Search, Facebook, Twitter, Instagram, Youtube, Mail, Bell, X, TrendingUp } from 'lucide-react';
import { HERO_ARTICLES, LATEST_NEWS, POPULAR_NEWS, TRENDING_NEWS, TECH_NEWS, NAV_LINKS } from './constants';
import { ArticleCard } from './components/ArticleCard';
import { SectionHeader } from './components/SectionHeader';
import { GeminiWidget } from './components/GeminiWidget';
import { analyzeTrend } from './services/geminiService';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tickerTrend, setTickerTrend] = useState("Cargando tendencias de mercado...");

  useEffect(() => {
    // Initial fetch for a dynamic ticker line using Gemini (optional aesthetic touch)
    analyzeTrend().then(trend => setTickerTrend(trend));
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
             <span>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
             <span className="text-gray-500">|</span>
             <span className="flex items-center gap-2">
               <TrendingUp size={12} className="text-brand-500"/> 
               <span className="text-brand-200">Tendencia IA:</span> {tickerTrend}
             </span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-brand-400">Login</a>
            <a href="#" className="hover:text-brand-400">Suscribirse</a>
            <div className="flex gap-2 ml-4">
              <Facebook size={14} className="cursor-pointer hover:text-brand-500"/>
              <Twitter size={14} className="cursor-pointer hover:text-brand-500"/>
              <Instagram size={14} className="cursor-pointer hover:text-brand-500"/>
              <Youtube size={14} className="cursor-pointer hover:text-brand-500"/>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-black text-white sticky top-0 z-50 shadow-lg border-b border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 hover:bg-gray-800 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="font-serif font-black text-2xl tracking-tighter italic">
              Mind<span className="text-brand-500">Set</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
             {NAV_LINKS.map((link) => (
               <a 
                key={link.label} 
                href={link.href}
                className="px-4 py-2 text-sm font-bold uppercase tracking-wide hover:text-brand-500 hover:bg-white/5 rounded-sm transition-all"
              >
                {link.label}
              </a>
             ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block relative group">
               <input type="text" placeholder="Buscar..." className="bg-gray-800 border-none rounded-full py-1 px-4 text-sm w-32 focus:w-48 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-500" />
               <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2 px-4 rounded uppercase transition-colors shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              UNIRSE GRATIS
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white p-4 border-b border-gray-800">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
               <a 
                key={link.label} 
                href={link.href}
                className="py-2 px-2 hover:bg-gray-800 rounded font-bold"
              >
                {link.label}
              </a>
             ))}
          </nav>
        </div>
      )}

      {/* Breaking News Ticker */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <span className="bg-brand-600 text-white text-xs font-bold px-2 py-1 rounded uppercase shrink-0">
            Última Hora
          </span>
          <div className="overflow-hidden flex-1 relative h-6">
             <div className="absolute animate-marquee whitespace-nowrap text-sm font-medium text-gray-700 flex items-center gap-8">
               {HERO_ARTICLES.map(art => (
                 <span key={art.id} className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                   {art.title}
                 </span>
               ))}
             </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-1">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Main Feature */}
          <div className="lg:col-span-6">
            <ArticleCard article={HERO_ARTICLES[0]} variant="overlay" className="h-[400px] lg:h-[500px]" />
          </div>
          
          {/* Editor's Picks Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
             {HERO_ARTICLES.slice(1, 5).map(article => (
               <ArticleCard key={article.id} article={article} variant="overlay" className="h-[240px]" />
             ))}
          </div>
        </section>

        {/* CONTENT BLOCKS LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column (Left) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Block 1: Latest News */}
            <section>
              <SectionHeader title="Lo más reciente" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {/* Large one on left */}
                 <div className="sm:col-span-2 md:col-span-1">
                    <ArticleCard article={LATEST_NEWS[0]} className="h-full" />
                 </div>
                 {/* List on right */}
                 <div className="flex flex-col gap-4">
                    {LATEST_NEWS.slice(1, 4).map(article => (
                      <ArticleCard key={article.id} article={article} variant="horizontal" />
                    ))}
                 </div>
              </div>
              {/* Additional row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {LATEST_NEWS.slice(4, 8).map(article => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </section>

            {/* Banner Ad Area */}
            <div className="w-full h-32 bg-gray-100 flex flex-col items-center justify-center border border-gray-200 rounded relative overflow-hidden group cursor-pointer">
               <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/ad/1200/200')] bg-cover opacity-20 group-hover:opacity-30 transition-opacity"></div>
               <span className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1 z-10">Publicidad</span>
               <h3 className="text-2xl font-serif font-black text-gray-800 z-10">MASTERCLASS DE VENTAS <span className="text-brand-600">2024</span></h3>
            </div>

            {/* Block 2: Tech & Startup */}
            <section>
              <SectionHeader title="Tecnología & Startups" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {TECH_NEWS.map(article => (
                   <ArticleCard key={article.id} article={article} />
                 ))}
              </div>
            </section>

             {/* Block 3: Double Column Layout */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <SectionHeader title="Finanzas" />
                   <ArticleCard article={TRENDING_NEWS[0]} className="mb-4" />
                   {TRENDING_NEWS.slice(1, 4).map(art => (
                     <ArticleCard key={art.id} article={art} variant="horizontal" />
                   ))}
                </div>
                <div>
                   <SectionHeader title="Liderazgo" />
                   <ArticleCard article={POPULAR_NEWS[0]} className="mb-4" />
                   {POPULAR_NEWS.slice(1, 4).map(art => (
                     <ArticleCard key={art.id} article={art} variant="horizontal" />
                   ))}
                </div>
             </div>

          </div>

          {/* Sidebar (Right) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Gemini Widget */}
            <GeminiWidget />

            {/* Social Stats */}
            <div className="grid grid-cols-2 gap-2">
               <div className="bg-[#3b5998] text-white p-3 text-center rounded hover:opacity-90 cursor-pointer">
                  <Facebook className="mx-auto mb-1" />
                  <span className="text-sm font-bold">25k Fans</span>
               </div>
               <div className="bg-[#1DA1F2] text-white p-3 text-center rounded hover:opacity-90 cursor-pointer">
                  <Twitter className="mx-auto mb-1" />
                  <span className="text-sm font-bold">40k Followers</span>
               </div>
               <div className="bg-[#E1306C] text-white p-3 text-center rounded hover:opacity-90 cursor-pointer">
                  <Instagram className="mx-auto mb-1" />
                  <span className="text-sm font-bold">80k Followers</span>
               </div>
               <div className="bg-[#FF0000] text-white p-3 text-center rounded hover:opacity-90 cursor-pointer">
                  <Youtube className="mx-auto mb-1" />
                  <span className="text-sm font-bold">120k Subs</span>
               </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
               <div className="flex justify-center mb-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Mail size={32} className="text-brand-600" />
                  </div>
               </div>
               <h3 className="text-center font-bold text-xl mb-2 font-serif">Newsletter Diario</h3>
               <p className="text-center text-gray-500 text-sm mb-4">Recibe las mejores estrategias de negocios directamente en tu inbox.</p>
               <input type="email" placeholder="Tu correo electrónico" className="w-full px-4 py-2 border border-gray-300 rounded mb-2 text-sm" />
               <button className="w-full bg-brand-600 text-white font-bold py-2 rounded text-sm hover:bg-brand-700 uppercase transition-colors">Suscribirse</button>
            </div>

            {/* Popular Section Sidebar */}
            <div>
              <SectionHeader title="Más Popular" />
              <div className="flex flex-col gap-4">
                {POPULAR_NEWS.slice(0, 5).map((article, idx) => (
                  <div key={article.id} className="flex gap-4 group cursor-pointer">
                     <div className="text-3xl font-black text-gray-200 font-serif leading-none group-hover:text-brand-200 transition-colors">
                       {idx + 1}
                     </div>
                     <div>
                       <h4 className="font-bold text-sm leading-snug group-hover:text-brand-600 transition-colors">
                         {article.title}
                       </h4>
                       <span className="text-xs text-gray-400 mt-1 block">{article.date}</span>
                     </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Ad Sidebar */}
            <div className="bg-gray-800 h-[400px] w-full flex items-center justify-center text-gray-500 text-sm relative overflow-hidden group">
               <img src="https://picsum.photos/seed/sidebar/300/600" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" alt="ad"/>
               <div className="relative z-10 text-center p-4">
                 <p className="text-white font-bold text-lg mb-2">TU PUBLICIDAD AQUÍ</p>
                 <button className="bg-white text-black px-4 py-2 text-xs font-bold uppercase rounded">Contactar</button>
               </div>
            </div>

          </aside>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-brand-900">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-serif font-black text-2xl text-white italic mb-4">
              Mind<span className="text-brand-500">Set</span>
            </div>
            <p className="mb-4 text-justify leading-relaxed">
              Dedicados a proveer la información más relevante para emprendedores, visionarios y líderes del mañana. Nuestro objetivo es democratizar el acceso a la mentalidad de alto rendimiento.
            </p>
            <div className="flex gap-2 text-white">
               <span className="p-2 bg-white/10 rounded cursor-pointer hover:bg-brand-600 transition-colors"><Facebook size={16}/></span>
               <span className="p-2 bg-white/10 rounded cursor-pointer hover:bg-brand-600 transition-colors"><Twitter size={16}/></span>
               <span className="p-2 bg-white/10 rounded cursor-pointer hover:bg-brand-600 transition-colors"><Instagram size={16}/></span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase mb-4 tracking-wider">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-500 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Publicidad</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Escribe para nosotros</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-bold uppercase mb-4 tracking-wider">Editor's Choice</h4>
             <div className="flex flex-col gap-4">
                {HERO_ARTICLES.slice(0, 2).map(art => (
                  <div key={art.id} className="flex gap-3 group cursor-pointer">
                    <img src={art.imageUrl} className="w-16 h-16 object-cover rounded" alt={art.title} />
                    <div>
                      <h5 className="text-white font-bold text-xs leading-snug group-hover:text-brand-500 transition-colors mb-1">{art.title}</h5>
                      <span className="text-xs text-gray-600">{art.date}</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs">
          &copy; 2024 MindSet Magazine. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default App;
