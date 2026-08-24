import React from 'react';
import { ShieldCheck, GraduationCap, CheckCircle2, Database, Award } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { label: 'Cryptographically Verified Degrees', icon: ShieldCheck },
    { label: '1-Click Course Registration', icon: GraduationCap },
    { label: 'Real-Time Attendance Telemetry', icon: CheckCircle2 },
    { label: 'NAAC & NIRF Automated Audits', icon: Award },
    { label: 'Direct Escrow Fee Reconciliation', icon: Database },
    { label: 'Zero Paper Student Records', icon: ShieldCheck },
  ];

  return (
    <div className="bg-navy-950 text-navy-100 py-3 border-y border-navy-800 overflow-hidden font-medium text-xs">
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0">
            <item.icon className="w-3.5 h-3.5 text-brand-400" />
            <span className="tracking-wide text-navy-200">{item.label}</span>
            <span className="text-navy-600 ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
