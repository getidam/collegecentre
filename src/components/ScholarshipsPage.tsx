import React, { useState, useEffect } from 'react';
import { 
  Award, FileText, Calendar, ExternalLink, Bell, CheckCircle2, 
  Clock, AlertCircle, Sparkles, Filter, Mail
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  description: string;
  eligibility: string;
  deadline: string;
  link: string;
  type: string;
  category: string;
  is_active: boolean;
}

const CATEGORY_OPTIONS = ['All', 'merit', 'need-based', 'minority', 'sports'];

export const ScholarshipsPage: React.FC = () => {
  const [items, setItems] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'scholarship' | 'exam'>('scholarship');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Subscription state
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    let query = supabase
      .from('scholarships')
      .select('*')
      .eq('is_active', true)
      .eq('type', activeTab)
      .order('deadline', { ascending: true });

    if (selectedCategory !== 'All') {
      query = query.eq('category', selectedCategory);
    }

    const { data, error } = await query;
    if (!error && data) {
      setItems(data as Scholarship[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [activeTab, selectedCategory]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubError('Please enter a valid student email address.');
      return;
    }
    setSubscribing(true);
    setSubError('');
    const { error } = await supabase.from('alert_subscriptions').upsert(
      {
        email: email.trim(),
        alert_types: ['scholarship', 'exam'],
        is_active: true,
      },
      { onConflict: 'email' }
    );
    setSubscribing(false);
    if (!error) {
      setSubscribed(true);
      setEmail('');
    } else {
      setSubError('Failed to subscribe. Please try again.');
    }
  };

  const getDaysLeft = (deadlineStr: string) => {
    if (!deadlineStr) return null;
    const deadline = new Date(deadlineStr);
    const today = new Date();
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center sm:text-left mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-3">
            <Sparkles size={13} />
            <span>Government &amp; Private Aid Tracker</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Scholarships &amp; Exam Alerts
          </h1>
          <p className="text-slate-500 mt-1.5 text-base sm:text-lg max-w-2xl">
            Never miss a scholarship deadline, financial grant, or competitive exam registration again.
          </p>
        </div>

        {/* Tab Switcher & Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Main Tabs */}
          <div className="flex p-1 bg-slate-200/80 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('scholarship')}
              className={'flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ' + (
                activeTab === 'scholarship'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <Award size={16} className="text-amber-500" />
              <span>Scholarships</span>
            </button>
            <button
              onClick={() => setActiveTab('exam')}
              className={'flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ' + (
                activeTab === 'exam'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <FileText size={16} className="text-blue-500" />
              <span>Exam Alerts</span>
            </button>
          </div>

          {/* Category Chips (for scholarships) */}
          {activeTab === 'scholarship' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
                <Filter size={12} /> Category:
              </span>
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={'px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all ' + (
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  )}
                >
                  {cat === 'All' ? 'All Types' : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-500 font-medium">Fetching authentic announcements...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Award size={44} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No announcements found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Check back soon or subscribe below to receive direct alerts as soon as applications open.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {items.map((item) => {
              const daysLeft = getDaysLeft(item.deadline);
              const isUrgent = daysLeft !== null && daysLeft <= 14 && daysLeft > 0;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {item.category || item.type}
                      </span>
                      {daysLeft !== null && (
                        <span className={'px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ' + (
                          isUrgent
                            ? 'bg-red-100 text-red-700 animate-pulse'
                            : daysLeft <= 0
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-emerald-100 text-emerald-800'
                        )}>
                          <Clock size={12} />
                          {daysLeft > 0 ? (daysLeft + ' days left') : 'Closed'}
                        </span>
                      )}
                    </div>

                    {/* Title and Provider */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium mt-0.5">
                        Provided by <span className="text-slate-800 font-semibold">{item.provider}</span>
                      </p>
                    </div>

                    {/* Grant Amount Pill */}
                    {item.amount && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/60 rounded-xl text-amber-900 font-extrabold text-sm">
                        <span>Grant / Benefit:</span>
                        <span className="text-amber-700">{item.amount}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Eligibility criteria */}
                    {item.eligibility && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-normal">
                          <strong className="text-slate-700">Eligibility: </strong>
                          {item.eligibility}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-400">
                      Deadline: <strong className="text-slate-600">{item.deadline || 'TBA'}</strong>
                    </span>
                    <a
                      href={item.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-xs"
                    >
                      <span>Official Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Email Alert Subscription Box */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
              <Bell size={13} />
              <span>Instant Notification Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get notified before deadlines close.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Every month Indian students miss out on crores in scholarship grants simply because they heard about the deadline a day late. We send you an email alert 7 days before closure.
            </p>

            {subscribed ? (
              <div className="mt-6 p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl flex items-center gap-3 text-emerald-200 text-sm font-semibold">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                <span>You are subscribed! We will alert you whenever major scholarships or exam dates are announced.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your student email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-xs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all shrink-0 disabled:opacity-60"
                >
                  {subscribing ? 'Subscribing...' : 'Subscribe Free Alerts'}
                </button>
              </form>
            )}

            {subError && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                <AlertCircle size={13} /> {subError}
              </p>
            )}

            <p className="text-xs text-slate-400 mt-4">
              Free forever · Zero spam · Unsubscribe anytime with 1 click.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
