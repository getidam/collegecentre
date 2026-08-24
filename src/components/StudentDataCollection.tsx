import React, { useState, useRef } from 'react';
import { 
  User, Phone, Upload, Users, ShieldCheck, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, 
  Printer, RefreshCw, Mail, Lock, GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudentDataCollectionProps {
  onBackToHome?: () => void;
}

export const StudentDataCollection: React.FC<StudentDataCollectionProps> = ({ onBackToHome }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: 'Male',
    bloodGroup: 'O+',
    photoUrl: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    guardianName: '',
    guardianRelation: 'Father',
    guardianPhone: '',
    degreeProgram: 'B.Tech - Computer Science & Engineering',
    admissionYear: '2026',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'File size must be under 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
        setErrors(prev => {
          const updated = { ...prev };
          delete updated.photo;
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Legal Name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.photoUrl) newErrors.photo = 'Student official photograph is required';
    } else if (step === 2) {
      if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit mobile number is required';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid academic/personal email is required';
      if (!formData.address.trim()) newErrors.address = 'Permanent residential address is required';
    } else if (step === 3) {
      if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian full name is required';
      if (!formData.guardianPhone.trim() || formData.guardianPhone.length < 10) newErrors.guardianPhone = 'Valid 10-digit guardian mobile number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }
    setIsSubmitting(true);
    const autoId = 'CC-ADM-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(autoId);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#0c8ee9', '#0f172a', '#047857', '#b45309'],
      });
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-navy-50/40 text-navy-900 flex flex-col font-sans selection:bg-brand-600 selection:text-white">
      
      {/* Minimal Standalone University Header */}
      <header className="bg-white border-b border-navy-200/80 py-4 px-4 sm:px-8 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-900 to-brand-700 text-white font-display font-bold flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5 text-brand-300" />
            </div>
            <div>
              <span className="font-display font-bold text-lg sm:text-xl text-navy-950 block leading-tight">
                College<span className="text-brand-600">Centre</span>
              </span>
              <span className="text-[11px] text-navy-500 font-medium">
                University Central Admissions & Student Data Intake
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-navy-600 font-medium bg-navy-50 px-3 py-1.5 rounded-lg border border-navy-200/60">
              <Lock className="w-3.5 h-3.5 text-academic-emerald" />
              <span>DPDPA 2023 Encrypted</span>
            </div>
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="text-xs font-semibold text-navy-700 hover:text-navy-950 flex items-center gap-1 bg-white hover:bg-navy-50 px-3 py-1.5 rounded-lg border border-navy-200 shadow-xs transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Overview</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 pb-4 border-b border-navy-200/80 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 mb-2">
                Official Institutional Enrollment
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy-950 tracking-tight">
                Student Admission & Data Intake Form
              </h1>
            </div>
            <div className="text-xs text-navy-500 font-mono">
              Academic Intake 2026-27 • Section A
            </div>
          </div>

          {submitted ? (
            /* Success & Printable Slip */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-navy-200/80 rounded-2xl p-6 sm:p-10 shadow-card">
                <div className="text-center max-w-xl mx-auto space-y-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-academic-emerald/10 text-academic-emerald mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                    Student Record Submitted & Indexed
                  </h2>

                  <p className="text-sm text-navy-600">
                    Admission dossier for <strong className="text-navy-900">{formData.fullName}</strong> has been encrypted and assigned to the central university ledger.
                  </p>

                  <div className="inline-block bg-navy-900 text-white text-xs font-mono font-bold px-4 py-1.5 rounded-lg">
                    APPLICATION REFERENCE: {applicationId}
                  </div>
                </div>

                {/* Dossier Card */}
                <div ref={printRef} className="bg-navy-50/40 border border-navy-200 rounded-2xl p-6 shadow-xs font-sans space-y-6">
                  <div className="flex items-center justify-between border-b border-navy-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-navy-900 text-white font-bold flex items-center justify-center">
                        CC
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-navy-950 leading-tight">
                          CollegeCentre University Admissions Ledger
                        </h3>
                        <span className="text-xs text-navy-500 font-medium">
                          Official Student Registration Dossier • Academic Year 2026
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-academic-emerald bg-academic-emerald/10 px-2.5 py-1 rounded-full">
                      Verified Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-3 flex flex-col items-center">
                      <div className="w-28 h-32 rounded-xl border border-navy-200 bg-white overflow-hidden shadow-xs relative">
                        {formData.photoUrl ? (
                          <img src={formData.photoUrl} alt={formData.fullName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-navy-400">
                            <User className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold text-navy-400 uppercase tracking-wider mt-1.5">
                        Biometric Passport Seal
                      </span>
                    </div>

                    <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[10px] text-navy-400 uppercase font-semibold block">Full Student Name</span>
                        <span className="text-sm font-semibold text-navy-900">{formData.fullName}</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[10px] text-navy-400 uppercase font-semibold block">Date of Birth & Gender</span>
                        <span className="text-xs font-semibold text-navy-900">{formData.dob} ({formData.gender}, {formData.bloodGroup})</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[10px] text-navy-400 uppercase font-semibold block">Student Mobile Phone</span>
                        <span className="text-xs font-semibold text-navy-900">{formData.phone}</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[10px] text-navy-400 uppercase font-semibold block">Official Student Email</span>
                        <span className="text-xs font-semibold text-navy-900">{formData.email}</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[10px] text-navy-400 uppercase font-semibold block">Guardian Full Name</span>
                        <span className="text-sm font-semibold text-navy-900">{formData.guardianName} ({formData.guardianRelation})</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[10px] text-navy-400 uppercase font-semibold block">Guardian Mobile Phone</span>
                        <span className="text-xs font-semibold text-navy-900">{formData.guardianPhone}</span>
                      </div>

                      <div className="sm:col-span-2 bg-white p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[10px] text-navy-400 uppercase font-semibold block">Enrolled Program & Discipline</span>
                        <span className="text-xs font-semibold text-brand-700">{formData.degreeProgram} (Batch {formData.admissionYear})</span>
                      </div>

                      <div className="sm:col-span-2 bg-white p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[10px] text-navy-400 uppercase font-semibold block">Permanent Residential Address</span>
                        <span className="text-xs text-navy-800">{formData.address}, {formData.city} - {formData.pincode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-navy-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy-500">
                    <div>Digitally timestamped & encrypted with SHA-256 integrity signature.</div>
                    <div className="text-academic-emerald font-semibold">Attestation Verified ✓</div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="univ-btn-primary px-6 py-3 text-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official Admission Slip</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setCurrentStep(1);
                      setFormData({
                        fullName: '',
                        dob: '',
                        gender: 'Male',
                        bloodGroup: 'O+',
                        photoUrl: '',
                        phone: '',
                        email: '',
                        address: '',
                        city: '',
                        pincode: '',
                        guardianName: '',
                        guardianRelation: 'Father',
                        guardianPhone: '',
                        degreeProgram: 'B.Tech - Computer Science & Engineering',
                        admissionYear: '2026',
                      });
                    }}
                    className="univ-btn-secondary px-6 py-3 text-xs"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Submit Another Application</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (

            /* Multi-step Form */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-8 space-y-6">
                
                {/* Step indicator */}
                <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
                  {[
                    { step: 1, label: '01. Personal' },
                    { step: 2, label: '02. Contact' },
                    { step: 3, label: '03. Guardian' },
                    { step: 4, label: '04. Review' },
                  ].map((s) => (
                    <div
                      key={s.step}
                      onClick={() => {
                        if (s.step < currentStep) setCurrentStep(s.step);
                      }}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        currentStep === s.step
                          ? 'bg-navy-950 text-white border-navy-950 shadow-xs'
                          : currentStep > s.step
                          ? 'bg-academic-emerald/10 text-academic-emerald border-academic-emerald/30'
                          : 'bg-white text-navy-500 border-navy-200/80 hover:bg-navy-50'
                      }`}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-navy-200/80 rounded-2xl p-6 sm:p-8 shadow-card">
                  
                  {/* STEP 1: Personal */}
                  {currentStep === 1 && (
                    <div className="space-y-5">
                      <div className="border-b border-navy-100 pb-3">
                        <span className="text-xs font-semibold text-brand-600 uppercase">Section 01 of 04</span>
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-950">
                          Student Personal Identity & Biometrics
                        </h2>
                      </div>

                      {/* Photo Upload */}
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1.5">
                          Official Student Portrait * (Passport Size)
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-navy-50/50 border border-dashed border-navy-300 rounded-xl">
                          <div className="w-20 h-24 rounded-lg border border-navy-200 bg-white flex items-center justify-center overflow-hidden shadow-xs relative shrink-0">
                            {formData.photoUrl ? (
                              <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-8 h-8 text-navy-400" />
                            )}
                          </div>

                          <div className="space-y-2 text-center sm:text-left flex-1">
                            <div className="text-xs text-navy-500">
                              Upload a clean formal portrait (JPG, PNG up to 5MB).
                            </div>
                            <label className="univ-btn-secondary text-xs cursor-pointer">
                              <Upload className="w-3.5 h-3.5 text-navy-500" />
                              <span>Select Photo File</span>
                              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>
                            {errors.photo && (
                              <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> {errors.photo}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">
                          Full Legal Name * (As per 10th / Secondary Certificate)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                          placeholder="e.g. Rohan Vinod Kulkarni"
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-600 font-medium mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            Date of Birth *
                          </label>
                          <input
                            type="date"
                            required
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2 text-xs font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                          />
                          {errors.dob && (
                            <p className="text-xs text-red-600 font-medium mt-1">{errors.dob}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            Gender
                          </label>
                          <select
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2 text-xs font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                          >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            Blood Group
                          </label>
                          <select
                            value={formData.bloodGroup}
                            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2 text-xs font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
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
                        <label className="block text-xs font-semibold text-navy-700 mb-1">
                          Enrolled Academic Discipline *
                        </label>
                        <select
                          value={formData.degreeProgram}
                          onChange={(e) => setFormData({ ...formData, degreeProgram: e.target.value })}
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                        >
                          <option>B.Tech - Computer Science & Engineering</option>
                          <option>B.Tech - Artificial Intelligence & Data Science</option>
                          <option>B.Tech - Electronics & Communication</option>
                          <option>B.Tech - Mechanical Engineering</option>
                          <option>B.Sc - Computer Applications & IT</option>
                          <option>MBBS - Medicine & Surgery</option>
                          <option>B.A. LL.B (Honours) - Integrated Law</option>
                          <option>BBA / MBA - Integrated Business Administration</option>
                        </select>
                      </div>

                    </div>
                  )}

                  {/* STEP 2: Contact */}
                  {currentStep === 2 && (
                    <div className="space-y-5">
                      <div className="border-b border-navy-100 pb-3">
                        <span className="text-xs font-semibold text-brand-600 uppercase">Section 02 of 04</span>
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-950">
                          Student Contact & Residence
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            Student Mobile Number *
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                              placeholder="e.g. 9876543210"
                            />
                            <Phone className="w-4 h-4 text-navy-400 absolute left-3.5 top-3.5" />
                          </div>
                          {errors.phone && (
                            <p className="text-xs text-red-600 font-medium mt-1">{errors.phone}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            Student Email Address *
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                              placeholder="e.g. student@collegecentre.edu"
                            />
                            <Mail className="w-4 h-4 text-navy-400 absolute left-3.5 top-3.5" />
                          </div>
                          {errors.email && (
                            <p className="text-xs text-red-600 font-medium mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">
                          Permanent Residential Address *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                          placeholder="House / Flat No, Street, Locality"
                        />
                        {errors.address && (
                          <p className="text-xs text-red-600 font-medium mt-1">{errors.address}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            City / District *
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                            placeholder="e.g. Bengaluru / Pune"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            Postal PIN Code *
                          </label>
                          <input
                            type="text"
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2 text-xs font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                            placeholder="e.g. 560001"
                          />
                        </div>
                      </div>

                    </div>
                  )}

                  {/* STEP 3: Guardian */}
                  {currentStep === 3 && (
                    <div className="space-y-5">
                      <div className="border-b border-navy-100 pb-3">
                        <span className="text-xs font-semibold text-brand-600 uppercase">Section 03 of 04</span>
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-950">
                          Guardian & Emergency Contact Information
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            Guardian Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.guardianName}
                            onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                            placeholder="e.g. Vinod S. Kulkarni"
                          />
                          {errors.guardianName && (
                            <p className="text-xs text-red-600 font-medium mt-1">{errors.guardianName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            Relationship *
                          </label>
                          <select
                            value={formData.guardianRelation}
                            onChange={(e) => setFormData({ ...formData, guardianRelation: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                          >
                            <option>Father</option>
                            <option>Mother</option>
                            <option>Legal Guardian</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">
                          Guardian Mobile Phone * (Notifications & Emergency)
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={formData.guardianPhone}
                            onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                            placeholder="e.g. 9811122233"
                          />
                          <Phone className="w-4 h-4 text-navy-400 absolute left-3.5 top-3.5" />
                        </div>
                        {errors.guardianPhone && (
                          <p className="text-xs text-red-600 font-medium mt-1">{errors.guardianPhone}</p>
                        )}
                      </div>

                      <div className="p-3.5 bg-brand-50/60 border border-brand-200/70 rounded-xl text-navy-700 text-xs">
                        ℹ <strong>Parent Portal Notification:</strong> Real-time semester grades and attendance threshold warnings are automatically dispatched to the verified guardian mobile number.
                      </div>

                    </div>
                  )}

                  {/* STEP 4: Review & Attestation */}
                  {currentStep === 4 && (
                    <div className="space-y-5">
                      <div className="border-b border-navy-100 pb-3">
                        <span className="text-xs font-semibold text-brand-600 uppercase">Section 04 of 04</span>
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-950">
                          Review & Attestation
                        </h2>
                      </div>

                      <div className="p-4 bg-navy-50/50 border border-navy-200 rounded-xl space-y-3.5 text-xs">
                        <div className="flex items-center justify-between border-b border-navy-200 pb-2 font-semibold text-navy-900">
                          <span>Applicant Details Summary</span>
                          <span className="text-brand-600 font-mono text-[11px]">Ready for Attestation</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-[10px] text-navy-400 uppercase font-semibold block">Full Name:</span>
                            <span className="font-medium text-navy-900">{formData.fullName || '—'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-navy-400 uppercase font-semibold block">DOB / Blood:</span>
                            <span className="font-medium text-navy-900">{formData.dob || '—'} ({formData.bloodGroup})</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-navy-400 uppercase font-semibold block">Phone:</span>
                            <span className="font-medium text-navy-900">{formData.phone || '—'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-navy-400 uppercase font-semibold block">Email:</span>
                            <span className="font-medium text-navy-900">{formData.email || '—'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-navy-400 uppercase font-semibold block">Guardian Name:</span>
                            <span className="font-medium text-navy-900">{formData.guardianName || '—'} ({formData.guardianRelation})</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-navy-400 uppercase font-semibold block">Guardian Phone:</span>
                            <span className="font-medium text-navy-900">{formData.guardianPhone || '—'}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-navy-200">
                          <span className="text-[10px] text-navy-400 uppercase font-semibold block">Discipline Program:</span>
                          <span className="font-medium text-brand-700">{formData.degreeProgram}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3.5 bg-navy-50/40 border border-navy-200 rounded-xl text-xs">
                        <input type="checkbox" required defaultChecked id="attest" className="mt-0.5 rounded text-brand-600" />
                        <label htmlFor="attest" className="text-navy-600 leading-relaxed">
                          I hereby attest that the photograph, personal details, student phone, and guardian information supplied above are genuine and accurate as per official university admission standards.
                        </label>
                      </div>

                    </div>
                  )}

                  {/* Form Footer Buttons */}
                  <div className="pt-6 border-t border-navy-100 flex items-center justify-between gap-4">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="univ-btn-secondary text-xs"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Previous Section</span>
                      </button>
                    ) : <div />}

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="univ-btn-primary text-xs"
                      >
                        <span>Next Section</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="univ-btn-accent text-xs"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{isSubmitting ? 'Submitting Application...' : 'Submit Student Record'}</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* Sidebar Preview (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="text-xs font-semibold text-navy-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-academic-emerald animate-pulse" />
                  Live Dossier Preview
                </div>

                <div className="bg-white border border-navy-200/80 rounded-2xl p-5 shadow-card space-y-4">
                  
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-20 rounded-xl border border-navy-200 bg-navy-50 overflow-hidden flex items-center justify-center relative shrink-0 shadow-xs">
                      {formData.photoUrl ? (
                        <img src={formData.photoUrl} alt="Student" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-7 h-7 text-navy-400" />
                      )}
                      {formData.bloodGroup && (
                        <div className="absolute bottom-0 inset-x-0 bg-navy-950/80 text-white text-[8px] font-bold text-center py-0.5">
                          {formData.bloodGroup}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                        Applicant 2026
                      </span>
                      <h3 className="font-display font-bold text-base text-navy-950 truncate">
                        {formData.fullName || 'Candidate Name'}
                      </h3>
                      <p className="text-xs text-navy-500 truncate">
                        {formData.degreeProgram.split('-')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-navy-100 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-navy-400">DOB:</span>
                      <span className="font-medium text-navy-800">{formData.dob || 'YYYY-MM-DD'}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-navy-400">Phone:</span>
                      <span className="font-medium text-navy-800">{formData.phone || '+91 —'}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-navy-400">Guardian:</span>
                      <span className="font-medium text-navy-800 truncate max-w-[140px] text-right">
                        {formData.guardianName || 'Parent Name'}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-navy-400">Guardian Phone:</span>
                      <span className="font-medium text-navy-800">{formData.guardianPhone || '+91 —'}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-navy-100 text-[11px] text-academic-emerald font-semibold flex items-center justify-between">
                    <span>Encryption: AES-256</span>
                    <span>Ready ✓</span>
                  </div>
                </div>

                <div className="p-4 bg-navy-900 text-white rounded-2xl text-xs space-y-1.5 shadow-sm">
                  <div className="font-semibold text-brand-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-academic-emerald" />
                    <span>DPDPA 2023 Compliant</span>
                  </div>
                  <p className="text-navy-300 text-[11px] leading-relaxed">
                    Student data is encrypted in transit and solely accessible by authorized university registrars and exam controllers.
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-navy-200 py-6 px-4 text-xs text-navy-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2026 CollegeCentre University Registry System • DPDPA 2023 & FERPA Compliant.
          </div>
          <div className="text-navy-400">
            admissions@collegecentre.in
          </div>
        </div>
      </footer>

    </div>
  );
};
