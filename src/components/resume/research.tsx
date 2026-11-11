"use client"

import { ArrowUpRight } from "lucide-react"
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
                    const links = "links" in item ? item.links : []

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
                                {links.length > 0 ? (
                                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm print:hidden">
                                        {links.map((link) => (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
                                            >
                                                {localize(link, "label")}
                                                <ArrowUpRight
                                                    aria-hidden="true"
                                                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                ) : null}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </Section>
    )
}
