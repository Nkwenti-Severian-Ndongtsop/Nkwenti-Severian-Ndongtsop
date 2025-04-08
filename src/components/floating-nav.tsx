"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useScroll } from "framer-motion";

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling down a bit
      if (scrollY.get() > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine active section
      const sections = ["home", "about", "skills", "projects", "testimonials", "contact"];

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const unsubscribe = scrollY.onChange(handleScroll);
    return () => unsubscribe();
  }, [scrollY]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        >
          <nav className="bg-background/80 backdrop-blur-md rounded-full border border-primary/10 shadow-lg px-6 py-3">
            <ul className="flex space-x-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative ${
                      activeSection === item.href.substring(1)
                        ? "text-white"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {activeSection === item.href.substring(1) && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
