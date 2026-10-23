import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { Property, VisitRequest, PropertyCity, PropertyType, PropertyCategory, PropertyStatus } from '../types/property';
import { formatMAD, formatSurface } from '../utils/formatters';
import {
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Car,
  RotateCcw,
  Eye,
  AlertCircle,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    properties,
    visitRequests,
    addProperty,
    updateProperty,
    deleteProperty,
    updateVisitStatus,
    deleteVisitRequest,
    resetAllData,
    navigateTo,
    addToast
  } = useProperties();

  const [activeTab, setActiveTab] = useState<'properties' | 'visits' | 'settings'>('properties');
  const [propertySearch, setPropertySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | 'all'>('all');
  const [cityFilter, setCityFilter] = useState<PropertyCity | 'all'>('all');

  // Modal for Add/Edit Property
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Form fields for Add/Edit
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCity, setFormCity] = useState<PropertyCity>('Marrakech');
  const [formDistrict, setFormDistrict] = useState('');
  const [formCategory, setFormCategory] = useState<PropertyCategory>('achat');
  const [formType, setFormType] = useState<PropertyType>('Villa d\'Architecte');
  const [formPriceMAD, setFormPriceMAD] = useState<number>(25000000);
  const [formSurfaceLiving, setFormSurfaceLiving] = useState<number>(650);
  const [formSurfaceLand, setFormSurfaceLand] = useState<number>(3000);
  const [formBedrooms, setFormBedrooms] = useState<number>(5);
  const [formBathrooms, setFormBathrooms] = useState<number>(5);
  const [formArchitect, setFormArchitect] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState<PropertyStatus>('disponible');

  // KPI calculations
  const totalValueMAD = properties
    .filter((p) => p.category === 'achat')
    .reduce((acc, p) => acc + p.priceMAD, 0);

  const pendingVisitsCount = visitRequests.filter((v) => v.status === 'en_attente').length;
  const avgPriceM2 = Math.round(
    totalValueMAD /
      properties.filter((p) => p.category === 'achat').reduce((acc, p) => acc + p.surfaceLivingM2, 0)
  );

  // Filter properties in table
  const filteredProperties = properties.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (cityFilter !== 'all' && p.city !== cityFilter) return false;
    if (propertySearch.trim()) {
      const q = propertySearch.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openCreateModal = () => {
    setEditingProperty(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormCity('Marrakech');
    setFormDistrict('Palmeraie');
    setFormCategory('achat');
    setFormType('Villa d\'Architecte');
    setFormPriceMAD(28000000);
    setFormSurfaceLiving(700);
    setFormSurfaceLand(3500);
    setFormBedrooms(5);
    setFormBathrooms(5);
    setFormArchitect('Studio Architectural Maroc');
    setFormDescription('Somptueuse villa contemporaine conçue avec des matériaux nobles marocains et de vastes baies vitrées.');
    setFormStatus('disponible');
    setIsModalOpen(true);
  };

  const openEditModal = (prop: Property) => {
    setEditingProperty(prop);
    setFormTitle(prop.title);
    setFormSubtitle(prop.subtitle);
    setFormCity(prop.city);
    setFormDistrict(prop.district);
    setFormCategory(prop.category);
    setFormType(prop.type);
    setFormPriceMAD(prop.priceMAD);
    setFormSurfaceLiving(prop.surfaceLivingM2);
    setFormSurfaceLand(prop.surfaceLandM2 || 0);
    setFormBedrooms(prop.bedrooms);
    setFormBathrooms(prop.bathrooms);
    setFormArchitect(prop.architect || '');
    setFormDescription(prop.description);
    setFormStatus(prop.status);
    setIsModalOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || formPriceMAD <= 0) return;

    if (editingProperty) {
      updateProperty({
        ...editingProperty,
        title: formTitle,
        subtitle: formSubtitle,
        city: formCity,
        district: formDistrict,
        category: formCategory,
        type: formType,
        priceMAD: Number(formPriceMAD),
        surfaceLivingM2: Number(formSurfaceLiving),
        surfaceLandM2: Number(formSurfaceLand) || undefined,
        bedrooms: Number(formBedrooms),
        bathrooms: Number(formBathrooms),
        architect: formArchitect,
        description: formDescription,
        status: formStatus
      });
    } else {
      addProperty({
        title: formTitle,
        subtitle: formSubtitle,
        city: formCity,
        district: formDistrict,
        category: formCategory,
        type: formType,
        priceMAD: Number(formPriceMAD),
        surfaceLivingM2: Number(formSurfaceLiving),
        surfaceLandM2: Number(formSurfaceLand) || undefined,
        bedrooms: Number(formBedrooms),
        bathrooms: Number(formBathrooms),
        architect: formArchitect,
        yearBuilt: 2025,
        status: formStatus,
        featured: false,
        heroImage: '/src/assets/images/hero_moroccan_villa_1792754388660.jpg',
        gallery: [
          '/src/assets/images/hero_moroccan_villa_1792754388660.jpg',
          '/src/assets/images/luxury_moroccan_interior_1792754390197.jpg'
        ],
        description: formDescription,
        features: [
          'Piscine à débordement chauffée',
          'Hammam traditionnel en marbre',
          'Domotique et sécurité intégrées'
        ],
        amenities: {
          pool: true,
          hammam: true,
          garden: true,
          garage: 2,
          homeAutomation: true
        }
      });
    }
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#08090b] py-10 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Notice Disclaimer (Required: Never present LocalStorage as a secure backend) */}
        <div className="mb-8 p-3.5 bg-amber-950/40 border border-amber-600/30 rounded-sm text-xs text-amber-200/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Espace Régie & Démonstration :</strong> Les données sont persistées localement dans votre navigateur via LocalStorage à titre de démonstration interactive fonctionnelle.
            </span>
          </div>
          <button
            onClick={resetAllData}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-900/40 hover:bg-amber-900/70 border border-amber-600/40 rounded-sm text-[11px] uppercase tracking-wider text-amber-100 whitespace-nowrap"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Réinitialiser Démo</span>
          </button>
        </div>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-1">
              Console d'Administration Privée
            </span>
            <h1 className="text-3xl font-serif">Tableau de Bord Atlas Prestige</h1>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-sm">
            <button
              onClick={() => setActiveTab('properties')}
              className={`px-4 py-2 text-xs rounded-sm transition-colors whitespace-nowrap ${
                activeTab === 'properties' ? 'bg-[#c5a880] text-black font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              Catalogue des Biens ({properties.length})
            </button>
            <button
              onClick={() => setActiveTab('visits')}
              className={`px-4 py-2 text-xs rounded-sm transition-colors whitespace-nowrap relative ${
                activeTab === 'visits' ? 'bg-[#c5a880] text-black font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              Demandes de Visite ({visitRequests.length})
              {pendingVisitsCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-black text-[10px] font-bold rounded-full">
                  {pendingVisitsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 bg-[#121418] border border-white/10 rounded-sm">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-xs uppercase tracking-wider">Valeur du Portfolio</span>
              <DollarSign className="w-4 h-4 text-[#c5a880]" />
            </div>
            <div className="text-2xl font-serif text-white tabular-nums">
              {formatMAD(totalValueMAD)}
            </div>
            <span className="text-[11px] text-white/40 mt-1 block">Mandats de vente actifs</span>
          </div>

          <div className="p-6 bg-[#121418] border border-white/10 rounded-sm">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-xs uppercase tracking-wider">Résidences en Ligne</span>
              <Building2 className="w-4 h-4 text-[#c5a880]" />
            </div>
            <div className="text-2xl font-serif text-white tabular-nums">
              {properties.length}
            </div>
            <span className="text-[11px] text-white/40 mt-1 block">
              {properties.filter((p) => p.category === 'achat').length} ventes ·{' '}
              {properties.filter((p) => p.category === 'location').length} locations
            </span>
          </div>

          <div className="p-6 bg-[#121418] border border-white/10 rounded-sm">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-xs uppercase tracking-wider">Visites Sollicitées</span>
              <Calendar className="w-4 h-4 text-[#c5a880]" />
            </div>
            <div className="text-2xl font-serif text-[#c5a880] tabular-nums">
              {visitRequests.length}
            </div>
            <span className="text-[11px] text-white/40 mt-1 block">
              {pendingVisitsCount} en attente de confirmation
            </span>
          </div>

          <div className="p-6 bg-[#121418] border border-white/10 rounded-sm">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-xs uppercase tracking-wider">Prix Moyen au m²</span>
              <TrendingUp className="w-4 h-4 text-[#c5a880]" />
            </div>
            <div className="text-2xl font-serif text-white tabular-nums">
              {avgPriceM2.toLocaleString('fr-FR')} MAD / m²
            </div>
            <span className="text-[11px] text-white/40 mt-1 block">Surfaces bâties habitables</span>
          </div>
        </div>

        {/* TAB 1: PROPERTIES MANAGEMENT */}
        {activeTab === 'properties' && (
          <div className="bg-[#121418] border border-white/10 rounded-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Search & Filters */}
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={propertySearch}
                    onChange={(e) => setPropertySearch(e.target.value)}
                    placeholder="Filtrer par nom ou quartier..."
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value as any)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-xs text-white"
                >
                  <option value="all">Toutes les Villes</option>
                  <option value="Marrakech">Marrakech</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Tanger">Tanger</option>
                  <option value="Rabat">Rabat</option>
                  <option value="Essaouira">Essaouira</option>
                  <option value="Agadir">Agadir</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-xs text-white"
                >
                  <option value="all">Tous les Statuts</option>
                  <option value="disponible">Disponible</option>
                  <option value="sous_offre">Sous Offre</option>
                  <option value="vendu">Vendu</option>
                </select>
              </div>

              {/* Add Button */}
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider bg-[#c5a880] text-black font-semibold rounded-sm hover:bg-[#d6bc95] whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Bien</span>
              </button>
            </div>

            {/* Properties Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Propriété</th>
                    <th className="py-3 px-4">Localisation</th>
                    <th className="py-3 px-4">Typologie</th>
                    <th className="py-3 px-4">Prix (MAD)</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-serif text-sm text-white font-medium">
                          {prop.title}
                        </div>
                        <div className="text-[11px] text-white/40">
                          {formatSurface(prop.surfaceLivingM2)} · {prop.bedrooms} suites
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-white/80">
                        {prop.city}
                        <span className="block text-[10px] text-white/40">{prop.district}</span>
                      </td>
                      <td className="py-3.5 px-4 text-white/70">
                        {prop.type}
                        <span className="block text-[10px] text-[#c5a880] capitalize">
                          {prop.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-white tabular-nums">
                        {formatMAD(prop.priceMAD)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                            prop.status === 'disponible'
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                              : prop.status === 'sous_offre'
                              ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                              : 'bg-white/10 text-white/50'
                          }`}
                        >
                          {prop.status === 'disponible'
                            ? 'Disponible'
                            : prop.status === 'sous_offre'
                            ? 'Sous Offre'
                            : 'Vendu'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => navigateTo('property-detail', prop.id)}
                          className="p-1.5 text-white/60 hover:text-white"
                          title="Voir sur le site"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(prop)}
                          className="p-1.5 text-white/60 hover:text-[#c5a880]"
                          title="Modifier"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Supprimer la propriété "${prop.title}" ?`)) {
                              deleteProperty(prop.id);
                            }
                          }}
                          className="p-1.5 text-white/60 hover:text-rose-400"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: VISIT REQUESTS MANAGEMENT */}
        {activeTab === 'visits' && (
          <div className="bg-[#121418] border border-white/10 rounded-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif">Demandes de Visite VIP Reçues</h3>
              <span className="text-xs text-white/50">
                Protocole de réponse sous 2 heures
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Propriété</th>
                    <th className="py-3 px-4">Date & Créneau</th>
                    <th className="py-3 px-4">Logistique</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {visitRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{req.clientName}</div>
                        <div className="text-[11px] text-white/50">{req.clientEmail}</div>
                        <div className="text-[11px] text-[#c5a880] tabular-nums">{req.clientPhone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-white font-serif">{req.propertyTitle}</div>
                        <div className="text-[10px] text-white/40">{req.propertyCity}</div>
                      </td>
                      <td className="py-3.5 px-4 text-white/80">
                        <div className="tabular-nums font-medium">{req.preferredDate}</div>
                        <div className="text-[10px] text-white/50 uppercase tracking-wider">
                          Créneau : {req.preferredTimeSlot}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        {req.needsChauffeur ? (
                          <div className="flex items-center gap-1.5 text-amber-300">
                            <Car className="w-3.5 h-3.5" />
                            <span>Chauffeur VIP Demandé</span>
                          </div>
                        ) : (
                          <span className="text-white/40">Arrivée autonome</span>
                        )}
                        {req.notes && (
                          <p className="text-[10px] text-white/60 italic mt-1 line-clamp-1 max-w-xs">
                            "{req.notes}"
                          </p>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={req.status}
                          onChange={(e) => updateVisitStatus(req.id, e.target.value as any)}
                          className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-[11px] text-white"
                        >
                          <option value="en_attente">En Attente</option>
                          <option value="confirme">Confirmé</option>
                          <option value="effectue">Effectué</option>
                          <option value="annule">Annulé</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm('Supprimer cette demande ?')) {
                              deleteVisitRequest(req.id);
                            }
                          }}
                          className="p-1.5 text-white/50 hover:text-rose-400"
                          title="Supprimer la demande"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* CREATE / EDIT PROPERTY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#14161a] border border-white/15 rounded-sm p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xl font-serif">
                {editingProperty ? 'Modifier la Résidence' : 'Créer une Nouvelle Fiche'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-4 text-xs">
              <div>
                <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                  Titre de la Propriété *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ex: Villa Kasbah Mirage"
                  required
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                  Sous-titre / Accroche Éditoriale
                </label>
                <input
                  type="text"
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="Ex: Demeure de maître en pisé avec vue imprenable sur l'Atlas"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Ville *
                  </label>
                  <select
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1a1d22] border border-white/10 rounded-sm text-white"
                  >
                    <option value="Marrakech">Marrakech</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Essaouira">Essaouira</option>
                    <option value="Agadir">Agadir</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Quartier *
                  </label>
                  <input
                    type="text"
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    placeholder="Palmeraie, Anfa, etc."
                    required
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Catégorie
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1a1d22] border border-white/10 rounded-sm text-white"
                  >
                    <option value="achat">Vente (Achat)</option>
                    <option value="location">Location</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Typologie
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1a1d22] border border-white/10 rounded-sm text-white"
                  >
                    <option value="Villa d'Architecte">Villa d'Architecte</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Riad Contemporain">Riad Contemporain</option>
                    <option value="Domaine Privé">Domaine Privé</option>
                    <option value="Propriété Côtière">Propriété Côtière</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Prix en MAD *
                  </label>
                  <input
                    type="number"
                    value={formPriceMAD}
                    onChange={(e) => setFormPriceMAD(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Statut du Mandat
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1a1d22] border border-white/10 rounded-sm text-white"
                  >
                    <option value="disponible">Disponible</option>
                    <option value="sous_offre">Sous Offre</option>
                    <option value="vendu">Vendu</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Surface Habitable (m²)
                  </label>
                  <input
                    type="number"
                    value={formSurfaceLiving}
                    onChange={(e) => setFormSurfaceLiving(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Terrain (m²)
                  </label>
                  <input
                    type="number"
                    value={formSurfaceLand}
                    onChange={(e) => setFormSurfaceLand(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Chambres
                  </label>
                  <input
                    type="number"
                    value={formBedrooms}
                    onChange={(e) => setFormBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Bains
                  </label>
                  <input
                    type="number"
                    value={formBathrooms}
                    onChange={(e) => setFormBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                  Architecte / Maître d'Œuvre
                </label>
                <input
                  type="text"
                  value={formArchitect}
                  onChange={(e) => setFormArchitect(e.target.value)}
                  placeholder="Ex: Imaad Rahmouni"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-sm text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                  Description de la Propriété
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-sm text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-white/60 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs uppercase tracking-wider bg-[#c5a880] text-black font-semibold rounded-sm hover:bg-[#d6bc95]"
                >
                  {editingProperty ? 'Enregistrer Modifications' : 'Créer la Fiche'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
