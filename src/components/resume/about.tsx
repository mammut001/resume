"use client"

import { useResumeLocale } from "@/data/resume-locale";
import { Section, SectionHeading } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";

export const About = () => {
    const { labels, localize } = useResumeLocale()
    const summary = localize(RESUME_DATA, "summary")

    return (
        <Section id="about">
            <SectionHeading>{labels.about}</SectionHeading>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                {summary}
            </p>
        </Section>
    );
};
