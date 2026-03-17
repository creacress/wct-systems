"use client";

import { useEffect, useRef } from "react";
import { trackViewPricing } from "@/lib/tracking";

export function PricingTracker() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackViewPricing("all");
  }, []);

  return null;
}
