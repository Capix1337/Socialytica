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
    <div className="flex flex-col items-start p-8 gap-6 min-w-[320px] max-w-[420px] basis-[calc(33.33%-32px)] rounded-[30px] md:min-w-[300px] sm:basis-full">
      <div
        className={`flex justify-center items-center rounded-full ${iconBgColor}`}
      >
        <div
          className={`flex items-center justify-center w-[80px] h-[80px] ${iconColor}`}
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      </div>
      <div className="flex flex-col gap-2">
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
