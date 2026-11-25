'use client';

import { useEffect } from 'react';

/** Smooth-scroll to hash targets after client navigation (e.g. from changelog). */
export default function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      });
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return null;
}
