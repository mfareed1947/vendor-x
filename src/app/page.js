"use client";
import { metadata } from "../app/components/metadata"; // Adjust the path as necessary
import Hero from "./components/Hero";
import JobCardSection from "./components/JobCardSection";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/authContext";
import Provider from "./components/Provider";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ToastContainer />

      <Hero
        heading="Discover Your Next Sales Opportunity"
        description="Below are descriptions of open searches, challenges, and areas of interest from real B2B prospects. Search opportunities and submit information to put your solution in front of potential buyers."
      />
      <JobCardSection />
      {/* <Register /> */}
    </div>
  );
}
