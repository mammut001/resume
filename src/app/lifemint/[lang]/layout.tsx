import '@/components/lifemint/lifemint.css';
import type { Viewport } from 'next';
import { notFound } from 'next/navigation';
import HtmlLang from '@/components/lifemint/HtmlLang';
import { getDictionary } from '@/components/lifemint/get-dictionary';
import { HREFLANG, LOCALES, isLocale } from '@/components/lifemint/site';

type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Only the six languages exist; /lifemint/anything-else is a 404. The static privacy and support pages win over [lang].
export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f6ef' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1410' },
  ],
};

/** The LifeMint pages' wrapper: the scoped styles, the document language and the skip link. */
export default async function LifeMintLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div className="lm-root relative min-h-screen" lang={HREFLANG[lang]}>
      <HtmlLang lang={HREFLANG[lang]} />
      <noscript>
        <style>{'.lm-root .lm-reveal{opacity:1!important;transform:none!important}'}</style>
      </noscript>
      <a href="#top" className="lm-skip-link">
        {dict.navbar.skip}
      </a>
      {children}
    </div>
  );
}
