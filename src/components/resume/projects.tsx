"use client"

import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { useResumeLocale } from "@/data/resume-locale";
import { Badge } from "@/components/ui/badge";

export const Projects = () => {
    const { labels, localize } = useResumeLocale()

    return (
        <Section id="projects">
            <SectionHeading>{labels.projects}</SectionHeading>

            <div className="space-y-4">
                {RESUME_DATA.projects.map((project) => {
                    const title = localize(project, "title")
                    const description = localize(project, "description")
                    const isActive = project.status === 1
                    const statusLabel = isActive ? labels.active : labels.archived
                    const projectLink = "link" in project ? project.link : undefined

                    return (
                        <Card
                            key={project.title}
                            className="break-inside-avoid border bg-transparent p-4 shadow-none transition-colors hover:bg-muted/40 print:border-none print:p-0"
                        >
                            <CardHeader className="space-y-2 p-0">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                                    <h3 className="text-base font-semibold leading-snug md:text-lg">
                                        {projectLink?.href ? (
                                            <a
                                                href={projectLink.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group inline-flex items-center gap-1 underline-offset-4 hover:underline"
                                            >
                                                {title}
                                                <ArrowUpRight
                                                    aria-hidden="true"
                                                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 print:hidden"
                                                />
                                            </a>
                                        ) : (
                                            title
                                        )}
                                    </h3>
                                    <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground print:hidden">
                                        {projectLink?.href ? (
                                            <span className="font-medium">{localize(projectLink, "label")}</span>
                                        ) : null}
                                        <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider">
                                            <span
                                                aria-hidden="true"
                                                className={`size-2 rounded-full ${isActive ? "bg-green-500" : "bg-orange-500"}`}
                                            />
                                            {statusLabel}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {project.techStack.map((tag) => (
                                        <Badge variant="secondary" className="text-[11px] font-medium" key={tag}>
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="mt-3 p-0 leading-relaxed">
                                {description}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </Section>
    );
};
