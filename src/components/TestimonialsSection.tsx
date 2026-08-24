import React from 'react';
import { Quote, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: 'During our NAAC A++ accreditation audit, extracting 5 years of student pass rates and placement data took 12 minutes on CollegeCentre. Earlier, our staff worked overnight for two months.',
      author: 'Prof. K. R. Venkatraman',
      role: 'Registrar & Controller of Examinations',
      institute: 'Metropolitan Institute of Technology',
      badge: 'NAAC A++ ACCREDITED',
    },
    {
      quote: 'The digital degree verification solved our international credential attestation bottleneck. Foreign universities verify our alumni degrees instantly via the QR hash ledger.',
      author: 'Dr. Sunita Deshmukh',
      role: 'Dean of Academic Affairs',
      institute: 'State University of Law & Governance',
      badge: '42,000+ STUDENTS ENROLLED',
    },
    {
      quote: 'Semester course enrollment used to crash our campus servers every August. With CollegeCentre, 18,000 students completed elective selections in 45 minutes with zero downtime.',
      author: 'Dr. Arvind Mehra',
      role: 'Chief Information Officer (CIO)',
      institute: 'Apex Global University',
      badge: '99.99% SYSTEM UPTIME',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-paper-100 border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange bg-cjpOrange/10 px-3 py-1 border border-cjpOrange/30 inline-block mb-3">
            ? VERIFIED TESTIMONIALS ?
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
            DISPATCHES FROM <br />
            <span className="text-cjpOrange">UNIVERSITY REGISTRARS</span>
          </h2>
          <p className="mt-3 text-ink-muted text-base sm:text-lg font-medium">
            Hear from institutional leadership running zero-paperwork campuses on CollegeCentre.
          </p>
        </div>

        {/* 3 Brutalist Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="brutal-card p-6 sm:p-8 bg-paper-50 border-2 border-ink flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-cjpOrange text-white font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    {t.badge}
                  </span>
                  <div className="flex text-cjpGold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <Quote className="w-8 h-8 text-cjpOrange/30" />

                <p className="font-sans text-sm sm:text-base text-ink font-medium leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t-2 border-ink/20">
                <div className="font-display font-bold text-lg text-ink uppercase leading-tight">
                  {t.author}
                </div>
                <div className="text-xs font-mono text-cjpOrange font-semibold mt-0.5">
                  {t.role}
                </div>
                <div className="text-xs font-mono text-ink-light mt-0.5">
                  {t.institute}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
