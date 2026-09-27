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

const phoneNumbers = (RESUME_DATA.contact.tel ?? "")
    .split("|")
    .map((phone) => phone.trim())
    .filter(Boolean);

export const Hero = () => {
    const { labels, localize, language } = useResumeLocale()
    const aboutContent = localize(RESUME_DATA, "about")
    const resumeDownload = resumeDownloads[language]

    return (
        <div id="top" className="flex scroll-mt-20 flex-col-reverse gap-6 pt-4 md:flex-row md:items-start md:justify-between md:gap-8 md:pt-8 print:pt-0">
            <div className="flex-1 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    {localize(RESUME_DATA, "name")}
                </h1>
                <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                    {aboutContent}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GlobeIcon aria-hidden="true" className="size-4" />
                    <a
                        className="hover:underline offset-4"
                        href={localize(RESUME_DATA, "locationLink")}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {localize(RESUME_DATA, "location")}
                    </a>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 print:hidden">
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
                            <a href={`mailto:${RESUME_DATA.contact.email}`} aria-label={RESUME_DATA.contact.email} title={RESUME_DATA.contact.email}>
                                <MailIcon className="size-4" />
                            </a>
                        </Button>
                    ) : null}
                    {phoneNumbers.map((phone) => (
                        <Button
                            key={phone}
                            className="gap-2 rounded-full px-4"
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                                <PhoneIcon className="size-4" />
                                <span className="tabular-nums">{phone}</span>
                            </a>
                        </Button>
                    ))}
                    {RESUME_DATA.contact.social.map((social) => (
                        <Button
                            key={social.name}
                            className="size-10 rounded-full"
                            variant="outline"
                            size="icon"
                            asChild
                        >
                            <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} title={social.name}>
                                <social.icon className="size-4" />
                            </a>
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex md:justify-end">
                <Avatar className="size-24 border-4 border-background shadow-xl md:size-36 print:size-24 print:shadow-none">
                    <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} className="object-cover" />
                    <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};
