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

        {/* Secondary Heading */}
        <div className="text-center mt-12 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-navy-800 max-w-3xl mx-auto leading-tight px-4">
            Science-Based Personality & Relationship Tests for Real, Actionable Insights
          </h3>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Shero;