'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { LANGUAGE_NAMES, LOCALES, pageUrl, type Locale } from './site';

export default function LanguageSwitcher({
  current,
  label,
  placement = 'below',
  tone = 'page',
}: {
  current: Locale;
  label: string;
  placement?: 'below' | 'above';
  tone?: 'page' | 'dark';
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const buttonTone =
    tone === 'dark' ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-[color:var(--pa-secondary)] hover:text-[color:var(--pa-title)] hover:bg-[color:var(--pa-coral-bg)]';

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap px-2 sm:px-3 min-h-[40px] text-sm font-semibold rounded-full transition-colors ${buttonTone}`}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 max-[379px]:hidden" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12 L20.5 12 M12 3.5 Q16 8 16 12 Q16 16 12 20.5 Q8 16 8 12 Q8 8 12 3.5 Z" />
        </svg>
        <span className="sr-only">{label}: </span>
        <span>{LANGUAGE_NAMES[current]}</span>
      </button>
      {open && (
        <ul
          id={listId}
          className={`absolute right-0 ${placement === 'above' ? 'bottom-full mb-2' : 'top-full mt-2'} w-40 py-1.5 pa-clay z-50`}
        >
          {LOCALES.map((l) => (
            <li key={l}>
              <Link
                href={pageUrl(l)}
                hrefLang={l === 'zh' ? 'zh-CN' : l}
                lang={l === 'zh' ? 'zh-CN' : l}
                aria-current={l === current ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm ${l === current ? 'font-bold text-[color:var(--pa-accent-text)]' : 'text-[color:var(--pa-body)] hover:bg-[color:var(--pa-coral-bg)]'}`}
              >
                {LANGUAGE_NAMES[l]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
