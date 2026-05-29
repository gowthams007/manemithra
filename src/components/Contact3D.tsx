"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, User, ShieldAlert, BadgeDollarSign } from "lucide-react";
import * as THREE from "three";

// 3D glowing structural house
function GlowingHouseScene({ activeZone }: { activeZone: string }) {
  const houseRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (houseRef.current) {
      // Gentle spin
      houseRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.15;
    }
  });

  return (
    <group ref={houseRef} position={[0, -0.4, 0]}>
      {/* Foundation Slab */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[4.4, 3.4]} />
        <meshStandardMaterial color="#374151" roughness={0.9} />
      </mesh>
      
      {/* 3D Wireframe outline of the house */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(4.2, 2.4, 3.2)]} />
        <lineBasicMaterial attach="material" color="#8B5E3C" linewidth={2} />
      </lineSegments>

      {/* Internal partition wall dividing left/right ground zones */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.04, 1.2, 3.18]} />
        <meshStandardMaterial color="#4B5563" transparent opacity={0.3} />
      </mesh>

      {/* Ceiling dividing ground floor and upper floor */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[4.18, 0.04, 3.18]} />
        <meshStandardMaterial color="#4B5563" transparent opacity={0.3} />
      </mesh>

      {/* 1. Living Room Zone (Left Ground Floor) */}
      <group position={[-1.0, 0, 0]}>
        {/* Sofa shape */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.2, 0.3, 0.6]} />
          <meshStandardMaterial color="#1F2937" roughness={0.8} />
        </mesh>
        
        {/* Glow light inside Living Room */}
        <pointLight
          position={[0, 0.8, 0]}
          color="#FFF7E6"
          intensity={activeZone === "living" ? 3.0 : 0.2}
          distance={4}
        />
        {/* Glowing bulb sphere indicators */}
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={activeZone === "living" ? "#D4AF37" : "#4B5563"} />
        </mesh>
      </group>

      {/* 2. Kitchen Zone (Right Ground Floor) */}
      <group position={[1.0, 0, 0]}>
        {/* Counter shape */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.4, 0.7, 1.2]} />
          <meshStandardMaterial color="#1F2937" roughness={0.8} />
        </mesh>
        
        {/* Glow light inside Kitchen */}
        <pointLight
          position={[0, 0.8, 0]}
          color="#E0F2FE"
          intensity={activeZone === "kitchen" ? 3.0 : 0.2}
          distance={4}
        />
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={activeZone === "kitchen" ? "#88B8C8" : "#4B5563"} />
        </mesh>
      </group>

      {/* 3. Bedroom Zone (Upper Floor) */}
      <group position={[0, 1.2, 0]}>
        {/* Bed shape */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.5, 0.3, 1.3]} />
          <meshStandardMaterial color="#111827" roughness={0.8} />
        </mesh>
        
        {/* Glow light inside Bedroom */}
        <pointLight
          position={[0, 0.8, 0]}
          color="#FDBA74"
          intensity={activeZone === "bedroom" ? 3.0 : 0.2}
          distance={4}
        />
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={activeZone === "bedroom" ? "#FDBA74" : "#4B5563"} />
        </mesh>
      </group>

      <ambientLight intensity={0.5} />
    </group>
  );
}

