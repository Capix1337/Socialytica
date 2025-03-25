"use client";

import { useRef } from "react";
import TestCard from "./TestCard";

const tests = [
  {
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7d6692489ee305aa8c6dd7c205a0fcd03b4bdc6f?placeholderIfAbsent=true",
    iconBgColor: "#D1D3C6",
    title: "Four-Pillar Relationship Test",
    description:
      "Evaluate the strength, communication, and emotional well-being of your relationship",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4d7fa73e279ca0fc8b493aaa2daa7c892c24fc73?placeholderIfAbsent=true",
  },
  {
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a030f2a983029a5ada4f48632ecc46705deec304?placeholderIfAbsent=true",
    iconBgColor: "rgba(196, 216, 137, 1)",
    title: "Compatibility Test",
    description:
      "Discover how well you and your partner align in values, goals, and lifestyle.",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/06915ef785b7566acb93bedcba66a79089ff9b61?placeholderIfAbsent=true",
  },
  {
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2bcbdaf2527a7e1d83034a49cf9bbf52900fb7ca?placeholderIfAbsent=true",
    iconBgColor: "#E95045",
    title: "Toxic Relationship Test",
    description:
      "Identify unhealthy patterns, red flags, and potential toxicity in your relationship.",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0872dab49bf5f4d03fea7ac9693f4c8bdaa1395b?placeholderIfAbsent=true",
  },
  {
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/80732d42f596bdaaf8c1b4f813a8ba1d74dda357?placeholderIfAbsent=true",
    iconBgColor: "#C4ADB5",
    title: "Marriage Readiness Test",
    description:
      "Assess if you and your partner are ready for a long-term commitment or marriage.",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1593f88d53d8bdf44024d79c09fde6888bddb94a?placeholderIfAbsent=true",
  },
  {
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4d590dfa627af87ad5d18541e53ff0690d274f04?placeholderIfAbsent=true",
    iconBgColor: "#FFBDC6",
    title: "Does My Partner Love Me Test?",
    description:
      "Gain insights into your partner's feelings and emotional investment in the relationship.",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4d590dfa627af87ad5d18541e53ff0690d274f04?placeholderIfAbsent=true",
  },
  {
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4d590dfa627af87ad5d18541e53ff0690d274f04?placeholderIfAbsent=true",
    iconBgColor: "rgba(67, 168, 187, 1)",
    title: "Personality Test",
    description:
      "Understand your personality traits, strengths, and how they impact your relationships.",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4d590dfa627af87ad5d18541e53ff0690d274f04?placeholderIfAbsent=true",
  },
];

export default function TestsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -328 : 328;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto flex min-h-[500px] w-full items-stretch gap-2 justify-start"
      >
        {tests.map((test, index) => (
          <TestCard key={index} {...test} />
        ))}
      </div>

      <div className="flex items-center gap-2.5 justify-center mt-9">
        <button
          onClick={() => scroll("left")}
          className="flex items-center justify-center w-11 h-11 rounded-[32px] bg-[#171717] border border-[#2C2C2C] overflow-hidden"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e328ab45f48f7cc36e1bb10788a94c7337e585b?placeholderIfAbsent=true"
            alt="Previous"
            className="w-5 h-5 object-contain object-center my-auto"
          />
        </button>
        <button
          onClick={() => scroll("right")}
          className="flex items-center justify-center w-11 h-11 rounded-[32px] bg-[#171717] border border-[#2C2C2C] overflow-hidden"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ddf6f442c2243f37294a6d1493007c44bffefda?placeholderIfAbsent=true"
            alt="Next"
            className="w-5 h-5 object-contain object-center my-auto"
          />
        </button>
      </div>
    </div>
  );
}
