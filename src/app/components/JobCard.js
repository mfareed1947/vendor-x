import React, { useState } from "react";
import CardTag from "./CardTag";
import propTypes from "prop-types";

const JobCard = ({
  searchStatus,
  searchTitle,
  onboardingTimeline,
  companyIndustry,
  isSelected,
  jobTitle,
  date,
  serial,
  objectID,
}) => {
  const { onboarding_timeline } = onboardingTimeline?.props?.hit;

  return (
    <div
      key={objectID}
      className={`border border-[#DADADA] cursor-pointer ${
        isSelected ? "bg-[#C7C7C7]" : " bg-white"
      } rounded-3xl px-4 py-5 shadow-md w-[100%] h-full min-h-[290px] sm:min-h-[300px] relative`}
    >
      <span className="flex absolute right-0 top-0 mr-4 mt-4  border shadow-md rounded-full px-2 py-1 ">
        {serial}
      </span>
      <p className="text-[20px] font-normal mt-12 leading-[29px]">
        {searchTitle}
      </p>
      <p className="text-[19px] font-normal mt-5">
        Industry:
        <span className="text-[#626973] leading-[25px] text-[17px] mt-10 ml-2  font-normal">
          {companyIndustry}
        </span>
      </p>
      <p className="text-[19px] font-normal mt-1">
        Title:
        <span className="text-[#626973] leading-[25px] text-[17px] mt-10 ml-2 font-normal">
          {jobTitle}
        </span>
      </p>
      <p className="text-[15px] leading-[13px] mt-5">Search Status:</p>
      <p className="text-[#626973] leading-[25px] text-[15px] mt-2 w-[93%] font-normal">
        {searchStatus}
      </p>
      <p className="text-[15px] leading-[13px] mt-6">Search Timeline:</p>
      <div className="mt-3 flex flex-wrap mb-11">
        <CardTag country={onboarding_timeline} />
      </div>
      <span className="flex absolute right-0 bottom-0 mr-4 text-[14px]  mt-4 p-2 mb-3 ">
        Date Published:
        <span className="text-[#626973]  text-[14px] ml-2 font-normal">
          {date}
        </span>
      </span>
    </div>
  );
};

export default JobCard;

JobCard.propTypes = {
  heading: propTypes.string,
  description: propTypes.string,
  tags: propTypes.array,
};
