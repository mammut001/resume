import type { Dictionary } from './dictionaries/en';
import { APP_STORE_LIVE } from './site';
import AppStoreButton from './AppStoreButton';
import PhotoBuddy from './PhotoBuddy';
import Reveal from './Reveal';

export default function DownloadCTA({
  dict,
  appStore,
  live = APP_STORE_LIVE,
}: {
  dict: Dictionary['download'];
  appStore: Dictionary['appStore'];
  live?: boolean;
}) {
  return (
    <section id="download" className="py-24 md:py-32 px-4 sm:px-6 scroll-mt-16" style={{ background: 'var(--pa-coral-bg)' }}>
      <Reveal className="max-w-2xl mx-auto text-center">
        <PhotoBuddy className="w-20 h-20 mx-auto mb-6" bob />
        <h2 className="text-[30px] sm:text-[42px] font-bold leading-tight tracking-tight text-[color:var(--pa-title)] mb-4 text-balance">
          {dict.title}
        </h2>
        <p className="text-base sm:text-lg text-[color:var(--pa-body)] mb-8">{live ? dict.subtitleLive : dict.subtitleSoon}</p>
        <AppStoreButton dict={appStore} live={live} placement="download" />
        <p className="text-sm text-[color:var(--pa-body)] mt-6">{dict.footnote}</p>
        <p className="text-sm text-[color:var(--pa-body)] mt-1">{dict.languageNote}</p>
      </Reveal>
    </section>
  );
}
