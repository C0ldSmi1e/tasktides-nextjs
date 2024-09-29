import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import NavBar from "@/components/NavBar";

import "./globals.css";

const comicShanns2 = localFont({
  src: "./fonts/ComicShanns2.ttf",
  variable: "--font-comic-shanns2",
});

export const metadata: Metadata = {
  title: "Tasktides",
  description: "Tasktides",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`
        ${comicShanns2.variable} antialiased
        flex flex-col
        max-w-screen-lg
        mx-auto
        p-4
        `}
      >
        <NavBar />
        <div className="flex-1 pt-4">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
