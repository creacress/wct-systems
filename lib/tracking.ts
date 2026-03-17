declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...data });
  }
}

export function trackCTAClick(cta: string, page: string) {
  trackEvent("cta_click", { cta_name: cta, page_path: page });
}

export function trackFormSubmit(service: string) {
  trackEvent("form_submit", { service_interest: service });
}
