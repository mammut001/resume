import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
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
    description: RESUME_DATA.summary,
    images: [RESUME_DATA.avatarUrl],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: RESUME_DATA.name,
  url: RESUME_DATA.personalWebsiteUrl,
  image: RESUME_DATA.avatarUrl,
  email: `mailto:${RESUME_DATA.contact.email}`,
  jobTitle: "Software Engineer",
  description: RESUME_DATA.summary,
  alumniOf: RESUME_DATA.education.map((education) => ({
    "@type": "CollegeOrUniversity",
    name: education.school,
  })),
  knowsAbout: RESUME_DATA.skills,
  sameAs: RESUME_DATA.contact.social.map((social) => social.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
