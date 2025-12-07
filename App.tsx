import React, { useEffect, useState } from 'react';
import { Menu, Search, Facebook, Twitter, Instagram, Youtube, Mail, TrendingUp, X, ArrowRight } from 'lucide-react';
import { HERO_ARTICLES, BLOCK_STARTUPS, BLOCK_MINDSET, BLOCK_FINANCE, BLOCK_TECH, POPULAR_NEWS, NAV_LINKS } from './constants';
import { ArticleCard } from './components/ArticleCard';
import { SectionHeader } from './components/SectionHeader';
import { GeminiWidget } from './components/GeminiWidget';
import { analyzeTrend } from './services/geminiService';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tickerTrend, setTickerTrend] = useState("Analizando mercados...");

  useEffect(() => {
    analyzeTrend().then(trend => setTickerTrend(trend));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* --- TOP BAR --- */}
      <div className="bg-gray-900 text-gray-300 text-xs py-2 hidden md:block border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
             <span className="text-gray-400">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
             <span className="text-gray-600">|</span>
             <span className="flex items-center gap-2 text-white font-medium">
               <TrendingUp size={12} className="text-brand-500"/> 
               <span className="uppercase tracking-wider text-brand-500 text-[10px]">Tendencia IA</span>
               <span className="truncate max-w-[300px]">{tickerTrend}</span>
             </span>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#" className="hover:text-white transition-colors">Login</a>
            <div className="flex gap-3 border-l border-gray-700 pl-4">
              <Facebook size={14} className="hover:text-blue-500 cursor-pointer transition-colors"/>
              <Twitter size={14} className="hover:text-sky-400 cursor-pointer transition-colors"/>
              <Instagram size={14} className="hover:text-pink-500 cursor-pointer transition-colors"/>
              <Youtube size={14} className="hover:text-red-600 cursor-pointer transition-colors"/>
            </div>
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b-4 border-gray-900">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-800 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <div className="flex flex-col leading-none select-none cursor-pointer">
              <span className="font-serif font-black text-3xl tracking-tighter italic text-gray-900">
                MIND<span className="text-brand-600">SET</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase text-center">Magazine</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
             {NAV_LINKS.map((link) => (
               <a 
                key={link.label} 
                href={link.href}
                className="px-3 py-2 text-sm font-bold uppercase text-gray-700 hover:text-brand-600 border-b-2 border-transparent hover:border-brand-600 transition-all"
              >
                {link.label}
              </a>
             ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden xl:block relative group">
               <input 
                 type="text" 
                 placeholder="Buscar..." 
                 className="bg-gray-100 text-gray-800 rounded-full py-2 px-4 pl-10 text-sm w-40 focus:w-64 focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all duration-300 outline-none" 
               />
               <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold py-3 px-6 rounded uppercase shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-0.5">
              Suscribirse
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE NAV --- */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 text-white p-6 absolute w-full z-40 border-b border-gray-700 shadow-2xl">
          <nav className="flex flex-col gap-4 text-center">
            {NAV_LINKS.map((link) => (
               <a 
                key={link.label} 
                href={link.href}
                className="py-3 px-4 hover:bg-gray-800 rounded font-bold text-lg border-b border-gray-800 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
             ))}
          </nav>
        </div>
      )}

      {/* --- BREAKING NEWS TICKER --- */}
      <div className="bg-black text-white py-3 overflow-hidden border-b border-gray-800 relative z-30">
        <div className="container mx-auto px-4 flex items-center">
          <div className="bg-brand-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest mr-4 shrink-0 skew-x-[-10deg]">
             Última Hora
          </div>
          <div className="flex-1 overflow-hidden relative h-5">
             <div className="absolute animate-marquee whitespace-nowrap text-sm font-medium text-gray-300 flex items-center gap-12">
               {[...HERO_ARTICLES, ...BLOCK_STARTUPS].map((art, i) => (
                 <span key={i} className="flex items-center gap-3 hover:text-brand-400 cursor-pointer transition-colors">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                   {art.title}
                 </span>
               ))}
             </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-1">
        
        {/* === HERO SECTION === */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:gap-6 mb-16 h-auto lg:h-[500px]">
          {/* Main Hero */}
          <div className="lg:col-span-2 h-[400px] lg:h-full relative group overflow-hidden rounded-lg shadow-2xl">
            <ArticleCard article={HERO_ARTICLES[0]} variant="overlay" className="h-full w-full" />
          </div>
          
          {/* Sub Hero Column 1 */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
             <div className="flex-1 h-[200px] lg:h-auto"><ArticleCard article={HERO_ARTICLES[1]} variant="overlay" className="h-full" /></div>
             <div className="flex-1 h-[200px] lg:h-auto"><ArticleCard article={HERO_ARTICLES[2]} variant="overlay" className="h-full" /></div>
          </div>

          {/* Sub Hero Column 2 */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
             <div className="flex-1 h-[200px] lg:h-auto"><ArticleCard article={HERO_ARTICLES[3]} variant="overlay" className="h-full" /></div>
             <div className="flex-1 h-[200px] lg:h-auto"><ArticleCard article={HERO_ARTICLES[4]} variant="overlay" className="h-full" /></div>
          </div>
        </section>

        {/* === MAIN CONTENT GRID === */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* LEFT CONTENT COLUMN (8 cols) */}
          <div className="xl:col-span-8 flex flex-col gap-16">
            
            {/* --- BLOCK 1: STARTUPS (10 items) --- */}
            <section id="startups">
              <SectionHeader title="Startups & Negocios" />
              {/* Featured Top */}
              <div className="mb-2">
                 <ArticleCard article={BLOCK_STARTUPS[0]} />
              </div>
              
              {/* Grid of 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-gray-200 pb-8">
                {BLOCK_STARTUPS.slice(1, 4).map(art => (
                   <ArticleCard key={art.id} article={art} variant="standard" />
                ))}
              </div>

              {/* List of 6 (2 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                 {BLOCK_STARTUPS.slice(4, 10).map(art => (
                    <ArticleCard key={art.id} article={art} variant="horizontal" />
                 ))}
              </div>
            </section>

            {/* AD BANNER MIDDLE */}
            <div className="w-full bg-gray-900 h-40 rounded-lg overflow-hidden relative flex items-center justify-between px-8 md:px-16 group cursor-pointer shadow-xl">
               <div className="absolute inset-0 bg-gradient-to-r from-brand-900 to-gray-900 opacity-90 z-0"></div>
               <img src="https://picsum.photos/seed/office/1200/400" className="absolute inset-0 object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
               <div className="relative z-10 text-white">
                  <span className="text-brand-400 font-bold text-xs tracking-widest uppercase mb-2 block">Evento Exclusivo</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-black italic">SUMMIT EMPRENDEDOR 2025</h3>
               </div>
               <button className="relative z-10 bg-white text-gray-900 px-6 py-2 font-bold uppercase text-sm rounded hover:bg-brand-500 hover:text-white transition-colors">
                 Reservar
               </button>
            </div>

            {/* --- BLOCK 2: MINDSET (8 items) --- */}
            <section id="mindset">
              <SectionHeader title="Mentalidad de Titán" />
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {BLOCK_MINDSET.map((art, idx) => (
                    <div key={art.id} className={`${idx < 2 ? 'sm:col-span-2' : 'col-span-1'} lg:col-span-1`}>
                       <ArticleCard article={art} variant="standard" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

             {/* --- BLOCK 3: FINANCE (8 items - Split Layout) --- */}
            <section id="finanzas">
              <SectionHeader title="Dinero & Inversión" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Left: 1 Big + 3 Small */}
                 <div className="flex flex-col gap-6">
                    <ArticleCard article={BLOCK_FINANCE[0]} variant="overlay" className="h-64 rounded-lg" />
                    <div className="grid grid-cols-3 gap-2">
                       {BLOCK_FINANCE.slice(1, 4).map(art => (
                         <div key={art.id} className="h-24 relative group cursor-pointer overflow-hidden rounded">
                            <img src={art.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform"/>
                         </div>
                       ))}
                    </div>
                 </div>
                 {/* Right: List */}
                 <div className="flex flex-col gap-4 bg-white border border-gray-100 p-4 rounded-lg shadow-sm">
                    {BLOCK_FINANCE.slice(4, 8).map(art => (
                       <ArticleCard key={art.id} article={art} variant="horizontal" />
                    ))}
                 </div>
              </div>
            </section>

             {/* --- BLOCK 4: TECH (8 items - Dark Mode Area) --- */}
            <section id="tech" className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600 rounded-full filter blur-[100px] opacity-20 pointer-events-none"></div>
               <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2 relative z-10">
                  <h2 className="text-xl font-bold uppercase tracking-tight text-white font-serif">Tecnología & Futuro</h2>
                  <ArrowRight className="text-brand-500" />
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                  {BLOCK_TECH.map(art => (
                     <div key={art.id} className="group cursor-pointer">
                        <div className="aspect-video overflow-hidden rounded-lg mb-3 border border-gray-700">
                           <img src={art.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100"/>
                        </div>
                        <span className="text-brand-500 text-[10px] font-bold uppercase mb-1 block">{art.category}</span>
                        <h3 className="text-sm font-bold leading-snug group-hover:text-brand-400 transition-colors">{art.title}</h3>
                     </div>
                  ))}
               </div>
            </section>

          </div>

          {/* RIGHT SIDEBAR (4 cols) */}
          <aside className="xl:col-span-4 space-y-10">
            
            {/* GEMINI WIDGET */}
            <GeminiWidget />

            {/* NEWSLETTER */}
            <div className="bg-brand-600 text-white p-8 rounded-xl text-center shadow-lg shadow-brand-600/20 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
               <Mail size={40} className="mx-auto mb-4 text-white/90" />
               <h3 className="font-serif font-bold text-2xl mb-2">Morning Brew</h3>
               <p className="text-brand-100 text-sm mb-6 leading-relaxed">Únete a 50,000+ emprendedores que reciben nuestras estrategias cada mañana.</p>
               <div className="flex flex-col gap-2">
                 <input type="email" placeholder="tu@email.com" className="px-4 py-3 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50" />
                 <button className="bg-gray-900 text-white font-bold py-3 rounded text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors">Suscribirse Gratis</button>
               </div>
               <p className="text-[10px] text-brand-200 mt-4 opacity-70">Sin spam. Date de baja cuando quieras.</p>
            </div>

            {/* POPULAR POSTS */}
            <div>
              <SectionHeader title="Lo más leído" />
              <div className="flex flex-col gap-0">
                {POPULAR_NEWS.map((article, idx) => (
                  <div key={article.id} className="flex gap-4 group cursor-pointer border-b border-gray-100 py-4 first:pt-0">
                     <span className="text-4xl font-black text-gray-200 font-serif leading-none group-hover:text-brand-500 transition-colors w-8 text-center shrink-0">
                       {idx + 1}
                     </span>
                     <div>
                       <span className="text-[10px] font-bold text-brand-600 uppercase mb-1 block">{article.category}</span>
                       <h4 className="font-bold text-sm leading-snug text-gray-800 group-hover:text-brand-600 transition-colors">
                         {article.title}
                       </h4>
                     </div>
                  </div>
                ))}
              </div>
            </div>

             {/* TAGS CLOUD */}
             <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold text-sm uppercase mb-4 text-gray-900">Temas Calientes</h4>
                <div className="flex flex-wrap gap-2">
                   {["Crypto", "SaaS", "Biohacking", "Ventas", "Marketing", "Liderazgo", "Productividad", "AI Tools", "No-Code", "Remote Work"].map(tag => (
                      <span key={tag} className="bg-white border border-gray-200 text-xs text-gray-600 px-3 py-1.5 rounded-full hover:bg-brand-600 hover:text-white hover:border-brand-600 cursor-pointer transition-all">
                        #{tag}
                      </span>
                   ))}
                </div>
             </div>

             {/* STICKY AD */}
             <div className="sticky top-24">
                <div className="w-full aspect-[3/4] bg-gray-200 relative group cursor-pointer overflow-hidden rounded-lg">
                   <img src="https://picsum.photos/seed/verticalad/600/800" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="text-center p-6 border-4 border-white/20 m-4">
                        <p className="text-white font-black text-2xl uppercase mb-2">Tu Marca Aquí</p>
                        <button className="bg-white text-black text-xs font-bold px-4 py-2 uppercase mt-2">Contactar</button>
                      </div>
                   </div>
                   <span className="absolute top-2 right-2 bg-white/50 text-[10px] px-1 text-black font-bold">AD</span>
                </div>
             </div>

          </aside>
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-16 border-t-4 border-brand-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="font-serif font-black text-2xl text-white italic mb-6">
                MIND<span className="text-brand-500">SET</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 text-gray-500">
                La plataforma líder para la nueva generación de emprendedores hispanos. Estrategias reales, sin humo.
              </p>
              <div className="flex gap-4">
                 <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors cursor-pointer"><Facebook size={16}/></div>
                 <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors cursor-pointer"><Twitter size={16}/></div>
                 <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors cursor-pointer"><Instagram size={16}/></div>
              </div>
            </div>

            {/* Links */}
            <div>
               <h4 className="text-white font-bold uppercase text-sm mb-6 tracking-wider">Explorar</h4>
               <ul className="space-y-3 text-sm">
                 <li><a href="#" className="hover:text-brand-500 transition-colors flex items-center gap-2"><ArrowRight size={12}/> Startups</a></li>
                 <li><a href="#" className="hover:text-brand-500 transition-colors flex items-center gap-2"><ArrowRight size={12}/> Mentalidad</a></li>
                 <li><a href="#" className="hover:text-brand-500 transition-colors flex items-center gap-2"><ArrowRight size={12}/> Biohacking</a></li>
                 <li><a href="#" className="hover:text-brand-500 transition-colors flex items-center gap-2"><ArrowRight size={12}/> Tecnología</a></li>
               </ul>
            </div>

            {/* Legal */}
            <div>
               <h4 className="text-white font-bold uppercase text-sm mb-6 tracking-wider">Empresa</h4>
               <ul className="space-y-3 text-sm">
                 <li><a href="#" className="hover:text-brand-500 transition-colors">Sobre Nosotros</a></li>
                 <li><a href="#" className="hover:text-brand-500 transition-colors">Publicidad</a></li>
                 <li><a href="#" className="hover:text-brand-500 transition-colors">Contacto</a></li>
                 <li><a href="#" className="hover:text-brand-500 transition-colors">Política de Privacidad</a></li>
               </ul>
            </div>

            {/* Editor Pick Small */}
            <div>
              <h4 className="text-white font-bold uppercase text-sm mb-6 tracking-wider">Destacado</h4>
              <div className="group cursor-pointer">
                 <div className="h-24 rounded overflow-hidden mb-3 relative">
                    <img src={HERO_ARTICLES[1].imageUrl} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <h5 className="text-white text-sm font-bold leading-snug group-hover:text-brand-500 transition-colors">{HERO_ARTICLES[1].title}</h5>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
             <p>&copy; 2024 MindSet Media Group. Todos los derechos reservados.</p>
             <div className="flex gap-4 mt-4 md:mt-0">
               <span>Made with code</span>
               <span>Hostinger Compatible</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;