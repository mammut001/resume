import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/lifemint/Navbar';
import Hero from '@/components/lifemint/Hero';
import ProductCredibility from '@/components/lifemint/ProductCredibility';
import LifeRingSection from '@/components/lifemint/LifeRingSection';
import InteractiveTimerDemo from '@/components/lifemint/InteractiveTimerDemo';
import PaycheckSection from '@/components/lifemint/PaycheckSection';
import ProductStory from '@/components/lifemint/ProductStory';
import AppleEcosystemSection from '@/components/lifemint/AppleEcosystemSection';
import ProductGallery from '@/components/lifemint/ProductGallery';
import FeatureExplorer from '@/components/lifemint/FeatureExplorer';
import SupportingFeatures from '@/components/lifemint/SupportingFeatures';
import ProSection from '@/components/lifemint/ProSection';
import DownloadCTA from '@/components/lifemint/DownloadCTA';
import Footer from '@/components/lifemint/Footer';
import HashScroll from '@/components/lifemint/HashScroll';
import { getDictionary } from '@/components/lifemint/get-dictionary';
import {
  APP_STORE_ID,
  APP_STORE_URL,
  OG_IMAGE,
  SITE_URL,
  isLocale,
  localeAlternates,
  ogLocale,
  pageUrl,
} from '@/components/lifemint/site';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: { absolute: dict.metadata.title },
    description: dict.metadata.description,
    applicationName: 'LifeMint',
    alternates: localeAlternates(lang),
    icons: {
      icon: [{ url: '/lifemint/favicon.png', type: 'image/png' }],
      apple: '/lifemint/apple-touch-icon.png',
    },
    itunes: { appId: APP_STORE_ID },
    openGraph: {
      type: 'website',
      siteName: 'LifeMint',
      url: pageUrl(lang),
      locale: ogLocale(lang),
      title: dict.metadata.ogTitle,
      description: dict.metadata.ogDescription,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'LifeMint' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.ogTitle,
      description: dict.metadata.ogDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function LifeMintPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'LifeMint',
    operatingSystem: 'iOS, iPadOS, watchOS',
    applicationCategory: 'ProductivityApplication',
    url: `${SITE_URL}${pageUrl(lang)}`,
    image: `${SITE_URL}${OG_IMAGE}`,
    downloadUrl: APP_STORE_URL,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HashScroll />
      <Navbar dict={dict.navbar} lang={lang} languageLabel={dict.footer.language} />
      <main id="top" className="min-h-screen">
        <Hero dict={dict.hero} />
        <ProductCredibility dict={dict.credibility} />
        <LifeRingSection dict={dict.ring} />
        <InteractiveTimerDemo dict={dict.timerDemo} />
        <PaycheckSection dict={dict.paycheck} />
        <ProductStory dict={dict.story} />
        <AppleEcosystemSection dict={dict.ecosystem} />
        <ProductGallery dict={dict.productGallery} />
        <FeatureExplorer dict={dict.explorer} />
        <SupportingFeatures dict={dict.supporting} />
        <ProSection dict={dict.pro} />
        <DownloadCTA dict={dict.download} />
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
