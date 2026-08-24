import React, { useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

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
      title: 'UGC & AICTE Digital Guidelines Compliance',
      desc: 'Native alignment with National Academic Depository (NAD), Digilocker integration, and Academic Bank of Credits (ABC) regulations.',
    },
    {
      title: 'DPDPA 2023 & FERPA Student Data Protection',
      desc: 'Encrypted at rest with AES-256 and in transit with TLS 1.3. Role-based access logs with strict zero data-harvesting pledge.',
    },
    {
      title: 'Automated NAAC Self-Study Report (SSR) Extraction',
      desc: 'Direct auto-generation of quantitative metrics for Criteria 2 (Teaching-Learning), Criteria 5 (Student Support), and Criteria 6 (Governance).',
    },
    {
      title: 'Legacy Database Zero-Loss Migration Tooling',
      desc: 'Automated ETL connectors for Oracle, SQL Server, Excel spreadsheets, and legacy campus software within 72 hours.',
    },
    {
      title: '99.99% High-Availability Multi-Region Cloud',
      desc: 'Engineered for peak traffic during semester result declarations and entrance examination admissions with auto-scaling gateways.',
    },
  ];

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="checklist" className="py-16 md:py-24 bg-paper-200 border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange bg-cjpOrange/10 px-3 py-1 border border-cjpOrange/30 inline-block mb-3">
            ★ INSTITUTIONAL READINESS ★
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
            ACCREDITATION & SECURITY <br />
            <span className="text-cjpOrange">COMPLIANCE CHECKLIST</span>
          </h2>
          <p className="mt-3 text-ink-muted text-base sm:text-lg font-medium">
            Verify your university’s technical readiness to upgrade to the CollegeCentre Operating System.
          </p>
        </div>

        <div className="space-y-4">
          {checklist.map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={
                'p-5 sm:p-6 border-2 border-ink cursor-pointer transition-all ' +
                (checkedItems[idx] ? 'bg-paper-50 shadow-brutal-sm border-ink' : 'bg-paper-100 opacity-80')
              }
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 text-cjpGreen">
                  {checkedItems[idx] ? (
                    <div className="w-6 h-6 bg-cjpGreen text-white flex items-center justify-center border-2 border-ink font-bold text-xs">
                      ✓
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-paper-200 border-2 border-ink"></div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-cjpOrange uppercase">
                      CRITERION 0{idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-ink uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-ink-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-paper-100 border-2 border-ink shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cjpGreen-tint border-2 border-ink flex items-center justify-center text-cjpGreen font-bold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display text-xl font-bold uppercase text-ink">
                100% University Readiness Score
              </div>
              <div className="text-xs font-mono text-ink-muted">
                Meets all National Higher Education Data Governance specifications.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenDemo}
            className="brutal-btn bg-ink text-paper-100 hover:bg-cjpOrange px-6 py-3 text-sm shrink-0 flex items-center gap-2"
          >
            <span>Request Onboarding Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
