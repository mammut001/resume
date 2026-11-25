import type { Dictionary } from './dictionaries/en';
import { privacyUrl, type Locale } from './site';
import Glyph, { type GlyphName } from './Glyph';
import Reveal from './Reveal';

const ICONS: { glyph: GlyphName; tint: string }[] = [
  { glyph: 'lock', tint: 'leaf' },
  { glyph: 'cloudOff', tint: 'sky' },
  { glyph: 'user', tint: 'plum' },
  { glyph: 'check2', tint: 'coral' },
  { glyph: 'trash', tint: 'sun' },
];

export default function PrivacySection({ dict, lang }: { dict: Dictionary['privacy']; lang: Locale }) {
  return (
    <section id="privacy" className="py-20 md:py-28 px-4 sm:px-6 scroll-mt-16">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="max-w-2xl mb-10">
          <p className="text-sm font-semibold tracking-wide uppercase text-[color:var(--pa-accent-text)] mb-3">{dict.eyebrow}</p>
          <h2 className="text-[30px] sm:text-[40px] font-bold leading-tight tracking-tight text-[color:var(--pa-title)] mb-4 text-balance">
            {dict.title}
          </h2>
          <p className="text-base sm:text-lg text-[color:var(--pa-secondary)] leading-relaxed">{dict.description}</p>
        </Reveal>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dict.points.map((point, i) => (
            <li key={point.title}>
              <Reveal delay={i * 60} className="pa-clay p-5 h-full">
                <span
                  className="inline-grid place-items-center w-11 h-11 rounded-2xl mb-3"
                  style={{ background: `var(--pa-${ICONS[i].tint}-bg)`, color: `var(--pa-${ICONS[i].tint}-fg)` }}
                >
                  <Glyph name={ICONS[i].glyph} className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-[color:var(--pa-title)] mb-1">{point.title}</h3>
                <p className="text-[15px] text-[color:var(--pa-secondary)] leading-relaxed">{point.body}</p>
              </Reveal>
            </li>
          ))}
          <li className="sm:col-span-2 lg:col-span-1">
            <Reveal delay={300} className="rounded-[24px] p-5 h-full border-2 border-dashed border-[color:var(--pa-card-border)]">
              <span
                className="inline-grid place-items-center w-11 h-11 rounded-2xl mb-3"
                style={{ background: 'var(--pa-sky-bg)', color: 'var(--pa-sky-fg)' }}
              >
                <Glyph name="map" className="w-6 h-6" />
              </span>
              <h3 className="text-lg font-bold text-[color:var(--pa-title)] mb-1">{dict.mapsTitle}</h3>
              <p className="text-[15px] text-[color:var(--pa-secondary)] leading-relaxed mb-3">{dict.mapsBody}</p>
              <ul className="space-y-2 text-[14px] text-[color:var(--pa-body)] leading-relaxed list-disc pl-5">
                {dict.mapsPoints.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Reveal>
          </li>
        </ul>

        <Reveal className="mt-8">
          <a href={privacyUrl(lang)} className="pa-btn-secondary !px-0 hover:!bg-transparent underline underline-offset-4" data-link="privacy">
            {dict.policy}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
