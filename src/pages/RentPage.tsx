import React, { useMemo } from 'react';
import { useProperties } from '../context/PropertyContext';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyFilters } from '../components/property/PropertyFilters';
import { Sparkles, Calendar, Key, Check } from 'lucide-react';

export const RentPage: React.FC = () => {
  const { properties, filters, resetFilters } = useProperties();

  const rentalProperties = useMemo(() => {
    return properties.filter((p) => {
      // Must be rental
      if (p.category !== 'location') return false;

      // City filter
      if (filters.city !== 'all' && p.city !== filters.city) return false;

      // Typology
      if (filters.type !== 'all' && p.type !== filters.type) return false;

      // Bedrooms
      if (filters.minBedrooms > 0 && p.bedrooms < filters.minBedrooms) return false;

      // Search keyword
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchDistrict = p.district.toLowerCase().includes(query);
        const matchCity = p.city.toLowerCase().includes(query);
        if (!matchTitle && !matchDistrict && !matchCity) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.priceMAD - b.priceMAD;
      if (filters.sortBy === 'price-desc') return b.priceMAD - a.priceMAD;
      return 0;
    });
  }, [properties, filters]);

  return (
    <main className="min-h-screen py-16 bg-[#0b0c0e]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Banner with Concierge Inclusions */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            Villégiatures & Résidences Temporaires
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight">
            Locations de Prestige au Maroc
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-3 max-w-2xl leading-relaxed">
            Demeures d'exception privatisées avec gouvernante, chef privé, accès spa et conciergerie sur mesure à Marrakech, Casablanca, Tanger et Taghazout.
          </p>

          {/* Luxury Inclusions Strip */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2.5 text-white/80">
              <Check className="w-4 h-4 text-[#c5a880]" />
              <span>Service de conciergerie privée 24/7 dédié</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/80">
              <Check className="w-4 h-4 text-[#c5a880]" />
              <span>Chef marocain et personnel de maison qualifié</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/80">
              <Check className="w-4 h-4 text-[#c5a880]" />
              <span>Contrats de villégiature et baux diplomatiques certifiés</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <PropertyFilters />
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium tabular-nums">{rentalProperties.length}</span>
            <span>demeures disponibles en location privée</span>
          </div>
        </div>

        {/* Rental Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentalProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
};
