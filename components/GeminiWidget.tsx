import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { getBusinessAdvice } from '../services/geminiService';

export const GeminiWidget: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const advice = await getBusinessAdvice(query);
    setResponse(advice);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-brand-900 rounded-xl p-6 text-white shadow-xl relative overflow-hidden mb-8">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-brand-500 p-2 rounded-lg">
            <Sparkles size={20} className="text-white" />
          </div>
          <h3 className="font-bold text-xl font-serif">Gemini Coach</h3>
        </div>
        
        <p className="text-gray-300 text-sm mb-4">
          ¿Necesitas inspiración rápida? Pregunta sobre un tema (ej: "Productividad", "Ventas") y obtén un consejo instantáneo.
        </p>

        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Tema de interés..."
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button 
            onClick={handleAsk}
            disabled={loading}
            className="bg-brand-500 hover:bg-brand-600 text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin"/> : <Send size={18} />}
          </button>
        </div>

        {response && (
          <div className="bg-white/10 rounded-lg p-3 border border-white/10 animate-fade-in">
            <p className="text-sm font-medium italic text-brand-200">"{response}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
