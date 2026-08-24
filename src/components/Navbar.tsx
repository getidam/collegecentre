import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, GraduationCap, FileCheck, Layers, Database, ArrowRight, UserCheck, Shield, Users } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
  onScrollTo: (id: string) => void;
  onOpenDataCollection: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onScrollTo, onOpenDataCollection, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modulesDropdownOpen, setModulesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Architecture', target: 'vision' },
    { label: 'Core Standards', target: 'manifesto' },
    { label: 'Modules', target: 'modules', hasDropdown: true },
    { label: 'Digital ID Pass', target: 'id-generator' },
    { label: 'Campus Network', target: 'metrics' },
    { label: 'Accreditation', target: 'checklist' },
    { label: 'FAQ', target: 'faq' },
  ];

  const moduleItems = [
    { title: 'Student Information System (SIS)', desc: 'Unified digital student registry & KYC', icon: GraduationCap },
    { title: 'Examination & CGPA Engine', desc: 'Auto-moderation grading curves & transcripts', icon: FileCheck },
    { title: 'Smart Attendance & Timetable', desc: 'Biometric, RFID & geo-verified logs', icon: Layers },
    { title: 'Fee Escrow & Direct Invoicing', desc: 'Scholarship adjustments & instant reconciliation', icon: Database },
  ];

  const handleNavClick = (target: string) => {
    onScrollTo(target);
    setMobileMenuOpen(false);
    setModulesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-navy-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & University Emblem */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-navy-900 via-navy-800 to-brand-700 flex items-center justify-center text-white font-display font-bold text-base sm:text-lg shadow-sm group-hover:shadow-md transition-all">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-brand-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-navy-950">
                  College<span className="text-brand-600">Centre</span>
                </span>
                <span className="bg-navy-100 text-navy-700 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-semibold hidden xs:inline-block">
                  Higher Ed
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-navy-500 font-medium tracking-wide leading-none">
                Academic Infrastructure
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-navy-700">
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
                      className="px-3.5 py-2 rounded-lg hover:bg-navy-50 hover:text-navy-950 transition-colors flex items-center gap-1"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </button>

                    {modulesDropdownOpen && (
                      <div className="absolute top-full left-0 w-84 bg-white border border-navy-200 rounded-2xl shadow-card-hover p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="text-[11px] font-semibold text-navy-400 px-3 py-1.5 uppercase tracking-wider">
                          Campus Operating Modules
                        </div>
                        {moduleItems.map((mod) => (
                          <div 
                            key={mod.title}
                            onClick={() => handleNavClick('modules')}
                            className="p-2.5 rounded-xl hover:bg-navy-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2.5 text-navy-900 font-semibold text-sm">
                              <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                                <mod.icon className="w-4 h-4" />
                              </div>
                              <span>{mod.title}</span>
                            </div>
                            <p className="text-xs text-navy-500 mt-1 pl-9">
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
                    className="px-3.5 py-2 rounded-lg hover:bg-navy-50 hover:text-navy-950 transition-colors"
                  >
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenDataCollection}
              className="univ-btn-secondary text-xs px-3.5 py-2"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Student Admission Portal</span>
            </button>

            <button
              onClick={onOpenDemo}
              className="univ-btn-primary text-xs px-4 py-2"
            >
              <span>Deploy Campus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenDataCollection}
              className="text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Admission</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-navy-700 hover:bg-navy-100 focus:outline-none transition-colors border border-navy-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-50 bg-navy-950/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
          <div className="bg-white border-b border-navy-200 px-4 pt-4 pb-8 space-y-3.5 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-modal">
            
            {/* Student Admission Form */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDataCollection();
              }}
              className="w-full text-left p-3.5 rounded-xl bg-brand-50 border border-brand-200/80 text-brand-800 flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-navy-950">Student Admission Portal</div>
                  <div className="text-[11px] text-brand-600">Central intake data submission</div>
                </div>
              </div>
              <span className="text-[10px] bg-brand-200/70 text-brand-800 px-2 py-0.5 rounded-full font-bold">Portal</span>
            </button>

            {/* Navigation links */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-navy-400 uppercase tracking-wider px-3 py-1">
                Navigation
              </div>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.target)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-navy-700 hover:bg-navy-50 hover:text-navy-950 active:bg-navy-100 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-navy-400" />
                </button>
              ))}
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-3 border-t border-navy-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full univ-btn-primary py-3 text-sm"
              >
                Request Institutional Sandbox →
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
