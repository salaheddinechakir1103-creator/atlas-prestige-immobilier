import fixedImage0 from '../../assets/images/hero_moroccan_villa_1792754388660.jpg';
import React, { useRef, useState, useEffect } from 'react';
import { useProperties } from '../../context/PropertyContext';
import { LuxuryVillaCanvas } from '../3d/LuxuryVillaCanvas';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clapperboard,
  Box,
  ArrowDown,
  ArrowUpRight,
  Sparkles,
  Film,
  Info,
  X
} from 'lucide-react';

interface ShotChapter {
  id: number;
  timeStart: number;
  timeEnd: number;
  title: string;
  location: string;
  cameraMove: string;
}

const SHOT_CHAPTERS: ShotChapter[] = [
  {
    id: 1,
    timeStart: 0,
    timeEnd: 5,
    title: 'Villa Al-Badi & Crêtes de l\'Atlas',
    location: 'Marrakech · Palmeraie',
    cameraMove: 'Dolly avant lent au-dessus du bassin miroir au crépuscule'
  },
  {
    id: 2,
    timeStart: 5,
    timeEnd: 9,
    title: 'Domaine d\'Amanar en Pisé',
    location: 'Marrakech · Palmeraie Est',
    cameraMove: 'Panoramique latéral et contre-plongée lumière dorée'
  },
  {
    id: 3,
    timeStart: 9,
    timeEnd: 13,
    title: 'Grand Salon & Patio d\'Apparat',
    location: 'Architecture Intérieure · Marrakech',
    cameraMove: 'Travelling fluide à travers les baies vitrées de 5 mètres'
  },
  {
    id: 4,
    timeStart: 13,
    timeEnd: 17,
    title: 'Villa Cap Spartel Belvedere',
    location: 'Tanger · Vieille Montagne',
    cameraMove: 'Survol en élévation des terrasses face au Détroit de Gibraltar'
  },
  {
    id: 5,
    timeStart: 17,
    timeEnd: 22,
    title: 'Penthouse Atlantique Sky-Villa',
    location: 'Casablanca · Anfa Supérieur',
    cameraMove: 'Rapprochement crépusculaire sur la piscine suspendue océane'
  }
];

