"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";
const GTM_ID = "GTM-5SG8GNR8";

type Consent = "accepted" | "refused" | null;

function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "accepted" || v === "refused") {
    const ts = localStorage.getItem(`${STORAGE_KEY}-ts`);
    if (ts && Date.now() - Number(ts) > 180 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(`${STORAGE_KEY}-ts`);
      return null;
    }
    return v;
  }
  return null;
}

function saveConsent(value: "accepted" | "refused") {
  localStorage.setItem(STORAGE_KEY, value);
  localStorage.setItem(`${STORAGE_KEY}-ts`, String(Date.now()));
}

function loadGTM() {
  if (document.getElementById("gtm-script")) return;

  const consentScript = document.createElement("script");
  consentScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
    });
  `;
  document.head.appendChild(consentScript);

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  const dl = document.createElement("script");
  dl.textContent = `
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
  `;
  document.head.appendChild(dl);
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === "accepted") {
      loadGTM();
    } else if (consent === null) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    saveConsent("accepted");
    setVisible(false);
    loadGTM();
  };

  const handleRefuse = () => {
    saveConsent("refused");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm sm:bottom-6 sm:right-6"
      role="dialog"
      aria-label="Gestion des cookies"
    >
      <div className="rounded-2xl border bg-background/90 p-5 shadow-xl backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0c0c0f]/90">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm dark:bg-violet-900/50">
            <svg className="h-4 w-4 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </span>
          <div>
            <p className="font-display text-sm font-medium">Cookies</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Ce site utilise des cookies pour améliorer votre expérience.{" "}
              <Link
                href="/mentions-legales"
                className="underline underline-offset-2 transition-colors hover:text-foreground"
              >
                En savoir plus
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleRefuse}
            className="flex-1 rounded-xl border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted dark:border-white/[0.12]"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 rounded-xl bg-violet-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-700"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
