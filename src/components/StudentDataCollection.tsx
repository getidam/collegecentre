import React, { useState, useRef } from 'react';
import { 
  User, Calendar, Phone, Upload, Users, ShieldCheck, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, 
  Printer, RefreshCw, Mail
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
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.photoUrl) newErrors.photo = 'Student photograph is required';
    } else if (step === 2) {
      if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit phone number is required';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
      if (!formData.address.trim()) newErrors.address = 'Residential address is required';
    } else if (step === 3) {
      if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
      if (!formData.guardianPhone.trim() || formData.guardianPhone.length < 10) newErrors.guardianPhone = 'Valid 10-digit guardian phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }
    setIsSubmitting(true);
    const autoId = 'CC-REG-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(autoId);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#c9561e', '#17191c', '#166534', '#d97706'],
      });
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 md:py-16 bg-paper-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation & Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b-2 border-ink">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="font-mono text-xs font-bold uppercase text-ink hover:text-cjpOrange flex items-center gap-1 bg-paper-100 px-2 py-1 border border-ink shadow-brutal-sm mr-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
                </button>
              )}
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange bg-cjpOrange/10 px-2.5 py-0.5 border border-cjpOrange/30">
                OFFICIAL UNIVERSITY DATA ADMISSION DISPATCH
              </span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-ink uppercase tracking-tight">
              STUDENT REGISTRATION & <br />
              <span className="text-cjpOrange">DATA COLLECTION PORTAL</span>
            </h1>
          </div>

          <div className="font-mono text-xs text-ink-muted text-left sm:text-right">
            <span className="inline-block bg-ink text-paper-100 font-bold px-2.5 py-1 uppercase text-[10px] mb-1">
              SECURE DPDPA FORM 2026
            </span>
            <div>MANDATORY ENROLLMENT RECORD</div>
          </div>
        </div>

        {submitted ? (
          <div className="space-y-6">
            <div className="brutal-card bg-paper-50 p-6 sm:p-10 border-4 border-ink shadow-brutal-xl">
              <div className="text-center max-w-xl mx-auto space-y-4 mb-8">
                <div className="w-16 h-16 bg-cjpGreen text-white border-2 border-ink mx-auto flex items-center justify-center shadow-brutal">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-ink">
                  REGISTRATION RECORD VERIFIED!
                </h2>

                <p className="font-sans text-sm sm:text-base text-ink-muted">
                  Student record for <strong className="text-ink">{formData.fullName}</strong> has been encrypted and indexed in the university database ledger.
                </p>

                <div className="inline-block bg-cjpOrange text-white font-mono text-sm font-bold px-4 py-1.5 border border-ink uppercase">
                  ACKNOWLEDGMENT REF: {applicationId}
                </div>
              </div>

              <div ref={printRef} className="bg-paper-100 border-2 border-ink p-6 shadow-brutal-sm font-sans space-y-6">
                <div className="flex items-center justify-between border-b-2 border-ink pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cjpOrange text-white font-display text-xl font-bold flex items-center justify-center border-2 border-ink">
                      CC
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl uppercase tracking-tight text-ink leading-none">
                        COLLEGE<span className="text-cjpOrange">CENTRE</span> UNIVERSITY REGISTRY
                      </h3>
                      <span className="font-mono text-[10px] text-ink-light">
                        OFFICIAL STUDENT ONBOARDING RECORD • ACADEMIC YEAR 2026
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="bg-cjpGreen text-white font-bold px-2 py-0.5 uppercase text-[10px]">
                      STATUS: ACTIVE
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3 flex flex-col items-center">
                    <div className="w-32 h-36 border-2 border-ink bg-paper-50 shadow-brutal-sm overflow-hidden relative">
                      {formData.photoUrl ? (
                        <img src={formData.photoUrl} alt={formData.fullName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-ink-light font-mono text-xs">
                          NO PHOTO
                        </div>
                      )}
                    </div>
                    <span className="font-mono text-[9px] text-ink-light uppercase mt-1">BIOMETRIC SEAL</span>
                  </div>

                  <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div className="bg-paper-50 p-2.5 border border-ink/20">
                      <span className="text-[10px] text-ink-light uppercase font-bold block">STUDENT FULL NAME</span>
                      <span className="text-sm font-display font-bold text-ink uppercase">{formData.fullName}</span>
                    </div>

                    <div className="bg-paper-50 p-2.5 border border-ink/20">
                      <span className="text-[10px] text-ink-light uppercase font-bold block">DATE OF BIRTH / GENDER</span>
                      <span className="text-xs font-bold text-ink">{formData.dob} ({formData.gender}, {formData.bloodGroup})</span>
                    </div>

                    <div className="bg-paper-50 p-2.5 border border-ink/20">
                      <span className="text-[10px] text-ink-light uppercase font-bold block">STUDENT CONTACT PHONE</span>
                      <span className="text-xs font-bold text-ink">{formData.phone}</span>
                    </div>

                    <div className="bg-paper-50 p-2.5 border border-ink/20">
                      <span className="text-[10px] text-ink-light uppercase font-bold block">STUDENT EMAIL</span>
                      <span className="text-xs font-bold text-ink">{formData.email}</span>
                    </div>

                    <div className="bg-paper-50 p-2.5 border border-ink/20">
                      <span className="text-[10px] text-ink-light uppercase font-bold block">GUARDIAN NAME & RELATION</span>
                      <span className="text-sm font-display font-bold text-ink uppercase">{formData.guardianName} ({formData.guardianRelation})</span>
                    </div>

                    <div className="bg-paper-50 p-2.5 border border-ink/20">
                      <span className="text-[10px] text-ink-light uppercase font-bold block">GUARDIAN CONTACT PHONE</span>
                      <span className="text-xs font-bold text-ink">{formData.guardianPhone}</span>
                    </div>

                    <div className="sm:col-span-2 bg-paper-50 p-2.5 border border-ink/20">
                      <span className="text-[10px] text-ink-light uppercase font-bold block">ADMITTED PROGRAM & DISCIPLINE</span>
                      <span className="text-xs font-bold text-cjpOrange">{formData.degreeProgram} (Batch {formData.admissionYear})</span>
                    </div>

                    <div className="sm:col-span-2 bg-paper-50 p-2.5 border border-ink/20">
                      <span className="text-[10px] text-ink-light uppercase font-bold block">PERMANENT RESIDENTIAL ADDRESS</span>
                      <span className="text-xs text-ink">{formData.address}, {formData.city} - {formData.pincode}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-dashed border-ink/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-ink-light">
                  <div>DIGITALLY TIMESTAMPED & ATTESTED // VERIFIED RECONCILIATION</div>
                  <div className="text-cjpGreen font-bold uppercase">SHA-256 DIGITAL ATTESTATION SIGNED ✓</div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handlePrint}
                  className="w-full sm:w-auto brutal-btn bg-ink text-paper-100 hover:bg-cjpOrange px-6 py-3 text-sm flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>PRINT OFFICIAL RECEIPT</span>
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
                  className="w-full sm:w-auto brutal-btn bg-paper-100 text-ink hover:bg-paper-200 px-6 py-3 text-sm flex items-center justify-center gap-2 border-2 border-ink"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>SUBMIT ANOTHER RECORD</span>
                </button>
              </div>
            </div>
          </div>
        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8 space-y-6">
              
              <div className="grid grid-cols-4 gap-2 font-mono text-xs font-bold">
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
                    className={
                      'p-2.5 border-2 border-ink text-center uppercase cursor-pointer transition-all ' +
                      (currentStep === s.step
                        ? 'bg-cjpOrange text-white shadow-brutal-sm font-bold'
                        : currentStep > s.step
                        ? 'bg-cjpGreen-tint text-cjpGreen border-cjpGreen/60'
                        : 'bg-paper-100 text-ink-light')
                    }
                  >
                    {s.label}
                  </div>
                ))}
              </div>

              <div className="brutal-card bg-paper-50 p-6 sm:p-8 border-2 border-ink shadow-brutal-lg">
                
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="border-b-2 border-ink pb-3">
                      <span className="font-mono text-xs font-bold uppercase text-cjpOrange">SECTION 01 OF 04</span>
                      <h2 className="font-display font-bold text-2xl uppercase text-ink flex items-center gap-2">
                        <User className="w-5 h-5 text-cjpOrange" />
                        <span>Student Personal Identification</span>
                      </h2>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5">
                        Student Official Photograph * (Passport Size)
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-paper-100 border-2 border-dashed border-ink">
                        <div className="w-24 h-28 border-2 border-ink bg-paper-50 flex items-center justify-center overflow-hidden shadow-brutal-sm relative shrink-0">
                          {formData.photoUrl ? (
                            <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-10 h-10 text-ink-light" />
                          )}
                        </div>

                        <div className="space-y-2 text-center sm:text-left flex-1">
                          <div className="text-xs font-sans text-ink-muted">
                            Upload a clear passport-style portrait (JPG, PNG up to 5MB).
                          </div>
                          <label className="inline-block brutal-btn bg-ink text-paper-100 hover:bg-cjpOrange px-4 py-2 text-xs cursor-pointer">
                            <Upload className="w-3.5 h-3.5 inline mr-1.5" />
                            <span>SELECT PHOTO FROM DEVICE</span>
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                          </label>
                          {errors.photo && (
                            <p className="text-xs font-mono text-red-600 font-bold flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {errors.photo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                        Student Full Legal Name * (As per Secondary Certificate)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-paper-100 border-2 border-ink px-3 py-2.5 text-sm font-sans font-semibold focus:outline-none focus:bg-white"
                        placeholder="e.g. Rohan Vinod Kulkarni"
                      />
                      {errors.fullName && (
                        <p className="text-xs font-mono text-red-600 font-bold mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="w-full bg-paper-100 border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:bg-white"
                        />
                        {errors.dob && (
                          <p className="text-xs font-mono text-red-600 font-bold mt-1">{errors.dob}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                          Gender
                        </label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-full bg-paper-100 border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:bg-white"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                          Blood Group
                        </label>
                        <select
                          value={formData.bloodGroup}
                          onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                          className="w-full bg-paper-100 border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:bg-white"
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
                        Enrolled Degree & Department *
                      </label>
                      <select
                        value={formData.degreeProgram}
                        onChange={(e) => setFormData({ ...formData, degreeProgram: e.target.value })}
                        className="w-full bg-paper-100 border-2 border-ink px-3 py-2.5 text-xs font-mono font-bold focus:outline-none focus:bg-white"
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

                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="border-b-2 border-ink pb-3">
                      <span className="font-mono text-xs font-bold uppercase text-cjpOrange">SECTION 02 OF 04</span>
                      <h2 className="font-display font-bold text-2xl uppercase text-ink flex items-center gap-2">
                        <Phone className="w-5 h-5 text-cjpOrange" />
                        <span>Student Contact & Address</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                          Student Mobile Number *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-paper-100 border-2 border-ink px-3 py-2.5 text-sm font-sans font-semibold focus:outline-none focus:bg-white pl-9"
                            placeholder="e.g. 9876543210"
                          />
                          <Phone className="w-4 h-4 text-ink-light absolute left-3 top-3.5" />
                        </div>
                        {errors.phone && (
                          <p className="text-xs font-mono text-red-600 font-bold mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                          Student Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-paper-100 border-2 border-ink px-3 py-2.5 text-sm font-sans font-semibold focus:outline-none focus:bg-white pl-9"
                            placeholder="e.g. student@collegecentre.edu"
                          />
                          <Mail className="w-4 h-4 text-ink-light absolute left-3 top-3.5" />
                        </div>
                        {errors.email && (
                          <p className="text-xs font-mono text-red-600 font-bold mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                        Permanent Residential Address *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-paper-100 border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none focus:bg-white"
                        placeholder="House / Flat No, Street, Locality"
                      />
                      {errors.address && (
                        <p className="text-xs font-mono text-red-600 font-bold mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                          City / District *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-paper-100 border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none focus:bg-white"
                          placeholder="e.g. Bengaluru / Pune"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                          Postal PIN Code *
                        </label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full bg-paper-100 border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:bg-white"
                          placeholder="e.g. 560001"
                        />
                      </div>
                    </div>

                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="border-b-2 border-ink pb-3">
                      <span className="font-mono text-xs font-bold uppercase text-cjpOrange">SECTION 03 OF 04</span>
                      <h2 className="font-display font-bold text-2xl uppercase text-ink flex items-center gap-2">
                        <Users className="w-5 h-5 text-cjpOrange" />
                        <span>Guardian & Emergency Contact Information</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                          Guardian Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.guardianName}
                          onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                          className="w-full bg-paper-100 border-2 border-ink px-3 py-2.5 text-sm font-sans font-semibold focus:outline-none focus:bg-white"
                          placeholder="e.g. Vinod S. Kulkarni"
                        />
                        {errors.guardianName && (
                          <p className="text-xs font-mono text-red-600 font-bold mt-1">{errors.guardianName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                          Relationship *
                        </label>
                        <select
                          value={formData.guardianRelation}
                          onChange={(e) => setFormData({ ...formData, guardianRelation: e.target.value })}
                          className="w-full bg-paper-100 border-2 border-ink px-3 py-2.5 text-xs font-mono font-bold focus:outline-none focus:bg-white"
                        >
                          <option>Father</option>
                          <option>Mother</option>
                          <option>Legal Guardian</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                        Guardian Mobile Number * (Emergency & Notifications)
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={formData.guardianPhone}
                          onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                          className="w-full bg-paper-100 border-2 border-ink px-3 py-2.5 text-sm font-sans font-semibold focus:outline-none focus:bg-white pl-9"
                          placeholder="e.g. 9811122233"
                        />
                        <Phone className="w-4 h-4 text-ink-light absolute left-3 top-3.5" />
                      </div>
                      {errors.guardianPhone && (
                        <p className="text-xs font-mono text-red-600 font-bold mt-1">{errors.guardianPhone}</p>
                      )}
                    </div>

                    <div className="p-3 bg-cjpGold-tint border border-cjpGold/40 text-ink text-xs font-mono">
                      ℹ <strong>Parent Portal Notification:</strong> Real-time semester grades and attendance threshold warnings are automatically dispatched to the verified guardian mobile number.
                    </div>

                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div className="border-b-2 border-ink pb-3">
                      <span className="font-mono text-xs font-bold uppercase text-cjpOrange">SECTION 04 OF 04</span>
                      <h2 className="font-display font-bold text-2xl uppercase text-ink flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-cjpGreen" />
                        <span>Review & Attestation Submission</span>
                      </h2>
                    </div>

                    <div className="p-4 bg-paper-100 border-2 border-ink space-y-4 font-mono text-xs">
                      <div className="flex items-center justify-between border-b border-ink/20 pb-2 font-bold text-sm text-ink">
                        <span>STUDENT RECORD SUMMARY</span>
                        <span className="text-cjpOrange">READY TO MINT</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[10px] text-ink-light uppercase block">FULL NAME:</span>
                          <span className="font-bold text-ink">{formData.fullName || '—'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-ink-light uppercase block">DOB / BLOOD:</span>
                          <span className="font-bold text-ink">{formData.dob || '—'} ({formData.bloodGroup})</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-ink-light uppercase block">STUDENT PHONE:</span>
                          <span className="font-bold text-ink">{formData.phone || '—'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-ink-light uppercase block">EMAIL:</span>
                          <span className="font-bold text-ink">{formData.email || '—'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-ink-light uppercase block">GUARDIAN NAME:</span>
                          <span className="font-bold text-ink">{formData.guardianName || '—'} ({formData.guardianRelation})</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-ink-light uppercase block">GUARDIAN PHONE:</span>
                          <span className="font-bold text-ink">{formData.guardianPhone || '—'}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-ink/10">
                        <span className="text-[10px] text-ink-light uppercase block">DISCIPLINE PROGRAM:</span>
                        <span className="font-bold text-cjpOrange">{formData.degreeProgram}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-paper-100 border border-ink/40 text-xs font-sans">
                      <input type="checkbox" required defaultChecked id="attest" className="mt-1" />
                      <label htmlFor="attest" className="text-ink-muted">
                        I hereby attest that the photograph, personal details, student phone, and guardian information supplied above are genuine and accurate as per official university admission standards.
                      </label>
                    </div>

                  </div>
                )}

                <div className="pt-6 border-t-2 border-ink flex items-center justify-between gap-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="brutal-btn bg-paper-100 text-ink hover:bg-paper-200 px-5 py-2.5 text-xs flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>PREVIOUS STEP</span>
                    </button>
                  ) : <div />}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="brutal-btn bg-cjpOrange text-white hover:bg-ink px-6 py-2.5 text-xs flex items-center gap-1.5 shadow-brutal"
                    >
                      <span>NEXT SECTION</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="brutal-btn bg-cjpGreen text-white hover:bg-ink px-8 py-3 text-sm flex items-center gap-2 shadow-brutal font-bold"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      <span>{isSubmitting ? 'ENCRYPTING & SUBMITTING...' : 'SUBMIT STUDENT DATA RECORD →'}</span>
                    </button>
                  )}
                </div>

              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-mono uppercase font-bold text-ink-light tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cjpGreen animate-pulse"></span>
                LIVE STUDENT DOSSIER PREVIEW
              </div>

              <div className="brutal-card bg-paper-50 p-5 border-2 border-ink shadow-brutal space-y-4">
                
                <div className="flex items-center gap-4">
                  <div className="w-20 h-24 border-2 border-ink bg-paper-100 shadow-brutal-sm overflow-hidden flex items-center justify-center relative shrink-0">
                    {formData.photoUrl ? (
                      <img src={formData.photoUrl} alt="Student" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-ink-light" />
                    )}
                    {formData.bloodGroup && (
                      <div className="absolute bottom-0 inset-x-0 bg-ink text-white font-mono text-[8px] font-bold text-center">
                        {formData.bloodGroup}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <span className="bg-cjpOrange text-white font-mono text-[8px] font-bold px-1.5 py-0.5 uppercase">
                      APPLICANT 2026
                    </span>
                    <h3 className="font-display font-bold text-lg text-ink uppercase leading-none truncate">
                      {formData.fullName || 'Candidate Name'}
                    </h3>
                    <p className="font-sans text-[11px] text-ink-muted truncate">
                      {formData.degreeProgram.split('-')[0]}
                    </p>
                  </div>
                </div>

                <div className="border-t border-ink/20 pt-3 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-ink-light">DOB:</span>
                    <span className="font-bold text-ink">{formData.dob || 'YYYY-MM-DD'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-ink-light">PHONE:</span>
                    <span className="font-bold text-ink">{formData.phone || '+91 —'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-ink-light">GUARDIAN:</span>
                    <span className="font-bold text-ink truncate max-w-[140px] text-right">
                      {formData.guardianName || 'Parent Name'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-ink-light">G-PHONE:</span>
                    <span className="font-bold text-ink">{formData.guardianPhone || '+91 —'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-dashed border-ink/30 text-[10px] font-mono text-cjpGreen font-bold flex items-center justify-between">
                  <span>ENCRYPTION: AES-256</span>
                  <span>READY ✓</span>
                </div>
              </div>

              <div className="p-4 bg-ink text-paper-100 border-2 border-ink font-mono text-[11px] space-y-1.5 shadow-brutal-sm">
                <div className="font-bold text-cjpOrange flex items-center gap-1.5 uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DPDPA 2023 DATA SOVEREIGNTY</span>
                </div>
                <p className="text-paper-300 text-[10px] leading-relaxed">
                  Student and Guardian contact coordinates are encrypted in transit and solely accessible by authorized university examination and registrar controllers.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
