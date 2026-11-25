'use client';

import Reveal from './Reveal';
import PhoneScreenshot from './DeviceFrame';
import type { Dictionary } from './dictionaries/en';

/**
 * A static recreation of the real PaycheckForecastCard anatomy, so the section
 * shows exactly what the user sees: payday, estimate, likely range, basis, and
 * the recorded / base pay / tips tiles.
 */
export default function PaycheckSection({ dict }: { dict: Dictionary['paycheck'] }) {
  const { card } = dict;

  return (
    <section id="paycheck" className="py-20 md:py-28 px-6 scroll-mt-20" style={{ background: 'var(--lm-deep)' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-medium text-[#dff3e6]/80 mb-3">{dict.eyebrow}</p>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.05] text-white mb-4">
              {dict.title}
            </h2>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              {dict.description}
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="max-w-[400px] mx-auto lg:mx-0">
              <PhoneScreenshot src="earnings" alt={dict.title} />
            </div>
          </Reveal>

          <Reveal delay={100}>
            {/* Card facsimile */}
            <div className="bg-[color:var(--lm-white)] rounded-[24px] shadow-[0_30px_70px_rgba(0,0,0,0.28)] p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <svg aria-hidden="true" className="w-5 h-5 text-[color:var(--lm-brand-dark-text)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <div>
                    <p className="text-xs text-[color:var(--lm-text-tertiary)]">{card.caption}</p>
                    <p className="text-sm font-semibold text-[color:var(--lm-text-primary)]">{card.payday}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[color:var(--lm-brand-soft)] text-[color:var(--lm-brand-dark-text)] text-xs font-semibold whitespace-nowrap">
                  {card.daysRemaining}
                </span>
              </div>

              <div className="mb-1">
                <p className="text-xs text-[color:var(--lm-text-tertiary)] mb-1">{card.estimate}</p>
                <p className="text-[40px] leading-none font-semibold text-[color:var(--lm-text-primary)] tabular-nums">
                  $650
                </p>
              </div>
              <p className="text-sm font-semibold text-[color:var(--lm-brand-dark-text)] mb-1">{card.range}</p>
              <p className="text-xs text-[color:var(--lm-text-secondary)] mb-1">{card.basis}</p>
              <p className="text-xs text-[color:var(--lm-text-tertiary)] mb-6">{card.confidence}</p>

              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { value: '12.4 h', label: card.recorded },
                  { value: '$310.00', label: card.basePay },
                  { value: '$48.20', label: card.tips },
                ].map((tile) => (
                  <div key={tile.label} className="bg-[color:var(--lm-bg)] rounded-xl px-3 py-3 text-center">
                    <p className="text-sm font-semibold text-[color:var(--lm-text-primary)] tabular-nums">{tile.value}</p>
                    <p className="text-[11px] text-[color:var(--lm-text-tertiary)] mt-0.5">{tile.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 border-t border-[color:var(--lm-border)] pt-4">
                <p className="text-xs text-[color:var(--lm-text-secondary)] flex items-start gap-2">
                  <svg aria-hidden="true" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[color:var(--lm-brand-dark-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {card.shiftHours}
                </p>
                <p className="text-xs text-[color:var(--lm-text-secondary)] flex items-start gap-2">
                  <svg aria-hidden="true" className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[color:var(--lm-brand-dark-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {card.expectedTips}
                </p>
              </div>

              <p className="text-[11px] text-[color:var(--lm-text-tertiary)] mt-5 pt-4 border-t border-[color:var(--lm-border)]">
                {card.disclaimer}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 mt-14 md:mt-20">
          {dict.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 60}>
              <div className="flex gap-3">
                <span className="text-[#dff3e6]/40 text-sm font-semibold tabular-nums pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5">{point.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{point.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 text-center text-xs text-white/40 max-w-xl mx-auto leading-relaxed">
            {dict.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
