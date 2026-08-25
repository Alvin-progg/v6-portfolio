import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// --- Active font: Geist (placeholder until Satoshi files land) ---
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

import localFont from "next/font/local";
const satoshi = localFont({
 variable: "--font-satoshi",
src: [
{ path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
{ path: "./fonts/Satoshi-Medium.woff2",  weight: "500", style: "normal" },
{ path: "./fonts/Satoshi-Bold.woff2",    weight: "600", style: "normal" },
],
});


export const metadata: Metadata = {
  title: "Alvin Aloya",
  description: "Personal website of Alvin Aloya",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
