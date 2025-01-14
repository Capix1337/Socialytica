'use client';

import { motion } from 'framer-motion';
import React from 'react';

const FrameworkHero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background py-20 sm:py-32">
      {/* Background Pattern - visible in light mode */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:hidden" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Four-Pillar Relationship Test
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            A scientifically rigorous yet practical framework for understanding and improving relationships.
            Built on decades of research and leading psychological theories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <a
              href="#theory"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
            >
              Learn More
            </a>
            <a
              href="#pillars"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              Explore Pillars <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FrameworkHero;