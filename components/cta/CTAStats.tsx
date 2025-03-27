"use client";

import * as React from "react";
import Image from "next/image";
import MarkSvg from "@/assets/mark.svg";

interface StatsCardProps {
  text: string[];
}

const StatsCard: React.FC<StatsCardProps> = ({ text }) => {
  return (
    <div className="flex min-w-[90px] sm:min-w-[100px] items-center gap-3 sm:gap-4 md:gap-5 justify-start h-full rounded-lg">
      <Image
        src={MarkSvg}
        alt="Stats icon"
        width={36}
        height={36}
        className="object-contain self-stretch my-auto flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9"
      />
      <div className="self-stretch my-auto gap-1">
        {text.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < text.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default function CTAStats() {
  const stats = [
    ["Research-based", "methodology"],
    ["Instant", "results"],
    ["Free", "assessment"],
  ];

  return (
    <div className="flex mt-8 sm:mt-9 md:mt-11 w-full items-stretch gap-6 sm:gap-8 md:gap-12 text-sm sm:text-base font-light tracking-[-0.14px] sm:tracking-[-0.16px] leading-[20px] sm:leading-[23px] justify-center flex-wrap lg:mt-[44px]">
      {stats.map((stat, index) => (
        <StatsCard key={index} text={stat} />
      ))}
    </div>
  );
}
