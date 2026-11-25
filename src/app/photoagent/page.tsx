import type { Metadata } from 'next';
import LanguageRedirect from '@/components/photoagent/LanguageRedirect';
import { LANGUAGE_NAMES, LOCALES, HREFLANG, pageUrl } from '@/components/photoagent/site';

export const metadata: Metadata = {
  title: { absolute: 'PhotoAgent' },
  description: 'PhotoAgent for iPhone: find any photo with one sentence.',
  alternates: {
    canonical: pageUrl('en'),
    languages: Object.fromEntries([
      ...LOCALES.map((l) => [HREFLANG[l], pageUrl(l)]),
      ['x-default', pageUrl('en')],
    ]),
  },
  robots: { index: false, follow: true },
};

// Pick the visitor's language before React loads, so the redirect happens at once. Same rule as pickLocale().
const redirectScript = `(function(){var l=(navigator.languages&&navigator.languages[0]||navigator.language||'en').toLowerCase();var c='en';var s=${JSON.stringify(
  LOCALES
)};for(var i=0;i<s.length;i++){if(l.indexOf(s[i])===0){c=s[i];break;}}location.replace('/photoagent/'+c+location.hash);})();`;

export default function PhotoAgentRoot() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-4 text-center font-sans">
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${pageUrl('en')}`} />
      </noscript>
      <LanguageRedirect />
      <p className="text-lg font-semibold">
        <a href={pageUrl('en')} className="underline underline-offset-4">
          PhotoAgent
        </a>
      </p>
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        {LOCALES.map((l) => (
          <li key={l}>
            <a href={pageUrl(l)} hrefLang={HREFLANG[l]} lang={HREFLANG[l]} className="underline underline-offset-4">
              {LANGUAGE_NAMES[l]}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
