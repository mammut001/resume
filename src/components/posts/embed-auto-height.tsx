"use client";

import { useEffect } from "react";

const ALLOWED_ORIGIN = "https://french.paytonpei.top";
const DEV_ORIGIN = "http://localhost:3000";

export function EmbedAutoHeight() {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const isAllowedOrigin =
        event.origin === ALLOWED_ORIGIN ||
        (process.env.NODE_ENV === "development" && event.origin === DEV_ORIGIN);

      if (!isAllowedOrigin) {
        return;
      }

      if (
        event.data?.type === "parlemiao:crs-embed-height" &&
        typeof event.data.height === "number" &&
        Number.isFinite(event.data.height)
      ) {
        const height = Math.min(Math.max(event.data.height, 400), 6000);
        const iframes = document.querySelectorAll<HTMLIFrameElement>(
          ".post-body iframe[data-auto-height]"
        );

        iframes.forEach((iframe) => {
          if (iframe.contentWindow === event.source) {
            iframe.style.height = `${height}px`;
          }
        });
      }
    }

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return null;
}
