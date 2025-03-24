import React from 'react';
import Image from 'next/image';
import heroImg from '@/assets/hero-img.png';

const Shero = () => {
  return (
    <div className="relative w-full bg-amber-50">
      {/* Hero Section Container - removed max-width constraint */}
      <div className="w-full px-0 py-16 md:py-24">
        {/* Content Container */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-navy-800 mb-6">
            The Science of You
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-400 font-medium">
            Relationship & Personality Tests for Meaningful Growth
          </h2>
        </div>

        {/* Decorative Image Container */}
        <div className="w-full relative h-32 md:h-40 lg:h-48">
          <Image 
            src={heroImg}
            alt="Decorative geometric shapes"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 100vw"
          />
        </div>

        {/* Secondary Heading */}
        <div className="text-center mt-12 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-navy-800 max-w-3xl mx-auto leading-tight px-4">
            Science-Based Personality & Relationship Tests for Real, Actionable Insights
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Shero;