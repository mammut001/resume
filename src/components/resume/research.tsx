"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Section, SectionHeading } from "@/components/ui/section"
import { RESUME_DATA } from "@/data/resume-data"
import { formatDateRange, useResumeLocale } from "@/data/resume-locale"

export const Research = () => {
    const { labels, localize } = useResumeLocale()

    if (RESUME_DATA.research.length === 0) {
        return null
    }

    return (
        <Section id="research">
            <SectionHeading>{labels.research}</SectionHeading>
            <div className="space-y-6">
                {RESUME_DATA.research.map((item) => {
                    const title = localize(item, "title")
                    const description = localize(item, "description")

                    return (
                        <Card key={item.title} className="break-inside-avoid border-none bg-transparent p-0 shadow-none">
                            <CardHeader className="space-y-2 p-0">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                                    <h3 className="text-base font-semibold leading-snug md:text-lg">{title}</h3>
                                    <div className="shrink-0 text-sm tabular-nums text-muted-foreground">
                                        {formatDateRange(item.start, item.end, labels.present)}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {item.tags.map((tag) => (
                                        <Badge
                                            variant="secondary"
                                            className="text-[11px] font-medium"
                                            key={tag}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="mt-3 p-0 leading-relaxed">
                                {description}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </Section>
    )
}
