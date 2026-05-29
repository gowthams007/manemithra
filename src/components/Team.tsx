"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ShieldCheck, Sparkles, Box, Milestone } from "lucide-react";
import React, { useRef } from "react";

// Holographic 3D card
function HolographicMemberCard({
  name,
  role,
  philosophy,
  exp,
  avatarInitials,
  icon: Icon,
  index,
}: {
  name: string;
  role: string;
  philosophy: string;
  exp: string;
  avatarInitials: string;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);

  // Holographic reflection position transform mapping
  const glossX = useTransform(x, [-100, 100], ["0%", "100%"]);
  const glossY = useTransform(y, [-100, 100], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
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
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative flex flex-col justify-between p-8 rounded-2xl bg-brand-cream/80 dark:bg-brand-darkgray/80 backdrop-blur-md border border-brand-charcoal/10 dark:border-brand-cream/10 hover:border-brand-gold/60 dark:hover:border-brand-gold/60 cursor-pointer shadow-2xl h-[380px] group overflow-hidden"
    >
      
      {/* Holographic Shimmer reflection overlay */}
      <motion.div
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(212,175,55,0.1) 40%, rgba(255,255,255,0.2) 50%, rgba(212,175,55,0.1) 60%, rgba(255,255,255,0) 100%)",
          left: glossX,
          top: glossY,
          transform: "translate(-50%, -50%)",
        }}
        className="absolute w-[200%] h-[200%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-color-dodge blur-[2px]"
      />

      {/* Holographic grid blueprint shift */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Details */}
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col space-y-4">
        
        {/* Avatar initial ring & Icon tag */}
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-full border-2 border-brand-wood dark:border-brand-gold flex items-center justify-center font-serif text-brand-wood dark:text-brand-gold font-bold text-lg shadow-inner">
            {avatarInitials}
          </div>
          
          <div className="p-2.5 rounded-full bg-brand-charcoal/5 dark:bg-brand-cream/5 text-brand-wood dark:text-brand-gold">
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <div>
          <h3 className="font-serif text-2xl font-bold text-brand-charcoal dark:text-brand-cream">
            {name}
          </h3>
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-brand-gold block mt-1">
            {role} • {exp}
          </span>
        </div>

        <p className="font-sans text-xs text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed italic border-l-2 border-brand-wood/30 dark:border-brand-gold/30 pl-4 py-1">
          &quot;{philosophy}&quot;
        </p>

      </div>

      {/* Bottom details revealed on Hover */}
      <div
        style={{ transform: "translateZ(15px)" }}
        className="mt-6 pt-5 border-t border-brand-charcoal/10 dark:border-brand-cream/10 flex items-center justify-between text-xs font-sans text-brand-charcoal/70 dark:text-brand-cream/70"
      >
        <span className="font-semibold text-brand-wood dark:text-brand-gold">Signature Quality</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[10px] tracking-wider uppercase font-bold text-brand-charcoal dark:text-brand-cream">
          Verify Cert
        </span>
      </div>

    </motion.div>
  );
}

export default function Team() {
  const members = [
    {
      name: "Siddharth Gowda",
      role: "Principal Architect",
      philosophy: "Architecture is not just about placing lines on paper, it's about choreographing light, circulation, and modern human lifestyle.",
      exp: "12+ Years Exp",
      avatarInitials: "SG",
      icon: Sparkles,
    },
    {
      name: "Rhea Sen",
      role: "Lead Modular Planner",
      philosophy: "A kitchen is the heart of a home. It should possess high-grade structural mechanics and feel completely elegant in its clean lines.",
      exp: "8+ Years Exp",
      avatarInitials: "RS",
      icon: Box,
    },
    {
      name: "Karan Hegde",
      role: "Execution Specialist",
      philosophy: "We operate on tolerances of under a millimeter. Execution quality is what separates standard projects from premium architecture.",
      exp: "10+ Years Exp",
      avatarInitials: "KH",
      icon: Milestone,
    },
  ];

  return (
    <section id="team" className="py-20 md:py-32 bg-[#F9F7F4] dark:bg-brand-charcoal transition-colors duration-300 relative overflow-hidden">
      
      {/* Background graphic elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-wood/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-brand-wood dark:text-brand-gold text-xs tracking-[0.3em] font-semibold uppercase block mb-3">
            Design Studio Creators
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-brand-charcoal dark:text-brand-cream">
            Our Master Minds
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-charcoal/60 dark:text-brand-cream/60 mt-4 max-w-xl mx-auto">
            Meet the architects, modular kitchen craftsmen, and high-tolerance project execution engineers that drive the Mane Mithra premium standard.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <HolographicMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              philosophy={member.philosophy}
              exp={member.exp}
              avatarInitials={member.avatarInitials}
              icon={member.icon}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
