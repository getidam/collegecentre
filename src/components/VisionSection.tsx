import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const VisionSection: React.FC = () => {
  return (
    <section id="vision" className="py-16 md:py-24 bg-paper-200 border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-ink gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange block mb-1">
              CHAPTER ONE • THE ARCHITECTURAL RESET
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
              WHY LEGACY UNIVERSITY ERPS <br />
              <span className="text-cjpOrange">FAIL MODERN CAMPUSES.</span>
            </h2>
          </div>
          <div className="max-w-md font-sans text-sm text-ink-muted">
            For three decades, universities have tolerated sluggish 1990s monolithic software, disconnected spreadsheets, and paper stamped queues. CollegeCentre is the clean break.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="brutal-card bg-paper-100 p-6 sm:p-8 border-2 border-ink relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-600 text-white font-mono text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
              THE OBSOLETE STATUS QUO
            </div>
            
            <div className="flex items-center gap-3 mb-6 pt-2">
              <div className="w-10 h-10 bg-red-100 border-2 border-ink flex items-center justify-center text-red-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl uppercase text-ink">
                  Legacy ERPs & Fragmented Excel
                </h3>
                <span className="text-xs font-mono text-ink-light">Fragile, slow & opaque</span>
              </div>
            </div>

            <ul className="space-y-4 font-sans text-sm text-ink-muted">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold font-mono">✕</span>
                <div>
                  <strong className="text-ink font-semibold">Disconnected Data Silos:</strong> Admissions, exam cell, library, and accounts use 4 different isolated databases that don't sync.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold font-mono">✕</span>
                <div>
                  <strong className="text-ink font-semibold">Transcript Forgery Vulnerability:</strong> Paper marksheets without cryptographic verification invite fraudulent certificates.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold font-mono">✕</span>
                <div>
                  <strong className="text-ink font-semibold">Exhausting NAAC / NIRF Audits:</strong> Staff spend 3 to 6 months manually collating records for accreditation committees.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold font-mono">✕</span>
                <div>
                  <strong className="text-ink font-semibold">Hostage Annual Maintenance Contracts:</strong> Vendor lock-ins demanding massive yearly fees for minor schema tweaks.
                </div>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-ink/20 font-mono text-xs text-red-700 bg-red-50 p-3 border border-red-200">
              ⚠ Result: Frustrated students waiting in lines, delayed degrees, and registrar administrative burnout.
            </div>
          </div>

          <div className="brutal-card bg-paper-50 p-6 sm:p-8 border-2 border-ink relative overflow-hidden shadow-brutal-lg">
            <div className="absolute top-0 right-0 bg-cjpGreen text-white font-mono text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
              COLLEGECENTRE ENGINE
            </div>
            
            <div className="flex items-center gap-3 mb-6 pt-2">
              <div className="w-10 h-10 bg-cjpGreen-tint border-2 border-ink flex items-center justify-center text-cjpGreen">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl uppercase text-ink">
                  Universal Campus OS
                </h3>
                <span className="text-xs font-mono text-cjpGreen font-bold">Fast, immutable & auditable</span>
              </div>
            </div>

            <ul className="space-y-4 font-sans text-sm text-ink-muted">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cjpGreen shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold">Single Source of Truth:</strong> One unified record follows the student from registration through convocation and alumni engagement.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cjpGreen shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold">Cryptographically Sealed Degrees:</strong> Instant SHA-256 verifiable transcripts accessible by global employers with a QR scan.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cjpGreen shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold">1-Click Accreditation Compliance:</strong> Real-time automated data pipelines mapped directly to NAAC, NBA, and NIRF criteria.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cjpGreen shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink font-semibold">Open Extensibility & High Availability:</strong> Modular API architecture with 99.99% uptime and zero vendor lock-in traps.
                </div>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-ink/20 font-mono text-xs text-cjpGreen bg-cjpGreen-tint p-3 border border-cjpGreen/30 font-bold">
              ★ Result: Sub-second student verification, automated grade calculation, and delighted academic faculty.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};