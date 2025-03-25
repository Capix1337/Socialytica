import TestsCarousel from "./TestsCarousel";

export default function TestsSection() {
  return (
    <div className="flex flex-col overflow-hidden items-center justify-center">
      <div className="flex w-[1180px] max-w-full pt-36 pb-24 flex-col items-stretch justify-start md:pt-24">
        <h2 className="text-[#243757] text-center font-geologica text-[40px] font-normal leading-[48px] tracking-[-0.8px] self-center w-[800px] max-w-full">
          Science-Based Personality & Relationship Tests for Real, Actionable
          Insights
        </h2>

        <div className="overflow-x-auto flex mt-14 w-full flex-col items-stretch justify-start md:mt-10">
          <TestsCarousel />
        </div>
      </div>
    </div>
  );
}
