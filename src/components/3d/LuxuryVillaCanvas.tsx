import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CameraViewpoint, LightingAmbiance, Hotspot } from '../../types/property';
import { Eye, Sun, Moon, Sunrise, Sparkles, Compass, Maximize2, Minimize2, Check } from 'lucide-react';

interface LuxuryVillaCanvasProps {
  onHotspotClick?: (hotspot: Hotspot) => void;
  className?: string;
}

// Module-level reusable math objects to avoid per-frame GC
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3();
const _tempVec = new THREE.Vector3();

// Camera viewpoints presets
const VIEWPOINTS: Record<CameraViewpoint, { pos: [number, number, number]; lookAt: [number, number, number]; label: string }> = {
  panoramic: {
    pos: [24, 13, 26],
    lookAt: [0, 2, 0],
    label: 'Vue Panoramique'
  },
  pool: {
    pos: [11, 3.2, 16],
    lookAt: [-1, 1.2, 0],
    label: 'Piscine & Bassin'
  },
  facade: {
    pos: [0, 4.5, 23],
    lookAt: [0, 3.2, 0],
    label: 'Façade Vitrée'
  },
  suite: {
    pos: [7, 8.5, 12],
    lookAt: [3, 5.5, -1],
    label: 'Suite Suspendue'
  },
  axonometric: {
    pos: [22, 26, 22],
    lookAt: [0, 2, 0],
    label: 'Plan Axonométrique'
  }
};

const HOTSPOTS: Hotspot[] = [
  {
    id: 'hs-pool',
    title: 'Bassin de Nage 22m',
    description: 'Piscine miroir chauffée en pierre de Bali avec plage immergée et débordement intégral.',
    position: [-2.5, 0.6, 6],
    viewpoint: 'pool'
  },
  {
    id: 'hs-glass',
    title: 'Baies Vitrées Motorisées',
    description: 'Vitrages sans seuil à rupture thermique de 4,80m de hauteur escamotables dans les parois.',
    position: [0.5, 3.2, 1.8],
    viewpoint: 'facade'
  },
  {
    id: 'hs-suite',
    title: 'Master Suite Suspendue',
    description: 'Porte-à-faux architectural de 6 mètres avec terrasse privative orientée vers le Haut Atlas.',
    position: [4.2, 6.2, 2.5],
    viewpoint: 'suite'
  },
  {
    id: 'hs-firepit',
    title: 'Salon Brasero Encastré',
    description: 'Foyer d\'extérieur en contrebas de la terrasse avec banquettes maçonnées en travertin.',
    position: [6.5, 0.4, 7.5],
    viewpoint: 'panoramic'
  }
];

