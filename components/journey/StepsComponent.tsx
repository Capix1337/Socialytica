import React from "react";
import Image from "next/image";

// Import SVG files
import OneSvg from "@/assets/one.svg";
import TwoSvg from "@/assets/two.svg";
import ThreeSvg from "@/assets/three.svg";

const steps = [
  {
    icon: OneSvg,
    title: "Take the Test",
    description:
      "Complete our scientifically designed relationship assessment questionnaire at your own pace",
    color: "bg-[#F0B15E]", // sandy_brown
  },
  {
    icon: TwoSvg,
    title: "Get Your Results",
    description:
      "Receive instant, detailed insights about your relationship patterns and tendencies",
    color: "bg-[#FC8E77]", // bittersweet
  },
  {
    icon: ThreeSvg,
    title: "Track Progress",
    description:
      "Follow your development over time and see how your relationships improve",
    color: "bg-[#E65663]", // mandy
  },
];

const StepsComponent: React.FC = () => {
  return (
    <div className="py-16 min-h-screen" style={{ background: "linear-gradient(to bottom, #FFF2DE, #FFF2DE00)" }}>
      <div className="mb-12 md:mb-16 text-center">
        <h3 className="text-[#FC8E77] uppercase text-lg font-normal leading-[120%] mb-4 font-geologica">
          How Socialytica Works
        </h3>
        
        <h2 className="text-[#243757] text-3xl sm:text-4xl md:text-[40px] font-light leading-[120%] tracking-[-0.8px] max-w-3xl mx-auto font-geologica">
          Start Your Journey in 3 Simple Steps
        </h2>
      </div>
      
      <div className="max-w-5xl mx-auto space-y-10 md:space-y-12 px-4 md:px-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center bg-white p-12 md:py-16 md:px-24 lg:py-24 lg:px-36 rounded-[30px] shadow-[0px_-10px_60px_0px_rgba(255,242,222,0.80)]"
          >
            <div
              className={`w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 ${step.color} flex items-center justify-center rounded-full aspect-square mb-6 md:mb-0 md:mr-10`}
            >
              <Image 
                src={step.icon} 
                alt={`Step ${index + 1}`} 
                width={48} 
                height={48} 
                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
              />
            </div>
            <div className="md:ml-4">
              <h3 className="text-[#171717] text-2xl md:text-3xl lg:text-[40px] font-light leading-tight md:leading-[48px] tracking-[-0.8px] font-geologica">
                {step.title}
              </h3>
              <p className="text-[#525252] text-sm md:text-base font-light leading-relaxed md:leading-[23px] tracking-[-0.16px] mt-2 font-geologica">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsComponent;
