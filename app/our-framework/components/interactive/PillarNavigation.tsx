// app/our-framework/components/interactive/PillarNavigation.tsx

'use client';

import React, { useState } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);

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
    <motion.nav
      initial={{ x: -250 }}
      animate={{ x: isExpanded ? 0 : -200 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40"
    >
      <motion.div
        className="flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-r-lg shadow-lg p-4">
          <ul className="space-y-2 w-48">
            {navItems.map((item) => (
              <motion.li
                key={item.id}
                className="relative"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => scrollToSection(item.section)}
                  className={`relative w-full px-4 py-2 text-sm font-medium rounded-lg text-left transition-colors
                    ${
                      activeSection === item.section
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                >
                  {item.label}
                  {activeSection === item.section && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary rounded-lg -z-10"
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
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-12 px-2 bg-primary text-primary-foreground rounded-r-lg shadow-lg flex items-center justify-center"
        >
          <span className="sr-only">
            {isExpanded ? 'Collapse navigation' : 'Expand navigation'}
          </span>
          {isExpanded ? '←' : '→'}
        </button>
      </motion.div>
    </motion.nav>
  );
};

export default PillarNavigation;