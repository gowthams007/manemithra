"use client";

import { motion } from "framer-motion";
import { Quote, Star, MapPin } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";

// Floating Gold Particle Background for Testimonials Section
function GoldDustParticles() {
  const ref = useRef<THREE.Points>(null);
  
  // Create random array of coordinates for particles
  const [positions] = useState(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#D4AF37"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export default function Testimonials3D() {
  const reviews = [
    {
      name: "Vikram & Shalini",
      location: "Sobha Ananta, Bangalore",
      rating: 5,
      text: "Mane Mithra made our modular kitchen and living room experience stress-free. The real-time configurator helped us visualize color profiles, and the final handover matched the renders to the millimeter!",
      imageTheme: "bg-brand-wood/20",
    },
    {
      name: "Nikhil Kamath",
      location: "Prestige Lakeside, Bangalore",
      rating: 5,
      text: "As an architect myself, I had extremely rigorous quality standards. The execution tolerances on their custom wardrobes and veneer headboards are phenomenal. E1 class plywood is a major win.",
      imageTheme: "bg-brand-gold/20",
    },
    {
      name: "Meera Krishnan",
      location: "Duplex Villa, Indiranagar",
      rating: 5,
      text: "We wanted a classic duplex layout with dramatic lighting profiles. Mane Mithra delivered high-end Italian panels and golden fixtures. Our guests are absolutely wowed. Simply world-class!",
      imageTheme: "bg-brand-charcoal/20",
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-[#F9F7F4] dark:bg-brand-charcoal text-brand-charcoal dark:text-brand-cream relative overflow-hidden transition-colors duration-300">
      
      {/* 3D Gold Dust Background Canvas */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-40">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <GoldDustParticles />
        </Canvas>
      </div>

      {/* Luxury radial vignette overlay */}
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center, transparent 45%, #F9F7F4 100%) dark:bg-radial-gradient(circle_at_center, transparent 45%, #111827 100%) pointer-events-none z-0 opacity-60 dark:opacity-100" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-brand-wood dark:text-brand-gold text-xs tracking-[0.3em] font-semibold uppercase block mb-3 animate-pulse-slow">
            Client Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-brand-charcoal dark:text-brand-cream">
            Trusted by Bangalore Homemakers
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-charcoal/60 dark:text-brand-cream/60 mt-4 max-w-xl mx-auto">
            Read stories of how we partnered with homeowners to transform raw structural grids into warm, beautiful, livable homes.
          </p>
        </div>

        {/* Floating Testimonial Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? 1 : -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative p-8 rounded-2xl bg-white dark:bg-brand-darkgray/80 border border-brand-charcoal/5 dark:border-brand-cream/5 flex flex-col justify-between h-[360px] shadow-2xl group hover:border-brand-gold/40 transition-all duration-300"
            >
              
              {/* Top Details */}
              <div className="flex flex-col space-y-4">
                
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-brand-gold/10 rounded-lg text-brand-gold">
                    <Quote className="w-5 h-5" />
                  </div>
                  
                  <div className="flex space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote text */}
                <p className="font-sans text-xs md:text-sm leading-relaxed text-brand-charcoal/80 dark:text-brand-cream/80">
                  &quot;{rev.text}&quot;
                </p>

              </div>

              {/* Bottom Client Details */}
              <div className="flex items-center space-x-4 border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-5">
                
                {/* Client Mock Image Avatar initials */}
                <div className={`w-12 h-12 rounded-full ${rev.imageTheme} flex items-center justify-center font-serif text-brand-gold font-bold text-sm border border-brand-gold/30 shadow-md shrink-0`}>
                  {rev.name.split(" ")[0][0]}
                  {rev.name.includes("&") ? rev.name.split("&")[1].trim()[0] : rev.name.split(" ")[1] ? rev.name.split(" ")[1][0] : ""}
                </div>

                <div className="flex flex-col">
                  <span className="font-serif text-sm font-semibold text-brand-charcoal dark:text-brand-cream">
                    {rev.name}
                  </span>
                  <span className="font-sans text-[10px] tracking-wider text-brand-gold uppercase font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{rev.location}</span>
                  </span>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
