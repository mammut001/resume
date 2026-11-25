'use client';

import { useRef } from 'react';
import type { Dictionary, ShotId } from './dictionaries/en';
import PhoneScreenshot from './DeviceFrame';
import Reveal from './Reveal';

export const SHOTS: ShotId[] = ['home', 'results', 'review', 'confirm', 'duplicates', 'viewer', 'library', 'settings'];

export default function ProductGallery({ dict, screenshotLocale }: { dict: Dictionary['gallery']; screenshotLocale: 'en' | 'zh' }) {
  const rowRef = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    row.scrollBy({ left: direction * Math.max(row.clientWidth * 0.8, 240), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section id="screenshots" className="py-20 md:py-28 scroll-mt-16 bg-[var(--pa-sunken)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide uppercase text-[color:var(--pa-accent-text)] mb-3">{dict.eyebrow}</p>
            <h2 className="text-[30px] sm:text-[40px] font-bold leading-tight tracking-tight text-[color:var(--pa-title)] mb-2">{dict.title}</h2>
            <p className="text-sm text-[color:var(--pa-secondary)]">{dict.description}</p>
          </div>
          <div className="flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => scrollBy(d)}
                aria-label={d < 0 ? dict.previous : dict.next}
                className="w-11 h-11 rounded-full grid place-items-center pa-clay !shadow-none text-[color:var(--pa-title)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                  <path d={d < 0 ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19'} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
      <ul
        ref={rowRef}
        className="pa-no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 pb-6 max-w-[1200px] mx-auto"
        tabIndex={0}
        aria-label={dict.title}
      >
        {SHOTS.map((id) => (
          <li key={id} className="snap-start shrink-0 w-[200px] sm:w-[230px]">
            <figure>
              <PhoneScreenshot src={`/photoagent/screenshots/${screenshotLocale}/${id}.webp`} alt={dict.shots[id]} sizes="230px" />
              <figcaption className="text-sm text-[color:var(--pa-secondary)] text-center mt-4 px-1 leading-snug">{dict.shots[id]}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
