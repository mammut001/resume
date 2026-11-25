import type { Dictionary } from './dictionaries/en';
import Reveal from './Reveal';

export default function ProSection({ dict }: { dict: Dictionary['pro'] }) {
  const cards = [
    { ...dict.free, tint: 'leaf' },
    { ...dict.daily, tint: 'sun' },
    { ...dict.pro, tint: 'plum' },
  ];
  return (
    <section id="pro" className="py-20 md:py-28 px-4 sm:px-6 scroll-mt-16">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="max-w-2xl mb-10">
          <p className="text-sm font-semibold tracking-wide uppercase text-[color:var(--pa-accent-text)] mb-3">{dict.eyebrow}</p>
          <h2 className="text-[30px] sm:text-[40px] font-bold leading-tight tracking-tight text-[color:var(--pa-title)] mb-4 text-balance">
            {dict.title}
          </h2>
          <p className="text-base sm:text-lg text-[color:var(--pa-secondary)] leading-relaxed">{dict.description}</p>
        </Reveal>
        <ul className="grid md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <li key={card.label}>
              <Reveal delay={i * 80} className={`pa-clay p-6 h-full ${i === 2 ? 'ring-2 ring-[color:var(--pa-accent)]' : ''}`}>
                <span
                  className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-4"
                  style={{ background: `var(--pa-${card.tint}-bg)`, color: `var(--pa-${card.tint}-fg)` }}
                >
                  {card.label}
                </span>
                <h3 className="text-xl font-bold text-[color:var(--pa-title)] mb-2">{card.title}</h3>
                <p className="text-[15px] text-[color:var(--pa-secondary)] leading-relaxed">{card.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[color:var(--pa-secondary)] mt-6">{dict.note}</p>
      </div>
    </section>
  );
}
