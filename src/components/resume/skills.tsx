"use client"

import { useResumeLocale } from "@/data/resume-locale";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

export const Skills = () => {
    const { labels } = useResumeLocale()

    return (
        <Section id="skills">
            <SectionHeading>{labels.skills}</SectionHeading>
            <div className="flex flex-wrap gap-2">
                {RESUME_DATA.skills.map((skill) => {
                    return (
                        <Badge variant="secondary" className="px-3 py-1 text-sm font-medium" key={skill}>
                            {skill}
                        </Badge>
                    );
                })}
            </div>
        </Section>
    );
};
