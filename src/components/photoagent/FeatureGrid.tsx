import type { Dictionary, FeatureId } from './dictionaries/en';
import Glyph, { type GlyphName } from './Glyph';
import Reveal from './Reveal';

const ORDER: { id: FeatureId; glyph: GlyphName; tint: string }[] = [
  { id: 'duplicates', glyph: 'copy', tint: 'coral' },
  { id: 'screenshots', glyph: 'screenshot', tint: 'sky' },
  { id: 'videos', glyph: 'video', tint: 'plum' },
  { id: 'places', glyph: 'map', tint: 'leaf' },
  { id: 'dates', glyph: 'calendar', tint: 'sun' },
  { id: 'albums', glyph: 'album', tint: 'sky' },
  { id: 'favorites', glyph: 'heart', tint: 'coral' },
  { id: 'questions', glyph: 'chat', tint: 'plum' },
  { id: 'private', glyph: 'lock', tint: 'leaf' },
  { id: 'similar', glyph: 'sparkle', tint: 'sun' },
  { id: 'languages', glyph: 'globe', tint: 'sky' },
  { id: 'siri', glyph: 'mic', tint: 'coral' },
];

export default function FeatureGrid({ dict }: { dict: Dictionary['features'] }) {
  return (
    <section id="features" className="py-20 md:py-28 px-4 sm:px-6 scroll-mt-16">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="max-w-2xl mb-10">
          <p className="text-sm font-semibold tracking-wide uppercase text-[color:var(--pa-accent-text)] mb-3">{dict.eyebrow}</p>
          <h2 className="text-[30px] sm:text-[40px] font-bold leading-tight tracking-tight text-[color:var(--pa-title)] mb-4 text-balance">
            {dict.title}
          </h2>
          <p className="text-base sm:text-lg text-[color:var(--pa-secondary)] leading-relaxed">{dict.description}</p>
        </Reveal>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ORDER.map(({ id, glyph, tint }, i) => (
            <li key={id}>
              <Reveal delay={(i % 3) * 60} className="pa-clay p-5 h-full flex gap-4">
                <span
                  className="shrink-0 inline-grid place-items-center w-11 h-11 rounded-2xl"
                  style={{ background: `var(--pa-${tint}-bg)`, color: `var(--pa-${tint}-fg)` }}
                >
                  <Glyph name={glyph} className="w-6 h-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-[color:var(--pa-title)] mb-1">{dict.items[id].title}</h3>
                  <p className="text-[14.5px] text-[color:var(--pa-secondary)] leading-relaxed">{dict.items[id].body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
