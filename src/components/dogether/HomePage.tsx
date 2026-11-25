import type { Dictionary } from "./dictionaries/en";
import { APP_STORE_URL } from "./site";

const SCREENSHOTS = ["01-together-home", "02-plan-detail", "03-activity", "04-privacy"] as const;
// Screenshots are 1320×2868 on the device, served at 720 px wide.
const SHOT_WIDTH = 720;
const SHOT_HEIGHT = 1564;

function shotSrc(name: string) {
  return `/dogether/screenshots/${name}.webp`;
}

const muted = "text-[color:var(--dg-muted)]";
const brand = "text-[color:var(--dg-brand)]";
const card = "rounded-2xl border border-[color:var(--dg-line)]";

export default function HomePage({ dict }: { dict: Dictionary }) {
  return (
    <>
      <section className="px-6 pb-16 pt-28">
        <div className="mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--dg-brand-border)] bg-[color:var(--dg-brand-soft)] px-3 py-1 text-sm text-[color:var(--dg-brand-deep)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--dg-brand)]" />
              {dict.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
              {dict.hero.title}
              <br />
              <span className={brand}>{dict.hero.accent}</span>
            </h1>
            <p className={`mt-5 max-w-md text-lg leading-relaxed ${muted}`}>{dict.hero.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="dg-btn-primary">
                {dict.hero.download}
                <span className="text-xs font-medium text-white/80">{dict.hero.downloadNote}</span>
              </a>
              <a href="#how" className={`dg-focus rounded-full px-5 py-3 text-sm hover:text-[color:var(--dg-ink)] ${muted}`}>
                {dict.hero.how}
              </a>
            </div>
            <ul className={`mt-8 flex flex-wrap gap-2 text-xs ${muted}`}>
              {dict.hero.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-[color:var(--dg-line)] bg-[color:var(--dg-surface)] px-3 py-1.5"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[280px] rounded-[36px] bg-[color:var(--dg-frame)] p-2 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shotSrc(SCREENSHOTS[0])}
              alt={dict.gallery.captions[0]}
              width={SHOT_WIDTH}
              height={SHOT_HEIGHT}
              className="h-auto w-full rounded-[28px]"
            />
          </div>
        </div>
      </section>

      <section id="templates" className="px-6 py-16">
        <div className="mx-auto max-w-[1120px]">
          <p className={`text-sm ${brand}`}>{dict.templates.kicker}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">{dict.templates.title}</h2>
          <p className={`mt-3 max-w-2xl text-sm leading-relaxed ${muted}`}>{dict.templates.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.templates.items.map((item) => (
              <article key={item.name} className={`${card} bg-[color:var(--dg-surface)] p-5`}>
                <p className={`text-xs font-semibold uppercase tracking-wider ${brand}`}>{item.name}</p>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-y border-[color:var(--dg-line)] bg-[color:var(--dg-surface)] px-6 py-16"
      >
        <div className="mx-auto max-w-[1120px]">
          <p className={`text-sm ${brand}`}>{dict.features.kicker}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">{dict.features.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {dict.features.items.map((item) => (
              <article key={item.title} className={`${card} bg-[color:var(--dg-paper)] p-5`}>
                <h3 className="font-semibold">{item.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="px-6 py-16">
        <div className="mx-auto max-w-[1120px]">
          <p className={`text-sm ${brand}`}>{dict.how.kicker}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">{dict.how.title}</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {dict.how.steps.map((step) => (
              <li key={step.n} className={`${card} bg-[color:var(--dg-surface)] p-5`}>
                <div className={`text-xs font-semibold ${brand}`}>{step.n}</div>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="screens" className="bg-[color:var(--dg-tint)] px-6 py-16">
        <div className="mx-auto max-w-[1120px]">
          <p className={`text-sm ${brand}`}>{dict.gallery.kicker}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">{dict.gallery.title}</h2>
          <p className={`mt-2 text-sm ${muted}`}>{dict.gallery.note}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SCREENSHOTS.map((name, index) => (
              <figure
                key={name}
                className="overflow-hidden rounded-[28px] border border-[color:var(--dg-line)] bg-[color:var(--dg-surface)] p-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shotSrc(name)}
                  alt={dict.gallery.captions[index]}
                  width={SHOT_WIDTH}
                  height={SHOT_HEIGHT}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full rounded-[20px]"
                />
                <figcaption className={`p-3 text-sm ${muted}`}>{dict.gallery.captions[index]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="px-6 py-20">
        <div className="mx-auto max-w-[1120px] rounded-3xl bg-[color:var(--dg-panel)] px-8 py-12 text-white">
          <h2 className="text-3xl font-semibold tracking-tight">{dict.download.title}</h2>
          <p className="mt-3 max-w-lg text-white/60">{dict.download.body}</p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="dg-btn-primary mt-6">
            {dict.download.button}
          </a>
        </div>
      </section>
    </>
  );
}
