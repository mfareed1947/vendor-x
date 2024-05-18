import React from "react";

const SideBarText = ({ name, text, fontSize }) => {
  const textStyle = {
    fontSize: fontSize ? `${fontSize}px` : "12px",
  };
  return (
    <>
      <div className="mt-10">
        <div className="bg-[#DADADA] mx-auto mt-5 h-[2px]"></div>
        <p className="font-light mt-3">{name}</p>

        <div
          style={textStyle}
          className="flex flex-wrap mt-5 font-light tracking-wide text-[#626973]"
        >
          {text}
        </div>
      </div>
    </>
  );
};

export default SideBarText;
