'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from './dictionaries/en';
import { fill } from './site';
import Glyph, { type GlyphName } from './Glyph';
import Reveal from './Reveal';
import { PhoneFrame } from './DeviceFrame';

/**
 * The web version of the second onboarding page: eight drawn tiles to select with a sideways drag (mouse or finger),
 * then Delete through a PhotoAgent confirmation and one styled as the iOS prompt. Nothing real is touched; the tiles
 * come back after a moment.
 */

type Kind = 'sunset' | 'dog' | 'cake';
const KINDS: { kind: Kind; glyph: GlyphName; tint: string }[] = [
  { kind: 'sunset', glyph: 'sunset', tint: 'sun' },
  { kind: 'sunset', glyph: 'sunset', tint: 'sun' },
  { kind: 'sunset', glyph: 'sunset', tint: 'sun' },
  { kind: 'sunset', glyph: 'sunset', tint: 'sun' },
  { kind: 'dog', glyph: 'dog', tint: 'sky' },
  { kind: 'dog', glyph: 'dog', tint: 'sky' },
  { kind: 'dog', glyph: 'dog', tint: 'sky' },
  { kind: 'cake', glyph: 'cake', tint: 'plum' },
];

type Step = 'choosing' | 'appConfirm' | 'systemConfirm' | 'deleted' | 'restored';

const RESTORE_DELAY = 1800;
/** How far a finger or pen moves before the gesture counts as a sideways select or a page scroll. */
const SLOP = 8;

type Drag = {
  start: number;
  mode: boolean;
  base: boolean[];
  pointerId: number;
  x0: number;
  y0: number;
  /** Mouse selects at once; touch and pen wait until the pointer has moved mostly sideways. */
  active: boolean;
  moved: boolean;
};

