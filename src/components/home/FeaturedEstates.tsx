import React, { useState } from 'react';
import { useProperties } from '../../context/PropertyContext';
import { PropertyCard } from '../property/PropertyCard';
import { ArrowUpRight } from 'lucide-react';

export const FeaturedEstates: React.FC = () => {
  const { properties, navigateTo } = useProperties();
  const [activeTab, setActiveTab] = useState<'all' | 'achat' | 'location'>('all');

  const filtered = properties
    .filter((p) => (activeTab === 'all' ? p.featured : p.category === activeTab))
    .slice(0, 4);

  return (
    <section id="collection-signature" className="py-24 bg-[#0c0d0e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
              Portfolio d'Exception
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight">
              Résidences Signatures du Maroc
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-sm self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs rounded-sm transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#c5a880] text-black font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Signatures
            </button>
            <button
              onClick={() => setActiveTab('achat')}
              className={`px-3.5 py-1.5 text-xs rounded-sm transition-colors whitespace-nowrap ${
                activeTab === 'achat'
                  ? 'bg-[#c5a880] text-black font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Acquisitions
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`px-3.5 py-1.5 text-xs rounded-sm transition-colors whitespace-nowrap ${
                activeTab === 'location'
                  ? 'bg-[#c5a880] text-black font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Villégiatures Privées
            </button>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('buy')}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#c5a880] text-white transition-all rounded-sm group"
          >
            <span>Consulter les 18 Propriétés du Registre</span>
            <ArrowUpRight className="w-4 h-4 text-[#c5a880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
