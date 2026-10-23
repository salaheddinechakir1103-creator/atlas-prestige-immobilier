import React, { useState } from 'react';
import { PropertyProvider, useProperties } from './context/PropertyContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { BuyPage } from './pages/BuyPage';
import { RentPage } from './pages/RentPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { FavoritesDrawer } from './components/property/FavoritesDrawer';
import { SoundAmbience } from './components/common/SoundAmbience';
import { X, CheckCircle2, Info, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentRoute, toasts, removeToast } = useProperties();
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'buy':
        return <BuyPage />;
      case 'rent':
        return <RentPage />;
      case 'property-detail':
        return <PropertyDetailPage />;
      case 'services':
        return <ServicesPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c0e] text-[#edeae5]">
      {/* Strict Top Bar Contract Header */}
      <Navbar onOpenFavorites={() => setIsFavoritesOpen(true)} />

      {/* Main Dynamic Viewport */}
      <div className="flex-grow">
        {renderCurrentPage()}
      </div>

      {/* Luxury Footer */}
      <Footer />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />

      {/* Procedural Sound Atmosphere */}
      <SoundAmbience />

      {/* Toast Notification Stack */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="p-4 bg-[#14161a]/95 border border-[#c5a880]/50 rounded-sm shadow-2xl pointer-events-auto flex items-start justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <div className="flex items-start gap-2.5">
              {toast.type === 'gold' ? (
                <Sparkles className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              ) : toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h5 className="text-xs font-serif font-medium text-white">
                  {toast.title}
                </h5>
                <p className="text-[11px] text-white/70 leading-relaxed mt-0.5">
                  {toast.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/40 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <PropertyProvider>
      <AppContent />
    </PropertyProvider>
  );
}
