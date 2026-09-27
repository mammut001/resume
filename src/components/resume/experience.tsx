"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { formatDateRange, useResumeLocale } from "@/data/resume-locale";

export const Experience = () => {
    const { labels, localize } = useResumeLocale()

    return (
        <Section id="experience">
            <SectionHeading>{labels.workExperience}</SectionHeading>
            <div className="space-y-6">
                {RESUME_DATA.work.map((work) => {
                    const workDescription = localize(work, "description")
                    const title = localize(work, "title")
                    const location = localize(work, "location")

                    return (
                        <Card key={`${work.company}-${work.start}`} className="break-inside-avoid border-none bg-transparent p-0 shadow-none">
                            <CardHeader className="space-y-1.5 p-0">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                                    <h3 className="text-base font-semibold leading-snug md:text-lg">
                                        {work.link ? (
                                            <a
                                                href={work.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline-offset-4 hover:underline"
                                            >
                                                {work.company}
                                            </a>
                                        ) : (
                                            work.company
                                        )}
                                    </h3>
                                    <div className="shrink-0 text-sm tabular-nums text-muted-foreground">
                                        {formatDateRange(work.start, work.end, labels.present)}
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                                    <span className="font-medium text-foreground/80">{title}</span>
                                    {work.badges.map((badge) => (
                                        <Badge variant="secondary" className="text-[11px] font-medium" key={badge}>
                                            {badge}
                                        </Badge>
                                    ))}
                                    {location ? (
                                        <span className="text-muted-foreground">· {location}</span>
                                    ) : null}
                                </div>
                            </CardHeader>
                            <CardContent className="mt-2 p-0 leading-relaxed">
                                {workDescription}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </Section>
    );
};
