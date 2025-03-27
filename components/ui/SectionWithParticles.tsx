"use client";

import React from "react";
import ParticleBackground from "./particle-background";

interface SectionWithParticlesProps {
  children: React.ReactNode;
  className?: string;
  particleColor?: string;
}

const SectionWithParticles = ({ 
  children, 
  className = "",
  particleColor = "#444444" 
}: SectionWithParticlesProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Particles only in the margin spaces */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <ParticleBackground
          particleCount={{
            sm: 1000,
            md: 2000,
            lg: 5000,
          }}
          particleColor={particleColor}
          particleSize={2}
          opacityRange={[0.3, 0.5]}
          height="100%"
        />
        
        {/* Content mask - creates an empty space where content will be */}
        <div className="absolute left-4 right-4 top-0 bottom-0 md:left-8 md:right-8 lg:left-12 lg:right-12 bg-[#F5F5F5] z-10">
          {/* This empty div creates the mask matching the margins */}
        </div>
      </div>
      
      {/* Actual content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default SectionWithParticles;