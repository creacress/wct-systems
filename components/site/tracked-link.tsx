"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackCTAClick } from "@/lib/tracking";
import type { ComponentProps } from "react";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  /** Nom du CTA pour le tracking (ex: "audit_gratuit", "voir_service") */
  trackAs?: string;
};

/**
 * Next.js Link qui push automatiquement un cta_click dans le dataLayer.
 * Si trackAs n'est pas fourni, pas de tracking (lien normal).
 */
export function TrackedLink({ trackAs, onClick, ...props }: TrackedLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (trackAs) {
      trackCTAClick(trackAs, pathname ?? "/", String(props.href));
    }
    onClick?.(e);
  };

  return <Link {...props} onClick={handleClick} />;
}
