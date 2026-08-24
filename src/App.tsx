import React, { useState } from 'react';
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

export function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-paper-200 text-ink flex flex-col selection:bg-cjpOrange selection:text-white">
      {/* Top Urgent Campaign Strip */}
      <TopStrip onOpenDemo={() => setDemoModalOpen(true)} />

      {/* Main Sticky Navbar */}
      <Navbar
        onOpenDemo={() => setDemoModalOpen(true)}
        onScrollTo={scrollToSection}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection
          onOpenDemo={() => setDemoModalOpen(true)}
          onScrollTo={scrollToSection}
        />

        {/* Marquee Ticker */}
        <MarqueeTicker />

        {/* Interactive Digital Student & University Pass Generator */}
        <StudentCardGenerator />

        {/* Vision / Chapter One */}
        <VisionSection />

        {/* Manifesto / The 5 Directives */}
        <ManifestoSection />

        {/* Live Campus Telemetry Metrics */}
        <LiveMetricsSection />

        {/* Modular Campus OS Showcase */}
        <ModulesSection />

        {/* Accreditation & Readiness Checklist */}
        <ChecklistSection onOpenDemo={() => setDemoModalOpen(true)} />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Brutalist Footer with Tricolor Ribbon */}
      <Footer
        onScrollTo={scrollToSection}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      {/* Campus Onboarding Demo Modal */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}

export default App;

