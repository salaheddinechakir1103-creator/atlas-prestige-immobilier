import React from 'react';
import { useProperties } from '../context/PropertyContext';
import { ShieldCheck, Compass, Sparkles, Scale, ArrowUpRight } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { navigateTo } = useProperties();

  const services = [
    {
      num: '01',
      title: 'Mandats Confidentiels & Acquisitions Hors-Marché',
      icon: ShieldCheck,
      description: 'Pour les acquéreurs et vendeurs exigeant une discrétion absolue, nous opérons via des mandats privés non indexés sur les plateformes publiques. Filtrage scrupuleux des contreparties financières avant toute présentation.',
      deliverables: [
        'Évaluation patrimoniale confidentielle sous 48 heures',
        'Mise en relation avec notre cercle exclusif de Family Offices et d\'investisseurs privés',
        'Présentation physique privatisée sans enseigne extérieure ni perturbation de voisinage'
      ]
    },
    {
      num: '02',
      title: 'Architecture & Restauration Bioclimatique',
      icon: Compass,
      description: 'En partenariat avec les plus grands ateliers d\'architecture marocains et européens, nous accompagnons la réhabilitation de kasbahs, riads historiques et villas contemporaines.',
      deliverables: [
        'Coordination des Maâlems plâtriers, zelligeurs et marbriers d\'élite',
        'Audit thermique et intégration de géothermie, puits canadiens et vitrages Stopray',
        'Suivi de chantier rigoureux et assistance à la réception d\'ouvrage'
      ]
    },
    {
      num: '03',
      title: 'Gestion Privée & Conciergerie de Propriété',
      icon: Sparkles,
      description: 'Déléguez l\'intendance de votre domaine en toute sérénité. Recrutement de majordomes, entretien technique des piscines et bassins miroirs, gestion locative saisonnière premium.',
      deliverables: [
        'Préparation intégrale de la demeure avant chaque arrivée de propriétaire',
        'Maintenance préventive des installations domotiques et climatisation',
        'Maximisation du rendement locatif saisonnier avec service hôtelier 5 étoiles'
      ]
    },
    {
      num: '04',
      title: 'Ingénierie Notariale & Rapatriement de Capitaux',
      icon: Scale,
      description: 'Le Maroc offre un cadre juridique protecteur pour les investisseurs étrangers grâce aux conventions de non-double imposition et à la garantie de retransfert de l\'Office des Changes.',
      deliverables: [
        'Rédaction des compromis et actes authentiques avec les études notariales agréées',
        'Vérification des titres fonciers au Cadastre et purge des servitudes',
        'Constitution de sociétés patrimoniales marocaines (SARL immobilières)'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#0b0c0e] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            Maison Atlas Prestige
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
            Services Fonciers & Accompagnement de Maître
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-4 leading-relaxed">
            De la recherche confidentielle à la gestion quotidienne de votre domaine, nous déployons une expertise transversale rare au Royaume du Maroc.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="space-y-10">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.num}
                className="p-8 lg:p-10 bg-[#121418] border border-white/10 hover:border-[#c5a880]/50 rounded-sm transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-serif text-[#c5a880] tracking-wider">
                      {svc.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#c5a880]" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-serif text-white leading-snug">
                    {svc.title}
                  </h3>
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#c5a880] block font-medium">
                      Engagements Clés :
                    </span>
                    <ul className="space-y-2 text-xs text-white/80">
                      {svc.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#c5a880] mt-0.5">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-16 p-10 bg-[#14161a] border border-[#c5a880]/40 rounded-sm text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium block">
            Demande d'Estimation Gratuite & Confidentielle
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">
            Vous souhaitez céder une propriété d'exception ?
          </h2>
          <p className="text-xs text-white/60 max-w-lg mx-auto">
            Nos directeurs de bureaux à Marrakech, Casablanca et Tanger se déplacent personnellement pour réaliser une estimation rigoureuse de votre bien.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-[0.16em] bg-[#c5a880] text-black font-semibold hover:bg-[#d6bc95] transition-colors rounded-sm"
            >
              <span>Rencontrer un Associé Atlas</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
