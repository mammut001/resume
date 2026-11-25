import type { Dictionary } from './dictionaries/en';
import Reveal from './Reveal';

export default function DownloadCTA({ dict }: { dict: Dictionary['download'] }) {
  return (
    <section id="download" className="py-28 md:py-36 px-6 relative overflow-hidden scroll-mt-20" style={{ background: 'var(--lm-brand-softer)' }}>
      <Reveal className="max-w-3xl mx-auto relative z-10 text-center">
        <h2 className="text-[32px] sm:text-[40px] lg:text-[52px] font-semibold leading-[1.05] tracking-tight text-[color:var(--lm-text-primary)] mb-4">
          {dict.title}
        </h2>
        <p className="text-base sm:text-lg text-[color:var(--lm-text-secondary)] mb-10 max-w-md mx-auto">
          {dict.subtitle}
        </p>
        {dict.appStoreUrl === '#' ? (
          <span className="lm-btn-primary inline-flex cursor-default opacity-80">
            <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {dict.appStore}
          </span>
        ) : (
          <a
            href={dict.appStoreUrl}
            className="lm-btn-primary inline-flex"
          >
            <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {dict.appStore}
          </a>
        )}
        <p className="text-[color:var(--lm-text-tertiary)] text-xs mt-6">{dict.footnote}</p>
      </Reveal>
    </section>
  );
}
