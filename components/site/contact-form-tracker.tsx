"use client";

import { useEffect, useRef } from "react";
import { trackFormSubmit, getStoredUTM, trackEvent } from "@/lib/tracking";

/**
 * S'attache au formulaire de contact et track le submit.
 * Se monte à côté du <form> existant et le cible par action.
 */
export function ContactFormTracker() {
  const attached = useRef(false);

  useEffect(() => {
    if (attached.current) return;
    const form = document.querySelector('form[action="/api/contact"]');
    if (!form) return;

    attached.current = true;

    form.addEventListener("submit", () => {
      const serviceSelect = form.querySelector('select[name="service"]') as HTMLSelectElement | null;
      const service = serviceSelect?.value ?? "non_specifie";

      const utm = getStoredUTM();

      trackFormSubmit(service);
      trackEvent("form_submit_enriched", {
        service_interest: service,
        ...utm,
      });
    });
  }, []);

  return null;
}
