"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AccessIcon from "./AccessIcon";
import accessImage from "@/assets/Access.png";
import { Button } from "@/components/ui/button";

export default function AccessSection() {
  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Left Content Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="aspect-square flex flex-col justify-center items-center px-4 md:px-10 lg:px-20 py-10"
          style={{ background: "#D3DBEA" }}
        >
          <div className="flex justify-center items-center mb-8">
            <AccessIcon />
          </div>
          
          <div className="flex flex-col items-center gap-4 max-w-lg text-center">
            <h2 className="text-[#262626] font-geologica text-2xl sm:text-3xl lg:text-[32px] font-medium leading-tight tracking-[-0.64px]">
              Instant Access
            </h2>
            
            <p className="text-[#171717] font-geologica text-base sm:text-lg font-light leading-relaxed tracking-[-0.36px] opacity-75">
              Start your test today and get immediate insights into your relationship&apos;s strengths and areas for growth.
            </p>
            
            <Button 
              className="mt-6 rounded-full bg-[#171717] text-white font-geologica text-lg font-normal leading-[26px] tracking-[-0.36px]"
            >
              Get Started Today
            </Button>
          </div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="aspect-square relative w-full"
        >
          <Image
            src={accessImage}
            alt="Instant access to relationship test insights"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}