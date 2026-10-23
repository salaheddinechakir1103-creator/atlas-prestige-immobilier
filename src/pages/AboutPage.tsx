import fixedImage0 from '../assets/images/hero_moroccan_villa_1792754388660.jpg';
import React from 'react';
import { useProperties } from '../context/PropertyContext';
import { Award, Compass, HeartHandshake, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useProperties();

  const leadership = [
    {
      name: 'Dr. Yassine El Amrani',
      role: 'Associé Fondateur & Directeur Général',
      bio: 'Ancien banquier d\'affaires à Londres et Casablanca, passionné de patrimoine architectural maghrébin et de finance foncière.'
    },
    {
      name: 'Salma Benmansour',
      role: 'Directrice du Pôle Architecture & Design',
      bio: 'Architecte DPLG diplômée de Paris-Belleville, spécialisée dans la réhabilitation bioclimatique en pisé et en pierre de Taza.'
    },
    {
      name: 'Arthur de Saint-Germain',
      role: 'Directeur Clientèle Internationale & Family Offices',
      bio: 'Quinze années au service de grandes dynasties européennes et moyen-orientales pour leurs acquisitions de villégiature au Maroc.'
    }
  ];

  return (
    <main className="min-h-screen bg-[#0b0c0e] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Story Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            Notre Histoire & Vision
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
            Cultiver l'Élégance Immobilière au Maroc
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-4 leading-relaxed">
            Fondée en 2012 par des passionnés de haute architecture et d'art de vivre marocain, Atlas Prestige est née d'un constat simple : les plus belles propriétés du Royaume méritaient une maison de conseil qui comprenne intimement la pierre, la lumière et le secret des transactions réussies.
          </p>
        </div>

        {/* Hero Visual Card */}
        <div className="relative aspect-[21/9] rounded-sm overflow-hidden border border-white/10 mb-16 bg-[#121418]">
          <img
            src={fixedImage0}
            alt="Maison Atlas Prestige"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-medium block mb-1">
                La Palmeraie, Marrakech
              </span>
              <h3 className="text-xl sm:text-2xl font-serif">
                Siège Historique & Pavillon d'Accueil Privé
              </h3>
            </div>
            <div className="hidden sm:block text-xs text-white/60 tabular-nums">
              Km 6, Route de Fès
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-white/10 mb-16 text-center">
          <div>
            <span className="block text-3xl lg:text-4xl font-serif text-white tabular-nums">
              2.4 Md MAD
            </span>
            <span className="text-[11px] uppercase tracking-wider text-white/50 mt-1 block">
              Volume de Transactions
            </span>
          </div>
          <div>
            <span className="block text-3xl lg:text-4xl font-serif text-[#c5a880] tabular-nums">
              14 Ans
            </span>
            <span className="text-[11px] uppercase tracking-wider text-white/50 mt-1 block">
              D'Expertise Foncière au Maroc
            </span>
          </div>
          <div>
            <span className="block text-3xl lg:text-4xl font-serif text-white tabular-nums">
              18 Domaines
            </span>
            <span className="text-[11px] uppercase tracking-wider text-white/50 mt-1 block">
              Mandats Privés Actifs
            </span>
          </div>
          <div>
            <span className="block text-3xl lg:text-4xl font-serif text-[#c5a880] tabular-nums">
              98.4 %
            </span>
            <span className="text-[11px] uppercase tracking-wider text-white/50 mt-1 block">
              Taux de Satisfaction Clients
            </span>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium block mb-1">
              Gouvernance & Associés
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">
              Une Équipe au Service de Vos Ambitions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((leader, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#121418] border border-white/10 rounded-sm hover:border-[#c5a880]/40 transition-colors"
              >
                <div className="w-12 h-12 bg-[#c5a880]/15 text-[#c5a880] rounded-full flex items-center justify-center font-serif text-base font-bold mb-4">
                  {leader.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="text-base font-serif text-white mb-1">
                  {leader.name}
                </h3>
                <p className="text-xs text-[#c5a880] mb-3">{leader.role}</p>
                <p className="text-xs text-white/60 leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Contact Callout */}
        <div className="p-8 bg-[#14161a] border border-white/10 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-serif text-white">Envie d'échanger autour de votre projet foncier ?</h3>
            <p className="text-xs text-white/60 mt-1">Nos bureaux de Marrakech, Casablanca et Tanger vous accueillent sur rendez-vous.</p>
          </div>
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 text-xs uppercase tracking-wider bg-[#c5a880] text-black font-semibold rounded-sm hover:bg-[#d6bc95] whitespace-nowrap"
          >
            Prendre Rendez-vous
          </button>
        </div>
      </div>
    </main>
  );
};
