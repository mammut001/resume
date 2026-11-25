'use client';

import Reveal from './Reveal';
import type { Dictionary } from './dictionaries/en';

function CheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`${className} flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ProSection({ dict }: { dict: Dictionary['pro'] }) {
  return (
    <section id="pro" className="py-20 md:py-28 px-6 bg-[color:var(--lm-white)] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.05] text-[color:var(--lm-text-primary)] mb-3">
              {dict.title}
            </h2>
            <p className="text-base sm:text-lg text-[color:var(--lm-text-secondary)] max-w-xl mx-auto">
              {dict.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="h-full rounded-3xl border border-[color:var(--lm-border)] bg-[color:var(--lm-bg)] p-7 sm:p-8">
              <h3 className="text-lg font-semibold text-[color:var(--lm-text-primary)] mb-5">{dict.free.title}</h3>
              <ul className="space-y-3">
                {dict.free.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[color:var(--lm-text-secondary)]">
                    <CheckIcon className="w-4 h-4 text-[color:var(--lm-brand-dark-text)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative h-full rounded-3xl bg-[color:var(--lm-brand-deep)] p-7 sm:p-8 overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[color:var(--lm-brand-20)] blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-baseline justify-between gap-3 mb-5">
                  <h3 className="text-lg font-semibold text-white">{dict.lifetime.title}</h3>
                  <span className="text-2xl font-semibold text-white tabular-nums">
                    {dict.lifetime.price}
                  </span>
                </div>
                <ul className="space-y-3">
                  {dict.lifetime.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                      <CheckIcon className="w-4 h-4 text-[#dff3e6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="text-center text-xs text-[color:var(--lm-text-tertiary)] mt-8">{dict.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
