import Link from "next/link";
import { LANGUAGE_NAMES, LOCALES, HREFLANG, pageUrl, type Locale } from "./site";

export default function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  return (
    <nav aria-label={label} className="flex items-center gap-1 text-xs font-medium">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden="true" className="text-[color:var(--dg-line)]">
              /
            </span>
          )}
          <Link
            href={pageUrl(l)}
            hrefLang={HREFLANG[l]}
            lang={HREFLANG[l]}
            aria-current={l === lang ? "page" : undefined}
            className={`dg-focus rounded px-0.5 hover:text-[color:var(--dg-ink)] ${
              l === lang ? "text-[color:var(--dg-ink)]" : "text-[color:var(--dg-muted)]"
            }`}
          >
            {LANGUAGE_NAMES[l]}
          </Link>
        </span>
      ))}
    </nav>
  );
}
