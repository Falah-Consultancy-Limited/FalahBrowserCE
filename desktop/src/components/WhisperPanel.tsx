import React from 'react';
import { ClassificationResult } from '../types';

interface WhisperPanelProps {
  isOpen: boolean;
  onClose: () => void;
  verdict: ClassificationResult | null;
}

const WhisperPanel: React.FC<WhisperPanelProps> = ({ isOpen, onClose, verdict }) => {
  if (!isOpen || !verdict) return null;

  const getStyle = () => {
    switch (verdict.verdict) {
      case 'warning': return { bg: 'bg-[#d4af37]/10', border: 'border-[#d4af37]', text: 'text-[#d4af37]', icon: '⚠️' };
      case 'blocked': return { bg: 'bg-red-900/20', border: 'border-red-500', text: 'text-red-400', icon: '⛔' };
      case 'caution': return { bg: 'bg-teal-900/20', border: 'border-falah-teal', text: 'text-falah-teal', icon: '💡' };
      default: return { bg: 'bg-gray-800/50', border: 'border-gray-700', text: 'text-falah-parchment', icon: '✨' };
    }
  };

  const style = getStyle();

  return (
    <div className={`fixed right-0 top-0 bottom-0 w-[350px] bg-falah-indigo/95 backdrop-blur-md border-l border-gray-800 shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50 flex flex-col`}>
      <div className="p-6 overflow-y-auto flex-1">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-serif font-bold text-falah-gold">Falah's Whisper</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <div className={`p-6 rounded-2xl border ${style.border} ${style.bg} mb-8`}>
          <div className="text-4xl mb-4">${style.icon}</div>
          <p className={`text-lg font-bold ${style.text} mb-2`}>
            {verdict.verdict === 'safe' ? 'Peace be upon you' : 'A gentle reminder'}
          </p>
          <p className="text-sm opacity-90 leading-relaxed">
            {verdict.reason}
          </p>
        </div>

        {verdict.evidence && (
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Evidence & Guidance</h3>
            <div className="bg-gray-900/50 p-4 rounded-xl italic text-sm">
              "{verdict.evidence}"
            </div>
          </div>
        )}

        {verdict.alternatives && verdict.alternatives.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Safe Alternatives</h3>
            <div className="space-y-3">
              {verdict.alternatives.map((alt, i) => (
                <a 
                  key={i} 
                  href={alt.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 bg-falah-teal/10 border border-falah-teal/20 rounded-xl hover:bg-falah-teal/20 transition-all group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-falah-teal font-medium">{alt.title}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-800">
        <button 
          onClick={onClose}
          className="w-full py-3 bg-falah-gold text-falah-indigo font-bold rounded-xl hover:bg-falah-gold/90 transition-all shadow-lg active:scale-95"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default WhisperPanel;
