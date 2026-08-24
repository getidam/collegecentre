import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Download, ArrowLeft, CheckCircle2, 
  Clock, AlertCircle, Eye, Trash2, Printer, ShieldCheck, 
  GraduationCap, Phone, Mail, MapPin, User, Calendar, RefreshCw
} from 'lucide-react';

export interface StudentRecord {
  id: string;
  fullName: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  photoUrl: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  degreeProgram: string;
  admissionYear: string;
  submissionDate: string;
  status: 'Verified' | 'Pending Review' | 'Enrolled';
}

const DEFAULT_SAMPLE_RECORDS: StudentRecord[] = [
  {
    id: 'CC-ADM-910482',
    fullName: 'Rohan Vinod Kulkarni',
    dob: '2005-04-14',
    gender: 'Male',
    bloodGroup: 'O+',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    phone: '9876543210',
    email: 'rohan.kulkarni@collegecentre.edu',
    address: 'Flat 402, Green Glen Layout, Bellandur',
    city: 'Bengaluru',
    pincode: '560103',
    guardianName: 'Vinod S. Kulkarni',
    guardianRelation: 'Father',
    guardianPhone: '9811122233',
    degreeProgram: 'B.Tech - Computer Science & Engineering',
    admissionYear: '2026',
    submissionDate: '2026-08-24 10:15 AM',
    status: 'Verified',
  },
  {
    id: 'CC-ADM-784129',
    fullName: 'Ananya Ramesh Iyer',
    dob: '2006-01-22',
    gender: 'Female',
    bloodGroup: 'A+',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    phone: '9822334455',
    email: 'ananya.iyer@collegecentre.edu',
    address: '14/B, Gokulam 3rd Stage',
    city: 'Mysuru',
    pincode: '570002',
    guardianName: 'Ramesh Sundaram Iyer',
    guardianRelation: 'Father',
    guardianPhone: '9844556677',
    degreeProgram: 'B.Tech - Artificial Intelligence & Data Science',
    admissionYear: '2026',
    submissionDate: '2026-08-24 11:30 AM',
    status: 'Enrolled',
  },
  {
    id: 'CC-ADM-642901',
    fullName: 'Devansh Pradeep Verma',
    dob: '2005-09-08',
    gender: 'Male',
    bloodGroup: 'B+',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    phone: '9899001122',
    email: 'devansh.verma@collegecentre.edu',
    address: 'Plot 88, Sector 15, Vashi',
    city: 'Navi Mumbai',
    pincode: '400703',
    guardianName: 'Pradeep K. Verma',
    guardianRelation: 'Father',
    guardianPhone: '9822110099',
    degreeProgram: 'MBBS - Medicine & Surgery',
    admissionYear: '2026',
    submissionDate: '2026-08-24 01:45 PM',
    status: 'Pending Review',
  },
  {
    id: 'CC-ADM-551098',
    fullName: 'Pooja Arvind Menon',
    dob: '2005-11-30',
    gender: 'Female',
    bloodGroup: 'AB+',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    phone: '9744556677',
    email: 'pooja.menon@collegecentre.edu',
    address: 'House No 12, Panampilly Nagar',
    city: 'Kochi',
    pincode: '682036',
    guardianName: 'Radhika Arvind Menon',
    guardianRelation: 'Mother',
    guardianPhone: '9711223344',
    degreeProgram: 'B.A. LL.B (Honours) - Integrated Law',
    admissionYear: '2026',
    submissionDate: '2026-08-24 02:20 PM',
    status: 'Verified',
  },
];

