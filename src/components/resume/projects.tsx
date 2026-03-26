"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Badge } from "@/components/ui/badge";

export const Projects = () => {
    const language = useLanguageStore(state => state.name)

    return (
        <Section className="py-8 print-force-new-page scroll-mb-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6 border-b pb-2">Projects</h2>

            <div className="space-y-6">
                {[...RESUME_DATA.projects].reverse().map((project) => {
                    const title =
                        language === "french" ? project.title_fr : language === "chinese" ? project.title_cn
                            : project.title
                    const description =
                        language === "french" ? project.description_fr : language === "chinese" ? project.description_cn
                            : project.description

                    return (
                        <Card key={title} className="border-none shadow-none bg-transparent p-0">
                            <CardHeader className="p-0 space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <h3 className="text-lg font-semibold leading-none hover:underline">
                                        {"link" in project ? (
                                            <a href={project.link.href} target="_blank" rel="noopener noreferrer">
                                                {title}
                                            </a>
                                        ) : (
                                            <span>{title}</span>
                                        )}
                                    </h3>
                                    <div className="text-sm font-medium tabular-nums text-muted-foreground flex items-center gap-2">
                                        {project.status === 1 ? (
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                        ) : (
                                            <span className="h-2 w-2 rounded-full bg-orange-500" />
                                        )}
                                        <span className="text-xs uppercase tracking-wider font-mono opacity-80">
                                            {project.status === 1 ? "Active" : "Archived"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {project.techStack.map((tag) => (
                                        <Badge
                                            variant="secondary"
                                            className="align-middle text-[10px] font-mono"
                                            key={tag}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
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
