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
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-navy-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 mb-3">
            Frequently Answered Questions
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-950 tracking-tight">
            Clear Answers for University Leadership.
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-navy-50/40 border border-navy-200/80 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-navy-900">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-white border border-navy-200 flex items-center justify-center text-navy-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-navy-600 leading-relaxed border-t border-navy-200/40">
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
