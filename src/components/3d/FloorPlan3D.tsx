import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Maximize, RotateCcw } from 'lucide-react';

interface FloorPlan3DProps {
  levelsCount?: number;
  groundSummary?: string;
  upperSummary?: string;
  outdoorSummary?: string;
}

export const FloorPlan3D: React.FC<FloorPlan3DProps> = ({
  levelsCount = 2,
  groundSummary = 'Grand salon de réception, cuisine d\'auteur, 3 suites avec terrasses privatives, hammam et patio arboré.',
  upperSummary = 'Suite master de 160 m², double dressing, salon privé et terrasse plein sud face à l\'Atlas.',
  outdoorSummary = 'Piscine miroir chauffée de 22m, pool house, salon brasero et oliveraie.'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeLevel, setActiveLevel] = useState<'all' | 'ground' | 'upper'>('all');
  const levelGroupsRef = useRef<{ ground: THREE.Group; upper: THREE.Group } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111317);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(22, 18, 22);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.replaceChildren(renderer.domElement);

    // Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
    dirLight.position.set(15, 25, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Floor plan groups
    const groundGroup = new THREE.Group();
    const upperGroup = new THREE.Group();

    // Materials
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x2d3239, roughness: 0.6 });
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xc5a880, roughness: 0.3, metalness: 0.2 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.45 });
    const poolMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1 });

    // Ground Floor Slab
    const groundSlabGeo = new THREE.BoxGeometry(18, 0.4, 14);
    const groundSlab = new THREE.Mesh(groundSlabGeo, floorMat);
    groundSlab.position.set(0, 0, 0);
    groundSlab.receiveShadow = true;
    groundGroup.add(groundSlab);

    // Ground Floor Wall Partitions (Architectural Cut)
    const addWall = (group: THREE.Group, x: number, y: number, z: number, w: number, h: number, d: number) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, wallMat);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    };

    // Ground Outer & Inner Walls
    addWall(groundGroup, -4, 0.9, -6.8, 10, 1.4, 0.4);
    addWall(groundGroup, -8.8, 0.9, 0, 0.4, 1.4, 14);
    addWall(groundGroup, 8.8, 0.9, 0, 0.4, 1.4, 14);
    addWall(groundGroup, 0, 0.9, 0, 0.3, 1.4, 8); // Central partition
    addWall(groundGroup, -4, 0.9, 2, 8, 1.4, 0.3);

    // Pool beside the ground slab
    const poolGeo = new THREE.BoxGeometry(5, 0.3, 11);
    const poolMesh = new THREE.Mesh(poolGeo, poolMat);
    poolMesh.position.set(-6, -0.05, 9);
    groundGroup.add(poolMesh);

    // Upper Floor Slab (Elevated)
    const upperSlabGeo = new THREE.BoxGeometry(12, 0.4, 10);
    const upperSlab = new THREE.Mesh(upperSlabGeo, floorMat);
    upperSlab.position.set(2, 4.2, 0);
    upperSlab.castShadow = true;
    upperGroup.add(upperSlab);

    // Upper Walls
    addWall(upperGroup, 2, 5.1, -4.8, 11.6, 1.4, 0.4);
    addWall(upperGroup, 7.8, 5.1, 0, 0.4, 1.4, 10);
    addWall(upperGroup, -3.8, 5.1, 0, 0.4, 1.4, 10);
    addWall(upperGroup, 2, 5.1, 4.8, 11.6, 1.4, 0.4);

    // Upper Glass Balustrade
    const balustradeGeo = new THREE.BoxGeometry(11.8, 0.8, 0.1);
    const balustrade = new THREE.Mesh(balustradeGeo, glassMat);
    balustrade.position.set(2, 4.7, 5.1);
    upperGroup.add(balustrade);

    scene.add(groundGroup);
    scene.add(upperGroup);
    levelGroupsRef.current = { ground: groundGroup, upper: upperGroup };

    // Simple Render Loop with subtle rotation
    let frameId: number;
    let angle = 0;
    const animate = () => {
      angle += 0.003;
      camera.position.x = Math.sin(angle) * 26;
      camera.position.z = Math.cos(angle) * 26;
      camera.lookAt(0, 2, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Handle Level Isolation
  useEffect(() => {
    if (!levelGroupsRef.current) return;
    const { ground, upper } = levelGroupsRef.current;
    if (activeLevel === 'all') {
      ground.visible = true;
      upper.visible = true;
      upper.position.y = 0;
    } else if (activeLevel === 'ground') {
      ground.visible = true;
      upper.visible = false;
    } else {
      ground.visible = false;
      upper.visible = true;
      upper.position.y = -3.8; // Lower for comfortable inspection
    }
  }, [activeLevel]);

  return (
    <div className="relative w-full h-[460px] bg-[#0f1115] border border-white/10 rounded-sm overflow-hidden">
      {/* 3D Canvas */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Level Selector HUD */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 p-1 bg-[#14161a]/90 border border-white/10 rounded-sm">
        <button
          onClick={() => setActiveLevel('all')}
          className={`px-3 py-1.5 text-xs tracking-wide rounded-sm transition-colors ${
            activeLevel === 'all' ? 'bg-[#c5a880] text-black font-medium' : 'text-white/70 hover:text-white'
          }`}
        >
          Vue Globale (Axonométrique)
        </button>
        <button
          onClick={() => setActiveLevel('ground')}
          className={`px-3 py-1.5 text-xs tracking-wide rounded-sm transition-colors ${
            activeLevel === 'ground' ? 'bg-[#c5a880] text-black font-medium' : 'text-white/70 hover:text-white'
          }`}
        >
          Rez-de-Chaussée
        </button>
        {levelsCount > 1 && (
          <button
            onClick={() => setActiveLevel('upper')}
            className={`px-3 py-1.5 text-xs tracking-wide rounded-sm transition-colors ${
              activeLevel === 'upper' ? 'bg-[#c5a880] text-black font-medium' : 'text-white/70 hover:text-white'
            }`}
          >
            Étage & Terrasses
          </button>
        )}
      </div>

      {/* Floor Plan Description Card */}
      <div className="absolute bottom-4 left-4 right-4 z-10 p-3.5 bg-[#14161a]/95 border border-white/10 rounded-sm text-left backdrop-blur-sm">
        <span className="text-[10px] uppercase tracking-wider text-[#c5a880] font-medium block mb-1">
          {activeLevel === 'all'
            ? 'Distribution Spatiale Totale'
            : activeLevel === 'ground'
            ? 'Niveau 0 — Espace de Réception & Piscine'
            : 'Niveau 1 — Suites de Maître & Solarium'}
        </span>
        <p className="text-xs text-white/80 leading-relaxed">
          {activeLevel === 'all'
            ? `${groundSummary} ${upperSummary}`
            : activeLevel === 'ground'
            ? groundSummary
            : upperSummary}
        </p>
      </div>
    </div>
  );
};
