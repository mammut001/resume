
"use client"

import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { formatDateRange, useResumeLocale } from "@/data/resume-locale";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export const Research = () => {
    const { labels, localize } = useResumeLocale()

    return (
        <Section className="py-8 print-force-new-page scroll-mb-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6 border-b pb-2">{labels.research}</h2>

            <div className="space-y-6">
                {[...RESUME_DATA.research].reverse().map((item) => {
                    const title = localize(item, "title")
                    const description = localize(item, "description")

                    return (
                        <Card key={title} className="border-none shadow-none bg-transparent p-0">
                            <CardHeader className="p-0 space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <h3 className="text-lg font-semibold leading-none hover:underline">
                                        {item.link ? (
                                            <a href={item.link.href} target="_blank" rel="noopener noreferrer">
                                                {title}
                                            </a>
                                        ) : (
                                            <span>{title}</span>
                                        )}
                                    </h3>
                                    <div className="text-sm font-medium tabular-nums text-muted-foreground">
                                        {formatDateRange(item.start, item.end, labels.present)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="flex gap-1">
                                        {item.tags.map((tag) => (
                                            <Badge
                                                variant="secondary"
                                                className="align-middle text-xs"
                                                key={tag}
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="mt-3 text-sm text-muted-foreground leading-relaxed p-0">
                                {description}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </Section>
    );
};
