import React from 'react';
import { useProperties } from '../../context/PropertyContext';
import { Plane, Key, FileCheck, ArrowUpRight } from 'lucide-react';

export const VipExperience: React.FC = () => {
  const { navigateTo } = useProperties();

  const services = [
    {
      icon: Plane,
      title: 'Accueil Aéroportuaire & Vol Privé',
      description: 'Accueil VIP salon d\'honneur aux aéroports de Marrakech Ménara, Casablanca Mohammed V et Tanger Ibn Battouta. Chauffeur dédié en Mercedes Maybach ou Classe V.'
    },
    {
      icon: FileCheck,
      title: 'Accord de Confidentialité Strict (NDA)',
      description: 'Chaque visite de domaine d\'exception fait l\'objet d\'un protocole de discrétion absolue pour préserver l\'anonymat des acquéreurs et des propriétaires.'
    },
    {
      icon: Key,
      title: 'Conseil Notarial & Structuration Fiscale',
      description: 'Accompagnement complet auprès des études notariales de référence au Maroc, rapatriement de capitaux garanti par l\'Office des Changes et structuration patrimoniale.'
    }
  ];

  return (
    <section className="py-24 bg-[#0a0b0d] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block">
              Conciergerie Foncière Haute Qualité
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
              Une Expérience d'Acquisition Sans Équivalent.
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Nous orchestrons vos visites immobilières comme des séjours de maître. Dès votre arrivée sur le tarmac, chaque détail logistique, juridique et esthétique est calibré sur mesure.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.16em] bg-[#c5a880] text-black font-semibold hover:bg-[#d6bc95] transition-colors rounded-sm"
              >
                <span>Solliciter un Mandat Privé</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Pillars */}
          <div className="lg:col-span-7 space-y-4">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-[#121418] border border-white/10 rounded-sm flex items-start gap-5 hover:border-[#c5a880]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center shrink-0 text-[#c5a880]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
