'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { LANGUAGE_LABELS, LOCALES, PAGE_PATH, isLocale, pageUrl, type Locale } from './site';

interface LanguageSwitcherProps {
    current: Locale;
    label: string;
    onLanguageChange?: () => void;
    isMobile?: boolean;
}

export default function LanguageSwitcher({ current, label, onLanguageChange, isMobile = false }: LanguageSwitcherProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    // Same page in the other language: /lifemint/en/changelog → /lifemint/fr/changelog.
    const switchLanguage = (langCode: Locale) => {
        const segments = (pathname || pageUrl(current)).split('/');
        const subpath = segments[1] === PAGE_PATH.slice(1) && isLocale(segments[2] ?? '') ? segments.slice(3).join('/') : '';
        router.push(pageUrl(langCode, subpath ? `/${subpath}` : ''));
        setIsOpen(false);
        if (onLanguageChange) onLanguageChange();
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium text-[color:var(--lm-text-secondary)] hover:text-[color:var(--lm-text-primary)] rounded-lg hover:bg-[color:var(--lm-tint-5)] transition-colors min-h-[36px]"
                aria-label={label}
                aria-expanded={isOpen}
            >
                <span>{LANGUAGE_LABELS[current]}</span>
                <svg
                    className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className={`absolute ${isMobile ? 'left-0' : 'right-0'} top-full mt-2 w-28 py-1 rounded-xl bg-[color:var(--lm-white)] border border-[color:var(--lm-border)] z-50 overflow-hidden max-h-64 overflow-y-auto`}>
                        {LOCALES.map((code) => (
                            <button
                                key={code}
                                lang={code === 'zh' ? 'zh-CN' : code}
                                onClick={() => switchLanguage(code)}
                                className={`w-full px-3 py-2 text-sm text-left hover:bg-[color:var(--lm-tint-5)] transition-colors ${current === code ? 'text-[color:var(--lm-brand-text)] font-semibold bg-[color:var(--lm-brand-soft-50)]' : 'text-[color:var(--lm-text-secondary)]'}`}
                            >
                                {LANGUAGE_LABELS[code]}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
