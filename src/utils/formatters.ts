/**
 * Format currency numbers in Moroccan Dirhams (MAD) with standard French spacing.
 * Example: 28500000 -> "28 500 000 MAD"
 */
export function formatMAD(amount: number): string {
  const formatted = new Intl.NumberFormat('fr-MA', {
    maximumFractionDigits: 0,
  }).format(amount).replace(/,/g, ' ');

  return `${formatted} MAD`;
}

export function formatSurface(m2: number): string {
  return `${m2.toLocaleString('fr-FR')} m²`;
}

export function buildWhatsAppLink(propertyTitle: string, propertyCity: string, propertyPrice: string): string {
  const message = encodeURIComponent(
    `Bonjour Atlas Prestige Immobilier, je souhaite recevoir des informations confidentielles et organiser une visite privée pour la propriété "${propertyTitle}" située à ${propertyCity} (${propertyPrice}).`
  );
  // Official Atlas Prestige concierge number demo
  return `https://wa.me/212524330099?text=${message}`;
}
