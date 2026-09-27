"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { useResumeLocale } from "@/data/resume-locale";
import { useTheme } from "next-themes";
import { Component, type ReactNode, useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

// Hides the whole section when the GitHub contributions request fails.
class HideOnError extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

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

  return (
    <HideOnError>
      <Section id="github" className="print:hidden">
        <SectionHeading>{labels.githubContributions}</SectionHeading>
        <div className="flex min-h-[168px] justify-center overflow-x-auto rounded-lg border bg-card p-4">
          {mounted ? (
            <GitHubCalendar
              username={githubUsername}
              colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
              blockSize={11}
              fontSize={12}
              throwOnError
            />
          ) : null}
        </div>
      </Section>
    </HideOnError>
  );
}
