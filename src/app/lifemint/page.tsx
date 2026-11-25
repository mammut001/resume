import type { Metadata } from 'next';
import LanguageRedirect from '@/components/lifemint/LanguageRedirect';
import { en } from '@/components/lifemint/dictionaries/en';
import { HREFLANG, HREFLANG_REGIONAL, LANGUAGE_LABELS, LOCALES, OG_IMAGE, pageUrl } from '@/components/lifemint/site';

export const metadata: Metadata = {
  title: { absolute: 'LifeMint' },
  description: en.metadata.description,
  alternates: {
    canonical: pageUrl('en'),
    languages: Object.fromEntries([
      ...LOCALES.map((l) => [HREFLANG[l], pageUrl(l)]),
      ...Object.entries(HREFLANG_REGIONAL).map(([tag, l]) => [tag, pageUrl(l)]),
      ['x-default', pageUrl('en')],
    ]),
  },
  robots: { index: false, follow: true },
  icons: {
    icon: [{ url: '/lifemint/favicon.png', type: 'image/png' }],
    apple: '/lifemint/apple-touch-icon.png',
  },
  // Its own card, so a shared /lifemint link doesn't show the résumé's (scrapers don't follow the JS redirect).
  openGraph: {
    type: 'website',
    siteName: 'LifeMint',
    url: pageUrl('en'),
    title: en.metadata.ogTitle,
    description: en.metadata.ogDescription,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'LifeMint' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: en.metadata.ogTitle,
    description: en.metadata.ogDescription,
    images: [OG_IMAGE],
  },
};

// Pick the visitor's language before React loads, so the redirect happens at once. Same rule as pickLocale().
const redirectScript = `(function(){var l=(navigator.languages&&navigator.languages[0]||navigator.language||'en').toLowerCase();var c='en';var s=${JSON.stringify(
  LOCALES
)};for(var i=0;i<s.length;i++){if(l.indexOf(s[i])===0){c=s[i];break;}}location.replace('/lifemint/'+c+location.hash);})();`;

export default function LifeMintRoot() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-4 text-center font-sans">
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${pageUrl('en')}`} />
      </noscript>
      <LanguageRedirect />
      <p className="text-lg font-semibold">
        <a href={pageUrl('en')} className="underline underline-offset-4">
          LifeMint
        </a>
      </p>
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        {LOCALES.map((l) => (
          <li key={l}>
            <a href={pageUrl(l)} hrefLang={HREFLANG[l]} lang={HREFLANG[l]} className="underline underline-offset-4">
              {LANGUAGE_LABELS[l]}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
