'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

// The page's background in each theme; kept in step with the viewport themeColor in app/lifemint/[lang]/layout.tsx.
const CHROME = { light: '#f3f6ef', dark: '#0e1410' } as const;

/** Switches the cv site's light and dark theme (next-themes), which the LifeMint palette follows. */
export default function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  // theme-color is keyed on the system scheme; when the page's own theme differs, make the browser chrome follow the page.
  useEffect(() => {
    if (resolvedTheme !== 'light' && resolvedTheme !== 'dark') return;
    const metas = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]'));
    const original = metas.map((m) => m.content);
    metas.forEach((m) => (m.content = CHROME[resolvedTheme]));
    return () => metas.forEach((m, i) => (m.content = original[i]));
  }, [resolvedTheme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className="w-9 h-9 grid place-items-center rounded-lg text-[color:var(--lm-text-secondary)] hover:text-[color:var(--lm-text-primary)] hover:bg-[color:var(--lm-tint-5)] transition-colors"
    >
      {/* Both icons are rendered; the theme class on <html> picks one, so the server and client markup match. */}
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] dark:hidden" fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden="true">
        <path d="M20 14.5 A8 8 0 1 1 9.5 4 A6.5 6.5 0 0 0 20 14.5 Z" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] hidden dark:block" fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5 V4.5 M12 19.5 V21.5 M2.5 12 H4.5 M19.5 12 H21.5 M5.3 5.3 L6.7 6.7 M17.3 17.3 L18.7 18.7 M5.3 18.7 L6.7 17.3 M17.3 6.7 L18.7 5.3" strokeLinecap="round" />
      </svg>
    </button>
  );
}
