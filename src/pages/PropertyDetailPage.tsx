import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { formatMAD, formatSurface, buildWhatsAppLink } from '../utils/formatters';
import { FloorPlan3D } from '../components/3d/FloorPlan3D';
import { VisitRequestModal } from '../components/property/VisitRequestModal';
import { PropertyCard } from '../components/property/PropertyCard';
import {
  Heart,
  Share2,
  Download,
  Calendar,
  MessageCircle,
  MapPin,
  Maximize2,
  Check,
  Calculator,
  ArrowLeft,
  ShieldCheck,
  Compass,
  Building,
  Sparkles
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { selectedProperty, properties, toggleFavorite, isFavorite, navigateTo, addToast } = useProperties();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplan' | 'financial'>('overview');

  // Mortgage Calculator State in MAD
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30% apport
  const [loanDurationYears, setLoanDurationYears] = useState<number>(20); // 20 ans
  const [interestRate, setInterestRate] = useState<number>(4.75); // 4.75% standard banque marocaine

  if (!selectedProperty) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0c0e] text-white p-6">
        <h2 className="text-2xl font-serif mb-4">Propriété non trouvée</h2>
        <button
          onClick={() => navigateTo('buy')}
          className="px-6 py-2.5 bg-[#c5a880] text-black text-xs uppercase tracking-wider rounded-sm font-semibold"
        >
          Retour au Catalogue
        </button>
      </div>
    );
  }

  const favorited = isFavorite(selectedProperty.id);

  // Mortgage Math
  const price = selectedProperty.priceMAD;
  const downPaymentAmount = (price * downPaymentPercent) / 100;
  const loanPrincipal = price - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanDurationYears * 12;
  const monthlyPayment =
    loanPrincipal > 0 && monthlyRate > 0
      ? (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  // Similar properties
  const similar = properties
    .filter((p) => p.id !== selectedProperty.id && (p.city === selectedProperty.city || p.type === selectedProperty.type))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Lien copié', 'Le lien vers ce dossier d\'exception a été copié.', 'gold');
    }
  };

  const handleDownloadBrochure = () => {
    addToast(
      'Brochure Confidentielle',
      `Téléchargement du dossier de présentation PDF de "${selectedProperty.title}" en cours...`,
      'gold'
    );
  };

  return (
    <main className="min-h-screen bg-[#0b0c0e] py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 text-xs text-white/60">
          <button
            onClick={() => navigateTo('buy')}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Retour aux Résidences</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 hover:text-white transition-colors p-1"
              title="Partager ce bien"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Partager</span>
            </button>
            <button
              onClick={handleDownloadBrochure}
              className="flex items-center gap-1.5 hover:text-white transition-colors p-1"
              title="Brochure PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Brochure Privée</span>
            </button>
            <button
              onClick={() => toggleFavorite(selectedProperty.id)}
              className={`flex items-center gap-1.5 p-1 transition-colors ${
                favorited ? 'text-[#c5a880]' : 'hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{favorited ? 'Dans vos Favoris' : 'Sauvegarder'}</span>
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Main Visual */}
          <div className="lg:col-span-9 relative aspect-[16/10] overflow-hidden rounded-sm bg-[#14161a] border border-white/10">
            <img
              src={selectedProperty.gallery[activeImageIndex] || selectedProperty.heroImage}
              alt={selectedProperty.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs uppercase tracking-wider text-white">
              <span className="text-[#c5a880]">{selectedProperty.city}</span>
              <span>·</span>
              <span>{selectedProperty.district}</span>
            </div>
          </div>

          {/* Thumbnails Column */}
          <div className="lg:col-span-3 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
            {selectedProperty.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/10] lg:aspect-auto lg:h-32 rounded-sm overflow-hidden border transition-all shrink-0 w-36 lg:w-full ${
                  activeImageIndex === idx ? 'border-[#c5a880] ring-1 ring-[#c5a880]' : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Aperçu ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Property Header & Sticky Action Bar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Details & Tabs */}
          <div className="lg:col-span-8 space-y-10">
            {/* Title & Price Header */}
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium mb-2">
                <span>{selectedProperty.type}</span>
                <span>·</span>
                <span>Construit en {selectedProperty.yearBuilt}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
                {selectedProperty.title}
              </h1>
              <p className="text-sm text-white/70 mt-2 font-serif italic">
                {selectedProperty.subtitle}
              </p>

              {/* Architect mention */}
              {selectedProperty.architect && (
                <div className="flex items-center gap-2 mt-4 text-xs text-white/50">
                  <Building className="w-4 h-4 text-[#c5a880]" />
                  <span>Conception & Architecture : <strong className="text-white/80">{selectedProperty.architect}</strong></span>
                </div>
              )}
            </div>

            {/* Spec KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#121418] border border-white/10 rounded-sm">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">Surface Habitable</span>
                <span className="text-lg font-serif text-white tabular-nums mt-0.5 block">
                  {formatSurface(selectedProperty.surfaceLivingM2)}
                </span>
              </div>
              {selectedProperty.surfaceLandM2 && (
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Terrain & Parc</span>
                  <span className="text-lg font-serif text-white tabular-nums mt-0.5 block">
                    {formatSurface(selectedProperty.surfaceLandM2)}
                  </span>
                </div>
              )}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">Suites / Chambres</span>
                <span className="text-lg font-serif text-white tabular-nums mt-0.5 block">
                  {selectedProperty.bedrooms} suites
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">Salles de Bains</span>
                <span className="text-lg font-serif text-white tabular-nums mt-0.5 block">
                  {selectedProperty.bathrooms} bains
                </span>
              </div>
            </div>

            {/* Navigation Tabs (Description, Plan 3D, Financement) */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors relative ${
                  activeTab === 'overview' ? 'text-[#c5a880] font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                Description & Matériaux
                {activeTab === 'overview' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a880]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('floorplan')}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors relative flex items-center gap-1.5 ${
                  activeTab === 'floorplan' ? 'text-[#c5a880] font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Plan 3D Interactif</span>
                {activeTab === 'floorplan' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a880]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('financial')}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors relative flex items-center gap-1.5 ${
                  activeTab === 'financial' ? 'text-[#c5a880] font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Simulateur MAD</span>
                {activeTab === 'financial' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a880]" />
                )}
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-xl font-serif text-white mb-3">La Propriété</h3>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    {selectedProperty.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-4">Équipements & Signatures Architecturales</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/80">
                    {selectedProperty.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 bg-white/5 border border-white/5 rounded-sm">
                        <Check className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities checklist */}
                <div className="p-6 bg-[#121418] border border-white/10 rounded-sm">
                  <h4 className="text-xs uppercase tracking-wider text-[#c5a880] font-medium mb-4">
                    Registre des Installations
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-white/70">
                    {selectedProperty.amenities.pool && <div>✓ Piscine Privée Chauffée</div>}
                    {selectedProperty.amenities.hammam && <div>✓ Hammam Traditionnel Marbre</div>}
                    {selectedProperty.amenities.atlasView && <div>✓ Vue Chaîne de l'Atlas</div>}
                    {selectedProperty.amenities.seaView && <div>✓ Panorama Océan Atlantique</div>}
                    {selectedProperty.amenities.golfView && <div>✓ Première Ligne Golf</div>}
                    {selectedProperty.amenities.homeAutomation && <div>✓ Domotique Lutron Intégrale</div>}
                    {selectedProperty.amenities.wineCellar && <div>✓ Cave à Vin Régulée</div>}
                    {selectedProperty.amenities.staffQuarters && <div>✓ Logements de Service & Majordome</div>}
                    {selectedProperty.amenities.garage > 0 && (
                      <div>✓ Garage Couvert ({selectedProperty.amenities.garage} véhicules)</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: 3D Floor Plan */}
            {activeTab === 'floorplan' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-xl font-serif text-white mb-1">
                    Écorché Architectural & Axonométrie 3D
                  </h3>
                  <p className="text-xs text-white/60">
                    Basculez entre le niveau rez-de-chaussée et l'étage pour apprécier les volumes intérieurs et les percées de lumière.
                  </p>
                </div>
                <FloorPlan3D
                  levelsCount={selectedProperty.floorPlanData?.levels || 2}
                  groundSummary={selectedProperty.floorPlanData?.groundFloorSummary}
                  upperSummary={selectedProperty.floorPlanData?.upperFloorSummary}
                  outdoorSummary={selectedProperty.floorPlanData?.outdoorSummary}
                />
              </div>
            )}

            {/* Tab 3: Financial Simulator */}
            {activeTab === 'financial' && (
              <div className="p-6 bg-[#121418] border border-white/10 rounded-sm space-y-6 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-xl font-serif text-white mb-1">
                    Simulateur de Financement Bancaire (MAD)
                  </h3>
                  <p className="text-xs text-white/60">
                    Calcul indicatif selon les conditions des banques privées partenaires au Maroc (Attijariwafa, BCP, Bank of Africa).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                  <div>
                    <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-2">
                      Apport Personnel : {downPaymentPercent}% ({formatMAD(downPaymentAmount)})
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={70}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-2">
                      Durée du Prêt : {loanDurationYears} ans
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={25}
                      step={1}
                      value={loanDurationYears}
                      onChange={(e) => setLoanDurationYears(Number(e.target.value))}
                      className="w-full accent-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-2">
                      Taux d'Intérêt Annuel Fixe : {interestRate}%
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      min={2}
                      max={10}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-white"
                    />
                  </div>
                </div>

                {/* Calculation Output */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/40 block">
                      Mensualité Estimée
                    </span>
                    <span className="text-2xl font-serif text-[#c5a880] font-medium tabular-nums">
                      {formatMAD(Math.round(monthlyPayment))} / mois
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-white/50 space-y-0.5">
                    <p>Montant emprunté : {formatMAD(loanPrincipal)}</p>
                    <p>Frais d'enregistrement notarial (~6%) non inclus</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Action & Concierge Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-6 bg-[#121418] border border-[#c5a880]/30 rounded-sm shadow-2xl text-white space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold block mb-1">
                  {selectedProperty.category === 'achat' ? 'Prix d\'Acquisition' : 'Tarif de Location'}
                </span>
                <div className="text-3xl font-serif text-white tracking-tight">
                  {formatMAD(selectedProperty.priceMAD)}
                  {selectedProperty.rentalPeriod && (
                    <span className="text-sm font-sans text-white/60 ml-2">
                      / {selectedProperty.rentalPeriod}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-white/40 mt-1">
                  Honoraires d'agence et discrétion contractuelle inclus.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="w-full py-3.5 px-4 text-xs uppercase tracking-[0.18em] font-semibold bg-[#c5a880] text-black hover:bg-[#d6bc95] transition-colors rounded-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Demander une Visite VIP</span>
                </button>

                <a
                  href={buildWhatsAppLink(selectedProperty.title, selectedProperty.city, formatMAD(selectedProperty.priceMAD))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs uppercase tracking-[0.16em] font-medium bg-[#142e22] text-[#4ade80] hover:bg-[#1a3d2e] border border-[#22c55e]/30 transition-colors rounded-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Conciergerie WhatsApp Direct</span>
                </a>
              </div>

              {/* Concierge Agent Contact Badge */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] font-serif font-bold text-sm">
                  AP
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Bureau d'Apparat {selectedProperty.city}</h5>
                  <p className="text-[11px] text-white/50">Mandat Privé Exclusif</p>
                </div>
              </div>
            </div>

            {/* Discreet Protocol Box */}
            <div className="p-5 bg-white/5 border border-white/5 rounded-sm text-xs text-white/60 space-y-2">
              <div className="flex items-center gap-2 text-white font-medium text-xs">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                <span>Garantie de Discrétion Diplomatique</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Atlas Prestige opère sous convention d'honorabilité et s'engage à ne jamais divulguer l'identité des visiteurs ou des acquéreurs sans mandat préalable.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="pt-16 border-t border-white/10">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium block mb-1">
                Découvertes Similaires
              </span>
              <h2 className="text-2xl font-serif text-white">
                Autres Propriétés Remarquables à {selectedProperty.city}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal for VIP Showings */}
      <VisitRequestModal
        property={selectedProperty}
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />
    </main>
  );
};
