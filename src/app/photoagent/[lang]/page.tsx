import '@/components/photoagent/photoagent.css';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/photoagent/Navbar';
import Hero from '@/components/photoagent/Hero';
import SearchDemo from '@/components/photoagent/SearchDemo';
import CleanupDemo from '@/components/photoagent/CleanupDemo';
import PrivacySection from '@/components/photoagent/PrivacySection';
import VoiceSection from '@/components/photoagent/VoiceSection';
import FeatureGrid from '@/components/photoagent/FeatureGrid';
import ProductGallery from '@/components/photoagent/ProductGallery';
import ProSection from '@/components/photoagent/ProSection';
import DownloadCTA from '@/components/photoagent/DownloadCTA';
import Footer from '@/components/photoagent/Footer';
import HtmlLang from '@/components/photoagent/HtmlLang';
import { getDictionary } from '@/components/photoagent/get-dictionary';
import {
  APP_STORE_LIVE,
  APP_STORE_URL,
  HREFLANG,
  LOCALES,
  OG_IMAGE,
  SITE_URL,
  isLocale,
  localeAlternates,
  ogLocale,
  pageUrl,
} from '@/components/photoagent/site';

type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Only the six languages exist; /photoagent/anything-else is a 404. The static privacy and support pages win over [lang].
export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF7EF' },
    { media: '(prefers-color-scheme: dark)', color: '#1B1320' },
  ],
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: { absolute: dict.metadata.title },
    description: dict.metadata.description,
    applicationName: 'PhotoAgent',
    alternates: localeAlternates(lang),
    icons: {
      icon: [{ url: '/photoagent/favicon.png', type: 'image/png' }],
      apple: '/photoagent/apple-touch-icon.png',
    },
    // The Smart App Banner only once the app is on sale.
    ...(APP_STORE_LIVE ? { itunes: { appId: '6838622854' } } : {}),
    openGraph: {
      type: 'website',
      siteName: 'PhotoAgent',
      url: pageUrl(lang),
      locale: ogLocale(lang),
      title: dict.metadata.ogTitle,
      description: dict.metadata.ogDescription,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'PhotoAgent' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.ogTitle,
      description: dict.metadata.ogDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function PhotoAgentPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  // The app's interface is English and Simplified Chinese, so only Chinese pages show Chinese screenshots.
  const screenshotLocale = lang === 'zh' ? 'zh' : 'en';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'PhotoAgent',
    operatingSystem: 'iOS',
    applicationCategory: 'PhotographyApplication',
    url: `${SITE_URL}${pageUrl(lang)}`,
    image: `${SITE_URL}${OG_IMAGE}`,
    ...(APP_STORE_LIVE ? { downloadUrl: APP_STORE_URL } : {}),
  };

  return (
    <div className="pa-root relative min-h-screen" lang={HREFLANG[lang]}>
      <HtmlLang lang={HREFLANG[lang]} />
      <noscript>
        <style>{'.pa-root .pa-reveal{opacity:1!important;transform:none!important}'}</style>
      </noscript>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#top" className="pa-skip-link">
        {dict.navbar.skip}
      </a>
      <Navbar dict={dict.navbar} lang={lang} languageLabel={dict.footer.language} />
      <main id="top" className="min-h-screen bg-[var(--pa-page)]">
        <Hero dict={dict.hero} appStore={dict.appStore} screenshotLocale={screenshotLocale} />
        <div>
          <SearchDemo dict={dict.searchDemo} />
          <CleanupDemo dict={dict.cleanupDemo} />
          <PrivacySection dict={dict.privacy} lang={lang} />
          <VoiceSection dict={dict.voice} initial={lang} />
          <FeatureGrid dict={dict.features} />
          <ProductGallery dict={dict.gallery} screenshotLocale={screenshotLocale} />
          <ProSection dict={dict.pro} />
          <DownloadCTA dict={dict.download} appStore={dict.appStore} />
        </div>
      </main>
      <Footer dict={dict.footer} nav={dict.navbar} lang={lang} />
    </div>
  );
}
