import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const { addToast } = useProperties();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [intent, setIntent] = useState<'acquisition' | 'vente' | 'location' | 'architecture'>('acquisition');
  const [budgetRange, setBudgetRange] = useState('20M - 50M MAD');
  const [preferredCity, setPreferredCity] = useState('Marrakech');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c5a880', '#ffffff', '#dfd4c4']
      });
    } catch {
      // ignore
    }

    setSubmitted(true);
    addToast(
      'Message Transmis',
      'Votre demande d\'échange confidentiel a été assignée à notre directeur d\'agence.',
      'gold'
    );
  };

  const offices = [
    {
      city: 'Marrakech',
      district: 'La Palmeraie',
      address: 'Pavillon Atlas, Km 6, Route de Fès, Palmeraie',
      phone: '+212 (0) 5 24 33 00 99',
      email: 'marrakech@atlas-prestige.ma',
      hours: 'Lundi - Samedi : 09h00 - 19h30'
    },
    {
      city: 'Casablanca',
      district: 'Anfa / Triangle d\'Or',
      address: 'Tour Anfa Sky, 184 Boulevard d\'Anfa, 14ème étage',
      phone: '+212 (0) 5 22 48 11 20',
      email: 'casablanca@atlas-prestige.ma',
      hours: 'Lundi - Vendredi : 08h30 - 20h00'
    },
    {
      city: 'Tanger',
      district: 'Vieille Montagne',
      address: 'Belvédère des Deux Mers, Route du Cap Spartel',
      phone: '+212 (0) 5 39 94 65 30',
      email: 'tanger@atlas-prestige.ma',
      hours: 'Mardi - Dimanche : 09h30 - 19h00'
    }
  ];

  return (
    <main className="min-h-screen bg-[#0b0c0e] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            Prendre Contact
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
            Échange Privé & Estimation Confidentielle
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-4 leading-relaxed">
            Que vous souhaitiez acquérir une résidence d'exception, nous confier la vente discrète d'un domaine ou organiser une visite sous protocole, nos directeurs associés sont à votre entière disposition.
          </p>
        </div>

        {/* Form & Offices Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#121418] border border-white/10 rounded-sm p-8 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#c5a880]/15 text-[#c5a880] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif text-white">Votre Message est Transmis</h3>
                <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                  Merci M./Mme <strong>{name}</strong>. Un associé du bureau de {preferredCity} prendra contact avec vous dans la plus stricte discrétion sous 2 heures ouvrées.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white rounded-sm transition-colors"
                  >
                    Envoyer un Nouveau Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1.5">
                      Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Tariq Berrada"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1.5">
                      Email Professionnel *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@cabinet.com"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1.5">
                      Téléphone Direct (avec indicatif) *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+212 6... ou +33 6..."
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1.5">
                      Nature du Projet
                    </label>
                    <select
                      value={intent}
                      onChange={(e) => setIntent(e.target.value as any)}
                      className="w-full px-4 py-3 bg-[#16181d] border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
                    >
                      <option value="acquisition">Projet d'Acquisition (Achat)</option>
                      <option value="vente">Cession / Vente Confidentielle</option>
                      <option value="location">Séjour / Location de Villégiature</option>
                      <option value="architecture">Conseil en Architecture & Restauration</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1.5">
                      Destination / Ville d'Intérêt
                    </label>
                    <select
                      value={preferredCity}
                      onChange={(e) => setPreferredCity(e.target.value)}
                      className="w-full px-4 py-3 bg-[#16181d] border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
                    >
                      <option value="Marrakech">Marrakech (Palmeraie, Amelkis, Ourika)</option>
                      <option value="Casablanca">Casablanca (Anfa, Ain Diab, Triangle d'Or)</option>
                      <option value="Tanger">Tanger (Vieille Montagne, Cap Spartel)</option>
                      <option value="Rabat">Rabat (Souissi, Bir Kacem)</option>
                      <option value="Essaouira">Essaouira & Côte Atlantique</option>
                      <option value="Autre">Autre région du Maroc</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1.5">
                      Enveloppe Budgétaire Envisagée
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-4 py-3 bg-[#16181d] border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
                    >
                      <option value="15M - 25M MAD">15 000 000 — 25 000 000 MAD</option>
                      <option value="25M - 50M MAD">25 000 000 — 50 000 000 MAD</option>
                      <option value="50M - 100M MAD">50 000 000 — 100 000 000 MAD</option>
                      <option value="+100M MAD">+ 100 000 000 MAD (Grand Domaine)</option>
                      <option value="Location 50k-120k MAD">Location saisonnière / mensuelle</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1.5">
                    Détails ou Critères Particuliers
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Précisez votre calendrier, exigences d'architecture, accord de confidentialité souhaité..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-[11px] text-white/50">
                    <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                    <span>Secret professionnel et discrétion absolue</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.18em] bg-[#c5a880] text-black font-semibold rounded-sm hover:bg-[#d6bc95] transition-colors"
                  >
                    Transmettre la Demande
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Phone & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Direct Callout */}
            <div className="p-6 bg-[#142e22] border border-[#22c55e]/30 rounded-sm text-white space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#22c55e]/20 flex items-center justify-center text-[#4ade80]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-medium">Conciergerie WhatsApp Privée</h3>
                  <p className="text-xs text-white/70">Réponse sous 15 minutes 7j/7</p>
                </div>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Pour une demande urgente de visite ou un échange rapide avec un conseiller patrimonial, contactez directement notre ligne de permanence VIP.
              </p>
              <a
                href="https://wa.me/212524330099?text=Bonjour%20Atlas%20Prestige,%20je%20souhaite%20un%20%C3%A9change%20priv%C3%A9%20concernant%20un%20projet%20immobilier%20au%20Maroc."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider bg-[#22c55e] text-black font-semibold rounded-sm hover:bg-[#16a34a] transition-colors"
              >
                <span>Ouvrir la Conversation WhatsApp</span>
              </a>
            </div>

            {/* Direct Lines */}
            <div className="p-6 bg-[#121418] border border-white/10 rounded-sm space-y-4 text-xs">
              <h4 className="text-xs uppercase tracking-wider text-[#c5a880] font-medium">
                Standard Général Atlas Prestige
              </h4>
              <div className="space-y-2 text-white/80">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c5a880]" />
                  <span className="tabular-nums">+212 (0) 5 24 33 00 99</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#c5a880]" />
                  <span>direction@atlas-prestige.ma</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c5a880]" />
                  <span>Du Lundi au Samedi : 08h30 - 20h00</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Offices Cards */}
        <div className="pt-12 border-t border-white/10">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium block mb-1">
              Nos Salons de Réception
            </span>
            <h2 className="text-2xl font-serif text-white">
              Nos Bureaux à Marrakech, Casablanca & Tanger
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#121418] border border-white/10 rounded-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif text-white">{office.city}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#c5a880]">
                    {office.district}
                  </span>
                </div>
                <div className="space-y-2 text-xs text-white/70">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#c5a880] shrink-0" />
                    <span className="tabular-nums">{office.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                    <span>{office.email}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
