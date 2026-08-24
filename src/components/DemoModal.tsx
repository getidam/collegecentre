import React, { useState } from 'react';
import { X, CheckCircle2, Building, Mail, Phone, User, ShieldCheck } from 'lucide-react';
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
        particleCount: 90,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#0c8ee9', '#0f172a', '#047857'],
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-navy-200 rounded-2xl shadow-modal max-w-xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-navy-400 hover:text-navy-700 hover:bg-navy-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-academic-emerald/10 text-academic-emerald mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display font-bold text-2xl text-navy-950">
              Institutional Request Dispatched
            </h3>

            <p className="text-sm text-navy-600 max-w-md mx-auto">
              Thank you, <strong className="text-navy-900">{formData.name}</strong>. Our University Systems Specialist will contact you at <strong className="text-navy-900">{formData.email}</strong> within 4 hours to arrange your campus migration sandbox.
            </p>

            <div className="p-4 bg-navy-50 rounded-xl border border-navy-200 text-left text-xs font-mono text-navy-700 space-y-1">
              <div className="font-semibold text-brand-700">SANDBOX ALLOCATION TICKET:</div>
              <div>TICKET ID: CC-REG-2026-X8812</div>
              <div>INSTITUTION: {formData.institution || 'University Node'}</div>
              <div>STATUS: PRIORITY QUEUE // VERIFIED</div>
            </div>

            <button
              onClick={onClose}
              className="univ-btn-primary px-6 py-2.5 text-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 border-b border-navy-100 pb-4">
              <span className="text-xs font-semibold text-brand-600 block mb-1">
                Institutional Onboarding
              </span>
              <h3 className="font-display font-bold text-2xl text-navy-950">
                Deploy CollegeCentre on Campus
              </h3>
              <p className="text-xs text-navy-500 mt-1">
                Schedule a 20-minute executive briefing and university sandbox walkthrough.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  University / Autonomous College *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                    placeholder="e.g. National University of Technology"
                  />
                  <Building className="w-4 h-4 text-navy-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                      placeholder="Dr. / Prof. Name"
                    />
                    <User className="w-4 h-4 text-navy-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Designation / Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-800 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
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
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Official Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                      placeholder="dean@university.edu.in"
                    />
                    <Mail className="w-4 h-4 text-navy-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Direct Contact Phone *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                      placeholder="+91 98765 43210"
                    />
                    <Phone className="w-4 h-4 text-navy-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full univ-btn-primary py-3.5 text-sm flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-brand-400" />
                  <span>{loading ? 'Submitting Request...' : 'Request Institutional Sandbox Walkthrough'}</span>
                </button>
              </div>

              <div className="text-[11px] text-navy-400 text-center">
                🔒 Protected by 256-bit encryption. Zero spam. We never share institutional contact info.
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
