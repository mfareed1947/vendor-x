import React from "react";

const CardTag = ({ country }) => {
  return (
    <div
      key={country}
      className="border border-[#DBDBDB] rounded-lg mx-[2px] my-[1px] text-[10px] text-[#747672] text-center  p-1"
    >
      <p>{country}</p>
    </div>
  );
};

export default CardTag;
