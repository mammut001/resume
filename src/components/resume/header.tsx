"use client"

import React from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { useLanguageStore, type Lang } from '@/store/useLanguageStore';
import { useTriggerPopupStore } from '@/store/useTriggerPopupStore';
import { Languages } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Header = () => {
    const updateLanguage = useLanguageStore(state => state.updateLang);
    const resetProjectClickedStatus = useTriggerPopupStore(state => state.resetToFalse);
    const currentLang = useLanguageStore(state => state.name);

    const handleLanguageChange = (lang: Lang) => {
        updateLanguage(lang);
        resetProjectClickedStatus();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <span>DP</span>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Languages className="size-4" />
                                <span className="sr-only">Change Language</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleLanguageChange('english')}>
                                English
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('french')}>
                                Français
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange('chinese')}>
                                中文
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};
