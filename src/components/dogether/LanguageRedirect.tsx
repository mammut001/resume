"use client";

import { useEffect } from "react";
import { pickLocale } from "./site";

/**
 * Sends the visitor on to their language's page. The inline script in /dogether does this during the first page load;
 * this covers a client-side navigation to /dogether, where that script does not run.
 */
export default function LanguageRedirect() {
  useEffect(() => {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
    window.location.replace(`/dogether/${pickLocale(languages[0])}${window.location.hash}`);
  }, []);
  return null;
}
