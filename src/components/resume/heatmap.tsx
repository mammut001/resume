"use client";

/* eslint-disable @next/next/no-img-element */

import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { useResumeLocale } from "@/data/resume-locale";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Heatmap() {
  const { labels } = useResumeLocale();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Use the GitHub username from resume data
  const githubUsername = RESUME_DATA.contact.social.find(s => s.name === "GitHub")?.url.split("/").pop() || "mammut001";

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // We can use different colors based on the theme
  // For ghchart, we can pass a color hex.
  // Default green: https://ghchart.rshah.org/40c463/mammut001
  const color = resolvedTheme === "dark" ? "40c463" : "216e39";

  return (
    <Section className="print-force-visible">
      <h2 className="text-xl font-bold">{labels.githubContributions}</h2>
      <div className="mt-4 overflow-hidden rounded-lg border bg-card p-4 shadow-sm">
        <img
          src={`https://ghchart.rshah.org/${color}/${githubUsername}`}
          alt={`${githubUsername}'s GitHub Contributions`}
          className="h-auto w-full object-contain filter dark:brightness-110 lg:h-[120px]"
          loading="lazy"
        />
      </div>
    </Section>
  );
}
