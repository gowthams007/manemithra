"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Compass, ArrowDown } from "lucide-react";

// Dynamically import Three.js Canvas to avoid SSR issues
const ThreeHeroScene = dynamic(() => import("./ThreeHeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-brand-charcoal text-brand-gold font-serif text-lg tracking-widest uppercase">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <span>Entering Mane Mithra...</span>
      </div>
    </div>
  ),
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll of the window
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "10+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Design Experts" },
  ];

  return (
    <div id="home" className="relative w-full bg-brand-charcoal">
      {/* 3D Scroll Story viewport container */}
      <div ref={containerRef} className="relative h-[300vh] w-full">
        {/* 3D Scene fixed in background */}
        <div className="sticky top-0 left-0 w-full h-screen z-0 overflow-hidden">
          <ThreeHeroScene scroll={scrollProgress} />
          
          {/* Overlay Dark Vignette for luxury cinematic mood and readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-brand-charcoal/50 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center, transparent 30%, rgba(17, 24, 39, 0.4) 100%) pointer-events-none" />
        </div>

        {/* Floating Scroll Content Overlay */}
        
        {/* Section 1: Intro (Sofa Focus) */}
        <div className="absolute top-0 left-0 w-full h-screen flex items-center z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-brand-cream">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="max-w-3xl pointer-events-auto"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs tracking-[0.3em] font-semibold text-brand-gold uppercase mb-6">
                Mane Mithra Interiors
              </span>
              <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight tracking-wide mb-6">
                Transforming Houses <br />
                Into <span className="gold-gradient-text">Dream Homes</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-brand-cream/70 font-light leading-relaxed mb-8 max-w-xl">
                Premium Interior Design & Complete Home Solutions Crafted For Modern Living. Every detail tailored to your lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-wood to-brand-gold text-brand-cream px-8 py-4 rounded-md font-sans text-xs tracking-widest font-bold uppercase hover:scale-105 active:scale-95 shadow-xl transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Consultation</span>
                </a>
                <a
                  href="#portfolio"
                  className="flex items-center justify-center space-x-2 border border-brand-cream/20 bg-brand-cream/5 backdrop-blur-sm text-brand-cream px-8 py-4 rounded-md font-sans text-xs tracking-widest font-bold uppercase hover:bg-brand-cream hover:text-brand-charcoal transition-all duration-300"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Projects</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-brand-cream/50 pointer-events-auto">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-brand-gold">
              Scroll to Tour
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-brand-gold" />
            </motion.div>
          </div>
        </div>

        {/* Section 2: Kitchen Reveal (Scroll 0.3) */}
        <div className="absolute top-[100vh] left-0 w-full h-screen flex items-center z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-brand-cream flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-200px" }}
              transition={{ duration: 1.0 }}
              className="max-w-xl pointer-events-auto bg-brand-charcoal/40 backdrop-blur-md p-8 rounded-lg border border-brand-cream/5"
            >
              <span className="text-brand-gold text-xs tracking-[0.2em] font-bold uppercase mb-3 block">
                Modular Kitchens
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 tracking-wide">
                Culinary Elegance Redefined
              </h2>
              <p className="font-sans text-brand-cream/70 text-sm leading-relaxed mb-6">
                Step into a space where utility meets luxury. Our smart modular kitchens integrate world-class German mechanics, high-end marble counter slabs, and custom cabinet finishes, making every meal a masterpiece.
              </p>
              <a
                href="#services"
                className="text-xs text-brand-gold tracking-widest font-bold uppercase hover:text-brand-cream transition-colors flex items-center gap-2 group"
              >
                Learn More
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Section 3: Bedroom Reveal (Scroll 0.6) */}
        <div className="absolute top-[200vh] left-0 w-full h-screen flex items-center z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-brand-cream">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-200px" }}
              transition={{ duration: 1.0 }}
              className="max-w-xl pointer-events-auto bg-brand-charcoal/40 backdrop-blur-md p-8 rounded-lg border border-brand-cream/5"
            >
              <span className="text-brand-gold text-xs tracking-[0.2em] font-bold uppercase mb-3 block">
                Bedrooms & Living
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 tracking-wide">
                Symphony of Solitude
              </h2>
              <p className="font-sans text-brand-cream/70 text-sm leading-relaxed mb-6">
                Create a personalized sanctuary designed to offer ultimate rest and tranquility. With customized velvet headboards, integrated warm lighting systems, and sleek space-saving wardrobe architectures.
              </p>
              <a
                href="#services"
                className="text-xs text-brand-gold tracking-widest font-bold uppercase hover:text-brand-cream transition-colors flex items-center gap-2 group"
              >
                Explore Bedrooms
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sibling statistics container — flows naturally below scroll stack */}
      <div className="relative w-full bg-[#F9F7F4] dark:bg-brand-charcoal py-20 z-20 border-t border-brand-charcoal/5 dark:border-brand-cream/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-brand-cream dark:bg-brand-darkgray/80 backdrop-blur-md p-8 md:p-12 rounded-xl border border-brand-charcoal/5 dark:border-brand-cream/5 shadow-2xl">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-brand-wood dark:text-brand-gold mb-2">
                  {stat.value}
                </div>
                <div className="font-sans text-xs md:text-sm tracking-widest uppercase text-brand-charcoal/70 dark:text-brand-cream/70 font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
