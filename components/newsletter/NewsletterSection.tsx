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
    <SectionWithParticles className="py-4" particleColor="#d1d1d1">
      <section className="flex flex-col items-center justify-center px-[60px] py-[72px] bg-[#D1D3C6] rounded-[30px] overflow-hidden font-geologica mx-4 md:mx-8 lg:mx-12 my-16">
        <div className="w-[775px] max-w-full">
          <h2 className="text-[#171717] text-center text-[32px] font-normal leading-none tracking-[-0.64px]">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-[#404040] text-[18px] font-light leading-none tracking-[-0.36px] mt-2">
            Get the latest insights about relationships and psychological
            well-being delivered to your inbox.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-start gap-1.5 mt-8 text-base tracking-[-0.16px] leading-none"
        >
          <div className="min-w-[240px] w-[249px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full min-w-[240px] px-4 py-3 text-[#171717] font-light rounded-full bg-white border border-[#D9D9D9] outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="px-7 py-3 text-white font-medium bg-[#E95045] rounded-full hover:bg-[#d64238] transition-colors"
          >
            Submit
          </button>
        </form>
      </section>
    </SectionWithParticles>
  );
}
