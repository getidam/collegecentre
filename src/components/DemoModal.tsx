import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Building, Mail, Phone, User, GraduationCap, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    institution: '',
    name: '',
    role: 'Registrar / Vice Chancellor',
    email: '',
    phone: '',
    studentsCount: '5,000 - 15,000 Students',
    primaryInterest: 'Full Campus Operating System (All Modules)',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#c9561e', '#17191c', '#166534'],
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-paper-100 border-4 border-ink shadow-brutal-xl max-w-xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 border-2 border-ink bg-paper-200 hover:bg-cjpOrange hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-cjpGreen text-white border-2 border-ink mx-auto flex items-center justify-center shadow-brutal">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-display font-bold text-3xl uppercase text-ink">
              ONBOARDING DISPATCH RECEIVED!
            </h3>

            <p className="font-sans text-sm sm:text-base text-ink-muted max-w-md mx-auto">
              Thank you, <strong className="text-ink">{formData.name}</strong>. Our University Architecture Specialist will contact you at <strong className="text-ink">{formData.email}</strong> within 4 hours to arrange your campus migration sandbox.
            </p>

            <div className="p-4 bg-paper-200 border-2 border-ink font-mono text-xs text-left text-ink space-y-1">
              <div className="font-bold uppercase text-cjpOrange">SANDBOX ALLOCATION TICKET:</div>
              <div>TICKET ID: CC-REG-2026-X8812</div>
              <div>INSTITUTION: {formData.institution || 'University Node'}</div>
              <div>STATUS: PRIORITY QUEUE // VERIFIED</div>
            </div>

            <button
              onClick={onClose}
              className="brutal-btn bg-ink text-paper-100 hover:bg-cjpOrange px-6 py-3 text-sm"
            >
              CLOSE WINDOW
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 border-b-2 border-ink pb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange block mb-1">
                ? INSTITUTIONAL ONBOARDING ?
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink uppercase">
                DEPLOY COLLEGECENTRE <br />
                <span className="text-cjpOrange">ON YOUR CAMPUS</span>
              </h3>
              <p className="text-xs font-mono text-ink-muted mt-1">
                Schedule a 20-minute executive briefing and campus sandbox walkthrough.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                  University / College Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none focus:bg-white pl-9"
                    placeholder="e.g. National University of Technology"
                  />
                  <Building className="w-4 h-4 text-ink-light absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none focus:bg-white pl-9"
                      placeholder="Dr. / Prof. Name"
                    />
                    <User className="w-4 h-4 text-ink-light absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                    Designation / Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:bg-white"
                  >
                    <option>Registrar / Vice Chancellor</option>
                    <option>Dean of Academic Affairs</option>
                    <option>Controller of Examinations</option>
                    <option>Chief Information Officer (CIO / IT)</option>
                    <option>Department Head (HOD)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                    Institutional Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none focus:bg-white pl-9"
                      placeholder="dean@university.edu.in"
                    />
                    <Mail className="w-4 h-4 text-ink-light absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                    Contact Phone *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none focus:bg-white pl-9"
                      placeholder="+91 98765 43210"
                    />
                    <Phone className="w-4 h-4 text-ink-light absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                    Campus Student Strength
                  </label>
                  <select
                    value={formData.studentsCount}
                    onChange={(e) => setFormData({ ...formData, studentsCount: e.target.value })}
                    className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:bg-white"
                  >
                    <option>Under 2,000 Students</option>
                    <option>2,000 - 5,000 Students</option>
                    <option>5,000 - 15,000 Students</option>
                    <option>15,000 - 50,000+ Students</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                    Deployment Interest
                  </label>
                  <select
                    value={formData.primaryInterest}
                    onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                    className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:bg-white"
                  >
                    <option>Full Campus OS (All 5 Modules)</option>
                    <option>Examination & Transcript Engine</option>
                    <option>Student Information System (SIS)</option>
                    <option>Smart Attendance & Timetable</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full brutal-btn bg-cjpOrange text-white hover:bg-ink py-3.5 text-base flex items-center justify-center gap-2 shadow-brutal"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>{loading ? 'SUBMITTING DISPATCH...' : 'REQUEST ONBOARDING & SANDBOX'}</span>
                </button>
              </div>

              <div className="text-[10px] font-mono text-ink-light text-center">
                ?? Protected by 256-bit encryption. Zero spam. We never share institutional contact info.
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
