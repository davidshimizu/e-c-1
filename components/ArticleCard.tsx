import React from 'react';
import { PlayCircle, Clock, User, ChevronRight } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  variant?: 'standard' | 'compact' | 'overlay' | 'horizontal' | 'minimal';
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'standard', className = '' }) => {
  
  // HERO / OVERLAY VARIANT
  if (variant === 'overlay') {
    return (
      <div className={`group relative overflow-hidden rounded-lg cursor-pointer h-full w-full ${className}`}>
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90"></div>
        
        <div className="absolute bottom-0 left-0 p-5 w-full z-10">
          <span className="inline-block px-2 py-1 mb-3 text-[10px] font-bold text-white bg-brand-600 rounded-sm uppercase tracking-widest hover:bg-brand-500 transition-colors">
            {article.category}
          </span>
          <h3 className="text-white font-bold text-xl md:text-2xl leading-tight mb-3 group-hover:text-brand-300 transition-colors font-serif shadow-black drop-shadow-md">
            {article.title}
          </h3>
          <div className="flex items-center text-gray-300 text-xs gap-3 border-t border-white/20 pt-3 mt-2">
             <span className="flex items-center gap-1 font-semibold"><User size={12} className="text-brand-500"/> {article.author}</span>
             <span className="flex items-center gap-1"><Clock size={12} className="text-brand-500"/> {article.date}</span>
          </div>
        </div>
        {article.isVideo && (
          <div className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-2 animate-pulse shadow-lg">
            <PlayCircle size={20} fill="white" className="text-red-600" />
          </div>
        )}
      </div>
    );
  }

  // HORIZONTAL LIST VARIANT
  if (variant === 'horizontal') {
    return (
      <div className={`flex gap-4 items-start group cursor-pointer border-b border-gray-100 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 ${className}`}>
        <div className="w-28 h-20 shrink-0 overflow-hidden rounded-md relative shadow-sm">
           <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center h-full py-1">
          <div className="flex items-center gap-2 mb-1">
             <span className="text-brand-600 text-[10px] font-black uppercase tracking-wider">
               {article.category}
             </span>
             {article.isVideo && <PlayCircle size={10} className="text-red-500 fill-current" />}
          </div>
          <h4 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
            {article.title}
          </h4>
          <span className="text-gray-400 text-[10px] mt-1 flex items-center gap-1">
             {article.date}
          </span>
        </div>
      </div>
    );
  }

  // STANDARD GRID CARD
  return (
    <div className={`flex flex-col group cursor-pointer h-full ${className}`}>
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-[16/10] shadow-sm">
         <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
           <span className="px-2 py-1 text-[10px] font-bold text-white bg-gray-900/80 backdrop-blur-sm rounded-sm uppercase tracking-wide">
             {article.category}
           </span>
        </div>
        {article.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl">
               <PlayCircle size={24} className="text-red-600" fill="currentColor"/>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-brand-600 transition-colors font-serif">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
           {article.excerpt}
        </p>
        <div className="flex items-center text-gray-400 text-xs gap-3 mt-auto border-t border-gray-100 pt-3">
            <span className="flex items-center gap-1 font-bold text-gray-600 uppercase text-[10px]">
              {article.author}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-1 text-[10px]">
               {article.date}
            </span>
        </div>
      </div>
    </div>
  );
};