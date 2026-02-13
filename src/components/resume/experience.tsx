"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { useLanguageStore } from "@/store/useLanguageStore";

export const Experience = () => {
    const language = useLanguageStore(state => state.name)

    return (
        <Section className="py-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6 border-b pb-2">Work Experience</h2>
            <div className="space-y-6">
                {RESUME_DATA.work.map((work) => {
                    const workDescription =
                        language === "french" ? work.description_fr : language === "chinese" ? work.description_cn
                            : work.description
                    const title =
                        language === "french" ? work.title_fr : language === "chinese" ? work.title_cn
                            : work.title

                    return (
                        <Card key={work.company} className="border-none shadow-none bg-transparent p-0">
                            <CardHeader className="p-0 space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <h3 className="text-lg font-semibold leading-none hover:underline">
                                        <a href={work.link} target="_blank" rel="noopener noreferrer">
                                            {work.company}
                                        </a>
                                    </h3>
                                    <div className="text-sm font-medium tabular-nums text-muted-foreground">
                                        {work.start} - {work.end ?? "Present"}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-mono text-sm leading-none text-foreground/80 font-medium">
                                        {title}
                                    </h4>
                                    <span className="flex gap-1">
                                        {work.badges.map((badge) => (
                                            <Badge
                                                variant="secondary"
                                                className="align-middle text-xs"
                                                key={badge}
                                            >
                                                {badge}
                                            </Badge>
                                        ))}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="mt-3 text-sm text-muted-foreground leading-relaxed p-0">
                                {workDescription}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </Section>
    );
};
