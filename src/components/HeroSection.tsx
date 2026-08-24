import React from 'react';
import { ArrowRight, CheckCircle2, UserPlus, IdCard, Building2, Users } from 'lucide-react';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onScrollTo: (id: string) => void;
  onOpenDataCollection?: () => void;
  onOpenAdmin?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo, onScrollTo, onOpenDataCollection, onOpenAdmin }) => {
  const trustedUniversities = [
    'National Institutes of Technology',
    'State Autonomous Universities',
    'Autonomous Medical Colleges',
    'Indian Institute of Information Technology',
    'Deemed Research Campuses',
  ];

  return (
    <section id="hero" className="relative pt-8 pb-16 sm:pt-14 sm:pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-navy-50/50 via-white to-white border-b border-navy-100">
      
      {/* Subtle grid pattern background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.35]" 
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Status pill badge */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-navy-100/90 border border-navy-200 text-navy-800 text-[11px] sm:text-xs font-semibold shadow-xs text-center">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-academic-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-academic-emerald"></span>
            </span>
            <span className="truncate">Accredited Academic OS 3.2 • Unified Student Lifecycle</span>
          </div>
        </div>

        {/* Hero Typography */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display font-bold text-3xl xs:text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.12] text-navy-950 px-1">
            The Modern Operating System for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-navy-800">
              Higher Education.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-navy-600 max-w-2xl mx-auto font-normal leading-relaxed px-2">
            CollegeCentre replaces obsolete legacy ERPs with a unified, tamper-proof academic infrastructure. 
            From student admission to degree convocation in real-time.
          </p>

          {/* Value props badges */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-navy-700 px-2">
            <span className="inline-flex items-center gap-1.5 bg-navy-50 px-2.5 py-1.5 rounded-lg border border-navy-200/60 text-[11px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-academic-emerald shrink-0" /> Cryptographic Grade Cards
            </span>
            <span className="inline-flex items-center gap-1.5 bg-navy-50 px-2.5 py-1.5 rounded-lg border border-navy-200/60 text-[11px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-academic-emerald shrink-0" /> 1-Click NAAC SSR
            </span>
            <span className="inline-flex items-center gap-1.5 bg-navy-50 px-2.5 py-1.5 rounded-lg border border-navy-200/60 text-[11px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-academic-emerald shrink-0" /> DPDPA & FERPA
            </span>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 px-3 sm:px-0 flex-wrap">
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-950 text-white hover:bg-navy-800 font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Schedule Campus Walkthrough</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenDataCollection && (
              <button
                onClick={onOpenDataCollection}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-brand-50 text-brand-700 hover:bg-brand-100 font-semibold text-sm border border-brand-200/80 transition-all duration-150 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-brand-600" />
                <span>Student Admission Form</span>
              </button>
            )}

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-navy-50 text-navy-800 hover:bg-navy-100 font-semibold text-sm border border-navy-200 transition-all duration-150 flex items-center justify-center gap-2 shadow-xs"
              >
                <Users className="w-4 h-4 text-brand-600" />
                <span>View Student Records</span>
              </button>
            )}

            <button
              onClick={() => onScrollTo('id-generator')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white text-navy-700 hover:bg-navy-50 font-semibold text-sm border border-navy-200 transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
            >
              <IdCard className="w-4 h-4 text-navy-500" />
              <span>Digital ID Pass</span>
            </button>
          </div>

          {/* Institutional Trust Indicators */}
          <div className="mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-navy-100 px-2">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-navy-400 mb-4 sm:mb-5">
              TRUSTED & ADOPTED BY LEADING AUTONOMOUS UNIVERSITIES
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {trustedUniversities.map((univ) => (
                <div 
                  key={univ} 
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-navy-200/70 rounded-lg text-[11px] sm:text-xs font-medium text-navy-600 shadow-xs"
                >
                  <Building2 className="w-3.5 h-3.5 text-navy-400 shrink-0" />
                  <span>{univ}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
