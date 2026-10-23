import React from 'react';
import { Sparkles, Wind, Droplets, Hammer } from 'lucide-react';

export const ArchitecturalManifesto: React.FC = () => {
  const materials = [
    {
      num: '01',
      title: 'Pierre de Taza & Calcaire de Manzel',
      icon: Sparkles,
      desc: 'Taillée au ciseau par les maîtres carriers du Moyen Atlas, cette roche ocre dorée absorbe les rayons du soleil pour restituer une douceur thermique feutrée au crépuscule.'
    },
    {
      num: '02',
      title: 'Pisé Contemporain Bioclimatique',
      icon: Wind,
      desc: 'Mélange de terre crue, paille et chaux locale compacté en banches monolithiques de 60 cm. Une isolation phonique et thermique absolue sans dépendance mécanique excessive.'
    },
    {
      num: '03',
      title: 'L\'Eau comme Axe de Perspective',
      icon: Droplets,
      desc: 'Canaux linéaires en marbre noir, bassins miroirs et patios rafraîchis par brumisation naturelle. L\'eau structure chaque transition entre l\'intimité du salon et l\'immensité du paysage.'
    },
    {
      num: '04',
      title: 'Laiton Brossé & Moucharabieh Métallique',
      icon: Hammer,
      desc: 'Façonnés par nos Maâlems ferronniers de Marrakech et Fès, les panneaux filtrants sculptent la lumière du sud en motifs géométriques cinétiques sur les sols en travertin.'
    }
  ];

  return (
    <section className="py-24 bg-[#0a0b0d] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            Manifeste Architectural
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
            L'Âme des Matières : <br />
            <span className="italic font-normal text-[#dfd4c4]">Une Architecture Qui se Touche.</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-4 leading-relaxed">
            Nous refusons le luxe standardisé des cubes de verre sans racines. Chaque propriété de notre registre incarne un dialogue sensuel entre tradition millénaire marocaine et rigueur contemporaine.
          </p>
        </div>

        {/* 4 Materials Bento Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((mat) => {
            const Icon = mat.icon;
            return (
              <div
                key={mat.num}
                className="bg-[#121418] border border-white/10 hover:border-[#c5a880]/50 p-6 rounded-sm flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-serif text-[#c5a880] tracking-wider">
                      {mat.num}
                    </span>
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-[#c5a880] transition-colors" />
                  </div>
                  <h3 className="text-base font-serif text-white group-hover:text-[#c5a880] transition-colors mb-2">
                    {mat.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {mat.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 mt-6 text-[10px] uppercase tracking-wider text-white/40">
                  Savoir-Faire Marocain Certifié
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
