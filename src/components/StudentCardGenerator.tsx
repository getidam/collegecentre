import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Download, RefreshCw, Sparkles, Upload, User, ShieldCheck, GraduationCap } from 'lucide-react';

export const StudentCardGenerator: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const [studentData, setStudentData] = useState({
    name: 'Aarav Vinod Sharma',
    rollNo: 'CC-2026-CS9104',
    institution: 'National Institute of Technology & Science',
    department: 'B.Tech in Computer Science & Engineering',
    batch: '2024 - 2028',
    bloodGroup: 'O+',
    role: 'Undergraduate Scholar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  });

  const avatarPresets = [
    { label: 'Scholar 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
    { label: 'Scholar 2', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80' },
    { label: 'Scholar 3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
    { label: 'Scholar 4', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80' },
  ];

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRandomizeRoll = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const depts = ['CS', 'AI', 'EC', 'ME', 'BT', 'DS'];
    const randomDept = depts[Math.floor(Math.random() * depts.length)];
    setStudentData(prev => ({
      ...prev,
      rollNo: `CC-2026-${randomDept}${randomNum}`,
    }));
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(cardRef.current, { quality: 0.98, pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = `${studentData.name.replace(/\s+/g, '_')}_CollegeCentre_ID.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0c8ee9', '#0f172a', '#047857', '#b45309'],
      });
    } catch (err) {
      console.error('Error generating card image:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section id="id-generator" className="py-12 sm:py-16 md:py-24 bg-navy-50/50 border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Interactive University Smart-Pass
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-navy-950 tracking-tight">
            Institutional Digital Student Identity.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-navy-600 text-xs sm:text-base font-normal">
            Generate and export cryptographically verifiable student smart-passes with zero paper overhead.
          </p>
        </div>

        {/* Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (7 cols) */}
          <div className="lg:col-span-6 bg-white border border-navy-200/80 rounded-2xl p-5 sm:p-8 shadow-card space-y-4 sm:space-y-5 order-2 lg:order-1">
            <div className="border-b border-navy-100 pb-3">
              <h3 className="font-display font-semibold text-base sm:text-lg text-navy-900">
                Customise Student Credentials
              </h3>
              <p className="text-xs text-navy-500 mt-0.5">
                Edit credentials to preview real-time cryptographic pass rendering.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Full Student Name
                </label>
                <input
                  type="text"
                  value={studentData.name}
                  onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                  className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                  placeholder="e.g. Aarav Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1 flex items-center justify-between">
                  <span>Enrollment ID / Roll No</span>
                  <button
                    onClick={handleRandomizeRoll}
                    className="text-brand-600 hover:text-brand-700 text-[11px] font-medium flex items-center gap-0.5"
                  >
                    <RefreshCw className="w-3 h-3" /> Auto
                  </button>
                </label>
                <input
                  type="text"
                  value={studentData.rollNo}
                  onChange={(e) => setStudentData({ ...studentData, rollNo: e.target.value })}
                  className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  placeholder="e.g. CC-2026-CS9104"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">
                University / Autonomous Institute
              </label>
              <input
                type="text"
                value={studentData.institution}
                onChange={(e) => setStudentData({ ...studentData, institution: e.target.value })}
                className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Academic Discipline
                </label>
                <input
                  type="text"
                  value={studentData.department}
                  onChange={(e) => setStudentData({ ...studentData, department: e.target.value })}
                  className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Academic Batch / Term
                </label>
                <input
                  type="text"
                  value={studentData.batch}
                  onChange={(e) => setStudentData({ ...studentData, batch: e.target.value })}
                  className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-2">
                Biometric Portrait / Photo Preset
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {avatarPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setStudentData({ ...studentData, avatar: preset.url })}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 transition-all ${
                      studentData.avatar === preset.url
                        ? 'border-brand-600 ring-2 ring-brand-500/20 scale-105'
                        : 'border-navy-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  </button>
                ))}

                <label className="h-10 sm:h-11 px-3 rounded-xl border border-dashed border-navy-300 bg-navy-50/50 hover:bg-navy-100 flex items-center justify-center gap-1.5 cursor-pointer text-xs font-medium text-navy-700 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-navy-500" />
                  <span>Upload</span>
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="pt-2 sm:pt-3 border-t border-navy-100">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full univ-btn-primary py-3 sm:py-3.5 text-xs sm:text-sm"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Rendering Card...' : 'Download Student Smart-Pass (PNG)'}</span>
              </button>
            </div>
          </div>

          {/* Card Live Preview (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center w-full order-1 lg:order-2">
            <div className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2 text-center">
              <ShieldCheck className="w-4 h-4 text-academic-emerald" />
              <span>Tamper-Evident ID Preview</span>
            </div>

            {/* University Smart Pass Card */}
            <div
              ref={cardRef}
              className="w-full max-w-[340px] xs:max-w-sm sm:max-w-md bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white rounded-2xl shadow-subtle border border-navy-800 p-4 sm:p-6 relative overflow-hidden font-sans"
            >
              {/* Ambient watermarks */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-brand-600/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-brand-500/10 blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-navy-800/80 pb-3 sm:pb-4 mb-4 sm:mb-5 relative z-10">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-sm shrink-0">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-xs sm:text-sm text-white leading-tight truncate">
                      {studentData.institution}
                    </h4>
                    <span className="text-[9px] sm:text-[10px] text-navy-400 font-mono tracking-wider block">
                      COLLEGECENTRE VERIFIED
                    </span>
                  </div>
                </div>

                <span className="bg-academic-emerald/20 text-academic-emerald border border-academic-emerald/30 text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full font-mono uppercase shrink-0">
                  ACTIVE
                </span>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center mb-4 sm:mb-5 relative z-10">
                
                {/* Student Photo with Chip */}
                <div className="col-span-4 flex flex-col items-center">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border border-navy-700 bg-navy-900 shadow-md relative">
                    {studentData.avatar ? (
                      <img src={studentData.avatar} alt="Student" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-navy-500">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-navy-950/80 backdrop-blur-sm py-0.5 text-center font-mono text-[8px] font-bold text-brand-300">
                      {studentData.bloodGroup}
                    </div>
                  </div>

                  <div className="w-6 h-4 sm:w-7 sm:h-5 rounded bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 border border-amber-500/50 mt-1.5 sm:mt-2 shadow-xs" />
                </div>

                {/* Student Details */}
                <div className="col-span-8 space-y-1.5 sm:space-y-2 min-w-0">
                  <div>
                    <span className="text-[8px] sm:text-[9px] font-semibold text-navy-400 uppercase tracking-wider block">
                      STUDENT SCHOLAR
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white leading-tight truncate">
                      {studentData.name}
                    </h3>
                  </div>

                  <div>
                    <span className="text-[8px] sm:text-[9px] font-semibold text-navy-400 uppercase tracking-wider block">
                      ENROLLMENT NUMBER
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-brand-300 block truncate">
                      {studentData.rollNo}
                    </span>
                  </div>

                  <div>
                    <span className="text-[8px] sm:text-[9px] font-semibold text-navy-400 uppercase tracking-wider block">
                      DISCIPLINE & PROGRAM
                    </span>
                    <span className="text-[11px] sm:text-xs text-navy-300 font-medium block leading-tight truncate">
                      {studentData.department}
                    </span>
                  </div>

                  <div>
                    <span className="text-[8px] sm:text-[9px] font-semibold text-navy-400 uppercase tracking-wider block">
                      VALIDITY TERM
                    </span>
                    <span className="text-[11px] sm:text-xs text-navy-300 font-medium block">
                      {studentData.batch}
                    </span>
                  </div>
                </div>

              </div>

              {/* Card Footer with QR verification */}
              <div className="border-t border-navy-800/80 pt-3 flex items-center justify-between relative z-10 gap-2">
                <div className="space-y-0.5 min-w-0">
                  <div className="text-[8px] sm:text-[9px] font-mono text-navy-400 truncate">
                    SHA256: 0x9f4a...e12d
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-navy-400 flex items-center gap-1 font-medium truncate">
                    <ShieldCheck className="w-3 h-3 text-academic-emerald shrink-0" />
                    <span>Attested Ledger</span>
                  </div>
                </div>

                <div className="p-1 bg-white rounded-lg shadow-sm shrink-0">
                  <QRCodeSVG 
                    value={`https://collegecentre.in/verify/${studentData.rollNo}`} 
                    size={36} 
                    level="M" 
                  />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
