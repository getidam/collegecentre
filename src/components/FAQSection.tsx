import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is CollegeCentre, and how does it replace our existing campus software?',
      a: 'CollegeCentre is a modern Student Data & Campus Operating System for universities and colleges. It unifies admissions, academic records, examination grading, real-time attendance, fee escrow, and alumni relations into a single tamper-proof platform, eliminating obsolete fragmented ERPs.',
    },
    {
      q: 'How difficult is migrating 10+ years of historical university student records?',
      a: 'CollegeCentre includes automated ETL migration pipelines. Our engineering team migrates existing legacy SQL databases, Oracle schemas, or Excel registers into CollegeCentre within 72 hours, with 100% data integrity validation checks.',
    },
    {
      q: 'How does cryptographic degree and transcript verification work?',
      a: 'Every student grade card and degree certificate is signed with a cryptographic SHA-256 hash. When a recruiter or embassy scans the QR code or enters the credential ID, the system checks the tamper-evident registry and displays the verified grade sheet in under two seconds.',
    },
    {
      q: 'Is CollegeCentre compliant with UGC, NAAC, NIRF, and DPDPA data privacy rules?',
      a: 'Yes. CollegeCentre is built from the ground up to comply with UGC digital guidelines, the Indian Digital Personal Data Protection Act (DPDPA 2023), and FERPA standards. All data is encrypted at rest and in transit, and hosted on dedicated sovereign cloud regions.',
    },
    {
      q: 'Can we deploy specific modules instead of replacing our entire infrastructure at once?',
      a: 'Yes! CollegeCentre is modular. You can start with the Examination & Transcript Engine, or the Student Information System (SIS), and integrate seamlessly with your existing active directories via our REST and GraphQL APIs.',
    },
    {
      q: 'How do students and parents access their portal?',
      a: 'Students and guardians access a clean, high-speed Progressive Web App (PWA) with instant mobile notifications for attendance shortages, fee invoices, class schedules, and published examination grade cards.',
    },
  ];

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-paper-200 border-b-2 border-ink">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange bg-cjpOrange/10 px-3 py-1 border border-cjpOrange/30 inline-block mb-3">
            ? FREQUENTLY ANSWERED QUESTIONS ?
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
            CLEAR ANSWERS FOR <br />
            <span className="text-cjpOrange">UNIVERSITY LEADERSHIP</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="brutal-card bg-paper-50 border-2 border-ink overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-display font-bold text-lg sm:text-xl text-ink uppercase tracking-tight">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-none border-2 border-ink bg-paper-200 flex items-center justify-center text-ink shrink-0 font-mono">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 font-sans text-sm sm:text-base text-ink-muted leading-relaxed border-t border-ink/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
