import React from "react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81" fill="none"><path d="M28.592 36.2791C27.5186 33.8039 26.913 31.0619 26.913 28.1819C26.913 17.0115 35.9591 7.93896 47.097 7.93896C58.2348 7.93896 67.2809 17.1862 67.2809 28.3658M40.3013 28.2592C42.325 26.4668 44.7461 25.0369 47.4845 24.1408C58.1057 20.665 69.5113 26.457 72.9332 37.0639C76.3551 47.6709 70.3418 59.1631 59.7119 62.6417M51.6041 36.8768C53.921 38.2422 56.0151 40.0993 57.6993 42.4255C64.232 51.4476 62.2113 64.1165 53.1908 70.6927C44.1702 77.2689 31.4358 75.1412 24.8978 66.1116M46.8352 50.3683C46.257 53.0013 45.1439 55.5735 43.4596 57.8997C36.9269 66.9218 24.2948 68.9084 15.2742 62.3322C6.25363 55.7559 4.33519 42.9459 10.8732 33.9163M32.7021 49.9713C30.0189 50.2234 27.2256 49.9469 24.4872 49.0508C13.8661 45.575 8.0189 34.1372 11.4408 23.5302C14.8627 12.9233 26.4345 7.18575 37.0644 10.6643M52.0863 40.3235C52.0863 47.028 46.6671 52.4631 39.9821 52.4631C33.2971 52.4631 27.8779 47.028 27.8779 40.3235C27.8779 33.619 33.2971 28.1839 39.9821 28.1839C46.6671 28.1839 52.0863 33.619 52.0863 40.3235Z" stroke="#A261CD" stroke-width="3" stroke-miterlimit="2.2561" stroke-linecap="round" stroke-linejoin="bevel"/></svg>',
    title: "AI-Powered Analysis",
    description:
      "Advanced algorithms analyze your responses to provide personalized insights",
    iconBgColor: "bg-[#F3E8FF] w-[120px] h-[120px]",
    iconColor: "text-[#9333EA]",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M56.1215 13.3132C65.2513 13.3132 72.6664 20.6368 72.6664 29.6538C72.6664 48.9655 55.0837 58.6213 39.5767 73.4764C39.5767 68.2103 39.5767 65.2022 39.5767 65.2022L35.0644 59.9434L43.0512 49.4112L33.5604 43.3948L44.5553 37.3784L39.5767 32.87C39.5767 32.87 39.5767 30.2332 39.5767 29.6538C39.5767 20.6368 46.9918 13.3132 56.1215 13.3132Z" stroke="#EC221F" stroke-width="3" stroke-miterlimit="2.5" stroke-linecap="round"/><path d="M39.5574 29.6538C39.5574 20.6368 32.1423 13.3132 23.0126 13.3132C13.8828 13.3132 6.4677 20.6368 6.4677 29.6538C6.4677 48.9655 24.0504 58.6213 39.5574 73.4764" stroke="#EC221F" stroke-width="3" stroke-miterlimit="2" stroke-linecap="round"/></svg>',
    title: "Relationship Dynamics",
    description: "Understand the patterns and behaviors in your relationships",
    iconBgColor: "bg-[#FFE4E4] w-[120px] h-[120px]",
    iconColor: "text-[#DC2626]",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81" fill="none"><g clip-path="url(#clip0_4741_8860)"><path d="M45.2773 42.1682L18.5749 26.7515" stroke="#39A7BB" stroke-width="3" stroke-miterlimit="2.2561" stroke-linecap="round" stroke-linejoin="bevel"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1.37144 24.3317L9.95281 29.2862L18.6151 26.768L16.4648 18.0071L7.88342 13.0526L10.3483 21.9951L1.37144 24.3317Z" stroke="#39A7BB" stroke-width="3" stroke-miterlimit="2" stroke-linecap="round"/><path d="M35.1859 76.9729C50.3737 82.4817 68.206 71.7284 75.0154 52.9548C81.8247 34.1813 75.0326 14.4965 59.8448 8.98772C44.6569 3.47894 26.8246 14.2322 20.0153 33.0058C13.2059 51.7794 19.998 71.4641 35.1859 76.9729Z" stroke="#39A7BB" stroke-width="3" stroke-miterlimit="2.2561" stroke-linecap="round" stroke-linejoin="bevel"/><path d="M39.527 59.3097C46.9654 62.0076 55.7553 56.5856 59.1598 47.1991C62.5644 37.8127 59.2943 28.0164 51.856 25.3184C44.4177 22.6205 35.6278 28.0425 32.2232 37.429C28.8187 46.8154 32.0887 56.6117 39.527 59.3097Z" stroke="#39A7BB" stroke-width="3" stroke-miterlimit="2.2561" stroke-linecap="round" stroke-linejoin="bevel"/><path d="M44.0746 44.7685C45.3063 45.2153 46.7406 44.376 47.2781 42.8939C47.8157 41.4118 47.253 39.8482 46.0212 39.4015C44.7895 38.9547 43.3552 39.794 42.8177 41.2761C42.2801 42.7581 42.8428 44.3217 44.0746 44.7685Z" stroke="#39A7BB" stroke-width="3" stroke-miterlimit="2.2561" stroke-linecap="round" stroke-linejoin="bevel"/></g><defs><clipPath id="clip0_4741_8860"><rect width="80" height="80" fill="white" transform="translate(0 0.938965)"/></clipPath></defs></svg>',
    title: "Personal Growth",
    description:
      "Set goals and track your progress over time with detailed metrics",
    iconBgColor: "bg-[#E0F2FE] w-[120px] h-[120px]",
    iconColor: "text-[#0EA5E9]",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81" fill="none"><path d="M40.0183 75.9476V64.2809M40.0183 7.61812V15.9515M40.004 7.60815C49.6846 9.56054 58.8535 11.5129 68.3373 15.4177C68.3373 28.9282 68.3373 31.0855 68.3373 36.8939C68.3373 57.3939 58.7198 70.7287 40.004 75.9415C21.2883 70.7287 11.6707 57.3939 11.6707 36.8939C11.6707 31.0855 11.6707 28.9282 11.6707 15.4177C21.1545 11.5129 30.3156 9.56054 40.004 7.60815ZM28.3366 40.8023H51.6699V54.4134H28.3366V40.8023ZM45.8333 40.8048H34.1667C34.1667 40.8048 34.1667 34.8665 34.1667 30.1088C34.1667 28.5623 34.779 27.0751 35.8728 25.989C36.9665 24.8911 38.4542 24.277 40 24.277C41.5458 24.277 43.0287 24.8911 44.1224 25.989C45.2162 27.0751 45.8333 28.5623 45.8333 30.1088C45.8333 34.8665 45.8333 40.8048 45.8333 40.8048Z" stroke="#3DD28C" stroke-width="3" stroke-miterlimit="1" stroke-linecap="round"/></svg>',
    title: "Privacy First",
    description: "Your data is encrypted and protected with enterprise-grade security",
    iconBgColor: "bg-[#DCFCE7] w-[120px] h-[120px]",
    iconColor: "text-[#16A34A]",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81" fill="none"><path d="M17.0483 62.6104H3.71503V75.9437H17.0483V62.6104Z" stroke="#4D84DF" stroke-width="3" stroke-miterlimit="2" stroke-linecap="round"/><path d="M37.0483 55.9373H23.715V75.9373H37.0483V55.9373Z" stroke="#4D84DF" stroke-width="3" stroke-miterlimit="2" stroke-linecap="round"/><path d="M57.0483 42.6028H43.715V75.9361H57.0483V42.6028Z" stroke="#4D84DF" stroke-width="3" stroke-miterlimit="2" stroke-linecap="round"/><path d="M77.0475 19.2927H63.7142V75.9595H77.0475V19.2927Z" stroke="#4D84DF" stroke-width="3" stroke-miterlimit="2" stroke-linecap="round"/><path d="M3.71014 46.3383C23.8604 46.3383 44.6819 32.8747 49.5435 5.94751" stroke="#4D84DF" stroke-width="3" stroke-miterlimit="2" stroke-linecap="round"/></svg>',
    title: "Progress Tracking",
    description: "Revisit the test periodically to track progress and see improvements over time",
    iconBgColor: "bg-[#EEF2FF] w-[120px] h-[120px]", 
    iconColor: "text-[#4F46E5]",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M53.7031 43.9326C53.7031 31.2389 42.4968 20.9375 28.7031 20.9375C14.9015 20.9375 3.70312 31.2389 3.70312 43.9326C3.70312 51.4493 7.69497 58.4946 14.3934 62.7898L12.5526 75.9375L22.2749 66.1595C24.3701 66.6746 26.5285 66.9281 28.7031 66.9281C42.4968 66.9281 53.7031 56.6262 53.7031 43.9326Z" stroke="#F19560" stroke-width="3" stroke-miterlimit="2" stroke-linecap="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M27.0597 29.3458C27.0597 17.3476 38.266 7.60498 52.0596 7.60498C65.8612 7.60498 77.0596 17.3476 77.0596 29.3458C77.0596 35.6196 73.9406 41.5901 68.4961 45.7235L72.8372 59.2716L61.0673 49.619C58.1943 50.5867 55.139 51.0786 52.0596 51.0786C38.266 51.0786 27.0597 41.3357 27.0597 29.3458Z" stroke="#F19560" stroke-width="3" stroke-miterlimit="2" stroke-linecap="round"/></svg>',
    title: "Community Support", 
    description: "Connect with others and share experiences in a safe environment",
    iconBgColor: "bg-[#FFF7ED] w-[120px] h-[120px]",
    iconColor: "text-[#EA580C]",
  },
];

const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center px-12 py-36 bg-white md:py-24 sm:py-16 sm:px-6">
      <h2 className="text-[40px] text-[#243757] text-center font-geologica leading-[48px] tracking-[-0.8px] mb-16 max-w-[800px] md:text-[36px] md:leading-[44px] sm:text-[32px] sm:leading-[40px]">
        The best platform to understand and improve your relationships
      </h2>
      <div className="flex flex-wrap justify-center items-start gap-12 max-w-[1400px] md:gap-8 sm:gap-6">
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
