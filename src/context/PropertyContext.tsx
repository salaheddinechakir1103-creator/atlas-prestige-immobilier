import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, VisitRequest, PropertyCity, PropertyType, PropertyCategory } from '../types/property';
import { INITIAL_PROPERTIES, INITIAL_VISIT_REQUESTS } from '../data/properties';

export type AppRoute = 'home' | 'buy' | 'rent' | 'property-detail' | 'services' | 'about' | 'contact' | 'admin';

export interface FilterState {
  searchQuery: string;
  city: PropertyCity | 'all';
  type: PropertyType | 'all';
  category: PropertyCategory | 'all';
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  sortBy: 'price-asc' | 'price-desc' | 'surface-desc' | 'newest';
  amenities: {
    pool?: boolean;
    hammam?: boolean;
    seaView?: boolean;
    atlasView?: boolean;
    golfView?: boolean;
  };
}

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'gold';
}

interface PropertyContextType {
  properties: Property[];
  visitRequests: VisitRequest[];
  favorites: string[];
  currentRoute: AppRoute;
  selectedPropertyId: string | null;
  selectedProperty: Property | null;
  filters: FilterState;
  toasts: ToastMessage[];
  navigateTo: (route: AppRoute, propertyId?: string) => void;
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  submitVisitRequest: (request: Omit<VisitRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateVisitStatus: (requestId: string, status: VisitRequest['status']) => void;
  deleteVisitRequest: (requestId: string) => void;
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (propertyId: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  resetAllData: () => void;
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  city: 'all',
  type: 'all',
  category: 'all',
  minPrice: 0,
  maxPrice: 100000000,
  minBedrooms: 0,
  sortBy: 'newest',
  amenities: {}
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Properties state with LocalStorage persistence
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('atlas_prestige_properties');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PROPERTIES;
  });

  // Visit requests state with LocalStorage persistence
  const [visitRequests, setVisitRequests] = useState<VisitRequest[]>(() => {
    try {
      const saved = localStorage.getItem('atlas_prestige_visits');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_VISIT_REQUESTS;
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atlas_prestige_favorites');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['prop-marrakech-palmeraie-01', 'prop-casablanca-anfa-01'];
  });

  // Navigation
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Filters
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('atlas_prestige_properties', JSON.stringify(properties));
    } catch {
      // ignore
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem('atlas_prestige_visits', JSON.stringify(visitRequests));
    } catch {
      // ignore
    }
  }, [visitRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('atlas_prestige_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'gold') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (route: AppRoute, propertyId?: string) => {
    setCurrentRoute(route);
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(propertyId);
      const next = exists ? prev.filter((id) => id !== propertyId) : [...prev, propertyId];
      if (exists) {
        addToast('Favoris', 'Propriété retirée de votre sélection confidentielle.', 'info');
      } else {
        addToast('Favoris', 'Propriété ajoutée à votre sélection privée.', 'gold');
      }
      return next;
    });
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const submitVisitRequest = (requestData: Omit<VisitRequest, 'id' | 'status' | 'createdAt'>) => {
    const newReq: VisitRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      status: 'en_attente',
      createdAt: new Date().toISOString()
    };
    setVisitRequests((prev) => [newReq, ...prev]);
    addToast(
      'Visite Confirmée',
      `Votre demande de visite privée pour "${requestData.propertyTitle}" a bien été transmise à notre conciergerie.`,
      'gold'
    );
  };

  const updateVisitStatus = (requestId: string, status: VisitRequest['status']) => {
    setVisitRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
    addToast('Statut mis à jour', `Le statut de la visite a été passé à: ${status}.`, 'info');
  };

  const deleteVisitRequest = (requestId: string) => {
    setVisitRequests((prev) => prev.filter((r) => r.id !== requestId));
    addToast('Demande supprimée', 'La demande de visite a été retirée du registre.', 'info');
  };

  const addProperty = (propData: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...propData,
      id: `prop-custom-${Date.now()}`
    };
    setProperties((prev) => [newProperty, ...prev]);
    addToast('Propriété Ajoutée', `Le bien "${newProperty.title}" a été ajouté au catalogue.`, 'gold');
  };

  const updateProperty = (updatedProp: Property) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProp.id ? updatedProp : p))
    );
    addToast('Propriété Modifiée', `Les modifications pour "${updatedProp.title}" sont enregistrées.`, 'info');
  };

  const deleteProperty = (propertyId: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    addToast('Propriété Retirée', 'Le bien a été retiré du catalogue.', 'info');
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const resetAllData = () => {
    localStorage.removeItem('atlas_prestige_properties');
    localStorage.removeItem('atlas_prestige_visits');
    localStorage.removeItem('atlas_prestige_favorites');
    setProperties(INITIAL_PROPERTIES);
    setVisitRequests(INITIAL_VISIT_REQUESTS);
    setFavorites(['prop-marrakech-palmeraie-01', 'prop-casablanca-anfa-01']);
    setFilters(DEFAULT_FILTERS);
    addToast('Réinitialisation', 'Les données de démonstration ont été remises aux valeurs initiales.', 'info');
  };

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || null;

  return (
    <PropertyContext.Provider
      value={{
        properties,
        visitRequests,
        favorites,
        currentRoute,
        selectedPropertyId,
        selectedProperty,
        filters,
        toasts,
        navigateTo,
        toggleFavorite,
        isFavorite,
        submitVisitRequest,
        updateVisitStatus,
        deleteVisitRequest,
        addProperty,
        updateProperty,
        deleteProperty,
        setFilters,
        resetFilters,
        resetAllData,
        addToast,
        removeToast
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
