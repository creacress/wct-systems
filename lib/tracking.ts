/* lib/tracking.ts — Helpers dataLayer pour GTM/GA4 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Push un événement dans le dataLayer GTM.
 * Fire-and-forget : ne bloque jamais, ne throw jamais.
 */
export function trackEvent(event: string, data?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, ...data });
    }
  } catch {
    // Silencieux — le tracking ne doit jamais casser l'UX
  }
}

/**
 * Événement : clic sur un CTA
 */
export function trackCTAClick(ctaName: string, pagePath: string, destination?: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    page_path: pagePath,
    cta_destination: destination ?? "",
  });
}

/**
 * Événement : soumission du formulaire de contact
 */
export function trackFormSubmit(service: string) {
  trackEvent("form_submit", {
    service_interest: service,
    form_location: "contact",
  });
}

/**
 * Événement : vue de la page tarifs
 */
export function trackViewPricing(plan?: string) {
  trackEvent("view_pricing", {
    plan_viewed: plan ?? "all",
  });
}

/**
 * Événement : lead généré (CONVERSION PRINCIPALE)
 */
export function trackGenerateLead(source?: string) {
  trackEvent("qualify_lead", {
    lead_source: source ?? "contact_form",
    currency: "EUR",
    value: 0,
  });
}

/* ── UTM ────────────────────────────────────────────────────────────────── */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const UTM_STORAGE_KEY = "wct_utm";

export type UTMParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/**
 * Capture les paramètres UTM de l'URL et les stocke en sessionStorage.
 */
export function captureUTM() {
  try {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const utm: UTMParams = {};
    let hasUTM = false;

    for (const key of UTM_KEYS) {
      const val = params.get(key);
      if (val) {
        utm[key] = val;
        hasUTM = true;
      }
    }

    if (hasUTM) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
    }
  } catch {
    // sessionStorage peut throw en navigation privée
  }
}

/**
 * Récupère les UTM stockés en sessionStorage.
 */
export function getStoredUTM(): UTMParams {
  try {
    if (typeof window === "undefined") return {};
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UTMParams) : {};
  } catch {
    return {};
  }
}
