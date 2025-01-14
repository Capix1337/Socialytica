// app/our-framework/components/interactive/PillarNavigation.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  section: string;
}

interface PillarNavigationProps {
  activeSection?: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Overview', section: 'hero' },
  { id: 'theory', label: 'Theory', section: 'theory' },
  { id: 'pillars', label: 'Pillars', section: 'pillars' },
  { id: 'thresholds', label: 'Analysis', section: 'thresholds' },
  { id: 'synergy', label: 'Synergy', section: 'synergy' },
];

const PillarNavigation: React.FC<PillarNavigationProps> = ({ activeSection = 'hero' }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-2xl">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-full bg-background/80 p-2 backdrop-blur-sm border border-border shadow-lg"
      >
        <ul className="flex items-center justify-between px-2">
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => scrollToSection(item.section)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors
                  ${
                    activeSection === item.section
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.label}
                {activeSection === item.section && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};

export default PillarNavigation;