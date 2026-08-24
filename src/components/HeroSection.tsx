import React from 'react';
import { ArrowRight, IdCard, ShieldCheck, Terminal, BookOpen, Globe, Code2, Users, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onScrollTo: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo, onScrollTo }) => {
  const socialPills = [
    { label: 'Registrar Network', icon: Users, href: '#', isHighlight: true },
    { label: 'Campus Registry', icon: Globe, href: '#' },
    { label: 'GitHub Core', icon: Code2, href: 'https://github.com/getidam/collegecentre.in.git' },
    { label: 'API v3 Docs', icon: Terminal, href: '#' },
    { label: 'Accreditation Shield', icon: ShieldCheck, href: '#' },
  ];

  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b-2 border-ink">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: 'linear-gradient(#d7c59f 1px, transparent 1px), linear-gradient(90deg, #d7c59f 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-paper-100 border-2 border-ink rounded-full shadow-brutal-sm font-mono text-xs font-bold text-ink">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cjpGreen-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cjpGreen"></span>
            </span>
            <span>CAMPUS OS 3.2 — LIVE & POWERING 180+ UNIVERSITIES</span>
          </div>
        </div>

        <div className="text-center max-w-5xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-ink uppercase mb-6">
            THE OPERATING SYSTEM <br />
            <span className="text-cjpOrange inline-block transform -skew-x-2">FOR MODERN</span> <br />
            <span className="relative inline-block">
              UNIVERSITIES.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-cjpOrange" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,5 Q50,12 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-ink-muted max-w-3xl mx-auto font-sans leading-relaxed font-medium">
            CollegeCentre dismantles obsolete campus ERPs and bureaucratic paper chaos with a unified, 
            immutable <strong className="text-ink font-bold">Student Lifecycle & Data Engine</strong>. 
            From admission to degree convocation in real-time.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono font-bold text-ink">
            <span className="flex items-center gap-1.5 bg-paper-100 px-3 py-1 border border-ink shadow-brutal-sm">
              <CheckCircle2 className="w-4 h-4 text-cjpGreen" /> 100% Tamper-Proof Transcripts
            </span>
            <span className="flex items-center gap-1.5 bg-paper-100 px-3 py-1 border border-ink shadow-brutal-sm">
              <CheckCircle2 className="w-4 h-4 text-cjpGreen" /> Zero ERP Licensing Extortion
            </span>
            <span className="flex items-center gap-1.5 bg-paper-100 px-3 py-1 border border-ink shadow-brutal-sm">
              <CheckCircle2 className="w-4 h-4 text-cjpGreen" /> NAAC / NIRF 1-Click Reports
            </span>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto brutal-btn bg-cjpOrange text-white hover:bg-ink px-8 py-4 text-lg font-display tracking-wider flex items-center justify-center gap-3 shadow-brutal"
            >
              <span>DEPLOY UNIVERSITY OS</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onScrollTo('id-generator')}
              className="w-full sm:w-auto brutal-btn bg-paper-100 text-ink hover:bg-paper-50 px-8 py-4 text-lg font-display tracking-wider flex items-center justify-center gap-2.5 shadow-brutal border-2 border-ink"
            >
              <IdCard className="w-5 h-5 text-cjpOrange" />
              <span>GENERATE DIGITAL ID CARD ★</span>
            </button>

            <button
              onClick={() => onScrollTo('manifesto')}
              className="w-full sm:w-auto font-mono text-sm uppercase font-bold text-ink hover:text-cjpOrange py-3 px-4 underline underline-offset-4 tracking-wider flex items-center justify-center gap-1"
            >
              <BookOpen className="w-4 h-4" />
              <span>READ THE 5 DIRECTIVES</span>
            </button>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-ink/20">
            <div className="text-[11px] font-mono uppercase text-ink-light tracking-widest mb-3 font-bold">
              OFFICIAL SYSTEM CHANNELS & AUDIT REGISTRY
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {socialPills.map((pill) => (
                <a
                  key={pill.label}
                  href={pill.href}
                  target={pill.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={
                    'brutal-pill px-3.5 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 ' +
                    (pill.isHighlight ? 'bg-ink text-paper-100 hover:bg-cjpOrange' : 'text-ink')
                  }
                >
                  <pill.icon className="w-3.5 h-3.5 text-cjpOrange" />
                  <span>{pill.label}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};