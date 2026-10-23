import React from 'react';
import { LuxuryVillaCanvas } from '../3d/LuxuryVillaCanvas';
import { useProperties } from '../../context/PropertyContext';
import { ArrowDown, ArrowUpRight, Compass, Shield } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useProperties();

  const scrollToCollection = () => {
    const el = document.getElementById('collection-signature');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('buy');
    }
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[640px] max-h-[1000px] overflow-hidden bg-[#0c0d0e]">
      {/* 3D Master Interactive Villa Scene */}
      <LuxuryVillaCanvas className="w-full h-full" />

      {/* Editorial Floating Overlay (Clean Top Left / Center, leaves 3D center visible) */}
      <div className="absolute top-12 left-6 right-6 md:left-12 pointer-events-none z-10 max-w-2xl">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#c5a880] font-medium">
            <span>Maison Foncière Fondée au Maroc</span>
            <span aria-hidden="true">·</span>
            <span>Édition 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white tracking-tight leading-[0.98] drop-shadow-md">
            Architecture <br />
            <span className="italic font-normal text-[#dfd4c4]">You Can Feel.</span>
          </h1>

          <p className="text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed pt-2 drop-shadow">
            Immergez-vous dans l'univers d'Atlas Prestige : une collection confidentielle de villas de maîtres, riads contemporains et penthouses sculptés dans la lumière marocaine.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 pointer-events-auto">
            <button
              onClick={scrollToCollection}
              className="px-6 py-3 text-xs uppercase tracking-[0.18em] font-semibold bg-[#c5a880] text-black hover:bg-[#d6bc95] transition-colors rounded-sm flex items-center gap-2 shadow-xl"
            >
              <span>Explorer la Collection</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium text-white hover:text-[#c5a880] bg-black/40 hover:bg-black/60 border border-white/20 transition-colors rounded-sm flex items-center gap-2 backdrop-blur-sm"
            >
              <span>Demande Hors-Marché</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom KPI Strip */}
      <div className="absolute bottom-6 right-6 lg:right-12 z-10 hidden md:flex items-center gap-8 pointer-events-none text-right">
        <div>
          <span className="block text-xl font-serif text-white tabular-nums">
            2.4 Md MAD
          </span>
          <span className="text-[10px] uppercase tracking-wider text-white/50">
            Volume de Mandats Exclusifs
          </span>
        </div>
        <div className="h-8 w-[1px] bg-white/20" />
        <div>
          <span className="block text-xl font-serif text-white tabular-nums">
            18 Domaines
          </span>
          <span className="text-[10px] uppercase tracking-wider text-white/50">
            Sélection Privée Actuelle
          </span>
        </div>
        <div className="h-8 w-[1px] bg-white/20" />
        <div>
          <span className="block text-xl font-serif text-[#c5a880] tabular-nums">
            100 % Discrétion
          </span>
          <span className="text-[10px] uppercase tracking-wider text-white/50">
            Protocole Diplomatique
          </span>
        </div>
      </div>
    </section>
  );
};
