import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface TopStripProps {
  onOpenDemo: () => void;
}

export const TopStrip: React.FC<TopStripProps> = ({ onOpenDemo }) => {
  return (
    <div className="bg-navy-900 text-navy-200 text-xs py-2 px-4 border-b border-navy-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="bg-brand-600/90 text-white font-medium px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Release 3.2
          </span>
          <span className="text-navy-300 font-normal">
            CollegeCentre Higher-Ed Architecture • Powering 180+ Universities with Next-Gen SIS & Cryptographic Credentials
          </span>
        </div>

        <button 
          onClick={onOpenDemo}
          className="text-white hover:text-brand-300 transition-colors font-medium text-xs flex items-center gap-1 shrink-0"
        >
          <span>Schedule Campus Briefing</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
