import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Search, MapPin, DollarSign, Calendar, ExternalLink, 
  Sparkles, Plus, X, Building, CheckCircle2, AlertCircle, Clock
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  stipend: string;
  location: string;
  type: string;
  mode: string;
  fields: string[];
  deadline: string;
  apply_url: string;
  is_featured: boolean;
  posted_at: string;
}

const FIELD_OPTIONS = ['All', 'CSE', 'IT', 'ECE', 'MECH', 'Civil', 'MBA', 'Any'];
const TYPE_OPTIONS = ['All', 'internship', 'job', 'part-time'];
const MODE_OPTIONS = ['All', 'remote', 'onsite', 'hybrid'];

export const InternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedField, setSelectedField] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');

  // Post modal state
  const [showModal, setShowModal] = useState(false);
  const [posting, setPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [modalForm, setModalForm] = useState({
    title: '',
    company: '',
    description: '',
    stipend: '',
    location: '',
    type: 'internship',
    mode: 'remote',
    fields: ['CSE'],
    deadline: '',
    apply_url: '',
  });

  const fetchInternships = async () => {
    setLoading(true);
    let query = supabase.from('internships').select('*').eq('is_active', true).order('is_featured', { ascending: false }).order('posted_at', { ascending: false });

    if (selectedType !== 'All') {
      query = query.eq('type', selectedType);
    }
    if (selectedMode !== 'All') {
      query = query.eq('mode', selectedMode);
    }

    const { data, error } = await query;
    if (!error && data) {
      setInternships(data as Internship[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInternships();
  }, [selectedType, selectedMode]);

  const filteredInternships = internships.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesField = selectedField === 'All' || (item.fields && item.fields.some(f => f.toLowerCase() === selectedField.toLowerCase() || f.toLowerCase() === 'any'));

    return matchesSearch && matchesField;
  });

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPosting(true);
    const { error } = await supabase.from('internships').insert({
      ...modalForm,
      is_active: true,
      is_featured: false,
    });
    setPosting(false);
    if (!error) {
      setPostSuccess(true);
      fetchInternships();
      setTimeout(() => {
        setPostSuccess(false);
        setShowModal(false);
        setModalForm({
          title: '',
          company: '',
          description: '',
          stipend: '',
          location: '',
          type: 'internship',
          mode: 'remote',
          fields: ['CSE'],
          deadline: '',
          apply_url: '',
        });
      }, 1500);
    }
  };

  const getDaysLeft = (deadlineStr: string) => {
    if (!deadlineStr) return null;
    const deadline = new Date(deadlineStr);
    const today = new Date();
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTimeAgo = (dateStr: string) => {
    if (!dateStr) return 'Recently';
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return diff + ' days ago';
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Sparkles size={12} /> Verified Listings
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Internships &amp; Fresher Jobs
            </h1>
            <p className="text-slate-500 mt-1.5 text-base sm:text-lg">
              Curated opportunities for Indian college students. No spam, no fake listings.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all"
          >
            <Plus size={16} />
            Post an Opening Free
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search role, company, skills, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Filter Row 1: Type and Mode */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
            {/* Type tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {TYPE_OPTIONS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ' + (
                    selectedType === t 
                      ? 'bg-white text-slate-900 shadow-xs font-bold' 
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {t === 'All' ? 'All Roles' : t}
                </button>
              ))}
            </div>

            {/* Mode tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {MODE_OPTIONS.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMode(m)}
                  className={'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ' + (
                    selectedMode === m 
                      ? 'bg-white text-slate-900 shadow-xs font-bold' 
                      : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Row 2: Field Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Field:</span>
            {FIELD_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedField(f)}
                className={'px-2.5 py-1 rounded-full text-xs font-medium transition-all ' + (
                  selectedField === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-500 font-medium">Loading live opportunities...</p>
          </div>
        ) : filteredInternships.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Briefcase size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No opportunities found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search keywords or switching filters to see more results.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInternships.map((job) => {
              const daysLeft = getDaysLeft(job.deadline);
              return (
                <div
                  key={job.id}
                  className={'bg-white rounded-2xl p-5 sm:p-6 border transition-all hover:shadow-md ' + (
                    job.is_featured
                      ? 'border-amber-300 ring-1 ring-amber-300/50 bg-gradient-to-r from-amber-50/20 via-white to-white'
                      : 'border-slate-200'
                  )}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Job Details */}
                    <div className="space-y-2 flex-grow">
                      <div className="flex flex-wrap items-center gap-2">
                        {job.is_featured && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                            <Sparkles size={10} /> FEATURED
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 capitalize">
                          {job.type}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 capitalize">
                          {job.mode}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto md:ml-0">
                          <Clock size={12} /> {getTimeAgo(job.posted_at)}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900">{job.title}</h2>
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium mt-0.5">
                          <Building size={14} className="text-slate-400" />
                          <span>{job.company}</span>
                          <span className="text-slate-300">•</span>
                          <MapPin size={14} className="text-slate-400" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed pt-1">
                        {job.description}
                      </p>

                      {/* Fields & Stipend */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg flex items-center gap-1">
                          <DollarSign size={13} />
                          {job.stipend || 'Unpaid / Negotiable'}
                        </div>

                        {job.fields && job.fields.map((field) => (
                          <span key={field} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium">
                            {field}
                          </span>
                        ))}

                        {daysLeft !== null && (
                          <span className={'text-xs font-semibold px-2 py-1 rounded-lg ' + (
                            daysLeft <= 7 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
                          )}>
                            {daysLeft > 0 ? ('Apply by: ' + job.deadline + ' (' + daysLeft + 'd left)') : 'Closing soon'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex md:flex-col items-center justify-between md:justify-center gap-2 pt-2 md:pt-0 shrink-0">
                      <a
                        href={job.apply_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-xs"
                      >
                        <span>Apply Now</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Post Opening CTA at bottom */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Hiring talented college students?</h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Reach thousands of ambitious Indian engineering, commerce, and design students for your team.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all shrink-0"
          >
            Post an Opening for Free
          </button>
        </div>
      </div>

      {/* Post Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 relative my-8">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Post an Opportunity</h3>
            <p className="text-xs text-slate-500 mb-5">Fill out the details below. Live instantly for all students.</p>

            {postSuccess ? (
              <div className="p-8 text-center">
                <CheckCircle2 size={44} className="text-emerald-500 mx-auto mb-2" />
                <h4 className="text-lg font-bold text-slate-800">Opportunity Posted!</h4>
                <p className="text-sm text-slate-500 mt-1">Thank you. Students can now discover and apply.</p>
              </div>
            ) : (
              <form onSubmit={handlePostSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role Title *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. React Frontend Intern"
                    value={modalForm.title}
                    onChange={(e) => setModalForm({ ...modalForm, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Company Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Acme Tech"
                      value={modalForm.company}
                      onChange={(e) => setModalForm({ ...modalForm, company: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Stipend / Salary *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. ₹15,000/mo or Unpaid"
                      value={modalForm.stipend}
                      onChange={(e) => setModalForm({ ...modalForm, stipend: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Work Mode</label>
                    <select
                      value={modalForm.mode}
                      onChange={(e) => setModalForm({ ...modalForm, mode: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                      <option value="remote">Remote</option>
                      <option value="onsite">Onsite</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Location / City *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Bengaluru or Remote"
                      value={modalForm.location}
                      onChange={(e) => setModalForm({ ...modalForm, location: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Application Link / Form URL *</label>
                  <input
                    required
                    type="url"
                    placeholder="https://yourcompany.com/apply or Google Form"
                    value={modalForm.apply_url}
                    onChange={(e) => setModalForm({ ...modalForm, apply_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description &amp; Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly mention who you are looking for, skills required..."
                    value={modalForm.description}
                    onChange={(e) => setModalForm({ ...modalForm, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={posting}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all disabled:opacity-50"
                  >
                    {posting ? 'Publishing...' : 'Publish Listing Now'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
