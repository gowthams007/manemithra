"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

// Three.js component that controls the drop-in animation based on scroll progress
function TransformationScene({ progress }: { progress: number }) {
  const floorRef = useRef<THREE.Mesh>(null);
  const wallRef = useRef<THREE.Mesh>(null);
  const cabinetRef = useRef<THREE.Mesh>(null);
  const vaseRef = useRef<THREE.Mesh>(null);
  
  const floorMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const wallMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const cabinetMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const vaseMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // We map the 0 to 1 scroll progress into specific stages
  // Stage 1 (0.0 - 0.25): Floor slides up
  // Stage 2 (0.25 - 0.50): Wall drops in
  // Stage 3 (0.50 - 0.75): Cabinet slides in, material finishes gain wood texture
  // Stage 4 (0.75 - 1.0): Lights turn on, decorative items appear

  useFrame(() => {
    // Floor animation (Stage 1)
    if (floorRef.current) {
      const p = Math.min(Math.max(progress / 0.25, 0), 1);
      floorRef.current.position.y = -1.2 + p * 1.2; // Slide up to y = 0
      if (floorMatRef.current) {
        floorMatRef.current.opacity = p;
      }
    }

    // Wall animation (Stage 2)
    if (wallRef.current) {
      const p = Math.min(Math.max((progress - 0.25) / 0.25, 0), 1);
      wallRef.current.position.z = -5 + p * 3.5; // Slide forward to z = -1.5
      wallRef.current.position.y = 3 - (1 - p) * 2; // Drop down
      if (wallMatRef.current) {
        wallMatRef.current.opacity = p;
      }
    }

    // Cabinet animation (Stage 3)
    if (cabinetRef.current) {
      const p = Math.min(Math.max((progress - 0.5) / 0.25, 0), 1);
      cabinetRef.current.position.y = -2 + p * 2.45; // Rise up
      cabinetRef.current.rotation.y = (1 - p) * Math.PI; // Spin in
      if (cabinetMatRef.current) {
        cabinetMatRef.current.opacity = p;
      }
    }

    // Lights and Vase (Stage 4)
    if (vaseRef.current) {
      const p = Math.min(Math.max((progress - 0.75) / 0.25, 0), 1);
      vaseRef.current.position.y = 2 - (1 - p) * 1.06; // Fall from sky onto cabinet
      if (vaseMatRef.current) {
        vaseMatRef.current.opacity = p;
      }
    }

    if (lightRef.current) {
      const p = Math.min(Math.max((progress - 0.75) / 0.25, 0), 1);
      lightRef.current.intensity = p * 2.5; // Glow intensely
    }
  });

  return (
    <>
      {/* Grid Helper (Shows initial empty house wireframe) */}
      <gridHelper args={[20, 20, "#8B5E3C", "#8B5E3C"]} position={[0, -1.2, 0]} />

      {/* 1. Wood Floor Plane */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial
          ref={floorMatRef}
          color="#8B5E3C"
          roughness={0.4}
          metalness={0.1}
          transparent
          opacity={0}
        />
      </mesh>

      {/* 2. Textured Wall Panel */}
      <mesh ref={wallRef} position={[0, 1, -5]} castShadow receiveShadow>
        <boxGeometry args={[10, 4.4, 0.25]} />
        <meshStandardMaterial
          ref={wallMatRef}
          color="#111827"
          roughness={0.8}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Decorative metal inlay trims for Wall */}
      {progress > 0.25 && (
        <group position={[0, 1, -1.35]}>
          <mesh position={[-2, 0, 0]}>
            <boxGeometry args={[0.03, 4.4, 0.03]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[2, 0, 0]}>
            <boxGeometry args={[0.03, 4.4, 0.03]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      )}

      {/* 3. Modular Console Cabinet */}
      <mesh ref={cabinetRef} position={[0, -2, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 0.9, 0.8]} />
        <meshStandardMaterial
          ref={cabinetMatRef}
          color="#1F2937"
          roughness={0.3}
          metalness={0.2}
          transparent
          opacity={0}
        />
      </mesh>

      {/* 4. Luxury Gold Vase */}
      <mesh ref={vaseRef} position={[0, 2, 0.5]} castShadow>
        <cylinderGeometry args={[0.15, 0.25, 0.6, 16]} />
        <meshStandardMaterial
          ref={vaseMatRef}
          color="#D4AF37"
          metalness={0.9}
          roughness={0.15}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Stage Lights */}
      <ambientLight intensity={0.2} />
      
      {/* Overhead spot light that turns on */}
      <pointLight
        ref={lightRef}
        position={[0, 3.5, 1.2]}
        color="#FFF"
        intensity={0}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />

      <directionalLight position={[-5, 8, 3]} intensity={0.5} />
    </>
  );
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [scrollVal, setScrollVal] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollVal(latest);
    });
  }, [scrollYProgress]);

  // Framer Motion transforms for premium slide transitions (clamped to prevent extrapolation overlaps)
  const textOpacity1 = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0], { clamp: true });
  const textY1 = useTransform(scrollYProgress, [0, 0.2, 0.25], [0, 0, -15], { clamp: true });

  const textOpacity2 = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.5], [0, 1, 1, 0], { clamp: true });
  const textY2 = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.5], [15, 0, 0, -15], { clamp: true });

  const textOpacity3 = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0], { clamp: true });
  const textY3 = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [15, 0, 0, -15], { clamp: true });

  const textOpacity4 = useTransform(scrollYProgress, [0.7, 0.75, 1.0], [0, 1, 1], { clamp: true });
  const textY4 = useTransform(scrollYProgress, [0.7, 0.75, 1.0], [15, 0, 0], { clamp: true });

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-brand-cream dark:bg-brand-charcoal">
      
      {/* Sticky 3D Screen viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center">
        
        {/* Canvas Section */}
        <div className="absolute inset-0 w-full h-[65vh] md:h-full z-0">
          <Canvas shadows dpr={[1, 1.5]}>
            <PerspectiveCamera makeDefault position={[0, 2.2, 5.5]} fov={45} />
            <TransformationScene progress={scrollVal} />
          </Canvas>
        </div>

        {/* Dynamic Scrolling Headlines Panel */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end md:justify-center z-10 pointer-events-none pb-20 md:pb-0">
          <div className="max-w-2xl bg-brand-cream/90 dark:bg-brand-charcoal/90 backdrop-blur-md p-8 md:p-10 rounded-xl border border-brand-charcoal/5 dark:border-brand-cream/5 pointer-events-auto self-start shadow-xl">
            
            <span className="text-brand-wood dark:text-brand-gold text-xs tracking-[0.3em] font-semibold uppercase block mb-3">
              Dynamic Architecture
            </span>

            {/* Height set to h-40/h-48 to completely eliminate character clipping across all viewports */}
            <div className="relative h-40 md:h-48 overflow-hidden">
              
              {/* Headline 1 */}
              <motion.div
                style={{ opacity: textOpacity1, y: textY1 }}
                className="absolute inset-0 flex flex-col justify-start"
              >
                <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-brand-charcoal dark:text-brand-cream">
                  Watch Your Dream Home Come To Life
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 dark:text-brand-cream/60 mt-3 leading-relaxed">
                  It all begins with an empty grid. We lay the foundations of elegant structure with ultra-premium wood floor finishes.
                </p>
              </motion.div>

              {/* Headline 2 */}
              <motion.div
                style={{ opacity: textOpacity2, y: textY2 }}
                className="absolute inset-0 flex flex-col justify-start"
              >
                <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-brand-charcoal dark:text-brand-cream">
                  Injecting Structural Grace
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 dark:text-brand-cream/60 mt-3 leading-relaxed">
                  Next, clean structural panels slide into place. The primary charcoal color palettes form walls of elegance.
                </p>
              </motion.div>

              {/* Headline 3 */}
              <motion.div
                style={{ opacity: textOpacity3, y: textY3 }}
                className="absolute inset-0 flex flex-col justify-start"
              >
                <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-brand-charcoal dark:text-brand-cream">
                  Modular Handcrafted Furniture
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 dark:text-brand-cream/60 mt-3 leading-relaxed">
                  Bespoke, multi-functional consoles and cabinetry drop in. Space is maximized and modular efficiency is born.
                </p>
              </motion.div>

              {/* Headline 4 */}
              <motion.div
                style={{ opacity: textOpacity4, y: textY4 }}
                className="absolute inset-0 flex flex-col justify-start"
              >
                <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-brand-charcoal dark:text-brand-cream">
                  Warm Ambient Lighting & Accents
                </h3>
                <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 dark:text-brand-cream/60 mt-3 leading-relaxed">
                  Finally, the smart ambient lighting fires up. Gold design trim highlights glow, and decor transforms a house into a warm home.
                </p>
              </motion.div>

            </div>

            {/* Scroll Indicator Inside Panel */}
            <div className="mt-6 flex items-center space-x-4">
              <div className="flex-1 h-[2px] bg-brand-charcoal/10 dark:bg-brand-cream/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-gold"
                  style={{ width: `${scrollVal * 100}%` }}
                />
              </div>
              <span className="font-mono text-xs text-brand-gold font-bold">
                {Math.round(scrollVal * 100)}%
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
