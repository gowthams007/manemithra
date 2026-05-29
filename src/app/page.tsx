"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import WhyChooseUs from "@/components/WhyChooseUs";
import Team from "@/components/Team";

// Dynamically import WebGL 3D heavy components for flawless SSR & fast initial loads
const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => <div className="h-screen bg-brand-charcoal" />,
});

const ScrollStory = dynamic(() => import("@/components/ScrollStory"), {
  ssr: false,
  loading: () => <div className="h-screen bg-brand-cream dark:bg-brand-charcoal" />,
});

const FloorPlan3D = dynamic(() => import("@/components/FloorPlan3D"), {
  ssr: false,
  loading: () => <div className="h-[70vh] bg-brand-cream dark:bg-brand-charcoal" />,
});

const DesignConfigurator3D = dynamic(() => import("@/components/DesignConfigurator3D"), {
  ssr: false,
  loading: () => <div className="h-[70vh] bg-brand-charcoal" />,
});

const Portfolio = dynamic(() => import("@/components/Portfolio"), {
  ssr: false,
  loading: () => <div className="h-screen bg-brand-cream dark:bg-brand-charcoal" />,
});

const Testimonials3D = dynamic(() => import("@/components/Testimonials3D"), {
  ssr: false,
  loading: () => <div className="h-[60vh] bg-brand-charcoal" />,
});

const Contact3D = dynamic(() => import("@/components/Contact3D"), {
  ssr: false,
  loading: () => <div className="h-screen bg-brand-charcoal" />,
});

export default function Home() {
  return (
    <SmoothScroll>
      {/* Navigation header with theme support */}
      <Navbar />

      {/* Main page sections */}
      <main className="flex flex-col min-h-screen">
        {/* Full-screen interactive 3D Hero Tour */}
        <Hero />

        {/* Scroll Story: Room Transformation blueprint drop-ins */}
        <ScrollStory />

        {/* Dynamic Architectural Floor Plan customizer */}
        <FloorPlan3D />

        {/* Interactive Before vs After slider transformation */}
        <BeforeAfter />

        {/* Interactive Services grid */}
        <Services />

        {/* Portfolio Showcase + 360 Fullscreen WebGL Viewers */}
        <Portfolio />

        {/* 3D Configurator lounge budget estimator */}
        <DesignConfigurator3D />

        {/* Detailed six-step execution workflow timeline */}
        <WhyChooseUs />

        {/* Floating Testimonials with 3D R3F Gold particle stars background */}
        <Testimonials3D />

        {/* 3D Holographic Card skewed Team Grid */}
        <Team />

        {/* Consultation form with Glowing 3D blueprint House mapping */}
        <Contact3D />
      </main>

      {/* Luxury detailed Footer layout */}
      <Footer />
    </SmoothScroll>
  );
}
