import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/contexts/auth";

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
    <html lang="en" className="h-full">
      <body
        className={`
        ${comicShanns2.variable} antialiased
        flex flex-col
        max-w-screen-lg
        mx-auto
        p-4
        min-h-full
        `}
      >
        <AuthProvider>
          <NavBar />
          <div className="flex-grow flex flex-col">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