interface AdminPortalProps {
  onBackToHome: () => void;
  onOpenDataCollection: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToHome, onOpenDataCollection }) => {
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProgram, setFilterProgram] = useState('All Programs');
  const [filterStatus, setFilterStatus] = useState('All Statuses');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  // Load records from localStorage + defaults
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cc_student_records');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecords(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
    setRecords(DEFAULT_SAMPLE_RECORDS);
    try {
      localStorage.setItem('cc_student_records', JSON.stringify(DEFAULT_SAMPLE_RECORDS));
    } catch {
      // ignore
    }
  }, []);

  const saveRecords = (newRecords: StudentRecord[]) => {
    setRecords(newRecords);
    try {
      localStorage.setItem('cc_student_records', JSON.stringify(newRecords));
    } catch {
      // ignore
    }
  };

  const handleStatusChange = (id: string, newStatus: 'Verified' | 'Pending Review' | 'Enrolled') => {
    const updated = records.map(r => r.id === id ? { ...r, status: newStatus } : r);
    saveRecords(updated);
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent({ ...selectedStudent, status: newStatus });
    }
  };

  const handleDeleteRecord = (id: string) => {
    if (window.confirm('Are you sure you want to remove this student application record?')) {
      const updated = records.filter(r => r.id !== id);
      saveRecords(updated);
      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent(null);
      }
    }
  };

  const handleExportCSV = () => {
    const headers = ['Ref ID', 'Full Name', 'DOB', 'Gender', 'Blood Group', 'Phone', 'Email', 'Guardian Name', 'Guardian Phone', 'Program', 'City', 'Submission Date', 'Status'];
    const rows = records.map(r => [
      r.id,
      `"${r.fullName}"`,
      r.dob,
      r.gender,
      r.bloodGroup,
      r.phone,
      r.email,
      `"${r.guardianName} (${r.guardianRelation})"`,
      r.guardianPhone,
      `"${r.degreeProgram}"`,
      r.city,
      `"${r.submissionDate}"`,
      r.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CollegeCentre_Student_Records_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered list
  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      r.guardianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProgram = filterProgram === 'All Programs' || r.degreeProgram.includes(filterProgram);
    const matchesStatus = filterStatus === 'All Statuses' || r.status === filterStatus;

    return matchesSearch && matchesProgram && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-navy-50/40 text-navy-900 flex flex-col font-sans selection:bg-brand-600 selection:text-white">
      
      {/* Top Admin Header */}
      <header className="bg-white border-b border-navy-200/80 py-3.5 px-4 sm:px-8 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-950 text-white flex items-center justify-center font-bold shadow-xs">
              <Users className="w-5 h-5 text-brand-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg sm:text-xl text-navy-950 leading-tight">
                  University Student Registry
                </span>
                <span className="bg-brand-50 text-brand-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                  Registrar Portal
                </span>
              </div>
              <span className="text-xs text-navy-500 font-medium hidden sm:block">
                Centralized Higher-Ed Admissions & Data Management Ledger
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenDataCollection}
              className="univ-btn-secondary text-xs px-3 py-1.5 hidden sm:inline-flex"
            >
              <span>+ Fill Student Form</span>
            </button>

            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-navy-700 hover:text-navy-950 flex items-center gap-1.5 bg-white hover:bg-navy-50 px-3 py-2 rounded-xl border border-navy-200 shadow-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Main Overview</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-grow py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
              <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                <span>Total Applications</span>
                <Users className="w-4 h-4 text-brand-600" />
              </div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                {records.length}
              </div>
              <div className="text-[11px] text-academic-emerald font-medium mt-1">
                100% indexed in registry
              </div>
            </div>

            <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
              <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                <span>Verified Admissions</span>
                <CheckCircle2 className="w-4 h-4 text-academic-emerald" />
              </div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                {records.filter(r => r.status === 'Verified' || r.status === 'Enrolled').length}
              </div>
              <div className="text-[11px] text-navy-400 font-medium mt-1">
                Cleared document check
              </div>
            </div>

            <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
              <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                <span>Pending Clearance</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                {records.filter(r => r.status === 'Pending Review').length}
              </div>
              <div className="text-[11px] text-amber-600 font-medium mt-1">
                Awaiting verification
              </div>
            </div>

            <div className="bg-white border border-navy-200/80 rounded-2xl p-4 sm:p-5 shadow-card">
              <div className="flex items-center justify-between text-xs text-navy-500 mb-1">
                <span>Data Security</span>
                <ShieldCheck className="w-4 h-4 text-brand-600" />
              </div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-navy-950">
                AES-256
              </div>
              <div className="text-[11px] text-brand-600 font-medium mt-1">
                DPDPA 2023 Compliant
              </div>
            </div>
          </div>

          {/* Search, Filter & Export Toolbar */}
          <div className="bg-white border border-navy-200/80 rounded-2xl p-4 shadow-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student by Name, Ref ID, Phone, Guardian, Email..."
                className="w-full bg-navy-50/50 border border-navy-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-navy-900 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
              />
              <Search className="w-4 h-4 text-navy-400 absolute left-3.5 top-3 sm:top-3.5" />
            </div>

            {/* Program Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={filterProgram}
                onChange={(e) => setFilterProgram(e.target.value)}
                className="bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs text-navy-800 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option>All Programs</option>
                <option>Computer Science</option>
                <option>Artificial Intelligence</option>
                <option>Electronics</option>
                <option>Medicine & Surgery</option>
                <option>Integrated Law</option>
                <option>Business Administration</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-navy-50/50 border border-navy-200 rounded-xl px-3 py-2 text-xs text-navy-800 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option>All Statuses</option>
                <option>Verified</option>
                <option>Enrolled</option>
                <option>Pending Review</option>
              </select>

              <button
                onClick={handleExportCSV}
                className="univ-btn-secondary text-xs px-3.5 py-2 shrink-0 flex items-center gap-1.5"
                title="Export all records to Excel/CSV"
              >
                <Download className="w-3.5 h-3.5 text-brand-600" />
                <span>Export CSV</span>
              </button>
            </div>

          </div>

          {/* Student Registry Table */}
          <div className="bg-white border border-navy-200/80 rounded-2xl shadow-card overflow-hidden">
            <div className="p-4 border-b border-navy-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-sm text-navy-950">
                  Registered Student Dossiers ({filteredRecords.length})
                </span>
              </div>
              <span className="text-xs text-navy-500 font-mono">
                Real-time Database Sync Active
              </span>
            </div>

            {filteredRecords.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-navy-100 text-navy-400 mx-auto flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-base text-navy-900">No Student Records Found</h3>
                <p className="text-xs text-navy-500 max-w-sm mx-auto">
                  No registered student matched your search filters. Try clearing search criteria or submit a new form.
                </p>
                <button
                  onClick={onOpenDataCollection}
                  className="univ-btn-primary text-xs px-4 py-2"
                >
                  Fill New Student Form
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-navy-50/70 border-b border-navy-200/80 text-navy-600 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Student & Reference</th>
                      <th className="py-3 px-4">DOB & Gender</th>
                      <th className="py-3 px-4">Contact Coordinates</th>
                      <th className="py-3 px-4">Guardian Details</th>
                      <th className="py-3 px-4">Academic Program</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-100">
                    {filteredRecords.map((r) => (
                      <tr 
                        key={r.id}
                        className="hover:bg-navy-50/50 transition-colors group cursor-pointer"
                        onClick={() => setSelectedStudent(r)}
                      >
                        {/* Student & Avatar */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-11 rounded-lg border border-navy-200 bg-navy-50 overflow-hidden shrink-0 shadow-xs">
                              {r.photoUrl ? (
                                <img src={r.photoUrl} alt={r.fullName} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-navy-400">
                                  <User className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-sm text-navy-950 truncate">{r.fullName}</div>
                              <div className="font-mono text-[10px] text-brand-600 font-bold">{r.id}</div>
                            </div>
                          </div>
                        </td>

                        {/* DOB & Gender */}
                        <td className="py-3.5 px-4 text-navy-600">
                          <div className="font-medium text-navy-900">{r.dob}</div>
                          <div className="text-[11px] text-navy-500">{r.gender} • {r.bloodGroup}</div>
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-4 text-navy-600">
                          <div className="font-medium text-navy-900 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-navy-400" />
                            <span>{r.phone}</span>
                          </div>
                          <div className="text-[11px] text-navy-500 truncate max-w-[180px]">{r.email}</div>
                        </td>

                        {/* Guardian */}
                        <td className="py-3.5 px-4 text-navy-600">
                          <div className="font-medium text-navy-900">{r.guardianName}</div>
                          <div className="text-[11px] text-navy-500">{r.guardianRelation} • {r.guardianPhone}</div>
                        </td>

                        {/* Program */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-navy-900 leading-tight truncate max-w-[200px]">
                            {r.degreeProgram}
                          </div>
                          <div className="text-[10px] text-navy-500">Batch {r.admissionYear}</div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            r.status === 'Verified' 
                              ? 'bg-academic-emerald/10 text-academic-emerald' 
                              : r.status === 'Enrolled'
                              ? 'bg-brand-50 text-brand-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {r.status === 'Verified' && <CheckCircle2 className="w-3 h-3" />}
                            {r.status === 'Pending Review' && <Clock className="w-3 h-3" />}
                            {r.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedStudent(r)}
                              className="p-1.5 rounded-lg text-navy-500 hover:text-brand-600 hover:bg-navy-100 transition-colors"
                              title="View Full Dossier"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRecord(r.id)}
                              className="p-1.5 rounded-lg text-navy-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Record"
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
            )}

          </div>

        </div>
      </main>

      {/* Detailed Student Dossier Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-navy-200 rounded-2xl shadow-modal max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-navy-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy-900 text-white font-bold flex items-center justify-center text-sm">
                  CC
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-navy-950 leading-tight">
                    Official Student Admission Dossier
                  </h3>
                  <span className="text-xs text-navy-500 font-mono">
                    Ref ID: {selectedStudent.id} • Submitted: {selectedStudent.submissionDate}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 rounded-xl text-navy-400 hover:text-navy-700 hover:bg-navy-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Student Profile Overview */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 bg-navy-50/50 rounded-2xl border border-navy-200/80">
              <div className="w-24 h-30 rounded-xl border border-navy-200 bg-white overflow-hidden shrink-0 shadow-xs relative">
                {selectedStudent.photoUrl ? (
                  <img src={selectedStudent.photoUrl} alt={selectedStudent.fullName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-navy-400">
                    <User className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute bottom-0 inset-x-0 bg-navy-950/80 text-white text-[8px] font-bold text-center py-0.5">
                  {selectedStudent.bloodGroup}
                </div>
              </div>

              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-between gap-2 flex-wrap">
                  <h4 className="font-display font-bold text-xl text-navy-950">{selectedStudent.fullName}</h4>
                  <div className="flex items-center gap-1.5">
                    <select
                      value={selectedStudent.status}
                      onChange={(e) => handleStatusChange(selectedStudent.id, e.target.value as any)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-navy-300 bg-white"
                    >
                      <option value="Verified">Verified Active</option>
                      <option value="Enrolled">Enrolled Scholar</option>
                      <option value="Pending Review">Pending Review</option>
                    </select>
                  </div>
                </div>

                <p className="text-xs font-semibold text-brand-700">{selectedStudent.degreeProgram}</p>
                <p className="text-xs text-navy-500">Academic Intake Batch: {selectedStudent.admissionYear}</p>
              </div>
            </div>

            {/* Grid of Verified Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3 bg-white border border-navy-200 rounded-xl">
                <span className="text-[10px] text-navy-400 uppercase font-semibold block">Date of Birth & Gender</span>
                <span className="text-navy-900 font-medium">{selectedStudent.dob} ({selectedStudent.gender})</span>
              </div>

              <div className="p-3 bg-white border border-navy-200 rounded-xl">
                <span className="text-[10px] text-navy-400 uppercase font-semibold block">Student Direct Contact</span>
                <span className="text-navy-900 font-medium">{selectedStudent.phone} • {selectedStudent.email}</span>
              </div>

              <div className="p-3 bg-white border border-navy-200 rounded-xl">
                <span className="text-[10px] text-navy-400 uppercase font-semibold block">Guardian Information</span>
                <span className="text-navy-900 font-medium">{selectedStudent.guardianName} ({selectedStudent.guardianRelation})</span>
              </div>

              <div className="p-3 bg-white border border-navy-200 rounded-xl">
                <span className="text-[10px] text-navy-400 uppercase font-semibold block">Guardian Contact Phone</span>
                <span className="text-navy-900 font-medium">{selectedStudent.guardianPhone}</span>
              </div>

              <div className="sm:col-span-2 p-3 bg-white border border-navy-200 rounded-xl">
                <span className="text-[10px] text-navy-400 uppercase font-semibold block">Permanent Residential Address</span>
                <span className="text-navy-900 font-medium">{selectedStudent.address}, {selectedStudent.city} - {selectedStudent.pincode}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-navy-100 flex items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="univ-btn-secondary text-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Copy</span>
              </button>

              <button
                onClick={() => setSelectedStudent(null)}
                className="univ-btn-primary text-xs"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Admin Footer */}
      <footer className="bg-white border-t border-navy-200 py-4 px-4 text-xs text-navy-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            © 2026 CollegeCentre University Registry System • Institutional Administrator Console.
          </div>
          <div className="text-navy-400 font-mono text-[11px]">
            Security Ledger: Active (AES-256)
          </div>
        </div>
      </footer>

    </div>
  );
};
