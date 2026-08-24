import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const VisionSection: React.FC = () => {
  return (
    <section id="vision" className="py-16 md:py-24 bg-white border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 mb-3">
            Architectural Transformation
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-950 tracking-tight">
            Why Legacy University ERPs Fail Modern Campuses.
          </h2>
          <p className="mt-3 text-navy-600 text-sm sm:text-base font-normal">
            For three decades, institutions have struggled with sluggish 1990s monolithic software, disconnected departmental spreadsheets, and paper queues. CollegeCentre is the clean architectural reset.
          </p>
        </div>

        {/* Side-by-side comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Legacy System Card */}
          <div className="bg-navy-50/50 border border-navy-200/80 rounded-2xl p-6 sm:p-8 shadow-card relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-navy-900">
                    Legacy Campus ERPs & Excel
                  </h3>
                  <span className="text-xs text-navy-500 font-medium">
                    Fragmented, vulnerable & slow
                  </span>
                </div>
              </div>

              <span className="text-xs font-semibold text-red-700 bg-red-100/70 px-2.5 py-1 rounded-full">
                Obsolete
              </span>
            </div>

            <ul className="space-y-4 text-sm text-navy-600">
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 font-semibold">Disconnected Department Silos:</strong> Admissions, exam cell, library, and accounts use 4 different databases that do not sync.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 font-semibold">Transcript Forgery Vulnerabilities:</strong> Paper marksheets lack cryptographic signatures, making verification slow and manual.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 font-semibold">Manual Accreditation Stress:</strong> Staff spend months assembling documentation for NAAC, NIRF, and NBA inspections.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 font-semibold">Costly Vendor Lock-ins:</strong> Massive annual maintenance contracts (AMC) required for even simple curriculum changes.
                </div>
              </li>
            </ul>
          </div>

          {/* CollegeCentre Modern Card */}
          <div className="bg-gradient-to-br from-white to-brand-50/30 border border-brand-200/80 rounded-2xl p-6 sm:p-8 shadow-card-hover relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-academic-emerald/10 text-academic-emerald flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-navy-900">
                    CollegeCentre Academic OS
                  </h3>
                  <span className="text-xs text-brand-700 font-medium">
                    Unified, cryptographic & auditable
                  </span>
                </div>
              </div>

              <span className="text-xs font-semibold text-academic-emerald bg-academic-emerald/10 px-2.5 py-1 rounded-full">
                Next-Gen
              </span>
            </div>

            <ul className="space-y-4 text-sm text-navy-600">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-academic-emerald shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 font-semibold">Single Unified Student Registry:</strong> One tamper-evident master record follows the student from enrollment to alumni network.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-academic-emerald shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 font-semibold">Cryptographically Sealed Transcripts:</strong> SHA-256 digital degree certificates verifiable by employers in under 2 seconds.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-academic-emerald shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 font-semibold">Automated Accreditation SSR:</strong> Instant export of quantitative data points for NAAC, NIRF, and NBA compliance.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-academic-emerald shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-900 font-semibold">Modular Open Architecture:</strong> 99.99% high-availability cloud infrastructure with REST & GraphQL data connectors.
                </div>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
