"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const progress = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(progress);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  return (
    <section className="py-20 md:py-32 bg-[#F9F7F4] dark:bg-brand-charcoal transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-brand-wood dark:text-brand-gold text-xs tracking-[0.3em] font-semibold uppercase block mb-3">
            Real Transformations
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-brand-charcoal dark:text-brand-cream">
            Before vs After Transformation
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-charcoal/60 dark:text-brand-cream/60 mt-4 max-w-xl mx-auto">
            Drag the gold slider below to reveal how our designers transform cold, empty spaces into warm, bespoke luxury environments.
          </p>
        </div>

        {/* Beautiful Top Legend to completely eliminate split-line overlaps */}
        <div className="flex items-center justify-between mb-6 font-sans text-xs tracking-[0.2em] font-bold uppercase select-none">
          <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-neutral-600 rounded-full border border-white/10" />
            Before: Raw Empty Space
          </span>
          <span className="text-brand-wood dark:text-brand-gold flex items-center gap-2">
            After: Mane Mithra Living
            <span className="w-2.5 h-2.5 bg-brand-wood dark:bg-brand-gold rounded-full" />
          </span>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[40vh] md:h-[70vh] rounded-2xl overflow-hidden border border-brand-charcoal/10 dark:border-brand-cream/10 shadow-2xl cursor-ew-resize select-none touch-none"
        >
          
          {/* 1. BEFORE Panel (Left Layer - Empty / Brick House) */}
          <div className="absolute inset-0 w-full h-full bg-neutral-900">
            {/* Architectural Blueprint / Brick wireframe layout */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            
            {/* Symmetrical Left Text Card */}
            <div className="absolute top-[8%] left-[6%] max-w-[40%] hidden md:flex flex-col justify-start text-left text-zinc-400">
              <h4 className="font-serif text-xl md:text-3xl text-zinc-100 font-bold mb-3">
                Cold, Raw & Unoptimized
              </h4>
              <p className="font-sans text-[11px] md:text-xs leading-relaxed text-zinc-500">
                Unfinished structural foundations, poor space distribution, basic concrete flooring, and zero insulation or styling. An uninspiring slate.
              </p>
            </div>

            {/* Graphic mockup details representing "Empty" room */}
            <div className="absolute bottom-[8%] left-[6%] w-[250px] md:w-[320px] hidden md:flex p-6 rounded-xl border border-zinc-800 border-dashed flex flex-col space-y-2">
              <span className="font-sans text-[10px] tracking-widest text-zinc-600 uppercase font-bold">
                Structure Status
              </span>
              <p className="font-serif text-xs font-semibold text-zinc-500">
                Awaiting Furniture, Styling & Wardrobes Layout
              </p>
              <div className="w-full h-1 bg-zinc-800 rounded-full" />
            </div>
          </div>

          {/* 2. AFTER Panel (Right Layer - Luxury Designed Room) */}
          <div
            className="absolute inset-0 bg-brand-charcoal overflow-hidden"
            style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
          >
            {/* Rich wood gradient back panel */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-brand-darkgray to-brand-wood/10" />
            
            {/* Symmetrical Right Text Card - Top Stacked to avoid card overlaps */}
            <div className="absolute top-[8%] right-[6%] max-w-[40%] hidden md:flex flex-col text-right items-end text-brand-cream/80">
              <h4 className="font-serif text-xl md:text-3xl text-brand-cream font-bold mb-3 gold-gradient-text">
                Bespoke Architectural Luxury
              </h4>
              <p className="font-sans text-[11px] md:text-xs leading-relaxed text-brand-cream/60">
                Transformed using high-grade walnut wood wall panelling, custom Italian bouclé designer sofas, automated ambient golden pendant lights, and customized area rugs.
              </p>
            </div>

            {/* Styled Furniture Vector representation - Bottom Stacked */}
            <div className="absolute bottom-[8%] right-[6%] w-[250px] md:w-[320px] hidden md:flex p-6 rounded-xl glass-panel border border-brand-cream/10 shadow-2xl flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] tracking-wider text-brand-gold uppercase font-bold">
                  Furnishing: Selected
                </span>
                <span className="font-mono text-xs text-brand-gold">$12,400</span>
              </div>
              <p className="font-serif text-xs md:text-sm font-semibold text-brand-cream leading-tight">
                Custom Italian Velvet Sofa Suite & Oak Slab Table
              </p>
              <div className="w-full h-1 bg-brand-gold rounded-full animate-pulse-slow" />
            </div>

            {/* Glowing gold floor lamp in background */}
            <div className="absolute top-[10%] left-[45%] w-6 h-6 rounded-full bg-brand-gold blur-lg opacity-40 animate-pulse-slow" />
          </div>

          {/* 3. Slider Handle (Glass Line with Gold Icon) */}
          <div
            className="absolute top-0 bottom-0 w-[4px] bg-brand-gold cursor-ew-resize z-20 shadow-2xl"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel border-2 border-brand-gold shadow-2xl flex items-center justify-center active:scale-90 transition-transform duration-150">
              <MoveHorizontal className="w-5 h-5 text-brand-gold" />
            </div>
          </div>

        </div>

        {/* Dynamic statistics beneath */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
          <div className="p-6 bg-brand-cream dark:bg-brand-darkgray rounded-xl border border-brand-charcoal/5 dark:border-brand-cream/5 shadow-md">
            <h4 className="font-serif text-lg font-bold text-brand-wood dark:text-brand-gold mb-1">
              Space Optimization
            </h4>
            <p className="font-sans text-xs text-brand-charcoal/60 dark:text-brand-cream/60">
              +40% usable square footage through custom smart spatial planning.
            </p>
          </div>
          <div className="p-6 bg-brand-cream dark:bg-brand-darkgray rounded-xl border border-brand-charcoal/5 dark:border-brand-cream/5 shadow-md">
            <h4 className="font-serif text-lg font-bold text-brand-wood dark:text-brand-gold mb-1">
              Material Standards
            </h4>
            <p className="font-sans text-xs text-brand-charcoal/60 dark:text-brand-cream/60">
              E1 grade marine plywood with anti-termite and fire-retardant credentials.
            </p>
          </div>
          <div className="p-6 bg-brand-cream dark:bg-brand-darkgray rounded-xl border border-brand-charcoal/5 dark:border-brand-cream/5 shadow-md">
            <h4 className="font-serif text-lg font-bold text-brand-wood dark:text-brand-gold mb-1">
              Asset Warranty
            </h4>
            <p className="font-sans text-xs text-brand-charcoal/60 dark:text-brand-cream/60">
              10-year hassle-free replacement warranty on all custom woodwork.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
