"use client";

import { motion } from "framer-motion";
import TestsCarousel from "./TestsCarousel";
import ParticleBackground from "../ui/particle-background";

export default function TestsSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Particle Background Layer */}
      <div className="absolute inset-0 bg-[#f6f6f6] opacity-70 pointer-events-none">
        <ParticleBackground 
          particleCount={{
            sm: 3000,
            md: 6000,
            lg: 15000,
          }}
          particleColor="#d1d1d1"
          particleSize={1}
          opacityRange={[0.4, 0.6]}
          height="100%"
        />
      </div>

      <div className="pl-4 md:pl-6 pr-0 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-12 max-w-4xl mx-auto"
        >
          <h2 className="text-[#243757] text-center font-normal tracking-[-0.8px] text-2xl leading-tight sm:text-3xl sm:leading-9 md:text-[32px] md:leading-10 lg:text-[40px] lg:leading-[48px]">
            Science-Based Personality & Relationship Tests for Real, Actionable Insights
          </h2>
        </motion.div>

        <TestsCarousel />
      </div>
    </section>
  );
}