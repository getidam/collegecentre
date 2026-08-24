import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Download, Sparkles, RefreshCw, Upload } from 'lucide-react';

export const StudentCardGenerator: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const [studentData, setStudentData] = useState({
    name: 'Aarav V. Sharma',
    rollNo: 'CC-2026-CS9104',
    university: 'Apex National Institute of Technology',
    degree: 'B.Tech Computer Science & AI',
    batch: '2024 — 2028',
    bloodGroup: 'O+',
    role: 'VERIFIED STUDENT',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces&auto=format',
    campusCity: 'Bengaluru / New Delhi',
  });

  const presetAvatars = [
    { label: 'Scholar 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces&auto=format' },
    { label: 'Scholar 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces&auto=format' },
    { label: 'Scholar 3', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=faces&auto=format' },
    { label: 'Scholar 4', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces&auto=format' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentData(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateRandomRoll = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const prefixes = ['CS', 'EE', 'ME', 'AI', 'BT', 'MBA'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    setStudentData(prev => ({
      ...prev,
      rollNo: 'CC-2026-' + prefix + randomNum
    }));
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const link = document.createElement('a');
      link.download = 'CollegeCentre-Pass-' + studentData.name.replace(/\s+/g, '-') + '.png';
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c9561e', '#17191c', '#f4ebd7', '#166534', '#d97706'],
      });
    } catch (err) {
      console.error('Error generating card image:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section id="id-generator" className="py-16 md:py-24 bg-paper-100 border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange bg-cjpOrange/10 px-3 py-1 border border-cjpOrange/30 inline-block mb-3">
            ★ INTERACTIVE PASS GENERATOR ★
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
            GENERATE YOUR OFFICIAL <br />
            <span className="text-cjpOrange">DIGITAL UNIVERSITY PASS</span>
          </h2>
          <p className="mt-3 text-ink-muted text-base sm:text-lg font-medium">
            Test the CollegeCentre Student Identity Engine. Real-time verification, cryptographic QR signature, and instant export.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 bg-paper-200 border-2 border-ink p-6 shadow-brutal space-y-4">
            <div className="flex items-center justify-between border-b-2 border-ink pb-3">
              <h3 className="font-display font-bold text-xl uppercase tracking-wider text-ink flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cjpOrange" />
                <span>Identity Details</span>
              </h3>
              <button
                onClick={generateRandomRoll}
                className="font-mono text-xs font-bold text-cjpOrange hover:text-ink flex items-center gap-1 uppercase"
                title="Randomize Roll Number"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Random Roll
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={studentData.name}
                onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none focus:bg-white"
                placeholder="e.g. Aarav Sharma"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                  Roll / ID Number
                </label>
                <input
                  type="text"
                  value={studentData.rollNo}
                  onChange={(e) => setStudentData({ ...studentData, rollNo: e.target.value })}
                  className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                  Blood Group
                </label>
                <select
                  value={studentData.bloodGroup}
                  onChange={(e) => setStudentData({ ...studentData, bloodGroup: e.target.value })}
                  className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:bg-white"
                >
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                University / Institute
              </label>
              <input
                type="text"
                value={studentData.university}
                onChange={(e) => setStudentData({ ...studentData, university: e.target.value })}
                className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none focus:bg-white"
                placeholder="e.g. Apex National Institute of Technology"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                Degree & Discipline
              </label>
              <input
                type="text"
                value={studentData.degree}
                onChange={(e) => setStudentData({ ...studentData, degree: e.target.value })}
                className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none focus:bg-white"
                placeholder="e.g. B.Tech Computer Science & AI"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                  Batch Years
                </label>
                <input
                  type="text"
                  value={studentData.batch}
                  onChange={(e) => setStudentData({ ...studentData, batch: e.target.value })}
                  className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                  Campus Role
                </label>
                <select
                  value={studentData.role}
                  onChange={(e) => setStudentData({ ...studentData, role: e.target.value })}
                  className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:bg-white"
                >
                  <option>VERIFIED STUDENT</option>
                  <option>RESEARCH SCHOLAR</option>
                  <option>FACULTY FELLOW</option>
                  <option>UNIVERSITY REGISTRAR</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5">
                Profile Photograph
              </label>
              <div className="flex items-center gap-2">
                {presetAvatars.map((av, i) => (
                  <img
                    key={i}
                    src={av.url}
                    alt={av.label}
                    onClick={() => setStudentData({ ...studentData, avatarUrl: av.url })}
                    className={
                      'w-10 h-10 object-cover border-2 cursor-pointer transition-all ' +
                      (studentData.avatarUrl === av.url ? 'border-cjpOrange scale-105 shadow-brutal-sm' : 'border-ink opacity-70 hover:opacity-100')
                    }
                  />
                ))}
                <label className="w-10 h-10 border-2 border-dashed border-ink flex items-center justify-center cursor-pointer hover:bg-paper-100 bg-paper-50" title="Upload Custom Photo">
                  <Upload className="w-4 h-4 text-ink-muted" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={downloadCard}
                disabled={downloading}
                className="w-full brutal-btn bg-cjpOrange text-white hover:bg-ink py-3 text-base flex items-center justify-center gap-2 shadow-brutal"
              >
                <Download className="w-5 h-5" />
                <span>{downloading ? 'GENERATING PASS...' : 'DOWNLOAD OFFICIAL PASS (PNG)'}</span>
              </button>
            </div>

          </div>

          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            <div className="text-xs font-mono uppercase font-bold text-ink-light tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cjpGreen animate-pulse"></span>
              LIVE RENDER PREVIEW (CLICK DOWNLOAD TO EXPORT)
            </div>

            <div
              ref={cardRef}
              className="w-full max-w-[480px] bg-[#fdfcf9] border-4 border-ink shadow-brutal-xl overflow-hidden relative select-none font-sans"
              style={{ minHeight: '300px' }}
            >
              <div className="grid grid-cols-3 h-2 w-full">
                <div className="bg-[#c9561e]" />
                <div className="bg-[#f4ebd7]" />
                <div className="bg-[#166534]" />
              </div>

              <div className="bg-ink text-paper-100 p-4 border-b-2 border-ink flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-cjpOrange text-white font-display text-xl font-bold flex items-center justify-center border border-paper-100 shadow-sm">
                    CC
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg uppercase tracking-tight leading-none text-white">
                      COLLEGE<span className="text-cjpOrange">CENTRE</span>
                    </h4>
                    <span className="text-[10px] font-mono text-paper-300 tracking-wider">
                      CAMPUS VERIFIED IDENTITY • UNIVERSAL PASS
                    </span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="bg-cjpGreen text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider block">
                    ACTIVE 2026
                  </span>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-b from-[#fbf8f2] to-[#f4ebd7]">
                
                <div className="mb-4 pb-2 border-b border-ink/20">
                  <span className="text-[9px] font-mono uppercase text-ink-light font-bold block">INSTITUTION</span>
                  <div className="font-display font-bold text-lg text-ink uppercase tracking-wide truncate">
                    {studentData.university || 'Apex National University'}
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  
                  <div className="col-span-4 flex flex-col items-center">
                    <div className="w-24 h-28 border-2 border-ink bg-paper-100 shadow-brutal-sm overflow-hidden relative">
                      <img
                        src={studentData.avatarUrl}
                        alt={studentData.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-ink/80 text-white text-[8px] font-mono text-center py-0.5 font-bold uppercase">
                        {studentData.bloodGroup}
                      </div>
                    </div>
                    <span className="mt-1 text-[8px] font-mono text-ink-light uppercase">BIO-VERIFIED</span>
                  </div>

                  <div className="col-span-8 space-y-1.5 text-xs">
                    <div>
                      <span className="text-[9px] font-mono text-ink-light uppercase font-bold block">CANDIDATE NAME</span>
                      <div className="font-display font-bold text-xl text-ink uppercase leading-none">
                        {studentData.name || 'Student Name'}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-[8px] font-mono text-ink-light uppercase font-bold block">ENROLLMENT ID</span>
                        <span className="font-mono font-bold text-ink text-xs bg-paper-100 px-1 border border-ink/30 block truncate">
                          {studentData.rollNo}
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-ink-light uppercase font-bold block">ACADEMIC BATCH</span>
                        <span className="font-mono font-bold text-ink text-xs">
                          {studentData.batch}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] font-mono text-ink-light uppercase font-bold block">DISCIPLINE / PROGRAM</span>
                      <div className="font-sans font-bold text-xs text-cjpOrange truncate">
                        {studentData.degree}
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] font-mono text-ink-light uppercase font-bold block">ROLE STATUS</span>
                      <span className="inline-block bg-ink text-paper-100 text-[10px] font-mono font-bold px-2 py-0.5 uppercase">
                        {studentData.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-dashed border-ink/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-white border border-ink shadow-sm">
                      <QRCodeSVG
                        value={'https://collegecentre.in/verify/' + studentData.rollNo}
                        size={48}
                        level="M"
                      />
                    </div>
                    <div className="font-mono text-[9px] text-ink-muted leading-tight">
                      <span className="font-bold text-ink block">SCAN TO VERIFY</span>
                      <span>SHA-256 Tamper Proof</span>
                      <span className="text-cjpGreen block font-bold">DIGITAL SIGNED ✓</span>
                    </div>
                  </div>

                  <div className="border-2 border-cjpOrange text-cjpOrange rounded-full p-2 text-center transform -rotate-12 select-none">
                    <div className="text-[7px] font-mono font-black uppercase tracking-tighter leading-none">
                      COLLEGE CENTRE<br />
                      <span className="text-[9px] font-display">OFFICIAL SEAL</span><br />
                      EST. 2026
                    </div>
                  </div>
                </div>

              </div>

              <div className="bg-ink text-paper-200 text-[8px] font-mono px-3 py-1 flex items-center justify-between">
                <span>COLLEGECENTRE UNIVERSAL CAMPUS ID SYSTEM</span>
                <span>DPDPA & FERPA COMPLIANT</span>
              </div>
            </div>

            <p className="mt-4 text-xs font-mono text-ink-light text-center max-w-sm">
              ℹ This card can be linked to physical NFC smart badges, campus biometric gates, and digital exam hall tickets.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
