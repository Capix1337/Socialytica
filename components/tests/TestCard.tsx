interface TestCardProps {
  iconSrc: string;
  iconBgColor: string;
  title: string;
  description: string;
  imageSrc: string;
}

export default function TestCard({
  iconSrc,
  iconBgColor,
  title,
  description,
  imageSrc,
}: TestCardProps) {
  return (
    <div className="min-w-[320px] w-[320px] rounded-[30px] bg-white overflow-hidden">
      <div className="w-full px-7 pr-12 py-8 md:px-5 md:pr-5">
        <div
          className="flex justify-center items-center rounded-full w-[72px] h-[72px]"
          style={{ backgroundColor: iconBgColor }}
        >
          <img
            src={iconSrc}
            alt=""
            className="w-9 h-9 object-contain object-center my-auto"
          />
        </div>

        <div className="mt-5 w-full font-geologica">
          <h3 className="w-full text-2xl text-[#171717] font-normal tracking-[-0.48px] leading-8">
            {title}
          </h3>
          <p className="mt-1 w-full text-base text-[#525252] font-light tracking-[-0.16px] leading-[23px]">
            {description}
          </p>
        </div>
      </div>

      <div className="flex mt-[7px] h-[200px] w-full flex-col overflow-hidden items-stretch justify-center">
        <img
          src={imageSrc}
          alt=""
          className="aspect-[1.51] object-contain object-center w-full"
        />
      </div>
    </div>
  );
}
