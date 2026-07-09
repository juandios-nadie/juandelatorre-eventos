"use client";

import Script from "next/script";
import { useState } from "react";
import { FACEBOOK_SDK_SRC } from "@/lib/facebook";

interface FacebookPageEmbedProps {
  pageUrl: string;
}

type FacebookSdk = {
  XFBML?: {
    parse?: () => void;
  };
};

declare global {
  interface Window {
    FB?: FacebookSdk;
  }
}

export default function FacebookPageEmbed({
  pageUrl,
}: FacebookPageEmbedProps) {
  const [scriptFailed, setScriptFailed] = useState(false);

  function parseFacebookMarkup() {
    window.FB?.XFBML?.parse?.();
  }

  return (
    <div className="w-full min-w-0">
      <div id="fb-root" />
      <div className="overflow-hidden rounded-[1.5rem] border border-brand-gold/20 bg-white p-3 shadow-[0_24px_80px_rgba(35,31,32,0.08)]">
        {scriptFailed && (
          <div className="mb-3 rounded-2xl bg-brand-ruby/10 px-4 py-3 text-sm font-semibold text-brand-ruby">
            Los eventos recientes están disponibles en Facebook.
          </div>
        )}
        <div className="flex min-h-[560px] items-center justify-center bg-brand-champagne/30">
          <div
            className="fb-page"
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
      </div>
      <Script
        id="facebook-jssdk"
        src={FACEBOOK_SDK_SRC}
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onReady={parseFacebookMarkup}
        onError={() => setScriptFailed(true)}
      />
    </div>
  );
}
