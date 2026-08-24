import React from 'react';
import { Quote, Star, Building2, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: 'CollegeCentre reduced our semester grade moderation and degree printing cycle from 6 weeks to 36 hours. The cryptographic transcript verification has completely eliminated verification backlogs from global embassies and employers.',
      name: 'Prof. Dr. K. Venkataraman',
      role: 'Controller of Examinations & Registrar',
      institution: 'State Autonomous Institute of Technology',
      initials: 'KV',
    },
    {
      quote: 'Generating our NAAC Self-Study Report (SSR) Criterion 2 and 5 previously took our faculty 4 months of overtime spreadsheet auditing. With CollegeCentre, we exported the entire authenticated dataset in a single afternoon.',
      name: 'Dr. Meenakshi Sundaram',
      role: 'Dean of Academic Governance',
      institution: 'National University of Sciences & Humanities',
      initials: 'MS',
    },
    {
      quote: 'The unified fee escrow and automated scholarship ledger brought 100% transparency to our finance operations. Zero reconciliation discrepancies across 14,000 enrolled students.',
      name: 'Rajiv Sengupta',
      role: 'Chief Information Officer (CIO)',
      institution: 'Apex Global Medical University',
      initials: 'RS',
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-navy-50/50 border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 mb-3">
            Institutional Leadership Feedback
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-950 tracking-tight">
            Endorsed by Registrars, Deans & CIOs.
          </h2>
          <p className="mt-3 text-navy-600 text-sm sm:text-base font-normal">
            Hear from autonomous university leadership managing over 650,000+ student profiles on CollegeCentre.
          </p>
        </div>

        {/* 3 Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-navy-200/80 rounded-2xl p-6 sm:p-7 shadow-card flex flex-col justify-between transition-all hover:shadow-card-hover hover:border-navy-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-academic-emerald bg-academic-emerald/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>

                <p className="text-sm text-navy-700 leading-relaxed font-normal mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-navy-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy-900 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-navy-950 leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-xs text-brand-600 font-medium">{t.role}</p>
                  <p className="text-[11px] text-navy-400">{t.institution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
