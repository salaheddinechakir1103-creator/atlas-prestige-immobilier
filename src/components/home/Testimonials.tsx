import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: 'Atlas Prestige a su identifier en moins de deux semaines une propriété hors-marché dans la Palmeraie qui répondait exactement à nos critères de discrétion diplomatique et d\'acoustique naturelle. La transaction s\'est déroulée avec une fluidité juridique exemplaire.',
      author: 'Ambassadeur François de Chantal',
      role: 'Délégué aux Affaires Méditerranéennes',
      location: 'Rabat & Genève'
    },
    {
      quote: 'L\'attention portée aux matériaux nobles et à la signature des architectes fait toute la différence. Trouver un penthouse à Casablanca bénéficiant d\'une vraie hauteur sous plafond et d\'un accès privé sur l\'océan relevait du défi : ils ont concrétisé notre vision.',
      author: 'Nadia El Fassi',
      role: 'Directrice Générale, Holding Financière Océane',
      location: 'Casablanca & Londres'
    },
    {
      quote: 'Pour notre collection d\'art contemporain, nous recherchions une villa à Tanger capable d\'offrir à la fois une lumière zénithale contrôlée et une vue spectaculaire sur le Détroit. Le service de conciergerie et l\'accompagnement notarial ont été irréprochables.',
      author: 'Marcus & Hélène von Berg',
      role: 'Collectionneurs & Mécènes d\'Art',
      location: 'Zurich & Tanger'
    }
  ];

  return (
    <section className="py-24 bg-[#0c0d0e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            Témoignages & Confiance
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight">
            La Voix de Nos Acquéreurs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#121418] border border-white/10 p-8 rounded-sm flex flex-col justify-between hover:border-[#c5a880]/40 transition-colors"
            >
              <div>
                <Quote className="w-8 h-8 text-[#c5a880]/30 mb-6" />
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-serif italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-serif font-medium text-white">
                  {t.author}
                </h4>
                <p className="text-xs text-[#c5a880] mt-0.5">{t.role}</p>
                <p className="text-[11px] text-white/40 mt-1">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
