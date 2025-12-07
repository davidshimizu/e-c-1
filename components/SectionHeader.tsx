import React from 'react';

interface SectionHeaderProps {
  title: string;
  color?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between border-b-2 border-gray-100 mb-6 pb-2">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-brand-600 rounded-sm"></div>
        <h2 className="text-xl font-bold uppercase tracking-tight text-gray-900 font-serif">{title}</h2>
      </div>
      <div className="hidden sm:flex gap-4 text-xs font-bold text-gray-500 uppercase">
        <a href="#" className="hover:text-brand-600 transition-colors">Startups</a>
        <a href="#" className="hover:text-brand-600 transition-colors">Liderazgo</a>
        <a href="#" className="hover:text-brand-600 transition-colors">Dinero</a>
      </div>
    </div>
  );
};
