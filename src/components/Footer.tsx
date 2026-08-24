import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenDemo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink text-paper-100 border-t-4 border-ink relative overflow-hidden font-mono text-xs">
      
      <div className="bg-cjpOrange text-white p-6 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white">
              READY TO UPGRADE YOUR CAMPUS OPERATING SYSTEM?
            </h3>
            <p className="font-sans text-sm text-white/90">
              Join 180+ leading universities ending student paperwork and data silos today.
            </p>
          </div>
          <button
            onClick={onOpenDemo}
            className="brutal-btn bg-paper-100 text-ink hover:bg-ink hover:text-white px-6 py-3 text-sm shrink-0 border-2 border-ink shadow-brutal"
          >
            REQUEST UNIVERSITY SANDBOX →
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cjpOrange border-2 border-paper-100 flex items-center justify-center text-white font-display text-xl font-bold">
                CC
              </div>
              <div>
                <span className="font-display font-bold text-2xl uppercase tracking-tight text-white block leading-none">
                  COLLEGE<span className="text-cjpOrange">CENTRE</span>
                </span>
                <span className="text-[10px] text-paper-400 tracking-wider">
                  STUDENT DATA OPERATING SYSTEM • EST. 2026
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-paper-300 max-w-sm leading-relaxed">
              The high-integrity, decentralized student data management and campus operating system for universities, colleges, and autonomous institutes.
            </p>

            <div className="flex items-center gap-2 text-paper-300">
              <span className="w-2 h-2 rounded-full bg-cjpGreen animate-ping"></span>
              <span className="text-[11px] font-bold text-cjpGreen">SYSTEM ENGINE: OPERATIONAL (99.99% SLA)</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase text-cjpOrange mb-3 tracking-wider">
              CORE SYSTEM
            </h4>
            <ul className="space-y-2 text-paper-300">
              <li>
                <button onClick={() => onScrollTo('vision')} className="hover:text-white transition-colors">
                  Chapter One: The Vision
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('manifesto')} className="hover:text-white transition-colors">
                  The 5 Directives
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('modules')} className="hover:text-white transition-colors">
                  Modular Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('metrics')} className="hover:text-white transition-colors">
                  Live Campus Telemetry
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase text-cjpOrange mb-3 tracking-wider">
              CAMPUS MODULES
            </h4>
            <ul className="space-y-2 text-paper-300">
              <li>
                <button onClick={() => onScrollTo('modules')} className="hover:text-white transition-colors">
                  Student Information (SIS)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('modules')} className="hover:text-white transition-colors">
                  Exam & CGPA Engine
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('modules')} className="hover:text-white transition-colors">
                  Smart Attendance & RFID
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('modules')} className="hover:text-white transition-colors">
                  Fee Escrow & Accounts
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase text-cjpOrange mb-3 tracking-wider">
              INTERACTIVE & CODE
            </h4>
            <ul className="space-y-2 text-paper-300">
              <li>
                <button onClick={() => onScrollTo('id-generator')} className="hover:text-cjpGold text-cjpGold-light font-bold transition-colors">
                  ★ Student Pass Generator
                </button>
              </li>
              <li>
                <a href="https://github.com/getidam/collegecentre.in.git" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <button onClick={() => onScrollTo('checklist')} className="hover:text-white transition-colors">
                  Accreditation Checklist
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-paper-100/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-paper-400 text-[11px]">
          <div>
            © 2026 COLLEGECENTRE (getidam/collegecentre.in). ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-paper-300">DPDPA 2023 & FERPA COMPLIANT</span>
            <button
              onClick={scrollToTop}
              className="p-2 border border-paper-100/30 hover:bg-paper-100 hover:text-ink transition-colors flex items-center gap-1 font-bold"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-3 h-2.5 w-full">
        <div className="bg-[#c9561e]" />
        <div className="bg-[#f4ebd7]" />
        <div className="bg-[#166534]" />
      </div>

    </footer>
  );
};