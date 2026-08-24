import React, { useState, useEffect } from 'react';
import { 
  User, Phone, Upload, ShieldCheck, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, 
  RefreshCw, Mail, Lock, GraduationCap, MapPin,
  Globe, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabase';
import type { FormFieldConfig } from './AdminPortal';
import { getSubdomain } from '../lib/subdomain';

interface StudentDataCollectionProps {
  onBackToHome?: () => void;
  campusSlug?: string;
}

const DEFAULT_FIELDS: FormFieldConfig[] = [
  { id: 'f_name', label: 'Full Legal Name', name: 'fullName', type: 'text', placeholder: 'e.g. Rohan Vinod Kulkarni', required: true, section: 'personal', sort_order: 1, enabled: true },
  { id: 'f_dob', label: 'Date of Birth', name: 'dob', type: 'date', placeholder: '', required: true, section: 'personal', sort_order: 2, enabled: true },
  { id: 'f_gender', label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true, section: 'personal', sort_order: 3, enabled: true },
  { id: 'f_blood', label: 'Blood Group', name: 'bloodGroup', type: 'select', options: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], required: true, section: 'personal', sort_order: 4, enabled: true },
  { id: 'f_program', label: 'Academic Discipline', name: 'degreeProgram', type: 'select', options: ['B.Tech - Computer Science & Engineering', 'B.Tech - Artificial Intelligence', 'B.Tech - Electronics & Comm', 'MBBS - Medicine & Surgery', 'B.A. LL.B (Honours)', 'MBA - Business Administration'], required: true, section: 'personal', sort_order: 5, enabled: true },
  { id: 'f_phone', label: 'Student Phone Number', name: 'phone', type: 'tel', placeholder: 'e.g. 9876543210', required: true, section: 'contact', sort_order: 6, enabled: true },
  { id: 'f_email', label: 'Student Email Address', name: 'email', type: 'email', placeholder: 'e.g. student@collegecentre.edu', required: true, section: 'contact', sort_order: 7, enabled: true },
  { id: 'f_address', label: 'Permanent Address', name: 'address', type: 'textarea', placeholder: 'Flat No, Street, Locality', required: true, section: 'contact', sort_order: 8, enabled: true },
  { id: 'f_city', label: 'City / District', name: 'city', type: 'text', placeholder: 'e.g. Bengaluru', required: true, section: 'contact', sort_order: 9, enabled: true },
  { id: 'f_pincode', label: 'Postal PIN Code', name: 'pincode', type: 'text', placeholder: 'e.g. 560001', required: true, section: 'contact', sort_order: 10, enabled: true },
  { id: 'f_gname', label: 'Guardian Full Name', name: 'guardianName', type: 'text', placeholder: 'e.g. Vinod S. Kulkarni', required: true, section: 'guardian', sort_order: 11, enabled: true },
  { id: 'f_grel', label: 'Guardian Relationship', name: 'guardianRelation', type: 'select', options: ['Father', 'Mother', 'Legal Guardian'], required: true, section: 'guardian', sort_order: 12, enabled: true },
  { id: 'f_gphone', label: 'Guardian Phone Number', name: 'guardianPhone', type: 'tel', placeholder: 'e.g. 9811122233', required: true, section: 'guardian', sort_order: 13, enabled: true },
];

