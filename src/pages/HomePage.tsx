import React from 'react';
import { CinematicVideoHero } from '../components/video/CinematicVideoHero';
import { FeaturedEstates } from '../components/home/FeaturedEstates';
import { ArchitecturalManifesto } from '../components/home/ArchitecturalManifesto';
import { CityCollection } from '../components/home/CityCollection';
import { VipExperience } from '../components/home/VipExperience';
import { Testimonials } from '../components/home/Testimonials';

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <CinematicVideoHero />
      <FeaturedEstates />
      <ArchitecturalManifesto />
      <CityCollection />
      <VipExperience />
      <Testimonials />
    </main>
  );
};
