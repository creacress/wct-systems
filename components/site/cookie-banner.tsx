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

/**
 * Initialise le Consent Mode v2 AVANT de charger GTM.
 * Par défaut tout est 'denied' — GA4 envoie des pings sans cookie.
 * Si l'utilisateur a déjà accepté, on passe directement en 'granted'.
 */
function initConsentMode(hasConsent: boolean) {
  if (typeof window === "undefined") return;
  if (document.getElementById("gtm-consent-init")) return;

  const script = document.createElement("script");
  script.id = "gtm-consent-init";
  script.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      analytics_storage: '${hasConsent ? "granted" : "denied"}',
      ad_storage: '${hasConsent ? "granted" : "denied"}',
      ad_user_data: '${hasConsent ? "granted" : "denied"}',
      ad_personalization: '${hasConsent ? "granted" : "denied"}',
      wait_for_update: 500,
    });
    gtag('set', 'ads_data_redaction', ${!hasConsent});
    gtag('set', 'url_passthrough', true);
  `;
  document.head.prepend(script);
}

/**
 * Charge GTM (une seule fois). Appelé TOUJOURS, indépendamment du consentement.
 */
function loadGTM() {
  if (typeof window === "undefined") return;
  if (document.getElementById("gtm-script")) return;

  const dl = document.createElement("script");
  dl.textContent = `
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
  `;
  document.head.appendChild(dl);

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

/**
 * Met à jour le consentement (après clic utilisateur).
 */
function updateConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const state = granted ? "granted" : "denied";
  window.dataLayer.push({
    event: "consent_update",
    consent_command: "update",
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  } as Record<string, unknown>);
  // Also call gtag consent update via inline script
  const script = document.createElement("script");
  script.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'update', {
      analytics_storage: '${state}',
      ad_storage: '${state}',
      ad_user_data: '${state}',
      ad_personalization: '${state}',
    });
  `;
  document.head.appendChild(script);
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();

    // 1. Initialiser le Consent Mode AVANT GTM
    initConsentMode(consent === "accepted");

    // 2. Charger GTM TOUJOURS (indépendamment du consentement)
    loadGTM();

    // 3. Afficher la bannière seulement si pas encore de choix
    if (consent === null) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    saveConsent("accepted");
    updateConsent(true);
    setVisible(false);
  };

  const handleRefuse = () => {
    saveConsent("refused");
    updateConsent(false);
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