export default function CleanupDemo({ dict }: { dict: Dictionary['cleanupDemo'] }) {
  const [selected, setSelected] = useState<boolean[]>(() => KINDS.map(() => false));
  const [gone, setGone] = useState<boolean[]>(() => KINDS.map(() => false));
  const [step, setStep] = useState<Step>('choosing');
  const drag = useRef<Drag | null>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const deleteRef = useRef<HTMLButtonElement>(null);
  const appConfirmRef = useRef<HTMLButtonElement>(null);
  const systemConfirmRef = useRef<HTMLButtonElement>(null);
  const restoreTimer = useRef<number | null>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const count = selected.filter((s, i) => s && !gone[i]).length;

  useEffect(() => {
    if (step === 'appConfirm') appConfirmRef.current?.focus();
    if (step === 'systemConfirm') systemConfirmRef.current?.focus();
    // The alert and the Delete button are gone or disabled now, so hold focus on the status line meanwhile.
    if (step === 'deleted') statusRef.current?.focus({ preventScroll: true });
    // The tiles are enabled again by this render; only move focus if it is still parked on the status line.
    if (step === 'restored' && document.activeElement === statusRef.current) {
      tileRefs.current[0]?.focus({ preventScroll: true });
    }
  }, [step]);

  useEffect(() => () => {
    if (restoreTimer.current) window.clearTimeout(restoreTimer.current);
  }, []);

  const tileIndexAt = (x: number, y: number): number | null => {
    const el = document.elementFromPoint(x, y)?.closest('[data-tile]');
    if (!el) return null;
    const index = Number((el as HTMLElement).dataset.tile);
    return Number.isNaN(index) ? null : index;
  };

  const applyRange = (to: number) => {
    const d = drag.current;
    if (!d) return;
    const [lo, hi] = d.start < to ? [d.start, to] : [to, d.start];
    setSelected(d.base.map((value, i) => (i >= lo && i <= hi && !gone[i] ? d.mode : value)));
  };

  const activate = () => {
    if (step === 'restored') setStep('choosing');
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>, index: number) => {
    if (step !== 'choosing' && step !== 'restored') return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const isMouse = e.pointerType === 'mouse';
    drag.current = {
      start: index,
      mode: !selected[index],
      base: selected,
      pointerId: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      active: isMouse,
      moved: false,
    };
    // Release the implicit touch capture so elementFromPoint follows the finger across tiles.
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (isMouse) {
      activate();
      applyRange(index);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId) return;
    if (!d.active) {
      const dx = Math.abs(e.clientX - d.x0);
      const dy = Math.abs(e.clientY - d.y0);
      if (Math.max(dx, dy) < SLOP) return;
      d.moved = true;
      if (dy >= dx) {
        // Mostly up or down: the finger is scrolling the page, so leave the selection alone.
        drag.current = null;
        return;
      }
      d.active = true;
      activate();
      applyRange(d.start);
    }
    const index = tileIndexAt(e.clientX, e.clientY);
    if (index !== null) applyRange(index);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d && d.pointerId === e.pointerId && !d.active && !d.moved) {
      // A touch or pen tap with almost no movement toggles one tile.
      activate();
      applyRange(d.start);
    }
    drag.current = null;
  };

  const endDrag = () => {
    drag.current = null;
  };

  // Keyboard and assistive technology: a click with no pointer (Enter, Space, VoiceOver) toggles one tile.
  const onClick = (e: React.MouseEvent, index: number) => {
    if (e.detail !== 0) return;
    if (step === 'restored') setStep('choosing');
    if (step !== 'choosing' && step !== 'restored') return;
    setSelected((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const startDelete = () => {
    if (count === 0) return;
    setStep('appConfirm');
  };

  const cancel = () => {
    setStep('choosing');
    window.setTimeout(() => deleteRef.current?.focus(), 0);
  };

  const confirmSystem = () => {
    setGone(selected.map((s, i) => s || gone[i]));
    setStep('deleted');
    restoreTimer.current = window.setTimeout(() => {
      setGone(KINDS.map(() => false));
      setSelected(KINDS.map(() => false));
      setStep('restored');
    }, RESTORE_DELAY);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (step !== 'appConfirm' && step !== 'systemConfirm') return;
    if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
      return;
    }
    // Both confirmations are modal: Tab and Shift+Tab cycle between their two buttons.
    if (e.key === 'Tab' && dialogRef.current) {
      const buttons = Array.from(dialogRef.current.querySelectorAll<HTMLButtonElement>('button:not([disabled])'));
      if (buttons.length === 0) return;
      e.preventDefault();
      const at = buttons.indexOf(document.activeElement as HTMLButtonElement);
      const next = at === -1 ? 0 : (at + (e.shiftKey ? buttons.length - 1 : 1)) % buttons.length;
      buttons[next].focus();
    }
  };

  const status =
    step === 'deleted'
      ? dict.deleted
      : step === 'restored'
        ? dict.restored
        : fill(dict.selected, { n: count });

  const dialogOpen = step === 'appConfirm' || step === 'systemConfirm';

  return (
    <section id="cleanup" className="py-20 md:py-28 px-4 sm:px-6 scroll-mt-16 bg-[var(--pa-sunken)]">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal className="lg:order-2">
          <p className="text-sm font-semibold tracking-wide uppercase text-[color:var(--pa-accent-text)] mb-3">{dict.eyebrow}</p>
          <h2 className="text-[30px] sm:text-[40px] font-bold leading-tight tracking-tight text-[color:var(--pa-title)] mb-4 text-balance">
            {dict.title}
          </h2>
          <p className="text-base sm:text-lg text-[color:var(--pa-secondary)] leading-relaxed max-w-lg mb-6">{dict.description}</p>
          <ul className="space-y-3 max-w-lg">
            {dict.points.map((p) => (
              <li key={p} className="flex gap-3 text-[color:var(--pa-body)]">
                <span className="mt-1 shrink-0 w-5 h-5 rounded-full grid place-items-center bg-[var(--pa-leaf-bg)] text-[color:var(--pa-leaf-fg)]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path d="M5 12.5 L10 17 L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="flex justify-center lg:order-1">
          <PhoneFrame className="w-full max-w-[340px]">
            <div className="relative px-4 pt-8 pb-5 min-h-[430px] flex flex-col" onKeyDown={onKeyDown}>
              <div className="pa-clay p-3.5" aria-hidden={dialogOpen || undefined}>
                <p className="text-sm font-semibold text-[color:var(--pa-title)] mb-3">{fill(dict.groupLabel, { n: KINDS.length })}</p>
                <div
                  className="grid grid-cols-4 gap-1.5 select-none"
                  style={{ touchAction: 'pan-y', WebkitUserSelect: 'none' }}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={endDrag}
                  onPointerLeave={(e) => {
                    if (e.pointerType === 'mouse') endDrag();
                  }}
                >
                  {KINDS.map((tile, i) => {
                    const isSelected = selected[i] && !gone[i];
                    const name = dict.tileNames[tile.kind];
                    return (
                      <button
                        key={i}
                        ref={(el) => {
                          tileRefs.current[i] = el;
                        }}
                        type="button"
                        data-tile={i}
                        aria-pressed={isSelected}
                        aria-label={fill(dict.tileLabel, { n: i + 1, name })}
                        disabled={gone[i] || dialogOpen}
                        tabIndex={gone[i] || dialogOpen ? -1 : 0}
                        onPointerDown={(e) => onPointerDown(e, i)}
                        onClick={(e) => onClick(e, i)}
                        className="relative aspect-square rounded-xl grid place-items-center cursor-pointer disabled:cursor-default"
                        style={{
                          background: `var(--pa-${tile.tint}-bg)`,
                          color: `var(--pa-${tile.tint}-fg)`,
                          transform: gone[i] ? 'scale(0.4)' : isSelected ? 'scale(0.9)' : 'none',
                          opacity: gone[i] ? 0 : 1,
                          transition: 'transform 0.18s ease, opacity 0.3s ease',
                          boxShadow: isSelected ? '0 0 0 2.5px var(--pa-accent)' : 'none',
                        }}
                      >
                        <Glyph name={tile.glyph} className="w-[50%] h-[50%] pointer-events-none" />
                        {isSelected && (
                          <span
                            className="absolute right-1 bottom-1 w-[18px] h-[18px] rounded-full grid place-items-center text-white"
                            style={{ background: 'var(--pa-accent-fill)' }}
                            aria-hidden="true"
                          >
                            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3.4}>
                              <path d="M5 12.5 L10 17 L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between gap-3 mt-4">
                  <p
                    ref={statusRef}
                    tabIndex={-1}
                    className="text-[13px] font-semibold text-[color:var(--pa-title)] outline-none"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {status}
                  </p>
                  <button
                    ref={deleteRef}
                    type="button"
                    onClick={startDelete}
                    disabled={count === 0 || step === 'deleted' || dialogOpen}
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full text-[13px] font-bold text-white disabled:opacity-40"
                    style={{ background: 'var(--pa-danger-fill)' }}
                  >
                    <Glyph name="trash" className="w-4 h-4" />
                    {dict.delete}
                  </button>
                </div>
              </div>
              <p className="text-[12.5px] text-[color:var(--pa-secondary)] text-center mt-4" aria-hidden={dialogOpen || undefined}>
                {dict.justDemo}
              </p>

              {step === 'appConfirm' && (
                <div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="cleanup-app-title"
                  aria-describedby="cleanup-app-body"
                  className="absolute inset-x-2.5 bottom-2.5 z-10 pa-clay p-4 pa-sheet-in"
                >
                  <h3 id="cleanup-app-title" className="text-base font-bold text-[color:var(--pa-title)] mb-1">
                    {count === 1 && dict.appConfirmTitleOne ? dict.appConfirmTitleOne : fill(dict.appConfirmTitle, { n: count })}
                  </h3>
                  <p id="cleanup-app-body" className="text-[13px] text-[color:var(--pa-secondary)] mb-3">
                    {dict.appConfirmBody}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={cancel}
                      className="flex-1 min-h-[44px] rounded-full text-sm font-semibold text-[color:var(--pa-title)]"
                      style={{ background: 'var(--pa-card-border)' }}
                    >
                      {dict.cancel}
                    </button>
                    <button
                      ref={appConfirmRef}
                      type="button"
                      onClick={() => setStep('systemConfirm')}
                      className="flex-1 min-h-[44px] rounded-full text-sm font-bold text-white"
                      style={{ background: 'var(--pa-danger-fill)' }}
                    >
                      {dict.delete}
                    </button>
                  </div>
                </div>
              )}

              {step === 'systemConfirm' && (
                <div className="absolute inset-0 z-10 grid place-items-center px-6" style={{ background: 'rgba(0,0,0,0.28)' }}>
                  <div
                    ref={dialogRef}
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="cleanup-system-title"
                    aria-describedby="cleanup-system-body"
                    className="w-full max-w-[270px] rounded-[14px] overflow-hidden text-center pa-alert-in backdrop-blur-xl"
                    style={{ background: 'var(--pa-system-sheet)', color: 'var(--pa-system-text)' }}
                  >
                    <div className="px-4 pt-5 pb-4">
                      <h3 id="cleanup-system-title" className="text-[16px] font-semibold leading-snug mb-1">
                        {count === 1 && dict.systemTitleOne ? dict.systemTitleOne : fill(dict.systemTitle, { n: count })}
                      </h3>
                      <p id="cleanup-system-body" className="text-[12.5px] leading-snug">
                        {dict.systemBody}
                      </p>
                    </div>
                    <div className="grid grid-cols-2" style={{ borderTop: '0.5px solid var(--pa-system-divider)' }}>
                      <button
                        type="button"
                        onClick={cancel}
                        className="min-h-[44px] text-[16px] pa-inset-focus"
                        style={{ color: 'var(--pa-system-blue)', borderRight: '0.5px solid var(--pa-system-divider)' }}
                      >
                        {dict.systemDontAllow}
                      </button>
                      <button
                        ref={systemConfirmRef}
                        type="button"
                        onClick={confirmSystem}
                        className="min-h-[44px] text-[16px] font-semibold pa-inset-focus"
                        style={{ color: 'var(--pa-system-red)' }}
                      >
                        {dict.systemDelete}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </PhoneFrame>
        </Reveal>
      </div>
    </section>
  );
}
