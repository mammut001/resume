import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/lifemint/Navbar';
import Footer from '@/components/lifemint/Footer';
import ChangelogViewer from '@/components/lifemint/ChangelogViewer';
import { getDictionary } from '@/components/lifemint/get-dictionary';
import { OG_IMAGE, isLocale, localeAlternates, ogLocale, pageUrl } from '@/components/lifemint/site';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const title = `${dict.changelogPage.title} — LifeMint`;
  return {
    title: { absolute: title },
    description: dict.changelogPage.description,
    applicationName: 'LifeMint',
    alternates: localeAlternates(lang, '/changelog'),
    icons: {
      icon: [{ url: '/lifemint/favicon.png', type: 'image/png' }],
      apple: '/lifemint/apple-touch-icon.png',
    },
    // Its own card, so a shared changelog link doesn't show the résumé's.
    openGraph: {
      type: 'website',
      siteName: 'LifeMint',
      url: pageUrl(lang, '/changelog'),
      locale: ogLocale(lang),
      title,
      description: dict.changelogPage.description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'LifeMint' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: dict.changelogPage.description,
      images: [OG_IMAGE],
    },
  };
}

export default async function LifeMintChangelogPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict.navbar} lang={lang} languageLabel={dict.footer.language} />
      <main id="top" className="min-h-screen pt-24 pb-20">
        <ChangelogViewer dict={dict.changelogPage} lang={lang} />
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
