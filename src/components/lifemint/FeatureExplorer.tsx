'use client';

import { useCallback, useState, useRef } from 'react';
import Reveal from './Reveal';
import { PhoneFrame } from './DeviceFrame';
import Image from 'next/image';
import { screenshots } from './assets';
import type { Dictionary } from './dictionaries/en';

/** One screenshot per explorer panel (same order as dict.explorer.panels). */
const PANEL_SCREENSHOTS: (keyof typeof screenshots.iphone | 'watch')[] = [
  'home',
  'expense',
  'fitness',
  'records',
  'profiles',
  'goals',
  'watch',
];

export default function FeatureExplorer({ dict }: { dict: Dictionary['explorer'] }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const panelCount = Math.min(dict.panels.length, PANEL_SCREENSHOTS.length);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newIdx = activeTab;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIdx = (activeTab + 1) % panelCount;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIdx = (activeTab - 1 + panelCount) % panelCount;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIdx = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIdx = panelCount - 1;
      }
      if (newIdx !== activeTab) {
        setActiveTab(newIdx);
        const btn = tabListRef.current?.querySelectorAll('[role="tab"]')[newIdx] as HTMLButtonElement;
        btn?.focus();
      }
    },
    [activeTab, panelCount],
  );

  const shotKey = PANEL_SCREENSHOTS[activeTab];
  const panel = dict.panels[activeTab];

  return (
    <Reveal>
      <section className="py-20 md:py-28 px-6 bg-[color:var(--lm-bg-warm)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.05] text-[color:var(--lm-text-primary)] mb-3">
              {dict.title}
            </h2>
            <p className="text-base sm:text-lg text-[color:var(--lm-text-secondary)] max-w-xl mx-auto">
              {dict.subtitle}
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="max-w-[320px] mx-auto lg:mx-0 mb-8 lg:mb-0">
              <PhoneFrame>
                <Image
                  key={shotKey}
                  src={shotKey === 'watch' ? screenshots.watch.home : screenshots.iphone[shotKey]}
                  alt={panel?.title ?? ''}
                  width={shotKey === 'watch' ? 416 : 720}
                  height={shotKey === 'watch' ? 496 : 1560}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </PhoneFrame>
            </div>

            <div>
              <div
                ref={tabListRef}
                role="tablist"
                aria-label="Feature screenshots"
                onKeyDown={handleKeyDown}
                className="flex gap-1 overflow-x-auto pb-2 mb-6"
              >
                {dict.panels.slice(0, panelCount).map((tab, i) => (
                  <button
                    key={tab.title}
                    role="tab"
                    id={`explorer-tab-${i}`}
                    aria-selected={activeTab === i}
                    aria-controls={`explorer-panel-${i}`}
                    tabIndex={activeTab === i ? 0 : -1}
                    onClick={() => setActiveTab(i)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                      activeTab === i
                        ? 'bg-[color:var(--lm-brand)] text-white'
                        : 'text-[color:var(--lm-text-secondary)] hover:text-[color:var(--lm-text-primary)] hover:bg-[color:var(--lm-tint-5)]'
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>

              {dict.panels.slice(0, panelCount).map((tab, i) => (
                <div
                  key={tab.title}
                  id={`explorer-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`explorer-tab-${i}`}
                  hidden={activeTab !== i}
                  className="max-w-sm"
                >
                  {activeTab === i && (
                    <div>
                      <h3 className="text-xl font-semibold text-[color:var(--lm-text-primary)] mb-2">{tab.title}</h3>
                      <p className="text-sm sm:text-base text-[color:var(--lm-text-secondary)] leading-relaxed">{tab.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
