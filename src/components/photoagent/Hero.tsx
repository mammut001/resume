import Image from 'next/image';
import type { Dictionary } from './dictionaries/en';
import AppStoreButton from './AppStoreButton';
import PhoneScreenshot from './DeviceFrame';
import { ICON_SRC } from './site';

export default function Hero({
  dict,
  appStore,
  screenshotLocale,
}: {
  dict: Dictionary['hero'];
  appStore: Dictionary['appStore'];
  screenshotLocale: 'en' | 'zh';
}) {
  const titleLines = dict.title.split('\n');
  const tagTints = ['leaf', 'sky', 'plum'];

  return (
    <section className="relative overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24 px-4 sm:px-6">
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-60 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--pa-coral-bg), transparent 70%)' }}
      />
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-12 items-center relative">
        <div className="pa-hero-enter min-w-0">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src={ICON_SRC}
              alt=""
              width={64}
              height={64}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] shadow-[var(--pa-shadow-soft)]"
            />
            <div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--pa-title)]">PhotoAgent</p>
              <p className="text-sm font-semibold text-[color:var(--pa-accent-text)]">{dict.badge}</p>
            </div>
          </div>

          <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-bold leading-[1.05] tracking-tight text-[color:var(--pa-title)] mb-5 break-words">
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="text-base sm:text-lg text-[color:var(--pa-secondary)] leading-relaxed max-w-xl mb-8">{dict.description}</p>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-8">
            <AppStoreButton dict={appStore} placement="hero" />
            <a href="#search" className="pa-btn-secondary">
              {dict.tryDemo}
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <ul className="flex flex-wrap gap-2">
            {dict.tags.map((tag, i) => (
              <li
                key={tag}
                className="px-3 py-1.5 text-sm font-semibold rounded-full"
                style={{ background: `var(--pa-${tagTints[i % 3]}-bg)`, color: `var(--pa-${tagTints[i % 3]}-fg)` }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex justify-center pa-hero-enter pa-hero-enter-delayed">
          <PhoneScreenshot
            src={`/photoagent/screenshots/${screenshotLocale}/home.webp`}
            alt={dict.screenshotAlt}
            className="w-[250px] sm:w-[290px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
