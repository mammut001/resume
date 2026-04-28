"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { useResumeLocale } from "@/data/resume-locale";
import type { Lang } from "@/store/useLanguageStore";
import { DownloadIcon, GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";

const resumeDownloads: Record<Lang, { href: string; filename: string }> = {
    english: {
        href: "/payton-pei-resume.pdf",
        filename: "Dong-Payton-Pei-Resume-English.pdf",
    },
    french: {
        href: "/payton-pei-resume-fr.pdf",
        filename: "Dong-Payton-Pei-Resume-French.pdf",
    },
    chinese: {
        href: "/payton-pei-resume-zh.pdf",
        filename: "Dong-Payton-Pei-Resume-Chinese.pdf",
    },
};

export const Hero = () => {
    const { labels, localize, language } = useResumeLocale()
    const aboutContent = localize(RESUME_DATA, "about")
    const resumeDownload = resumeDownloads[language]

    return (
        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-start md:justify-between py-12 md:py-16">
            <div className="flex-1 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    {RESUME_DATA.name}
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
                    {aboutContent}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                    <GlobeIcon className="size-4" />
                    <a
                        className="hover:underline offset-4"
                        href={RESUME_DATA.locationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {RESUME_DATA.location}
                    </a>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-4 print:hidden">
                    <Button className="gap-2 rounded-full px-4" size="sm" asChild>
                        <a href={resumeDownload.href} download={resumeDownload.filename}>
                            <DownloadIcon className="size-4" />
                            <span>{labels.downloadResume}</span>
                        </a>
                    </Button>
                    {RESUME_DATA.contact.email ? (
                        <Button
                            className="size-10 rounded-full"
                            variant="outline"
                            size="icon"
                            asChild
                        >
                            <a href={`mailto:${RESUME_DATA.contact.email}`}>
                                <MailIcon className="size-4" />
                            </a>
                        </Button>
                    ) : null}
                    {RESUME_DATA.contact.tel ? (
                        <Button
                            className="size-10 rounded-full"
                            variant="outline"
                            size="icon"
                            asChild
                        >
                            <a href={`tel:${RESUME_DATA.contact.tel}`}>
                                <PhoneIcon className="size-4" />
                            </a>
                        </Button>
                    ) : null}
                    {RESUME_DATA.contact.social.map((social) => (
                        <Button
                            key={social.name}
                            className="size-10 rounded-full"
                            variant="outline"
                            size="icon"
                            asChild
                        >
                            <a href={social.url} target="_blank" rel="noopener noreferrer">
                                <social.icon className="size-4" />
                            </a>
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex justify-center md:justify-end">
                <Avatar className="size-32 md:size-40 border-4 border-background shadow-xl">
                    <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} className="object-cover" />
                    <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};
