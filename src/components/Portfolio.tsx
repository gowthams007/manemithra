"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Compass, X, Play, MessageSquare, ArrowRight, Expand } from "lucide-react";

// 360 Sphere Room Scene
function Room360Scene({ colorTheme }: { colorTheme: string }) {
  // We'll build a beautiful procedural spherical room to look around in 360 degrees
  return (
    <group>
      {/* 360 Sphere Shell (looks like an ambient room from inside) */}
      <mesh>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial
          color={colorTheme === "gold" ? "#362d22" : "#2c3540"}
          side={2} // THREE.DoubleSide
          roughness={0.8}
        />
      </mesh>

      {/* Grid structure indicating spatial design */}
      <gridHelper args={[20, 20, "#D4AF37", "#8B5E3C"]} position={[0, -5, 0]} />

      {/* Internal columns/pillars for luxurious 3D perspective */}
      <mesh position={[-4, 0, -4]} castShadow>
        <boxGeometry args={[0.6, 10, 0.6]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.4} />
      </mesh>
      <mesh position={[4, 0, -4]} castShadow>
        <boxGeometry args={[0.6, 10, 0.6]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.4} />
      </mesh>
      <mesh position={[-4, 0, 4]} castShadow>
        <boxGeometry args={[0.6, 10, 0.6]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.4} />
      </mesh>
      <mesh position={[4, 0, 4]} castShadow>
        <boxGeometry args={[0.6, 10, 0.6]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.4} />
      </mesh>

      {/* Golden horizontal trim rings */}
      <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[7.5, 0.05, 8, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} />
      </mesh>
      <mesh position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[7.5, 0.05, 8, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} />
      </mesh>

      {/* Modern ceiling pendant light panel */}
      <mesh position={[0, 4.8, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 16]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      {/* Light glow sphere */}
      <mesh position={[0, 4.5, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#FFF" />
      </mesh>

      {/* Cozy Lounge Chair inside the sphere */}
      <mesh position={[0, -4.5, -2]} castShadow>
        <boxGeometry args={[2, 1, 1.6]} />
        <meshStandardMaterial color={colorTheme === "gold" ? "#D4AF37" : "#E5E7EB"} />
      </mesh>

      {/* Stage lights - Scaled to candidates of lumen models for modern Three.js */}
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 3.8, 0]} intensity={35} color="#FFFDF0" decay={1.2} />
      <directionalLight position={[-3, 5, 3]} intensity={10} />
    </group>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "APARTMENT" | "VILLA" | "LUXURY" | "OFFICE">("ALL");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [viewer360Open, setViewer360Open] = useState(false);

  const categories = ["ALL", "APARTMENT", "VILLA", "LUXURY", "OFFICE"];

  const projects = [
    {
      id: 1,
      title: "The Golden Crest Penthouse",
      category: "LUXURY",
      location: "Indiranagar, Bangalore",
      size: "3,800 Sq.Ft.",
      client: "Mr. Rajeev Sharma",
      colorTheme: "gold",
      testimonial: "Mane Mithra transformed our cold high-rise concrete slab into a breathtaking luxury golden palace. The 3D configurator mapped our expectations to a tee!",
      imageTheme: "from-amber-900 to-amber-950",
      description: "A super-premium duplex penthouse incorporating handcrafted teakwood wall arrays, high-gloss gold steel frame profiles, white Italian marble flooring, and smart automation systems.",
    },
    {
      id: 2,
      title: "Oak & Iron Minimalist Villa",
      category: "VILLA",
      location: "Whitefield, Bangalore",
      size: "4,200 Sq.Ft.",
      client: "Dr. Ananya Reddy",
      colorTheme: "wood",
      testimonial: "Their process is highly scientific. The materials selection was extremely comprehensive and the 10-year warranty gave us complete peace of mind.",
      imageTheme: "from-stone-850 to-amber-900",
      description: "A Scandinavian modern villa built using light oak wood trims, matte black structural columns, biophilic hanging plants, double-height ceiling windows, and custom linen seating.",
    },
    {
      id: 3,
      title: "Vanguard Coworking Studio",
      category: "OFFICE",
      location: "Koramangala, Bangalore",
      size: "6,500 Sq.Ft.",
      client: "Vanguard Tech Labs",
      colorTheme: "cool",
      testimonial: "Unbelievable utility mapping. Our team productivity skyrocketed and the breakout lounges are a major hit with visiting prospective clients.",
      imageTheme: "from-slate-900 to-zinc-900",
      description: "A functional open-concept workspace prioritizing ergonomic desk islands, glass conference enclosures, soundproof calling cubes, and dynamic moss walls.",
    },
    {
      id: 4,
      title: "The Charcoal Parallel Loft",
      category: "APARTMENT",
      location: "HSR Layout, Bangalore",
      size: "1,450 Sq.Ft.",
      client: "Amit & Priya Sen",
      colorTheme: "cool",
      testimonial: "Space utilization at its absolute finest! Every cabinet has a custom magnetic tray and the parallel kitchen looks straight out of an architectural digest.",
      imageTheme: "from-zinc-900 to-slate-950",
      description: "An urban 3BHK flat converted using parallel modular kitchen layouts, built-in mirror closets, hidden corridor storage panels, and indirect warm glowing profiles.",
    },
  ];

  // Escape key listener for 360 viewer
  useState(() => {
    if (typeof window !== "undefined") {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setViewer360Open(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  });

  const filteredProjects = activeCategory === "ALL" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-[#F9F7F4] dark:bg-brand-charcoal transition-colors duration-300 relative z-10">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-brand-wood dark:text-brand-gold text-xs tracking-[0.3em] font-semibold uppercase block mb-3">
            Creative Portfolio
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-brand-charcoal dark:text-brand-cream">
            Bespoke Project Showcase
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-charcoal/60 dark:text-brand-cream/60 mt-4 max-w-xl mx-auto">
            Browse our catalog of fully executed high-end residences. Click on any project to explore full details and launch the virtual 360° room viewer.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`py-2 px-5 rounded-full font-sans text-xs tracking-widest font-bold uppercase transition-all duration-300 border cursor-pointer ${
                activeCategory === cat
                  ? "bg-brand-charcoal text-brand-cream dark:bg-brand-cream dark:text-brand-charcoal border-transparent shadow-lg"
                  : "bg-transparent text-brand-charcoal/70 dark:text-brand-cream/70 border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Masonry-like Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedProject(project)}
                className="relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-xl group border border-brand-charcoal/5 dark:border-brand-cream/5"
              >
                {/* Background colored abstract gradient represent project */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.imageTheme} transition-transform duration-700 group-hover:scale-105`} />
                {/* Visual geometric pattern representation inside card for high quality feel */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent pointer-events-none" />

                {/* Corner details */}
                <div className="absolute top-6 left-6 bg-brand-gold/90 text-brand-charcoal text-[9px] tracking-widest font-sans uppercase font-bold px-2.5 py-1 rounded shadow-md z-10">
                  {project.category}
                </div>

                {/* Text overlays bottom */}
                <div className="absolute bottom-0 left-0 w-full p-8 text-brand-cream flex flex-col justify-end">
                  <span className="font-sans text-[10px] tracking-widest text-brand-gold uppercase font-bold mb-2">
                    {project.location}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-wide mb-3 group-hover:text-brand-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-brand-cream/60 leading-relaxed max-w-sm line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="mt-5 flex items-center space-x-2 text-xs font-sans text-brand-gold font-bold uppercase tracking-wider opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span>Inspect Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Project Details Modal Popups */}
      <AnimatePresence>
        {selectedProject && !viewer360Open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/90 p-4 md:p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative w-full max-w-4xl bg-brand-cream dark:bg-brand-darkgray rounded-2xl overflow-hidden shadow-2xl border border-brand-charcoal/10 dark:border-brand-cream/10 flex flex-col md:flex-row max-h-[85vh] md:max-h-[80vh]"
            >
              {/* Image side */}
              <div className={`w-full md:w-1/2 relative bg-gradient-to-br ${selectedProject.imageTheme} p-8 text-brand-cream flex flex-col justify-between min-h-[250px] md:min-h-auto shrink-0`}>
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
                
                <span className="bg-brand-gold text-brand-charcoal px-3 py-1 rounded text-[10px] tracking-widest font-sans font-bold uppercase w-fit shadow-md">
                  {selectedProject.category}
                </span>

                <div className="z-10 flex flex-col space-y-4 my-8 md:my-0">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-wide">
                    {selectedProject.title}
                  </h3>
                  <div className="text-xs font-sans text-brand-cream/70 flex flex-wrap items-center gap-2">
                    <span>Location: {selectedProject.location}</span>
                    <span>•</span>
                    <span>Size: {selectedProject.size}</span>
                  </div>
                </div>

                {/* Launch 360 button wrapper */}
                <button
                  onClick={() => setViewer360Open(true)}
                  className="z-10 flex items-center justify-center space-x-3.5 bg-brand-gold text-brand-charcoal py-4 rounded-lg font-sans text-xs tracking-widest font-bold uppercase hover:bg-brand-cream hover:scale-102 transition-all duration-300 shadow-xl cursor-pointer"
                >
                  <Compass className="w-4 h-4 animate-spin-slow" />
                  <span>Launch 360° virtual tour</span>
                </button>
              </div>

              {/* Text Side - Always scrollable internally */}
              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[45vh] md:max-h-full relative">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-brand-charcoal/5 dark:bg-brand-cream/5 text-brand-charcoal dark:text-brand-cream hover:bg-brand-gold hover:text-brand-charcoal transition-all cursor-pointer z-20"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col space-y-6 pt-4">
                  <div>
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-brand-gold block mb-2">
                      Project Description
                    </span>
                    <p className="font-sans text-sm text-brand-charcoal/80 dark:text-brand-cream/80 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-6">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-brand-gold block mb-3 flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>Client Testimonial</span>
                    </span>
                    <blockquote className="font-sans text-xs italic text-brand-charcoal/70 dark:text-brand-cream/70 bg-brand-charcoal/5 dark:bg-brand-cream/5 p-4 rounded-lg border-l-2 border-brand-gold leading-relaxed">
                      &quot;{selectedProject.testimonial}&quot;
                    </blockquote>
                    <span className="text-[10px] font-sans font-bold text-brand-charcoal/60 dark:text-brand-cream/60 block mt-2.5 ml-4">
                      — {selectedProject.client}
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-brand-charcoal/10 dark:border-brand-cream/10 flex justify-between items-center text-xs font-sans text-brand-charcoal/50 dark:text-brand-cream/50">
                  <span>Owner: {selectedProject.client}</span>
                  <span>Guarantee: 10 Year Warranty</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 360 Fullscreen WebGL Viewer Drawer */}
      <AnimatePresence>
        {viewer360Open && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            {/* Header info bar - elevated z-index for absolute safety click overlays */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/90 to-transparent flex items-center justify-between px-6 z-40 text-white font-sans">
              <div className="flex flex-col">
                <span className="text-[9px] tracking-widest text-brand-gold font-bold uppercase">
                  Mane Mithra Virtual Reality Sandbox
                </span>
                <span className="text-sm font-semibold tracking-wide">
                  360° Tour: {selectedProject.title}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setViewer360Open(false)}
                  className="bg-brand-gold/20 text-brand-gold px-4 py-2 rounded-full border border-brand-gold/40 hover:bg-brand-gold hover:text-brand-charcoal font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center space-x-1.5 cursor-pointer z-50"
                >
                  <X className="w-4 h-4" />
                  <span>Exit 360</span>
                </button>
              </div>
            </div>

            {/* Fullscreen 3D Canvas */}
            <div className="w-full h-full cursor-move">
              <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 0.1]} fov={60} />
                <Room360Scene colorTheme={selectedProject.colorTheme} />
                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  maxDistance={3}
                  minDistance={0.05}
                  rotateSpeed={-0.5} // Reverse drag rotate to feel natural from inside the sphere
                  enableDamping={true}
                />
              </Canvas>
            </div>

            {/* Footer details guide */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/70 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md text-xs font-sans text-gray-300 pointer-events-none flex items-center space-x-2 z-40">
              <Expand className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Left-Click + Drag mouse in any direction to look 360° around | Press ESC to Exit</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
