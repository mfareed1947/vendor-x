import React, { useState } from "react";
import CardTag from "./CardTag";
import propTypes from "prop-types";

const Card = ({
  objectID,
  imageUrl,
  companyName,
  description,
  countries,
  isSelected,
}) => {
  const { headquarters_country } = countries?.props?.hit;
  const [imageSelected, setImageSelected] = useState("");

  return (
    <div
      key={objectID}
      className={`border border-[#DADADA] cursor-pointer ${
        isSelected ? "bg-[#C7C7C7]" : " bg-white"
      } rounded-3xl px-4 py-5 shadow-md w-[100%] h-full min-h-[290px] sm:min-h-[360px]`}
    >
      <div className="relative bg-[#D9D9D9] rounded-xl overflow-hidden w-28 h-16">
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(event) => setImageSelected(event.target.files[0])}
        />
        <img
          src={imageUrl}
          className="absolute inset-0 bg-center bg-cover"
          alt="company logo"
        />
      </div>

      <p className="text-[20px] font-normal mt-4 leading-[22px]">
        {companyName}
      </p>
      <p className="text-[#626973] leading-[25px] text-[15px] mt-3 w-[93%] font-normal">
        {description}
      </p>
      <p className="text-[15px] font-bold leading-[13px] mt-5">Country</p>

      <div className="mt-5 flex flex-wrap ">
        {headquarters_country &&
          Array(headquarters_country).map((currElem) => {
            return currElem.map(({ label, value }) => (
              <CardTag key={label} country={value} />
            ));
          })}
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  imageUrl: propTypes.string,
  companyName: propTypes.string,
  description: propTypes.string,
  countries: propTypes.array,
};
