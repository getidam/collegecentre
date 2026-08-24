import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface TopStripProps {
  onOpenDemo: () => void;
}

export const TopStrip: React.FC<TopStripProps> = ({ onOpenDemo }) => {
  return (
    <div className="bg-ink text-paper-200 border-b-2 border-ink text-xs font-mono py-2 px-4 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
          <span className="bg-cjpOrange text-white font-bold px-2 py-0.5 text-[10px] tracking-wider uppercase">
            RELEASED V3.2
          </span>
          <span className="text-paper-400 font-medium">
            <strong>5 Core Directives to End University Data Chaos:</strong> Immutable Student Records & Instant Accreditation Audit
          </span>
        </div>

        <button 
          onClick={onOpenDemo}
          className="flex items-center gap-1 text-cjpGold-light hover:text-white transition-colors uppercase font-bold tracking-wider text-[11px] group shrink-0"
        >
          <span>University Onboarding</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
