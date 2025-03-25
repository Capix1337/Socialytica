"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestCard from "./TestCard";

// Update imports to use SVG files
import fourPillarIcon from "@/assets/icon-four-pillars.svg";
import compatibilityIcon from "@/assets/icon-compatibility.svg";
import toxicIcon from "@/assets/icon-toxic-relationship.svg";
import marriageIcon from "@/assets/icon-marriage.svg";
import loveIcon from "@/assets/icon-love-partner.svg";
import personalityIcon from "@/assets/icon-personality.svg";

// Image imports remain the same
import fourPillarImg from "@/assets/image-four-pillars.png";
import compatibilityImg from "@/assets/image-compatibility.png";
import toxicImg from "@/assets/image-toxic-relationship.png";
import marriageImg from "@/assets/image-marriage.png";
import loveImg from "@/assets/image-partner-love.png";
import personalityImg from "@/assets/image-personality.png";

const tests = [
  {
    slug: "four-pillar-relationship-test",
    iconSrc: fourPillarIcon,
    iconBgColor: "#D1D3C6",
    title: "Four-Pillar Relationship Test",
    description:
      "Evaluate the strength, communication, and emotional well-being of your relationship",
    imageSrc: fourPillarImg,
  },
  {
    slug: "compatibility-test",
    iconSrc: compatibilityIcon,
    iconBgColor: "rgba(196, 216, 137, 1)",
    title: "Compatibility Test",
    description:
      "Discover how well you and your partner align in values, goals, and lifestyle.",
    imageSrc: compatibilityImg,
  },
  {
    slug: "toxic-relationship-test",
    iconSrc: toxicIcon,
    iconBgColor: "#E95045",
    title: "Toxic Relationship Test",
    description:
      "Identify unhealthy patterns, red flags, and potential toxicity in your relationship.",
    imageSrc: toxicImg,
  },
  {
    slug: "marriage-readiness-test",
    iconSrc: marriageIcon,
    iconBgColor: "#C4ADB5",
    title: "Marriage Readiness Test",
    description:
      "Assess if you and your partner are ready for a long-term commitment or marriage.",
    imageSrc: marriageImg,
  },
  {
    slug: "partner-love-test",
    iconSrc: loveIcon,
    iconBgColor: "#FFBDC6",
    title: "Does My Partner Love Me Test?",
    description:
      "Gain insights into your partner's feelings and emotional investment in the relationship.",
    imageSrc: loveImg,
  },
  {
    slug: "personality-test",
    iconSrc: personalityIcon,
    iconBgColor: "rgba(67, 168, 187, 1)",
    title: "Personality Test",
    description:
      "Understand your personality traits, strengths, and how they impact your relationships.",
    imageSrc: personalityImg,
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
        className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar"
      >
        {tests.map((test, index) => (
          <TestCard key={index} {...test} />
        ))}
      </div>

      <div className="flex items-center gap-4 justify-center mt-8">
        <Button
          onClick={() => scroll("left")}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          onClick={() => scroll("right")}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
