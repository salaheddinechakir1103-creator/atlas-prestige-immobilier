import React, { useState } from 'react';
import { useProperties, AppRoute } from '../../context/PropertyContext';
import { Heart, ShieldCheck, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFavorites }) => {
  const { currentRoute, navigateTo, favorites } = useProperties();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; route: AppRoute }[] = [
    { label: 'Accueil', route: 'home' },
    { label: 'Acheter', route: 'buy' },
    { label: 'Louer', route: 'rent' },
    { label: 'Services', route: 'services' },
    { label: 'À Propos', route: 'about' },
    { label: 'Contact', route: 'contact' }
  ];

  const handleNavClick = (route: AppRoute) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d0e]/95 border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 xl:gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-lg sm:text-2xl xl:text-3xl font-serif tracking-[0.10em] sm:tracking-[0.18em] uppercase text-white hover:text-[#c5a880] transition-colors whitespace-nowrap shrink-0 text-left"
        >
          Atlas Prestige
        </button>

        {/* Zone 2: Clean single-line text links */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-8 text-xs uppercase tracking-[0.2em] font-medium text-white/70">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  isActive ? 'text-[#c5a880]' : 'hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#c5a880]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Utilities */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Favorites Button with Counter */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
            title="Votre sélection confidentielle"
            aria-label="Favoris"
          >
            <Heart className="w-4 h-4" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c5a880] text-black text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Admin Dashboard Entry */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider rounded-sm transition-colors ${
              currentRoute === 'admin'
                ? 'bg-white/15 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            title="Espace Direction / Admin"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
            <span className="text-[11px]">Régie</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium bg-[#c5a880] text-black hover:bg-[#d6bc95] transition-colors whitespace-nowrap shrink-0 rounded-sm"
          >
            <span>Visite Privée</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-white hover:text-[#c5a880]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0e1013] border-b border-white/10 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`text-left text-sm uppercase tracking-[0.18em] py-2 border-b border-white/5 ${
                  currentRoute === link.route ? 'text-[#c5a880] font-semibold' : 'text-white/80'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left text-sm uppercase tracking-[0.18em] py-2 border-b border-white/5 text-[#c5a880] flex items-center justify-between"
            >
              <span>Espace Régie & Admin</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="mt-2 w-full py-3 text-xs uppercase tracking-[0.18em] bg-[#c5a880] text-black font-semibold text-center rounded-sm"
            >
              Organiser une Visite VIP
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
