"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush, LayoutGrid, Sofa, Lightbulb, DollarSign, RotateCcw } from "lucide-react";
import * as THREE from "three";

// 3D Scene representing the customizable room
function ConfiguratorRoomScene({
  wallColor,
  flooring,
  sofaColor,
  lighting,
}: {
  wallColor: string;
  flooring: "walnut" | "oak" | "marble";
  sofaColor: string;
  lighting: "warm" | "cool" | "golden";
}) {
  const sofaMeshRef = useRef<THREE.Mesh>(null);

  // Flooring details
  const flooringColors = {
    walnut: "#4A3319",
    oak: "#C2A378",
    marble: "#F3F4F6",
  };

  // Lighting details
  const lightColors = {
    warm: "#FCE8B2",
    cool: "#E0F2FE",
    golden: "#FDBA74",
  };

  const lightIntensity = {
    warm: 1.8,
    cool: 1.5,
    golden: 2.2,
  };

  return (
    <group>
      {/* 1. Walls */}
      {/* Back Wall */}
      <mesh position={[0, 1.8, -2.5]} castShadow receiveShadow>
        <boxGeometry args={[7, 3.6, 0.25]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-3.5, 1.8, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 3.6, 0.25]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>

      {/* Decorative wall panels / gold trims */}
      <mesh position={[0, 1.8, -2.36]} castShadow>
        <boxGeometry args={[0.04, 3.6, 0.04]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[-1.2, 1.8, -2.36]} castShadow>
        <boxGeometry args={[0.04, 3.6, 0.04]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[1.2, 1.8, -2.36]} castShadow>
        <boxGeometry args={[0.04, 3.6, 0.04]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* 2. Customizable Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial
          color={flooringColors[flooring]}
          roughness={flooring === "marble" ? 0.1 : 0.35}
          metalness={flooring === "marble" ? 0.2 : 0.05}
        />
      </mesh>

      {/* 3. Customizable Sofa */}
      <group position={[0, 0, -0.2]}>
        {/* Sofa Base */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.1, 1.0]} />
          <meshStandardMaterial color="#372517" roughness={0.5} />
        </mesh>
        
        {/* Sofa Seats */}
        <mesh ref={sofaMeshRef} position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.25, 0.9]} />
          <meshStandardMaterial color={sofaColor} roughness={0.8} />
        </mesh>

        {/* Sofa Backrest */}
        <mesh position={[0, 0.65, -0.38]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.6, 0.2]} />
          <meshStandardMaterial color={sofaColor} roughness={0.8} />
        </mesh>

        {/* Armrests */}
        <mesh position={[-1.35, 0.4, 0]} castShadow>
          <boxGeometry args={[0.15, 0.5, 0.92]} />
          <meshStandardMaterial color={sofaColor} roughness={0.8} />
        </mesh>
        <mesh position={[1.35, 0.4, 0]} castShadow>
          <boxGeometry args={[0.15, 0.5, 0.92]} />
          <meshStandardMaterial color={sofaColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Modern Floor Lamp (Brass & Glow Bulb) */}
      <group position={[2.5, 0, -1.8]}>
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.04, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 2.2, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
        {/* Curved Lamp Neck */}
        <mesh position={[-0.15, 2.2, 0]} rotation={[0, 0, Math.PI / 2.5]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.38, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
        {/* Lamp Dome Shade */}
        <mesh position={[-0.32, 2.1, 0]} castShadow>
          <sphereGeometry args={[0.18, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#111827" roughness={0.3} />
        </mesh>
        {/* Lamp light source */}
        <pointLight
          position={[-0.32, 1.9, 0]}
          color={lightColors[lighting]}
          intensity={lightIntensity[lighting]}
          distance={5}
          castShadow
        />
        <mesh position={[-0.32, 1.98, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#FFF" />
        </mesh>
      </group>

      {/* Ambient Room Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[-4, 6, 2]} intensity={0.8} />
    </group>
  );
}

export default function DesignConfigurator3D() {
  // Option Configurations
  const wallColors = [
    { name: "Deep Charcoal", hex: "#111827", price: 0 },
    { name: "Warm Sand", hex: "#E6CBB5", price: 250 },
    { name: "Soft Ivory", hex: "#F4EFEA", price: 150 },
    { name: "Luxury Gold", hex: "#D4AF37", price: 600 },
  ];

  const flooringTypes = [
    { name: "Light Oak Wood", id: "oak" as const, price: 1200 },
    { name: "Dark Walnut Wood", id: "walnut" as const, price: 1500 },
    { name: "Polished Marble", id: "marble" as const, price: 2800 },
  ];

  const sofaColors = [
    { name: "Bouclé Pearl", hex: "#F3F4F6", price: 800 },
    { name: "Cognac Leather", hex: "#8B5E3C", price: 1800 },
    { name: "Velvet Emerald", hex: "#2A4D3E", price: 1200 },
    { name: "Velvet Charcoal", hex: "#1F2937", price: 900 },
  ];

  const lightingProfiles = [
    { name: "Warm Candlelight", id: "warm" as const, price: 300 },
    { name: "Cool Daylight", id: "cool" as const, price: 200 },
    { name: "Golden Hour Sunset", id: "golden" as const, price: 500 },
  ];

  // Configurator States
  const [selectedWall, setSelectedWall] = useState(wallColors[0]);
  const [selectedFlooring, setSelectedFlooring] = useState(flooringTypes[0]);
  const [selectedSofa, setSelectedSofa] = useState(sofaColors[0]);
  const [selectedLighting, setSelectedLighting] = useState(lightingProfiles[0]);
  
  // Budget pricing calculation
  const [budget, setBudget] = useState(8500);

  useEffect(() => {
    const basePrice = 7500;
    const computedPrice =
      basePrice +
      selectedWall.price +
      selectedFlooring.price +
      selectedSofa.price +
      selectedLighting.price;
    
    // Smooth dynamic count-up effect
    const duration = 500; // ms
    const steps = 25;
    const stepTime = duration / steps;
    let currentStep = 0;
    const increment = (computedPrice - budget) / steps;

    const timer = setInterval(() => {
      currentStep++;
      setBudget((prev) => {
        if (currentStep >= steps) {
          clearInterval(timer);
          return computedPrice;
        }
        return Math.round(prev + increment);
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [selectedWall, selectedFlooring, selectedSofa, selectedLighting]);

  const resetConfig = () => {
    setSelectedWall(wallColors[0]);
    setSelectedFlooring(flooringTypes[0]);
    setSelectedSofa(sofaColors[0]);
    setSelectedLighting(lightingProfiles[0]);
  };

  return (
    <section id="configurator" className="py-20 md:py-32 bg-brand-charcoal text-brand-cream relative overflow-hidden">
      
      {/* Absolute Backdrop glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-wood/10 blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-brand-gold text-xs tracking-[0.3em] font-semibold uppercase block mb-3">
            Real-time Studio Configurator
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-brand-cream">
            Design Your Custom Lounge
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-cream/60 mt-4 max-w-xl mx-auto">
            Interact with our virtual 3D config simulator. Adjust structural variables, view finishes, and watch your budget update dynamically.
          </p>
        </div>

        {/* Grid Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* 3D Canvas Box (Left 7 Columns) */}
          <div className="lg:col-span-7 relative h-[45vh] md:h-[60vh] bg-brand-darkgray/60 rounded-2xl border border-brand-cream/5 shadow-2xl overflow-hidden group">
            
            <Canvas shadows className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y">
              <PerspectiveCamera makeDefault position={[0.5, 2.5, 4.8]} fov={38} />
              <ConfiguratorRoomScene
                wallColor={selectedWall.hex}
                flooring={selectedFlooring.id}
                sofaColor={selectedSofa.hex}
                lighting={selectedLighting.id}
              />
              <OrbitControls
                enableZoom={true}
                maxPolarAngle={Math.PI / 2 - 0.05}
                minDistance={3.5}
                maxDistance={6}
                enableDamping={true}
              />
            </Canvas>

            {/* Sandbox details */}
            <div className="absolute top-5 left-5 bg-brand-gold text-brand-charcoal px-3 py-1.5 rounded text-[10px] tracking-widest font-sans uppercase font-bold pointer-events-none shadow-md">
              3D Rendering Active
            </div>

            <button
              onClick={resetConfig}
              className="absolute bottom-5 left-5 flex items-center space-x-2 bg-brand-charcoal/80 hover:bg-brand-gold hover:text-brand-charcoal text-brand-cream px-3 py-2 rounded-full border border-brand-cream/10 text-xs font-sans transition-all duration-300 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Canvas</span>
            </button>
          </div>

          {/* Config Controls Box (Right 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-brand-darkgray p-8 rounded-2xl border border-brand-cream/5 shadow-2xl">
            
            <div className="flex flex-col space-y-6">
              
              {/* 1. Wall Colors */}
              <div>
                <span className="flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-brand-gold mb-3">
                  <Paintbrush className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Wall Paint Spec</span>
                </span>
                <div className="flex items-center space-x-3.5">
                  {wallColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedWall(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-9 h-9 rounded-full border-2 cursor-pointer transition-all duration-300 relative group ${
                        selectedWall.name === color.name ? "border-brand-gold scale-110" : "border-transparent"
                      }`}
                      aria-label={color.name}
                    >
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-brand-charcoal text-brand-cream text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-brand-cream/10">
                        {color.name} (+${color.price})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Flooring Selection */}
              <div>
                <span className="flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-brand-gold mb-3">
                  <LayoutGrid className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Flooring Material</span>
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {flooringTypes.map((floor) => (
                    <button
                      key={floor.name}
                      onClick={() => setSelectedFlooring(floor)}
                      className={`py-2.5 px-2 rounded font-sans text-[10px] tracking-wider font-bold uppercase transition-all duration-300 border cursor-pointer ${
                        selectedFlooring.name === floor.name
                          ? "bg-brand-wood text-brand-cream border-transparent"
                          : "bg-transparent text-brand-cream/60 border-brand-cream/10 hover:border-brand-gold hover:text-brand-cream"
                      }`}
                    >
                      {floor.name.replace(" Wood", "").replace(" Material", "")}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Sofa Upholstery */}
              <div>
                <span className="flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-brand-gold mb-3">
                  <Sofa className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Sofa Fabric</span>
                </span>
                <div className="flex items-center space-x-3.5">
                  {sofaColors.map((fabric) => (
                    <button
                      key={fabric.name}
                      onClick={() => setSelectedSofa(fabric)}
                      style={{ backgroundColor: fabric.hex }}
                      className={`w-9 h-9 rounded-full border-2 cursor-pointer transition-all duration-300 relative group ${
                        selectedSofa.name === fabric.name ? "border-brand-gold scale-110" : "border-transparent"
                      }`}
                      aria-label={fabric.name}
                    >
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-brand-charcoal text-brand-cream text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-brand-cream/10">
                        {fabric.name} (+${fabric.price})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Lighting Profiles */}
              <div>
                <span className="flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-brand-gold mb-3">
                  <Lightbulb className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Lighting Profile</span>
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {lightingProfiles.map((light) => (
                    <button
                      key={light.name}
                      onClick={() => setSelectedLighting(light)}
                      className={`py-2.5 px-2 rounded font-sans text-[10px] tracking-wider font-bold uppercase transition-all duration-300 border cursor-pointer ${
                        selectedLighting.name === light.name
                          ? "bg-brand-wood text-brand-cream border-transparent"
                          : "bg-transparent text-brand-cream/60 border-brand-cream/10 hover:border-brand-gold hover:text-brand-cream"
                      }`}
                    >
                      {light.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Estimated Budget Dynamic Display */}
            <div className="mt-8 pt-6 border-t border-brand-cream/10 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-cream/50 mb-1">
                    Estimated Project Investment
                  </span>
                  <div className="flex items-center text-brand-gold">
                    <DollarSign className="w-6 h-6 mr-0.5 shrink-0" />
                    <span className="font-serif text-3xl font-bold tracking-wider">
                      {budget.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="font-sans text-[9px] tracking-wider text-brand-cream/40 uppercase text-right font-medium">
                  Base + Selected Specs
                </div>
              </div>
              
              <a
                href="#contact"
                className="w-full text-center bg-brand-gold hover:bg-brand-cream text-brand-charcoal py-4 rounded font-sans text-xs tracking-widest font-bold uppercase shadow-lg transition-all duration-300 block"
              >
                Inquire & Save Specs
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
