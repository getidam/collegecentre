import React, { useState } from 'react';
import { Menu, X, ChevronDown, GraduationCap, FileCheck, Layers, Database, ArrowUpRight, UserCheck } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
  onScrollTo: (id: string) => void;
  onOpenDataCollection: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onScrollTo, onOpenDataCollection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modulesDropdownOpen, setModulesDropdownOpen] = useState(false);

  const navItems = [
    { label: 'Vision', target: 'vision' },
    { label: '5 Directives', target: 'manifesto' },
    { label: 'Modules', target: 'modules', hasDropdown: true },
    { label: 'ID Generator', target: 'id-generator', badge: 'Interactive' },
    { label: 'Live Metrics', target: 'metrics' },
    { label: 'Accreditation', target: 'checklist' },
    { label: 'FAQ', target: 'faq' },
  ];

  const moduleItems = [
    { title: 'Student Information System (SIS)', desc: 'Unified profiles, digital document vaults & KYC', icon: GraduationCap },
    { title: 'Examination & CGPA Engine', desc: 'Tamper-proof grade curves & transcript ledger', icon: FileCheck },
    { title: 'Smart Attendance & Timetable', desc: 'Biometric, RFID & geo-fenced classroom logs', icon: Layers },
    { title: 'Fee Escrow & Automated Invoicing', desc: 'Multi-gateway reconciliation & scholarships', icon: Database },
  ];

  const handleNavClick = (target: string) => {
    onScrollTo(target);
    setMobileMenuOpen(false);
    setModulesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-paper-100 border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-cjpOrange border-2 border-ink flex items-center justify-center text-paper-100 font-display text-2xl font-bold shadow-brutal-sm group-hover:bg-ink group-hover:text-paper-100 transition-all">
              CC
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-ink uppercase leading-none">
                  COLLEGE<span className="text-cjpOrange">CENTRE</span>
                </span>
                <span className="bg-ink text-paper-200 text-[10px] font-mono px-1.5 py-0.5 font-bold uppercase tracking-wider hidden sm:inline-block">
                  EST. 2026
                </span>
              </div>
              <span className="text-[11px] font-mono text-ink-light tracking-wide font-medium mt-0.5">
                STUDENT LIFECYCLE & DATA OS
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs uppercase font-bold tracking-wider text-ink">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setModulesDropdownOpen(true)}
                    onMouseLeave={() => setModulesDropdownOpen(false)}
                  >
                    <button 
                      onClick={() => handleNavClick(item.target)}
                      className="px-3 py-2 hover:bg-ink hover:text-paper-100 transition-colors flex items-center gap-1 border border-transparent hover:border-ink"
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {modulesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 bg-paper-100 border-2 border-ink shadow-brutal p-2 z-50">
                        <div className="text-[10px] font-mono text-ink-light px-2 py-1 uppercase border-b border-ink/20 mb-1">
                          University OS Modules
                        </div>
                        {moduleItems.map((mod) => (
                          <div 
                            key={mod.title}
                            onClick={() => handleNavClick('modules')}
                            className="p-2.5 hover:bg-paper-200 cursor-pointer border border-transparent hover:border-ink/20 transition-all mb-1"
                          >
                            <div className="flex items-center gap-2 text-ink font-display font-semibold text-sm">
                              <mod.icon className="w-4 h-4 text-cjpOrange" />
                              <span>{mod.title}</span>
                            </div>
                            <p className="text-[11px] font-sans normal-case text-ink-muted mt-0.5 font-normal">
                              {mod.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.target)}
                    className="px-3 py-2 hover:bg-ink hover:text-paper-100 transition-colors relative group border border-transparent hover:border-ink"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-1.5 -right-1 bg-cjpGreen text-white text-[8px] px-1 py-0.2 font-mono uppercase tracking-tighter">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenDataCollection}
              className="brutal-btn bg-paper-200 text-ink hover:bg-paper-50 px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border-2 border-ink shadow-brutal-sm"
            >
              <UserCheck className="w-3.5 h-3.5 text-cjpOrange" />
              <span>Student Form</span>
            </button>

            <button
              onClick={onOpenDemo}
              className="brutal-btn bg-cjpOrange text-paper-100 hover:bg-ink px-4 py-2 text-sm font-display tracking-wider flex items-center gap-1.5"
            >
              <span>Deploy Campus</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-ink bg-paper-200 text-ink shadow-brutal-sm focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-paper-100 border-b-2 border-ink px-4 pt-3 pb-6 space-y-3 font-mono">
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDataCollection();
              }}
              className="w-full text-left px-3 py-2.5 text-sm uppercase font-bold border-b border-ink/10 bg-cjpOrange/10 text-cjpOrange flex items-center justify-between"
            >
              <span>★ STUDENT DATA COLLECTION FORM</span>
              <span className="bg-cjpOrange text-white text-[9px] px-1.5 py-0.5">NEW</span>
            </button>

            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.target)}
                className="w-full text-left px-3 py-2.5 text-sm uppercase font-bold border-b border-ink/10 hover:bg-ink hover:text-paper-100 flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-cjpGreen text-white text-[9px] px-1.5 py-0.5">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDataCollection();
              }}
              className="w-full brutal-btn bg-paper-100 text-ink border-2 border-ink py-2.5 text-sm text-center font-bold"
            >
              FILL STUDENT DATA FORM →
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full brutal-btn bg-cjpOrange text-white py-3 text-base text-center"
            >
              DEPLOY UNIVERSITY OS →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};