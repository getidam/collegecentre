import React from 'react';
import { ArrowUp, Code2, Shield } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenDemo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-white border-t border-navy-800 relative overflow-hidden font-sans">
      
      {/* Top Action Banner */}
      <div className="bg-gradient-to-r from-brand-700 via-navy-900 to-navy-950 border-b border-navy-800 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Ready to modernise your campus operating infrastructure?
            </h3>
            <p className="text-sm text-navy-300 mt-1">
              Join 180+ leading universities ending student paperwork and data silos today.
            </p>
          </div>
          <button
            onClick={onOpenDemo}
            className="px-6 py-3.5 rounded-xl bg-white text-navy-950 hover:bg-navy-100 font-semibold text-sm transition-all shrink-0 shadow-md"
          >
            Request Institutional Sandbox →
          </button>
        </div>
      </div>

      {/* Footer Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                <Shield className="w-5 h-5 text-brand-200" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white tracking-tight block leading-none">
                  College<span className="text-brand-400">Centre</span>
                </span>
                <span className="text-xs text-navy-400">
                  Higher-Ed Operating System • Est. 2026
                </span>
              </div>
            </div>

            <p className="text-xs text-navy-400 max-w-sm leading-relaxed font-normal">
              The high-integrity, decentralized student data management and campus operating system for universities, colleges, and autonomous institutes.
            </p>

            <div className="flex items-center gap-2 text-xs text-academic-emerald font-semibold">
              <span className="w-2 h-2 rounded-full bg-academic-emerald animate-pulse" />
              <span>Core Gateway Status: Operational (99.99% SLA)</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs text-brand-400 mb-3.5 uppercase tracking-wider">
              Core Architecture
            </h4>
            <ul className="space-y-2 text-xs text-navy-300 font-normal">
              <li>
                <button onClick={() => onScrollTo('vision')} className="hover:text-white transition-colors">
                  System Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('manifesto')} className="hover:text-white transition-colors">
                  5 Core Standards
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('modules')} className="hover:text-white transition-colors">
                  Modular System
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('metrics')} className="hover:text-white transition-colors">
                  Live Network Telemetry
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs text-brand-400 mb-3.5 uppercase tracking-wider">
              Campus Modules
            </h4>
            <ul className="space-y-2 text-xs text-navy-300 font-normal">
              <li>
                <button onClick={() => onScrollTo('modules')} className="hover:text-white transition-colors">
                  Student Info System (SIS)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('modules')} className="hover:text-white transition-colors">
                  Examination & Grades
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('modules')} className="hover:text-white transition-colors">
                  Smart Attendance & RFID
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('modules')} className="hover:text-white transition-colors">
                  Fee Escrow & Invoicing
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs text-brand-400 mb-3.5 uppercase tracking-wider">
              Resources & Code
            </h4>
            <ul className="space-y-2 text-xs text-navy-300 font-normal">
              <li>
                <button onClick={() => onScrollTo('id-generator')} className="hover:text-white text-brand-300 font-medium transition-colors">
                  ★ Digital Student Pass
                </button>
              </li>
              <li>
                <a href="https://github.com/getidam/collegecentre.git" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <button onClick={() => onScrollTo('checklist')} className="hover:text-white transition-colors">
                  Compliance Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('faq')} className="hover:text-white transition-colors">
                  Leadership FAQ
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-navy-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy-400">
          <div>
            © 2026 CollegeCentre (getidam/collegecentre). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>DPDPA 2023 & FERPA Compliant</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg border border-navy-800 hover:bg-navy-900 hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
};
