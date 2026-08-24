import React, { useState } from 'react';
import { Menu, X, ChevronDown, GraduationCap, FileCheck, Layers, Database, ArrowRight, UserCheck, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
  onScrollTo: (id: string) => void;
  onOpenDataCollection: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onScrollTo, onOpenDataCollection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modulesDropdownOpen, setModulesDropdownOpen] = useState(false);

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
    { title: 'Student Information System (SIS)', desc: 'Unified digital student registry, documents & KYC ledger', icon: GraduationCap },
    { title: 'Examination & CGPA Engine', desc: 'Auto-moderation grading curves & cryptographic transcripts', icon: FileCheck },
    { title: 'Smart Attendance & Timetable', desc: 'Biometric, RFID & geo-verified lecture tracking', icon: Layers },
    { title: 'Fee Escrow & Direct Invoicing', desc: 'Automated scholarship adjustments & instant reconciliations', icon: Database },
  ];

  const handleNavClick = (target: string) => {
    onScrollTo(target);
    setMobileMenuOpen(false);
    setModulesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-navy-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Logo & University Emblem */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-900 via-navy-800 to-brand-700 flex items-center justify-center text-white font-display font-bold text-lg shadow-sm group-hover:shadow-md transition-all">
              <Shield className="w-5 h-5 text-brand-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl tracking-tight text-navy-950">
                  College<span className="text-brand-600">Centre</span>
                </span>
                <span className="bg-navy-100 text-navy-700 text-[10px] px-2 py-0.5 rounded-full font-semibold hidden sm:inline-block">
                  Higher Ed OS
                </span>
              </div>
              <span className="text-[11px] text-navy-500 font-medium tracking-wide">
                Unified Academic Infrastructure
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
              className="univ-btn-secondary text-xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Student Admission Form</span>
            </button>

            <button
              onClick={onOpenDemo}
              className="univ-btn-primary text-xs"
            >
              <span>Deploy Campus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-navy-700 hover:bg-navy-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-navy-200 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDataCollection();
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold bg-brand-50 text-brand-700 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Student Admission Form
              </span>
              <span className="text-[10px] bg-brand-200 text-brand-800 px-2 py-0.5 rounded-full font-bold">Portal</span>
            </button>

            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.target)}
                className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-navy-700 hover:bg-navy-50 hover:text-navy-950"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-navy-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full univ-btn-primary py-3"
            >
              Request Institutional Sandbox →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
