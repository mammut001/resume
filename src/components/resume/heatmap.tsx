"use client";

import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { useResumeLocale } from "@/data/resume-locale";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export function Heatmap() {
  const { labels } = useResumeLocale();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const githubUsername =
    RESUME_DATA.contact.social
      .find((social) => social.name === "GitHub")
      ?.url.split("/")
      .pop() || "mammut001";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Section className="print-force-visible">
      <h2 className="text-xl font-bold">{labels.githubContributions}</h2>
      <div className="mt-4 flex justify-center overflow-hidden rounded-lg border bg-card p-4 shadow-sm">
        <GitHubCalendar
          username={githubUsername}
          colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
        />
      </div>
    </Section>
  );
}
