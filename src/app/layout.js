import { Inter, Abel } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Provider from "./components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VendorX",
  description: "Vendor Xadsdasdsa",
};

export const abel = Abel({
  family: "Abel",
  variants: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-abel",
  weight: ["400"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className="font-inter font-abel">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
