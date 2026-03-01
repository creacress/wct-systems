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
    // Vérifier expiration (6 mois)
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

/** Injecte GTM dans la page (une seule fois) */
function loadGTM() {
  if (document.getElementById("gtm-script")) return;

  // Consent par défaut : accordé
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

  // Script GTM
  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  // dataLayer push
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
    // "refused" → rien à faire, bannière masquée
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
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-label="Gestion des cookies"
    >
      <div className="mx-auto max-w-xl rounded-3xl border bg-background/95 p-5 shadow-lg backdrop-blur sm:p-6">
        <p className="text-sm text-muted-foreground">
          Ce site utilise des cookies pour améliorer votre expérience et analyser
          le trafic.{" "}
          <Link
            href="/mentions-legales"
            className="underline underline-offset-2 hover:text-foreground"
          >
            En savoir plus
          </Link>
        </p>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={handleRefuse}
            className="flex-1 rounded-2xl border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 rounded-2xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
