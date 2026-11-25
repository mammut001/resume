'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import PhoneScreenshot from './DeviceFrame';
import Image from 'next/image';
import { screenshots } from './assets';
import type { Dictionary } from './dictionaries/en';

export default function ProductGallery({ dict }: { dict: Dictionary['productGallery'] }) {
  const [activeTab, setActiveTab] = useState(0);

  const THEMES = [
    {
      id: 'focus',
      label: dict.tabs.focus.label,
      title: dict.tabs.focus.title,
      description: dict.tabs.focus.description,
      main: 'home' as const,
      secondary: 'session-setup' as const,
    },
    {
      id: 'history',
      label: dict.tabs.history.label,
      title: dict.tabs.history.title,
      description: dict.tabs.history.description,
      main: 'records' as const,
      secondary: 'expense' as const,
    },
    {
      id: 'goals',
      label: dict.tabs.goals.label,
      title: dict.tabs.goals.title,
      description: dict.tabs.goals.description,
      main: 'goals' as const,
      secondary: 'earnings' as const,
    },
    {
      id: 'insights',
      label: dict.tabs.insights.label,
      title: dict.tabs.insights.title,
      description: dict.tabs.insights.description,
      main: 'fitness' as const,
      secondary: 'pay-schedule' as const,
    },
  ];

  const activeTheme = THEMES[activeTab];

  return (
    <section className="py-20 md:py-28 px-6 bg-[color:var(--lm-bg-warm)] overflow-hidden">
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

        {/* Desktop Theme Tabs */}
        <Reveal delay={100}>
          <div className="hidden lg:flex justify-center gap-2 mb-12">
            {THEMES.map((theme, idx) => (
              <button
                key={theme.id}
                onClick={() => setActiveTab(idx)}
                aria-pressed={activeTab === idx}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${
                  activeTab === idx
                    ? 'bg-[color:var(--lm-brand)] text-white'
                    : 'bg-[color:var(--lm-tint-5)] text-[color:var(--lm-text-secondary)] hover:text-[color:var(--lm-text-primary)] hover:bg-[color:var(--lm-tint-10)]'
                }`}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 items-center">
          {/* Left: Main phone Frame */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-[380px] lm-screenshot-enter" key={activeTab + '-main'}>
              <PhoneScreenshot src={activeTheme.main} alt={activeTheme.label} />
            </div>
          </div>

          {/* Right: Secondary panel and details */}
          <div className="flex flex-col gap-8 justify-center items-start">
            <div className="w-full max-w-[240px] rounded-[24px] overflow-hidden border border-[color:var(--lm-border)] bg-[color:var(--lm-white)] p-2 lm-screenshot-enter" key={activeTab + '-sec'}>
              <Image
                src={screenshots.iphone[activeTheme.secondary]}
                alt=""
                width={720}
                height={1560}
                unoptimized
                className="w-full h-auto object-cover rounded-[16px]"
              />
            </div>
            <div className="bg-[color:var(--lm-white-80)] backdrop-blur-md rounded-2xl border border-[color:var(--lm-border)] p-6 max-w-sm">
              <h4 className="text-lg font-semibold text-[color:var(--lm-text-primary)] mb-2">
                {activeTheme.title}
              </h4>
              <p className="text-sm sm:text-base text-[color:var(--lm-text-secondary)] leading-relaxed">
                {activeTheme.description}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile horizontal scroll-snap layout */}
        <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6">
          {THEMES.map((theme) => (
            <div
              key={theme.id}
              className="snap-center shrink-0 w-[85vw] max-w-[320px] bg-[color:var(--lm-white)] rounded-3xl border border-[color:var(--lm-border)] p-6 flex flex-col justify-between"
            >
              <div className="mb-6">
                <span className="text-xs font-semibold text-[color:var(--lm-brand-text)] tracking-wider uppercase mb-1.5 block">
                  {theme.label}
                </span>
                <h3 className="text-lg font-semibold text-[color:var(--lm-text-primary)] mb-2">
                  {theme.title}
                </h3>
                <p className="text-sm text-[color:var(--lm-text-secondary)] leading-relaxed">
                  {theme.description}
                </p>
              </div>

              <div className="relative flex justify-center items-end h-[340px] bg-[color:var(--lm-bg-warm)] rounded-2xl p-4 overflow-hidden">
                {/* Main Screenshot */}
                <div className="w-[160px] z-10 translate-x-[-20px]">
                  <PhoneScreenshot src={theme.main} alt="" className="scale-95" />
                </div>
                {/* Secondary Screenshot */}
                <div className="absolute w-[120px] right-4 bottom-4 z-0 rounded-[16px] overflow-hidden border border-[color:var(--lm-border)] bg-[color:var(--lm-white)] p-1">
                  <Image src={screenshots.iphone[theme.secondary]} alt="" width={720} height={1560} unoptimized className="w-full h-auto rounded-[12px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
