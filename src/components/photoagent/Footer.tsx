import Image from 'next/image';
import type { Dictionary } from './dictionaries/en';
import { APPS_URL, DOGETHER_URL, ICON_SRC, LIFEMINT_URL, privacyUrl, supportUrl, type Locale } from './site';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer({ dict, nav, lang }: { dict: Dictionary['footer']; nav: Dictionary['navbar']; lang: Locale }) {
  const linkClass = 'text-sm text-white/75 hover:text-white transition-colors';
  return (
    <footer style={{ background: 'var(--pa-footer)' }} className="text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <Image src={ICON_SRC} alt="" width={28} height={28} className="w-7 h-7 rounded-[8px]" />
              <span className="text-base font-bold">PhotoAgent</span>
            </div>
            <p className="text-sm text-white/70 max-w-xs">{dict.description}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">{dict.product}</h2>
            <ul className="space-y-2">
              <li><a href="#search" className={linkClass}>{nav.search}</a></li>
              <li><a href="#cleanup" className={linkClass}>{nav.cleanup}</a></li>
              <li><a href="#pro" className={linkClass}>{nav.pro}</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">{dict.help}</h2>
            <ul className="space-y-2">
              <li><a href={privacyUrl(lang)} className={linkClass} data-link="privacy">{dict.privacy}</a></li>
              <li><a href={supportUrl(lang)} className={linkClass} data-link="support">{dict.support}</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">{dict.moreApps}</h2>
            <ul className="space-y-2">
              <li><a href={LIFEMINT_URL} className={linkClass} data-link="lifemint">{dict.lifemint}</a></li>
              <li><a href={DOGETHER_URL} className={linkClass} data-link="dogether">{dict.dogether}</a></li>
              <li><a href={APPS_URL} className={linkClass} data-link="apps">{dict.allApps}</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-white/15">
          <p className="text-xs text-white/70">{dict.copyright}</p>
          <LanguageSwitcher current={lang} label={dict.language} placement="above" tone="dark" />
        </div>
      </div>
    </footer>
  );
}
