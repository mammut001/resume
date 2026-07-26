"use client"

import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { useResumeLocale } from "@/data/resume-locale";

export const Coursework = () => {
  const { labels, localize } = useResumeLocale();

  if (RESUME_DATA.coursework.length === 0) {
    return null;
  }

  return (
    <Section className="py-8 print:hidden scroll-mb-16">
      <div className="border-b pb-2">
        <h2 className="text-2xl font-bold tracking-tight">{labels.coursework}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{labels.courseworkIntro}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {RESUME_DATA.coursework.map((course) => {
          const title = localize(course, "title");
          const term = localize(course, "term");
          const description = localize(course, "description");

          return (
            <Card
              className="flex h-full flex-col border bg-muted/30 p-4 shadow-none transition-colors hover:bg-muted/50"
              key={course.code}
            >
              <CardHeader className="p-0">
                <div className="flex items-start justify-between gap-3">
                  <Badge className="shrink-0" variant="secondary">
                    {course.code}
                  </Badge>
                  <span className="text-right text-xs tabular-nums text-muted-foreground">
                    {term}
                  </span>
                </div>
                <h3 className="pt-2 text-base font-semibold leading-snug">{title}</h3>
              </CardHeader>
              <CardContent className="mt-3 flex flex-1 flex-col p-0 font-sans text-sm leading-relaxed">
                <p>{description}</p>
                <a
                  className="mt-4 inline-flex w-fit items-center gap-1 text-xs font-medium text-foreground underline-offset-4 hover:underline"
                  href={course.sourceUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {labels.officialCourseDescription}
                  <ExternalLink aria-hidden="true" className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};
