import React, { useState, useEffect } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

const BRANCHES = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "MBA", "MCA", "Other"];
const RESOURCE_TYPES = [
  { value: "notes", label: "Lecture Notes" },
  { value: "pyq", label: "Previous Year Questions" },
  { value: "syllabus", label: "Syllabus" },
  { value: "lab", label: "Lab Manual" },
];

interface University { id: string; name: string; short_name: string; }

export const UploadPage: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [form, setForm] = useState({ title: "", description: "", university_name: "", branch: "CSE", semester: "3", subject: "", type: "notes", file_url: "", uploaded_by: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.from("universities").select("id, name, short_name").then(({ data }) => { if (data) setUniversities(data); });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.subject || !form.university_name) { setError("Please fill in all required fields."); return; }
    setSubmitting(true);
    const { error: dbError } = await supabase.from("resources").insert({ ...form, semester: parseInt(form.semester), uploaded_by: form.uploaded_by || "Anonymous Student" });
    setSubmitting(false);
    if (dbError) { setError("Something went wrong. Please try again."); } else { setSubmitted(true); }
  };

  if (submitted) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Resource Submitted!</h2>
        <p className="text-slate-500 text-sm mb-6">Thank you! Your resource will be visible after a quick review. You are helping thousands of students!</p>
        <button onClick={() => { setSubmitted(false); setForm({ title: "", description: "", university_name: "", branch: "CSE", semester: "3", subject: "", type: "notes", file_url: "", uploaded_by: "" }); }} className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors">Upload Another</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Study Material</h1>
          <p className="text-slate-500">Share notes, PYQs, or lab manuals with students across India. Free forever.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          {error && <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Resource Title <span className="text-red-500">*</span></label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. DBMS Complete Notes - Unit 1 to 5" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Resource Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {RESOURCE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Branch</label>
              <select name="branch" value={form.branch} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">University <span className="text-red-500">*</span></label>
              <select name="university_name" value={form.university_name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" required>
                <option value="">Select University</option>
                {universities.map(u => <option key={u.id} value={u.name}>{u.short_name}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Semester</label>
              <select name="semester" value={form.semester} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject Name <span className="text-red-500">*</span></label>
            <input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Database Management Systems" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Google Drive / OneDrive Link</label>
            <input name="file_url" value={form.file_url} onChange={handleChange} placeholder="https://drive.google.com/file/..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p className="text-xs text-slate-400 mt-1">Upload your file to Google Drive and paste the shareable link here.</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description (optional)</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Brief description of what is covered..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name (optional)</label>
            <input name="uploaded_by" value={form.uploaded_by} onChange={handleChange} placeholder="Leave blank to stay anonymous" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" disabled={submitting} className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-slate-900 hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors disabled:opacity-60">
            {submitting ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Submitting...</> : <><Upload className="w-4 h-4" />Submit Resource</>}
          </button>
          <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1"><FileText className="w-3 h-3" />All resources reviewed before going live.</p>
        </form>
      </div>
    </div>
  );
};
