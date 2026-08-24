import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Users, Building, Server, CheckCircle2, Zap, ArrowUpRight } from 'lucide-react';

export const LiveMetricsSection: React.FC = () => {
  const [liveActivities, setLiveActivities] = useState([
    { campus: 'National Institute of Technology', action: 'Published 3,450 Verified Semester Gradecards', time: '12s ago', tag: 'EXAM ENGINE' },
    { campus: 'Delhi Metropolitan University', action: 'Completed 1-Click Fall Semester Course Enrollment', time: '45s ago', tag: 'SIS CORE' },
    { campus: 'Apex Global Engineering Campus', action: 'Exported NAAC SSR Criterion 2.6 Data Tables', time: '2m ago', tag: 'ACCREDITATION' },
    { campus: 'State University of Law & Governance', action: 'Issued 890 Cryptographically Sealed Degrees', time: '4m ago', tag: 'CREDENTIALS' },
  ]);

  const metrics = [
    { label: 'Verified Student Profiles', value: '654,290+', icon: Users, change: '+12.4% MoM' },
    { label: 'Partner Campuses', value: '184', icon: Building, change: '14 States' },
    { label: 'Grades Computed', value: '4.89M+', icon: ShieldCheck, change: '100% Cryptographic' },
    { label: 'System Gateway Uptime', value: '99.99%', icon: Server, change: '12ms Response' },
  ];

  return (
    <section id="metrics" className="py-16 md:py-24 bg-paper-200 border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-ink gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cjpGreen animate-ping"></span>
              REAL-TIME CAMPUS TELEMETRY
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
              CAMPUS SYSTEM MOMENTUM. <br />
              <span className="text-cjpOrange">LIVE DATA METRICS.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-ink-light uppercase">
            AUDITED BY NATIONAL UNIVERSITY REGISTRY NETWORK
          </div>
        </div>

        {/* 4 Brutalist Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="brutal-card p-6 bg-paper-50 border-2 border-ink relative"
            >
              <div className="flex items-center justify-between mb-3">
                <m.icon className="w-6 h-6 text-cjpOrange" />
                <span className="font-mono text-[10px] font-bold text-cjpGreen bg-cjpGreen-tint px-2 py-0.5 border border-cjpGreen/20 uppercase">
                  {m.change}
                </span>
              </div>
              <div className="font-display font-black text-4xl sm:text-5xl text-ink leading-none mb-1">
                {m.value}
              </div>
              <div className="font-mono text-xs font-bold uppercase text-ink-muted">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Live Terminal Activity Feed */}
        <div className="brutal-card bg-ink text-paper-100 p-6 border-2 border-ink shadow-brutal-lg">
          <div className="flex items-center justify-between border-b border-paper-400/20 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
              </div>
              <span className="font-mono text-xs font-bold uppercase text-paper-300">
                COLLEGECENTRE ENGINE // LIVE ACTIVITY FEED
              </span>
            </div>
            <div className="font-mono text-[10px] text-cjpGreen flex items-center gap-1 font-bold">
              <Zap className="w-3 h-3" /> STREAM ACTIVE
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {liveActivities.map((act, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-paper-100/5 hover:bg-paper-100/10 border border-paper-100/10 transition-colors gap-2"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="bg-cjpOrange text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    {act.tag}
                  </span>
                  <span className="text-paper-100 font-bold">{act.campus}</span>
                  <span className="text-paper-400">? {act.action}</span>
                </div>
                <span className="text-paper-400 text-[10px] sm:text-right shrink-0">
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
