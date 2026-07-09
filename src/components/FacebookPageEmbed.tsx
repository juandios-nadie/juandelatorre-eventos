"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { FACEBOOK_SDK_SRC } from "@/lib/facebook";
import { isRenderableFacebookEmbedSize } from "@/lib/facebookEmbed";

interface FacebookPageEmbedProps {
  pageUrl: string;
}

type FacebookSdk = {
  XFBML?: {
    parse?: (element?: Element) => void;
  };
};

type EmbedStatus = "loading" | "ready" | "unavailable";

const EMBED_RENDER_CHECK_DELAY_MS = 4500;

declare global {
  interface Window {
    FB?: FacebookSdk;
  }
}

export default function FacebookPageEmbed({
  pageUrl,
}: FacebookPageEmbedProps) {
  const embedRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const [embedStatus, setEmbedStatus] = useState<EmbedStatus>("loading");

  function clearRenderCheck() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function checkEmbedRender() {
    const iframe = embedRef.current?.querySelector("iframe");
    const rect = iframe?.getBoundingClientRect();

    setEmbedStatus(
      isRenderableFacebookEmbedSize({
        width: rect?.width,
        height: rect?.height,
      })
        ? "ready"
        : "unavailable"
    );
  }

  function scheduleRenderCheck() {
    clearRenderCheck();
    timeoutRef.current = window.setTimeout(
      checkEmbedRender,
      EMBED_RENDER_CHECK_DELAY_MS
    );
  }

  function parseFacebookMarkup() {
    setEmbedStatus("loading");
    window.FB?.XFBML?.parse?.(embedRef.current ?? undefined);
    scheduleRenderCheck();
  }

  useEffect(() => clearRenderCheck, []);

  return (
    <div className="w-full min-w-0">
      <div id="fb-root" />
      <div className="overflow-hidden rounded-[1.5rem] border border-brand-gold/20 bg-white p-3 shadow-[0_24px_80px_rgba(35,31,32,0.08)]">
        {embedStatus === "unavailable" ? (
          <div className="flex min-h-[560px] flex-col items-center justify-center bg-brand-champagne/30 px-6 py-10 text-center">
            <p className="max-w-sm text-sm font-semibold leading-7 text-brand-charcoal">
              Facebook no permite mostrar esta actividad dentro del sitio en
              este momento.
            </p>
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-charcoal px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-ruby focus:outline-none focus:ring-2 focus:ring-brand-ruby focus:ring-offset-2 focus:ring-offset-brand-champagne active:translate-y-px"
            >
              Abrir Facebook
            </a>
          </div>
        ) : (
          <div
            ref={embedRef}
            className="flex min-h-[560px] items-center justify-center bg-brand-champagne/30"
          >
            <div
              className="fb-page w-full max-w-[500px]"
              data-href={pageUrl}
              data-tabs="timeline"
              data-width="500"
              data-height="560"
              data-small-header="true"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            >
              <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
                <a href={pageUrl}>Juan de la Torre Eventos</a>
              </blockquote>
            </div>
          </div>
        )}
      </div>
      <Script
        id="facebook-jssdk"
        src={FACEBOOK_SDK_SRC}
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onReady={parseFacebookMarkup}
        onError={() => setEmbedStatus("unavailable")}
      />
    </div>
  );
}
