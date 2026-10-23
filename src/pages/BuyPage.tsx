import React, { useMemo } from 'react';
import { useProperties } from '../context/PropertyContext';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyFilters } from '../components/property/PropertyFilters';
import { Building2, RotateCcw } from 'lucide-react';

export const BuyPage: React.FC = () => {
  const { properties, filters, resetFilters } = useProperties();

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Category check (must match 'achat' or if user forced 'all')
      if (filters.category === 'location') return false;

      // City filter
      if (filters.city !== 'all' && p.city !== filters.city) return false;

      // Typology filter
      if (filters.type !== 'all' && p.type !== filters.type) return false;

      // Bedrooms
      if (filters.minBedrooms > 0 && p.bedrooms < filters.minBedrooms) return false;

      // Amenities filter
      if (filters.amenities.pool && !p.amenities.pool) return false;
      if (filters.amenities.hammam && !p.amenities.hammam) return false;
      if (filters.amenities.seaView && !p.amenities.seaView) return false;
      if (filters.amenities.atlasView && !p.amenities.atlasView) return false;
      if (filters.amenities.golfView && !p.amenities.golfView) return false;

      // Search keyword
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchDistrict = p.district.toLowerCase().includes(query);
        const matchCity = p.city.toLowerCase().includes(query);
        const matchArch = p.architect?.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        if (!matchTitle && !matchDistrict && !matchCity && !matchArch && !matchDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.priceMAD - b.priceMAD;
      if (filters.sortBy === 'price-desc') return b.priceMAD - a.priceMAD;
      if (filters.sortBy === 'surface-desc') return b.surfaceLivingM2 - a.surfaceLivingM2;
      return 0; // Default curated order
    });
  }, [properties, filters]);

  return (
    <main className="min-h-screen py-16 bg-[#0b0c0e]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Title */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            Acquisitions d'Exception au Maroc
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight">
            Villas de Maîtres, Riads & Penthouses
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-3 max-w-2xl leading-relaxed">
            Parcourez notre collection exclusive de propriétés à l'achat, sélectionnées pour leur rigueur architecturale, leur intimité et leur potentiel patrimonial.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <PropertyFilters />
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium tabular-nums">{filteredProperties.length}</span>
            <span>propriétés disponibles à la vente</span>
          </div>
          {filters.city !== 'all' && (
            <div className="text-[#c5a880] uppercase tracking-wider text-[11px]">
              Filtre actif : {filters.city}
            </div>
          )}
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-24 bg-[#121418] border border-white/10 rounded-sm">
            <Building2 className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">
              Aucune propriété ne correspond à ces critères précis
            </h3>
            <p className="text-xs text-white/60 max-w-md mx-auto mb-6">
              Nos conseillers disposent également de mandats hors-marché strictement confidentiels non publiés sur le web.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider bg-[#c5a880] text-black font-semibold rounded-sm hover:bg-[#d6bc95]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser les Filtres</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
