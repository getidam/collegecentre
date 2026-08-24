import React, { useState } from 'react';
import { GraduationCap, FileCheck, Layers, Database, Briefcase, CheckCircle2, Sparkles } from 'lucide-react';

export const ModulesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const modules = [
    {
      id: 'sis',
      title: 'Student Information System',
      short: 'SIS & Lifecycle',
      icon: GraduationCap,
      headline: 'The Master Registry for Every Student from Admission to Alumni',
      desc: 'Centralizes academic records, government identification, scholarship proofs, hostel allocations, and disciplinary logs into one unified tamper-evident profile.',
      highlights: [
        'Automated document verification with OCR extraction',
        'Multi-department clearance workflows (Library, Labs, Hostel)',
        'Guardian portal with real-time academic notifications',
        'Student digital wallet for campus amenities & access control',
      ],
    },
    {
      id: 'exam',
      title: 'Examination & CGPA Engine',
      short: 'Exams & Grades',
      icon: FileCheck,
      headline: 'Tamper-Proof Grade Curves, Moderation & Digital Degrees',
      desc: 'Configurable relative and absolute grading schemas, automated CGPA/SGPA computation, moderation committees, and instantaneous export of National Academic Depository (NAD) records.',
      highlights: [
        'Auto-moderation & standard deviation grade bell curves',
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
      desc: 'Eliminate attendance fraud with geo-verified class check-ins, faculty timetable auto-scheduling, and automated low-attendance threshold warnings to parents.',
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
      short: 'Fees & Accounts',
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
      short: 'Career & Alumni',
      icon: Briefcase,
      headline: 'Campus Recruitment Drives & Lifelong Alumni Engagement',
      desc: 'Automates company registration, job eligibility filtering by CGPA, slot booking, interview rounds, and alumni mentorship connections.',
      highlights: [
        'Auto-verification of candidate CGPA for visiting company criteria',
        'Placement drive scheduling with batch interview allocations',
        'Alumni directory with verified professional transcripts',
        'NIRF Placement data export with median salary documentation',
      ],
    },
  ];

  return (
    <section id="modules" className="py-16 md:py-24 bg-paper-100 border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange bg-cjpOrange/10 px-3 py-1 border border-cjpOrange/30 inline-block mb-3">
            ★ SYSTEM ARCHITECTURE ★
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
            MODULAR CAMPUS OS. <br />
            <span className="text-cjpOrange">BUILT FOR SCALE.</span>
          </h2>
          <p className="mt-3 text-ink-muted text-base sm:text-lg font-medium">
            Deploy the entire suite or integrate specific modules alongside your existing university infrastructure.
          </p>
        </div>

        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(idx)}
                className={
                  'px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap border-2 border-ink transition-all flex items-center gap-2 ' +
                  (activeTab === idx
                    ? 'bg-cjpOrange text-white shadow-brutal translate-x-[-2px] translate-y-[-2px]'
                    : 'bg-paper-200 text-ink hover:bg-paper-50')
                }
              >
                <Icon className="w-4 h-4" />
                <span>{mod.short}</span>
              </button>
            );
          })}
        </div>

        <div className="brutal-card bg-paper-50 p-6 sm:p-10 border-2 border-ink shadow-brutal-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cjpOrange bg-cjpOrange/10 px-3 py-1 border border-cjpOrange/30 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MODULE {activeTab + 1} OF 5</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-ink uppercase leading-tight">
                {modules[activeTab].headline}
              </h3>

              <p className="font-sans text-sm sm:text-base text-ink-muted leading-relaxed font-normal">
                {modules[activeTab].desc}
              </p>

              <div className="space-y-2.5 pt-2">
                {modules[activeTab].highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 font-sans text-sm text-ink font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cjpGreen shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase text-ink bg-paper-200 px-3 py-1.5 border border-ink">
                  API ENDPOINTS: REST + GRAPHQL
                </span>
                <span className="font-mono text-xs font-bold uppercase text-cjpGreen bg-cjpGreen-tint px-3 py-1.5 border border-cjpGreen/30">
                  REAL-TIME SYNC
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-ink border-2 border-ink p-4 sm:p-6 text-paper-100 shadow-brutal font-mono text-xs space-y-4">
                
                <div className="flex items-center justify-between border-b border-paper-100/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cjpOrange animate-pulse"></span>
                    <span className="font-bold text-paper-200 uppercase">
                      COLLEGECENTRE :: {modules[activeTab].title}
                    </span>
                  </div>
                  <span className="text-[10px] text-paper-400">NODE_VERIFIED: 200 OK</span>
                </div>

                {activeTab === 0 && (
                  <div className="space-y-3 bg-paper-100/5 p-4 border border-paper-100/10">
                    <div className="flex items-center justify-between">
                      <span className="text-paper-400">STUDENT PROFILE:</span>
                      <span className="text-cjpGreen font-bold">ACTIVE ENROLLED</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-black/30 p-2 border border-paper-100/10">
                        <span className="text-paper-400 block text-[9px]">ENROLLMENT ID</span>
                        <span className="text-white font-bold">CC-2026-CS9104</span>
                      </div>
                      <div className="bg-black/30 p-2 border border-paper-100/10">
                        <span className="text-paper-400 block text-[9px]">SEMESTER STATUS</span>
                        <span className="text-white font-bold">SEM 5 (REGULAR)</span>
                      </div>
                    </div>
                    <div className="bg-black/40 p-2.5 border border-paper-100/10 space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-paper-300">ACADEMIC CLEARANCE:</span>
                        <span className="text-cjpGreen">100% COMPLETE</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-none overflow-hidden">
                        <div className="bg-cjpGreen h-full w-full"></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="space-y-3 bg-paper-100/5 p-4 border border-paper-100/10">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-paper-300">CGPA COMPUTATION MATRIX:</span>
                      <span className="bg-cjpGold text-black px-1.5 font-bold">MODERATION PASS</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between border-b border-paper-100/10 pb-1">
                        <span>CS501 Distributed Systems</span>
                        <span className="text-cjpGreen font-bold">Grade: A+ (10.0)</span>
                      </div>
                      <div className="flex justify-between border-b border-paper-100/10 pb-1">
                        <span>CS502 Neural Networks</span>
                        <span className="text-cjpGreen font-bold">Grade: A (9.0)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CS503 Database Internals</span>
                        <span className="text-cjpGreen font-bold">Grade: O (10.0)</span>
                      </div>
                    </div>
                    <div className="p-2 bg-cjpOrange/20 border border-cjpOrange/40 text-cjpOrange-light text-[10px] font-bold">
                      SHA256 SIGNED: 0x9f4a...2bc8 [VERIFIED DEGREE LEDGER]
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="space-y-3 bg-paper-100/5 p-4 border border-paper-100/10">
                    <div className="flex items-center justify-between">
                      <span className="text-paper-300">AGGREGATE ATTENDANCE:</span>
                      <span className="text-cjpGreen font-bold text-sm">88.4% (ELIGIBLE)</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-[9px]">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <div key={i} className="p-1 bg-cjpGreen/30 border border-cjpGreen/50 text-cjpGreen-light">
                          {d} ✓
                        </div>
                      ))}
                    </div>
                    <div className="text-[10px] text-paper-400 bg-black/40 p-2 border border-paper-100/10">
                      GEO-FENCED CLASSROOM AUDIT: Zero proxy attendance recorded in 120 lecture slots.
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="space-y-3 bg-paper-100/5 p-4 border border-paper-100/10">
                    <div className="flex items-center justify-between">
                      <span className="text-paper-300">SEMESTER FEE RECONCILIATION:</span>
                      <span className="text-cjpGreen font-bold">ZERO DUES</span>
                    </div>
                    <div className="bg-black/30 p-2.5 space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span>Tuition & Lab Fee:</span>
                        <span className="text-white font-bold">₹85,000</span>
                      </div>
                      <div className="flex justify-between text-cjpGreen">
                        <span>Merit Scholarship Credit:</span>
                        <span>- ₹25,000</span>
                      </div>
                      <div className="flex justify-between font-bold border-t border-paper-100/20 pt-1 text-cjpGold">
                        <span>Net Settled (UPI Auto-Reconciled):</span>
                        <span>₹60,000</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 4 && (
                  <div className="space-y-3 bg-paper-100/5 p-4 border border-paper-100/10">
                    <div className="flex items-center justify-between">
                      <span className="text-paper-300">CAMPUS RECRUITMENT PORTAL:</span>
                      <span className="text-cjpOrange font-bold">34 DRIVES ACTIVE</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="p-2 bg-black/40 border border-paper-100/10 flex justify-between items-center">
                        <div>
                          <span className="text-white font-bold block">Google Cloud Campus Drive</span>
                          <span className="text-paper-400 text-[9px]">Eligibility: CGPA ≥ 8.5</span>
                        </div>
                        <span className="bg-cjpGreen text-white text-[9px] px-1.5 py-0.5">SHORTLISTED</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-paper-300">
                      NIRF Report 2026 Ready: 94.2% Batch Placement documented.
                    </div>
                  </div>
                )}

                <div className="pt-2 text-[10px] text-paper-400 border-t border-paper-100/10 flex items-center justify-between">
                  <span>COLLEGECENTRE MODULAR KERNEL</span>
                  <span className="text-cjpGreen">STATUS: 100% OPERATIONAL</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
