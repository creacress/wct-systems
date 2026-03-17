"use client";

import { useEffect, useRef } from "react";
import { trackGenerateLead, getStoredUTM, trackEvent } from "@/lib/tracking";

/**
 * Déclenche l'événement generate_lead une seule fois sur /contact/merci.
 * C'est l'événement de conversion principale pour GA4.
 */
export function LeadTracker() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const utm = getStoredUTM();

    trackGenerateLead("contact_form");

    trackEvent("generate_lead_enriched", {
      lead_source: "contact_form",
      ...utm,
      page_referrer: document.referrer,
    });
  }, []);

  return null;
}
