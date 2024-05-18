"use client";
import React, { useEffect } from "react";
import SideBarTags from "./SideBarTags";
import Image from "next/image";

const SidebarVendor = ({ isOpen, data, onClose }) => {
  const toggleBodyOverflow = (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  useEffect(() => {
    toggleBodyOverflow(isOpen);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-70"
          onClick={() => {
            onClose();
            toggleBodyOverflow(false);
          }}
        />
      )}
      <div
        className={`fixed top-0 right-0 z-50 w-[19rem] md:w-[20rem] lg:w-96 px-9 py-5 h-screen overflow-y-auto bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button className="text-blue-950 font-bold" onClick={onClose}>
          <Image
            src="/sidebar/cancel-3.svg"
            alt="Search"
            width={18}
            height={20}
            className="cursor-pointer"
          />
        </button>
        {data && (
          <div className="mt-2">
            {data.company_logo && (
              <img
                src={data.company_logo}
                className="bg-gray-500 w-full mt-6 rounded-2xl bg-center bg-cover"
                alt="company logo"
              />
            )}
            <p className="text-[29px] mt-2 tracking-wide">{data.companyName}</p>
            <p className="text-[20px] mt-1 font-light">Country</p>
            <p className="text-[12px] mt-5 font-light tracking-wide text-[#626973]">
              {data.description}
            </p>
            <SideBarTags name="Services" tags={data.services} />
            <SideBarTags
              name="Primary Geographies"
              tags={data.primaryGeographies}
            />
            <SideBarTags
              name="Primary Industries"
              tags={data.primaryIndustries}
            />
            <SideBarTags name="Features" tags={data.coreFeaturesKeywords} />
            <SideBarTags name="Customer size" tags={data.companySize} />
          </div>
        )}
        <button className="text-[13px] md:text-[18px] text-white bg-black px-3 md:px-6 py-1 md:py-3 border-none rounded-md leading-[18px] tracking-wide mt-9">
          Get In Touch
        </button>
      </div>
    </>
  );
};

export default SidebarVendor;
