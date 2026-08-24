import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ChecklistSectionProps {
  onOpenDemo: () => void;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({ onOpenDemo }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
  });

  const checklist = [
    {
      title: 'UGC & AICTE Digital Regulatory Alignment',
      desc: 'Native integration with National Academic Depository (NAD), Digilocker certification, and Academic Bank of Credits (ABC) regulations.',
    },
    {
      title: 'DPDPA 2023 & FERPA Student Data Protection',
      desc: 'Encrypted at rest with AES-256 and in transit with TLS 1.3. Role-based access logs with a strict zero data-harvesting pledge.',
    },
    {
      title: 'Automated NAAC Self-Study Report (SSR) Extraction',
      desc: 'Direct auto-generation of quantitative metrics for Criteria 2 (Teaching-Learning), Criteria 5 (Student Support), and Criteria 6 (Governance).',
    },
    {
      title: 'Zero-Loss Legacy Database Migration Tooling',
      desc: 'Automated ETL connectors for Oracle, Microsoft SQL Server, PostgreSQL, and legacy campus software within 72 hours.',
    },
    {
      title: '99.99% High-Availability Sovereign Cloud Infrastructure',
      desc: 'Engineered for peak traffic during semester examination result declarations and admissions with auto-scaling compute gateways.',
    },
  ];

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="checklist" className="py-16 md:py-24 bg-white border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 mb-3">
            Accreditation & Compliance
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-950 tracking-tight">
            Institutional Governance & Compliance Checklist.
          </h2>
          <p className="mt-3 text-navy-600 text-sm sm:text-base font-normal">
            Verify your university’s technical readiness to transition to the CollegeCentre Academic Operating System.
          </p>
        </div>

        {/* Checkable List */}
        <div className="space-y-3">
          {checklist.map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                checkedItems[idx]
                  ? 'bg-navy-50/40 border-navy-200/80 shadow-xs hover:border-navy-300'
                  : 'bg-white border-navy-200 opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 shrink-0">
                  {checkedItems[idx] ? (
                    <div className="w-5 h-5 rounded-md bg-academic-emerald text-white flex items-center justify-center text-xs shadow-xs">
                      ✓
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md bg-white border border-navy-300" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-wide">
                      Standard 0{idx + 1}
                    </span>
                    <h3 className="font-display font-semibold text-base text-navy-950">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-navy-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Score Banner */}
        <div className="mt-10 p-6 bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-2xl shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-academic-emerald/20 border border-academic-emerald/30 flex items-center justify-center text-academic-emerald font-bold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-white">
                100% University Readiness Score
              </div>
              <div className="text-xs text-navy-300">
                Meets all National Higher Education Data Governance and NAAC specifications.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenDemo}
            className="px-6 py-3 rounded-xl bg-white text-navy-900 hover:bg-navy-100 font-semibold text-xs transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Request Institutional Briefing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
