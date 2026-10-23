import cityImage1 from '../../assets/images/hero_moroccan_villa_1792754388660.jpg';
import cityImage2 from '../../assets/images/casablanca_penthouse_1792754390171.jpg';
import cityImage3 from '../../assets/images/villa_tangier_coast_1792754390808.jpg';
import cityImage4 from '../../assets/images/villa_marrakech_estate_1792754389244.jpg';
import React from 'react';
import { useProperties } from '../../context/PropertyContext';
import { PropertyCity } from '../../types/property';
import { ArrowUpRight } from 'lucide-react';

interface CityShowcase {
  city: PropertyCity;
  title: string;
  districts: string;
  image: string;
  description: string;
}

export const CityCollection: React.FC = () => {
  const { setFilters, navigateTo } = useProperties();

  const cities: CityShowcase[] = [
    {
      city: 'Marrakech',
      title: 'Marrakech & La Palmeraie',
      districts: 'Palmeraie · Amelkis · Route de l\'Ourika',
      image: cityImage1,
      description: 'L\'oasis légendaire face aux neiges de l\'Atlas. Domaines séculaires d\'oliviers et kasbahs contemporaines.'
    },
    {
      city: 'Casablanca',
      title: 'Casablanca Anfa & Littoral',
      districts: 'Anfa Supérieur · Ain Diab · Gauthier',
      image: cityImage2,
      description: 'L\'énergie cosmopolite atlantique. Penthouses suspendus, modernisme architectural et vues imprenables.'
    },
    {
      city: 'Tanger',
      title: 'Tanger & Le Cap Spartel',
      districts: 'Vieille Montagne · Cap Spartel · Marshan',
      image: cityImage3,
      description: 'Le carrefour mythique entre Méditerranée et Atlantique. Falaises boisées de pins et villas belvédère.'
    },
    {
      city: 'Rabat',
      title: 'Rabat Souissi Diplomatique',
      districts: 'Souissi · Bir Kacem · Ambassadeurs',
      image: cityImage4,
      description: 'La quiétude majestueuse de la capitale du Royaume. Propriétés diplomatiques ceintes de parcs boisés.'
    }
  ];

  const handleCitySelect = (city: PropertyCity) => {
    setFilters((prev) => ({ ...prev, city, category: 'all' }));
    navigateTo('buy');
  };

  return (
    <section className="py-24 bg-[#0c0d0e] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
              Géographie d'Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight">
              Nos Territoires d'Intervention
            </h2>
          </div>
          <p className="text-xs text-white/60 max-w-md leading-relaxed">
            Chaque région marocaine impose sa propre relation à la lumière, à la matière et au vent. Explorez nos implantations exclusives.
          </p>
        </div>

        {/* 4 Cities Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((item) => (
            <div
              key={item.city}
              onClick={() => handleCitySelect(item.city)}
              className="group cursor-pointer relative h-[380px] rounded-sm overflow-hidden border border-white/10 hover:border-[#c5a880]/60 transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                    {item.districts}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#c5a880] group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-2 group-hover:text-[#c5a880] transition-colors">
                    {item.city}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
