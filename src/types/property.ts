export type PropertyCity = 'Marrakech' | 'Casablanca' | 'Tanger' | 'Rabat' | 'Essaouira' | 'Agadir';

export type PropertyType = 'Villa d\'Architecte' | 'Penthouse' | 'Riad Contemporain' | 'Domaine Privé' | 'Propriété Côtière';

export type PropertyCategory = 'achat' | 'location';

export type PropertyStatus = 'disponible' | 'sous_offre' | 'vendu' | 'reserve';

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  city: PropertyCity;
  district: string;
  category: PropertyCategory;
  type: PropertyType;
  priceMAD: number;
  rentalPeriod?: 'mois' | 'semaine';
  surfaceLivingM2: number;
  surfaceLandM2?: number;
  bedrooms: number;
  bathrooms: number;
  architect?: string;
  yearBuilt: number;
  status: PropertyStatus;
  featured: boolean;
  heroImage: string;
  gallery: string[];
  description: string;
  features: string[];
  amenities: {
    pool: boolean;
    hammam: boolean;
    seaView?: boolean;
    atlasView?: boolean;
    golfView?: boolean;
    garden: boolean;
    garage: number;
    homeAutomation: boolean;
    wineCellar?: boolean;
    cinemaRoom?: boolean;
    staffQuarters?: boolean;
    privateSpa?: boolean;
  };
  floorPlanData?: {
    levels: number;
    groundFloorSummary: string;
    upperFloorSummary: string;
    outdoorSummary: string;
  };
}

export interface VisitRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyCity: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string;
  preferredTimeSlot: 'matin' | 'apres-midi' | 'crepuscule';
  notes?: string;
  needsChauffeur: boolean;
  status: 'en_attente' | 'confirme' | 'effectue' | 'annule';
  createdAt: string;
}

export type CameraViewpoint = 'panoramic' | 'pool' | 'facade' | 'suite' | 'axonometric';

export type LightingAmbiance = 'golden' | 'twilight' | 'solar';

export interface Hotspot {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  viewpoint: CameraViewpoint;
}
