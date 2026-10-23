# ATLAS PRESTIGE IMMOBILIER
### Architecture You Can Feel — Immobilier de Grand Prestige au Maroc

Atlas Prestige Immobilier est une plateforme digitale d'excellence dédiée au marché immobilier de très haut standing au Royaume du Maroc (Marrakech, Casablanca, Tanger, Rabat, Essaouira, Agadir). Conçue selon les standards les plus exigeants des sites lauréats Awwwards (Site of the Day).

---

## 🏛️ Caractéristiques & Expérience Utilisateur

### 1. Film Cinématique 3D Hero Vidéo & Maquette 3D Temps Réel
- **Film Cinématique 3D Dédié (`/public/videos/hero.mp4` & `/public/videos/hero.webm`)** :
  - Résolution : **1920 × 1080 (Full HD)** encodé en H.264 et VP9 avec drapeau faststart (`+faststart`).
  - Découpage multi-plans en mouvement de caméra réel :
    - *Plan 1* : Rapprochement lent (dolly-in) au-dessus de la piscine miroir de la Palmeraie face aux crêtes enneigées de l'Atlas.
    - *Plan 2* : Panoramique latéral et contre-plongée sur les volumes en pisé contemporain et l'oliveraie au coucher de soleil.
    - *Plan 3* : Travelling fluide traversant le salon de réception cathédrale, les lustres en laiton et le patio arboré.
    - *Plan 4* : Survol en élévation des terrasses en gradins surplombant le Détroit de Gibraltar à Tanger.
    - *Plan 5* : Zoom cinématique crépusculaire sur le penthouse triplex d'Anfa et l'océan Atlantique à Casablanca.
  - Lecture automatique fluide (autoplay, loop, muted, playsInline, object-cover) avec respect des préférences `prefers-reduced-motion`.
  - **Sélecteur Double-Moteur** : Permet de basculer instantanément entre le **Film Cinématique 3D** et la **Maquette 3D Temps Réel** (Three.js interactif).
  - Régie de lecture vidéo : Indicateur de plan en cours, barre de progression, sauts de chapitres séquentiels, et fiche technique de production avec prompt de rendu photoréaliste.

### 2. Écorché 3D Axonométrique (Floor Plan)
- Visualiseur 3D interactif permettant d'explorer le rez-de-chaussée, les étages et les terrasses de chaque propriété avec isolation de niveau.

### 3. Collection de Biens d'Exception
- **18 propriétés réparties à travers le Maroc** :
  - Marrakech : Palmeraie, Golf Amelkis, Route de l'Ourika, Samanah, Médina Mouassine
  - Casablanca : Anfa Supérieur, Corniche Ain Diab, Triangle d'Or, Gauthier
  - Tanger : Vieille Montagne, Cap Spartel
  - Rabat : Souissi, Bir Kacem, Quartier des Ambassadeurs
  - Essaouira : Domaine de Mogador
  - Agadir : Taghazout Bay
- Tarifs réels en Dirhams Marocains (**MAD**).
- Filtrage instantané : Ville, Typologie, Gamme de prix, Nombre de suites, Équipements (Piscine, Hammam, Vue Atlas, Vue Mer, Vue Golf) et recherche textuelle.

### 4. Fonctions Transactionnelles & Conciergerie VIP
- **Demande de Visite VIP** avec créneaux solaires (matin, après-midi, crépuscule), option chauffeur privé en Mercedes Classe S/V et confirmation avec célébration confetti.
- **Lien WhatsApp direct** générant un message pré-rédigé personnalisé par propriété.
- **Simulateur de Financement Bancaire (MAD)** paramétrable (apport, durée, taux d'intérêt, mensualité calculée en temps réel).
- **Sélection Privée / Tiroir de Favoris** mémorisée localement.
- **Ambiance Sonore Procédurale** via l'API Web Audio (brise désertique et fréquences harmoniques de l'Atlas) sans dépendance de fichier externe.

### 5. Console d'Administration & Régie (Backoffice)
- Indicateurs clés : Valeur du portfolio en MAD, nombre de résidences actives, demandes de visite en attente, prix moyen au m².
- Gestion complète des biens (Création, Modification, Suppression, Statut : Disponible / Sous Offre / Vendu).
- Gestion des rendez-vous de visite (statuts, notes logistiques, chauffeur).
- Persistance transparente en `LocalStorage` avec bouton de réinitialisation des données de démo.

---

## 🛠️ Stack Technologique

- **Framework** : React 19 + TypeScript + Vite
- **3D & Rendu Spatial** : Three.js (r160+), RoomEnvironment, PMREMGenerator, PCFSoftShadowMap
- **Styling & Typographie** : Tailwind CSS v4, Cormorant Garamond (Serif de luxe), Plus Jakarta Sans (Corps de texte)
- **Icônes** : Lucide React
- **Animations** : Motion for React & Canvas-Confetti
- **Audio** : Web Audio API (synthétiseur procédural)

---

## 🚀 Instructions de Déploiement

### Développement Local
```bash
npm install
npm run dev
```
L'application est servie sur le port 3000.

### Compilation de Production
```bash
npm run build
```
Les fichiers statiques optimisés sont générés dans le dossier `/dist`.

### Vérification du Code
```bash
npm run lint
```
