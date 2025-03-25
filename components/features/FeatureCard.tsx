import React from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="flex flex-col items-start p-6 gap-5 min-w-[280px] max-w-[320px] flex-1 rounded-[30px]">
      <div
        className={`flex justify-center items-center w-16 h-16 rounded-full ${iconBgColor}`}
      >
        <div
          className={`w-8 h-8 ${iconColor}`}
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-2xl text-[#171717] font-geologica leading-8 tracking-[-0.48px]">
          {title}
        </div>
        <div className="text-lg text-[#525252] font-geologica font-light leading-[26px] tracking-[-0.36px]">
          {description}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
