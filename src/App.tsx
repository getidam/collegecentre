import { useState, useEffect } from 'react';
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
import { StudentDataCollection } from './components/StudentDataCollection';
import { AdminPortal } from './components/AdminPortal';

export function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'data_collection' | 'admin'>('landing');

  // Detect URL path or parameter on initial load
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (
      path.includes('admin') ||
      path.includes('record') ||
      path.includes('portal') ||
      search.includes('admin') ||
      search.includes('record') ||
      hash.includes('admin') ||
      hash.includes('record')
    ) {
      setCurrentView('admin');
    } else if (
      path.includes('form') ||
      path.includes('register') ||
      path.includes('student') ||
      search.includes('form') ||
      search.includes('register') ||
      hash.includes('form') ||
      hash.includes('register')
    ) {
      setCurrentView('data_collection');
    }

    const handlePopState = () => {
      const p = window.location.pathname.toLowerCase();
      if (p.includes('admin') || p.includes('record') || p.includes('portal')) {
        setCurrentView('admin');
      } else if (p.includes('form') || p.includes('register') || p.includes('student')) {
        setCurrentView('data_collection');
      } else {
        setCurrentView('landing');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setCurrentView(prev => (prev === 'admin' ? 'landing' : 'admin'));
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const openDataCollectionPage = () => {
    setCurrentView('data_collection');
    try {
      window.history.pushState({}, '', '/form');
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
      <StudentDataCollection 
        onBackToHome={backToLandingPage} 
      />
    );
  }

  // IF ON ADMIN / REGISTRAR PORTAL: Render ONLY the Admin Data Directory
  if (currentView === 'admin') {
    return (
      <AdminPortal 
        onBackToHome={backToLandingPage} 
        onOpenDataCollection={openDataCollectionPage} 
      />
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
      />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}

export default App;