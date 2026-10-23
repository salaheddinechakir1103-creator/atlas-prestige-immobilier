import React, { useState } from 'react';
import { useProperties, AppRoute } from '../../context/PropertyContext';
import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, addToast } = useProperties();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    addToast(
      'Cercle Privé Atlas',
      'Votre adresse a été enregistrée pour nos avant-premières confidentielles.',
      'gold'
    );
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#08090a] border-t border-white/10 text-white/70">
      {/* Top Banner / Invitation */}
      <div className="border-b border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
              Discrétion & Excellence Foncière
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif text-white tracking-wide">
              Accédez à nos propriétés hors-marché
            </h2>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex w-full lg:w-auto items-center gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Votre email professionnel..."
              className="px-4 py-3 bg-white/5 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#c5a880] rounded-sm w-full lg:w-80"
              required
            />
            <button
              type="submit"
              className="px-5 py-3 text-xs uppercase tracking-wider bg-[#c5a880] text-black font-semibold hover:bg-[#d6bc95] transition-colors whitespace-nowrap rounded-sm"
            >
              Adhérer
            </button>
          </form>
        </div>
      </div>

      {/* Main Grid: 4 Pillars */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Col 1: Brand & Manifesto */}
        <div>
          <span className="text-2xl font-serif tracking-[0.16em] uppercase text-white block mb-4">
            Atlas Prestige
          </span>
          <p className="text-xs leading-relaxed text-white/60 mb-6">
            Maison de référence pour l'acquisition, la cession et la gestion privée de biens d'exception au Royaume du Maroc. Architecture sensible et discrétion absolue.
          </p>
          <div className="text-xs text-white/50 space-y-1">
            <p>Marrakech · Casablanca · Tanger · Rabat</p>
            <p className="tabular-nums">Licence ANRE N° 2026/849-MA</p>
          </div>
        </div>

        {/* Col 2: Nos Maisons & Villes */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-4">
            Destinations Phares
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button
                onClick={() => navigateTo('buy')}
                className="hover:text-[#c5a880] transition-colors text-left"
              >
                Villas Palmeraie & Amelkis — Marrakech
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('buy')}
                className="hover:text-[#c5a880] transition-colors text-left"
              >
                Penthouses Océan Anfa — Casablanca
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('buy')}
                className="hover:text-[#c5a880] transition-colors text-left"
              >
                Résidences Détroit — Tanger Vieille Montagne
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('buy')}
                className="hover:text-[#c5a880] transition-colors text-left"
              >
                Domaines Diplomatiques — Rabat Souissi
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('buy')}
                className="hover:text-[#c5a880] transition-colors text-left"
              >
                Propriétés Côtières — Essaouira & Taghazout
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Navigation & Services */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-4">
            Maison Atlas
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => navigateTo('services')} className="hover:text-[#c5a880] transition-colors">
                Conseil en Transaction Confidentielle
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('services')} className="hover:text-[#c5a880] transition-colors">
                Architecture & Réhabilitation Bioclimatique
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('services')} className="hover:text-[#c5a880] transition-colors">
                Gestion Privée & Conciergerie 5 Étoiles
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-[#c5a880] transition-colors">
                Notre Philosophie & Maâlems Partenaires
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('admin')} className="hover:text-[#c5a880] transition-colors">
                Portail Privé d'Administration
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Adresses & Conciergerie */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-4">
            Bureaux & Conciergerie
          </h3>
          <div className="space-y-3 text-xs text-white/70">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <span>Marrakech : Km 6, Route de Fès, La Palmeraie</span>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <span>Casablanca : Boulevard d'Anfa, Triangle d'Or</span>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              <Phone className="w-4 h-4 text-[#c5a880] shrink-0" />
              <span className="tabular-nums">+212 (0) 5 24 33 00 99</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
              <span>concierge@atlas-prestige.ma</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Demo Disclaimer */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© 2026 Atlas Prestige Immobilier. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span>Architecture You Can Feel</span>
            <span>·</span>
            <span>Présentation Démonstrative Luxury Real Estate</span>
            <span>·</span>
            <button
              onClick={() => navigateTo('admin')}
              className="text-[#c5a880] hover:underline"
            >
              Console Régie
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
