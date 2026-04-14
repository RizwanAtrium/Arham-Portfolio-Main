import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { NoiseOverlay } from "@/components/shared/noise-overlay";
import { siteSettings } from "@/lib/site-data";

import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const monoFont = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: siteSettings.title,
  description: siteSettings.description,
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} bg-[var(--color-bg)] text-[var(--color-fg)] antialiased`}
      >
        <NoiseOverlay />
        <CustomCursor />
        <Header />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
