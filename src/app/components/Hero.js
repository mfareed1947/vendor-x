import React from "react";

const Hero = ({ heading, description }) => {
  return (
    <div className="flex items-center justify-center flex-col pb-32 bg-black text-white">
      <p className=" text-[30px] sm:text-[40px] md:text-[60px] lg:text-[72px] w-[90%] sm:w-[90%]  lg:w-[60%] 2xl:w-[60%] md:leading-[80px] leading-10 tracking-tight  text-center mt-24 font-normal ">
        {heading}
      </p>
      <p className="text-white font-normal w-[90%] sm:w-[80%] md:w-[90%] lg:w-[60%] text-[14px] sm:text-[16px] md:text-[19px] lg:text-[24px] mt-11 leading-0 lg:leading-[32px] tracking-normal text-center">
        {description}
      </p>
    </div>
  );
};

export default Hero;
