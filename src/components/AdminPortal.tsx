import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Download, ArrowLeft, CheckCircle2, 
  Clock, Eye, Trash2, Printer, ShieldCheck, 
  User, Plus, Edit3, Save, X, Sliders,
  ToggleLeft, ToggleRight, Database, RefreshCw,
  Globe, ExternalLink, Copy, Check, Sparkles, Building2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatSubdomainUrl } from '../lib/subdomain';

export interface FormFieldConfig {
  id: string;
  label: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'number';
  placeholder?: string;
  required: boolean;
  options?: string[];
  section: 'personal' | 'contact' | 'guardian';
  sort_order: number;
  enabled: boolean;
}

export interface CampusConfig {
  id: string;
  slug: string;
  name: string;
  code?: string;
  description?: string;
  badge_text?: string;
  banner_color?: string;
  programs?: string[];
  custom_fields?: string[];
  active: boolean;
}

export interface StudentRecord {
  id: string;
  full_name: string;
  dob?: string;
  gender?: string;
  blood_group?: string;
  photo_url?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  pincode?: string;
  guardian_name?: string;
  guardian_relation?: string;
  guardian_phone?: string;
  degree_program?: string;
  admission_year?: string;
  submission_date?: string;
  status: 'Verified' | 'Pending Review' | 'Enrolled';
  campus_slug?: string;
  campus_name?: string;
  custom_fields?: Record<string, any>;
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

const DEFAULT_CAMPUSES: CampusConfig[] = [
  {
    id: 'camp_main',
    slug: 'main',
    name: 'CollegeCentre Central University',
    code: 'CC-MAIN',
    description: 'Central University Admissions & Academic Intake Portal',
    badge_text: 'Main Campus Registry',
    banner_color: '#0c8ee9',
    programs: ['B.Tech - Computer Science & Engineering', 'B.Tech - Artificial Intelligence', 'B.Tech - Electronics & Comm', 'MBBS - Medicine & Surgery', 'B.A. LL.B (Honours)', 'MBA - Business Administration'],
    custom_fields: [],
    active: true
  },
  {
    id: 'camp_eng',
    slug: 'engineering',
    name: 'School of Advanced Engineering & Technology',
    code: 'SET-BLR',
    description: 'Autonomous Department of Computing, Robotics & Electronics',
    badge_text: 'Faculty of Engineering',
    banner_color: '#2563eb',
    programs: ['B.Tech - Computer Science & Engineering', 'B.Tech - AI & Data Science', 'B.Tech - Robotics & Automation', 'M.Tech - Cyber Security'],
    custom_fields: [],
    active: true
  },
  {
    id: 'camp_med',
    slug: 'medical',
    name: 'Institute of Medical Sciences & Research Hospital',
    code: 'IMS-HEALTH',
    description: 'National Board Recognized Medical & Healthcare Admissions',
    badge_text: 'Faculty of Medicine',
    banner_color: '#059669',
    programs: ['MBBS - Medicine & Surgery', 'BDS - Dental Surgery', 'B.Pharm - Pharmacy', 'M.D. - General Medicine'],
    custom_fields: [],
    active: true
  }
];

interface AdminPortalProps {
  onBackToHome: () => void;
  onOpenDataCollection?: (campusSlug?: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToHome, onOpenDataCollection }) => {
  const [activeTab, setActiveTab] = useState<'records' | 'campuses' | 'fields'>('records');
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [fields, setFields] = useState<FormFieldConfig[]>([]);
  const [campuses, setCampuses] = useState<CampusConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCampus, setFilterCampus] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  // Field CRUD State
  const [editingField, setEditingField] = useState<FormFieldConfig | null>(null);
  const [isCreatingField, setIsCreatingField] = useState(false);
  const [optionsInput, setOptionsInput] = useState('');

