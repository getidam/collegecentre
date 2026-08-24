import React, { useState } from 'react';
import { GraduationCap, FileCheck, Layers, Database, Briefcase, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const ModulesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const modules = [
    {
      id: 'sis',
      title: 'Student Information System',
      short: 'SIS & Admissions',
      icon: GraduationCap,
      headline: 'Master Student Registry from Enrollment to Convocation',
      desc: 'Centralises academic credentials, government identification, scholarship certificates, hostel allocations, and disciplinary logs into one unified tamper-evident profile.',
      highlights: [
        'Automated document verification with OCR extraction',
        'Multi-department clearance workflows (Library, Labs, Hostel)',
        'Guardian notification portal with real-time academic alerts',
        'Digital student wallet for campus amenities & library access',
      ],
    },
    {
      id: 'exam',
      title: 'Examination & CGPA Engine',
      short: 'Exams & Transcripts',
      icon: FileCheck,
      headline: 'Tamper-Proof Grade Moderation & Digital Degrees',
      desc: 'Configurable relative and absolute grading schemas, automated CGPA/SGPA computation, moderation committee workflows, and direct export of National Academic Depository (NAD) records.',
      highlights: [
        'Automated moderation & standard deviation grade bell curves',
        'Barcode hall-ticket generation with anti-cheat seating allocation',
        'Cryptographic hash generation for every issued grade card',
        '1-click re-evaluation and backlog clearance tracking',
      ],
    },
    {
      id: 'attendance',
      title: 'Smart Attendance & Timetable',
      short: 'Attendance & Schedule',
      icon: Layers,
      headline: 'Biometric, RFID & Classroom Attendance Without Proxying',
      desc: 'Eliminate attendance fraud with geo-verified class check-ins, faculty timetable auto-scheduling, and automated low-attendance threshold warnings to guardians.',
      highlights: [
        'Automated debar-list generation based on 75% university rule',
        'Conflict-free classroom & laboratory timetable scheduler',
        'Medical leave / OD (On-Duty) approval workflows',
        'Subject-wise real-time attendance analytics for students',
      ],
    },
    {
      id: 'fees',
      title: 'Fee Escrow & Automated Invoicing',
      short: 'Finance & Escrow',
      icon: Database,
      headline: 'Zero-Leakage Financial Collection & Scholarship Disbursal',
      desc: 'Connects directly with university bank accounts via UPI, NetBanking, and credit channels with automatic reconciliation, fee installment plans, and scholarship deductions.',
      highlights: [
        'Multi-installment plans with automated SMS/Email reminders',
        'State & Central scholarship subsidy adjustment ledger',
        'Automated fine calculation with rule-based waiver permissions',
        'Daily reconciled settlement reports for the finance comptroller',
      ],
    },
    {
      id: 'placements',
      title: 'Placements & Alumni Network',
      short: 'Careers & Alumni',
      icon: Briefcase,
      headline: 'Campus Recruitment Drives & Lifelong Alumni Relations',
      desc: 'Automates recruiter registrations, candidate eligibility filtering by CGPA, slot booking, interview rounds, and alumni mentorship connections.',
      highlights: [
        'Auto-verification of candidate CGPA for visiting company criteria',
        'Placement drive scheduling with batch interview allocations',
        'Alumni directory with verified professional transcripts',
        'NIRF Placement data export with median salary documentation',
      ],
    },
  ];

  return (
    <section id="modules" className="py-16 md:py-24 bg-navy-50/50 border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 mb-3">
            Modular Academic Architecture
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-950 tracking-tight">
            Integrated Modules Built for Academic Scale.
          </h2>
          <p className="mt-3 text-navy-600 text-sm sm:text-base font-normal">
            Deploy the complete suite or integrate specific modules alongside your existing university infrastructure.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl font-medium text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === idx
                    ? 'bg-navy-950 text-white shadow-sm'
                    : 'bg-white text-navy-700 hover:bg-navy-100/70 border border-navy-200/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{mod.short}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="bg-white border border-navy-200/80 rounded-2xl p-6 sm:p-10 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
                Module {activeTab + 1} of 5 • {modules[activeTab].title}
              </span>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-navy-950 leading-tight">
                {modules[activeTab].headline}
              </h3>

              <p className="text-sm text-navy-600 leading-relaxed font-normal">
                {modules[activeTab].desc}
              </p>

              <div className="space-y-2.5 pt-2">
                {modules[activeTab].highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-navy-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-academic-emerald shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3 text-xs font-semibold">
                <span className="bg-navy-100 text-navy-800 px-3 py-1.5 rounded-lg border border-navy-200">
                  REST & GraphQL APIs
                </span>
                <span className="bg-academic-emerald/10 text-academic-emerald px-3 py-1.5 rounded-lg">
                  Real-Time Sync
                </span>
              </div>
            </div>

            {/* Simulated Live UI Preview */}
            <div className="lg:col-span-6">
              <div className="bg-navy-950 rounded-2xl p-5 sm:p-6 text-white shadow-subtle border border-navy-800 font-sans space-y-4">
                
                <div className="flex items-center justify-between border-b border-navy-800 pb-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-academic-emerald animate-pulse" />
                    <span className="text-navy-300 font-semibold uppercase">
                      CollegeCentre :: {modules[activeTab].title}
                    </span>
                  </div>
                  <span className="text-[10px] text-navy-500">200 OK</span>
                </div>

                {activeTab === 0 && (
                  <div className="space-y-3 bg-navy-900/60 p-4 rounded-xl border border-navy-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-navy-400">STUDENT PROFILE:</span>
                      <span className="text-academic-emerald font-semibold">ACTIVE ENROLLED</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-navy-950 p-2.5 rounded-lg border border-navy-800">
                        <span className="text-navy-500 block text-[9px]">ENROLLMENT ID</span>
                        <span className="text-white font-bold font-mono">CC-2026-CS9104</span>
                      </div>
                      <div className="bg-navy-950 p-2.5 rounded-lg border border-navy-800">
                        <span className="text-navy-500 block text-[9px]">TERM STATUS</span>
                        <span className="text-white font-semibold">Semester 5 (Regular)</span>
                      </div>
                    </div>
                    <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-navy-400">Department Clearances:</span>
                        <span className="text-academic-emerald font-semibold">100% Completed</span>
                      </div>
                      <div className="w-full bg-navy-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-academic-emerald h-full w-full rounded-full" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="space-y-3 bg-navy-900/60 p-4 rounded-xl border border-navy-800 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-navy-400">CGPA COMPUTATION LEDGER:</span>
                      <span className="bg-academic-gold/20 text-amber-300 px-2 py-0.5 rounded font-semibold">Moderation Pass</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between border-b border-navy-800 pb-1 text-navy-300">
                        <span>CS501 Distributed Systems</span>
                        <span className="text-academic-emerald font-bold">Grade: A+ (10.0)</span>
                      </div>
                      <div className="flex justify-between border-b border-navy-800 pb-1 text-navy-300">
                        <span>CS502 Neural Networks</span>
                        <span className="text-academic-emerald font-bold">Grade: A (9.0)</span>
                      </div>
                      <div className="flex justify-between text-navy-300">
                        <span>CS503 Database Internals</span>
                        <span className="text-academic-emerald font-bold">Grade: O (10.0)</span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-brand-950/80 border border-brand-800/60 rounded-lg text-brand-300 text-[10px] font-mono">
                      SHA256: 0x9f4a...2bc8 [Verified National Academic Depository]
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="space-y-3 bg-navy-900/60 p-4 rounded-xl border border-navy-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-navy-400">AGGREGATE ATTENDANCE:</span>
                      <span className="text-academic-emerald font-bold text-sm">88.4% (Eligible)</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5 text-center text-[10px]">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <div key={i} className="p-1.5 rounded bg-academic-emerald/20 border border-academic-emerald/30 text-emerald-300 font-semibold">
                          {d} ✓
                        </div>
                      ))}
                    </div>
                    <div className="text-[11px] text-navy-400 bg-navy-950 p-2.5 rounded-lg border border-navy-800">
                      Geo-verified classroom check-ins • Zero proxy entries recorded in 120 lecture slots.
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="space-y-3 bg-navy-900/60 p-4 rounded-xl border border-navy-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-navy-400">SEMESTER FEE RECONCILIATION:</span>
                      <span className="text-academic-emerald font-semibold">Zero Dues</span>
                    </div>
                    <div className="bg-navy-950 p-3 rounded-lg space-y-1 text-[11px]">
                      <div className="flex justify-between text-navy-300">
                        <span>Tuition & Lab Fee:</span>
                        <span className="text-white font-semibold">₹85,000</span>
                      </div>
                      <div className="flex justify-between text-academic-emerald">
                        <span>Merit Scholarship Subsidy:</span>
                        <span>- ₹25,000</span>
                      </div>
                      <div className="flex justify-between font-bold border-t border-navy-800 pt-1 text-brand-300">
                        <span>Net Settled (UPI Reconciled):</span>
                        <span>₹60,000</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 4 && (
                  <div className="space-y-3 bg-navy-900/60 p-4 rounded-xl border border-navy-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-navy-400">CAMPUS RECRUITMENT PORTAL:</span>
                      <span className="text-brand-400 font-semibold">34 Drives Active</span>
                    </div>
                    <div className="p-2.5 bg-navy-950 rounded-lg border border-navy-800 flex justify-between items-center text-[11px]">
                      <div>
                        <span className="text-white font-semibold block">Google Cloud Campus Drive</span>
                        <span className="text-navy-500 text-[10px]">Eligibility: CGPA ≥ 8.5</span>
                      </div>
                      <span className="bg-academic-emerald/20 text-academic-emerald text-[10px] px-2 py-0.5 rounded font-semibold">Shortlisted</span>
                    </div>
                    <div className="text-[11px] text-navy-400">
                      NIRF Placement Report 2026 Ready: 94.2% verified batch placements.
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
