"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Home, ChefHat, Bed, Sofa, Grid3X3, Layers, Briefcase, RefreshCw, Milestone, ArrowRight } from "lucide-react";
import React, { useRef } from "react";

// Interactive 3D tilt card
function ServiceCard({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform coordinates into degrees of rotation
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="relative flex flex-col justify-between p-8 rounded-xl glass-panel border border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-gold/60 dark:hover:border-brand-gold/60 cursor-pointer shadow-xl transition-shadow hover:shadow-2xl h-[280px] group overflow-hidden"
    >
      {/* Glow highlight behind card */}
      <div className="absolute -inset-px bg-gradient-to-br from-transparent via-brand-gold/0 to-brand-gold/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Decorative metal corner line */}
      <div className="absolute top-0 left-0 w-8 h-[1px] bg-brand-gold/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      <div className="absolute top-0 left-0 w-[1px] h-8 bg-brand-gold/40 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />

      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col space-y-4">
        {/* Icon wrapper */}
        <div className="w-12 h-12 rounded-lg bg-brand-wood/10 dark:bg-brand-gold/15 flex items-center justify-center text-brand-wood dark:text-brand-gold group-hover:scale-110 group-hover:bg-brand-wood group-hover:text-brand-cream dark:group-hover:bg-brand-gold dark:group-hover:text-brand-charcoal transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>

        <h3 className="font-serif text-xl font-bold text-brand-charcoal dark:text-brand-cream tracking-wide">
          {title}
        </h3>
        
        <div className="h-16 overflow-hidden">
          <p className="font-sans text-xs text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div style={{ transform: "translateZ(20px)" }} className="flex items-center space-x-2 text-xs font-sans text-brand-wood dark:text-brand-gold font-bold uppercase tracking-wider group-hover:text-brand-charcoal dark:group-hover:text-brand-cream transition-colors duration-300">
        <span>Learn More</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform duration-300" />
      </div>
    </motion.div>
  );
}

export default function Services() {
  const services = [
    {
      title: "Residential Interiors",
      description: "Full-home custom architectural makeovers tailored to optimize space and elevate your standard of living.",
      icon: Home,
    },
    {
      title: "Modular Kitchens",
      description: "Smart kitchens featuring high-end water-resistant materials, German fixtures, and parallel layouts.",
      icon: ChefHat,
    },
    {
      title: "Bedroom Design",
      description: "Tranquil personal chambers outfitted with velvet headboards, bedside specs, and customized layout styling.",
      icon: Bed,
    },
    {
      title: "Living Room Design",
      description: "Stunning central lounges with stone TV credenzas, custom seating assemblies, and ambient illumination.",
      icon: Sofa,
    },
    {
      title: "False Ceiling & COB",
      description: "Elegant modern ceilings combining gypsum design borders, hidden profiles, and dynamic lighting panels.",
      icon: Grid3X3,
    },
    {
      title: "Wardrobes & Lofts",
      description: "Space-saving sliding storage arrays, walk-in closets, and glossy laminate drawer configurations.",
      icon: Layers,
    },
    {
      title: "Office Interiors",
      description: "Ergonomic, modern collaborative office layouts designed to maximize space and motivate team focus.",
      icon: Briefcase,
    },
    {
      title: "Renovation Services",
      description: "Civil restructuring, electrical rewiring, tiling refittings, and plumbing modernization audits.",
      icon: RefreshCw,
    },
    {
      title: "Turnkey Projects",
      description: "Hassle-free end-to-end design execution from initial concept visualizations to final clean handover.",
      icon: Milestone,
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-[#F9F7F4] dark:bg-brand-charcoal transition-colors duration-300 relative overflow-hidden">
      
      {/* Subtle details */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-brand-wood/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-brand-wood dark:text-brand-gold text-xs tracking-[0.3em] font-semibold uppercase block mb-3">
            Bespoke Services
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-brand-charcoal dark:text-brand-cream">
            What We Master
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-charcoal/60 dark:text-brand-cream/60 mt-4 max-w-xl mx-auto">
            From smart modular cabinetry to custom structural villa projects. We offer comprehensive interior design services crafted for luxury home transformations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
