'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import PhoneScreenshot, { WatchScreenshot } from './DeviceFrame';
import type { Dictionary } from './dictionaries/en';

const TAB_VISUALS = [
  {
    kind: 'watch' as const,
    phoneSrc: 'home' as const,
    watchSrc: 'now' as const,
    phoneAlt: 'LifeMint Home with Today’s 3',
    watchAlt: 'LifeMint Watch Now',
  },
  {
    kind: 'live' as const,
    phoneSrc: 'records' as const,
    watchSrc: 'summary' as const,
    phoneAlt: 'LifeMint Records overview',
    watchAlt: 'LifeMint Watch Summary',
  },
  {
    kind: 'watch' as const,
    phoneSrc: 'home' as const,
    watchSrc: 'sync' as const,
    phoneAlt: 'LifeMint Home',
    watchAlt: 'LifeMint Watch Sync',
  },
];

export default function AppleEcosystemSection({ dict }: { dict: Dictionary['ecosystem'] }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = dict.tabs;
  const visual = TAB_VISUALS[activeTab] ?? TAB_VISUALS[0];

  return (
    <section className="py-20 md:py-28 px-6" style={{ background: 'var(--lm-deep)' }}>
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.05] text-white mb-3">
              {dict.title}
            </h2>
            <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto">
              {dict.subtitle}
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex items-center justify-center gap-5 lg:order-2 min-h-[340px] lg:min-h-[420px]">
              <div
                key={`phone-${activeTab}`}
                className="w-[180px] lg:w-[220px] transition-all duration-300 ease-out"
                style={{
                  opacity: visual.kind === 'watch' ? 0.55 : 1,
                  transform: visual.kind === 'watch' ? 'scale(0.92)' : 'scale(1)',
                }}
              >
                <PhoneScreenshot src={visual.phoneSrc} alt={visual.phoneAlt} />
              </div>

              <div
                key={`watch-${activeTab}`}
                className="transition-all duration-300 ease-out"
                style={{
                  opacity: 1,
                  transform:
                    visual.kind === 'watch'
                      ? 'scale(1.08) translateY(-8px)'
                      : 'scale(1)',
                }}
              >
                <WatchScreenshot
                  src={visual.watchSrc}
                  alt={visual.watchAlt}
                  className="mb-4 lg:mb-8"
                />
              </div>
            </div>

            <div className="lg:order-1">
              <div className="flex flex-wrap gap-1 mb-6" role="tablist">
                {tabs.map((tab: { title: string; desc: string; points: string[] }, i: number) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={activeTab === i}
                    aria-controls={`eco-panel-${i}`}
                    id={`eco-tab-${i}`}
                    onClick={() => setActiveTab(i)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === i
                        ? 'bg-[color:var(--lm-brand)] text-white'
                        : 'text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>

              {tabs.map((tab: { title: string; desc: string; points: string[] }, i: number) => (
                <div
                  key={i}
                  role="tabpanel"
                  id={`eco-panel-${i}`}
                  aria-labelledby={`eco-tab-${i}`}
                  hidden={activeTab !== i}
                  className="transition-opacity duration-200 ease-out"
                  style={{ opacity: activeTab === i ? 1 : 0 }}
                >
                  {activeTab === i && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">{tab.title}</h3>
                      <p className="text-white/60 text-sm sm:text-base mb-5 leading-relaxed">{tab.desc}</p>
                      <ul className="space-y-2">
                        {tab.points.map((point: string, j: number) => (
                          <li key={j} className="flex items-start gap-2.5 text-white/70 text-sm">
                            <svg aria-hidden="true" className="w-4 h-4 text-[color:var(--lm-brand-text)] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
