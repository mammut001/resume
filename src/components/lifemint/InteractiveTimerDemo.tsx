'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Reveal from './Reveal';
import { DOMAIN_ACCENT, type DomainId } from './domains';
import type { Dictionary } from './dictionaries/en';

type TimerMode = 'countdown' | 'countup';
type FocusMode = 'work' | 'study';
type DemoDomain = 'focus' | 'spend' | 'move';

const ACCENT = DOMAIN_ACCENT;

const TRAIN_TARGET = 3;
const TOTAL = 30;

export default function InteractiveTimerDemo({ dict }: { dict: Dictionary['timerDemo'] }) {
  const [domain, setDomain] = useState<DemoDomain>('focus');
  const [phase, setPhase] = useState<'idle' | 'running' | 'paused' | 'done'>('idle');
  const [timerMode, setTimerMode] = useState<TimerMode>('countdown');
  const [focusMode, setFocusMode] = useState<FocusMode>('study');
  const [display, setDisplay] = useState('00:30');
  const [progress, setProgress] = useState(1);
  const [spendIndex, setSpendIndex] = useState(0);
  const [spendLogged, setSpendLogged] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  const startTimeRef = useRef(0);
  const accruedRef = useRef(30);
  const rafRef = useRef(0);
  const accent = ACCENT[domain as DomainId];

  const formatTime = (seconds: number) => {
    const safe = Math.max(0, seconds);
    const mins = Math.floor(safe / 60);
    const secs = Math.floor(safe % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const stopTimer = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    startTimeRef.current = 0;
    accruedRef.current = timerMode === 'countdown' ? TOTAL : 0;
    setPhase('idle');
    setDisplay(timerMode === 'countdown' ? formatTime(TOTAL) : '00:00');
    setProgress(timerMode === 'countdown' ? 1 : 0);
  }, [timerMode]);

  const tick = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current) / 1000;

    if (timerMode === 'countdown') {
      const left = Math.max(0, accruedRef.current - elapsed);
      setDisplay(formatTime(left));
      setProgress(left / TOTAL);
      if (left <= 0) {
        setPhase('done');
        setDisplay('00:00');
        setProgress(0);
        accruedRef.current = 0;
        return;
      }
    } else {
      const total = accruedRef.current + elapsed;
      setDisplay(formatTime(total));
      setProgress(Math.min(total / TOTAL, 1));
      if (total >= TOTAL) {
        setPhase('done');
        setDisplay(formatTime(TOTAL));
        setProgress(1);
        accruedRef.current = TOTAL;
        return;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [timerMode]);

  useEffect(() => {
    if (phase === 'running') {
      startTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, tick]);

  useEffect(() => {
    if (phase === 'idle') {
      accruedRef.current = timerMode === 'countdown' ? TOTAL : 0;
      setDisplay(timerMode === 'countdown' ? formatTime(TOTAL) : '00:00');
      setProgress(timerMode === 'countdown' ? 1 : 0);
    }
  }, [phase, timerMode]);

  const start = () => {
    accruedRef.current = timerMode === 'countdown' ? TOTAL : 0;
    setPhase('running');
  };

  const pause = () => {
    if (phase !== 'running') return;
    cancelAnimationFrame(rafRef.current);
    const elapsed = startTimeRef.current
      ? (performance.now() - startTimeRef.current) / 1000
      : 0;
    if (timerMode === 'countdown') {
      accruedRef.current = Math.max(0, accruedRef.current - elapsed);
    } else {
      accruedRef.current = Math.min(TOTAL, accruedRef.current + elapsed);
    }
    setPhase('paused');
  };

  const resume = () => {
    setPhase('running');
  };

  const reset = () => {
    cancelAnimationFrame(rafRef.current);
    setPhase('idle');
  };

  const selectTimerMode = (mode: TimerMode) => {
    if (phase === 'running' || phase === 'paused') return;
    setTimerMode(mode);
    setPhase('idle');
  };

  const selectDomain = (next: DemoDomain) => {
    if (next === domain) return;
    if (phase === 'running' || phase === 'paused') stopTimer();
    setDomain(next);
  };

  const circumference = 2 * Math.PI * 52;
  const moveProgress = moveCount / TRAIN_TARGET;
  const ringProgress = domain === 'move' ? moveProgress : domain === 'spend' ? (spendLogged ? 1 : 0) : progress;
  const offset = circumference * (1 - ringProgress);
  const isActive = phase === 'running' || phase === 'paused';
  const category = dict.spendCategories[spendIndex];
  const domains: DemoDomain[] = ['focus', 'spend', 'move'];

  return (
    <Reveal>
      <section id="interactive-demo" className="py-20 md:py-28 px-6 scroll-mt-20" style={{ background: 'var(--lm-brand-softer)' }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-[color:var(--lm-brand-dark-text)] mb-2">{dict.eyebrow}</p>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.1] tracking-tight text-[color:var(--lm-text-primary)] mb-3">
              {dict.title}
            </h2>
            <p className="text-base text-[color:var(--lm-text-secondary)] max-w-lg mx-auto">
              {dict.description}
            </p>
          </div>

          <div
            className="flex gap-1 p-1 rounded-2xl bg-[color:var(--lm-tint-4)] max-w-lg mx-auto mb-8"
            role="tablist"
            aria-label={dict.title}
          >
            {domains.map((id) => {
              const selected = domain === id;
              const color = ACCENT[id];
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectDomain(id)}
                  className="flex-1 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors"
                  style={{
                    background: selected ? color.solid : 'transparent',
                    color: selected ? '#fff' : 'var(--lm-text-secondary)',
                  }}
                >
                  {dict[id]}
                </button>
              );
            })}
          </div>

          <div className="max-w-[360px] mx-auto bg-[color:var(--lm-surface)] rounded-2xl border border-[color:var(--lm-border)] p-8">
            <div className="relative w-40 h-40 mx-auto mb-5">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" strokeWidth="6" style={{ stroke: 'var(--lm-ring-track)' }} />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{ stroke: accent.solid, transition: phase === 'running' ? 'none' : 'stroke-dashoffset 0.35s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {domain === 'focus' && (
                  <>
                    <span className="text-3xl font-semibold text-[color:var(--lm-text-primary)] tabular-nums" aria-live="polite" aria-atomic="true">
                      {display}
                    </span>
                    <span className="text-xs text-[color:var(--lm-text-tertiary)] mt-0.5">
                      {focusMode === 'work' ? dict.work : dict.study}
                    </span>
                  </>
                )}
                {domain === 'spend' && (
                  <>
                    <span className="text-3xl font-semibold tabular-nums" style={{ color: accent.text }}>
                      {category.amount}
                    </span>
                    <span className="text-xs text-[color:var(--lm-text-tertiary)] mt-0.5 px-3 text-center">
                      {spendLogged ? category.cost : category.label}
                    </span>
                  </>
                )}
                {domain === 'move' && (
                  <>
                    <span className="text-3xl font-semibold tabular-nums" style={{ color: accent.text }}>
                      {moveCount} / {TRAIN_TARGET}
                    </span>
                    <span className="text-xs text-[color:var(--lm-text-tertiary)] mt-0.5">{dict.moveWeek}</span>
                  </>
                )}
              </div>
            </div>

            <p className="text-xs text-[color:var(--lm-text-secondary)] text-center mb-5 leading-relaxed">
              {domain === 'focus' && dict.focusHint}
              {domain === 'spend' && dict.spendHint}
              {domain === 'move' && dict.moveHint}
            </p>

            {domain === 'focus' && (
              <>
                <div className="flex gap-2 justify-center mb-5">
                  {phase === 'idle' && (
                    <button onClick={start} className="lm-btn-primary px-6 py-2.5 text-sm">{dict.start}</button>
                  )}
                  {phase === 'running' && (
                    <button onClick={pause} className="lm-btn-primary px-6 py-2.5 text-sm" style={{ background: '#145c3b' }}>{dict.pause}</button>
                  )}
                  {phase === 'paused' && (
                    <>
                      <button onClick={resume} className="lm-btn-primary px-6 py-2.5 text-sm">{dict.resume}</button>
                      <button onClick={reset} className="px-6 py-2.5 text-sm font-medium text-[color:var(--lm-text-secondary)] bg-[color:var(--lm-tint-5)] rounded-xl hover:bg-[color:var(--lm-tint-10)] transition-colors">{dict.reset}</button>
                    </>
                  )}
                  {phase === 'done' && (
                    <button onClick={reset} className="lm-btn-primary px-6 py-2.5 text-sm">{dict.done}</button>
                  )}
                </div>
                <div className="flex gap-2 justify-center flex-wrap">
                  <button
                    onClick={() => selectTimerMode('countdown')}
                    disabled={isActive}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 ${timerMode === 'countdown' ? 'bg-[color:var(--lm-brand)] text-white' : 'bg-[color:var(--lm-tint-5)] text-[color:var(--lm-text-secondary)]'}`}
                    aria-pressed={timerMode === 'countdown'}
                  >
                    {dict.countdown}
                  </button>
                  <button
                    onClick={() => selectTimerMode('countup')}
                    disabled={isActive}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 ${timerMode === 'countup' ? 'bg-[color:var(--lm-brand)] text-white' : 'bg-[color:var(--lm-tint-5)] text-[color:var(--lm-text-secondary)]'}`}
                    aria-pressed={timerMode === 'countup'}
                  >
                    {dict.countUp}
                  </button>
                  <button
                    onClick={() => setFocusMode(focusMode === 'work' ? 'study' : 'work')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${focusMode === 'work' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300' : 'bg-blue-500/10 text-blue-700 dark:text-blue-300'}`}
                    aria-pressed={focusMode === 'work'}
                  >
                    {focusMode === 'work' ? dict.work : dict.study}
                  </button>
                </div>
              </>
            )}

            {domain === 'spend' && (
              <>
                <div className="flex gap-2 justify-center flex-wrap mb-5">
                  {dict.spendCategories.map((item, i) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setSpendIndex(i);
                        setSpendLogged(false);
                      }}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
                      style={{
                        background: spendIndex === i ? accent.solid : 'var(--lm-tint-5)',
                        color: spendIndex === i ? '#fff' : 'var(--lm-text-secondary)',
                      }}
                      aria-pressed={spendIndex === i}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 justify-center">
                  {!spendLogged ? (
                    <button
                      onClick={() => setSpendLogged(true)}
                      className="px-6 py-2.5 text-sm font-medium rounded-xl text-white"
                      style={{ background: accent.solid }}
                    >
                      {dict.spendLog}
                    </button>
                  ) : (
                    <button
                      onClick={() => setSpendLogged(false)}
                      className="px-6 py-2.5 text-sm font-medium text-[color:var(--lm-text-secondary)] bg-[color:var(--lm-tint-5)] rounded-xl hover:bg-[color:var(--lm-tint-10)] transition-colors"
                    >
                      {dict.reset}
                    </button>
                  )}
                </div>
                {spendLogged && (
                  <p className="text-xs text-center mt-3" style={{ color: accent.text }}>
                    {dict.spendLogged} · {dict.spendRate}
                  </p>
                )}
              </>
            )}

            {domain === 'move' && (
              <>
                <div className="flex gap-2 justify-center mb-2">
                  {moveCount < TRAIN_TARGET ? (
                    <button
                      onClick={() => setMoveCount((n) => Math.min(TRAIN_TARGET, n + 1))}
                      className="px-6 py-2.5 text-sm font-medium rounded-xl text-white"
                      style={{ background: accent.solid }}
                    >
                      {dict.moveLog}
                    </button>
                  ) : (
                    <p className="text-sm font-medium" style={{ color: accent.text }}>{dict.moveTargetMet}</p>
                  )}
                </div>
                {moveCount > 0 && (
                  <div className="flex justify-center mt-3">
                    <button
                      onClick={() => setMoveCount(0)}
                      className="px-6 py-2.5 text-sm font-medium text-[color:var(--lm-text-secondary)] bg-[color:var(--lm-tint-5)] rounded-xl hover:bg-[color:var(--lm-tint-10)] transition-colors"
                    >
                      {dict.reset}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
