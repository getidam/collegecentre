import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-paper-200 text-ink flex flex-col selection:bg-cjpOrange selection:text-white">
      <TopStrip onOpenDemo={() => setDemoModalOpen(true)} />
      
      <Navbar
        onOpenDemo={() => setDemoModalOpen(true)}
        onScrollTo={scrollToSection}
        onOpenDataCollection={() => {
          setCurrentView('data_collection');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {currentView === 'data_collection' ? (
        <main className="flex-grow">
          <StudentDataCollection onBackToHome={() => {
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        </main>
      ) : (
        <main className="flex-grow">
          <HeroSection
            onOpenDemo={() => setDemoModalOpen(true)}
            onScrollTo={scrollToSection}
            onOpenDataCollection={() => {
              setCurrentView('data_collection');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
      )}

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