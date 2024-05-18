"use client";
import React, { useEffect, useState, useRef } from "react";
import VendorCard from "./VendorCard";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Pagination,
} from "react-instantsearch-hooks-web";
import SidebarVendor from "./SidebarVendor";

const CardSection = ({ onSearch, setOnSearch }) => {
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

  const toggleSearchFocus = () => {
    setOnSearch((prevState) => !prevState);
  };

  useEffect(() => {
    const searchBox = document.querySelector(".ais-SearchBox-input");
    if (onSearch) {
      searchBox.focus();
      toggleSearchFocus();
    }
  });

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
        className="h-[100%]"
        onClick={() => {
          setSelectedCard({
            companyName: hit.company_name,
            description: hit.company_description,
            countries: hit.headquarters_country,
            companySize: hit.company_size,
            services: hit.services,
            primaryIndustries: hit.primary_industries,
            primaryGeographies: hit.primary_geographies,
            coreFeaturesKeywords: hit.core_features_keywords,
            company_logo: `https://vendors-list.s3.us-east-1.amazonaws.com/${hit.company_logo}`,
          });
          setIsSidebarOpen(true);
        }}
      >
        <VendorCard
          objectID={hit.objectID}
          isSelected={isSelected}
          imageUrl={`https://vendors-list.s3.us-east-1.amazonaws.com/${hit.company_logo}`}
          companyName={
            <Highlight attribute="company_name" hit={hit} tagName="mark" />
          }
          countries={
            <Highlight
              attribute="headquarters_country"
              hit={hit}
              tagName="mark"
            />
          }
          description={
            <Highlight
              attribute="company_description"
              hit={hit}
              tagName="mark"
            />
          }
        />
      </div>
    );
  };

  return (
    <div
      className={`bg-[#F1F1F1] px-12 pb-10  ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_VENDER_LIST}
      >
        <div className="  relative flex justify-center   items-center ">
          <div className="absolute sm:top-[-30px] md:top-[-35px]">
            <SearchBox
              placeholder="Search for vendors"
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
              isSidebarOpen ? "w-[50%]  md:w-[65%] lg:w-[74%]" : ""
            }`}
          />
        )}
        <SidebarVendor
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
              selectedItem: "font-bold ",
              link: "py-2 px-3 leading-tight bg-white border border-gray-300 hover:bg-gray-100 rounded text-[13px]",
            }}
          />
        </div>
      </InstantSearch>
    </div>
  );
};

export default CardSection;
