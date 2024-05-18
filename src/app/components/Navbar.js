import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black space-x-6 md:space-y-0 space-y-4 flex justify-end left-0 px-4 sm:px-6 lg:px-8 py-6">
      <Link href="/register" className="text-white">
        Sign Up
      </Link>
      <Link href="/login" className="text-white">
        Log In
      </Link>
    </nav>
  );
};

export default Navbar;
