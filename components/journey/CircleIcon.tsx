interface CircleIconProps {
    color: string;
  }
  
  export const CircleIcon: React.FC<CircleIconProps> = ({ color }) => {
    return (
      <div
        className={`flex shrink-0 justify-center items-center ${color} rounded-full h-[140px] w-[140px] max-sm:h-[100px] max-sm:w-[100px]`}
      />
    );
  };
  