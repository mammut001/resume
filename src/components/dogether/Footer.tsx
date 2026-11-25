import type { Dictionary } from "./dictionaries/en";
import { APPS_URL, ICON_SRC, PARLEMIAO_URL, privacyUrl, supportUrl, type Locale } from "./site";

export default function Footer({
  dict,
  nav,
  lang,
}: {
  dict: Dictionary["footer"];
  nav: Dictionary["nav"];
  lang: Locale;
}) {
  const linkClass = "dg-focus rounded hover:text-white";
  return (
    <footer className="bg-[color:var(--dg-panel)] text-white">
      <div className="mx-auto grid max-w-[1120px] gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ICON_SRC} alt="" width={28} height={28} className="h-7 w-7 rounded-md" />
            Dogether
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">{dict.blurb}</p>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-wider text-white/40">{dict.product}</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href="#features" className={linkClass}>
                {nav.features}
              </a>
            </li>
            <li>
              <a href="#how" className={linkClass}>
                {nav.how}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-wider text-white/40">{dict.support}</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href={privacyUrl(lang)} className={linkClass}>
                {dict.privacy}
              </a>
            </li>
            <li>
              <a href={supportUrl(lang)} className={linkClass}>
                {dict.supportLink}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-wider text-white/40">{dict.more}</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href={PARLEMIAO_URL} className={linkClass}>
                {dict.parlemiao}
              </a>
            </li>
            <li>
              <a href={APPS_URL} className={linkClass}>
                {dict.apps}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1120px] px-6 pb-8 text-xs text-white/35">{dict.copyright}</div>
    </footer>
  );
}
