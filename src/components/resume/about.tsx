"use client"

import { useResumeLocale } from "@/data/resume-locale";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

export const About = () => {
    const { labels, localize } = useResumeLocale()
    const summary = localize(RESUME_DATA, "summary")

    return (
        <Section className="py-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4 border-b pb-2">{labels.about}</h2>
            <p className="text-pretty font-mono text-base text-muted-foreground leading-relaxed">
                {summary}
            </p>
        </Section>
    );
};
