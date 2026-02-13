"use client"

import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { useLanguageStore } from "@/store/useLanguageStore";

export const About = () => {
    const language = useLanguageStore(state => state.name)
    const summary = language === 'french' ? RESUME_DATA.summary_fr :
        language === 'chinese' ? RESUME_DATA.summary_cn :
            RESUME_DATA.summary

    return (
        <Section className="py-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4 border-b pb-2">About</h2>
            <p className="text-pretty font-mono text-base text-muted-foreground leading-relaxed">
                {summary}
            </p>
        </Section>
    );
};
