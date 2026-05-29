"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Home, Compass, Cpu, Briefcase, MessageSquare, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Synchronize theme with html class
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Monitor scroll for header styling & progress bar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Services", href: "#services", icon: Compass },
    { name: "3D Configurator", href: "#configurator", icon: Cpu },
    { name: "Portfolio", href: "#portfolio", icon: Briefcase },
    { name: "Why Us", href: "#why-us", icon: ShieldCheck },
    { name: "Contact", href: "#contact", icon: MessageSquare },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-brand-charcoal/10 dark:bg-brand-cream/10 z-[100]">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-wood via-brand-gold to-brand-wood"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-brand-cream/90 dark:bg-brand-charcoal/90 backdrop-blur-md shadow-lg border-b border-brand-charcoal/5 dark:border-brand-cream/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="group flex flex-col">
            <span className={`font-serif text-2xl md:text-3xl font-bold tracking-wider transition-colors duration-300 flex items-center gap-1 ${
              scrolled ? "text-brand-charcoal dark:text-brand-cream" : "text-brand-cream"
            }`}>
              MANE MITHRA
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold group-hover:scale-150 transition-transform duration-300" />
            </span>
            <span className={`font-sans text-[10px] md:text-xs tracking-[0.3em] font-medium uppercase ml-[3px] transition-colors duration-300 ${
              scrolled ? "text-brand-wood dark:text-brand-gold" : "text-brand-gold"
            }`}>
              Interior & Designer
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative text-sm tracking-widest font-sans uppercase font-medium transition-colors duration-300 py-2 group ${
                  scrolled
                    ? "text-brand-charcoal/70 dark:text-brand-cream/70 hover:text-brand-charcoal dark:hover:text-brand-cream"
                    : "text-brand-cream/80 hover:text-brand-gold"
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Buttons & Theme Toggle */}
          <div className="hidden sm:flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                scrolled
                  ? "bg-brand-charcoal/5 dark:bg-brand-cream/5 hover:bg-brand-gold/10 dark:hover:bg-brand-gold/10 text-brand-charcoal dark:text-brand-cream"
                  : "bg-white/10 hover:bg-white/20 text-brand-cream hover:text-brand-gold"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 hover:rotate-12 transition-transform duration-300" />
              ) : (
                <Sun className="w-5 h-5 text-brand-gold hover:rotate-45 transition-transform duration-300" />
              )}
            </button>

            {/* Book Free Consultation CTA */}
            <a
              href="#contact"
              className={`relative px-6 py-3 overflow-hidden rounded-md border font-sans text-xs tracking-widest font-semibold uppercase transition-all duration-300 group ${
                scrolled
                  ? "border-brand-wood dark:border-brand-gold text-brand-charcoal dark:text-brand-cream"
                  : "border-brand-cream text-brand-cream hover:border-brand-gold"
              }`}
            >
              <span className={`absolute inset-0 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 ${
                scrolled ? "bg-brand-wood dark:bg-brand-gold" : "bg-brand-gold"
              }`} />
              <span className={`relative z-10 transition-colors duration-300 ${
                scrolled
                  ? "group-hover:text-brand-cream dark:group-hover:text-brand-charcoal"
                  : "group-hover:text-brand-charcoal"
              }`}>
                Book Free Consultation
              </span>
            </a>
          </div>

          {/* Mobile Navigation Toggles */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-300 ${
                scrolled
                  ? "bg-brand-charcoal/5 dark:bg-brand-cream/5 text-brand-charcoal dark:text-brand-cream"
                  : "bg-white/10 text-brand-cream"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-brand-gold" />
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                scrolled
                  ? "bg-brand-charcoal/5 dark:bg-brand-cream/5 text-brand-charcoal dark:text-brand-cream"
                  : "bg-white/10 text-brand-cream"
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[70px] bg-brand-cream dark:bg-brand-charcoal z-40 lg:hidden overflow-y-auto"
          >
            <div className="px-8 py-12 flex flex-col space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-4 py-3 border-b border-brand-charcoal/10 dark:border-brand-cream/10 text-lg tracking-widest font-sans uppercase font-medium text-brand-charcoal dark:text-brand-cream hover:text-brand-gold transition-colors duration-300"
                >
                  <item.icon className="w-5 h-5 text-brand-wood dark:text-brand-gold" />
                  <span>{item.name}</span>
                </a>
              ))}
              
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 bg-brand-wood dark:bg-brand-gold text-brand-cream dark:text-brand-charcoal font-sans text-sm tracking-widest font-semibold uppercase rounded-md shadow-lg transition-transform active:scale-95 duration-200"
              >
                Book Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
