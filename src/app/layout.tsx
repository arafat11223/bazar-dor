import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import PriceTicker from "../components/layout/PriceTicker";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <PriceTicker />
        {children}
      </body>
    </html>
  );
}