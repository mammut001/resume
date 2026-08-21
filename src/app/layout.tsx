import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import React from "react";
import { RESUME_DATA } from "@/data/resume-data";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://cv.paytonpei.top"),
  title: {
    default: `${RESUME_DATA.name} — Software Engineer`,
    template: `%s | ${RESUME_DATA.name}`,
  },
  description: RESUME_DATA.summary,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${RESUME_DATA.name} — Software Engineer`,
    description: RESUME_DATA.summary,
    url: "https://cv.paytonpei.top",
    siteName: `${RESUME_DATA.name} — Resume & Portfolio`,
    type: "profile",
    images: [RESUME_DATA.avatarUrl],
  },
  twitter: {
    card: "summary",
    title: `${RESUME_DATA.name} — Software Engineer`,
    description: RESUME_DATA.about,
    images: [RESUME_DATA.avatarUrl],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
