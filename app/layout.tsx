import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import Dashboard from "./components/Dashboard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edgevanta Assessment",
  description: "Coding assessement using Next.js and Convex.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-200`}>
        <Dashboard />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
