import React from 'react';
import { useProperties } from '../../context/PropertyContext';
import { formatMAD, formatSurface } from '../../utils/formatters';
import { X, Trash2, ArrowUpRight, HeartHandshake } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ isOpen, onClose }) => {
  const { favorites, properties, toggleFavorite, navigateTo } = useProperties();

  if (!isOpen) return null;

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121418] border-l border-white/10 text-white p-6 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-medium block">
                  Votre Sélection Privée
                </span>
                <h3 className="text-xl font-serif">Biens Favoris ({favoriteProperties.length})</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-white/60 hover:text-white rounded-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="mt-6 space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
              {favoriteProperties.length === 0 ? (
                <div className="text-center py-16 text-white/50">
                  <HeartHandshake className="w-10 h-10 mx-auto mb-3 text-white/30" />
                  <p className="text-xs">Aucune propriété dans votre sélection privée pour le moment.</p>
                  <p className="text-[11px] text-white/40 mt-1">
                    Cliquez sur le cœur d'une propriété pour la conserver ici.
                  </p>
                </div>
              ) : (
                favoriteProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="flex gap-4 p-3 bg-white/5 border border-white/5 rounded-sm hover:border-white/20 transition-colors"
                  >
                    <img
                      src={prop.heroImage}
                      alt={prop.title}
                      className="w-20 h-20 object-cover rounded-sm shrink-0"
                    />
                    <div className="flex flex-col justify-between flex-grow min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              navigateTo('property-detail', prop.id);
                              onClose();
                            }}
                            className="text-sm font-serif text-white hover:text-[#c5a880] truncate cursor-pointer"
                          >
                            {prop.title}
                          </h4>
                          <button
                            onClick={() => toggleFavorite(prop.id)}
                            className="text-white/40 hover:text-rose-400 p-0.5"
                            title="Retirer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-white/50">{prop.city} · {prop.district}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-medium text-[#c5a880]">
                          {formatMAD(prop.priceMAD)}
                        </span>
                        <button
                          onClick={() => {
                            navigateTo('property-detail', prop.id);
                            onClose();
                          }}
                          className="text-[10px] uppercase tracking-wider text-white/80 hover:text-white flex items-center gap-1"
                        >
                          <span>Voir</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Action */}
          {favoriteProperties.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  navigateTo('contact');
                  onClose();
                }}
                className="w-full py-3 text-xs uppercase tracking-[0.16em] bg-[#c5a880] text-black font-semibold text-center rounded-sm hover:bg-[#d6bc95] transition-colors"
              >
                Demander un Dossier Groupé
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
