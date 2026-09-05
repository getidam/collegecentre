import { useEffect, useState, useCallback } from 'react';
import {
  BookOpen,
  FileText,
  FlaskConical,
  GraduationCap,
  ThumbsUp,
  Download,
  Eye,
  ShieldCheck,
  Upload,
  Search,
  X,
  ChevronDown,
  User,
  Calendar,
  BookMarked,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Resource {
  id: string;
  title: string;
  description: string | null;
  university_name: string | null;
  branch: string | null;
  semester: number | null;
  subject: string | null;
  type: string;
  file_url: string | null;
  uploaded_by: string | null;
  upvotes: number;
  downloads: number;
  is_verified: boolean;
  created_at: string;
}

interface University {
  id: string;
  name: string;
  short_name: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BRANCHES = ['Any', 'CSE', 'ECE', 'MECH', 'CIVIL', 'IT', 'EEE', 'MBA'];
const SEMESTERS = ['Any', '1', '2', '3', '4', '5', '6', '7', '8'];
const RESOURCE_TYPES = ['All', 'Notes', 'PYQ', 'Syllabus', 'Lab Manual'];

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  Notes: {
    label: 'Notes',
    color: 'text-blue-700',
    bg: 'bg-blue-100',
    icon: <BookOpen size={12} />,
  },
  PYQ: {
    label: 'PYQ',
    color: 'text-orange-700',
    bg: 'bg-orange-100',
    icon: <FileText size={12} />,
  },
  Syllabus: {
    label: 'Syllabus',
    color: 'text-green-700',
    bg: 'bg-green-100',
    icon: <BookMarked size={12} />,
  },
  'Lab Manual': {
    label: 'Lab Manual',
    color: 'text-purple-700',
    bg: 'bg-purple-100',
    icon: <FlaskConical size={12} />,
  },
};

// ─── Toast ────────────────────────────────────────────────────────────────────

interface Toast {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

let toastCounter = 0;

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all duration-300
            ${t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-[#0c8ee9]'}`}
        >
          <span>{t.message}</span>
          <button onClick={() => onRemove(t.id)} className="ml-1 opacity-75 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Skeleton Card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse space-y-3">
      <div className="h-5 w-16 bg-gray-200 rounded-full" />
      <div className="h-5 w-3/4 bg-gray-200 rounded-lg" />
      <div className="h-4 w-1/2 bg-gray-100 rounded-lg" />
      <div className="h-4 w-1/3 bg-gray-100 rounded-lg" />
      <div className="flex gap-2 pt-2">
        <div className="h-8 flex-1 bg-gray-100 rounded-lg" />
        <div className="h-8 flex-1 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

// ─── Resource Card ─────────────────────────────────────────────────────────────

interface ResourceCardProps {
  resource: Resource;
  onUpvote: (id: string, current: number) => void;
  onToast: (msg: string, type?: Toast['type']) => void;
  upvoting: boolean;
}

function ResourceCard({ resource, onUpvote, onToast, upvoting }: ResourceCardProps) {
  const cfg = TYPE_CONFIG[resource.type] ?? {
    label: resource.type,
    color: 'text-gray-700',
    bg: 'bg-gray-100',
    icon: <FileText size={12} />,
  };

  const formattedDate = new Date(resource.created_at).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-[#0c8ee9]/30 hover:shadow-lg transition-all duration-200 p-5 flex flex-col gap-3">
      {/* Top row: type badge + verified */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
          {cfg.icon}
          {cfg.label}
        </span>
        {resource.is_verified && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <ShieldCheck size={14} className="text-emerald-500" />
            Verified
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-[#0f172a] font-bold text-base leading-snug line-clamp-2 group-hover:text-[#0c8ee9] transition-colors">
        {resource.title}
      </h3>

      {/* Subject + Semester */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        {resource.subject && (
          <span className="flex items-center gap-1">
            <BookOpen size={13} />
            {resource.subject}
          </span>
        )}
        {resource.semester && (
          <span className="flex items-center gap-1">
            <GraduationCap size={13} />
            Sem {resource.semester}
          </span>
        )}
        {resource.branch && (
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
            {resource.branch}
          </span>
        )}
      </div>

      {/* University badge */}
      {resource.university_name && (
        <span className="inline-block self-start bg-[#1e3a5f]/8 text-[#1e3a5f] text-xs font-medium px-2.5 py-1 rounded-lg border border-[#1e3a5f]/10">
          🏫 {resource.university_name}
        </span>
      )}

      {/* Description */}
      {resource.description && (
        <p className="text-xs text-gray-400 line-clamp-2">{resource.description}</p>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-1 border-t border-gray-50">
        <span className="flex items-center gap-1">
          <ThumbsUp size={12} className="text-[#0c8ee9]" />
          {resource.upvotes ?? 0}
        </span>
        <span className="flex items-center gap-1">
          <Download size={12} className="text-gray-400" />
          {resource.downloads ?? 0}
        </span>
        <span className="flex items-center gap-1 ml-auto">
          <User size={12} />
          {resource.uploaded_by ?? 'Anonymous'}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {formattedDate}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-1">
        {/* Upvote */}
        <button
          onClick={() => onUpvote(resource.id, resource.upvotes ?? 0)}
          disabled={upvoting}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-[#0c8ee9]/40 text-[#0c8ee9] hover:bg-[#0c8ee9]/10 transition-colors disabled:opacity-50"
        >
          <ThumbsUp size={13} />
          {upvoting ? '...' : 'Upvote'}
        </button>

        {/* View */}
        <button
          onClick={() => onToast('Link coming soon', 'info')}
          className="flex items-center gap-1.5 flex-1 justify-center px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Eye size={13} />
          View
        </button>

        {/* Download */}
        <button
          onClick={() => onToast('Link coming soon', 'info')}
          className="flex items-center gap-1.5 flex-1 justify-center px-3 py-2 rounded-xl text-xs font-semibold bg-[#0c8ee9] text-white hover:bg-[#0a7fd4] transition-colors"
        >
          <Download size={13} />
          Download
        </button>
      </div>
    </div>
  );
}

// ─── Custom Select ─────────────────────────────────────────────────────────────

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

function Select({ value, onChange, options, placeholder, className = '' }: SelectProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#0c8ee9]/30 focus:border-[#0c8ee9] cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export const ResourcesPage = () => {
  // Filter state
  const [search, setSearch] = useState('');
  const [university, setUniversity] = useState('');
  const [branch, setBranch] = useState('Any');
  const [semester, setSemester] = useState('Any');
  const [activeType, setActiveType] = useState('All');

  // Data state
  const [resources, setResources] = useState<Resource[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [upvotingId, setUpvotingId] = useState<string | null>(null);

  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const removeToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  // Fetch universities on mount
  useEffect(() => {
    const fetchUniversities = async () => {
      const { data } = await supabase
        .from('universities')
        .select('id, name, short_name')
        .order('name', { ascending: true });
      if (data) setUniversities(data);
    };
    fetchUniversities();
  }, []);

  // Fetch resources when filters change
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      let query = supabase.from('resources').select('*').order('created_at', { ascending: false });

      if (university) query = query.eq('university_name', university);
      if (branch !== 'Any') query = query.eq('branch', branch);
      if (semester !== 'Any') query = query.eq('semester', parseInt(semester, 10));
      if (activeType !== 'All') query = query.eq('type', activeType);

      const { data, error } = await query;
      if (error) {
        showToast('Failed to load resources', 'error');
        setResources([]);
      } else {
        let results = data ?? [];
        // Client-side search on title + subject
        if (search.trim()) {
          const q = search.trim().toLowerCase();
          results = results.filter(
            (r) =>
              r.title?.toLowerCase().includes(q) ||
              r.subject?.toLowerCase().includes(q)
          );
        }
        setResources(results);
      }
      setLoading(false);
    };

    // Debounce search
    const timer = setTimeout(fetchResources, search.trim() ? 300 : 0);
    return () => clearTimeout(timer);
  }, [university, branch, semester, activeType, search, showToast]);

  // Upvote handler
  const handleUpvote = async (id: string, currentUpvotes: number) => {
    setUpvotingId(id);
    const { error } = await supabase
      .from('resources')
      .update({ upvotes: currentUpvotes + 1 })
      .eq('id', id);

    if (error) {
      showToast('Failed to upvote. Try again.', 'error');
    } else {
      setResources((prev) =>
        prev.map((r) => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r))
      );
      showToast('Upvoted! 👍', 'success');
    }
    setUpvotingId(null);
  };

  const universityOptions = [
    { label: 'All Universities', value: '' },
    ...universities.map((u) => ({ label: u.name, value: u.name })),
  ];

  const branchOptions = BRANCHES.map((b) => ({ label: b, value: b }));
  const semesterOptions = SEMESTERS.map((s) => ({ label: s === 'Any' ? 'Any Semester' : `Semester ${s}`, value: s }));

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* ── Hero Header ───────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0c8ee9] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
                <BookOpen size={24} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-blue-200 tracking-wider uppercase">
                Study Materials
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
              Notes, PYQs &amp; Study Material
            </h1>
            <p className="text-lg text-blue-200 max-w-xl">
              Uploaded by students, for students.{' '}
              <span className="text-white font-semibold">Free forever.</span>
            </p>
          </div>
        </div>

        {/* ── Filter Bar ────────────────────────────────────────────── */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            {/* Search */}
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or subject…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c8ee9]/30 focus:border-[#0c8ee9] bg-gray-50"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Select
                value={university}
                onChange={setUniversity}
                options={universityOptions}
                placeholder="All Universities"
                className="flex-1 min-w-[160px]"
              />
              <Select
                value={branch}
                onChange={setBranch}
                options={branchOptions}
                className="flex-1 min-w-[120px]"
              />
              <Select
                value={semester}
                onChange={setSemester}
                options={semesterOptions}
                className="flex-1 min-w-[130px]"
              />
            </div>

            {/* Type tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
              {RESOURCE_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap
                    ${
                      activeType === t
                        ? 'bg-[#0c8ee9] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ───────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Result count */}
          {!loading && (
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                {resources.length > 0 ? (
                  <>
                    Showing <span className="font-semibold text-gray-700">{resources.length}</span>{' '}
                    resource{resources.length !== 1 ? 's' : ''}
                    {activeType !== 'All' && (
                      <span className="ml-1 text-[#0c8ee9] font-medium">· {activeType}</span>
                    )}
                  </>
                ) : null}
              </p>
              {(university || branch !== 'Any' || semester !== 'Any' || activeType !== 'All' || search) && (
                <button
                  onClick={() => {
                    setUniversity('');
                    setBranch('Any');
                    setSemester('Any');
                    setActiveType('All');
                    setSearch('');
                  }}
                  className="text-xs text-[#0c8ee9] hover:underline font-medium flex items-center gap-1"
                >
                  <X size={12} />
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : resources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="p-5 bg-gray-100 rounded-full mb-5">
                <BookOpen size={40} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-1">No resources found</h3>
              <p className="text-sm text-gray-400 max-w-xs mb-6">
                Be the first to upload study material for this filter!
              </p>
              <button
                onClick={() => showToast('Upload feature coming soon!', 'info')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0c8ee9] text-white text-sm font-semibold rounded-xl hover:bg-[#0a7fd4] transition-colors"
              >
                <Upload size={15} />
                Upload Resource
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {resources.map((r) => (
                <ResourceCard
                  key={r.id}
                  resource={r}
                  onUpvote={handleUpvote}
                  onToast={showToast}
                  upvoting={upvotingId === r.id}
                />
              ))}
            </div>
          )}

          {/* ── Upload CTA Banner ──────────────────────────────────── */}
          <div className="mt-14 rounded-2xl overflow-hidden bg-gradient-to-r from-[#0f172a] to-[#1e3a5f] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-white text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <Upload size={18} className="text-[#0c8ee9]" />
                <span className="text-xs font-bold text-[#0c8ee9] uppercase tracking-widest">
                  Contribute
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight">
                Have notes?{' '}
                <span className="text-[#0c8ee9]">Help your juniors.</span>
              </h2>
              <p className="text-blue-200 text-sm max-w-md">
                Upload your study material and earn CollegeCentre points. Thousands of students are
                waiting for quality resources from seniors like you.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <button
                onClick={() => showToast('Upload feature coming soon! 🚀', 'info')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0c8ee9] hover:bg-[#0a7fd4] text-white text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Upload size={18} />
                Upload Study Material
              </button>
              <p className="text-blue-300 text-xs">PDF, DOCX, PPT · Max 25 MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast portal */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};
