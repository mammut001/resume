"use client"

import { useEffect } from 'react';
import { useResumeLocale } from '@/data/resume-locale';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { useLanguageStore, type Lang } from '@/store/useLanguageStore';
import { Check, Languages } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const LANGUAGE_OPTIONS: { value: Lang; label: string; htmlLang: string }[] = [
    { value: 'english', label: 'English', htmlLang: 'en' },
    { value: 'french', label: 'Français', htmlLang: 'fr' },
    { value: 'chinese', label: '中文', htmlLang: 'zh-CN' },
];

const detectBrowserLanguage = (): Lang => {
    const preferred = navigator.language.toLowerCase();
    if (preferred.startsWith('zh')) return 'chinese';
    if (preferred.startsWith('fr')) return 'french';
    return 'english';
};

export const Header = () => {
    const { labels, language } = useResumeLocale();
    const updateLanguage = useLanguageStore(state => state.updateLang);

    // Restore the saved language, falling back to the browser's preference on a first visit.
    useEffect(() => {
        const persistApi = useLanguageStore.persist;
        if (localStorage.getItem(persistApi.getOptions().name ?? '')) {
            persistApi.rehydrate();
        } else {
            updateLanguage(detectBrowserLanguage());
        }
    }, [updateLanguage]);

    useEffect(() => {
        const option = LANGUAGE_OPTIONS.find((item) => item.value === language);
        document.documentElement.lang = option?.htmlLang ?? 'en';
    }, [language]);

    const navItems = [
        { href: '#about', label: labels.about },
        { href: '#projects', label: labels.projects },
        { href: '#experience', label: labels.workExperience },
        { href: '#education', label: labels.education },
        { href: '#skills', label: labels.skills },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 print:hidden">
            <div className="mx-auto flex h-14 max-w-screen-lg items-center justify-between gap-4 px-4 md:px-16">
                <a href="#top" className="text-lg font-bold tracking-tight">
                    DP
                </a>

                <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label={labels.changeLanguage}>
                                <Languages className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {LANGUAGE_OPTIONS.map((option) => (
                                <DropdownMenuItem
                                    key={option.value}
                                    lang={option.htmlLang}
                                    onClick={() => updateLanguage(option.value)}
                                    className="justify-between gap-4"
                                >
                                    {option.label}
                                    {option.value === language ? <Check className="size-4" /> : null}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};
