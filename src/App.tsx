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

export function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'data_collection'>('landing');

  // Detect URL path or parameter on initial load (e.g., /form or /register or ?page=form)
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (
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
      if (p.includes('form') || p.includes('register') || p.includes('student')) {
        setCurrentView('data_collection');
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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

  // IF ON STUDENT DATA COLLECTION PAGE: Render ONLY the form page (completely isolated, no landing page elements)
  if (currentView === 'data_collection') {
    return <StudentDataCollection onBackToHome={backToLandingPage} />;
  }

  // OTHERWISE: Render the Landing Page
  return (
    <div className="min-h-screen bg-paper-200 text-ink flex flex-col selection:bg-cjpOrange selection:text-white">
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
        <MarqueeTicker />
        <StudentCardGenerator />
        <VisionSection />
        <ManifestoSection />
        <LiveMetricsSection />
        <ModulesSection />
        <ChecklistSection onOpenDemo={() => setDemoModalOpen(true)} />
        <TestimonialsSection />
        <FAQSection />
      </main>

      <Footer
        onScrollTo={scrollToSection}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}

export default App;