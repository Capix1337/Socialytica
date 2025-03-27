"use client";

import { useState } from "react";
import SectionWithParticles from "../ui/SectionWithParticles";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe email:", email);
    setEmail("");
  };

  return (
    <SectionWithParticles className="py-3 sm:py-4" particleColor="#d1d1d1">
      <section className="flex flex-col items-center justify-center px-5 sm:px-8 md:px-[40px] lg:px-[60px] py-10 sm:py-14 md:py-[60px] lg:py-[72px] bg-[#D1D3C6] rounded-[20px] sm:rounded-[30px] overflow-hidden font-geologica mx-3 sm:mx-4 md:mx-8 lg:mx-12 my-8 sm:my-12 md:my-16">
        <div className="w-full md:w-[80%] lg:w-[775px] max-w-full">
          <h2 className="text-[#171717] text-center text-[24px] sm:text-[28px] md:text-[32px] font-normal leading-[30px] sm:leading-[36px] md:leading-none tracking-[-0.48px] sm:tracking-[-0.56px] md:tracking-[-0.64px]">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-[#404040] text-center text-[16px] sm:text-[17px] md:text-[18px] font-light leading-[22px] sm:leading-[24px] md:leading-none tracking-[-0.28px] sm:tracking-[-0.32px] md:tracking-[-0.36px] mt-2">
            Get the latest insights about relationships and psychological
            well-being delivered to your inbox.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-1.5 mt-6 sm:mt-8 text-base tracking-[-0.16px] leading-none w-full md:w-auto"
        >
          <div className="w-full sm:min-w-[200px] md:min-w-[240px] sm:w-[220px] md:w-[249px] max-w-[90%] sm:max-w-none mb-2 sm:mb-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full min-w-[200px] sm:min-w-[220px] md:min-w-[240px] px-4 py-2.5 sm:py-3 text-[#171717] font-light rounded-full bg-white border border-[#D9D9D9] outline-none text-sm sm:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 text-white font-medium bg-[#E95045] rounded-full hover:bg-[#d64238] transition-colors text-sm sm:text-base w-full sm:w-auto max-w-[90%] sm:max-w-none"
          >
            Submit
          </button>
        </form>
      </section>
    </SectionWithParticles>
  );
}
