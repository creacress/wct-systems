"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureUTM, trackEvent, getStoredUTM } from "@/lib/tracking";

/**
 * Capture UTM + push page_view enrichi à chaque navigation.
 * À monter une seule fois dans le layout site.
 */
export function UTMCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureUTM();

    const utm = getStoredUTM();
    trackEvent("page_view_enriched", {
      page_path: pathname,
      page_title: document.title,
      ...utm,
    });
  }, [pathname, searchParams]);

  return null;
}