export const StudentDataCollection: React.FC<StudentDataCollectionProps> = ({ onBackToHome, campusSlug: propCampusSlug }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [fields, setFields] = useState<FormFieldConfig[]>(DEFAULT_FIELDS);
  const [campus, setCampus] = useState<{
    id: string;
    slug: string;
    name: string;
    code?: string;
    description?: string;
    badge_text?: string;
    banner_color?: string;
    programs?: string[];
  } | null>(null);

  const [formData, setFormData] = useState<Record<string, any>>({
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
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  useEffect(() => {
    const targetSlug = propCampusSlug || getSubdomain() || 'main';

    const fetchCampusAndSchema = async () => {
      try {
        const { data: campusData } = await supabase
          .from('campuses')
          .select('*')
          .eq('slug', targetSlug)
          .single();

        if (campusData) {
          setCampus(campusData);
          if (campusData.programs && campusData.programs.length > 0) {
            setFormData(prev => ({ ...prev, degreeProgram: campusData.programs[0] }));
          }
        }

        const { data: fieldData, error } = await supabase
          .from('form_fields')
          .select('*')
          .eq('enabled', true)
          .order('sort_order', { ascending: true });

        if (!error && fieldData && fieldData.length > 0) {
          let loadedFields = fieldData as FormFieldConfig[];
          if (campusData && campusData.programs && campusData.programs.length > 0) {
            loadedFields = loadedFields.map(f => {
              if (f.name === 'degreeProgram' || f.id === 'f_program') {
                return { ...f, options: campusData.programs };
              }
              return f;
            });
          }
          setFields(loadedFields);
        }
      } catch (err) {
        console.error('Error loading campus schema:', err);
      }
    };
    fetchCampusAndSchema();
  }, [propCampusSlug]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: 'File size must be under 10MB' }));
      return;
    }

    // 1. Instant local preview
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

    // 2. Direct upload to Supabase Storage bucket: "student-photos"
    setIsUploadingPhoto(true);
    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanFileName = `scholar_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('student-photos')
        .upload(cleanFileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type || 'image/jpeg'
        });

      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage
          .from('student-photos')
          .getPublicUrl(cleanFileName);

        if (urlData && urlData.publicUrl) {
          setFormData(prev => ({ ...prev, photoUrl: urlData.publicUrl }));
        }
      }
    } catch (err) {
      console.warn('Storage upload note:', err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName?.trim()) newErrors.fullName = 'Full Legal Name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.photoUrl) newErrors.photo = 'Student official passport photograph is required';
    } else if (step === 2) {
      if (!formData.phone?.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit mobile number is required';
      if (!formData.email?.trim() || !formData.email.includes('@')) newErrors.email = 'Valid academic/personal email is required';
      if (!formData.address?.trim()) newErrors.address = 'Permanent residential address is required';
    } else if (step === 3) {
      if (!formData.guardianName?.trim()) newErrors.guardianName = 'Guardian full name is required';
      if (!formData.guardianPhone?.trim() || formData.guardianPhone.length < 10) newErrors.guardianPhone = 'Valid 10-digit guardian mobile number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }
    setIsSubmitting(true);
    const autoId = 'CC-ADM-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(autoId);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSubmissionDate(formattedDate);
    
    const newRecord = {
      id: autoId,
      full_name: formData.fullName || '',
      dob: formData.dob || '',
      gender: formData.gender || 'Male',
      blood_group: formData.bloodGroup || 'O+',
      photo_url: formData.photoUrl || '',
      phone: formData.phone || '',
      email: formData.email || '',
      address: formData.address || '',
      city: formData.city || 'Campus Registered',
      pincode: formData.pincode || '—',
      guardian_name: formData.guardianName || '',
      guardian_relation: formData.guardianRelation || 'Guardian',
      guardian_phone: formData.guardianPhone || '',
      degree_program: formData.degreeProgram || 'B.Tech - Computer Science & Engineering',
      admission_year: formData.admissionYear || '2026',
      submission_date: formattedDate,
      status: 'Pending Review',
      campus_slug: campus?.slug || 'main',
      campus_name: campus?.name || 'CollegeCentre Central University',
      custom_fields: formData,
    };

    try {
      const { error: dbError } = await supabase.from('students').insert(newRecord);
      if (dbError) {
        console.warn('Database note:', dbError);
      }
    } catch (err) {
      console.error('Submission error:', err);
    }

    try {
      const existing = localStorage.getItem('cc_student_records');
      let recordsList = [];
      if (existing) recordsList = JSON.parse(existing);
      recordsList.unshift(newRecord);
      localStorage.setItem('cc_student_records', JSON.stringify(recordsList));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0c8ee9', '#059669', '#0f172a'],
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleResetForm = () => {
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
      degreeProgram: campus?.programs?.[0] || 'B.Tech - Computer Science & Engineering',
      admissionYear: '2026',
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-navy-50/40 text-navy-900 flex flex-col font-sans selection:bg-brand-600 selection:text-white">
      
      {/* Top Institutional Header */}
      <header className="bg-white border-b border-navy-200/80 py-3.5 px-4 sm:px-8 sticky top-0 z-40 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-white font-display font-bold flex items-center justify-center shadow-xs shrink-0"
              style={{ backgroundColor: campus?.banner_color || '#0c8ee9' }}
            >
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <span className="font-display font-bold text-base sm:text-lg text-navy-950 block leading-tight truncate">
                {campus ? campus.name : 'CollegeCentre University'}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-navy-500 font-medium truncate">
                <span>{campus?.badge_text || 'Central Admissions & Intake'}</span>
                {campus?.code && (
                  <span className="font-mono bg-navy-100 text-navy-700 px-1.5 py-0.2 rounded uppercase">
                    {campus.code}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1 text-xs text-navy-600 font-medium bg-navy-50 px-2.5 py-1.5 rounded-lg border border-navy-200/60">
              <Lock className="w-3.5 h-3.5 text-academic-emerald" />
              <span>DPDPA Encrypted</span>
            </div>
            {campus?.slug && campus.slug !== 'main' ? (
              <a
                href="https://collegecentre.in"
                className="text-xs font-semibold text-navy-700 hover:text-navy-950 flex items-center gap-1 bg-white hover:bg-navy-50 px-3 py-1.5 rounded-lg border border-navy-200 shadow-xs transition-colors"
                title="Visit Central University Website"
              >
                <Globe className="w-3.5 h-3.5 text-navy-500" />
                <span className="hidden sm:inline">Central University</span>
                <span className="sm:hidden">Main</span>
              </a>
            ) : onBackToHome ? (
              <button
                onClick={onBackToHome}
                className="text-xs font-semibold text-navy-700 hover:text-navy-950 flex items-center gap-1 bg-white hover:bg-navy-50 px-3 py-1.5 rounded-lg border border-navy-200 shadow-xs transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {submitted ? (
            /* THANK YOU FEEDBACK CONFIRMATION SCREEN */
            <div className="bg-white border border-navy-200/80 rounded-3xl p-6 sm:p-12 shadow-card text-center space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-300">
              
              <div className="space-y-3 max-w-lg mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-academic-emerald/10 text-academic-emerald mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-9 h-9 sm:w-12 sm:h-12" />
                </div>

                <h1 className="font-display font-bold text-2xl sm:text-3xl text-navy-950 tracking-tight">
                  Thank You!
                </h1>

                <h2 className="font-display font-semibold text-lg text-brand-700">
                  Your Application Has Been Submitted
                </h2>

                <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                  Your official student intake submission for <strong className="text-navy-950">{formData.fullName}</strong> has been successfully registered and encrypted into the university registry.
                </p>
              </div>

              {/* Application Details Receipt Card */}
              <div className="bg-navy-50/70 border border-navy-200/80 rounded-2xl p-5 text-left space-y-3.5 text-xs max-w-md mx-auto">
                <div className="flex items-center justify-between border-b border-navy-200/80 pb-2.5">
                  <span className="text-navy-500 font-medium">Application Reference</span>
                  <span className="font-mono font-bold text-brand-700 bg-white px-2 py-0.5 rounded border border-navy-200">
                    {applicationId}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-navy-200/80 pb-2.5">
                  <span className="text-navy-500 font-medium">Applicant Full Name</span>
                  <span className="font-semibold text-navy-900">{formData.fullName}</span>
                </div>

                <div className="flex items-center justify-between border-b border-navy-200/80 pb-2.5">
                  <span className="text-navy-500 font-medium">Academic Program</span>
                  <span className="font-semibold text-navy-900 text-right truncate max-w-[200px]">
                    {formData.degreeProgram}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-navy-200/80 pb-2.5">
                  <span className="text-navy-500 font-medium">Campus / Department</span>
                  <span className="font-medium text-navy-800">{campus?.name || 'Main Campus'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-navy-500 font-medium">Submission Timestamp</span>
                  <span className="font-mono text-navy-700 text-[11px]">{submissionDate}</span>
                </div>
              </div>

              {/* Next Steps Notification */}
              <div className="p-4 bg-brand-50/60 border border-brand-200/70 rounded-2xl text-navy-700 text-xs leading-relaxed max-w-md mx-auto">
                <p>
                  <strong>What happens next?</strong> The admissions verification officer will review your submitted credentials. Official enrollment status alerts will be sent to your registered mobile number (<strong>{formData.phone}</strong>) and email.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetForm}
                  className="univ-btn-primary w-full sm:w-auto px-6 py-3 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Submit Another Application</span>
                </button>

                {campus?.slug && campus.slug !== 'main' ? (
                  <a
                    href="https://collegecentre.in"
                    className="univ-btn-secondary w-full sm:w-auto px-6 py-3 text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    <Globe className="w-4 h-4 text-navy-500" />
                    <span>Visit Central University Portal</span>
                  </a>
                ) : onBackToHome ? (
                  <button
                    onClick={onBackToHome}
                    className="univ-btn-secondary w-full sm:w-auto px-6 py-3 text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Main Website</span>
                  </button>
                ) : null}
              </div>

            </div>
          ) : (
            /* FOCUSED ADMISSION FORM */
            <div className="space-y-6">
              
              {/* Form Title & Context */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/60">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{campus?.slug ? `${campus.slug}.collegecentre.in` : 'Official Student Admission'}</span>
                </div>
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-navy-950 tracking-tight">
                  Student Admission Intake Form
                </h1>
                <p className="text-xs sm:text-sm text-navy-600 max-w-lg mx-auto">
                  {campus?.description || 'Please complete all sections accurately to register your academic admission record.'}
                </p>
              </div>

              {/* Step Navigation Pill Indicator */}
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                {[
                  { step: 1, num: '01', title: 'Personal Identity' },
                  { step: 2, num: '02', title: 'Contact & Residence' },
                  { step: 3, num: '03', title: 'Guardian & Submit' },
                ].map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => {
                      if (s.step < currentStep) setCurrentStep(s.step);
                    }}
                    className={`py-3 px-2 rounded-2xl border text-center transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 ${
                      currentStep === s.step
                        ? 'bg-navy-950 text-white border-navy-950 shadow-xs'
                        : currentStep > s.step
                        ? 'bg-academic-emerald/10 text-academic-emerald border-academic-emerald/30'
                        : 'bg-white text-navy-400 border-navy-200/80 hover:bg-navy-50'
                    }`}
                  >
                    <span className="font-bold font-mono">{s.num}.</span>
                    <span className="truncate">{s.title}</span>
                  </button>
                ))}
              </div>

              {/* Form Box */}
              <form onSubmit={handleSubmit} className="bg-white border border-navy-200/80 rounded-3xl p-5 sm:p-8 shadow-card space-y-6">
                
                {/* SECTION 1: Personal Details */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="border-b border-navy-100 pb-3">
                      <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block">Section 01 of 03</span>
                      <h2 className="font-display font-bold text-xl text-navy-950">
                        Student Personal Identity
                      </h2>
                    </div>

                    {/* Passport Portrait Upload */}
                    <div>
                      <label className="block text-xs font-semibold text-navy-700 mb-1.5">
                        Official Passport Photo * (Student Portrait)
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-navy-50/50 border border-dashed border-navy-300 rounded-2xl">
                        <div className="w-20 h-24 rounded-xl border border-navy-200 bg-white flex items-center justify-center overflow-hidden shadow-xs relative shrink-0">
                          {formData.photoUrl ? (
                            <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-8 h-8 text-navy-400" />
                          )}
                          {isUploadingPhoto && (
                            <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center text-white">
                              <RefreshCw className="w-5 h-5 animate-spin" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2 text-center sm:text-left flex-1">
                          <p className="text-xs text-navy-500">
                            Upload clean, formal passport photo (JPG or PNG up to 10MB). Stored securely in cloud database.
                          </p>

                          <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                            <label className="univ-btn-secondary text-xs cursor-pointer py-2 px-3.5 inline-flex items-center gap-1.5">
                              <Upload className="w-3.5 h-3.5 text-navy-500" />
                              <span>{formData.photoUrl ? 'Change Photograph' : 'Select Photo File'}</span>
                              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>

                            {formData.photoUrl && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-academic-emerald bg-academic-emerald/10 px-2.5 py-1 rounded-lg">
                                <Check className="w-3.5 h-3.5" />
                                <span>Portrait Ready</span>
                              </span>
                            )}
                          </div>

                          {errors.photo && (
                            <p className="text-xs text-red-600 font-medium flex items-center justify-center sm:justify-start gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {errors.photo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Legal Name */}
                    <div>
                      <label className="block text-xs font-semibold text-navy-700 mb-1">
                        Full Legal Name * (As printed on 10th / School Certificate)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                        placeholder="e.g. Rohan Vinod Kulkarni"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* DOB, Gender, Blood Group */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
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
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
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
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
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

                    {/* Academic Program (Clean Text Input) */}
                    <div>
                      <label className="block text-xs font-semibold text-navy-700 mb-1">
                        Academic Discipline / Degree Program *
                      </label>
                      <input
                        type="text"
                        required
                        list="programs-list"
                        value={formData.degreeProgram}
                        onChange={(e) => setFormData({ ...formData, degreeProgram: e.target.value })}
                        className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                        placeholder="e.g. B.Tech Computer Science & Engineering"
                      />
                      <datalist id="programs-list">
                        {(campus?.programs && campus.programs.length > 0) ? (
                          campus.programs.map((prog, i) => (
                            <option key={i} value={prog} />
                          ))
                        ) : (
                          <>
                            <option value="B.Tech - Computer Science & Engineering" />
                            <option value="B.Tech - Artificial Intelligence & Data Science" />
                            <option value="B.Tech - Electronics & Communication" />
                            <option value="MBBS - Medicine & Surgery" />
                            <option value="B.A. LL.B (Honours) - Integrated Law" />
                            <option value="MBA - Business Administration" />
                          </>
                        )}
                      </datalist>
                      {errors.degreeProgram && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.degreeProgram}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* SECTION 2: Contact & Residence */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="border-b border-navy-100 pb-3">
                      <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block">Section 02 of 03</span>
                      <h2 className="font-display font-bold text-xl text-navy-950">
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
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                            placeholder="e.g. 9876543210"
                          />
                          <Phone className="w-4 h-4 text-navy-400 absolute left-3.5 top-3" />
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
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                            placeholder="e.g. student@collegecentre.edu"
                          />
                          <Mail className="w-4 h-4 text-navy-400 absolute left-3.5 top-3" />
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
                        className="w-full bg-navy-50/50 border border-navy-200 rounded-xl p-3 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                        placeholder="House / Flat No, Street, Locality, Landmark"
                      />
                      {errors.address && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">
                          City / District
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                          placeholder="e.g. Bengaluru"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">
                          Postal PIN Code
                        </label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-mono font-medium"
                          placeholder="e.g. 560001"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 3: Guardian Details & Attestation */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="border-b border-navy-100 pb-3">
                      <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block">Section 03 of 03</span>
                      <h2 className="font-display font-bold text-xl text-navy-950">
                        Guardian & Emergency Information
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
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
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
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        >
                          <option>Father</option>
                          <option>Mother</option>
                          <option>Legal Guardian</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-700 mb-1">
                        Guardian Mobile Phone Number * (Alerts & Emergency)
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={formData.guardianPhone}
                          onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium"
                          placeholder="e.g. 9811122233"
                        />
                        <Phone className="w-4 h-4 text-navy-400 absolute left-3.5 top-3" />
                      </div>
                      {errors.guardianPhone && (
                        <p className="text-xs text-red-600 font-medium mt-1">{errors.guardianPhone}</p>
                      )}
                    </div>

                    {/* Attestation Checkbox */}
                    <div className="flex items-start gap-3 p-3.5 bg-navy-50/70 border border-navy-200 rounded-2xl text-xs">
                      <input 
                        type="checkbox" 
                        required 
                        defaultChecked 
                        id="attest_terms" 
                        className="mt-0.5 rounded text-brand-600 shrink-0" 
                      />
                      <label htmlFor="attest_terms" className="text-navy-700 leading-relaxed text-xs">
                        I hereby declare and attest that all the details provided in this admission form are true and correct to the best of my knowledge as per official university regulations.
                      </label>
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="pt-4 border-t border-navy-100 flex items-center justify-between gap-3">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="univ-btn-secondary text-xs px-4 py-2.5 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>
                  ) : <div />}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="univ-btn-primary text-xs px-6 py-2.5 flex items-center gap-1.5"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="univ-btn-accent text-xs px-7 py-3 flex items-center gap-2 shadow-md"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
                    </button>
                  )}
                </div>

              </form>

            </div>
          )}

        </div>
      </main>

    </div>
  );
};
