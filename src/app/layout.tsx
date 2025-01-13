"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [useNewBranding, setUseNewBranding] = useState(false);

  useEffect(() => {
    const brandingSetting = localStorage.getItem("useNewBranding") === "true";
    setUseNewBranding(brandingSetting);
  }, []);

  useEffect(() => {
    document.title = useNewBranding ? "KHS Graduation Countdown" : "KJHS Graduation Countdown";
  }, [useNewBranding]);

  return (
    <html lang="en">
      <head>
        <meta name="description" content="A countdown to when the class of 2025 graduates." />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full relative`}
      >
        {children}
        {/* <footer className="absolute bottom-2 w-full text-center text-white text-xs opacity-30">
          This site is not affiliated with <a href="https://kehillah.org/" target="_blank" className="underline">Kehillah</a> nor <a href="https://kehillah.today/" target="_blank" className="underline">kehillah.today</a> and may not reflect most current dates.
          <br />
          &copy; 2025 <a href="https://github.com/beck1888" target="_blank" className="underline">Beck Orion</a>. | <a href="https://docs.google.com/forms/d/e/1FAIpQLSfvxpGIi-Gi2LJDD_VLIX3U3wmdFmX2pjhosUZGYhTnGpKZlQ/viewform?usp=header" target="_blank" className="underline">Contact</a> | This developer stands with <a href="https://www.standwithus.com/" target="_blank" className="underline">Israel</a>. 
          <Image src="/icons/israel.svg" alt="Israel flag" width={16} height={16} className="inline ml-1 align-text-bottom brightness-110" />
        </footer> */}
      </body>
    </html>
  );
}
