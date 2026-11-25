'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Dictionary } from './dictionaries/en';
import { ICON_SRC, type Locale } from './site';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ dict, lang, languageLabel }: { dict: Dictionary['navbar']; lang: Locale; languageLabel: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#search', label: dict.search },
    { href: '#cleanup', label: dict.cleanup },
    { href: '#privacy', label: dict.privacy },
    { href: '#pro', label: dict.pro },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled || menuOpen ? 'backdrop-blur-md border-b border-[color:var(--pa-card-border)]' : ''
      }`}
      style={{ background: scrolled || menuOpen ? 'color-mix(in srgb, var(--pa-page) 88%, transparent)' : 'transparent' }}
    >
      <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2" aria-label="PhotoAgent">
        <a href="#top" className="flex min-w-0 items-center gap-2.5 min-h-[44px]" aria-label={dict.home}>
          <Image src={ICON_SRC} alt="" width={32} height={32} className="w-8 h-8 shrink-0 rounded-[9px]" />
          <span className="hidden min-[360px]:inline truncate text-base font-bold text-[color:var(--pa-title)]">PhotoAgent</span>
        </a>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="px-3 py-2 rounded-full text-sm font-semibold text-[color:var(--pa-secondary)] hover:text-[color:var(--pa-title)]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-1">
          <LanguageSwitcher current={lang} label={languageLabel} />
          <ThemeToggle label={dict.theme} />
          <a
            href="#download"
            className="hidden sm:inline-flex items-center min-h-[40px] px-4 rounded-full text-sm font-bold text-white"
            style={{ background: 'var(--pa-accent-fill)' }}
          >
            {dict.download}
          </a>
          <button
            type="button"
            className="md:hidden w-11 h-11 grid place-items-center rounded-full text-[color:var(--pa-title)]"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={dict.menu}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d={menuOpen ? 'M6 6 L18 18 M18 6 L6 18' : 'M4 7 L20 7 M4 12 L20 12 M4 17 L20 17'} strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>
      {menuOpen && (
        <ul id="mobile-menu" className="md:hidden px-4 pb-4 space-y-1">
          {[...links, { href: '#download', label: dict.download }].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-3 rounded-xl text-base font-semibold text-[color:var(--pa-title)] hover:bg-[color:var(--pa-coral-bg)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
