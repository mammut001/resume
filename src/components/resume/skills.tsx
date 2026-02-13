"use client"

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

export const Skills = () => {
    return (
        <Section className="py-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6 border-b pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {RESUME_DATA.skills.map((skill) => {
                    return (
                        <Badge className="px-3 py-1 text-sm font-medium transition-colors hover:bg-primary/80" key={skill}>
                            {skill}
                        </Badge>
                    );
                })}
            </div>
        </Section>
    );
};
