import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary } from './dictionaries/en';
import LanguageSwitcher from './LanguageSwitcher';
import { GITHUB_URL, ICON_SRC, pageUrl, privacyUrl, supportUrl, type Locale } from './site';

export default function Footer({ dict, lang }: { dict: Dictionary['footer']; lang: Locale }) {
  const linkClass = 'text-sm text-white/60 hover:text-white transition-colors';
  return (
    <footer style={{ background: 'var(--lm-footer)' }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src={ICON_SRC}
                alt=""
                width={28}
                height={28}
                className="w-7 h-7 rounded-md object-cover"
              />
              <span className="text-base font-semibold text-white">LifeMint</span>
            </div>
            <p className="text-sm text-white/50 max-w-xs">{dict.description}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">{dict.product}</h2>
            <ul className="space-y-2">
              <li><Link href={`${pageUrl(lang)}#pillars`} className={linkClass}>{dict.features}</Link></li>
              <li><Link href={`${pageUrl(lang)}#paycheck`} className={linkClass}>{dict.paycheck}</Link></li>
              <li><Link href={`${pageUrl(lang)}#interactive-demo`} className={linkClass}>{dict.tryDemo}</Link></li>
              <li><Link href={pageUrl(lang, '/changelog')} className={linkClass}>{dict.changelog}</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">{dict.support}</h2>
            <ul className="space-y-2">
              <li><a href={supportUrl(lang)} className={linkClass} data-link="support">{dict.supportPage}</a></li>
              <li><a href={privacyUrl(lang)} className={linkClass} data-link="privacy">{dict.privacyPolicy}</a></li>
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} flex items-center gap-1.5`}>
                  <svg className="w-3.5 h-3.5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                  </svg>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-white/10">
          <div className="text-xs text-white/30">{dict.copyright}</div>
          <LanguageSwitcher current={lang} label={dict.language} />
        </div>
      </div>
    </footer>
  );
}
