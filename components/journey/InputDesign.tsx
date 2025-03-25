"use client";
import * as React from "react";
import { InfoCard } from "./InfoCard";

function InputDesign() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      {/* Heading Section */}
      <div className="mb-12 md:mb-16 text-center">
        <h3 className="text-[#FC8E77] uppercase text-lg font-normal leading-[120%] mb-4">
          How Socialytica Works
        </h3>
        
        <h2 className="text-[#243757] text-3xl sm:text-4xl md:text-[40px] font-normal leading-[120%] tracking-[-0.8px] max-w-3xl mx-auto">
          Start Your Journey in 3 Simple Steps
        </h2>
      </div>
      
      {/* Steps Section */}
      <div className="max-w-[880px] mx-auto flex flex-col gap-8 md:gap-11">
        <InfoCard
          title="Take the Test"
          description="Complete our scientifically designed relationship assessment questionnaire at your own pace"
          circleColor="bg-orange-300"
        />

        <InfoCard
          title="Get Your Results"
          description="Receive instant, detailed insights about your relationship patterns and tendencies"
          circleColor="bg-red-400"
        />

        <InfoCard
          title="Track Progress"
          description="Follow your development over time and see how your relationships improve"
          circleColor="bg-rose-500"
        />
      </div>
    </section>
  );
}

export default InputDesign;
