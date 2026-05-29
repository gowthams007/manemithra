"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, RotateCcw, Building, Square, Compass, Bed, Users } from "lucide-react";

// Individual procedural walls or furniture meshes for the selected plan
function FloorPlanMeshes({ planType }: { planType: string }) {
  // We'll create custom arrangements depending on the selected plan type
  return (
    <group>
      {/* Shared Foundation Slab */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial color="#E5E7EB" roughness={0.7} />
      </mesh>

      {/* Grid Lines on Slab */}
      <gridHelper args={[6, 12, "#8B5E3C", "#B59E8C"]} position={[0, 0, 0]} />

      {/* Ambient Lighting inside R3F */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 2]} intensity={1.2} castShadow />

      {/* 2BHK Layout */}
      {planType === "2BHK" && (
        <group>
          {/* Outer Walls */}
          <mesh position={[0, 0.4, -2.4]} castShadow>
            <boxGeometry args={[5.8, 0.8, 0.1]} />
            <meshStandardMaterial color="#111827" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.4, 2.4]} castShadow>
            <boxGeometry args={[5.8, 0.8, 0.1]} />
            <meshStandardMaterial color="#111827" roughness={0.6} />
          </mesh>
          <mesh position={[-2.8, 0.4, 0]} castShadow>
            <boxGeometry args={[0.1, 0.8, 4.8]} />
            <meshStandardMaterial color="#111827" roughness={0.6} />
          </mesh>
          <mesh position={[2.8, 0.4, 0]} castShadow>
            <boxGeometry args={[0.1, 0.8, 4.8]} />
            <meshStandardMaterial color="#111827" roughness={0.6} />
          </mesh>

          {/* Internal Divider (Bedroom / Living divider) */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[0.08, 0.8, 3.2]} />
            <meshStandardMaterial color="#8B5E3C" roughness={0.5} />
          </mesh>
          <mesh position={[1.4, 0.4, 0.8]} castShadow>
            <boxGeometry args={[2.8, 0.8, 0.08]} />
            <meshStandardMaterial color="#8B5E3C" roughness={0.5} />
          </mesh>

          {/* Procedural Beds */}
          <mesh position={[-1.5, 0.2, -1.2]} castShadow>
            <boxGeometry args={[1.5, 0.3, 1.2]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.6} />
          </mesh>
          <mesh position={[-1.5, 0.2, 1.2]} castShadow>
            <boxGeometry args={[1.5, 0.3, 1.2]} />
            <meshStandardMaterial color="#FFF" roughness={0.8} />
          </mesh>

          {/* Sofa in Living Room */}
          <mesh position={[1.5, 0.2, -1.2]} castShadow>
            <boxGeometry args={[1.6, 0.25, 0.6]} />
            <meshStandardMaterial color="#1F2937" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* 3BHK Layout */}
      {planType === "3BHK" && (
        <group>
          {/* Walls */}
          <mesh position={[0, 0.4, -2.4]} castShadow>
            <boxGeometry args={[5.8, 0.8, 0.1]} />
            <meshStandardMaterial color="#1F2937" />
          </mesh>
          <mesh position={[0, 0.4, 2.4]} castShadow>
            <boxGeometry args={[5.8, 0.8, 0.1]} />
            <meshStandardMaterial color="#1F2937" />
          </mesh>
          <mesh position={[-2.8, 0.4, 0]} castShadow>
            <boxGeometry args={[0.1, 0.8, 4.8]} />
            <meshStandardMaterial color="#1F2937" />
          </mesh>
          <mesh position={[2.8, 0.4, 0]} castShadow>
            <boxGeometry args={[0.1, 0.8, 4.8]} />
            <meshStandardMaterial color="#1F2937" />
          </mesh>

          {/* Internal Dividers */}
          <mesh position={[-1.0, 0.4, 0]} castShadow>
            <boxGeometry args={[0.08, 0.8, 4.8]} />
            <meshStandardMaterial color="#8B5E3C" />
          </mesh>
          <mesh position={[1.0, 0.4, -0.6]} castShadow>
            <boxGeometry args={[0.08, 0.8, 3.6]} />
            <meshStandardMaterial color="#8B5E3C" />
          </mesh>
          <mesh position={[1.9, 0.4, 1.2]} castShadow>
            <boxGeometry args={[1.8, 0.8, 0.08]} />
            <meshStandardMaterial color="#8B5E3C" />
          </mesh>

          {/* 3 Beds */}
          <mesh position={[-1.9, 0.2, -1.5]} castShadow>
            <boxGeometry args={[1.2, 0.3, 1.2]} />
            <meshStandardMaterial color="#D4AF37" />
          </mesh>
          <mesh position={[-1.9, 0.2, 1.5]} castShadow>
            <boxGeometry args={[1.2, 0.3, 1.2]} />
            <meshStandardMaterial color="#FFF" />
          </mesh>
          <mesh position={[1.9, 0.2, -1.8]} castShadow>
            <boxGeometry args={[1.2, 0.3, 1.0]} />
            <meshStandardMaterial color="#E5E7EB" />
          </mesh>

          {/* Kitchen counter */}
          <mesh position={[2.0, 0.3, 0.5]} castShadow>
            <boxGeometry args={[1.4, 0.4, 0.4]} />
            <meshStandardMaterial color="#8B5E3C" />
          </mesh>
        </group>
      )}

      {/* Villa Layout (Two Floor outline) */}
      {planType === "VILLA" && (
        <group>
          {/* Duplex ground foundation slab */}
          <mesh position={[0, 0.4, -2.4]} castShadow>
            <boxGeometry args={[5.8, 1.2, 0.15]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
          <mesh position={[0, 0.4, 2.4]} castShadow>
            <boxGeometry args={[5.8, 1.2, 0.15]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
          <mesh position={[-2.8, 0.4, 0]} castShadow>
            <boxGeometry args={[0.15, 1.2, 4.8]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
          <mesh position={[2.8, 0.4, 0]} castShadow>
            <boxGeometry args={[0.15, 1.2, 4.8]} />
            <meshStandardMaterial color="#111827" />
          </mesh>

          {/* Double height Grand Lounge columns */}
          <mesh position={[-1.5, 0.9, -1.0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1.8]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} />
          </mesh>
          <mesh position={[1.5, 0.9, -1.0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1.8]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} />
          </mesh>

          {/* Grand Floating staircase */}
          <group position={[0.2, 0.3, 0.5]} rotation={[0, 0, 0.4]}>
            {[...Array(6)].map((_, i) => (
              <mesh key={i} position={[i * 0.15, i * 0.1, 0]} castShadow>
                <boxGeometry args={[0.4, 0.04, 0.8]} />
                <meshStandardMaterial color="#8B5E3C" roughness={0.3} />
              </mesh>
            ))}
          </group>

          {/* Duplex Sofa lounge */}
          <mesh position={[0, 0.2, -1.5]} castShadow>
            <boxGeometry args={[2.0, 0.25, 0.8]} />
            <meshStandardMaterial color="#E5E7EB" />
          </mesh>
        </group>
      )}

      {/* Office Layout */}
      {planType === "OFFICE" && (
        <group>
          {/* Walls */}
          <mesh position={[0, 0.4, -2.4]} castShadow>
            <boxGeometry args={[5.8, 0.8, 0.1]} />
            <meshStandardMaterial color="#1F2937" />
          </mesh>
          <mesh position={[0, 0.4, 2.4]} castShadow>
            <boxGeometry args={[5.8, 0.8, 0.1]} />
            <meshStandardMaterial color="#1F2937" />
          </mesh>
          <mesh position={[-2.8, 0.4, 0]} castShadow>
            <boxGeometry args={[0.1, 0.8, 4.8]} />
            <meshStandardMaterial color="#1F2937" />
          </mesh>
          <mesh position={[2.8, 0.4, 0]} castShadow>
            <boxGeometry args={[0.1, 0.8, 4.8]} />
            <meshStandardMaterial color="#1F2937" />
          </mesh>

          {/* Board Room Glass partition outline */}
          <mesh position={[-1.2, 0.4, 0]} castShadow>
            <boxGeometry args={[0.04, 0.8, 3.2]} />
            <meshStandardMaterial color="#88B8C8" transparent opacity={0.4} roughness={0.1} />
          </mesh>
          <mesh position={[-2.0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.8, 0.35, 1.8]} />
            <meshStandardMaterial color="#8B5E3C" />
          </mesh>

          {/* Working Desking Clusters */}
          <group position={[1.2, 0, 0]}>
            <mesh position={[-0.5, 0.3, -1.0]} castShadow>
              <boxGeometry args={[0.6, 0.4, 0.8]} />
              <meshStandardMaterial color="#FFF" />
            </mesh>
            <mesh position={[0.5, 0.3, -1.0]} castShadow>
              <boxGeometry args={[0.6, 0.4, 0.8]} />
              <meshStandardMaterial color="#FFF" />
            </mesh>
            <mesh position={[-0.5, 0.3, 1.0]} castShadow>
              <boxGeometry args={[0.6, 0.4, 0.8]} />
              <meshStandardMaterial color="#FFF" />
            </mesh>
            <mesh position={[0.5, 0.3, 1.0]} castShadow>
              <boxGeometry args={[0.6, 0.4, 0.8]} />
              <meshStandardMaterial color="#FFF" />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
}

export default function FloorPlan3D() {
  const [activePlan, setActivePlan] = useState<"2BHK" | "3BHK" | "VILLA" | "OFFICE">("2BHK");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const planInfo = {
    "2BHK": {
      title: "2BHK Smart Apartment",
      size: "1,150 - 1,300 Sq.Ft.",
      rooms: "2 Bedrooms, 2 Bathrooms, 1 Balcony",
      completion: "35 Days Guarantee",
      description: "Optimized space planning featuring sleek modular wardrobes, multi-utility storage solutions, and a signature parallel modular kitchen. Perfect for modern urban couples.",
      details: ["Space-optimized layout", "Parallel German kitchen", "Built-in vanity storages", "Ambient lighting integration"],
    },
    "3BHK": {
      title: "3BHK Premium Residence",
      size: "1,600 - 1,950 Sq.Ft.",
      rooms: "3 Bedrooms, 3 Bathrooms, Utility, 2 Balconies",
      completion: "45 Days Guarantee",
      description: "Generous layout designed with a massive open-concept kitchen, dining credentials, dedicated kids room decor, and a royal grand master suite with bespoke dressing paneling.",
      details: ["Island modular kitchen", "Bespoke veneer headboards", "False ceiling with COB lights", "Dedicated home office nook"],
    },
    "VILLA": {
      title: "Ultra-Luxury Duplex Villa",
      size: "3,200 - 4,500 Sq.Ft.",
      rooms: "4+ Bedrooms, Duplex Lounge, Home Theater, Deck",
      completion: "75 Days Guarantee",
      description: "Grand architectural blueprints sporting dramatic double-height ceiling paneling, glass railings, custom spiral stair structures, private deck bars, and fully integrated smart home automation.",
      details: ["Double-height architectural lounge", "Integrated home automation", "Private bar and patio deck", "Italian marble wall paneling"],
    },
    "OFFICE": {
      title: "Vibrant Corporate Studio",
      size: "2,000 - 8,000 Sq.Ft.",
      rooms: "Reception, Manager Cabins, 24 Desk Bays, Cafeteria",
      completion: "50 Days Guarantee",
      description: "Ergonomic, modern collaborative office layout designed to boost workplace focus. Features hot desking clusters, glass-enclosed conference setups, soundproof calling booths, and green walls.",
      details: ["Biophilic design integrations", "Acoustic fabric wall panels", "Sleek glass partitions", "Breakout recreational lounges"],
    },
  };

  return (
    <section id="floorplan" className="py-20 md:py-32 bg-brand-cream dark:bg-brand-charcoal transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-brand-wood dark:text-brand-gold text-xs tracking-[0.3em] font-semibold uppercase block mb-3">
            Interactive Blueprint
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-brand-charcoal dark:text-brand-cream">
            Explore 3D Floor Layouts
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-charcoal/60 dark:text-brand-cream/60 mt-4 max-w-xl mx-auto">
            Choose a residence format. Rotate, zoom, and explore the bespoke design arrangements created by our master architects.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Controls & Descriptions (Left 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col space-y-8 z-10">
            {/* Tabs Selector */}
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(planInfo) as Array<keyof typeof planInfo>).map((type) => (
                <button
                  key={type}
                  onClick={() => setActivePlan(type)}
                  className={`py-3.5 px-4 rounded-md font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 border cursor-pointer ${
                    activePlan === type
                      ? "bg-brand-wood dark:bg-brand-gold text-brand-cream dark:text-brand-charcoal border-transparent shadow-lg scale-102"
                      : "bg-transparent text-brand-charcoal/70 dark:text-brand-cream/70 border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-gold"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Plan Specs details card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlan}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                className="bg-brand-cream dark:bg-brand-darkgray p-8 rounded-xl border border-brand-charcoal/5 dark:border-brand-cream/5 shadow-xl flex flex-col space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-charcoal dark:text-brand-cream mb-2">
                    {planInfo[activePlan].title}
                  </h3>
                  <div className="flex items-center space-x-2 text-brand-wood dark:text-brand-gold font-sans text-xs tracking-wider uppercase font-semibold">
                    <Building className="w-4 h-4" />
                    <span>{planInfo[activePlan].size}</span>
                  </div>
                </div>

                <p className="font-sans text-sm text-brand-charcoal/70 dark:text-brand-cream/70 leading-relaxed">
                  {planInfo[activePlan].description}
                </p>

                {/* Specs Pill List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-brand-charcoal/60 dark:text-brand-cream/60">
                  <div className="flex items-center space-x-2.5">
                    <Bed className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{planInfo[activePlan].rooms}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Compass className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{planInfo[activePlan].completion}</span>
                  </div>
                </div>

                {/* Details bullet lines */}
                <div className="border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-5">
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-brand-gold block mb-3">
                    Premium Scope Highlights
                  </span>
                  <ul className="grid grid-cols-1 gap-2.5 text-xs font-sans text-brand-charcoal/80 dark:text-brand-cream/80">
                    {planInfo[activePlan].details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive 3D Canvas Viewport (Right 7 Columns) */}
          <div className="lg:col-span-7 relative h-[50vh] md:h-[60vh] bg-brand-cream dark:bg-brand-darkgray/40 rounded-2xl border border-brand-charcoal/5 dark:border-brand-cream/5 shadow-2xl overflow-hidden group">
            
            {/* 3D Canvas */}
            <Canvas shadows className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y">
              <PerspectiveCamera makeDefault position={[3.5, 4.5, 4.5]} fov={40} />
              <FloorPlanMeshes planType={activePlan} />
              <OrbitControls
                enableZoom={true}
                maxPolarAngle={Math.PI / 2 - 0.05}
                minDistance={3.5}
                maxDistance={8}
                enableDamping={true}
              />
            </Canvas>

            {/* Instruction Overlay floating */}
            <div className="absolute bottom-5 right-5 flex items-center space-x-3.5 bg-brand-charcoal/80 text-brand-cream px-4 py-2.5 rounded-full backdrop-blur-sm border border-brand-cream/10 text-xs font-sans pointer-events-none transition-opacity duration-300 opacity-80 group-hover:opacity-100">
              <RotateCcw className="w-3.5 h-3.5 animate-spin-slow text-brand-gold" />
              <span>Left-Click + Drag to Rotate 3D Plan</span>
            </div>

            <div className="absolute top-5 left-5 bg-brand-wood/90 text-brand-cream px-3 py-1.5 rounded text-[10px] tracking-widest font-sans uppercase font-bold pointer-events-none">
              Interactive 3D Sandbox
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
