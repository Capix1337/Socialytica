import React from 'react';
import Image from 'next/image';
import { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import heroImg from '@/assets/hero-img.png';

const Shero = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);


  return (
    <div className="relative w-full bg-gradient-to-b from-[#FFF2DE] to-[#FFF2DE00]">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: {
            enable: false,
            zIndex: 0
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: ["#FC8E77", "#43A8BB", "#243757", "#E65663"],
            },
            links: {
              enable: true,
              color: "#FC8E77",
              distance: 150,
              opacity: 0.5, // Increased from 0.2
              width: 2, // Increased from 1
            },
            move: {
              enable: true,
              direction: "none",
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2, // Increased from 1
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 600, // Decreased from 800 (more particles)
              },
              value: 60, // Increased from 40
            },
            opacity: {
              value: 0.8, // Increased from 0.5
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 2, max: 8 }, // Increased from min: 1, max: 5
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0 h-full"
      />

      {/* Hero Section Container */}
      <div className="relative z-10 w-full px-4 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-48">
        {/* Content Container */}
        <div className="text-center mb-16 max-w-6xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-light leading-tight md:leading-[76px] tracking-[-2.16px] text-[#243757] mb-6">
            The Science of You
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-light leading-relaxed md:leading-[40px] tracking-[-0.64px] text-[#43A8BB]">
            Relationship & Personality Tests for Meaningful Growth
          </h2>
        </div>
      </div>

      {/* Decorative Image Container - with overflow control */}
      <div className="w-full overflow-hidden relative h-32 sm:h-40 md:h-48 lg:h-56">
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
      </div>
    </div>
  );
};

export default Shero;