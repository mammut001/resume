import type { Dictionary } from './dictionaries/en';
import PhoneScreenshot, { WatchScreenshot } from './DeviceFrame';
import { DOMAIN_ACCENT } from './domains';

export default function Hero({ dict }: { dict: Dictionary['hero'] }) {
  const titleLines = dict.title.split('\n');

  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden lm-hero-atmosphere pt-24 lg:pt-0">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="lm-hero-enter">
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[color:var(--lm-brand-dark-text)] mb-4">
              LifeMint
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color:var(--lm-brand-soft)] border border-[color:var(--lm-brand-20)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--lm-brand)]" />
              <span className="text-sm font-medium text-[color:var(--lm-brand-dark-text)]">{dict.badge}</span>
            </div>

            <h1 className="text-[38px] sm:text-[52px] lg:text-[64px] font-semibold leading-[0.98] tracking-tight text-[color:var(--lm-text-primary)] mb-5">
              {titleLines.map((line, i) => (
                <span key={i}>{line}{i < titleLines.length - 1 ? <br /> : ''}</span>
              ))}
            </h1>

            <p className="text-base sm:text-lg text-[color:var(--lm-text-secondary)] leading-relaxed max-w-lg mb-8">
              {dict.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-10">
              <a
                href={dict.appStoreUrl}
                className="lm-btn-primary"
              >
                <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                {dict.appStore}
              </a>
              <a href="#pillars" className="lm-btn-secondary">
                {dict.learnMore}
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {dict.tags.map((tag, i) => {
                // Earn, Focus, Spend, as in the source.
                const accents = [DOMAIN_ACCENT.earn, DOMAIN_ACCENT.focus, DOMAIN_ACCENT.spend];
                const accent = accents[i % 3];
                return (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border border-transparent"
                    style={{ color: accent.text, background: accent.soft }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end py-8 lm-hero-enter lm-hero-enter-delayed">
            <div className="relative flex items-end gap-4 lg:gap-6">
              <PhoneScreenshot src="home" alt="LifeMint home with Today’s 3 and Study Work Expense Gym" priority />
              <WatchScreenshot
                src="now"
                alt="LifeMint Apple Watch Now with Today’s 3"
                className="mb-4 lg:mb-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
