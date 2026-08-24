import React, { useState } from 'react';
import { 
  FolderPlus, Folder, FolderOpen, FileText, Shield, 
  Trash2, Search, ArrowLeft, Plus, CheckCircle2, 
  Lock, Eye, Users, HardDrive, Database, Sparkles
} from 'lucide-react';

export interface CampusFolder {
  id: string;
  name: string;
  category: 'Admissions' | 'Examinations' | 'Accreditation' | 'Student Records' | 'Cybersecurity Drills';
  accessLevel: 'Registrar Confidential' | 'Faculty & Staff' | 'Public Campus';
  fileCount: number;
  size: string;
  lastModified: string;
  description: string;
}

interface AdminPanelProps {
  onBackToHome: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToHome }) => {
  const [folders, setFolders] = useState<CampusFolder[]>([
    {
      id: 'f-1',
      name: 'Admissions_Batch_2026_Verified',
      category: 'Admissions',
      accessLevel: 'Registrar Confidential',
      fileCount: 3420,
      size: '1.4 GB',
      lastModified: '24 Aug 2026, 11:30 AM',
      description: 'Centralized enrollment KYC, verified secondary certificates, and quota allocations.',
    },
    {
      id: 'f-2',
      name: 'Exam_Cell_CGPA_Ledgers_Sem5',
      category: 'Examinations',
      accessLevel: 'Registrar Confidential',
      fileCount: 890,
      size: '420 MB',
      lastModified: '24 Aug 2026, 09:15 AM',
      description: 'Digitally signed grade sheets, moderation committee notes, and backlog clearances.',
    },
    {
      id: 'f-3',
      name: 'NAAC_SSR_Cycle4_Accreditation_Audit',
      category: 'Accreditation',
      accessLevel: 'Faculty & Staff',
      fileCount: 512,
      size: '2.8 GB',
      lastModified: '23 Aug 2026, 04:45 PM',
      description: 'Criterion 1-7 quantitative data tables, student feedback metrics, and faculty ratio audits.',
    },
    {
      id: 'f-4',
      name: 'Universal_Student_ID_Credentials',
      category: 'Student Records',
      accessLevel: 'Faculty & Staff',
      fileCount: 6540,
      size: '950 MB',
      lastModified: '22 Aug 2026, 02:20 PM',
      description: 'Cryptographically hashed NFC smart badge records and active hall ticket profiles.',
    },
    {
      id: 'f-5',
      name: 'Campus_Cybersecurity_Drills_2026',
      category: 'Cybersecurity Drills',
      accessLevel: 'Public Campus',
      fileCount: 64,
      size: '48 MB',
      lastModified: '20 Aug 2026, 01:10 PM',
      description: 'Simulated phishing awareness guidelines, educational debrief modules, and reporting protocols.',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCreating, setIsCreating] = useState(false);
  const [activeFolder, setActiveFolder] = useState<CampusFolder | null>(null);

  // Form State
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderCategory, setNewFolderCategory] = useState<CampusFolder['category']>('Student Records');
  const [newFolderAccess, setNewFolderAccess] = useState<CampusFolder['accessLevel']>('Registrar Confidential');
  const [newFolderDesc, setNewFolderDesc] = useState('');

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const formattedName = newFolderName.trim().replace(/\s+/g, '_');
    const newFolder: CampusFolder = {
      id: 'f-' + Date.now(),
      name: formattedName,
      category: newFolderCategory,
      accessLevel: newFolderAccess,
      fileCount: 0,
      size: '0 KB',
      lastModified: 'Just now',
      description: newFolderDesc.trim() || 'No description provided.',
    };

    setFolders([newFolder, ...folders]);
    setNewFolderName('');
    setNewFolderDesc('');
    setIsCreating(false);
  };

  const handleDeleteFolder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this directory? All archived records will be unlinked.')) {
      setFolders(folders.filter(f => f.id !== id));
      if (activeFolder?.id === id) {
        setActiveFolder(null);
      }
    }
  };

  const filteredFolders = folders.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Admissions', 'Examinations', 'Accreditation', 'Student Records', 'Cybersecurity Drills'];

  return (
    <div className="min-h-screen bg-paper-200 text-ink font-sans">
      
      {/* Admin Top Banner */}
      <div className="bg-ink text-paper-100 border-b-2 border-ink py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 bg-paper-100 text-ink hover:bg-cjpOrange hover:text-white transition-colors border-2 border-ink font-bold flex items-center gap-1.5 shadow-brutal-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>EXIT TO PORTAL</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cjpGreen animate-ping"></span>
              <span className="font-display text-lg font-bold text-white uppercase tracking-wider">
                COLLEGE<span className="text-cjpOrange">CENTRE</span> // ADMIN CONTROL ROOT
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-paper-300">
            <span className="bg-cjpOrange text-white px-2 py-0.5 font-bold uppercase">
              ROLE: SUPER REGISTRAR
            </span>
            <span>NODE: APEX-MAIN-SRV01</span>
          </div>
        </div>
      </div>

      {/* Main Admin Workspace Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Header & Quick Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b-2 border-ink gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange bg-cjpOrange/10 px-3 py-1 border border-cjpOrange/30 inline-block mb-2">
              ★ CAMPUS DIRECTORY & DATA VAULT ★
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
              DIRECTORY ENGINE <br />
              <span className="text-cjpOrange">&amp; REPOSITORY ARCHIVE</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreating(true)}
              className="brutal-btn bg-cjpOrange text-white hover:bg-ink px-6 py-3.5 text-sm flex items-center gap-2 shadow-brutal"
            >
              <FolderPlus className="w-5 h-5" />
              <span>CREATE NEW FOLDER</span>
            </button>
          </div>
        </div>

        {/* Global Directory Overview Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="brutal-card p-4 bg-paper-50 border-2 border-ink">
            <div className="flex items-center justify-between text-xs font-mono text-ink-light uppercase">
              <span>TOTAL DIRECTORIES</span>
              <Folder className="w-4 h-4 text-cjpOrange" />
            </div>
            <div className="font-display font-black text-3xl text-ink mt-1">
              {folders.length} FOLDERS
            </div>
            <div className="text-[10px] font-mono text-cjpGreen mt-0.5">100% REGISTRAR ENCRYPTED</div>
          </div>

          <div className="brutal-card p-4 bg-paper-50 border-2 border-ink">
            <div className="flex items-center justify-between text-xs font-mono text-ink-light uppercase">
              <span>INDEXED DOCUMENTS</span>
              <FileText className="w-4 h-4 text-cjpOrange" />
            </div>
            <div className="font-display font-black text-3xl text-ink mt-1">
              {folders.reduce((acc, f) => acc + f.fileCount, 0).toLocaleString()} FILES
            </div>
            <div className="text-[10px] font-mono text-ink-light mt-0.5">SHA-256 VERIFIED</div>
          </div>

          <div className="brutal-card p-4 bg-paper-50 border-2 border-ink">
            <div className="flex items-center justify-between text-xs font-mono text-ink-light uppercase">
              <span>STORAGE CONSUMPTION</span>
              <HardDrive className="w-4 h-4 text-cjpOrange" />
            </div>
            <div className="font-display font-black text-3xl text-ink mt-1">
              5.61 GB
            </div>
            <div className="text-[10px] font-mono text-cjpGold font-bold mt-0.5">OF 200 GB ALLOCATED</div>
          </div>

          <div className="brutal-card p-4 bg-paper-50 border-2 border-ink">
            <div className="flex items-center justify-between text-xs font-mono text-ink-light uppercase">
              <span>ACCESS PROTOCOL</span>
              <Shield className="w-4 h-4 text-cjpGreen" />
            </div>
            <div className="font-display font-black text-3xl text-cjpGreen mt-1">
              RBAC v3.2
            </div>
            <div className="text-[10px] font-mono text-ink-light mt-0.5">DPDPA 2023 COMPLIANT</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-paper-100 border-2 border-ink p-4 shadow-brutal-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search folders or tags..."
              className="w-full bg-paper-50 border-2 border-ink px-3 py-2 text-sm font-sans font-medium focus:outline-none pl-9"
            />
            <Search className="w-4 h-4 text-ink-light absolute left-3 top-3" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 font-mono text-xs font-bold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={'px-3 py-1.5 border-2 border-ink uppercase transition-all whitespace-nowrap ' + (
                  selectedCategory === cat 
                    ? 'bg-cjpOrange text-white shadow-brutal-sm' 
                    : 'bg-paper-200 text-ink hover:bg-paper-50'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Create Folder Modal / Section */}
        {isCreating && (
          <div className="mb-8 brutal-card bg-paper-50 border-4 border-ink p-6 shadow-brutal-lg animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-cjpOrange" />
                <h3 className="font-display font-bold text-xl uppercase text-ink">
                  CREATE NEW ROOT DIRECTORY / FOLDER
                </h3>
              </div>
              <button
                onClick={() => setIsCreating(false)}
                className="font-mono text-xs font-bold uppercase text-ink-light hover:text-ink"
              >
                [CANCEL]
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                    Directory / Folder Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="e.g. Faculty_Appraisal_Records_2026"
                    className="w-full bg-white border-2 border-ink px-3 py-2 text-sm font-mono font-bold focus:outline-none"
                  />
                  <span className="text-[10px] font-mono text-ink-light mt-0.5 block">
                    Spaces are automatically converted to underscores.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                    Category Department
                  </label>
                  <select
                    value={newFolderCategory}
                    onChange={(e) => setNewFolderCategory(e.target.value as CampusFolder['category'])}
                    className="w-full bg-white border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none"
                  >
                    <option>Admissions</option>
                    <option>Examinations</option>
                    <option>Accreditation</option>
                    <option>Student Records</option>
                    <option>Cybersecurity Drills</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                    Access Permission Level
                  </label>
                  <select
                    value={newFolderAccess}
                    onChange={(e) => setNewFolderAccess(e.target.value as CampusFolder['accessLevel'])}
                    className="w-full bg-white border-2 border-ink px-3 py-2 text-xs font-mono font-bold focus:outline-none"
                  >
                    <option>Registrar Confidential</option>
                    <option>Faculty &amp; Staff</option>
                    <option>Public Campus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                  Folder Purpose &amp; Retention Scope
                </label>
                <input
                  type="text"
                  value={newFolderDesc}
                  onChange={(e) => setNewFolderDesc(e.target.value)}
                  placeholder="e.g. Contains verified semester grade curves and moderation audit sheets."
                  className="w-full bg-white border-2 border-ink px-3 py-2 text-sm font-sans focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="brutal-btn bg-cjpOrange text-white hover:bg-ink px-6 py-2.5 text-sm flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>INITIALIZE &amp; MOUNT DIRECTORY</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="brutal-btn bg-paper-200 text-ink hover:bg-paper-100 px-4 py-2.5 text-sm"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFolders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => setActiveFolder(folder)}
              className={'brutal-card p-6 bg-paper-50 border-2 border-ink cursor-pointer transition-all flex flex-col justify-between ' + (
                activeFolder?.id === folder.id ? 'border-cjpOrange ring-2 ring-cjpOrange shadow-brutal-lg' : ''
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-cjpOrange/10 border-2 border-ink flex items-center justify-center text-cjpOrange font-bold shadow-brutal-sm">
                      <Folder className="w-5 h-5 fill-cjpOrange/20" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase text-cjpOrange bg-cjpOrange/10 px-1.5 py-0.5 border border-cjpOrange/20">
                        {folder.category}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDeleteFolder(folder.id, e)}
                    className="p-1.5 text-ink-light hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-300 transition-colors"
                    title="Delete Directory"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-mono font-bold text-sm text-ink break-all mb-2 flex items-center gap-1.5">
                  <span>📁 /{folder.name}</span>
                </h3>

                <p className="font-sans text-xs text-ink-muted leading-relaxed line-clamp-2 mb-4">
                  {folder.description}
                </p>
              </div>

              <div className="pt-3 border-t border-ink/20 space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-ink-muted">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{folder.fileCount} Documents</span>
                  </span>
                  <span>{folder.size}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={'px-2 py-0.5 text-[9px] font-bold uppercase border ' + (
                    folder.accessLevel === 'Registrar Confidential' 
                      ? 'bg-red-50 text-red-700 border-red-200' 
                      : folder.accessLevel === 'Faculty & Staff'
                      ? 'bg-cjpGold-tint text-cjpGold border-cjpGold/30'
                      : 'bg-cjpGreen-tint text-cjpGreen border-cjpGreen/30'
                  )}>
                    {folder.accessLevel}
                  </span>
                  <span className="text-[10px] text-ink-light">{folder.lastModified}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Folder Inspection Panel */}
        {activeFolder && (
          <div className="mt-12 brutal-card bg-ink text-paper-100 p-6 sm:p-8 border-4 border-ink shadow-brutal-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-paper-100/20 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cjpOrange border-2 border-paper-100 flex items-center justify-center text-white font-bold">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-cjpOrange font-bold">
                    DIRECTORY INSPECTOR // LIVE MOUNT
                  </div>
                  <h3 className="font-mono font-bold text-xl sm:text-2xl text-white break-all">
                    /{activeFolder.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-cjpGreen text-white text-xs font-mono font-bold px-3 py-1 uppercase">
                  STATUS: MOUNTED &amp; ACTIVE
                </span>
                <button
                  onClick={() => setActiveFolder(null)}
                  className="px-3 py-1 text-xs font-mono bg-paper-100/10 hover:bg-paper-100/20 text-white uppercase border border-paper-100/30"
                >
                  CLOSE INSPECTOR
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs mb-6">
              <div className="bg-paper-100/5 p-4 border border-paper-100/10">
                <span className="text-paper-400 block text-[10px] uppercase">ACCESS POLICY</span>
                <span className="text-white font-bold text-sm">{activeFolder.accessLevel}</span>
              </div>
              <div className="bg-paper-100/5 p-4 border border-paper-100/10">
                <span className="text-paper-400 block text-[10px] uppercase">CAPACITY OCCUPIED</span>
                <span className="text-white font-bold text-sm">{activeFolder.fileCount} Objects ({activeFolder.size})</span>
              </div>
              <div className="bg-paper-100/5 p-4 border border-paper-100/10">
                <span className="text-paper-400 block text-[10px] uppercase">INTEGRITY HASH</span>
                <span className="text-cjpGreen font-bold text-xs">SHA-256: 0x8a9f...e102 [PASSED]</span>
              </div>
            </div>

            <div className="bg-black/40 p-4 border border-paper-100/10 font-mono text-xs space-y-2">
              <div className="text-paper-400 font-bold uppercase text-[10px]">
                SAMPLE MOUNTED OBJECTS IN THIS DIRECTORY:
              </div>
              <div className="flex items-center justify-between text-paper-200 py-1 border-b border-paper-100/10">
                <span>📄 record_registry_index_2026.jsonld</span>
                <span className="text-paper-400 text-[10px]">42 KB • SHA-256 Verified</span>
              </div>
              <div className="flex items-center justify-between text-paper-200 py-1 border-b border-paper-100/10">
                <span>📄 credential_signature_merkle_tree.bin</span>
                <span className="text-paper-400 text-[10px]">1.2 MB • Ledger Synced</span>
              </div>
              <div className="flex items-center justify-between text-paper-200 py-1">
                <span>📄 department_audit_trail_2026_Q3.log</span>
                <span className="text-paper-400 text-[10px]">89 KB • Immutable</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};