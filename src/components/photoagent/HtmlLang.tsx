'use client';

import { useEffect } from 'react';

/**
 * The cv's root layout renders <html lang="en">. While a PhotoAgent page in another language is shown, this sets the
 * document language to match, and puts it back when the visitor leaves for another page of the site.
 */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.lang;
    root.lang = lang;
    return () => {
      root.lang = previous;
    };
  }, [lang]);
  return null;
}
