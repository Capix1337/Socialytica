import React from "react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-[32px] h-[32px] text-[#9333EA]" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path></svg>',
    title: "AI-Powered Analysis",
    description:
      "Advanced algorithms analyze your responses to provide personalized insights",
    iconBgColor: "bg-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-[32px] h-[32px] text-[#DC2626]" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>',
    title: "Relationship Dynamics",
    description: "Understand the patterns and behaviors in your relationships",
    iconBgColor: "bg-[#FFE4E4]",
    iconColor: "text-[#DC2626]",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-[32px] h-[32px] text-[#0EA5E9]" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 7a5 5 0 1 0 5 5"></path></svg>',
    title: "Personal Growth",
    description:
      "Set goals and track your progress over time with detailed metrics",
    iconBgColor: "bg-[#E0F2FE]",
    iconColor: "text-[#0EA5E9]",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-[32px] h-[32px] text-[#16A34A]" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M14 9l-2 2l-2 -2"></path><path d="M12 11v4"></path></svg>',
    title: "Privacy First",
    description:
      "Your data is encrypted and protected with enterprise-grade security",
    iconBgColor: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-[32px] h-[32px] text-[#4F46E5]" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"><path d="M3 12h4l3 8l4 -16l3 8h4"></path></svg>',
    title: "Progress Tracking",
    description:
      "Revisit the test periodically to track progress and see improvements over time",
    iconBgColor: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-[32px] h-[32px] text-[#EA580C]" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"><path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"></path><path d="M3 10l3 3h7a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-9a1 1 0 0 1 -1 -1v-10"></path></svg>',
    title: "Community Support",
    description:
      "Connect with others and share experiences in a safe environment",
    iconBgColor: "bg-[#FFF7ED]",
    iconColor: "text-[#EA580C]",
  },
];

const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center px-12 py-36 bg-white md:py-24 sm:py-16 sm:px-6">
      <h2 className="text-[40px] text-[#243757] text-center font-geologica leading-[48px] tracking-[-0.8px] mb-16 max-w-[800px] md:text-[36px] md:leading-[44px] sm:text-[32px] sm:leading-[40px]">
        The best platform to understand and improve your relationships
      </h2>
      <div className="flex flex-wrap justify-center items-start gap-8 max-w-[1180px] md:gap-6 sm:gap-5">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            iconBgColor={feature.iconBgColor}
            iconColor={feature.iconColor}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
