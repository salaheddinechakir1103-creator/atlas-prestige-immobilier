import React from 'react';
import { useProperties } from '../../context/PropertyContext';
import { PropertyCity, PropertyType } from '../../types/property';
import { Search, SlidersHorizontal, RotateCcw, X } from 'lucide-react';

export const PropertyFilters: React.FC = () => {
  const { filters, setFilters, resetFilters, properties } = useProperties();

  const cities: (PropertyCity | 'all')[] = [
    'all',
    'Marrakech',
    'Casablanca',
    'Tanger',
    'Rabat',
    'Essaouira',
    'Agadir'
  ];

  const cityLabels: Record<string, string> = {
    all: 'Toutes les Villes',
    Marrakech: 'Marrakech',
    Casablanca: 'Casablanca',
    Tanger: 'Tanger',
    Rabat: 'Rabat',
    Essaouira: 'Essaouira',
    Agadir: 'Agadir'
  };

  const propertyTypes: (PropertyType | 'all')[] = [
    'all',
    'Villa d\'Architecte',
    'Penthouse',
    'Riad Contemporain',
    'Domaine Privé',
    'Propriété Côtière'
  ];

  return (
    <div className="bg-[#121418] border border-white/10 rounded-sm p-5 space-y-6">
      {/* Top Bar: Search + Category Segments + Reset */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Rechercher par nom, architecte, quartier (ex: Palmeraie, Anfa, Ko)..."
            className="w-full pl-10 pr-9 py-2.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c5a880]"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Segmented Control (Rule A: functional interactive button segments) */}
        <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-sm shrink-0">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap ${
              filters.category === 'all'
                ? 'bg-[#c5a880] text-black font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Tous les Biens
          </button>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, category: 'achat' }))}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap ${
              filters.category === 'achat'
                ? 'bg-[#c5a880] text-black font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Ventes de Prestige
          </button>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, category: 'location' }))}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap ${
              filters.category === 'location'
                ? 'bg-[#c5a880] text-black font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Locations Privées
          </button>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-[#c5a880]"
          >
            <option value="newest">Sélection Atlas (Par défaut)</option>
            <option value="price-asc">Prix : Croissant</option>
            <option value="price-desc">Prix : Décroissant</option>
            <option value="surface-desc">Superficie : Décroissante</option>
          </select>

          <button
            onClick={resetFilters}
            className="p-2 text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-sm"
            title="Réinitialiser les filtres"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* City Filter Pills */}
      <div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {cities.map((city) => {
            const active = filters.city === city;
            return (
              <button
                key={city}
                onClick={() => setFilters((prev) => ({ ...prev, city }))}
                className={`px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cityLabels[city]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Row: Typology & Key Amenities */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Typology */}
        <div className="flex items-center gap-2">
          <span className="text-white/40 uppercase tracking-wider text-[10px]">
            Typologie :
          </span>
          <select
            value={filters.type}
            onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value as any }))}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
          >
            <option value="all">Tous les types de résidences</option>
            {propertyTypes.filter((t) => t !== 'all').map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms Min */}
        <div className="flex items-center gap-1.5">
          <span className="text-white/40 uppercase tracking-wider text-[10px]">
            Chambres min :
          </span>
          {[0, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setFilters((prev) => ({ ...prev, minBedrooms: num }))}
              className={`w-7 h-7 rounded-sm flex items-center justify-center transition-colors ${
                filters.minBedrooms === num
                  ? 'bg-[#c5a880] text-black font-semibold'
                  : 'bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              {num === 0 ? 'Tous' : `${num}+`}
            </button>
          ))}
        </div>

        {/* Key Amenities */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer text-white/70 hover:text-white">
            <input
              type="checkbox"
              checked={!!filters.amenities.pool}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  amenities: { ...prev.amenities, pool: e.target.checked ? true : undefined }
                }))
              }
              className="accent-[#c5a880]"
            />
            <span>Piscine</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-white/70 hover:text-white">
            <input
              type="checkbox"
              checked={!!filters.amenities.hammam}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  amenities: { ...prev.amenities, hammam: e.target.checked ? true : undefined }
                }))
              }
              className="accent-[#c5a880]"
            />
            <span>Hammam</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-white/70 hover:text-white">
            <input
              type="checkbox"
              checked={!!filters.amenities.seaView}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  amenities: { ...prev.amenities, seaView: e.target.checked ? true : undefined }
                }))
              }
              className="accent-[#c5a880]"
            />
            <span>Vue Mer</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-white/70 hover:text-white">
            <input
              type="checkbox"
              checked={!!filters.amenities.atlasView}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  amenities: { ...prev.amenities, atlasView: e.target.checked ? true : undefined }
                }))
              }
              className="accent-[#c5a880]"
            />
            <span>Vue Atlas</span>
          </label>
        </div>
      </div>
    </div>
  );
};
