import React from 'react';
import { ShieldCheck, Users, Building, Server, Zap, CheckCircle2 } from 'lucide-react';

export const LiveMetricsSection: React.FC = () => {
  const liveActivities = [
    { campus: 'National Institute of Technology', action: 'Issued 3,450 Verifiable Grade Cards', time: '14s ago', tag: 'Examination' },
    { campus: 'Metropolitan Autonomous University', action: 'Completed Fall Course Registration (9,820 Students)', time: '48s ago', tag: 'SIS Core' },
    { campus: 'State University of Law & Governance', action: 'Exported NAAC SSR Criterion 2.6 Metrics', time: '2m ago', tag: 'Accreditation' },
    { campus: 'Apex Institute of Medical Sciences', action: 'Reconciled ₹2.4 Cr Tuition & Scholarship Escrow', time: '4m ago', tag: 'Accounts' },
  ];

  const metrics = [
    { label: 'Active Enrolled Students', value: '650,000+', icon: Users, change: '+14% YoY', highlight: true },
    { label: 'Accredited Partner Campuses', value: '184', icon: Building, change: '14 States' },
    { label: 'Cryptographic Transcripts', value: '4.8M+', icon: ShieldCheck, change: '100% Tamper-Proof' },
    { label: 'System Gateway Uptime', value: '99.99%', icon: Server, change: '12ms Latency' },
  ];

  return (
    <section id="metrics" className="py-16 md:py-24 bg-white border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-navy-100 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 mb-3">
              <span className="w-2 h-2 rounded-full bg-academic-emerald animate-pulse" />
              Live Institutional Telemetry
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-950 tracking-tight">
              Higher-Education System Momentum.
            </h2>
          </div>
          <div className="text-xs text-navy-500 font-medium">
            AUDITED BY NATIONAL UNIVERSITY REGISTRY NETWORK
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-navy-50/40 border border-navy-200/80 rounded-2xl p-6 shadow-card transition-all hover:shadow-card-hover hover:border-navy-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-navy-200 flex items-center justify-center text-brand-600 shadow-xs">
                  <m.icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-academic-emerald bg-academic-emerald/10 px-2.5 py-0.5 rounded-full">
                  {m.change}
                </span>
              </div>
              <div className="font-display font-bold text-3xl sm:text-4xl text-navy-950 tracking-tight mb-1">
                {m.value}
              </div>
              <div className="text-xs font-medium text-navy-500 uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Live Activity Stream Terminal */}
        <div className="bg-navy-950 rounded-2xl p-6 border border-navy-800 text-white shadow-subtle">
          <div className="flex items-center justify-between border-b border-navy-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-navy-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-navy-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-navy-700" />
              </div>
              <span className="text-xs font-semibold text-navy-300">
                Central Registry Activity Stream
              </span>
            </div>
            <div className="text-xs text-academic-emerald flex items-center gap-1 font-semibold">
              <Zap className="w-3.5 h-3.5" /> Synchronised
            </div>
          </div>

          <div className="space-y-2.5 font-sans text-xs">
            {liveActivities.map((act, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-navy-900/60 hover:bg-navy-900 border border-navy-800/80 transition-colors gap-2"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="bg-brand-500/20 text-brand-300 text-[10px] font-semibold px-2.5 py-0.5 rounded">
                    {act.tag}
                  </span>
                  <span className="text-white font-medium">{act.campus}</span>
                  <span className="text-navy-400">→ {act.action}</span>
                </div>
                <span className="text-navy-500 text-[11px] font-mono shrink-0">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
