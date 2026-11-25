'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import type { Dictionary } from './dictionaries/en';
import { ICON_SRC, pageUrl, type Locale } from './site';

export default function Navbar({ dict, lang, languageLabel }: { dict: Dictionary['navbar']; lang: Locale; languageLabel: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === pageUrl(lang) || pathname === `${pageUrl(lang)}/`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (isHomePage) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`${pageUrl(lang)}#${id}`);
    }
    setMobileOpen(false);
  };

  const handleLogoClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(pageUrl(lang));
    }
  };

  const linkClass =
    'px-4 py-2 text-sm text-[color:var(--lm-text-secondary)] hover:text-[color:var(--lm-text-primary)] rounded-lg hover:bg-[color:var(--lm-tint-5)] transition-all duration-200';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[color:var(--lm-white-80)] backdrop-blur-md border-b border-[color:var(--lm-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[68px]">
          <button onClick={handleLogoClick} className="flex items-center gap-2.5 cursor-pointer" aria-label="Home">
            <Image
              src={ICON_SRC}
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg object-cover shadow-sm"
            />
            <span className="text-base font-semibold tracking-tight text-[color:var(--lm-text-primary)]">LifeMint</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            <button onClick={() => scrollTo('pillars')} className={linkClass}>
              {dict.features}
            </button>
            <button onClick={() => scrollTo('interactive-demo')} className={linkClass}>
              {dict.tryDemo}
            </button>
            <Link href={pageUrl(lang, '/changelog')} className={linkClass}>
              {dict.changelog}
            </Link>
            <div className="mx-1">
              <LanguageSwitcher current={lang} label={languageLabel} onLanguageChange={() => {}} />
            </div>
            <ThemeToggle label={dict.theme} />
            <button onClick={() => scrollTo('download')} className="lm-btn-primary px-5 py-2 text-sm rounded-lg ml-2">
              {dict.download}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle label={dict.theme} />
            <button className="p-2 text-[color:var(--lm-text-secondary)] hover:text-[color:var(--lm-text-primary)] transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="mobile-menu">
              <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="md:hidden pb-5 pt-1 flex flex-col gap-1 border-t border-[color:var(--lm-border)] mt-1">
            {[
              { label: dict.features, id: 'pillars' },
              { label: dict.tryDemo, id: 'interactive-demo' },
              { label: dict.download, id: 'download' },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-[color:var(--lm-text-secondary)] hover:text-[color:var(--lm-text-primary)] hover:bg-[color:var(--lm-tint-5)] px-4 py-3 rounded-xl transition-all">
                {item.label}
              </button>
            ))}
            <Link href={pageUrl(lang, '/changelog')} onClick={() => setMobileOpen(false)} className="block text-left text-[color:var(--lm-text-secondary)] hover:text-[color:var(--lm-text-primary)] hover:bg-[color:var(--lm-tint-5)] px-4 py-3 rounded-xl transition-all">
              {dict.changelog}
            </Link>
            <div className="px-4 pt-1">
              <LanguageSwitcher current={lang} label={languageLabel} onLanguageChange={() => setMobileOpen(false)} isMobile={true} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
