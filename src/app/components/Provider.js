"use client";
import { AuthProvider } from "@/context/authContext";

const Provider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
export default Provider;
