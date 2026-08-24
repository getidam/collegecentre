import { useState, useEffect, lazy, Suspense } from 'react';
import { TopStrip } from './components/TopStrip';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { StudentCardGenerator } from './components/StudentCardGenerator';
import { VisionSection } from './components/VisionSection';
import { ManifestoSection } from './components/ManifestoSection';
import { LiveMetricsSection } from './components/LiveMetricsSection';
import { ModulesSection } from './components/ModulesSection';
import { ChecklistSection } from './components/ChecklistSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { DemoModal } from './components/DemoModal';
import { Footer } from './components/Footer';
import { getSubdomain } from './lib/subdomain';

// Lazy-load heavy components — only download when actually needed
const StudentDataCollection = lazy(() => import('./components/StudentDataCollection').then(m => ({ default: m.StudentDataCollection })));
const AdminPortal = lazy(() => import('./components/AdminPortal').then(m => ({ default: m.AdminPortal })));

const PageLoader = () => (
  <div className="min-h-screen bg-navy-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-navy-400 text-sm font-medium">Loading...</span>
    </div>
  </div>
);

export function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const detectedSubdomain = getSubdomain();

  const [currentView, setCurrentView] = useState<'landing' | 'data_collection' | 'admin'>(() => {
    if (typeof window === 'undefined') return 'landing';
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (path.includes('admin') || search.includes('admin') || hash.includes('admin')) {
      return 'admin';
    }
    // Any subdomain or direct form query/path directly renders the dedicated form
    if (detectedSubdomain) {
      return 'data_collection';
    }
    if (
      path.includes('form') ||
      path.includes('register') ||
      path.includes('student') ||
      path.includes('portal') ||
      search.includes('form') ||
      search.includes('register') ||
      hash.includes('form')
    ) {
      return 'data_collection';
    }
    return 'landing';
  });

  const [activeCampusSlug, setActiveCampusSlug] = useState<string | undefined>(detectedSubdomain || undefined);

  // Detect URL path or parameter on initial load
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    const detectedCampus = getSubdomain();

    if (detectedCampus) {
      setActiveCampusSlug(detectedCampus);
      if (!path.includes('admin') && !search.includes('admin') && !hash.includes('admin')) {
        setCurrentView('data_collection');
        return;
      }
    }

    if (
      path.includes('admin') ||
      path.includes('record') ||
      path.includes('portal-admin') ||
      search.includes('admin') ||
      search.includes('record') ||
      hash.includes('admin') ||
      hash.includes('record')
    ) {
      setCurrentView('admin');
    } else if (
      detectedCampus ||
      path.includes('form') ||
      path.includes('register') ||
      path.includes('student') ||
      path.includes('portal') ||
      search.includes('form') ||
      search.includes('register') ||
      hash.includes('form') ||
      hash.includes('register')
    ) {
      setCurrentView('data_collection');
    }

    const handlePopState = () => {
      const p = window.location.pathname.toLowerCase();
      const dSub = getSubdomain();
      if (p.includes('admin') || p.includes('record')) {
        setCurrentView('admin');
      } else if (dSub || p.includes('form') || p.includes('register') || p.includes('student')) {
        setCurrentView('data_collection');
      } else {
        setCurrentView('landing');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setCurrentView(prev => (prev === 'admin' ? (detectedCampus ? 'data_collection' : 'landing') : 'admin'));
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const openDataCollectionPage = (campusSlug?: string) => {
    if (campusSlug) {
      setActiveCampusSlug(campusSlug);
    }
    setCurrentView('data_collection');
    try {
      if (campusSlug && campusSlug !== 'main') {
        window.history.pushState({}, '', `/?campus=${campusSlug}`);
      } else {
        window.history.pushState({}, '', '/form');
      }
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAdminPage = () => {
    setCurrentView('admin');
    try {
      window.history.pushState({}, '', '/admin');
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToLandingPage = () => {
    if (detectedSubdomain) {
      // If on a custom subdomain, redirect to central university
      window.location.href = 'https://collegecentre.in';
      return;
    }
    setActiveCampusSlug(undefined);
    setCurrentView('landing');
    try {
      window.history.pushState({}, '', '/');
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // IF ON STUDENT DATA COLLECTION PAGE: Render ONLY the form page
  if (currentView === 'data_collection') {
    return (
      <Suspense fallback={<PageLoader />}>
        <StudentDataCollection 
          onBackToHome={backToLandingPage} 
          campusSlug={activeCampusSlug}
        />
      </Suspense>
    );
  }

  // IF ON ADMIN / REGISTRAR PORTAL: Render ONLY the Admin Data Directory
  if (currentView === 'admin') {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminPortal 
          onBackToHome={backToLandingPage} 
          onOpenDataCollection={openDataCollectionPage} 
        />
      </Suspense>
    );
  }

  // OTHERWISE: Render the Minimal, Serious University Landing Page
  return (
    <div className="min-h-screen bg-white text-navy-900 flex flex-col font-sans selection:bg-brand-600 selection:text-white">
      <TopStrip onOpenDemo={() => setDemoModalOpen(true)} />
      
      <Navbar
        onOpenDemo={() => setDemoModalOpen(true)}
        onScrollTo={scrollToSection}
        onOpenDataCollection={openDataCollectionPage}
        onOpenAdmin={openAdminPage}
      />

      <main className="flex-grow">
        <HeroSection
          onOpenDemo={() => setDemoModalOpen(true)}
          onScrollTo={scrollToSection}
          onOpenDataCollection={openDataCollectionPage}
        />
        <LiveMetricsSection />
        <StudentCardGenerator />
        <ModulesSection />
        <VisionSection />
      </main>

      <Footer
        onScrollTo={scrollToSection}
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenDataCollection={openDataCollectionPage}
        onOpenAdmin={openAdminPage}
      />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}

export default App;