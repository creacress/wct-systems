"use client";
import { useEffect, useRef } from "react";

type Variant = "cta" | "score-demo";

export function AIVizWidget({ variant = "cta", className }: { variant?: Variant; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (document.getElementById("aiviz-embed-script")) return;
    const script = document.createElement("script");
    script.id = "aiviz-embed-script";
    script.src = "https://aiviz.webcresson.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className={className}>
      <div ref={ref} id="aiviz-widget" data-variant={variant} />
    </div>
  );
}
