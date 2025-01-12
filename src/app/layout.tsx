"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";

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
    // Fetch the branding setting from local storage or a global state
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
