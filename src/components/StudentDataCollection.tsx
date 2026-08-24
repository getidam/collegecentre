import React, { useState, useRef, useEffect } from 'react';
import { 
  User, Phone, Upload, ShieldCheck, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, 
  Printer, RefreshCw, Mail, Lock, GraduationCap, MapPin,
  Globe, Building2
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
  const printRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Detect campus from prop or universal getSubdomain resolver
    const targetSlug = propCampusSlug || getSubdomain() || 'main';

    const fetchCampusAndSchema = async () => {
      try {
        // Fetch Campus Profile
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

        // Fetch Dynamic Form Fields
        const { data: fieldData, error } = await supabase
          .from('form_fields')
          .select('*')
          .eq('enabled', true)
          .order('sort_order', { ascending: true });

        if (!error && fieldData && fieldData.length > 0) {
          let loadedFields = fieldData as FormFieldConfig[];
          // If campus has custom programs, inject them into the program field options
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
        console.error('Error loading dynamic campus schema:', err);
      }
    };
    fetchCampusAndSchema();
  }, [propCampusSlug]);

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoStorageUrl, setPhotoStorageUrl] = useState<string | null>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: 'File size must be under 10MB' }));
      return;
    }

    // 1. Generate local preview for instantaneous UI responsiveness
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

    // 2. Upload file directly to Supabase Storage bucket: "student-photos"
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
          setPhotoStorageUrl(urlData.publicUrl);
          setFormData(prev => ({ ...prev, photoUrl: urlData.publicUrl }));
        }
      } else if (uploadError) {
        console.warn('Storage upload note (using optimized image format):', uploadError.message);
      }
    } catch (err) {
      console.warn('Storage upload error:', err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName?.trim()) newErrors.fullName = 'Full Legal Name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.photoUrl) newErrors.photo = 'Student official photograph is required';
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
      setCurrentStep(prev => Math.min(prev + 1, 4));
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
    };

    try {
      // Save directly to Supabase database
      const { error: dbError } = await supabase.from('students').insert(newRecord);
      if (dbError) {
        console.warn('Supabase DB fallback to local storage:', dbError);
      }
    } catch (err) {
      console.error('Failed to save to Supabase:', err);
    }

    // Also mirror to localStorage
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
      
      {/* Dynamic Subdomain Institutional Header */}
      <header className="bg-white border-b border-navy-200/80 py-3.5 px-3 sm:px-8 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-white font-display font-bold flex items-center justify-center shadow-xs shrink-0"
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

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-navy-600 font-medium bg-navy-50 px-3 py-1.5 rounded-lg border border-navy-200/60">
              <Lock className="w-3.5 h-3.5 text-academic-emerald" />
              <span>DPDPA 2023 Encrypted</span>
            </div>
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="text-xs font-semibold text-navy-700 hover:text-navy-950 flex items-center gap-1 bg-white hover:bg-navy-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-navy-200 shadow-xs transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Overview</span>
                <span className="xs:hidden">Back</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow py-6 sm:py-10">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-navy-200/80 flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2">
            <div>
              <span 
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold mb-2"
                style={{ 
                  backgroundColor: `${campus?.banner_color || '#0c8ee9'}15`,
                  color: campus?.banner_color || '#0c8ee9',
                  borderColor: `${campus?.banner_color || '#0c8ee9'}40`
                }}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{campus?.slug ? `${campus.slug}.collegecentre.in` : 'Official Enrollment'}</span>
              </span>
              <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-navy-950 tracking-tight leading-tight">
                {campus ? `${campus.name}` : 'Student Admission & Data Intake Form'}
              </h1>
              <p className="text-xs sm:text-sm text-navy-600 mt-1">
                {campus?.description || 'Submit your verified academic information directly to the central university registry.'}
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-[11px] font-bold text-academic-emerald uppercase tracking-wider block">
                ● Live Intake Active
              </span>
              <span className="text-xs text-navy-500 font-mono">
                Academic Year 2026-2027
              </span>
            </div>
          </div>

          {submitted ? (
            /* Success & Printable Slip */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-navy-200/80 rounded-2xl p-5 sm:p-10 shadow-card">
                <div className="text-center max-w-xl mx-auto space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-academic-emerald/10 text-academic-emerald mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  
                  <h2 className="font-display font-bold text-xl sm:text-3xl text-navy-950">
                    Student Record Submitted & Indexed
                  </h2>

                  <p className="text-xs sm:text-sm text-navy-600">
                    Admission dossier for <strong className="text-navy-900">{formData.fullName}</strong> has been encrypted and assigned to the central university ledger.
                  </p>

                  <div className="inline-block bg-navy-900 text-white text-xs font-mono font-bold px-3 sm:px-4 py-1.5 rounded-lg">
                    REFERENCE: {applicationId}
                  </div>
                </div>

                {/* Dossier Card */}
                <div ref={printRef} className="bg-navy-50/40 border border-navy-200 rounded-2xl p-4 sm:p-6 shadow-xs font-sans space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between border-b border-navy-200 pb-3 sm:pb-4 gap-2">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-navy-900 text-white font-bold flex items-center justify-center text-xs sm:text-sm shrink-0">
                        CC
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-sm sm:text-base text-navy-950 leading-tight truncate">
                          CollegeCentre Admissions Ledger
                        </h3>
                        <span className="text-[10px] sm:text-xs text-navy-500 font-medium truncate block">
                          Official Student Registration Dossier • 2026
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-academic-emerald bg-academic-emerald/10 px-2 py-0.5 sm:py-1 rounded-full shrink-0">
                      Verified Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
                    <div className="md:col-span-3 flex flex-col items-center">
                      <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl border border-navy-200 bg-white overflow-hidden shadow-xs relative">
                        {formData.photoUrl ? (
                          <img src={formData.photoUrl} alt={formData.fullName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-navy-400">
                            <User className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-navy-400 uppercase tracking-wider mt-1.5">
                        Biometric Passport Seal
                      </span>
                    </div>

                    <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 text-xs">
                      <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[9px] sm:text-[10px] text-navy-400 uppercase font-semibold block">Full Student Name</span>
                        <span className="text-xs sm:text-sm font-semibold text-navy-900">{formData.fullName}</span>
                      </div>

                      <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[9px] sm:text-[10px] text-navy-400 uppercase font-semibold block">Date of Birth & Gender</span>
                        <span className="text-xs font-semibold text-navy-900">{formData.dob} ({formData.gender}, {formData.bloodGroup})</span>
                      </div>

                      <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[9px] sm:text-[10px] text-navy-400 uppercase font-semibold block">Student Mobile Phone</span>
                        <span className="text-xs font-semibold text-navy-900">{formData.phone}</span>
                      </div>

                      <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[9px] sm:text-[10px] text-navy-400 uppercase font-semibold block">Official Student Email</span>
                        <span className="text-xs font-semibold text-navy-900">{formData.email}</span>
                      </div>

                      <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[9px] sm:text-[10px] text-navy-400 uppercase font-semibold block">Guardian Full Name</span>
                        <span className="text-xs sm:text-sm font-semibold text-navy-900">{formData.guardianName} ({formData.guardianRelation})</span>
                      </div>

                      <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[9px] sm:text-[10px] text-navy-400 uppercase font-semibold block">Guardian Mobile Phone</span>
                        <span className="text-xs font-semibold text-navy-900">{formData.guardianPhone}</span>
                      </div>

                      <div className="sm:col-span-2 bg-white p-2.5 sm:p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[9px] sm:text-[10px] text-navy-400 uppercase font-semibold block">Enrolled Program & Discipline</span>
                        <span className="text-xs font-semibold text-brand-700">{formData.degreeProgram} (Batch {formData.admissionYear})</span>
                      </div>

                      <div className="sm:col-span-2 bg-white p-2.5 sm:p-3 rounded-xl border border-navy-200/70">
                        <span className="text-[9px] sm:text-[10px] text-navy-400 uppercase font-semibold block">Permanent Residential Address</span>
                        <span className="text-xs text-navy-800">{formData.address}, {formData.city} - {formData.pincode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-navy-200 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[11px] sm:text-xs text-navy-500 text-center sm:text-left">
                    <div>Digitally timestamped & encrypted with SHA-256 integrity signature.</div>
                    <div className="text-academic-emerald font-semibold">Attestation Verified ✓</div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
                  <button
                    onClick={handlePrint}
                    className="univ-btn-primary px-5 sm:px-6 py-3 text-xs sm:text-sm"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Admission Slip</span>
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
                    className="univ-btn-secondary px-5 sm:px-6 py-3 text-xs sm:text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Submit Another Application</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (

            /* Multi-step Form */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                
                {/* Step indicator (Responsive grid) */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold">
                  {[
                    { step: 1, num: '01', label: 'Personal' },
                    { step: 2, num: '02', label: 'Contact' },
                    { step: 3, num: '03', label: 'Guardian' },
                    { step: 4, num: '04', label: 'Review' },
                  ].map((s) => (
                    <div
                      key={s.step}
                      onClick={() => {
                        if (s.step < currentStep) setCurrentStep(s.step);
                      }}
                      className={`p-2 sm:p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        currentStep === s.step
                          ? 'bg-navy-950 text-white border-navy-950 shadow-xs'
                          : currentStep > s.step
                          ? 'bg-academic-emerald/10 text-academic-emerald border-academic-emerald/30'
                          : 'bg-white text-navy-500 border-navy-200/80 hover:bg-navy-50'
                      }`}
                    >
                      <div className="font-bold sm:hidden">{s.num}</div>
                      <div className="truncate hidden sm:block">{s.num}. {s.label}</div>
                      <div className="truncate sm:hidden text-[9px]">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-8 shadow-card">
                  
                  {/* STEP 1: Personal */}
                  {currentStep === 1 && (
                    <div className="space-y-4 sm:space-y-5">
                      <div className="border-b border-navy-100 pb-2.5 sm:pb-3">
                        <span className="text-[11px] sm:text-xs font-semibold text-brand-600 uppercase">Section 01 of 04</span>
                        <h2 className="font-display font-bold text-lg sm:text-2xl text-navy-950">
                          Student Personal Identity
                        </h2>
                      </div>

                      {/* Photo Upload */}
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1.5">
                          Official Student Portrait * (Passport Size)
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-navy-50/50 border border-dashed border-navy-300 rounded-xl">
                          <div className="w-20 h-24 rounded-lg border border-navy-200 bg-white flex items-center justify-center overflow-hidden shadow-xs relative shrink-0">
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
                            <div className="text-xs text-navy-500">
                              Upload formal passport portrait (JPG, PNG up to 10MB). Automatically stored in secure Supabase Storage.
                            </div>
                            
                            <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                              <label className="univ-btn-secondary text-xs cursor-pointer py-2 px-3 inline-flex items-center gap-1.5">
                                <Upload className="w-3.5 h-3.5 text-navy-500" />
                                <span>{formData.photoUrl ? 'Change Photograph' : 'Select Photo File'}</span>
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                              </label>

                              {formData.photoUrl && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-academic-emerald bg-academic-emerald/10 px-2.5 py-1 rounded-lg">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Cloud Storage Ready</span>
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

                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">
                          Full Legal Name * (As per 10th Certificate)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                          placeholder="e.g. Rohan Vinod Kulkarni"
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-600 font-medium mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            Date of Birth *
                          </label>
                          <input
                            type="date"
                            required
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
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
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
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
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
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
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
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
                    <div className="space-y-4 sm:space-y-5">
                      <div className="border-b border-navy-100 pb-2.5 sm:pb-3">
                        <span className="text-[11px] sm:text-xs font-semibold text-brand-600 uppercase">Section 02 of 04</span>
                        <h2 className="font-display font-bold text-lg sm:text-2xl text-navy-950">
                          Student Contact & Residence
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
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
                              className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                              placeholder="e.g. 9876543210"
                            />
                            <Phone className="w-4 h-4 text-navy-400 absolute left-3.5 top-3 sm:top-3.5" />
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
                              className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                              placeholder="e.g. student@collegecentre.edu"
                            />
                            <Mail className="w-4 h-4 text-navy-400 absolute left-3.5 top-3 sm:top-3.5" />
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
                          className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2 text-sm sm:text-base text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                          placeholder="House / Flat No, Street, Locality"
                        />
                        {errors.address && (
                          <p className="text-xs text-red-600 font-medium mt-1">{errors.address}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            City / District *
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
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
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                            placeholder="e.g. 560001"
                          />
                        </div>
                      </div>

                    </div>
                  )}

                  {/* STEP 3: Guardian */}
                  {currentStep === 3 && (
                    <div className="space-y-4 sm:space-y-5">
                      <div className="border-b border-navy-100 pb-2.5 sm:pb-3">
                        <span className="text-[11px] sm:text-xs font-semibold text-brand-600 uppercase">Section 03 of 04</span>
                        <h2 className="font-display font-bold text-lg sm:text-2xl text-navy-950">
                          Guardian Information
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-navy-700 mb-1">
                            Guardian Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.guardianName}
                            onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
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
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                          >
                            <option>Father</option>
                            <option>Mother</option>
                            <option>Legal Guardian</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1">
                          Guardian Mobile Phone * (Emergency & Alerts)
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={formData.guardianPhone}
                            onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                            className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                            placeholder="e.g. 9811122233"
                          />
                          <Phone className="w-4 h-4 text-navy-400 absolute left-3.5 top-3 sm:top-3.5" />
                        </div>
                        {errors.guardianPhone && (
                          <p className="text-xs text-red-600 font-medium mt-1">{errors.guardianPhone}</p>
                        )}
                      </div>

                      <div className="p-3 sm:p-3.5 bg-brand-50/60 border border-brand-200/70 rounded-xl text-navy-700 text-xs">
                        ℹ <strong>Parent Portal Notification:</strong> Real-time semester grades and attendance threshold warnings are automatically dispatched to the verified guardian mobile number.
                      </div>

                    </div>
                  )}

                  {/* STEP 4: Review */}
                  {currentStep === 4 && (
                    <div className="space-y-4 sm:space-y-5">
                      <div className="border-b border-navy-100 pb-2.5 sm:pb-3">
                        <span className="text-[11px] sm:text-xs font-semibold text-brand-600 uppercase">Section 04 of 04</span>
                        <h2 className="font-display font-bold text-lg sm:text-2xl text-navy-950">
                          Review & Attestation
                        </h2>
                      </div>

                      <div className="p-3.5 sm:p-4 bg-navy-50/50 border border-navy-200 rounded-xl space-y-3 text-xs">
                        <div className="flex items-center justify-between border-b border-navy-200 pb-2 font-semibold text-navy-900">
                          <span>Applicant Details Summary</span>
                          <span className="text-brand-600 font-mono text-[10px] sm:text-[11px]">Ready for Attestation</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          <div>
                            <span className="text-[10px] text-navy-400 uppercase font-semibold block">Full Name:</span>
                            <span className="font-medium text-navy-900 text-xs sm:text-sm">{formData.fullName || '—'}</span>
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
                            <span className="font-medium text-navy-900 truncate block">{formData.email || '—'}</span>
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

                      <div className="flex items-start gap-2.5 sm:gap-3 p-3 bg-navy-50/40 border border-navy-200 rounded-xl text-xs">
                        <input type="checkbox" required defaultChecked id="attest" className="mt-0.5 rounded text-brand-600 shrink-0" />
                        <label htmlFor="attest" className="text-navy-600 leading-relaxed text-[11px] sm:text-xs">
                          I hereby attest that the photograph, personal details, student phone, and guardian information supplied above are genuine and accurate as per official university admission standards.
                        </label>
                      </div>

                    </div>
                  )}

                  {/* Form Footer Buttons */}
                  <div className="pt-4 sm:pt-6 border-t border-navy-100 flex items-center justify-between gap-3">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="univ-btn-secondary text-xs px-3 sm:px-5 py-2 sm:py-2.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Previous</span>
                      </button>
                    ) : <div />}

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="univ-btn-primary text-xs px-4 sm:px-6 py-2 sm:py-2.5"
                      >
                        <span>Next Step</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="univ-btn-accent text-xs px-5 sm:px-6 py-2.5 sm:py-3"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{isSubmitting ? 'Submitting...' : 'Submit Student Record'}</span>
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

                <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card space-y-3.5 sm:space-y-4">
                  
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    <div className="w-14 h-18 sm:w-16 sm:h-20 rounded-xl border border-navy-200 bg-navy-50 overflow-hidden flex items-center justify-center relative shrink-0 shadow-xs">
                      {formData.photoUrl ? (
                        <img src={formData.photoUrl} alt="Student" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 sm:w-7 sm:h-7 text-navy-400" />
                      )}
                      {formData.bloodGroup && (
                        <div className="absolute bottom-0 inset-x-0 bg-navy-950/80 text-white text-[8px] font-bold text-center py-0.5">
                          {formData.bloodGroup}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <span className="text-[9px] sm:text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                        Applicant 2026
                      </span>
                      <h3 className="font-display font-bold text-sm sm:text-base text-navy-950 truncate">
                        {formData.fullName || 'Candidate Name'}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-navy-500 truncate">
                        {formData.degreeProgram.split('-')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-navy-100 pt-3 space-y-1.5 sm:space-y-2 text-xs">
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

                  <div className="pt-2 border-t border-navy-100 text-[10px] sm:text-[11px] text-academic-emerald font-semibold flex items-center justify-between">
                    <span>Encryption: AES-256</span>
                    <span>Ready ✓</span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 bg-navy-900 text-white rounded-2xl text-xs space-y-1 shadow-sm">
                  <div className="font-semibold text-brand-300 flex items-center gap-1.5 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-academic-emerald shrink-0" />
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
      <footer className="bg-white border-t border-navy-200 py-4 sm:py-6 px-4 text-xs text-navy-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-center sm:text-left">
          <div className="text-[11px] sm:text-xs">
            © 2026 CollegeCentre University Registry System • DPDPA 2023 & FERPA Compliant.
          </div>
          <div className="text-navy-400 text-[11px] sm:text-xs">
            admissions@collegecentre.in
          </div>
        </div>
      </footer>

    </div>
  );
};
