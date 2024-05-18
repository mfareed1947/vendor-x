"use client";
import React, { useEffect, useState } from "react";
import SideBarTags from "./SideBarTags";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { searchingIndex } from "../../../lib/algolia";
import SideBarText from "./SideBarText";

const SidebarJob = ({ isOpen, data, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async () => {
    setIsLoading(true);

    const dataId = data?.objectID;
    if (dataId) {
      const record = {
        ...data,
        jobId: [dataId],
      };

      try {
        await searchingIndex.saveObject(record);
        console.log("Data added to Algolia successfully", record);

        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("id", dataId);
        router.push("https://tally.so/r/3EX5BB");
      } catch (error) {
        console.error("Error adding data to Algolia:", error);
      }
    } else {
      console.error("Data ID is missing");
    }
  };

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
          className="fixed inset-0 z-50 bg-black bg-opacity-70 overflow-y-hidden"
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
            <span className="flex absolute right-0 top-0 mr-4 mt-4  border shadow-md rounded-full px-2 py-1 ">
              {data.serial}
            </span>
            <p className="text-[29px] mt-4 tracking-wide">
              {data.solutionDescription}
            </p>
            {/* <p className="text-[18px] mt-5 font-semibold tracking-wide text-[#626973]">
              {data.searchDescription}
            </p> */}
            <SideBarText
              name="Search Status"
              text={data.searchDescription}
              fontSize="20"
            />
            <SideBarText
              name="Description of Solution Buyer is Seeking"
              text={data.solutionDescription}
            />
            <SideBarTags
              name="Key Features buyers is seeking"
              tags={data.idealSolutionFeatures}
            />
            <SideBarText
              name="Problem buyer is aiming to solve or goal they are trying to achieve"
              text={data.problemGoal}
            />
            <SideBarText
              name="Minimum vendor requirements"
              text={data.vendorRequirements}
            />
            <SideBarTags
              name="Search timeline"
              tags={data.onboardingTimeline}
            />
            <SideBarTags
              name="Country Location"
              tags={data.companyHeadquarters}
            />
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="text-[13px] md:text-[18px] text-white bg-black px-3 md:px-6 py-1 md:py-3 border-none rounded-md leading-[18px] tracking-wide mt-9 flex items-center justify-center"
          disabled={isLoading}
        >
          <span className="flex items-center justify-center">
            Apply to Join
            {isLoading && (
              <span className="inline-block w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin ml-2"></span>
            )}
          </span>
        </button>
      </div>
    </>
  );
};

export default SidebarJob;
