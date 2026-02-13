"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { useLanguageStore } from "@/store/useLanguageStore";

export const Education = () => {
    const language = useLanguageStore(state => state.name)

    return (
        <Section className="py-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6 border-b pb-2">Education</h2>
            <div className="space-y-4">
                {RESUME_DATA.education.map((education) => {
                    const schoolName =
                        language === "french" ? education.school_fr : language === "chinese" ? education.school_cn
                            : education.school
                    const degree =
                        language === "french" ? education.degree_fr : language === "chinese" ? education.degree_cn
                            : education.degree

                    return (
                        <Card key={schoolName} className="border-none shadow-none bg-transparent p-0">
                            <CardHeader className="p-0">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                    <h3 className="font-semibold leading-none text-base">
                                        {schoolName}
                                    </h3>
                                    <div className="text-sm tabular-nums text-muted-foreground">
                                        {education.start} - {education.end}
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
