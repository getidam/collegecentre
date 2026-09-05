import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, Heart, Send, Plus, X, Sparkles, Filter, 
  Clock, ShieldAlert, MessageSquare, Flame, CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Confession {
  id: string;
  content: string;
  college_name: string | null;
  category: string;
  upvotes: number;
  is_approved: boolean;
  created_at: string;
}

interface Comment {
  id: string;
  confession_id: string;
  content: string;
  created_at: string;
}

const CATEGORIES = ['All', 'academic', 'rant', 'advice', 'general', 'social'];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  academic: { bg: 'bg-blue-100', text: 'text-blue-800' },
  rant: { bg: 'bg-red-100', text: 'text-red-800' },
  advice: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  general: { bg: 'bg-slate-100', text: 'text-slate-800' },
  social: { bg: 'bg-purple-100', text: 'text-purple-800' },
};

export const ForumPage: React.FC = () => {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'trending' | 'latest'>('trending');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newCollege, setNewCollege] = useState('');
  const [newCategory, setNewCategory] = useState('general');
  const [submitting, setSubmitting] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  // Upvoted IDs in session/local state
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());

  // Comments state: map of confession_id -> Comment[]
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>({});
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});
  const [commentingMap, setCommentingMap] = useState<Record<string, boolean>>({});

  const fetchConfessions = async () => {
    setLoading(true);
    let query = supabase.from('confessions').select('*').eq('is_approved', true);

    if (selectedCategory !== 'All') {
      query = query.eq('category', selectedCategory);
    }

    if (sortBy === 'trending') {
      query = query.order('upvotes', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    if (!error && data) {
      setConfessions(data as Confession[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConfessions();
  }, [selectedCategory, sortBy]);

  const handleUpvote = async (id: string, currentUpvotes: number) => {
    if (upvotedIds.has(id)) return;

    // Optimistic UI update
    setUpvotedIds(prev => new Set(prev).add(id));
    setConfessions(prev => prev.map(c => c.id === id ? { ...c, upvotes: currentUpvotes + 1 } : c));

    await supabase.from('confessions').update({ upvotes: currentUpvotes + 1 }).eq('id', id);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim() || newContent.trim().length < 15) return;

    setSubmitting(true);
    const { error } = await supabase.from('confessions').insert({
      content: newContent.trim(),
      college_name: newCollege.trim() || 'Anonymous College',
      category: newCategory,
      upvotes: 1,
      is_approved: true,
    });
    setSubmitting(false);

    if (!error) {
      setSubmittedNotice(true);
      fetchConfessions();
      setTimeout(() => {
        setSubmittedNotice(false);
        setShowModal(false);
        setNewContent('');
        setNewCollege('');
        setNewCategory('general');
      }, 1200);
    }
  };

  const toggleComments = async (confessionId: string) => {
    const isNowExpanded = !expandedComments[confessionId];
    setExpandedComments(prev => ({ ...prev, [confessionId]: isNowExpanded }));

    if (isNowExpanded && !commentsMap[confessionId]) {
      const { data } = await supabase
        .from('confession_comments')
        .select('*')
        .eq('confession_id', confessionId)
        .order('created_at', { ascending: true });
      if (data) {
        setCommentsMap(prev => ({ ...prev, [confessionId]: data as Comment[] }));
      }
    }
  };

  const handleAddComment = async (confessionId: string) => {
    const text = (newCommentText[confessionId] || '').trim();
    if (!text) return;

    setCommentingMap(prev => ({ ...prev, [confessionId]: true }));
    const { data, error } = await supabase
      .from('confession_comments')
      .insert({ confession_id: confessionId, content: text })
      .select()
      .single();

    setCommentingMap(prev => ({ ...prev, [confessionId]: false }));

    if (!error && data) {
      setCommentsMap(prev => ({
        ...prev,
        [confessionId]: [...(prev[confessionId] || []), data as Comment],
      }));
      setNewCommentText(prev => ({ ...prev, [confessionId]: '' }));
    }
  };

  const getTimeAgo = (dateStr: string) => {
    if (!dateStr) return 'Recently';
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + 'm ago';
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + 'h ago';
    const days = Math.floor(hours / 24);
    return days + 'd ago';
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-900 mb-2">
              <Sparkles size={12} />
              <span>100% Anonymous · No Signup Needed</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Campus Forum &amp; Confessions
            </h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Share honest stories, ask advice, rant about college life, and connect freely.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all shrink-0"
          >
            <Plus size={16} />
            Post Anonymously
          </button>
        </div>

        {/* Categories Bar & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={'px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all ' + (
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-end sm:self-auto">
            <button
              onClick={() => setSortBy('trending')}
              className={'px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ' + (
                sortBy === 'trending' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              <Flame size={12} className="text-amber-500" /> Trending
            </button>
            <button
              onClick={() => setSortBy('latest')}
              className={'px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ' + (
                sortBy === 'latest' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              <Clock size={12} /> Latest
            </button>
          </div>
        </div>

        {/* Confession Cards */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-500 font-medium">Loading anonymous whispers...</p>
          </div>
        ) : confessions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <MessageCircle size={44} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No confessions in this category yet</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Be the first to share your thoughts anonymously!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {confessions.map((post) => {
              const catTheme = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.general;
              const hasUpvoted = upvotedIds.has(post.id);
              const isExpanded = expandedComments[post.id];
              const comments = commentsMap[post.id] || [];

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all shadow-xs"
                >
                  {/* Card top */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={'px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ' + catTheme.bg + ' ' + catTheme.text}>
                        {post.category}
                      </span>
                      {post.college_name && (
                        <span className="text-xs text-slate-400 font-medium truncate max-w-[200px]">
                          @ {post.college_name}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={11} /> {getTimeAgo(post.created_at)}
                    </span>
                  </div>

                  {/* Confession body */}
                  <p className="text-slate-800 text-base leading-relaxed whitespace-pre-wrap mb-4 font-normal">
                    {post.content}
                  </p>

                  {/* Interaction bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleUpvote(post.id, post.upvotes)}
                      className={'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ' + (
                        hasUpvoted
                          ? 'bg-pink-50 text-pink-600'
                          : 'bg-slate-100 text-slate-600 hover:bg-pink-50 hover:text-pink-600'
                      )}
                    >
                      <Heart size={14} className={hasUpvoted ? 'fill-pink-500 text-pink-500' : ''} />
                      <span>{post.upvotes}</span>
                    </button>

                    <button
                      onClick={() => toggleComments(post.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors"
                    >
                      <MessageSquare size={14} />
                      <span>{isExpanded ? 'Hide Comments' : 'Comments'}</span>
                    </button>
                  </div>

                  {/* Comments section */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                      {comments.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-2">No comments yet. Say something supportive!</p>
                      ) : (
                        <div className="space-y-2">
                          {comments.map((cm) => (
                            <div key={cm.id} className="bg-slate-50 p-3 rounded-xl text-xs text-slate-700">
                              <p>{cm.content}</p>
                              <span className="text-[10px] text-slate-400 mt-1 block">{getTimeAgo(cm.created_at)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add comment input */}
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Reply anonymously..."
                          value={newCommentText[post.id] || ''}
                          onChange={(e) => setNewCommentText({ ...newCommentText, [post.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                          className="flex-grow px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={commentingMap[post.id] || !(newCommentText[post.id] || '').trim()}
                          className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                        >
                          <Send size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Post Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Post Anonymously</h3>
            <p className="text-xs text-slate-500 mb-5">Your identity is completely hidden. No name, IP, or tracking.</p>

            {submittedNotice ? (
              <div className="p-8 text-center">
                <CheckCircle2 size={44} className="text-pink-500 mx-auto mb-2" />
                <h4 className="text-lg font-bold text-slate-800">Whisper Shared!</h4>
                <p className="text-sm text-slate-500 mt-1">Your anonymous post is now live on the forum.</p>
              </div>
            ) : (
              <form onSubmit={handlePostSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">What is on your mind? *</label>
                  <textarea
                    required
                    rows={4}
                    minLength={15}
                    placeholder="Speak your mind... (Min 15 characters)"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:outline-none resize-none text-sm"
                  />
                  <span className="text-[11px] text-slate-400">{newContent.length} chars</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white text-xs font-semibold"
                    >
                      <option value="general">General</option>
                      <option value="academic">Academic</option>
                      <option value="rant">Rant</option>
                      <option value="advice">Advice</option>
                      <option value="social">Social</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">College (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. VTU or IITB"
                      value={newCollege}
                      onChange={(e) => setNewCollege(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting || newContent.trim().length < 15}
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all disabled:opacity-50 shadow-md"
                  >
                    {submitting ? 'Publishing Anonymously...' : 'Post Whisper'}
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
