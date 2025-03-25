"use client";

import { motion } from "framer-motion";
import TestsCarousel from "./TestsCarousel";

export default function TestsSection() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="pl-4 md:pl-6 pr-0">
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
