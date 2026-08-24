import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface TopStripProps {
  onOpenDemo: () => void;
}

export const TopStrip: React.FC<TopStripProps> = ({ onOpenDemo }) => {
  return (
    <div className="bg-navy-950 text-navy-200 text-xs py-2 px-3 sm:px-4 border-b border-navy-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <span className="bg-brand-600 text-white font-medium px-2 py-0.5 rounded text-[10px] sm:text-[11px] inline-flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3" /> Release 3.2
          </span>
          <span className="text-navy-300 font-normal text-[11px] sm:text-xs">
            CollegeCentre Higher-Ed Architecture • Powering 180+ Universities
          </span>
        </div>

        <button 
          onClick={onOpenDemo}
          className="text-white hover:text-brand-300 transition-colors font-medium text-[11px] sm:text-xs flex items-center gap-1 shrink-0 py-0.5"
        >
          <span>Schedule Campus Briefing</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </div>
  );
};
