import React from 'react';
import { ShieldCheck, Clock, Lock, Sparkles, Award } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  const directives = [
    {
      num: '01',
      tagline: 'END TRANSCRIPT FORGERY & DEGREE TAMPERING',
      title: 'Cryptographically Verifiable Academic Transcripts',
      desc: 'Every grade sheet, provisional certificate, and degree scroll is minted with a verifiable cryptographic hash. Global employers, embassies, and verification agencies authenticate student credentials in under 2 seconds without manual registrar mail queries.',
      icon: ShieldCheck,
      pill: 'ZERO FRAUD DIRECTIVE',
    },
    {
      num: '02',
      tagline: 'KILL THE PHYSICAL QUEUES & PAPER FORMS',
      title: '1-Click Universal Semester Enrollment',
      desc: 'Students select core electives, review automated prerequisite checks, clear lab fees, and receive their digital semester course schedule instantaneously. Section limits and quota rules are enforced algorithmically with zero paperwork.',
      icon: Clock,
      pill: 'ZERO PAPER DIRECTIVE',
    },
    {
      num: '03',
      tagline: '100% RECONCILED TUITION & SCHOLARSHIP LEDGER',
      title: 'Automated Real-Time Fee Settlement & Escrow',
      desc: 'Direct payment gateway integration with instant receipt generation, installment tracking, government scholarship deduction, and automated fine waivers. The finance dean gets daily automated bank reconciliation reports.',
      icon: Award,
      pill: 'FINANCIAL INTEGRITY DIRECTIVE',
    },
    {
      num: '04',
      tagline: 'STRICT ROLE-BASED DATA ACCESS & STUDENT PRIVACY',
      title: 'Zero-Leak Identity & DPDPA/FERPA Compliance',
      desc: 'Granular permissions ensure professors only access their assigned classroom marks, registrars control policy changes, and students own their personal data. Multi-factor authentication and tamper-evident audit logs protect all actions.',
      icon: Lock,
      pill: 'PRIVACY & SECURITY DIRECTIVE',
    },
    {
      num: '05',
      tagline: 'AUTOMATE ACCREDITATION PANIC',
      title: '1-Click Institutional Audit Reports (NAAC, NIRF & NBA)',
      desc: 'Convert continuous student data, attendance rates, faculty ratios, exam pass percentages, and placement metrics into exportable NAAC Self-Study Reports (SSR) and NIRF data tables in seconds instead of months of manual panic.',
      icon: Sparkles,
      pill: 'ACCREDITATION DIRECTIVE',
    },
  ];

  return (
    <section id="manifesto" className="py-16 md:py-24 bg-paper-100 border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange bg-cjpOrange/10 px-3 py-1 border border-cjpOrange/30 inline-block mb-3">
            ★ THE CAMPUS CHARTER ★
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
            THE FIVE CORE DIRECTIVES. <br />
            <span className="text-cjpOrange">OUR SYSTEM MANIFESTO.</span>
          </h2>
          <p className="mt-4 text-ink-muted text-base sm:text-lg font-medium">
            Read it once. Read it twice. Then implement it on your campus to end student data chaos forever.
          </p>
        </div>

        <div className="space-y-6">
          {directives.map((dir) => (
            <div
              key={dir.num}
              className="brutal-card p-6 sm:p-8 bg-paper-50 border-2 border-ink hover:border-cjpOrange transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div className="lg:col-span-2 flex items-center lg:flex-col lg:items-start justify-between border-b lg:border-b-0 lg:border-r border-ink/20 pb-4 lg:pb-0 lg:pr-6">
                  <span className="font-display font-black text-5xl sm:text-6xl text-cjpOrange leading-none">
                    {dir.num}
                  </span>
                  <span className="bg-ink text-paper-100 font-mono text-[9px] font-bold px-2 py-1 uppercase tracking-wider mt-2">
                    {dir.pill}
                  </span>
                </div>

                <div className="lg:col-span-10 space-y-2">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-cjpOrange">
                    {dir.tagline}
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink uppercase tracking-tight">
                    {dir.title}
                  </h3>
                  <p className="text-sm sm:text-base text-ink-muted font-sans font-normal leading-relaxed pt-1">
                    {dir.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-ink text-paper-100 border-2 border-ink shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="text-center sm:text-left">
            <div className="font-display text-2xl font-bold uppercase text-cjpOrange">
              ACCESSIBLE • ACCREDITED • TAMPER-PROOF
            </div>
            <div className="text-xs text-paper-300">
              The standardized student operating architecture designed for 21st-century higher education.
            </div>
          </div>
          <span className="bg-cjpOrange text-white text-xs font-bold px-4 py-2 uppercase tracking-widest shrink-0">
            ARTICLE 2026.UGC
          </span>
        </div>

      </div>
    </section>
  );
};