export const CinematicVideoHero: React.FC = () => {
  const { navigateTo } = useProperties();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Experience Mode: 'video' (Cinematic 3D Video) | 'interactive3d' (Three.js real-time model)
  const [experienceMode, setExperienceMode] = useState<'video' | 'interactive3d'>('video');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(22);
  const [activeShot, setActiveShot] = useState<ShotChapter>(SHOT_CHAPTERS[0]);
  const [isProductionModalOpen, setIsProductionModalOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsPlaying(false);
      videoRef.current?.pause();
    }
  }, []);

  // Update active chapter & timeline based on video playback
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    setCurrentTime(t);
    const chapter = SHOT_CHAPTERS.find((ch) => t >= ch.timeStart && t < ch.timeEnd) || SHOT_CHAPTERS[0];
    if (chapter.id !== activeShot.id) {
      setActiveShot(chapter);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 22);
      setIsVideoLoaded(true);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const jumpToShot = (shot: ShotChapter) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = shot.timeStart;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
    setActiveShot(shot);
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection-signature');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('buy');
    }
  };

  return (
    <section className="relative w-full h-[92vh] min-h-[660px] max-h-[1080px] overflow-hidden bg-[#0a0b0d] select-none">
      {/* ======================================================= */}
      {/* 1. VISUAL CORE: REAL CINEMATIC 3D VIDEO VS 3D REAL-TIME */}
      {/* ======================================================= */}
      {experienceMode === 'video' ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            src="/videos/hero.mp4"
            poster="/src/assets/images/hero_moroccan_villa_1792754388660.jpg"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover pointer-events-none scale-[1.01]"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            <source src="/videos/hero.webm" type="video/webm" />
          </video>

          {/* Cinematic Contrast Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <LuxuryVillaCanvas className="w-full h-full" />
        </div>
      )}

      {/* ======================================================= */}
      {/* 2. TOP RIGHT: DUAL-ENGINE SWITCHER (VIDEO 4K / 3D TEMPS RÉEL) */}
      {/* ======================================================= */}
      <div className="absolute top-6 right-6 lg:right-12 z-20 flex items-center gap-2">
        <div className="flex items-center p-1 bg-black/60 backdrop-blur-md border border-white/15 rounded-sm shadow-2xl">
          <button
            onClick={() => setExperienceMode('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
              experienceMode === 'video'
                ? 'bg-[#c5a880] text-black font-semibold shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Film Cinématique 3D</span>
          </button>

          <button
            onClick={() => setExperienceMode('interactive3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
              experienceMode === 'interactive3d'
                ? 'bg-[#c5a880] text-black font-semibold shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Maquette 3D Temps Réel</span>
          </button>
        </div>

        {/* Storyboard / Production Notes Button */}
        <button
          onClick={() => setIsProductionModalOpen(true)}
          className="p-2 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 hover:border-[#c5a880]/50 text-white/70 hover:text-white rounded-sm transition-colors"
          title="Fiche de Production & Storyboard Cinématographique"
          aria-label="Fiche de production"
        >
          <Clapperboard className="w-4 h-4 text-[#c5a880]" />
        </button>
      </div>

      {/* ======================================================= */}
      {/* 3. EDITORIAL EDITORIAL HERO OVERLAY */}
      {/* ======================================================= */}
      <div className="absolute top-12 left-6 right-6 md:left-12 pointer-events-none z-10 max-w-2xl">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#c5a880] font-medium drop-shadow">
            <span>Maison Foncière Fondée au Maroc</span>
            <span aria-hidden="true">·</span>
            <span>Édition 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white tracking-tight leading-[0.98] drop-shadow-2xl">
            Architecture <br />
            <span className="italic font-normal text-[#dfd4c4]">You Can Feel.</span>
          </h1>

          <p className="text-xs sm:text-sm text-white/85 max-w-lg leading-relaxed pt-1 drop-shadow-md">
            L'excellence immobilière cinématographique au Maroc. Villas de maîtres, riads contemporains et penthouses suspendus sculptés dans la lumière naturelle.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 pointer-events-auto">
            <button
              onClick={scrollToCollection}
              className="px-6 py-3 text-xs uppercase tracking-[0.18em] font-semibold bg-[#c5a880] text-black hover:bg-[#d6bc95] transition-colors rounded-sm flex items-center gap-2 shadow-2xl"
            >
              <span>Explorer la Collection</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium text-white hover:text-[#c5a880] bg-black/50 hover:bg-black/70 border border-white/20 transition-colors rounded-sm flex items-center gap-2 backdrop-blur-md shadow-xl"
            >
              <span>Demande Hors-Marché</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* 4. CINEMATIC VIDEO TIMELINE & ACTIVE SHOT HUD (BOTTOM BAR) */}
      {/* ======================================================= */}
      {experienceMode === 'video' && (
        <div className="absolute bottom-6 left-6 right-6 lg:left-12 lg:right-12 z-20 pointer-events-auto">
          <div className="bg-[#0e1014]/90 backdrop-blur-md border border-white/15 rounded-sm p-3.5 sm:p-4 shadow-2xl space-y-2.5">
            {/* Top row: Active Shot Details + Quick Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#c5a880] hover:text-black flex items-center justify-center text-white transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Lecture'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold">
                      Plan {activeShot.id} / 5
                    </span>
                    <span className="text-white/30">·</span>
                    <h4 className="text-xs font-serif text-white font-medium">
                      {activeShot.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-white/50 hidden sm:block">
                    {activeShot.location} — {activeShot.cameraMove}
                  </p>
                </div>
              </div>

              {/* Shot Chapter Jump Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {SHOT_CHAPTERS.map((shot) => {
                  const isActive = shot.id === activeShot.id;
                  return (
                    <button
                      key={shot.id}
                      onClick={() => jumpToShot(shot)}
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-[#c5a880] text-black font-semibold'
                          : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      Plan {shot.id}
                    </button>
                  );
                })}

                {/* Sound Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 ml-2 text-white/60 hover:text-white"
                  title={isMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#c5a880]" />}
                </button>
              </div>
            </div>

            {/* Video Progress Bar Line */}
            <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#c5a880] transition-all duration-150"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* 5. PRODUCTION NOTES & STORYBOARD MODAL */}
      {/* ======================================================= */}
      {isProductionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#121418] border border-white/15 rounded-sm p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto text-white space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Clapperboard className="w-6 h-6 text-[#c5a880]" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold block">
                    Fiche Technique Cinématographique
                  </span>
                  <h3 className="text-xl font-serif">Film 3D d'Architecture Atlas Prestige</h3>
                </div>
              </div>
              <button
                onClick={() => setIsProductionModalOpen(false)}
                className="p-1.5 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pipeline info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-white/5 border border-white/5 rounded-sm text-xs">
              <div>
                <span className="text-white/40 uppercase tracking-wider text-[10px] block">Résolution Source</span>
                <span className="font-serif text-sm text-white mt-0.5 block">1920 × 1080 (Full HD 60fps)</span>
              </div>
              <div>
                <span className="text-white/40 uppercase tracking-wider text-[10px] block">Moteur de Rendu</span>
                <span className="font-serif text-sm text-[#c5a880] mt-0.5 block">Unreal Engine 5.4 / Blender Cycles</span>
              </div>
              <div>
                <span className="text-white/40 uppercase tracking-wider text-[10px] block">Emplacement Asset</span>
                <span className="font-mono text-[11px] text-white/80 mt-0.5 block">/public/videos/hero.mp4</span>
              </div>
            </div>

            {/* Storyboard Shot Breakdown */}
            <div>
              <h4 className="text-sm font-serif text-[#c5a880] uppercase tracking-wider mb-3">
                Découpage Séquentiel & Mouvements Caméra
              </h4>
              <div className="space-y-3">
                {SHOT_CHAPTERS.map((shot) => (
                  <div
                    key={shot.id}
                    className="p-3.5 bg-white/5 border border-white/5 rounded-sm flex items-start gap-4 text-xs"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#c5a880]/20 text-[#c5a880] flex items-center justify-center font-bold text-[11px] shrink-0">
                      {shot.id}
                    </span>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-white font-serif text-sm">{shot.title}</strong>
                        <span className="text-[10px] text-white/40 tabular-nums">
                          {shot.timeStart}s — {shot.timeEnd}s
                        </span>
                      </div>
                      <p className="text-white/60 text-[11px] mb-1">{shot.location}</p>
                      <p className="text-white/80 text-[11px] font-sans">
                        <span className="text-[#c5a880]">Mouvement :</span> {shot.cameraMove}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed CGI Prompt */}
            <div className="p-4 bg-black/60 border border-white/10 rounded-sm">
              <span className="text-[10px] uppercase tracking-wider text-[#c5a880] block font-medium mb-1.5">
                Prompt Cinématographique Master (Blender / Runway Gen-3 / Sora / Cinema 4D) :
              </span>
              <p className="text-[11px] font-mono text-white/70 leading-relaxed">
                "Ultra-high-end 8k architectural commercial film of modernist Moroccan luxury estates. Slow cinematic camera movements gliding over infinity lap pools reflecting palm trees and snow-capped Atlas mountains during golden hour and twilight. Physically-based rammed earth textures, travertine marble paving, floor-to-ceiling motorized sliding glass walls, glowing interior brass lanterns, cascading seaside terraces overlooking Gibraltar and Atlantic sunset. Arri Alexa 65 anamorphic lens, warm filmic color grading, subtle atmospheric haze."
              </p>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setIsProductionModalOpen(false)}
                className="px-6 py-2.5 text-xs uppercase tracking-wider bg-[#c5a880] text-black font-semibold rounded-sm hover:bg-[#d6bc95]"
              >
                Fermer la Fiche
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
