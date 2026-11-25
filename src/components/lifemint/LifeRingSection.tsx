'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import PhoneScreenshot from './DeviceFrame';
import { screenshots } from './assets';
import { DOMAIN_ACCENT, type DomainId } from './domains';
import type { Dictionary } from './dictionaries/en';

type IPhoneShot = keyof typeof screenshots.iphone;

function domainShot(key: string): IPhoneShot {
  return key in screenshots.iphone ? (key as IPhoneShot) : 'home';
}

export default function LifeRingSection({ dict }: { dict: Dictionary['ring'] }) {
  const [active, setActive] = useState(0);
  const item = dict.items[active];
  const accent = DOMAIN_ACCENT[item.id as DomainId];

  return (
    <section id="pillars" className="py-20 md:py-28 px-6 scroll-mt-20 bg-[color:var(--lm-bg)]">
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.05] text-[color:var(--lm-text-primary)] mb-3">
              {dict.title}
            </h2>
            <p className="text-base sm:text-lg text-[color:var(--lm-text-secondary)] max-w-2xl mx-auto">
              {dict.subtitle}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="sticky top-16 z-20 -mx-2 mb-8 md:mb-10 px-2 py-2 bg-[color:var(--lm-bg-90)] backdrop-blur-md"
            role="tablist"
            aria-label={dict.title}
          >
            <div className="flex gap-1 p-1 rounded-2xl bg-[color:var(--lm-tint-4)] max-w-xl mx-auto">
              {dict.items.map((domain, i) => {
                const selected = active === i;
                const color = DOMAIN_ACCENT[domain.id];
                return (
                  <button
                    key={domain.id}
                    role="tab"
                    id={`domain-tab-${domain.id}`}
                    aria-selected={selected}
                    aria-controls={`domain-panel-${domain.id}`}
                    onClick={() => setActive(i)}
                    className="flex-1 px-2 sm:px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors"
                    style={{
                      background: selected ? color.solid : 'transparent',
                      color: selected ? '#fff' : 'var(--lm-text-secondary)',
                    }}
                  >
                    {domain.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div
          key={item.id}
          id={`domain-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`domain-tab-${item.id}`}
          className="lm-domain-panel-enter grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          <div>
            <span
              className="inline-flex text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4"
              style={{ background: accent.soft, color: accent.text }}
            >
              {item.caption}
            </span>
            <h3 className="text-[26px] sm:text-[32px] font-semibold leading-[1.1] text-[color:var(--lm-text-primary)] mb-3">
              {item.title}
            </h3>
            <p className="text-base text-[color:var(--lm-text-secondary)] leading-relaxed mb-6 max-w-md">
              {item.description}
            </p>
            <ul className="space-y-2.5">
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-[color:var(--lm-text-secondary)]">
                  <svg
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: accent.text }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[280px]">
              <PhoneScreenshot src={domainShot(item.screenshot)} alt={item.title} />
            </div>
          </div>
        </div>

        <Reveal delay={120}>
          <p className="mt-10 md:mt-14 text-center text-sm text-[color:var(--lm-text-tertiary)] max-w-lg mx-auto">
            {dict.explainer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
