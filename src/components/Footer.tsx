"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Camera, Globe, Share2, Video, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Camera, href: "#", label: "Instagram" },
    { icon: Globe, href: "#", label: "Facebook" },
    { icon: Share2, href: "#", label: "LinkedIn" },
    { icon: Video, href: "#", label: "YouTube" },
  ];

  const quickLinks = [
    { name: "Services", href: "#services" },
    { name: "3D Configurator", href: "#configurator" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Our Process", href: "#why-us" },
  ];

  const services = [
    { name: "Residential Interiors", href: "#services" },
    { name: "Modular Kitchens", href: "#services" },
    { name: "Bedroom Design", href: "#services" },
    { name: "False Ceiling & Lighting", href: "#services" },
    { name: "Turnkey Design Solutions", href: "#services" },
  ];

  return (
    <footer className="relative bg-brand-charcoal text-brand-cream/80 border-t border-brand-cream/10 z-10">
      {/* Background graphic elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-wood/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand Info */}
          <div className="flex flex-col space-y-6">
            <a href="#home" className="group flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-wider text-brand-cream flex items-center gap-1">
                MANE MITHRA
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              </span>
              <span className="font-sans text-xs tracking-[0.3em] font-medium text-brand-gold uppercase ml-[3px]">
                Interior & Designer
              </span>
            </a>
            <p className="font-sans text-sm leading-relaxed text-brand-cream/60 max-w-sm">
              Mane Mithra, meaning &quot;Friend of Your Home,&quot; is Bangalore&apos;s leading premium interior design studio. We translate your architectural dreams into exquisite, highly-functional living spaces.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2.5 rounded-full bg-brand-cream/5 text-brand-cream hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-serif text-lg tracking-widest font-semibold text-brand-gold uppercase">
              Explore
            </h4>
            <ul className="flex flex-col space-y-3 font-sans text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-brand-gold transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-brand-gold" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-serif text-lg tracking-widest font-semibold text-brand-gold uppercase">
              Expertise
            </h4>
            <ul className="flex flex-col space-y-3 font-sans text-sm">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="hover:text-brand-gold transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-brand-gold" />
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-serif text-lg tracking-widest font-semibold text-brand-gold uppercase">
              Studio Location
            </h4>
            <ul className="flex flex-col space-y-4 font-sans text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span className="text-brand-cream/70 leading-relaxed">
                  #70/A, D Group Layout, Andrahalli, Bangalore, Karnataka - 560091
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-gold" />
                <a href="tel:+917829060952" className="text-brand-cream/70 hover:text-brand-gold transition-colors">
                  +91 78290 60952
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-gold" />
                <a href="mailto:design@manemithra.com" className="text-brand-cream/70 hover:text-brand-gold transition-colors">
                  design@manemithra.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Local Business Schema & Footer bottom */}
        <div className="mt-16 pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row items-center justify-between text-xs font-sans text-brand-cream/40 space-y-4 md:space-y-0">
          <p>
            &copy; {currentYear} Mane Mithra Interior & Designer. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>

      {/* Structured SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            "name": "Mane Mithra Interior & Designer",
            "image": "https://manemithra.com/images/og-hero.jpg",
            "@id": "https://manemithra.com/#business",
            "url": "https://manemithra.com",
            "telephone": "+917829060952",
            "priceRange": "$$$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "#70/A, D Group Layout, Andrahalli",
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "postalCode": "560091",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 12.9845,
              "longitude": 77.4952
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "09:00",
              "closes": "20:00"
            },
            "sameAs": [
              "https://www.instagram.com/manemithra",
              "https://www.facebook.com/manemithra",
              "https://www.linkedin.com/company/manemithra"
            ]
          })
        }}
      />
    </footer>
  );
}
