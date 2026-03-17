"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

interface TrackConversionProps {
  event: string;
  data?: Record<string, unknown>;
}

export default function TrackConversion({ event, data }: TrackConversionProps) {
  useEffect(() => {
    trackEvent(event, data);
  }, [event, data]);

  return null;
}
