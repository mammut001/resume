"use client"

import { formatDateRange, useResumeLocale } from "@/data/resume-locale";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

export const Education = () => {
    const { labels, localize } = useResumeLocale()

    return (
        <Section id="education">
            <SectionHeading>{labels.education}</SectionHeading>
            <div className="space-y-4">
                {RESUME_DATA.education.map((education) => {
                    const schoolName = localize(education, "school")
                    const degree = localize(education, "degree")

                    return (
                        <Card key={education.school} className="break-inside-avoid border-none bg-transparent p-0 shadow-none">
                            <CardHeader className="p-0">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                                    <h3 className="text-base font-semibold leading-snug">
                                        {schoolName}
                                    </h3>
                                    <div className="shrink-0 text-sm tabular-nums text-muted-foreground">
                                        {formatDateRange(education.start, localize(education, "end"), labels.present)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="mt-1 p-0">
                                {degree}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </Section>
    );
};
