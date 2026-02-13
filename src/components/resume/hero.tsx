"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { useLanguageStore } from "@/store/useLanguageStore";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";

export const Hero = () => {
    const language = useLanguageStore(state => state.name)

    const aboutContent = language === 'french' ? RESUME_DATA.about_fr :
        language === 'chinese' ? RESUME_DATA.about_cn :
            RESUME_DATA.about

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
                    >
                        {RESUME_DATA.location}
                    </a>
                </div>

                <div className="flex gap-2 pt-4 print:hidden">
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
                            <a href={social.url}>
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
