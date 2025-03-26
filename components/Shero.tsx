"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import heroImg from '@/assets/hero-img.png';

const Shero = () => {
  // Generate particle positions
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: string;
    top: string;
    size: string;
    duration: string;
    delay: string;
    color: string;
  }>>([]);

  useEffect(() => {
    // Create larger stone-like particles
    const newParticles = Array.from({ length: 120 }, (_, i) => {
      // Create color variations in whitish/grayish tones
      const colorVariation = Math.floor(Math.random() * 30);
      const baseColor = 225 - colorVariation;
      
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 5 + 2}px`, // Larger size: 2-7px
        duration: `${Math.random() * 20 + 15}s`, // Slower animation
        delay: `${Math.random() * 10}s`,
        color: `rgba(${baseColor}, ${baseColor}, ${baseColor + 10}, ${0.6 + Math.random() * 0.3})`
      };
    });
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-b from-[#FFF2DE] to-[#FFF2DE00]">
      {/* Stone Particles Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float shadow-sm"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
              filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.5))'
            }}
          />
        ))}
        
        {/* Decorative blobs - keep these for depth */}
        <div className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-[#43A8BB]/10 blur-3xl"></div>
        <div className="absolute -right-20 bottom-40 h-[300px] w-[300px] rounded-full bg-[#FC8E77]/10 blur-2xl"></div>
        <div className="absolute left-1/4 bottom-1/3 h-[200px] w-[200px] rounded-full bg-[#243757]/5 blur-xl"></div>
      </div>

      {/* Hero Section Container */}
      <div className="relative z-10 w-full px-4 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-48">
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
        className="relative z-20 w-full overflow-hidden h-32 sm:h-40 md:h-48 lg:h-56"
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