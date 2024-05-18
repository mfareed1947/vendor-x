"use client";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import VendorCardSection from "../components/VendorCardSection";
import { useState } from "react";

const Page = () => {
  const [onSearch, setOnSearch] = useState(false);

  return (
    <>
      {/* <Navbar /> */}
      <Hero
        heading="Search & Discover Vendors for your Business Needs"
        description="Search the referral and invite-only vendor database to discovery specialist vendors across industries such as financial technology, climate solutions, specialized data, and more."
      />
      <VendorCardSection onSearch={onSearch} setOnSearch={setOnSearch} />
    </>
  );
};

export default Page;
