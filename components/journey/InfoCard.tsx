import { CircleIcon } from "./CircleIcon";

interface InfoCardProps {
    title: string;
    description: string;
    circleColor: string;
    className?: string;
  }
  
  export const InfoCard: React.FC<InfoCardProps> = ({
    title,
    description,
    circleColor,
    className = "",
  }) => {
    return (
      <article
        className={`flex flex-col justify-center items-center px-32 py-24 w-full bg-white shadow-2xl rounded-[30px] max-md:px-16 max-md:py-20 max-sm:px-6 max-sm:py-12 ${className}`}
      >
        <div className="flex gap-12 items-center w-full max-sm:flex-col max-sm:gap-6 max-sm:text-center">
          <CircleIcon color={circleColor} />
          <div className="grow">
            <h2 className="mb-3 text-4xl font-light tracking-normal text-neutral-900 max-md:text-3xl max-sm:text-3xl">
              {title}
            </h2>
            <p className="text-base font-light tracking-normal leading-normal text-neutral-600 max-sm:text-sm">
              {description}
            </p>
          </div>
        </div>
      </article>
    );
  };
  