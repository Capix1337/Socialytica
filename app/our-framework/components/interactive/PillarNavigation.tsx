'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  section: string;
}

const navItems: NavItem[] = [
  { id: 'values', label: 'Values & Goals', section: 'values-section' },
  { id: 'sexuality', label: 'Sexuality', section: 'sexuality-section' },
  { id: 'communication', label: 'Communication', section: 'communication-section' },
  { id: 'trust', label: 'Trust & Loyalty', section: 'trust-section' },
];

const PillarNavigation = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  // Handle scroll and intersection observation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-2xl rounded-full bg-background/80 p-2 backdrop-blur-sm border border-border shadow-lg">
      <ul className="flex justify-between space-x-1">
        {navItems.map((item) => (
          <motion.li key={item.id} className="flex-1">
            <button
              onClick={() => scrollToSection(item.section)}
              className={`w-full rounded-full px-3 py-2 text-sm font-medium transition-all
                ${
                  activeSection === item.section
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground'
                }`}
            >
              {item.label}
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default PillarNavigation;