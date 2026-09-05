import { useState, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';

const HeroSection = lazy(() => import('./components/HeroSection').then(m => ({ default: m.HeroSection })));
const ResourcesPage = lazy(() => import('./components/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const InternshipsPage = lazy(() => import('./components/InternshipsPage').then(m => ({ default: m.InternshipsPage })));
const ScholarshipsPage = lazy(() => import('./components/ScholarshipsPage').then(m => ({ default: m.ScholarshipsPage })));
const ForumPage = lazy(() => import('./components/ForumPage').then(m => ({ default: m.ForumPage })));
const UploadPage = lazy(() => import('./components/UploadPage').then(m => ({ default: m.UploadPage })));

const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-slate-400 text-sm font-medium">Loading CollegeCentre...</span>
    </div>
  </div>
);

export type View = 'home' | 'resources' | 'internships' | 'scholarships' | 'forum' | 'upload' | 'alerts';

export function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigate = (view: string) => {
    if (view === 'alerts') {
      setCurrentView('scholarships');
    } else {
      setCurrentView(view as View);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentView) {
      case 'resources': return <ResourcesPage />;
      case 'internships': return <InternshipsPage />;
      case 'scholarships': 
      case 'alerts':
        return <ScholarshipsPage />;
      case 'forum': return <ForumPage />;
      case 'upload': return <UploadPage />;
      default: return <HeroSection onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar currentView={currentView} onNavigate={navigate} />
      
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-white font-extrabold text-lg tracking-tight">CollegeCentre</h3>
            <p className="text-xs text-slate-400 mt-1">
              All-in-one student resource hub · Free notes, PYQs, internships, and student community.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-300">
            <button onClick={() => navigate('resources')} className="hover:text-white transition-colors">Study Material</button>
            <button onClick={() => navigate('internships')} className="hover:text-white transition-colors">Internships</button>
            <button onClick={() => navigate('scholarships')} className="hover:text-white transition-colors">Scholarships</button>
            <button onClick={() => navigate('forum')} className="hover:text-white transition-colors">Campus Forum</button>
            <button onClick={() => navigate('upload')} className="hover:text-white transition-colors">Contribute</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
          © 2026 CollegeCentre · Built with pride for Indian college students 🇮🇳
        </div>
      </footer>
    </div>
  );
}

export default App;
