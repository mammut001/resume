'use client';

import { useEffect } from 'react';
import { pageUrl, pickLocale } from './site';

/**
 * Sends the visitor on to their language's page. The inline script in /lifemint does this during the first page load;
 * this covers a client-side navigation to /lifemint, where that script does not run.
 */
export default function LanguageRedirect() {
  useEffect(() => {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
    window.location.replace(`${pageUrl(pickLocale(languages[0]))}${window.location.hash}`);
  }, []);
  return null;
}
