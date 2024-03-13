"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <body
        className={`${inter.className} bg-zinc-200 text-black dark:bg-zinc-500 dark:text-zinc-200`}
      >
        <Dashboard />
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <div
          className="flex justify-center align-middle cursor-pointer items-center text-center fixed right-4 bottom-4 w-16 h-16 bg-zinc-500 text-white dark:bg-white dark:text-black hover:bg-zinc-400 dark:hover:bg-zinc-400 transition-all duration-300"
          style={{ borderRadius: "100%" }}
          onClick={() => toggleDarkMode()}
        >
          {isDarkMode ? "DRK" : "LHT"}
        </div>
      </body>
    </html>
  );
}
