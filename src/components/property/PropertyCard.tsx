import React from 'react';
import { Property } from '../../types/property';
import { useProperties } from '../../context/PropertyContext';
import { formatMAD, formatSurface } from '../../utils/formatters';
import { Heart, ArrowUpRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, className = '' }) => {
  const { navigateTo, toggleFavorite, isFavorite } = useProperties();
  const favorited = isFavorite(property.id);

  return (
    <article
      onClick={() => navigateTo('property-detail', property.id)}
      className={`group cursor-pointer bg-[#121418] border border-white/10 hover:border-[#c5a880]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden rounded-sm ${className}`}
    >
      {/* Visual Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1c1f24]">
        <img
          src={property.heroImage}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Favorite Button (Functional) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className={`absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full transition-transform active:scale-90 ${
            favorited
              ? 'bg-[#c5a880] text-black'
              : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/80 border border-white/20'
          }`}
          aria-label={favorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quiet Top Kicker (NO PILLS - Clean unboxed text) */}
        <div className="absolute top-3.5 left-4 z-10 flex items-center gap-2 text-[11px] tracking-wider uppercase text-white/90 drop-shadow">
          <span>{property.city}</span>
          <span aria-hidden="true" className="text-[#c5a880]">·</span>
          <span>{property.district}</span>
        </div>

        {/* Bottom Price inside visual scrim */}
        <div className="absolute bottom-3.5 left-4 right-4 z-10 flex items-baseline justify-between text-white">
          <div className="text-xl lg:text-2xl font-serif tracking-tight font-medium">
            {formatMAD(property.priceMAD)}
            {property.rentalPeriod && (
              <span className="text-xs font-sans text-white/70 ml-1">
                / {property.rentalPeriod}
              </span>
            )}
          </div>
          {property.status === 'sous_offre' && (
            <span className="text-[11px] uppercase tracking-wider text-amber-300">
              Sous Offre
            </span>
          )}
        </div>
      </div>

      {/* Content & Metadata */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <h3 className="text-lg lg:text-xl font-serif text-white group-hover:text-[#c5a880] transition-colors line-clamp-1 mb-1">
            {property.title}
          </h3>
          <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
            {property.subtitle}
          </p>
        </div>

        {/* Clean unboxed metadata with typographic separators (Rule A) */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-2">
            <span>{property.bedrooms} suites</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>{formatSurface(property.surfaceLivingM2)}</span>
            {property.surfaceLandM2 && (
              <>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span>{formatSurface(property.surfaceLandM2)} parc</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 text-[#c5a880] text-[11px] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            <span>Explorer</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </article>
  );
};
