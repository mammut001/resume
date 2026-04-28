"use client"

import { formatDateRange, useResumeLocale } from "@/data/resume-locale";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

export const Education = () => {
    const { labels, localize } = useResumeLocale()

    return (
        <Section className="py-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6 border-b pb-2">{labels.education}</h2>
            <div className="space-y-4">
                {[...RESUME_DATA.education].reverse().map((education) => {
                    const schoolName = localize(education, "school")
                    const degree = localize(education, "degree")

                    return (
                        <Card key={schoolName} className="border-none shadow-none bg-transparent p-0">
                            <CardHeader className="p-0">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                    <h3 className="font-semibold leading-none text-base">
                                        {schoolName}
                                    </h3>
                                    <div className="text-sm tabular-nums text-muted-foreground">
                                        {formatDateRange(education.start, education.end, labels.present)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="mt-1 text-sm text-muted-foreground prose dark:prose-invert p-0">
                                {degree}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </Section>
    );
};
