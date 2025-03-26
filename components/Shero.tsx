"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import heroImg from '@/assets/hero-img.png';

const Shero = () => {
  return (
    <div className="relative w-full bg-gradient-to-b from-[#FFF2DE] to-[#FFF2DE00]">
      {/* Hero Section Container */}
      <div className="w-full px-4 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-48">
        {/* Content Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-6xl mx-auto px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-light leading-tight md:leading-[76px] tracking-[-2.16px] text-[#243757] mb-6"
          >
            The Science of You
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-light leading-relaxed md:leading-[40px] tracking-[-0.64px] text-[#43A8BB]"
          >
            Relationship & Personality Tests for Meaningful Growth
          </motion.h2>
        </motion.div>
      </div>

      {/* Decorative Image Container - with overflow control */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full overflow-hidden relative h-32 sm:h-40 md:h-48 lg:h-56"
      >
        <div className="absolute w-[120%] sm:w-[115%] md:w-[110%] lg:w-[105%] h-full left-[50%] -translate-x-1/2">
          <Image 
            src={heroImg}
            alt="Decorative geometric shapes"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 120vw, 110vw"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Shero;