  // Campus/Subdomain CRUD State
  const [editingCampus, setEditingCampus] = useState<CampusConfig | null>(null);
  const [isCreatingCampus, setIsCreatingCampus] = useState(false);
  const [campusProgramsInput, setCampusProgramsInput] = useState('');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: studentData } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (studentData) {
        setRecords(studentData as StudentRecord[]);
      }

      const { data: fieldData } = await supabase
        .from('form_fields')
        .select('*')
        .order('sort_order', { ascending: true });

      if (fieldData && fieldData.length > 0) {
        setFields(fieldData as FormFieldConfig[]);
      } else {
        setFields(DEFAULT_FIELDS);
      }

      const { data: campusData } = await supabase
        .from('campuses')
        .select('*')
        .order('created_at', { ascending: true });

      if (campusData && campusData.length > 0) {
        setCampuses(campusData as CampusConfig[]);
      } else {
        setCampuses(DEFAULT_CAMPUSES);
      }
    } catch (err) {
      console.error('Error connecting to Supabase database:', err);
      setFields(DEFAULT_FIELDS);
      setCampuses(DEFAULT_CAMPUSES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'Verified' | 'Pending Review' | 'Enrolled') => {
    try {
      await supabase.from('students').update({ status: newStatus }).eq('id', id);
      setRecords(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent({ ...selectedStudent, status: newStatus });
      }
      showToast(`Student status updated to ${newStatus}`);
    } catch (err) {
      console.error('Failed to update status', err);
      showToast('Failed to update status in database', 'error');
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!window.confirm('Confirm permanent deletion of this student application dossier?')) return;
    try {
      const { error } = await supabase.from('students').delete().eq('id', id);
      if (!error) {
        setRecords(prev => prev.filter(r => r.id !== id));
        if (selectedStudent && selectedStudent.id === id) setSelectedStudent(null);
        showToast('Student record deleted from database');
      } else {
        showToast('Error deleting student: ' + error.message, 'error');
      }
    } catch (err) {
      console.error('Failed to delete student', err);
    }
  };

  // --- CAMPUS CRUD OPERATIONS ---
  const handleSaveCampus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampus) return;

    const parsedPrograms = campusProgramsInput.split('\n').map(s => s.trim()).filter(Boolean);
    const cleanSlug = editingCampus.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '');

    if (!cleanSlug) {
      showToast('Please enter a valid subdomain slug (e.g. medical, engineering)', 'error');
      return;
    }

    const campusToSave: CampusConfig = {
      ...editingCampus,
      slug: cleanSlug,
      programs: parsedPrograms.length > 0 ? parsedPrograms : (editingCampus.programs || []),
    };

    try {
      const { error } = await supabase
        .from('campuses')
        .upsert(campusToSave, { onConflict: 'id' });

      if (!error) {
        showToast(`Subdomain portal "${cleanSlug}.collegecentre.in" saved successfully!`);
        await fetchData();
        setEditingCampus(null);
        setIsCreatingCampus(false);
      } else {
        console.error('Supabase save error:', error);
        showToast(`Saved locally: ${error.message}`, 'error');
        if (isCreatingCampus) {
          setCampuses(prev => [...prev.filter(c => c.id !== campusToSave.id), campusToSave]);
        } else {
          setCampuses(prev => prev.map(c => c.id === campusToSave.id ? campusToSave : c));
        }
        setEditingCampus(null);
        setIsCreatingCampus(false);
      }
    } catch (err: any) {
      console.error('Error saving campus:', err);
      showToast('Error saving campus: ' + (err.message || 'Unknown error'), 'error');
    }
  };

  const handleToggleCampus = async (campus: CampusConfig) => {
    const updated = { ...campus, active: !campus.active };
    try {
      const { error } = await supabase.from('campuses').update({ active: updated.active }).eq('id', campus.id);
      if (!error) {
        setCampuses(prev => prev.map(c => c.id === campus.id ? updated : c));
        showToast(`Subdomain ${campus.slug} is now ${updated.active ? 'Active' : 'Disabled'}`);
      } else {
        setCampuses(prev => prev.map(c => c.id === campus.id ? updated : c));
      }
    } catch {
      setCampuses(prev => prev.map(c => c.id === campus.id ? updated : c));
    }
  };

  const handleDeleteCampus = async (id: string) => {
    if (!window.confirm('Delete this custom subdomain portal? Any dedicated forms under this subdomain will be disabled.')) return;
    try {
      const { error } = await supabase.from('campuses').delete().eq('id', id);
      if (!error) {
        setCampuses(prev => prev.filter(c => c.id !== id));
        showToast('Subdomain portal deleted from database');
      } else {
        showToast('Error deleting subdomain: ' + error.message, 'error');
      }
    } catch (err: any) {
      showToast('Error deleting subdomain: ' + err.message, 'error');
    }
  };

  const handleCopyLink = (slugOrUrl: string) => {
    const copyText = slugOrUrl.startsWith('http') ? slugOrUrl : `${window.location.origin}/?campus=${slugOrUrl}`;
    navigator.clipboard.writeText(copyText);
    setCopiedSlug(slugOrUrl);
    showToast('Subdomain URL copied to clipboard!');
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const handleSaveField = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingField) return;

    let parsedOptions: string[] = [];
    if (editingField.type === 'select') {
      parsedOptions = optionsInput.split(',').map(s => s.trim()).filter(Boolean);
    }

    const cleanKey = editingField.name.trim() || editingField.label.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    const fieldToSave: FormFieldConfig = {
      ...editingField,
      name: cleanKey,
      options: parsedOptions,
      sort_order: Number(editingField.sort_order) || fields.length + 1,
    };

    try {
      const { error } = await supabase
        .from('form_fields')
        .upsert(fieldToSave, { onConflict: 'id' });

      if (!error) {
        showToast(`Form field "${fieldToSave.label}" saved successfully!`);
        await fetchData();
        setEditingField(null);
        setIsCreatingField(false);
      } else {
        console.error('Supabase save error:', error);
        showToast(`Saved field locally: ${error.message}`, 'error');
        if (isCreatingField) {
          setFields(prev => [...prev.filter(f => f.id !== fieldToSave.id), fieldToSave]);
        } else {
          setFields(prev => prev.map(f => f.id === fieldToSave.id ? fieldToSave : f));
        }
        setEditingField(null);
        setIsCreatingField(false);
      }
    } catch (err: any) {
      console.error('Error saving field:', err);
      showToast('Error saving field: ' + (err.message || 'Unknown error'), 'error');
    }
  };

  const handleToggleField = async (field: FormFieldConfig) => {
    const updated = { ...field, enabled: !field.enabled };
    try {
      const { error } = await supabase.from('form_fields').update({ enabled: updated.enabled }).eq('id', field.id);
      if (!error) {
        setFields(prev => prev.map(f => f.id === field.id ? updated : f));
        showToast(`Field "${field.label}" is now ${updated.enabled ? 'Active' : 'Disabled'}`);
      } else {
        setFields(prev => prev.map(f => f.id === field.id ? updated : f));
      }
    } catch {
      setFields(prev => prev.map(f => f.id === field.id ? updated : f));
    }
  };

  const handleDeleteField = async (id: string) => {
    if (!window.confirm('Delete this form field? Submissions will no longer include this field.')) return;
    try {
      const { error } = await supabase.from('form_fields').delete().eq('id', id);
      if (!error) {
        setFields(prev => prev.filter(f => f.id !== id));
        showToast(`Field deleted from database`);
      } else {
        showToast('Error deleting field: ' + error.message, 'error');
      }
    } catch (err: any) {
      showToast('Error deleting field: ' + err.message, 'error');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Ref ID', 'Full Name', 'DOB', 'Gender', 'Blood Group', 'Phone', 'Email', 'Guardian', 'Guardian Phone', 'Program', 'City', 'Submission Date', 'Status'];
    const rows = records.map(r => [
      r.id,
      `"${r.full_name}"`,
      r.dob || '',
      r.gender || '',
      r.blood_group || '',
      r.phone || '',
      r.email || '',
      `"${r.guardian_name || ''} (${r.guardian_relation || ''})"`,
      r.guardian_phone || '',
      `"${r.degree_program || ''}"`,
      r.city || '',
      `"${r.submission_date || ''}"`,
      r.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `CollegeCentre_Records_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = records.filter(r => {
    const matchesQuery = 
      (r.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.phone || '').includes(searchQuery) ||
      (r.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    const matchesCampus = filterCampus === 'All' || r.campus_slug === filterCampus || (!r.campus_slug && filterCampus === 'main');
    return matchesQuery && matchesStatus && matchesCampus;
  });

  return (
    <div className="min-h-screen bg-navy-50/40 text-navy-900 flex flex-col font-sans selection:bg-brand-600 selection:text-white">
      
      {/* Top Private Admin Bar */}
      <header className="bg-navy-950 text-white border-b border-navy-800 py-3.5 px-4 sm:px-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base sm:text-lg text-white leading-none">
                  CollegeCentre Console
                </span>
                <span className="bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[10px] px-2 py-0.5 rounded font-mono uppercase">
                  Multi-Campus DB
                </span>
              </div>
              <span className="text-[11px] text-navy-400 font-normal">
                Private Registrar & Multi-Subdomain System Administration
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-navy-300 hover:text-white flex items-center gap-1.5 bg-navy-900 hover:bg-navy-800 px-3 py-2 rounded-xl border border-navy-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit Console</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className={`px-4 py-3 rounded-xl shadow-modal text-xs font-semibold flex items-center gap-2 border ${
            toastMessage.type === 'error'
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-navy-900 text-white border-navy-700'
          }`}>
            {toastMessage.type === 'error' ? (
              <X className="w-4 h-4 text-red-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-academic-emerald" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Tabs Navigation */}
      <div className="bg-white border-b border-navy-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2 pt-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('records')}
              className={`px-3 sm:px-4 py-3 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'records'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-navy-500 hover:text-navy-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Student Dossiers ({records.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('campuses')}
              className={`px-3 sm:px-4 py-3 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'campuses'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-navy-500 hover:text-navy-900'
              }`}
            >
              <Globe className="w-4 h-4 text-brand-500" />
              <span>Subdomains & Campus Portals ({campuses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('fields')}
              className={`px-3 sm:px-4 py-3 font-semibold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'fields'
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-navy-500 hover:text-navy-900'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Form Field Schema ({fields.length})</span>
            </button>
          </div>

          <button
            onClick={fetchData}
            disabled={loading}
            className="text-xs text-navy-500 hover:text-navy-900 flex items-center gap-1 p-2 rounded-lg hover:bg-navy-50 shrink-0"
            title="Refresh database records"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>
        </div>
      </div>

      <main className="flex-grow py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* TAB 1: STUDENT RECORDS */}
          {activeTab === 'records' && (
            <div className="space-y-6">
              
              {/* Summary Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
                  <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                    <span>Database Records</span>
                    <Database className="w-4 h-4 text-brand-600" />
                  </div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                    {records.length}
                  </div>
                  <div className="text-[11px] text-academic-emerald font-medium mt-1">
                    Live Supabase Sync
                  </div>
                </div>

                <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
                  <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                    <span>Verified Admissions</span>
                    <CheckCircle2 className="w-4 h-4 text-academic-emerald" />
                  </div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                    {records.filter(r => r.status === 'Verified').length}
                  </div>
                  <div className="text-[11px] text-navy-400 font-medium mt-1">
                    Active matriculation
                  </div>
                </div>

                <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
                  <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                    <span>Pending Intake</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                    {records.filter(r => r.status === 'Pending Review').length}
                  </div>
                  <div className="text-[11px] text-amber-600 font-medium mt-1">
                    Requires document approval
                  </div>
                </div>

                <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
                  <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                    <span>Form Fields Active</span>
                    <Sliders className="w-4 h-4 text-brand-600" />
                  </div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                    {fields.filter(f => f.enabled).length} Fields
                  </div>
                  <div className="text-[11px] text-brand-600 font-medium mt-1">
                    Configurable by admin
                  </div>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="bg-white border border-navy-200/80 rounded-2xl p-4 shadow-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by student name, ID, phone, email..."
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                  <Search className="w-4 h-4 text-navy-400 absolute left-3.5 top-3 sm:top-3.5" />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={filterCampus}
                    onChange={(e) => setFilterCampus(e.target.value)}
                    className="bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs text-navy-800 font-medium"
                  >
                    <option value="All">All Campuses / Subdomains</option>
                    {campuses.map(c => (
                      <option key={c.id} value={c.slug}>{c.name} ({c.slug})</option>
                    ))}
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs text-navy-800 font-medium"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Verified">Verified</option>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Pending Review">Pending Review</option>
                  </select>

                  <button
                    onClick={handleExportCSV}
                    className="univ-btn-secondary text-xs px-3.5 py-2 shrink-0 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-brand-600" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Student Table */}
              <div className="bg-white border border-navy-200/80 rounded-2xl shadow-card overflow-hidden">
                {filteredRecords.length === 0 ? (
                  <div className="text-center py-16 px-4 space-y-3">
                    <Users className="w-10 h-10 text-navy-400 mx-auto" />
                    <h3 className="font-semibold text-base text-navy-900">No Student Records Found</h3>
                    <p className="text-xs text-navy-500 max-w-sm mx-auto">
                      No applications currently match your filters or database is empty.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Mobile Card List (Visible on Phone Screens) */}
                    <div className="block sm:hidden divide-y divide-navy-100">
                      {filteredRecords.map((r) => (
                        <div 
                          key={r.id} 
                          onClick={() => setSelectedStudent(r)}
                          className="p-4 space-y-3 hover:bg-navy-50/50 transition-colors active:bg-navy-100/50 cursor-pointer"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-14 rounded-xl border border-navy-200 bg-navy-50 overflow-hidden shrink-0 shadow-xs">
                                {r.photo_url ? (
                                  <img src={r.photo_url} alt={r.full_name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-navy-400">
                                    <User className="w-6 h-6" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-sm text-navy-950">{r.full_name}</div>
                                <div className="font-mono text-[10px] text-brand-600 font-bold">{r.id}</div>
                                <div className="text-[11px] text-navy-500 mt-0.5">{r.degree_program}</div>
                              </div>
                            </div>

                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                              r.status === 'Verified' ? 'bg-academic-emerald/10 text-academic-emerald' : 'bg-brand-50 text-brand-700'
                            }`}>
                              {r.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] bg-navy-50/70 p-2.5 rounded-xl text-navy-600">
                            <div>
                              <span className="text-[9px] text-navy-400 font-semibold block uppercase">Campus</span>
                              <span className="font-medium truncate block">{r.campus_slug ? `${r.campus_slug}.collegecentre.in` : 'Main Campus'}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-navy-400 font-semibold block uppercase">Phone</span>
                              <span className="font-medium truncate block">{r.phone || '—'}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setSelectedStudent(r)}
                              className="univ-btn-secondary text-xs px-3 py-1.5 flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5 text-brand-600" />
                              <span>View Dossier</span>
                            </button>

                            <button
                              onClick={() => handleDeleteStudent(r.id)}
                              className="text-xs text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Table View (Visible on Tablet and Desktop) */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-navy-50/70 border-b border-navy-200 text-navy-600 font-semibold uppercase text-[10px]">
                          <tr>
                            <th className="py-3 px-4">Student Scholar</th>
                            <th className="py-3 px-4">DOB / Gender</th>
                            <th className="py-3 px-4">Direct Contact</th>
                            <th className="py-3 px-4">Guardian Contact</th>
                            <th className="py-3 px-4">Program & Campus</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-navy-100">
                          {filteredRecords.map((r) => (
                            <tr key={r.id} className="hover:bg-navy-50/50 transition-colors cursor-pointer" onClick={() => setSelectedStudent(r)}>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-11 rounded-lg border border-navy-200 bg-navy-50 overflow-hidden shrink-0">
                                    {r.photo_url ? (
                                      <img src={r.photo_url} alt={r.full_name} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-navy-400">
                                        <User className="w-5 h-5" />
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-sm text-navy-950">{r.full_name}</div>
                                    <div className="font-mono text-[10px] text-brand-600 font-bold">{r.id}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 text-navy-600">
                                <div className="font-medium text-navy-900">{r.dob || '—'}</div>
                                <div className="text-[11px] text-navy-500">{r.gender || '—'} • {r.blood_group || '—'}</div>
                              </td>
                              <td className="py-3.5 px-4 text-navy-600">
                                <div className="font-medium text-navy-900">{r.phone || '—'}</div>
                                <div className="text-[11px] text-navy-500 truncate max-w-[160px]">{r.email || '—'}</div>
                              </td>
                              <td className="py-3.5 px-4 text-navy-600">
                                <div className="font-medium text-navy-900">{r.guardian_name || '—'}</div>
                                <div className="text-[11px] text-navy-500">{r.guardian_relation || 'Guardian'} • {r.guardian_phone || '—'}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-medium text-navy-900 truncate max-w-[180px]">{r.degree_program || '—'}</div>
                                <div className="text-[10px] text-brand-700 font-semibold font-mono">
                                  {r.campus_slug ? `${r.campus_slug}.collegecentre.in` : 'Main Campus'}
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  r.status === 'Verified' ? 'bg-academic-emerald/10 text-academic-emerald' : 'bg-brand-50 text-brand-700'
                                }`}>
                                  {r.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => setSelectedStudent(r)}
                                    className="p-1.5 rounded-lg text-navy-500 hover:text-brand-600 hover:bg-navy-100"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteStudent(r.id)}
                                    className="p-1.5 rounded-lg text-navy-400 hover:text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: SUBDOMAINS & CAMPUS PORTALS (CRUD) */}
          {activeTab === 'campuses' && (
            <div className="space-y-6">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
                  <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                    <span>Total Portals</span>
                    <Globe className="w-4 h-4 text-brand-600" />
                  </div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                    {campuses.length}
                  </div>
                  <div className="text-[11px] text-academic-emerald font-medium mt-1">
                    Multi-tenant enabled
                  </div>
                </div>

                <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
                  <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                    <span>Active Subdomains</span>
                    <CheckCircle2 className="w-4 h-4 text-academic-emerald" />
                  </div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                    {campuses.filter(c => c.active).length} Active
                  </div>
                  <div className="text-[11px] text-navy-400 font-medium mt-1">
                    Accepting applications
                  </div>
                </div>

                <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
                  <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                    <span>Registered Scholars</span>
                    <Users className="w-4 h-4 text-brand-600" />
                  </div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                    {records.length}
                  </div>
                  <div className="text-[11px] text-brand-600 font-medium mt-1">
                    Across all subdomains
                  </div>
                </div>

                <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
                  <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                    <span>Form Engine</span>
                    <Sliders className="w-4 h-4 text-brand-600" />
                  </div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                    Dynamic
                  </div>
                  <div className="text-[11px] text-academic-emerald font-medium mt-1">
                    Live Supabase Sync
                  </div>
                </div>
              </div>

              {/* Subdomain Header & Create Button */}
              <div className="bg-white border border-navy-200/80 rounded-2xl p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-navy-950 flex items-center gap-2">
                    <span>Custom Subdomains & Campus Portals</span>
                    <span className="bg-brand-50 text-brand-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                      Multi-Tenant
                    </span>
                  </h3>
                  <p className="text-xs text-navy-500 mt-0.5">
                    Deploy dedicated, custom-branded admission portals for campuses, faculties, colleges, or departments.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newId = 'camp_' + Math.floor(1000 + Math.random() * 9000);
                    setEditingCampus({
                      id: newId,
                      slug: '',
                      name: '',
                      code: '',
                      description: '',
                      badge_text: 'Admissions Office',
                      banner_color: '#0c8ee9',
                      programs: ['B.Tech - Computer Science', 'B.Tech - Electronics', 'B.A. - Economics'],
                      custom_fields: [],
                      active: true
                    });
                    setIsCreatingCampus(true);
                    setCampusProgramsInput('B.Tech - Computer Science\nB.Tech - Electronics\nB.A. - Economics');
                  }}
                  className="univ-btn-primary text-xs px-4 py-2.5 flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Subdomain Portal</span>
                </button>
              </div>

              {/* Subdomain DNS Helper Notice */}
              <div className="bg-brand-50/70 border border-brand-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-navy-950 block">
                      Production Wildcard Subdomain DNS Routing
                    </span>
                    <span className="text-navy-600 leading-relaxed block mt-0.5">
                      All subdomains (<strong className="font-mono text-brand-800">*.collegecentre.in</strong>) resolve dynamically to their dedicated campus forms.
                      Add wildcard domain <code className="bg-brand-100/80 text-brand-900 px-1 py-0.2 rounded font-mono">*.collegecentre.in</code> in Vercel & DNS CNAME for direct resolution.
                    </span>
                  </div>
                </div>
              </div>

              {/* Campuses & Subdomains List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campuses.map((campus) => {
                  const campusRecordsCount = records.filter(r => r.campus_slug === campus.slug || (!r.campus_slug && campus.slug === 'main')).length;
                  const urls = formatSubdomainUrl(campus.slug);

                  return (
                    <div 
                      key={campus.id} 
                      className={`bg-white border rounded-2xl p-5 shadow-card flex flex-col justify-between transition-all hover:shadow-modal ${
                        campus.active ? 'border-navy-200/90' : 'border-navy-200/50 opacity-75'
                      }`}
                    >
                      <div className="space-y-3.5">
                        
                        {/* Top Bar with Badge and Status */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-3 h-3 rounded-full shrink-0 shadow-xs" 
                              style={{ backgroundColor: campus.banner_color || '#0c8ee9' }}
                            />
                            <span className="text-[10px] font-mono font-bold uppercase bg-navy-100 text-navy-700 px-2 py-0.5 rounded">
                              {campus.code || campus.slug.toUpperCase()}
                            </span>
                            {campus.badge_text && (
                              <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                                {campus.badge_text}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleToggleCampus(campus)}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              campus.active ? 'bg-academic-emerald/10 text-academic-emerald' : 'bg-navy-100 text-navy-400'
                            }`}
                            title="Toggle active status"
                          >
                            {campus.active ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                            <span>{campus.active ? 'Active' : 'Disabled'}</span>
                          </button>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h4 className="font-display font-bold text-base text-navy-950 leading-snug">
                            {campus.name}
                          </h4>
                          <p className="text-xs text-navy-500 line-clamp-2 mt-1">
                            {campus.description || 'Dedicated campus admission and student data collection portal.'}
                          </p>
                        </div>

                        {/* Subdomain URLs box */}
                        <div className="bg-navy-50/70 border border-navy-200/70 rounded-xl p-2.5 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between text-[11px] text-navy-600">
                            <span className="font-medium flex items-center gap-1">
                              <Globe className="w-3.5 h-3.5 text-brand-600" />
                              <span className="font-mono text-navy-900 font-bold">{campus.slug}.collegecentre.in</span>
                            </span>
                            <button
                              onClick={() => handleCopyLink(urls.subdomainUrl)}
                              className="text-[10px] text-brand-600 hover:text-brand-800 font-semibold flex items-center gap-0.5 bg-white px-2 py-0.5 rounded border border-navy-200"
                              title="Copy URL"
                            >
                              {copiedSlug === urls.subdomainUrl ? <Check className="w-3 h-3 text-academic-emerald" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedSlug === urls.subdomainUrl ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>

                          <div className="text-[10px] text-navy-400 font-mono truncate">
                            URL: {urls.subdomainUrl}
                          </div>
                        </div>

                        {/* Programs Offered */}
                        <div className="text-xs text-navy-600">
                          <span className="text-[11px] font-semibold text-navy-800 block mb-1">
                            Offered Academic Programs ({(campus.programs || []).length}):
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {(campus.programs || []).slice(0, 3).map((prog, i) => (
                              <span key={i} className="text-[10px] bg-white border border-navy-200 text-navy-700 px-2 py-0.5 rounded truncate max-w-[200px]">
                                {prog}
                              </span>
                            ))}
                            {(campus.programs || []).length > 3 && (
                              <span className="text-[10px] bg-navy-100 text-navy-600 px-1.5 py-0.5 rounded">
                                +{(campus.programs || []).length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stats Strip */}
                        <div className="pt-2 border-t border-navy-100 flex items-center justify-between text-xs text-navy-500">
                          <span>Submissions: <strong className="text-navy-900">{campusRecordsCount}</strong></span>
                          <span>Schema: <strong className="text-brand-600">Form Active</strong></span>
                        </div>

                      </div>

                      {/* Bottom Action CTAs */}
                      <div className="pt-4 mt-3 border-t border-navy-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            if (onOpenDataCollection) onOpenDataCollection(campus.slug);
                            else window.open(`/?campus=${campus.slug}`, '_blank');
                          }}
                          className="univ-btn-primary text-xs px-3 py-1.5 flex-1 flex items-center justify-center gap-1"
                          title="Open and preview the custom branded student form for this campus"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Open Form</span>
                        </button>

                        <button
                          onClick={() => {
                            setEditingCampus(campus);
                            setIsCreatingCampus(false);
                            setCampusProgramsInput((campus.programs || []).join('\n'));
                          }}
                          className="p-2 rounded-lg text-navy-600 hover:text-brand-600 hover:bg-navy-100 border border-navy-200"
                          title="Edit Subdomain Configuration"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {campus.slug !== 'main' && (
                          <button
                            onClick={() => handleDeleteCampus(campus.id)}
                            className="p-2 rounded-lg text-navy-400 hover:text-red-600 hover:bg-red-50 border border-navy-200"
                            title="Delete Subdomain"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 3: DYNAMIC FORM FIELD BUILDER (CRUD) */}
          {activeTab === 'fields' && (
            <div className="space-y-6">
              
              <div className="bg-white border border-navy-200/80 rounded-2xl p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-navy-950">
                    Form Schema & Dynamic Field Configuration
                  </h3>
                  <p className="text-xs text-navy-500 mt-0.5">
                    Create, edit, toggle, or delete fields rendered in the public Student Admission Portal.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newId = 'field_' + Math.floor(1000 + Math.random() * 9000);
                    setEditingField({
                      id: newId,
                      label: '',
                      name: '',
                      type: 'text',
                      placeholder: '',
                      required: true,
                      options: [],
                      section: 'personal',
                      sort_order: fields.length + 1,
                      enabled: true,
                    });
                    setIsCreatingField(true);
                    setOptionsInput('');
                  }}
                  className="univ-btn-primary text-xs px-4 py-2.5 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Form Field</span>
                </button>
              </div>

              {/* Form Fields List */}
              <div className="bg-white border border-navy-200/80 rounded-2xl shadow-card overflow-hidden divide-y divide-navy-100">
                {fields.map((f, idx) => (
                  <div key={f.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-navy-50/50 transition-colors">
                    
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-navy-100 text-navy-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-bold text-sm text-navy-950">{f.label}</span>
                          <span className="bg-navy-100 text-navy-600 font-mono text-[10px] px-2 py-0.5 rounded">
                            {f.name}
                          </span>
                          <span className="bg-brand-50 text-brand-700 text-[10px] font-semibold px-2 py-0.5 rounded uppercase">
                            {f.type}
                          </span>
                          {f.required ? (
                            <span className="text-red-600 text-[10px] font-bold">*Required</span>
                          ) : (
                            <span className="text-navy-400 text-[10px]">Optional</span>
                          )}
                        </div>

                        <div className="text-xs text-navy-500 flex items-center gap-2">
                          <span>Section: <strong className="text-navy-700 capitalize">{f.section}</strong></span>
                          {f.placeholder && <span>• Placeholder: "{f.placeholder}"</span>}
                          {f.options && f.options.length > 0 && (
                            <span>• {f.options.length} Dropdown Options</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleToggleField(f)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors ${
                          f.enabled ? 'bg-academic-emerald/10 text-academic-emerald' : 'bg-navy-100 text-navy-400'
                        }`}
                        title="Toggle visibility"
                      >
                        {f.enabled ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        <span>{f.enabled ? 'Active' : 'Disabled'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingField(f);
                          setIsCreatingField(false);
                          setOptionsInput((f.options || []).join(', '));
                        }}
                        className="p-1.5 rounded-lg text-navy-600 hover:text-brand-600 hover:bg-navy-100"
                        title="Edit Field"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteField(f.id)}
                        className="p-1.5 rounded-lg text-navy-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete Field"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Field Create/Edit Modal (CRUD) */}
      {editingField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-navy-200 rounded-2xl shadow-modal max-w-lg w-full p-6 relative">
            <div className="flex items-center justify-between border-b border-navy-100 pb-3 mb-4">
              <h3 className="font-display font-bold text-lg text-navy-950">
                {isCreatingField ? 'Create New Form Field' : `Edit Field: ${editingField.label}`}
              </h3>
              <button onClick={() => setEditingField(null)} className="p-1 rounded-lg text-navy-400 hover:text-navy-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveField} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Field Display Label *
                </label>
                <input
                  type="text"
                  required
                  value={editingField.label}
                  onChange={(e) => {
                    const val = e.target.value;
                    const autoKey = val.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
                    setEditingField({
                      ...editingField,
                      label: val,
                      name: isCreatingField ? autoKey : editingField.name
                    });
                  }}
                  className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-sm text-navy-900"
                  placeholder="e.g. Previous School / College"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Field Key Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingField.name}
                    onChange={(e) => setEditingField({ ...editingField, name: e.target.value })}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs font-mono text-navy-900"
                    placeholder="e.g. previousSchool"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Input Type *
                  </label>
                  <select
                    value={editingField.type}
                    onChange={(e) => setEditingField({ ...editingField, type: e.target.value as any })}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs text-navy-900"
                  >
                    <option value="text">Text Input</option>
                    <option value="email">Email Input</option>
                    <option value="tel">Phone / Tel</option>
                    <option value="number">Number</option>
                    <option value="date">Date Picker</option>
                    <option value="select">Dropdown Select</option>
                    <option value="textarea">Multi-line Textarea</option>
                  </select>
                </div>
              </div>

              {editingField.type === 'select' && (
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Dropdown Options (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={optionsInput}
                    onChange={(e) => setOptionsInput(e.target.value)}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs text-navy-900"
                    placeholder="Option 1, Option 2, Option 3"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Form Section
                  </label>
                  <select
                    value={editingField.section}
                    onChange={(e) => setEditingField({ ...editingField, section: e.target.value as any })}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs text-navy-900"
                  >
                    <option value="personal">01. Personal</option>
                    <option value="contact">02. Contact</option>
                    <option value="guardian">03. Guardian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingField.sort_order}
                    onChange={(e) => setEditingField({ ...editingField, sort_order: Number(e.target.value) })}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs text-navy-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Placeholder Text
                </label>
                <input
                  type="text"
                  value={editingField.placeholder || ''}
                  onChange={(e) => setEditingField({ ...editingField, placeholder: e.target.value })}
                  className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs text-navy-900"
                  placeholder="e.g. Enter details..."
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="req_toggle"
                  checked={editingField.required}
                  onChange={(e) => setEditingField({ ...editingField, required: e.target.checked })}
                  className="rounded text-brand-600"
                />
                <label htmlFor="req_toggle" className="text-xs font-medium text-navy-800">
                  Required field (Student must fill this before submitting)
                </label>
              </div>

              <div className="pt-3 border-t border-navy-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingField(null)}
                  className="univ-btn-secondary text-xs px-3 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="univ-btn-primary text-xs px-4 py-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Field to Schema</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Campus / Subdomain Create/Edit Modal (CRUD) */}
      {editingCampus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-navy-200 rounded-2xl shadow-modal max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-navy-100 pb-3">
              <div>
                <h3 className="font-display font-bold text-lg text-navy-950">
                  {isCreatingCampus ? 'Create Custom Subdomain Portal' : `Edit Subdomain: ${editingCampus.slug}`}
                </h3>
                <p className="text-xs text-navy-500">Configure dedicated portal & application intake</p>
              </div>
              <button onClick={() => setEditingCampus(null)} className="p-1 rounded-lg text-navy-400 hover:text-navy-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCampus} className="space-y-4">
              
              {/* Subdomain Slug */}
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Custom Subdomain Slug *
                </label>
                <div className="flex items-center">
                  <span className="bg-navy-100 text-navy-600 px-3 py-2 border border-r-0 border-navy-200 rounded-l-xl text-xs font-mono">
                    https://
                  </span>
                  <input
                    type="text"
                    required
                    value={editingCampus.slug}
                    onChange={(e) => {
                      const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                      setEditingCampus({ ...editingCampus, slug: val });
                    }}
                    className="flex-1 bg-white border border-navy-200 px-3 py-2 text-xs font-mono text-brand-700 font-bold focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="e.g. medical or engineering"
                  />
                  <span className="bg-navy-100 text-navy-600 px-3 py-2 border border-l-0 border-navy-200 rounded-r-xl text-xs font-mono">
                    .collegecentre.in
                  </span>
                </div>
                <span className="text-[11px] text-navy-400 mt-1 block">
                  Accessible as <strong className="font-mono text-navy-700">{editingCampus.slug || 'slug'}.collegecentre.in</strong> and <strong className="font-mono text-navy-700">collegecentre.in/?campus={editingCampus.slug || 'slug'}</strong>
                </span>
              </div>

              {/* Campus Full Name */}
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Campus / Institution Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCampus.name}
                  onChange={(e) => setEditingCampus({ ...editingCampus, name: e.target.value })}
                  className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-sm text-navy-900"
                  placeholder="e.g. School of Medical Sciences & Health Hospital"
                />
              </div>

              {/* Code and Badge */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Institutional Code
                  </label>
                  <input
                    type="text"
                    value={editingCampus.code || ''}
                    onChange={(e) => setEditingCampus({ ...editingCampus, code: e.target.value.toUpperCase() })}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs font-mono uppercase text-navy-900"
                    placeholder="e.g. IMS-HEALTH"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Badge / Department Text
                  </label>
                  <input
                    type="text"
                    value={editingCampus.badge_text || ''}
                    onChange={(e) => setEditingCampus({ ...editingCampus, badge_text: e.target.value })}
                    className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs text-navy-900"
                    placeholder="e.g. Faculty of Medicine"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Portal Subtitle / Description
                </label>
                <input
                  type="text"
                  value={editingCampus.description || ''}
                  onChange={(e) => setEditingCampus({ ...editingCampus, description: e.target.value })}
                  className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs text-navy-900"
                  placeholder="e.g. National Board Accredited Admissions & Intake"
                />
              </div>

              {/* Theme Accent Color */}
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Portal Accent Theme Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editingCampus.banner_color || '#0c8ee9'}
                    onChange={(e) => setEditingCampus({ ...editingCampus, banner_color: e.target.value })}
                    className="w-9 h-9 rounded-xl border border-navy-200 p-0.5 cursor-pointer bg-white"
                  />
                  <input
                    type="text"
                    value={editingCampus.banner_color || '#0c8ee9'}
                    onChange={(e) => setEditingCampus({ ...editingCampus, banner_color: e.target.value })}
                    className="w-28 bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs font-mono text-navy-900"
                  />
                </div>
              </div>

              {/* Offered Programs */}
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Offered Degree Programs (One per line) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={campusProgramsInput}
                  onChange={(e) => setCampusProgramsInput(e.target.value)}
                  className="w-full bg-navy-50/50 border border-navy-200 rounded-xl p-3 text-xs text-navy-900 font-mono leading-relaxed"
                  placeholder="B.Tech - Computer Science&#10;B.Tech - Electronics&#10;B.A. - Economics"
                />
                <span className="text-[11px] text-navy-400">
                  These academic programs will appear in the degree discipline dropdown for this specific subdomain.
                </span>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="campus_active_toggle"
                  checked={editingCampus.active}
                  onChange={(e) => setEditingCampus({ ...editingCampus, active: e.target.checked })}
                  className="rounded text-brand-600"
                />
                <label htmlFor="campus_active_toggle" className="text-xs font-medium text-navy-800">
                  Enable this custom subdomain portal for live student submissions
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-navy-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCampus(null)}
                  className="univ-btn-secondary text-xs px-3.5 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="univ-btn-primary text-xs px-4 py-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Subdomain Portal</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Student Dossier Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-navy-200 rounded-2xl shadow-modal max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-navy-100 pb-3">
              <div>
                <h3 className="font-display font-bold text-lg text-navy-950">Official Student Dossier</h3>
                <span className="text-xs text-navy-500 font-mono">Ref ID: {selectedStudent.id}</span>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="p-1 rounded-lg text-navy-400 hover:text-navy-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-navy-50/50 rounded-2xl border border-navy-200">
              <div className="w-20 h-24 rounded-xl border border-navy-200 bg-white overflow-hidden shrink-0">
                {selectedStudent.photo_url ? (
                  <img src={selectedStudent.photo_url} alt={selectedStudent.full_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-navy-400">
                    <User className="w-7 h-7" />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-xl text-navy-950">{selectedStudent.full_name}</h4>
                <p className="text-xs font-semibold text-brand-700">{selectedStudent.degree_program}</p>
                <p className="text-xs text-navy-500">
                  Campus: <strong>{selectedStudent.campus_name || selectedStudent.campus_slug || 'Main Campus'}</strong> • Status: <strong>{selectedStudent.status}</strong>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-white border border-navy-200 rounded-xl">
                <span className="text-[10px] text-navy-400 uppercase font-semibold block">DOB / Blood Group</span>
                <span className="text-navy-900 font-medium">{selectedStudent.dob || '—'} ({selectedStudent.blood_group || '—'})</span>
              </div>
              <div className="p-2.5 bg-white border border-navy-200 rounded-xl">
                <span className="text-[10px] text-navy-400 uppercase font-semibold block">Contact Phone & Email</span>
                <span className="text-navy-900 font-medium">{selectedStudent.phone || '—'} • {selectedStudent.email || '—'}</span>
              </div>
              <div className="p-2.5 bg-white border border-navy-200 rounded-xl">
                <span className="text-[10px] text-navy-400 uppercase font-semibold block">Guardian</span>
                <span className="text-navy-900 font-medium">{selectedStudent.guardian_name || '—'} ({selectedStudent.guardian_relation || '—'})</span>
              </div>
              <div className="p-2.5 bg-white border border-navy-200 rounded-xl">
                <span className="text-[10px] text-navy-400 uppercase font-semibold block">Guardian Phone</span>
                <span className="text-navy-900 font-medium">{selectedStudent.guardian_phone || '—'}</span>
              </div>
              <div className="col-span-2 p-2.5 bg-white border border-navy-200 rounded-xl">
                <span className="text-[10px] text-navy-400 uppercase font-semibold block">Permanent Address</span>
                <span className="text-navy-900 font-medium">{selectedStudent.address || '—'}, {selectedStudent.city || '—'} - {selectedStudent.pincode || '—'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-navy-100 flex items-center justify-between">
              <button onClick={() => window.print()} className="univ-btn-secondary text-xs">
                <Printer className="w-3.5 h-3.5" />
                <span>Print Copy</span>
              </button>
              <button onClick={() => setSelectedStudent(null)} className="univ-btn-primary text-xs">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
