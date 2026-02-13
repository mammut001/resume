"use client"

import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { useLanguageStore } from "@/store/useLanguageStore";
import { ProjectCard } from "./project-card";

export const Projects = () => {
    const language = useLanguageStore(state => state.name)

    return (
        <Section className="py-8 print-force-new-page scroll-mb-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6 border-b pb-2">Projects</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {RESUME_DATA.projects.map((project) => {
                    const title =
                        language === "french" ? project.title_fr : language === "chinese" ? project.title_cn
                            : project.title
                    const description =
                        language === "french" ? project.description_fr : language === "chinese" ? project.description_cn
                            : project.description

                    return (
                        <ProjectCard
                            key={title}
                            title={title}
                            description={description}
                            tags={project.techStack}
                            link={"link" in project ? project.link.href : undefined}
                            status={project.status}
                            index={project.index}
                        />
                    );
                })}
            </div>
        </Section>
    );
};
