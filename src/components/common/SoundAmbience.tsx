import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundAmbience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleSound = () => {
    if (!isPlaying) {
      startSound();
    } else {
      stopSound();
    }
  };

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Harmonic Dune Drone 1 (Warm Root: 110Hz A2)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, ctx.currentTime);
      const gain1 = ctx.createGain();
      gain1.gain.value = 0.4;
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start();

      // Harmonic 2 (Fifth: 165Hz E3)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(164.81, ctx.currentTime);
      const gain2 = ctx.createGain();
      gain2.gain.value = 0.25;
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start();

      // Soft filtered noise (Desert breeze)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.04;

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start();

      setIsPlaying(true);
    } catch {
      // Audio not permitted without interaction
    }
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1);
      setTimeout(() => {
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 1100);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-30">
      <button
        onClick={toggleSound}
        className={`flex items-center gap-2 px-3 py-2 text-xs rounded-sm border transition-colors shadow-xl ${
          isPlaying
            ? 'bg-[#c5a880] text-black border-[#c5a880]'
            : 'bg-[#121418]/90 text-white/70 hover:text-white border-white/10'
        }`}
        title="Ambiance sonore désertique & harmonique"
      >
        {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        <span className="text-[11px] uppercase tracking-wider hidden sm:inline">
          {isPlaying ? 'Ambiance Active' : 'Son Ambiant'}
        </span>
      </button>
    </div>
  );
};
