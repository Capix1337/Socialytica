import React from "react";

const steps = [
  {
    number: "1",
    title: "Take the Test",
    description:
      "Complete our scientifically designed relationship assessment questionnaire at your own pace",
    color: "bg-[#F9C87C]",
  },
  {
    number: "2",
    title: "Get Your Results",
    description:
      "Receive instant, detailed insights about your relationship patterns and tendencies",
    color: "bg-[#F28D82]",
  },
  {
    number: "3",
    title: "Track Progress",
    description:
      "Follow your development over time and see how your relationships improve",
    color: "bg-[#E56767]",
  },
];

const StepsComponent: React.FC = () => {
  return (
    <div className="py-16 min-h-screen" style={{ background: "linear-gradient(to bottom, #FFF2DE, #FFF2DE00)" }}>
    <div className="mb-12 md:mb-16 text-center">
        <h3 className="text-[#FC8E77] uppercase text-lg font-normal leading-[120%] mb-4 font-geologica">
          How Socialytica Works
        </h3>
        
        <h2 className="text-[#243757] text-3xl sm:text-4xl md:text-[40px] font-normal leading-[120%] tracking-[-0.8px] max-w-3xl mx-auto font-geologica">
          Start Your Journey in 3 Simple Steps
        </h2>
      </div>
      <div className="max-w-4xl mx-auto space-y-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-6 rounded-xl shadow-md space-x-6"
          >
            <div
              className={`w-16 h-16 ${step.color} text-white font-bold text-2xl flex items-center justify-center rounded-full`}
            >
              {step.number}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsComponent;
