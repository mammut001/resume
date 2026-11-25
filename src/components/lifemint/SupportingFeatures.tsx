'use client';

import Reveal from './Reveal';
import type { Dictionary } from './dictionaries/en';

const iconMap: Record<string, React.ReactNode> = {
  today: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  records: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  ),
  watch: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="7" y="3" width="10" height="18" rx="3" />
      <path strokeLinecap="round" d="M9 7h6M9 17h6" />
    </svg>
  ),
  review: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  widgets: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  shift: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  forecast: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l4-4 4 4 5-6 5 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
    </svg>
  ),
  export: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  ocean: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12c1.25-1.5 2.5-1.5 3.75 0s2.5 1.5 3.75 0 2.5-1.5 3.75 0 2.5 1.5 3.75 0M2.5 17c1.25-1.5 2.5-1.5 3.75 0s2.5 1.5 3.75 0 2.5-1.5 3.75 0 2.5 1.5 3.75 0" />
    </svg>
  ),
  pro: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.5l2.1 4.26 4.7.68-3.4 3.31.8 4.67-4.2-2.21-4.2 2.21.8-4.67-3.4-3.31 4.7-.68 2.1-4.26z" />
    </svg>
  ),
  globe: (
    <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3c-2.5 2.8-3.8 5.8-3.8 9s1.3 6.2 3.8 9c2.5-2.8 3.8-5.8 3.8-9s-1.3-6.2-3.8-9z" />
    </svg>
  ),
};

export default function SupportingFeatures({ dict }: { dict: Dictionary['supporting'] }) {
  return (
    <Reveal>
      <section id="features" className="py-20 md:py-28 px-6 bg-[color:var(--lm-white)] scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.05] text-[color:var(--lm-text-primary)] mb-3">
              {dict.title}
            </h2>
            <p className="text-base text-[color:var(--lm-text-secondary)] max-w-xl mx-auto">
              {dict.subtitle}
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-[color:var(--lm-border)]">
            {dict.items.map((item: { icon: string; title: string; desc: string }, i: number) => (
              <div
                key={i}
                className="flex items-start gap-4 py-5 hover:bg-[color:var(--lm-brand-softer-50)] transition-colors rounded-lg px-3 -mx-3"
              >
                <div className="text-[color:var(--lm-brand-text)] mt-0.5 flex-shrink-0">
                  {iconMap[item.icon] || iconMap.records}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[color:var(--lm-text-primary)] mb-0.5">{item.title}</h3>
                  <p className="text-sm text-[color:var(--lm-text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
