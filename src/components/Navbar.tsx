import { useState } from 'react';
import { GraduationCap, Upload, Bell, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const navLinks = [
  { label: 'Notes & PYQs', view: 'resources' },
  { label: 'Internships', view: 'internships' },
  { label: 'Scholarships', view: 'scholarships' },
  { label: 'Forum', view: 'forum' },
];

export function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (view: string) => {
    onNavigate(view);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="w-8 h-8 bg-[#0f172a] rounded-lg flex items-center justify-center group-hover:bg-[#1e3a5f] transition-colors">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-[#0f172a] font-bold text-lg tracking-tight">
              College<span className="text-[#0c8ee9]">Centre</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavigate(link.view)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#0c8ee9]/10 text-[#0c8ee9] font-semibold'
                      : 'text-gray-600 hover:text-[#0f172a] hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="block h-0.5 bg-[#0c8ee9] rounded-full mt-0.5 -mb-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavigate('upload')}
              className="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-[#0c8ee9] text-[#0c8ee9] text-sm font-semibold hover:bg-[#0c8ee9]/5 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Notes
            </button>
            <button
              onClick={() => handleNavigate('alerts')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#0f172a] text-white text-sm font-semibold hover:bg-[#1e3a5f] transition-colors"
            >
              <Bell className="w-4 h-4" />
              Get Alerts
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#0f172a] hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavigate(link.view)}
                  className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0c8ee9]/10 text-[#0c8ee9] font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#0f172a]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
          <div className="px-4 pb-4 pt-2 flex flex-col gap-2 border-t border-gray-100">
            <button
              onClick={() => handleNavigate('upload')}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md border-2 border-[#0c8ee9] text-[#0c8ee9] text-sm font-semibold hover:bg-[#0c8ee9]/5 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Notes
            </button>
            <button
              onClick={() => handleNavigate('alerts')}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-[#0f172a] text-white text-sm font-semibold hover:bg-[#1e3a5f] transition-colors"
            >
              <Bell className="w-4 h-4" />
              Get Alerts
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
