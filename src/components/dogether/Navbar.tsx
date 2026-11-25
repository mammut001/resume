"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary } from "./dictionaries/en";
import LanguageSwitcher from "./LanguageSwitcher";
import { ICON_SRC, pageUrl, privacyUrl, supportUrl, type Locale } from "./site";

export default function Navbar({ dict, lang }: { dict: Dictionary["nav"]; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);
  const linkClass = "dg-focus rounded px-3 py-2 hover:text-[color:var(--dg-ink)]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled || open
          ? "border-b border-[color:var(--dg-line)] bg-[color:color-mix(in_srgb,var(--dg-paper)_90%,transparent)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
        <Link href={pageUrl(lang)} className="dg-focus flex items-center gap-2.5 rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ICON_SRC} alt="" width={32} height={32} className="h-8 w-8 rounded-lg" />
          <span className="font-semibold tracking-tight">Dogether</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-[color:var(--dg-muted)] md:flex">
          <a className={linkClass} href="#features">
            {dict.features}
          </a>
          <a className={linkClass} href="#how">
            {dict.how}
          </a>
          <a className={linkClass} href={privacyUrl(lang)}>
            {dict.privacy}
          </a>
          <a className={linkClass} href={supportUrl(lang)}>
            {dict.support}
          </a>
          <LanguageSwitcher lang={lang} label={dict.language} />
          <a className="dg-btn-primary dg-btn-sm ml-2" href="#download">
            {dict.download}
          </a>
        </nav>
        <button
          type="button"
          className="dg-focus rounded px-2 py-1 text-sm text-[color:var(--dg-muted)] md:hidden"
          aria-expanded={open}
          aria-controls="dg-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? dict.close : dict.menu}
        </button>
      </div>
      {open && (
        <div
          id="dg-mobile-menu"
          className="flex flex-col gap-1 border-t border-[color:var(--dg-line)] bg-[color:var(--dg-paper)] px-6 py-3 text-sm md:hidden"
        >
          <a className="dg-focus rounded py-2" href="#features" onClick={close}>
            {dict.features}
          </a>
          <a className="dg-focus rounded py-2" href="#how" onClick={close}>
            {dict.how}
          </a>
          <a className="dg-focus rounded py-2" href={privacyUrl(lang)} onClick={close}>
            {dict.privacy}
          </a>
          <a className="dg-focus rounded py-2" href={supportUrl(lang)} onClick={close}>
            {dict.support}
          </a>
          <div className="py-2">
            <LanguageSwitcher lang={lang} label={dict.language} />
          </div>
        </div>
      )}
    </header>
  );
}
