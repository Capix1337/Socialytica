"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import InsightIcon from "./InsightIcon";
import insightImage from "@/assets/Insight.png";

export default function InsightSection() {
  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Left Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="aspect-square relative w-full"
        >
          <Image
            src={insightImage}
            alt="Personalized relationship insights visualization"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Right Content Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="aspect-square flex flex-col justify-center items-center px-4 md:px-10 lg:px-20"
          style={{ background: "#FFF2DE" }}
        >
          <div className="flex justify-center items-center mb-8">
            <InsightIcon />
          </div>
          
          <div className="flex flex-col items-center gap-4 max-w-lg text-center">
            <h2 className="text-[#262626] font-geologica text-2xl sm:text-3xl lg:text-[32px] font-medium leading-tight tracking-[-0.64px]">
              Personalized Insights
            </h2>
            
            <p className="text-[#171717] font-geologica text-base sm:text-lg font-light leading-relaxed tracking-[-0.36px] opacity-75">
              Receive tailored recommendations to address specific areas in need of improvement, 
              based on your unique relationship dynamics.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}