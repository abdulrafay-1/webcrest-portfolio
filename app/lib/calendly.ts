export const CALENDLY_WIDGET_SCRIPT =
  "https://assets.calendly.com/assets/external/widget.js";
export const CALENDLY_WIDGET_STYLESHEET =
  "https://assets.calendly.com/assets/external/widget.css";

export type OpenCalendlyOptions = {
  url: string;
  fallbackToNewTab?: boolean;
};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function openCalendlyPopup({
  url,
  fallbackToNewTab = true,
}: OpenCalendlyOptions): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.Calendly?.initPopupWidget) {
    window.Calendly.initPopupWidget({ url });
    return true;
  }

  if (fallbackToNewTab) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return false;
}
