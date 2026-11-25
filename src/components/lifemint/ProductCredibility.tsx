'use client';

import Reveal from './Reveal';
import type { Dictionary } from './dictionaries/en';

type CredibilityIcon = 'ring' | 'forecast' | 'records' | 'phone' | 'globe';

const ICONS: Record<CredibilityIcon, React.ReactNode> = {
  ring: (
    <svg aria-hidden="true" className="w-5 h-5" style={{ color: 'var(--lm-domain-earn-text)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 3a9 9 0 010 18" />
    </svg>
  ),
  forecast: (
    <svg aria-hidden="true" className="w-5 h-5" style={{ color: 'var(--lm-domain-focus-text)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l5-5 4 3 4-6 5 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
    </svg>
  ),
  records: (
    <svg aria-hidden="true" className="w-5 h-5" style={{ color: 'var(--lm-domain-spend-text)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  ),
  phone: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="5" y="2" width="14" height="20" rx="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" />
    </svg>
  ),
  globe: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M3.6 9h16.8M3.6 15h16.8" />
      <path strokeLinecap="round" d="M12 3a15 15 0 010 18 15 15 0 010-18z" />
    </svg>
  ),
};

const ICON_COLORS: Record<CredibilityIcon, string | undefined> = {
  ring: 'var(--lm-domain-earn-text)',
  forecast: 'var(--lm-domain-focus-text)',
  records: 'var(--lm-domain-spend-text)',
  phone: undefined,
  globe: undefined,
};

export default function ProductCredibility({ dict }: { dict: Dictionary['credibility'] }) {
  return (
    <Reveal>
      <section className="border-y border-[color:var(--lm-border)] bg-[color:var(--lm-white)]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-8 md:gap-12 lg:gap-16 overflow-x-auto py-5 justify-center">
            {dict.items.map((label, i) => {
              const id = (Object.keys(ICONS) as CredibilityIcon[])[i] ?? 'globe';
              const color = ICON_COLORS[id];
              return (
              <div key={label} className="flex items-center gap-2.5 text-[color:var(--lm-text-secondary)] flex-shrink-0">
                {ICONS[id]}
                <span
                  className="text-sm font-medium whitespace-nowrap"
                  style={color ? { color } : undefined}
                >
                  {label}
                </span>
              </div>
              );
            })}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
