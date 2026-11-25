'use client';

import { useState } from 'react';
import type { Dictionary } from './dictionaries/en';
import Glyph from './Glyph';
import Reveal from './Reveal';

// The nine speaking languages of VoiceLanguage (SpeechRecognizing.swift), each with a request in that language.
const VOICE_LANGUAGES = [
  { code: 'zh', name: '中文', lang: 'zh-CN', example: '去年夏天在海边拍的自拍' },
  { code: 'en', name: 'English', lang: 'en', example: 'Selfies at the beach last summer' },
  { code: 'ja', name: '日本語', lang: 'ja', example: '去年の夏に海で撮った自撮り' },
  { code: 'ko', name: '한국어', lang: 'ko', example: '작년 여름 바다 셀카' },
  { code: 'fr', name: 'Français', lang: 'fr', example: 'Mes selfies à la plage l’été dernier' },
  { code: 'es', name: 'Español', lang: 'es', example: 'Fotos de la playa el verano pasado' },
  { code: 'de', name: 'Deutsch', lang: 'de', example: 'Selfies am Strand letzten Sommer' },
  { code: 'it', name: 'Italiano', lang: 'it', example: 'Selfie al mare l’estate scorsa' },
  { code: 'pt', name: 'Português', lang: 'pt', example: 'Selfies na praia no verão passado' },
] as const;

export default function VoiceSection({ dict, initial }: { dict: Dictionary['voice']; initial: string }) {
  const start = VOICE_LANGUAGES.findIndex((l) => l.code === initial);
  const [index, setIndex] = useState(start >= 0 ? start : 1);
  const current = VOICE_LANGUAGES[index];

  return (
    <section id="voice" className="py-20 md:py-28 px-4 sm:px-6 scroll-mt-16 bg-[var(--pa-sunken)]">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal>
          <p className="text-sm font-semibold tracking-wide uppercase text-[color:var(--pa-accent-text)] mb-3">{dict.eyebrow}</p>
          <h2 className="text-[30px] sm:text-[40px] font-bold leading-tight tracking-tight text-[color:var(--pa-title)] mb-4 text-balance">
            {dict.title}
          </h2>
          <p className="text-base sm:text-lg text-[color:var(--pa-secondary)] leading-relaxed max-w-lg mb-6">{dict.description}</p>
          <ul className="space-y-3 max-w-lg">
            {dict.points.map((p) => (
              <li key={p} className="flex gap-3 text-[color:var(--pa-body)]">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--pa-accent)' }} aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="pa-clay p-6 sm:p-8 text-center">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <span className="absolute inset-0 rounded-full pa-bob" style={{ background: 'var(--pa-coral-bg)' }} aria-hidden="true" />
              <span className="absolute inset-0 grid place-items-center" style={{ color: 'var(--pa-accent-text)' }}>
                <Glyph name="mic" className="w-11 h-11" />
              </span>
            </div>
            <p className="text-sm font-semibold text-[color:var(--pa-secondary)] mb-2">{dict.exampleLabel}</p>
            <p
              lang={current.lang}
              aria-live="polite"
              className="rounded-2xl px-4 py-3 text-lg font-semibold min-h-[56px] mb-6 break-words"
              style={{ background: 'var(--pa-leaf-bg)', color: 'var(--pa-leaf-fg)' }}
            >
              “{current.example}”
            </p>
            <p id="voice-languages" className="text-sm font-semibold text-[color:var(--pa-secondary)] mb-3">
              {dict.languagesLabel}
            </p>
            <div role="group" aria-labelledby="voice-languages" className="flex flex-wrap justify-center gap-2">
              {VOICE_LANGUAGES.map((l, i) => (
                <button
                  key={l.code}
                  type="button"
                  lang={l.lang}
                  className="pa-chip !text-[13px] !min-h-[36px] !px-3"
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
