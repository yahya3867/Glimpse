import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400", "400"], // Regular and Italic
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Glimpse - 12-second videos that show what your product actually does",
  description:
    "Turn your startup's core feature into a sharp 12-second video for landing pages, socials, or demo day decks. AI-powered, cinematic, and instantly clear.",
  keywords: [
    "product videos",
    "startup marketing",
    "AI video generation",
    "demo videos",
    "landing page videos",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen bg-[#0a0a0a] antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