export default function Contact3D() {
  const [activeZone, setActiveZone] = useState("default");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "living",
    budgetRange: "8-12L",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        projectType: "living",
        budgetRange: "8-12L",
        message: "",
      });
      setActiveZone("default");
    }, 3000);
  };

  // Map project types to active 3D house zones
  const handleProjectTypeChange = (type: string) => {
    setFormData({ ...formData, projectType: type });
    if (type === "living" || type === "renovation") {
      setActiveZone("living");
    } else if (type === "kitchen") {
      setActiveZone("kitchen");
    } else if (type === "bedroom" || type === "villa") {
      setActiveZone("bedroom");
    } else {
      setActiveZone("default");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-brand-charcoal text-brand-cream relative overflow-hidden">
      
      {/* Backdrop glowing graphic */}
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-brand-wood/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-brand-gold text-xs tracking-[0.3em] font-semibold uppercase block mb-3 animate-pulse-slow">
            Secure Consultation
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-brand-cream">
            Let&apos;s Design Your Dream Space
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-cream/60 mt-4 max-w-xl mx-auto">
            Get in touch with Mane Mithra today. Fill out our luxury intake form and watch the architectural house zones glow as you select project types.
          </p>
        </div>

        {/* Form and 3D Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Intake Contact Form (Left 7 Columns) */}
          <div className="lg:col-span-7 bg-brand-darkgray/65 p-8 md:p-12 rounded-2xl border border-brand-cream/5 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Dynamic visual indicator */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="font-sans text-[10px] tracking-wider uppercase font-semibold text-brand-cream/60 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setActiveZone("living")}
                    className="w-full bg-brand-charcoal border border-brand-cream/10 rounded px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-gold transition-colors duration-200"
                    placeholder="e.g. Gowtham S"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phone" className="font-sans text-[10px] tracking-wider uppercase font-semibold text-brand-cream/60 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Contact Number *</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onFocus={() => setActiveZone("kitchen")}
                    className="w-full bg-brand-charcoal border border-brand-cream/10 rounded px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-gold transition-colors duration-200"
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>

              </div>

              {/* Row 2: Email & Project Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Email */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="font-sans text-[10px] tracking-wider uppercase font-semibold text-brand-cream/60 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setActiveZone("bedroom")}
                    className="w-full bg-brand-charcoal border border-brand-cream/10 rounded px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-gold transition-colors duration-200"
                    placeholder="e.g. user@example.com"
                  />
                </div>

                {/* Project Type */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="projectType" className="font-sans text-[10px] tracking-wider uppercase font-semibold text-brand-cream/60 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Project Requirement *</span>
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => handleProjectTypeChange(e.target.value)}
                    className="w-full bg-brand-charcoal border border-brand-cream/10 rounded px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-gold cursor-pointer transition-colors duration-200"
                  >
                    <option value="living">Living Room Design</option>
                    <option value="kitchen">Modular Kitchen</option>
                    <option value="bedroom">Bedroom Wardrobes</option>
                    <option value="villa">Duplex Villa Interior</option>
                    <option value="renovation">Civil Renovation</option>
                  </select>
                </div>

              </div>

              {/* Row 3: Budget Range & Message */}
              <div className="grid grid-cols-1 gap-6">
                
                {/* Budget Selection */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="budgetRange" className="font-sans text-[10px] tracking-wider uppercase font-semibold text-brand-cream/60 flex items-center gap-1.5">
                    <BadgeDollarSign className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Investment Budget Range *</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["5-8 Lakhs", "8-15 Lakhs", "15+ Lakhs"].map((bRange) => (
                      <button
                        key={bRange}
                        type="button"
                        onClick={() => setFormData({ ...formData, budgetRange: bRange })}
                        className={`py-3 px-2 rounded font-sans text-[10px] tracking-widest font-bold uppercase transition-all duration-300 border cursor-pointer ${
                          formData.budgetRange === bRange
                            ? "bg-brand-wood text-brand-cream border-transparent shadow-md"
                            : "bg-transparent text-brand-cream/60 border-brand-cream/10 hover:border-brand-gold hover:text-brand-cream"
                        }`}
                      >
                        {bRange}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="message" className="font-sans text-[10px] tracking-wider uppercase font-semibold text-brand-cream/60">
                    Additional details or questions
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-brand-charcoal border border-brand-cream/10 rounded px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-gold transition-colors duration-200 resize-none"
                    placeholder="Describe your design vision..."
                  />
                </div>

              </div>

              {/* Submission confirmation banner */}
              {submitted ? (
                <div className="py-4 bg-brand-wood/20 border border-brand-wood text-brand-gold text-center rounded font-sans text-xs tracking-wider uppercase font-bold animate-pulse">
                  ✓ Consultation Booked! We will call you in 2 hours.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-wood to-brand-gold hover:from-brand-gold hover:to-brand-wood text-brand-cream py-4 rounded font-sans text-xs tracking-widest font-bold uppercase shadow-xl hover:scale-102 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Let&apos;s Design Your Dream Space</span>
                </button>
              )}

            </form>

          </div>

          {/* Interactive 3D Glow House Viewport (Right 5 Columns) */}
          <div className="lg:col-span-5 relative h-[380px] lg:h-auto bg-brand-darkgray/40 rounded-2xl border border-brand-cream/5 shadow-2xl overflow-hidden flex flex-col justify-between p-6">
            
            {/* 3D Canvas */}
            <div className="w-full h-[80%] cursor-grab active:cursor-grabbing">
              <Canvas shadows>
                <PerspectiveCamera makeDefault position={[3, 2.5, 4.5]} fov={35} />
                <GlowingHouseScene activeZone={formData.projectType} />
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 - 0.1} />
              </Canvas>
            </div>

            {/* Guide overlay */}
            <div className="border-t border-brand-cream/5 pt-4">
              <span className="font-serif text-sm font-semibold block mb-1">
                Glowing Blueprint House
              </span>
              <p className="font-sans text-[11px] text-brand-cream/50 leading-relaxed">
                As you type and switch requirement fields in the consultation form, the corresponding structural zones (Living, Kitchen, Bedroom) glow in real-time. Left-click and drag the house structure to rotate.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
