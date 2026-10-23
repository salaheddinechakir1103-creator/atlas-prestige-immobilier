import React, { useState } from 'react';
import { Property } from '../../types/property';
import { useProperties } from '../../context/PropertyContext';
import { X, Calendar, Clock, Car, CheckCircle2, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VisitRequestModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const VisitRequestModal: React.FC<VisitRequestModalProps> = ({ property, isOpen, onClose }) => {
  const { submitVisitRequest } = useProperties();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-11-05');
  const [timeSlot, setTimeSlot] = useState<'matin' | 'apres-midi' | 'crepuscule'>('crepuscule');
  const [needsChauffeur, setNeedsChauffeur] = useState(true);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    submitVisitRequest({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyCity: property.city,
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      preferredDate: date,
      preferredTimeSlot: timeSlot,
      needsChauffeur,
      notes
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c5a880', '#dfd4c4', '#ffffff']
      });
    } catch {
      // ignore
    }

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#121418] border border-white/15 rounded-sm p-6 sm:p-8 shadow-2xl text-white">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-1"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-[#c5a880]/15 text-[#c5a880] rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif">Demande Enregistrée</h3>
            <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
              Notre conciergerie privée prendra contact sous 2 heures avec M./Mme <strong>{name}</strong> pour finaliser les détails protocolaires et la logistique de votre visite privée.
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-xs uppercase tracking-wider bg-[#c5a880] text-black font-semibold rounded-sm hover:bg-[#d6bc95]"
              >
                Retour à la Propriété
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium block mb-1">
                Conciergerie Privée
              </span>
              <h3 className="text-2xl font-serif text-white">
                Organiser une Visite VIP
              </h3>
              <p className="text-xs text-white/60 mt-1 line-clamp-1">
                {property.title} · {property.city}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                  Nom & Prénom *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Dr. Mehdi Tazi"
                  required
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Email Professionnel / Privé *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@domaine.com"
                    required
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Téléphone (avec indicatif) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6..."
                    required
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Date Souhaitée
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                    Créneau Lumineux
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#14161a] border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="matin">Matinée (Lumière douce)</option>
                    <option value="apres-midi">Après-midi (Plein soleil)</option>
                    <option value="crepuscule">Crépuscule (Coucher de soleil)</option>
                  </select>
                </div>
              </div>

              {/* Chauffeur Service Checkbox */}
              <label className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-sm cursor-pointer hover:border-[#c5a880]/50 transition-colors">
                <input
                  type="checkbox"
                  checked={needsChauffeur}
                  onChange={(e) => setNeedsChauffeur(e.target.checked)}
                  className="mt-0.5 accent-[#c5a880]"
                />
                <div className="text-left">
                  <span className="font-medium text-white block">
                    Coordination Chauffeur Privé Atlas (Offert)
                  </span>
                  <span className="text-[11px] text-white/60">
                    Prise en charge en Mercedes Classe S ou Classe V depuis votre hôtel, aéroport ou résidence.
                  </span>
                </div>
              </label>

              <div>
                <label className="block text-white/70 uppercase tracking-wider text-[10px] mb-1">
                  Exigences Particulières ou Protocole (Optionnel)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Ex: Présence de notre architecte conseil, accord de confidentialité NDA..."
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                  <Shield className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Confidentialité diplomatique garantie</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 text-xs uppercase tracking-[0.16em] bg-[#c5a880] text-black font-semibold hover:bg-[#d6bc95] transition-colors rounded-sm"
                >
                  Confirmer la Demande
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
