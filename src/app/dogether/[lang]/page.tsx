import "@/components/dogether/dogether.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/dogether/Navbar";
import HomePage from "@/components/dogether/HomePage";
import Footer from "@/components/dogether/Footer";
import HtmlLang from "@/components/photoagent/HtmlLang";
import { getDictionary } from "@/components/dogether/get-dictionary";
import {
  APP_STORE_ID,
  APP_STORE_URL,
  HREFLANG,
  LOCALES,
  OG_IMAGE,
  SITE_URL,
  isLocale,
  localeAlternates,
  ogLocale,
  pageUrl,
} from "@/components/dogether/site";

type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Only English and Chinese exist; /dogether/anything-else is a 404. The static privacy and support pages win over [lang].
export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDFBF8" },
    { media: "(prefers-color-scheme: dark)", color: "#161310" },
  ],
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: { absolute: dict.metadata.title },
    description: dict.metadata.description,
    applicationName: "Dogether",
    alternates: localeAlternates(lang),
    icons: {
      icon: [{ url: "/dogether/favicon.png", type: "image/png" }],
      apple: "/dogether/apple-touch-icon.png",
    },
    itunes: { appId: APP_STORE_ID },
    openGraph: {
      type: "website",
      siteName: "Dogether",
      url: pageUrl(lang),
      locale: ogLocale(lang),
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [{ url: OG_IMAGE, width: 512, height: 512, alt: "Dogether" }],
    },
    twitter: {
      card: "summary",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [OG_IMAGE],
    },
  };
}

export default async function DogetherPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Dogether",
    operatingSystem: "iOS, iPadOS",
    applicationCategory: "ProductivityApplication",
    url: `${SITE_URL}${pageUrl(lang)}`,
    image: `${SITE_URL}${OG_IMAGE}`,
    downloadUrl: APP_STORE_URL,
  };

  return (
    <div className="dg-root relative min-h-screen" lang={HREFLANG[lang]}>
      <HtmlLang lang={HREFLANG[lang]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#top" className="dg-skip-link">
        {dict.nav.skip}
      </a>
      <Navbar dict={dict.nav} lang={lang} />
      <main id="top">
        <HomePage dict={dict} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} lang={lang} />
    </div>
  );
}
