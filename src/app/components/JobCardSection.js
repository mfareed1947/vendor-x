"use client";
import { useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Pagination,
} from "react-instantsearch-hooks-web";
import JobCard from "./JobCard";
import SidebarJob from "./SidebarJob";
import { useAuth } from "@/context/authContext";
import Cookies from "js-cookie";

const JobCardSection = ({ onSearch, setOnSearch }) => {
  // const { token } = useAuth();
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const Spinner = () => (
    <div className="mt-10 top-0 left-0 w-full h-full flex justify-center items-center ">
      <div className="flex fixed justify-center items-center w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  useEffect(() => {
    const searchBox = document.querySelector(".ais-SearchBox-input");
    if (onSearch) {
      searchBox.focus();
      setOnSearch((prevState) => !prevState);
    }
    setIsLoading(false);
  }, [onSearch, setOnSearch]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const Hit = ({ hit }) => {
    const isSelected = selectedCard && selectedCard.objectID === hit.objectID;

    return (
      <div
        className="h-[100%] "
        onClick={() => {
          setSelectedCard({
            objectID: hit.objectID,
            searchDescription: hit.search_description,
            solutionDescription: hit.solution_description,
            idealSolutionFeatures: hit.ideal_solution_features,
            problemGoal: hit.problem_goal,
            partnershipOpenness: hit.partnership_openness,
            vendorRequirements: hit.vendor_requirements,
            onboardingTimeline: hit.onboarding_timeline,
            companyHeadquarters: hit.company_headquarters_country,
            companyIndustry: hit.company_industry,
            jobTitle: hit.job_title,
            date: hit.date,
            serial: hit.serial,
          });
          setIsSidebarOpen(true);
        }}
      >
        <JobCard
          objectID={hit.objectID}
          isSelected={isSelected}
          searchStatus={
            <Highlight
              attribute="search_description"
              hit={hit}
              tagName="mark"
            />
          }
          searchTitle={
            <Highlight
              attribute="solution_description"
              hit={hit}
              tagName="mark"
            />
          }
          onboardingTimeline={
            <Highlight
              attribute="onboarding_timeline"
              hit={hit}
              tagName="mark"
            />
          }
          companyIndustry={
            <Highlight attribute="company_industry" hit={hit} tagName="mark" />
          }
          jobTitle={
            <Highlight attribute="job_title" hit={hit} tagName="mark" />
          }
          date={<Highlight attribute="date" hit={hit} tagName="mark" />}
          serial={<Highlight attribute="serial" hit={hit} tagName="mark" />}
        />
      </div>
    );
  };

  return (
    <div
      className={`bg-[#F1F1F1] mt-28 px-12 pb-10 ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <InstantSearch
        searchClient={searchClient}
        indexName={"vendor-sourcing_serial_dsc"}
      >
        <div className="relative flex justify-center  items-center ">
          <div className="absolute sm:top-[-30px] md:top-[-35px]">
            <SearchBox
              placeholder="Search Opportunities"
              classNames={{
                input:
                  "block border border-black w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1",
                root: "custom-searchbox",
              }}
            />
          </div>
        </div>
        <div className="bg-[#DADADA] mt-16 md:mt-28 w-[80%] mx-auto h-[2px]"></div>

        {isLoading ? (
          <Spinner />
        ) : (
          <Hits
            hitComponent={Hit}
            className={`${
              isSidebarOpen ? "w-[50%] md:w-[65%] lg:w-[74%]" : ""
            }`}
          />
        )}
        <SidebarJob
          isOpen={isSidebarOpen}
          data={selectedCard}
          onClose={() => {
            setIsSidebarOpen(false);
            setSelectedCard(null);
          }}
        />
        <div className="flex justify-center items-center mt-8">
          <Pagination
            classNames={{
              list: "list-none flex pl-0 rounded",
              item: "mx-1",
              selectedItem: "font-bold",
              link: "py-2 px-3 leading-tight bg-white border border-gray-300 hover:bg-gray-100 rounded text-[13px]",
            }}
          />
        </div>
      </InstantSearch>
    </div>
  );
};

export default JobCardSection;
