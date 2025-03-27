"use client";

import Image from "next/image";
import CTAStats from "./CTAStats";
import HandSvg from "@/assets/hand.svg";
import SectionWithParticles from "../ui/SectionWithParticles";

export default function CTASection() {
  return (
    <SectionWithParticles className="py-2">
      <section className="rounded-[20px] md:rounded-[30px] shadow-[0px_-10px_60px_0px_rgba(255,242,222,0.80)] bg-[#2B4879] px-4 py-12 sm:px-5 sm:py-16 md:py-18 lg:py-20 lg:px-8 xl:px-56 flex flex-col overflow-hidden font-geologica text-white justify-start mx-3 sm:mx-4 md:mx-8 lg:mx-12">
        <div className="flex w-full flex-col items-stretch font-light text-center justify-start">
          <Image
            src={HandSvg}
            alt="CTA icon"
            width={100}
            height={100}
            className="object-contain object-center self-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32"
          />
          <div className="mt-6 sm:mt-7 md:mt-9 w-full">
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[36px] sm:leading-[42px] md:leading-[46px] lg:leading-[50px] tracking-[-1px] sm:tracking-[-1.4px] md:tracking-[-1.8px] lg:text-[60px] lg:leading-[68px]">
              Ready to Understand Your Relationships Better?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl leading-[26px] sm:leading-7 md:leading-8 tracking-[-0.32px] sm:tracking-[-0.4px] md:tracking-[-0.48px] mt-3 sm:mt-4 md:mt-5">
              Take our scientifically designed tests and gain valuable insights
              into your relationship patterns and behaviors.
            </p>
          </div>
        </div>

        <div className="self-center flex mt-8 sm:mt-9 md:mt-10 lg:mt-16 w-full sm:w-[90%] md:w-[80%] lg:w-[537px] max-w-full flex-col items-stretch justify-start">
          <div className="rounded-[90px] sm:rounded-[120px] md:rounded-[198px] self-center flex min-h-[60px] sm:min-h-[80px] md:min-h-[98px] w-full sm:w-[90%] md:w-[490px] max-w-full items-stretch gap-3 sm:gap-4 text-lg sm:text-xl md:text-2xl font-medium tracking-[-0.32px] sm:tracking-[-0.4px] md:tracking-[-0.48px] justify-start">
            <button className="self-stretch rounded-[45px] sm:rounded-[60px] md:rounded-[90px] bg-[#E65663] min-w-[200px] sm:min-w-[220px] md:min-w-[240px] w-full p-2 sm:p-3 overflow-hidden h-full flex-1 flex-shrink flex-basis-0">
              Take a free test
            </button>
          </div>
          <CTAStats />
        </div>
      </section>
    </SectionWithParticles>
  );
}
