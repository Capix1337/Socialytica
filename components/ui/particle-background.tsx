"use client";

import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  particleCount?: number | {
    sm: number;
    md: number;
    lg: number;
  };
  particleColor?: string;
  particleSize?: number;
  colorVariation?: number;
  opacityRange?: [number, number];
  height?: string;
}

const ParticleBackground = ({
  particleCount = {
    sm: 1500,
    md: 3000,
    lg: 20000,
  },
  particleColor = "#d1d1d1", // Updated to match the dot pattern in TestsSection
  particleSize = 1,
  colorVariation = 10, // Slightly increased for subtle variation
  opacityRange = [0.4, 0.6], // Adjusted to match opacity in TestsSection
  height = "100%",
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = window.innerWidth;
      
      // Handle height - either percentage of viewport or fixed height
      if (height.endsWith('%')) {
        const percentage = parseFloat(height) / 100;
        canvas.height = window.innerHeight * percentage;
      } else {
        canvas.height = window.innerHeight * 1.5; // Default fallback
      }
    };
    
    resizeCanvas();
    
    // Generate particle count based on screen size
    const getParticleCount = () => {
      if (typeof particleCount === 'number') {
        return particleCount;
      }
      
      if (window.innerWidth < 640) return particleCount.sm;
      if (window.innerWidth < 1024) return particleCount.md;
      return particleCount.lg;
    };
    
    // Create particles
    const count = getParticleCount();
    const particles = Array.from({ length: count }, () => {
      // Create variation for darker particles
      const colorVar = Math.floor(Math.random() * colorVariation);
      const baseColor = parseInt(particleColor.replace('#', ''), 16);
      
      // Convert hex to rgb
      const r = (baseColor >> 16) & 255;
      const g = (baseColor >> 8) & 255;
      const b = baseColor & 255;
      
      // For darker particles, we adjust adding some variation rather than always subtracting
      const adjustedR = Math.min(255, Math.max(0, r + (Math.random() > 0.5 ? colorVar : -colorVar)));
      const adjustedG = Math.min(255, Math.max(0, g + (Math.random() > 0.5 ? colorVar : -colorVar)));
      const adjustedB = Math.min(255, Math.max(0, b + (Math.random() > 0.5 ? colorVar : -colorVar)));
      const opacity = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]);
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * particleSize + 1.2, // Increased minimum size
        color: `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}, ${opacity})`
      };
    });
    
    // Single render of particles (no animation)
    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size/2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Add subtle shadow for depth
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 1;
      });
    };
    
    // Render once
    renderParticles();
    
    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      renderParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount, particleColor, particleSize, colorVariation, opacityRange, height]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ParticleBackground;