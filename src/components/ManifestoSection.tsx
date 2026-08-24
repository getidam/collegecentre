import React from 'react';
import { ShieldCheck, Clock, Lock, Sparkles, Award } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  const directives = [
    {
      num: '01',
      tagline: 'TRANSCRIPT INTEGRITY',
      title: 'Cryptographically Verifiable Academic Transcripts',
      desc: 'Every grade card and degree scroll is signed with an immutable cryptographic hash. Global employers, embassies, and verification agencies authenticate student credentials in under 2 seconds.',
      icon: ShieldCheck,
      pill: 'Zero Forgery',
    },
    {
      num: '02',
      tagline: 'SEMESTER EFFICIENCY',
      title: '1-Click Course Registration & Auto-Timetable',
      desc: 'Students choose core electives, review automated prerequisite checks, clear lab fees, and receive their digital semester schedule instantaneously without paper forms or physical queues.',
      icon: Clock,
      pill: 'Frictionless',
    },
    {
      num: '03',
      tagline: 'FINANCIAL ACCURACY',
      title: 'Automated Fee Settlement & Scholarship Escrow',
      desc: 'Direct payment gateway integration with instant receipt generation, installment tracking, government scholarship deductions, and daily reconciled ledger reports for the finance dean.',
      icon: Award,
      pill: 'Zero Leakage',
    },
    {
      num: '04',
      tagline: 'DATA GOVERNANCE',
      title: 'Granular Role-Based Access (DPDPA 2023 & FERPA)',
      desc: 'Granular permissions ensure professors only access their assigned classroom marks, registrars control policy changes, and students own their personal data with audit logging.',
      icon: Lock,
      pill: 'Privacy by Design',
    },
    {
      num: '05',
      tagline: 'ACCREDITATION READINESS',
      title: '1-Click Institutional Audit Reports (NAAC, NIRF, NBA)',
      desc: 'Convert continuous student data, attendance rates, faculty-student ratios, and placement records into exportable NAAC Self-Study Reports (SSR) in minutes instead of months.',
      icon: Sparkles,
      pill: 'Automated SSR',
    },
  ];

  return (
    <section id="manifesto" className="py-16 md:py-24 bg-navy-50/50 border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 mb-3">
            Institutional Directives
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-950 tracking-tight">
            The Five Core Standards of Modern Higher Education.
          </h2>
          <p className="mt-3 text-navy-600 text-sm sm:text-base font-normal">
            Engineered to establish transparency, institutional efficiency, and student data integrity across accredited universities.
          </p>
        </div>

        {/* 5 Cards List */}
        <div className="space-y-4">
          {directives.map((dir) => (
            <div
              key={dir.num}
              className="bg-white border border-navy-200/80 rounded-2xl p-6 sm:p-7 shadow-card transition-all hover:shadow-card-hover hover:border-navy-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div className="lg:col-span-2 flex items-center lg:flex-col lg:items-start justify-between border-b lg:border-b-0 lg:border-r border-navy-100 pb-3 lg:pb-0 lg:pr-6">
                  <span className="font-display font-black text-3xl sm:text-4xl text-brand-600 leading-none">
                    {dir.num}
                  </span>
                  <span className="text-[11px] font-semibold text-navy-500 bg-navy-50 px-2.5 py-1 rounded-full mt-2">
                    {dir.pill}
                  </span>
                </div>

                <div className="lg:col-span-10 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-600">
                    {dir.tagline}
                  </div>
                  <h3 className="font-display font-bold text-xl text-navy-950 tracking-tight">
                    {dir.title}
                  </h3>
                  <p className="text-sm text-navy-600 font-normal leading-relaxed pt-1">
                    {dir.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
