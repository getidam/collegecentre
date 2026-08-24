import React from 'react';
import { Star } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const tickerItems = [
    'UNIFIED STUDENT RECORDS',
    'TAMPER-PROOF MARKSHEETS',
    '1-CLICK SEMESTER ENROLLMENT',
    'REAL-TIME ATTENDANCE LOGS',
    'ZERO ERP MAINTENANCE FEE',
    'INSTANT NAAC / NIRF AUDIT EXPORT',
    '99.99% CAMPUS UPTIME',
    'DECENTRALIZED STUDENT CREDENTIALS',
  ];

  return (
    <div className="bg-cjpOrange text-paper-100 border-y-2 border-ink py-3 overflow-hidden select-none font-display text-lg sm:text-xl tracking-wider font-bold shadow-inner">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {tickerItems.concat(tickerItems).map((item, idx) => (
          <div key={idx} className="flex items-center mx-4 gap-4">
            <span className="uppercase">{item}</span>
            <span className="text-paper-100/70 font-mono text-base">?</span>
          </div>
        ))}
      </div>
    </div>
  );
};
