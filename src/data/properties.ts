import { Property, VisitRequest } from '../types/property';

// Curated collection of 18 premier luxury estates in Morocco
export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-marrakech-palmeraie-01',
    title: 'Villa Al-Badi Contemporaine',
    subtitle: 'Domaine d\'architecte avec vue imprenable sur la chaîne de l\'Atlas',
    city: 'Marrakech',
    district: 'Palmeraie Triangle d\'Or',
    category: 'achat',
    type: 'Villa d\'Architecte',
    priceMAD: 38500000,
    surfaceLivingM2: 950,
    surfaceLandM2: 12000,
    bedrooms: 6,
    bathrooms: 7,
    architect: 'Khadija Bennani Studio & Charles Boccara',
    yearBuilt: 2024,
    status: 'disponible',
    featured: true,
    heroImage: '/src/assets/images/hero_moroccan_villa_1792754388660.jpg',
    gallery: [
      '/src/assets/images/hero_moroccan_villa_1792754388660.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg',
      '/src/assets/images/villa_marrakech_estate_1792754389244.jpg'
    ],
    description: 'Chef-d\'œuvre d\'architecture contemporaine intégrant la pierre de Taza taillée à la main, le pisé stabilisé et de spectaculaires baies vitrées de 5 mètres de hauteur. L\'eau guide chaque transition spatiale depuis le patio d\'honneur jusqu\'au miroir d\'eau chauffé de 25 mètres face aux crêtes enneigées du Haut Atlas.',
    features: [
      'Piscine à débordement chauffée de 25m avec revêtement en pierre de Bali',
      'Hammam traditionnel en marbre Carrare avec salle de gommage et repos',
      'Patio bioclimatique avec fontaine centrale en zellige contemporain',
      'Double salon de réception de 180 m² avec cheminée monumentale à foyer ouvert',
      'Pavillon d\'invités indépendant de 140 m² avec 2 suites privatives',
      'Domotique intégrale Lutron & sonorisation furtive Bowers & Wilkins'
    ],
    amenities: {
      pool: true,
      hammam: true,
      atlasView: true,
      garden: true,
      garage: 4,
      homeAutomation: true,
      wineCellar: true,
      cinemaRoom: true,
      staffQuarters: true,
      privateSpa: true
    },
    floorPlanData: {
      levels: 2,
      groundFloorSummary: 'Vaste galerie d\'entrée, double salon de réception, salle à manger d\'apparat, cuisine d\'auteur et office, 3 suites invités avec jardins privés, hammam et spa.',
      upperFloorSummary: 'Suite master de 160 m² avec double dressing traversant, salon privé et terrasse panoramique de 90 m² orientée plein sud face à l\'Atlas.',
      outdoorSummary: 'Parc paysager d\'oliviers centenaires, terrain de padel éclairé, pool house avec cuisine d\'été et salon brasero.'
    }
  },
  {
    id: 'prop-marrakech-palmeraie-02',
    title: 'Le Domaine d\'Amanar',
    subtitle: 'Écrin d\'oliviers centenaires et pavillon de maître bioclimatique',
    city: 'Marrakech',
    district: 'Palmeraie Est',
    category: 'achat',
    type: 'Domaine Privé',
    priceMAD: 52000000,
    surfaceLivingM2: 1250,
    surfaceLandM2: 24000,
    bedrooms: 8,
    bathrooms: 9,
    architect: 'Studio Patrick Bouchain & Karim Chakor',
    yearBuilt: 2023,
    status: 'disponible',
    featured: true,
    heroImage: '/src/assets/images/villa_marrakech_estate_1792754389244.jpg',
    gallery: [
      '/src/assets/images/villa_marrakech_estate_1792754389244.jpg',
      '/src/assets/images/hero_moroccan_villa_1792754388660.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg'
    ],
    description: 'Une propriété d\'exception étendue sur un parc de 2,4 hectares bordé de 300 oliviers et palmiers matures. Conçue avec une approche durable en pisé moderne, la villa maintient une fraîcheur naturelle remarquable tout au long de l\'été marocain.',
    features: [
      'Piscine naturelle de 30 mètres filtrée par lagunage biologique',
      'Spa d\'inspiration orientale avec hammam voûté et sauna cèdre de l\'Atlas',
      'Cave à vin climatisée de 1 200 flacons',
      'Piste d\'hélicoptère privée autorisée',
      'Logement complet pour majordome et personnel de maison'
    ],
    amenities: {
      pool: true,
      hammam: true,
      atlasView: true,
      garden: true,
      garage: 6,
      homeAutomation: true,
      wineCellar: true,
      cinemaRoom: true,
      staffQuarters: true,
      privateSpa: true
    },
    floorPlanData: {
      levels: 2,
      groundFloorSummary: 'Salons en enfilade ouverts sur les vergers, 4 suites de plain-pied, cuisine gastronomique professionnelle.',
      upperFloorSummary: '2 suites royales avec baignoires taillées dans des monolithes de granit noir et solariums.',
      outdoorSummary: 'Oliveraie productive, potager permacole, roseraie de 500 plants et pavillon de yoga.'
    }
  },
  {
    id: 'prop-casablanca-anfa-01',
    title: 'Penthouse Atlantique Sky-Villa',
    subtitle: 'Résidence triplex suspendue face à l\'océan et la Corniche',
    city: 'Casablanca',
    district: 'Anfa Supérieur',
    category: 'achat',
    type: 'Penthouse',
    priceMAD: 29500000,
    surfaceLivingM2: 580,
    bedrooms: 4,
    bathrooms: 5,
    architect: 'Foster + Partners & Youssef Melehi',
    yearBuilt: 2025,
    status: 'disponible',
    featured: true,
    heroImage: '/src/assets/images/casablanca_penthouse_1792754390171.jpg',
    gallery: [
      '/src/assets/images/casablanca_penthouse_1792754390171.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg',
      '/src/assets/images/hero_moroccan_villa_1792754388660.jpg'
    ],
    description: 'Au sommet de la colline d\'Anfa, ce penthouse triplex offre une vue à 360° sur l\'Atlantique, la Grande Mosquée Hassan II et les lumières de la métropole économique. Terrasse de réception avec piscine privée à débordement suspendue dans le ciel.',
    features: [
      'Piscine privée en porte-à-faux sur le toit-terrasse',
      'Ascenseur privé privatif desservant les 3 niveaux directement',
      'Revêtements en travertin Navona et boiseries en noyer canaletto',
      'Salon cathédrale sous 7 mètres de hauteur sous plafond',
      '4 places de stationnement sécurisées en sous-sol avec chargeurs rapides'
    ],
    amenities: {
      pool: true,
      hammam: true,
      seaView: true,
      garden: false,
      garage: 4,
      homeAutomation: true,
      wineCellar: true,
      cinemaRoom: true,
      staffQuarters: true,
      privateSpa: true
    },
    floorPlanData: {
      levels: 3,
      groundFloorSummary: 'Niveau réception: salon panoramique de 140 m², bureau de direction, salle à manger formelle.',
      upperFloorSummary: 'Niveau nuit: 4 suites parentales avec loggias marines et salles de bains marbrées.',
      outdoorSummary: 'Niveau Rooftop: piscine chauffée, salon lounge extérieur avec foyer au bioéthanol et bar en onyx rétro-éclairé.'
    }
  },
  {
    id: 'prop-tanger-montagne-01',
    title: 'Villa Cap Spartel Belvedere',
    subtitle: 'Élégance méditerranéenne face au Détroit de Gibraltar',
    city: 'Tanger',
    district: 'Vieille Montagne',
    category: 'achat',
    type: 'Propriété Côtière',
    priceMAD: 34000000,
    surfaceLivingM2: 780,
    surfaceLandM2: 4500,
    bedrooms: 5,
    bathrooms: 6,
    architect: 'Stuart Church Legacy & Jean-François Zevaco Studio',
    yearBuilt: 2024,
    status: 'disponible',
    featured: true,
    heroImage: '/src/assets/images/villa_tangier_coast_1792754390808.jpg',
    gallery: [
      '/src/assets/images/villa_tangier_coast_1792754390808.jpg',
      '/src/assets/images/casablanca_penthouse_1792754390171.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg'
    ],
    description: 'Bâtie sur la falaise légendaire de la Vieille Montagne, cette résidence contemporaine domine la rencontre des eaux de la Méditerranée et de l\'Océan Atlantique. Terrasses en gradins, pins maritimes cinquantenaires et lumière d\'or propre au Détroit.',
    features: [
      'Piscine à débordement de 20 mètres plongeant vers l\'horizon marin',
      'Accès privatif aménagé menant à une crique préservée',
      'Architecture en gradins épousant la topographie rocheuse',
      'Jardin méditerranéen complanté de cyprès d\'Italie et de bougainvilliers',
      'Salon de thé panoramique vitré orienté vers les côtes andalouses'
    ],
    amenities: {
      pool: true,
      hammam: true,
      seaView: true,
      garden: true,
      garage: 3,
      homeAutomation: true,
      wineCellar: true,
      cinemaRoom: false,
      staffQuarters: true,
      privateSpa: false
    },
    floorPlanData: {
      levels: 3,
      groundFloorSummary: 'Vastes espaces de vie traversants, cuisine d\'été et patio ombragé.',
      upperFloorSummary: '3 suites ouvertes sur des terrasses maritimes avec vue sur les navires du Détroit.',
      outdoorSummary: 'Terrasse solarium en pierre naturelle, salon lounge sous pergola en cèdre et belvédère d\'observation.'
    }
  },
  {
    id: 'prop-marrakech-amelkis-01',
    title: 'Villa Kasbah Pure',
    subtitle: 'Raffinement contemporain en première ligne de golf',
    city: 'Marrakech',
    district: 'Golf Amelkis',
    category: 'achat',
    type: 'Villa d\'Architecte',
    priceMAD: 24500000,
    surfaceLivingM2: 680,
    surfaceLandM2: 2100,
    bedrooms: 5,
    bathrooms: 5,
    architect: 'Imaad Rahmouni Architecture',
    yearBuilt: 2023,
    status: 'disponible',
    featured: false,
    heroImage: '/src/assets/images/hero_moroccan_villa_1792754388660.jpg',
    gallery: [
      '/src/assets/images/hero_moroccan_villa_1792754388660.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg'
    ],
    description: 'Une réinterprétation avant-gardiste de la kasbah marocaine. Volumes géométriques purs, jeux d\'ombre et de claustras géométriques en terracotta, couloir de nage de 18 mètres et accès direct aux greens.',
    features: [
      'Première ligne de golf avec vue panoramique sur les fairways et l\'Atlas',
      'Couloir de nage chauffé avec banquette balnéo',
      'Système de climatisation réversible gainée à haut rendement énergétique',
      'Cuisine Bulthaup avec îlot en granit du Zimbabwe'
    ],
    amenities: {
      pool: true,
      hammam: true,
      atlasView: true,
      golfView: true,
      garden: true,
      garage: 2,
      homeAutomation: true
    }
  },
  {
    id: 'prop-marrakech-ouriga-01',
    title: 'Le Sanctuaire de l\'Ourika',
    subtitle: 'Villa sculpturale au pied des cimes enneigées',
    city: 'Marrakech',
    district: 'Route de l\'Ourika Km 14',
    category: 'achat',
    type: 'Domaine Privé',
    priceMAD: 28000000,
    surfaceLivingM2: 820,
    surfaceLandM2: 10000,
    bedrooms: 5,
    bathrooms: 6,
    architect: 'Tarik Oualalou & Linna Choi',
    yearBuilt: 2024,
    status: 'disponible',
    featured: false,
    heroImage: '/src/assets/images/villa_marrakech_estate_1792754389244.jpg',
    gallery: [
      '/src/assets/images/villa_marrakech_estate_1792754389244.jpg',
      '/src/assets/images/hero_moroccan_villa_1792754388660.jpg'
    ],
    description: 'Conçue comme une ode aux minéraux de l\'Atlas, cette villa d\'un hectare fusionne béton brut teinté dans la masse et jardins désertiques de cactées et d\'oliviers.',
    features: [
      'Bassin miroir de 22 mètres réfléchissant les crêtes du mont Toubkal',
      'Chauffage au sol par géothermie',
      'Spa privatif avec hammam en tadelakt artisanal fait main'
    ],
    amenities: {
      pool: true,
      hammam: true,
      atlasView: true,
      garden: true,
      garage: 3,
      homeAutomation: true,
      privateSpa: true
    }
  },
  {
    id: 'prop-casablanca-gauthier-01',
    title: 'Hôtel Particulier Triangle d\'Or',
    subtitle: 'Architecture Art Déco restaurée avec jardin secret',
    city: 'Casablanca',
    district: 'Triangle d\'Or / Gauthier',
    category: 'achat',
    type: 'Villa d\'Architecte',
    priceMAD: 22000000,
    surfaceLivingM2: 520,
    surfaceLandM2: 650,
    bedrooms: 4,
    bathrooms: 4,
    architect: 'Atelier Rachid Andaloussi',
    yearBuilt: 2022,
    status: 'disponible',
    featured: false,
    heroImage: '/src/assets/images/casablanca_penthouse_1792754390171.jpg',
    gallery: [
      '/src/assets/images/casablanca_penthouse_1792754390171.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg'
    ],
    description: 'Rare demeure de maître d\'inspiration moderniste casablancaise, préservant ses ferronneries d\'époque, réhaussée d\'un patio contemporain et d\'un bassin de nage discret.',
    features: [
      'Hauteur sous plafond de 4,20 mètres avec moulures d\'origine restaurées',
      'Bassin de détente chauffé en patio intime',
      'Système de sécurité de pointe avec sas de sécurité blindé'
    ],
    amenities: {
      pool: true,
      hammam: true,
      garden: true,
      garage: 2,
      homeAutomation: true,
      wineCellar: true
    }
  },
  {
    id: 'prop-rabat-souissi-01',
    title: 'Résidence des Ambassadeurs',
    subtitle: 'Propriété diplomatique de prestige dans le quartier le plus exclusif',
    city: 'Rabat',
    district: 'Souissi Bir Kacem',
    category: 'achat',
    type: 'Domaine Privé',
    priceMAD: 46000000,
    surfaceLivingM2: 1100,
    surfaceLandM2: 6200,
    bedrooms: 7,
    bathrooms: 8,
    architect: 'Fouad El Kohen Architectes',
    yearBuilt: 2023,
    status: 'disponible',
    featured: true,
    heroImage: '/src/assets/images/villa_marrakech_estate_1792754389244.jpg',
    gallery: [
      '/src/assets/images/villa_marrakech_estate_1792754389244.jpg',
      '/src/assets/images/hero_moroccan_villa_1792754388660.jpg'
    ],
    description: 'Implantée au cœur de Bir Kacem, cette demeure prestigieuse répond aux plus hauts standards de sécurité diplomatique et de réception officielle. Parc arboré séculaire.',
    features: [
      'Salon de réception d\'apparat de 220 m²',
      'Piscine semi-olympique chauffée et pavillon de garde indépendant',
      'Groupe électrogène de secours industriel et forages privés'
    ],
    amenities: {
      pool: true,
      hammam: true,
      garden: true,
      garage: 6,
      homeAutomation: true,
      staffQuarters: true,
      cinemaRoom: true
    }
  },
  {
    id: 'prop-essaouira-mogador-01',
    title: 'Villa Océane Mogador',
    subtitle: 'Architecture en pierre naturelle et arganiers face aux alizés',
    city: 'Essaouira',
    district: 'Domaine de Mogador',
    category: 'achat',
    type: 'Propriété Côtière',
    priceMAD: 16500000,
    surfaceLivingM2: 480,
    surfaceLandM2: 3200,
    bedrooms: 4,
    bathrooms: 4,
    architect: 'Didier Gomez & Gilles & Boissier',
    yearBuilt: 2024,
    status: 'disponible',
    featured: false,
    heroImage: '/src/assets/images/villa_tangier_coast_1792754390808.jpg',
    gallery: [
      '/src/assets/images/villa_tangier_coast_1792754390808.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg'
    ],
    description: 'Bâtie en pierre calcaire de Manzel et bois d\'eucalyptus, cette villa protégée des vents dominants s\'ouvre sur le golf Gary Player et la forêt d\'arganiers.',
    features: [
      'Piscine chauffée abritée par un patio bioclimatique',
      'Plancher chauffant en bois massif thermo-traité',
      'Hammam traditionnel au savon noir et eucalyptus'
    ],
    amenities: {
      pool: true,
      hammam: true,
      seaView: true,
      golfView: true,
      garden: true,
      garage: 2,
      homeAutomation: true
    }
  },
  {
    id: 'prop-agadir-taghazout-01',
    title: 'Villa Cliffside Taghazout Bay',
    subtitle: 'Surplomb spectaculaire sur les vagues mythiques de l\'Atlantique',
    city: 'Agadir',
    district: 'Taghazout Bay Resort',
    category: 'achat',
    type: 'Propriété Côtière',
    priceMAD: 19800000,
    surfaceLivingM2: 520,
    surfaceLandM2: 1800,
    bedrooms: 4,
    bathrooms: 5,
    architect: 'Reichen et Robert & Associés',
    yearBuilt: 2025,
    status: 'disponible',
    featured: false,
    heroImage: '/src/assets/images/villa_tangier_coast_1792754390808.jpg',
    gallery: [
      '/src/assets/images/villa_tangier_coast_1792754390808.jpg',
      '/src/assets/images/casablanca_penthouse_1792754390171.jpg'
    ],
    description: 'Un point de vue incomparable sur les couchers de soleil atlantiques. Salons entièrement ouverts sur l\'océan avec accès direct aux promenades marines et aux spots de surf.',
    features: [
      'Piscine à débordement suspendue au-dessus de l\'océan',
      'Terrasse avec cheminée extérieure pour les soirées océanes',
      'Local de surf design avec douches extérieures en laiton'
    ],
    amenities: {
      pool: true,
      hammam: true,
      seaView: true,
      garden: true,
      garage: 2,
      homeAutomation: true
    }
  },
  {
    id: 'prop-marrakech-medina-01',
    title: 'Riad Dar El-Noor Contemporain',
    subtitle: 'Palais privé réinventé au cœur de la Médina historique',
    city: 'Marrakech',
    district: 'Médina Mouassine',
    category: 'achat',
    type: 'Riad Contemporain',
    priceMAD: 18900000,
    surfaceLivingM2: 640,
    bedrooms: 5,
    bathrooms: 6,
    architect: 'Quentin Wilbaux & Studio Ko',
    yearBuilt: 2023,
    status: 'disponible',
    featured: false,
    heroImage: '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg',
    gallery: [
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg',
      '/src/assets/images/hero_moroccan_villa_1792754388660.jpg'
    ],
    description: 'Ce riad du XVIIIe siècle entièrement réinventé conjugue le savoir-faire des Maâlems plâtriers avec des volumes épurés, un ascenseur intérieur en verre et un bassin de nage en marbre noir.',
    features: [
      'Grand patio arboré d\'orangers centenaires avec fontaine murale zellige',
      'Bassin de nage chauffé dans le patio avec toit verrière rétractable',
      'Rooftop de 200 m² avec cuisine d\'été et vue sur la Koutoubia et l\'Atlas'
    ],
    amenities: {
      pool: true,
      hammam: true,
      atlasView: true,
      garden: false,
      garage: 0,
      homeAutomation: true,
      privateSpa: true
    }
  },
  {
    id: 'prop-marrakech-samanah-01',
    title: 'Villa Horizon Samanah',
    subtitle: 'Lignes pures et minéralité face au parcours Jack Nicklaus',
    city: 'Marrakech',
    district: 'Samanah Country Club',
    category: 'achat',
    type: 'Villa d\'Architecte',
    priceMAD: 15800000,
    surfaceLivingM2: 510,
    surfaceLandM2: 1950,
    bedrooms: 4,
    bathrooms: 4,
    architect: 'Alain Carle Architecte',
    yearBuilt: 2024,
    status: 'disponible',
    featured: false,
    heroImage: '/src/assets/images/hero_moroccan_villa_1792754388660.jpg',
    gallery: [
      '/src/assets/images/hero_moroccan_villa_1792754388660.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg'
    ],
    description: 'Villa aux volumes horizontaux affirmés, entourée d\'un miroir d\'eau et d\'un jardin xérophyte composé d\'agaves et d\'oliviers taillés en nuage.',
    features: [
      'Piscine miroir chauffée avec plage immergée',
      'Verre solaire Stopray neutralisant la chaleur',
      'Garage fermé pour 2 véhicules et voiturette de golf'
    ],
    amenities: {
      pool: true,
      hammam: true,
      golfView: true,
      atlasView: true,
      garden: true,
      garage: 2,
      homeAutomation: true
    }
  },
  // LUXURY RENTALS (LOCATION DE PRESTIGE)
  {
    id: 'rent-marrakech-palmeraie-01',
    title: 'Villa Kasbah Mirage — En Location',
    subtitle: 'Séjour d\'exception avec service hôtelier 5 étoiles privé',
    city: 'Marrakech',
    district: 'Palmeraie Triangle d\'Or',
    category: 'location',
    type: 'Domaine Privé',
    priceMAD: 95000,
    rentalPeriod: 'semaine',
    surfaceLivingM2: 900,
    surfaceLandM2: 15000,
    bedrooms: 6,
    bathrooms: 7,
    architect: 'Karim Chakor',
    yearBuilt: 2024,
    status: 'disponible',
    featured: true,
    heroImage: '/src/assets/images/hero_moroccan_villa_1792754388660.jpg',
    gallery: [
      '/src/assets/images/hero_moroccan_villa_1792754388660.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg',
      '/src/assets/images/villa_marrakech_estate_1792754389244.jpg'
    ],
    description: 'Location exclusive incluant chef cuisinier privé, majordome, hammam traditionnel chauffé tous les jours et chauffeur VIP. Piscine de 25m et jardins de palmiers.',
    features: [
      'Service hôtelier d\'excellence avec chef privé et majordome dédiés',
      'Hammam marocain privatif avec soins traditionnels sur demande',
      'Piscine à débordement chauffée de 25 mètres',
      'Navettes privées avec Mercedes Classe V et chauffeur inclus'
    ],
    amenities: {
      pool: true,
      hammam: true,
      atlasView: true,
      garden: true,
      garage: 4,
      homeAutomation: true,
      staffQuarters: true,
      privateSpa: true
    }
  },
  {
    id: 'rent-casablanca-anfa-01',
    title: 'Sky Residence Anfa — Location Mensuelle',
    subtitle: 'Penthouse contemporain meublé par des designers italiens',
    city: 'Casablanca',
    district: 'Anfa Supérieur',
    category: 'location',
    type: 'Penthouse',
    priceMAD: 75000,
    rentalPeriod: 'mois',
    surfaceLivingM2: 420,
    bedrooms: 3,
    bathrooms: 4,
    architect: 'Youssef Melehi',
    yearBuilt: 2024,
    status: 'disponible',
    featured: true,
    heroImage: '/src/assets/images/casablanca_penthouse_1792754390171.jpg',
    gallery: [
      '/src/assets/images/casablanca_penthouse_1792754390171.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg'
    ],
    description: 'Penthouse d\'exécutif de très grand luxe, mobilier Poliform et B&B Italia, terrasse panoramique de 150 m² sur l\'Océan Atlantique, service de conciergerie 24/7.',
    features: [
      'Piscine jacuzzi extérieure chauffée sur la terrasse privative',
      'Mobilier de grands maîtres du design italien et œuvres d\'art certifiées',
      'Sécurité diplomatique et service de conciergerie d\'immeuble permanente'
    ],
    amenities: {
      pool: true,
      hammam: true,
      seaView: true,
      garden: false,
      garage: 2,
      homeAutomation: true
    }
  },
  {
    id: 'rent-tanger-spartel-01',
    title: 'Villa Miramar Gibraltar — En Location',
    subtitle: 'Refuge estival perché au-dessus des deux mers',
    city: 'Tanger',
    district: 'Cap Spartel',
    category: 'location',
    type: 'Propriété Côtière',
    priceMAD: 65000,
    rentalPeriod: 'semaine',
    surfaceLivingM2: 550,
    surfaceLandM2: 3800,
    bedrooms: 4,
    bathrooms: 5,
    architect: 'Atelier Jean-François Zevaco',
    yearBuilt: 2023,
    status: 'disponible',
    featured: false,
    heroImage: '/src/assets/images/villa_tangier_coast_1792754390808.jpg',
    gallery: [
      '/src/assets/images/villa_tangier_coast_1792754390808.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg'
    ],
    description: 'Propriété secrète lovée dans les pins parasols de Tanger, offrant une vue dégagée sur les phares maritimes et le ballet des navires transatlantiques.',
    features: [
      'Piscine suspendue à débordement avec panorama à 180° sur la mer',
      'Gouvernante et cuisinière marocaine à demeure',
      'Accès rapide aux plages sauvages de l\'Atlantique et au centre-ville historique'
    ],
    amenities: {
      pool: true,
      hammam: true,
      seaView: true,
      garden: true,
      garage: 2,
      homeAutomation: true
    }
  },
  {
    id: 'rent-marrakech-hivernage-01',
    title: 'L\'Atelier de l\'Hivernage — Location Mensuelle',
    subtitle: 'Villa d\'artiste contemporaine avec patio et couloir de nage',
    city: 'Marrakech',
    district: 'Hivernage',
    category: 'location',
    type: 'Villa d\'Architecte',
    priceMAD: 55000,
    rentalPeriod: 'mois',
    surfaceLivingM2: 430,
    surfaceLandM2: 1200,
    bedrooms: 3,
    bathrooms: 4,
    architect: 'Khadija Bennani',
    yearBuilt: 2023,
    status: 'disponible',
    featured: false,
    heroImage: '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg',
    gallery: [
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg',
      '/src/assets/images/hero_moroccan_villa_1792754388660.jpg'
    ],
    description: 'Située dans le quartier le plus élégant de Marrakech, cette villa allie calme absolu, jardin tropical luxuriant et proximité immédiate des palaces de l\'Hivernage.',
    features: [
      'Couloir de nage chauffé bordé de bananiers et jasmin',
      'Salon avec plafond cathédrale et verrière d\'artiste',
      'Suite de maître avec salle de bains ouverte sur un patio privé de papyrus'
    ],
    amenities: {
      pool: true,
      hammam: true,
      garden: true,
      garage: 2,
      homeAutomation: true
    }
  },
  {
    id: 'rent-rabat-ambassadeurs-01',
    title: 'Villa Souissi Garden Estate — Location Mensuelle',
    subtitle: 'Demeure de maître pour haute direction et ambassades',
    city: 'Rabat',
    district: 'Souissi',
    category: 'location',
    type: 'Domaine Privé',
    priceMAD: 85000,
    rentalPeriod: 'mois',
    surfaceLivingM2: 750,
    surfaceLandM2: 3500,
    bedrooms: 5,
    bathrooms: 6,
    architect: 'Fouad El Kohen',
    yearBuilt: 2022,
    status: 'disponible',
    featured: false,
    heroImage: '/src/assets/images/villa_marrakech_estate_1792754389244.jpg',
    gallery: [
      '/src/assets/images/villa_marrakech_estate_1792754389244.jpg',
      '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg'
    ],
    description: 'Propriété de très haut standing dans le secteur résidentiel le plus recherché de la capitale du Royaume. Grands salons de protocole, parc boisé et piscine privée.',
    features: [
      'Salons de réception conformes aux exigences consulaires',
      'Système de caméras infrarouge et guérite de sécurité',
      'Piscine et pool house avec vestiaires et sauna'
    ],
    amenities: {
      pool: true,
      hammam: true,
      garden: true,
      garage: 4,
      homeAutomation: true,
      staffQuarters: true
    }
  },
  {
    id: 'rent-taghazout-ocean-01',
    title: 'The Ocean Villa Taghazout — En Location',
    subtitle: 'Pieds dans l\'eau avec vue à 180 degrés sur l\'Atlantique',
    city: 'Agadir',
    district: 'Taghazout Bay Resort',
    category: 'location',
    type: 'Propriété Côtière',
    priceMAD: 58000,
    rentalPeriod: 'semaine',
    surfaceLivingM2: 460,
    surfaceLandM2: 1500,
    bedrooms: 4,
    bathrooms: 4,
    architect: 'Reichen et Robert',
    yearBuilt: 2024,
    status: 'disponible',
    featured: false,
    heroImage: '/src/assets/images/villa_tangier_coast_1792754390808.jpg',
    gallery: [
      '/src/assets/images/villa_tangier_coast_1792754390808.jpg',
      '/src/assets/images/casablanca_penthouse_1792754390171.jpg'
    ],
    description: 'Une parenthèse luxueuse sur l\'une des plus belles baies du Maroc. Piscine à débordement face à la houle, service de plage et majordome privé.',
    features: [
      'Piscine chauffée surplombant les vagues',
      'Équipement de bien-être, yoga deck face au couchant',
      'Chef cuisinier proposant les meilleurs produits de la mer locaux'
    ],
    amenities: {
      pool: true,
      hammam: true,
      seaView: true,
      garden: true,
      garage: 2,
      homeAutomation: true
    }
  }
];

