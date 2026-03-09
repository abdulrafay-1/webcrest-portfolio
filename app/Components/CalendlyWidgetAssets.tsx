"use client";

import Script from "next/script";
import {
  CALENDLY_WIDGET_SCRIPT,
  CALENDLY_WIDGET_STYLESHEET,
} from "@/app/lib/calendly";

type CalendlyWidgetAssetsProps = {
  onReady?: () => void;
  onError?: () => void;
};

export default function CalendlyWidgetAssets({
  onReady,
  onError,
}: CalendlyWidgetAssetsProps) {
  return (
    <>
      <link rel="stylesheet" href={CALENDLY_WIDGET_STYLESHEET} />
      <Script
        src={CALENDLY_WIDGET_SCRIPT}
        strategy="afterInteractive"
        onLoad={onReady}
        onError={onError}
      />
    </>
  );
}
