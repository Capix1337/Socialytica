"use client";

import Image from "next/image";
import CTAStats from "./CTAStats";
import HandSvg from "@/assets/hand.svg";
import SectionWithParticles from "../ui/SectionWithParticles";

export default function CTASection() {
  return (
    <SectionWithParticles className="py-2">
      <section className="rounded-[30px] shadow-[0px_-10px_60px_0px_rgba(255,242,222,0.80)] bg-[#2B4879] px-5 py-20 lg:px-56 flex flex-col overflow-hidden font-geologica text-white justify-start mx-4 md:mx-8 lg:mx-12">
        <div className="flex w-full flex-col items-stretch font-light text-center justify-start">
          <Image
            src={HandSvg}
            alt="CTA icon"
            width={100}
            height={100}
            className="object-contain object-center self-center w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
          />
          <div className="mt-9 w-full">
            <h2 className="text-[40px] leading-[50px] tracking-[-1.8px] lg:text-[60px] lg:leading-[68px]">
              Ready to Understand Your Relationships Better?
            </h2>
            <p className="text-2xl leading-8 tracking-[-0.48px] mt-5">
              Take our scientifically designed tests and gain valuable insights
              into your relationship patterns and behaviors.
            </p>
          </div>
        </div>

        <div className="self-center flex mt-10 lg:mt-16 w-[537px] max-w-full flex-col items-stretch justify-start">
          <div className="rounded-[198px] self-center flex min-h-[98px] w-[490px] max-w-full items-stretch gap-4 text-2xl font-medium tracking-[-0.48px] justify-start">
            <button className="self-stretch rounded-[90px] bg-[#E65663] min-w-[240px] w-full p-3 overflow-hidden h-full flex-1 flex-shrink flex-basis-0">
              Take a free test
            </button>
          </div>
          <CTAStats />
        </div>
      </section>
    </SectionWithParticles>
  );
}