export const INITIAL_VISIT_REQUESTS: VisitRequest[] = [
  {
    id: 'req-1',
    propertyId: 'prop-marrakech-palmeraie-01',
    propertyTitle: 'Villa Al-Badi Contemporaine',
    propertyCity: 'Marrakech',
    clientName: 'Dr. Karim Benjelloun',
    clientEmail: 'k.benjelloun@cabinet-finance.ma',
    clientPhone: '+212 6 61 24 88 90',
    preferredDate: '2026-11-04',
    preferredTimeSlot: 'crepuscule',
    notes: 'Souhaite visiter la propriété au coucher du soleil pour apprécier la vue sur l\'Atlas. Chauffeur VIP demandé depuis l\'aéroport Ménara.',
    needsChauffeur: true,
    status: 'confirme',
    createdAt: '2026-10-21T14:30:00.000Z'
  },
  {
    id: 'req-2',
    propertyId: 'prop-casablanca-anfa-01',
    propertyTitle: 'Penthouse Atlantique Sky-Villa',
    propertyCity: 'Casablanca',
    clientName: 'Éléonore de Montmirail',
    clientEmail: 'eleonore.montmirail@holding-lux.ch',
    clientPhone: '+41 79 345 92 10',
    preferredDate: '2026-11-08',
    preferredTimeSlot: 'apres-midi',
    notes: 'Recherche un pied-à-terre de prestige à Casablanca pour des missions d\'affaires trimestrielles.',
    needsChauffeur: false,
    status: 'en_attente',
    createdAt: '2026-10-22T09:15:00.000Z'
  },
  {
    id: 'req-3',
    propertyId: 'prop-tanger-montagne-01',
    propertyTitle: 'Villa Cap Spartel Belvedere',
    propertyCity: 'Tanger',
    clientName: 'Sami Al-Mansoor',
    clientEmail: 's.almansoor@gulf-invest.ae',
    clientPhone: '+971 50 882 1432',
    preferredDate: '2026-11-12',
    preferredTimeSlot: 'matin',
    notes: 'Vol privé arrivant à Tanger Ibn Battouta. Accompagné de son architecte conseil.',
    needsChauffeur: true,
    status: 'confirme',
    createdAt: '2026-10-23T02:40:00.000Z'
  }
];
