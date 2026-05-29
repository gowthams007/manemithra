"use client";

import { motion } from "framer-motion";
import { MessageSquareCode, Palette, FileSearch, BoxSelect, Hammer, KeyRound } from "lucide-react";

export default function WhyChooseUs() {
  const steps = [
    {
      title: "1. Consultation",
      subtitle: "Personalized Needs Audit",
      description: "Our principal designer meets you to map out spatial requirements, understand your lifestyle constraints, and establish design aesthetic goals.",
      icon: MessageSquareCode,
    },
    {
      title: "2. Design Planning",
      subtitle: "Bespoke Space Blueprints",
      description: "We translate discussions into layout diagrams and CAD floor drafts. Optimizing utility and establishing primary structural flow options.",
      icon: Palette,
    },
    {
      title: "3. 3D Visualization",
      subtitle: "Apple-Level Room Renders",
      description: "Step inside your home before construction. We build hyper-realistic 3D designs displaying exact material finishes, lights, and layout choices.",
      icon: FileSearch,
    },
    {
      title: "4. Material Selection",
      subtitle: "Ultra-Premium Finish Curation",
      description: "Join us at our design studio to touch and select materials. Formica laminates, marine plywoods, marble slabs, and custom fabrics.",
      icon: BoxSelect,
    },
    {
      title: "5. Execution",
      subtitle: "Precision Engineering",
      description: "Our in-house project managers, carpenters, and civil engineers execute the project with laser-guided mechanics and micro-tolerance assembly.",
      icon: Hammer,
    },
    {
      title: "6. Handover",
      subtitle: "Move-In Ready Clean Delivery",
      description: "We perform a 42-point quality inspect check. The space is deep-cleaned and we deliver the keys along with your 10-year replacement warranty certificate.",
      icon: KeyRound,
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-32 bg-brand-cream dark:bg-brand-charcoal transition-colors duration-300 relative overflow-hidden">
      
      {/* Dynamic graphic glow */}
      <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-24">
          <span className="text-brand-wood dark:text-brand-gold text-xs tracking-[0.3em] font-semibold uppercase block mb-3">
            Our Blueprint Process
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-brand-charcoal dark:text-brand-cream">
            The Signature Journey
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-charcoal/60 dark:text-brand-cream/60 mt-4 max-w-xl mx-auto">
            From your very first consult call to the day you unlock your dream home. Here is our systematic six-phase execution framework.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Center Line (glowing in gold) */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-wood via-brand-gold to-brand-wood opacity-30 md:-translate-x-1/2" />

          {/* Timeline Steps */}
          <div className="flex flex-col space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.title}
                  className={`flex flex-col md:flex-row items-start relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Timeline Center Dot containing Icon */}
                  <div className="absolute left-0 md:left-1/2 w-16 h-16 rounded-full glass-panel border-2 border-brand-gold flex items-center justify-center -translate-x-0 md:-translate-x-1/2 z-10 text-brand-wood dark:text-brand-gold shadow-lg hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-6 h-6 animate-pulse-slow" />
                  </div>

                  {/* Spacer Column for desktop balancing */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card (Left or Right depending on index) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full md:w-1/2 pl-24 md:pl-0 md:px-12"
                  >
                    <div className="bg-brand-cream dark:bg-brand-darkgray p-8 rounded-xl border border-brand-charcoal/5 dark:border-brand-cream/5 shadow-xl hover:shadow-2xl hover:border-brand-gold/40 transition-all duration-300">
                      
                      <span className="font-serif text-lg font-bold text-brand-wood dark:text-brand-gold block mb-1">
                        {step.title}
                      </span>
                      
                      <h4 className="font-serif text-xl font-bold text-brand-charcoal dark:text-brand-cream mb-3 tracking-wide">
                        {step.subtitle}
                      </h4>
                      
                      <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 dark:text-brand-cream/60 leading-relaxed">
                        {step.description}
                      </p>

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
