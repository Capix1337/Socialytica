"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import EvidenceIcon from "./EvidenceIcon";
import evidenceImage from "@/assets/evidence.png";

export default function EvidenceSection() {
  return (
    <section className="w-full py-20 bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* Left Content Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center px-4 md:px-10 lg:px-20 py-10 gap-8"
        >
          <div className="flex justify-center items-center">
            <EvidenceIcon />
          </div>
          
          <div className="flex flex-col items-center gap-4 max-w-lg">
            <h2 className="text-[#262626] text-center font-geologica text-2xl sm:text-3xl lg:text-[32px] font-medium leading-tight tracking-[-0.64px]">
              Evidence-Driven
            </h2>
            
            <p className="text-[#171717] text-center font-geologica text-base sm:text-lg font-light leading-relaxed tracking-[-0.36px] opacity-75">
              Our Relationship Test is grounded in decades of proven
              psychological and therapeutic research.
            </p>
          </div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[533px] w-full"
        >
          <Image
            src={evidenceImage}
            alt="Evidence-based research visualization"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
