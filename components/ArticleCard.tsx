import React from 'react';
import { PlayCircle, Clock, User } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  variant?: 'standard' | 'compact' | 'overlay' | 'horizontal';
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'standard', className = '' }) => {
  
  if (variant === 'overlay') {
    return (
      <div className={`group relative overflow-hidden rounded-lg cursor-pointer h-full ${className}`}>
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <span className="inline-block px-2 py-0.5 mb-2 text-xs font-bold text-white bg-brand-600 rounded uppercase tracking-wider">
            {article.category}
          </span>
          <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-brand-400 transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center text-gray-300 text-xs gap-3">
             <span className="flex items-center gap-1"><User size={12}/> {article.author}</span>
             <span className="flex items-center gap-1"><Clock size={12}/> {article.date}</span>
          </div>
        </div>
        {article.isVideo && (
          <div className="absolute top-3 right-3 text-white bg-red-600 rounded-full p-1 animate-pulse">
            <PlayCircle size={20} fill="white" className="text-red-600" />
          </div>
        )}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex gap-4 items-start group cursor-pointer border-b border-gray-100 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 ${className}`}>
        <div className="w-24 h-24 shrink-0 overflow-hidden rounded-md relative">
           <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {article.isVideo && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <PlayCircle size={24} className="text-white drop-shadow-lg" />
             </div>
          )}
        </div>
        <div className="flex-1">
          <span className="text-brand-600 text-xs font-bold uppercase mb-1 block">
             {article.category}
          </span>
          <h4 className="font-bold text-gray-800 text-sm leading-snug mb-1 group-hover:text-brand-600 transition-colors line-clamp-2">
            {article.title}
          </h4>
          <span className="text-gray-400 text-xs flex items-center gap-1">
             <Clock size={10} /> {article.date}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col group cursor-pointer ${className}`}>
      <div className="relative overflow-hidden rounded-lg mb-3 aspect-video">
         <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2">
           <span className="px-2 py-1 text-xs font-bold text-white bg-black/70 backdrop-blur-sm rounded">
             {article.category}
           </span>
        </div>
        {article.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/50">
               <PlayCircle size={32} className="text-white drop-shadow-lg" fill="currentColor"/>
            </div>
          </div>
        )}
      </div>
      <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-brand-600 transition-colors">
        {article.title}
      </h3>
      <div className="flex items-center text-gray-500 text-xs gap-3 mt-auto">
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <User size={12}/> {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12}/> {article.date}
          </span>
      </div>
    </div>
  );
};