export const LuxuryVillaCanvas: React.FC<LuxuryVillaCanvasProps> = ({ onHotspotClick, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeViewpoint, setActiveViewpoint] = useState<CameraViewpoint>('panoramic');
  const [ambiance, setAmbiance] = useState<LightingAmbiance>('golden');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [activeHotspotsVisible, setActiveHotspotsVisible] = useState(true);

  // References to mutable Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const lightsRef = useRef<{
    dirLight: THREE.DirectionalLight;
    hemiLight: THREE.HemisphereLight;
    poolLight: THREE.PointLight;
    interiorLight: THREE.PointLight;
  } | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const fireGlowRef = useRef<THREE.PointLight | null>(null);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const orbitAngleRef = useRef({ theta: 0.8, phi: 0.45, radius: 38 });

  // Update lighting conditions smoothly
  const applyLightingAmbiance = useCallback((mode: LightingAmbiance) => {
    if (!lightsRef.current || !sceneRef.current) return;
    const { dirLight, hemiLight, poolLight, interiorLight } = lightsRef.current;
    const scene = sceneRef.current;

    if (mode === 'golden') {
      // Golden hour Moroccan sunset
      scene.background = new THREE.Color(0x1a120c);
      if (scene.fog) (scene.fog as THREE.FogExp2).color.setHex(0x1a120c);
      dirLight.color.setHex(0xffaa5e);
      dirLight.intensity = 2.4;
      dirLight.position.set(22, 14, 18);
      hemiLight.color.setHex(0xffc896);
      hemiLight.groundColor.setHex(0x382215);
      hemiLight.intensity = 0.9;
      poolLight.color.setHex(0x38bdf8);
      poolLight.intensity = 1.2;
      interiorLight.color.setHex(0xffb74d);
      interiorLight.intensity = 2.0;
    } else if (mode === 'twilight') {
      // Deep twilight with romantic interior & pool lights
      scene.background = new THREE.Color(0x090b10);
      if (scene.fog) (scene.fog as THREE.FogExp2).color.setHex(0x090b10);
      dirLight.color.setHex(0x6080a8);
      dirLight.intensity = 0.6;
      dirLight.position.set(15, 12, 15);
      hemiLight.color.setHex(0x1e293b);
      hemiLight.groundColor.setHex(0x090b10);
      hemiLight.intensity = 0.5;
      poolLight.color.setHex(0x06b6d4);
      poolLight.intensity = 3.2;
      interiorLight.color.setHex(0xf59e0b);
      interiorLight.intensity = 3.8;
    } else {
      // Solar midday Moroccan light
      scene.background = new THREE.Color(0x181c22);
      if (scene.fog) (scene.fog as THREE.FogExp2).color.setHex(0x181c22);
      dirLight.color.setHex(0xffffff);
      dirLight.intensity = 2.8;
      dirLight.position.set(10, 26, 12);
      hemiLight.color.setHex(0x94a3b8);
      hemiLight.groundColor.setHex(0x2d241e);
      hemiLight.intensity = 1.1;
      poolLight.color.setHex(0x38bdf8);
      poolLight.intensity = 0.8;
      interiorLight.color.setHex(0xfef3c7);
      interiorLight.intensity = 1.2;
    }
  }, []);

  // Switch viewpoint
  const handleViewpointChange = (vp: CameraViewpoint) => {
    setActiveViewpoint(vp);
    setIsAutoRotate(false);
  };

  useEffect(() => {
    applyLightingAmbiance(ambiance);
  }, [ambiance, applyLightingAmbiance]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard (Directive 1.1)
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Scene & Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a120c);
    scene.fog = new THREE.FogExp2(0x1a120c, 0.016);
    sceneRef.current = scene;

    // 4. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.5, 180);
    const initialConfig = VIEWPOINTS.panoramic;
    camera.position.set(...initialConfig.pos);
    camera.lookAt(...initialConfig.lookAt);
    _currentLookAt.set(...initialConfig.lookAt);
    cameraRef.current = camera;

    // 5. Procedural Studio Environment (Directive 1.2)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 6. Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xffc896, 0x382215, 0.9);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffaa5e, 2.4);
    dirLight.position.set(22, 14, 18);
    dirLight.castShadow = !isSoftwareGl;
    dirLight.shadow.mapSize.width = isSoftwareGl ? 512 : 2048;
    dirLight.shadow.mapSize.height = isSoftwareGl ? 512 : 2048;
    dirLight.shadow.camera.near = 2;
    dirLight.shadow.camera.far = 60;
    const shadowD = 22;
    dirLight.shadow.camera.left = -shadowD;
    dirLight.shadow.camera.right = shadowD;
    dirLight.shadow.camera.top = shadowD;
    dirLight.shadow.camera.bottom = -shadowD;
    dirLight.shadow.bias = -0.0004;
    scene.add(dirLight);

    const poolLight = new THREE.PointLight(0x38bdf8, 1.2, 18, 1.2);
    poolLight.position.set(-2.5, 0.5, 6);
    scene.add(poolLight);

    const interiorLight = new THREE.PointLight(0xffb74d, 2.0, 16, 1.2);
    interiorLight.position.set(0.5, 3.5, 0);
    scene.add(interiorLight);

    const fireGlow = new THREE.PointLight(0xf97316, 1.5, 8, 1.8);
    fireGlow.position.set(6.5, 0.5, 7.5);
    scene.add(fireGlow);
    fireGlowRef.current = fireGlow;

    lightsRef.current = { dirLight, hemiLight, poolLight, interiorLight };

    // -------------------------------------------------------------
    // PROCEDURAL LUXURY VILLA ARCHITECTURAL MODEL (Composite Group)
    // -------------------------------------------------------------
    const villaGroup = new THREE.Group();

    // Textures & Procedural Shaders
    const createStoneTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#bfa588';
      ctx.fillRect(0, 0, 512, 512);

      // Subtle travertine veins
      ctx.strokeStyle = '#a68c70';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        const y = Math.random() * 512;
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(150, y + (Math.random() - 0.5) * 40, 350, y + (Math.random() - 0.5) * 40, 512, y);
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const stoneTex = createStoneTexture();

    // PBR Materials
    const travertineMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfd4c4,
      map: stoneTex,
      roughness: 0.65,
      metalness: 0.05
    });

    const darkBronzeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1d1a,
      roughness: 0.25,
      metalness: 0.85
    });

    const warmWoodMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a3d28,
      roughness: 0.5,
      metalness: 0.1
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      metalness: 0.1,
      roughness: 0.05,
      transparent: true,
      opacity: isSoftwareGl ? 0.4 : 0.25,
      transmission: isSoftwareGl ? 0 : 0.85,
      ior: 1.52,
      thickness: 0.8
    });

    const waterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      metalness: 0.1,
      roughness: 0.08,
      transparent: true,
      opacity: 0.88,
      transmission: isSoftwareGl ? 0 : 0.75,
      ior: 1.333
    });

    const poolStoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.2,
      metalness: 0.3
    });

    // 1. Terrain & Main Platform (Plinth)
    const plinthGeo = new THREE.BoxGeometry(32, 0.6, 26);
    const plinth = new THREE.Mesh(plinthGeo, travertineMaterial);
    plinth.position.set(0, -0.3, 2);
    plinth.receiveShadow = true;
    villaGroup.add(plinth);

    // Natural Desert Surroundings
    const desertGeo = new THREE.PlaneGeometry(120, 120);
    const desertMat = new THREE.MeshStandardMaterial({
      color: 0x221a14,
      roughness: 0.95,
      metalness: 0.0
    });
    const desert = new THREE.Mesh(desertGeo, desertMat);
    desert.rotation.x = -Math.PI / 2;
    desert.position.y = -0.62;
    desert.receiveShadow = true;
    villaGroup.add(desert);

    // 2. Main Ground Floor Living Pavilion (Double-height volume)
    const livingGeo = new THREE.BoxGeometry(14, 4.8, 8);
    const livingPavilion = new THREE.Mesh(livingGeo, travertineMaterial);
    livingPavilion.position.set(-1, 2.4, -1);
    livingPavilion.castShadow = true;
    livingPavilion.receiveShadow = true;
    villaGroup.add(livingPavilion);

    // Cutout for grand glass facade (front facing)
    const frontGlassGeo = new THREE.BoxGeometry(11.5, 4.4, 0.15);
    const frontGlass = new THREE.Mesh(frontGlassGeo, glassMaterial);
    frontGlass.position.set(-1, 2.4, 3.02);
    villaGroup.add(frontGlass);

    // Bronze Mullions (Sliding window frames)
    for (let x = -6; x <= 4; x += 2.5) {
      const mullionGeo = new THREE.BoxGeometry(0.12, 4.4, 0.2);
      const mullion = new THREE.Mesh(mullionGeo, darkBronzeMaterial);
      mullion.position.set(x, 2.4, 3.03);
      mullion.castShadow = true;
      villaGroup.add(mullion);
    }

    // 3. Cantilevered Upper Master Suite (Floating Volume)
    const suiteGeo = new THREE.BoxGeometry(9.5, 3.6, 11);
    const upperSuite = new THREE.Mesh(suiteGeo, travertineMaterial);
    upperSuite.position.set(4.5, 5.8, 1.5);
    upperSuite.castShadow = true;
    upperSuite.receiveShadow = true;
    villaGroup.add(upperSuite);

    // Suite Glass Panoramic Wall
    const suiteGlassGeo = new THREE.BoxGeometry(0.15, 3.2, 9);
    const suiteGlass = new THREE.Mesh(suiteGlassGeo, glassMaterial);
    suiteGlass.position.set(-0.28, 5.8, 1.5);
    villaGroup.add(suiteGlass);

    // Suite Bronze Balcony Railing
    const railingGeo = new THREE.BoxGeometry(9.2, 0.9, 0.08);
    const railing = new THREE.Mesh(railingGeo, glassMaterial);
    railing.position.set(4.5, 4.45, 7.1);
    villaGroup.add(railing);

    // 4. Modern Timber Pergola with Wooden Louvers
    const pergolaGroup = new THREE.Group();
    // Beams
    for (let i = -4.5; i <= 2; i += 0.7) {
      const louverGeo = new THREE.BoxGeometry(0.08, 0.35, 6);
      const louver = new THREE.Mesh(louverGeo, warmWoodMaterial);
      louver.position.set(i, 4.8, 6.2);
      louver.castShadow = true;
      pergolaGroup.add(louver);
    }
    // Cross supports
    const crossBeamGeo = new THREE.BoxGeometry(7.2, 0.15, 0.25);
    const crossBeam1 = new THREE.Mesh(crossBeamGeo, darkBronzeMaterial);
    crossBeam1.position.set(-1.25, 4.9, 3.5);
    pergolaGroup.add(crossBeam1);
    const crossBeam2 = crossBeam1.clone();
    crossBeam2.position.set(-1.25, 4.9, 9);
    pergolaGroup.add(crossBeam2);
    // Vertical bronze pillar
    const pillarGeo = new THREE.BoxGeometry(0.2, 4.8, 0.2);
    const pillar = new THREE.Mesh(pillarGeo, darkBronzeMaterial);
    pillar.position.set(-4.5, 2.4, 9);
    pillar.castShadow = true;
    pergolaGroup.add(pillar);
    villaGroup.add(pergolaGroup);

    // 5. 22-Meter Lap Infinity Pool
    const poolBasinGeo = new THREE.BoxGeometry(6, 0.8, 15);
    const poolBasin = new THREE.Mesh(poolBasinGeo, poolStoneMaterial);
    poolBasin.position.set(-3.5, -0.2, 7.5);
    villaGroup.add(poolBasin);

    const waterGeo = new THREE.PlaneGeometry(5.6, 14.6);
    const waterMesh = new THREE.Mesh(waterGeo, waterMaterial);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(-3.5, 0.05, 7.5);
    villaGroup.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // Shallow Sunbathing Ledge (Plage immergée)
    const ledgeGeo = new THREE.BoxGeometry(5.6, 0.25, 3);
    const ledge = new THREE.Mesh(ledgeGeo, travertineMaterial);
    ledge.position.set(-3.5, -0.05, 2);
    villaGroup.add(ledge);

    // 6. Sunken Fire Pit Lounge
    const pitGeo = new THREE.BoxGeometry(4.2, 0.9, 4.2);
    const pitWall = new THREE.Mesh(pitGeo, poolStoneMaterial);
    pitWall.position.set(6.5, -0.35, 7.5);
    villaGroup.add(pitWall);

    // Fire Pit Table & Flame Core
    const fireBaseGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.4, 16);
    const fireBase = new THREE.Mesh(fireBaseGeo, darkBronzeMaterial);
    fireBase.position.set(6.5, 0.1, 7.5);
    villaGroup.add(fireBase);

    const flameCoreGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
    const flameMesh = new THREE.Mesh(flameCoreGeo, flameMat);
    flameMesh.position.set(6.5, 0.35, 7.5);
    villaGroup.add(flameMesh);

    // Cushions in the sunken pit
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0xd4cdc3, roughness: 0.8 });
    const seatGeo = new THREE.BoxGeometry(3.6, 0.2, 0.8);
    const seat1 = new THREE.Mesh(seatGeo, cushionMat);
    seat1.position.set(6.5, 0.0, 9);
    villaGroup.add(seat1);
    const seat2 = seat1.clone();
    seat2.position.set(6.5, 0.0, 6);
    villaGroup.add(seat2);

    // 7. Desert & Mediterranean Landscaping (Palm Trees & Italian Cypress)
    const createPalmTree = (x: number, z: number, scale = 1.0) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 0, z);
      treeGroup.scale.set(scale, scale, scale);

      // Curved Trunk
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.2, 2.5, 0.1),
        new THREE.Vector3(0.5, 5.5, 0.3),
        new THREE.Vector3(0.4, 7.5, 0.6)
      ]);
      const trunkGeo = new THREE.TubeGeometry(curve, 16, 0.25, 8, false);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x423124, roughness: 0.9 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Fronds / Palm Canopy
      const frondMat = new THREE.MeshStandardMaterial({
        color: 0x2e5938,
        roughness: 0.6,
        side: THREE.DoubleSide
      });
      for (let i = 0; i < 9; i++) {
        const angle = (i / 9) * Math.PI * 2;
        const frondGeo = new THREE.ConeGeometry(0.7, 3.2, 5);
        const frond = new THREE.Mesh(frondGeo, frondMat);
        frond.position.set(0.4 + Math.cos(angle) * 1.2, 7.2, 0.6 + Math.sin(angle) * 1.2);
        frond.rotation.z = Math.PI / 3;
        frond.rotation.y = angle;
        frond.castShadow = true;
        treeGroup.add(frond);
      }
      return treeGroup;
    };

    const createCypress = (x: number, z: number, height = 5) => {
      const cypressGroup = new THREE.Group();
      cypressGroup.position.set(x, 0, z);

      const foliageGeo = new THREE.ConeGeometry(0.7, height, 7);
      const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1e3a24, roughness: 0.85 });
      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.y = height / 2;
      foliage.castShadow = true;
      cypressGroup.add(foliage);

      return cypressGroup;
    };

    villaGroup.add(createPalmTree(-8.5, 4, 1.1));
    villaGroup.add(createPalmTree(-8.2, 11, 0.9));
    villaGroup.add(createPalmTree(11.5, 3, 1.05));
    villaGroup.add(createCypress(10.5, -4, 6.2));
    villaGroup.add(createCypress(12, -3.5, 5.4));
    villaGroup.add(createCypress(9.5, -5, 4.8));

    // 8. Contact Shadow Grounding Plane (Directive 2.2)
    const shadowGeo = new THREE.PlaneGeometry(36, 30);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x050403,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -0.58;
    villaGroup.add(contactShadow);

    scene.add(villaGroup);

    // Initial Render Ready
    setIsLoaded(true);

    // -------------------------------------------------------------
    // ANIMATION & INTERACTION LOOP
    // -------------------------------------------------------------
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Subtle water shimmer
      if (waterMeshRef.current) {
        waterMeshRef.current.position.y = 0.05 + Math.sin(elapsed * 1.8) * 0.015;
      }

      // Subtle fire pit flicker
      if (fireGlowRef.current) {
        fireGlowRef.current.intensity = 1.3 + Math.sin(elapsed * 8) * 0.35 + Math.cos(elapsed * 14) * 0.15;
      }

      // Camera lerp towards selected viewpoint
      const targetConfig = VIEWPOINTS[activeViewpoint];
      _targetCamPos.set(...targetConfig.pos);
      _targetLookAt.set(...targetConfig.lookAt);

      if (isAutoRotate && !isDraggingRef.current && activeViewpoint === 'panoramic') {
        orbitAngleRef.current.theta += delta * 0.12;
        const rad = 32;
        _targetCamPos.x = Math.sin(orbitAngleRef.current.theta) * rad;
        _targetCamPos.z = Math.cos(orbitAngleRef.current.theta) * rad;
        _targetCamPos.y = 13 + Math.sin(orbitAngleRef.current.theta * 0.5) * 2;
      }

      // Smooth exponential damping
      camera.position.lerp(_targetCamPos, 3.5 * delta);
      _currentLookAt.lerp(_targetLookAt, 4.0 * delta);
      camera.lookAt(_currentLookAt);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // Mouse Drag Interaction for Parallax Orbit
    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      setIsAutoRotate(false);
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      orbitAngleRef.current.theta -= dx * 0.005;
      orbitAngleRef.current.phi = Math.max(0.15, Math.min(1.2, orbitAngleRef.current.phi + dy * 0.005));

      if (activeViewpoint === 'panoramic') {
        const rad = 32;
        VIEWPOINTS.panoramic.pos[0] = Math.sin(orbitAngleRef.current.theta) * Math.cos(orbitAngleRef.current.phi) * rad;
        VIEWPOINTS.panoramic.pos[1] = Math.max(5, Math.sin(orbitAngleRef.current.phi) * rad);
        VIEWPOINTS.panoramic.pos[2] = Math.cos(orbitAngleRef.current.theta) * Math.cos(orbitAngleRef.current.phi) * rad;
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize Handler
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
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      // Clean disposal
      renderer.dispose();
      travertineMaterial.dispose();
      darkBronzeMaterial.dispose();
      warmWoodMaterial.dispose();
      glassMaterial.dispose();
      waterMaterial.dispose();
      stoneTex.dispose();
    };
  }, [activeViewpoint, isAutoRotate]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0c0e11] select-none ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Subtle Top-Left Minimalist Spec Badge */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium font-sans">
            Architecture You Can Feel
          </span>
          <span className="text-white/30">·</span>
          <span className="text-xs text-white/60 tracking-wider">
            Palmeraie Villa Master Model
          </span>
        </div>
      </div>

      {/* Interactive 3D Hotspots on Screen Overlay */}
      {activeHotspotsVisible && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {HOTSPOTS.map((hs) => {
            // Hotspot coordinates projected for current camera preset
            const isTarget = activeHotspot?.id === hs.id;
            return (
              <div
                key={hs.id}
                className="absolute transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{
                  left: hs.id === 'hs-pool' ? '38%' : hs.id === 'hs-glass' ? '50%' : hs.id === 'hs-suite' ? '64%' : '72%',
                  top: hs.id === 'hs-pool' ? '62%' : hs.id === 'hs-glass' ? '46%' : hs.id === 'hs-suite' ? '34%' : '68%'
                }}
              >
                <div className="relative group">
                  <button
                    onClick={() => {
                      setActiveHotspot(isTarget ? null : hs);
                      handleViewpointChange(hs.viewpoint);
                      if (onHotspotClick) onHotspotClick(hs);
                    }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
                      isTarget
                        ? 'bg-[#c5a880] text-black shadow-lg shadow-[#c5a880]/30'
                        : 'bg-black/60 text-white/90 border border-white/20 hover:border-[#c5a880]'
                    }`}
                    title={hs.title}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  {/* Hotspot Card Card */}
                  {isTarget && (
                    <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-64 p-3.5 bg-[#121316]/95 border border-[#c5a880]/40 rounded-sm shadow-2xl text-left pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs uppercase tracking-wider text-[#c5a880] font-medium">
                          Détail Signature
                        </span>
                        <span className="text-[10px] text-white/40">3D Landmark</span>
                      </div>
                      <h4 className="text-sm font-serif font-normal text-white mb-1">
                        {hs.title}
                      </h4>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {hs.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Loading Screen Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#0c0e11] flex flex-col items-center justify-center z-30 transition-opacity duration-700">
          <div className="w-12 h-12 border border-[#c5a880]/30 border-t-[#c5a880] rounded-full animate-spin mb-4" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#c5a880]">
            Chargement de l'environnement architectural...
          </p>
        </div>
      )}

      {/* COLLAPSIBLE SLEEK BOTTOM CONTROL DOCK (Three.js Skill Section 5) */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-transform duration-300 w-[92%] max-w-[860px] ${
          isDockCollapsed ? 'translate-y-[calc(100%+16px)]' : 'translate-y-0'
        }`}
      >
        {/* Dock Header / Toggle Button */}
        <div className="flex justify-center -mb-[1px]">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] tracking-wider uppercase text-white/70 hover:text-white bg-[#14161a] border-t border-x border-white/10 rounded-t-md hover:border-[#c5a880]/50 transition-colors"
          >
            {isDockCollapsed ? (
              <>
                <Maximize2 className="w-3 h-3 text-[#c5a880]" />
                <span>Afficher la régie 3D</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3 text-[#c5a880]" />
                <span>Mode Plein Écran (Zen)</span>
              </>
            )}
          </button>
        </div>

        {/* Main Dock Surface */}
        <div className="bg-[#14161a]/95 border border-white/10 rounded-sm p-3.5 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          {/* 1. Camera Viewpoints Segmented Switcher */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase tracking-wider text-white/40 mr-1 hidden sm:inline">
              Points de vue
            </span>
            {(Object.keys(VIEWPOINTS) as CameraViewpoint[]).map((key) => {
              const active = activeViewpoint === key;
              return (
                <button
                  key={key}
                  onClick={() => handleViewpointChange(key)}
                  className={`px-2.5 py-1 text-xs tracking-wide rounded-sm transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#c5a880] text-black font-medium'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {VIEWPOINTS[key].label}
                </button>
              );
            })}
          </div>

          {/* 2. Lighting Ambiance Modes */}
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <span className="text-[10px] uppercase tracking-wider text-white/40 hidden md:inline">
              Lumière
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setAmbiance('golden')}
                className={`flex items-center gap-1 px-2 py-1 text-xs rounded-sm transition-colors ${
                  ambiance === 'golden' ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40' : 'text-white/60 hover:text-white'
                }`}
                title="Coucher de soleil doré sur l'Atlas"
              >
                <Sunrise className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Golden Hour</span>
              </button>

              <button
                onClick={() => setAmbiance('twilight')}
                className={`flex items-center gap-1 px-2 py-1 text-xs rounded-sm transition-colors ${
                  ambiance === 'twilight' ? 'bg-sky-950/60 text-sky-300 border border-sky-500/40' : 'text-white/60 hover:text-white'
                }`}
                title="Crépuscule & lanternes architecturales"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Crépuscule</span>
              </button>

              <button
                onClick={() => setAmbiance('solar')}
                className={`flex items-center gap-1 px-2 py-1 text-xs rounded-sm transition-colors ${
                  ambiance === 'solar' ? 'bg-white/20 text-white border border-white/40' : 'text-white/60 hover:text-white'
                }`}
                title="Midi solaire éclatant"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Midi Solaire</span>
              </button>
            </div>
          </div>

          {/* 3. Toggles: Hotspots & Auto-orbit */}
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <button
              onClick={() => setActiveHotspotsVisible(!activeHotspotsVisible)}
              className={`px-2 py-1 text-xs rounded-sm transition-colors ${
                activeHotspotsVisible ? 'text-[#c5a880] bg-[#c5a880]/10' : 'text-white/40 hover:text-white'
              }`}
              title="Afficher/masquer les repères architecturaux"
            >
              Repères 3D
            </button>
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className={`px-2 py-1 text-xs rounded-sm transition-colors ${
                isAutoRotate ? 'text-[#c5a880] bg-[#c5a880]/10' : 'text-white/40 hover:text-white'
              }`}
              title="Rotation cinématique automatique"
            >
              Orbite auto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
