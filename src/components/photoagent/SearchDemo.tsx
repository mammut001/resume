'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dictionary, ExampleId } from './dictionaries/en';
import { fill } from './site';
import Glyph, { type GlyphName } from './Glyph';
import PhotoBuddy from './PhotoBuddy';
import Reveal from './Reveal';
import { PhoneFrame } from './DeviceFrame';

/** The web version of the first onboarding page: a drawn request field types a request and the matching tiles light up. */

const TINTS = ['sky', 'sun', 'plum', 'leaf', 'coral'] as const;

// The same twelve tiles per example as OnboardingDemos.swift, four across, matches spread out.
const TILES: Record<ExampleId, { glyph: GlyphName; label: string; hit: boolean }[]> = {
  cats: (['cat', 'tree', 'cat', 'food', 'city', 'cat', 'car', 'cat', 'sunset', 'screenshot', 'cat', 'cake'] as const).map(
    (g) => ({ glyph: g, label: g, hit: g === 'cat' })
  ),
  beach: (['beach', 'cat', 'waves', 'food', 'beach', 'car', 'waves', 'screenshot', 'beach', 'city', 'waves', 'tree'] as const).map(
    (g) => ({ glyph: g, label: g, hit: g === 'beach' || g === 'waves' })
  ),
  screenshots: (
    ['screenshot', 'cat', 'screenshot', 'food', 'screenshot', 'tree', 'screenshot', 'car', 'screenshot', 'sunset', 'screenshot', 'cake'] as const
  ).map((g) => ({ glyph: g, label: g, hit: g === 'screenshot' })),
};

const EXAMPLES: ExampleId[] = ['cats', 'beach', 'screenshots'];

function matchIndices(example: ExampleId) {
  return TILES[example].flatMap((t, i) => (t.hit ? [i] : []));
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function SearchDemo({ dict }: { dict: Dictionary['searchDemo'] }) {
  const [example, setExample] = useState<ExampleId>('cats');
  // The first render shows the finished demo, so it reads right without JavaScript and with Reduce Motion.
  const [typed, setTyped] = useState(dict.examples.cats.request);
  const [lit, setLit] = useState<number[]>(matchIndices('cats'));
  const [showsFound, setShowsFound] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [year, setYear] = useState(() => new Date().getFullYear() - 1);
  const timers = useRef<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const started = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const play = useCallback(
    (next: ExampleId) => {
      clearTimers();
      setExample(next);
      const request = dict.examples[next].request;
      const matches = matchIndices(next);
      if (prefersReducedMotion()) {
        setTyped(request);
        setLit(matches);
        setShowsFound(true);
        setPlaying(false);
        return;
      }
      setTyped('');
      setLit([]);
      setShowsFound(false);
      setPlaying(true);
      const chars = Array.from(request);
      const step = chars.length > 14 ? 55 : 85;
      let at = 250;
      chars.forEach((_, i) => {
        at += step;
        timers.current.push(window.setTimeout(() => setTyped(chars.slice(0, i + 1).join('')), at));
      });
      at += 300;
      matches.forEach((index, i) => {
        timers.current.push(window.setTimeout(() => setLit(matches.slice(0, i + 1)), at + i * 170));
      });
      at += matches.length * 170 + 200;
      timers.current.push(
        window.setTimeout(() => {
          setShowsFound(true);
          setPlaying(false);
        }, at)
      );
    },
    [dict]
  );

  useEffect(() => {
    setYear(new Date().getFullYear() - 1);
    const el = sectionRef.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          play('cats');
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [play]);

  const current = dict.examples[example];
  const found = fill(current.found, { n: matchIndices(example).length, year });
  const tiles = TILES[example];

  return (
    <section ref={sectionRef} id="search" className="py-20 md:py-28 px-4 sm:px-6 scroll-mt-16">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal>
          <p className="text-sm font-semibold tracking-wide uppercase text-[color:var(--pa-accent-text)] mb-3">{dict.eyebrow}</p>
          <h2 className="text-[30px] sm:text-[40px] font-bold leading-tight tracking-tight text-[color:var(--pa-title)] mb-4 text-balance">
            {dict.title}
          </h2>
          <p className="text-base sm:text-lg text-[color:var(--pa-secondary)] leading-relaxed max-w-lg mb-8">{dict.description}</p>
          <div role="group" aria-label={dict.examplesLabel} className="flex flex-wrap gap-2.5">
            {EXAMPLES.map((id) => (
              <button
                key={id}
                type="button"
                className="pa-chip"
                aria-pressed={example === id}
                onClick={() => play(id)}
              >
                {dict.examples[id].request}
              </button>
            ))}
          </div>
          <p className="text-sm text-[color:var(--pa-secondary)] mt-6">{dict.note}</p>
        </Reveal>

        <Reveal delay={120} className="flex justify-center">
          <PhoneFrame className="w-full max-w-[340px]">
            <div className="px-4 pt-8 pb-5 min-h-[460px] flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <PhotoBuddy className="w-11 h-11" />
                <span className="text-lg font-bold text-[color:var(--pa-title)]">PhotoAgent</span>
              </div>
              <div className="pa-clay p-3.5">
                <div
                  className="flex items-center gap-2 rounded-2xl px-3 py-2.5 min-h-[46px] text-[15px] text-[color:var(--pa-title)]"
                  style={{ background: 'var(--pa-page)' }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-[color:var(--pa-secondary)]" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                    <circle cx="10.5" cy="10.5" r="6" />
                    <path d="M15 15 L20 20" strokeLinecap="round" />
                  </svg>
                  <span className="sr-only">{dict.fieldLabel}: </span>
                  <span className="min-w-0 break-words">{typed}</span>
                  {playing && <span className="pa-caret" aria-hidden="true" />}
                </div>
                <div className="grid grid-cols-4 gap-1.5 mt-3" aria-hidden="true">
                  {tiles.map((tile, i) => {
                    const tint = TINTS[i % TINTS.length];
                    const on = lit.includes(i);
                    return (
                      <div
                        key={`${example}-${i}`}
                        className={`pa-tile aspect-square rounded-xl grid place-items-center ${on ? 'pa-tile-hit' : 'pa-tile-dim'}`}
                        style={{ background: `var(--pa-${tint}-bg)`, color: `var(--pa-${tint}-fg)` }}
                        title={dict.tileLabels[tile.label]}
                      >
                        <Glyph name={tile.glyph} className="w-[46%] h-[46%]" />
                      </div>
                    );
                  })}
                </div>
                <p className="text-[13px] font-semibold text-[color:var(--pa-accent-text)] mt-3 min-h-[20px]" aria-live="polite" aria-atomic="true">
                  {showsFound ? <span suppressHydrationWarning>{found}</span> : ''}
                </p>
              </div>
              <p className="sr-only" suppressHydrationWarning>
                {fill(dict.demoLabel, { request: current.request, found })}
              </p>
              <div className="mt-auto pt-6 flex justify-center">
                <button type="button" className="pa-btn-secondary !min-h-[44px] !py-2.5" onClick={() => play(example)}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                    <path d="M4 12 A8 8 0 1 0 7 5.8 M4 4 L4 9 L9 9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {dict.replay}
                </button>
              </div>
            </div>
          </PhoneFrame>
        </Reveal>
      </div>
    </section>
  );
}
